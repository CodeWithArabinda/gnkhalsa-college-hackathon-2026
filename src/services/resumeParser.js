/**
 * StackFolio Resume Intelligence Client Gateway
 * Unified entry point routing resume document extraction through the client-side
 * Vision-Language Model (VLM) engine (Gemini Flash Multimodal API).
 * Decommissions local Python backend/PyMuPDF server dependencies.
 */

import { parseResumeWithVLM, cleanJsonOutput } from './vlmParser';

export { parseResumeWithVLM, cleanJsonOutput };

/**
 * Adapter function: Transforms Python PortfolioDraft schema into
 * standard StackFolio parsedData object expected by gapEngine and Studio.
 * Retained for backward compatibility.
 *
 * @param {Object} draft - PortfolioDraft object
 * @returns {Object} Standardized parsedData payload
 */
export function transformDraftToParsedData(draft) {
  if (!draft) return null;

  const profile = draft.profile || {};
  const experiences = Array.isArray(draft.experiences) ? draft.experiences : [];
  const education = Array.isArray(draft.education) ? draft.education : [];
  const projects = Array.isArray(draft.projects) ? draft.projects : [];
  const skills = Array.isArray(draft.skills) ? draft.skills : [];

  const extractedSkills = skills
    .map((s) => (typeof s === 'string' ? s : s?.name || ''))
    .filter(Boolean);

  const formattedProjects = projects.map((p) => ({
    title: p.title || '',
    description: p.description || '',
    techStack: Array.isArray(p.technologies) ? p.technologies : Array.isArray(p.techStack) ? p.techStack : [],
    demoUrl: p.live_url || p.demoUrl || '',
    githubUrl: p.github_url || p.githubUrl || ''
  }));

  const formattedExperiences = experiences.map((e) => {
    const dates = [e.start_date, e.end_date].filter(Boolean).join(' - ') || e.period || '';
    return {
      role: e.role || '',
      company: e.company || '',
      period: dates,
      description: e.description || ''
    };
  });

  const formattedEducation = education.map((edu) => {
    const dates = [edu.start_year, edu.end_year].filter(Boolean).join(' - ') || edu.period || '';
    return {
      institution: edu.institution || '',
      degree: edu.degree || '',
      field: edu.field || '',
      period: dates,
      description: edu.description || ''
    };
  });

  return {
    hero: {
      name: profile.full_name || profile.name || '',
      title: profile.headline || profile.title || '',
      bio: profile.bio || '',
      avatarUrl: profile.avatarUrl || ''
    },
    skills: extractedSkills,
    projects: formattedProjects,
    experience: formattedExperiences,
    education: formattedEducation,
    contact: {
      email: profile.email || '',
      socialLinks: {
        github: profile.github_url || profile.github || '',
        linkedin: profile.linkedin_url || profile.linkedin || '',
        twitter: profile.twitter || ''
      }
    }
  };
}

/**
 * Primary Resume Extraction Gateway Function.
 * Routes directly to the Vision-Language Model (VLM) parser.
 *
 * @param {File} file - PDF or Image Resume file
 * @param {Object} [options] - Request options
 * @returns {Promise<Object>} Standardized parsedData object
 */
export async function parseResumeWithOCR(file, options = {}) {
  const apiKey = options.apiKey || null;
  return parseResumeWithVLM(file, apiKey, options);
}

/**
 * Primary Resume Document Parser (Alias for parseResumeWithVLM)
 */
export async function parseResumeDocument(file, options = {}) {
  const apiKey = options.apiKey || null;
  return parseResumeWithVLM(file, apiKey, options);
}

/**
 * Backward-compatible wrapper for Gemini extraction
 */
export async function parseResumeWithGemini(file, apiKey = null, options = {}) {
  return parseResumeWithVLM(file, apiKey, options);
}
