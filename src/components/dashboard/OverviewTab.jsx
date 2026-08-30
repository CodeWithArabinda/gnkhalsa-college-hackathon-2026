import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight, Upload, Edit3, Palette, Globe, ShieldAlert, Award, Code, User, ExternalLink, Copy } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useAuth } from '../../context/AuthContext';

export default function OverviewTab({ onNavigate, onOpenUploadModal }) {
  const { portfolio, updateProfileFields, showToast } = usePortfolio();
  const { user } = useAuth();

  if (!portfolio) return null;

  const displayName = portfolio.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Developer';

  // Calculate onboarding steps
  const hasBasic = Boolean(portfolio.full_name && portfolio.bio);
  const hasProjects = Boolean(portfolio.projects && portfolio.projects.length >= 2);
  const hasSkills = Boolean(portfolio.skills && portfolio.skills.length >= 5);
  const hasPhoto = Boolean(portfolio.profile_image_url || portfolio.avatar_url);
  const hasPublished = Boolean(portfolio.is_published);

  const steps = [
    {
      id: 'basic',
      title: 'Upload Resume or Add Basic Details',
      desc: 'Add your full name, professional headline, and short bio.',
      completed: hasBasic,
      actionText: 'Upload Resume',
      onAction: () => onOpenUploadModal()
    },
    {
      id: 'projects',
      title: 'Add at least 2 Technical Projects with Repo Links',
      desc: 'Highlight software projects with live demo URLs or GitHub code links.',
      completed: hasProjects,
      actionText: 'Add Projects',
      onAction: () => onNavigate('studio', 'projects')
    },
    {
      id: 'skills',
      title: 'List 5+ Core Competencies & Tech Skills',
      desc: 'Include frameworks, programming languages, and developer tools.',
      completed: hasSkills,
      actionText: 'Add Skills',
      onAction: () => onNavigate('studio', 'skills')
    },
    {
      id: 'photo',
      title: 'Upload Avatar / Profile Photo',
      desc: 'Recruiters are 70% more likely to view portfolios with professional photos.',
      completed: hasPhoto,
      actionText: 'Upload Photo',
      onAction: () => onNavigate('studio', 'basic')
    },
    {
      id: 'publish',
      title: 'Publish & Claim Permanent Public URL',
      desc: 'Make your live portfolio shareable with recruiters on LinkedIn.',
      completed: hasPublished,
      actionText: 'View Live Site ↗',
      onAction: () => window.open(`/p/${portfolio.public_slug || 'my-portfolio'}`, '_blank')
    }
  ];

  const completedCount = steps.filter(s => s.completed).length;
  const progressPct = Math.round((completedCount / steps.length) * 100);

  const copyLink = () => {
    const publicUrl = `${window.location.origin}/p/${portfolio.public_slug || 'my-portfolio'}`;
    navigator.clipboard.writeText(publicUrl);
    showToast && showToast('success', 'Public URL copied to clipboard!');
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Greeting Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-[#0F172A]">
              Welcome back, {displayName} 👋
            </h1>
            <p className="font-hand text-xl text-slate-700 font-medium tracking-wide mt-1">
              Your recruitment portfolio SaaS command center.
            </p>
          </div>

          <button
            onClick={() => window.open(`/p/${portfolio.public_slug || 'my-portfolio'}`, '_blank')}
            className="inline-flex items-center space-x-2 bg-[#FFE600] text-black font-heading font-black text-sm px-5 py-2.5 border-2 border-black rounded-xl shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] transition-all shrink-0"
          >
            <span>View Live Portfolio ↗</span>
          </button>
        </div>

        {/* Status Bar */}
        <div className="bg-white border-2 border-black p-3.5 rounded-xl shadow-[3px_3px_0px_0px_#000] flex flex-wrap items-center justify-between gap-3 text-xs font-mono font-bold">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 bg-[#FF70A6] border border-black rounded text-[10px] font-black uppercase">
              Free Plan
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-700">Slug: /p/{portfolio.public_slug || 'my-portfolio'}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={copyLink}
              className="inline-flex items-center space-x-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-black border border-black rounded text-[11px] transition-all"
            >
              <Copy className="w-3 h-3" />
              <span>Copy Link</span>
            </button>
            <span className="px-2 py-0.5 bg-[#A8FF78] border border-black rounded text-[10px] font-black uppercase">
              {portfolio.is_published ? 'LIVE & PUBLIC 🟢' : 'DRAFT MODE 🟡'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Action Grid (2 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 2: Portfolio Studio */}
        <div
          onClick={() => onNavigate('studio')}
          className="bg-white border-3 border-black p-6 rounded-2xl shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#4DEEEA] border-2 border-black flex items-center justify-center text-black font-black shadow-[2px_2px_0px_0px_#000]">
            ✏️
          </div>
          <div>
            <h3 className="font-heading font-black text-lg text-[#0F172A]">Portfolio Studio</h3>
            <p className="font-hand text-base text-slate-700 leading-tight mt-1">
              Open the 2-column live editor with form tabs and real-time preview canvas.
            </p>
          </div>
          <div className="pt-2 flex items-center text-xs font-mono font-bold text-black group-hover:translate-x-1 transition-transform">
            <span>Open Studio</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Card 3: Switch Template */}
        <div
          onClick={() => onNavigate('templates')}
          className="bg-white border-3 border-black p-6 rounded-2xl shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#A8FF78] border-2 border-black flex items-center justify-center text-black font-black shadow-[2px_2px_0px_0px_#000]">
            🎨
          </div>
          <div>
            <h3 className="font-heading font-black text-lg text-[#0F172A]">Design Templates</h3>
            <p className="font-hand text-base text-slate-700 leading-tight mt-1">
              Toggle between Dark Developer obsidian terminal and Light Corporate templates.
            </p>
          </div>
          <div className="pt-2 flex items-center text-xs font-mono font-bold text-black group-hover:translate-x-1 transition-transform">
            <span>Choose Theme</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>

      </div>

      {/* Wix-Style Interactive Onboarding Checklist Card */}
      <div className="bg-white border-3 border-black p-6 md:p-8 rounded-3xl shadow-brutal-lg space-y-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b-2 border-black">
          <div>
            <h2 className="text-2xl font-heading font-extrabold text-[#0F172A]">
              Let's set up your portfolio
            </h2>
            <p className="text-xs font-mono font-bold text-slate-500 mt-0.5">
              Complete these steps to maximize recruiter engagement.
            </p>
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <span className="text-xs font-mono font-extrabold text-black shrink-0">
              {completedCount}/{steps.length} completed ({progressPct}%)
            </span>
            <div className="w-32 bg-slate-100 border border-black rounded-full h-3 overflow-hidden">
              <div
                className="bg-[#00FFA3] h-full transition-all duration-300 border-r border-black"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-3">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              className={`p-4 rounded-xl border-2 border-black transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                step.completed ? 'bg-slate-50 opacity-90' : 'bg-white shadow-[2px_2px_0px_0px_#000]'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="pt-0.5">
                  {step.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center font-mono text-[10px] font-black bg-white">
                      {idx + 1}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className={`font-heading font-bold text-sm text-[#0F172A] ${step.completed ? 'line-through text-slate-500' : ''}`}>
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">{step.desc}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={step.onAction}
                className={`px-3.5 py-1.5 border border-black rounded-lg text-xs font-mono font-bold shrink-0 transition-all ${
                  step.completed
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    : 'bg-[#FFE600] text-black shadow-[1.5px_1.5px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px]'
                }`}
              >
                {step.actionText}
              </button>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
