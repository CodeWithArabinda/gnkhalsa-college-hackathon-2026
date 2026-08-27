import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, Trash2, Award, Sparkles } from 'lucide-react';

export default function SkillsForm() {
  const { portfolio, updateChildItems } = usePortfolio();
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Technical');
  const [newSkillLevel, setNewSkillLevel] = useState('Intermediate');

  if (!portfolio) return null;
  const skills = portfolio.skills || [];

  const handleAdd = (e) => {
    e.preventDefault();
    const cleanName = newSkillName.trim();
    if (!cleanName) return;

    // Prevent duplicate name inside the same category
    if (skills.some((s) => s.name.toLowerCase() === cleanName.toLowerCase() && s.category === newSkillCategory)) {
      alert('This skill already exists in this category.');
      return;
    }

    const newSkill = {
      id: `temp-skill-${Date.now()}`,
      name: cleanName,
      category: newSkillCategory,
      level: newSkillLevel,
      display_order: skills.length
    };

    updateChildItems('skills', [...skills, newSkill]);
    setNewSkillName('');
  };

  const handleDelete = (id) => {
    const filtered = skills.filter((s) => s.id !== id);
    updateChildItems('skills', filtered);
  };

  // Group skills by category for visual organization
  const categories = ['Technical', 'Soft Skills', 'Tools', 'Languages'];
  const groupedSkills = skills.reduce((acc, skill) => {
    const cat = skill.category || 'Technical';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-heading font-semibold text-brand-light-text mb-1">Skills</h3>
        <p className="text-sm text-brand-light-muted">Add your key technical competencies, tools, and soft skills.</p>
      </div>

      {/* Add Skill Form Inline */}
      <form onSubmit={handleAdd} className="bg-slate-50 p-4 rounded-xl border border-brand-light-border grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider block">Skill Name</label>
          <input
            type="text"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            placeholder="e.g. React, UI Design, Python"
            className="w-full px-3.5 py-1.5 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider block">Category</label>
          <select
            value={newSkillCategory}
            onChange={(e) => setNewSkillCategory(e.target.value)}
            className="w-full px-3.5 py-1.5 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider block">Proficiency</label>
          <select
            value={newSkillLevel}
            onChange={(e) => setNewSkillLevel(e.target.value)}
            className="w-full px-3.5 py-1.5 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
          >
            <option value="Expert">Expert</option>
            <option value="Advanced">Advanced</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Beginner">Beginner</option>
          </select>
        </div>

        <div className="sm:col-span-4 flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-1 text-xs font-semibold px-4 py-2 bg-brand-light-primary text-white rounded-lg hover:bg-opacity-90 transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Skill</span>
          </button>
        </div>
      </form>

      {/* Render grouped skills */}
      <div className="space-y-6">
        {categories.map((cat) => {
          const list = groupedSkills[cat] || [];
          if (list.length === 0) return null;

          return (
            <div key={cat} className="space-y-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-light-secondary" /> {cat}
              </h4>
              <div className="flex flex-wrap gap-2">
                {list.map((skill) => (
                  <div
                    key={skill.id}
                    className="inline-flex items-center space-x-2 px-3 py-1.5 bg-white border border-brand-light-border rounded-xl shadow-xs hover:border-slate-300 transition-colors"
                  >
                    <span className="text-sm font-medium text-brand-light-text">{skill.name}</span>
                    <span className="text-[10px] uppercase font-bold text-brand-light-muted tracking-wide px-1.5 py-0.5 bg-slate-100 rounded-md">
                      {skill.level}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDelete(skill.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {skills.length === 0 && (
          <div className="text-center p-8 bg-slate-50 border border-dashed border-brand-light-border rounded-xl">
            <Award className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-brand-light-muted">No skills added yet. Use the form above to add skills.</p>
          </div>
        )}
      </div>
    </div>
  );
}
