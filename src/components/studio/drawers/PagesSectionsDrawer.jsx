import React from 'react';
import { FileText, Eye, EyeOff, GripVertical, Copy, Trash2, X, Plus } from 'lucide-react';

export default function PagesSectionsDrawer({
  schema,
  onClose,
  onMoveBlock,
  onDuplicateBlock,
  onDeleteBlock
}) {
  const blocks = schema?.blocks || [];

  return (
    <div className="space-y-4 font-sans text-xs">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-md bg-[#0053ff] text-white flex items-center justify-center font-bold">
            <FileText className="w-4 h-4" />
          </div>
          <h3 className="font-heading font-extrabold text-sm text-slate-900">Pages & Sections</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-800 rounded-md hover:bg-slate-100"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        <p className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Active Page: Home
        </p>

        <div className="space-y-2">
          {blocks.map((block, idx) => {
            const sectionName = block.type.replace('Block', '');
            return (
              <div
                key={block.id}
                className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-all"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <GripVertical className="w-4 h-4 text-slate-400 cursor-grab shrink-0" />
                  <span className="font-bold text-slate-900 truncate">{sectionName} Section</span>
                </div>

                <div className="flex items-center space-x-1 shrink-0 text-slate-500">
                  <button
                    type="button"
                    onClick={() => onDuplicateBlock && onDuplicateBlock(idx)}
                    className="p-1 hover:bg-slate-200 rounded text-slate-700"
                    title="Duplicate section"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteBlock && onDeleteBlock(idx)}
                    className="p-1 hover:bg-red-50 text-red-500 rounded"
                    title="Delete section"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
