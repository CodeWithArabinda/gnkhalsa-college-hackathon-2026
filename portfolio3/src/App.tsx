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
import { PortfolioProvider, PortfolioDataProps, usePortfolio } from "./contexts/PortfolioContext";

const MotionBackground = () => (
  <div className="animated-bg">
    <div className="aurora-blob aurora-blob-1" />
    <div className="aurora-blob aurora-blob-2" />
    <div className="aurora-blob aurora-blob-3" />
  </div>
);

const AppContent = () => {
  const { config } = usePortfolio();

  useEffect(() => {
    if (document.title !== config.html.title) {
      document.title = config.html.title;
    }
  }, [config.html.title]);

  return (
    <BrowserRouter>
      <div className="bg-[#050816] relative z-0 selection:bg-[#915EFF] selection:text-white min-h-screen">
        <MotionBackground />

        {/* NAVIGATION & HERO / INTRODUCTION */}
        <Navbar />
        <Hero />

        {/* ABOUT ME */}
        <About />

        {/* FEATURED PROJECTS */}
        <Works />

        {/* SKILLS & TECHNOLOGIES */}
        <Tech />

        {/* CONTACT / CTA */}
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

const App = ({ portfolio }: { portfolio?: PortfolioDataProps }) => {
  return (
    <PortfolioProvider portfolio={portfolio}>
      <AppContent />
    </PortfolioProvider>
  );
};

export default App;
