import React, { createContext, useContext, useMemo } from "react";
import { footer as defaultFooter, routes as defaultRoutes } from "../data/global";
import { skills as defaultSkills, testimonials as defaultTestimonials } from "../data/content/home";
import defaultProjects from "../data/content/projects";

export interface PortfolioDataProps {
  full_name?: string;
  name?: string;
  headline?: string;
  role?: string;
  bio?: string;
  about?: string;
  email?: string;
  social?: {
    github?: string;
    linkedin?: string;
    email?: string;
    twitter?: string;
  };
  projects?: Array<{
    title?: string;
    name?: string;
    description?: string;
    image_url?: string;
    img?: string;
    github_url?: string;
    github?: string;
    live_url?: string;
    link?: string;
    technologies?: string[];
    tags?: string[];
  }>;
  skills?: Array<{
    title?: string;
    name?: string;
    icon?: string;
  }>;
  testimonials?: Array<{
    quote?: string;
    testimonial?: string;
    name?: string;
    job?: string;
    company?: string;
  }>;
}

interface PortfolioContextType {
  fullName: string;
  headline: string;
  bio: string;
  email: string;
  footer: typeof defaultFooter;
  skills: typeof defaultSkills;
  testimonials: typeof defaultTestimonials;
  projects: typeof defaultProjects;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

const DEFAULT_NAME = "Nilesh";

export const PortfolioProvider: React.FC<{
  portfolio?: PortfolioDataProps;
  children: React.ReactNode;
}> = ({ portfolio, children }) => {
  const value = useMemo(() => {
    if (!portfolio) {
      return {
        fullName: DEFAULT_NAME,
        headline: "I enjoy building and designing for the web.",
        bio: "I'm a passionate web developer and designer coding beautiful websites and apps.",
        email: "contact@example.com",
        footer: defaultFooter,
        skills: defaultSkills,
        testimonials: defaultTestimonials,
        projects: defaultProjects,
      };
    }

    const fullName = portfolio.full_name || portfolio.name || DEFAULT_NAME;
    const headline = portfolio.headline || portfolio.role || "I enjoy building and designing for the web.";
    const bio = portfolio.bio || portfolio.about || "I'm a passionate web developer and designer coding beautiful websites and apps.";
    const email = portfolio.email || "contact@example.com";

    // Merge Skills
    const skills = portfolio.skills !== undefined
      ? portfolio.skills.map((s, idx) => ({
          title: s.title || s.name || defaultSkills[idx % defaultSkills.length].title,
          icon: s.icon || defaultSkills[idx % defaultSkills.length].icon,
        }))
      : defaultSkills;

    // Merge Projects
    const projects = portfolio.projects !== undefined
      ? portfolio.projects.map((p, idx) => ({
          id: idx,
          title: p.title || p.name || defaultProjects[idx % defaultProjects.length].title,
          desc: p.description || defaultProjects[idx % defaultProjects.length].desc,
          img: p.image_url || p.img || defaultProjects[idx % defaultProjects.length].img,
          link: p.live_url || p.link || defaultProjects[idx % defaultProjects.length].link,
          github: p.github_url || p.github || defaultProjects[idx % defaultProjects.length].github,
          tags: p.technologies || p.tags || defaultProjects[idx % defaultProjects.length].tags,
        }))
      : defaultProjects;

    // Merge Testimonials
    const testimonials = portfolio.testimonials !== undefined
      ? portfolio.testimonials.map((t, idx) => ({
          quote: t.quote || t.testimonial || defaultTestimonials[idx % defaultTestimonials.length].quote,
          name: t.name || defaultTestimonials[idx % defaultTestimonials.length].name,
          job: t.job || t.company || defaultTestimonials[idx % defaultTestimonials.length].job,
        }))
      : defaultTestimonials;

    // Merge Footer
    const footer = {
      ...defaultFooter,
      columns: defaultFooter.columns.map((col) => {
        if (col.title === "Social" && portfolio.social) {
          return {
            ...col,
            links: col.links.map((link) => {
              if (link.name === "GitHub" && portfolio.social?.github) {
                return { ...link, link: portfolio.social.github };
              }
              if (link.name === "LinkedIn" && portfolio.social?.linkedin) {
                return { ...link, link: portfolio.social.linkedin };
              }
              if (link.name === "Email" && (portfolio.social?.email || email)) {
                return { ...link, link: `mailto:${portfolio.social?.email || email}` };
              }
              return link;
            }),
          };
        }
        return col;
      }),
    };

    return {
      fullName,
      headline,
      bio,
      email,
      footer,
      skills,
      testimonials,
      projects,
    };
  }, [portfolio]);

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
