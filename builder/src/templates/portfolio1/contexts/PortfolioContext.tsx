import React, { createContext, useContext, ReactNode } from "react";
import { config as defaultConfig } from "@portfolio1/data/config";
import { SKILLS as defaultSkills, EXPERIENCE as defaultExperiences, SkillNames } from "@portfolio1/data/constants";
import defaultProjects from "@portfolio1/data/projects";
import { TypographyH3, TypographyP } from "@portfolio1/components/ui/typography";

export interface PortfolioData {
  selected_template?: string;
  full_name?: string;
  headline?: string;
  bio?: string;
  profile_image_url?: string;
  location?: string;
  email?: string;
  github_url?: string;
  linkedin_url?: string;
  resume_url?: string;
  resume_file_name?: string;
  projects?: any[];
  skills?: any[];
  experiences?: any[];
  education?: any[];
  achievements?: any[];
}

export interface ResolvedPortfolio {
  config: typeof defaultConfig & {
    resumeUrl: string;
    headline: string;
    bio: string;
  };
  SKILLS: typeof defaultSkills;
  EXPERIENCE: typeof defaultExperiences;
  projects: typeof defaultProjects;
}

const PortfolioContext = createContext<ResolvedPortfolio | null>(null);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};

interface PortfolioProviderProps {
  children: ReactNode;
  portfolio?: PortfolioData;
}

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({ children, portfolio }) => {
  // 1. Resolve Config
  const resolvedConfig = {
    ...defaultConfig,
    title: portfolio?.headline ? `${portfolio.full_name || defaultConfig.author} | ${portfolio.headline}` : defaultConfig.title,
    author: portfolio?.full_name || defaultConfig.author,
    email: portfolio?.email || defaultConfig.email,
    social: {
      ...defaultConfig.social,
      twitter: portfolio?.github_url ? `https://x.com/${portfolio.github_url.split("/").pop()}` : defaultConfig.social.twitter,
      linkedin: portfolio?.linkedin_url || defaultConfig.social.linkedin,
      github: portfolio?.github_url || defaultConfig.social.github,
    }
  };

  // 2. Resolve Skills
  let resolvedSkillsRecord = defaultSkills;
  if (portfolio?.skills !== undefined) {
    if (Array.isArray(portfolio.skills)) {
      const skillsArray = portfolio.skills.map((skill: any) => {
        // Find if we have a default skill details we can inherit (like color and icon)
        const defaultSkill = Object.values(defaultSkills).find(
          (s: any) => s.name.toLowerCase() === skill.name.toLowerCase() || s.label.toLowerCase() === skill.name.toLowerCase()
        );
        return {
          id: skill.id || defaultSkill?.id || Math.floor(Math.random() * 1000),
          name: skill.name || defaultSkill?.name || skill.name.toLowerCase(),
          label: skill.label || defaultSkill?.label || skill.name,
          shortDescription: skill.shortDescription || defaultSkill?.shortDescription || skill.level || "",
          color: skill.color || defaultSkill?.color || "#ffffff",
          icon: skill.icon || defaultSkill?.icon || "",
        };
      });

      // Construct a new record of skills
      resolvedSkillsRecord = {} as any;
      skillsArray.forEach((skill) => {
        (resolvedSkillsRecord as any)[skill.name] = skill;
      });
    }
  }

  // 3. Resolve Experiences
  let resolvedExperiences = defaultExperiences;
  if (portfolio?.experiences !== undefined) {
    if (Array.isArray(portfolio.experiences)) {
      resolvedExperiences = portfolio.experiences.map((exp: any) => {
        const descArray = Array.isArray(exp.description)
          ? exp.description
          : typeof exp.description === "string"
          ? [exp.description]
          : [];

        const resolvedSkillsForExp = (exp.skills || []).map((sName: string) => {
          const defaultSkill = Object.values(defaultSkills).find(
            (s: any) => s.name.toLowerCase() === sName.toLowerCase() || s.label.toLowerCase() === sName.toLowerCase()
          );
          return defaultSkill ? defaultSkill.name : sName.toLowerCase();
        });

        return {
          id: exp.id || Math.floor(Math.random() * 1000),
          startDate: exp.start_date || exp.startDate || "",
          endDate: exp.end_date || exp.endDate || "",
          title: exp.role || exp.title || "",
          company: exp.company || "",
          description: descArray,
          skills: resolvedSkillsForExp,
        };
      });
    }
  }

  // 4. Resolve Projects
  let resolvedProjects = defaultProjects;
  if (portfolio?.projects !== undefined) {
    if (Array.isArray(portfolio.projects)) {
      // Find Brand Chip Helper
      const brand = (title: string, file: string) => ({
        title,
        bg: "black",
        fg: "white",
        icon: (
          <span
            role="img"
            aria-label={title}
            className="block bg-current"
            style={{
              width: "1em",
              height: "1em",
              WebkitMaskImage: `url(/assets/logos/${file})`,
              maskImage: `url(/assets/logos/${file})`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              WebkitMaskSize: "contain",
              maskSize: "contain",
            }}
          />
        ),
      });

      const brandSkills = {
        next: brand("Next.js", "nextdotjs-mono.svg"),
        chakra: brand("Chakra UI", "chakra-ui-mono.svg"),
        node: brand("Node.js", "nodedotjs-mono.svg"),
        python: brand("Python", "python-mono.svg"),
        prisma: brand("Prisma", "prisma-mono.svg"),
        postgres: brand("PostgreSQL", "postgresql-mono.svg"),
        mongo: brand("MongoDB", "mongodb-mono.svg"),
        express: brand("Express", "express-mono.svg"),
        reactQuery: brand("React Query", "react-query-mono.svg"),
        shadcn: brand("shadcn/ui", "shadcn-ui-mono.svg"),
        tailwind: brand("Tailwind", "tailwind-css-mono.svg"),
      };

      resolvedProjects = portfolio.projects.map((p: any) => {
        const frontendSkills: any[] = [];
        const backendSkills: any[] = [];
        const techList = p.technologies || [];

        techList.forEach((tech: string) => {
          const resolvedBrand = (brandSkills as any)[tech.toLowerCase()] ||
            Object.values(brandSkills).find((s: any) => s.title.toLowerCase() === tech.toLowerCase());

          const skillObj = resolvedBrand || {
            title: tech,
            bg: "black",
            fg: "white",
            icon: <span className="text-[10px] font-mono font-bold">{tech.substring(0, 2).toUpperCase()}</span>,
          };

          const isBackend = ["node", "nodejs", "express", "postgres", "postgresql", "mongo", "mongodb", "prisma", "python", "docker", "aws", "gcp", "go", "golang", "rust", "mysql"].includes(tech.toLowerCase());
          if (isBackend) {
            backendSkills.push(skillObj);
          } else {
            frontendSkills.push(skillObj);
          }
        });

        const contentNode = p.content ? p.content : (
          <div>
            <TypographyH3 className="my-4 mt-8">About the Project</TypographyH3>
            <TypographyP>{p.description || ""}</TypographyP>
            {p.technologies && p.technologies.length > 0 && (
              <>
                <TypographyH3 className="my-4 mt-8">Technologies Used</TypographyH3>
                <TypographyP>{p.technologies.join(", ")}</TypographyP>
              </>
            )}
          </div>
        );

        return {
          id: p.id || String(Math.random()),
          title: p.title,
          category: p.category || (p.technologies ? p.technologies[0] : "Web App"),
          src: p.image_url || p.src || "/assets/projects-screenshots/portfolio/landing.png",
          screenshots: p.screenshots || [p.image_url || p.src || "/assets/projects-screenshots/portfolio/landing.png"],
          github: p.github_url || p.github || "#",
          live: p.live_url || p.live || "#",
          skills: {
            frontend: frontendSkills,
            backend: backendSkills,
          },
          content: contentNode,
        };
      });
    }
  }

  // 5. Add custom extra data fields like resume_url and headline directly on config for simple consumption
  const configWithCustom = {
    ...resolvedConfig,
    resumeUrl: portfolio?.resume_url || "https://drive.google.com/file/d/1MTSsUA8V7Po2AsNXT8kZ5sLOpzC8l7qm/view?usp=sharing",
    headline: portfolio?.headline || "A Full Stack Web Developer",
    bio: portfolio?.bio || "",
  };

  const contextValue: ResolvedPortfolio = {
    config: configWithCustom,
    SKILLS: resolvedSkillsRecord,
    EXPERIENCE: resolvedExperiences,
    projects: resolvedProjects,
  };

  return (
    <PortfolioContext.Provider value={contextValue}>
      {children}
    </PortfolioContext.Provider>
  );
};
