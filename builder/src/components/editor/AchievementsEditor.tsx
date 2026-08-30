import React from "react";
import { useBuilder } from "../../context/BuilderContext";
import { Achievement } from "../../types/portfolio";
import { generateId } from "../../lib/utils";
import { Plus, Trash2, Award, ExternalLink } from "lucide-react";

export default function AchievementsEditor() {
  const { portfolio, updateNestedArray } = useBuilder();

  const handleAddAchievement = () => {
    const newAch: Achievement = {
      id: generateId("ach"),
      title: "Award or Certification Name",
      date: "2023",
      issuer: "Issuing Organization",
      description: "Recognized for top performance, hackathon win, or technical mastery.",
      credential_url: "",
    };
    updateNestedArray("achievements", (prev) => [...prev, newAch]);
  };

  const handleUpdateAchievement = (id: string, updates: Partial<Achievement>) => {
    updateNestedArray("achievements", (prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
  };

  const handleDeleteAchievement = (id: string) => {
    updateNestedArray("achievements", (prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white">Achievements & Honors</h3>
          <p className="text-xs text-slate-400">Awards, hackathons, and certifications.</p>
        </div>
        <button
          onClick={handleAddAchievement}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/20"
        >
          <Plus className="h-4 w-4" /> Add Achievement
        </button>
      </div>

      {portfolio.achievements.length === 0 ? (
        <div className="p-8 rounded-2xl bg-slate-900/50 border-2 border-dashed border-slate-800 text-center space-y-2 text-slate-400 text-xs">
          <Award className="h-6 w-6 text-slate-600 mx-auto" />
          <p>No achievements added yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {portfolio.achievements.map((ach, idx) => (
            <div key={ach.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={ach.title}
                    onChange={(e) => handleUpdateAchievement(ach.id, { title: e.target.value })}
                    placeholder="Award / Certification Title"
                    className="bg-transparent font-bold text-sm text-white placeholder:text-slate-600 outline-none border-b border-transparent focus:border-purple-500"
                  />
                </div>

                <button
                  onClick={() => handleDeleteAchievement(ach.id)}
                  className="p-1.5 rounded-lg bg-slate-950 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all text-xs"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400">Issuer / Organization</label>
                  <input
                    type="text"
                    value={ach.issuer}
                    onChange={(e) => handleUpdateAchievement(ach.id, { issuer: e.target.value })}
                    placeholder="e.g. AWS, IEEE, HackMIT"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400">Date / Year</label>
                  <input
                    type="text"
                    value={ach.date}
                    onChange={(e) => handleUpdateAchievement(ach.id, { date: e.target.value })}
                    placeholder="e.g. 2023"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" /> Credential Link
                  </label>
                  <input
                    type="url"
                    value={ach.credential_url}
                    onChange={(e) => handleUpdateAchievement(ach.id, { credential_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
