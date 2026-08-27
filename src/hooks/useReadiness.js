import { useMemo } from 'react';

export function calculateReadiness(portfolio) {
  if (!portfolio) {
    return {
      score: 0,
      breakdown: {
        hasNameAndHeadline: false,
        hasBio: false,
        hasSocial: false,
        hasEducation: false,
        hasProjects: false,
        hasProjectLinks: false,
        hasSkills: false,
        hasAchievements: false,
        hasPhoto: false,
      },
      suggestions: [
        "Please create a profile and add your professional information."
      ]
    };
  }

  const {
    full_name = '',
    headline = '',
    bio = '',
    email = '',
    github_url = '',
    linkedin_url = '',
    profile_image_url = '',
    education = [],
    projects = [],
    skills = [],
    achievements = []
  } = portfolio;

  const breakdown = {
    hasNameAndHeadline: (full_name?.trim()?.length > 2) && (headline?.trim()?.length > 5),
    hasBio: bio?.trim()?.length >= 50,
    hasSocial: [email, github_url, linkedin_url].some(url => url?.trim()?.length > 0),
    hasEducation: education?.length >= 1,
    hasProjects: projects?.length >= 1,
    hasProjectLinks: projects?.length >= 1 && projects.some(p => (p.github_url?.trim()?.length > 0) || (p.live_url?.trim()?.length > 0)),
    hasSkills: skills?.length >= 5,
    hasAchievements: achievements?.length >= 1,
    hasPhoto: profile_image_url?.trim()?.length > 0,
  };

  let score = 0;
  const suggestions = [];

  if (breakdown.hasNameAndHeadline) {
    score += 10;
  } else {
    suggestions.push("Add a clear professional headline (e.g. Full-Stack Developer).");
  }

  if (breakdown.hasBio) {
    score += 10;
  } else {
    suggestions.push("Expand your bio to at least 50 characters to improve recruiter trust.");
  }

  if (breakdown.hasSocial) {
    score += 10;
  } else {
    suggestions.push("Add your GitHub or LinkedIn profile link.");
  }

  if (breakdown.hasEducation) {
    score += 10;
  } else {
    suggestions.push("Add your current university or college degree.");
  }

  if (breakdown.hasProjects) {
    score += 20;
  } else {
    suggestions.push("Add at least one project showcasing your practical abilities.");
  }

  if (breakdown.hasProjectLinks) {
    score += 15;
  } else {
    suggestions.push("Attach a GitHub repo or live demo link to your projects.");
  }

  if (breakdown.hasSkills) {
    score += 10;
  } else {
    suggestions.push("List at least 5 core technical or soft skills.");
  }

  if (breakdown.hasAchievements) {
    score += 10;
  } else {
    suggestions.push("Add an achievement, certificate, or academic honor.");
  }

  if (breakdown.hasPhoto) {
    score += 5;
  } else {
    suggestions.push("Upload a clear profile picture to personalize your page.");
  }

  return {
    score: Math.min(100, score),
    breakdown,
    suggestions
  };
}

export default function useReadiness(portfolio) {
  return useMemo(() => calculateReadiness(portfolio), [portfolio]);
}
