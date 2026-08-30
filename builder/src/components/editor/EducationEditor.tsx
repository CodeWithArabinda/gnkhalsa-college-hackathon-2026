import React from "react";
import { useBuilder } from "../../context/BuilderContext";
import { Education } from "../../types/portfolio";
import { generateId } from "../../lib/utils";
import { Plus, Trash2, GraduationCap } from "lucide-react";

export default function EducationEditor() {
  const { portfolio, updateNestedArray } = useBuilder();

  const handleAddEducation = () => {
    const newEdu: Education = {
      id: generateId("edu"),
      institution: "University of Technology",
      degree: "B.S.",
      field: "Computer Science",
      start_year: "2018",
      end_year: "2022",
      description: "Dean's Honor List, Major in Systems & Software Engineering",
    };
    updateNestedArray("education", (prev) => [...prev, newEdu]);
  };

  const handleUpdateEducation = (id: string, updates: Partial<Education>) => {
    updateNestedArray("education", (prev) =>
      prev.map((ed) => (ed.id === id ? { ...ed, ...updates } : ed))
    );
  };

  const handleDeleteEducation = (id: string) => {
    updateNestedArray("education", (prev) => prev.filter((ed) => ed.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white">Education & Academics</h3>
          <p className="text-xs text-slate-400">Degrees, colleges, and certifications.</p>
        </div>
        <button
          onClick={handleAddEducation}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/20"
        >
          <Plus className="h-4 w-4" /> Add Education
        </button>
      </div>

      {portfolio.education.length === 0 ? (
        <div className="p-8 rounded-2xl bg-slate-900/50 border-2 border-dashed border-slate-800 text-center space-y-2 text-slate-400 text-xs">
          <GraduationCap className="h-6 w-6 text-slate-600 mx-auto" />
          <p>No education records added.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {portfolio.education.map((edu, idx) => (
            <div key={edu.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleUpdateEducation(edu.id, { institution: e.target.value })}
                    placeholder="Institution / College Name"
                    className="bg-transparent font-bold text-sm text-white placeholder:text-slate-600 outline-none border-b border-transparent focus:border-purple-500"
                  />
                </div>

                <button
                  onClick={() => handleDeleteEducation(edu.id)}
                  className="p-1.5 rounded-lg bg-slate-950 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all text-xs"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400">Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleUpdateEducation(edu.id, { degree: e.target.value })}
                    placeholder="e.g. B.S. or M.S."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-400">Field of Study</label>
                  <input
                    type="text"
                    value={edu.field}
                    onChange={(e) => handleUpdateEducation(edu.id, { field: e.target.value })}
                    placeholder="e.g. Computer Science & Engineering"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400">Years</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={edu.start_year}
                      onChange={(e) => handleUpdateEducation(edu.id, { start_year: e.target.value })}
                      placeholder="Start"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-xs text-white text-center outline-none focus:border-purple-500"
                    />
                    <span className="text-slate-600">-</span>
                    <input
                      type="text"
                      value={edu.end_year}
                      onChange={(e) => handleUpdateEducation(edu.id, { end_year: e.target.value })}
                      placeholder="End"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-xs text-white text-center outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
