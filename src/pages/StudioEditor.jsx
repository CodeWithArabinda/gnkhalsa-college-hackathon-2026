import React, { useState } from 'react';
import StudioNavbar from '../components/studio/StudioNavbar';
import StudioToolbar from '../components/studio/StudioToolbar';
import CanvasPreview from '../components/studio/CanvasPreview';
import CopilotChat from '../components/studio/CopilotChat';
import { initialPortfolioSchema } from '../types/schema';
import { processUserPrompt } from '../lib/geminiBuilder';

export default function StudioEditor() {
  const [schema, setSchema] = useState(initialPortfolioSchema);
  const [deviceMode, setDeviceMode] = useState('desktop');
  const [selectedElement, setSelectedElement] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Handle inline contentEditable changes from CanvasPreview
  const handleUpdateBlock = (blockId, fieldPath, value) => {
    setSchema((prev) => {
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
    setSchema((prev) => {
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
    setSchema((prev) => {
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
    setSchema((prev) => {
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
    setSchema((prev) => {
      const blocks = [...prev.blocks];
      blocks.splice(index, 1);
      return { ...prev, blocks };
    });
  };

  // Add new element block from + Add Menu
  const handleAddElement = (elementType) => {
    setSchema((prev) => {
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

    setSchema((prev) => {
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
        setSchema(result.updatedSchema);
      } else if (result && result.schema) {
        setSchema(result.schema);
      }
      return result.aiMessage || result.message || "Portfolio successfully updated!";
    } catch (err) {
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = () => {
    setSchema((prev) => ({
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
