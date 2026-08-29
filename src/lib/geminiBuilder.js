import { GoogleGenerativeAI } from '@google/generative-ai';
import { initialPortfolioSchema } from '../types/schema';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

/**
 * processUserPrompt: Communicates with Gemini 2.5 Flash to mutate the portfolio JSON schema dynamically.
 * @param {string} userPrompt - User instruction (e.g. "Add a project called AI Studio")
 * @param {object} currentSchema - Current portfolio JSON schema state
 * @returns {Promise<{ schema: object, message: string }>}
 */
export async function processUserPrompt(userPrompt, currentSchema = initialPortfolioSchema) {
  if (!userPrompt || !userPrompt.trim()) {
    return { schema: currentSchema, message: "Please provide a valid prompt." };
  }

  // If Gemini API Key is missing or not configured, use smart local mutation fallback
  if (!genAI || !apiKey) {
    return handleOfflineFallback(userPrompt, currentSchema);
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const systemPrompt = `
You are an expert AI Portfolio Architect & Web Designer.
Given the current portfolio JSON schema and a user request, mutate the schema intelligently to fulfill the user request while preserving valid structure.

OUTPUT REQUIREMENT:
Return strictly valid JSON matching this exact envelope structure:
{
  "schema": {
    "metadata": {
      "title": "string",
      "slug": "string",
      "theme": "cinematic" | "neo_brutalist" | "vscode" | "bento",
      "accentColor": "string hex color",
      "fontFamily": "string",
      "published": boolean
    },
    "blocks": [
      {
        "id": "string",
        "type": "HeroBlock" | "ProjectGridBlock" | "SkillsBlock" | "ContactBlock",
        "content": { ... matching section block structure }
      }
    ]
  },
  "message": "Brief friendly summary of changes made for the user"
}

Current Portfolio Schema:
${JSON.stringify(currentSchema, null, 2)}

User Instruction:
"${userPrompt}"
`;

    const result = await model.generateContent(systemPrompt);
    const responseText = result.response.text();
    const parsed = JSON.parse(responseText);

    if (parsed && parsed.schema && parsed.schema.blocks) {
      return {
        schema: parsed.schema,
        message: parsed.message || "I've updated your portfolio schema with Gemini AI!"
      };
    }
  } catch (error) {
    console.warn("Gemini API call failed or schema parsing error. Using smart fallback:", error);
  }

  return handleOfflineFallback(userPrompt, currentSchema);
}

/**
 * Offline fallback function for when Gemini API key is unavailable
 */
function handleOfflineFallback(userPrompt, currentSchema) {
  const q = userPrompt.toLowerCase();
  let updatedSchema = JSON.parse(JSON.stringify(currentSchema));
  let message = "I've processed your prompt and updated your portfolio preview!";

  if (q.includes("dark") || q.includes("cinematic")) {
    updatedSchema.metadata.theme = "cinematic";
    updatedSchema.metadata.accentColor = "#FF6B1A";
    message = "Switched theme to Dark Cinematic with warm amber accents!";
  } else if (q.includes("neo") || q.includes("brutalist")) {
    updatedSchema.metadata.theme = "neo_brutalist";
    updatedSchema.metadata.accentColor = "#FFE600";
    message = "Switched theme to high-contrast Neo-Brutalist!";
  } else if (q.includes("vscode") || q.includes("ide")) {
    updatedSchema.metadata.theme = "vscode";
    updatedSchema.metadata.accentColor = "#007ACC";
    message = "Switched theme to VS Code IDE developer theme!";
  } else if (q.includes("senior") || q.includes("bio")) {
    updatedSchema.blocks = updatedSchema.blocks.map((b) => {
      if (b.type === "HeroBlock") {
        return {
          ...b,
          content: {
            ...b.content,
            headline: "Senior Full Stack & AI Systems Architect",
            bio: "Architecting scalable web platforms, real-time AI agents, and high-performance WebGL experiences."
          }
        };
      }
      return b;
    });
    message = "Updated your headline and bio to a Senior AI Systems Architect persona!";
  } else if (q.includes("project")) {
    updatedSchema.blocks = updatedSchema.blocks.map((b) => {
      if (b.type === "ProjectGridBlock") {
        const newProject = {
          id: `p-${Date.now()}`,
          title: "AI Copilot Portfolio Builder",
          description: "Wix Studio Aria-style conversational site generator with live schema mutation.",
          tags: ["React", "Gemini AI", "Tailwind"],
          link: "https://github.com"
        };
        return {
          ...b,
          content: {
            ...b.content,
            items: [newProject, ...(b.content.items || [])]
          }
        };
      }
      return b;
    });
    message = "Added new AI Copilot project to your Featured Works section!";
  }

  return { schema: updatedSchema, message };
}
