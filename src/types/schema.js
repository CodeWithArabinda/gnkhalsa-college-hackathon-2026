export const initialPortfolioSchema = {
  metadata: {
    title: "My Creative Portfolio",
    slug: "alex-dev",
    theme: "cinematic", // 'cinematic' | 'neo_brutalist' | 'vscode' | 'bento'
    accentColor: "#FF6B1A",
    fontFamily: "Space Grotesk, sans-serif",
    published: false
  },
  blocks: [
    {
      id: "hero-1",
      type: "HeroBlock",
      content: {
        headline: "Creative Developer & Designer",
        name: "Alex Rivera",
        bio: "Building high-impact digital experiences with React, WebGL, and modern design systems.",
        ctaText: "Explore Projects",
        secondaryCta: "Contact Me"
      }
    },
    {
      id: "projects-1",
      type: "ProjectGridBlock",
      content: {
        title: "Featured Works",
        subtitle: "Selected software and design showcases",
        items: [
          {
            id: "p1",
            title: "3D Space Canvas",
            description: "Interactive WebGL portfolio template with real-time video scrubbing.",
            tags: ["React", "WebGL", "GSAP"],
            link: "https://github.com"
          },
          {
            id: "p2",
            title: "AI Studio Copilot",
            description: "Conversational website builder with live preview frame and inline edits.",
            tags: ["TypeScript", "Tailwind", "AI"],
            link: "https://github.com"
          }
        ]
      }
    },
    {
      id: "skills-1",
      type: "SkillsBlock",
      content: {
        title: "Technical Stack",
        categories: [
          { name: "Frontend", skills: ["React", "Vite", "Tailwind CSS", "GSAP"] },
          { name: "Backend & DB", skills: ["Node.js", "Supabase", "PostgreSQL"] },
          { name: "Tools", skills: ["Git", "Figma", "Docker", "Vercel"] }
        ]
      }
    },
    {
      id: "contact-1",
      type: "ContactBlock",
      content: {
        title: "Let's Build Something Cool",
        subtitle: "Available for full-time opportunities and creative projects.",
        email: "alex@developer.com",
        githubUrl: "https://github.com",
        linkedinUrl: "https://linkedin.com"
      }
    }
  ]
};
