import { CanonicalPortfolio } from "../types/portfolio";

export interface SampleResumePreset {
  id: string;
  name: string;
  role: string;
  avatar: string;
  summary: string;
  rawText: string;
  portfolio: CanonicalPortfolio;
}

export const SAMPLE_RESUMES: SampleResumePreset[] = [
  {
    id: "sample-fullstack-dev",
    name: "Alex Rivera",
    role: "Senior Full-Stack Architect",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    summary: "10+ years engineering high-scale distributed systems and responsive web applications.",
    rawText: `ALEX RIVERA
San Francisco, CA | alex.rivera.dev@gmail.com | github.com/alexrivera | linkedin.com/in/alexrivera-dev

PROFESSIONAL SUMMARY
Senior Full-Stack Architect with over 8 years of experience leading cross-functional engineering teams. Expert in React, TypeScript, Node.js, Next.js, and cloud microservices.

CORE SKILLS
React, Next.js, TypeScript, Node.js, Express, PostgreSQL, MongoDB, GraphQL, Tailwind CSS, Docker, Kubernetes, AWS, Redis, Three.js, WebGL

WORK EXPERIENCE
Staff Software Engineer | CloudScale Tech (2022 — Present)
- Architected next-gen real-time analytics engine handling 250M+ events daily with 99.99% uptime.
- Led front-end migration to React 18 and Next.js, improving Core Web Vitals score by 45%.
- Mentored a distributed team of 14 front-end and backend engineers across 3 continents.

Senior Full Stack Developer | Horizon Labs (2019 — 2022)
- Built interactive customer portal using React, Redux, Node.js and PostgreSQL.
- Reduced API response latencies by 60% through query caching with Redis.
- Implemented CI/CD automated deployment pipelines cutting release cycle from 2 weeks to 2 hours.

FEATURED PROJECTS
1. DevFlow Canvas (AI Workflow Orchestration Platform)
Technologies: React, TypeScript, Tailwind, FastAPI, Python, OpenAI API
Live: https://devflow-canvas.demo.app | Code: https://github.com/alexrivera/devflow-canvas
Description: Visual canvas for composing, debugging, and executing multi-agent AI pipelines with interactive node graphs.

2. OmniStore Cloud (Next-Gen Distributed E-Commerce)
Technologies: Next.js, GraphQL, PostgreSQL, Stripe, Redis, Docker
Live: https://omnistore-cloud.demo.app | Code: https://github.com/alexrivera/omnistore-cloud
Description: Headless e-commerce platform processing $15M+ annual GMV with sub-50ms page transitions.

3. CyberSphere 3D (Interactive Data Visualization)
Technologies: Three.js, WebGL, React, GSAP, Tailwind CSS
Live: https://cybersphere-3d.demo.app | Code: https://github.com/alexrivera/cybersphere-3d
Description: Interactive 3D planetary dashboard rendering real-time global telemetry metrics.

EDUCATION
B.S. in Computer Science | University of California, Berkeley (2015 — 2019)
Magna Cum Laude, President of ACM Chapter

ACHIEVEMENTS & AWARDS
- AWS Certified Solutions Architect - Professional (2023)
- First Place Winner at Global Cloud Hackathon 2022
- Published author: "High Performance Web Architectures with React & Edge Runtimes"`,
    portfolio: {
      selected_template: "dark_developer",
      full_name: "Alex Rivera",
      headline: "Senior Full-Stack Architect & Cloud Specialist",
      bio: "Senior Full-Stack Architect with over 8 years of experience leading cross-functional engineering teams. Expert in React, TypeScript, Node.js, Next.js, and cloud microservices.",
      profile_image_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      location: "San Francisco, CA",
      email: "alex.rivera.dev@gmail.com",
      github_url: "https://github.com/alexrivera",
      linkedin_url: "https://linkedin.com/in/alexrivera-dev",
      resume_url: "",
      resume_file_name: "Alex_Rivera_Resume.pdf",
      skills: [
        { id: "sk-1", name: "React", level: "Expert", category: "Frontend" },
        { id: "sk-2", name: "TypeScript", level: "Expert", category: "Frontend" },
        { id: "sk-3", name: "Next.js", level: "Expert", category: "Frontend" },
        { id: "sk-4", name: "Node.js", level: "Advanced", category: "Backend" },
        { id: "sk-5", name: "PostgreSQL", level: "Advanced", category: "Backend" },
        { id: "sk-6", name: "Tailwind CSS", level: "Expert", category: "Frontend" },
        { id: "sk-7", name: "Docker", level: "Intermediate", category: "DevOps" },
        { id: "sk-8", name: "AWS", level: "Advanced", category: "DevOps" },
        { id: "sk-9", name: "GraphQL", level: "Advanced", category: "Backend" },
        { id: "sk-10", name: "Three.js", level: "Intermediate", category: "Frontend" },
      ],
      experiences: [
        {
          id: "exp-1",
          company: "CloudScale Tech",
          role: "Staff Software Engineer",
          start_date: "2022",
          end_date: "Present",
          description: "• Architected next-gen real-time analytics engine handling 250M+ events daily with 99.99% uptime.\n• Led front-end migration to React 18 and Next.js, improving Core Web Vitals score by 45%.\n• Mentored a distributed team of 14 front-end and backend engineers across 3 continents.",
        },
        {
          id: "exp-2",
          company: "Horizon Labs",
          role: "Senior Full Stack Developer",
          start_date: "2019",
          end_date: "2022",
          description: "• Built interactive customer portal using React, Redux, Node.js and PostgreSQL.\n• Reduced API response latencies by 60% through query caching with Redis.\n• Implemented CI/CD automated deployment pipelines cutting release cycle from 2 weeks to 2 hours.",
        },
      ],
      projects: [
        {
          id: "proj-1",
          title: "DevFlow Canvas",
          description: "Visual canvas for composing, debugging, and executing multi-agent AI pipelines with interactive node graphs.",
          image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
          technologies: ["React", "TypeScript", "Tailwind", "Python", "FastAPI"],
          github_url: "https://github.com/alexrivera/devflow-canvas",
          live_url: "https://devflow-canvas.demo.app",
        },
        {
          id: "proj-2",
          title: "OmniStore Cloud",
          description: "Headless e-commerce platform processing $15M+ annual GMV with sub-50ms page transitions.",
          image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
          technologies: ["Next.js", "GraphQL", "PostgreSQL", "Stripe", "Redis"],
          github_url: "https://github.com/alexrivera/omnistore-cloud",
          live_url: "https://omnistore-cloud.demo.app",
        },
        {
          id: "proj-3",
          title: "CyberSphere 3D",
          description: "Interactive 3D planetary dashboard rendering real-time global telemetry metrics.",
          image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
          technologies: ["Three.js", "WebGL", "React", "GSAP", "Tailwind CSS"],
          github_url: "https://github.com/alexrivera/cybersphere-3d",
          live_url: "https://cybersphere-3d.demo.app",
        },
      ],
      education: [
        {
          id: "edu-1",
          institution: "University of California, Berkeley",
          degree: "B.S.",
          field: "Computer Science",
          start_year: "2015",
          end_year: "2019",
          description: "Magna Cum Laude, President of ACM Chapter",
        },
      ],
      achievements: [
        {
          id: "ach-1",
          title: "AWS Certified Solutions Architect - Professional",
          date: "2023",
          issuer: "Amazon Web Services",
          description: "Advanced cloud architecture certification",
          credential_url: "https://aws.amazon.com",
        },
        {
          id: "ach-2",
          title: "First Place Winner - Global Cloud Hackathon",
          date: "2022",
          issuer: "TechCrunch Disrupt",
          description: "Built an autonomous multi-region failover network",
          credential_url: "",
        },
      ],
    },
  },
  {
    id: "sample-ai-engineer",
    name: "Elena Rostova",
    role: "AI / Machine Learning Engineer",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    summary: "Specialized in LLM fine-tuning, RAG pipelines, PyTorch, and deploying production machine learning models.",
    rawText: `ELENA ROSTOVA
Austin, TX | elena.ai.dev@gmail.com | github.com/elenarostova | linkedin.com/in/elena-rostova-ai

SUMMARY
AI / Machine Learning Engineer specializing in Large Language Models (LLMs), retrieval-augmented generation (RAG), computer vision, and high-throughput model inference infrastructure.

TECHNICAL SKILLS
Python, PyTorch, LangChain, LlamaIndex, HuggingFace, FastAPI, Docker, Kubernetes, Triton Inference Server, React, TypeScript, PostgreSQL, Pinecone, Qdrant

EXPERIENCE
Lead Machine Learning Engineer | NeuroSync AI (2023 — Present)
- Designed and deployed enterprise multi-modal RAG search system indexing over 50M documents with sub-100ms vector lookup.
- Fine-tuned open-source Llama-3 models on proprietary domain data, increasing task accuracy by 32%.
- Reduced GPU hosting expenses by 50% using model quantization (AWQ/GPTQ) and dynamic vLLM batching.

Machine Learning Researcher | Apex Intelligence (2021 — 2023)
- Trained vision-language multi-task models for autonomous defect detection in manufacturing lines.
- Authored 2 research papers accepted at CVPR on low-rank adaptation methods for edge devices.

PROJECTS
1. AgenticMesh - Autonomous AI Research Assistant
Technologies: Python, LangGraph, Qdrant, FastAPI, React, TypeScript
Live: https://agenticmesh.demo.app | Code: https://github.com/elenarostova/agenticmesh
Description: Multi-agent system that autonomously browses arXiv papers, summarizes technical findings, and generates code benchmarks.

2. FastVector DB - Embedded Vector Index Engine
Technologies: Rust, C++, Python, SIMD, AVX-512
Live: https://fastvector.demo.app | Code: https://github.com/elenarostova/fastvector
Description: Ultra-fast local vector search library designed for zero-latency in-browser embedding querying.

EDUCATION
M.S. in Artificial Intelligence | Stanford University (2019 — 2021)
B.S. in Mathematics & CS | University of Texas at Austin (2015 — 2019)`,
    portfolio: {
      selected_template: "glass_modern",
      full_name: "Elena Rostova",
      headline: "AI & Machine Learning Engineer",
      bio: "AI / Machine Learning Engineer specializing in Large Language Models (LLMs), retrieval-augmented generation (RAG), computer vision, and high-throughput model inference infrastructure.",
      profile_image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      location: "Austin, TX",
      email: "elena.ai.dev@gmail.com",
      github_url: "https://github.com/elenarostova",
      linkedin_url: "https://linkedin.com/in/elena-rostova-ai",
      resume_url: "",
      resume_file_name: "Elena_Rostova_Resume.pdf",
      skills: [
        { id: "sk-1", name: "Python", level: "Expert", category: "AI / ML" },
        { id: "sk-2", name: "PyTorch", level: "Expert", category: "AI / ML" },
        { id: "sk-3", name: "LangChain", level: "Expert", category: "AI / ML" },
        { id: "sk-4", name: "FastAPI", level: "Advanced", category: "Backend" },
        { id: "sk-5", name: "Docker", level: "Advanced", category: "DevOps" },
        { id: "sk-6", name: "Pinecone / Qdrant", level: "Expert", category: "AI / ML" },
        { id: "sk-7", name: "React", level: "Intermediate", category: "Frontend" },
        { id: "sk-8", name: "TypeScript", level: "Intermediate", category: "Frontend" },
      ],
      experiences: [
        {
          id: "exp-1",
          company: "NeuroSync AI",
          role: "Lead Machine Learning Engineer",
          start_date: "2023",
          end_date: "Present",
          description: "• Designed and deployed enterprise multi-modal RAG search system indexing over 50M documents with sub-100ms vector lookup.\n• Fine-tuned open-source Llama-3 models on proprietary domain data, increasing task accuracy by 32%.\n• Reduced GPU hosting expenses by 50% using model quantization (AWQ/GPTQ) and dynamic vLLM batching.",
        },
        {
          id: "exp-2",
          company: "Apex Intelligence",
          role: "Machine Learning Researcher",
          start_date: "2021",
          end_date: "2023",
          description: "• Trained vision-language multi-task models for autonomous defect detection in manufacturing lines.\n• Authored 2 research papers accepted at CVPR on low-rank adaptation methods for edge devices.",
        },
      ],
      projects: [
        {
          id: "proj-1",
          title: "AgenticMesh - Autonomous AI Researcher",
          description: "Multi-agent system that autonomously browses arXiv papers, summarizes technical findings, and generates code benchmarks.",
          image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
          technologies: ["Python", "LangGraph", "Qdrant", "FastAPI", "React"],
          github_url: "https://github.com/elenarostova/agenticmesh",
          live_url: "https://agenticmesh.demo.app",
        },
        {
          id: "proj-2",
          title: "FastVector DB",
          description: "Ultra-fast local vector search library designed for zero-latency in-browser embedding querying.",
          image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
          technologies: ["Rust", "Python", "SIMD", "C++"],
          github_url: "https://github.com/elenarostova/fastvector",
          live_url: "https://fastvector.demo.app",
        },
      ],
      education: [
        {
          id: "edu-1",
          institution: "Stanford University",
          degree: "M.S.",
          field: "Artificial Intelligence",
          start_year: "2019",
          end_year: "2021",
          description: "Specialization in deep learning & generative models",
        },
      ],
      achievements: [
        {
          id: "ach-1",
          title: "CVPR Best Paper Nomination",
          date: "2023",
          issuer: "IEEE Computer Society",
          description: "For novel parameter-efficient tuning techniques in edge compute",
          credential_url: "",
        },
      ],
    },
  },
];
