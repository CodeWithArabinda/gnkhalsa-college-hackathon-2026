/**
 * StackFolio Vision-Language Model (VLM) Resume Intelligence Service
 * Pure client-side multimodal extraction pipeline supporting OpenRouter Vision API (MiniMax M3 / Free Fallback)
 * with automatic fallback to Gemini Multimodal models.
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export const OPENROUTER_MODELS = [
  'minimax/minimax-01',
  'meta-llama/llama-3.2-11b-vision-instruct:free',
  'google/gemini-2.0-flash-lite-preview-02-05:free',
  'google/gemini-2.0-flash-exp:free',
  'qwen/qwen-2.5-vl-72b-instruct:free',
  'openrouter/auto'
];

export const GEMINI_MODELS = [
  'gemini-3.6-flash',
  'gemini-2.5-flash',
  'gemini-2.5-pro',
  'gemini-1.5-flash-latest'
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

Keep project and work experience descriptions concise (bullet points under 20 words each) to ensure rapid JSON streaming.
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
 * Format raw parsed JSON into standardized StackFolio schema payload
 */
function normalizeParsedResume(parsedJson) {
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
}

/**
 * Direct Vision-Language Model Resume Extraction
 * Primary Layer: OpenRouter OpenAI-Compatible Vision API (MiniMax M3 / Free Fallback)
 * Fallback Layer: Direct Gemini Multimodal API
 *
 * @param {File} file - PDF document or image file
 * @param {string} [apiKey] - Optional custom API Key
 * @param {Object} [options] - Additional request options
 * @returns {Promise<Object>} Standardized StackFolio parsed data object
 */
export async function parseResumeWithVLM(file, apiKey = null, options = {}) {
  console.time('vlm-parse');
  const openrouterKey = options.openrouterKey || OPENROUTER_API_KEY || import.meta.env.VITE_OPENROUTER_API_KEY;
  const geminiKey = apiKey || GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;

  if (!file) {
    throw new Error('VLM Extraction failed: No resume document file provided.');
  }

  // Pre-validation
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
  let lastError = null;

  // ----------------------------------------------------
  // Layer 1: OpenRouter Vision API (Completions Endpoint)
  // ----------------------------------------------------
  if (openrouterKey && openrouterKey !== 'your_openrouter_api_key_here' && openrouterKey.trim() !== '') {
    for (const model of OPENROUTER_MODELS) {
      const endpoint = 'https://openrouter.ai/api/v1/chat/completions';
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), options.timeoutMs || 60000);

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
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openrouterKey}`,
            'HTTP-Referer': 'https://gnkhalsa-hackathon-2026.vercel.app',
            'X-Title': 'StackFolio Resume Parser'
          },
          body: JSON.stringify({
            model: model,
            messages: [
              {
                role: 'user',
                content: [
                  {
                    type: 'image_url',
                    image_url: {
                      url: `data:${mimeType};base64,${base64Data}`
                    }
                  },
                  {
                    type: 'text',
                    text: SYSTEM_PROMPT
                  }
                ]
              }
            ],
            temperature: 0.1,
            max_tokens: 3000
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          let errText = `OpenRouter API Error (${res.status})`;
          try {
            const errJson = await res.json();
            errText = errJson.error?.message || errJson.error || errText;
          } catch (e) {
            // ignore JSON parse fail
          }
          console.warn(`OpenRouter model ${model} HTTP ${res.status}:`, errText);
          lastError = new Error(`OpenRouter [${model}]: ${errText}`);
          await sleep(500);
          continue;
        }

        const responseData = await res.json();
        const contentText = responseData.choices?.[0]?.message?.content || responseData.choices?.[0]?.text;

        if (!contentText) {
          console.warn(`OpenRouter model ${model} returned empty content.`);
          continue;
        }

        const parsedJson = cleanJsonOutput(contentText);
        if (parsedJson) {
          console.timeEnd('vlm-parse');
          return normalizeParsedResume(parsedJson);
        }
      } catch (err) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
          lastError = new Error(`OpenRouter request timed out after 60s using ${model}.`);
        } else {
          lastError = err;
        }
        console.warn(`OpenRouter model ${model} attempt failed:`, err);
      }
    }
  }

  // ----------------------------------------------------
  // Layer 2: Gemini Direct Multimodal API Fallback
  // ----------------------------------------------------
  if (geminiKey && geminiKey !== 'your_gemini_api_key_here' && geminiKey.trim() !== '') {
    for (const model of GEMINI_MODELS) {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), options.timeoutMs || 60000);

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
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': geminiKey
          },
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
              temperature: 0.1,
              maxOutputTokens: 3000,
              response_mime_type: 'application/json'
            }
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          let errText = `Gemini API Error (${res.status})`;
          try {
            const errJson = await res.json();
            errText = errJson.error?.message || errText;
          } catch (e) {}
          console.warn(`Gemini model ${model} HTTP ${res.status}:`, errText);
          lastError = new Error(`Gemini [${model}]: ${errText}`);
          if (res.status === 503 || res.status === 429) await sleep(1000);
          continue;
        }

        const responseData = await res.json();
        const contentText = responseData.candidates?.[0]?.content?.parts?.[0]?.text;

        if (contentText) {
          const parsedJson = cleanJsonOutput(contentText);
          if (parsedJson) {
            console.timeEnd('vlm-parse');
            return normalizeParsedResume(parsedJson);
          }
        }
      } catch (err) {
        clearTimeout(timeoutId);
        lastError = err;
        console.warn(`Gemini model ${model} attempt failed:`, err);
      }
    }
  }

  throw lastError || new Error('Vision-Language Model extraction failed across all OpenRouter and Gemini candidate endpoints. Please verify network connection and API key configuration.');
}
