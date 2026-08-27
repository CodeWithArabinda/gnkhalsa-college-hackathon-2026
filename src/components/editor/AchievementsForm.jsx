import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, Trash2, Calendar, Trophy, ChevronDown, ChevronUp, Link, Award } from 'lucide-react';

export default function AchievementsForm() {
  const { portfolio, updateChildItems } = usePortfolio();

  if (!portfolio) return null;
  const achievements = portfolio.achievements || [];

  const handleUpdate = (id, field, value) => {
    const updated = achievements.map((ach) => {
      if (ach.id === id) {
        return { ...ach, [field]: value };
      }
      return ach;
    });
    updateChildItems('achievements', updated);
  };

  const handleAdd = () => {
    const newAch = {
      id: `temp-ach-${Date.now()}`,
      title: 'New Certificate / Honor',
      issuer: '',
      date: '',
      description: '',
      credential_url: '',
      display_order: achievements.length
    };
    updateChildItems('achievements', [...achievements, newAch]);
  };

  const handleDelete = (id) => {
    const filtered = achievements.filter((ach) => ach.id !== id);
    updateChildItems('achievements', filtered);
  };

  const moveItem = (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= achievements.length) return;
    const list = [...achievements];
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;
    updateChildItems('achievements', list);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-heading font-semibold text-brand-light-text mb-1">Achievements & Certifications</h3>
          <p className="text-sm text-brand-light-muted">Showcase certificates, awards, credentials, or honors.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center space-x-1 text-xs font-semibold px-3 py-1.5 bg-brand-light-primary text-white rounded-lg hover:bg-opacity-90 transition-all shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Achievement</span>
        </button>
      </div>

      {achievements.length === 0 ? (
        <div className="text-center p-8 bg-slate-50 border border-dashed border-brand-light-border rounded-xl">
          <Trophy className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-brand-light-muted">No achievements added yet. Click "Add Achievement" to start.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {achievements.map((ach, index) => (
            <div
              key={ach.id}
              className="bg-white border border-brand-light-border p-4 rounded-xl shadow-sm space-y-4 relative group"
            >
              {/* Card Controls */}
              <div className="absolute top-4 right-4 flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => moveItem(index, 'up')}
                  disabled={index === 0}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(index, 'down')}
                  disabled={index === achievements.length - 1}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(ach.id)}
                  className="p-1 rounded-md text-red-400 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5" /> Title / Name
                  </label>
                  <input
                    type="text"
                    value={ach.title || ''}
                    onChange={(e) => handleUpdate(ach.id, 'title', e.target.value)}
                    placeholder="e.g. AWS Certified Cloud Practitioner"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> Issuer / Organization
                  </label>
                  <input
                    type="text"
                    value={ach.issuer || ''}
                    onChange={(e) => handleUpdate(ach.id, 'issuer', e.target.value)}
                    placeholder="Amazon Web Services"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Issue Date
                  </label>
                  <input
                    type="text"
                    value={ach.date || ''}
                    onChange={(e) => handleUpdate(ach.id, 'date', e.target.value)}
                    placeholder="March 2025"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider flex items-center gap-1">
                    <Link className="w-3.5 h-3.5" /> Credential URL
                  </label>
                  <input
                    type="url"
                    value={ach.credential_url || ''}
                    onChange={(e) => handleUpdate(ach.id, 'credential_url', e.target.value)}
                    placeholder="https://aws.amazon.com/verification"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider">Description</label>
                  <textarea
                    value={ach.description || ''}
                    onChange={(e) => handleUpdate(ach.id, 'description', e.target.value)}
                    placeholder="Briefly describe what this credential validates or details about the award..."
                    rows={3}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
