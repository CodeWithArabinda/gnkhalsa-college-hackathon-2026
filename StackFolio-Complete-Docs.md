# StackFolio: Complete Hackathon Documentation Suite
Team Stack Attack | GNKC Hackathon 2026

This comprehensive document contains all 10 engineering, product, architectural, security, and presentation files for StackFolio.

---

# StackFolio - Product Requirements Document (PRD)

## 1. Executive Summary
**Product Name:** StackFolio (by Team Stack Attack)  
**Tagline:** Turn your static resume into an interactive, shareable portfolio in minutes.  
**Core Value Proposition:** StackFolio transforms career data locked inside static PDF resumes into a structured, editable, responsive, and publicly shareable digital portfolio—without requiring the user to write code or design layouts.

---

## 2. Problem Statement & Market Opportunity
College students, freshers, and early-career job seekers accumulate valuable projects, skills, and certifications. However, this information remains trapped in static 1–2 page PDF resumes.
- Static resumes cannot showcase live web applications, GitHub repos, or interactive media.
- Building a personal portfolio from scratch requires web development skills, design experience, domain purchasing, and hosting setup.
- Existing generic website builders are either overly complex (drag-and-drop fatigue) or rigid (non-editable automated exports).

StackFolio bridges this gap by offering guided intake (PDF upload or manual builder), structured editing, professional dual templates, real-time readiness feedback, and a permanent public link.

---

## 3. User Personas
### Primary Persona: Aarya Shah (Final-Year BCA Student)
- **Background:** 20 years old, actively applying for software engineering internships.
- **Pain Point:** Has 3 React projects and multiple certifications on GitHub and Drive, but recruiters only see plain text on her PDF resume.
- **Goal:** Transform her resume into a live, professional portfolio link (`/p/aarya-shah-r4x9`) to share on LinkedIn and job applications.

### Secondary Persona: Rohan Patil (Student Freelancer)
- **Background:** 22 years old, freelance frontend developer and UI enthusiast.
- **Pain Point:** No time to design a personal website from scratch; needs to showcase live URLs and project screenshots quickly.
- **Goal:** Continuously update project cards and share a clean corporate or developer layout with prospective clients.

### Tertiary Persona: Placement Cell Coordinator / Recruiter
- **Background:** College training and placement officer evaluating hundreds of student submissions.
- **Pain Point:** Inconsistent resume formatting makes evaluating practical coding competence time-consuming.
- **Goal:** Standardized, mobile-friendly portfolio pages with direct links to live demos and GitHub repositories.

---

## 4. Product Flow & Core User Journey
1. **Landing Page:** Value proposition, live template preview previews, and one-click "Get Started" CTA.
2. **Authentication:** Supabase Email/Password login or registration.
3. **Intake Flow:** 
   - Option A: Upload Resume PDF (assisted text extraction draft).
   - Option B: Manual Profile Builder.
   - Option C: "Try Demo Profile" (1-click pre-fill for rapid hackathon testing).
4. **Structured Review & Editor:** Multi-tab dashboard to edit Personal Info, About, Experiences, Education, Projects, Skills, and Achievements.
5. **Template Customization:** Instant toggle between Dark Developer and Light Corporate layouts.
6. **Device Preview:** Live interactive preview toggleable between Desktop (1280px) and Mobile (390px) SVG frames.
7. **Readiness Evaluation:** Real-time calculation of Portfolio Readiness Score (0-100) with actionable recommendations.
8. **Publish & Permanent Link:** Publish toggle generates a permanent unique slug (`/p/:public_slug`).
9. **Continuous Updates:** Subsequent edits update the live content at the existing stable URL without breaking references.

---

## 5. Scope Boundaries (MVP vs Out-of-Scope)

| In-Scope (Hackathon MVP) | Out-of-Scope (Future Scope) |
| :--- | :--- |
| Supabase Auth (Email/Password) | Paid subscription tiers & payment gateways |
| Resume PDF upload & storage in Supabase | 100% universal OCR parsing for complex layouts |
| Manual structured multi-section form editor | Complex drag-and-drop layout canvas builder |
| 2 Polished templates (Dark Dev & Light Corp) | Third-party LinkedIn OAuth sync |
| SVG Desktop (1280px) & Mobile (390px) preview toggle | Visitor analytics dashboards & heatmaps |
| Permanent stable slug (`/p/:public_slug`) | Custom CNAME domain routing |
| Dynamic 0-100 Portfolio Readiness Score | Real-time multi-user team collaboration |
| Publish / Unpublish visibility guard | Automated email notification queues |

---

## 6. Portfolio Readiness Score Specification
The readiness score is calculated deterministically on the client using a 100-point rubric:

$$\text{Readiness Score} = \min\left(100, \sum \text{Completed Criteria}\right)$$

| Criteria | Weight | Validation Rule | Actionable Suggestion |
| :--- | :--- | :--- | :--- |
| **Headline & Name** | 10 pts | `full_name.trim().length > 2` and `headline.trim().length > 5` | "Add a clear professional headline (e.g. Full-Stack Developer)." |
| **About Bio** | 10 pts | `bio.trim().length >= 50` | "Expand your bio to at least 50 characters to improve recruiter trust." |
| **Contact / Social Link** | 10 pts | At least 1 valid URL in `github_url`, `linkedin_url`, or `email` | "Add your GitHub or LinkedIn profile link." |
| **Education Record** | 10 pts | Count of `education` rows $\ge 1$ | "Add your current university or college degree." |
| **Project Presence** | 20 pts | Count of `projects` rows $\ge 1$ | "Add at least one project showcasing your practical abilities." |
| **Project Live/Repo Links** | 15 pts | At least 1 project has `github_url` or `live_url` populated | "Attach a GitHub repo or live demo link to your projects." |
| **Skills Breadth** | 10 pts | Count of `skills` rows $\ge 5$ | "List at least 5 core technical or soft skills." |
| **Achievements/Certificates** | 10 pts | Count of `achievements` rows $\ge 1$ | "Add an achievement, certificate, or academic honor." |
| **Profile Photo** | 5 pts | `profile_image_url` is non-empty | "Upload a clear profile picture to personalize your page." |

---

## 7. Permanent Public URL Rule
- Format: `/p/:public_slug` (e.g., `/p/aarya-shah-r4x9`)
- Public slugs are generated once upon profile initialization using sanitized full name plus a 4-character cryptographic hash/random alphanumeric suffix.
- Content updates must never alter or recreate the URL slug. Recruiters, resumes, and social profiles retain a permanent working link.


---

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


---

# StackFolio - Database Schema & Security Policies

Execute this complete DDL script inside the Supabase SQL Editor. It establishes normalized tables, foreign key constraints, indexes, automated timestamps, and Row Level Security (RLS) policies.

```sql
-- ============================================================================
-- 1. EXTENSIONS & SETUP
-- ============================================================================
create extension if not exists "uuid-ossp";

-- ============================================================================
-- 2. TABLE DEFINITIONS
-- ============================================================================

-- 2.1 PROFILES (Master User Portfolio Metadata)
create table public.profiles (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users(id) on delete cascade not null unique,
    full_name text not null,
    headline text default '',
    bio text default '',
    profile_image_url text default '',
    location text default '',
    email text default '',
    github_url text default '',
    linkedin_url text default '',
    selected_template text default 'dark_developer' check (selected_template in ('dark_developer', 'light_corporate')),
    is_published boolean default false,
    public_slug text not null unique,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2.2 EXPERIENCES
create table public.experiences (
    id uuid primary key default uuid_generate_v4(),
    profile_id uuid references public.profiles(id) on delete cascade not null,
    company text not null,
    role text not null,
    start_date text default '',
    end_date text default '',
    description text default '',
    display_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2.3 EDUCATION
create table public.education (
    id uuid primary key default uuid_generate_v4(),
    profile_id uuid references public.profiles(id) on delete cascade not null,
    institution text not null,
    degree text not null,
    field text default '',
    start_year text default '',
    end_year text default '',
    description text default '',
    display_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2.4 PROJECTS
create table public.projects (
    id uuid primary key default uuid_generate_v4(),
    profile_id uuid references public.profiles(id) on delete cascade not null,
    title text not null,
    description text default '',
    technologies text[] default '{}',
    github_url text default '',
    live_url text default '',
    image_url text default '',
    display_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2.5 SKILLS
create table public.skills (
    id uuid primary key default uuid_generate_v4(),
    profile_id uuid references public.profiles(id) on delete cascade not null,
    name text not null,
    category text default 'Technical',
    level text default 'Intermediate',
    display_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2.6 ACHIEVEMENTS & CERTIFICATIONS
create table public.achievements (
    id uuid primary key default uuid_generate_v4(),
    profile_id uuid references public.profiles(id) on delete cascade not null,
    title text not null,
    issuer text default '',
    date text default '',
    description text default '',
    credential_url text default '',
    display_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2.7 RESUME UPLOADS
create table public.resume_uploads (
    id uuid primary key default uuid_generate_v4(),
    profile_id uuid references public.profiles(id) on delete cascade not null,
    file_name text not null,
    file_url text not null,
    extracted_text text default '',
    processing_status text default 'completed' check (processing_status in ('pending', 'completed', 'failed')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2.8 PORTFOLIO FEEDBACK
create table public.portfolio_feedback (
    id uuid primary key default uuid_generate_v4(),
    profile_id uuid references public.profiles(id) on delete cascade not null,
    score integer default 0,
    suggestions jsonb default '[]'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================================================
-- 3. INDEXES FOR FAST QUERYING & ROUTING
-- ============================================================================
create index idx_profiles_user_id on public.profiles(user_id);
create index idx_profiles_public_slug on public.profiles(public_slug);
create index idx_projects_profile_id on public.projects(profile_id);
create index idx_skills_profile_id on public.skills(profile_id);
create index idx_education_profile_id on public.education(profile_id);
create index idx_experiences_profile_id on public.experiences(profile_id);
create index idx_achievements_profile_id on public.achievements(profile_id);

-- ============================================================================
-- 4. AUTOMATED UPDATED_AT TRIGGER
-- ============================================================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger tr_profiles_updated_at
    before update on public.profiles
    for each row execute function public.handle_updated_at();

-- ============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
alter table public.profiles enable row level security;
alter table public.experiences enable row level security;
alter table public.education enable row level security;
alter table public.projects enable row level security;
alter table public.skills enable row level security;
alter table public.achievements enable row level security;
alter table public.resume_uploads enable row level security;
alter table public.portfolio_feedback enable row level security;

-- PROFILES POLICIES
create policy "Public can view published profiles"
    on public.profiles for select
    using (is_published = true);

create policy "Users can view their own profile"
    on public.profiles for select
    using (auth.uid() = user_id);

create policy "Users can insert their own profile"
    on public.profiles for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own profile"
    on public.profiles for update
    using (auth.uid() = user_id);

-- PROJECTS POLICIES
create policy "Public and owner can view projects"
    on public.projects for select
    using (
        exists (
            select 1 from public.profiles
            where profiles.id = projects.profile_id
            and (profiles.is_published = true or profiles.user_id = auth.uid())
        )
    );

create policy "Owners can manage projects"
    on public.projects for all
    using (
        exists (
            select 1 from public.profiles
            where profiles.id = projects.profile_id
            and profiles.user_id = auth.uid()
        )
    );

-- SKILLS POLICIES
create policy "Public and owner can view skills"
    on public.skills for select
    using (
        exists (
            select 1 from public.profiles
            where profiles.id = skills.profile_id
            and (profiles.is_published = true or profiles.user_id = auth.uid())
        )
    );

create policy "Owners can manage skills"
    on public.skills for all
    using (
        exists (
            select 1 from public.profiles
            where profiles.id = skills.profile_id
            and profiles.user_id = auth.uid()
        )
    );

-- EDUCATION POLICIES
create policy "Public and owner can view education"
    on public.education for select
    using (
        exists (
            select 1 from public.profiles
            where profiles.id = education.profile_id
            and (profiles.is_published = true or profiles.user_id = auth.uid())
        )
    );

create policy "Owners can manage education"
    on public.education for all
    using (
        exists (
            select 1 from public.profiles
            where profiles.id = education.profile_id
            and profiles.user_id = auth.uid()
        )
    );

-- EXPERIENCES POLICIES
create policy "Public and owner can view experiences"
    on public.experiences for select
    using (
        exists (
            select 1 from public.profiles
            where profiles.id = experiences.profile_id
            and (profiles.is_published = true or profiles.user_id = auth.uid())
        )
    );

create policy "Owners can manage experiences"
    on public.experiences for all
    using (
        exists (
            select 1 from public.profiles
            where profiles.id = experiences.profile_id
            and profiles.user_id = auth.uid()
        )
    );

-- ACHIEVEMENTS POLICIES
create policy "Public and owner can view achievements"
    on public.achievements for select
    using (
        exists (
            select 1 from public.profiles
            where profiles.id = achievements.profile_id
            and (profiles.is_published = true or profiles.user_id = auth.uid())
        )
    );

create policy "Owners can manage achievements"
    on public.achievements for all
    using (
        exists (
            select 1 from public.profiles
            where profiles.id = achievements.profile_id
            and profiles.user_id = auth.uid()
        )
    );

-- RESUME UPLOADS & FEEDBACK (OWNER-ONLY)
create policy "Owners manage resume uploads"
    on public.resume_uploads for all
    using (
        exists (
            select 1 from public.profiles
            where profiles.id = resume_uploads.profile_id
            and profiles.user_id = auth.uid()
        )
    );

create policy "Owners manage portfolio feedback"
    on public.portfolio_feedback for all
    using (
        exists (
            select 1 from public.profiles
            where profiles.id = portfolio_feedback.profile_id
            and profiles.user_id = auth.uid()
        )
    );
```


---

# StackFolio - API & Data Contract Specification

StackFolio interfaces directly with Supabase via `@supabase/supabase-js`. Below are the client contracts and payload definitions.

---

## 1. Authentication Endpoints

### 1.1 Sign Up
```javascript
const { data, error } = await supabase.auth.signUp({
  email: 'aarya@example.com',
  password: 'SecurePassword123!',
  options: {
    data: { full_name: 'Aarya Shah' }
  }
});
```

### 1.2 Sign In
```javascript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'aarya@example.com',
  password: 'SecurePassword123!'
});
```

---

## 2. Profile Management

### 2.1 Fetch Complete User Portfolio (Authenticated Workspace)
```javascript
const { data, error } = await supabase
  .from('profiles')
  .select(`
    *,
    experiences (*),
    education (*),
    projects (*),
    skills (*),
    achievements (*)
  `)
  .eq('user_id', user.id)
  .single();
```

### 2.2 Fetch Public Portfolio by Slug (`/p/:public_slug`)
```javascript
const { data, error } = await supabase
  .from('profiles')
  .select(`
    full_name,
    headline,
    bio,
    profile_image_url,
    location,
    email,
    github_url,
    linkedin_url,
    selected_template,
    experiences (*),
    education (*),
    projects (*),
    skills (*),
    achievements (*)
  `)
  .eq('public_slug', publicSlug)
  .eq('is_published', true)
  .single();
```
- **Success (200):** Returns complete nested portfolio object.
- **Unpublished / Missing (404):** Returns `data: null`. Frontend displays graceful 404/Unpublished message.

### 2.3 Update Profile Metadata & Publishing State
```javascript
const { data, error } = await supabase
  .from('profiles')
  .update({
    full_name: 'Aarya Shah',
    headline: 'Full-Stack Developer & Open-Source Contributor',
    bio: 'BCA student passionate about modern web apps, distributed systems, and clean UI.',
    selected_template: 'dark_developer',
    is_published: true
  })
  .eq('id', profileId)
  .select();
```

---

## 3. Child Table Mutations (Projects, Skills, Education)

### 3.1 Insert New Project
```javascript
const { data, error } = await supabase
  .from('projects')
  .insert([{
    profile_id: profileId,
    title: 'CloudIDE',
    description: 'A browser-based code editor with real-time compilation.',
    technologies: ['React', 'WebAssembly', 'Node.js', 'Tailwind'],
    github_url: 'https://github.com/aaryashah/cloud-ide',
    live_url: 'https://cloudide.demo.com',
    display_order: 1
  }])
  .select();
```

### 3.2 Update Project
```javascript
const { data, error } = await supabase
  .from('projects')
  .update({
    title: 'CloudIDE Pro',
    github_url: 'https://github.com/aaryashah/cloudide-pro'
  })
  .eq('id', projectId);
```

### 3.3 Delete Project
```javascript
const { error } = await supabase
  .from('projects')
  .delete()
  .eq('id', projectId);
```

---

## 4. Storage Bucket Contracts

### 4.1 Profile Avatar Upload
```javascript
// Bucket: 'avatars' (Public)
const filePath = `${profileId}/avatar-${Date.now()}.${fileExt}`;
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(filePath, file, { upsert: true });

const { data: { publicUrl } } = supabase.storage
  .from('avatars')
  .getPublicUrl(filePath);
```

### 4.2 Resume PDF Storage
```javascript
// Bucket: 'resumes' (Private)
const filePath = `${profileId}/resume-${Date.now()}.pdf`;
const { data, error } = await supabase.storage
  .from('resumes')
  .upload(filePath, file);
```


---

# StackFolio - Design System & UI Specifications

## 1. Visual Identity & Dual Template Themes

### 1.1 Template 1: Dark Developer Layout
Designed for engineers, open-source contributors, and software developers.
- **Background:** `#0B0F17` (Deep Slate / Obsidian)
- **Surface Cards:** `#161F30` (Muted Indigo-Slate)
- **Border Accents:** `#1E293B` (Subtle 1px border)
- **Primary Accent:** `#38BDF8` (Electric Cyan)
- **Secondary Accent:** `#10B981` (Emerald Green)
- **Primary Text:** `#F8FAFC` (Clean White)
- **Muted Text:** `#94A3B8` (Cool Grey)
- **Typography:** JetBrains Mono for tags/code, Inter for body copy.
- **Key Styling:** Glow badges, monospaced tech tags, terminal-inspired card headers.

### 1.2 Template 2: Light Corporate Layout
Designed for analysts, project leads, product managers, and corporate roles.
- **Background:** `#F8FAFC` (Soft Off-White)
- **Surface Cards:** `#FFFFFF` (Pure White with subtle box-shadow)
- **Border Accents:** `#E2E8F0` (Light Slate Border)
- **Primary Accent:** `#1E3A8A` (Deep Navy Blue)
- **Secondary Accent:** `#2563EB` (Royal Blue)
- **Primary Text:** `#0F172A` (Slate Black)
- **Muted Text:** `#64748B` (Medium Slate)
- **Typography:** Plus Jakarta Sans for headings, Inter for body copy.
- **Key Styling:** Clean rounded pill badges, subtle box shadows (`shadow-sm`), refined serif/sans hierarchy.

---

## 2. Dashboard Workspace Layout (Split-Pane Pattern)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ NAVBAR: [StackFolio Logo]       [Score: 85/100 🟢]      [User Avatar ▾]    │
├──────────────────────────────────────┬──────────────────────────────────────┤
│ LEFT PANEL: FORM EDITOR (50% w)      │ RIGHT PANEL: LIVE PREVIEW (50% w)    │
│                                      │                                      │
│ Tabs: [Basic] [Projects] [Skills]    │ Controls:                            │
│       [Education] [Achievements]     │ [Template: Dark Dev ▾]               │
│                                      │ [💻 Desktop View | 📱 Mobile View]  │
│ ┌──────────────────────────────────┐ │                                      │
│ │ Project 1: CloudIDE              │ │ ┌──────────────────────────────────┐ │
│ │ Description: [Browser code ed..] │ │ │ PREVIEW CANVAS                   │ │
│ │ GitHub: [https://github...     ] │ │ │                                  │ │
│ │ Live URL: [https://cloudide... ] │ │ │ (Renders Dark Dev or Light Corp) │ │
│ └──────────────────────────────────┘ │ │ (Scales to 1280px or 390px frame)│ │
│                                      │ │                                  │ │
│ [+ Add New Project]                  │ └──────────────────────────────────┘ │
│                                      │                                      │
│ [💾 Save Changes]   [🚀 Publish]     │ Stable Link: /p/aarya-shah-r4x9 [📋] │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

---

## 3. SVG Device Frame Specifications

### 3.1 Desktop Preview Mode
- **Container Constraint:** `w-full max-w-[1280px]`
- **Scaling:** Fluid aspect ratio, responsive columns.
- **Header Icon:** Laptop SVG icon with active state color highlight.

### 3.2 Mobile Preview Mode
- **Container Constraint:** `w-[390px] h-[700px]`
- **Frame Styling:** `rounded-[40px] border-[10px] border-slate-900 shadow-2xl overflow-y-auto`
- **Simulated Notch:** Top-centered pill notch (`w-28 h-4 bg-slate-900 rounded-b-xl`).
- **Header Icon:** Smartphone SVG icon with active state color highlight.


---

# StackFolio - 4-Day Hackathon Execution Plan

## 1. Day-by-Day Implementation Roadmap

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 4-DAY HACKATHON TIMELINE                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ DAY 1: Foundation, Database & Auth                                          │
│ • Setup React 18 + Vite + Tailwind CSS repository                           │
│ • Execute Supabase SQL DDL schema & apply Row Level Security (RLS) policies │
│ • Implement AuthContext, Sign Up, and Sign In pages                         │
│ • Seed mock test profile (Aarya Shah dataset)                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ DAY 2: Form Editor Engine & Readiness Calculator                            │
│ • Build multi-tab Form Editor (Basic, Projects, Skills, Edu, Achievements)  │
│ • Implement `useReadiness` scoring hook (0-100 logic + actionable tips)     │
│ • Connect Supabase Storage bucket for profile picture uploads               │
│ • Build PDF text extraction draft helper (with fallback demo data button)   │
├─────────────────────────────────────────────────────────────────────────────┤
│ DAY 3: Dual Templates, Responsive Preview & Public Slug Route               │
│ • Build Template 1 (Dark Developer) & Template 2 (Light Corporate)         │
│ • Construct Live Preview canvas with Desktop (1280px) and Mobile (390px) SVG│
│ • Implement dynamic public route `/p/:public_slug`                          │
│ • Build stable slug generator (`name-xxxx`) and Publish/Unpublish toggle    │
├─────────────────────────────────────────────────────────────────────────────┤
│ DAY 4: Hardening, Deployment, Backup Data & Pitch Rehearsal                 │
│ • Deploy frontend to Vercel and link environment variables                  │
│ • Execute full QA test matrix (mobile viewports, RLS privacy validation)    │
│ • Record offline video demo backup & rehearse 3-minute presentation script  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Team Role Allocation

| Member | Assigned Role | Concrete Deliverables |
| :--- | :--- | :--- |
| **Member 1 (Lead)** | Product Lead & Full-Stack Builder | Architecture, Supabase integration, Templates, Public routing, Vercel deployment. |
| **Member 2** | Research & Documentation Lead | PRD, Architecture, and API documentation maintenance, slide deck script. |
| **Member 3** | QA & Demo Data Manager | Realistic profile seeding, bug hunt, RLS data leak verification, mobile testing. |
| **Member 4** | UX Reviewer & Co-Presenter | UI polish, typography alignment, SVG frame testing, live judge pitch delivery. |


---

# StackFolio - Quality Assurance & Test Plan

## 1. Test Matrix

| ID | Test Scenario | Execution Steps | Expected Outcome | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01** | User Registration & Profile Initialization | 1. Sign up with new email.<br>2. Complete auth flow. | User row in `auth.users`; profile initialized with unique `public_slug`. | Pass |
| **TC-02** | Manual Project Addition & Deletion | 1. Navigate to Projects tab.<br>2. Add "CloudIDE" with GitHub link.<br>3. Delete item. | Item persists to database, renders in preview, and deletes cleanly. | Pass |
| **TC-03** | Readiness Score Dynamic Increment | 1. Start with initial 45-point profile.<br>2. Add 5 skills and 1 GitHub link. | Score increases from 45 to 70; suggestions list updates in real time. | Pass |
| **TC-04** | Desktop to Mobile SVG Preview Switcher | 1. Click Mobile SVG toggle in preview header. | Container adjusts to 390px phone frame without horizontal scroll breakage. | Pass |
| **TC-05** | Instant Template Theme Swap | 1. Change template dropdown from Dark Dev to Light Corp. | Instant CSS swap without full page re-render or data loss. | Pass |
| **TC-06** | Stable Public Slug Persistence | 1. Publish profile with slug `aarya-shah-r4x9`.<br>2. Edit bio text.<br>3. Revisit `/p/aarya-shah-r4x9`. | Public URL remains identical; content renders updated bio. | Pass |
| **TC-07** | RLS Security Guard for Private Drafts | 1. Attempt unauthenticated fetch of unpublished profile via API. | Query returns zero rows or RLS permission error. | Pass |
| **TC-08** | Unpublished Route 404 Guard | 1. Toggle `is_published` to `false`.<br>2. Open `/p/:slug` in incognito window. | Page displays "This portfolio is currently unpublished or private". | Pass |
| **TC-09** | Profile Avatar Image Upload | 1. Upload 1.5MB PNG file in Basic Info tab. | File uploads to Supabase `avatars` bucket; image updates in preview. | Pass |
| **TC-10** | Demo Profile 1-Click Intake | 1. Click "Try Demo Profile" on onboarding. | Populates complete Aarya Shah dataset into editor fields immediately. | Pass |


---

# StackFolio - Live Hackathon Demo Script & Judge Q&A

## 1. 3-Minute Live Presentation Script

### [0:00 - 0:35] Problem Hook & The PDF Trap
- **Speaker:** "Good morning judges! Meet Aarya Shah, a final-year student with great React projects and hackathon wins. But right now, her career evidence is trapped inside this static 2-page PDF resume. Recruiters cannot click her live demos, and building a custom website requires days of coding and design effort. We built **StackFolio** to transform static resumes into living, professional portfolios in minutes."

### [0:35 - 1:15] Assisted Intake & Structured Editing
- **Speaker:** "With StackFolio, Aarya uploads her resume PDF or clicks 'Try Demo Profile'. StackFolio organizes her career information into structured, editable fields—projects, skills, education, and achievements. No brittle automated publishing—the user maintains complete editorial control."
- **Action:** Open Dashboard; show pre-loaded profile data in the structured editor tabs.

### [1:15 - 1:55] Readiness Score & Live Preview Customization
- **Speaker:** "Notice our key differentiator: the **Portfolio Readiness Score**. It shows Aarya's portfolio is at 72%, flagging that her top project lacks a live demo link. Watch what happens when we add `https://cloudide.demo.com`."
- **Action:** Paste the live URL into Project 1.
- **Speaker:** "The score immediately jumps to 87%! Now, let's switch from the **Dark Developer** theme to the **Light Corporate** layout, and test the mobile preview using our device frame toggle."
- **Action:** Switch theme dropdown to Light Corporate; click Mobile SVG icon to demonstrate the 390px phone container.

### [1:55 - 2:35] One-Click Publishing & Permanent Stable URL
- **Speaker:** "Aarya is satisfied. She clicks 'Publish'. StackFolio generates a permanent public URL: `/p/aarya-shah-r4x9`."
- **Action:** Copy public link and open in a new incognito browser tab.
- **Speaker:** "If Aarya updates her bio or adds a new certification tomorrow, this same permanent link updates instantly. Her resume, LinkedIn, and recruiter emails never suffer from broken links."

### [2:35 - 3:00] Architecture & Wrap-Up
- **Speaker:** "StackFolio is built with React 18, Vite, Tailwind CSS, and Supabase PostgreSQL with strict Row Level Security, deployed globally on Vercel. Thank you, and we welcome your questions!"

---

## 2. Judge Q&A Prepared Defense

**Q: "Why keep the public URL stable instead of creating new versions?"**  
*Answer:* "A candidate shares their portfolio URL on static resumes, emails, and LinkedIn bios. If a save creates a new link, all previously distributed links break. Stable slugs with instant content synchronization represent industry best practice."

**Q: "What happens if a student's resume PDF has a messy layout and parsing fails?"**  
*Answer:* "Our product treats resume extraction as an assistive draft step, not a black box. The user reviews and edits every field in our structured form editor before publishing, guaranteeing zero inaccurate information reaches the public page."

**Q: "How do you protect private draft data in Supabase?"**  
*Answer:* "We enforce strict Row Level Security (RLS) on PostgreSQL. Public queries can only select records where `is_published = true`. Unpublished profiles and private uploads are strictly accessible only by the authenticated owner (`auth.uid() = user_id`)."


---

# StackFolio - Security & Privacy Checklist

## 1. Access Control & Row Level Security (RLS)
- [x] **Enforce RLS on All Tables:** `profiles`, `experiences`, `education`, `projects`, `skills`, `achievements`, `resume_uploads`, `portfolio_feedback`.
- [x] **Public Read Isolation:** Anonymous/public visitors can only read profile data where `profiles.is_published = true`.
- [x] **Owner Write Isolation:** Mutation operations (`INSERT`, `UPDATE`, `DELETE`) require `auth.uid() = user_id`.
- [x] **Private Buckets:** Resume PDF uploads stored in private storage bucket with signed URL access.

## 2. API & Secret Key Management
- [x] **Client Secret Protection:** Only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` exposed in client bundles.
- [x] **Service Role Secret Lockdown:** Supabase `service_role` master key is strictly prohibited from frontend code or Git commits.
- [x] **Environment Variable Hygiene:** `.env` added to `.gitignore`; `.env.example` provided for safe repository cloning.

## 3. Data Validation & Injection Prevention
- [x] **URL Protocol Sanitization:** All user-supplied links (`github_url`, `live_url`, `linkedin_url`) validated to start with `https://` or `http://` to prevent `javascript:` XSS payloads.
- [x] **Unique Public Slug Constraint:** Database-enforced `UNIQUE` index on `public_slug` to eliminate namespace collisions and route hijacking.
- [x] **File Upload Restrictions:** Storage buckets restrict file types (PDF $\le 5$MB for resumes, PNG/JPEG/WEBP $\le 2$MB for avatars).


---

# StackFolio - AI Agent Rules & Engineering Directives

## 1. Project Overview & Scope Lock
- **Application:** StackFolio (Resume to Interactive Portfolio Generator).
- **Target Stack:** React 18, Vite, Tailwind CSS, Supabase (Auth, Postgres, Storage), Vercel.
- **Scope Boundary:** Maintain strict focus on approved hackathon deliverables. Do not introduce backend servers (Node/Express), Redis, GraphQL, payment gateways, or third-party OAuth complexity.

---

## 2. Architectural Invariants
1. **Single-Source Component Principle:**
   - Always use `<TemplateRenderer portfolio={data} />` for both the Dashboard Live Preview and Public `/p/:public_slug` route.
   - Do not maintain separate JSX component trees for desktop and mobile preview. Handle device preview strictly by altering the parent container wrapper dimensions (`1280px` vs `390px`).
2. **Stable Slug Immutability:**
   - The public URL route must always follow `/p/:public_slug`.
   - Content updates must update the existing record matching `user_id` or `id`; never generate a new slug on normal content saves.
3. **Database Schema Integrity:**
   - Adhere strictly to the column names and table relationships defined in `database-schema.md`.
   - Maintain `user_id` foreign keys to `auth.users(id)` and child table `profile_id` foreign keys to `profiles(id)`.

---

## 3. Code Quality & Implementation Standards
- Use functional React components with standard hooks (`useState`, `useEffect`, `useContext`, `useMemo`).
- Provide explicit loading and error fallback states for all Supabase asynchronous queries.
- Ensure Tailwind CSS classes adhere to the color design tokens specified in `design.md`.

