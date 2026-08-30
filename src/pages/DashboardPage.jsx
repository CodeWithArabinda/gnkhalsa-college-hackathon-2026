import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePortfolio } from '../context/PortfolioContext';

import AriaSiteGenerator from '../components/dashboard/AriaSiteGenerator';
import TemplateGallery from '../components/dashboard/TemplateGallery';
import AnalyticsTab from '../components/dashboard/AnalyticsTab';
import SettingsTab from '../components/dashboard/SettingsTab';
import ResumeUploadModal from '../components/parser/ResumeUploadModal';

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
  User,
  ChevronRight,
  Plus
} from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, signOut, loading: authLoading } = useAuth();
  const {
    portfolio,
    loading: portfolioLoading,
    fetchPortfolio,
    applyParsedResume,
    showToast
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
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center text-slate-900 font-sans">
        <Loader2 className="w-10 h-10 animate-spin text-[#0053ff] mb-4" />
        <p className="text-sm font-mono font-bold text-slate-500">Loading AI Studio Dashboard...</p>
      </div>
    );
  }

  const navItems = [
    { id: 'overview', label: 'AI Site Generator', icon: Sparkles },
    { id: 'studio', label: 'Portfolio Studio', icon: Edit3, isDirectRoute: true },
    { id: 'templates', label: 'Design Templates', icon: Palette },
    { id: 'parser', label: 'Upload Resume (AI)', icon: FileText, isAction: true },
    { id: 'analytics', label: 'Recruiter Analytics', icon: BarChart2 },
    { id: 'settings', label: 'Account Settings', icon: Settings }
  ];

  const displayName = portfolio.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Developer';
  const displayEmail = user?.email || 'kshitijpilankar@gmail.com';
  const userInitials = displayName.split(' ').map(n => n[0]).join('').toUpperCase() || 'KP';

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden font-sans text-slate-900 select-none">
      
      {/* 1. PERSISTENT LEFT SIDEBAR (Wix / ChatGPT Light Theme) */}
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col justify-between p-4 shrink-0 shadow-2xs z-30">
        
        <div className="space-y-6">
          {/* StackFolio Logo */}
          <Link to="/" className="flex items-center space-x-2.5 px-2 pt-1 group">
            <div className="w-8 h-8 rounded-xl bg-[#0053ff] text-white flex items-center justify-center font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
              SF
            </div>
            <span className="font-heading font-black text-lg tracking-tight text-slate-900">StackFolio</span>
            <span className="bg-blue-50 text-[#0053ff] font-mono font-bold text-[9px] px-1.5 py-0.5 border border-blue-200 rounded">
              AI
            </span>
          </Link>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;

              if (item.isAction) {
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIsUploadModalOpen(true)}
                    className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 font-bold text-xs shadow-xs transition-all text-slate-900 cursor-pointer"
                  >
                    <Icon className="w-4 h-4 text-slate-900" />
                    <span>{item.label}</span>
                  </button>
                );
              }

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
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-[#0053ff] font-bold border-r-2 border-[#0053ff] shadow-2xs'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#0053ff]' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Docked User Profile Card */}
        <div className="pt-3 border-t border-slate-200">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#0053ff] text-white font-extrabold flex items-center justify-center text-xs shadow-xs shrink-0">
                {userInitials}
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs text-slate-900 truncate">{displayName}</h4>
                <p className="text-[10px] text-slate-500 truncate">{displayEmail}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => signOut().then(() => navigate('/auth'))}
              className="p-1 text-slate-400 hover:text-red-600 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* 2. MAIN WORKSPACE CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#f8fafc]">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between z-10 shrink-0 shadow-2xs">
          
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-xs font-mono font-bold">
            <span className="text-slate-400">StackFolio</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Workspace</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#0053ff] uppercase font-extrabold bg-blue-50 px-2 py-0.5 border border-blue-200 rounded">
              {activeNav === 'overview' ? 'AI Site Generator' : activeNav}
            </span>
          </div>

          {/* Right Header Triggers */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => window.open('/preview', '_blank')}
              className="inline-flex items-center space-x-1.5 text-xs font-bold px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#0053ff]" />
              <span>Live Site ↗</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/studio')}
              className="inline-flex items-center space-x-1.5 text-xs font-extrabold px-4 py-1.5 bg-[#0053ff] hover:bg-[#0043cc] text-white rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Open Studio Editor</span>
            </button>
          </div>

        </header>

        {/* Dynamic Viewport */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-10">
          
          {/* Unified AI Generator + Template Showcase (Overview & Templates tabs) */}
          {(activeNav === 'overview' || activeNav === 'templates') && (
            <div className="space-y-4">
              <AriaSiteGenerator />
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
        onSuccess={applyParsedResume}
      />

    </div>
  );
}
