/**
 * Gemini 2.5 Flash Multimodal OCR Extraction Service
 * Converts uploaded PDF or Image resume files into Base64 format
 * and queries Gemini 2.5 Flash API to extract standardized JSON.
 */

/**
 * Convert File object to Base64 data string
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      const base64Data = result.includes(',') ? result.split(',')[1] : result;
      const mimeType = file.type || (file.name.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg');
      resolve({ base64Data, mimeType });
    };
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Clean and parse JSON output from Gemini response string
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
    console.warn('Failed to parse Gemini JSON output directly:', err, text);
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
 * Primary Gemini Multimodal OCR Extraction Function
 * @param {File} file - PDF, PNG, JPG, or JPEG file
 * @param {string} [apiKey] - Optional explicit Gemini API Key
 */
export async function parseResumeWithGemini(file, apiKey = null) {
  const keyToUse = apiKey || import.meta.env.VITE_GEMINI_API_KEY;
  if (!file) throw new Error('No resume file provided for OCR extraction.');

  // Convert file to base64 data format for Gemini API
  const { base64Data, mimeType } = await fileToBase64(file);

  const extractionPrompt = `You are a precision OCR and document intelligence engine.
Analyze this resume document image/PDF directly. 
Extract the EXACT candidate information written on the document text. 
DO NOT use the file name as the candidate's name.

Return ONLY a raw JSON object (no markdown fences) matching this structure:
{
  "hero": {
    "name": "Exact Name written at top of resume (e.g. SRIHARSH ADITYA)",
    "title": "Exact Role or Headline (e.g. Software Engineering Intern / Full Stack Developer)",
    "bio": "2-sentence professional bio synthesized from their experience",
    "avatarUrl": ""
  },
  "skills": ["Array of skills found, e.g. Node.js, ExpressJS, MongoDB, React, C++, JavaScript"],
  "projects": [
    {
      "title": "Exact Project Name (e.g. BUY-N-SELL)",
      "description": "Project summary with achievements",
      "techStack": ["NodeJS", "MongoDB", "ExpressJS"],
      "demoUrl": "",
      "githubUrl": ""
    }
  ],
  "experience": [
    {
      "role": "Exact Role (e.g. SOFTWARE ENGINEERING INTERN)",
      "company": "Exact Company (e.g. PUDLE)",
      "period": "FEB 2021 - PRESENT",
      "description": "Key bullet achievements"
    }
  ],
  "contact": {
    "email": "Email address from resume or ''",
    "socialLinks": {
      "github": "Github URL or username from resume",
      "linkedin": "Linkedin URL or username from resume",
      "twitter": ""
    }
  }
}`;

  if (!keyToUse || keyToUse === "your_gemini_api_key_here") {
    console.warn("No Gemini API key provided. Returning unpopulated structure for Gap Engine resolution.");
    return {
      hero: { name: "", title: "", bio: "", avatarUrl: "" },
      skills: [],
      projects: [],
      experience: [],
      contact: { email: "", socialLinks: { github: "", linkedin: "", twitter: "" } }
    };
  }

  const MODELS = ['gemini-3.6-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];

  const requestBody = {
    contents: [
      {
        parts: [
          { text: extractionPrompt },
          {
            inline_data: {
              mime_type: mimeType,
              data: base64Data,
            },
          },
        ],
      },
    ],
    generationConfig: {
      response_mime_type: "application/json",
      temperature: 0.1,
    },
  };

  let response = null;
  let lastError = null;

  for (const model of MODELS) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${keyToUse}`;
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      if (res.ok) {
        response = res;
        break;
      } else {
        const errText = await res.text();
        console.warn(`Gemini API Model ${model} returned ${res.status}:`, errText);
        lastError = `Gemini API Error (${res.status}): ${errText}`;
      }
    } catch (err) {
      console.warn(`Fetch error for model ${model}:`, err);
      lastError = err.message;
    }
  }

  if (!response) {
    throw new Error(lastError || "Failed to execute Gemini Multimodal OCR API request.");
  }

  if (!response.ok) {
    const errText = await response.text();
    console.error("Gemini 2.5 Flash API error:", response.status, errText);
    throw new Error(`Gemini Multimodal OCR Error (${response.status}): ${errText}`);
  }

  const result = await response.json();
  const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
  const parsed = cleanJsonOutput(rawText);

  if (!parsed || !parsed.hero) {
    throw new Error("Failed to parse valid candidate JSON from resume document OCR.");
  }

  return parsed;
}
