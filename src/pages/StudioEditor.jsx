import React, { useState } from 'react';
import StudioNavbar from '../components/studio/StudioNavbar';
import CanvasPreview from '../components/studio/CanvasPreview';
import CopilotChat from '../components/studio/CopilotChat';
import { initialPortfolioSchema } from '../types/schema';

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

  // AI Prompt Processor — interprets conversational requests and mutates schema
  const handleApplyPrompt = (promptText) => {
    const q = promptText.toLowerCase();

    if (q.includes('dark cinematic') || q.includes('cinematic')) {
      setSchema((prev) => ({
        ...prev,
        metadata: { ...prev.metadata, theme: 'cinematic', accentColor: '#FF6B1A' }
      }));
      return 'Theme updated to Dark Cinematic with warm amber accents!';
    }

    if (q.includes('senior') || q.includes('bio')) {
      setSchema((prev) => {
        const blocks = prev.blocks.map((b) => {
          if (b.type === 'HeroBlock') {
            return {
              ...b,
              content: {
                ...b.content,
                headline: 'Senior Full Stack & AI Systems Architect',
                bio: 'Architecting scalable web applications, real-time AI agents, and high-performance WebGL platforms for high-growth engineering teams.'
              }
            };
          }
          return b;
        });
        return { ...prev, blocks };
      });
      return 'Rewrote your bio and headline to a Senior AI Systems Architect tone!';
    }

    if (q.includes('skill') || q.includes('react')) {
      setSchema((prev) => {
        const blocks = prev.blocks.map((b) => {
          if (b.type === 'SkillsBlock') {
            return {
              ...b,
              content: {
                ...b.content,
                categories: [
                  { name: "Frontend & WebGL", skills: ["React 19", "Vite", "Tailwind CSS", "Three.js", "GSAP"] },
                  { name: "Backend & Cloud", skills: ["Node.js", "TypeScript", "Supabase", "PostgreSQL", "Docker"] },
                  { name: "AI & Tools", skills: ["OpenAI API", "Git", "Figma", "Vercel"] }
                ]
              }
            };
          }
          return b;
        });
        return { ...prev, blocks };
      });
      return 'Added React 19, TypeScript, and AI skills to your Technical Stack block!';
    }

    if (q.includes('project') || q.includes('add project')) {
      setSchema((prev) => {
        const blocks = prev.blocks.map((b) => {
          if (b.type === 'ProjectGridBlock') {
            const newProject = {
              id: `p-${Date.now()}`,
              title: "AI Studio Conversational Builder",
              description: "Wix Studio Aria-style portfolio generator with live schema mutation and copilot assistant.",
              tags: ["React", "AI", "Tailwind"],
              link: "https://github.com"
            };
            return {
              ...b,
              content: {
                ...b.content,
                items: [newProject, ...(b.content.items || [])]
              }
            };
          }
          return b;
        });
        return { ...prev, blocks };
      });
      return 'Added "AI Studio Conversational Builder" to your Featured Works section!';
    }

    return 'Processed your prompt and updated portfolio schema!';
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
