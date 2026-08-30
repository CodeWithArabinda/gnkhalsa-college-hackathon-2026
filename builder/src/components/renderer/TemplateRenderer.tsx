import React, { lazy, Suspense } from "react";
import { CanonicalPortfolio } from "../../types/portfolio";
import { Loader2 } from "lucide-react";

// LAZY LOADING FOR PORTFOLIO TEMPLATES
// Only loads the chunk for the selected template when needed!
const DarkDeveloperTemplate = lazy(() => import("../../templates/DarkDeveloperTemplate"));
const GlassModernTemplate = lazy(() => import("../../templates/GlassModernTemplate"));
const MinimalistCleanTemplate = lazy(() => import("../../templates/MinimalistCleanTemplate"));
const LightCorporateTemplate = lazy(() => import("../../templates/LightCorporateTemplate"));
const CreativePlayfulTemplate = lazy(() => import("../../templates/CreativePlayfulTemplate"));

export interface TemplateRendererProps {
  portfolio: CanonicalPortfolio;
  className?: string;
}

export default function TemplateRenderer({ portfolio, className = "" }: TemplateRendererProps) {
  const selectedTemplate = portfolio.selected_template || "dark_developer";

  const renderTemplateComponent = () => {
    switch (selectedTemplate) {
      case "dark_developer":
        return <DarkDeveloperTemplate portfolio={portfolio} />;
      case "glass_modern":
        return <GlassModernTemplate portfolio={portfolio} />;
      case "minimalist_clean":
        return <MinimalistCleanTemplate portfolio={portfolio} />;
      case "light_corporate":
        return <LightCorporateTemplate portfolio={portfolio} />;
      case "creative_playful":
        return <CreativePlayfulTemplate portfolio={portfolio} />;
      default:
        return <DarkDeveloperTemplate portfolio={portfolio} />;
    }
  };

  return (
    <div className={`w-full min-h-full ${className}`}>
      <Suspense
        fallback={
          <div className="min-h-[500px] w-full flex flex-col items-center justify-center bg-slate-950 text-slate-300 p-8 space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-purple-500" />
            <p className="text-sm font-mono text-slate-400 animate-pulse">
              Lazy loading template &quot;{selectedTemplate}&quot;...
            </p>
          </div>
        }
      >
        {renderTemplateComponent()}
      </Suspense>
    </div>
  );
}
