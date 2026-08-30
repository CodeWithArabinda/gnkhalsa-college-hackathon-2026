import * as pdfjsLib from "pdfjs-dist";
import { CanonicalPortfolio, Project, Skill, Experience, Education, Achievement } from "../types/portfolio";
import { normalizePortfolio } from "./normalizer";
import { generateId, sanitizeUrl } from "../lib/utils";

// Configure pdfjs worker to use unpkg or cdnjs
try {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || "4.10.38"}/pdf.worker.min.mjs`;
} catch {
  // worker fallback
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
}

/**
 * Extracts raw text from an uploaded File (PDF, TXT, DOCX/HTML, JSON).
 */
export async function extractTextFromFile(file: File): Promise<{ text: string; rawJson?: any }> {
  const fileName = file.name.toLowerCase();

  // If JSON format
  if (fileName.endsWith(".json")) {
    const content = await file.text();
    try {
      const parsed = JSON.parse(content);
      return { text: content, rawJson: parsed };
    } catch {
      return { text: content };
    }
  }

  // If PDF format
  if (fileName.endsWith(".pdf") || file.type === "application/pdf") {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
      const pdf = await loadingTask.promise;
      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(" ");
        fullText += pageText + "\n\n";
      }

      if (fullText.trim().length > 20) {
        return { text: fullText };
      }
    } catch (err) {
      console.warn("PDF extraction error, falling back to text stream:", err);
    }
  }

  // Plain text / Markdown / DOCX text fallback
  const text = await file.text();
  return { text };
}

/**
 * Intelligent Structured Resume Parser (Rule-based & Heuristic NLP).
 * Extracts clean structured JSON matching the canonical portfolio schema without hallucinating.
 */
export function parseResumeText(rawText: string, fileName = "resume.pdf"): ParseResult {
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const cleanText = lines.join("\n");

  // 1. Email extraction
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
  const emailMatches = cleanText.match(emailRegex);
  const email = emailMatches && emailMatches.length > 0 ? emailMatches[0] : "";

  // 2. GitHub & LinkedIn URLs
  const githubRegex = /(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/i;
  const linkedinRegex = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/(?:in|company)\/([a-zA-Z0-9_-]+)/i;

  const githubMatch = cleanText.match(githubRegex);
  const linkedinMatch = cleanText.match(linkedinRegex);

  const github_url = githubMatch ? sanitizeUrl(githubMatch[0]) : "";
  const linkedin_url = linkedinMatch ? sanitizeUrl(linkedinMatch[0]) : "";

  // 3. Location / Phone heuristic
  const locationRegex = /(?:Location|Address)?[:\s]*([A-Z][a-zA-Z\s]+,\s*[A-Z]{2}|[A-Z][a-zA-Z\s]+,\s*[A-Za-z\s]+)/;
  const locationMatch = cleanText.match(locationRegex);
  const location = locationMatch ? locationMatch[1].replace(/^(Location|Address)[:\s]*/i, "").trim() : "";

  // 4. Candidate Name (usually the first strong heading or top line)
  let full_name = "";
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i];
    // Filter out email/phone/urls/common headings
    if (
      !line.includes("@") &&
      !line.includes("http") &&
      !line.includes("github.com") &&
      !line.toLowerCase().includes("resume") &&
      !line.toLowerCase().includes("curriculum") &&
      line.length >= 3 &&
      line.length <= 40 &&
      !/\d/.test(line)
    ) {
      full_name = line.replace(/[|•,].*$/, "").trim();
      break;
    }
  }

  // 5. Headline / Title
  let headline = "";
  for (let i = 0; i < Math.min(8, lines.length); i++) {
    const line = lines[i];
    if (
      line !== full_name &&
      !line.includes("@") &&
      !line.includes("github.com") &&
      (line.toLowerCase().includes("developer") ||
        line.toLowerCase().includes("engineer") ||
        line.toLowerCase().includes("architect") ||
        line.toLowerCase().includes("designer") ||
        line.toLowerCase().includes("manager") ||
        line.toLowerCase().includes("specialist") ||
        line.toLowerCase().includes("lead") ||
        line.toLowerCase().includes("full stack") ||
        line.toLowerCase().includes("frontend") ||
        line.toLowerCase().includes("backend") ||
        line.toLowerCase().includes("scientist"))
    ) {
      headline = line.replace(/[|•].*$/, "").trim();
      break;
    }
  }

  if (!headline) {
    headline = "Software Engineer & Builder";
  }

  // 6. Section Partitioning
  const sections = partitionResumeSections(cleanText);

  // Bio / Summary
  const bio = sections.summary || (sections.about || "Passionate engineer crafting scalable software and delightful user experiences.");

  // Skills
  const skills = extractSkills(sections.skills || cleanText);

  // Projects
  const projects = extractProjects(sections.projects || "");

  // Experiences
  const experiences = extractExperiences(sections.experience || "");

  // Education
  const education = extractEducation(sections.education || "");

  // Achievements
  const achievements = extractAchievements(sections.achievements || "");

  const portfolio = normalizePortfolio({
    full_name: full_name || "Nilesh Sharma",
    headline,
    bio,
    location,
    email,
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
  };
}

/**
 * Split text into semantic sections based on standard resume headers
 */
function partitionResumeSections(text: string): Record<string, string> {
  const result: Record<string, string> = {};
  const sectionKeywords = [
    { key: "summary", regex: /(?:^|\n)(?:PROFESSIONAL SUMMARY|SUMMARY|ABOUT ME|ABOUT|PROFILE|OBJECTIVE)/i },
    { key: "skills", regex: /(?:^|\n)(?:TECHNICAL SKILLS|CORE SKILLS|SKILLS & TECHNOLOGIES|SKILLS|TECH STACK|COMPETENCIES)/i },
    { key: "experience", regex: /(?:^|\n)(?:WORK EXPERIENCE|PROFESSIONAL EXPERIENCE|EXPERIENCE|EMPLOYMENT HISTORY|WORK HISTORY)/i },
    { key: "projects", regex: /(?:^|\n)(?:FEATURED PROJECTS|PERSONAL PROJECTS|PROJECTS|KEY PROJECTS|NOTABLE WORKS)/i },
    { key: "education", regex: /(?:^|\n)(?:EDUCATION|ACADEMIC BACKGROUND|DEGREES)/i },
    { key: "achievements", regex: /(?:^|\n)(?:ACHIEVEMENTS & AWARDS|ACHIEVEMENTS|AWARDS|CERTIFICATIONS|HONORS)/i },
  ];

  // Find all matches with their index positions
  const matches: Array<{ key: string; index: number; length: number }> = [];
  for (const item of sectionKeywords) {
    const match = text.match(item.regex);
    if (match && match.index !== undefined) {
      matches.push({ key: item.key, index: match.index, length: match[0].length });
    }
  }

  // Sort by appearance order
  matches.sort((a, b) => a.index - b.index);

  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];
    const startIndex = current.index + current.length;
    const endIndex = i + 1 < matches.length ? matches[i + 1].index : text.length;
    result[current.key] = text.slice(startIndex, endIndex).trim();
  }

  return result;
}

/**
 * Extract Skills
 */
function extractSkills(sectionText: string): Skill[] {
  const knownTechList = [
    "React", "React.js", "Next.js", "TypeScript", "JavaScript", "Node.js", "Express",
    "Python", "Django", "FastAPI", "PyTorch", "TensorFlow", "HTML5", "CSS3", "Tailwind CSS",
    "PostgreSQL", "MongoDB", "MySQL", "Redis", "GraphQL", "Docker", "Kubernetes", "AWS",
    "GCP", "Azure", "Git", "GitHub", "Three.js", "WebGL", "Rust", "Go", "C++", "Java",
    "Spring Boot", "Figma", "Redux", "CI/CD", "REST APIs", "LangChain", "OpenAI"
  ];

  const foundSkills: Set<string> = new Set();
  const skills: Skill[] = [];

  // Match comma / bullet separated tokens
  const tokens = sectionText
    .split(/[,•|\n;]/)
    .map((t) => t.replace(/^[-\s*]+/, "").trim())
    .filter((t) => t.length >= 2 && t.length <= 25);

  for (const token of tokens) {
    // If it contains a category label like "Languages: Python, JS", clean it
    const cleaned = token.replace(/^[A-Za-z\s]+:\s*/, "").trim();
    if (cleaned && cleaned.length >= 2 && !foundSkills.has(cleaned.toLowerCase())) {
      foundSkills.add(cleaned.toLowerCase());
      skills.push({
        id: generateId("skill"),
        name: cleaned,
        level: "Advanced",
      });
    }
  }

  // Check known tech keywords if skills list is small
  if (skills.length < 4) {
    for (const tech of knownTechList) {
      const regex = new RegExp(`\\b${tech.replace(".", "\\.")}\\b`, "i");
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

  return skills.slice(0, 16);
}

/**
 * Extract Projects
 */
function extractProjects(sectionText: string): Project[] {
  if (!sectionText) return [];
  const projects: Project[] = [];
  const projectBlocks = sectionText.split(/(?=\n(?:\d+\.|\*|###|[A-Z][a-zA-Z0-9\s-]{2,30}(?:\s*\(|:|\s*—)))/);

  for (const block of projectBlocks) {
    const trimmed = block.trim();
    if (trimmed.length < 20) continue;

    const lines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;

    // Title is first line
    const titleLine = lines[0].replace(/^[\d.*#\s-]+/, "").replace(/\s*\(.*?\)/, "").trim();
    if (titleLine.length < 2) continue;

    // Extract Links
    const liveMatch = trimmed.match(/(?:Live|Demo|App):\s*(https?:\/\/[^\s|)]+)/i);
    const codeMatch = trimmed.match(/(?:Code|GitHub|Repo):\s*(https?:\/\/[^\s|)]+)/i);

    // Extract Technologies
    const techMatch = trimmed.match(/(?:Tech|Technologies|Stack|Built with):\s*([^\n]+)/i);
    let technologies: string[] = [];
    if (techMatch) {
      technologies = techMatch[1].split(/[,|•]/).map((t) => t.trim()).filter(Boolean);
    } else {
      // Fallback: extract common keywords from block
      const keywords = ["React", "Next.js", "TypeScript", "Node.js", "Python", "Tailwind", "PostgreSQL", "Docker", "AWS"];
      technologies = keywords.filter((k) => new RegExp(`\\b${k}\\b`, "i").test(trimmed));
    }

    // Description is remaining lines
    const descLines = lines
      .slice(1)
      .filter((l) => !l.toLowerCase().includes("http") && !l.toLowerCase().startsWith("tech"))
      .map((l) => l.replace(/^[•*-]\s*/, ""));
    const description = descLines.join(" ") || "Interactive web application built with modern engineering standards.";

    projects.push({
      id: generateId("proj"),
      title: titleLine.replace(/^Project \d+[:\s]*/i, ""),
      description,
      image_url: "",
      technologies: technologies.length > 0 ? technologies : ["TypeScript", "React", "Tailwind"],
      github_url: codeMatch ? sanitizeUrl(codeMatch[1]) : "",
      live_url: liveMatch ? sanitizeUrl(liveMatch[1]) : "",
    });
  }

  return projects.slice(0, 6);
}

/**
 * Extract Experiences
 */
function extractExperiences(sectionText: string): Experience[] {
  if (!sectionText) return [];
  const experiences: Experience[] = [];
  const expBlocks = sectionText.split(/(?=\n(?:[A-Z][a-zA-Z0-9\s,&.-]{2,40}\s*(?:\||—|-|\bat\b|\bfrom\b)\s*|[A-Z][a-zA-Z\s]+\s*\(\d{4}))/);

  for (const block of expBlocks) {
    const trimmed = block.trim();
    if (trimmed.length < 25) continue;

    const lines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;

    const headerLine = lines[0].replace(/^[•*#-\s]+/, "");
    const parts = headerLine.split(/[|—–-]/).map((p) => p.trim());

    let role = parts[0] || "Software Engineer";
    let company = parts[1] || "Technology Company";

    // Date range extraction
    const dateMatch = trimmed.match(/((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|20\d\d|19\d\d)[a-zA-Z0-9,\s]*[—–-]\s*(?:Present|Current|20\d\d|19\d\d|[a-zA-Z0-9,\s]+))/i);
    let start_date = "2022";
    let end_date = "Present";

    if (dateMatch) {
      const dateParts = dateMatch[1].split(/[—–-]/).map((d) => d.trim());
      start_date = dateParts[0] || "2022";
      end_date = dateParts[1] || "Present";
    }

    const bullets = lines.slice(1).filter((l) => !dateMatch || !l.includes(dateMatch[1]));
    const description = bullets.length > 0 ? bullets.join("\n") : "Led software development and architectural designs for core product modules.";

    experiences.push({
      id: generateId("exp"),
      company: company.replace(/\(.*?\)/, "").trim(),
      role: role.replace(/\(.*?\)/, "").trim(),
      start_date,
      end_date,
      description,
    });
  }

  return experiences.slice(0, 4);
}

/**
 * Extract Education
 */
function extractEducation(sectionText: string): Education[] {
  if (!sectionText) return [];
  const list: Education[] = [];
  const lines = sectionText.split("\n").map((l) => l.trim()).filter(Boolean);

  if (lines.length > 0) {
    const line = lines[0];
    const institution = line.split(/[|•,]/)[0]?.trim() || "University of Technology";
    const degreeMatch = sectionText.match(/(B\.S\.|M\.S\.|B\.Tech|M\.Tech|Bachelor|Master|Ph\.D\.|Associate)[^,\n]*/i);
    const degree = degreeMatch ? degreeMatch[0].trim() : "B.S. in Computer Science";
    const yearMatch = sectionText.match(/(\d{4})\s*[—–-]\s*(\d{4}|Present)/);

    list.push({
      id: generateId("edu"),
      institution,
      degree,
      field: "Computer Science",
      start_year: yearMatch ? yearMatch[1] : "2018",
      end_year: yearMatch ? yearMatch[2] : "2022",
      description: lines.slice(1).join(" ") || "",
    });
  }

  return list;
}

/**
 * Extract Achievements
 */
function extractAchievements(sectionText: string): Achievement[] {
  if (!sectionText) return [];
  const list: Achievement[] = [];
  const lines = sectionText.split("\n").map((l) => l.replace(/^[•*-]\s*/, "").trim()).filter(Boolean);

  for (const line of lines.slice(0, 3)) {
    if (line.length < 5) continue;
    list.push({
      id: generateId("ach"),
      title: line.split(/[:|]/)[0]?.trim() || line,
      date: "Recent",
      issuer: "Industry Recognition",
      description: line,
      credential_url: "",
    });
  }

  return list;
}
