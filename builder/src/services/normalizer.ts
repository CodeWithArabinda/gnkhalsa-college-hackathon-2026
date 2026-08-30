import { CanonicalPortfolio, Project, Skill, Experience, Education, Achievement } from "../types/portfolio";
import { generateId, sanitizeUrl } from "../lib/utils";

export const DEFAULT_TEMPLATE = "dark_developer";

export function createEmptyPortfolio(template = DEFAULT_TEMPLATE): CanonicalPortfolio {
  return {
    selected_template: template,
    full_name: "",
    headline: "",
    bio: "",
    profile_image_url: "",
    location: "",
    email: "",
    github_url: "",
    linkedin_url: "",
    resume_url: "",
    resume_file_name: "",
    projects: [],
    skills: [],
    experiences: [],
    education: [],
    achievements: [],
  };
}

export function normalizePortfolio(raw: any, fallbackTemplate = DEFAULT_TEMPLATE): CanonicalPortfolio {
  if (!raw || typeof raw !== "object") {
    return createEmptyPortfolio(fallbackTemplate);
  }

  const selected_template = typeof raw.selected_template === "string" && raw.selected_template.trim()
    ? raw.selected_template.trim()
    : fallbackTemplate;

  const full_name = typeof raw.full_name === "string" ? raw.full_name.trim() : (typeof raw.name === "string" ? raw.name.trim() : "");
  const headline = typeof raw.headline === "string" ? raw.headline.trim() : (typeof raw.role === "string" ? raw.role.trim() : "");
  const bio = typeof raw.bio === "string" ? raw.bio.trim() : (typeof raw.about === "string" ? raw.about.trim() : (typeof raw.summary === "string" ? raw.summary.trim() : ""));
  
  const profile_image_url = typeof raw.profile_image_url === "string" ? raw.profile_image_url.trim() : (typeof raw.avatar_url === "string" ? raw.avatar_url.trim() : "");
  const location = typeof raw.location === "string" ? raw.location.trim() : (typeof raw.city === "string" ? raw.city.trim() : "");
  const email = typeof raw.email === "string" ? raw.email.trim() : (typeof raw.contact_email === "string" ? raw.contact_email.trim() : "");

  const github_url = sanitizeUrl(typeof raw.github_url === "string" ? raw.github_url : (raw.social?.github || raw.github || ""));
  const linkedin_url = sanitizeUrl(typeof raw.linkedin_url === "string" ? raw.linkedin_url : (raw.social?.linkedin || raw.linkedin || ""));
  const resume_url = sanitizeUrl(typeof raw.resume_url === "string" ? raw.resume_url : "");
  const resume_file_name = typeof raw.resume_file_name === "string" ? raw.resume_file_name.trim() : "";

  // Normalize Projects
  const projects: Project[] = Array.isArray(raw.projects)
    ? raw.projects.map((p: any, idx: number) => {
        const title = typeof p?.title === "string" ? p.title.trim() : (typeof p?.name === "string" ? p.name.trim() : `Project ${idx + 1}`);
        const description = typeof p?.description === "string" ? p.description.trim() : (typeof p?.desc === "string" ? p.desc.trim() : "");
        const image_url = typeof p?.image_url === "string" ? p.image_url.trim() : (typeof p?.src === "string" ? p.src.trim() : (typeof p?.img === "string" ? p.img.trim() : ""));
        const technologies = Array.isArray(p?.technologies)
          ? p.technologies.map((t: any) => String(t).trim()).filter(Boolean)
          : (Array.isArray(p?.tags) ? p.tags.map((t: any) => String(t?.name || t).trim()).filter(Boolean) : []);
        const github_url = sanitizeUrl(typeof p?.github_url === "string" ? p.github_url : (p?.github || p?.sourceCodeLink || ""));
        const live_url = sanitizeUrl(typeof p?.live_url === "string" ? p.live_url : (p?.live || p?.liveLink || p?.link || ""));
        
        return {
          id: p?.id ? String(p.id) : generateId(`project-${idx + 1}`),
          title,
          description,
          image_url,
          technologies,
          github_url,
          live_url,
        };
      })
    : [];

  // Normalize Skills
  const skills: Skill[] = Array.isArray(raw.skills)
    ? raw.skills.map((s: any, idx: number) => {
        if (typeof s === "string") {
          return {
            id: generateId(`skill-${idx + 1}`),
            name: s.trim(),
            level: "Advanced",
          };
        }
        return {
          id: s?.id ? String(s.id) : generateId(`skill-${idx + 1}`),
          name: typeof s?.name === "string" ? s.name.trim() : (typeof s?.title === "string" ? s.title.trim() : `Skill ${idx + 1}`),
          level: s?.level || "Advanced",
          category: s?.category || undefined,
        };
      })
    : [];

  // Normalize Experiences
  const experiences: Experience[] = Array.isArray(raw.experiences)
    ? raw.experiences.map((e: any, idx: number) => {
        const company = typeof e?.company === "string" ? e.company.trim() : (typeof e?.companyName === "string" ? e.companyName.trim() : `Company ${idx + 1}`);
        const role = typeof e?.role === "string" ? e.role.trim() : (typeof e?.title === "string" ? e.title.trim() : "Software Engineer");
        const start_date = typeof e?.start_date === "string" ? e.start_date.trim() : (typeof e?.startDate === "string" ? e.startDate.trim() : (typeof e?.date === "string" ? e.date.split("—")[0]?.trim() || e.date : ""));
        const end_date = typeof e?.end_date === "string" ? e.end_date.trim() : (typeof e?.endDate === "string" ? e.endDate.trim() : (typeof e?.date === "string" && e.date.includes("—") ? e.date.split("—")[1]?.trim() || "Present" : "Present"));
        const description = typeof e?.description === "string" 
          ? e.description.trim() 
          : (Array.isArray(e?.points) ? e.points.join("\n") : (Array.isArray(e?.description) ? e.description.join("\n") : ""));

        return {
          id: e?.id ? String(e.id) : generateId(`exp-${idx + 1}`),
          company,
          role,
          start_date,
          end_date,
          description,
        };
      })
    : [];

  // Normalize Education
  const education: Education[] = Array.isArray(raw.education)
    ? raw.education.map((ed: any, idx: number) => {
        return {
          id: ed?.id ? String(ed.id) : generateId(`edu-${idx + 1}`),
          institution: typeof ed?.institution === "string" ? ed.institution.trim() : (typeof ed?.school === "string" ? ed.school.trim() : (typeof ed?.university === "string" ? ed.university.trim() : "")),
          degree: typeof ed?.degree === "string" ? ed.degree.trim() : "",
          field: typeof ed?.field === "string" ? ed.field.trim() : (typeof ed?.major === "string" ? ed.major.trim() : ""),
          start_year: typeof ed?.start_year === "string" ? ed.start_year.trim() : (typeof ed?.startYear === "string" ? ed.startYear.trim() : ""),
          end_year: typeof ed?.end_year === "string" ? ed.end_year.trim() : (typeof ed?.endYear === "string" ? ed.endYear.trim() : ""),
          description: typeof ed?.description === "string" ? ed.description.trim() : (typeof ed?.details === "string" ? ed.details.trim() : ""),
        };
      })
    : [];

  // Normalize Achievements
  const achievements: Achievement[] = Array.isArray(raw.achievements)
    ? raw.achievements.map((a: any, idx: number) => {
        return {
          id: a?.id ? String(a.id) : generateId(`ach-${idx + 1}`),
          title: typeof a?.title === "string" ? a.title.trim() : "",
          date: typeof a?.date === "string" ? a.date.trim() : (typeof a?.year === "string" ? a.year.trim() : ""),
          issuer: typeof a?.issuer === "string" ? a.issuer.trim() : (typeof a?.organization === "string" ? a.organization.trim() : ""),
          description: typeof a?.description === "string" ? a.description.trim() : "",
          credential_url: sanitizeUrl(typeof a?.credential_url === "string" ? a.credential_url : (a?.link || "")),
        };
      })
    : [];

  return {
    selected_template,
    full_name,
    headline,
    bio,
    profile_image_url,
    location,
    email,
    github_url,
    linkedin_url,
    resume_url,
    resume_file_name,
    projects,
    skills,
    experiences,
    education,
    achievements,
  };
}
