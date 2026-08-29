import React from 'react';
import { Eye, MousePointerClick, Award, TrendingUp } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function AnalyticsTab() {
  const { portfolio } = usePortfolio();

  if (!portfolio) return null;

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-[#0F172A]">Recruiter Analytics & Engagement</h1>
        <p className="font-hand text-xl text-slate-700 font-medium tracking-wide mt-1">
          Track hiring manager visits, duration, and project link clicks.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border-2 border-black p-5 rounded-2xl shadow-[3px_3px_0px_0px_#000] font-mono space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase">Total Views</span>
            <Eye className="w-4 h-4 text-black" />
          </div>
          <div className="text-3xl font-black text-black">142</div>
          <p className="text-[10px] text-emerald-600 font-bold">+18% this week</p>
        </div>

        <div className="bg-white border-2 border-black p-5 rounded-2xl shadow-[3px_3px_0px_0px_#000] font-mono space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase">Link Clicks</span>
            <MousePointerClick className="w-4 h-4 text-black" />
          </div>
          <div className="text-3xl font-black text-black">38</div>
          <p className="text-[10px] text-emerald-600 font-bold">GitHub & Demos</p>
        </div>

        <div className="bg-white border-2 border-black p-5 rounded-2xl shadow-[3px_3px_0px_0px_#000] font-mono space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase">Avg Duration</span>
            <TrendingUp className="w-4 h-4 text-black" />
          </div>
          <div className="text-3xl font-black text-black">2m 45s</div>
          <p className="text-[10px] text-slate-500 font-bold">Recruiter Session</p>
        </div>

        <div className="bg-white border-2 border-black p-5 rounded-2xl shadow-[3px_3px_0px_0px_#000] font-mono space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase">Readiness</span>
            <Award className="w-4 h-4 text-black" />
          </div>
          <div className="text-3xl font-black text-black">100/100</div>
          <p className="text-[10px] text-emerald-600 font-bold">Optimal Score</p>
        </div>
      </div>

      {/* Visitor Geography / Activity Logs */}
      <div className="bg-white border-3 border-black p-6 rounded-2xl shadow-brutal space-y-4">
        <h3 className="font-heading font-black text-lg text-black">Recent Recruiter Activity</h3>
        <div className="space-y-2.5 font-mono text-xs">
          <div className="p-3 bg-slate-50 border border-black rounded-lg flex justify-between items-center">
            <span>Recruiter from Tech Corp (Mumbai, IN) viewed /p/{portfolio.public_slug || 'my-portfolio'}</span>
            <span className="text-slate-500 text-[10px]">2 mins ago</span>
          </div>
          <div className="p-3 bg-slate-50 border border-black rounded-lg flex justify-between items-center">
            <span>Clicked GitHub Link: BUY-N-SELL Repo</span>
            <span className="text-slate-500 text-[10px]">14 mins ago</span>
          </div>
          <div className="p-3 bg-slate-50 border border-black rounded-lg flex justify-between items-center">
            <span>Recruiter from Bangalore viewed portfolio live demo</span>
            <span className="text-slate-500 text-[10px]">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
