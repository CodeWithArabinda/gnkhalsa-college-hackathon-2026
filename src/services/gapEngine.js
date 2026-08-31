/**
 * StackFolio Schema Gap Engine & Transformer
 * Validates parsed resume JSON, identifies missing portfolio schema fields,
 * provides AI auto-completion or placeholder fallbacks, and transforms data into StackFolio schema blocks.
 */

import { cleanJsonOutput } from './resumeParser';

/**
 * Validate extracted resume JSON against minimum portfolio schema requirements
 * @param {Object} parsedData 
 * @returns {{ isValid: boolean, missingFields: string[] }}
 */
export function validateParsedResume(parsedData) {
  const missingFields = [];

  if (!parsedData) {
    return { isValid: false, missingFields: ['Candidate Details', 'Hero Title', 'Bio', 'Skills', 'Projects'] };
  }

  const hero = parsedData.hero || {};
  if (!hero.name || hero.name.trim() === '' || hero.name.toLowerCase().includes('full name')) {
    missingFields.push('Full Name');
  }
  if (!hero.title || hero.title.trim() === '' || hero.title.toLowerCase().includes('role / headline')) {
    missingFields.push('Professional Title / Headline');
  }
  if (!hero.bio || hero.bio.trim() === '' || hero.bio.length < 15) {
    missingFields.push('Professional Bio Summary');
  }

  const skills = parsedData.skills || [];
  if (!Array.isArray(skills) || skills.length < 2) {
    missingFields.push('Technical Skills Matrix');
  }

  const projects = parsedData.projects || [];
  if (!Array.isArray(projects) || projects.length === 0 || !projects[0]?.title || projects[0]?.title.trim() === '') {
    missingFields.push('Featured Showcase Projects');
  }

  return {
    isValid: missingFields.length === 0,
    missingFields
  };
}

/**
 * Option 1: 1-Click AI Auto-Completer using Gemini 2.5 Flash
 * Generates realistic bio, title, skills, or projects based on candidate context
 */
export async function completeMissingGapsWithAI(parsedData, missingFields, apiKey = null) {
  const keyToUse = apiKey || import.meta.env.VITE_GEMINI_API_KEY;
  const currentData = JSON.parse(JSON.stringify(parsedData || {}));

  const promptText = `
You are an expert AI Resume Copilot.
The user's resume extraction has missing fields: ${missingFields.join(', ')}.

Given existing candidate details:
${JSON.stringify(currentData, null, 2)}

Complete ONLY the missing fields with realistic, high-impact developer content. Return a complete JSON matching this exact structure:

{
  "hero": {
    "name": "${currentData.hero?.name || 'Alex Rivera'}",
    "title": "${currentData.hero?.title || 'Full Stack Engineer'}",
    "bio": "Complete 2-3 sentence bio here",
    "avatarUrl": ""
  },
  "skills": ["React", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL"],
  "projects": [
    {
      "title": "Project Title",
      "description": "High-impact description with metrics",
      "techStack": ["React", "Node.js"],
      "demoUrl": "",
      "githubUrl": ""
    }
  ],
  "experience": ${JSON.stringify(currentData.experience || [])},
  "contact": ${JSON.stringify(currentData.contact || { email: "dev@example.com", socialLinks: { github: "https://github.com", linkedin: "https://linkedin.com" } })}
}

Return ONLY valid JSON.
`;

  if (!keyToUse || keyToUse === "your_gemini_api_key_here") {
    return completeGapsWithPlaceholders(parsedData, missingFields);
  }

  try {
    const MODELS = ['gemini-3.6-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
    let response = null;

    for (const model of MODELS) {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${keyToUse}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: { response_mime_type: "application/json", temperature: 0.3 }
        })
      });
      if (res.ok) {
        response = res;
        break;
      }
    }

    if (response && response.ok) {
      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      const completedJson = cleanJsonOutput(rawText);
      if (completedJson && completedJson.hero) {
        return completedJson;
      }
    }
  } catch (err) {
    console.error("AI Gap Completion error:", err);
  }

  return completeGapsWithPlaceholders(parsedData, missingFields);
}

/**
 * Option 2: Placeholders for direct Studio Canvas manual editing
 */
export function completeGapsWithPlaceholders(parsedData, missingFields = []) {
  const data = JSON.parse(JSON.stringify(parsedData || {}));

  if (!data.hero) data.hero = {};
  if (!data.hero.name || data.hero.name.trim() === '') data.hero.name = "[Enter Your Full Name]";
  if (!data.hero.title || data.hero.title.trim() === '') data.hero.title = "[Enter Your Professional Title]";
  if (!data.hero.bio || data.hero.bio.trim() === '') data.hero.bio = "[Click to add your professional bio summary in Studio Canvas]";

  if (!data.skills || !Array.isArray(data.skills) || data.skills.length < 2) {
    data.skills = ["[Add Primary Skill]", "[Add Secondary Skill]", "[Add Framework]"];
  }

  if (!data.projects || !Array.isArray(data.projects) || data.projects.length === 0) {
    data.projects = [
      {
        title: "[Enter Project Title]",
        description: "[Add project summary, achievements, and live metrics in Studio]",
        techStack: ["React", "Node.js"],
        demoUrl: "https://github.com",
        githubUrl: "https://github.com"
      }
    ];
  }

  if (!data.contact) {
    data.contact = {
      email: "your.email@example.com",
      socialLinks: { github: "https://github.com", linkedin: "https://linkedin.com", twitter: "" }
    };
  }

  return data;
}

/**
 * Transform standard parsed JSON into StackFolio Portfolio Schema
 * (Blocks: HeroBlock, ProjectGridBlock, SkillsBlock, StoryBlock, ContactBlock)
 */
export function transformToPortfolioSchema(parsedData, archetype = 'bento-minimal') {
  const hero = parsedData?.hero || {};
  const skills = parsedData?.skills || [];
  const projects = parsedData?.projects || [];
  const experience = parsedData?.experience || [];
  const contact = parsedData?.contact || {};

  const name = hero.name || 'Developer';
  const headline = hero.title || 'Full Stack Software Engineer';
  const bio = hero.bio || 'Building high-impact web apps and modern digital experiences.';

  const formattedProjects = projects.map((p, idx) => ({
    id: `proj-${idx + 1}`,
    title: p.title || `Project ${idx + 1}`,
    description: p.description || 'Full-stack application with interactive UI features.',
    tags: Array.isArray(p.techStack) && p.techStack.length > 0 ? p.techStack : ['React', 'Node.js'],
    link: p.githubUrl || p.demoUrl || 'https://github.com'
  }));

  const formattedSkills = Array.isArray(skills)
    ? skills.map(s => typeof s === 'string' ? s : s.name || 'JavaScript')
    : ['JavaScript', 'React', 'Node.js', 'Tailwind CSS'];

  const formattedExperience = experience.map((exp, idx) => ({
    id: `exp-${idx + 1}`,
    year: exp.period || '2024 - Present',
    title: `${exp.role || 'Engineer'} @ ${exp.company || 'Tech Inc'}`,
    description: exp.description || 'Led development of frontend features and core API integrations.'
  }));

  return {
    metadata: {
      title: `${name} - Portfolio`,
      slug: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      archetype: archetype,
      theme: 'cinematic',
      accentColor: '#FFE600',
      fontFamily: 'Space Grotesk, sans-serif',
      published: false
    },
    elementStyles: {
      "hero-tagline": { fontSize: 13, color: "#FFE600", fontWeight: "700" },
      "hero-name": { fontSize: 52, color: "#FFFFFF", fontWeight: "900" },
      "hero-bio": { fontSize: 15, color: "#CBD5E1", fontWeight: "400" }
    },
    blocks: [
      {
        id: "hero-1",
        type: "HeroBlock",
        layoutVariant: "centered-bento",
        content: {
          headline: headline,
          name: name,
          bio: bio,
          ctaText: "Explore Works",
          secondaryCta: "Get In Touch",
          avatarUrl: hero.avatarUrl || ""
        }
      },
      {
        id: "projects-1",
        type: "ProjectGridBlock",
        layoutVariant: "apple-bento",
        content: {
          title: "Selected Works",
          subtitle: "Featured software engineering showcases",
          items: formattedProjects
        }
      },
      {
        id: "skills-1",
        type: "SkillsBlock",
        layoutVariant: "tech-matrix",
        content: {
          title: "Technical Stack",
          categories: [
            { name: "Engineering Core", skills: formattedSkills.slice(0, 4) },
            { name: "Frameworks & DB", skills: formattedSkills.slice(4, 8).length > 0 ? formattedSkills.slice(4, 8) : ["Node.js", "Express", "PostgreSQL"] }
          ]
        }
      },
      {
        id: "story-1",
        type: "StoryBlock",
        layoutVariant: "minimal-manifesto",
        content: {
          title: "Career Milestone Story",
          subtitle: "Journey & Work Experience",
          manifesto: bio,
          items: formattedExperience.length > 0 ? formattedExperience : [
            { id: "e1", year: "2024 - Present", title: "Software Engineer @ Tech Labs", description: "Building scalable web products and distributed cloud services." }
          ]
        }
      },
      {
        id: "contact-1",
        type: "ContactBlock",
        layoutVariant: "floating-dock",
        content: {
          title: "Let's Connect",
          subtitle: "Available for full-time roles and creative projects.",
          email: contact.email || "developer@example.com",
          githubUrl: contact.socialLinks?.github || "https://github.com",
          linkedinUrl: contact.socialLinks?.linkedin || "https://linkedin.com"
        }
      }
    ]
  };
}
