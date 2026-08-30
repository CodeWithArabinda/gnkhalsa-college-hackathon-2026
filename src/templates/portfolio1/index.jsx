import React from 'react';
import OriginalHero from './components/Hero';
import SplineTechStack from './components/SplineTechStack';
import ExperienceSection from './components/Experience';
import ProjectsSection from './components/Projects';
import ContactSection from './components/Contact';
import defaultData from './demoData';

export default function Portfolio1Template(props) {
  // Support both unified portfolio schema object and headless props
  const p = props.portfolio || props;

  const personal = p.personal || {
    name: p.full_name || p.name || defaultData.personal.name,
    tagline: p.headline || p.title || defaultData.personal.tagline,
    bio: p.bio || p.summary || defaultData.personal.bio,
    avatarUrl: p.avatar_url || defaultData.personal.avatarUrl,
    socials: {
      github: p.github_url || defaultData.contact.github,
      linkedin: p.linkedin_url || defaultData.contact.linkedin,
      twitter: p.twitter_url || defaultData.contact.twitter
    }
  };

  const skills = p.skills || defaultData.skills;
  const experience = p.experience || defaultData.experience || [];
  const projects = p.projects || defaultData.projects;
  const contact = p.contact || {
    email: p.contact_email || p.email || defaultData.contact.email,
    github: p.github_url || defaultData.contact.github,
    linkedin: p.linkedin_url || defaultData.contact.linkedin,
    twitter: p.twitter_url || defaultData.contact.twitter
  };

  return (
    <div className="portfolio1-root-container bg-[#0A0A0A] text-white min-h-screen overflow-x-hidden selection:bg-[#FFE600] selection:text-black">
      
      {/* 1. Exact Original Hero (receives name, tagline, socials, CTAs) */}
      <OriginalHero data={personal} />

      {/* 2. Exact Original 3D Floating Tech Stack Keyboard / Spline: receives skills dynamically mapped to keycaps */}
      <SplineTechStack skills={skills} />

      {/* 3. Exact Original Experience Section Timeline */}
      <ExperienceSection experience={experience} />

      {/* 4. Exact Original Projects Showcase Gallery with Radix Dialog */}
      <ProjectsSection projects={projects} />

      {/* 5. Exact Original Contact & Footer Section */}
      <ContactSection contact={contact} name={personal.name} />

    </div>
  );
}
