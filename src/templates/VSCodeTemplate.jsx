import React, { useState } from 'react';
import { Github, Linkedin, Mail, MapPin, ExternalLink, Terminal, Briefcase, GraduationCap, Award, FileText, Code, Settings, User, ChevronRight } from 'lucide-react';

const FILE_TREE = [
  { name: 'about.md', icon: '📄', tab: 'about' },
  { name: 'projects.json', icon: '📦', tab: 'projects' },
  { name: 'experience.ts', icon: '💼', tab: 'experience' },
  { name: 'skills.tsx', icon: '⚡', tab: 'skills' },
  { name: 'education.md', icon: '🎓', tab: 'education' },
  { name: 'contact.env', icon: '📬', tab: 'contact' },
];

export default function VSCodeTemplate({ portfolio }) {
  const [activeFile, setActiveFile] = useState('about');
  const [openTabs, setOpenTabs] = useState(['about', 'projects', 'skills']);

  if (!portfolio) return null;

  const {
    full_name = 'Developer',
    headline = '',
    bio = '',
    profile_image_url = '',
    location = '',
    email = '',
    github_url = '',
    linkedin_url = '',
    experiences = [],
    education = [],
    projects = [],
    skills = [],
    achievements = []
  } = portfolio;

  const handleFileClick = (tab) => {
    setActiveFile(tab);
    if (!openTabs.includes(tab)) {
      setOpenTabs([...openTabs, tab]);
    }
  };

  const closeTab = (e, tab) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(t => t !== tab);
    setOpenTabs(newTabs);
    if (activeFile === tab) {
      setActiveFile(newTabs[newTabs.length - 1] || 'about');
    }
  };

  const lineNumbers = (count) =>
    Array.from({ length: count }, (_, i) => (
      <div key={i} className="text-[#858585] select-none pr-4 text-right">{i + 1}</div>
    ));

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-[#D4D4D4] font-mono text-sm flex flex-col">
      {/* Title Bar */}
      <div className="bg-[#323233] px-4 py-1.5 flex items-center justify-between text-xs border-b border-[#252526]">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[#CCCCCC]">{full_name} — VS Code Portfolio</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar */}
        <div className="w-12 bg-[#333333] border-r border-[#252526] flex flex-col items-center py-3 space-y-4 shrink-0">
          <button className="p-1.5 text-white bg-[#252526] rounded"><FileText className="w-5 h-5" /></button>
          <button className="p-1.5 text-[#858585] hover:text-white transition-colors"><Code className="w-5 h-5" /></button>
          <button className="p-1.5 text-[#858585] hover:text-white transition-colors"><Terminal className="w-5 h-5" /></button>
          <button className="p-1.5 text-[#858585] hover:text-white transition-colors"><User className="w-5 h-5" /></button>
          <div className="flex-1" />
          <button className="p-1.5 text-[#858585] hover:text-white transition-colors"><Settings className="w-5 h-5" /></button>
        </div>

        {/* File Explorer Sidebar */}
        <div className="w-52 bg-[#252526] border-r border-[#1E1E1E] flex flex-col shrink-0 overflow-y-auto">
          <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#BBBBBB]">Explorer</div>
          <div className="px-2 py-1 text-[11px] font-bold text-[#CCCCCC] flex items-center space-x-1">
            <ChevronRight className="w-3 h-3 rotate-90" />
            <span>PORTFOLIO</span>
          </div>
          {FILE_TREE.map((file) => (
            <button
              key={file.tab}
              onClick={() => handleFileClick(file.tab)}
              className={`w-full text-left px-6 py-1 text-[12px] flex items-center space-x-2 transition-colors ${
                activeFile === file.tab ? 'bg-[#37373D] text-white' : 'text-[#CCCCCC] hover:bg-[#2A2D2E]'
              }`}
            >
              <span className="text-sm">{file.icon}</span>
              <span>{file.name}</span>
            </button>
          ))}

          {/* Profile card in explorer */}
          {profile_image_url && (
            <div className="mt-auto p-3 border-t border-[#1E1E1E]">
              <img src={profile_image_url} alt={full_name} className="w-full aspect-square object-cover rounded" />
            </div>
          )}
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs Bar */}
          <div className="bg-[#252526] flex items-center border-b border-[#1E1E1E] overflow-x-auto shrink-0">
            {openTabs.map((tab) => {
              const file = FILE_TREE.find(f => f.tab === tab);
              return (
                <button
                  key={tab}
                  onClick={() => setActiveFile(tab)}
                  className={`px-4 py-2 text-[12px] flex items-center space-x-2 border-r border-[#1E1E1E] shrink-0 ${
                    activeFile === tab ? 'bg-[#1E1E1E] text-white border-t-2 border-t-[#007ACC]' : 'bg-[#2D2D2D] text-[#969696] hover:bg-[#1E1E1E]'
                  }`}
                >
                  <span className="text-xs">{file?.icon}</span>
                  <span>{file?.name}</span>
                  <span onClick={(e) => closeTab(e, tab)} className="ml-2 text-[#969696] hover:text-white text-xs">×</span>
                </button>
              );
            })}
          </div>

          {/* Editor Content + Line Numbers */}
          <div className="flex-1 overflow-y-auto p-0">
            <div className="flex min-h-full">
              {/* Line Numbers Column */}
              <div className="bg-[#1E1E1E] py-4 pl-4 pr-0 text-[12px] leading-6 shrink-0 select-none">
                {lineNumbers(50)}
              </div>

              {/* File Content */}
              <div className="flex-1 py-4 px-6 text-[13px] leading-6 space-y-4">
                {activeFile === 'about' && (
                  <div className="space-y-4">
                    <div className="text-[#569CD6]">{'# '}<span className="text-[#CE9178] text-lg font-bold">{full_name}</span></div>
                    <div className="text-[#6A9955]">{'// '}{headline}</div>
                    <div className="text-[#D4D4D4] leading-relaxed mt-4 whitespace-pre-wrap">{bio || '// No bio yet. Add one in the editor.'}</div>
                    {location && <div className="mt-3"><span className="text-[#569CD6]">const</span> <span className="text-[#4FC1FF]">location</span> = <span className="text-[#CE9178]">"{location}"</span>;</div>}
                  </div>
                )}

                {activeFile === 'projects' && (
                  <div className="space-y-4">
                    <div className="text-[#569CD6]">{'// '}<span className="text-[#DCDCAA]">projects.json</span></div>
                    <div className="text-[#D4D4D4]">{'['}</div>
                    {projects.map((proj, idx) => (
                      <div key={proj.id} className="pl-4 space-y-1 border-l-2 border-[#007ACC]/30 ml-2">
                        <div>{'{'}</div>
                        <div className="pl-4"><span className="text-[#9CDCFE]">"title"</span>: <span className="text-[#CE9178]">"{proj.title}"</span>,</div>
                        <div className="pl-4"><span className="text-[#9CDCFE]">"description"</span>: <span className="text-[#CE9178]">"{proj.description}"</span>,</div>
                        {proj.technologies && proj.technologies.length > 0 && (
                          <div className="pl-4">
                            <span className="text-[#9CDCFE]">"tech"</span>: [
                            {proj.technologies.map((t, i) => (
                              <span key={t}><span className="text-[#CE9178]">"{t}"</span>{i < proj.technologies.length - 1 ? ', ' : ''}</span>
                            ))}
                            ]
                          </div>
                        )}
                        <div className="pl-4 flex space-x-3 text-[12px] pt-1">
                          {proj.github_url && <a href={proj.github_url} target="_blank" rel="noreferrer" className="text-[#007ACC] hover:underline flex items-center gap-1"><Github className="w-3 h-3" />repo</a>}
                          {proj.live_url && <a href={proj.live_url} target="_blank" rel="noreferrer" className="text-[#4EC9B0] hover:underline flex items-center gap-1"><ExternalLink className="w-3 h-3" />demo</a>}
                        </div>
                        <div>{'}'}{idx < projects.length - 1 ? ',' : ''}</div>
                      </div>
                    ))}
                    <div className="text-[#D4D4D4]">{']'}</div>
                    {projects.length === 0 && <div className="text-[#6A9955]">{'// No projects added yet.'}</div>}
                  </div>
                )}

                {activeFile === 'experience' && (
                  <div className="space-y-4">
                    <div className="text-[#569CD6]">{'// '}<span className="text-[#DCDCAA]">experience.ts</span></div>
                    {experiences.length === 0 && <div className="text-[#6A9955]">{'// No work experience added yet.'}</div>}
                    {experiences.map((exp) => (
                      <div key={exp.id} className="border-l-2 border-[#007ACC]/30 pl-4 ml-2 space-y-1">
                        <div><span className="text-[#C586C0]">export</span> <span className="text-[#569CD6]">const</span> <span className="text-[#4FC1FF]">{(exp.company || '').replace(/\s+/g, '_')}</span> = {'{'}</div>
                        <div className="pl-4"><span className="text-[#9CDCFE]">role</span>: <span className="text-[#CE9178]">"{exp.role}"</span>,</div>
                        <div className="pl-4"><span className="text-[#9CDCFE]">company</span>: <span className="text-[#CE9178]">"{exp.company}"</span>,</div>
                        <div className="pl-4"><span className="text-[#9CDCFE]">period</span>: <span className="text-[#CE9178]">"{exp.start_date} – {exp.end_date}"</span>,</div>
                        {exp.description && <div className="pl-4"><span className="text-[#9CDCFE]">summary</span>: <span className="text-[#CE9178]">"{exp.description}"</span>,</div>}
                        <div>{'};'}</div>
                      </div>
                    ))}
                  </div>
                )}

                {activeFile === 'skills' && (
                  <div className="space-y-3">
                    <div className="text-[#569CD6]">{'// '}<span className="text-[#DCDCAA]">skills.tsx</span></div>
                    <div><span className="text-[#C586C0]">import</span> {'{ SkillBadge }'} <span className="text-[#C586C0]">from</span> <span className="text-[#CE9178]">'@/components'</span>;</div>
                    <div className="mt-4"><span className="text-[#569CD6]">const</span> <span className="text-[#4FC1FF]">techStack</span> = [</div>
                    <div className="flex flex-wrap gap-2 pl-4">
                      {skills.map((skill) => (
                        <span key={skill.id} className="px-2.5 py-1 bg-[#264F78] text-[#9CDCFE] rounded text-[11px] font-medium border border-[#007ACC]/30">
                          {skill.name} <span className="text-[#4EC9B0] text-[10px]">({skill.level})</span>
                        </span>
                      ))}
                    </div>
                    <div>];</div>
                    {skills.length === 0 && <div className="text-[#6A9955]">{'// No skills listed yet.'}</div>}
                  </div>
                )}

                {activeFile === 'education' && (
                  <div className="space-y-4">
                    <div className="text-[#569CD6]">{'# '}<span className="text-[#DCDCAA]">Education</span></div>
                    {education.length === 0 && <div className="text-[#6A9955]">{'// No education entries yet.'}</div>}
                    {education.map((edu) => (
                      <div key={edu.id} className="border-l-2 border-[#007ACC]/30 pl-4 ml-2 space-y-1">
                        <div className="text-[#4FC1FF] font-bold">{edu.institution}</div>
                        <div className="text-[#CE9178]">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                        <div className="text-[#6A9955]">{edu.start_year} – {edu.end_year}</div>
                        {edu.description && <div className="text-[#D4D4D4] text-[12px]">{edu.description}</div>}
                      </div>
                    ))}
                    {achievements.length > 0 && (
                      <>
                        <div className="text-[#569CD6] mt-6">{'## '}<span className="text-[#DCDCAA]">Certifications</span></div>
                        {achievements.map((a) => (
                          <div key={a.id} className="border-l-2 border-[#4EC9B0]/30 pl-4 ml-2">
                            <div className="text-[#4FC1FF]">{a.title}</div>
                            <div className="text-[#6A9955] text-[11px]">{a.issuer} · {a.date}</div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                )}

                {activeFile === 'contact' && (
                  <div className="space-y-2">
                    <div className="text-[#6A9955]"># Contact Environment Variables</div>
                    {email && <div><span className="text-[#9CDCFE]">EMAIL</span>=<span className="text-[#CE9178]">{email}</span></div>}
                    {location && <div><span className="text-[#9CDCFE]">LOCATION</span>=<span className="text-[#CE9178]">{location}</span></div>}
                    {github_url && <div><span className="text-[#9CDCFE]">GITHUB_URL</span>=<span className="text-[#CE9178]">{github_url}</span></div>}
                    {linkedin_url && <div><span className="text-[#9CDCFE]">LINKEDIN_URL</span>=<span className="text-[#CE9178]">{linkedin_url}</span></div>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#007ACC] text-white text-[11px] px-4 py-1 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1"><Terminal className="w-3 h-3" /><span>main</span></span>
          <span>UTF-8</span>
          <span>Ln 1, Col 1</span>
        </div>
        <div className="flex items-center space-x-3">
          <span>TypeScript React</span>
          <span>Prettier</span>
          <span>{full_name} Portfolio</span>
        </div>
      </div>
    </div>
  );
}
