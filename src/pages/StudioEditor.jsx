import React, { useState } from 'react';
import StudioNavbar from '../components/studio/StudioNavbar';
import CanvasPreview from '../components/studio/CanvasPreview';
import CopilotChat from '../components/studio/CopilotChat';
import { initialPortfolioSchema } from '../types/schema';
import { processUserPrompt } from '../lib/geminiBuilder';

export default function StudioEditor() {
  const [schema, setSchema] = useState(initialPortfolioSchema);
  const [deviceMode, setDeviceMode] = useState('desktop');

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

  // AI Polish section
  const handlePolishWithAI = async (block) => {
    return handleApplyPrompt(`Polish and rewrite the ${block.type} section content to sound impressive and senior.`);
  };

  // AI Prompt Processor — calls Gemini Flash schema engine
  const handleApplyPrompt = async (promptText) => {
    const result = await processUserPrompt(promptText, schema);
    if (result && result.updatedSchema) {
      setSchema(result.updatedSchema);
    } else if (result && result.schema) {
      setSchema(result.schema);
    }
    return result.aiMessage || result.message || "Portfolio successfully updated!";
  };

  const handlePublish = () => {
    setSchema((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, published: true }
    }));
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0F1117] overflow-hidden">
      
      {/* Studio Header */}
      <StudioNavbar
        deviceMode={deviceMode}
        setDeviceMode={setDeviceMode}
        schema={schema}
        onPublish={handlePublish}
      />

      {/* Main Split-Screen Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* 70% Live Canvas Preview */}
        <CanvasPreview
          schema={schema}
          deviceMode={deviceMode}
          onUpdateBlock={handleUpdateBlock}
          onMoveBlock={handleMoveBlock}
          onDuplicateBlock={handleDuplicateBlock}
          onDeleteBlock={handleDeleteBlock}
          onPolishWithAI={handlePolishWithAI}
        />

        {/* 30% AI Copilot Panel */}
        <CopilotChat
          schema={schema}
          onApplyPrompt={handleApplyPrompt}
        />

      </div>

    </div>
  );
}
