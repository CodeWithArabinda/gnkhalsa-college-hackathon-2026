import React, { useState, useEffect } from "react";

export default function Portfolio2Template({ portfolio }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Normalize portfolio data with strong fallbacks
    const profile = portfolio?.profile || portfolio || {};
    const full_name = portfolio?.full_name || profile?.full_name || "Developer";
    const headline = portfolio?.headline || profile?.headline || "Full-Stack Developer & Software Engineer";
    const bio = portfolio?.bio || profile?.bio || "";
    const defaultAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";
    const profile_image_url = portfolio?.profile_image_url || profile?.profile_image_url || profile?.avatar_url || defaultAvatar;
    const email = portfolio?.email || profile?.email || "";
    const github_url = portfolio?.github_url || profile?.github_url || "";
    const linkedin_url = portfolio?.linkedin_url || profile?.linkedin_url || "";
    const resume_url = portfolio?.resume_url || profile?.resume_url || "";

    const rawExperiences = Array.isArray(portfolio?.experiences) ? portfolio.experiences : (Array.isArray(profile?.experiences) ? profile.experiences : []);
    const rawEducation = Array.isArray(portfolio?.education) ? portfolio.education : (Array.isArray(profile?.education) ? profile.education : []);
    const rawProjects = Array.isArray(portfolio?.projects) ? portfolio.projects : (Array.isArray(profile?.projects) ? profile.projects : []);
    const rawSkills = Array.isArray(portfolio?.skills) ? portfolio.skills : (Array.isArray(profile?.skills) ? profile.skills : []);
    const rawAchievements = Array.isArray(portfolio?.achievements) ? portfolio.achievements : (Array.isArray(profile?.achievements) ? profile.achievements : []);

    // Filter out null/undefined entries safely
    const experiences = rawExperiences.filter(Boolean);
    const education = rawEducation.filter(Boolean);
    const projects = rawProjects.filter(Boolean);
    const skills = rawSkills.filter(Boolean);
    const achievements = rawAchievements.filter(Boolean);

    const initialLetter = full_name ? full_name.charAt(0).toUpperCase() : "D";

    // Scroll reveal observer for animations
    useEffect(() => {
        if (typeof window === "undefined") return;
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mediaQuery.matches) return;

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("revealed");
                        }
                    });
                },
                { threshold: 0.1 }
            );

            const animatableElements = document.querySelectorAll(
                ".stackfolio-portfolio2 .reveal-hero-text, .stackfolio-portfolio2 .reveal-hero-img, .stackfolio-portfolio2 .reveal-up"
            );

            animatableElements.forEach((el) => observer.observe(el));

            return () => observer.disconnect();
        }
    }, [portfolio]);

    // Categorize skills into Frontend, Backend, Tools, Other with null-safety
    const categorizeSkills = (skillsList) => {
        const categories = {
            FRONTEND: [],
            BACKEND: [],
            TOOLS: [],
            OTHER: []
        };

        const frontendKeywords = ["react", "next", "vue", "angular", "svelte", "typescript", "javascript", "js", "html", "css", "tailwind", "redux", "webgl", "three", "sass", "frontend", "ui", "ux"];
        const backendKeywords = ["node", "express", "python", "django", "flask", "fastapi", "java", "spring", "go", "rust", "c++", "c#", "ruby", "php", "graphql", "rest", "postgres", "sql", "mongo", "redis", "firebase", "supabase", "backend"];
        const toolsKeywords = ["git", "github", "docker", "kubernetes", "aws", "gcp", "azure", "linux", "vercel", "figma", "postman", "webpack", "vite", "ci/cd", "devops", "tools"];

        skillsList.forEach((sk) => {
            if (!sk) return;
            let name = "";
            let cat = "";

            if (typeof sk === "string") {
                name = sk;
            } else if (typeof sk === "object" && sk !== null) {
                name = sk.name || sk.label || sk.title || "";
                cat = sk.category ? String(sk.category).toLowerCase() : "";
            }

            if (!name) return;
            const lowerName = name.toLowerCase();

            if (cat.includes("frontend") || frontendKeywords.some(k => lowerName.includes(k))) {
                categories.FRONTEND.push(name);
            } else if (cat.includes("backend") || backendKeywords.some(k => lowerName.includes(k))) {
                categories.BACKEND.push(name);
            } else if (cat.includes("tool") || cat.includes("devops") || toolsKeywords.some(k => lowerName.includes(k))) {
                categories.TOOLS.push(name);
            } else {
                categories.OTHER.push(name);
            }
        });

        // Fallback if uncategorized
        if (categories.FRONTEND.length === 0 && categories.BACKEND.length === 0 && categories.TOOLS.length === 0 && categories.OTHER.length === 0 && skillsList.length > 0) {
            categories.FRONTEND = skillsList.map(s => typeof s === "string" ? s : (s?.name || s?.label || "")).filter(Boolean);
        }

        return categories;
    };

    const categorizedSkills = categorizeSkills(skills);

    const defaultProjectImages = [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
    ];

    return (
        <div className="stackfolio-portfolio2 min-h-screen bg-white text-black font-mono relative selection:bg-black selection:text-white">
            {/* Embedded CSS for Portfolio2 Styles & Animations */}
            <style>{`
                .stackfolio-portfolio2 {
                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                }
                .stackfolio-portfolio2 .reveal-hero-text,
                .stackfolio-portfolio2 .reveal-hero-img,
                .stackfolio-portfolio2 .reveal-up {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .stackfolio-portfolio2 .revealed {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                @media (prefers-reduced-motion: reduce) {
                    .stackfolio-portfolio2 .reveal-hero-text,
                    .stackfolio-portfolio2 .reveal-hero-img,
                    .stackfolio-portfolio2 .reveal-up {
                        opacity: 1 !important;
                        transform: none !important;
                        transition: none !important;
                    }
                }
                .stackfolio-portfolio2 .btn-black {
                    background-color: #000;
                    color: #fff;
                    transition: all 0.2s ease;
                }
                .stackfolio-portfolio2 .btn-black:hover {
                    background-color: #262626;
                    transform: translateY(-2px);
                }
                .stackfolio-portfolio2 .btn-outline {
                    border: 2px solid #000;
                    background-color: transparent;
                    color: #000;
                    transition: all 0.2s ease;
                }
                .stackfolio-portfolio2 .btn-outline:hover {
                    background-color: #000;
                    color: #fff;
                    transform: translateY(-2px);
                }
            `}</style>

            {/* 01. NAVIGATION */}
            <header className="fixed top-0 left-0 z-40 w-full h-[70px] bg-white/90 backdrop-blur-md border-b border-gray-200 px-6 sm:px-12 flex items-center justify-between shadow-sm">
                <a href="#hero" className="flex items-center gap-2 text-xl font-bold tracking-tight text-black">
                    <span className="bg-black text-white px-2.5 py-0.5 rounded text-base">{initialLetter}</span>
                    <span>{full_name}</span>
                </a>

                <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">
                    <a href="#about" className="hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors">About</a>
                    {experiences.length > 0 && <a href="#experience" className="hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors">Experience</a>}
                    {projects.length > 0 && <a href="#projects" className="hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors">Projects</a>}
                    {skills.length > 0 && <a href="#skills" className="hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors">Skills</a>}
                    {(education.length > 0 || achievements.length > 0) && <a href="#education" className="hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors">Academics</a>}
                    <a href="#contact" className="btn-black text-xs px-4 py-2 rounded-full flex items-center gap-2">
                        <span>Get in touch</span>
                        <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
                            <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </div>
                    </a>
                </nav>

                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden text-black p-2 focus:outline-none"
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        {mobileMenuOpen ? (
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        ) : (
                            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                        )}
                    </svg>
                </button>

                {mobileMenuOpen && (
                    <div className="lg:hidden absolute top-[70px] left-0 w-full bg-white border-b border-gray-200 p-6 space-y-4 shadow-xl text-center">
                        <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block text-base font-semibold py-1">About</a>
                        {experiences.length > 0 && <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="block text-base font-semibold py-1">Experience</a>}
                        {projects.length > 0 && <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="block text-base font-semibold py-1">Projects</a>}
                        {skills.length > 0 && <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="block text-base font-semibold py-1">Skills</a>}
                        {(education.length > 0 || achievements.length > 0) && <a href="#education" onClick={() => setMobileMenuOpen(false)} className="block text-base font-semibold py-1">Academics</a>}
                        <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="inline-block btn-black text-xs px-6 py-2.5 rounded-full mt-2">
                            Get in touch →
                        </a>
                    </div>
                )}
            </header>

            {/* 02. HERO / INTRODUCTION */}
            <section id="hero" className="relative flex min-h-screen w-full flex-col justify-center pt-[100px] pb-16 px-6 sm:px-10 md:px-16 lg:px-24">
                <div className="mx-auto flex w-full max-w-7xl flex-col-reverse lg:flex-row items-center justify-between gap-12">
                    {/* Hero Left Content */}
                    <div className="flex flex-1 flex-col justify-center">
                        <div className="reveal-hero-text mb-3 flex items-center gap-2">
                            <span className="inline-block h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-sm font-semibold uppercase tracking-wider text-gray-600">Available for Opportunities</span>
                        </div>

                        <h1 className="flex flex-wrap text-5xl sm:text-6xl lg:text-7xl font-bold uppercase leading-tight tracking-tight">
                            <span className="reveal-hero-text text-gray-500 block w-full">Hello, I'm</span>
                            <span className="reveal-hero-text bg-black text-white px-4 py-1 mt-2 rounded-md">{full_name}</span>
                        </h1>

                        <h2 className="reveal-hero-text mt-4 text-2xl sm:text-3xl font-semibold text-gray-800">
                            {headline}
                        </h2>

                        {bio && (
                            <p className="reveal-hero-text mt-4 max-w-2xl text-lg text-gray-600 leading-relaxed">
                                {bio}
                            </p>
                        )}

                        {/* Hero CTA Buttons */}
                        <div className="reveal-hero-text mt-8 flex flex-wrap items-center gap-4">
                            {projects.length > 0 && (
                                <a
                                    href="#projects"
                                    className="flex h-[48px] items-center gap-3 rounded-full bg-black px-6 text-white font-medium transition-all hover:bg-gray-800 hover:shadow-lg"
                                >
                                    <span>View My Work</span>
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 12.59l3.3-3.3 1.41 1.42L12 16.41l-5.71-5.7 1.42-1.42 3.29 3.3V6h2v8.59z" />
                                    </svg>
                                </a>
                            )}
                            {resume_url ? (
                                <a
                                    href={resume_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex h-[48px] items-center gap-3 rounded-full border-2 border-black bg-transparent px-6 text-black font-medium transition-all hover:bg-black hover:text-white"
                                >
                                    <span>Download Resume</span>
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                                    </svg>
                                </a>
                            ) : (
                                <a
                                    href="#contact"
                                    className="flex h-[48px] items-center gap-3 rounded-full border-2 border-black bg-transparent px-6 text-black font-medium transition-all hover:bg-black hover:text-white"
                                >
                                    <span>Contact Me</span>
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                    </svg>
                                </a>
                            )}
                        </div>

                        {/* Hero Social Links */}
                        <div className="reveal-hero-text mt-8 flex items-center gap-6 text-2xl text-gray-700">
                            {github_url && (
                                <a href={github_url} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-black transition-colors">
                                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                    </svg>
                                </a>
                            )}
                            {linkedin_url && (
                                <a href={linkedin_url} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-blue-600 transition-colors">
                                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                            )}
                            {email && (
                                <a href={`mailto:${email}`} aria-label="Email" className="hover:text-red-500 transition-colors">
                                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Hero Right Visual / Profile Image */}
                    <div className="flex w-full lg:w-1/2 justify-center items-center">
                        <div className="relative w-full max-w-[420px] aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-black/5 bg-gray-100">
                            <img
                                src={profile_image_url}
                                alt={full_name}
                                onError={(e) => { e.currentTarget.src = defaultAvatar; }}
                                className="reveal-hero-img h-full w-full object-cover"
                            />
                            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg flex items-center gap-3 border border-gray-200">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white font-bold text-sm">
                                    &lt;/&gt;
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm font-bold truncate">{headline}</p>
                                    <p className="text-xs text-gray-600 truncate">
                                        {skills.length > 0
                                            ? skills.slice(0, 4).map(s => typeof s === "string" ? s : (s?.name || s?.label || "")).filter(Boolean).join(" • ")
                                            : "Building Modern Software"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 03. ABOUT ME */}
            <section id="about" className="relative w-full flex flex-col items-center px-6 sm:px-10 md:px-16 lg:px-24 py-20 bg-gray-50 border-y border-gray-200">
                <div className="w-full max-w-7xl">
                    <div className="text-center">
                        <span className="reveal-up text-sm font-bold uppercase tracking-widest text-gray-500">03. Background</span>
                        <h2 className="reveal-up text-4xl sm:text-5xl font-bold mt-2">ABOUT ME</h2>
                        <div className="reveal-up mx-auto my-4 h-1 w-24 bg-black"></div>
                    </div>

                    <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Left: Story & Goals */}
                        <div className="lg:col-span-7 flex flex-col gap-6">
                            <h3 className="reveal-up text-2xl font-bold">Architecting modern solutions with creativity and code.</h3>

                            <p className="reveal-up text-gray-700 text-lg leading-relaxed">
                                {bio || `${full_name} is a dedicated software engineer specializing in building high-performance web applications, scalable backend microservices, and modern user interfaces.`}
                            </p>

                            <div className="reveal-up flex flex-col gap-4 mt-2">
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-200">
                                    <div className="text-2xl text-black">🚀</div>
                                    <div>
                                        <h4 className="font-bold text-lg">Career Goals</h4>
                                        <p className="text-gray-600 text-sm">To architect scalable web platforms and lead high-impact engineering teams building intelligent software solutions.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-200">
                                    <div className="text-2xl text-black">💡</div>
                                    <div>
                                        <h4 className="font-bold text-lg">Professional Interests</h4>
                                        <p className="text-gray-600 text-sm">Full-Stack Web Engineering, UI/UX Design Systems, Cloud Architecture, and Performance Optimization.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Stats Cards */}
                        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
                            <div className="reveal-up flex flex-col items-center justify-center p-6 bg-black text-white rounded-2xl shadow-lg text-center transform transition-transform hover:scale-105">
                                <span className="text-5xl font-extrabold">{experiences.length > 0 ? `${experiences.length}+` : "2+"}</span>
                                <span className="text-sm font-semibold mt-2 uppercase tracking-wider text-gray-300">Positions Held</span>
                            </div>

                            <div className="reveal-up flex flex-col items-center justify-center p-6 bg-white border-2 border-black text-black rounded-2xl shadow-lg text-center transform transition-transform hover:scale-105">
                                <span className="text-5xl font-extrabold">{projects.length > 0 ? `${projects.length}+` : "5+"}</span>
                                <span className="text-sm font-semibold mt-2 uppercase tracking-wider text-gray-600">Projects Completed</span>
                            </div>

                            <div className="reveal-up flex flex-col items-center justify-center p-6 bg-gray-200 text-black rounded-2xl shadow-lg text-center transform transition-transform hover:scale-105">
                                <span className="text-5xl font-extrabold">{skills.length > 0 ? `${skills.length}+` : "10+"}</span>
                                <span className="text-sm font-semibold mt-2 uppercase tracking-wider text-gray-700">Skills & Tools</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 04. FEATURED PROJECTS ⭐ */}
            {projects.length > 0 && (
                <section id="projects" className="relative flex min-h-screen w-full flex-col items-center overflow-hidden px-6 sm:px-10 md:px-16 lg:px-24 py-20">
                    <div className="w-full max-w-7xl">
                        <div className="text-center">
                            <span className="reveal-up text-sm font-bold uppercase tracking-widest text-gray-500">04. Portfolio</span>
                            <h2 className="reveal-up text-4xl sm:text-5xl font-bold mt-2">FEATURED PROJECTS ⭐</h2>
                            <div className="reveal-up mx-auto my-4 h-1 w-24 bg-black"></div>
                        </div>

                        <div className="mt-12 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                            {projects.map((proj, idx) => {
                                if (!proj) return null;
                                const title = proj.title || proj.name || "Project";
                                const desc = proj.description || proj.summary || "";
                                const rawTechs = Array.isArray(proj.technologies) ? proj.technologies : (Array.isArray(proj.tech) ? proj.tech : []);
                                const techs = rawTechs.filter(Boolean);
                                const liveUrl = proj.live_url || proj.demo_url || proj.link || "";
                                const githubUrl = proj.github_url || proj.repo_url || "";
                                const fallbackImg = defaultProjectImages[idx % defaultProjectImages.length];
                                const imageUrl = proj.image_url || proj.image || fallbackImg;

                                return (
                                    <div
                                        key={idx}
                                        className="reveal-up flex flex-col rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-lg transition-all hover:shadow-xl hover:border-black/30"
                                    >
                                        <div className="h-[260px] w-full overflow-hidden relative bg-gray-100">
                                            <img
                                                src={imageUrl}
                                                alt={title}
                                                onError={(e) => { e.currentTarget.src = fallbackImg; }}
                                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                            />
                                            <span className="absolute top-4 right-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
                                                {techs[0] ? (typeof techs[0] === "string" ? techs[0] : (techs[0]?.name || "Project")) : "Project"}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-3 p-6 flex-1 justify-between">
                                            <div>
                                                <h3 className="text-2xl font-bold">{title}</h3>
                                                <p className="text-gray-600 leading-relaxed mt-2 text-sm">{desc}</p>
                                            </div>

                                            {techs.length > 0 && (
                                                <div className="flex flex-wrap gap-2 my-2">
                                                    {techs.map((t, tIdx) => (
                                                        <span key={tIdx} className="bg-gray-100 text-xs font-semibold px-3 py-1 rounded-md text-black">
                                                            {typeof t === "string" ? t : (t?.name || String(t))}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="flex items-center gap-4 mt-2 pt-4 border-t border-gray-100">
                                                {liveUrl && (
                                                    <a
                                                        href={liveUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105"
                                                    >
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                            <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                                                        </svg>
                                                        Live Demo
                                                    </a>
                                                )}
                                                {githubUrl && (
                                                    <a
                                                        href={githubUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-black hover:bg-gray-100 transition-colors"
                                                    >
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                                        </svg>
                                                        GitHub
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* View All Projects Button */}
                        {github_url && (
                            <div className="reveal-up mt-12 flex justify-center">
                                <a
                                    href={github_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-3 rounded-full border-2 border-black bg-white px-8 py-3 font-bold text-black transition-all hover:bg-black hover:text-white"
                                >
                                    <span>View All Projects on GitHub</span>
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                                    </svg>
                                </a>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* 05. EXPERIENCE */}
            {experiences.length > 0 && (
                <section id="experience" className="relative w-full flex flex-col items-center px-6 sm:px-10 md:px-16 lg:px-24 py-20 bg-gray-50 border-y border-gray-200">
                    <div className="w-full max-w-4xl">
                        <div className="text-center">
                            <span className="reveal-up text-sm font-bold uppercase tracking-widest text-gray-500">05. Career</span>
                            <h2 className="reveal-up text-4xl sm:text-5xl font-bold mt-2">EXPERIENCE</h2>
                            <div className="reveal-up mx-auto my-4 h-1 w-24 bg-black"></div>
                        </div>

                        {/* Timeline Container */}
                        <div className="mt-12 relative border-l-2 border-black ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
                            {experiences.map((exp, idx) => {
                                if (!exp) return null;
                                const role = exp.role || exp.title || "Developer";
                                const company = exp.company || exp.organization || "";
                                const period = exp.period || exp.duration || (exp.start_date ? `${exp.start_date} — ${exp.end_date || 'Present'}` : "");
                                const desc = exp.description || "";
                                const bulletPoints = typeof desc === "string" ? desc.split("\n").filter(Boolean) : (Array.isArray(desc) ? desc.filter(Boolean) : []);

                                return (
                                    <div key={idx} className="reveal-up relative">
                                        <div className="absolute -left-[31px] sm:-left-[47px] top-0 h-6 w-6 rounded-full border-4 border-white bg-black"></div>
                                        {period && (
                                            <span className="inline-block rounded-md bg-black px-3 py-1 text-xs font-bold text-white mb-2">
                                                {period}
                                            </span>
                                        )}
                                        <h3 className="text-2xl font-bold mt-2">{role}</h3>
                                        {company && <p className="text-lg font-semibold text-gray-700">{company}</p>}
                                        {bulletPoints.length > 0 && (
                                            <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-5">
                                                {bulletPoints.map((pt, pIdx) => (
                                                    <li key={pIdx} className="text-sm sm:text-base leading-relaxed">
                                                        {String(pt).replace(/^[•\-\*]\s*/, "")}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* 06. EDUCATION */}
            {education.length > 0 && (
                <section id="education" className="relative w-full flex flex-col items-center px-6 sm:px-10 md:px-16 lg:px-24 py-20">
                    <div className="w-full max-w-7xl">
                        <div className="text-center">
                            <span className="reveal-up text-sm font-bold uppercase tracking-widest text-gray-500">06. Academics</span>
                            <h2 className="reveal-up text-4xl sm:text-5xl font-bold mt-2">EDUCATION</h2>
                            <div className="reveal-up mx-auto my-4 h-1 w-24 bg-black"></div>
                        </div>

                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {education.map((edu, idx) => {
                                if (!edu) return null;
                                const degree = edu.degree || edu.title || "Degree";
                                const school = edu.institution || edu.school || "";
                                const period = edu.period || (edu.start_year ? `${edu.start_year} — ${edu.end_year || 'Present'}` : "");
                                const field = edu.field || "";
                                const desc = edu.description || "";

                                return (
                                    <div key={idx} className="reveal-up flex flex-col p-8 rounded-2xl border-2 border-black bg-white shadow-lg">
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl">🎓</span>
                                            <div>
                                                <h3 className="text-2xl font-bold">{degree}</h3>
                                                {school && <p className="text-gray-600 font-semibold">{school}</p>}
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                                            {period && <span className="text-sm font-bold text-gray-500">{period}</span>}
                                            {field && <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">{field}</span>}
                                        </div>
                                        {desc && <p className="mt-4 text-gray-700 leading-relaxed text-sm">{desc}</p>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* 07. SKILLS & TECHNOLOGIES */}
            {skills.length > 0 && (
                <section id="skills" className="relative w-full flex flex-col items-center px-6 sm:px-10 md:px-16 lg:px-24 py-20 bg-gray-50 border-y border-gray-200">
                    <div className="w-full max-w-7xl">
                        <div className="text-center">
                            <span className="reveal-up text-sm font-bold uppercase tracking-widest text-gray-500">07. Expertise</span>
                            <h2 className="reveal-up text-4xl sm:text-5xl font-bold mt-2">SKILLS & TECHNOLOGIES</h2>
                            <div className="reveal-up mx-auto my-4 h-1 w-24 bg-black"></div>
                        </div>

                        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* FRONTEND */}
                            {categorizedSkills.FRONTEND.length > 0 && (
                                <div className="reveal-up flex flex-col p-6 rounded-2xl bg-white shadow-lg border border-gray-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white font-bold text-xl">
                                            🖥️
                                        </div>
                                        <h3 className="text-xl font-bold">FRONTEND</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {categorizedSkills.FRONTEND.map((sk, sIdx) => (
                                            <span key={sIdx} className="bg-gray-100 text-sm font-semibold px-3 py-1.5 rounded-lg text-black">
                                                {sk}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* BACKEND */}
                            {categorizedSkills.BACKEND.length > 0 && (
                                <div className="reveal-up flex flex-col p-6 rounded-2xl bg-white shadow-lg border border-gray-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white font-bold text-xl">
                                            ⚙️
                                        </div>
                                        <h3 className="text-xl font-bold">BACKEND</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {categorizedSkills.BACKEND.map((sk, sIdx) => (
                                            <span key={sIdx} className="bg-gray-100 text-sm font-semibold px-3 py-1.5 rounded-lg text-black">
                                                {sk}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* TOOLS */}
                            {categorizedSkills.TOOLS.length > 0 && (
                                <div className="reveal-up flex flex-col p-6 rounded-2xl bg-white shadow-lg border border-gray-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white font-bold text-xl">
                                            🛠️
                                        </div>
                                        <h3 className="text-xl font-bold">TOOLS</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {categorizedSkills.TOOLS.map((sk, sIdx) => (
                                            <span key={sIdx} className="bg-gray-100 text-sm font-semibold px-3 py-1.5 rounded-lg text-black">
                                                {sk}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* OTHER */}
                            {categorizedSkills.OTHER.length > 0 && (
                                <div className="reveal-up flex flex-col p-6 rounded-2xl bg-white shadow-lg border border-gray-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white font-bold text-xl">
                                            🧠
                                        </div>
                                        <h3 className="text-xl font-bold">OTHER</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {categorizedSkills.OTHER.map((sk, sIdx) => (
                                            <span key={sIdx} className="bg-gray-100 text-sm font-semibold px-3 py-1.5 rounded-lg text-black">
                                                {sk}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* 08. ACHIEVEMENTS & CERTIFICATIONS */}
            {achievements.length > 0 && (
                <section id="achievements" className="relative w-full flex flex-col items-center px-6 sm:px-10 md:px-16 lg:px-24 py-20">
                    <div className="w-full max-w-7xl">
                        <div className="text-center">
                            <span className="reveal-up text-sm font-bold uppercase tracking-widest text-gray-500">08. Recognition</span>
                            <h2 className="reveal-up text-4xl sm:text-5xl font-bold mt-2">ACHIEVEMENTS & CERTIFICATIONS</h2>
                            <div className="reveal-up mx-auto my-4 h-1 w-24 bg-black"></div>
                        </div>

                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {achievements.map((ach, idx) => {
                                if (!ach) return null;
                                const title = ach.title || ach.name || "Achievement";
                                const issuer = ach.issuer || ach.organization || "";
                                const date = ach.date || ach.year || "";
                                const desc = ach.description || "";
                                const icons = ["🏆", "📜", "🥇"];
                                const icon = icons[idx % icons.length];

                                return (
                                    <div
                                        key={idx}
                                        className="reveal-up flex flex-col p-8 rounded-2xl bg-white border border-gray-200 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <span className="text-4xl">{icon}</span>
                                        <h3 className="text-2xl font-bold mt-4">{title}</h3>
                                        {(issuer || date) && (
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">
                                                {issuer} {issuer && date ? "•" : ""} {date}
                                            </p>
                                        )}
                                        {desc && <p className="text-gray-600 mt-2 text-sm leading-relaxed">{desc}</p>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* 09. CURRENTLY / NOW */}
            <section id="currently" className="relative w-full flex flex-col items-center px-6 sm:px-10 md:px-16 lg:px-24 py-20 bg-gray-50 border-t border-gray-200">
                <div className="w-full max-w-7xl">
                    <div className="text-center">
                        <span className="reveal-up text-sm font-bold uppercase tracking-widest text-gray-500">09. Active Status</span>
                        <h2 className="reveal-up text-4xl sm:text-5xl font-bold mt-2">CURRENTLY / NOW</h2>
                        <div className="reveal-up mx-auto my-4 h-1 w-24 bg-black"></div>
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="reveal-up flex items-start gap-4 p-6 rounded-2xl bg-white shadow-md border-l-4 border-blue-500">
                            <span className="text-3xl">🔵</span>
                            <div>
                                <h3 className="font-bold text-xl">Currently Building</h3>
                                <p className="text-gray-600 mt-1 text-sm">Scalable web platforms and high-impact digital experiences.</p>
                            </div>
                        </div>

                        <div className="reveal-up flex items-start gap-4 p-6 rounded-2xl bg-white shadow-md border-l-4 border-purple-500">
                            <span className="text-3xl">📚</span>
                            <div>
                                <h3 className="font-bold text-xl">Currently Learning</h3>
                                <p className="text-gray-600 mt-1 text-sm">Advanced system architectures and performance optimization techniques.</p>
                            </div>
                        </div>

                        <div className="reveal-up flex items-start gap-4 p-6 rounded-2xl bg-white shadow-md border-l-4 border-green-500">
                            <span className="text-3xl">🎯</span>
                            <div>
                                <h3 className="font-bold text-xl">Currently Open To</h3>
                                <p className="text-gray-600 mt-1 text-sm">Full-time software engineering opportunities and high-impact projects.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10. CONTACT / CTA */}
            <section id="contact" className="relative w-full flex flex-col items-center px-6 sm:px-10 md:px-16 lg:px-24 py-24 bg-black text-white">
                <div className="w-full max-w-7xl">
                    <div className="text-center">
                        <span className="reveal-up text-sm font-bold uppercase tracking-widest text-gray-400">10. Contact</span>
                        <h2 className="reveal-up text-5xl sm:text-6xl font-bold mt-2">LET'S WORK TOGETHER</h2>
                        <p className="reveal-up text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
                            Have an interesting project, engineering role, or idea? Reach out and let's turn it into reality.
                        </p>
                        <div className="reveal-up mx-auto my-6 h-1 w-24 bg-white"></div>
                    </div>

                    <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* Direct Contact Info */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            {email && (
                                <div className="reveal-up flex items-center gap-4 p-5 rounded-2xl bg-gray-900 border border-gray-800">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black font-bold text-xl">
                                        ✉️
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-gray-400">Email Me</p>
                                        <a href={`mailto:${email}`} className="text-lg font-bold hover:underline">{email}</a>
                                    </div>
                                </div>
                            )}

                            {linkedin_url && (
                                <div className="reveal-up flex items-center gap-4 p-5 rounded-2xl bg-gray-900 border border-gray-800">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black font-bold text-xl">
                                        💼
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-gray-400">LinkedIn</p>
                                        <a href={linkedin_url} target="_blank" rel="noreferrer" className="text-lg font-bold hover:underline">LinkedIn Profile</a>
                                    </div>
                                </div>
                            )}

                            {github_url && (
                                <div className="reveal-up flex items-center gap-4 p-5 rounded-2xl bg-gray-900 border border-gray-800">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black font-bold text-xl">
                                        💻
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-gray-400">GitHub</p>
                                        <a href={github_url} target="_blank" rel="noreferrer" className="text-lg font-bold hover:underline">GitHub Repositories</a>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Interactive Contact Form */}
                        <div className="lg:col-span-7 reveal-up bg-gray-900 p-8 rounded-2xl border border-gray-800">
                            {formSubmitted ? (
                                <div className="text-center py-12 space-y-4">
                                    <div className="text-5xl">✅</div>
                                    <h3 className="text-2xl font-bold text-white">Thank You!</h3>
                                    <p className="text-gray-400">Your message has been sent successfully.</p>
                                    <button
                                        onClick={() => setFormSubmitted(false)}
                                        className="px-6 py-2 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-200"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        setFormSubmitted(true);
                                    }}
                                    className="flex flex-col gap-6"
                                >
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Your Name</label>
                                        <input type="text" required placeholder="Alex Morgan" className="w-full rounded-xl bg-black border border-gray-700 p-3.5 text-white focus:border-white focus:outline-none" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Your Email</label>
                                        <input type="email" required placeholder="alex@example.com" className="w-full rounded-xl bg-black border border-gray-700 p-3.5 text-white focus:border-white focus:outline-none" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">Your Message</label>
                                        <textarea rows={4} required placeholder={`Hello ${full_name}, I'd like to discuss a project...`} className="w-full rounded-xl bg-black border border-gray-700 p-3.5 text-white focus:border-white focus:outline-none"></textarea>
                                    </div>

                                    <button type="submit" className="flex h-[50px] items-center justify-center gap-3 rounded-xl bg-white font-bold text-black transition-all hover:bg-gray-200">
                                        <span>Get In Touch</span>
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                        </svg>
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="flex w-full flex-col sm:flex-row items-center justify-between gap-4 bg-black border-t border-gray-800 px-[8%] py-8 text-sm text-gray-400">
                <p>© {new Date().getFullYear()} {full_name}. All rights reserved.</p>
                <p className="flex items-center gap-1">
                    Built with HTML & Tailwind CSS
                </p>
            </footer>
        </div>
    );
}
