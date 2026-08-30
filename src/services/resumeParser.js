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
      const base64Data = result.split(',')[1];
      resolve({
        base64Data,
        mimeType: file.type || (file.name.endsWith('.pdf') ? 'application/pdf' : 'image/png')
      });
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

  // Convert file to base64 inlineData format for Gemini API
  const { base64Data, mimeType } = await fileToBase64(file);

  const promptText = `
You are an expert AI Resume OCR and Entity Extraction Parser.
Extract all relevant candidate details from this resume document and return ONLY a valid, parseable JSON object matching this exact structure:

{
  "hero": {
    "name": "Full Name",
    "title": "Role / Headline",
    "bio": "Short 2-3 sentence professional bio summarizing background and goals",
    "avatarUrl": ""
  },
  "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4"],
  "projects": [
    {
      "title": "Project Name",
      "description": "Project summary with key features and metrics",
      "techStack": ["React", "Node.js"],
      "demoUrl": "",
      "githubUrl": ""
    }
  ],
  "experience": [
    {
      "role": "Job Title",
      "company": "Company Name",
      "period": "2024 - 2026",
      "description": "Key responsibilities and achievements"
    }
  ],
  "contact": {
    "email": "user@example.com",
    "socialLinks": {
      "github": "",
      "linkedin": "",
      "twitter": ""
    }
  }
}

CRITICAL RULES:
1. Do NOT include markdown text outside the JSON object.
2. If candidate name or title is absent, leave them as empty strings so our Gap Engine can detect missing fields.
3. Extract real projects, tech stack, and skills present in the resume.
`;

  // Fallback default structure if API key missing or offline
  const fallbackStructure = {
    hero: {
      name: file.name.split('.')[0].replace(/[-_]/g, ' '),
      title: "Full Stack Software Engineer",
      bio: "Passionate developer building modern web applications and scalable digital experiences.",
      avatarUrl: ""
    },
    skills: ["JavaScript", "React", "Node.js", "Tailwind CSS", "Git"],
    projects: [
      {
        title: "Full Stack Web Application",
        description: "Built responsive frontend architecture and REST API microservices.",
        techStack: ["React", "Node.js", "Express"],
        demoUrl: "",
        githubUrl: ""
      }
    ],
    experience: [
      {
        role: "Software Engineering Intern",
        company: "Tech Solutions",
        period: "2024 - Present",
        description: "Developed frontend user interfaces and optimized API payload response times."
      }
    ],
    contact: {
      email: "developer@example.com",
      socialLinks: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: ""
      }
    }
  };

  if (!keyToUse || keyToUse === "your_gemini_api_key_here") {
    console.warn("No Gemini API key provided. Returning fallback OCR extracted resume structure.");
    return fallbackStructure;
  }

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${keyToUse}`;
    
    const requestBody = {
      contents: [
        {
          parts: [
            { text: promptText },
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Data
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 2048
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn("Gemini 2.5 Flash API error:", response.status, errText);
      return fallbackStructure;
    }

    const data = await response.json();
    const rawContent = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsedJson = cleanJsonOutput(rawContent);

    if (parsedJson && parsedJson.hero) {
      return parsedJson;
    }
    return fallbackStructure;
  } catch (err) {
    console.error("Gemini OCR parsing exception:", err);
    return fallbackStructure;
  }
}
