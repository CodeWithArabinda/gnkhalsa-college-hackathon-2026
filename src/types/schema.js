export const initialPortfolioSchema = {
  metadata: {
    title: "My Creative Portfolio",
    slug: "alex-dev",
    theme: "cinematic", // 'cinematic' | 'neo_brutalist' | 'vscode' | 'bento'
    accentColor: "#FF6B1A",
    fontFamily: "Space Grotesk, sans-serif",
    published: false
  },
  elementStyles: {
    "hero-tagline": { x: 0, y: 0, fontSize: 12, color: "#FF6B1A", fontFamily: "Space Grotesk, sans-serif", textAlign: "left", fontWeight: "700", fontStyle: "normal", textDecoration: "none" },
    "hero-name": { x: 0, y: 0, fontSize: 56, color: "#FFFFFF", fontFamily: "Space Grotesk, sans-serif", textAlign: "left", fontWeight: "900", fontStyle: "normal", textDecoration: "none" },
    "hero-bio": { x: 0, y: 0, fontSize: 15, color: "#CBD5E1", fontFamily: "Inter, sans-serif", textAlign: "left", fontWeight: "400", fontStyle: "normal", textDecoration: "none" },
    "hero-avatar": { x: 0, y: 0, width: 144, height: 144, borderRadius: 24 }
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
