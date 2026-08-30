import React, { useState } from "react";
import { useBuilder } from "../../context/BuilderContext";
import { Download, Copy, Check, Share2, Globe, FileCode, CheckCircle2 } from "lucide-react";

interface PublishModalProps {
  onClose: () => void;
}

export default function PublishModal({ onClose }: PublishModalProps) {
  const { portfolio } = useBuilder();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  const publicUrl = `${window.location.origin}/preview?template=${portfolio.selected_template || "dark_developer"}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolio, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${portfolio.full_name.toLowerCase().replace(/\s+/g, "_") || "portfolio"}_canonical_data.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDownloadHTML = () => {
    const name = portfolio.full_name || "Portfolio";
    const headline = portfolio.headline || "Developer";
    const bio = portfolio.bio || "";

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} | Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Fira+Code&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; background-color: #090a0f; color: #f8fafc; }
  </style>
</head>
<body class="min-h-screen p-6 sm:p-12">
  <div class="max-w-4xl mx-auto space-y-12">
    <header class="border-b border-slate-800 pb-8 space-y-4">
      <h1 class="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400">${name}</h1>
      <p class="text-xl text-purple-300 font-semibold font-mono">${headline}</p>
      <p class="text-slate-400 text-sm max-w-2xl leading-relaxed">${bio}</p>
      <div class="flex gap-4 text-xs font-mono pt-2">
        ${portfolio.email ? `<a href="mailto:${portfolio.email}" class="text-purple-400 hover:underline">📧 ${portfolio.email}</a>` : ""}
        ${portfolio.github_url ? `<a href="${portfolio.github_url}" target="_blank" class="text-emerald-400 hover:underline">🔗 GitHub</a>` : ""}
        ${portfolio.linkedin_url ? `<a href="${portfolio.linkedin_url}" target="_blank" class="text-cyan-400 hover:underline">🔗 LinkedIn</a>` : ""}
      </div>
    </header>

    ${portfolio.skills && portfolio.skills.length > 0 ? `
    <section class="space-y-4">
      <h2 class="text-xl font-bold font-mono text-purple-400">~/skills</h2>
      <div class="flex flex-wrap gap-2">
        ${portfolio.skills.map(s => `<span class="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-200">${s.name} (${s.level || "Expert"})</span>`).join("")}
      </div>
    </section>` : ""}

    ${portfolio.projects && portfolio.projects.length > 0 ? `
    <section class="space-y-6">
      <h2 class="text-xl font-bold font-mono text-emerald-400">~/featured_projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${portfolio.projects.map(p => `
          <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 class="text-lg font-bold text-white">${p.title}</h3>
            <p class="text-xs text-slate-400 leading-relaxed">${p.description}</p>
            <div class="flex flex-wrap gap-1.5 pt-1">
              ${(p.technologies || []).map(t => `<span class="px-2 py-0.5 rounded bg-slate-950 text-[10px] text-purple-300 font-mono border border-slate-800">${t}</span>`).join("")}
            </div>
            <div class="flex gap-4 text-xs font-mono pt-2">
              ${p.live_url ? `<a href="${p.live_url}" target="_blank" class="text-emerald-400 hover:underline">🚀 Live</a>` : ""}
              ${p.github_url ? `<a href="${p.github_url}" target="_blank" class="text-slate-400 hover:underline">💻 Code</a>` : ""}
            </div>
          </div>
        `).join("")}
      </div>
    </section>` : ""}

    ${portfolio.experiences && portfolio.experiences.length > 0 ? `
    <section class="space-y-6">
      <h2 class="text-xl font-bold font-mono text-purple-400">~/experience</h2>
      <div class="space-y-4">
        ${portfolio.experiences.map(e => `
          <div class="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div class="flex justify-between items-baseline">
              <h3 class="font-bold text-white text-sm">${e.role} @ ${e.company}</h3>
              <span class="text-xs text-emerald-400 font-mono">${e.start_date} — ${e.end_date}</span>
            </div>
            <p class="text-xs text-slate-300 whitespace-pre-line pt-2">${e.description}</p>
          </div>
        `).join("")}
      </div>
    </section>` : ""}

    <footer class="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 font-mono">
      Generated by FolioCraft AI Resume-to-Portfolio Builder
    </footer>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", url);
    downloadAnchor.setAttribute("download", `${portfolio.full_name.toLowerCase().replace(/\s+/g, "_") || "portfolio"}.html`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <Share2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Publish & Export Portfolio</h3>
              <p className="text-xs text-slate-400">Share or download your portfolio bundle</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white text-sm">
            ✕
          </button>
        </div>

        {/* Live Public URL Card */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5 text-emerald-400" /> Shareable Live URL
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={publicUrl}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-300 outline-none select-all"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm shrink-0"
            >
              {copiedLink ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedLink ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* Export Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleDownloadHTML}
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 text-left space-y-1.5 transition-all group"
          >
            <div className="flex items-center justify-between">
              <FileCode className="h-5 w-5 text-purple-400" />
              <Download className="h-3.5 w-3.5 text-slate-500 group-hover:text-purple-300" />
            </div>
            <p className="text-xs font-bold text-white">Download Standalone HTML</p>
            <p className="text-[11px] text-slate-500 leading-tight">
              Self-contained website ready to host anywhere.
            </p>
          </button>

          <button
            onClick={handleDownloadJSON}
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-left space-y-1.5 transition-all group"
          >
            <div className="flex items-center justify-between">
              <Download className="h-5 w-5 text-emerald-400" />
              <CheckCircle2 className="h-3.5 w-3.5 text-slate-500 group-hover:text-emerald-300" />
            </div>
            <p className="text-xs font-bold text-white">Export Canonical JSON</p>
            <p className="text-[11px] text-slate-500 leading-tight">
              Raw structured resume portfolio schema.
            </p>
          </button>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
