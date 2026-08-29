import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function processUserPrompt(userPrompt, currentSchema) {
  if (!apiKey || !genAI) {
    console.error("VITE_GEMINI_API_KEY is missing in environment variables.");
    throw new Error("Missing Gemini API Key. Please add VITE_GEMINI_API_KEY to your .env file.");
  }

  const systemInstruction = `
You are an expert AI Web Architect. 
Your job is to update an existing developer portfolio JSON schema based on user instructions.

CRITICAL RULES:
1. You MUST return ONLY a valid JSON object with two keys:
   - "schema": The complete updated portfolio schema object.
   - "copilotMessage": A concise, friendly 1-sentence confirmation explaining what you changed.
2. DO NOT wrap the output in markdown backticks (\`\`\`json). Return raw JSON only.
3. Preserve existing sections while modifying or adding requested content (names, headlines, bio, skills, projects, colors).
4. If asked to change the user's name or headline, update the "HeroBlock" section heading and tagline accordingly.
`;

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: systemInstruction,
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.2,
    },
  });

  const promptContent = `
Current Portfolio Schema:
${JSON.stringify(currentSchema, null, 2)}

User Change Request:
"${userPrompt}"

Update the schema precisely according to the user's request.
`;

  const response = await model.generateContent(promptContent);
  const text = response.response.text();
  const parsed = JSON.parse(text);

  return {
    updatedSchema: parsed.schema || parsed,
    aiMessage: parsed.copilotMessage || "Portfolio successfully updated!",
  };
}
