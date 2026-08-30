import React from "react";
import { CanonicalPortfolio } from "../types/portfolio";
import { PortfolioProvider } from "./portfolio1/contexts/PortfolioContext";
import { Providers } from "./portfolio1/components/providers";
import MainPage from "./portfolio1/app/page";
import Header from "./portfolio1/components/header/header";
import Footer from "./portfolio1/components/footer/footer";

export interface TemplateProps {
  portfolio: CanonicalPortfolio;
}

export default function Portfolio1Template({ portfolio }: TemplateProps) {
  return (
    <PortfolioProvider portfolio={portfolio}>
      <Providers>
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white relative">
          <Header />
          <MainPage />
          <Footer />
        </div>
      </Providers>
    </PortfolioProvider>
  );
}
