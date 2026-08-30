import React from "react";
import { Routes, Route } from "react-router-dom";
import SiteFrame from "@/components/site-frame";
import { Providers } from "@/components/providers";
import { PortfolioProvider } from "@/contexts/PortfolioContext";

import MainPage from "@/app/page";
import BlogPage from "@/app/blogs/page";
import BlogPost from "@/app/blogs/[slug]/page";
import ResumePage from "@/app/resume/page";

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
