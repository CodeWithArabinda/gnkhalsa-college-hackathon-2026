import React, { useState } from "react";

// Logo SVG component strictly matching original portfolio5 Logo
function Portfolio5Logo({ className = "", width = 42, height = 42, letter = "D" }) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 909 909"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M606.798 163C365.063 327.215 153.824 466.5 174.386 541C205.299 653 698 283 750.386 385C791.988 466 243.5 769.5 243.5 769.5"
                stroke="#00c7ff"
                strokeWidth="50"
            />
            <circle cx="667.298" cy="122" r="25" fill="#00c7ff" />
            <circle cx="605.298" cy="164" r="25" fill="#00c7ff" />
            <circle cx="243" cy="769.78" r="25" fill="#00c7ff" />
            <circle cx="181" cy="812" r="25" fill="#00c7ff" />
            <circle cx="463" cy="441" r="250" fill="white" />
            <path
                d="M175 541.991C205.913 653.991 698.613 283.991 751 385.991"
                stroke="#00c7ff"
                strokeWidth="50"
            />
            <text
                x="463"
                y="560"
                fontSize="340"
                fontFamily="sans-serif"
                fontWeight="900"
                textAnchor="middle"
                fill="black"
            >
                {letter.toUpperCase()}
            </text>
        </svg>
    );
}

export default function Portfolio5Template({ portfolio }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Normalize canonical StackFolio data safely
    const profile = portfolio?.profile || portfolio || {};
    const full_name = profile.full_name || portfolio?.full_name || portfolio?.name || "Developer";
    const headline = profile.headline || portfolio?.headline || portfolio?.role || "Building and designing for the web.";
    const bio = profile.bio || portfolio?.bio || portfolio?.about || "";
    const email = profile.email || portfolio?.email || "";
    const location = profile.location || portfolio?.location || "";
    const github_url = profile.github_url || portfolio?.github_url || portfolio?.social?.github || "";
    const linkedin_url = profile.linkedin_url || portfolio?.linkedin_url || portfolio?.social?.linkedin || "";
    const avatar_url = profile.profile_image_url || profile.avatar_url || portfolio?.profile_image_url || portfolio?.avatar_url || "";
    const resume_url = profile.resume_url || portfolio?.resume_url || "";

    const experiences = Array.isArray(portfolio?.experiences) ? portfolio.experiences : [];
    const education = Array.isArray(portfolio?.education) ? portfolio.education : [];
    const projects = Array.isArray(portfolio?.projects) ? portfolio.projects : [];
    const skills = Array.isArray(portfolio?.skills) ? portfolio.skills : [];
    const achievements = Array.isArray(portfolio?.achievements) ? portfolio.achievements : [];
    const testimonials = Array.isArray(portfolio?.testimonials) ? portfolio.testimonials : [];

    const initialLetter = full_name.charAt(0).toUpperCase() || "D";

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="stackfolio-template-portfolio5 min-h-screen bg-[#030816] text-slate-100 font-sans relative selection:bg-[#00c7ff] selection:text-black overflow-x-hidden">
            {/* Scope Styles & Animations strictly to Portfolio5Template */}
            <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap");

        .stackfolio-template-portfolio5 {
          color-scheme: dark;
          background-color: #030816;
          font-family: "Be Vietnam Pro", system-ui, -apple-system, sans-serif;
        }

        .stackfolio-template-portfolio5 ::-webkit-scrollbar {
          width: 8px;
          background: transparent;
        }
        .stackfolio-template-portfolio5 ::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(5px);
          border-radius: 10px;
        }

        .stackfolio-template-portfolio5 .landingSectionTitle {
          position: relative;
          display: inline-block;
        }

        .stackfolio-template-portfolio5 .landingSectionTitle::after {
          content: "";
          display: block;
          height: 4px;
          width: 60px;
          margin-top: 8px;
          border-radius: 9999px;
          background: linear-gradient(to right, #00c7ff, #38bdf8);
        }

        @media (min-width: 768px) {
          .stackfolio-template-portfolio5 .landingSectionTitle::after {
            width: 80px;
          }
        }

        @keyframes scaleDownIn {
          from {
            opacity: 0;
            transform: scale(1.15) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0px);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .stackfolio-template-portfolio5 .heroElem {
          animation: scaleDownIn 0.8s cubic-bezier(0.87, 0, 0.13, 1);
        }

        .stackfolio-template-portfolio5 .sqD {
          position: absolute;
          z-index: 0;
        }

        .stackfolio-template-portfolio5 .sqD:not(.squiggle-hero-pop1) {
          animation: float 3s infinite ease-in-out;
        }

        .stackfolio-template-portfolio5 .card-pop {
          background-color: rgba(7, 17, 38, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stackfolio-template-portfolio5 .card-pop:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 199, 255, 0.4);
          box-shadow: 0 16px 36px -10px rgba(0, 199, 255, 0.2);
        }

        .stackfolio-template-portfolio5 .btn-fun {
          border: 2px solid #00c7ff;
          color: #00c7ff;
          background: transparent;
          transition: all 0.25s ease;
        }

        .stackfolio-template-portfolio5 .btn-fun:hover {
          background-color: #00c7ff;
          color: #000000;
          box-shadow: 0 0 24px rgba(0, 199, 255, 0.45);
        }

        @media (prefers-reduced-motion: reduce) {
          .stackfolio-template-portfolio5 *,
          .stackfolio-template-portfolio5 ::before,
          .stackfolio-template-portfolio5 ::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
          .stackfolio-template-portfolio5 .heroElem,
          .stackfolio-template-portfolio5 .sqD {
            animation: none !important;
          }
        }
      `}</style>

            {/* Decorative Background Ambient Glows */}
            <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Navbar Header */}
            <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#030816]/85 border-b border-white/10 py-3.5 px-4 sm:px-8 transition-all">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <a
                        href="#hero"
                        className="group flex items-center gap-3 text-white focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1 transition-all"
                    >
                        <Portfolio5Logo
                            className="transform group-hover:rotate-12 transition-transform duration-300"
                            width={38}
                            height={38}
                            letter={initialLetter}
                        />
                        <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                            {full_name}
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium">
                        <a href="#about" className="text-slate-300 hover:text-cyan-400 transition-colors px-2 py-1">About</a>
                        {experiences.length > 0 && <a href="#experience" className="text-slate-300 hover:text-cyan-400 transition-colors px-2 py-1">Experience</a>}
                        {projects.length > 0 && <a href="#projects" className="text-slate-300 hover:text-cyan-400 transition-colors px-2 py-1">Projects</a>}
                        {skills.length > 0 && <a href="#skills" className="text-slate-300 hover:text-cyan-400 transition-colors px-2 py-1">Skills</a>}
                        {(education.length > 0 || achievements.length > 0) && <a href="#background" className="text-slate-300 hover:text-cyan-400 transition-colors px-2 py-1">Background</a>}
                        {testimonials.length > 0 && <a href="#testimonials" className="text-slate-300 hover:text-cyan-400 transition-colors px-2 py-1">Feedback</a>}
                        <a
                            href="#contact"
                            className="ml-2 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-cyan-500/25 transition-all transform hover:scale-105"
                        >
                            Let's Talk
                        </a>
                    </nav>

                    {/* Mobile Hamburger Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                        aria-label="Toggle Menu"
                    >
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                            ) : (
                                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation Dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-[#030816] border-b border-white/10 p-6 space-y-4 shadow-2xl text-center font-semibold text-sm">
                        <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-200 hover:text-cyan-400">About</a>
                        {experiences.length > 0 && <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-200 hover:text-cyan-400">Experience</a>}
                        {projects.length > 0 && <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-200 hover:text-cyan-400">Projects</a>}
                        {skills.length > 0 && <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-200 hover:text-cyan-400">Skills</a>}
                        {(education.length > 0 || achievements.length > 0) && <a href="#background" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-200 hover:text-cyan-400">Background</a>}
                        {testimonials.length > 0 && <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-200 hover:text-cyan-400">Feedback</a>}
                        <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="inline-block px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs mt-2">
                            Let's Talk
                        </a>
                    </div>
                )}
            </header>

            {/* Main Container */}
            <main className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 pt-16 sm:pt-24 pb-20 space-y-28 sm:space-y-36">

                {/* Hero Section with Floating Doodles & Animations */}
                <section id="hero" className="relative heroElem w-full pt-8 sm:pt-16 pb-16 sm:pb-24 flex justify-center text-center flex-col items-center z-10">
                    {/* Availability Status Badge */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-6 shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span>Available for full-time & high-impact projects</span>
                    </div>

                    <p className="text-lg sm:text-xl text-slate-300 font-medium mb-3">
                        Hey there 👋 I'm <span className="text-white font-extrabold">{full_name}</span>.
                    </p>

                    {/* Main Hero Title */}
                    <h1 className="heroTitle relative inline-block max-w-3xl lg:max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight mb-6 select-none">
                        I enjoy <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">building</span> and{" "}
                        <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">designing</span> for the web.

                        {/* SVG Doodles Positioned Exactly like original portfolio5 */}
                        <img
                            className="sqD squiggle-hero-html w-10 sm:w-16 absolute -top-10 right-2 sm:top-[-75px] sm:right-[120px] pointer-events-none select-none"
                            style={{ animationDelay: "0.1s" }}
                            src="/static/doodles/hero/html.svg"
                            alt=""
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <img
                            className="sqD squiggle-hero-pop1 hidden sm:block absolute sm:top-[-100px] sm:left-[8%] lg:left-[90px] pointer-events-none select-none"
                            src="/static/doodles/hero/pop1.svg"
                            alt=""
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <img
                            className="sqD hidden sm:block absolute left-[60px] lg:left-[120px] -bottom-20 pointer-events-none select-none"
                            style={{ animationDelay: "0.5s" }}
                            src="/static/doodles/hero/js.svg"
                            alt=""
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <img
                            className="sqD absolute -bottom-32 right-[18%] sm:right-[32%] pointer-events-none select-none w-10 sm:w-14"
                            style={{ animationDelay: "0.6s" }}
                            src="/static/doodles/hero/dino.svg"
                            alt=""
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <img
                            className="sqD absolute right-[-15px] sm:right-2 -bottom-20 pointer-events-none select-none w-10 sm:w-14"
                            style={{ animationDelay: "0.7s" }}
                            src="/static/doodles/hero/paintbrush.svg"
                            alt=""
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <img
                            className="sqD absolute left-1 -bottom-14 sm:left-4 opacity-50 pointer-events-none select-none w-10 sm:w-12"
                            style={{ animationDelay: "0.9s" }}
                            src="/static/doodles/hero/code.svg"
                            alt=""
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </h1>

                    {/* Subtitle / Headline & Bio */}
                    <p className="text-slate-400 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-10 font-medium">
                        {headline} {bio && `— ${bio}`}
                    </p>

                    {/* Dual Action Buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {projects.length > 0 && (
                            <a
                                href="#projects"
                                className="cursor-pointer font-bold whitespace-nowrap px-8 py-3.5 text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-full text-sm sm:text-base shadow-lg shadow-cyan-500/25 transition-all transform hover:scale-105"
                            >
                                Explore Work ↓
                            </a>
                        )}
                        <a
                            href="#contact"
                            className="cursor-pointer font-bold whitespace-nowrap px-8 py-3.5 text-slate-200 border border-white/20 hover:border-cyan-400/50 bg-white/5 hover:bg-white/10 hover:text-white rounded-full text-sm sm:text-base transition-all"
                        >
                            Get in Touch
                        </a>
                    </div>

                    {/* Social Links Bar */}
                    <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-slate-400 text-xs sm:text-sm font-semibold">
                        {github_url && (
                            <a href={github_url} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                                <span>GitHub</span> ↗
                            </a>
                        )}
                        {linkedin_url && (
                            <a href={linkedin_url} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                                <span>LinkedIn</span> ↗
                            </a>
                        )}
                        {email && (
                            <a href={`mailto:${email}`} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                                <span>{email}</span>
                            </a>
                        )}
                        {resume_url && (
                            <a href={resume_url} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                                <span>Resume</span> 📄
                            </a>
                        )}
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="space-y-8 pt-6">
                    <div className="text-left space-y-2">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 block">
              // 01. ABOUT ME
                        </span>
                        <h2 className="landingSectionTitle text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                            Who I Am.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className={`${avatar_url ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed`}>
                            <p className="text-base sm:text-lg font-medium text-slate-200">
                                {bio || `${full_name} is a dedicated engineer building modern, high-performance web applications and digital experiences.`}
                            </p>

                            {location && (
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
                                    <span>📍 Based in {location}</span>
                                </div>
                            )}

                            {/* Metric Counters */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                                <div className="card-pop p-5 rounded-2xl text-center">
                                    <span className="text-3xl font-extrabold text-cyan-400">{experiences.length}</span>
                                    <span className="block text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">Positions</span>
                                </div>
                                <div className="card-pop p-5 rounded-2xl text-center">
                                    <span className="text-3xl font-extrabold text-cyan-400">{projects.length}</span>
                                    <span className="block text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">Projects</span>
                                </div>
                                <div className="card-pop p-5 rounded-2xl text-center">
                                    <span className="text-3xl font-extrabold text-cyan-400">{skills.length}</span>
                                    <span className="block text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">Skills</span>
                                </div>
                            </div>
                        </div>

                        {avatar_url && (
                            <div className="lg:col-span-4 flex justify-center">
                                <div className="relative w-56 h-56 rounded-3xl overflow-hidden border-2 border-cyan-400/40 shadow-2xl shadow-cyan-500/20 group">
                                    <img src={avatar_url} alt={full_name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Experience Timeline Section (Hidden if empty) */}
                {experiences.length > 0 && (
                    <section id="experience" className="space-y-8 pt-6">
                        <div className="text-left space-y-2">
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 block">
                // 02. CAREER
                            </span>
                            <h2 className="landingSectionTitle text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                                Work Experience.
                            </h2>
                        </div>

                        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8 max-w-4xl">
                            {experiences.map((exp, idx) => {
                                const role = exp.role || exp.title || "Developer";
                                const company = exp.company || exp.organization || "";
                                const period = exp.period || exp.duration || (exp.start_date ? `${exp.start_date} - ${exp.end_date || 'Present'}` : "");
                                const points = Array.isArray(exp.description)
                                    ? exp.description
                                    : typeof exp.description === "string"
                                        ? exp.description.split("\n").filter(Boolean)
                                        : [];

                                return (
                                    <div key={idx} className="relative group">
                                        {/* Timeline Node */}
                                        <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#030816] border-2 border-cyan-400 group-hover:bg-cyan-400 transition-colors shadow-md shadow-cyan-500/30"></div>

                                        <div className="card-pop p-6 sm:p-8 rounded-3xl space-y-4">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{role}</h3>
                                                    {company && <p className="text-cyan-400 font-semibold text-sm mt-0.5">{company}</p>}
                                                </div>
                                                {period && (
                                                    <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 w-fit">
                                                        {period}
                                                    </span>
                                                )}
                                            </div>

                                            {points.length > 0 && (
                                                <ul className="space-y-2 text-slate-300 text-xs sm:text-sm list-disc pl-5 leading-relaxed">
                                                    {points.map((pt, pIdx) => (
                                                        <li key={pIdx}>{pt}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* Featured Projects Section (Hidden if empty) */}
                {projects.length > 0 && (
                    <section id="projects" className="space-y-8 pt-6">
                        <div className="text-left space-y-2">
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 block">
                // 03. PORTFOLIO
                            </span>
                            <h2 className="landingSectionTitle text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                                Featured Projects & Work.
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                            {projects.map((proj, idx) => {
                                const title = proj.title || proj.name || "Project";
                                const desc = proj.description || proj.summary || "";
                                const techs = Array.isArray(proj.technologies) ? proj.technologies : (Array.isArray(proj.tech) ? proj.tech : []);
                                const liveUrl = proj.live_url || proj.demo_url || proj.link || "";
                                const githubUrl = proj.github_url || proj.repo_url || proj.github || "";
                                const imageUrl = proj.image_url || proj.image || proj.img || "";

                                return (
                                    <div
                                        key={idx}
                                        className="card-pop p-5 rounded-3xl flex flex-col justify-between space-y-4 group"
                                    >
                                        <div className="space-y-4">
                                            {/* Project Image Banner */}
                                            <div
                                                onClick={() => setSelectedProject(proj)}
                                                className="cursor-pointer block aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-white/10 relative"
                                            >
                                                {imageUrl ? (
                                                    <img
                                                        src={imageUrl}
                                                        alt={title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = 'none';
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-950/40 to-slate-900 text-cyan-400 font-mono text-xs font-bold p-4 text-center">
                                                        📁 {title}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Title & Desc */}
                                            <div className="space-y-2 text-left">
                                                <div className="flex items-center justify-between gap-2">
                                                    <h3
                                                        onClick={() => setSelectedProject(proj)}
                                                        className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer flex-1"
                                                    >
                                                        {title}
                                                    </h3>

                                                    <div className="flex items-center gap-1.5 shrink-0">
                                                        {liveUrl && (
                                                            <a
                                                                href={liveUrl}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                title="View Live Site"
                                                                className="p-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 transition-all border border-white/10 text-xs font-mono"
                                                            >
                                                                ↗
                                                            </a>
                                                        )}
                                                        {githubUrl && (
                                                            <a
                                                                href={githubUrl}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                title="View Source Code"
                                                                className="p-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 transition-all border border-white/10 text-xs font-mono"
                                                            >
                                                                💻
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>

                                                {desc && (
                                                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                                                        {desc}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-3 pt-2">
                                            {techs.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5">
                                                    {techs.slice(0, 5).map((t, tIdx) => (
                                                        <span key={tIdx} className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                                                            {typeof t === "string" ? t : t.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <button
                                                onClick={() => setSelectedProject(proj)}
                                                className="w-full text-left text-xs font-bold text-slate-400 hover:text-cyan-400 pt-2 border-t border-white/10 flex items-center justify-between transition-colors"
                                            >
                                                <span>View Details</span>
                                                <span>→</span>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* Skills Section (Hidden if empty) */}
                {skills.length > 0 && (
                    <section id="skills" className="space-y-8 pt-6">
                        <div className="text-left space-y-2">
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 block">
                // 04. TOOLKIT
                            </span>
                            <h2 className="landingSectionTitle text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                                Skills & Technologies.
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {skills.map((skill, idx) => {
                                const sName = typeof skill === "string" ? skill : (skill.name || skill.title || skill.label || "");
                                const sIcon = typeof skill === "object" ? skill.icon : null;

                                return (
                                    <div
                                        key={idx}
                                        className="card-pop p-4 rounded-2xl flex flex-col items-center justify-center text-center group"
                                    >
                                        {sIcon ? (
                                            <img src={sIcon} alt={sName} className="h-8 w-8 object-contain mb-2 group-hover:scale-110 transition-transform duration-300" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                                        ) : (
                                            <span className="text-xl mb-1 group-hover:scale-110 transition-transform duration-300">⚡</span>
                                        )}
                                        <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                                            {sName}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* Background / Education & Achievements (Hidden if empty) */}
                {(education.length > 0 || achievements.length > 0) && (
                    <section id="background" className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                        {education.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-xl sm:text-2xl font-extrabold text-white border-b border-white/10 pb-3">Education</h3>
                                <div className="space-y-4">
                                    {education.map((edu, idx) => (
                                        <div key={idx} className="card-pop p-6 rounded-3xl space-y-2">
                                            <h4 className="font-bold text-white text-base">{edu.degree || edu.title}</h4>
                                            <p className="text-xs font-bold text-cyan-400">{edu.institution || edu.school}</p>
                                            <span className="text-[11px] font-mono text-slate-400 block">{edu.period || edu.year}</span>
                                            {edu.description && <p className="text-xs text-slate-300 leading-relaxed mt-2">{edu.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {achievements.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-xl sm:text-2xl font-extrabold text-white border-b border-white/10 pb-3">Achievements</h3>
                                <div className="space-y-4">
                                    {achievements.map((ach, idx) => (
                                        <div key={idx} className="card-pop p-6 rounded-3xl space-y-2">
                                            <h4 className="font-bold text-white text-base">🏆 {ach.title || ach.name}</h4>
                                            {ach.issuer && <p className="text-xs font-bold text-cyan-400">{ach.issuer}</p>}
                                            {ach.date && <span className="text-[11px] font-mono text-slate-400 block">{ach.date}</span>}
                                            {ach.description && <p className="text-xs text-slate-300 leading-relaxed mt-2">{ach.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {/* Testimonials Section (Hidden if empty) */}
                {testimonials.length > 0 && (
                    <section id="testimonials" className="space-y-8 pt-6">
                        <div className="text-left space-y-2">
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 block">
                // 05. TESTIMONIALS
                            </span>
                            <h2 className="landingSectionTitle text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                                Client Feedback.
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                            {testimonials.map((item, index) => {
                                const quoteText = item.quote || item.testimonial || "";
                                const authorName = item.name || "Colleague";
                                const authorRole = item.job || item.company || "";

                                return (
                                    <div key={index} className="card-pop p-6 rounded-3xl flex flex-col justify-between">
                                        <div>
                                            <span className="text-4xl text-cyan-400/40 font-serif leading-none block mb-2 select-none">“</span>
                                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                                                "{quoteText}"
                                            </p>
                                        </div>

                                        <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-slate-950 text-xs shadow-md">
                                                {authorName.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-white">{authorName}</h4>
                                                {authorRole && <p className="text-[11px] text-slate-400">{authorRole}</p>}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* Contact CTA Section */}
                <section id="contact" className="pt-6">
                    <div className="relative rounded-3xl bg-gradient-to-br from-[#071126] via-[#091838] to-[#040c1e] border border-cyan-500/30 p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
                        {/* Ambient Background Glows */}
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                            <span className="px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider inline-block">
                                Let's Connect
                            </span>

                            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                                Interested in Working Together?
                            </h2>

                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                                Whether you have a product idea, project inquiry, or just want to chat engineering — I'd love to hear from you.
                            </p>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setFormSubmitted(true);
                                }}
                                className="space-y-4 text-left max-w-md mx-auto pt-2"
                            >
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 mb-1">Name</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full bg-[#030816] border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 mb-1">Email</label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="your.email@domain.com"
                                        className="w-full bg-[#030816] border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 mb-1">Message</label>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="Your message..."
                                        className="w-full bg-[#030816] border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full btn-fun py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-cyan-500/20"
                                >
                                    {formSubmitted ? "Message Sent! ✓" : "Send Message"}
                                </button>
                            </form>

                            {email && (
                                <div className="pt-4">
                                    <a
                                        href={`mailto:${email}`}
                                        className="inline-flex items-center gap-2 font-bold px-6 py-2.5 rounded-full text-slate-300 hover:text-cyan-300 bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm transition-all"
                                    >
                                        📧 {email}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            {/* Project Detail Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <div className="card-pop max-w-xl w-full rounded-3xl p-6 sm:p-8 space-y-5 relative border border-white/20 shadow-2xl">
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm font-bold"
                            aria-label="Close modal"
                        >
                            ✕
                        </button>

                        <h3 className="text-2xl font-extrabold text-white border-b border-white/10 pb-3">
                            {selectedProject.title || selectedProject.name || "Project Details"}
                        </h3>

                        {(selectedProject.image_url || selectedProject.image || selectedProject.img) && (
                            <div className="h-48 w-full rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
                                <img
                                    src={selectedProject.image_url || selectedProject.image || selectedProject.img}
                                    alt={selectedProject.title || "Project"}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <p className="text-slate-300 text-sm leading-relaxed">
                            {selectedProject.description || selectedProject.summary || "No description provided."}
                        </p>

                        {Array.isArray(selectedProject.technologies || selectedProject.tech) && (
                            <div className="flex flex-wrap gap-1.5 pt-2">
                                {(selectedProject.technologies || selectedProject.tech).map((t, tIdx) => (
                                    <span key={tIdx} className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                                        {typeof t === "string" ? t : t.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
                            {(selectedProject.live_url || selectedProject.demo_url || selectedProject.link) && (
                                <a
                                    href={selectedProject.live_url || selectedProject.demo_url || selectedProject.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md"
                                >
                                    Live Demo ↗
                                </a>
                            )}
                            {(selectedProject.github_url || selectedProject.repo_url || selectedProject.github) && (
                                <a
                                    href={selectedProject.github_url || selectedProject.repo_url || selectedProject.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-5 py-2.5 rounded-xl bg-white/10 text-slate-200 font-bold text-xs hover:bg-white/20 hover:text-white border border-white/10 transition-all"
                                >
                                    GitHub Source ↗
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="w-full border-t border-white/10 bg-[#030816] py-12 px-6 relative z-10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
                    <div className="text-center md:text-left space-y-1">
                        <p className="text-sm font-extrabold text-white tracking-tight">{full_name}</p>
                        <p className="text-xs text-slate-400">Crafting digital products with precision, performance, and purpose.</p>
                    </div>

                    <div className="flex items-center gap-6">
                        {github_url && <a href={github_url} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">GitHub ↗</a>}
                        {linkedin_url && <a href={linkedin_url} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">LinkedIn ↗</a>}
                        {email && <a href={`mailto:${email}`} className="hover:text-cyan-400 transition-colors">Email</a>}
                    </div>

                    <div>
                        <button
                            onClick={scrollToTop}
                            className="p-2.5 rounded-full bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 transition-all text-xs font-semibold flex items-center gap-1.5"
                            title="Scroll to top"
                        >
                            <span>Back to top</span> ↑
                        </button>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 text-center text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p>© {new Date().getFullYear()} {full_name}. All rights reserved.</p>
                    <div className="flex items-center gap-2">
                        <span>Built with</span>
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-300 font-mono">StackFolio</span>
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-300 font-mono">React</span>
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-300 font-mono">Tailwind CSS</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
