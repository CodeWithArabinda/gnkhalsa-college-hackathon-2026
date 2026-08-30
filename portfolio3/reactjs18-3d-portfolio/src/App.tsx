import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";

import {
  Navbar,
  Hero,
  About,
  Works,
  Experience,
  Education,
  Tech,
  Achievements,
  Currently,
  Contact,
  Footer,
  StarsCanvas,
} from "./components";
import { config } from "./constants/config";

const App = () => {
  useEffect(() => {
    if (document.title !== config.html.title) {
      document.title = config.html.title;
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="bg-primary relative z-0 selection:bg-[#915EFF] selection:text-white">
        {/* 01. NAVIGATION & 02. HERO / INTRODUCTION */}
        <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
          <Navbar />
          <Hero />
        </div>

        {/* 03. ABOUT ME */}
        <About />

        {/* 04. FEATURED PROJECTS ⭐ */}
        <Works />

        {/* 05. EXPERIENCE */}
        <Experience />

        {/* 06. EDUCATION */}
        <Education />

        {/* 07. SKILLS & TECHNOLOGIES */}
        <Tech />

        {/* 08. ACHIEVEMENTS & CERTIFICATIONS */}
        <Achievements />

        {/* 09. CURRENTLY / NOW */}
        <Currently />

        {/* 10. CONTACT / CTA */}
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>

        {/* FOOTER */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
