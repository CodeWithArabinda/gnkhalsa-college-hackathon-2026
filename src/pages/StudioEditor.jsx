import React, { useState, useEffect } from 'react';
import StudioNavbar from '../components/studio/StudioNavbar';
import StudioToolbar from '../components/studio/StudioToolbar';
import LeftSidebar from '../components/studio/LeftSidebar';
import CanvasPreview from '../components/studio/CanvasPreview';
import CopilotChat from '../components/studio/CopilotChat';
import StudioSettingsModal from '../components/studio/StudioSettingsModal';
import ConnectDomainModal from '../components/studio/ConnectDomainModal';
import { useStudioTheme } from '../context/ThemeContext';
import { initialPortfolioSchema } from '../types/schema';
import { generatePortfolioSchema, processUserPrompt, morphSchemaArchetype } from '../lib/geminiBuilder';

export default function StudioEditor() {
  const { studioTheme } = useStudioTheme();
  const [deviceMode, setDeviceMode] = useState('desktop');
  const [selectedElement, setSelectedElement] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveStatus, setSaveStatus] = useState('saved');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDomainModalOpen, setIsDomainModalOpen] = useState(false);

  // History Stack (past, present, future) with LocalStorage restoration
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('stackfolio_studio_draft');
      if (saved) {
        return { past: [], present: JSON.parse(saved), future: [] };
      }
    } catch (e) {}
    return { past: [], present: initialPortfolioSchema, future: [] };
  });

  const schema = history.present;

  // Hydrate freshly generated AI schema on mount
  useEffect(() => {
    const justGenerated = localStorage.getItem('stackfolio_just_generated');
    if (justGenerated === 'true') {
      localStorage.removeItem('stackfolio_just_generated');
      try {
        const savedSchema = localStorage.getItem('stackfolio_portfolio_schema') || localStorage.getItem('stackfolio_studio_draft');
        if (savedSchema) {
          setHistory({ past: [], present: JSON.parse(savedSchema), future: [] });
        }
      } catch (e) {
        console.error("Schema hydration error:", e);
      }
    }
  }, []);

  // Push new state snapshot to history stack
  const updateSchemaState = (newSchemaOrFn) => {
    setSaveStatus('saving');
    setHistory((prev) => {
      const nextPresent = typeof newSchemaOrFn === 'function' ? newSchemaOrFn(prev.present) : newSchemaOrFn;
      const updatedPast = [...prev.past, prev.present].slice(-30);
      return {
        past: updatedPast,
        present: nextPresent,
        future: []
      };
    });
  };

  // Undo
  const handleUndo = () => {
    setHistory((prev) => {
      if (prev.past.length === 0) return prev;
      const previous = prev.past[prev.past.length - 1];
      const newPast = prev.past.slice(0, prev.past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [prev.present, ...prev.future]
      };
    });
  };

  // Redo
  const handleRedo = () => {
    setHistory((prev) => {
      if (prev.future.length === 0) return prev;
      const next = prev.future[0];
      const newFuture = prev.future.slice(1);
      return {
        past: [...prev.past, prev.present],
        present: next,
        future: newFuture
      };
    });
  };

  // Reset to default
  const handleResetDefault = () => {
    if (window.confirm("Reset portfolio draft to default? This will clear local edits.")) {
      updateSchemaState(initialPortfolioSchema);
      localStorage.removeItem('stackfolio_studio_draft');
    }
  };

  // Keyboard Shortcuts (Ctrl+Z / Cmd+Z, Ctrl+Y / Cmd+Shift+Z)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [history]);

  // Debounced Autosave (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem('stackfolio_studio_draft', JSON.stringify(schema));
        setSaveStatus('saved');
      } catch (e) {
        console.error("Autosave error:", e);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [schema]);

  // Connect Custom Domain handler
  const handleConnectDomain = (domain) => {
    updateSchemaState((prev) => ({
      ...prev,
      metadata: {
        ...(prev.metadata || {}),
        customDomain: domain
      }
    }));
  };

  // Element level property updates
  const handleUpdateElementStyle = (elementKey, newStyle) => {
    updateSchemaState((prev) => {
      const prevElementStyles = prev.elementStyles || {};
      const current = prevElementStyles[elementKey] || {};
      return {
        ...prev,
        elementStyles: {
          ...prevElementStyles,
          [elementKey]: typeof newStyle === 'function' ? newStyle(current) : { ...current, ...newStyle }
        }
      };
    });
  };

  // Granular Block content mutation
  const handleUpdateBlock = (blockId, fieldPath, value) => {
    updateSchemaState((prev) => {
      const updatedBlocks = prev.blocks.map((block) => {
        if (block.id !== blockId) return block;

        const pathParts = fieldPath.split('.');
        if (pathParts.length === 1) {
          return { ...block, [fieldPath]: value };
        } else if (pathParts.length === 2 && pathParts[0] === 'content') {
          return {
            ...block,
            content: {
              ...block.content,
              [pathParts[1]]: value
            }
          };
        }
        return block;
      });

      return { ...prev, blocks: updatedBlocks };
    });
  };

  // Add new component to schema
  const handleAddElement = (type) => {
    updateSchemaState((prev) => {
      const newBlockId = `block-${Date.now()}`;

      if (type === 'text') {
        const newBlock = {
          id: newBlockId,
          type: 'HeroBlock',
          content: {
            name: "Engineering Digital Excellence",
            headline: "✨ Custom Highlight",
            bio: "Add your customized paragraph content here directly on the interactive studio canvas.",
            ctaText: "Get Started",
            secondaryCta: "Learn More"
          }
        };
        return { ...prev, blocks: [...prev.blocks, newBlock] };
      } else if (type === 'project') {
        const projectBlock = prev.blocks.find(b => b.type === 'ProjectGridBlock');
        if (projectBlock) {
          const newItem = {
            id: `p-${Date.now()}`,
            title: "New AI Project",
            description: "Fullstack web application powered by Gemini and Vite.",
            tags: ["React", "AI", "Tailwind"],
            link: "https://github.com"
          };
          const updatedBlocks = prev.blocks.map(b => b.id === projectBlock.id ? {
            ...b,
            content: { ...b.content, items: [...(b.content.items || []), newItem] }
          } : b);
          return { ...prev, blocks: updatedBlocks };
        }
      } else if (type === 'skill') {
        const skillBlock = prev.blocks.find(b => b.type === 'SkillsBlock');
        if (skillBlock) {
          const updatedCategories = (skillBlock.content?.categories || []).map((cat, i) => i === 0 ? {
            ...cat,
            skills: [...(cat.skills || []), "GraphQL"]
          } : cat);
          const updatedBlocks = prev.blocks.map(b => b.id === skillBlock.id ? {
            ...b,
            content: { ...b.content, categories: updatedCategories }
          } : b);
          return { ...prev, blocks: updatedBlocks };
        }
      }
      return prev;
    });
  };

  // Block Reordering & Deletion
  const handleMoveBlock = (index, direction) => {
    updateSchemaState((prev) => {
      const newBlocks = [...prev.blocks];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newBlocks.length) return prev;
      const [moved] = newBlocks.splice(index, 1);
      newBlocks.splice(targetIndex, 0, moved);
      return { ...prev, blocks: newBlocks };
    });
  };

  const handleDuplicateBlock = (index) => {
    updateSchemaState((prev) => {
      const newBlocks = [...prev.blocks];
      const dup = JSON.parse(JSON.stringify(newBlocks[index]));
      dup.id = `${dup.id}-copy-${Date.now()}`;
      newBlocks.splice(index + 1, 0, dup);
      return { ...prev, blocks: newBlocks };
    });
  };

  const handleDeleteBlock = (index) => {
    updateSchemaState((prev) => {
      const newBlocks = [...prev.blocks];
      newBlocks.splice(index, 1);
      return { ...prev, blocks: newBlocks };
    });
  };

  // Replace Avatar / Hero image
  const handleReplaceImage = (newUrlOrData) => {
    updateSchemaState((prev) => {
      const heroBlock = prev.blocks.find(b => b.type === 'HeroBlock');
      if (!heroBlock) return prev;

      const updatedBlocks = prev.blocks.map(b => b.id === heroBlock.id ? {
        ...b,
        content: { ...b.content, avatarUrl: newUrlOrData }
      } : b);

      return { ...prev, blocks: updatedBlocks };
    });
  };

  // Aria AI Polish
  const handlePolishWithAI = async (elementContext) => {
    setIsGenerating(true);
    try {
      const prompt = `Polish and improve the messaging for component type ${elementContext?.type || 'headline'} to sound senior, high-impact, and recruiter-ready.`;
      const aiResponse = await processUserPrompt(prompt, schema);
      if (aiResponse?.schema) {
        updateSchemaState(aiResponse.schema);
      }
    } catch (err) {
      console.error("Aria polish error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Gemini Prompts
  const handleApplyPrompt = async (userPrompt) => {
    setIsGenerating(true);
    try {
      const aiResult = await processUserPrompt(userPrompt, schema);
      if (aiResult?.schema) {
        updateSchemaState(aiResult.schema);
      }
    } catch (err) {
      console.error("Gemini build error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Publish / Export Schema
  const handlePublish = () => {
    const jsonStr = JSON.stringify(schema, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-schema-${schema?.metadata?.slug || 'export'}.json`;
    a.click();
    URL.revokeObjectURL(a);
  };

  const currentSelectedStyle = selectedElement?.key
    ? (schema.elementStyles && schema.elementStyles[selectedElement.key]) || {}
    : {};

  return (
    <div className="h-screen w-screen flex flex-col font-sans overflow-hidden select-none bg-[#f0f2f5] text-slate-900">
      
      {/* Top Main Navigation (Wix Harmony Header) */}
      <StudioNavbar
        deviceMode={deviceMode}
        setDeviceMode={setDeviceMode}
        onPublish={handlePublish}
        onUndo={handleUndo}
        canUndo={history.past.length > 0}
        onRedo={handleRedo}
        canRedo={history.future.length > 0}
        saveStatus={saveStatus}
        onResetDefault={handleResetDefault}
        onMorphArchetype={(target) => updateSchemaState(morphSchemaArchetype(schema, target))}
      />

      {/* Main Studio Workspace: 230px Left Sidebar + Center Canvas + 332px Right Copilot */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Gemini / ChatGPT Style 230px Labeled Left Sidebar with Docked Profile Bottom Card */}
        <LeftSidebar
          schema={schema}
          onAddElement={handleAddElement}
          onReplaceImage={handleReplaceImage}
          onMoveBlock={handleMoveBlock}
          onDuplicateBlock={handleDuplicateBlock}
          onDeleteBlock={handleDeleteBlock}
          onOpenSettings={() => setIsSettingsOpen(true)}
          selectedElement={selectedElement}
        />

        {/* Center Canvas Workspace with Floating Action Capsule Ribbon */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
          
          {/* Floating Action Capsule Ribbon */}
          <StudioToolbar
            selectedElement={selectedElement}
            elementStyle={currentSelectedStyle}
            onUpdateElementStyle={(prop, val) => {
              if (selectedElement?.key) {
                handleUpdateElementStyle(selectedElement.key, { [prop]: val });
              }
            }}
            onAddElement={handleAddElement}
            onAskAria={(elem) => handlePolishWithAI(elem)}
            onReplaceImage={handleReplaceImage}
            onAddLink={() => window.prompt("Enter custom link URL:", "https://github.com")}
            onDeleteSelected={() => {
              if (selectedElement && selectedElement.blockIndex !== undefined) {
                handleDeleteBlock(selectedElement.blockIndex);
                setSelectedElement(null);
              }
            }}
          />

          {/* Live Canvas Preview */}
          <CanvasPreview
            schema={schema}
            deviceMode={deviceMode}
            isGenerating={isGenerating}
            onUpdateBlock={handleUpdateBlock}
            onMoveBlock={handleMoveBlock}
            onDuplicateBlock={handleDuplicateBlock}
            onDeleteBlock={handleDeleteBlock}
            onPolishWithAI={handlePolishWithAI}
            onSelectElement={setSelectedElement}
            selectedElement={selectedElement}
            onReplaceImage={handleReplaceImage}
            onUpdateElementStyle={handleUpdateElementStyle}
            onOpenDomainModal={() => setIsDomainModalOpen(true)}
            customDomain={schema?.metadata?.customDomain}
          />
        </div>

        {/* Right Aria AI Copilot Panel (332px Width) */}
        <CopilotChat
          schema={schema}
          onApplyPrompt={handleApplyPrompt}
          isGenerating={isGenerating}
        />

      </div>

      {/* Studio Settings Modal */}
      <StudioSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Connect Custom Domain Modal */}
      <ConnectDomainModal
        isOpen={isDomainModalOpen}
        onClose={() => setIsDomainModalOpen(false)}
        connectedDomain={schema?.metadata?.customDomain}
        onSaveDomain={handleConnectDomain}
      />

    </div>
  );
}
