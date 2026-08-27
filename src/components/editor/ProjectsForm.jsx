import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, Trash2, Link, Github, ChevronDown, ChevronUp, Code, Image, X } from 'lucide-react';

export default function ProjectsForm() {
  const { portfolio, updateChildItems } = usePortfolio();
  const [tagInputs, setTagInputs] = useState({}); // Stores active typing tag for each project ID

  if (!portfolio) return null;
  const projects = portfolio.projects || [];

  const handleUpdate = (id, field, value) => {
    const updated = projects.map((proj) => {
      if (proj.id === id) {
        return { ...proj, [field]: value };
      }
      return proj;
    });
    updateChildItems('projects', updated);
  };

  const handleAdd = () => {
    const newProj = {
      id: `temp-proj-${Date.now()}`,
      title: 'New Project',
      description: '',
      technologies: [],
      github_url: '',
      live_url: '',
      image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
      display_order: projects.length
    };
    updateChildItems('projects', [...projects, newProj]);
  };

  const handleDelete = (id) => {
    const filtered = projects.filter((proj) => proj.id !== id);
    updateChildItems('projects', filtered);
  };

  const moveItem = (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;
    const list = [...projects];
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;
    updateChildItems('projects', list);
  };

  // Tag Input Handlers
  const handleTagInputChange = (projId, value) => {
    setTagInputs(prev => ({ ...prev, [projId]: value }));
  };

  const handleAddTag = (projId) => {
    const tagText = tagInputs[projId]?.trim();
    if (!tagText) return;

    const proj = projects.find(p => p.id === projId);
    if (!proj) return;

    const currentTags = proj.technologies || [];
    if (!currentTags.includes(tagText)) {
      handleUpdate(projId, 'technologies', [...currentTags, tagText]);
    }

    setTagInputs(prev => ({ ...prev, [projId]: '' }));
  };

  const handleTagKeyDown = (projId, e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag(projId);
    }
  };

  const handleRemoveTag = (projId, tagToRemove) => {
    const proj = projects.find(p => p.id === projId);
    if (!proj) return;

    const currentTags = proj.technologies || [];
    handleUpdate(projId, 'technologies', currentTags.filter(t => t !== tagToRemove));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-heading font-semibold text-brand-light-text mb-1">Projects</h3>
          <p className="text-sm text-brand-light-muted">Showcase your technical projects with repo links and tech stacks.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center space-x-1 text-xs font-semibold px-3 py-1.5 bg-brand-light-primary text-white rounded-lg hover:bg-opacity-90 transition-all shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center p-8 bg-slate-50 border border-dashed border-brand-light-border rounded-xl">
          <Code className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-brand-light-muted">No projects added yet. Click "Add Project" to get started.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((proj, index) => (
            <div
              key={proj.id}
              className="bg-white border border-brand-light-border p-5 rounded-xl shadow-sm space-y-4 relative group"
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
                  disabled={index === projects.length - 1}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(proj.id)}
                  className="p-1 rounded-md text-red-400 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider flex items-center gap-1">
                    <Code className="w-3.5 h-3.5" /> Project Title
                  </label>
                  <input
                    type="text"
                    value={proj.title || ''}
                    onChange={(e) => handleUpdate(proj.id, 'title', e.target.value)}
                    placeholder="CloudIDE - Collaborative Web Editor"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider flex items-center gap-1">
                    <Image className="w-3.5 h-3.5" /> Cover Image URL
                  </label>
                  <input
                    type="url"
                    value={proj.image_url || ''}
                    onChange={(e) => handleUpdate(proj.id, 'image_url', e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider">Description</label>
                  <textarea
                    value={proj.description || ''}
                    onChange={(e) => handleUpdate(proj.id, 'description', e.target.value)}
                    placeholder="Describe what the project does, key features, and outcomes..."
                    rows={3}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider flex items-center gap-1">
                    <Github className="w-3.5 h-3.5" /> GitHub Repository URL
                  </label>
                  <input
                    type="url"
                    value={proj.github_url || ''}
                    onChange={(e) => handleUpdate(proj.id, 'github_url', e.target.value)}
                    placeholder="https://github.com/username/project"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider flex items-center gap-1">
                    <Link className="w-3.5 h-3.5" /> Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={proj.live_url || ''}
                    onChange={(e) => handleUpdate(proj.id, 'live_url', e.target.value)}
                    placeholder="https://project-demo.com"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
                  />
                </div>

                {/* Tech Stack tag-input */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-semibold text-brand-light-text uppercase tracking-wider block">Technologies / Tech Stack</label>
                  
                  {/* Render tag pills */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {(proj.technologies || []).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 rounded-full"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(proj.id, tag)}
                          className="text-slate-400 hover:text-slate-600 focus:outline-none"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Add Tag input */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={tagInputs[proj.id] || ''}
                      onChange={(e) => handleTagInputChange(proj.id, e.target.value)}
                      onKeyDown={(e) => handleTagKeyDown(proj.id, e)}
                      placeholder="Type a technology (e.g. React) and press Enter or comma"
                      className="flex-1 px-3.5 py-2 text-sm bg-white border border-brand-light-border rounded-lg focus:outline-none focus:border-brand-light-secondary transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddTag(proj.id)}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-brand-light-border rounded-lg text-xs font-semibold text-slate-700 transition-colors"
                    >
                      Add Tag
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
