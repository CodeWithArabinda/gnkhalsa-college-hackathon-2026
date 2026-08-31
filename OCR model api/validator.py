"""
Portfolio Draft Validator for StackFolio Resume Intelligence.
Ensures normalized resume data is strictly type-safe and compliant
with StackFolio PostgreSQL schemas and frontend React expectations.
"""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field, field_validator


class ProfileDraft(BaseModel):
    full_name: str = Field(default="", max_length=150)
    headline: str = Field(default="", max_length=250)
    bio: str = Field(default="", max_length=3000)
    location: str = Field(default="", max_length=150)
    email: str = Field(default="", max_length=150)
    github_url: str = Field(default="", max_length=255)
    linkedin_url: str = Field(default="", max_length=255)


class ExperienceDraft(BaseModel):
    company: str = Field(default="", max_length=150)
    role: str = Field(default="", max_length=150)
    start_date: str = Field(default="", max_length=50)
    end_date: str = Field(default="", max_length=50)
    description: str = Field(default="", max_length=2000)
    display_order: int = 0


class EducationDraft(BaseModel):
    institution: str = Field(default="", max_length=150)
    degree: str = Field(default="", max_length=150)
    field: str = Field(default="", max_length=150)
    start_year: str = Field(default="", max_length=50)
    end_year: str = Field(default="", max_length=50)
    description: str = Field(default="", max_length=2000)
    display_order: int = 0


class ProjectDraft(BaseModel):
    title: str = Field(default="", max_length=150)
    description: str = Field(default="", max_length=2000)
    technologies: List[str] = Field(default_factory=list)
    github_url: str = Field(default="", max_length=255)
    live_url: str = Field(default="", max_length=255)
    display_order: int = 0


class SkillDraft(BaseModel):
    name: str = Field(default="", max_length=100)
    category: str = Field(default="Technical", max_length=50)
    level: str = Field(default="Intermediate", max_length=50)
    display_order: int = 0


class AchievementDraft(BaseModel):
    title: str = Field(default="", max_length=200)
    issuer: str = Field(default="", max_length=150)
    date: str = Field(default="", max_length=50)
    description: str = Field(default="", max_length=1000)
    credential_url: str = Field(default="", max_length=255)
    display_order: int = 0


class PortfolioDraft(BaseModel):
    profile: ProfileDraft = Field(default_factory=ProfileDraft)
    experiences: List[ExperienceDraft] = Field(default_factory=list)
    education: List[EducationDraft] = Field(default_factory=list)
    projects: List[ProjectDraft] = Field(default_factory=list)
    skills: List[SkillDraft] = Field(default_factory=list)
    achievements: List[AchievementDraft] = Field(default_factory=list)


def validate_portfolio_draft(data: Dict[str, Any]) -> PortfolioDraft:
    """
    Validates dictionary payload into a validated PortfolioDraft model.
    Falls back gracefully on invalid sub-items without crashing the pipeline.
    """
    profile_data = data.get("profile", {})
    profile = ProfileDraft(**profile_data) if isinstance(profile_data, dict) else ProfileDraft()

    experiences: List[ExperienceDraft] = []
    for exp in data.get("experiences", []):
        try:
            if isinstance(exp, dict) and (exp.get("company") or exp.get("role")):
                experiences.append(ExperienceDraft(**exp))
        except Exception:
            continue

    education: List[EducationDraft] = []
    for edu in data.get("education", []):
        try:
            if isinstance(edu, dict) and (edu.get("institution") or edu.get("degree")):
                education.append(EducationDraft(**edu))
        except Exception:
            continue

    projects: List[ProjectDraft] = []
    for proj in data.get("projects", []):
        try:
            if isinstance(proj, dict) and proj.get("title"):
                projects.append(ProjectDraft(**proj))
        except Exception:
            continue

    skills: List[SkillDraft] = []
    for sk in data.get("skills", []):
        try:
            if isinstance(sk, dict) and sk.get("name"):
                skills.append(SkillDraft(**sk))
        except Exception:
            continue

    achievements: List[AchievementDraft] = []
    for ach in data.get("achievements", []):
        try:
            if isinstance(ach, dict) and ach.get("title"):
                achievements.append(AchievementDraft(**ach))
        except Exception:
            continue

    return PortfolioDraft(
        profile=profile,
        experiences=experiences,
        education=education,
        projects=projects,
        skills=skills,
        achievements=achievements
    )
