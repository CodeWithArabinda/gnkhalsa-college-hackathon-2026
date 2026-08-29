import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePortfolio } from '../context/PortfolioContext';
import useReadiness from '../hooks/useReadiness';
import BasicInfoForm from '../components/editor/BasicInfoForm';
import ExperiencesForm from '../components/editor/ExperiencesForm';
import EducationForm from '../components/editor/EducationForm';
import ProjectsForm from '../components/editor/ProjectsForm';
import SkillsForm from '../components/editor/SkillsForm';
import AchievementsForm from '../components/editor/AchievementsForm';
import ReadinessScoreCard from '../components/readiness/ReadinessScoreCard';
import LivePreviewContainer from '../components/preview/LivePreviewContainer';
import ResumeUploadModal from '../components/parser/ResumeUploadModal';
import AIGapCompleter from '../components/parser/AIGapCompleter';

import OverviewTab from '../components/dashboard/OverviewTab';
import TemplatesTab from '../components/dashboard/TemplatesTab';
import AnalyticsTab from '../components/dashboard/AnalyticsTab';
import SettingsTab from '../components/dashboard/SettingsTab';

import {
  Home,
  Edit3,
  FileText,
  Palette,
  BarChart2,
  Settings,
  LogOut,
  Save,
  Sparkles,
  Copy,
  Globe,
  Loader2,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  BookOpen,
  ChevronRight
} from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, signOut, loading: authLoading } = useAuth();
  const {
    portfolio,
    loading: portfolioLoading,
    saving,
    fetchPortfolio,
    savePortfolio,
    loadDemoData,
    applyParsedResume,
    updateProfileFields,
    showToast
  } = usePortfolio();

  // Navigation State
  const [activeNav, setActiveNav] = useState('overview'); // 'overview' | 'studio' | 'templates' | 'analytics' | 'settings'
  const [activeTab, setActiveTab] = useState('basic'); // 2-column editor tabs
  const [copied, setCopied] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // 1. Route Protection
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  // 2. Fetch Portfolio Data
  useEffect(() => {
    if (user) {
      fetchPortfolio(user.id);
    }
  }, [user, fetchPortfolio]);

  if (authLoading || portfolioLoading || !portfolio) {
    return (
      <div className="min-h-screen bg-[#0F1117] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 animate-spin text-[#38BDF8] mb-4" />
        <p className="text-sm font-mono text-slate-400">Loading your SaaS command center...</p>
      </div>
    );
  }

  const handleSave = async () => {
    const res = await savePortfolio();
    if (res.success) {
      showToast('success', 'Changes synced & persisted successfully!');
    } else {
      showToast('error', `Save failed: ${res.error}`);
    }
  };

  const copyPublicLink = () => {
    const publicUrl = `${window.location.origin}/p/${portfolio.public_slug || 'my-portfolio'}`;
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast('success', 'Copied URL to clipboard!');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'studio', label: 'Portfolio Studio', icon: Edit3 },
    { id: 'parser', label: 'AI Resume Parser', icon: FileText, isAction: true },
    { id: 'templates', label: 'Design Templates', icon: Palette },
    { id: 'analytics', label: 'Recruiter Analytics', icon: BarChart2 },
    { id: 'settings', label: 'Account Settings', icon: Settings }
  ];

  const editorTabs = [
    { id: 'basic', label: 'Basic Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'achievements', label: 'Certificates', icon: BookOpen }
  ];

  const displayName = portfolio.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Developer';
  const displayEmail = user?.email || 'guest@stackfolio.demo';

  return (
    <div className="flex h-screen w-full bg-[#FFFDF8] overflow-hidden font-sans text-[#0F172A]">
      
      {/* 1. PERSISTENT LEFT SIDEBAR */}
      <aside className="w-64 border-r-3 border-black bg-white flex flex-col justify-between p-4 shrink-0 shadow-[4px_0px_0px_0px_#000] z-20">
        
        {/* Top Section */}
        <div className="space-y-6">
          
          {/* Clickable Logo Navigation */}
          <Link to="/" className="flex items-center space-x-2 px-2 pt-1 group">
            <div className="w-8 h-8 bg-[#FFE600] border-2 border-black rounded-lg flex items-center justify-center font-heading font-black text-lg shadow-[2px_2px_0px_0px_#000] group-hover:rotate-6 transition-transform">
              ⚡
            </div>
            <span className="font-heading font-extrabold text-xl tracking-tight text-[#0F172A]">StackFolio</span>
            <span className="bg-[#FF70A6] text-black font-mono font-bold text-[9px] px-1.5 py-0.5 border border-black rounded shadow-[1px_1px_0px_0px_#000] rotate-[-2deg]">
              BETA
            </span>
          </Link>

          {/* Navigation Menu */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;

              if (item.isAction) {
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIsUploadModalOpen(true)}
                    className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl border-2 border-black bg-[#FFE600] font-heading font-bold text-xs shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all text-black"
                  >
                    <Icon className="w-4 h-4 text-black" />
                    <span>{item.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl border-2 font-heading font-bold text-xs transition-all ${
                    isActive
                      ? 'bg-black text-white border-black shadow-[2px_2px_0px_0px_#FFE600]'
                      : 'bg-transparent text-slate-700 border-transparent hover:bg-slate-100 hover:border-black/20'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#FFE600]' : 'text-slate-600'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile Widget (Wix / Gemini Style Footer) */}
        <div className="pt-4 border-t-2 border-black/10 space-y-3">
          <div className="bg-slate-50 border-2 border-black p-3 rounded-xl shadow-[2px_2px_0px_0px_#000] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 overflow-hidden">
                <div className="w-7 h-7 rounded-full bg-[#FFE600] border border-black flex items-center justify-center font-extrabold text-xs shrink-0">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-heading font-bold text-xs text-black truncate">{displayName}</h4>
                  <p className="text-[10px] font-mono text-slate-500 truncate">{displayEmail}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-black/10 text-[10px] font-mono font-bold">
              <span className="bg-[#4DEEEA] px-1.5 py-0.5 border border-black rounded text-black uppercase">
                FREE TIER
              </span>
              <button
                type="button"
                onClick={() => signOut().then(() => navigate('/auth'))}
                className="text-red-600 hover:text-red-800 flex items-center gap-0.5"
              >
                <LogOut className="w-3 h-3" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

      </aside>

      {/* 2. MAIN WORKSPACE AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* TOP HEADER BAR */}
        <header className="bg-white border-b-3 border-black px-6 py-3.5 flex flex-col sm:flex-row gap-3 justify-between items-center z-10 shrink-0">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 text-xs font-mono font-bold">
            <span className="text-slate-400">StackFolio</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Workspace</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-black uppercase font-extrabold bg-[#FFE600] px-2 py-0.5 border border-black rounded shadow-[1px_1px_0px_0px_#000]">
              {activeNav}
            </span>
          </div>

          {/* Center Public Link Pill */}
          <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1 border-2 border-black rounded-lg text-xs font-mono font-bold">
            <span className="text-slate-500">Public URL:</span>
            <span className="text-black">/p/{portfolio.public_slug || 'my-portfolio'}</span>
            <button
              onClick={copyPublicLink}
              className="p-1 hover:bg-slate-200 rounded transition-colors text-slate-600 hover:text-black"
              title="Copy Public Link"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center space-x-1.5 text-xs font-black px-4 py-2 bg-[#A8FF78] text-black border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>{saving ? 'Syncing...' : 'Save Changes 💾'}</span>
            </button>

            <button
              type="button"
              onClick={() => window.open(`/p/${portfolio.public_slug || 'my-portfolio'}`, '_blank')}
              className="inline-flex items-center space-x-1.5 text-xs font-black px-4 py-2 bg-[#FFE600] text-black border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>View Live Site ↗</span>
            </button>
          </div>
        </header>

        {/* TABBED VIEW RENDERER */}
        <main className="flex-1 overflow-hidden relative">
          
          {/* NAV TAB 1: OVERVIEW HUB */}
          {activeNav === 'overview' && (
            <div className="h-full overflow-y-auto">
              <OverviewTab
                onNavigate={(nav, tab) => {
                  setActiveNav(nav);
                  if (tab) setActiveTab(tab);
                }}
                onOpenUploadModal={() => setIsUploadModalOpen(true)}
              />
            </div>
          )}

          {/* NAV TAB 2: PORTFOLIO STUDIO (2-COLUMN EDITOR) */}
          {activeNav === 'studio' && (
            <div className="h-full flex flex-col lg:flex-row overflow-hidden">
              
              {/* Left Column: Scrollable Builder Forms */}
              <section className="w-full lg:w-[50%] bg-[#FFFDF8] border-r-3 border-black flex flex-col overflow-y-auto p-6 space-y-6">
                
                {/* Readiness Indicator */}
                <ReadinessScoreCard portfolio={portfolio} />

                {/* Quick Controls row */}
                <div className="flex flex-wrap gap-2 items-center justify-between pb-3 border-b-2 border-black/10">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(true)}
                    className="inline-flex items-center space-x-1.5 text-xs font-black px-4 py-2 bg-[#4DEEEA] text-black border-2 border-black rounded-xl shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                  >
                    <span>📄 Upload Resume to Auto-Fill</span>
                  </button>

                  <button
                    type="button"
                    onClick={loadDemoData}
                    className="inline-flex items-center space-x-1.5 text-xs font-black px-4 py-2 bg-[#A8FF78] text-black border-2 border-black rounded-xl shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-slate-800" />
                    <span>Try Demo Profile ★</span>
                  </button>
                </div>

                {/* AI Gap Completer */}
                <AIGapCompleter onSwitchTab={(tabId) => setActiveTab(tabId)} />

                {/* Folder-Style Tabs */}
                <div className="relative">
                  <nav className="flex flex-wrap border-b-2 border-black gap-1 z-10 relative">
                    {editorTabs.map((t) => {
                      const Icon = t.icon;
                      const isActive = activeTab === t.id;
                      return (
                        <button
                          key={t.id}
                          onClick={() => setActiveTab(t.id)}
                          className={`flex items-center space-x-1.5 px-3 py-2 text-xs font-extrabold rounded-t-lg border-2 border-b-0 border-black transition-all ${
                            isActive
                              ? 'bg-white text-black font-black translate-y-[2px] shadow-[0px_-2px_0px_0px_#FFE600]'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-black'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{t.label}</span>
                        </button>
                      );
                    })}
                  </nav>

                  <div className="bg-white border-2 border-black p-5 rounded-b-xl rounded-tr-xl shadow-[3px_3px_0px_0px_#000]">
                    {activeTab === 'basic' && <BasicInfoForm />}
                    {activeTab === 'experience' && <ExperiencesForm />}
                    {activeTab === 'education' && <EducationForm />}
                    {activeTab === 'projects' && <ProjectsForm />}
                    {activeTab === 'skills' && <SkillsForm />}
                    {activeTab === 'achievements' && <AchievementsForm />}
                  </div>
                </div>

              </section>

              {/* Right Column: Live Device Preview */}
              <section className="w-full lg:w-[50%] bg-[#0F1117] relative flex flex-col h-full overflow-hidden">
                <LivePreviewContainer
                  portfolio={portfolio}
                  onTemplateChange={(e) => updateProfileFields({ selected_template: e.target.value })}
                />
              </section>

            </div>
          )}

          {/* NAV TAB 3: DESIGN TEMPLATES */}
          {activeNav === 'templates' && (
            <div className="h-full overflow-y-auto">
              <TemplatesTab />
            </div>
          )}

          {/* NAV TAB 4: RECRUITER ANALYTICS */}
          {activeNav === 'analytics' && (
            <div className="h-full overflow-y-auto">
              <AnalyticsTab />
            </div>
          )}

          {/* NAV TAB 5: ACCOUNT SETTINGS */}
          {activeNav === 'settings' && (
            <div className="h-full overflow-y-auto">
              <SettingsTab />
            </div>
          )}

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
