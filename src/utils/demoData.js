export const demoProfile = {
  id: "demo-profile-uuid-aarya-shah",
  full_name: "Aarya Shah",
  headline: "Frontend Engineer & BCA Student | React Specialist",
  bio: "Passionate Frontend Developer and final-year BCA student. Experienced in building responsive web applications with React, JavaScript, and Tailwind CSS. Open-source contributor and hackathon enthusiast seeking software engineering internships.",
  profile_image_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
  location: "Mumbai, India",
  email: "aarya.shah@email.com",
  github_url: "https://github.com/aaryashah-demo",
  linkedin_url: "https://linkedin.com/in/aaryashah-demo",
  selected_template: "dark_developer",
  is_published: true,
  public_slug: "aarya-shah-r4x9",
  
  experiences: [
    {
      id: "exp-1",
      company: "TechNexus Solutions",
      role: "Frontend Developer Intern",
      start_date: "June 2025",
      end_date: "August 2025",
      description: "Developed and optimized client-facing web applications using React 18 and Tailwind CSS. Improved page loading speeds by 25% through lazy loading and image optimization. Collaborated with UI/UX designers to implement pixel-perfect user interfaces.",
      display_order: 1
    },
    {
      id: "exp-2",
      company: "Open Source Contributor",
      role: "Contributor (GSSoC)",
      start_date: "May 2025",
      end_date: "July 2025",
      description: "Contributed to multiple React-based open-source projects. Resolved 15+ issues related to responsive layout adjustments, component state management, and accessibility guidelines.",
      display_order: 2
    }
  ],
  
  education: [
    {
      id: "edu-1",
      institution: "St. Xavier's College",
      degree: "Bachelor of Computer Applications (BCA)",
      field: "Computer Science",
      start_year: "2023",
      end_year: "2026",
      description: "CGPA: 9.2/10. Core coursework includes Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, and Web Engineering.",
      display_order: 1
    }
  ],
  
  projects: [
    {
      id: "proj-1",
      title: "CloudIDE - Collaborative Web Editor",
      description: "A real-time collaborative code editor with in-browser compilation support for HTML, CSS, and JS. Features syntax highlighting, multiple color themes, and direct GitHub integration.",
      technologies: ["React", "Monaco Editor", "Tailwind CSS", "Socket.io"],
      github_url: "https://github.com/aaryashah-demo/cloud-ide",
      live_url: "https://cloudide-demo.example.com",
      image_url: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600",
      display_order: 1
    },
    {
      id: "proj-2",
      title: "TaskFlow - Kanban Board Project Manager",
      description: "A dynamic project management tool inspired by Trello. Implements drag-and-drop task movement, due-date reminders, priority tags, and user performance analytics charts.",
      technologies: ["React", "React Beautiful dnd", "Chart.js", "Firebase"],
      github_url: "https://github.com/aaryashah-demo/task-flow",
      live_url: "https://taskflow-demo.example.com",
      image_url: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=600",
      display_order: 2
    },
    {
      id: "proj-3",
      title: "DevPortfolio - Custom Portfolio Engine",
      description: "An automated developer portfolio generator. Takes markdown files or resume PDFs, parses the data, and renders interactive portfolio templates instantly.",
      technologies: ["React", "Vite", "Tailwind CSS", "Supabase"],
      github_url: "https://github.com/aaryashah-demo/devportfolio",
      live_url: "https://devportfolio-demo.example.com",
      image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
      display_order: 3
    }
  ],
  
  skills: [
    { id: "skill-1", name: "React", category: "Technical", level: "Expert", display_order: 1 },
    { id: "skill-2", name: "JavaScript (ES6+)", category: "Technical", level: "Expert", display_order: 2 },
    { id: "skill-3", name: "Tailwind CSS", category: "Technical", level: "Expert", display_order: 3 },
    { id: "skill-4", name: "Node.js", category: "Technical", level: "Intermediate", display_order: 4 },
    { id: "skill-5", name: "Git & GitHub", category: "Technical", level: "Expert", display_order: 5 },
    { id: "skill-6", name: "PostgreSQL", category: "Technical", level: "Intermediate", display_order: 6 },
    { id: "skill-7", name: "UI/UX Design Principles", category: "Soft Skills", level: "Intermediate", display_order: 7 },
    { id: "skill-8", name: "Agile Methodologies", category: "Soft Skills", level: "Intermediate", display_order: 8 }
  ],
  
  achievements: [
    {
      id: "ach-1",
      title: "Winner - Smart India Hackathon 2024",
      issuer: "Ministry of Education, Govt of India",
      date: "December 2024",
      description: "Led a 6-member team to develop a smart agriculture prototype using IoT and React, winning the first prize of ₹1,00,000.",
      credential_url: "https://sih.gov.in",
      display_order: 1
    },
    {
      id: "ach-2",
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services (AWS)",
      date: "March 2025",
      description: "Validation of foundational cloud knowledge, including security, architecture principles, and core AWS services.",
      credential_url: "https://aws.amazon.com/verification",
      display_order: 2
    }
  ]
};
