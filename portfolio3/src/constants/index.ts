import type {
  TNavLink,
  TService,
  TTechnology,
  TExperience,
  TEducation,
  TAchievement,
  TCurrently,
  TStat,
  TSocial,
  TProject,
  TSkillCategory,
  TTestimonial,
} from "../types";

import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";

export const navLinks: TNavLink[] = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "about",
    title: "About",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

export const stats: TStat[] = [
  { value: "2+", label: "Years Experience" },
  { value: "15+", label: "Projects Built" },
  { value: "20+", label: "Skills & Tools" },
];

export const socialLinks: TSocial[] = [
  {
    name: "GitHub",
    url: "https://github.com",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: "linkedin",
  },
  {
    name: "Email",
    url: "mailto:nilesh.gupta.dev@gmail.com",
    icon: "email",
  },
];

export const services: TService[] = [
  {
    title: "Full Stack Developer",
    icon: web,
  },
  {
    title: "React & 3D Specialist",
    icon: mobile,
  },
  {
    title: "Backend & API Engineer",
    icon: backend,
  },
  {
    title: "AI Solutions Integrator",
    icon: creator,
  },
];

export const skillCategories: TSkillCategory[] = [
  {
    category: "FRONTEND",
    skills: [
      { name: "React.js", level: "Expert" },
      { name: "Next.js", level: "Advanced" },
      { name: "TypeScript", level: "Advanced" },
      { name: "Tailwind CSS", level: "Expert" },
      { name: "Three.js / WebGL", level: "Intermediate" },
      { name: "HTML5 / CSS3", level: "Expert" },
    ],
  },
  {
    category: "BACKEND",
    skills: [
      { name: "Node.js", level: "Advanced" },
      { name: "Express.js", level: "Advanced" },
      { name: "MongoDB", level: "Advanced" },
      { name: "PostgreSQL", level: "Intermediate" },
      { name: "REST APIs", level: "Expert" },
      { name: "GraphQL", level: "Intermediate" },
    ],
  },
  {
    category: "TOOLS & DEVOPS",
    skills: [
      { name: "Git & GitHub", level: "Expert" },
      { name: "Docker", level: "Intermediate" },
      { name: "Figma", level: "Advanced" },
      { name: "Vercel / Netlify", level: "Expert" },
      { name: "Postman", level: "Advanced" },
      { name: "VS Code", level: "Expert" },
    ],
  },
  {
    category: "OTHER / SPECIALIZED",
    skills: [
      { name: "AI & LLM APIs", level: "Advanced" },
      { name: "Python", level: "Advanced" },
      { name: "UI/UX Design", level: "Advanced" },
      { name: "Agile / Scrum", level: "Advanced" },
    ],
  },
];

export const technologies: TTechnology[] = [
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "JavaScript", icon: javascript },
  { name: "TypeScript", icon: typescript },
  { name: "React JS", icon: reactjs },
  { name: "Redux Toolkit", icon: redux },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "Node JS", icon: nodejs },
  { name: "MongoDB", icon: mongodb },
  { name: "Three JS", icon: threejs },
  { name: "Git", icon: git },
  { name: "Figma", icon: figma },
  { name: "Docker", icon: docker },
];

export const experiences: TExperience[] = [
  {
    title: "Software Developer",
    companyName: "TechCorp Innovations",
    icon: meta,
    iconBg: "#1E293B",
    date: "2025 — Present",
    points: [
      "Engineered responsive React and Next.js applications serving over 100,000 monthly active users.",
      "Architected RESTful microservices in Node.js and Express with MongoDB, reducing server latency by 30%.",
      "Integrated OpenAI GPT-4 APIs to deliver real-time automated data processing and intelligent user workflows.",
      "Participated in agile sprint planning, code reviews, and UI component design pattern standardization.",
    ],
  },
  {
    title: "Frontend Developer Intern",
    companyName: "CloudScale Solutions",
    icon: tesla,
    iconBg: "#0F172A",
    date: "2024 — 2025",
    points: [
      "Developed interactive front-end web components using React, TypeScript, and Tailwind CSS.",
      "Implemented state management with Redux Toolkit and optimized client-side rendering performance.",
      "Collaborated closely with UI/UX designers to translate Figma wireframes into pixel-perfect code.",
      "Built automated unit and integration test suites ensuring 90%+ code coverage.",
    ],
  },
  {
    title: "Junior Web Developer",
    companyName: "Digital Craft Studio",
    icon: shopify,
    iconBg: "#1E293B",
    date: "2023 — 2024",
    points: [
      "Designed and deployed custom client websites with clean responsive styling and fast load speeds.",
      "Integrated third-party payment gateways, CMS integrations, and analytics tools.",
      "Provided maintenance, bug fixes, and continuous feature enhancements across multiple client projects.",
    ],
  },
];

export const educationList: TEducation[] = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Institute of Technology & Science",
    date: "2023 — 2026",
    details: "CGPA: 3.9 / 4.0 • Major in AI & Web Systems. Coursework: Data Structures, Algorithms, DBMS, Operating Systems, Web Architecture.",
    iconBg: "#383E56",
  },
  {
    degree: "Senior Secondary Education (Class XII)",
    institution: "National Science Academy",
    date: "2021 — 2023",
    details: "Score: 94.8% • Specialization in Physics, Chemistry, Mathematics & Computer Science.",
    iconBg: "#E6DEDD",
  },
];

export const achievementsList: TAchievement[] = [
  {
    title: "1st Place Winner — National AI Hackathon 2025",
    category: "award",
    organization: "Tech Innovation Guild",
    description: "Built an autonomous AI resume parsing and smart job matching engine in 36 hours.",
    date: "2025",
    link: "https://github.com",
  },
  {
    title: "AWS Certified Solutions Architect – Associate",
    category: "certificate",
    organization: "Amazon Web Services (AWS)",
    description: "Demonstrated expertise in designing distributed, resilient, and cost-efficient cloud architectures.",
    date: "2024",
  },
  {
    title: "Meta Front-End Developer Professional Certificate",
    category: "certificate",
    organization: "Meta / Coursera",
    description: "Completed rigorous 9-course specialization covering React, UX Design, Version Control, and Web Apps.",
    date: "2024",
  },
  {
    title: "Top Open Source Contributor Award",
    category: "achievement",
    organization: "Developer Community Global",
    description: "Recognized for submitting 50+ pull requests to popular open-source UI component repositories.",
    date: "2024",
  },
];

export const currentlyData: TCurrently = {
  building: "AI Resume Platform & 3D Interactive Web Ecosystem",
  learning: "Advanced LLM Fine-Tuning, PyTorch & Microservices with Go",
  openTo: "Full-time Software Developer Roles & High-Impact Freelance Projects",
};

export const projects: TProject[] = [
  {
    name: "AI Resume & Job Matcher Platform",
    description:
      "Full-stack AI web app that analyzes resumes, calculates job match scores, and generates customized cover letters using GPT-4 and React.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "node.js", color: "green-text-gradient" },
      { name: "openai", color: "pink-text-gradient" },
      { name: "tailwind", color: "blue-text-gradient" },
    ],
    image: carrent,
    sourceCodeLink: "https://github.com",
    liveLink: "https://example.com",
  },
  {
    name: "3D Interactive Showcase Portfolio",
    description:
      "Modern 3D web application with real-time Three.js canvas renders, glassmorphic UI elements, dynamic lighting, and fluid Framer Motion animations.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "three.js", color: "green-text-gradient" },
      { name: "typescript", color: "pink-text-gradient" },
    ],
    image: jobit,
    sourceCodeLink: "https://github.com",
    liveLink: "https://example.com",
  },
  {
    name: "Cloud E-Commerce Platform",
    description:
      "Scalable e-commerce web solution with real-time inventory management, Stripe payment checkout integration, and full dashboard administration.",
    tags: [
      { name: "next.js", color: "blue-text-gradient" },
      { name: "mongodb", color: "green-text-gradient" },
      { name: "express", color: "pink-text-gradient" },
    ],
    image: tripguide,
    sourceCodeLink: "https://github.com",
    liveLink: "https://example.com",
  },
];

export const testimonials: TTestimonial[] = [
  {
    testimonial:
      "Nilesh is an exceptionally skilled full-stack developer. His attention to design aesthetics and 3D visual details elevated our product launch to another level.",
    name: "Sarah Jenkins",
    designation: "Product Director",
    company: "Nexus Innovations",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    testimonial:
      "Working with Nilesh was an absolute pleasure. He delivered our AI integration days ahead of deadline with zero bugs and clean architecture.",
    name: "Marcus Vance",
    designation: "CTO",
    company: "QuantTech Solutions",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

