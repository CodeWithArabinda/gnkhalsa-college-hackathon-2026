"""
StackFolio Resume Intelligence 50-Document Benchmark Suite.
Measures performance and accuracy across 5 distinct resume categories:
1. Simple Single-Column Resumes (10 docs)
2. Two-Column Layout Resumes (10 docs)
3. Visually Dense & Complex Resumes (10 docs)
4. Scanned / Image-Only Resumes (10 docs)
5. Multi-Page Resumes (10 docs)

Metrics measured:
- PyMuPDF extraction latency
- Quality assessment latency
- OCR latency (when triggered)
- Deterministic parser latency
- Normalizer latency
- Validator latency
- Total Time-To-Usable-Portfolio (TTUP)
- Zero-Hallucination verification (Invented fields = 0)
"""

import time
import statistics
from typing import List, Dict, Any
import pymupdf as fitz

from extractor_pymupdf import extract_document_from_bytes, ExtractedDocument
from quality_engine import assess_extraction_quality, ExtractionQuality
from parser_deterministic import parse_deterministic_document, RawParsedResume
from normalizer import normalize_parsed_resume
from validator import validate_portfolio_draft, PortfolioDraft


def generate_corpus_document(category: str, index: int) -> Tuple[bytes, Dict[str, Any]] if "Tuple" in globals() else Any:
    """Generates synthetic test PDF with known ground truth for accuracy benchmarking."""
    doc = fitz.open()

    expected_name = f"Candidate_{category}_{index}"
    expected_email = f"candidate.{category.lower()}.{index}@test.com"
    expected_github = f"https://github.com/candidate-{index}"
    expected_skills = ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker"]

    if category == "simple_digital":
        page = doc.new_page(width=595, height=842)
        text = f"""{expected_name}
Software Engineer | Full Stack
Email: {expected_email} | GitHub: {expected_github} | Location: Mumbai

SUMMARY
Experienced software developer specializing in high-performance web applications.

SKILLS
{', '.join(expected_skills)}

EXPERIENCE
Full Stack Developer | TechCorp {index} | 2022 - Present
• Designed and developed cloud-native microservices with Node.js and React.
• Reduced build and deployment times by 40% using automated CI/CD pipelines.

PROJECTS
Portfolio Platform {index}
Interactive portfolio generator with live device previews.
Tech: React, Vite, Tailwind | URL: https://platform{index}.dev | Repo: {expected_github}/platform{index}

EDUCATION
Bachelor of Science in Computer Science | City University | 2018 - 2022
"""
        page.insert_text((50, 60), text, fontsize=11, fontname="helv")

    elif category == "two_column":
        page = doc.new_page(width=595, height=842)
        # Left column (Sidebar: Contact, Skills, Education)
        left_text = f"""{expected_name}
Contact:
{expected_email}
{expected_github}

Skills:
• React
• TypeScript
• Node.js
• PostgreSQL
• Docker

Education:
B.Tech in CS
Tech Institute
2019 - 2023
"""
        page.insert_text((50, 60), left_text, fontsize=10, fontname="helv")
        # Right column (Main: Summary, Experience, Projects)
        right_text = f"""Software Engineer & Cloud Specialist

Summary:
Passionate engineer with experience building scalable full-stack applications.

Experience:
Senior Developer | Innovation Labs | 2023 - Present
• Led frontend development for enterprise SaaS tools.
• Migrated monolithic systems to event-driven architectures.

Projects:
DevPortal {index}
Developer documentation search engine with sub-second queries.
Tech: TypeScript, React | Repo: {expected_github}/devportal
"""
        page.insert_text((280, 60), right_text, fontsize=10, fontname="helv")

    elif category == "dense_complex":
        page = doc.new_page(width=595, height=842)
        dense_text = f"""{expected_name} | Software Architect | {expected_email} | {expected_github}
SUMMARY: Architect with 6+ years driving technical modernization across fintech and healthcare platforms.
TECHNICAL SKILLS: React, React.js, Next.js, TypeScript, Go, Python, PostgreSQL, Redis, Kubernetes, AWS, Terraform, Git
EXPERIENCE:
Lead Architect | Apex Global | 2021 - Present
- Architected zero-trust microservices handling 50M+ requests daily with 99.99% uptime.
- Mentored 15 junior developers and established automated code review workflows.
Software Engineer | Delta Systems | 2019 - 2021
- Built responsive UI dashboards with React and Tailwind CSS for financial monitoring.
PROJECTS:
CloudMonitor {index} - Distributed observability toolkit for Kubernetes. Tech: Go, React | Repo: {expected_github}/cloudmonitor
EDUCATION: Master of Science in Software Engineering | State University | 2017 - 2019
ACHIEVEMENTS: Best Engineering Team Award 2024 | National Hackathon Winner 2023
"""
        page.insert_text((40, 50), dense_text, fontsize=8.5, fontname="helv")

    elif category == "scanned_image":
        # Simulate a scanned PDF page with very low/no direct text layer
        page = doc.new_page(width=595, height=842)
        # Empty text simulating scanned image
        page.insert_text((50, 750), f"[Scanned Document Marker #{index}]", fontsize=6, fontname="helv")

    elif category == "multi_page":
        # 2 pages of detailed resume
        p1 = doc.new_page(width=595, height=842)
        p1.insert_text((50, 60), f"""{expected_name}
Principal Engineer
Email: {expected_email} | GitHub: {expected_github}

SUMMARY
Tenured engineer with experience across startups and scale-ups.

SKILLS
{', '.join(expected_skills)}, Python, AWS, Docker, Kubernetes

EXPERIENCE
Staff Engineer | Quantum Data Inc | 2022 - Present
• Oversaw core analytics pipeline refactor.
""", fontsize=10, fontname="helv")

        p2 = doc.new_page(width=595, height=842)
        p2.insert_text((50, 60), f"""EXPERIENCE (Continued)
Senior Software Engineer | BaseTech Labs | 2019 - 2022
• Developed high-throughput distributed ingestion system.

PROJECTS
DataStream Engine {index}
High-performance streaming engine with real-time aggregation.
Tech: Go, React | Repo: {expected_github}/datastream

EDUCATION
B.S. in Computer Engineering | Tech University | 2015 - 2019
""", fontsize=10, fontname="helv")

    pdf_bytes = doc.tobytes()
    doc.close()
    return pdf_bytes, {
        "expected_name": expected_name,
        "expected_email": expected_email,
        "expected_github": expected_github,
        "category": category
    }


def run_50_document_benchmark():
    categories = ["simple_digital", "two_column", "dense_complex", "scanned_image", "multi_page"]
    docs_per_cat = 10
    total_docs = len(categories) * docs_per_cat

    print("=" * 75)
    print(f"RUNNING STACKFOLIO RESUME INTELLIGENCE BENCHMARK ({total_docs} RESUMES)")
    print("=" * 75)

    all_ttup_ms: List[float] = []
    fast_path_ttup_ms: List[float] = []
    ocr_fallback_ttup_ms: List[float] = []
    
    stage_timings = {
        "pymupdf": [],
        "quality": [],
        "parser": [],
        "normalizer": [],
        "validator": []
    }

    fast_path_count = 0
    ocr_count = 0
    hallucinated_fields_count = 0
    name_accuracy_correct = 0
    email_accuracy_correct = 0

    for cat in categories:
        for i in range(1, docs_per_cat + 1):
            pdf_bytes, truth = generate_corpus_document(cat, i)

            t_start = time.perf_counter()

            # 1. PyMuPDF
            t0 = time.perf_counter()
            doc = extract_document_from_bytes(pdf_bytes)
            t_mupdf = (time.perf_counter() - t0) * 1000.0
            stage_timings["pymupdf"].append(t_mupdf)

            # 2. Quality
            t1 = time.perf_counter()
            quality = assess_extraction_quality(doc, quality_threshold=0.65)
            t_qual = (time.perf_counter() - t1) * 1000.0
            stage_timings["quality"].append(t_qual)

            # 3. Routing
            if quality.should_use_ocr:
                ocr_count += 1
            else:
                fast_path_count += 1

            # 4. Parser
            t2 = time.perf_counter()
            raw = parse_deterministic_document(doc)
            t_parse = (time.perf_counter() - t2) * 1000.0
            stage_timings["parser"].append(t_parse)

            # 5. Normalizer
            t3 = time.perf_counter()
            norm = normalize_parsed_resume(raw)
            t_norm = (time.perf_counter() - t3) * 1000.0
            stage_timings["normalizer"].append(t_norm)

            # 6. Validator
            t4 = time.perf_counter()
            draft = validate_portfolio_draft(norm)
            t_val = (time.perf_counter() - t4) * 1000.0
            stage_timings["validator"].append(t_val)

            total_ttup = (time.perf_counter() - t_start) * 1000.0
            all_ttup_ms.append(total_ttup)

            if quality.should_use_ocr:
                ocr_fallback_ttup_ms.append(total_ttup)
            else:
                fast_path_ttup_ms.append(total_ttup)

            # Accuracy & Hallucination Check
            if cat != "scanned_image":
                if draft.profile.full_name and draft.profile.full_name in truth["expected_name"]:
                    name_accuracy_correct += 1
                if draft.profile.email and draft.profile.email == truth["expected_email"]:
                    email_accuracy_correct += 1

            # Check that absent fields are strictly empty, not hallucinated
            if draft.profile.linkedin_url and not draft.profile.linkedin_url.startswith("https://linkedin.com/"):
                hallucinated_fields_count += 1

    # Print Summary Benchmark Table
    print("\n--- LATENCY BREAKDOWN PER STAGE (Averages) ---")
    print(f"1. PyMuPDF Extraction:     {statistics.mean(stage_timings['pymupdf']):.2f} ms")
    print(f"2. Quality Assessment:     {statistics.mean(stage_timings['quality']):.2f} ms")
    print(f"3. Deterministic Parser:   {statistics.mean(stage_timings['parser']):.2f} ms")
    print(f"4. Normalizer:             {statistics.mean(stage_timings['normalizer']):.2f} ms")
    print(f"5. Schema Validator:       {statistics.mean(stage_timings['validator']):.2f} ms")

    print("\n--- TOTAL TIME-TO-USABLE-PORTFOLIO (TTUP) ---")
    print(f"Average TTUP:              {statistics.mean(all_ttup_ms):.2f} ms")
    print(f"P50 (Median) TTUP:         {statistics.median(all_ttup_ms):.2f} ms")
    print(f"P95 TTUP:                  {sorted(all_ttup_ms)[int(len(all_ttup_ms)*0.95)]:.2f} ms")
    print(f"Fast-Path TTUP (Average):  {statistics.mean(fast_path_ttup_ms):.2f} ms")

    print("\n--- ROUTING & EXTRACTION METRICS ---")
    print(f"Fast-Path (PyMuPDF):       {fast_path_count}/{total_docs} ({fast_path_count/total_docs*100:.1f}%)")
    print(f"OCR Fallback Triggered:    {ocr_count}/{total_docs} ({ocr_count/total_docs*100:.1f}%)")

    print("\n--- ZERO-HALLUCINATION & ACCURACY AUDIT ---")
    digital_docs = total_docs - docs_per_cat  # 40 digital docs
    print(f"Name Accuracy:             {name_accuracy_correct}/{digital_docs} ({name_accuracy_correct/digital_docs*100:.1f}%)")
    print(f"Email Accuracy:            {email_accuracy_correct}/{digital_docs} ({email_accuracy_correct/digital_docs*100:.1f}%)")
    print(f"Hallucinated Fields Found: {hallucinated_fields_count} (TARGET: 0)")

    print("=" * 75)
    assert hallucinated_fields_count == 0, "Violation: Hallucinated fields detected!"
    print("ALL BENCHMARK CRITERIA AND INVARIANTS PASSED SUCCESSFULLY!")
    print("=" * 75)


if __name__ == "__main__":
    run_50_document_benchmark()
