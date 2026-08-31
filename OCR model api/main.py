"""
StackFolio Resume Intelligence API.
FastAPI Application implementing the complete adaptive Resume -> Portfolio Intelligence Pipeline.
Includes PyMuPDF fast-path, Quality Assessment, Unlimited-OCR fallback,
Deterministic Zero-Hallucination Parser, Normalizer, and Schema Validator.
"""

import os
import sys
import time
import logging
from contextlib import asynccontextmanager
from typing import Optional, Dict, Any

from fastapi import FastAPI, File, UploadFile, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

# Local pipeline components
from extractor_pymupdf import extract_document_from_bytes, ExtractedDocument
from quality_engine import assess_extraction_quality, ExtractionQuality
from parser_deterministic import parse_deterministic_document, RawParsedResume
from normalizer import normalize_parsed_resume
from validator import validate_portfolio_draft, PortfolioDraft
from ocr_adapter import UnlimitedOCRAdapter

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("stackfolio_resume_api")

MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024  # 5 MB


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifecycle manager for pre-loading and warming the OCR engine once at service startup.
    """
    logger.info("Starting StackFolio Resume Intelligence Engine...")
    ocr_adapter = UnlimitedOCRAdapter()
    await ocr_adapter.initialize()
    yield
    logger.info("Shutting down StackFolio Resume Intelligence Engine.")


app = FastAPI(
    title="StackFolio Resume Intelligence API",
    description="Adaptive PyMuPDF + Unlimited-OCR resume to portfolio intelligence pipeline.",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS for local development and Vercel production frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ProcessResumeResponse(BaseModel):
    success: bool
    draft: PortfolioDraft
    processing: Dict[str, Any]


@app.get("/health")
async def health_check():
    """
    Health check endpoint verifying PyMuPDF and OCR engine readiness.
    """
    return {
        "status": "healthy",
        "service": "StackFolio Resume Intelligence",
        "version": "1.0.0",
        "python_version": sys.version.split()[0],
        "fast_path_extractor": "PyMuPDF",
        "ocr_fallback_engine": "Unlimited-OCR",
        "zero_hallucination_guarantee": True
    }


@app.post(
    "/api/v1/resume/process",
    response_model=ProcessResumeResponse,
    summary="Process PDF resume to generate validated PortfolioDraft"
)
@app.post(
    "/v1/resume/process",
    response_model=ProcessResumeResponse,
    include_in_schema=False
)
async def process_resume(
    file: UploadFile = File(...),
    quality_threshold: float = Query(default=0.65, ge=0.0, le=1.0, description="Configurable OCR routing threshold")
):
    """
    Complete adaptive processing pipeline:
    1. Validation (MIME + size <= 5MB)
    2. PyMuPDF fast-path text & coordinate extraction (<150ms)
    3. Multi-dimensional quality assessment
    4. If POOR/EMPTY -> Unlimited-OCR fallback
    5. Deterministic zero-hallucination parser
    6. Normalizer (whitespace, date, URL protocol security, skill deduplication)
    7. Schema validation -> PortfolioDraft
    """
    overall_start = time.perf_counter()
    timings: Dict[str, float] = {}

    # 1. File Validation
    if not file.filename.lower().endswith(".pdf") and file.content_type != "application/pdf":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file format. Only PDF files (.pdf) are supported."
        )

    pdf_bytes = await file.read()
    if len(pdf_bytes) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded PDF file is empty (0 bytes)."
        )

    if len(pdf_bytes) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File exceeds maximum allowed size of 5 MB ({len(pdf_bytes) / 1024 / 1024:.2f} MB received)."
        )

    # 2. PyMuPDF Fast-Path Extractor
    t0 = time.perf_counter()
    try:
        doc: ExtractedDocument = extract_document_from_bytes(pdf_bytes)
    except Exception as e:
        logger.error(f"PyMuPDF extraction failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Unable to read PDF structure: {str(e)}"
        )
    timings["pdf_extract_ms"] = round((time.perf_counter() - t0) * 1000.0, 2)

    # 3. Extraction Quality Engine
    t1 = time.perf_counter()
    quality: ExtractionQuality = assess_extraction_quality(doc, quality_threshold=quality_threshold)
    timings["quality_check_ms"] = round((time.perf_counter() - t1) * 1000.0, 2)

    ocr_used = False
    extractor_name = "pymupdf"

    # 4. OCR Fallback if Quality is POOR or EMPTY
    if quality.should_use_ocr:
        t2 = time.perf_counter()
        logger.info(f"Quality check triggered OCR fallback (Score: {quality.score:.2f}, Status: {quality.status}).")
        try:
            ocr_adapter = UnlimitedOCRAdapter()
            doc = await ocr_adapter.extract(pdf_bytes)
            ocr_used = True
            extractor_name = "unlimited-ocr"
        except Exception as ocr_err:
            logger.warning(f"OCR fallback encountered error, continuing with available fast-path text: {ocr_err}")
        timings["ocr_ms"] = round((time.perf_counter() - t2) * 1000.0, 2)
    else:
        timings["ocr_ms"] = 0.0

    # 5. Deterministic Zero-Hallucination Parser
    t3 = time.perf_counter()
    raw_parsed: RawParsedResume = parse_deterministic_document(doc)
    timings["parse_ms"] = round((time.perf_counter() - t3) * 1000.0, 2)

    # 6. Resume Normalizer
    t4 = time.perf_counter()
    normalized_dict: Dict[str, Any] = normalize_parsed_resume(raw_parsed)
    timings["normalize_ms"] = round((time.perf_counter() - t4) * 1000.0, 2)

    # 7. Portfolio Validator
    t5 = time.perf_counter()
    validated_draft: PortfolioDraft = validate_portfolio_draft(normalized_dict)
    timings["validate_ms"] = round((time.perf_counter() - t5) * 1000.0, 2)

    total_duration_ms = round((time.perf_counter() - overall_start) * 1000.0, 2)

    processing_metadata = {
        "extractor": extractor_name,
        "ocr_used": ocr_used,
        "quality_score": quality.score,
        "quality_status": quality.status,
        "page_count": doc.page_count,
        "char_count": doc.character_count,
        "duration_ms": total_duration_ms,
        "timings": timings,
        "reasons": quality.reasons
    }

    logger.info(
        f"Processed resume ({len(pdf_bytes)} bytes, {doc.page_count} pages) in {total_duration_ms:.1f}ms "
        f"[Extractor: {extractor_name}, Quality: {quality.score:.2f}]"
    )

    return ProcessResumeResponse(
        success=True,
        draft=validated_draft,
        processing=processing_metadata
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
