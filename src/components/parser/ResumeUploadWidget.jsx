import React, { useState, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { parseResumeWithOCR } from '../../services/resumeParser';
import { validateParsedResume, transformToPortfolioSchema } from '../../services/gapEngine';
import { 
  FileText, 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  RefreshCw 
} from 'lucide-react';

export default function ResumeUploadWidget({ onUploadSuccess, onGapDetected, inModal = false }) {
  const portfolioContext = usePortfolio();
  const applyParsedResumeData = portfolioContext?.applyParsedResumeData;
  const showToast = portfolioContext?.showToast || ((type, msg) => console.log(`[Toast ${type}]: ${msg}`));

  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [extractedSummary, setExtractedSummary] = useState(null);
  const fileInputRef = useRef(null);
  const abortControllerRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;

    const isPdf = file.name?.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf';
    if (isPdf) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('File size exceeds 5MB limit. Please upload a smaller PDF resume.');
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setErrorMsg(null);
    } else {
      setErrorMsg('Please select a valid PDF file (max 5MB). The StackFolio OCR Engine specializes in PDF resumes.');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleStartParsing = async () => {
    if (!selectedFile || isProcessing) return;

    setIsProcessing(true);
    setErrorMsg(null);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      // Call Python OCR Model API pipeline
      const parsedData = await parseResumeWithOCR(selectedFile, {
        signal: controller.signal,
        timeoutMs: 30000
      });

      const summary = {
        name: parsedData.hero?.name || 'Candidate',
        experiencesCount: parsedData.experience?.length || 0,
        educationCount: parsedData.education?.length || 0,
        projectsCount: parsedData.projects?.length || 0,
        skillsCount: parsedData.skills?.length || 0
      };

      setExtractedSummary(summary);
      showToast('success', 'Resume parsed with StackFolio OCR Engine!');

      const validation = validateParsedResume(parsedData);

      if (!validation.isValid && onGapDetected) {
        onGapDetected(parsedData, validation.missingFields);
        setIsProcessing(false);
        return;
      }

      const finalSchema = transformToPortfolioSchema(parsedData);
      if (applyParsedResumeData) {
        applyParsedResumeData(parsedData);
      }

      if (onUploadSuccess) {
        onUploadSuccess(finalSchema, parsedData);
      }
    } catch (err) {
      console.error('StackFolio OCR Processing error:', err);
      setErrorMsg(err.message || 'Failed to extract resume payload. Please ensure Python OCR server is running.');
    } finally {
      setIsProcessing(false);
      abortControllerRef.current = null;
    }
  };

  const handleReset = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setSelectedFile(null);
    setIsProcessing(false);
    setErrorMsg(null);
    setExtractedSummary(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full bg-[#FAF9F5] border-2 border-black rounded-2xl shadow-[6px_6px_0px_#000] p-6 relative overflow-hidden space-y-5">
      
      {/* Engine Pipeline Badge & Subtitle */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFE600] border border-black text-[11px] font-mono font-bold text-black shadow-[1.5px_1.5px_0px_#000]">
            <Sparkles className="w-3 h-3 fill-black"/>
            StackFolio OCR Engine
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-neutral-300 bg-white text-neutral-600 font-semibold">
            PyMuPDF Fast-Path
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-emerald-500 bg-emerald-50 text-emerald-700 font-bold">
            ● API Ready
          </span>
        </div>
        <p className="text-xs text-neutral-600 font-medium leading-relaxed">
          Automatically extract full profile schema, skills matrix, projects, and work history from your document.
        </p>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-3 bg-red-100 border-2 border-red-500 rounded-xl text-red-900 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600"/>
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Dropzone Card */}
      {!extractedSummary && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`w-full p-6 rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center bg-white ${
            dragActive 
              ? 'border-black bg-amber-50 scale-[0.99]' 
              : 'border-black/30 hover:border-black hover:bg-neutral-50/80 shadow-[3px_3px_0px_#00000010]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />

          <div className="w-14 h-14 rounded-2xl bg-[#FFE600] border-2 border-black flex items-center justify-center mb-3 shadow-[3px_3px_0px_#000]">
            <UploadCloud className="w-7 h-7 text-black stroke-[2.5]"/>
          </div>

          {selectedFile ? (
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-100 border border-emerald-500 text-emerald-900 text-xs font-mono font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600"/>
                {selectedFile.name}
              </div>
              <p className="text-[11px] text-neutral-500 font-mono">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to Parse
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm font-black text-black font-mono mb-1">
                Drag & Drop your Resume PDF here
              </p>
              <p className="text-xs text-neutral-500 font-medium">
                or click to browse files (PDF only • Max 5MB)
              </p>
            </div>
          )}
        </div>
      )}

      {/* Success Summary View */}
      {extractedSummary && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-500 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-emerald-900 font-mono font-black text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600"/>
            <span>Resume Extracted for {extractedSummary.name}!</span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center font-mono text-[11px]">
            <div className="p-2 bg-white border border-emerald-300 rounded-lg">
              <span className="block font-black text-emerald-700">{extractedSummary.experiencesCount}</span>
              <span className="text-neutral-500">Exp</span>
            </div>
            <div className="p-2 bg-white border border-emerald-300 rounded-lg">
              <span className="block font-black text-emerald-700">{extractedSummary.projectsCount}</span>
              <span className="text-neutral-500">Projects</span>
            </div>
            <div className="p-2 bg-white border border-emerald-300 rounded-lg">
              <span className="block font-black text-emerald-700">{extractedSummary.skillsCount}</span>
              <span className="text-neutral-500">Skills</span>
            </div>
            <div className="p-2 bg-white border border-emerald-300 rounded-lg">
              <span className="block font-black text-emerald-700">{extractedSummary.educationCount}</span>
              <span className="text-neutral-500">Edu</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="w-full py-1.5 bg-white border border-black rounded-lg text-xs font-mono font-bold text-black hover:bg-neutral-100 shadow-[1.5px_1.5px_0px_#000]"
          >
            Upload Another Resume PDF
          </button>
        </div>
      )}

      {/* Action Button */}
      {!extractedSummary && (
        <div>
          <button
            type="button"
            disabled={!selectedFile || isProcessing}
            onClick={handleStartParsing}
            className={`w-full py-3 px-4 rounded-xl border-2 border-black font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              selectedFile && !isProcessing
                ? 'bg-[#FFE600] text-black shadow-[3px_3px_0px_#000] hover:bg-[#FADB00] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer'
                : 'bg-neutral-200 text-neutral-400 border-neutral-300 cursor-not-allowed shadow-none'
            }`}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black"/>
                <span>Extracting with OCR Engine...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 fill-black"/>
                <span>Extract Resume with StackFolio OCR 🚀</span>
              </>
            )}
          </button>
        </div>
      )}

    </div>
  );
}
