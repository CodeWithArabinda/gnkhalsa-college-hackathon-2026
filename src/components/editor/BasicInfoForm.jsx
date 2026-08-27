import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { supabase } from '../../lib/supabaseClient';
import { Camera, Loader2, User, Mail, MapPin, Briefcase, Github, Linkedin } from 'lucide-react';

export default function BasicInfoForm() {
  const { portfolio, updateProfileFields } = usePortfolio();
  const [uploading, setUploading] = useState(false);

  if (!portfolio) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateProfileFields({ [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG/JPEG).');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB.');
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${portfolio.id}/avatar-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      updateProfileFields({ profile_image_url: publicUrl });
    } catch (err) {
      console.error('Image upload failed:', err);
      alert(err.message || 'Image upload failed. Make sure the "avatars" bucket exists and is public.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-heading font-semibold text-brand-light-text mb-1">Personal Details</h3>
        <p className="text-sm text-brand-light-muted">Update your general information and social accounts.</p>
      </div>

      {/* Profile Picture Upload Section */}
      <div className="flex items-center space-x-6 bg-slate-50 p-4 rounded-xl border border-brand-light-border">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-200 border-2 border-brand-light-border flex items-center justify-center relative">
            {portfolio.profile_image_url ? (
              <img
                src={portfolio.profile_image_url}
                alt={portfolio.full_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-slate-400" />
            )}
            {uploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              </div>
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full border border-brand-light-border shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
            <Camera className="w-4 h-4 text-slate-600" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={uploading}
            />
          </label>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-brand-light-text">Profile Photo</h4>
          <p className="text-xs text-brand-light-muted mb-2">PNG, JPG or GIF. Max 2MB.</p>
          <button
            type="button"
            onClick={() => updateProfileFields({ profile_image_url: '' })}
            className="text-xs text-red-600 hover:text-red-800 font-medium"
          >
            Remove photo
          </button>
        </div>
      </div>

      {/* Main Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider flex items-center gap-1">
            <User className="w-3.5 h-3.5" /> Full Name
          </label>
          <input
            type="text"
            name="full_name"
            value={portfolio.full_name || ''}
            onChange={handleChange}
            placeholder="Aarya Shah"
            className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5" /> Headline
          </label>
          <input
            type="text"
            name="headline"
            value={portfolio.headline || ''}
            onChange={handleChange}
            placeholder="Frontend Engineer & BCA Student | React Specialist"
            className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
          />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider">Bio</label>
          <textarea
            name="bio"
            value={portfolio.bio || ''}
            onChange={handleChange}
            placeholder="Write a brief professional summary about yourself..."
            rows={4}
            className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors resize-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider flex items-center gap-1">
            <Mail className="w-3.5 h-3.5" /> Contact Email
          </label>
          <input
            type="email"
            name="email"
            value={portfolio.email || ''}
            onChange={handleChange}
            placeholder="aarya.shah@email.com"
            className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> Location
          </label>
          <input
            type="text"
            name="location"
            value={portfolio.location || ''}
            onChange={handleChange}
            placeholder="Mumbai, India"
            className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider flex items-center gap-1">
            <Github className="w-3.5 h-3.5" /> GitHub Profile URL
          </label>
          <input
            type="url"
            name="github_url"
            value={portfolio.github_url || ''}
            onChange={handleChange}
            placeholder="https://github.com/username"
            className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider flex items-center gap-1">
            <Linkedin className="w-3.5 h-3.5" /> LinkedIn Profile URL
          </label>
          <input
            type="url"
            name="linkedin_url"
            value={portfolio.linkedin_url || ''}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
            className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
