import React, { useState } from "react";
import { useBuilder } from "../../context/BuilderContext";
import { Project } from "../../types/portfolio";
import { generateId } from "../../lib/utils";
import { Plus, Trash2, ExternalLink, Code, Sparkles, Image as ImageIcon } from "lucide-react";
import { GithubIcon } from "../common/Icons";

export default function ProjectsEditor() {
  const { portfolio, updateNestedArray } = useBuilder();
  const [newTechInputs, setNewTechInputs] = useState<Record<string, string>>({});

  const handleAddProject = () => {
    const newProject: Project = {
      id: generateId("proj"),
      title: "New Featured Project",
      description: "Briefly explain the architecture, problem solved, and key features of this application.",
      image_url: "",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      github_url: "https://github.com",
      live_url: "https://demo.app",
    };
    updateNestedArray("projects", (prev) => [newProject, ...prev]);
  };

  const handleUpdateProject = (id: string, updates: Partial<Project>) => {
    updateNestedArray("projects", (prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const handleDeleteProject = (id: string) => {
    updateNestedArray("projects", (prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddTech = (projectId: string) => {
    const inputVal = (newTechInputs[projectId] || "").trim();
    if (!inputVal) return;

    updateNestedArray("projects", (prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              technologies: p.technologies.includes(inputVal)
                ? p.technologies
                : [...p.technologies, inputVal],
            }
          : p
      )
    );

    setNewTechInputs((prev) => ({ ...prev, [projectId]: "" }));
  };

  const handleRemoveTech = (projectId: string, techName: string) => {
    updateNestedArray("projects", (prev) =>
      prev.map((p) =>
        p.id === projectId
          ? { ...p, technologies: p.technologies.filter((t) => t !== techName) }
          : p
      )
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white">Projects & Key Works</h3>
          <p className="text-xs text-slate-400">
            Add or reorder portfolio projects that demonstrate your engineering capabilities.
          </p>
        </div>
        <button
          onClick={handleAddProject}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/20 transition-all"
        >
          <Plus className="h-4 w-4" /> Add Project
        </button>
      </div>

      {portfolio.projects.length === 0 ? (
        <div className="p-8 rounded-2xl bg-slate-900/50 border-2 border-dashed border-slate-800 text-center space-y-3">
          <Code className="h-8 w-8 text-slate-600 mx-auto" />
          <p className="text-xs text-slate-400">No projects added yet.</p>
          <button
            onClick={handleAddProject}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 text-xs font-semibold"
          >
            Create Your First Project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {portfolio.projects.map((project, idx) => (
            <div
              key={project.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 relative group"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => handleUpdateProject(project.id, { title: e.target.value })}
                    placeholder="Project Title"
                    className="bg-transparent font-bold text-sm text-white placeholder:text-slate-600 outline-none border-b border-transparent focus:border-purple-500"
                  />
                </div>

                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="p-1.5 rounded-lg bg-slate-950 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all text-xs"
                  title="Delete Project"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400">Description</label>
                <textarea
                  rows={2}
                  value={project.description}
                  onChange={(e) => handleUpdateProject(project.id, { description: e.target.value })}
                  placeholder="Describe what the application does, scale, and technologies..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 placeholder:text-slate-600 outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              {/* URLs & Image */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" /> Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={project.live_url}
                    onChange={(e) => handleUpdateProject(project.id, { live_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <GithubIcon className="h-3 w-3" /> Repository URL
                  </label>
                  <input
                    type="url"
                    value={project.github_url}
                    onChange={(e) => handleUpdateProject(project.id, { github_url: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <ImageIcon className="h-3 w-3" /> Cover Image URL
                  </label>
                  <input
                    type="url"
                    value={project.image_url}
                    onChange={(e) => handleUpdateProject(project.id, { image_url: e.target.value })}
                    placeholder="https://images..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Technologies Tag Pills */}
              <div className="space-y-2 pt-1">
                <label className="text-[11px] font-semibold text-slate-400">Tech Stack Tags</label>
                <div className="flex flex-wrap items-center gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-purple-300 flex items-center gap-1.5"
                    >
                      {t}
                      <button
                        onClick={() => handleRemoveTech(project.id, t)}
                        className="hover:text-red-400 text-slate-500 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}

                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={newTechInputs[project.id] || ""}
                      onChange={(e) => setNewTechInputs({ ...newTechInputs, [project.id]: e.target.value })}
                      onKeyDown={(e) => e.key === "Enter" && handleAddTech(project.id)}
                      placeholder="+ Tech tag"
                      className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] font-mono text-white placeholder:text-slate-600 outline-none focus:border-purple-500 w-24"
                    />
                    <button
                      onClick={() => handleAddTech(project.id)}
                      className="px-2 py-1 rounded-lg bg-purple-600/20 text-purple-300 text-[11px] font-bold hover:bg-purple-600 hover:text-white"
                    >
                      Add
                    </button>
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
