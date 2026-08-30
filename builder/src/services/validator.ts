import { CanonicalPortfolio } from "../types/portfolio";

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  completenessScore: number;
}

export function validatePortfolio(portfolio: CanonicalPortfolio): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  let score = 0;

  // Essential identity
  if (!portfolio.full_name || portfolio.full_name.trim().length === 0) {
    warnings.push("Full Name is missing. A portfolio should have a personal name.");
  } else {
    score += 20;
  }

  if (!portfolio.headline || portfolio.headline.trim().length === 0) {
    warnings.push("Headline / Title is empty.");
  } else {
    score += 15;
  }

  if (!portfolio.bio || portfolio.bio.trim().length === 0) {
    warnings.push("Bio / Summary is empty.");
  } else {
    score += 10;
  }

  if (portfolio.email && !portfolio.email.includes("@")) {
    errors.push("Email address appears invalid.");
  } else if (portfolio.email) {
    score += 10;
  }

  // Skills
  if (!portfolio.skills || portfolio.skills.length === 0) {
    warnings.push("No skills listed.");
  } else {
    score += 15;
  }

  // Projects
  if (!portfolio.projects || portfolio.projects.length === 0) {
    warnings.push("No featured projects found.");
  } else {
    score += 15;
  }

  // Experience
  if (!portfolio.experiences || portfolio.experiences.length === 0) {
    warnings.push("No work experience added.");
  } else {
    score += 10;
  }

  // Education / Links
  if (portfolio.education && portfolio.education.length > 0) score += 5;
  if (portfolio.github_url || portfolio.linkedin_url) score += 5;

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    completenessScore: Math.min(100, score),
  };
}
