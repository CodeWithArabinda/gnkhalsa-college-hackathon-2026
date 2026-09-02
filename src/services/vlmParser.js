/**
 * StackFolio Vision-Language Model (VLM) Resume Intelligence Service
 * Pure client-side multimodal extraction pipeline powered by Gemini Flash Multimodal API.
 * Decommissions local Python backend/PyMuPDF server dependencies.
 */

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const SYSTEM_PROMPT = `
You are an expert Vision-Language Model (VLM) Resume Parser for StackFolio.
Analyze the provided document (PDF or image) and extract structured resume information.

Return ONLY a valid JSON object (no markdown formatting, no code blocks) matching this exact schema:
{
  "personal": {
    "name": "Full Candidate Name",
    "role": "Professional Headline / Primary Job Title",
    "bio": "Comprehensive bio summary or executive summary paragraph (at least 2-3 sentences)",
    "email": "candidate@example.com",
    "location": "City, Country",
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username"
  },
  "skills": ["Skill 1", "Skill 2", "Skill 3"],
  "projects": [
    {
      "title": "Project Name",
      "description": "Comprehensive project summary and key technical achievements",
      "techStack": ["React", "Node.js", "Python"],
      "link": "https://project-demo.com"
    }
  ],
  "experience": [
    {
      "company": "Company Name",
      "role": "Job Title",
      "duration": "Start Date - End Date (e.g. Jan 2022 - Present)",
      "highlights": ["Key achievement or responsibility 1", "Key achievement 2"]
    }
  ],
  "education": [
    {
      "institution": "University / College Name",
      "degree": "Degree Name (e.g. Bachelor of Science in Computer Science)",
      "year": "Graduation Period / Year (e.g. 2020 - 2024)"
    }
  ]
}
`;

/**
 * Helper to convert File/Blob into a clean base64 string without data URI prefix.
 * @param {File} file 
 * @returns {Promise<string>} Clean base64 string
 */
export async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        const base64 = result.includes(',') ? result.split(',')[1] : result;
        resolve(base64);
      } else {
        reject(new Error('Failed to read file as base64 string.'));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

/**
 * Clean and parse JSON output from LLM/VLM service response strings.
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
    const startIdx = cleaned.indexOf('{');
    const endIdx = cleaned.lastIndexOf('}');
    if (startIdx !== -1 && endIdx !== -1) {
      try {
        return JSON.parse(cleaned.substring(startIdx, endIdx + 1));
      } catch (e) {
        console.error('Sub-string JSON parse error in VLM response:', e);
      }
    }
    return null;
  }
}

/**
 * Direct Vision-Language Model Resume Extraction
 * Uses stable Gemini Flash Multimodal API endpoints with fast-fail timeout & transparent error reporting.
 *
 * @param {File} file - PDF document or image file
 * @param {string} [apiKey] - Optional Gemini API Key
 * @param {Object} [options] - Additional request options
 * @returns {Promise<Object>} Standardized StackFolio parsed data object
 */
export async function parseResumeWithVLM(file, apiKey = null, options = {}) {
  const keyToUse = apiKey || API_KEY || import.meta.env.VITE_GEMINI_API_KEY;

  // 1. Fast API Key Validation
  if (!keyToUse || keyToUse === 'your_gemini_api_key_here' || keyToUse.trim() === '') {
    throw new Error('VITE_GEMINI_API_KEY is missing. Please configure it in your .env / Vercel.');
  }

  if (!keyToUse.startsWith('AIzaSy')) {
    console.warn('Warning: VITE_GEMINI_API_KEY does not match standard Google API key format (AIzaSy...).');
  }

  if (!file) {
    throw new Error('VLM Extraction failed: No resume document file provided.');
  }

  // 2. File Format & Size Validation
  const fileName = file.name || '';
  const isPdf = file.type === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf');
  const isPng = file.type === 'image/png' || fileName.toLowerCase().endsWith('.png');
  const isJpeg = file.type === 'image/jpeg' || file.type === 'image/jpg' || fileName.toLowerCase().endsWith('.jpg') || fileName.toLowerCase().endsWith('.jpeg');

  let mimeType = file.type;
  if (!mimeType) {
    if (isPdf) mimeType = 'application/pdf';
    else if (isPng) mimeType = 'image/png';
    else if (isJpeg) mimeType = 'image/jpeg';
    else mimeType = 'application/octet-stream';
  }

  if (!isPdf && !isPng && !isJpeg && !file.type?.startsWith('image/')) {
    throw new Error('Invalid file format. StackFolio VLM Engine supports PDF documents (.pdf) and images (.png, .jpg).');
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error('File size exceeds 10MB limit. Please upload a smaller resume document.');
  }

  const base64Data = await fileToBase64(file);

  // 3. Public Stable Google Generative Language Model Endpoints (gemini-1.5-flash primary, gemini-2.0-flash secondary)
  const MODELS = ['gemini-1.5-flash', 'gemini-2.0-flash'];
  let lastError = null;

  for (const model of MODELS) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${keyToUse}`;
    
    // Strict 15-second per-request timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeoutMs || 15000);

    if (options.signal) {
      if (options.signal.aborted) {
        clearTimeout(timeoutId);
        throw new Error('Resume parsing canceled by user.');
      }
      options.signal.addEventListener('abort', () => controller.abort());
    }

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
                  text: SYSTEM_PROMPT
                }
              ]
            }
          ],
          generationConfig: {
            response_mime_type: 'application/json',
            temperature: 0.1
          }
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // 4. Transparent Error Handling for non-200 responses
      if (!res.ok) {
        let apiErrorMessage = `Google API Error (${res.status})`;
        try {
          const errJson = await res.json();
          if (errJson.error?.message) {
            apiErrorMessage = errJson.error.message;
          } else if (errJson.error?.status) {
            apiErrorMessage = errJson.error.status;
          }
          console.error(`Google Generative AI API Error [${model}]:`, errJson);
        } catch (e) {
          const rawErrText = await res.text();
          console.error(`Google Generative AI API Raw Error [${model}]:`, rawErrText);
          if (rawErrText) apiErrorMessage = rawErrText;
        }
        lastError = new Error(apiErrorMessage);
        continue;
      }

      const responseData = await res.json();
      const contentText = responseData.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!contentText) {
        console.warn(`VLM Model ${model} returned empty candidate content.`);
        lastError = new Error(`VLM Model ${model} returned empty response content.`);
        continue;
      }

      const parsedJson = cleanJsonOutput(contentText);
      if (!parsedJson) {
        throw new Error(`Failed to parse valid JSON payload from VLM ${model} response.`);
      }

      // Format payload ensuring both VLM schema and standard StackFolio schema fields exist
      const personal = parsedJson.personal || {};
      const skills = Array.isArray(parsedJson.skills) ? parsedJson.skills : [];
      const rawProjects = Array.isArray(parsedJson.projects) ? parsedJson.projects : [];
      const rawExperience = Array.isArray(parsedJson.experience) ? parsedJson.experience : [];
      const rawEducation = Array.isArray(parsedJson.education) ? parsedJson.education : [];

      const formattedProjects = rawProjects.map((p) => ({
        title: p.title || '',
        description: p.description || '',
        techStack: Array.isArray(p.techStack) ? p.techStack : Array.isArray(p.technologies) ? p.technologies : [],
        demoUrl: p.link || p.demoUrl || p.live_url || '',
        githubUrl: p.githubUrl || p.github_url || ''
      }));

      const formattedExperience = rawExperience.map((e) => {
        const highlightsText = Array.isArray(e.highlights)
          ? e.highlights.join('; ')
          : e.description || e.highlights || '';
        return {
          company: e.company || '',
          role: e.role || '',
          period: e.duration || e.period || '',
          description: highlightsText
        };
      });

      const formattedEducation = rawEducation.map((edu) => ({
        institution: edu.institution || '',
        degree: edu.degree || '',
        field: edu.field || '',
        period: edu.year || edu.period || '',
        description: edu.description || ''
      }));

      return {
        personal: {
          name: personal.name || '',
          role: personal.role || '',
          bio: personal.bio || '',
          email: personal.email || '',
          location: personal.location || '',
          github: personal.github || '',
          linkedin: personal.linkedin || ''
        },
        hero: {
          name: personal.name || parsedJson.hero?.name || '',
          title: personal.role || parsedJson.hero?.title || '',
          bio: personal.bio || parsedJson.hero?.bio || '',
          avatarUrl: ''
        },
        skills: skills,
        projects: formattedProjects,
        experience: formattedExperience,
        education: formattedEducation,
        contact: {
          email: personal.email || parsedJson.contact?.email || '',
          socialLinks: {
            github: personal.github || parsedJson.contact?.socialLinks?.github || '',
            linkedin: personal.linkedin || parsedJson.contact?.socialLinks?.linkedin || '',
            twitter: ''
          }
        }
      };
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        lastError = new Error(`Request timed out after 15s using ${model}.`);
      } else {
        lastError = err;
      }
      console.warn(`VLM Model ${model} extraction attempt failed:`, err);
    }
  }

  throw lastError || new Error('Vision-Language Model extraction failed. Please verify network connection and API key.');
}
