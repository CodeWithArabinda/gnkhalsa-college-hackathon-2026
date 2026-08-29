import { GoogleGenerativeAI } from "@google/generative-ai";

export async function processUserPrompt(userPrompt, currentSchema) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    console.error("Missing or invalid VITE_GEMINI_API_KEY in .env");
    throw new Error("Missing VITE_GEMINI_API_KEY");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const systemInstruction = `
You are an expert AI Web Architect. 
Your job is to mutate and return an updated developer portfolio JSON schema based on the user request.

STRICT INSTRUCTIONS:
1. Return ONLY valid JSON with this exact structure:
   {
     "schema": { ...updated portfolioSchema object... },
     "copilotMessage": "Short 1-sentence confirmation of changes."
   }
2. Never wrap output in markdown codeblocks (no \`\`\`json).
3. If user requests to change name or headline, update the HeroBlock section content directly.
4. Keep all existing valid schema fields intact.
`;

  const promptText = `
Current Schema:
${JSON.stringify(currentSchema)}

User Request:
${userPrompt}
`;

  const modelsToTry = ["gemini-2.0-flash", "gemini-1.5-flash"];
  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: systemInstruction,
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      const response = await model.generateContent(promptText);
      let rawText = response.response.text().trim();

      // Strip markdown codeblock backticks if present
      if (rawText.startsWith("```")) {
        rawText = rawText.replace(/^```(json)?\n?/, "").replace(/```$/, "").trim();
      }

      const parsed = JSON.parse(rawText);
      return {
        updatedSchema: parsed.schema || parsed,
        aiMessage: parsed.copilotMessage || "Portfolio schema successfully updated!",
      };
    } catch (err) {
      console.warn(`Attempt with ${modelName} failed:`, err);
      lastError = err;
    }
  }

  console.error("Detailed Gemini API Execution Error:", lastError);
  throw lastError || new Error("Gemini API call failed");
}
