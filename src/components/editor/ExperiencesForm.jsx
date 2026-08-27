import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, Trash2, Calendar, Briefcase, ChevronDown, ChevronUp, Building } from 'lucide-react';

export default function ExperiencesForm() {
  const { portfolio, updateChildItems } = usePortfolio();

  if (!portfolio) return null;
  const experiences = portfolio.experiences || [];

  const handleUpdate = (id, field, value) => {
    const updated = experiences.map((exp) => {
      if (exp.id === id) {
        return { ...exp, [field]: value };
      }
      return exp;
    });
    updateChildItems('experiences', updated);
  };

  const handleAdd = () => {
    const newExp = {
      id: `temp-exp-${Date.now()}`,
      company: 'New Company',
      role: 'Software Engineer',
      start_date: '',
      end_date: '',
      description: '',
      display_order: experiences.length
    };
    updateChildItems('experiences', [...experiences, newExp]);
  };

  const handleDelete = (id) => {
    const filtered = experiences.filter((exp) => exp.id !== id);
    updateChildItems('experiences', filtered);
  };

  const moveItem = (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= experiences.length) return;
    const list = [...experiences];
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;
    updateChildItems('experiences', list);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-heading font-semibold text-brand-light-text mb-1">Work Experience</h3>
          <p className="text-sm text-brand-light-muted">List internships, full-time positions, or open-source activities.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center space-x-1 text-xs font-semibold px-3 py-1.5 bg-brand-light-primary text-white rounded-lg hover:bg-opacity-90 transition-all shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Work</span>
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center p-8 bg-slate-50 border border-dashed border-brand-light-border rounded-xl">
          <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-brand-light-muted">No experience entries added yet. Click "Add Work" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
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
                  disabled={index === experiences.length - 1}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(exp.id)}
                  className="p-1 rounded-md text-red-400 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" /> Company Name
                  </label>
                  <input
                    type="text"
                    value={exp.company || ''}
                    onChange={(e) => handleUpdate(exp.id, 'company', e.target.value)}
                    placeholder="TechNexus Solutions"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" /> Job Title / Role
                  </label>
                  <input
                    type="text"
                    value={exp.role || ''}
                    onChange={(e) => handleUpdate(exp.id, 'role', e.target.value)}
                    placeholder="Frontend Developer Intern"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Start Date
                  </label>
                  <input
                    type="text"
                    value={exp.start_date || ''}
                    onChange={(e) => handleUpdate(exp.id, 'start_date', e.target.value)}
                    placeholder="June 2025"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> End Date (or "Present")
                  </label>
                  <input
                    type="text"
                    value={exp.end_date || ''}
                    onChange={(e) => handleUpdate(exp.id, 'end_date', e.target.value)}
                    placeholder="August 2025"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider">Description</label>
                  <textarea
                    value={exp.description || ''}
                    onChange={(e) => handleUpdate(exp.id, 'description', e.target.value)}
                    placeholder="Describe your achievements and tasks in this role..."
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
