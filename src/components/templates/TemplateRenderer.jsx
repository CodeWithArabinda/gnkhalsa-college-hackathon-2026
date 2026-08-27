import React from 'react';
import LightCorporateTemplate from './LightCorporateTemplate';
import DarkDeveloperTemplate from './DarkDeveloperTemplate';

export default function TemplateRenderer({ portfolio }) {
  if (!portfolio) return null;

  if (portfolio.selected_template === 'light_corporate') {
    return <LightCorporateTemplate portfolio={portfolio} />;
  }
  return <DarkDeveloperTemplate portfolio={portfolio} />;
}
