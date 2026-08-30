import React, { useEffect, useState } from "react";
import { CanonicalPortfolio } from "../../types/portfolio";
import { loadActivePortfolio, subscribeToPortfolioSync } from "../../services/storage";
import TemplateRenderer from "../renderer/TemplateRenderer";

/**
 * Standalone /preview route — renders ONLY the selected template, full screen,
 * with zero builder chrome. Template is chosen via ?template= query param.
 * Real-time sync from the builder tab still works via localStorage events.
 */
export default function StandalonePreview() {
  const [portfolio, setPortfolio] = useState<CanonicalPortfolio>(() => {
    const active = loadActivePortfolio();
    const params = new URLSearchParams(window.location.search);
    const templateParam = params.get("template");
    if (templateParam) {
      return { ...active, selected_template: templateParam };
    }
    return active;
  });

  // Keep in sync with edits happening in the builder tab
  useEffect(() => {
    const unsubscribe = subscribeToPortfolioSync((updatedPortfolio) => {
      setPortfolio((prev) => ({
        ...updatedPortfolio,
        selected_template: prev.selected_template, // preserve the template shown in this tab
      }));
    });
    return unsubscribe;
  }, []);

  return (
    <div className="w-full min-h-screen">
      <TemplateRenderer portfolio={portfolio} />
    </div>
  );
}
