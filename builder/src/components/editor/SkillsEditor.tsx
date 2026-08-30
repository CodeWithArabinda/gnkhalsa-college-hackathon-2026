import React, { useState } from "react";
import { useBuilder } from "../../context/BuilderContext";
import { Skill } from "../../types/portfolio";
import { generateId } from "../../lib/utils";
import { Plus, Trash2, Code, Zap } from "lucide-react";

export default function SkillsEditor() {
  const { portfolio, updateNestedArray } = useBuilder();
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState("Advanced");

  const handleAddSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = newSkillName.trim();
    if (!trimmed) return;

    const newSkill: Skill = {
      id: generateId("skill"),
      name: trimmed,
      level: newSkillLevel,
    };

    updateNestedArray("skills", (prev) => [...prev, newSkill]);
    setNewSkillName("");
  };

  const handleDeleteSkill = (id: string) => {
    updateNestedArray("skills", (prev) => prev.filter((s) => s.id !== id));
  };

  const handleUpdateLevel = (id: string, level: string) => {
    updateNestedArray("skills", (prev) =>
      prev.map((s) => (s.id === id ? { ...s, level } : s))
    );
  };

  const quickSkills = [
    "React", "TypeScript", "Next.js", "Node.js", "Python", "Tailwind CSS",
    "PostgreSQL", "Docker", "AWS", "GraphQL", "Three.js", "FastAPI"
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Add New Skill
        </h3>

        <form onSubmit={handleAddSkill} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            placeholder="e.g. React, PyTorch, Docker, Kubernetes..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-purple-500"
          />

          <select
            value={newSkillLevel}
            onChange={(e) => setNewSkillLevel(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none focus:border-purple-500"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/20"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </form>

        {/* Quick Add Pills */}
        <div className="pt-2">
          <p className="text-[11px] text-slate-500 mb-2">Quick Add Popular Technologies:</p>
          <div className="flex flex-wrap gap-1.5">
            {quickSkills.map((name) => {
              const alreadyAdded = portfolio.skills.some(
                (s) => s.name.toLowerCase() === name.toLowerCase()
              );
              if (alreadyAdded) return null;

              return (
                <button
                  key={name}
                  onClick={() => {
                    updateNestedArray("skills", (prev) => [
                      ...prev,
                      { id: generateId("skill"), name, level: "Advanced" },
                    ]);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-purple-600/20 text-slate-400 hover:text-purple-300 border border-slate-800 text-[11px] font-mono transition-colors"
                >
                  + {name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Listed Skills ({portfolio.skills.length})
        </h3>

        {portfolio.skills.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-900/50 border-2 border-dashed border-slate-800 text-center space-y-2 text-slate-400 text-xs">
            <Zap className="h-6 w-6 text-slate-600 mx-auto" />
            <p>No skills listed yet. Add some above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {portfolio.skills.map((skill) => (
              <div
                key={skill.id}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2 group hover:border-purple-500/40 transition-all"
              >
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{skill.name}</p>
                  <select
                    value={skill.level}
                    onChange={(e) => handleUpdateLevel(skill.id, e.target.value)}
                    className="bg-transparent text-[10px] text-purple-400 font-mono outline-none cursor-pointer"
                  >
                    <option value="Beginner" className="bg-slate-900 text-slate-200">Beginner</option>
                    <option value="Intermediate" className="bg-slate-900 text-slate-200">Intermediate</option>
                    <option value="Advanced" className="bg-slate-900 text-slate-200">Advanced</option>
                    <option value="Expert" className="bg-slate-900 text-slate-200">Expert</option>
                  </select>
                </div>

                <button
                  onClick={() => handleDeleteSkill(skill.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Remove Skill"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
