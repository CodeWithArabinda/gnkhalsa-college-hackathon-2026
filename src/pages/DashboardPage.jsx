import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePortfolio } from '../context/PortfolioContext';

import AriaSiteGenerator from '../components/dashboard/AriaSiteGenerator';
import TemplateGallery from '../components/dashboard/TemplateGallery';
import AnalyticsTab from '../components/dashboard/AnalyticsTab';
import SettingsTab from '../components/dashboard/SettingsTab';
import ResumeUploadModal from '../components/parser/ResumeUploadModal';
import UserProfileDropup from '../components/studio/UserProfileDropup';

import {
  Sparkles,
  Edit3,
  FileText,
  Palette,
  BarChart2,
  Settings,
  LogOut,
  Globe,
  Loader2,
  ChevronRight,
  Play
} from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, signOut, loading: authLoading } = useAuth();
  const {
    portfolio,
    loading: portfolioLoading,
    fetchPortfolio,
    applyParsedResume
  } = usePortfolio();

  const [activeNav, setActiveNav] = useState('overview'); // 'overview' | 'templates' | 'analytics' | 'settings'
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchPortfolio(user.id);
    }
  }, [user, fetchPortfolio]);

  if (authLoading || portfolioLoading || !portfolio) {
    return (
      <div className="min-h-screen bg-white bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px] flex flex-col items-center justify-center text-slate-900 font-sans">
        <Loader2 className="w-10 h-10 animate-spin text-black mb-4" />
        <p className="text-sm font-mono font-extrabold text-black uppercase tracking-wider">Loading SaaS Dashboard...</p>
      </div>
    );
  }

  const navItems = [
    { id: 'overview', label: 'AI Site Generator', icon: Sparkles },
    { id: 'studio', label: 'Portfolio Studio', icon: Edit3, isDirectRoute: true },
    { id: 'templates', label: 'Design Templates', icon: Palette },
    { id: 'analytics', label: 'Recruiter Analytics', icon: BarChart2 },
    { id: 'settings', label: 'Account Settings', icon: Settings }
  ];

  const displayName = portfolio.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Developer';
  const displayEmail = user?.email || 'kshitijpilankar@gmail.com';
  const userInitials = displayName.split(' ').map(n => n[0]).join('').toUpperCase() || 'KP';

  const handleResumeSuccess = (data) => {
    if (data?.blocks) {
      localStorage.setItem('stackfolio_studio_schema', JSON.stringify(data));
      localStorage.setItem('stackfolio_studio_draft', JSON.stringify(data));
      localStorage.setItem('stackfolio_portfolio_schema', JSON.stringify(data));
      localStorage.setItem('stackfolio_just_generated', 'true');
      
      const heroBlock = data.blocks.find(b => b.type === 'HeroBlock');
      const contactBlock = data.blocks.find(b => b.type === 'ContactBlock');
      applyParsedResume({
        full_name: heroBlock?.content?.name || '',
        headline: heroBlock?.content?.headline || '',
        bio: heroBlock?.content?.bio || '',
        email: contactBlock?.content?.email || ''
      });
    } else {
      applyParsedResume(data);
    }
    setIsUploadModalOpen(false);
    navigate('/studio');
  };

  return (
    <div className="flex h-screen w-full bg-white bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px] overflow-hidden font-sans text-slate-900 select-none">
      
      {/* 1. PERSISTENT NEO-BRUTALIST LEFT SIDEBAR */}
      <aside className="w-[240px] bg-white border-r-[2.5px] border-black flex flex-col justify-between p-4 shrink-0 shadow-[4px_0px_0px_#000000] z-20">
        
        <div className="space-y-6">
          {/* Logo Header */}
          <Link to="/" className="flex items-center space-x-2 px-1 pt-1 group">
            <div className="w-8 h-8 bg-[#FFE600] border-2 border-black rounded-lg flex items-center justify-center font-heading font-black text-sm text-black shadow-[2px_2px_0px_#000000] group-hover:rotate-6 transition-transform">
              ⚡
            </div>
            <span className="font-heading font-black text-lg tracking-tight text-black">StackFolio</span>
            <span className="bg-pink-400 text-black font-mono font-black text-[9px] px-1.5 py-0.5 border border-black rounded shadow-[1.5px_1.5px_0px_#000000] rotate-[-2deg]">
              BETA
            </span>
          </Link>

          {/* Navigation Items */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    if (item.isDirectRoute) {
                      navigate('/studio');
                    } else {
                      setActiveNav(item.id);
                    }
                  }}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl border-2 font-black text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FFE600] text-black border-black shadow-[3px_3px_0px_#000000]'
                      : 'bg-transparent text-slate-800 border-transparent hover:border-black hover:bg-slate-50 hover:shadow-[2px_2px_0px_#000000]'
                  }`}
                >
                  <Icon className={`w-4 h-4 text-black`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile Card */}
        <UserProfileDropup onOpenSettings={() => setActiveNav('settings')} />

      </aside>

      {/* 2. MAIN WORKSPACE CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b-[2.5px] border-black px-6 py-3.5 flex items-center justify-between z-10 shrink-0 shadow-[0px_4px_0px_#000000]">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 text-xs font-mono font-bold">
            <span className="text-slate-500">StackFolio</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500">Workspace</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="bg-[#FFE600] text-black border-2 border-black font-black text-xs px-2.5 py-0.5 rounded shadow-[2px_2px_0px_#000000] uppercase">
              {activeNav === 'overview' ? 'AI SITE GENERATOR' : activeNav}
            </span>
          </div>

          {/* Right Header Triggers */}
          <div className="flex items-center space-x-3">
            {/* Model Status Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono text-cyan-400 select-none">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              ⚡ Gemini 2.5 Flash
            </div>

            <button
              type="button"
              onClick={() => window.open('/preview', '_blank')}
              className="inline-flex items-center space-x-1.5 text-xs font-black px-3.5 py-2 bg-white text-black border-2 border-black rounded-xl shadow-[2.5px_2.5px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-black" />
              <span>Live Site ↗</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/studio')}
              className="inline-flex items-center space-x-1.5 text-xs font-black px-4 py-2 bg-black text-white hover:bg-zinc-800 border-2 border-black rounded-xl shadow-[3px_3px_0px_#FFE600] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#FFE600]" />
              <span>Open Studio Editor</span>
            </button>
          </div>

        </header>

        {/* Dynamic Viewport */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 sm:p-10">
          
          {/* Unified AI Generator + Template Showcase (Overview & Templates tabs) */}
          {(activeNav === 'overview' || activeNav === 'templates') && (
            <div className="space-y-6">
              <AriaSiteGenerator onTriggerResumeUpload={() => setIsUploadModalOpen(true)} />
              <TemplateGallery />
            </div>
          )}

          {activeNav === 'analytics' && <AnalyticsTab />}
          {activeNav === 'settings' && <SettingsTab />}

        </main>

      </div>

      {/* RESUME UPLOAD MODAL */}
      <ResumeUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleResumeSuccess}
      />

    </div>
  );
}
