import React, { useState } from "react";

export default function Portfolio4Template({ portfolio }) {
    const [activeTab, setActiveTab] = useState("_hello");
    const [selectedTechs, setSelectedTechs] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Normalize portfolio data contract safely
    const profile = portfolio?.profile || {};
    const full_name = profile.full_name || "Developer";
    const headline = profile.headline || "Full-Stack Engineer & Architect";
    const bio = profile.bio || "";
    const email = profile.email || "";
    const location = profile.location || "";
    const github_url = profile.github_url || "";
    const linkedin_url = profile.linkedin_url || "";

    const experiences = Array.isArray(portfolio?.experiences) ? portfolio.experiences : [];
    const education = Array.isArray(portfolio?.education) ? portfolio.education : [];
    const projects = Array.isArray(portfolio?.projects) ? portfolio.projects : [];
    const skills = Array.isArray(portfolio?.skills) ? portfolio.skills : [];
    const achievements = Array.isArray(portfolio?.achievements) ? portfolio.achievements : [];

    // Gather unique project technologies for sidebar filtering
    const allTechs = Array.from(
        new Set(
            projects.flatMap((p) =>
                Array.isArray(p.technologies)
                    ? p.technologies
                    : Array.isArray(p.tech)
                        ? p.tech
                        : []
            ).map((t) => (typeof t === "string" ? t : t.name))
        )
    );

    const filteredProjects = selectedTechs.length === 0
        ? projects
        : projects.filter((p) => {
            const pTechs = (Array.isArray(p.technologies) ? p.technologies : Array.isArray(p.tech) ? p.tech : []).map(
                (t) => (typeof t === "string" ? t : t.name)
            );
            return selectedTechs.some((st) => pTechs.includes(st));
        });

    const toggleTech = (tech) => {
        setSelectedTechs((prev) =>
            prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
        );
    };

    return (
        <div className="stackfolio-template-portfolio4 min-h-screen bg-[#011627] text-[#607B96] font-mono relative selection:bg-[#1C2C4C] selection:text-[#E5E9F0]">
            <style>{`
        .stackfolio-template-portfolio4 {
          font-family: "Fira Code", monospace, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas;
          color-scheme: dark;
          background-color: #011627;
        }
        .stackfolio-template-portfolio4 .vscode-border {
          border-color: #1E2D3D;
        }
        .stackfolio-template-portfolio4 .vscode-bg-sidebar {
          background-color: #011627;
        }
        .stackfolio-template-portfolio4 .vscode-bg-editor {
          background-color: #011627;
        }
        .stackfolio-template-portfolio4 .vscode-[#FEA55F] {
          color: #FEA55F;
        }
        .stackfolio-template-portfolio4 .vscode-[#43D9AD] {
          color: #43D9AD;
        }
        .stackfolio-template-portfolio4 .vscode-[#E99287] {
          color: #E99287;
        }
        .stackfolio-template-portfolio4 .vscode-[#4D5BCE] {
          color: #4D5BCE;
        }
      `}</style>

            {/* Outer IDE Window Shell */}
            <div className="min-h-screen flex flex-col border border-[#1E2D3D] m-0 sm:m-4 rounded-none sm:rounded-xl overflow-hidden shadow-2xl bg-[#011627]">

                {/* IDE Title / Header Bar */}
                <header className="h-11 bg-[#011627] border-b border-[#1E2D3D] flex items-center justify-between px-4 text-xs font-sans text-[#607B96]">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#ED6A5E]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#F5BF4F]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#62C554]"></div>
                        </div>
                        <span className="ml-2 font-mono text-[#607B96] hidden sm:inline">{full_name.toLowerCase().replace(/\s+/g, '-')}-portfolio</span>
                    </div>

                    {/* IDE Navigation Tabs */}
                    <div className="flex items-center h-full">
                        {["_hello", "_about-me", "_projects", "_contact-me"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`h-full px-4 border-r border-[#1E2D3D] flex items-center gap-2 text-xs font-mono transition-colors ${activeTab === tab
                                    ? "bg-[#011627] text-white border-b-2 border-b-[#FEA55F]"
                                    : "hover:bg-[#010e1a] text-[#607B96]"
                                    }`}
                            >
                                <span>{tab}</span>
                            </button>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-2 text-xs text-[#607B96]">
                        <span>UTF-8</span>
                        <span>JavaScript React</span>
                    </div>
                </header>

                {/* Main IDE Body */}
                <div className="flex-1 flex flex-col md:flex-row min-h-[750px]">

                    {/* Left File Explorer Sidebar */}
                    <aside className={`${sidebarOpen ? 'w-full md:w-64' : 'w-12'} bg-[#011627] border-r border-[#1E2D3D] transition-all flex flex-col text-xs`}>
                        <div className="p-3 border-b border-[#1E2D3D] flex items-center justify-between font-bold text-white uppercase tracking-wider">
                            <span className="flex items-center gap-2">
                                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hover:text-[#FEA55F]">
                                    {sidebarOpen ? '▼' : '▶'}
                                </button>
                                {sidebarOpen && 'Explorer'}
                            </span>
                        </div>

                        {sidebarOpen && (
                            <div className="p-4 space-y-6 overflow-y-auto">
                                {/* File Tree */}
                                <div className="space-y-2">
                                    <span className="text-white font-bold text-xs flex items-center gap-1">
                                        📂 portfolio-root
                                    </span>
                                    <div className="pl-4 space-y-1">
                                        <button
                                            onClick={() => setActiveTab("_hello")}
                                            className={`w-full text-left py-1 px-2 rounded flex items-center gap-2 ${activeTab === "_hello" ? "bg-[#1E2D3D] text-white" : "hover:text-white"}`}
                                        >
                                            📄 hero.js
                                        </button>
                                        <button
                                            onClick={() => setActiveTab("_about-me")}
                                            className={`w-full text-left py-1 px-2 rounded flex items-center gap-2 ${activeTab === "_about-me" ? "bg-[#1E2D3D] text-white" : "hover:text-white"}`}
                                        >
                                            📄 bio.json
                                        </button>
                                        <button
                                            onClick={() => setActiveTab("_projects")}
                                            className={`w-full text-left py-1 px-2 rounded flex items-center gap-2 ${activeTab === "_projects" ? "bg-[#1E2D3D] text-white" : "hover:text-white"}`}
                                        >
                                            📄 projects.jsx
                                        </button>
                                        <button
                                            onClick={() => setActiveTab("_contact-me")}
                                            className={`w-full text-left py-1 px-2 rounded flex items-center gap-2 ${activeTab === "_contact-me" ? "bg-[#1E2D3D] text-white" : "hover:text-white"}`}
                                        >
                                            📄 contact.ts
                                        </button>
                                    </div>
                                </div>

                                {/* Technology Filter List */}
                                {allTechs.length > 0 && activeTab === "_projects" && (
                                    <div className="space-y-2 pt-4 border-t border-[#1E2D3D]">
                                        <span className="text-white font-bold text-xs uppercase block">Filter by Tech</span>
                                        <div className="space-y-1.5">
                                            {allTechs.map((tech, idx) => (
                                                <label key={idx} className="flex items-center gap-2 text-[#607B96] hover:text-white cursor-pointer select-none">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedTechs.includes(tech)}
                                                        onChange={() => toggleTech(tech)}
                                                        className="rounded border-[#1E2D3D] bg-[#011627] text-[#FEA55F] focus:ring-0"
                                                    />
                                                    <span>{tech}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </aside>

                    {/* Editor Workspace Area */}
                    <main className="flex-1 bg-[#011627] p-6 sm:p-10 overflow-y-auto">

                        {/* TAB: _hello */}
                        {activeTab === "_hello" && (
                            <div className="space-y-8 max-w-3xl">
                                <div className="space-y-4">
                                    <span className="text-sm text-[#E5E9F0] block">Hi all. I am</span>
                                    <h1 className="text-4xl sm:text-6xl font-bold text-white">{full_name}</h1>
                                    <h2 className="text-xl sm:text-2xl text-[#43D9AD] font-semibold">&gt; {headline}</h2>
                                </div>

                                <div className="space-y-2 font-mono text-xs sm:text-sm">
                                    <p className="text-[#607B96]">// complete the game or view github repo</p>
                                    <p className="text-[#607B96]">// you can also see it on my github page</p>
                                    <p>
                                        <span className="text-[#4D5BCE]">const</span> <span className="text-[#43D9AD]">githubLink</span> ={" "}
                                        <a href={github_url || "#"} target="_blank" rel="noreferrer" className="text-[#E99287] hover:underline">
                                            "{github_url || "https://github.com"}"
                                        </a>;
                                    </p>
                                </div>

                                {bio && (
                                    <div className="p-6 rounded-xl bg-[#010e1a] border border-[#1E2D3D] space-y-2">
                                        <span className="text-xs text-[#FEA55F] font-bold">/* Developer Bio */</span>
                                        <p className="text-sm text-[#E5E9F0] leading-relaxed">{bio}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* TAB: _about-me */}
                        {activeTab === "_about-me" && (
                            <div className="space-y-8 max-w-4xl">
                                <div className="space-y-2 border-b border-[#1E2D3D] pb-4">
                                    <span className="text-xs text-[#FEA55F]">// personal information</span>
                                    <h2 className="text-2xl font-bold text-white">_about-me.json</h2>
                                </div>

                                <div className="p-6 rounded-xl bg-[#010e1a] border border-[#1E2D3D] text-xs sm:text-sm space-y-4">
                                    <div><span className="text-[#E99287]">"name"</span>: <span className="text-[#43D9AD]">"{full_name}"</span>,</div>
                                    <div><span className="text-[#E99287]">"title"</span>: <span className="text-[#43D9AD]">"{headline}"</span>,</div>
                                    {location && <div><span className="text-[#E99287]">"location"</span>: <span className="text-[#43D9AD]">"{location}"</span>,</div>}
                                    {email && <div><span className="text-[#E99287]">"email"</span>: <span className="text-[#43D9AD]">"{email}"</span>,</div>}

                                    {skills.length > 0 && (
                                        <div>
                                            <span className="text-[#E99287]">"skills"</span>: [
                                            <div className="pl-6 flex flex-wrap gap-2 py-2">
                                                {skills.map((s, idx) => (
                                                    <span key={idx} className="bg-[#1E2D3D] text-[#43D9AD] px-2 py-0.5 rounded text-xs">
                                                        "{typeof s === "string" ? s : s.name}"
                                                    </span>
                                                ))}
                                            </div>
                                            ],
                                        </div>
                                    )}
                                </div>

                                {experiences.length > 0 && (
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold text-white">// experience timeline</h3>
                                        <div className="space-y-4">
                                            {experiences.map((exp, idx) => (
                                                <div key={idx} className="p-5 rounded-xl bg-[#010e1a] border border-[#1E2D3D] space-y-2">
                                                    <div className="flex justify-between items-center text-xs">
                                                        <span className="text-[#FEA55F] font-bold">{exp.role || exp.title}</span>
                                                        <span className="text-[#607B96]">{exp.period || exp.duration}</span>
                                                    </div>
                                                    <p className="text-xs text-[#43D9AD]">{exp.company || exp.organization}</p>
                                                    {Array.isArray(exp.description) ? (
                                                        <ul className="list-disc pl-4 text-xs text-[#E5E9F0] space-y-1 pt-1">
                                                            {exp.description.map((d, dIdx) => (
                                                                <li key={dIdx}>{d}</li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <p className="text-xs text-[#E5E9F0]">{exp.description}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* TAB: _projects */}
                        {activeTab === "_projects" && (
                            <div className="space-y-8">
                                <div className="flex justify-between items-center border-b border-[#1E2D3D] pb-4">
                                    <div>
                                        <span className="text-xs text-[#FEA55F]">// showcase</span>
                                        <h2 className="text-2xl font-bold text-white">_projects.jsx</h2>
                                    </div>
                                    <span className="text-xs text-[#607B96]">{filteredProjects.length} items</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredProjects.map((proj, idx) => {
                                        const title = proj.title || proj.name || "Project";
                                        const desc = proj.description || proj.summary || "";
                                        const techs = Array.isArray(proj.technologies) ? proj.technologies : Array.isArray(proj.tech) ? proj.tech : [];
                                        const liveUrl = proj.live_url || proj.demo_url || proj.link || "";
                                        const githubUrl = proj.github_url || proj.repo_url || "";
                                        const imageUrl = proj.image_url || proj.image || "";

                                        return (
                                            <div key={idx} className="rounded-xl border border-[#1E2D3D] bg-[#010e1a] overflow-hidden flex flex-col justify-between p-5 space-y-4">
                                                <div className="space-y-3">
                                                    {imageUrl && (
                                                        <div className="h-40 w-full rounded-lg overflow-hidden bg-[#011627] border border-[#1E2D3D]">
                                                            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                                                        </div>
                                                    )}
                                                    <h3 className="text-lg font-bold text-white">{title}</h3>
                                                    {desc && <p className="text-xs text-[#607B96] leading-relaxed line-clamp-3">{desc}</p>}
                                                </div>

                                                <div className="space-y-3 pt-2">
                                                    {techs.length > 0 && (
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {techs.map((t, tIdx) => (
                                                                <span key={tIdx} className="text-[10px] bg-[#1E2D3D] text-[#43D9AD] px-2 py-0.5 rounded">
                                                                    {typeof t === "string" ? t : t.name}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}

                                                    <div className="flex items-center gap-3 pt-2 border-t border-[#1E2D3D] text-xs">
                                                        {liveUrl && (
                                                            <a href={liveUrl} target="_blank" rel="noreferrer" className="text-[#FEA55F] hover:underline">
                                                                view-project
                                                            </a>
                                                        )}
                                                        {githubUrl && (
                                                            <a href={githubUrl} target="_blank" rel="noreferrer" className="text-[#607B96] hover:text-white">
                                                                github
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* TAB: _contact-me */}
                        {activeTab === "_contact-me" && (
                            <div className="space-y-8 max-w-2xl">
                                <div className="space-y-2 border-b border-[#1E2D3D] pb-4">
                                    <span className="text-xs text-[#FEA55F]">// send message</span>
                                    <h2 className="text-2xl font-bold text-white">_contact-me.ts</h2>
                                </div>

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        alert("Message sent!");
                                    }}
                                    className="p-6 rounded-xl bg-[#010e1a] border border-[#1E2D3D] space-y-4 text-xs"
                                >
                                    <div>
                                        <label className="block text-[#607B96] mb-1">_name:</label>
                                        <input required type="text" placeholder="John Doe" className="w-full bg-[#011627] border border-[#1E2D3D] rounded p-2.5 text-white focus:outline-none focus:border-[#FEA55F]" />
                                    </div>
                                    <div>
                                        <label className="block text-[#607B96] mb-1">_email:</label>
                                        <input required type="email" placeholder="john@domain.com" className="w-full bg-[#011627] border border-[#1E2D3D] rounded p-2.5 text-white focus:outline-none focus:border-[#FEA55F]" />
                                    </div>
                                    <div>
                                        <label className="block text-[#607B96] mb-1">_message:</label>
                                        <textarea required rows={5} placeholder="Type your message..." className="w-full bg-[#011627] border border-[#1E2D3D] rounded p-2.5 text-white focus:outline-none focus:border-[#FEA55F]"></textarea>
                                    </div>

                                    <button type="submit" className="px-6 py-2.5 rounded bg-[#FEA55F] text-black font-bold hover:bg-[#e8944f] transition-colors">
                                        submit-message
                                    </button>
                                </form>
                            </div>
                        )}
                    </main>
                </div>

                {/* IDE Footer Status Bar */}
                <footer className="h-7 bg-[#011627] border-t border-[#1E2D3D] flex items-center justify-between px-4 text-[11px] text-[#607B96]">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-[#43D9AD]">
                            <span className="w-2 h-2 rounded-full bg-[#43D9AD]"></span> main*
                        </span>
                        <span>0 errors, 0 warnings</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span>Spaces: 2</span>
                        <span>UTF-8</span>
                        <span>{full_name}</span>
                    </div>
                </footer>
            </div>
        </div>
    );
}
