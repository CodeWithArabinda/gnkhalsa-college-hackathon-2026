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
