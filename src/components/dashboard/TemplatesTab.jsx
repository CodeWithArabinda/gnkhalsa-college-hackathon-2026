import React, { useState } from 'react';
import { Check, Eye, X } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { TEMPLATE_LIST, TEMPLATE_REGISTRY } from '../../templates/PortfolioRenderer';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'developer', label: 'Developer & IDE' },
  { id: 'minimal', label: 'Bento & Minimal' },
  { id: 'brutalist', label: 'Creative & Brutalist' },
];

const BADGE_COLORS = {
  'COMMUNITY FAVORITE': 'bg-[#FFE600] text-black',
  'POPULAR': 'bg-[#FF70A6] text-black',
  'NEW': 'bg-[#4DEEEA] text-black',
  'ORIGINAL': 'bg-[#A8FF78] text-black',
};

export default function TemplatesTab() {
  const { portfolio, updateProfileFields, showToast } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState('all');
  const [previewTemplate, setPreviewTemplate] = useState(null);

  if (!portfolio) return null;

  const filteredTemplates = activeFilter === 'all'
    ? TEMPLATE_LIST
    : TEMPLATE_LIST.filter(t => {
        if (activeFilter === 'creative') return t.category === 'brutalist' || t.category === 'creative';
        if (activeFilter === 'brutalist') return t.category === 'brutalist' || t.category === 'creative';
        return t.category === activeFilter;
      });

  const handleApply = (templateId) => {
    updateProfileFields({ selected_template: templateId });
    showToast && showToast('success', `Template switched to "${TEMPLATE_REGISTRY[templateId]?.name}"!`);
  };

  const PreviewComponent = previewTemplate ? TEMPLATE_REGISTRY[previewTemplate]?.component : null;

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8 animate-fadeIn">

      {/* Catalog Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-[#0F172A]">
          Design Layout Templates
        </h1>
        <p className="font-hand text-xl text-slate-700 font-medium tracking-wide max-w-2xl">
          Select your layout aesthetic. Your parsed resume data automatically refits without losing changes or writing code.
        </p>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count = f.id === 'all'
            ? TEMPLATE_LIST.length
            : TEMPLATE_LIST.filter(t => {
                if (f.id === 'brutalist') return t.category === 'brutalist' || t.category === 'creative';
                return t.category === f.id;
              }).length;

          return (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 text-xs font-heading font-bold rounded-xl border-2 border-black transition-all ${
                activeFilter === f.id
                  ? 'bg-black text-white shadow-[2px_2px_0px_0px_#FFE600]'
                  : 'bg-white text-black hover:bg-slate-50 shadow-[2px_2px_0px_0px_#000]'
              }`}
            >
              {f.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Template Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const activeKey = (portfolio.selected_template || '').replace(/-/g, '_');
          const tKey = template.id.replace(/-/g, '_');
          const isActive = activeKey === tKey;
          const badgeColorClass = BADGE_COLORS[template.badge] || 'bg-slate-200 text-black';

          return (
            <div
              key={template.id}
              className={`bg-white border-3 border-black rounded-2xl overflow-hidden shadow-brutal hover:-translate-y-1 transition-all relative flex flex-col ${
                isActive ? 'ring-4 ring-[#FFE600] ring-offset-2' : ''
              }`}
            >
              {/* Active Indicator Badge */}
              {isActive && (
                <div className="absolute top-3 right-3 z-10 bg-[#00FFA3] text-black font-mono font-bold text-[10px] px-2.5 py-1 border border-black rounded-md shadow-[1.5px_1.5px_0px_0px_#000]">
                  ACTIVE TEMPLATE ✓
                </div>
              )}

              {/* Preview Frame */}
              <div
                className="h-40 border-b-3 border-black relative overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: template.bgPreview }}
              >
                {/* Mini Visual Preview */}
                <div className="w-[85%] h-[85%] rounded-lg overflow-hidden opacity-90" style={{ backgroundColor: template.bgPreview }}>
                  <div className="p-3 space-y-2 h-full flex flex-col justify-center">
                    {/* Simulated layout lines */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: template.accent }} />
                      <div className="flex-1 space-y-1">
                        <div className="h-2 rounded-full w-3/4" style={{ backgroundColor: template.accent, opacity: 0.6 }} />
                        <div className="h-1.5 rounded-full w-1/2 bg-gray-400 opacity-30" />
                      </div>
                    </div>
                    <div className="flex gap-1.5 pt-1">
                      <div className="h-10 flex-1 rounded" style={{ backgroundColor: template.accent, opacity: 0.15 }} />
                      <div className="h-10 flex-1 rounded" style={{ backgroundColor: template.accent, opacity: 0.1 }} />
                    </div>
                    <div className="flex gap-1 pt-0.5">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-3 w-10 rounded-full" style={{ backgroundColor: template.accent, opacity: 0.2 + i * 0.08 }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {/* Archetype + Popularity badges */}
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 text-[9px] font-mono font-bold border border-black rounded uppercase"
                      style={{ backgroundColor: template.accent, color: template.bgPreview === '#FFFFFF' || template.bgPreview === '#FAFAFA' || template.bgPreview === '#FFFDF8' ? '#000' : '#fff' }}
                    >
                      {template.archetype}
                    </span>
                    <span className={`px-2 py-0.5 text-[9px] font-mono font-bold border border-black rounded uppercase ${badgeColorClass}`}>
                      {template.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-lg text-[#0F172A]">{template.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{template.description}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2 border-t-2 border-black/10">
                  <button
                    type="button"
                    onClick={() => handleApply(template.id)}
                    disabled={isActive}
                    className={`flex-1 inline-flex items-center justify-center space-x-1.5 px-3 py-2 text-xs font-heading font-black border-2 border-black rounded-xl transition-all ${
                      isActive
                        ? 'bg-[#00FFA3] text-black cursor-default'
                        : 'bg-[#FFE600] text-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px]'
                    }`}
                  >
                    {isActive ? <><Check className="w-3.5 h-3.5" /><span>Applied</span></> : <span>Apply Template</span>}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(template.id)}
                    className="inline-flex items-center justify-center space-x-1 px-3 py-2 text-xs font-heading font-bold bg-white text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview ↗</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview Modal Overlay */}
      {previewTemplate && PreviewComponent && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl h-[85vh] bg-white rounded-2xl border-3 border-black shadow-brutal-lg overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-[#FFFDF8] border-b-3 border-black px-5 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <h3 className="font-heading font-black text-sm text-black">
                  Preview: {TEMPLATE_REGISTRY[previewTemplate]?.name}
                </h3>
                <span className="px-2 py-0.5 text-[9px] font-mono font-bold border border-black rounded uppercase bg-[#4DEEEA]">
                  {TEMPLATE_REGISTRY[previewTemplate]?.archetype}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleApply(previewTemplate);
                    setPreviewTemplate(null);
                  }}
                  className="px-4 py-1.5 text-xs font-heading font-black bg-[#FFE600] text-black border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                >
                  Apply This Template
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTemplate(null)}
                  className="p-1.5 text-slate-500 hover:text-black border-2 border-black rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Template Render */}
            <div className="flex-1 overflow-y-auto">
              <PreviewComponent portfolio={portfolio} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
