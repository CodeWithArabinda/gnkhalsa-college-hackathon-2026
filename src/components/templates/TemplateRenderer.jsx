/**
 * TemplateRenderer: Thin wrapper that delegates to the unified PortfolioRenderer.
 * Maintains the same API (`<TemplateRenderer portfolio={data} />`) used by
 * both the Dashboard Live Preview and Public /p/:slug route.
 */
import React from 'react';
import PortfolioRenderer from '../../templates/PortfolioRenderer';

export default function TemplateRenderer({ portfolio }) {
  return <PortfolioRenderer portfolio={portfolio} />;
}
