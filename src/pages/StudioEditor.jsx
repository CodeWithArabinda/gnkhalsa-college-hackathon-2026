import React, { useState, useEffect } from 'react';
import StudioNavbar from '../components/studio/StudioNavbar';
import StudioToolbar from '../components/studio/StudioToolbar';
import CanvasPreview from '../components/studio/CanvasPreview';
import CopilotChat from '../components/studio/CopilotChat';
import { initialPortfolioSchema } from '../types/schema';
import { processUserPrompt } from '../lib/geminiBuilder';

export default function StudioEditor() {
  const [deviceMode, setDeviceMode] = useState('desktop');
  const [selectedElement, setSelectedElement] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveStatus, setSaveStatus] = useState('saved');

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

  // Debounced Autosave to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem('stackfolio_studio_draft', JSON.stringify(schema));
        setSaveStatus('saved');
      } catch (e) {}
    }, 500);

    return () => clearTimeout(timer);
  }, [schema]);

  // Handle inline contentEditable changes from CanvasPreview
  const handleUpdateBlock = (blockId, fieldPath, value) => {
    updateSchemaState((prev) => {
      const updatedBlocks = prev.blocks.map((block) => {
        if (block.id !== blockId) return block;

        const updatedContent = { ...block.content };
        const keys = fieldPath.replace('content.', '').split('.');
        
        if (keys.length === 1) {
          updatedContent[keys[0]] = value;
        } else if (keys.length === 2) {
          updatedContent[keys[0]] = {
            ...updatedContent[keys[0]],
            [keys[1]]: value
          };
        }

        return { ...block, content: updatedContent };
      });

      return { ...prev, blocks: updatedBlocks };
    });
  };

  // Handle element-level isolated style & offset mutations
  const handleUpdateElementStyle = (elementKey, styleUpdates) => {
    updateSchemaState((prev) => {
      const prevStyles = prev.elementStyles || {};
      const targetStyle = prevStyles[elementKey] || {};
      const updatedStyle = typeof styleUpdates === 'function' ? styleUpdates(targetStyle) : { ...targetStyle, ...styleUpdates };
      return {
        ...prev,
        elementStyles: {
          ...prevStyles,
          [elementKey]: updatedStyle
        }
      };
    });
  };

  // Reorder sections
  const handleMoveBlock = (index, direction) => {
    updateSchemaState((prev) => {
      const blocks = [...prev.blocks];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= blocks.length) return prev;
      const temp = blocks[index];
      blocks[index] = blocks[targetIndex];
      blocks[targetIndex] = temp;
      return { ...prev, blocks };
    });
  };

  // Duplicate section
  const handleDuplicateBlock = (index) => {
    updateSchemaState((prev) => {
      const blocks = [...prev.blocks];
      const target = blocks[index];
      const cloned = JSON.parse(JSON.stringify(target));
      cloned.id = `${cloned.type.toLowerCase()}-${Date.now()}`;
      blocks.splice(index + 1, 0, cloned);
      return { ...prev, blocks };
    });
  };

  // Delete section
  const handleDeleteBlock = (index) => {
    updateSchemaState((prev) => {
      const blocks = [...prev.blocks];
      blocks.splice(index, 1);
      return { ...prev, blocks };
    });
  };

  // Add new element block from + Add Menu
  const handleAddElement = (elementType) => {
    updateSchemaState((prev) => {
      const blocks = [...prev.blocks];
      if (elementType === 'project') {
        const newProjectBlock = {
          id: `projects-${Date.now()}`,
          type: 'ProjectGridBlock',
          content: {
            title: 'New Showcase Section',
            subtitle: 'Created via Studio Add Tool',
            items: [
              {
                id: `p-${Date.now()}`,
                title: 'New Project Showcase',
                description: 'Full stack web application built with modern architecture.',
                tags: ['React', 'Node.js', 'Tailwind'],
                link: 'https://github.com'
              }
            ]
          }
        };
        blocks.push(newProjectBlock);
      } else if (elementType === 'skill') {
        const newSkillBlock = {
          id: `skills-${Date.now()}`,
          type: 'SkillsBlock',
          content: {
            title: 'Core Competencies',
            categories: [
              { name: 'Specialized Skills', skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'] }
            ]
          }
        };
        blocks.push(newSkillBlock);
      } else if (elementType === 'text') {
        const newHeroBlock = {
          id: `hero-${Date.now()}`,
          type: 'HeroBlock',
          content: {
            headline: 'Special Announcement',
            name: 'New Custom Title',
            bio: 'Click and edit this text block directly on the canvas.',
            ctaText: 'View Work',
            secondaryCta: 'Contact'
          }
        };
        blocks.push(newHeroBlock);
      }
      return { ...prev, blocks };
    });
  };

  // Replace Image handler
  const handleReplaceImage = (element) => {
    const newUrl = window.prompt("Enter new Image URL (or paste image link):", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80");
    if (!newUrl) return;

    updateSchemaState((prev) => {
      const blocks = prev.blocks.map((b) => {
        if (b.type === 'HeroBlock') {
          return {
            ...b,
            content: { ...b.content, avatarUrl: newUrl }
          };
        }
        return b;
      });
      return { ...prev, blocks };
    });
  };

  // AI Polish section
  const handlePolishWithAI = async (block) => {
    return handleApplyPrompt(`Polish and rewrite the ${block?.type || 'Hero'} section content to sound impressive and senior.`);
  };

  // AI Prompt Processor — calls Gemini Flash schema engine
  const handleApplyPrompt = async (promptText) => {
    setIsGenerating(true);
    try {
      const result = await processUserPrompt(promptText, schema);
      if (result && result.updatedSchema) {
        updateSchemaState(result.updatedSchema);
      } else if (result && result.schema) {
        updateSchemaState(result.schema);
      }
      return result.aiMessage || result.message || "Portfolio successfully updated!";
    } catch (err) {
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = () => {
    updateSchemaState((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, published: true }
    }));
  };

  const currentSelectedStyle = selectedElement?.key ? (schema.elementStyles || {})[selectedElement.key] : {};

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0F1117] overflow-hidden">
      
      {/* Studio Header */}
      <StudioNavbar
        deviceMode={deviceMode}
        setDeviceMode={setDeviceMode}
        schema={schema}
        onPublish={handlePublish}
        onUndo={handleUndo}
        canUndo={history.past.length > 0}
        onRedo={handleRedo}
        canRedo={history.future.length > 0}
        saveStatus={saveStatus}
        onResetDefault={handleResetDefault}
      />

      {/* Top Contextual Studio Action Ribbon */}
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

      {/* Main Split-Screen Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* 70% Live Canvas Preview */}
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
        />

        {/* 30% AI Copilot Panel */}
        <CopilotChat
          schema={schema}
          onApplyPrompt={handleApplyPrompt}
          isGenerating={isGenerating}
        />

      </div>

    </div>
  );
}
