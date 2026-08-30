import React from "react";
import { Routes, Route } from "react-router-dom";
import SiteFrame from "@portfolio1/components/site-frame";
import { Providers } from "@portfolio1/components/providers";
import { PortfolioProvider } from "@portfolio1/contexts/PortfolioContext";

import MainPage from "@portfolio1/app/page";
import BlogPage from "@portfolio1/app/blogs/page";
import BlogPost from "@portfolio1/app/blogs/[slug]/page";
import ResumePage from "@portfolio1/app/resume/page";

export default function App({ portfolio }: { portfolio?: any }) {
  return (
    <PortfolioProvider portfolio={portfolio}>
      <Providers>
        <SiteFrame>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/blogs/:slug" element={<BlogPost />} />
            <Route path="/resume" element={<ResumePage />} />
          </Routes>
        </SiteFrame>
      </Providers>
    </PortfolioProvider>
  );
}
