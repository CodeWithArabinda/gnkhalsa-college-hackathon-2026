/**
 * StackFolio Resume Intelligence Client Service
 * Dual-layer extraction pipeline:
 *  - Layer 1 (Primary): Custom Python OCR Model API (FastAPI backend with 5s timeout).
 *  - Layer 2 (Automatic Fallback): Direct Gemini Flash Multimodal Engine for Vercel/Production deployments.
 */

const OCR_API_URL = import.meta.env.VITE_OCR_API_URL || 'http://localhost:8000';
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * Clean and parse JSON output from LLM/service response strings.
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
 * Helper function to convert a File or Blob into base64 string for Gemini API
 */
async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      const base64 = typeof result === 'string' && result.includes(',')
        ? result.substring(result.indexOf(',') + 1)
        : result;
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

/**
 * Direct Gemini Multimodal Extraction (Fallback Layer)
 * Works directly in client applications without requiring the Python OCR server.
 */
export async function extractWithGeminiMultimodal(file, apiKey = null, options = {}) {
  const keyToUse = apiKey || GEMINI_KEY || import.meta.env.VITE_GEMINI_API_KEY;

  if (!keyToUse || keyToUse === 'your_gemini_api_key_here') {
    throw new Error('OCR Service is offline and VITE_GEMINI_API_KEY is not configured.');
  }

  const base64Data = await fileToBase64(file);
  const mimeType = file.type || (file.name?.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'application/octet-stream');

  const promptText = `
You are an expert Resume Parser for StackFolio.
Extract structured resume information from the provided document.

Return ONLY a valid JSON object (no markdown formatting, no code blocks) matching this exact schema:
{
  "hero": {
    "name": "Full Candidate Name",
    "title": "Professional Headline or Primary Job Title",
    "bio": "Comprehensive bio summary or executive summary paragraph",
    "avatarUrl": ""
  },
  "skills": ["Skill 1", "Skill 2", "Skill 3"],
  "projects": [
    {
      "title": "Project Name",
      "description": "Short project description and achievements",
      "techStack": ["Technology 1", "Technology 2"],
      "demoUrl": "",
      "githubUrl": ""
    }
  ],
  "experience": [
    {
      "role": "Job Role / Title",
      "company": "Company Name",
      "period": "Start Date - End Date",
      "description": "Responsibilities and key bullet points"
    }
  ],
  "education": [
    {
      "institution": "University / College Name",
      "degree": "Degree Earned",
      "field": "Field of Study / Major",
      "period": "Graduation Period",
      "description": ""
    }
  ],
  "contact": {
    "email": "email@example.com",
    "socialLinks": {
      "github": "https://github.com/...",
      "linkedin": "https://linkedin.com/in/...",
      "twitter": ""
    }
  }
}
`;

  const MODELS = ['gemini-3.6-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
  let lastError = null;

  for (const model of MODELS) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${keyToUse}`;
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: base64Data
                  }
                },
                {
                  text: promptText
                }
              ]
            }
          ],
          generationConfig: {
            response_mime_type: 'application/json',
            temperature: 0.1
          }
        })
      });

      if (res.ok) {
        const result = await res.json();
        const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const parsed = cleanJsonOutput(rawText);

        if (parsed) {
          if (parsed.profile || parsed.experiences) {
            return transformDraftToParsedData(parsed);
          }
          return {
            hero: {
              name: parsed.hero?.name || '',
              title: parsed.hero?.title || '',
              bio: parsed.hero?.bio || '',
              avatarUrl: parsed.hero?.avatarUrl || ''
            },
            skills: Array.isArray(parsed.skills) ? parsed.skills : [],
            projects: Array.isArray(parsed.projects) ? (parsed.projects.map(p => ({
              title: p.title || '',
              description: p.description || '',
              techStack: Array.isArray(p.techStack) ? p.techStack : Array.isArray(p.technologies) ? p.technologies : [],
              demoUrl: p.demoUrl || p.live_url || '',
              githubUrl: p.githubUrl || p.github_url || ''
            }))) : [],
            experience: Array.isArray(parsed.experience) ? (parsed.experience.map(e => ({
              role: e.role || '',
              company: e.company || '',
              period: e.period || '',
              description: e.description || ''
            }))) : [],
            education: Array.isArray(parsed.education) ? (parsed.education.map(edu => ({
              institution: edu.institution || '',
              degree: edu.degree || '',
              field: edu.field || '',
              period: edu.period || '',
              description: edu.description || ''
            }))) : [],
            contact: {
              email: parsed.contact?.email || '',
              socialLinks: {
                github: parsed.contact?.socialLinks?.github || '',
                linkedin: parsed.contact?.socialLinks?.linkedin || '',
                twitter: parsed.contact?.socialLinks?.twitter || ''
              }
            }
          };
        }
      } else {
        const errText = await res.text();
        console.warn(`Gemini Multimodal model ${model} HTTP ${res.status}:`, errText);
      }
    } catch (err) {
      lastError = err;
      console.warn(`Gemini Multimodal model ${model} error:`, err);
    }
  }

  throw new Error(
    lastError?.message || 'Gemini Multimodal extraction failed. Please check your network connection and API key.'
  );
}

/**
 * Primary Resume Extraction Function.
 * Dual-layer pipeline:
 *  - Layer 1 (Primary): Custom Python OCR Model API (FastAPI backend with 5s timeout).
 *  - Layer 2 (Automatic Fallback): Gemini Multimodal Engine (Gemini Flash).
 *
 * @param {File} file - PDF or Image Resume file
 * @param {Object} [options] - Request options
 * @returns {Promise<Object>} Standardized parsedData object
 */
export async function parseResumeWithOCR(file, options = {}) {
  const { signal: externalSignal, timeoutMs = 5000 } = options;

  if (!file) {
    throw new Error('No resume document provided for extraction.');
  }

  // Pre-validation
  const filename = file.name || '';
  const isPdf = file.type === 'application/pdf' || filename.toLowerCase().endsWith('.pdf');
  const isImage = file.type?.startsWith('image/');

  if (!isPdf && !isImage) {
    throw new Error('Invalid file format. The StackFolio OCR Engine supports PDF (.pdf) and image files.');
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error('File size exceeds 10MB limit. Please upload a smaller resume.');
  }

  if (file.size === 0) {
    throw new Error('Uploaded resume file is empty (0 bytes).');
  }

  // Layer 1: Attempt Custom Python OCR Model API (FastAPI backend with 5s timeout)
  try {
    const rawApiUrl = import.meta.env.VITE_OCR_API_URL || 'http://localhost:8000';
    const ocrApiUrl = rawApiUrl.replace(/\/+$/, '');

    const formData = new FormData();
    formData.append('file', file);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    if (externalSignal) {
      if (externalSignal.aborted) {
        clearTimeout(timeoutId);
        throw new Error('OCR Parsing request canceled by user.');
      }
      externalSignal.addEventListener('abort', () => controller.abort());
    }

    const endpoints = [
      `${ocrApiUrl}/api/v1/resume/process`,
      `${ocrApiUrl}/api/extract-resume`,
      `${ocrApiUrl}/extract-resume`
    ];

    let res = null;
    for (const endpoint of endpoints) {
      try {
        res = await fetch(endpoint, {
          method: 'POST',
          body: formData,
          signal: controller.signal
        });
        if (res && res.ok) break;
      } catch (e) {
        if (e.name === 'AbortError') throw e;
        break;
      }
    }

    clearTimeout(timeoutId);

    if (res && res.ok) {
      const data = await res.json();
      if (data) {
        if (data.draft) {
          const parsedData = transformDraftToParsedData(data.draft);
          if (data.processing) parsedData._processing = data.processing;
          return parsedData;
        } else if (data.hero || data.skills) {
          return data;
        }
      }
    }
  } catch (err) {
    console.warn("Python OCR service unreachable or timed out. Initiating Gemini Multimodal fallback...", err);
  }

  // Layer 2: Automatic Fallback to Gemini Flash Multimodal Engine
  const keyToUse = options.apiKey || GEMINI_KEY || import.meta.env.VITE_GEMINI_API_KEY;

  if (!keyToUse || keyToUse === 'your_gemini_api_key_here') {
    throw new Error("OCR Service is offline and VITE_GEMINI_API_KEY is not configured.");
  }

  return await extractWithGeminiMultimodal(file, keyToUse, options);
}

/**
 * Alias for parseResumeWithOCR
 */
export async function parseResumeDocument(file, options = {}) {
  return parseResumeWithOCR(file, options);
}

/**
 * Backward-compatible wrapper for Gemini extraction
 */
export async function parseResumeWithGemini(file, apiKey = null, options = {}) {
  return extractWithGeminiMultimodal(file, apiKey, options);
}
