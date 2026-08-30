import React from "react";
import { useBuilder } from "../../context/BuilderContext";
import { validatePortfolio } from "../../services/validator";
import {
  User,
  Briefcase,
  Code,
  FolderGit2,
  GraduationCap,
  Award,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Eye,
  LayoutTemplate,
} from "lucide-react";
import ProfileForm from "./ProfileForm";
import ProjectsEditor from "./ProjectsEditor";
import SkillsEditor from "./SkillsEditor";
import ExperienceEditor from "./ExperienceEditor";
import EducationEditor from "./EducationEditor";
import AchievementsEditor from "./AchievementsEditor";
import LivePreviewFrame from "../preview/LivePreviewFrame";

export default function PortfolioEditor() {
  const {
    portfolio,
    editorSubTab,
    setEditorSubTab,
    setActiveTab,
    openStandalonePreview,
  } = useBuilder();

  const validation = validatePortfolio(portfolio);

  const subTabs = [
    { id: "profile", label: "Profile", icon: User, count: undefined },
    { id: "projects", label: "Projects", icon: FolderGit2, count: portfolio.projects.length },
    { id: "skills", label: "Skills", icon: Code, count: portfolio.skills.length },
    { id: "experience", label: "Experience", icon: Briefcase, count: portfolio.experiences.length },
    { id: "education", label: "Education", icon: GraduationCap, count: portfolio.education.length },
    { id: "achievements", label: "Honors", icon: Award, count: portfolio.achievements.length },
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Status Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {portfolio.full_name || "Untitled Profile"}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {portfolio.selected_template}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Edit your structured content below. Live preview updates immediately.
          </p>
        </div>

        {/* Completeness Score Bar */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-center">
          <div className="space-y-1 w-44">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400">Dossier Quality</span>
              <span className="text-purple-400 font-bold">{validation.completenessScore}%</span>
            </div>
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${validation.completenessScore}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => setActiveTab("templates")}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-all"
          >
            <LayoutTemplate className="h-4 w-4 text-purple-400" />
            Switch Design
          </button>
        </div>
      </div>

      {/* Main Grid: Editor Panel + Live Preview Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Subtabs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Sub-tab Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-slate-800/80">
            {subTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = editorSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setEditorSubTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                      : "bg-slate-900/80 hover:bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive ? "bg-purple-900/80 text-white" : "bg-slate-950 text-slate-400"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sub-tab Content Area */}
          <div className="min-h-[450px]">
            {editorSubTab === "profile" && <ProfileForm />}
            {editorSubTab === "projects" && <ProjectsEditor />}
            {editorSubTab === "skills" && <SkillsEditor />}
            {editorSubTab === "experience" && <ExperienceEditor />}
            {editorSubTab === "education" && <EducationEditor />}
            {editorSubTab === "achievements" && <AchievementsEditor />}
          </div>
        </div>

        {/* Right Column: Live Interactive Split View Frame */}
        <div className="lg:col-span-5 sticky top-24 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5 text-purple-400" />
              Live Interactive Preview
            </span>
            <button
              onClick={() => openStandalonePreview()}
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold underline underline-offset-4"
            >
              Open in New Tab ↗
            </button>
          </div>

          <div className="h-[750px] w-full rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
            <LivePreviewFrame />
          </div>
        </div>
      </div>
    </div>
  );
}
