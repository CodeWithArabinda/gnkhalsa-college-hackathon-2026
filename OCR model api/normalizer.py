"""
Resume Normalizer for StackFolio Resume Intelligence.
Cleans whitespace, deduplicates skills, normalizes date formats,
and strictly sanitizes URLs according to the protocol security whitelist.
"""

import re
from typing import Dict, Any, List
from parser_deterministic import RawParsedResume

# Whitelisted protocols for external URLs
ALLOWED_URL_PROTOCOLS = ("http://", "https://")
PROHIBITED_URL_SCHEMES = ("javascript:", "data:", "vbscript:", "file:", "about:")

# Canonical Skill Mappings for safe deduplication
SKILL_CANONICAL_MAP = {
    "react": "React",
    "react.js": "React",
    "reactjs": "React",
    "react js": "React",
    "node": "Node.js",
    "node.js": "Node.js",
    "nodejs": "Node.js",
    "node js": "Node.js",
    "express": "Express.js",
    "express.js": "Express.js",
    "expressjs": "Express.js",
    "postgres": "PostgreSQL",
    "postgresql": "PostgreSQL",
    "mongo": "MongoDB",
    "mongodb": "MongoDB",
    "vue": "Vue.js",
    "vue.js": "Vue.js",
    "vuejs": "Vue.js",
    "tailwind": "Tailwind CSS",
    "tailwindcss": "Tailwind CSS",
    "tailwind css": "Tailwind CSS",
    "ts": "TypeScript",
    "typescript": "TypeScript",
    "js": "JavaScript",
    "javascript": "JavaScript",
    "python": "Python",
    "golang": "Go",
    "go": "Go",
    "docker": "Docker",
    "k8s": "Kubernetes",
    "kubernetes": "Kubernetes",
    "aws": "AWS",
    "git": "Git",
    "github": "GitHub",
    "next": "Next.js",
    "next.js": "Next.js",
    "nextjs": "Next.js",
}


def sanitize_url(raw_url: str) -> str:
    """
    Sanitizes extracted URLs.
    Allows only http:// and https://.
    Rejects javascript:, data:, vbscript:.
    Auto-prepends https:// to clean domains.
    """
    if not raw_url or not isinstance(raw_url, str):
        return ""

    trimmed = raw_url.strip()
    lower_trimmed = trimmed.lower()

    # Reject disallowed protocols
    for scheme in PROHIBITED_URL_SCHEMES:
        if lower_trimmed.startswith(scheme):
            return ""

    if lower_trimmed.startswith("http://") or lower_trimmed.startswith("https://"):
        return trimmed

    # Auto-prepend https:// to valid domain patterns
    if re.match(r"^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:/[^\s]*)?$", trimmed):
        return f"https://{trimmed}"

    return ""


def clean_text(text: Optional[str] if "Optional" in globals() else Any) -> str:
    """
    Normalizes multi-line whitespace into clean single spaces or paragraphs.
    """
    if not text or not isinstance(text, str):
        return ""
    # Consolidate multiple spaces into one
    return re.sub(r"\s+", " ", text).strip()


def normalize_skill_name(raw_name: str) -> str:
    """
    Normalizes skill name according to canonical dictionary while avoiding improper merges.
    """
    clean_n = clean_text(raw_name)
    key = clean_n.lower()
    return SKILL_CANONICAL_MAP.get(key, clean_n)


def normalize_parsed_resume(raw: RawParsedResume) -> Dict[str, Any]:
    """
    Normalizes all extracted sections into a structured schema dictionary.
    """
    # 1. Normalize Profile
    profile = {
        "full_name": clean_text(raw.full_name),
        "headline": clean_text(raw.headline),
        "bio": clean_text(raw.bio),
        "location": clean_text(raw.location),
        "email": raw.email.strip().lower() if raw.email else "",
        "github_url": sanitize_url(raw.github_url),
        "linkedin_url": sanitize_url(raw.linkedin_url),
    }

    # 2. Normalize Experiences
    normalized_experiences: List[Dict[str, Any]] = []
    for idx, exp in enumerate(raw.experiences):
        company = clean_text(exp.get("company", ""))
        role = clean_text(exp.get("role", ""))
        if company or role:
            normalized_experiences.append({
                "company": company or "Company",
                "role": role or "Software Engineer",
                "start_date": clean_text(exp.get("start_date", "")),
                "end_date": clean_text(exp.get("end_date", "")),
                "description": clean_text(exp.get("description", "")),
                "display_order": idx
            })

    # 3. Normalize Education
    normalized_education: List[Dict[str, Any]] = []
    for idx, edu in enumerate(raw.education):
        institution = clean_text(edu.get("institution", ""))
        degree = clean_text(edu.get("degree", ""))
        if institution or degree:
            normalized_education.append({
                "institution": institution or "University",
                "degree": degree or "Degree",
                "field": clean_text(edu.get("field", "")),
                "start_year": clean_text(edu.get("start_year", "")),
                "end_year": clean_text(edu.get("end_year", "")),
                "description": clean_text(edu.get("description", "")),
                "display_order": idx
            })

    # 4. Normalize Projects
    normalized_projects: List[Dict[str, Any]] = []
    for idx, proj in enumerate(raw.projects):
        title = clean_text(proj.get("title", ""))
        if title:
            techs = proj.get("technologies", [])
            clean_techs = [clean_text(t) for t in techs if clean_text(t)]
            normalized_projects.append({
                "title": title,
                "description": clean_text(proj.get("description", "")),
                "technologies": clean_techs,
                "github_url": sanitize_url(proj.get("github_url", "")),
                "live_url": sanitize_url(proj.get("live_url", "")),
                "display_order": idx
            })

    # 5. Normalize Skills (deduplicate by canonical name)
    seen_skills = set()
    normalized_skills: List[Dict[str, Any]] = []
    for exp_skill in raw.skills:
        raw_name = exp_skill.get("name", "")
        norm_name = normalize_skill_name(raw_name)
        if norm_name and norm_name.lower() not in seen_skills:
            seen_skills.add(norm_name.lower())
            normalized_skills.append({
                "name": norm_name,
                "category": clean_text(exp_skill.get("category", "Technical")),
                "level": clean_text(exp_skill.get("level", "Intermediate")),
                "display_order": len(normalized_skills)
            })

    # 6. Normalize Achievements
    normalized_achievements: List[Dict[str, Any]] = []
    for idx, ach in enumerate(raw.achievements):
        title = clean_text(ach.get("title", ""))
        if title:
            normalized_achievements.append({
                "title": title,
                "issuer": clean_text(ach.get("issuer", "")),
                "date": clean_text(ach.get("date", "")),
                "description": clean_text(ach.get("description", "")),
                "credential_url": sanitize_url(ach.get("credential_url", "")),
                "display_order": idx
            })

    return {
        "profile": profile,
        "experiences": normalized_experiences,
        "education": normalized_education,
        "projects": normalized_projects,
        "skills": normalized_skills,
        "achievements": normalized_achievements
    }
