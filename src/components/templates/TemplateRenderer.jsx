import React from 'react';
import PortfolioRenderer from '../../templates/PortfolioRenderer';

export default function TemplateRenderer({ portfolio, viewMode = 'desktop' }) {
  return <PortfolioRenderer portfolio={portfolio} viewMode={viewMode} />;
}

