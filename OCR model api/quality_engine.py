"""
Extraction Quality Engine for StackFolio Resume Intelligence.
Evaluates multi-dimensional signals to determine if fast-path PyMuPDF extraction
is trustworthy (GOOD) or if fallback to Unlimited-OCR is necessary (POOR / EMPTY).
"""

import re
import unicodedata
from typing import List, Dict, Any
from pydantic import BaseModel, Field
from extractor_pymupdf import ExtractedDocument

RESUME_SECTION_PATTERNS = [
    r"\b(experience|work\s+experience|employment|history)\b",
    r"\b(education|academic|qualifications|university|college)\b",
    r"\b(projects?|personal\s+projects?|key\s+projects?)\b",
    r"\b(skills?|technical\s+skills?|core\s+competencies|technologies)\b",
    r"\b(achievements?|certifications?|awards?|honors?|certificates?)\b",
    r"\b(summary|about\s+me|profile|objective)\b",
]

EMAIL_PATTERN = re.compile(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+")
URL_PATTERN = re.compile(r"https?://[^\s]+|(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}[^\s]*")


class ExtractionQuality(BaseModel):
    score: float
    status: str  # "GOOD" | "POOR" | "EMPTY"
    reasons: List[str] = Field(default_factory=list)
    should_use_ocr: bool
    metrics: Dict[str, Any] = Field(default_factory=dict)


def assess_extraction_quality(
    doc: ExtractedDocument,
    quality_threshold: float = 0.65
) -> ExtractionQuality:
    """
    Evaluates multi-dimensional signals on the extracted document:
    1. Absolute text & character volume.
    2. Character density per page.
    3. Meaningful word ratio (vs garbled/noise tokens).
    4. Corrupted/unprintable character count.
    5. Structural resume section detection.
    6. Contact signal detection (email, links).
    """
    reasons: List[str] = []
    text = doc.text or ""
    clean_text = text.strip()
    total_chars = len(clean_text)
    total_words = doc.word_count
    page_count = max(1, doc.page_count)

    # 1. Check for completely empty or near-empty text
    if total_chars < 50 or total_words < 10:
        return ExtractionQuality(
            score=0.0,
            status="EMPTY",
            reasons=["Document contains negligible extractable text (<50 characters). Likely a scanned image."],
            should_use_ocr=True,
            metrics={"char_count": total_chars, "word_count": total_words, "page_count": page_count}
        )

    # 2. Compute Character Density Per Page
    avg_chars_per_page = total_chars / page_count
    density_score = min(1.0, avg_chars_per_page / 800.0)
    if avg_chars_per_page < 150:
        reasons.append(f"Low text density ({avg_chars_per_page:.0f} chars/page). May contain image elements.")

    # 3. Meaningful Word Ratio (words with >=2 alpha chars)
    words = clean_text.split()
    meaningful_words = [w for w in words if re.search(r"[a-zA-Z]{2,}", w)]
    meaningful_ratio = len(meaningful_words) / max(1, len(words))
    if meaningful_ratio < 0.60:
        reasons.append(f"Low ratio of recognizable words ({meaningful_ratio * 100:.1f}%). Possible font encoding issue.")

    # 4. Corrupted / Replacement Character Detection (e.g. \ufffd, control chars)
    corrupted_count = sum(1 for c in clean_text if c == '\ufffd' or (ord(c) < 32 and c not in ('\n', '\r', '\t')))
    corrupted_ratio = corrupted_count / max(1, total_chars)
    if corrupted_ratio > 0.05:
        reasons.append(f"High corrupted character ratio ({corrupted_ratio * 100:.1f}%).")

    # 5. Section Header Detection
    text_lower = clean_text.lower()
    matched_sections = 0
    for pattern in RESUME_SECTION_PATTERNS:
        if re.search(pattern, text_lower):
            matched_sections += 1
    section_score = min(1.0, matched_sections / 3.0)  # 3+ sections = 1.0
    if matched_sections < 2:
        reasons.append("Fewer than 2 standard resume sections detected.")

    # 6. Contact Signal Detection (email or url or phone)
    has_email = bool(EMAIL_PATTERN.search(clean_text))
    has_url = bool(URL_PATTERN.search(clean_text))
    contact_score = 1.0 if (has_email or has_url) else 0.5

    # 7. Block / Layout Distribution
    block_count = len(doc.blocks)
    block_score = 1.0 if block_count >= 5 else (block_count / 5.0)

    # Multi-dimensional Weighted Composite Quality Score
    # Weights: Density (25%), Meaningful Words (30%), Section Presence (25%), Contact Signals (10%), Block Layout (10%)
    composite_score = (
        (density_score * 0.25) +
        (meaningful_ratio * 0.30) +
        (section_score * 0.25) +
        (contact_score * 0.10) +
        (block_score * 0.10)
    )

    # Penalty for corrupted characters
    if corrupted_ratio > 0.02:
        composite_score -= (corrupted_ratio * 2.0)

    final_score = round(max(0.0, min(1.0, composite_score)), 3)

    # Classification against configurable threshold
    if final_score >= quality_threshold:
        status = "GOOD"
        should_use_ocr = False
    elif final_score >= 0.35:
        status = "POOR"
        should_use_ocr = True
    else:
        status = "EMPTY"
        should_use_ocr = True

    metrics = {
        "final_score": final_score,
        "quality_threshold": quality_threshold,
        "total_chars": total_chars,
        "total_words": total_words,
        "page_count": page_count,
        "avg_chars_per_page": round(avg_chars_per_page, 1),
        "meaningful_ratio": round(meaningful_ratio, 3),
        "corrupted_ratio": round(corrupted_ratio, 3),
        "matched_sections": matched_sections,
        "has_email": has_email,
        "has_url": has_url,
        "block_count": block_count
    }

    return ExtractionQuality(
        score=final_score,
        status=status,
        reasons=reasons,
        should_use_ocr=should_use_ocr,
        metrics=metrics
    )
