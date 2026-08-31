import React, { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';

// Dynamic lazy imports for heavy template components
const DarkDeveloperTemplate = lazy(() => import('../components/templates/DarkDeveloperTemplate'));
const LightCorporateTemplate = lazy(() => import('../components/templates/LightCorporateTemplate'));

const VSCodeTemplate = lazy(() => import('./VSCodeTemplate'));
const BentoGridTemplate = lazy(() => import('./BentoGridTemplate'));
const CinematicSpaceTemplate = lazy(() => import('./CinematicSpaceTemplate'));
const NeoBrutalistTemplate = lazy(() => import('./NeoBrutalistTemplate'));
const DarkTerminalTemplate = lazy(() => import('./DarkTerminalTemplate'));
const MinimalEditorialTemplate = lazy(() => import('./MinimalEditorialTemplate'));
const Portfolio1Template = lazy(() => import('./portfolio1/index'));

const TemplateFallback = () => (
  <div className="min-h-[400px] w-full flex flex-col items-center justify-center space-y-3 bg-[#0B0E14] text-white p-8 font-mono">
    <Loader2 className="w-8 h-8 animate-spin text-[#00FFA3]" />
    <span className="text-xs text-slate-400">Loading Portfolio Template Chunk...</span>
  </div>
);

/**
 * Template registry mapping `selected_template` keys to React components.
 * This single registry drives the Dashboard Live Preview, the Public /p/:slug route,
 * and the TemplatesTab showcase catalog.
 */
export const TEMPLATE_REGISTRY = {
  portfolio1: {
    id: 'portfolio1',
    component: Portfolio1Template,
    name: '3D Interactive (Nilesh)',
    archetype: 'CYBER 3D CANVAS',
    description: 'Prop-driven 3D interactive developer template powered by React, GSAP, Lenis smooth scrolling, Spline canvas viewport, and Radix dialogs.',
    category: 'creative',
    accent: '#00F5FF',
    bgPreview: '#07090E',
    badge: 'NEW 3D',
  },
  dark_developer: {
    id: 'dark_developer',
    component: DarkDeveloperTemplate,
    name: 'Dark Developer',
    archetype: 'OBSIDIAN TERMINAL',
    description: 'Developer terminal theme with cyan borders, monospaced tech tags, and terminal window card headers.',
    category: 'developer',
    accent: '#38BDF8',
    bgPreview: '#0F1117',
    badge: 'ORIGINAL',
  },
  light_corporate: {
    id: 'light_corporate',
    component: LightCorporateTemplate,
    name: 'Light Corporate',
    archetype: 'NEO-BRUTALIST CLASSIC',
    description: 'High contrast Neo-Brutalist theme with cream canvas, vibrant sticker badges, and hard drop-shadows.',
    category: 'brutalist',
    accent: '#FFE600',
    bgPreview: '#FFFDF8',
    badge: 'ORIGINAL',
  },
  vscode: {
    id: 'vscode',
    component: VSCodeTemplate,
    name: 'VS Code IDE',
    archetype: 'VS CODE EDITOR',
    description: 'Full VS Code dark UI with file tree explorer, open tabs, line numbers, syntax highlighting, and blue status bar.',
    category: 'developer',
    accent: '#007ACC',
    bgPreview: '#1E1E1E',
    badge: 'COMMUNITY FAVORITE',
    reference: 'https://vscode-portfolio.vercel.app/',
  },
  bento_grid: {
    id: 'bento_grid',
    component: BentoGridTemplate,
    name: 'Bento Grid',
    archetype: 'BENTO MODULAR',
    description: 'Apple/Vercel-style modular bento grid layout with glassmorphic cards, dynamic column spans, and pill tags.',
    category: 'minimal',
    accent: '#111111',
    bgPreview: '#FAFAFA',
    badge: 'POPULAR',
    reference: 'https://braydentw.io/',
  },
  cinematic_space: {
    id: 'cinematic_space',
    component: CinematicSpaceTemplate,
    name: 'Cinematic Nebula',
    archetype: 'CINEMATIC NEBULA',
    description: 'Deep space dark canvas with warm amber/orange glowing radial gradients, 3D avatar glow container, glass navbar, and bento cards.',
    category: 'creative',
    accent: '#FF5722',
    bgPreview: '#0B0B0E',
    badge: 'NEW',
    reference: 'https://www.sarang-space.site/',
  },
  'cinematic-space': {
    id: 'cinematic-space',
    component: CinematicSpaceTemplate,
    name: 'Cinematic Nebula',
    archetype: 'CINEMATIC NEBULA',
    description: 'Deep space dark canvas with warm amber/orange glowing radial gradients, 3D avatar glow container, glass navbar, and bento cards.',
    category: 'creative',
    accent: '#FF5722',
    bgPreview: '#0B0B0E',
    badge: 'NEW',
    reference: 'https://www.sarang-space.site/',
  },
  neo_brutalist: {
    id: 'neo_brutalist',
    component: NeoBrutalistTemplate,
    name: 'Neo-Brutalist',
    archetype: 'BRUTALIST STICKER',
    description: 'High-contrast cream canvas with 3px solid black borders, hard drop-shadows, and vibrant sticker badges.',
    category: 'brutalist',
    accent: '#FFE600',
    bgPreview: '#FFFDF8',
    badge: 'COMMUNITY FAVORITE',
    reference: 'https://thesoloentrepreneur.in',
  },
  dark_terminal: {
    id: 'dark_terminal',
    component: DarkTerminalTemplate,
    name: 'Dark Terminal',
    archetype: 'CLI OBSIDIAN',
    description: 'Obsidian CLI terminal layout with prompt headers, monospace command syntax, and cyan/green accents.',
    category: 'developer',
    accent: '#00FFA3',
    bgPreview: '#0B0E14',
    badge: 'POPULAR',
    reference: 'https://2024-portfolio-public.vercel.app/',
  },
  minimal_editorial: {
    id: 'minimal_editorial',
    component: MinimalEditorialTemplate,
    name: 'Minimal Editorial',
    archetype: 'SWISS EDITORIAL',
    description: 'Clean monochrome typography, Swiss grid layout, serif/sans headers, and structured project lists.',
    category: 'minimal',
    accent: '#111111',
    bgPreview: '#FFFFFF',
    badge: 'NEW',
    reference: 'https://zsofia.pro/',
  },
};

export const TEMPLATE_LIST = Object.values(TEMPLATE_REGISTRY);

/**
 * PortfolioRenderer: Dynamically mounts the selected template component.
 * Used by both the Dashboard Live Preview Canvas and the Public /p/:slug route.
 */
export default function PortfolioRenderer({ portfolio, viewMode = 'desktop' }) {
  if (!portfolio) return null;

  // Blank state placeholder
  const isBlank = !portfolio.full_name || portfolio.full_name.trim() === '';
  if (isBlank) {
    return (
      <div className="min-h-full w-full bg-[#0F1117] bg-grid-pattern-dark p-8 flex flex-col items-center justify-center text-center space-y-5 text-white font-sans">
        <div className="w-16 h-16 rounded-2xl bg-[#FFE600] border-3 border-black flex items-center justify-center text-black font-black text-2xl shadow-brutal animate-bounce">
          ⚡
        </div>
        <div className="space-y-2">
          <h3 className="font-heading font-extrabold text-2xl text-white">Live Portfolio Canvas</h3>
          <p className="font-hand text-xl md:text-2xl text-slate-300 max-w-md leading-relaxed">
            ⚡ Upload a resume or fill details on the left to see your live portfolio render here.
          </p>
        </div>
        <div className="bg-[#1A1D27] border-2 border-[#38BDF8] px-4 py-2.5 rounded-xl shadow-[3px_3px_0px_0px_#38BDF8] font-mono text-xs text-[#38BDF8]">
          Status: Awaiting Resume PDF / Image Upload or Manual Input
        </div>
      </div>
    );
  }

  const rawKey = portfolio.selected_template || 'dark_terminal';
  const normalizedKey = rawKey.replace(/-/g, '_');
  const templateEntry = TEMPLATE_REGISTRY[normalizedKey] || TEMPLATE_REGISTRY[rawKey] || TEMPLATE_REGISTRY['dark_developer'];
  const ActiveTemplate = templateEntry.component;

  return (
    <Suspense fallback={<TemplateFallback />}>
      <ActiveTemplate portfolio={portfolio} viewMode={viewMode} />
    </Suspense>
  );
}

