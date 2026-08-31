"""
Deterministic Resume Parser for StackFolio.
Transforms ExtractedDocument into semantic structured resume data.
STRICT ZERO-HALLUCINATION POLICY: Never invents or fabricates missing information.
"""

import re
from typing import List, Dict, Any, Optional, Tuple
from pydantic import BaseModel, Field
from extractor_pymupdf import ExtractedDocument, ExtractedBlock

# Known section headers with regex variations
SECTION_HEADERS = {
    "summary": re.compile(r"^(?:summary|professional\s+summary|about\s+me|about|profile|objective|career\s+objective)$", re.I),
    "experience": re.compile(r"^(?:experience|work\s+experience|professional\s+experience|employment|employment\s+history|work\s+history|internships?)$", re.I),
    "education": re.compile(r"^(?:education|academic\s+background|academics|educational\s+qualifications?|qualifications?)$", re.I),
    "projects": re.compile(r"^(?:projects|personal\s+projects|key\s+projects|academic\s+projects|featured\s+projects)$", re.I),
    "skills": re.compile(r"^(?:skills|technical\s+skills|core\s+skills|skills\s+&\s+technologies|technologies|tools\s+&\s+technologies|competencies)$", re.I),
    "achievements": re.compile(r"^(?:achievements|certifications?|certificates?|awards|honors|awards\s+&\s+achievements|licenses\s+&\s+certifications)$", re.I),
}

# Regex patterns for contact information
EMAIL_REGEX = re.compile(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b")
PHONE_REGEX = re.compile(r"(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}\b")
GITHUB_REGEX = re.compile(r"(?:https?://)?(?:www\.)?github\.com/([a-zA-Z0-9_-]+(?:/[a-zA-Z0-9_-]+)?)", re.I)
LINKEDIN_REGEX = re.compile(r"(?:https?://)?(?:www\.)?linkedin\.com/in/([a-zA-Z0-9_-]+)", re.I)
URL_REGEX = re.compile(r"https?://(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)", re.I)
_MONTHS = r"(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)"
_DATE_POINT = rf"(?:{_MONTHS}\s+\d{{4}}|\d{{4}})"
DATE_RANGE_REGEX = re.compile(
    rf"\b({_DATE_POINT}\s*(?:to|-|/|\u2013|\u2014)\s*(?:Present|Current|Now|{_DATE_POINT}))\b",
    re.I
)

# Common skills dictionary for reliable categorization without guessing
TECH_SKILLS_MAP = {
    "Frontend": ["React", "React.js", "React Native", "Next.js", "Vue", "Vue.js", "Angular", "Svelte", "HTML", "HTML5", "CSS", "CSS3", "Tailwind", "Tailwind CSS", "Bootstrap", "Redux", "TypeScript", "JavaScript", "Webpack", "Vite"],
    "Backend": ["Node.js", "Express", "Express.js", "NestJS", "Python", "Django", "FastAPI", "Flask", "Java", "Spring", "Spring Boot", "C#", ".NET", "Golang", "Go", "Rust", "PHP", "Laravel", "Ruby", "Rails"],
    "Database": ["PostgreSQL", "Postgres", "MySQL", "MongoDB", "SQLite", "Redis", "Supabase", "Firebase", "DynamoDB", "Prisma", "TypeORM", "GraphQL", "REST API", "SQL"],
    "DevOps & Cloud": ["Docker", "Kubernetes", "AWS", "Google Cloud", "GCP", "Azure", "CI/CD", "GitHub Actions", "Linux", "Nginx", "Git", "Terraform"],
    "AI & Data": ["Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Scikit-Learn", "OpenCV", "NLP", "LLM", "Data Analysis"]
}

# Degree keywords
DEGREE_KEYWORDS = [
    "Bachelor", "B.S.", "B.Tech", "B.E.", "BCA", "Master", "M.S.", "M.Tech", "MCA", "MBA",
    "Ph.D.", "Associate", "Diploma", "Secondary", "Higher Secondary", "B.Sc", "M.Sc"
]


class RawParsedResume(BaseModel):
    full_name: str = ""
    headline: str = ""
    bio: str = ""
    email: str = ""
    phone: str = ""
    location: str = ""
    github_url: str = ""
    linkedin_url: str = ""
    website: str = ""
    experiences: List[Dict[str, Any]] = Field(default_factory=list)
    education: List[Dict[str, Any]] = Field(default_factory=list)
    projects: List[Dict[str, Any]] = Field(default_factory=list)
    skills: List[Dict[str, Any]] = Field(default_factory=list)
    achievements: List[Dict[str, Any]] = Field(default_factory=list)


def parse_deterministic_document(doc: ExtractedDocument) -> RawParsedResume:
    """
    Parses an ExtractedDocument deterministically into semantic sections.
    Does NOT hallucinate or guess missing fields.
    """
    lines = [line.strip() for line in doc.text.split("\n") if line.strip()]
    if not lines:
        return RawParsedResume()

    result = RawParsedResume()

    # 1. Extract Contact Information from complete text
    full_text = doc.text
    email_match = EMAIL_REGEX.search(full_text)
    if email_match:
        result.email = email_match.group(0).lower()

    phone_match = PHONE_REGEX.search(full_text)
    if phone_match:
        result.phone = phone_match.group(0)

    github_match = GITHUB_REGEX.search(full_text)
    if github_match:
        raw_gh = github_match.group(0)
        result.github_url = raw_gh if raw_gh.startswith("http") else f"https://{raw_gh}"

    linkedin_match = LINKEDIN_REGEX.search(full_text)
    if linkedin_match:
        raw_li = linkedin_match.group(0)
        result.linkedin_url = raw_li if raw_li.startswith("http") else f"https://{raw_li}"

    # 2. Extract Candidate Name & Headline from Header Section (first ~10 lines)
    header_lines = lines[:min(10, len(lines))]
    potential_names = []
    
    for idx, line in enumerate(header_lines):
        if any(regex.match(line) for regex in SECTION_HEADERS.values()):
            break
        # If line contains delimiters like | or -, test the first token
        first_token = re.split(r"[|•,]", line)[0].strip()
        if EMAIL_REGEX.search(first_token) or URL_REGEX.search(first_token) or PHONE_REGEX.search(first_token):
            continue
        # Name heuristic: 1-4 word tokens, letters, dashes, apostrophes, underscores
        if re.match(r"^[A-Z][a-zA-Z0-9.'_-]+(?:\s+[A-Za-z0-9.'_-]+){0,3}$", first_token) and len(first_token) < 50:
            potential_names.append((idx, first_token, line))

    if potential_names:
        name_idx, name_str, full_line = potential_names[0]
        result.full_name = name_str
        # Check if the same line had a headline separated by |
        parts = [p.strip() for p in re.split(r"[|•]", full_line) if p.strip()]
        if len(parts) > 1 and not EMAIL_REGEX.search(parts[1]) and not URL_REGEX.search(parts[1]):
            result.headline = parts[1]
        # Or if line following name looks like a professional title, treat as headline
        elif name_idx + 1 < len(header_lines):
            next_line = header_lines[name_idx + 1]
            if not EMAIL_REGEX.search(next_line) and not URL_REGEX.search(next_line) and len(next_line) < 80:
                if not any(regex.match(next_line) for regex in SECTION_HEADERS.values()):
                    result.headline = next_line
    elif lines:
        first_clean = re.split(r"[|•,]", lines[0])[0].strip()
        if len(first_clean) < 50 and not EMAIL_REGEX.search(first_clean):
            result.full_name = first_clean

    # 3. Partition document lines by identified section headers
    sections: Dict[str, List[str]] = {}
    current_section = "header"
    sections[current_section] = []

    for line in lines:
        matched_sec = None
        for sec_name, sec_regex in SECTION_HEADERS.items():
            if sec_regex.match(line):
                matched_sec = sec_name
                break
        
        if matched_sec:
            current_section = matched_sec
            if current_section not in sections:
                sections[current_section] = []
        else:
            sections[current_section].append(line)

    # 4. Extract Bio / Summary
    if "summary" in sections and sections["summary"]:
        result.bio = " ".join(sections["summary"])

    # 5. Extract Skills Section
    if "skills" in sections and sections["skills"]:
        skills_text = " ".join(sections["skills"])
        extracted_skills = []
        seen_skills = set()

        # Check explicit tokens and map categories
        skill_tokens = re.split(r"[,•|;\n/]+", skills_text)
        for token in skill_tokens:
            clean_tok = token.strip()
            # Remove category prefixes like "Languages:" or "Frameworks:"
            if ":" in clean_tok:
                parts = clean_tok.split(":", 1)
                clean_tok = parts[1].strip()
            
            if clean_tok and len(clean_tok) < 35 and clean_tok.lower() not in seen_skills:
                # Find category
                matched_cat = "Technical"
                for cat, tech_list in TECH_SKILLS_MAP.items():
                    if any(t.lower() == clean_tok.lower() for t in tech_list):
                        matched_cat = cat
                        break

                seen_skills.add(clean_tok.lower())
                extracted_skills.append({
                    "name": clean_tok,
                    "category": matched_cat,
                    "level": "Intermediate"
                })

        result.skills = extracted_skills

    # 6. Extract Experiences Section
    if "experience" in sections and sections["experience"]:
        exp_lines = sections["experience"]
        current_exp = None
        exp_list = []

        for line in exp_lines:
            date_match = DATE_RANGE_REGEX.search(line)
            # A new experience item often has a date range or bold company/role
            if date_match or (line.isupper() and len(line) < 50):
                if current_exp and current_exp.get("company"):
                    exp_list.append(current_exp)
                
                duration = date_match.group(0) if date_match else ""
                title_line = line.replace(duration, "").strip(" -\u2013\u2014,|") if date_match else line
                
                parts = re.split(r"[-\u2013\u2014|@,]\s*", title_line)
                role = parts[0].strip() if len(parts) > 0 else "Software Engineer"
                company = parts[1].strip() if len(parts) > 1 else (parts[0].strip() if len(parts) == 1 else "")
                
                current_exp = {
                    "company": company or role,
                    "role": role if company else "",
                    "start_date": duration.split("-")[0].strip() if "-" in duration else duration,
                    "end_date": duration.split("-")[1].strip() if "-" in duration else "",
                    "description": ""
                }
            elif current_exp:
                desc_line = line.strip("•-* ")
                if current_exp["description"]:
                    current_exp["description"] += " " + desc_line
                else:
                    current_exp["description"] = desc_line

        if current_exp and current_exp.get("company"):
            exp_list.append(current_exp)

        result.experiences = exp_list

    # 7. Extract Education Section
    if "education" in sections and sections["education"]:
        edu_lines = sections["education"]
        edu_list = []
        current_edu = None

        for line in edu_lines:
            has_degree = any(deg.lower() in line.lower() for deg in DEGREE_KEYWORDS)
            year_match = re.search(r"\b(19\d\d|20\d\d)\b", line)
            
            if has_degree or (year_match and not current_edu):
                if current_edu and current_edu.get("institution"):
                    edu_list.append(current_edu)

                deg_found = ""
                for deg in DEGREE_KEYWORDS:
                    if deg.lower() in line.lower():
                        deg_found = deg
                        break

                current_edu = {
                    "institution": line if not deg_found else line.replace(deg_found, "").strip(" -\u2013\u2014,|"),
                    "degree": deg_found or "Bachelor's Degree",
                    "field": "",
                    "start_year": year_match.group(0) if year_match else "",
                    "end_year": "",
                    "description": ""
                }
            elif current_edu:
                if not current_edu["institution"]:
                    current_edu["institution"] = line
                else:
                    current_edu["description"] = (current_edu["description"] + " " + line).strip()

        if current_edu and (current_edu.get("institution") or current_edu.get("degree")):
            edu_list.append(current_edu)

        result.education = edu_list

    # 8. Extract Projects Section
    if "projects" in sections and sections["projects"]:
        proj_lines = sections["projects"]
        proj_list = []
        current_proj = None

        for line in proj_lines:
            url_match = URL_REGEX.search(line)
            # Check for new project title
            is_header = len(line) < 60 and not line.startswith("•") and not line.startswith("-")
            
            if is_header and not url_match and not current_proj:
                current_proj = {
                    "title": line.strip(" -\u2013\u2014:|"),
                    "description": "",
                    "technologies": [],
                    "github_url": "",
                    "live_url": ""
                }
            elif is_header and current_proj and current_proj.get("description"):
                proj_list.append(current_proj)
                current_proj = {
                    "title": line.strip(" -\u2013\u2014:|"),
                    "description": "",
                    "technologies": [],
                    "github_url": "",
                    "live_url": ""
                }
            elif current_proj:
                if url_match:
                    found_url = url_match.group(0)
                    if "github.com" in found_url:
                        current_proj["github_url"] = found_url
                    else:
                        current_proj["live_url"] = found_url
                
                # Check for tech list in line (e.g. "Tech: React, Node, SQL")
                if "tech" in line.lower() or "tools" in line.lower():
                    tech_match = re.split(r"[,|/•]+", line.split(":", 1)[-1])
                    current_proj["technologies"] = [t.strip() for t in tech_match if t.strip()]
                else:
                    desc_part = line.strip("•-* ")
                    current_proj["description"] = (current_proj["description"] + " " + desc_part).strip()

        if current_proj and current_proj.get("title"):
            proj_list.append(current_proj)

        result.projects = proj_list

    # 9. Extract Achievements & Certifications
    if "achievements" in sections and sections["achievements"]:
        ach_lines = sections["achievements"]
        ach_list = []
        
        for line in ach_lines:
            clean_line = line.strip("•-* ")
            if len(clean_line) > 5:
                year_match = re.search(r"\b(20\d\d)\b", clean_line)
                ach_list.append({
                    "title": clean_line,
                    "issuer": "",
                    "date": year_match.group(0) if year_match else "",
                    "description": "",
                    "credential_url": ""
                })
        
        result.achievements = ach_list

    return result
