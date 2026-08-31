import React, { lazy, Suspense } from 'react';

const Portfolio1Template = lazy(() => import('./Portfolio1Template'));
const Portfolio2Template = lazy(() => import('./Portfolio2Template'));
const Portfolio3Template = lazy(() => import('./Portfolio3Template'));
const Portfolio4Template = lazy(() => import('./Portfolio4Template'));
const Portfolio5Template = lazy(() => import('./Portfolio5Template'));

function TemplateFallback() {
  return (
    <div className="min-h-[400px] w-full flex flex-col items-center justify-center space-y-4 p-8">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 animate-spin flex items-center justify-center p-1 shadow-lg shadow-indigo-500/30">
        <div className="w-full h-full bg-[#0b0f17] rounded-xl" />
      </div>
      <p className="text-xs font-mono font-bold text-slate-400 animate-pulse">
        Loading Portfolio Template...
      </p>
    </div>
  );
}

export default function TemplateRenderer({ portfolio }) {
  if (!portfolio) return null;

  const templateKey = portfolio.selected_template || 'portfolio1';

  const renderTemplate = () => {
    switch (templateKey) {
      case 'portfolio1':
      case 'dark_developer':
        return <Portfolio1Template portfolio={portfolio} />;

      case 'portfolio2':
      case 'light_corporate':
        return <Portfolio2Template portfolio={portfolio} />;

      case 'portfolio3':
      case 'glass_modern':
        return <Portfolio3Template portfolio={portfolio} />;

      case 'portfolio4':
      case 'minimalist_clean':
        return <Portfolio4Template portfolio={portfolio} />;

      case 'portfolio5':
      case 'playful_doodle':
      case 'doodle_playful':
        return <Portfolio5Template portfolio={portfolio} />;

      default:
        return <Portfolio1Template portfolio={portfolio} />;
    }
  };

  return (
    <Suspense fallback={<TemplateFallback />}>
      {renderTemplate()}
    </Suspense>
  );
}

