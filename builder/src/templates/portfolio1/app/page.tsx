"use client";

import React from "react";
import SmoothScroll from "@portfolio1/components/smooth-scroll";
import { cn } from "@portfolio1/lib/utils";
import AnimatedBackground from "@portfolio1/components/animated-background";
import SkillsSection from "@portfolio1/components/sections/skills";
import ExperienceSection from "@portfolio1/components/sections/experience";
import ProjectsSection from "@portfolio1/components/sections/projects";
import ContactSection from "@portfolio1/components/sections/contact";
import HeroSection from "@portfolio1/components/sections/hero";

function MainPage() {
  return (
    <SmoothScroll>
      <AnimatedBackground />
      <main className={cn("bg-transparent canvas-overlay-mode relative overflow-x-hidden min-h-screen")}>
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}

export default MainPage;
