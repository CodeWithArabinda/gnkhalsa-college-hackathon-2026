# StackFolio - Architecture Specification

## 1. High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT BROWSER                                 │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                      React 18 + Vite Frontend                       │   │
│   │                                                                     │   │
│   │   [Landing Page] ──> [Auth Modal] ──> [Dashboard Workspace]         │   │
│   │                                              │                      │   │
│   │                                              ├── [Form Editor Tabs] │   │
│   │                                              ├── [Readiness Score]  │   │
│   │                                              └── [Preview Engine]   │   │
│   │                                                        │            │   │
│   │                                        ┌───────────────┴────────┐   │   │
│   │                                        ▼                        ▼   │   │
│   │                                 [Desktop 1280px]         [Mobile 390px] │   │
│   │                                                                     │   │
│   │   [Public Route: /p/:public_slug] ───> [<TemplateRenderer />]       │   │
│   │                                        ├─ Dark Developer Layout     │   │
│   │                                        └─ Light Corporate Layout    │   │
│   └───────────────────────────────────┬─────────────────────────────────┘   │
└───────────────────────────────────────┼─────────────────────────────────────┘
                                        │ Supabase JS SDK (HTTPS/WSS)
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SUPABASE BaaS PLATFORM                            │
│                                                                             │
│   ┌──────────────────────┐ ┌──────────────────────┐ ┌───────────────────┐   │
│   │    Supabase Auth     │ │   Supabase Storage   │ │ PostgreSQL (RDBMS)│   │
│   │                      │ │                      │ │                   │   │
│   │  • Email / Password  │ │  • 'resumes' (priv)  │ │ • Normalized RLS  │   │
│   │  • JWT Sessions      │ │  • 'avatars' (pub)   │ │ • Triggers/Indexes│   │
│   └──────────────────────┘ └──────────────────────┘ └───────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Component Hierarchy & Workspace Isolation

```
App.jsx
├── AuthProvider (AuthContext)
├── PortfolioProvider (PortfolioContext)
└── Routes
    ├── / (LandingPage)
    ├── /auth (AuthPage)
    ├── /dashboard (DashboardPage) [Protected Route]
    │   ├── EditorPanel
    │   │   ├── SectionTabs (Basic, Projects, Skills, Education, Achievements)
    │   │   ├── FormInputs (Controlled form state)
    │   │   └── ActionControls (Save Draft, Publish Live)
    │   ├── ReadinessWidget (Calculates score & actionable tips)
    │   └── LivePreviewCanvas
    │       ├── PreviewControls (Template Switcher + Desktop/Mobile SVG Toggle)
    │       └── ViewportWrapper (1280px desktop vs 390px phone container)
    │           └── TemplateRenderer (Shared Portfolio Layout Engine)
    └── /p/:public_slug (PublicPortfolioPage)
        └── TemplateRenderer (Read-only published portfolio view)
```

---

## 3. Directory Layout

```
stackfolio/
├── docs/
│   ├── PRD.md
│   ├── Architecture.md
│   ├── database-schema.md
│   ├── api-contract.md
│   ├── design.md
│   ├── phases.md
│   ├── test-plan.md
│   ├── demo-script.md
│   ├── security-checklist.md
│   └── AGENTS.md
├── src/
│   ├── assets/
│   │   ├── icons/           # Desktop SVG, Mobile Phone SVG
│   │   └── mock/            # Fallback mock assets
│   ├── components/
│   │   ├── common/          # Navbar, Footer, Button, Card, Badge, Modal
│   │   ├── editor/          # BasicInfoForm, ProjectsForm, SkillsForm, EducationForm, AchievementsForm
│   │   ├── preview/         # LivePreviewContainer, DeviceFrameWrapper
│   │   ├── readiness/       # ReadinessScoreCard, SuggestionItem
│   │   └── templates/       # TemplateRenderer, DarkDeveloperTemplate, LightCorporateTemplate
│   ├── context/
│   │   ├── AuthContext.jsx  # Supabase Auth user session management
│   │   └── PortfolioContext.jsx # Local portfolio editing state & sync handlers
│   ├── hooks/
│   │   ├── usePortfolio.js  # Supabase CRUD integration hook
│   │   └── useReadiness.js  # Pure scoring evaluation function
│   ├── lib/
│   │   ├── supabaseClient.js# Supabase client singleton
│   │   └── slugGenerator.js # Format: `full-name-xxxx`
│   ├── pages/
│   │   ├── LandingPage.jsx  # Marketing & showcase
│   │   ├── AuthPage.jsx     # Login / Sign up
│   │   ├── DashboardPage.jsx# Split-pane editor & preview workspace
│   │   └── PublicPortfolioPage.jsx # Public dynamic viewer
│   ├── utils/
│   │   ├── demoData.js      # Aarya Shah complete profile object
│   │   └── pdfExtractor.js  # Client-side PDF text extraction helper
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 4. Single-Source Template Rendering Strategy
To prevent code duplication and layout drift, both the Dashboard Live Preview and the Public URL `/p/:slug` render through the identical component: `<TemplateRenderer portfolio={data} />`.
- In **Dashboard Preview**, the component is wrapped in `<DeviceFrameWrapper mode={desktop|mobile}>`.
- In **Public Route**, the component is rendered full-screen with native responsive Tailwind classes.
