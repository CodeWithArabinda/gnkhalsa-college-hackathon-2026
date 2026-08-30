export const demoData = {
  personal: {
    name: "GUPTA",
    tagline: "Full Stack Web Developer & 3D Interactive Architect",
    bio: "Building high-throughput WebGL applications, 3D interactive canvases, and modern web software with GSAP and Spline.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://x.com"
    }
  },
  skills: [
    { name: "React 18", key: "Q", category: "FRONTEND" },
    { name: "TypeScript", key: "W", category: "LANGUAGES" },
    { name: "Three.js / WebGL", key: "E", category: "3D GRAPHICS" },
    { name: "GSAP Motion", key: "R", category: "ANIMATION" },
    { name: "Node.js", key: "T", category: "BACKEND" },
    { name: "Tailwind CSS", key: "Y", category: "STYLING" },
    { name: "Supabase DB", key: "U", category: "DATABASE" },
    { name: "Docker Cloud", key: "I", category: "DEVOPS" }
  ],
  projects: [
    {
      id: "p1",
      title: "Spline 3D Interactive Canvas",
      description: "Real-time 3D viewport with smooth WebGL camera control and custom GLTF models.",
      tags: ["Spline", "Three.js", "GSAP"],
      image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
      project_url: "https://github.com"
    },
    {
      id: "p2",
      title: "GSAP Lenis Kinetic Physics",
      description: "High-performance scroll-driven animations with inertial physics.",
      tags: ["GSAP", "Lenis", "React 18"],
      image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
      project_url: "https://github.com"
    },
    {
      id: "p3",
      title: "Distributed Telemetry Engine",
      description: "Real-time streaming telemetry dashboard with WebSocket hooks.",
      tags: ["Node.js", "TypeScript", "Redis"],
      image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop",
      project_url: "https://github.com"
    }
  ],
  contact: {
    email: "nilesh@example.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com"
  }
};

export default demoData;
