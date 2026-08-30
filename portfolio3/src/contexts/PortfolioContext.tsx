import React, { createContext, useContext, useMemo } from "react";
import { config as defaultConfig } from "../constants/config";
import {
  experiences as defaultExperiences,
  projects as defaultProjects,
  services as defaultServices,
  technologies as defaultTechnologies,
  socialLinks as defaultSocialLinks,
  stats as defaultStats,
  skillCategories as defaultSkillCategories,
} from "../constants";
import type {
  TExperience,
  TProject,
  TTechnology,
  TSocial,
  TService,
  TSkillCategory,
} from "../types";

export interface PortfolioDataProps {
  full_name?: string;
  name?: string;
  headline?: string;
  role?: string;
  bio?: string;
  about?: string;
  location?: string;
  email?: string;
  resume_url?: string;
  avatar_url?: string;
  profile_image_url?: string;
  social?: {
    github?: string;
    linkedin?: string;
    email?: string;
    twitter?: string;
    instagram?: string;
  };
  experiences?: Array<{
    title?: string;
    role?: string;
    companyName?: string;
    company?: string;
    date?: string;
    start_date?: string;
    end_date?: string;
    points?: string[];
    description?: string[];
    icon?: string;
    iconBg?: string;
  }>;
  projects?: Array<{
    title?: string;
    name?: string;
    description?: string;
    image?: string;
    image_url?: string;
    src?: string;
    github?: string;
    github_url?: string;
    sourceCodeLink?: string;
    live?: string;
    live_url?: string;
    liveLink?: string;
    tags?: Array<{ name: string; color: string }>;
    technologies?: string[];
  }>;
  skills?: Array<{
    name: string;
    level?: string;
    category?: string;
    icon?: string;
  }>;
  services?: Array<{
    title: string;
    icon: string;
  }>;
}

interface PortfolioContextType {
  config: typeof defaultConfig;
  experiences: TExperience[];
  projects: TProject[];
  services: TService[];
  technologies: TTechnology[];
  socialLinks: TSocial[];
  stats: typeof defaultStats;
  skillCategories: TSkillCategory[];
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export const PortfolioProvider: React.FC<{
  portfolio?: PortfolioDataProps;
  children: React.ReactNode;
}> = ({ portfolio, children }) => {
  const value = useMemo(() => {
    if (!portfolio) {
      return {
        config: defaultConfig,
        experiences: defaultExperiences,
        projects: defaultProjects,
        services: defaultServices,
        technologies: defaultTechnologies,
        socialLinks: defaultSocialLinks,
        stats: defaultStats,
        skillCategories: defaultSkillCategories,
      };
    }

    // Merge Config
    const fullName = portfolio.full_name || portfolio.name || defaultConfig.html.fullName;
    const role = portfolio.headline || portfolio.role || defaultConfig.hero.role;
    const bioText = portfolio.bio || portfolio.about || defaultConfig.sections.about.content;
    const email = portfolio.email || defaultConfig.html.email;
    const resumeUrl = portfolio.resume_url || defaultConfig.hero.resumeUrl;
    const avatarUrl = portfolio.profile_image_url || portfolio.avatar_url || defaultConfig.hero.avatarUrl;

    const mergedConfig = {
      ...defaultConfig,
      html: {
        ...defaultConfig.html,
        title: `${fullName} — ${role}`,
        fullName,
        email,
      },
      hero: {
        ...defaultConfig.hero,
        name: fullName,
        role,
        p: bioText ? bioText.split("\n").filter(Boolean) : defaultConfig.hero.p,
        resumeUrl,
        avatarUrl,
      },
      sections: {
        ...defaultConfig.sections,
        about: {
          ...defaultConfig.sections.about,
          content: bioText,
        },
      },
    };

    // Merge Social Links
    let mergedSocial = defaultSocialLinks;
    if (portfolio.social) {
      mergedSocial = [
        {
          name: "GitHub",
          url: portfolio.social.github || "https://github.com",
          icon: "github",
        },
        {
          name: "LinkedIn",
          url: portfolio.social.linkedin || "https://linkedin.com",
          icon: "linkedin",
        },
        {
          name: "Email",
          url: portfolio.social.email || (email ? `mailto:${email}` : "mailto:contact@example.com"),
          icon: "email",
        },
      ];
    }

    // Merge Experiences
    let mergedExperiences = defaultExperiences;
    if (portfolio.experiences !== undefined) {
      mergedExperiences = portfolio.experiences.map((exp, idx) => {
        const defaultExp = defaultExperiences[idx % defaultExperiences.length];
        const dateStr = exp.date || (exp.start_date ? `${exp.start_date} — ${exp.end_date || "Present"}` : defaultExp.date);
        
        return {
          title: exp.title || exp.role || defaultExp.title,
          companyName: exp.companyName || exp.company || defaultExp.companyName,
          icon: exp.icon || defaultExp.icon,
          iconBg: exp.iconBg || defaultExp.iconBg,
          date: dateStr,
          points: exp.points || exp.description || defaultExp.points,
        };
      });
    }

    // Merge Projects
    let mergedProjects = defaultProjects;
    if (portfolio.projects !== undefined) {
      const colorPalette = ["blue-text-gradient", "green-text-gradient", "pink-text-gradient"];
      mergedProjects = portfolio.projects.map((proj, idx) => {
        const defaultProj = defaultProjects[idx % defaultProjects.length];
        const tags = proj.tags || (proj.technologies ? proj.technologies.map((t, i) => ({
          name: t,
          color: colorPalette[i % colorPalette.length],
        })) : defaultProj.tags);

        return {
          name: proj.title || proj.name || defaultProj.name,
          description: proj.description || defaultProj.description,
          image: proj.image_url || proj.image || proj.src || defaultProj.image,
          sourceCodeLink: proj.github_url || proj.github || proj.sourceCodeLink || defaultProj.sourceCodeLink,
          liveLink: proj.live_url || proj.live || proj.liveLink || defaultProj.liveLink,
          tags,
        };
      });
    }

    // Merge Skills / Services if present
    const mergedServices = portfolio.services ? portfolio.services.map((s, idx) => ({
      title: s.title,
      icon: s.icon || defaultServices[idx % defaultServices.length].icon,
    })) : defaultServices;

    return {
      config: mergedConfig,
      experiences: mergedExperiences,
      projects: mergedProjects,
      services: mergedServices,
      technologies: defaultTechnologies,
      socialLinks: mergedSocial,
      stats: defaultStats,
      skillCategories: defaultSkillCategories,
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
