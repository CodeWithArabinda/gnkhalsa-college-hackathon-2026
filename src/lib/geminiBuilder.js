import { initialPortfolioSchema } from '../types/schema';

/**
 * Step A: Deterministic 2-Stage Intent Classifier
 */
export function determineArchetype(promptText = '', modelId = 'auto') {
  const p = promptText.toLowerCase();

  if (p.includes('apple') || p.includes('bento') || p.includes('minimal') || p.includes('clean') || p.includes('figma') || p.includes('designer') || p.includes('ios') || p.includes('product')) {
    return 'bento-minimal';
  }
  if (p.includes('ai') || p.includes('python') || p.includes('pytorch') || p.includes('terminal') || p.includes('cyber') || p.includes('telemetry') || p.includes('distributed') || p.includes('backend') || p.includes('cuda') || p.includes('vector')) {
    return 'cyber-terminal';
  }
  if (p.includes('bold') || p.includes('brutalist') || p.includes('startup') || p.includes('neo') || p.includes('yellow') || p.includes('creative') || p.includes('funky')) {
    return 'neo-brutalist';
  }
  if (p.includes('warm') || p.includes('editorial') || p.includes('cream') || p.includes('terracotta') || p.includes('magazine') || p.includes('journal')) {
    return 'warm-editorial';
  }

  // Model-specific Routing Fallbacks
  if (modelId === 'gemini-2.5-pro') {
    return 'neo-brutalist';
  }

  return 'bento-minimal';
}

/**
 * Step B: Enforce 4-Archetype Design Token Presets & Variant Mappings
 */
export function getArchetypeConfig(archetype) {
  switch (archetype) {
    case 'cyber-terminal':
    case 'cyber-ai':
      return {
        archetype: 'cyber-terminal',
        theme: {
          preset: "cyber-terminal",
          bgStyle: "dark-terminal",
          canvasBg: "#090D16",
          primaryColor: "#00F5FF",
          accentColor: "#10B981",
          textColor: "#FFFFFF",
          cardBg: "#0E1424",
          borderColor: "rgba(0, 245, 255, 0.2)",
          borderRadius: "rounded-xl"
        },
        variants: {
          hero: 'cyber-terminal',
          works: 'terminal-repos',
          pillars: 'system-telemetry',
          story: 'timeline-milestones',
          contact: 'cli-terminal-connect'
        }
      };

    case 'bento-minimal':
      return {
        archetype: 'bento-minimal',
        theme: {
          preset: "bento-minimal",
          bgStyle: "bento-slate",
          canvasBg: "#F8FAFC",
          primaryColor: "#0F172A",
          accentColor: "#2563EB",
          textColor: "#0F172A",
          cardBg: "#FFFFFF",
          borderColor: "#E2E8F0",
          borderRadius: "rounded-3xl"
        },
        variants: {
          hero: 'centered-bento',
          works: 'apple-bento',
          pillars: 'tech-matrix',
          story: 'minimal-manifesto',
          contact: 'floating-dock'
        }
      };

    case 'neo-brutalist':
      return {
        archetype: 'neo-brutalist',
        theme: {
          preset: "neo-brutalist",
          bgStyle: "architectural-grid",
          canvasBg: "#FFFDF5",
          primaryColor: "#FFE600",
          accentColor: "#FF5100",
          textColor: "#000000",
          cardBg: "#FFFFFF",
          borderColor: "#000000",
          borderRadius: "rounded-2xl"
        },
        variants: {
          hero: 'split-portrait',
          works: 'numbered-grid',
          pillars: 'pastel-cards',
          story: 'editorial-split',
          contact: 'split-form'
        }
      };

    case 'warm-editorial':
    case 'humanist-light':
    default:
      return {
        archetype: 'warm-editorial',
        theme: {
          preset: "warm-editorial",
          bgStyle: "cream-paper",
          canvasBg: "#FDFBF7",
          primaryColor: "#C2410C",
          accentColor: "#2C2621",
          textColor: "#2C2621",
          cardBg: "#F7F3EB",
          borderColor: "#E7DEC8",
          borderRadius: "rounded-2xl"
        },
        variants: {
          hero: 'split-portrait',
          works: 'numbered-grid',
          pillars: 'pastel-cards',
          story: 'editorial-split',
          contact: 'split-form'
        }
      };
  }
}

/**
 * Switch archetype of an existing schema in 1-click without losing content.
 */
export function morphSchemaArchetype(currentSchema, targetArchetype) {
  const config = getArchetypeConfig(targetArchetype);
  const newBlocks = currentSchema.blocks?.map(block => {
    let newVar = block.layoutVariant;
    if (block.type === 'HeroBlock') newVar = config.variants.hero;
    if (block.type === 'ProjectGridBlock') newVar = config.variants.works;
    if (block.type === 'PillarsBlock' || block.type === 'SkillsBlock') newVar = config.variants.pillars;
    if (block.type === 'StoryBlock') newVar = config.variants.story;
    if (block.type === 'ContactBlock') newVar = config.variants.contact;

    return {
      ...block,
      layoutVariant: newVar
    };
  }) || [];

  return {
    ...currentSchema,
    archetype: config.archetype,
    theme: config.theme,
    blocks: newBlocks
  };
}

/**
 * Generate a full AI Portfolio Schema based on user prompt using Gemini REST API or Presets.
 */
export async function generatePortfolioSchema(userPrompt, modelId = 'auto', apiKey = null) {
  const keyToUse = apiKey || import.meta.env.VITE_GEMINI_API_KEY;
  const archetype = determineArchetype(userPrompt, modelId);
  const config = getArchetypeConfig(archetype);

  let resolvedModel = modelId;
  if (!modelId || modelId === 'auto') {
    resolvedModel = userPrompt.length > 300 ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
  }

  const isPro = resolvedModel === 'gemini-2.5-pro';

  if (keyToUse && keyToUse !== "your_gemini_api_key_here") {
    try {
      const systemPrompt = `You are StackFolio AI, an elite generative web architect. Convert the user's prompt into a clean, modern JSON schema for a portfolio website matching archetype "${config.archetype}". Return ONLY valid JSON matching constraints.`;

      const schemaTemplate = {
        archetype: config.archetype,
        theme: config.theme,
        settings: {
          siteTitle: "Developer Portfolio",
          customDomain: "kshitijpilankar.dev"
        },
        sections: [
          {
            id: "hero",
            type: "hero",
            layoutVariant: config.variants.hero,
            badge: "Creative Developer & Designer",
            headline: "I'm Kshitij Pilankar.",
            bio: "Building high-impact digital experiences with modern web technologies.",
            primaryBtn: { label: "Explore Projects", link: "#projects" },
            secondaryBtn: { label: "Contact Me", link: "#contact" }
          },
          {
            id: "projects",
            type: "project-grid",
            layoutVariant: config.variants.works,
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
            layoutVariant: config.variants.pillars,
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
              layoutVariant: config.variants.story,
              title: "The Architect",
              bio: "Engineering software requires an uncompromised balance between aesthetic precision and technical integrity."
            }
          ] : []),
          {
            id: "contact",
            type: "contact-footer",
            layoutVariant: config.variants.contact,
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
                text: `${systemPrompt}\n\nARCHETYPE: ${config.archetype}\nREQUIRED SCHEMA STRUCTURE CONSTRAINTS:\n${JSON.stringify(schemaTemplate, null, 2)}\n\nUSER PROMPT:\n${userPrompt}`
              }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.3
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
          return formatSchemaResponse(parsed, userPrompt, config, isPro);
        }
      }
    } catch (err) {
      console.warn(`Gemini API call error (${resolvedModel}), using synthesized fallback preset:`, err.message);
    }
  }

  return synthesizePresetFallback(userPrompt, config, isPro);
}

/**
 * Synchronize parsed schema response with archetype config.
 */
function formatSchemaResponse(parsed, prompt, config, isPro) {
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
      layoutVariant: config.variants.hero,
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
      layoutVariant: config.variants.works,
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
      layoutVariant: config.variants.pillars,
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
        layoutVariant: config.variants.story,
        content: {
          title: storySec.title || "The Architect",
          bio: storySec.bio || "Engineering digital software requires an uncompromised balance between aesthetic precision and technical integrity."
        }
      }
    ] : []),
    {
      id: "block-contact",
      type: "ContactBlock",
      layoutVariant: config.variants.contact,
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
    archetype: config.archetype,
    metadata: {
      slug: "kshitij-pilankar",
      title: parsed.settings?.siteTitle || "Developer Portfolio",
      customDomain: parsed.settings?.customDomain || "kshitijpilankar.dev"
    },
    theme: config.theme,
    sections,
    blocks,
    elementStyles: {}
  };
}

/**
 * Fallback Presets for offline/API key missing runs
 */
function synthesizePresetFallback(prompt, config, isPro) {
  let projectItems = [
    {
      id: "p1",
      title: "3D Space Canvas Engine",
      description: "Interactive WebGL portfolio template with real-time video scrubbing.",
      tags: ["React", "WebGL", "GSAP"],
      link: "https://github.com",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop"
    },
    {
      id: "p2",
      title: "StackFolio Studio Copilot",
      description: "Conversational website builder with live preview frame and inline edits.",
      tags: ["TypeScript", "Tailwind", "AI"],
      link: "https://github.com",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop"
    },
    {
      id: "p3",
      title: "Distributed Telemetry Stream",
      description: "Real-time microservice latency monitor with WebSocket hooks.",
      tags: ["Node.js", "Docker", "Redis"],
      link: "https://github.com",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop"
    }
  ];

  let skillCategories = [
    { name: "Frontend Engineering", skills: ["React 18", "Vite", "Tailwind CSS", "GSAP"] },
    { name: "Backend & Cloud", skills: ["Node.js", "Supabase", "PostgreSQL", "Docker"] },
    { name: "Full-Stack Architecture", skills: ["System Design", "GraphQL", "CI/CD", "Vercel"] }
  ];

  const fallbackData = {
    archetype: config.archetype,
    theme: config.theme,
    settings: {
      siteTitle: "Kshitij Pilankar — Portfolio",
      customDomain: "kshitijpilankar.dev"
    },
    sections: [
      {
        id: "hero",
        type: "hero",
        layoutVariant: config.variants.hero,
        badge: "Creative Developer & Designer",
        headline: "I'm Kshitij Pilankar.",
        bio: "Building high-impact digital experiences with modern web technologies and design systems.",
        primaryBtn: { label: "Explore Projects", link: "#projects" },
        secondaryBtn: { label: "Contact Me", link: "#contact" }
      },
      {
        id: "projects",
        type: "project-grid",
        layoutVariant: config.variants.works,
        title: "Selected Works",
        subtitle: "Selected software and design showcases",
        items: projectItems
      },
      {
        id: "skills",
        type: "skills-matrix",
        layoutVariant: config.variants.pillars,
        title: "Engineering Excellence",
        categories: skillCategories
      },
      {
        id: "contact",
        type: "contact-footer",
        layoutVariant: config.variants.contact,
        headline: "Let's Build Something Together",
        subtext: "Available for full-time opportunities, technical leadership roles, and high-impact design system engineering.",
        email: "kshitijpilankar@gmail.com",
        btnLabel: "Email Me"
      }
    ]
  };

  return formatSchemaResponse(fallbackData, prompt, config, isPro);
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
