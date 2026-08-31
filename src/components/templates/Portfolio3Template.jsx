import React, { useState } from "react";

export default function Portfolio3Template({ portfolio }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    // Normalize profile and portfolio structure
    const profile = portfolio?.profile || {};
    const full_name = profile.full_name || "Developer";
    const headline = profile.headline || "Full-Stack Developer & AI Specialist";
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

    const initialLetter = full_name.charAt(0).toUpperCase() || "D";

    return (
        <div className="stackfolio-template-portfolio3 min-h-screen bg-[#050816] text-white font-sans relative selection:bg-[#915EFF] selection:text-white overflow-x-hidden">
            <style>{`
        .stackfolio-template-portfolio3 {
          color-scheme: dark;
          background-color: #050816;
        }
        .stackfolio-template-portfolio3 .violet-gradient {
          background: linear-gradient(180deg, #804cee 0%, rgba(60, 51, 80, 0) 100%);
        }
        .stackfolio-template-portfolio3 .text-violet-accent {
          color: #915EFF;
        }
        .stackfolio-template-portfolio3 .bg-violet-accent {
          background-color: #915EFF;
        }
        .stackfolio-template-portfolio3 .border-violet-accent {
          border-color: #915EFF;
        }
        .stackfolio-template-portfolio3 .glass-cyber {
          background: rgba(17, 16, 29, 0.75);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(145, 94, 255, 0.15);
        }
        .stackfolio-template-portfolio3 .glass-cyber:hover {
          border-color: rgba(145, 94, 255, 0.5);
          box-shadow: 0 0 30px -5px rgba(145, 94, 255, 0.25);
        }
      `}</style>

            {/* Aurora Ambient Backgrounds */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#915EFF]/15 rounded-full blur-[140px] pointer-events-none"></div>
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Navigation Header */}
            <header className="fixed top-0 left-0 z-40 w-full bg-[#050816]/85 backdrop-blur-md border-b border-white/10 px-6 sm:px-12 py-4 flex items-center justify-between">
                <a href="#hero" className="flex items-center gap-3 text-xl font-bold tracking-wider uppercase">
                    <span className="w-9 h-9 rounded-xl bg-violet-accent text-white flex items-center justify-center font-extrabold shadow-lg shadow-[#915EFF]/40">
                        {initialLetter}
                    </span>
                    <span className="text-white tracking-widest">{full_name}</span>
                </a>

                <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-slate-300">
                    <a href="#about" className="hover:text-violet-accent transition-colors">Overview</a>
                    {experiences.length > 0 && <a href="#work" className="hover:text-violet-accent transition-colors">Experience</a>}
                    {projects.length > 0 && <a href="#projects" className="hover:text-violet-accent transition-colors">Projects</a>}
                    {skills.length > 0 && <a href="#skills" className="hover:text-violet-accent transition-colors">Skills</a>}
                    <a href="#contact" className="hover:text-violet-accent transition-colors">Contact</a>
                </nav>

                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden text-white p-2"
                    aria-label="Toggle Navigation"
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
                    <div className="md:hidden absolute top-full left-0 w-full bg-[#050816] border-b border-white/10 p-6 space-y-4 shadow-2xl text-center font-semibold text-sm">
                        <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-violet-accent">Overview</a>
                        {experiences.length > 0 && <a href="#work" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-violet-accent">Experience</a>}
                        {projects.length > 0 && <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-violet-accent">Projects</a>}
                        {skills.length > 0 && <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-violet-accent">Skills</a>}
                        <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-violet-accent">Contact</a>
                    </div>
                )}
            </header>

            {/* Main Container */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-20 space-y-32">

                {/* Hero Section */}
                <section id="hero" className="min-h-[80vh] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full bg-violet-accent flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-white animate-ping"></div>
                            </div>
                            <span className="text-xs font-mono tracking-widest text-violet-accent uppercase">SYSTEM READY</span>
                        </div>

                        <div className="space-y-3">
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight">
                                Hi, I'm <span className="text-violet-accent">{full_name}</span>
                            </h1>
                            <p className="text-xl sm:text-2xl font-bold text-slate-300">
                                {headline}
                            </p>
                        </div>

                        {bio && (
                            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
                                {bio}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-4 pt-4">
                            {projects.length > 0 && (
                                <a href="#projects" className="bg-violet-accent hover:bg-[#804cee] text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-[#915EFF]/30 transition-all">
                                    Explore Work
                                </a>
                            )}
                            <a href="#contact" className="glass-cyber text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:border-violet-accent transition-all">
                                Get In Touch
                            </a>
                        </div>

                        <div className="flex items-center gap-6 pt-6 text-slate-400 text-sm">
                            {github_url && (
                                <a href={github_url} target="_blank" rel="noreferrer" className="hover:text-violet-accent transition-colors">
                                    GitHub ↗
                                </a>
                            )}
                            {linkedin_url && (
                                <a href={linkedin_url} target="_blank" rel="noreferrer" className="hover:text-violet-accent transition-colors">
                                    LinkedIn ↗
                                </a>
                            )}
                            {email && (
                                <a href={`mailto:${email}`} className="hover:text-violet-accent transition-colors">
                                    {email}
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Cybernetic Visual Substitute */}
                    <div className="lg:col-span-5 flex justify-center">
                        <div className="glass-cyber w-full max-w-[400px] p-6 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden border border-white/10">
                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                </div>
                                <span className="text-[11px] font-mono text-slate-400">developer.profile</span>
                            </div>

                            {avatar_url ? (
                                <div className="h-56 w-full rounded-2xl overflow-hidden border border-white/10">
                                    <img src={avatar_url} alt={full_name} className="w-full h-full object-cover" />
                                </div>
                            ) : (
                                <div className="h-56 w-full rounded-2xl bg-black/50 border border-white/10 flex flex-col items-center justify-center p-6 text-center space-y-3">
                                    <div className="w-16 h-16 rounded-2xl bg-violet-accent/20 border border-violet-accent text-violet-accent flex items-center justify-center text-3xl font-bold">
                                        ⚡
                                    </div>
                                    <span className="text-sm font-bold text-white">{full_name}</span>
                                    <span className="text-xs font-mono text-violet-accent">{headline}</span>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-3 text-center text-xs font-mono">
                                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                    <span className="text-slate-400 block text-[10px]">EXPERIENCE</span>
                                    <span className="text-violet-accent font-bold text-base">{experiences.length} Positions</span>
                                </div>
                                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                    <span className="text-slate-400 block text-[10px]">PROJECTS</span>
                                    <span className="text-violet-accent font-bold text-base">{projects.length} Built</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Overview Section */}
                <section id="about" className="space-y-8">
                    <div className="space-y-2">
                        <p className="text-xs font-mono uppercase tracking-widest text-slate-400">INTRODUCTION</p>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Overview.</h2>
                    </div>

                    <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
                        {bio || `${full_name} is a software developer specializing in high-performance digital products.`}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                        <div className="glass-cyber p-6 rounded-3xl space-y-3">
                            <div className="w-12 h-12 rounded-2xl bg-violet-accent/20 border border-violet-accent flex items-center justify-center text-violet-accent text-2xl font-bold">
                                💻
                            </div>
                            <h3 className="text-lg font-bold text-white">Web Developer</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">Building modern, responsive frontend user interfaces with React and Tailwind.</p>
                        </div>
                        <div className="glass-cyber p-6 rounded-3xl space-y-3">
                            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 text-2xl font-bold">
                                ⚙️
                            </div>
                            <h3 className="text-lg font-bold text-white">Backend Systems</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">Designing REST & GraphQL APIs, microservices, and robust database layers.</p>
                        </div>
                        <div className="glass-cyber p-6 rounded-3xl space-y-3">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 text-2xl font-bold">
                                🚀
                            </div>
                            <h3 className="text-lg font-bold text-white">UI/UX Craft</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">Prioritizing user experience, accessibility, and high visual standards.</p>
                        </div>
                        <div className="glass-cyber p-6 rounded-3xl space-y-3">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 text-2xl font-bold">
                                🌐
                            </div>
                            <h3 className="text-lg font-bold text-white">Cloud Architecture</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">Deploying scalable applications with CI/CD and containerized services.</p>
                        </div>
                    </div>
                </section>

                {/* Experience Section */}
                {experiences.length > 0 && (
                    <section id="work" className="space-y-8">
                        <div className="space-y-2">
                            <p className="text-xs font-mono uppercase tracking-widest text-slate-400">WHAT I HAVE DONE SO FAR</p>
                            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Work Experience.</h2>
                        </div>

                        <div className="space-y-6 max-w-4xl mx-auto">
                            {experiences.map((exp, idx) => {
                                const role = exp.role || exp.title || "Developer";
                                const company = exp.company || exp.organization || "";
                                const period = exp.period || exp.duration || (exp.start_date ? `${exp.start_date} - ${exp.end_date || 'Present'}` : "");
                                const points = Array.isArray(exp.description) ? exp.description : [exp.description].filter(Boolean);

                                return (
                                    <div key={idx} className="glass-cyber p-6 sm:p-8 rounded-3xl space-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-white">{role}</h3>
                                                {company && <p className="text-violet-accent font-semibold text-sm">{company}</p>}
                                            </div>
                                            {period && (
                                                <span className="text-xs font-mono text-slate-300 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit">
                                                    {period}
                                                </span>
                                            )}
                                        </div>

                                        {points.length > 0 && (
                                            <ul className="space-y-2 text-slate-300 text-xs sm:text-sm list-disc pl-5">
                                                {points.map((pt, pIdx) => (
                                                    <li key={pIdx}>{pt}</li>
                                                ))}
                                            </ul>
                                        )}
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
                            <p className="text-xs font-mono uppercase tracking-widest text-slate-400">MY WORK</p>
                            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Projects.</h2>
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
                                    <div key={idx} className="glass-cyber rounded-3xl p-6 flex flex-col justify-between space-y-4">
                                        <div className="space-y-4">
                                            {imageUrl && (
                                                <div className="h-44 w-full rounded-2xl overflow-hidden bg-black/50 border border-white/10">
                                                    <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                            <div className="space-y-2">
                                                <h3 className="text-xl font-bold text-white">{title}</h3>
                                                {desc && <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">{desc}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-2">
                                            {techs.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5">
                                                    {techs.map((t, tIdx) => (
                                                        <span key={tIdx} className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-violet-accent/15 text-violet-accent border border-violet-accent/30">
                                                            #{typeof t === "string" ? t : t.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-semibold">
                                                {liveUrl && (
                                                    <a href={liveUrl} target="_blank" rel="noreferrer" className="text-violet-accent hover:underline">
                                                        Live Demo ↗
                                                    </a>
                                                )}
                                                {githubUrl && (
                                                    <a href={githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
                                                        Source Code ↗
                                                    </a>
                                                )}
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
                            <p className="text-xs font-mono uppercase tracking-widest text-slate-400">SKILLSET</p>
                            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Technologies.</h2>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {skills.map((skill, idx) => {
                                const sName = typeof skill === "string" ? skill : (skill.name || skill.label || "");
                                return (
                                    <span key={idx} className="glass-cyber px-5 py-2.5 rounded-2xl text-sm font-semibold text-white">
                                        {sName}
                                    </span>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* Education & Achievements */}
                {(education.length > 0 || achievements.length > 0) && (
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {education.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-white border-b border-white/10 pb-2">Education</h3>
                                {education.map((edu, idx) => (
                                    <div key={idx} className="glass-cyber p-6 rounded-3xl space-y-1">
                                        <h4 className="font-bold text-white text-base">{edu.degree || edu.title}</h4>
                                        <p className="text-xs font-semibold text-violet-accent">{edu.institution || edu.school}</p>
                                        <span className="text-[11px] font-mono text-slate-400 block">{edu.period || edu.year}</span>
                                        {edu.description && <p className="text-xs text-slate-300 mt-2">{edu.description}</p>}
                                    </div>
                                ))}
                            </div>
                        )}

                        {achievements.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-white border-b border-white/10 pb-2">Achievements</h3>
                                {achievements.map((ach, idx) => (
                                    <div key={idx} className="glass-cyber p-6 rounded-3xl space-y-1">
                                        <h4 className="font-bold text-white text-base">🏆 {ach.title || ach.name}</h4>
                                        {ach.issuer && <p className="text-xs font-semibold text-violet-accent">{ach.issuer}</p>}
                                        {ach.date && <span className="text-[11px] font-mono text-slate-400 block">{ach.date}</span>}
                                        {ach.description && <p className="text-xs text-slate-300 mt-2">{ach.description}</p>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                )}

                {/* Contact Section */}
                <section id="contact" className="space-y-8">
                    <div className="glass-cyber rounded-3xl p-8 sm:p-12 space-y-6 max-w-3xl mx-auto text-center">
                        <div className="space-y-2">
                            <p className="text-xs font-mono uppercase tracking-widest text-slate-400">GET IN TOUCH</p>
                            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Contact.</h2>
                            <p className="text-slate-400 text-sm max-w-md mx-auto">Feel free to reach out for collaborations or project inquiries.</p>
                        </div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                alert("Message submitted!");
                            }}
                            className="space-y-4 max-w-lg mx-auto text-left"
                        >
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                                <input required type="text" placeholder="What's your name?" className="w-full bg-[#050816] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-violet-accent" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Email</label>
                                <input required type="email" placeholder="What's your email?" className="w-full bg-[#050816] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-violet-accent" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Message</label>
                                <textarea required rows={4} placeholder="What do you want to say?" className="w-full bg-[#050816] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-violet-accent"></textarea>
                            </div>

                            <button type="submit" className="w-full bg-violet-accent hover:bg-[#804cee] text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-[#915EFF]/30 transition-all">
                                Send Message
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-8 text-center text-xs text-slate-500 border-t border-white/10 bg-[#050816]">
                <p>© {new Date().getFullYear()} {full_name}. All rights reserved.</p>
            </footer>
        </div>
    );
}
