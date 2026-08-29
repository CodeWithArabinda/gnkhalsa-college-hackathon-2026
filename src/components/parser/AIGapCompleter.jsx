import React from 'react';
import { Sparkles, Edit3, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function AIGapCompleter({ onSwitchTab }) {
  const { portfolio, updateProfileFields, updateChildItems, showToast } = usePortfolio();

  if (!portfolio) return null;

  const gaps = [];

  if (!portfolio.profile_image_url) {
    gaps.push({
      id: 'avatar',
      tab: 'basic',
      title: 'Missing Profile Photo (+15 Pts)',
      desc: 'Recruiters are 70% more likely to view portfolios with professional avatar photos.',
      autoFill: () => {
        updateProfileFields({
          profile_image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
          avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
        });
        showToast && showToast('success', '✨ Added professional avatar photo!');
      }
    });
  }

  if (!portfolio.bio || portfolio.bio.length < 20) {
    gaps.push({
      id: 'bio',
      tab: 'basic',
      title: 'Short or Missing Bio Summary (+10 Pts)',
      desc: 'Add a concise summary explaining your technical background and career goals.',
      autoFill: () => {
        updateProfileFields({
          bio: 'Passionate software engineer building high-performance web applications with React, Vite, Supabase, and modern UI systems.'
        });
        showToast && showToast('success', '✨ Auto-generated professional bio!');
      }
    });
  }

  if (!portfolio.github_url || !portfolio.linkedin_url) {
    gaps.push({
      id: 'socials',
      tab: 'basic',
      title: 'Missing GitHub or LinkedIn Handles (+10 Pts)',
      desc: 'Provide social handles so hiring managers can verify open-source code and profile history.',
      autoFill: () => {
        updateProfileFields({
          github_url: portfolio.github_url || 'https://github.com/KshitijPilankar',
          linkedin_url: portfolio.linkedin_url || 'https://linkedin.com/in/kshitijpilankar'
        });
        showToast && showToast('success', '✨ Auto-filled developer social handles!');
      }
    });
  }

  const projectsWithoutDemos = (portfolio.projects || []).filter(p => !p.live_url || !p.github_url);
  if (projectsWithoutDemos.length > 0) {
    gaps.push({
      id: 'projects',
      tab: 'projects',
      title: 'Projects Missing Demo/Code Links (+15 Pts)',
      desc: `${projectsWithoutDemos.length} project(s) lack live URL links or repository links.`,
      autoFill: () => {
        const updatedProjects = (portfolio.projects || []).map(p => ({
          ...p,
          github_url: p.github_url || 'https://github.com/CodeWithArabinda/gnkhalsa-college-hackathon-2026',
          live_url: p.live_url || 'https://stackfolio.demo'
        }));
        updateChildItems('projects', updatedProjects);
        showToast && showToast('success', '✨ Added live demo URLs to all projects!');
      }
    });
  }

  if (gaps.length === 0) {
    return (
      <div className="bg-[#A8FF78] border-2 border-black p-4 rounded-xl shadow-[3px_3px_0px_0px_#000] flex items-center space-x-3 text-black">
        <CheckCircle2 className="w-6 h-6 text-black shrink-0" />
        <div className="text-xs font-bold font-mono">
          <span className="font-heading font-black text-sm block">100/100 Readiness Achieved! 🚀</span>
          Your portfolio contains all recruiter checklist requirements and is ready to share.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFE600] border-2 border-black p-4 rounded-xl shadow-brutal space-y-3 animate-fadeIn">
      <div className="flex justify-between items-center pb-2 border-b-2 border-black">
        <div className="flex items-center space-x-2 text-black font-heading font-black text-sm">
          <Sparkles className="w-4 h-4 text-black" />
          <span>AI Portfolio Gap Completer ({gaps.length} Actionable Items)</span>
        </div>
        <span className="px-2 py-0.5 bg-black text-white rounded text-[10px] font-mono font-bold">
          Rubric Assistant
        </span>
      </div>

      <div className="space-y-2.5">
        {gaps.map((gap) => (
          <div key={gap.id} className="bg-white border-2 border-black p-3 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[2px_2px_0px_0px_#000]">
            <div className="space-y-0.5">
              <h4 className="font-heading font-black text-xs text-black">{gap.title}</h4>
              <p className="text-[11px] font-medium text-slate-600 leading-tight">{gap.desc}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={gap.autoFill}
                className="inline-flex items-center space-x-1 px-2.5 py-1 bg-[#A8FF78] text-black border border-black rounded text-[10px] font-mono font-bold shadow-[1px_1px_0px_0px_#000] hover:bg-[#8aff54] transition-all"
              >
                <Sparkles className="w-3 h-3" />
                <span>✨ AI Auto-Fill</span>
              </button>
              <button
                type="button"
                onClick={() => onSwitchTab && onSwitchTab(gap.tab)}
                className="inline-flex items-center space-x-1 px-2.5 py-1 bg-white text-black border border-black rounded text-[10px] font-mono font-bold hover:bg-slate-100 transition-all"
              >
                <Edit3 className="w-3 h-3" />
                <span>✏️ Edit</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
