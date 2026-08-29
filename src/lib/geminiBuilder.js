export async function processUserPrompt(userPrompt, currentSchema) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    throw new Error("Missing VITE_GEMINI_API_KEY in .env");
  }

  const systemPrompt = `You are an expert AI Portfolio Schema Architect.
You must return ONLY a JSON object strictly following this format:
{
  "schema": <complete_mutated_portfolio_schema>,
  "copilotMessage": "<short 1-sentence confirmation message>"
}
Do not wrap output in markdown code blocks or backticks. Always update sections based on user input.`;

  const requestBody = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `${systemPrompt}\n\nCURRENT SCHEMA:\n${JSON.stringify(currentSchema)}\n\nUSER REQUEST:\n${userPrompt}`
          }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.2
    }
  };

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Gemini API call failed with status ${response.status}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "{}";

  // Clean potential markdown wrap
  const cleanedText = rawText.replace(/^```(json)?\n?/, "").replace(/```$/, "").trim();
  const parsed = JSON.parse(cleanedText);

  return {
    updatedSchema: parsed.schema || parsed,
    aiMessage: parsed.copilotMessage || "Portfolio successfully updated!"
  };
}
