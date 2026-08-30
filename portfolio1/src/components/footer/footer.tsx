import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { footer } from "./config";
import { Button } from "../ui/button";
import SocialMediaButtons from "../social/social-media-icons";
import { usePortfolio } from "@/contexts/PortfolioContext";

function CopyrightYear() {
  const year = new Date().getFullYear();
  return <>{year}</>;
}

function Footer() {
  const { config } = usePortfolio();
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-4 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-6 py-8 sm:flex-row sm:justify-between">
      <p className="text-xs text-slate-400 font-mono">
        ©{" "}
        <Suspense fallback={null}>
          <CopyrightYear />
        </Suspense>{" "}
        <span className="text-slate-200 font-semibold">{config.author}</span>. All rights reserved.
      </p>
      <SocialMediaButtons />
      <nav className="flex gap-4 sm:gap-6 z-10">
        {footer.map((link, index) => {
          const { title, href } = link;

          return (
            <Link
              className="text-xs text-slate-400 hover:text-emerald-400 transition-colors"
              to={href}
              key={`l_${index}`}
            >
              <Button variant={"link"} className="text-xs text-slate-400 hover:text-emerald-400 p-0 h-auto">
                {title}
              </Button>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}

export default Footer;
