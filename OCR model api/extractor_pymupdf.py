"""
PyMuPDF Fast-Path Extractor for StackFolio Resume Intelligence.
Extracts plain text, structured pages, bounding box blocks, and layout coordinates.
Zero external server dependencies, pure in-memory execution.
"""

import time
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field
import pymupdf as fitz  # PyMuPDF


class ExtractedBlock(BaseModel):
    page_number: int
    bbox: List[float]  # [x0, y0, x1, y1]
    text: str
    block_type: int = 0  # 0 = text, 1 = image
    lines: List[Dict[str, Any]] = Field(default_factory=list)


class ExtractedPage(BaseModel):
    page_number: int
    width: float
    height: float
    text: str
    char_count: int
    word_count: int
    blocks: List[ExtractedBlock] = Field(default_factory=list)


class ExtractedDocument(BaseModel):
    text: str
    page_count: int
    character_count: int
    word_count: int
    pages: List[ExtractedPage] = Field(default_factory=list)
    blocks: List[ExtractedBlock] = Field(default_factory=list)
    extraction_time_ms: float
    metadata: Dict[str, Any] = Field(default_factory=dict)
    source: str = "pymupdf"


def extract_document_from_bytes(pdf_bytes: bytes) -> ExtractedDocument:
    """
    Extracts raw text, structured page blocks, and spatial coordinates from raw PDF bytes.
    Optimized for in-memory stream processing without writing temporary files to disk.
    """
    start_time = time.perf_counter()

    if not pdf_bytes or len(pdf_bytes) == 0:
        raise ValueError("PDF content is empty (0 bytes).")

    try:
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    except Exception as e:
        raise ValueError(f"Failed to open PDF document: {str(e)}")

    all_text_parts: List[str] = []
    pages: List[ExtractedPage] = []
    all_blocks: List[ExtractedBlock] = []
    total_chars = 0
    total_words = 0

    try:
        page_count = len(doc)
        metadata = {
            "title": doc.metadata.get("title", ""),
            "author": doc.metadata.get("author", ""),
            "creator": doc.metadata.get("creator", ""),
            "producer": doc.metadata.get("producer", ""),
            "format": doc.metadata.get("format", "PDF"),
        }

        for page_idx in range(page_count):
            page = doc[page_idx]
            page_rect = page.rect
            width, height = float(page_rect.width), float(page_rect.height)

            # 1. Extract plain text
            page_text = page.get_text("text") or ""
            page_chars = len(page_text.strip())
            page_words = len(page_text.split())
            total_chars += page_chars
            total_words += page_words
            all_text_parts.append(page_text)

            # 2. Extract structured blocks with coordinate layout
            # "dict" returns structured blocks, lines, spans with font sizes and bbox
            page_dict = page.get_text("dict")
            page_blocks: List[ExtractedBlock] = []

            for raw_block in page_dict.get("blocks", []):
                block_type = raw_block.get("type", 0)
                bbox = list(raw_block.get("bbox", [0.0, 0.0, 0.0, 0.0]))
                
                block_text_lines = []
                detailed_lines = []

                if block_type == 0:  # Text block
                    for line in raw_block.get("lines", []):
                        line_text = "".join(span.get("text", "") for span in line.get("spans", []))
                        if line_text.strip():
                            block_text_lines.append(line_text)
                            detailed_lines.append({
                                "bbox": list(line.get("bbox", [])),
                                "text": line_text,
                                "spans": [
                                    {
                                        "text": span.get("text", ""),
                                        "size": span.get("size", 0.0),
                                        "flags": span.get("flags", 0),  # bit 1 = italic, bit 4 = bold
                                        "font": span.get("font", ""),
                                    }
                                    for span in line.get("spans", [])
                                ]
                            })

                block_text = "\n".join(block_text_lines)
                if block_text.strip() or block_type == 1:
                    extracted_block = ExtractedBlock(
                        page_number=page_idx + 1,
                        bbox=bbox,
                        text=block_text,
                        block_type=block_type,
                        lines=detailed_lines
                    )
                    page_blocks.append(extracted_block)
                    all_blocks.append(extracted_block)

            pages.append(
                ExtractedPage(
                    page_number=page_idx + 1,
                    width=width,
                    height=height,
                    text=page_text,
                    char_count=page_chars,
                    word_count=page_words,
                    blocks=page_blocks
                )
            )

    finally:
        doc.close()

    elapsed_ms = (time.perf_counter() - start_time) * 1000.0

    return ExtractedDocument(
        text="\n\n".join(all_text_parts),
        page_count=len(pages),
        character_count=total_chars,
        word_count=total_words,
        pages=pages,
        blocks=all_blocks,
        extraction_time_ms=round(elapsed_ms, 2),
        metadata=metadata,
        source="pymupdf"
    )
