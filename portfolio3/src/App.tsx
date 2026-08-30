import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";

import {
  Navbar,
  Hero,
  About,
  Works,
  Tech,
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
        {/* 01. HERO PATTERN CONTAINER (HERO THROUGH SKILLS & TECH STACK) */}
        <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
          <Navbar />
          <Hero />
          <About />
          <Works />
          <Tech />
        </div>

        {/* 06. CONTACT / CTA */}
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
