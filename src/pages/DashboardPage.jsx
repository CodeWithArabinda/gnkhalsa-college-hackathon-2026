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
import LivePreviewContainer from '../components/preview/LivePreviewContainer';

import {
  LogOut,
  Save,
  Sparkles,
  Copy,
  Check,
  Globe,
  Loader2,
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
    updateProfileFields,
    toast,
    showToast
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('basic');
  const [copied, setCopied] = useState(false);

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

  const { score } = useReadiness(portfolio);

  if (authLoading || portfolioLoading || !portfolio) {
    return (
      <div className="min-h-screen bg-[#0F1117] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 animate-spin text-[#38BDF8] mb-4" />
        <p className="text-sm font-mono text-slate-400">Loading your brutal workspace...</p>
      </div>
    );
  }

  const handleSave = async () => {
    const res = await savePortfolio();
    if (res.success) {
      showToast('success', 'Changes synced successfully!');
    } else {
      showToast('error', `Save failed: ${res.error}`);
    }
  };


  const copyPublicLink = () => {
    const publicUrl = `${window.location.origin}/p/${portfolio.public_slug}`;
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast('success', 'Copied URL to clipboard!');
  };

  const handlePublishToggle = () => {
    updateProfileFields({ is_published: !portfolio.is_published });
  };

  const handleTemplateChange = (e) => {
    updateProfileFields({ selected_template: e.target.value });
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'achievements', label: 'Certificates', icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF8] flex flex-col font-sans text-[#0F172A]">
      
      {/* HEADER / NAVBAR */}
      <header className="bg-white border-b-3 border-black px-6 py-4 flex flex-col sm:flex-row gap-4 justify-between items-center z-10 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-[#FFE600] border-2 border-black rounded-lg flex items-center justify-center font-heading font-black text-xl shadow-[2px_2px_0px_0px_#000]">
            ⚡
          </div>
          <span className="font-heading font-extrabold text-2xl tracking-tight text-[#0F172A]">StackFolio</span>
        </div>

        {/* Action Center in header */}
        <div className="flex flex-wrap items-center gap-3">
          {/* User badge sticker */}
          <div className="flex items-center space-x-2 bg-white px-3 py-1 border-2 border-black rounded-md text-xs font-bold shadow-[2px_2px_0px_0px_#000]">
            {portfolio.profile_image_url ? (
              <img
                src={portfolio.profile_image_url}
                alt={portfolio.full_name}
                className="w-5 h-5 rounded-full object-cover border border-black"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center border border-black">
                <User className="w-3 h-3" />
              </div>
            )}
            <span>{portfolio.full_name || 'Owner'}</span>
          </div>

          <button
            onClick={() => signOut().then(() => navigate('/auth'))}
            className="flex items-center space-x-1.5 text-xs text-[#0F172A] font-extrabold bg-[#FF70A6] border-2 border-black rounded-lg px-3 py-1.5 shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* DASHBOARD SPLIT WORKSPACE */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT COLUMN: SCROLLABLE EDITOR */}
        <section className="w-full lg:w-[50%] bg-[#FFFDF8] border-r-3 border-black flex flex-col overflow-y-auto p-6 space-y-6">
          
          {/* Readiness Checklist indicator */}
          <ReadinessScoreCard portfolio={portfolio} />

          {/* Brutalist Button Controls row */}
          <div className="flex flex-wrap gap-3 items-center justify-between pb-4 border-b-2 border-black/10">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center space-x-1.5 text-xs font-black px-5 py-2.5 bg-[#FFE600] text-black border-2 border-black rounded-xl shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>{saving ? 'Syncing...' : 'Save Changes 💾'}</span>
              </button>
              <button
                type="button"
                onClick={loadDemoData}
                className="inline-flex items-center space-x-1.5 text-xs font-black px-5 py-2.5 bg-[#A8FF78] text-black border-2 border-black rounded-xl shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
              >
                <Sparkles className="w-4 h-4 text-slate-800" />
                <span>Try Demo Profile ★</span>
              </button>
            </div>

            {/* Publishing Slide Toggle widget */}
            <div className="flex items-center space-x-2.5 bg-white p-2 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000]">
              <span className="text-[10px] font-black font-mono text-slate-700 uppercase tracking-wider">
                {portfolio.is_published ? 'Published 🚀' : 'Draft 📝'}
              </span>
              <button
                type="button"
                onClick={handlePublishToggle}
                className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-black transition-colors duration-200 ease-in-out focus:outline-none ${
                  portfolio.is_published ? 'bg-[#00FFA3]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white border border-black shadow-sm ring-0 transition duration-200 ease-in-out ${
                    portfolio.is_published ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Shareable Link Indicator card */}
          {portfolio.is_published && (
            <div className="bg-[#4DEEEA] border-2 border-black p-3.5 rounded-xl flex items-center justify-between text-xs shadow-[2px_2px_0px_0px_#000]">
              <div className="flex items-center space-x-2 text-black">
                <Globe className="w-4 h-4 shrink-0 text-black" />
                <span className="font-mono font-bold truncate">
                  Live at: <span className="underline">{window.location.origin}/p/{portfolio.public_slug}</span>
                </span>
              </div>
              <button
                onClick={copyPublicLink}
                className="p-1.5 border border-black bg-white hover:bg-slate-50 rounded-md transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}

          {/* FOLDER-STYLE TABS */}
          <div className="relative">
            <nav className="flex flex-wrap border-b-2 border-black gap-1 z-10 relative">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-1.5 px-3.5 py-2.5 border-2 border-black font-heading font-black text-xs rounded-t-xl transition-all active:translate-y-[2px] active:translate-x-[2px] relative -mb-[2px] ${
                      active
                        ? 'bg-[#FFE600] border-b-transparent text-black z-20 shadow-none'
                        : 'bg-white text-slate-500 hover:text-black hover:border-b-black shadow-[2px_2px_0px_0px_#000]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* FOLDER CONTENT CONTAINER */}
          <div className="bg-white border-2 border-black p-6 rounded-b-2xl rounded-tr-2xl shadow-brutal flex-1 min-h-[400px]">
            <div className="animate-fadeIn">
              {activeTab === 'basic' && <BasicInfoForm />}
              {activeTab === 'experience' && <ExperiencesForm />}
              {activeTab === 'education' && <EducationForm />}
              {activeTab === 'projects' && <ProjectsForm />}
              {activeTab === 'skills' && <SkillsForm />}
              {activeTab === 'achievements' && <AchievementsForm />}
            </div>
          </div>

        </section>

        {/* RIGHT COLUMN: PREVIEW PANEL */}
        <section className="hidden lg:flex w-[50%] bg-[#0F1117] flex-col items-center justify-center p-6 border-l-3 border-black relative">
          <LivePreviewContainer
            portfolio={portfolio}
            onTemplateChange={handleTemplateChange}
          />
        </section>

      </div>

      {/* TOAST SYSTEM (Sticker popup) */}
      {toast && (
        <div className={`fixed bottom-6 right-6 px-4 py-3 border-2 border-black rounded-xl shadow-brutal text-black font-heading font-black text-xs z-50 animate-fadeIn ${
          toast.type === 'success' ? 'bg-[#A8FF78]' : 'bg-[#FF70A6]'
        }`}>
          <span>{toast.message}</span>
        </div>
      )}

    </div>
  );
}
