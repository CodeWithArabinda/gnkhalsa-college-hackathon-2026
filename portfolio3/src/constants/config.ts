type TSection = {
  p: string;
  h2: string;
  content?: string;
};

type TConfig = {
  html: {
    title: string;
    fullName: string;
    email: string;
  };
  hero: {
    name: string;
    role: string;
    p: string[];
    resumeUrl: string;
    avatarUrl: string;
  };
  contact: {
    form: {
      name: {
        span: string;
        placeholder: string;
      };
      email: {
        span: string;
        placeholder: string;
      };
      message: {
        span: string;
        placeholder: string;
      };
    };
  } & TSection;
  sections: {
    about: Required<TSection>;
    experience: TSection;
    education: TSection;
    skills: TSection;
    achievements: TSection;
    currently: TSection;
    feedbacks: TSection;
    works: Required<TSection>;
  };
};

export const config: TConfig = {
  html: {
    title: "Nilesh Gupta — Software Engineer & 3D Web Developer",
    fullName: "Nilesh Gupta",
    email: "nilesh.gupta.dev@gmail.com",
  },
  hero: {
    name: "Nilesh Gupta",
    role: "Full Stack & AI Solutions Developer",
    p: [
      "I craft scalable web applications, 3D interactive user interfaces,",
      "and intelligent AI solutions that power modern digital experiences.",
    ],
    resumeUrl: "#contact",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
  },
  contact: {
    p: "Get in touch",
    h2: "Contact.",
    form: {
      name: {
        span: "Your Name",
        placeholder: "What's your name?",
      },
      email: { span: "Your Email", placeholder: "What's your email?" },
      message: {
        span: "Your Message",
        placeholder: "Have an interesting project? Let's talk...",
      },
    },
  },
  sections: {
    about: {
      p: "Introduction & Story",
      h2: "About Me.",
      content: `I am a driven software developer with over 2 years of experience building modern, high-performance web applications and intelligent systems. Specializing in TypeScript, React, Node.js, Next.js, and Three.js, I bridge the gap between stunning visual aesthetics and robust backend architecture. Passionate about AI integration and human-centric software design.`,
    },
    experience: {
      p: "What I have done so far",
      h2: "Work Experience.",
    },
    education: {
      p: "Academic Background",
      h2: "Education.",
    },
    skills: {
      p: "Technologies & Tools",
      h2: "Skills & Tech Stack.",
    },
    achievements: {
      p: "Recognition & Learning",
      h2: "Achievements & Certifications.",
    },
    currently: {
      p: "Current Focus & Goals",
      h2: "Now / Active Status.",
    },
    feedbacks: {
      p: "What others say",
      h2: "Testimonials.",
    },
    works: {
      p: "My showcase",
      h2: "Featured Projects.",
      content: `The following projects showcase my technical capabilities through real-world software engineering examples. Each project is documented with descriptions, technology stacks, live production links, and GitHub code repositories.`,
    },
  },
};

