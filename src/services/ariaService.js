/**
 * Aria Studio AI Copilot & Live Schema Patching Engine
 * Sends user natural language commands and current portfolio schema context to Gemini 3.6 Flash,
 * parses structured JSON schema patches, and applies deep updates to live canvas blocks.
 */

import { cleanJsonOutput } from './resumeParser';

/**
 * Apply JSON patches or key-value updates to StackFolio Schema
 * @param {Object} currentSchema 
 * @param {Array|Object} patchesOrUpdates 
 * @returns {Object} Updated Schema
 */
export function applySchemaPatches(currentSchema, patchesOrUpdates) {
  if (!currentSchema || !patchesOrUpdates) return currentSchema;

  const schema = JSON.parse(JSON.stringify(currentSchema));
  if (!schema.blocks) schema.blocks = [];

  // Convert patches dictionary or array into standard array [{ path, value }]
  let patchList = [];
  if (Array.isArray(patchesOrUpdates)) {
    patchList = patchesOrUpdates;
  } else if (typeof patchesOrUpdates === 'object') {
    patchList = Object.entries(patchesOrUpdates).map(([path, value]) => ({ path, value }));
  }

  patchList.forEach(({ path, value }) => {
    if (!path || value === undefined) return;
    const lowerPath = path.toLowerCase();

    // 1. Hero Block Updates
    if (lowerPath.includes('hero.name') || lowerPath.includes('name') || lowerPath === 'hero-name') {
      const heroBlock = schema.blocks.find(b => b.type === 'HeroBlock');
      if (heroBlock) heroBlock.content.name = String(value);
      if (schema.metadata) {
        schema.metadata.title = `${value} - Portfolio`;
      }
    } else if (lowerPath.includes('hero.headline') || lowerPath.includes('headline') || lowerPath === 'hero-headline') {
      const heroBlock = schema.blocks.find(b => b.type === 'HeroBlock');
      if (heroBlock) heroBlock.content.headline = String(value);
    } else if (lowerPath.includes('hero.bio') || lowerPath.includes('bio') || lowerPath === 'hero-bio') {
      const heroBlock = schema.blocks.find(b => b.type === 'HeroBlock');
      if (heroBlock) heroBlock.content.bio = String(value);
      const storyBlock = schema.blocks.find(b => b.type === 'StoryBlock');
      if (storyBlock) storyBlock.content.manifesto = String(value);
    } else if (lowerPath.includes('hero.ctatext') || lowerPath.includes('cta')) {
      const heroBlock = schema.blocks.find(b => b.type === 'HeroBlock');
      if (heroBlock) heroBlock.content.ctaText = String(value);

    // 2. Contact & Email Updates
    } else if (lowerPath.includes('email') || lowerPath.includes('contact')) {
      const contactBlock = schema.blocks.find(b => b.type === 'ContactBlock');
      if (contactBlock) contactBlock.content.email = String(value);

    // 3. Projects Block Updates
    } else if (lowerPath.includes('projects') && Array.isArray(value)) {
      const projectBlock = schema.blocks.find(b => b.type === 'ProjectGridBlock');
      if (projectBlock) projectBlock.content.items = value;

    // 4. Skills Block Updates
    } else if (lowerPath.includes('skills') && Array.isArray(value)) {
      const skillBlock = schema.blocks.find(b => b.type === 'SkillsBlock');
      if (skillBlock) {
        skillBlock.content.categories = [
          { name: "Core Skills", skills: value }
        ];
      }

    // 5. General Block Content Fallback
    } else {
      // Find matching block or key
      const parts = path.split('.');
      if (parts.length === 2) {
        const [blockTypeKey, fieldName] = parts;
        const targetBlock = schema.blocks.find(b => b.type.toLowerCase().includes(blockTypeKey.toLowerCase()));
        if (targetBlock && targetBlock.content) {
          targetBlock.content[fieldName] = value;
        }
      }
    }
  });

  return schema;
}

/**
 * Primary Aria Copilot Prompt Processing Function
 * @param {string} userPrompt - Natural language edit command from chat
 * @param {Object} currentSchema - Current Studio Schema
 * @param {string} [apiKey] - Optional Gemini API Key
 * @returns {Promise<{ replyMessage: string, updatedSchema: Object }>}
 */
export async function processAriaStudioPrompt(userPrompt, currentSchema, apiKey = null) {
  const keyToUse = apiKey || import.meta.env.VITE_GEMINI_API_KEY;

  const systemInstruction = `
You are Aria, an intelligent AI Studio Copilot for StackFolio website builder.
The user wants to edit their live interactive portfolio canvas using natural language.

CURRENT SCHEMA CONTEXT:
${JSON.stringify(currentSchema, null, 2)}

TASK:
Analyze the user's edit prompt: "${userPrompt}"
Generate structured schema patches to execute the edit cleanly.

Return ONLY a valid JSON object (no markdown wrappers) strictly in this format:
{
  "action": "UPDATE_SCHEMA",
  "replyMessage": "A short, friendly 1-sentence confirmation of what was updated on the canvas.",
  "patches": [
    { "path": "hero.name", "value": "Updated Name" },
    { "path": "hero.headline", "value": "Updated Headline" }
  ],
  "updates": {
    "hero.name": "Updated Name"
  }
}

RULES:
1. Always preserve unmentioned schema fields intact.
2. If user requests changing a name (e.g., "Change name to Arabinda Muni"), patch "hero.name" to "Arabinda Muni".
3. Return ONLY valid JSON.
`;

  if (!keyToUse || keyToUse === "your_gemini_api_key_here") {
    // Fallback parser without API Key
    const p = userPrompt.toLowerCase();
    let reply = "Updated your portfolio preview on the canvas!";
    let updates = {};

    if (p.includes('name')) {
      const match = userPrompt.match(/name (?:to|is) (["']?[\w\s]+["']?)/i);
      const newName = match ? match[1].replace(/["']/g, '') : "Arabinda Muni";
      updates["hero.name"] = newName;
      reply = `Updated name to ${newName}!`;
    } else if (p.includes('headline') || p.includes('title')) {
      updates["hero.headline"] = "Full Stack Web Architect & AI Engineer";
      reply = "Updated your professional hero headline!";
    } else if (p.includes('bio')) {
      updates["hero.bio"] = "Building high-impact web applications with React, Node.js, and modern AI engines.";
      reply = "Updated your professional bio summary!";
    }

    const updatedSchema = applySchemaPatches(currentSchema, updates);
    return { replyMessage: reply, updatedSchema };
  }

  const MODELS = ['gemini-3.6-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
  let response = null;

  for (const model of MODELS) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${keyToUse}`;
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemInstruction}\n\nUSER PROMPT: ${userPrompt}` }] }],
          generationConfig: {
            response_mime_type: "application/json",
            temperature: 0.2
          }
        })
      });
      if (res.ok) {
        response = res;
        break;
      }
    } catch (e) {
      console.warn(`Aria model ${model} fetch failed:`, e);
    }
  }

  if (!response) {
    throw new Error("Failed to connect to Gemini Live Schema Patching Engine.");
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  const actionJson = cleanJsonOutput(rawText);

  if (!actionJson) {
    throw new Error("Received unparseable AI patch response.");
  }

  const patchesToApply = actionJson.patches || actionJson.updates || {};
  const replyMessage = actionJson.replyMessage || actionJson.reply || "Updated your portfolio schema!";
  const updatedSchema = applySchemaPatches(currentSchema, patchesToApply);

  return {
    replyMessage,
    updatedSchema
  };
}
