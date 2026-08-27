import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, Trash2, Calendar, BookOpen, ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';

export default function EducationForm() {
  const { portfolio, updateChildItems } = usePortfolio();

  if (!portfolio) return null;
  const education = portfolio.education || [];

  const handleUpdate = (id, field, value) => {
    const updated = education.map((edu) => {
      if (edu.id === id) {
        return { ...edu, [field]: value };
      }
      return edu;
    });
    updateChildItems('education', updated);
  };

  const handleAdd = () => {
    const newEdu = {
      id: `temp-edu-${Date.now()}`,
      institution: 'New University',
      degree: 'Bachelors Degree',
      field: '',
      start_year: '',
      end_year: '',
      description: '',
      display_order: education.length
    };
    updateChildItems('education', [...education, newEdu]);
  };

  const handleDelete = (id) => {
    const filtered = education.filter((edu) => edu.id !== id);
    updateChildItems('education', filtered);
  };

  const moveItem = (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= education.length) return;
    const list = [...education];
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;
    updateChildItems('education', list);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-heading font-semibold text-brand-light-text mb-1">Education</h3>
          <p className="text-sm text-brand-light-muted">Add your university degrees, colleges, or courses.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center space-x-1 text-xs font-semibold px-3 py-1.5 bg-brand-light-primary text-white rounded-lg hover:bg-opacity-90 transition-all shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Education</span>
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center p-8 bg-slate-50 border border-dashed border-brand-light-border rounded-xl">
          <GraduationCap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-brand-light-muted">No education entries added yet. Click "Add Education" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div
              key={edu.id}
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
                  disabled={index === education.length - 1}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(edu.id)}
                  className="p-1 rounded-md text-red-400 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> Institution / University
                  </label>
                  <input
                    type="text"
                    value={edu.institution || ''}
                    onChange={(e) => handleUpdate(edu.id, 'institution', e.target.value)}
                    placeholder="St. Xavier's College"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" /> Degree
                  </label>
                  <input
                    type="text"
                    value={edu.degree || ''}
                    onChange={(e) => handleUpdate(edu.id, 'degree', e.target.value)}
                    placeholder="Bachelor of Computer Applications (BCA)"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider">Field of Study</label>
                  <input
                    type="text"
                    value={edu.field || ''}
                    onChange={(e) => handleUpdate(edu.id, 'field', e.target.value)}
                    placeholder="Computer Science"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Start Year
                    </label>
                    <input
                      type="text"
                      value={edu.start_year || ''}
                      onChange={(e) => handleUpdate(edu.id, 'start_year', e.target.value)}
                      placeholder="2023"
                      className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> End Year
                    </label>
                    <input
                      type="text"
                      value={edu.end_year || ''}
                      onChange={(e) => handleUpdate(edu.id, 'end_year', e.target.value)}
                      placeholder="2026"
                      className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider">Description / Achievements</label>
                  <textarea
                    value={edu.description || ''}
                    onChange={(e) => handleUpdate(edu.id, 'description', e.target.value)}
                    placeholder="CGPA, major details, or graduation achievements..."
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
