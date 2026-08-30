import * as pdfjsLib from "pdfjs-dist";
import { CanonicalPortfolio, Project, Skill, Experience, Education, Achievement } from "../types/portfolio";
import { normalizePortfolio } from "./normalizer";
import { generateId, sanitizeUrl } from "../lib/utils";

// Configure pdfjs worker
try {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
} catch {
  // worker fallback — will load inline
}

export interface ParseResult {
  portfolio: CanonicalPortfolio;
  rawText: string;
  confidence: {
    name: boolean;
    email: boolean;
    skillsCount: number;
    projectsCount: number;
    experiencesCount: number;
  };
  method: "ai" | "regex";
}

/**
 * Extracts raw text from an uploaded File (PDF, TXT, DOCX, JSON).
 */
export async function extractTextFromFile(file: File): Promise<{ text: string; rawJson?: any }> {
  const fileName = file.name.toLowerCase();

  // JSON portfolio format
  if (fileName.endsWith(".json")) {
    const content = await file.text();
    try {
      const parsed = JSON.parse(content);
      return { text: content, rawJson: parsed };
    } catch {
      return { text: content };
    }
  }

  // PDF extraction via pdfjs-dist
  if (fileName.endsWith(".pdf") || file.type === "application/pdf") {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
      const pdf = await loadingTask.promise;
      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(" ");
        fullText += pageText + "\n\n";
      }

      if (fullText.trim().length > 20) {
        return { text: fullText };
      }
    } catch (err) {
      console.warn("PDF extraction error, falling back to text stream:", err);
    }
  }

  // Plain text / DOCX text fallback
  const text = await file.text();
  return { text };
}

// ────────────────────────────────────────────────────────────────────────────────
// AI EXTRACTION (Gemini Flash via @google/generative-ai)
// ────────────────────────────────────────────────────────────────────────────────

function getGeminiApiKey(): string | undefined {
  return (
    (import.meta.env.VITE_GEMINI_API_KEY as string | undefined) ||
    (typeof window !== "undefined" ? (window as any).__GEMINI_API_KEY__ : undefined) ||
    localStorage.getItem("foliocraft_gemini_key") ||
    undefined
  );
}

async function extractWithGemini(rawText: string): Promise<CanonicalPortfolio | null> {
  const GEMINI_API_KEY = getGeminiApiKey();
  if (!GEMINI_API_KEY) return null;

  try {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are an expert resume parser. Extract structured data from the following resume text and return ONLY a valid JSON object matching this exact schema. Do not wrap in markdown, do not add any text outside the JSON.

Schema:
{
  "full_name": "string (person's real full name from resume)",
  "headline": "string (job title or professional title)",
  "bio": "string (professional summary or about section, 1-3 sentences)",
  "location": "string (city, country or region)",
  "email": "string",
  "phone": "string",
  "website_url": "string",
  "github_url": "string (full URL)",
  "linkedin_url": "string (full URL)",
  "twitter_url": "string",
  "skills": [
    { "name": "string", "level": "Beginner|Intermediate|Advanced|Expert" }
  ],
  "projects": [
    {
      "title": "string",
      "description": "string (2-3 sentences describing what it does)",
      "technologies": ["string"],
      "github_url": "string",
      "live_url": "string"
    }
  ],
  "experiences": [
    {
      "company": "string",
      "role": "string",
      "start_date": "string (e.g. Jan 2022)",
      "end_date": "string (e.g. Present or Dec 2024)",
      "description": "string (key responsibilities as bullet points joined with \\n)"
    }
  ],
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "field": "string",
      "start_year": "string",
      "end_year": "string",
      "description": "string"
    }
  ],
  "achievements": [
    {
      "title": "string",
      "date": "string",
      "issuer": "string",
      "description": "string",
      "credential_url": "string"
    }
  ]
}

Rules:
- Extract ONLY what is explicitly stated in the resume. Do not hallucinate or infer.
- full_name must be the actual person's name found in the resume, NOT a placeholder.
- Return all skill names exactly as written in the resume.
- If a field is not found, use an empty string "" or empty array [].
- For skills with no level mentioned, default to "Advanced".
- Return valid JSON only. No markdown, no explanation, just the JSON object.

Resume Text:
---
${rawText.slice(0, 12000)}
---
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    // Strip markdown code fences if present
    const jsonStr = responseText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
    const parsed = JSON.parse(jsonStr);
    return parsed;
  } catch (err) {
    console.warn("Gemini extraction failed, falling back to regex parser:", err);
    return null;
  }
}

// ────────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT: parseResumeText
// ────────────────────────────────────────────────────────────────────────────────

export async function parseResumeText(rawText: string, fileName = "resume.pdf"): Promise<ParseResult> {
  // Try AI extraction first
  const aiResult = await extractWithGemini(rawText);

  if (aiResult && aiResult.full_name && aiResult.full_name.trim().length > 1) {
    const portfolio = normalizePortfolio({
      full_name: aiResult.full_name || "",
      headline: aiResult.headline || "Software Engineer",
      bio: aiResult.bio || "",
      location: aiResult.location || "",
      email: aiResult.email || "",
      github_url: sanitizeUrl(aiResult.github_url || ""),
      linkedin_url: sanitizeUrl(aiResult.linkedin_url || ""),
      resume_file_name: fileName,
      skills: (aiResult.skills || []).slice(0, 20).map((s: any) => ({
        id: generateId("skill"),
        name: s.name || "",
        level: s.level || "Advanced",
      })),
      projects: (aiResult.projects || []).slice(0, 8).map((p: any) => ({
        id: generateId("proj"),
        title: p.title || "",
        description: p.description || "",
        image_url: "",
        technologies: Array.isArray(p.technologies) ? p.technologies : [],
        github_url: sanitizeUrl(p.github_url || ""),
        live_url: sanitizeUrl(p.live_url || ""),
      })),
      experiences: (aiResult.experiences || []).slice(0, 6).map((e: any) => ({
        id: generateId("exp"),
        company: e.company || "",
        role: e.role || "",
        start_date: e.start_date || "",
        end_date: e.end_date || "Present",
        description: e.description || "",
      })),
      education: (aiResult.education || []).slice(0, 3).map((ed: any) => ({
        id: generateId("edu"),
        institution: ed.institution || "",
        degree: ed.degree || "",
        field: ed.field || "",
        start_year: ed.start_year || "",
        end_year: ed.end_year || "",
        description: ed.description || "",
      })),
      achievements: (aiResult.achievements || []).slice(0, 5).map((a: any) => ({
        id: generateId("ach"),
        title: a.title || "",
        date: a.date || "",
        issuer: a.issuer || "",
        description: a.description || "",
        credential_url: sanitizeUrl(a.credential_url || ""),
      })),
    });

    return {
      portfolio,
      rawText,
      confidence: {
        name: Boolean(aiResult.full_name),
        email: Boolean(aiResult.email),
        skillsCount: (aiResult.skills || []).length,
        projectsCount: (aiResult.projects || []).length,
        experiencesCount: (aiResult.experiences || []).length,
      },
      method: "ai",
    };
  }

  // Fallback: enhanced regex parser
  return parseResumeTextRegex(rawText, fileName);
}

// ────────────────────────────────────────────────────────────────────────────────
// ENHANCED REGEX FALLBACK PARSER
// ────────────────────────────────────────────────────────────────────────────────

function parseResumeTextRegex(rawText: string, fileName = "resume.pdf"): ParseResult {
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const cleanText = lines.join("\n");

  // 1. Email extraction
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi;
  const emailMatches = cleanText.match(emailRegex);
  const email = emailMatches?.[0] ?? "";

  // 2. Phone
  const phoneRegex = /(?:\+?\d{1,3}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;
  const phoneMatch = cleanText.match(phoneRegex);
  const phone = phoneMatch?.[0] ?? "";

  // 3. GitHub & LinkedIn URLs
  const githubMatch = cleanText.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/i);
  const linkedinMatch = cleanText.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/(?:in|company)\/([a-zA-Z0-9_-]+(?:\/)?)/i);

  const github_url = githubMatch ? sanitizeUrl(githubMatch[0]) : "";
  const linkedin_url = linkedinMatch ? sanitizeUrl(linkedinMatch[0]) : "";

  // 4. Location heuristic
  const locationRegex = /(?:Location|Address|Based in)?[:\s]*([A-Z][a-zA-Z\s]+,\s*(?:[A-Z]{2}|[A-Za-z\s]+))/;
  const locationMatch = cleanText.match(locationRegex);
  const location = locationMatch ? locationMatch[1].replace(/^(Location|Address|Based in)[:\s]*/i, "").trim() : "";

  // 5. Name extraction — improved: skip lines with @, digits, http, or resume header words
  // Also skip short lines and lines that look like titles/headings
  let full_name = "";
  const nameBlockers = /(@|http|github|linkedin|phone|mobile|tel:|resume|curriculum|vitae|\+\d|www\.)/i;
  for (let i = 0; i < Math.min(8, lines.length); i++) {
    const line = lines[i];
    if (
      !nameBlockers.test(line) &&
      line.length >= 2 &&
      line.length <= 50 &&
      !/^\d/.test(line) &&
      // Must look like a name: 2+ words or capitalized
      /^[A-Z][a-zA-Z]+(\s[A-Za-z.]+){0,3}$/.test(line.replace(/[,|•]/g, "").trim())
    ) {
      full_name = line.replace(/[|•,].*$/, "").trim();
      break;
    }
  }

  // 6. Headline
  const titleKeywords = ["developer", "engineer", "architect", "designer", "manager", "specialist",
    "lead", "full stack", "frontend", "backend", "scientist", "analyst", "consultant", "director",
    "officer", "head", "intern", "graduate", "researcher"];
  let headline = "";
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    const line = lines[i].toLowerCase();
    if (lines[i] !== full_name && titleKeywords.some((kw) => line.includes(kw))) {
      headline = lines[i].replace(/[|•].*$/, "").trim();
      break;
    }
  }
  if (!headline) headline = "Software Engineer & Builder";

  // 7. Section partitioning
  const sections = partitionResumeSections(cleanText);

  const bio = sections.summary || sections.about || "Passionate engineer crafting scalable software and delightful user experiences.";
  const skills = extractSkills(sections.skills || cleanText);
  const projects = extractProjects(sections.projects || "");
  const experiences = extractExperiences(sections.experience || "");
  const education = extractEducation(sections.education || "");
  const achievements = extractAchievements(sections.achievements || "");

  const portfolio = normalizePortfolio({
    full_name,
    headline,
    bio,
    location,
    email,
    phone,
    github_url,
    linkedin_url,
    resume_file_name: fileName,
    skills,
    projects,
    experiences,
    education,
    achievements,
  });

  return {
    portfolio,
    rawText,
    confidence: {
      name: Boolean(full_name),
      email: Boolean(email),
      skillsCount: skills.length,
      projectsCount: projects.length,
      experiencesCount: experiences.length,
    },
    method: "regex",
  };
}

// ────────────────────────────────────────────────────────────────────────────────
// HELPER: Section Partitioning
// ────────────────────────────────────────────────────────────────────────────────

function partitionResumeSections(text: string): Record<string, string> {
  const result: Record<string, string> = {};
  const sectionKeywords = [
    { key: "summary", regex: /(?:^|\n)(?:PROFESSIONAL SUMMARY|CAREER OBJECTIVE|SUMMARY|ABOUT ME|ABOUT|PROFILE|OBJECTIVE)/i },
    { key: "skills", regex: /(?:^|\n)(?:TECHNICAL SKILLS|CORE SKILLS|SKILLS & TECHNOLOGIES|SKILLS|TECH STACK|TECHNOLOGIES|COMPETENCIES|KEY SKILLS)/i },
    { key: "experience", regex: /(?:^|\n)(?:WORK EXPERIENCE|PROFESSIONAL EXPERIENCE|EXPERIENCE|EMPLOYMENT HISTORY|WORK HISTORY|INTERNSHIPS?)/i },
    { key: "projects", regex: /(?:^|\n)(?:FEATURED PROJECTS|PERSONAL PROJECTS|ACADEMIC PROJECTS|PROJECTS|KEY PROJECTS|NOTABLE WORKS|PORTFOLIO)/i },
    { key: "education", regex: /(?:^|\n)(?:EDUCATION|ACADEMIC BACKGROUND|ACADEMIC QUALIFICATIONS|DEGREES|QUALIFICATIONS)/i },
    { key: "achievements", regex: /(?:^|\n)(?:ACHIEVEMENTS & AWARDS|ACHIEVEMENTS|AWARDS|CERTIFICATIONS|HONORS|RECOGNITION|PUBLICATIONS|EXTRA-CURRICULAR)/i },
  ];

  const matches: Array<{ key: string; index: number; length: number }> = [];
  for (const item of sectionKeywords) {
    const match = text.match(item.regex);
    if (match && match.index !== undefined) {
      matches.push({ key: item.key, index: match.index, length: match[0].length });
    }
  }

  matches.sort((a, b) => a.index - b.index);

  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];
    const startIndex = current.index + current.length;
    const endIndex = i + 1 < matches.length ? matches[i + 1].index : text.length;
    result[current.key] = text.slice(startIndex, endIndex).trim();
  }

  return result;
}

// ────────────────────────────────────────────────────────────────────────────────
// HELPER: Skills
// ────────────────────────────────────────────────────────────────────────────────

function extractSkills(sectionText: string): Skill[] {
  const knownTechList = [
    "React", "React.js", "Next.js", "Vue.js", "Angular", "TypeScript", "JavaScript", "Node.js",
    "Express", "Python", "Django", "FastAPI", "PyTorch", "TensorFlow", "HTML5", "CSS3",
    "Tailwind CSS", "PostgreSQL", "MongoDB", "MySQL", "Redis", "GraphQL", "Docker",
    "Kubernetes", "AWS", "GCP", "Azure", "Git", "GitHub", "Three.js", "WebGL", "Rust",
    "Go", "C++", "C#", "Java", "Spring Boot", "Figma", "Redux", "Zustand", "CI/CD",
    "REST APIs", "LangChain", "OpenAI", "Firebase", "Supabase", "Prisma", "tRPC", "Flutter",
    "Swift", "Kotlin", "R", "MATLAB", "Pandas", "NumPy", "Scikit-learn",
  ];

  const foundSkills: Set<string> = new Set();
  const skills: Skill[] = [];

  // Extract comma/bullet/pipe/semicolon/newline separated tokens
  const tokens = sectionText
    .split(/[,•|\n;\/]/)
    .map((t) => t.replace(/^[-\s*▸►]+/, "").trim())
    .filter((t) => t.length >= 2 && t.length <= 35);

  for (const token of tokens) {
    // Strip category labels like "Languages: Python, JS"
    const cleaned = token.replace(/^[A-Za-z\s&\/]+:\s*/, "").trim();
    if (cleaned && cleaned.length >= 2 && !foundSkills.has(cleaned.toLowerCase())) {
      foundSkills.add(cleaned.toLowerCase());
      skills.push({
        id: generateId("skill"),
        name: cleaned,
        level: "Advanced",
      });
    }
  }

  // Supplement with known tech keywords if list is small
  if (skills.length < 5) {
    for (const tech of knownTechList) {
      const regex = new RegExp(`\\b${tech.replace(/\./g, "\\.")}\\b`, "i");
      if (regex.test(sectionText) && !foundSkills.has(tech.toLowerCase())) {
        foundSkills.add(tech.toLowerCase());
        skills.push({
          id: generateId("skill"),
          name: tech,
          level: "Expert",
        });
      }
    }
  }

  return skills.slice(0, 18);
}

// ────────────────────────────────────────────────────────────────────────────────
// HELPER: Projects
// ────────────────────────────────────────────────────────────────────────────────

function extractProjects(sectionText: string): Project[] {
  if (!sectionText) return [];
  const projects: Project[] = [];

  const projectBlocks = sectionText.split(/(?=\n(?:\d+\.|[•*▸►]|###|[A-Z][a-zA-Z0-9\s-]{2,30}(?:\s*\(|:|\s*—|\s*\|)))/);

  for (const block of projectBlocks) {
    const trimmed = block.trim();
    if (trimmed.length < 20) continue;

    const lines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;

    const titleLine = lines[0]
      .replace(/^[\d.*#\s\-▸►]+/, "")
      .replace(/\s*\(.*?\)/, "")
      .trim();
    if (titleLine.length < 2) continue;

    const liveMatch = trimmed.match(/(?:Live|Demo|App|Website|URL|Link)[\s:]+?(https?:\/\/[^\s|)]+)/i);
    const codeMatch = trimmed.match(/(?:Code|GitHub|Repo|Source)[\s:]+?(https?:\/\/[^\s|)]+)/i);

    const techMatch = trimmed.match(/(?:Tech(?:nologies?)?|Stack|Built with|Tools?|Using)[\s:]+?([^\n]+)/i);
    let technologies: string[] = [];
    if (techMatch) {
      technologies = techMatch[1].split(/[,|•]/).map((t) => t.trim()).filter(Boolean);
    } else {
      const keywords = ["React", "Next.js", "TypeScript", "Node.js", "Python", "Tailwind", "PostgreSQL", "Docker", "AWS", "MongoDB", "Express", "Vue.js", "Angular"];
      technologies = keywords.filter((k) => new RegExp(`\\b${k}\\b`, "i").test(trimmed));
    }

    const descLines = lines
      .slice(1)
      .filter((l) => !l.toLowerCase().startsWith("http") && !/^(?:tech|stack|tools?)[\s:]/i.test(l))
      .map((l) => l.replace(/^[•*▸►-]\s*/, ""));
    const description = descLines.join(" ") || "A modern web application built with best engineering practices.";

    projects.push({
      id: generateId("proj"),
      title: titleLine.replace(/^Project\s*\d+[:\s]*/i, ""),
      description,
      image_url: "",
      technologies: technologies.length > 0 ? technologies : ["TypeScript", "React"],
      github_url: codeMatch ? sanitizeUrl(codeMatch[1]) : "",
      live_url: liveMatch ? sanitizeUrl(liveMatch[1]) : "",
    });
  }

  return projects.slice(0, 6);
}

// ────────────────────────────────────────────────────────────────────────────────
// HELPER: Experiences
// ────────────────────────────────────────────────────────────────────────────────

function extractExperiences(sectionText: string): Experience[] {
  if (!sectionText) return [];
  const experiences: Experience[] = [];

  const expBlocks = sectionText.split(/(?=\n[A-Z][a-zA-Z0-9\s,&.-]{2,40}\s*(?:\||—|-|\bat\b|\bfrom\b))/);

  for (const block of expBlocks) {
    const trimmed = block.trim();
    if (trimmed.length < 25) continue;

    const lines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);
    if (!lines.length) continue;

    const headerLine = lines[0].replace(/^[•*#\-\s]+/, "");
    // Split by common delimiters: | — – - @ at
    const parts = headerLine.split(/[|—–]|\s+at\s+|\s+-\s+/).map((p) => p.trim());

    const role = parts[0] || "Software Engineer";
    const company = parts[1] || "";

    const dateMatch = trimmed.match(/((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|20\d\d|19\d\d)[a-zA-Z0-9,\s]*[—–\-–]\s*(?:Present|Current|Now|20\d\d|19\d\d|[a-zA-Z0-9,\s]+))/i);
    let start_date = "";
    let end_date = "Present";

    if (dateMatch) {
      const dateParts = dateMatch[1].split(/[—–\-]/).map((d) => d.trim());
      start_date = dateParts[0] || "";
      end_date = dateParts[1] || "Present";
    }

    const bullets = lines.slice(1).filter((l) => !dateMatch || !l.includes(dateMatch[0]));
    const description = bullets
      .map((l) => l.replace(/^[•*▸►-]\s*/, ""))
      .join("\n") || "Contributed to software engineering and product development initiatives.";

    experiences.push({
      id: generateId("exp"),
      company: company.replace(/\(.*?\)/g, "").trim(),
      role: role.replace(/\(.*?\)/g, "").trim(),
      start_date,
      end_date,
      description,
    });
  }

  return experiences.slice(0, 5);
}

// ────────────────────────────────────────────────────────────────────────────────
// HELPER: Education
// ────────────────────────────────────────────────────────────────────────────────

function extractEducation(sectionText: string): Education[] {
  if (!sectionText) return [];
  const list: Education[] = [];
  const lines = sectionText.split("\n").map((l) => l.trim()).filter(Boolean);

  if (lines.length > 0) {
    const institutionLine = lines[0].split(/[|•,]/)[0]?.trim() || "University";
    const degreeMatch = sectionText.match(/(B\.S\.|M\.S\.|B\.Tech|M\.Tech|B\.E\.|Bachelor(?:'s)?|Master(?:'s)?|Ph\.D\.|Associate|Diploma|B\.Sc|M\.Sc)[^,\n]*/i);
    const degree = degreeMatch ? degreeMatch[0].trim() : "B.S. in Computer Science";
    const fieldMatch = sectionText.match(/(?:in|of)\s+([A-Z][a-zA-Z\s&]+?)(?:,|\n|$)/i);
    const field = fieldMatch ? fieldMatch[1].trim() : "Computer Science";
    const yearMatch = sectionText.match(/(\d{4})\s*[—–\-]\s*(\d{4}|Present|Current)/i);

    list.push({
      id: generateId("edu"),
      institution: institutionLine,
      degree,
      field,
      start_year: yearMatch ? yearMatch[1] : "",
      end_year: yearMatch ? yearMatch[2] : "",
      description: lines.slice(1).join(" "),
    });
  }

  return list;
}

// ────────────────────────────────────────────────────────────────────────────────
// HELPER: Achievements
// ────────────────────────────────────────────────────────────────────────────────

function extractAchievements(sectionText: string): Achievement[] {
  if (!sectionText) return [];
  const list: Achievement[] = [];
  const lines = sectionText
    .split("\n")
    .map((l) => l.replace(/^[•*▸►-]\s*/, "").trim())
    .filter((l) => l.length > 5);

  for (const line of lines.slice(0, 5)) {
    const parts = line.split(/[:|–]/);
    list.push({
      id: generateId("ach"),
      title: parts[0]?.trim() || line,
      date: "",
      issuer: parts[1]?.trim() || "",
      description: line,
      credential_url: "",
    });
  }

  return list;
}
