import React from 'react';
import OriginalHero from './components/Hero';
import SplineTechStack from './components/SplineTechStack';
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
  const projects = p.projects || defaultData.projects;
  const contact = p.contact || {
    email: p.contact_email || p.email || defaultData.contact.email,
    github: p.github_url || defaultData.contact.github,
    linkedin: p.linkedin_url || defaultData.contact.linkedin,
    twitter: p.twitter_url || defaultData.contact.twitter
  };

  return (
    <div className="portfolio1-root-container bg-black text-white min-h-screen overflow-x-hidden selection:bg-[#FFE600] selection:text-black">
      {/* Exact Original Hero: receives name, tagline, socials */}
      <OriginalHero data={personal} />

      {/* Exact Original 3D Interactive Keyboard / Spline: receives skills dynamically mapped to keycaps */}
      <SplineTechStack skills={skills} />

      {/* Exact Original Projects Carousel / Grid: receives project items */}
      <ProjectsSection projects={projects} />

      {/* Exact Original Contact / Footer Section */}
      <ContactSection contact={contact} name={personal.name} />
    </div>
  );
}
