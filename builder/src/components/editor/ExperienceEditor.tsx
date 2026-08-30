import React from "react";
import { useBuilder } from "../../context/BuilderContext";
import { Experience } from "../../types/portfolio";
import { generateId } from "../../lib/utils";
import { Plus, Trash2, Briefcase, Building } from "lucide-react";

export default function ExperienceEditor() {
  const { portfolio, updateNestedArray } = useBuilder();

  const handleAddExperience = () => {
    const newExp: Experience = {
      id: generateId("exp"),
      company: "Company Name",
      role: "Software Engineer",
      start_date: "2023",
      end_date: "Present",
      description: "• Architected distributed systems handling high user throughput.\n• Collaborated with product and design teams to standardize UI systems.",
    };
    updateNestedArray("experiences", (prev) => [newExp, ...prev]);
  };

  const handleUpdateExperience = (id: string, updates: Partial<Experience>) => {
    updateNestedArray("experiences", (prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
  };

  const handleDeleteExperience = (id: string) => {
    updateNestedArray("experiences", (prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white">Work History & Experience</h3>
          <p className="text-xs text-slate-400">
            Document your professional roles, accomplishments, and career milestones.
          </p>
        </div>
        <button
          onClick={handleAddExperience}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/20"
        >
          <Plus className="h-4 w-4" /> Add Experience
        </button>
      </div>

      {portfolio.experiences.length === 0 ? (
        <div className="p-8 rounded-2xl bg-slate-900/50 border-2 border-dashed border-slate-800 text-center space-y-2 text-slate-400 text-xs">
          <Briefcase className="h-6 w-6 text-slate-600 mx-auto" />
          <p>No work experience recorded.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {portfolio.experiences.map((exp, idx) => (
            <div
              key={exp.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 relative group"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => handleUpdateExperience(exp.id, { role: e.target.value })}
                    placeholder="Role / Title"
                    className="bg-transparent font-bold text-sm text-white placeholder:text-slate-600 outline-none border-b border-transparent focus:border-purple-500"
                  />
                </div>

                <button
                  onClick={() => handleDeleteExperience(exp.id)}
                  className="p-1.5 rounded-lg bg-slate-950 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all text-xs"
                  title="Delete Experience"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400">Company Name</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleUpdateExperience(exp.id, { company: e.target.value })}
                    placeholder="e.g. Acme Corp"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400">Start Date</label>
                  <input
                    type="text"
                    value={exp.start_date}
                    onChange={(e) => handleUpdateExperience(exp.id, { start_date: e.target.value })}
                    placeholder="e.g. 2022 or Jan 2022"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400">End Date</label>
                  <input
                    type="text"
                    value={exp.end_date}
                    onChange={(e) => handleUpdateExperience(exp.id, { end_date: e.target.value })}
                    placeholder="e.g. Present or Dec 2023"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400">Accomplishments & Bullet Points</label>
                <textarea
                  rows={3}
                  value={exp.description}
                  onChange={(e) => handleUpdateExperience(exp.id, { description: e.target.value })}
                  placeholder="• Developed and scaled core product features..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder:text-slate-600 outline-none focus:border-purple-500 leading-relaxed font-sans"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
