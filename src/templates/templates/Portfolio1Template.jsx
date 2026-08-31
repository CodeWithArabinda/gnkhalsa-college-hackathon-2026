import React, { useState } from "react";

export default function Portfolio1Template({ portfolio }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [contactSubmitted, setContactSubmitted] = useState(false);

    // Normalize portfolio data contract safely
    const profile = portfolio?.profile || {};
    const full_name = profile.full_name || "Developer";
    const headline = profile.headline || "Full-Stack Software Engineer";
    const bio = profile.bio || "";
    const email = profile.email || "";
    const location = profile.location || "";
    const github_url = profile.github_url || "";
    const linkedin_url = profile.linkedin_url || "";
    const avatar_url = profile.avatar_url || "";

    const experiences = Array.isArray(portfolio?.experiences) ? portfolio.experiences : [];
    const education = Array.isArray(portfolio?.education) ? portfolio.education : [];
    const projects = Array.isArray(portfolio?.projects) ? portfolio.projects : [];
    const skills = Array.isArray(portfolio?.skills) ? portfolio.skills : [];
    const achievements = Array.isArray(portfolio?.achievements) ? portfolio.achievements : [];

    return (
        <div className="stackfolio-template-portfolio1 min-h-screen bg-[#030712] text-slate-100 font-sans relative selection:bg-emerald-500 selection:text-black">
            <style>{`
        .stackfolio-template-portfolio1 {
          color-scheme: dark;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        .stackfolio-template-portfolio1 .glass-card {
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .stackfolio-template-portfolio1 .glass-card:hover {
          border-color: rgba(16, 185, 129, 0.4);
        }
        .stackfolio-template-portfolio1 .emerald-glow {
          box-shadow: 0 0 25px -5px rgba(16, 185, 129, 0.3);
        }
      `}</style>

            {/* Navigation Header */}
            <header className="fixed top-0 left-0 z-40 w-full bg-[#030712]/80 backdrop-blur-md border-b border-white/10 px-6 sm:px-12 py-4 flex items-center justify-between">
                <a href="#hero" className="flex items-center gap-2 text-xl font-bold tracking-tight text-white">
                    <span className="w-8 h-8 rounded-lg bg-emerald-500 text-black flex items-center justify-center font-extrabold shadow-lg shadow-emerald-500/30">
                        {full_name.charAt(0)}
                    </span>
                    <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        {full_name}
                    </span>
                </a>

                {/* Desktop Nav Links */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                    <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
                    {experiences.length > 0 && <a href="#experience" className="hover:text-emerald-400 transition-colors">Experience</a>}
                    {projects.length > 0 && <a href="#projects" className="hover:text-emerald-400 transition-colors">Projects</a>}
                    {skills.length > 0 && <a href="#skills" className="hover:text-emerald-400 transition-colors">Skills</a>}
                    {(education.length > 0 || achievements.length > 0) && <a href="#background" className="hover:text-emerald-400 transition-colors">Background</a>}
                    <a href="#contact" className="px-4 py-2 rounded-full bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-all text-xs">
                        Contact
                    </a>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden text-slate-300 hover:text-white p-2"
                    aria-label="Toggle navigation"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>

                {/* Mobile Dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-[#030712] border-b border-white/10 p-6 space-y-4 shadow-2xl text-center font-medium">
                        <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block hover:text-emerald-400">About</a>
                        {experiences.length > 0 && <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="block hover:text-emerald-400">Experience</a>}
                        {projects.length > 0 && <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="block hover:text-emerald-400">Projects</a>}
                        {skills.length > 0 && <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="block hover:text-emerald-400">Skills</a>}
                        {(education.length > 0 || achievements.length > 0) && <a href="#background" onClick={() => setMobileMenuOpen(false)} className="block hover:text-emerald-400">Background</a>}
                        <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="inline-block px-6 py-2 rounded-full bg-emerald-500 text-black font-semibold hover:bg-emerald-400">
                            Contact
                        </a>
                    </div>
                )}
            </header>

            {/* Main Container */}
            <main className="max-w-7xl mx-auto px-6 sm:px-12 pt-28 pb-20 space-y-32">

                {/* Hero Section */}
                <section id="hero" className="min-h-[75vh] flex flex-col justify-center items-start relative">
                    <div className="absolute -top-10 -left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="space-y-6 max-w-3xl z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>Available for new projects & roles</span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none text-white">
                            Hi, I'm <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">{full_name}</span>
                        </h1>

                        <p className="text-xl sm:text-2xl font-semibold text-slate-300">
                            {headline}
                        </p>

                        {bio && (
                            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
                                {bio}
                            </p>
                        )}

                        <div className="flex flex-wrap items-center gap-4 pt-4">
                            {projects.length > 0 && (
                                <a href="#projects" className="px-6 py-3 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 text-sm">
                                    View Projects
                                </a>
                            )}
                            <a href="#contact" className="px-6 py-3 rounded-xl bg-slate-900 text-slate-200 font-semibold border border-white/10 hover:border-white/20 transition-all text-sm">
                                Get In Touch
                            </a>
                        </div>

                        <div className="flex items-center gap-4 pt-4 text-slate-400 text-sm">
                            {github_url && (
                                <a href={github_url} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                                    GitHub ↗
                                </a>
                            )}
                            {linkedin_url && (
                                <a href={linkedin_url} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                                    LinkedIn ↗
                                </a>
                            )}
                            {email && (
                                <a href={`mailto:${email}`} className="hover:text-emerald-400 transition-colors">
                                    {email}
                                </a>
                            )}
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="space-y-8">
                    <div className="space-y-2">
                        <span className="text-emerald-400 font-mono text-xs tracking-wider uppercase">// 01. ABOUT ME</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white">Background & Overview</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className={`${avatar_url ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg`}>
                            <p>{bio || `${full_name} is a dedicated developer building high quality web applications.`}</p>
                            {location && <p className="text-sm font-medium text-emerald-400">📍 Based in {location}</p>}

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                                <div className="glass-card p-4 rounded-xl text-center">
                                    <span className="text-2xl font-bold text-emerald-400">{experiences.length}</span>
                                    <span className="block text-xs text-slate-400 mt-1 uppercase font-semibold">Positions</span>
                                </div>
                                <div className="glass-card p-4 rounded-xl text-center">
                                    <span className="text-2xl font-bold text-emerald-400">{projects.length}</span>
                                    <span className="block text-xs text-slate-400 mt-1 uppercase font-semibold">Projects</span>
                                </div>
                                <div className="glass-card p-4 rounded-xl text-center">
                                    <span className="text-2xl font-bold text-emerald-400">{skills.length}</span>
                                    <span className="block text-xs text-slate-400 mt-1 uppercase font-semibold">Skills</span>
                                </div>
                            </div>
                        </div>

                        {avatar_url && (
                            <div className="lg:col-span-4 flex justify-center">
                                <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-2 border-emerald-500/30 emerald-glow">
                                    <img src={avatar_url} alt={full_name} className="w-full h-full object-cover" />
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Experience Section */}
                {experiences.length > 0 && (
                    <section id="experience" className="space-y-8">
                        <div className="space-y-2">
                            <span className="text-emerald-400 font-mono text-xs tracking-wider uppercase">// 02. EXPERIENCE</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white">Work History</h2>
                        </div>

                        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
                            {experiences.map((exp, idx) => {
                                const role = exp.role || exp.title || "Developer";
                                const company = exp.company || exp.organization || "";
                                const period = exp.period || exp.duration || (exp.start_date ? `${exp.start_date} - ${exp.end_date || 'Present'}` : "");
                                const points = Array.isArray(exp.description) ? exp.description : [exp.description].filter(Boolean);

                                return (
                                    <div key={idx} className="relative group">
                                        <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-emerald-400 group-hover:bg-emerald-400 transition-colors"></div>

                                        <div className="glass-card p-6 rounded-2xl space-y-3 transition-all">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                <div>
                                                    <h3 className="text-xl font-bold text-white">{role}</h3>
                                                    {company && <p className="text-emerald-400 font-medium text-sm">{company}</p>}
                                                </div>
                                                {period && <span className="text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1 rounded-full border border-white/5 w-fit">{period}</span>}
                                            </div>

                                            {points.length > 0 && (
                                                <ul className="space-y-2 text-slate-300 text-sm list-disc pl-5">
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

                {/* Projects Section */}
                {projects.length > 0 && (
                    <section id="projects" className="space-y-8">
                        <div className="space-y-2">
                            <span className="text-emerald-400 font-mono text-xs tracking-wider uppercase">// 03. PORTFOLIO</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white">Featured Projects</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((proj, idx) => {
                                const title = proj.title || proj.name || "Project";
                                const desc = proj.description || proj.summary || "";
                                const techs = Array.isArray(proj.technologies) ? proj.technologies : (Array.isArray(proj.tech) ? proj.tech : []);
                                const liveUrl = proj.live_url || proj.demo_url || proj.link || "";
                                const githubUrl = proj.github_url || proj.repo_url || "";
                                const imageUrl = proj.image_url || proj.image || "";

                                return (
                                    <div key={idx} className="glass-card rounded-2xl p-6 flex flex-col justify-between space-y-4 group transition-all">
                                        <div className="space-y-4">
                                            {imageUrl && (
                                                <div className="h-44 w-full rounded-xl overflow-hidden bg-slate-900 border border-white/5">
                                                    <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                                </div>
                                            )}

                                            <div className="space-y-2">
                                                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{title}</h3>
                                                {desc && <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">{desc}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-2">
                                            {techs.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5">
                                                    {techs.map((t, tIdx) => (
                                                        <span key={tIdx} className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                            {typeof t === "string" ? t : t.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="flex items-center gap-4 pt-2 border-t border-white/5 text-xs font-semibold">
                                                {liveUrl && (
                                                    <a href={liveUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">
                                                        Live Demo ↗
                                                    </a>
                                                )}
                                                {githubUrl && (
                                                    <a href={githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
                                                        Source ↗
                                                    </a>
                                                )}
                                                <button
                                                    onClick={() => setSelectedProject(proj)}
                                                    className="ml-auto text-slate-400 hover:text-emerald-400 text-xs"
                                                >
                                                    Details →
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* Skills Section */}
                {skills.length > 0 && (
                    <section id="skills" className="space-y-8">
                        <div className="space-y-2">
                            <span className="text-emerald-400 font-mono text-xs tracking-wider uppercase">// 04. EXPERTISE</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white">Skills & Technologies</h2>
                        </div>

                        <div className="flex flex-wrap gap-2.5">
                            {skills.map((skill, idx) => {
                                const sName = typeof skill === "string" ? skill : (skill.name || skill.label || "");
                                return (
                                    <span key={idx} className="glass-card px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-200 hover:text-emerald-400 transition-colors">
                                        {sName}
                                    </span>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* Education & Achievements */}
                {(education.length > 0 || achievements.length > 0) && (
                    <section id="background" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {education.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">Education</h3>
                                <div className="space-y-4">
                                    {education.map((edu, idx) => (
                                        <div key={idx} className="glass-card p-5 rounded-xl space-y-1">
                                            <h4 className="font-bold text-white text-base">{edu.degree || edu.title}</h4>
                                            <p className="text-xs text-emerald-400 font-medium">{edu.institution || edu.school}</p>
                                            <span className="text-xs text-slate-400 font-mono block">{edu.period || edu.year}</span>
                                            {edu.description && <p className="text-xs text-slate-300 mt-2">{edu.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {achievements.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">Achievements</h3>
                                <div className="space-y-4">
                                    {achievements.map((ach, idx) => (
                                        <div key={idx} className="glass-card p-5 rounded-xl space-y-1">
                                            <h4 className="font-bold text-white text-base">🏆 {ach.title || ach.name}</h4>
                                            {ach.issuer && <p className="text-xs text-emerald-400 font-medium">{ach.issuer}</p>}
                                            {ach.date && <span className="text-xs text-slate-400 font-mono block">{ach.date}</span>}
                                            {ach.description && <p className="text-xs text-slate-300 mt-2">{ach.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {/* Contact Section */}
                <section id="contact" className="space-y-8">
                    <div className="glass-card rounded-3xl p-8 sm:p-12 space-y-6 max-w-3xl mx-auto">
                        <div className="space-y-2 text-center">
                            <span className="text-emerald-400 font-mono text-xs tracking-wider uppercase">// 05. CONTACT</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white">Let's Connect</h2>
                            <p className="text-slate-400 text-sm max-w-md mx-auto">Have a project in mind or want to discuss opportunities? Send a message below.</p>
                        </div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setContactSubmitted(true);
                            }}
                            className="space-y-4 max-w-lg mx-auto pt-2"
                        >
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Name</label>
                                <input required type="text" placeholder="Your Name" className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-400" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
                                <input required type="email" placeholder="your.email@domain.com" className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-400" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Message</label>
                                <textarea required rows={4} placeholder="Your message..." className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-400"></textarea>
                            </div>

                            <button type="submit" className="w-full py-3 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all text-sm shadow-lg shadow-emerald-500/20">
                                {contactSubmitted ? "Message Sent!" : "Send Message"}
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            {/* Project Detail Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <div className="glass-card max-w-xl w-full rounded-2xl p-6 space-y-4 relative border border-white/10">
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white"
                        >
                            ✕
                        </button>
                        <h3 className="text-2xl font-bold text-white">{selectedProject.title || selectedProject.name}</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">{selectedProject.description || selectedProject.summary}</p>
                        <div className="flex gap-4 pt-4">
                            {(selectedProject.live_url || selectedProject.demo_url) && (
                                <a href={selectedProject.live_url || selectedProject.demo_url} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg bg-emerald-500 text-black font-bold text-xs">
                                    View Live
                                </a>
                            )}
                            {(selectedProject.github_url || selectedProject.repo_url) && (
                                <a href={selectedProject.github_url || selectedProject.repo_url} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg bg-slate-800 text-white font-bold text-xs border border-white/10">
                                    GitHub
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="py-8 text-center text-xs text-slate-500 border-t border-white/10">
                <p>© {new Date().getFullYear()} {full_name}. Built with StackFolio.</p>
            </footer>
        </div>
    );
}
