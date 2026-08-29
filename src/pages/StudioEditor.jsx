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

  // AI Prompt Processor — calls Gemini 2.5 Flash schema engine
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
