import { initialPortfolioSchema } from '../types/schema';

/**
 * Anti-repetition memory cache & archetype classification.
 */
export function determineArchetype(promptText = '', excludedArchetypes = []) {
  const p = promptText.toLowerCase();

  const options = ['cyber-terminal', 'bento-minimal', 'editorial-studio', 'neo-brutalist'];
  const available = options.filter(opt => !excludedArchetypes.includes(opt));
  const fallbackChoice = available.length > 0 ? available[0] : 'neo-brutalist';

  if ((p.includes('ai') || p.includes('ml') || p.includes('python') || p.includes('cyber') || p.includes('terminal') || p.includes('torch')) && !excludedArchetypes.includes('cyber-terminal')) {
    return 'cyber-terminal';
  }
  if ((p.includes('bento') || p.includes('minimal') || p.includes('apple') || p.includes('vercel') || p.includes('ios')) && !excludedArchetypes.includes('bento-minimal')) {
    return 'bento-minimal';
  }
  if ((p.includes('editorial') || p.includes('studio') || p.includes('agency') || p.includes('luxury') || p.includes('fashion')) && !excludedArchetypes.includes('editorial-studio')) {
    return 'editorial-studio';
  }
  
  return fallbackChoice;
}

/**
 * Generate a full AI Portfolio Schema based on user prompt, model choice, and anti-repetition history.
 */
export async function generatePortfolioSchema(userPrompt, modelId = 'auto', apiKey = null) {
  const keyToUse = apiKey || import.meta.env.VITE_GEMINI_API_KEY;

  // Read anti-repetition history
  let history = [];
  try {
    const rawHist = localStorage.getItem('stackfolio_archetype_history');
    if (rawHist) history = JSON.parse(rawHist);
  } catch (e) {}

  const archetype = determineArchetype(userPrompt, history);

  // Update history
  const updatedHistory = [archetype, ...history.filter(a => a !== archetype)].slice(0, 3);
  try {
    localStorage.setItem('stackfolio_archetype_history', JSON.stringify(updatedHistory));
  } catch (e) {}

  let resolvedModel = modelId;
  if (!modelId || modelId === 'auto') {
    resolvedModel = userPrompt.length > 300 ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
  }

  // Model-specific Section Depth
  const isPro = resolvedModel === 'gemini-2.5-pro';

  // Explicit Layout Variant Mapping per Archetype
  let selectedHeroVar = 'split-portrait';
  let selectedWorksVar = 'numbered-grid';
  let selectedPillarsVar = 'pastel-cards';
  let selectedStoryVar = 'editorial-split';
  let selectedContactVar = 'split-form';

  if (archetype === 'cyber-terminal' || archetype === 'cyber-ai') {
    selectedHeroVar = 'cyber-terminal';
    selectedWorksVar = 'terminal-repos';
    selectedPillarsVar = 'system-telemetry';
    selectedStoryVar = 'timeline-milestones';
    selectedContactVar = 'cli-terminal-connect';
  } else if (archetype === 'bento-minimal') {
    selectedHeroVar = 'centered-bento';
    selectedWorksVar = 'apple-bento';
    selectedPillarsVar = 'tech-matrix';
    selectedStoryVar = 'minimal-manifesto';
    selectedContactVar = 'floating-dock';
  }

  if (keyToUse && keyToUse !== "your_gemini_api_key_here") {
    try {
      const systemPrompt = `You are StackFolio AI, an elite generative web architect. Convert the user's prompt into a clean, modern, fully populated JSON schema for a developer/designer portfolio website. Excluded archetypes: [${history.join(', ')}]. Selected archetype: ${archetype}. Model Depth: ${resolvedModel}. Return ONLY a valid JSON object matching the exact schema structure without Markdown formatting or backticks.`;

      const schemaTemplate = {
        archetype,
        theme: getThemeForArchetype(archetype),
        settings: {
          siteTitle: "Developer Portfolio",
          customDomain: "kshitijpilankar.dev"
        },
        sections: [
          {
            id: "hero",
            type: "hero",
            layoutVariant: selectedHeroVar,
            badge: "Creative Developer & Designer",
            headline: "I'm Kshitij Pilankar.",
            bio: "Building high-impact digital experiences with modern web technologies and design systems.",
            primaryBtn: { label: "Explore Projects", link: "#projects" },
            secondaryBtn: { label: "Contact Me", link: "#contact" }
          },
          {
            id: "projects",
            type: "project-grid",
            layoutVariant: selectedWorksVar,
            title: "Selected Works",
            subtitle: "Selected software and design showcases",
            items: [
              {
                id: "p1",
                title: "3D Space Canvas",
                description: "Interactive WebGL portfolio template with real-time video scrubbing.",
                metrics: "Latency: 14ms • 60 FPS",
                tags: ["React", "WebGL", "GSAP"],
                demoUrl: "https://github.com"
              },
              {
                id: "p2",
                title: "AI Studio Copilot",
                description: "Conversational website builder with live preview frame and inline edits.",
                metrics: "Accuracy: 99.4% • 50k Users",
                tags: ["TypeScript", "Tailwind", "AI"],
                demoUrl: "https://github.com"
              }
            ]
          },
          {
            id: "skills",
            type: "skills-matrix",
            layoutVariant: selectedPillarsVar,
            title: "Engineering Excellence",
            categories: [
              { name: "FRONTEND", skills: ["React", "Vite", "Tailwind CSS", "GSAP"] },
              { name: "BACKEND & DB", skills: ["Node.js", "Supabase", "PostgreSQL"] },
              { name: "TOOLS", skills: ["Git", "Figma", "Docker", "Vercel"] }
            ]
          },
          ...(isPro ? [
            {
              id: "story",
              type: "story",
              layoutVariant: selectedStoryVar,
              title: "The Architect",
              bio: "Engineering software requires an uncompromised balance between aesthetic precision and technical integrity."
            }
          ] : []),
          {
            id: "contact",
            type: "contact-footer",
            layoutVariant: selectedContactVar,
            headline: "Let's Build Something Together",
            subtext: "Available for full-time opportunities and creative projects.",
            email: "kshitijpilankar@gmail.com",
            btnLabel: "Email Me"
          }
        ]
      };

      const requestBody = {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `${systemPrompt}\n\nARCHETYPE: ${archetype}\nREQUIRED SCHEMA STRUCTURE CONSTRAINTS:\n${JSON.stringify(schemaTemplate, null, 2)}\n\nUSER PROMPT:\n${userPrompt}`
              }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.35
        }
      };

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${resolvedModel}:generateContent?key=${keyToUse}`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
        const cleanedText = rawText.replace(/^```(json)?\n?/, "").replace(/```$/, "").trim();
        const parsed = JSON.parse(cleanedText);

        if (parsed && (parsed.sections || parsed.blocks)) {
          return formatSchemaResponse(parsed, userPrompt, archetype, selectedHeroVar, selectedWorksVar, selectedPillarsVar, selectedStoryVar, selectedContactVar, isPro);
        }
      }
    } catch (err) {
      console.warn(`Gemini API call error (${resolvedModel}), using synthesized fallback schema:`, err.message);
    }
  }

  return synthesizeFallbackSchema(userPrompt, archetype, selectedHeroVar, selectedWorksVar, selectedPillarsVar, selectedStoryVar, selectedContactVar, isPro);
}

/**
 * Get preset theme design tokens for a given archetype.
 */
function getThemeForArchetype(archetype) {
  switch (archetype) {
    case 'cyber-terminal':
    case 'cyber-ai':
      return {
        preset: "cyber-terminal",
        bgStyle: "dark-terminal",
        primaryColor: "#00f5ff",
        accentColor: "#10b981",
        textColor: "#ffffff",
        cardBg: "#0f172a",
        borderColor: "#1e293b",
        borderRadius: "rounded-xl"
      };
    case 'bento-minimal':
      return {
        preset: "bento-minimal",
        bgStyle: "bento-slate",
        primaryColor: "#0053ff",
        accentColor: "#a855f7",
        textColor: "#0f172a",
        cardBg: "#ffffff",
        borderColor: "#e2e8f0",
        borderRadius: "rounded-3xl"
      };
    case 'editorial-studio':
      return {
        preset: "editorial-studio",
        bgStyle: "clean-white",
        primaryColor: "#18181b",
        accentColor: "#71717a",
        textColor: "#09090b",
        cardBg: "#fafafa",
        borderColor: "#e4e4e7",
        borderRadius: "rounded-none"
      };
    case 'neo-brutalist':
    default:
      return {
        preset: "neo-brutalist",
        bgStyle: "architectural-grid",
        primaryColor: "#FFE600",
        accentColor: "#FF5100",
        textColor: "#000000",
        cardBg: "#FFFFFF",
        borderColor: "#000000",
        borderRadius: "rounded-2xl"
      };
  }
}

/**
 * Format and synchronize schema response for both sections and block structures.
 */
function formatSchemaResponse(parsed, prompt, archetypeOverride, heroVar, worksVar, pillarsVar, storyVar, contactVar, isPro) {
  const archetype = parsed.archetype || archetypeOverride || determineArchetype(prompt);
  const theme = parsed.theme || getThemeForArchetype(archetype);
  const sections = parsed.sections || [];

  const heroSec = sections.find(s => s.id === 'hero' || s.type === 'hero') || {};
  const projectSec = sections.find(s => s.id === 'projects' || s.type === 'project-grid') || {};
  const skillSec = sections.find(s => s.id === 'skills' || s.type === 'skills-matrix') || {};
  const storySec = sections.find(s => s.id === 'story' || s.type === 'story') || {};
  const contactSec = sections.find(s => s.id === 'contact' || s.type === 'contact-footer') || {};

  const blocks = [
    {
      id: "block-hero",
      type: "HeroBlock",
      layoutVariant: heroSec.layoutVariant || heroVar || 'split-portrait',
      content: {
        name: heroSec.headline || "I'm Kshitij Pilankar.",
        headline: heroSec.badge || "Creative Developer & Designer",
        bio: heroSec.bio || "Building high-impact digital experiences with React, WebGL, and modern design systems.",
        ctaText: heroSec.primaryBtn?.label || "Explore Projects",
        secondaryCta: heroSec.secondaryBtn?.label || "CONTACT ME",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop"
      }
    },
    {
      id: "block-projects",
      type: "ProjectGridBlock",
      layoutVariant: projectSec.layoutVariant || worksVar || 'numbered-grid',
      content: {
        title: projectSec.title || "Selected Works",
        subtitle: projectSec.subtitle || "Selected software and design showcases",
        items: projectSec.items || [
          {
            id: "p1",
            title: "3D Space Canvas",
            description: "Interactive WebGL portfolio template with real-time video scrubbing.",
            metrics: "Latency: 14ms • 60 FPS",
            tags: ["React", "WebGL", "GSAP"],
            link: "https://github.com"
          },
          {
            id: "p2",
            title: "AI Studio Copilot",
            description: "Conversational website builder with live preview frame and inline edits.",
            metrics: "Accuracy: 99.4% • 50k Users",
            tags: ["TypeScript", "Tailwind", "AI"],
            link: "https://github.com"
          }
        ]
      }
    },
    {
      id: "block-pillars",
      type: "PillarsBlock",
      layoutVariant: skillSec.layoutVariant || pillarsVar || 'pastel-cards',
      content: {
        title: skillSec.title || "Engineering Excellence",
        categories: skillSec.categories || [
          { name: "Frontend Engineering", skills: ["React 18", "Vite", "Tailwind CSS", "GSAP"] },
          { name: "Backend & Cloud", skills: ["Node.js", "Supabase", "PostgreSQL", "Docker"] },
          { name: "Full-Stack Architecture", skills: ["System Design", "GraphQL", "CI/CD", "Vercel"] }
        ]
      }
    },
    ...(isPro ? [
      {
        id: "block-story",
        type: "StoryBlock",
        layoutVariant: storySec.layoutVariant || storyVar || 'editorial-split',
        content: {
          title: "The Architect",
          bio: "Engineering digital software requires an uncompromised balance between aesthetic precision and technical integrity."
        }
      }
    ] : []),
    {
      id: "block-contact",
      type: "ContactBlock",
      layoutVariant: contactSec.layoutVariant || contactVar || 'split-form',
      content: {
        title: contactSec.headline || "Let's Build Something Together",
        subtitle: contactSec.subtext || "Available for full-time opportunities, technical leadership roles, and high-impact design system engineering.",
        email: contactSec.email || "kshitijpilankar@gmail.com"
      }
    },
    {
      id: "block-footer",
      type: "FooterBlock",
      content: {
        title: "WebDev Portfolio",
        copyright: "© 2026 WebDev Portfolio. All rights reserved."
      }
    }
  ];

  return {
    archetype,
    metadata: {
      slug: "kshitij-pilankar",
      title: parsed.settings?.siteTitle || "Developer Portfolio",
      customDomain: parsed.settings?.customDomain || "kshitijpilankar.dev"
    },
    theme,
    sections,
    blocks,
    elementStyles: {}
  };
}

/**
 * Synthesize a customized dynamic schema locally if API key is missing or call fails.
 */
function synthesizeFallbackSchema(prompt, archetype, heroVar, worksVar, pillarsVar, storyVar, contactVar, isPro) {
  let heroHeadline = "Creative Fullstack Developer & Architect";
  let heroBio = "Building high-impact digital products, scalable systems, and interactive web experiences.";

  let projectItems = [
    {
      id: "p1",
      title: "3D Space Canvas",
      description: "Interactive WebGL portfolio template with real-time video scrubbing.",
      metrics: "Winner ★ 1st Place",
      tags: ["React", "WebGL", "GSAP"],
      link: "https://github.com"
    },
    {
      id: "p2",
      title: "StackFolio AI Studio Copilot",
      description: "Conversational website builder with live preview frame and inline edits.",
      metrics: "1.2k+ Generated",
      tags: ["TypeScript", "Tailwind", "AI"],
      link: "https://github.com"
    }
  ];

  let skillCategories = [
    { name: "Frontend Engineering", skills: ["React 18", "Vite", "Tailwind CSS", "GSAP"] },
    { name: "Backend & Cloud", skills: ["Node.js", "Supabase", "PostgreSQL", "Docker"] },
    { name: "Full-Stack Architecture", skills: ["System Design", "GraphQL", "CI/CD", "Vercel"] }
  ];

  const fallbackData = {
    archetype,
    theme: getThemeForArchetype(archetype),
    settings: {
      siteTitle: "Kshitij Pilankar — Portfolio",
      customDomain: "kshitijpilankar.dev"
    },
    sections: [
      {
        id: "hero",
        type: "hero-split",
        layoutVariant: heroVar,
        badge: heroHeadline,
        headline: "I'm Kshitij Pilankar.",
        bio: heroBio,
        primaryBtn: { label: "Explore Projects", link: "#projects" },
        secondaryBtn: { label: "Contact Me", link: "#contact" }
      },
      {
        id: "projects",
        type: "project-grid",
        layoutVariant: worksVar,
        title: "Selected Works",
        subtitle: "Selected software and design showcases",
        items: projectItems
      },
      {
        id: "skills",
        type: "skills-matrix",
        layoutVariant: pillarsVar,
        title: "Engineering Excellence",
        categories: skillCategories
      },
      {
        id: "contact",
        type: "contact-footer",
        layoutVariant: contactVar,
        headline: "Let's Build Something Together",
        subtext: "Available for full-time opportunities, technical leadership roles, and high-impact design system engineering.",
        email: "kshitijpilankar@gmail.com",
        btnLabel: "Email Me"
      }
    ]
  };

  return formatSchemaResponse(fallbackData, prompt, archetype, heroVar, worksVar, pillarsVar, storyVar, contactVar, isPro);
}

/**
 * Legacy Copilot inline mutation handler.
 */
export async function processUserPrompt(userPrompt, currentSchema, modelId = 'auto') {
  const schema = await generatePortfolioSchema(userPrompt, modelId);
  return {
    schema,
    copilotMessage: `Applied requested AI updates (${schema.archetype || 'custom'} style) to live canvas schema!`
  };
}
