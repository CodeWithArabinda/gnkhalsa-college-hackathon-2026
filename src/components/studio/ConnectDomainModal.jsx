import React, { useState } from 'react';
import { ShieldCheck, Globe, CheckCircle2, Loader2, X, ExternalLink, Copy, AlertCircle } from 'lucide-react';

export default function ConnectDomainModal({ isOpen, onClose, connectedDomain, onSaveDomain }) {
  const [domainInput, setDomainInput] = useState(connectedDomain || 'kshitijpilankar.dev');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isOpen) return null;

  const handleVerify = () => {
    if (!domainInput.trim()) return;
    setIsVerifying(true);
    setIsSuccess(false);

    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);
      if (onSaveDomain) {
        onSaveDomain(domainInput.trim());
      }
    }, 1200);
  };

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 w-full max-w-lg space-y-5 shadow-2xl border border-slate-200 relative overflow-hidden font-sans">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 text-[#0053ff] flex items-center justify-center font-bold shadow-xs">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-slate-900">Connect Custom Domain</h3>
                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> SSL Included
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Link your domain directly to your StackFolio live site.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-800 block">Domain Name</label>
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-[#0053ff] focus-within:bg-white transition-colors">
            <span className="text-xs font-mono text-slate-400 font-bold mr-1">https://</span>
            <input
              type="text"
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              placeholder="yourname.dev or portfolio.com"
              className="w-full bg-transparent text-xs font-bold text-slate-900 outline-none placeholder-slate-400"
            />
          </div>
        </div>

        {/* DNS Table */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-extrabold text-slate-800">Required DNS Records</span>
            <span className="text-[11px] font-mono text-slate-500">Host Registrar: Namecheap / GoDaddy / Cloudflare</span>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse font-mono text-[11px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500">
                  <th className="p-2.5 font-bold">Type</th>
                  <th className="p-2.5 font-bold">Host</th>
                  <th className="p-2.5 font-bold">Value</th>
                  <th className="p-2.5 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                <tr>
                  <td className="p-2.5 font-bold text-[#0053ff]">CNAME</td>
                  <td className="p-2.5">www</td>
                  <td className="p-2.5 text-slate-600 truncate max-w-[140px]">cname.stackfolio.app</td>
                  <td className="p-2.5 text-right">
                    <button
                      type="button"
                      onClick={() => copyToClipboard('cname.stackfolio.app', 1)}
                      className="text-[10px] text-slate-500 hover:text-[#0053ff] font-sans font-bold"
                    >
                      {copiedIndex === 1 ? 'Copied ✓' : 'Copy'}
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-[#ff5100]">A</td>
                  <td className="p-2.5">@</td>
                  <td className="p-2.5 text-slate-600">76.76.21.21</td>
                  <td className="p-2.5 text-right">
                    <button
                      type="button"
                      onClick={() => copyToClipboard('76.76.21.21', 2)}
                      className="text-[10px] text-slate-500 hover:text-[#0053ff] font-sans font-bold"
                    >
                      {copiedIndex === 2 ? 'Copied ✓' : 'Copy'}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Verification Status Feedback */}
        {isSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center gap-2 text-emerald-800 text-xs font-medium animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>DNS Verified! Domain <strong>https://{domainInput}</strong> is connected with active SSL.</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleVerify}
            disabled={isVerifying || !domainInput.trim()}
            className="px-5 py-2.5 bg-[#0053ff] hover:bg-[#0043cc] disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Verifying DNS Records...</span>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Connected & Live</span>
              </>
            ) : (
              <span>Verify DNS & Link Domain</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
