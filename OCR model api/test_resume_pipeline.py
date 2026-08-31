"""
Unit and Integration Test Suite for StackFolio Resume Intelligence Pipeline.
Verifies PyMuPDF extraction, Quality Assessment, Deterministic Parsing,
Zero-Hallucination Invariants, URL Protocol Security, and Performance Benchmarks.
"""

import io
import time
import unittest
import pymupdf as fitz  # PyMuPDF

from extractor_pymupdf import extract_document_from_bytes, ExtractedDocument
from quality_engine import assess_extraction_quality
from parser_deterministic import parse_deterministic_document, RawParsedResume
from normalizer import normalize_parsed_resume, sanitize_url, normalize_skill_name
from validator import validate_portfolio_draft, PortfolioDraft


def create_synthetic_resume_pdf(
    name: str = "Aarya Shah",
    headline: str = "Full Stack Engineer & React Specialist",
    email: str = "aarya.shah@example.com",
    github: str = "https://github.com/aaryashah",
    linkedin: str = "https://linkedin.com/in/aaryashah",
    include_projects: bool = True,
    include_experience: bool = True,
    include_skills: bool = True,
    pages_count: int = 1
) -> bytes:
    """Creates an in-memory synthetic PDF resume using PyMuPDF for rigorous test automation."""
    doc = fitz.open()

    for p in range(pages_count):
        page = doc.new_page(width=595, height=842)  # A4 standard
        
        # Header / Identity
        y = 50
        page.insert_text((50, y), name, fontsize=20, fontname="helv", color=(0, 0, 0))
        y += 24
        page.insert_text((50, y), headline, fontsize=12, fontname="helv", color=(0.3, 0.3, 0.3))
        y += 18
        contact_line = f"Email: {email} | GitHub: {github} | LinkedIn: {linkedin} | Location: Mumbai, India"
        page.insert_text((50, y), contact_line, fontsize=9, fontname="helv", color=(0.2, 0.2, 0.2))
        y += 30

        # Summary
        page.insert_text((50, y), "SUMMARY", fontsize=14, fontname="helv", color=(0, 0, 0))
        y += 16
        summary_text = "Passionate full-stack developer with 3+ years building responsive modern web applications with React, Node.js, and Supabase."
        page.insert_text((50, y), summary_text, fontsize=10, fontname="helv", color=(0.2, 0.2, 0.2))
        y += 30

        if include_skills:
            page.insert_text((50, y), "SKILLS", fontsize=14, fontname="helv", color=(0, 0, 0))
            y += 16
            skills_line = "React, React.js, TypeScript, Node.js, Express, PostgreSQL, Supabase, Tailwind CSS, Docker, Python, Java, JavaScript"
            page.insert_text((50, y), skills_line, fontsize=10, fontname="helv", color=(0.2, 0.2, 0.2))
            y += 30

        if include_experience:
            page.insert_text((50, y), "EXPERIENCE", fontsize=14, fontname="helv", color=(0, 0, 0))
            y += 16
            page.insert_text((50, y), "Software Engineer | TechNova Solutions | 2023 - Present", fontsize=11, fontname="helv", color=(0, 0, 0))
            y += 14
            page.insert_text((60, y), "• Designed and developed multi-tenant SaaS frontend architecture using React 19.", fontsize=9, fontname="helv", color=(0.2, 0.2, 0.2))
            y += 12
            page.insert_text((60, y), "• Optimized PostgreSQL database queries reducing API latency by 45%.", fontsize=9, fontname="helv", color=(0.2, 0.2, 0.2))
            y += 30

        if include_projects:
            page.insert_text((50, y), "PROJECTS", fontsize=14, fontname="helv", color=(0, 0, 0))
            y += 16
            page.insert_text((50, y), "CloudIDE Web Editor", fontsize=11, fontname="helv", color=(0, 0, 0))
            y += 14
            page.insert_text((60, y), "Browser-based code development environment with real-time compilation.", fontsize=9, fontname="helv", color=(0.2, 0.2, 0.2))
            y += 12
            page.insert_text((60, y), "Tech: React, WebAssembly, Node.js | URL: https://cloudide.dev | Repo: https://github.com/aaryashah/cloudide", fontsize=9, fontname="helv", color=(0.2, 0.2, 0.2))
            y += 30

        # Education
        page.insert_text((50, y), "EDUCATION", fontsize=14, fontname="helv", color=(0, 0, 0))
        y += 16
        page.insert_text((50, y), "Bachelor of Computer Applications (BCA) | University of Mumbai | 2021 - 2024", fontsize=11, fontname="helv", color=(0, 0, 0))
        y += 25

    pdf_bytes = doc.tobytes()
    doc.close()
    return pdf_bytes


class TestResumeIntelligencePipeline(unittest.TestCase):

    def test_01_pymupdf_fast_path_extraction(self):
        """Verify PyMuPDF fast extraction performance and structural accuracy."""
        pdf_bytes = create_synthetic_resume_pdf()
        start = time.perf_counter()
        doc = extract_document_from_bytes(pdf_bytes)
        elapsed_ms = (time.perf_counter() - start) * 1000.0

        self.assertLess(elapsed_ms, 200.0, f"PyMuPDF took {elapsed_ms:.1f}ms (expected <200ms)")
        self.assertEqual(doc.page_count, 1)
        self.assertGreater(doc.character_count, 300)
        self.assertIn("Aarya Shah", doc.text)
        self.assertIn("CloudIDE", doc.text)

    def test_02_quality_assessment_good_document(self):
        """Verify Quality Engine classifies a clean digital resume as GOOD with no OCR needed."""
        pdf_bytes = create_synthetic_resume_pdf()
        doc = extract_document_from_bytes(pdf_bytes)
        quality = assess_extraction_quality(doc)

        self.assertEqual(quality.status, "GOOD")
        self.assertFalse(quality.should_use_ocr)
        self.assertGreaterEqual(quality.score, 0.65)

    def test_03_quality_assessment_empty_document(self):
        """Verify Quality Engine classifies an empty document as EMPTY and triggers OCR."""
        empty_doc = ExtractedDocument(
            text="",
            page_count=1,
            character_count=0,
            word_count=0,
            pages=[],
            blocks=[],
            extraction_time_ms=1.0,
            source="pymupdf"
        )
        quality = assess_extraction_quality(empty_doc)
        self.assertEqual(quality.status, "EMPTY")
        self.assertTrue(quality.should_use_ocr)
        self.assertEqual(quality.score, 0.0)

    def test_04_zero_hallucination_guarantee(self):
        """CRITICAL INVARIANT: Missing fields in resume must NEVER be invented or guessed."""
        # Resume with NO github, NO bio, NO achievements
        sparse_pdf = create_synthetic_resume_pdf(
            name="Rohan Sharma",
            github="",
            linkedin="",
            include_projects=False
        )
        doc = extract_document_from_bytes(sparse_pdf)
        raw = parse_deterministic_document(doc)
        norm = normalize_parsed_resume(raw)
        draft = validate_portfolio_draft(norm)

        self.assertEqual(draft.profile.full_name, "Rohan Sharma")
        # Missing fields MUST be empty strings, not fabricated
        self.assertEqual(draft.profile.github_url, "")
        self.assertEqual(draft.profile.linkedin_url, "")
        self.assertEqual(len(draft.projects), 0)

    def test_05_url_protocol_security(self):
        """Verify URL sanitizer strictly blocks dangerous schemes (javascript:, data:, vbscript:)."""
        self.assertEqual(sanitize_url("javascript:alert(1)"), "")
        self.assertEqual(sanitize_url("data:text/html,<script>alert('xss')</script>"), "")
        self.assertEqual(sanitize_url("vbscript:msgbox(1)"), "")
        self.assertEqual(sanitize_url("file:///etc/passwd"), "")
        self.assertEqual(sanitize_url("https://github.com/aaryashah"), "https://github.com/aaryashah")
        self.assertEqual(sanitize_url("github.com/aaryashah"), "https://github.com/aaryashah")

    def test_06_skill_normalization_and_deduplication(self):
        """Verify synonym skills are merged (React.js -> React) while distinct skills (Java vs JavaScript) remain distinct."""
        self.assertEqual(normalize_skill_name("React.js"), "React")
        self.assertEqual(normalize_skill_name("reactjs"), "React")
        self.assertEqual(normalize_skill_name("TailwindCSS"), "Tailwind CSS")
        self.assertEqual(normalize_skill_name("NodeJS"), "Node.js")

        # Distinct language checks
        self.assertEqual(normalize_skill_name("Java"), "Java")
        self.assertEqual(normalize_skill_name("JavaScript"), "JavaScript")

    def test_07_multi_page_resume(self):
        """Verify 2-page resume extraction and section parsing."""
        multi_page_pdf = create_synthetic_resume_pdf(pages_count=2)
        doc = extract_document_from_bytes(multi_page_pdf)
        self.assertEqual(doc.page_count, 2)
        quality = assess_extraction_quality(doc)
        self.assertEqual(quality.status, "GOOD")

    def test_08_end_to_end_pipeline_performance(self):
        """Verify entire deterministic pipeline executes in < 500ms on fast path."""
        pdf_bytes = create_synthetic_resume_pdf()
        start = time.perf_counter()
        
        doc = extract_document_from_bytes(pdf_bytes)
        quality = assess_extraction_quality(doc)
        raw = parse_deterministic_document(doc)
        norm = normalize_parsed_resume(raw)
        draft = validate_portfolio_draft(norm)
        
        total_ms = (time.perf_counter() - start) * 1000.0
        
        self.assertLess(total_ms, 500.0, f"Total pipeline took {total_ms:.1f}ms (target <500ms)")
        self.assertEqual(draft.profile.full_name, "Aarya Shah")
        self.assertGreater(len(draft.skills), 3)
        self.assertGreater(len(draft.projects), 0)


if __name__ == "__main__":
    unittest.main(verbosity=2)
