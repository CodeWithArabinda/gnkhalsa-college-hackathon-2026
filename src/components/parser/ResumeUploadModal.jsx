import React, { useState } from 'react';
import { Upload, X, FileText, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { parseResumeFile } from '../../lib/resumeParser';

export default function ResumeUploadModal({ isOpen, onClose, onSuccess }) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (f) => {
    setError(null);
    if (!f) return;

    const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(f.type) && !f.name.endsWith('.pdf')) {
      setError('Invalid file format. Please upload a PDF or PNG/JPG image resume.');
      return;
    }

    if (f.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit.');
      return;
    }

    setFile(f);
  };

  const handleStartParsing = async () => {
    if (!file) return;

    setParsing(true);
    setError(null);

    try {
      const parsedData = await parseResumeFile(file, (msg, pct) => {
        setStatusMessage(msg);
        setProgress(pct);
      });

      if (onSuccess) {
        onSuccess(parsedData);
      }
      onClose();
    } catch (err) {
      console.error('Parsing error:', err);
      setError(err.message || 'Failed to parse resume file.');
    } finally {
      setParsing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FFFDF8] border-3 border-black p-6 rounded-2xl max-w-lg w-full shadow-brutal-lg space-y-6 animate-fadeIn relative">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-3 border-b-2 border-black">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-[#FFE600] border-2 border-black flex items-center justify-center text-black font-black text-xs shadow-[1.5px_1.5px_0px_0px_#000]">
              📄
            </div>
            <h3 className="font-heading font-black text-lg text-black">Upload Resume to Auto-Fill</h3>
          </div>
          <button
            onClick={onClose}
            disabled={parsing}
            className="p-1 text-slate-500 hover:text-black border border-black rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-[#FF70A6] border-2 border-black p-3 rounded-lg flex items-center space-x-2 text-xs font-bold text-black shadow-[2px_2px_0px_0px_#000]">
            <AlertCircle className="w-4 h-4 shrink-0 text-black" />
            <span>{error}</span>
          </div>
        )}

        {/* Parsing Progress Bar view */}
        {parsing ? (
          <div className="bg-white border-2 border-black p-6 rounded-xl space-y-4 shadow-[3px_3px_0px_0px_#000] text-center">
            <Loader2 className="w-10 h-10 animate-spin text-black mx-auto" />
            <div className="space-y-1">
              <h4 className="font-heading font-black text-sm text-black">{statusMessage}</h4>
              <p className="text-xs font-mono text-slate-500">Pipeline processing ({progress}%)</p>
            </div>
            <div className="w-full bg-slate-100 border border-black rounded-full h-3 overflow-hidden">
              <div
                className="bg-[#00FFA3] h-full transition-all duration-300 border-r border-black"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          /* Drag and Drop Zone */
          <div className="space-y-4">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-3 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-3 ${
                isDragging
                  ? 'bg-[#FFE600]/20 border-black scale-[0.99]'
                  : 'bg-white border-black/30 hover:border-black hover:bg-slate-50'
              }`}
              onClick={() => document.getElementById('resume-file-input').click()}
            >
              <input
                id="resume-file-input"
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileSelect}
                className="hidden"
              />

              <div className="w-12 h-12 rounded-xl bg-[#4DEEEA] border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_#000]">
                <Upload className="w-6 h-6" />
              </div>

              {file ? (
                <div className="space-y-1">
                  <div className="font-heading font-black text-sm text-black flex items-center justify-center gap-1.5">
                    <FileText className="w-4 h-4 text-slate-700" />
                    <span>{file.name}</span>
                  </div>
                  <p className="text-xs font-mono text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB • Ready</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <h4 className="font-heading font-black text-sm text-black">Drag & drop your resume PDF or Image</h4>
                  <p className="text-xs font-medium text-slate-500">Supports PDF, PNG, JPG (Max 5MB)</p>
                </div>
              )}
            </div>

            {/* Parse Action Button */}
            <button
              type="button"
              onClick={handleStartParsing}
              disabled={!file || parsing}
              className="w-full inline-flex items-center justify-center space-x-2 bg-[#FFE600] text-black font-heading font-black text-sm py-3.5 border-2 border-black rounded-xl shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Auto-Fill Portfolio with AI Engine 🚀</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
