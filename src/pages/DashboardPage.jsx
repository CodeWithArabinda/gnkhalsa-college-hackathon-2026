import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

import {
  LogOut,
  Save,
  Sparkles,
  Laptop,
  Smartphone,
  Copy,
  Check,
  Globe,
  Loader2,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  BookOpen
} from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, signOut, loading: authLoading } = useAuth();
  const {
    portfolio,
    loading: portfolioLoading,
    saving,
    error,
    fetchPortfolio,
    savePortfolio,
    loadDemoData,
    updateProfileFields
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('basic');
  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'mobile'
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success'|'error', message: string }

  // 1. Protection & Loading Redirect
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  // 2. Fetch User Portfolio
  useEffect(() => {
    if (user) {
      fetchPortfolio(user.id);
    }
  }, [user, fetchPortfolio]);

  const { score } = useReadiness(portfolio);

  if (authLoading || portfolioLoading || !portfolio) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 animate-spin text-brand-dark-primary mb-4" />
        <p className="text-sm font-mono text-slate-400">Loading StackFolio workspace...</p>
      </div>
    );
  }

  const handleSave = async () => {
    const res = await savePortfolio();
    if (res.success) {
      showToast('success', 'Workspace changes saved to database!');
    } else {
      showToast('error', `Failed to save changes: ${res.error}`);
    }
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const copyPublicLink = () => {
    const publicUrl = `${window.location.origin}/p/${portfolio.public_slug}`;
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast('success', 'Public portfolio URL copied to clipboard!');
  };

  const handlePublishToggle = () => {
    updateProfileFields({ is_published: !portfolio.is_published });
  };

  const handleTemplateChange = (e) => {
    updateProfileFields({ selected_template: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* NAVBAR */}
      <header className="bg-white border-b border-brand-light-border px-6 py-4 flex justify-between items-center shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-brand-light-primary text-white rounded-lg flex items-center justify-center font-black text-xl shadow-md">
            S
          </div>
          <span className="font-heading font-extrabold text-lg text-slate-900 tracking-tight">StackFolio</span>
        </div>

        {/* Score indicator short */}
        <div className="hidden sm:flex items-center space-x-3">
          <div className="text-xs font-semibold text-slate-500">Readiness Score:</div>
          <div className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono ${
            score >= 80 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
            score >= 50 ? 'bg-amber-50 text-amber-700 border border-amber-200' :
            'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {score}/100 {score >= 80 ? '🟢' : score >= 50 ? '🟡' : '🔴'}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm font-medium text-slate-700">
            {portfolio.profile_image_url ? (
              <img
                src={portfolio.profile_image_url}
                alt={portfolio.full_name}
                className="w-7 h-7 rounded-full object-cover border border-slate-200"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center">
                <User className="w-4 h-4 text-slate-500" />
              </div>
            )}
            <span className="hidden md:inline">{portfolio.full_name || 'My Profile'}</span>
          </div>
          <button
            onClick={() => signOut().then(() => navigate('/auth'))}
            className="flex items-center space-x-1.5 text-xs text-slate-500 hover:text-red-600 font-semibold px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* WORKSPACE CONTENT */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT PANEL: FORM EDITOR */}
        <section className="w-full lg:w-[50%] bg-white border-r border-brand-light-border flex flex-col overflow-y-auto p-6 space-y-6">
          
          {/* Readiness Card at top */}
          <ReadinessScoreCard portfolio={portfolio} />

          {/* Action Row */}
          <div className="flex flex-wrap gap-2 items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex items-center space-x-1.5 text-xs font-bold px-4 py-2 bg-brand-light-primary text-white rounded-lg hover:bg-opacity-90 transition-all shadow-sm disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
              <button
                type="button"
                onClick={loadDemoData}
                className="flex items-center space-x-1.5 text-xs font-bold px-4 py-2 bg-slate-100 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-200 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Try Demo Profile</span>
              </button>
            </div>

            {/* Publish Toggle */}
            <div className="flex items-center space-x-3 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide px-1">
                {portfolio.is_published ? 'Live' : 'Draft'}
              </span>
              <button
                type="button"
                onClick={handlePublishToggle}
                className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  portfolio.is_published ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    portfolio.is_published ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Stable URL display */}
          {portfolio.is_published && (
            <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-lg flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2 text-emerald-800">
                <Globe className="w-4 h-4 shrink-0 text-emerald-600" />
                <span className="font-medium truncate">
                  Live at: <span className="font-mono text-emerald-700">{window.location.origin}/p/{portfolio.public_slug}</span>
                </span>
              </div>
              <button
                onClick={copyPublicLink}
                className="p-1 rounded-md text-emerald-600 hover:bg-emerald-100 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          )}

          {/* Form Tabs */}
          <div className="border-b border-slate-200">
            <nav className="flex flex-wrap -mb-px gap-1">
              {[
                { id: 'basic', label: 'Basic Info', icon: User },
                { id: 'experience', label: 'Experience', icon: Briefcase },
                { id: 'education', label: 'Education', icon: GraduationCap },
                { id: 'projects', label: 'Projects', icon: Code },
                { id: 'skills', label: 'Skills', icon: Award },
                { id: 'achievements', label: 'Certificates', icon: BookOpen }
              ].map(tab => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-1.5 px-3 py-2.5 border-b-2 font-medium text-xs rounded-t-lg transition-all ${
                      active
                        ? 'border-brand-light-primary text-brand-light-primary bg-slate-50'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Panes */}
          <div className="flex-1 pb-10">
            {activeTab === 'basic' && <BasicInfoForm />}
            {activeTab === 'experience' && <ExperiencesForm />}
            {activeTab === 'education' && <EducationForm />}
            {activeTab === 'projects' && <ProjectsForm />}
            {activeTab === 'skills' && <SkillsForm />}
            {activeTab === 'achievements' && <AchievementsForm />}
          </div>

        </section>

        {/* RIGHT PANEL: LIVE PREVIEW CANVAS */}
        <section className="hidden lg:flex w-[50%] bg-slate-900 flex-col items-center justify-center p-6 border-l border-slate-800 relative">
          
          {/* Preview Canvas Top Controls */}
          <div className="absolute top-4 left-6 right-6 flex justify-between items-center z-10">
            
            {/* Template selector */}
            <div className="flex items-center space-x-2 bg-slate-800 p-1.5 rounded-lg border border-slate-700 text-xs">
              <span className="text-slate-400 font-medium">Template:</span>
              <select
                value={portfolio.selected_template || 'dark_developer'}
                onChange={handleTemplateChange}
                className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
              >
                <option value="dark_developer" className="bg-slate-800">Dark Developer</option>
                <option value="light_corporate" className="bg-slate-800">Light Corporate</option>
              </select>
            </div>

            {/* Desktop / Mobile Switcher */}
            <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
              <button
                type="button"
                onClick={() => setDeviceMode('desktop')}
                className={`p-1.5 rounded-md transition-colors ${
                  deviceMode === 'desktop' ? 'bg-brand-dark-primary text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Laptop className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode('mobile')}
                className={`p-1.5 rounded-md transition-colors ${
                  deviceMode === 'mobile' ? 'bg-brand-dark-primary text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Canvas Viewport Frame Wrapper */}
          <div className="w-full flex justify-center items-center h-full pt-12">
            <div
              className={`transition-all duration-300 overflow-hidden flex flex-col bg-slate-800 shadow-2xl relative ${
                deviceMode === 'desktop'
                  ? 'w-full max-w-[1280px] h-[90%] rounded-xl border border-slate-700'
                  : 'w-[320px] h-[580px] rounded-[36px] border-[8px] border-slate-950 shadow-black/80'
              }`}
            >
              {/* Simulated Mobile Notch */}
              {deviceMode === 'mobile' && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-950 rounded-b-xl z-20" />
              )}

              {/* Live Preview Placeholder Header */}
              <div className={`p-4 bg-slate-800/80 backdrop-blur-xs border-b border-slate-700/80 flex items-center space-x-2 text-xs text-slate-400 shrink-0 ${
                deviceMode === 'mobile' ? 'pt-6' : ''
              }`}>
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="font-mono pl-2 text-[10px]">
                  {portfolio.selected_template === 'dark_developer' ? 'Terminal: ~aarya/portfolio' : 'Corporate Profile Mode'}
                </span>
              </div>

              {/* Preview Content Area (To be replaced by TemplateRenderer in Phase 3) */}
              <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-300 p-6 font-mono text-xs space-y-4">
                <div className="border border-slate-700/50 p-3 rounded-lg bg-slate-900/50">
                  <div className="text-slate-400 font-bold uppercase tracking-wider mb-2 text-[9px]">// Preview Mode Placeholder</div>
                  <div className="text-slate-100 font-heading text-lg font-bold">{portfolio.full_name || 'Your Name'}</div>
                  <div className="text-brand-dark-primary font-heading font-medium">{portfolio.headline || 'Your Headline'}</div>
                  <div className="mt-2 text-[11px] text-slate-400 italic font-sans">{portfolio.bio || 'Your bio summary...'}</div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="border border-slate-700/50 p-3 rounded-lg bg-slate-900/50">
                    <span className="text-brand-dark-secondary font-bold text-[10px]">PROJECTS ({portfolio.projects?.length || 0})</span>
                    <ul className="list-disc pl-4 mt-2 space-y-1.5">
                      {(portfolio.projects || []).map((p, i) => (
                        <li key={p.id || i}>
                          <span className="text-slate-200 font-semibold">{p.title || 'Untitled'}</span>
                          <span className="text-slate-500 block text-[10px]">{p.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border border-slate-700/50 p-3 rounded-lg bg-slate-900/50">
                    <span className="text-brand-dark-secondary font-bold text-[10px]">SKILLS ({portfolio.skills?.length || 0})</span>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {(portfolio.skills || []).map((s, i) => (
                        <span key={s.id || i} className="px-1.5 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 rounded text-[10px]">
                          {s.name} ({s.level})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center text-[10px] text-slate-500 mt-4 font-sans">
                  Interactive template layout engine will compile here in Phase 3.
                </div>
              </div>

            </div>
          </div>

        </section>

      </div>

      {/* TOAST SYSTEM */}
      {toast && (
        <div className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg text-white font-medium text-xs z-50 transition-all flex items-center space-x-2 ${
          toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
        }`}>
          <span>{toast.message}</span>
        </div>
      )}

    </div>
  );
}
