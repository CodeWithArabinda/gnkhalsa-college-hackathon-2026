import React, { useRef } from "react";
import { useBuilder } from "../../context/BuilderContext";
import { User, Mail, MapPin, Briefcase, FileText, Image as ImageIcon, Trash2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../common/Icons";

export default function ProfileForm() {
  const { portfolio, updatePortfolioField } = useBuilder();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          updatePortfolioField("profile_image_url", reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Profile Photo & Quick Actions */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Avatar & Identity
        </h3>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            {portfolio.profile_image_url ? (
              <img
                src={portfolio.profile_image_url}
                alt={portfolio.full_name || "Profile"}
                className="h-24 w-24 rounded-2xl object-cover border-2 border-purple-500/40 shadow-lg"
              />
            ) : (
              <div className="h-24 w-24 rounded-2xl bg-slate-950 border-2 border-dashed border-slate-800 flex items-center justify-center text-slate-600">
                <User className="h-10 w-10" />
              </div>
            )}

            {portfolio.profile_image_url && (
              <button
                onClick={() => updatePortfolioField("profile_image_url", "")}
                className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-md transition-all"
                title="Remove Image"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            )}
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-md shadow-purple-600/20"
              >
                Upload Photo
              </button>
              <button
                type="button"
                onClick={() =>
                  updatePortfolioField(
                    "profile_image_url",
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
                  )
                }
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700"
              >
                Use Sample Avatar
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Recommended: Square JPG, PNG or WebP under 2MB.
            </p>
          </div>
        </div>
      </div>

      {/* Main Personal Info Grid */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-purple-400" /> Full Name
            </label>
            <input
              type="text"
              value={portfolio.full_name}
              onChange={(e) => updatePortfolioField("full_name", e.target.value)}
              placeholder="e.g. Nilesh Sharma"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5 text-purple-400" /> Headline / Role
            </label>
            <input
              type="text"
              value={portfolio.headline}
              onChange={(e) => updatePortfolioField("headline", e.target.value)}
              placeholder="e.g. Senior Full-Stack Architect & AI Specialist"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-purple-400" /> Email Address
            </label>
            <input
              type="email"
              value={portfolio.email}
              onChange={(e) => updatePortfolioField("email", e.target.value)}
              placeholder="e.g. nilesh@example.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-purple-400" /> Location / City
            </label>
            <input
              type="text"
              value={portfolio.location}
              onChange={(e) => updatePortfolioField("location", e.target.value)}
              placeholder="e.g. San Francisco, CA or Mumbai, India"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* Bio / Summary */}
        <div className="space-y-1.5 pt-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 text-purple-400" /> Bio / Professional Summary
          </label>
          <textarea
            rows={4}
            value={portfolio.bio}
            onChange={(e) => updatePortfolioField("bio", e.target.value)}
            placeholder="Write a concise overview of your background, architectural focus, and engineering passions..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-purple-500 transition-colors leading-relaxed"
          />
        </div>
      </div>

      {/* Online Links */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Online Presence & Profiles
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <GithubIcon className="h-3.5 w-3.5 text-purple-400" /> GitHub URL
            </label>
            <input
              type="url"
              value={portfolio.github_url}
              onChange={(e) => updatePortfolioField("github_url", e.target.value)}
              placeholder="https://github.com/username"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <LinkedinIcon className="h-3.5 w-3.5 text-purple-400" /> LinkedIn URL
            </label>
            <input
              type="url"
              value={portfolio.linkedin_url}
              onChange={(e) => updatePortfolioField("linkedin_url", e.target.value)}
              placeholder="https://linkedin.com/in/username"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
