import React, { useState, useRef } from 'react';
import { 
  FileText, 
  UploadCloud, 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Loader2 
} from 'lucide-react';
import { parseResumeWithOCR } from '../../services/resumeParser';
import { validateParsedResume, transformToPortfolioSchema } from '../../services/gapEngine';
import GapResolutionModal from './GapResolutionModal';

export default function ResumeUploadModal({ isOpen, onClose, onSuccess, onParsedSuccess }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const fileInputRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Gap Resolution Engine States
  const [showGapModal, setShowGapModal] = useState(false);
  const [parsedRawData, setParsedRawData] = useState(null);
  const [detectedGaps, setDetectedGaps] = useState([]);

  if (!isOpen) return null;

  const handleFile = (file) => {
    if (file && (file.type === 'application/pdf' || file.name.endsWith('.pdf') || file.type.startsWith('image/'))) {
      setSelectedFile(file);
      setErrorMsg(null);
    } else {
      setErrorMsg('Please select a valid PDF or Image file (max 5MB).');
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

  const handleExtractResume = async () => {
    if (!selectedFile || isProcessing) return;

    setIsProcessing(true);
    setErrorMsg(null);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      // Call dual-layer extraction pipeline (Python OCR + Gemini Flash Fallback)
      const parsedData = await parseResumeWithOCR(selectedFile, {
        signal: controller.signal,
        timeoutMs: 5000
      });

      // Validate required portfolio schema fields
      const validation = validateParsedResume(parsedData);
      if (!validation.isValid) {
        setParsedRawData(parsedData);
        setDetectedGaps(validation.missingFields);
        setShowGapModal(true);
        setIsProcessing(false);
        return;
      }

      const finalSchema = transformToPortfolioSchema(parsedData);
      const callback = onSuccess || onParsedSuccess;
      if (callback) callback(finalSchema);
      
      handleCloseModal();
    } catch (err) {
      console.error('Resume Extraction error:', err);
      setErrorMsg(err.message || 'Failed to extract resume details.');
      setIsProcessing(false);
    } finally {
      abortControllerRef.current = null;
    }
  };

  const handleGapResolved = (finalSchema) => {
    setShowGapModal(false);
    const callback = onSuccess || onParsedSuccess;
    if (callback) callback(finalSchema);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setSelectedFile(null);
    setIsProcessing(false);
    setErrorMsg(null);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
        {/* Modal Container */}
        <div className="w-full max-w-lg bg-[#FAF9F5] border-2 border-black rounded-2xl shadow-[6px_6px_0px_#000] p-6 relative overflow-hidden">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFE600] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
                <FileText className="w-4 h-4 text-black stroke-[2.5]"/>
              </div>
              <h2 className="text-lg font-black tracking-tight text-black font-mono">
                UPLOAD RESUME TO AUTO-FILL
              </h2>
            </div>
            <button
              onClick={handleCloseModal}
              disabled={isProcessing}
              className="w-8 h-8 rounded-lg border-2 border-black bg-white hover:bg-neutral-100 flex items-center justify-center shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer disabled:opacity-50"
            >
              <X className="w-4 h-4 text-black stroke-[2.5]"/>
            </button>
          </div>

          {/* Engine Pipeline Badge & Subtitle */}
          <div className="mb-5 space-y-2">
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
            <div className="mb-4 p-3 bg-red-100 border-2 border-red-500 rounded-xl text-red-900 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600"/>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Dropzone Card */}
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
              accept=".pdf,.png,.jpg,.jpeg"
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
                  or click to browse files (PDF, PNG, JPG • Max 5MB)
                </p>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="mt-5">
            <button
              type="button"
              disabled={!selectedFile || isProcessing}
              onClick={handleExtractResume}
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

        </div>
      </div>

      {/* 2-CHOICE GAP RESOLUTION MODAL */}
      <GapResolutionModal
        isOpen={showGapModal}
        onClose={() => setShowGapModal(false)}
        parsedData={parsedRawData}
        missingFields={detectedGaps}
        onResolve={handleGapResolved}
      />
    </>
  );
}
