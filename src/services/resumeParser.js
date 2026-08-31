/**
 * StackFolio Resume Intelligence Client Service
 * Interfaces directly with the custom Python OCR Model API (FastAPI backend).
 * Sends uploaded PDF resume files to the Python OCR pipeline, parses the
 * resulting PortfolioDraft JSON payload, and converts it into StackFolio schema format.
 */

/**
 * Clean and parse JSON output from LLM/service response strings if needed.
 * Retained for backwards compatibility with ariaService and gapEngine.
 */
export function cleanJsonOutput(text) {
  if (!text) return null;
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim();
  }
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.warn('Failed to parse JSON output directly:', err, text);
    const startIdx = cleaned.indexOf('{');
    const endIdx = cleaned.lastIndexOf('}');
    if (startIdx !== -1 && endIdx !== -1) {
      try {
        return JSON.parse(cleaned.substring(startIdx, endIdx + 1));
      } catch (e) {
        console.error('Sub-string JSON parse error:', e);
      }
    }
    return null;
  }
}

/**
 * Adapter function: Transforms Python PortfolioDraft schema into
 * standard StackFolio parsedData object expected by gapEngine and Studio.
 *
 * @param {Object} draft - PortfolioDraft object returned by Python OCR API
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
    .map((s) => (typeof s === 'string' ? s : s.name || ''))
    .filter(Boolean);

  const formattedProjects = projects.map((p) => ({
    title: p.title || '',
    description: p.description || '',
    techStack: Array.isArray(p.technologies) ? p.technologies : [],
    demoUrl: p.live_url || '',
    githubUrl: p.github_url || ''
  }));

  const formattedExperiences = experiences.map((e) => {
    const dates = [e.start_date, e.end_date].filter(Boolean).join(' - ');
    return {
      role: e.role || '',
      company: e.company || '',
      period: dates || '',
      description: e.description || ''
    };
  });

  const formattedEducation = education.map((edu) => {
    const dates = [edu.start_year, edu.end_year].filter(Boolean).join(' - ');
    return {
      institution: edu.institution || '',
      degree: edu.degree || '',
      field: edu.field || '',
      period: dates || '',
      description: edu.description || ''
    };
  });

  return {
    hero: {
      name: profile.full_name || '',
      title: profile.headline || '',
      bio: profile.bio || '',
      avatarUrl: ''
    },
    skills: extractedSkills,
    projects: formattedProjects,
    experience: formattedExperiences,
    education: formattedEducation,
    contact: {
      email: profile.email || '',
      socialLinks: {
        github: profile.github_url || '',
        linkedin: profile.linkedin_url || '',
        twitter: ''
      }
    }
  };
}

/**
 * Primary Resume Extraction Function using Custom Python OCR Model API.
 *
 * @param {File} file - PDF Resume document file
 * @param {Object} [options] - Additional request options (signal, timeoutMs)
 * @returns {Promise<Object>} Standardized parsedData object
 */
export async function parseResumeWithOCR(file, options = {}) {
  const { signal: externalSignal, timeoutMs = 30000 } = options;

  if (!file) {
    throw new Error('No resume PDF file provided for extraction.');
  }

  // 1. Client-Side Format & Size Pre-Validation
  const filename = file.name || '';
  const isPdf = file.type === 'application/pdf' || filename.toLowerCase().endsWith('.pdf');

  if (!isPdf) {
    throw new Error('Invalid file format. The StackFolio OCR Engine supports PDF documents (.pdf).');
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File size exceeds 5MB limit. Please upload a smaller PDF resume.');
  }

  if (file.size === 0) {
    throw new Error('Uploaded PDF file is empty (0 bytes).');
  }

  // 2. Base URL resolution from environment configuration
  const rawApiUrl = import.meta.env.VITE_OCR_API_URL || 'http://localhost:8000';
  const ocrApiUrl = rawApiUrl.replace(/\/+$/, '');
  const endpoint = `${ocrApiUrl}/api/v1/resume/process`;

  // 3. Construct FormData payload
  const formData = new FormData();
  formData.append('file', file);

  // 4. Timeout and Abort Signal Setup
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  if (externalSignal) {
    if (externalSignal.aborted) {
      clearTimeout(timeoutId);
      throw new Error('OCR Parsing request canceled by user.');
    }
    externalSignal.addEventListener('abort', () => controller.abort());
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      let errorMessage = `OCR Model API Error (${res.status})`;
      try {
        const errorData = await res.json();
        if (typeof errorData.detail === 'string') {
          errorMessage = errorData.detail;
        } else if (Array.isArray(errorData.detail)) {
          errorMessage = errorData.detail.map((e) => e.msg || e.detail).join('; ');
        }
      } catch (e) {
        // Fallback to HTTP status text if non-JSON error
        errorMessage = res.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await res.json();

    if (!data || !data.success || !data.draft) {
      throw new Error('OCR API response structure is malformed or missing PortfolioDraft.');
    }

    // 5. Transform PortfolioDraft to standard StackFolio parsedData
    const parsedData = transformDraftToParsedData(data.draft);
    if (data.processing) {
      parsedData._processing = data.processing;
    }

    return parsedData;
  } catch (err) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      if (externalSignal?.aborted) {
        throw new Error('OCR Parsing request canceled by user.');
      }
      throw new Error(`OCR Parsing request timed out after ${timeoutMs / 1000}s.`);
    }

    // Check for network connection failures (service offline, CORS blocked, etc.)
    if (err.message.includes('Failed to fetch') || err.name === 'TypeError') {
      throw new Error(
        `Unable to connect to StackFolio OCR Model API at ${ocrApiUrl}. Please verify the Python API server is running.`
      );
    }

    throw err;
  }
}

/**
 * Backwards Compatibility Wrapper:
 * Redirects legacy calls from parseResumeWithGemini to parseResumeWithOCR.
 */
export async function parseResumeWithGemini(file, apiKey = null, options = {}) {
  console.warn('parseResumeWithGemini is deprecated for resume OCR. Forwarding request to Python parseResumeWithOCR pipeline.');
  return parseResumeWithOCR(file, options);
}
