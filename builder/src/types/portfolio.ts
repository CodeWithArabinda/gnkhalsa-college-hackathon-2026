export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  technologies: string[];
  github_url: string;
  live_url: string;
}

export interface Skill {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert" | string;
  category?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  start_date: string;
  end_date: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  start_year: string;
  end_year: string;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  issuer: string;
  description: string;
  credential_url: string;
}

export interface CanonicalPortfolio {
  selected_template: string;

  full_name: string;
  headline: string;
  bio: string;

  profile_image_url: string;

  location: string;
  email: string;

  github_url: string;
  linkedin_url: string;

  resume_url: string;
  resume_file_name: string;

  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  achievements: Achievement[];
}

export interface PortfolioRecord {
  id: string;
  user_id?: string;
  title?: string;
  created_at: string;
  updated_at: string;
  portfolio: CanonicalPortfolio;
}

export interface TemplateMetadata {
  id: string;
  name: string;
  category: "Developer" | "Corporate" | "Glassmorphism" | "Minimalist" | "Creative";
  description: string;
  badge?: string;
  previewImage: string;
  accentColor: string;
  tags: string[];
  author: string;
  targetPortfolioFolder?: string;
}
