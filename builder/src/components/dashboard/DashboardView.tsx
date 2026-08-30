import React from "react";
import { useBuilder } from "../../context/BuilderContext";
import { Plus, Trash2, Copy, Edit, ExternalLink, Calendar, FolderKanban } from "lucide-react";
import { getTemplateMetadata } from "../../templates/registry";

export default function DashboardView() {
  const {
    savedRecords,
    activeRecordId,
    loadRecordById,
    deleteRecordById,
    duplicateRecordById,
    createNewPortfolio,
    openStandalonePreview,
  } = useBuilder();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            My Portfolio Records
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your saved canonical portfolio datasets and custom configurations.
          </p>
        </div>

        <button
          onClick={createNewPortfolio}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/25 transition-all"
        >
          <Plus className="h-4 w-4" /> Create New Portfolio
        </button>
      </div>

      {savedRecords.length === 0 ? (
        <div className="p-16 rounded-3xl bg-slate-900/50 border-2 border-dashed border-slate-800 text-center space-y-4">
          <FolderKanban className="h-10 w-10 text-slate-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">No portfolios saved yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Upload a resume or start with a sample preset to generate your first portfolio.
            </p>
          </div>
          <button
            onClick={createNewPortfolio}
            className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-semibold text-xs"
          >
            Start Building
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedRecords.map((record) => {
            const templateMeta = getTemplateMetadata(record.portfolio.selected_template);
            const isCurrent = activeRecordId === record.id;

            return (
              <div
                key={record.id}
                className={`group rounded-3xl bg-slate-900 border overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-xl ${
                  isCurrent ? "border-purple-500 ring-1 ring-purple-500/40" : "border-slate-800 hover:border-slate-700"
                }`}
              >
                {/* Header Preview Banner */}
                <div className="relative h-32 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={templateMeta.previewImage}
                    alt={templateMeta.name}
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 text-purple-300 border border-purple-500/20 backdrop-blur-md">
                    {templateMeta.name}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                      {record.portfolio.full_name || record.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {record.portfolio.headline || "Full-Stack Engineer"}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(record.updated_at).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span>{record.portfolio.projects.length} projects</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => loadRecordById(record.id)}
                      className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <Edit className="h-3.5 w-3.5" /> Edit
                    </button>

                    <button
                      onClick={() => openStandalonePreview(record.portfolio.selected_template)}
                      title="Open Live in New Tab"
                      className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors text-xs"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={() => duplicateRecordById(record.id)}
                      title="Duplicate"
                      className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors text-xs"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={() => deleteRecordById(record.id)}
                      title="Delete"
                      className="p-2 rounded-xl bg-slate-950 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors text-xs"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
