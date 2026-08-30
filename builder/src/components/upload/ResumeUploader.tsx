import React, { useState, useRef } from "react";
import { useBuilder } from "../../context/BuilderContext";
import { extractTextFromFile, parseResumeText } from "../../services/resumeParser";
import { SAMPLE_RESUMES } from "../../services/sampleResumes";
import {
  UploadCloud,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ClipboardPaste,
  FileCode,
  Zap,
} from "lucide-react";
import ExtractionProgressModal from "./ExtractionProgressModal";

export default function ResumeUploader() {
  const {
    setPortfolio,
    setActiveTab,
    isExtracting,
    setIsExtracting,
    extractionProgressText,
    setExtractionProgressText,
    loadSampleResume,
    saveCurrentRecord,
  } = useBuilder();

  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pastedText, setPastedText] = useState("");
  const [showPasteMode, setShowPasteMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    setErrorMessage(null);

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("File exceeds 10MB size limit. Please upload a smaller PDF or DOCX file.");
      return;
    }

    try {
      setIsExtracting(true);
      setExtractionProgressText(`Reading ${file.name}...`);

      const { text, rawJson } = await extractTextFromFile(file);

      if (rawJson && typeof rawJson === "object") {
        setExtractionProgressText("Normalizing structured portfolio JSON...");
        setPortfolio(rawJson);
        setTimeout(() => {
          setIsExtracting(false);
          saveCurrentRecord();
          setActiveTab("editor");
        }, 800);
        return;
      }

      if (!text || text.trim().length < 20) {
        throw new Error("Unable to extract sufficient readable text from this file. Please ensure it is not an image-only scan or try copy-pasting the text.");
      }

      setExtractionProgressText("Parsing skills, experience and projects...");
      const parsed = parseResumeText(text, file.name);

      setPortfolio(parsed.portfolio);

      setTimeout(() => {
        setIsExtracting(false);
        saveCurrentRecord();
        setActiveTab("editor");
      }, 1200);
    } catch (err: any) {
      setIsExtracting(false);
      setErrorMessage(err?.message || "Failed to parse resume file. Please try again or paste raw resume text.");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handlePasteSubmit = () => {
    if (!pastedText.trim() || pastedText.trim().length < 30) {
      setErrorMessage("Please paste at least 30 characters of resume content.");
      return;
    }

    setIsExtracting(true);
    setExtractionProgressText("Parsing pasted resume text stream...");
    try {
      const parsed = parseResumeText(pastedText, "pasted-resume.txt");
      setPortfolio(parsed.portfolio);
      setTimeout(() => {
        setIsExtracting(false);
        saveCurrentRecord();
        setActiveTab("editor");
      }, 1000);
    } catch (err: any) {
      setIsExtracting(false);
      setErrorMessage(err?.message || "Parsing failed.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12 animate-in fade-in duration-300">
      {/* Extraction Progress Modal */}
      {isExtracting && <ExtractionProgressModal progressText={extractionProgressText} />}

      {/* Header Intro */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5" />
          Zero Coding Required • Prop-Driven Templates
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Upload Resume. Get a Live Portfolio.
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          FolioCraft extracts your experience, skills, and projects into a canonical data structure and feeds it into existing rich portfolio templates as props.
        </p>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-3">
          <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1 flex-1">
            <p className="font-bold">Extraction Warning</p>
            <p>{errorMessage}</p>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-red-400 hover:text-red-200 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Upload Box */}
      {!showPasteMode ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative rounded-3xl border-2 border-dashed p-10 sm:p-14 text-center cursor-pointer transition-all duration-200 ${
            dragActive
              ? "border-purple-500 bg-purple-500/10 scale-[1.01]"
              : "border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-900/90"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt,.json,application/pdf"
            onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
            className="hidden"
          />

          <div className="space-y-4 max-w-md mx-auto">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-purple-600/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-inner">
              <UploadCloud className="h-8 w-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-white">
                Drag and drop your resume here
              </h3>
              <p className="text-xs text-slate-400">
                Supports <span className="text-purple-300 font-mono font-medium">PDF, DOCX, TXT, or JSON</span> (Up to 10MB)
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/25 transition-all"
              >
                Browse Resume File
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPasteMode(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-all flex items-center gap-1.5"
              >
                <ClipboardPaste className="h-3.5 w-3.5" /> Paste Text
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Text Paste Mode */
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ClipboardPaste className="h-4 w-4 text-purple-400" />
              Paste Raw Resume Content
            </h3>
            <button
              onClick={() => setShowPasteMode(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              ← Back to File Upload
            </button>
          </div>

          <textarea
            rows={10}
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Paste your full resume text here (Summary, Skills, Work Experience, Projects, Education)..."
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-200 placeholder:text-slate-600 outline-none focus:border-purple-500 transition-colors"
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowPasteMode(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handlePasteSubmit}
              className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/30"
            >
              Extract & Convert
            </button>
          </div>
        </div>
      )}

      {/* Sample Resumes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-400" />
            <h3 className="text-sm font-bold text-white">
              Instant 1-Click Demo Profiles
            </h3>
          </div>
          <span className="text-xs text-slate-500">Test drive without uploading</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SAMPLE_RESUMES.map((sample) => (
            <div
              key={sample.id}
              onClick={() => loadSampleResume(sample.id)}
              className="group p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 space-y-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={sample.avatar}
                  alt={sample.name}
                  className="h-10 w-10 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    {sample.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">{sample.role}</p>
                </div>
              </div>

              <p className="text-xs text-slate-400/90 line-clamp-2 leading-relaxed">
                {sample.summary}
              </p>

              <div className="flex items-center justify-between pt-1 text-xs font-semibold text-purple-400 group-hover:translate-x-1 transition-transform">
                <span>Load Profile</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
