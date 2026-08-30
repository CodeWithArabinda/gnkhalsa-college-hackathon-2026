import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, History, X, Plus, Mic, User, RefreshCw, Palette, HelpCircle } from 'lucide-react';
import PlanningCard from './PlanningCard';
import ModelSelectorDropdown from '../common/ModelSelectorDropdown';

const QUICK_GRID_ACTIONS = [
  { id: 'generate', label: 'Generate', icon: RefreshCw, prompt: '✨ Generate a new modern hero layout for developer portfolio.' },
  { id: 'add', label: 'Add', icon: Plus, prompt: '⚡ Add a new project section block with live GitHub links.' },
  { id: 'design', label: 'Design', icon: Palette, prompt: '🎨 Apply a sleek Dark Cinematic design theme with neon accents.' },
  { id: 'howto', label: 'How to?', icon: HelpCircle, prompt: '📄 How do I customize my portfolio slug and domain?' }
];

export default function CopilotChat({ schema, onApplyPrompt, isGenerating: externalGenerating }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState(() => localStorage.getItem('stackfolio_selected_model') || 'auto');
  const [internalGenerating, setInternalGenerating] = useState(false);
  const [activeContextBadge, setActiveContextBadge] = useState("Hero Section");
  const messagesEndRef = useRef(null);

  const isGenerating = externalGenerating !== undefined ? externalGenerating : internalGenerating;
  const isChatActive = messages.length > 0;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || isGenerating) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      role: "user",
      text: query
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setInternalGenerating(true);

    try {
      let responseText = "Updated your portfolio schema!";
      if (onApplyPrompt) {
        responseText = await onApplyPrompt(query, selectedModel);
      }

      const botMsg = {
        id: `b-${Date.now()}`,
        role: "assistant",
        text: responseText || "I've applied your changes to the live canvas preview!"
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errMsg = err.message?.includes("VITE_GEMINI_API_KEY")
        ? "⚠️ Gemini API key is missing or invalid. Please add VITE_GEMINI_API_KEY to your .env file."
        : `⚠️ Error: ${err.message || "Something went wrong processing your request."}`;
      setMessages((prev) => [
        ...prev,
        { id: `err-${Date.now()}`, role: "assistant", text: errMsg }
      ]);
    } finally {
      setInternalGenerating(false);
    }
  };

  return (
    <aside className="w-full lg:w-[332px] bg-white border-l-[2.5px] border-black flex flex-col h-full shrink-0 text-slate-900 select-none shadow-[-4px_0px_0px_#000000] z-30 font-sans">
      
      {/* Top Header */}
      <div className="p-3.5 border-b-2 border-black flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-lg bg-[#FFE600] border-2 border-black text-black flex items-center justify-center font-black shadow-[1.5px_1.5px_0px_#000000]">
            <Sparkles className="w-3.5 h-3.5 text-black" />
          </div>
          <span className="font-heading font-black text-sm text-black tracking-tight">Aria</span>
          <span className="text-[10px] font-mono bg-sky-300 text-black px-1.5 py-0.2 rounded border border-black font-black shadow-[1px_1px_0px_#000000]">
            Copilot
          </span>
        </div>

        <div className="flex items-center space-x-1 text-black">
          <button type="button" className="p-1 hover:bg-slate-100 rounded-md cursor-pointer" title="Chat history">
            <History className="w-4 h-4" />
          </button>
          <button type="button" className="p-1 hover:bg-slate-100 rounded-md cursor-pointer" title="Close panel">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs">
        
        {/* 1. IDLE MODE: Welcome Mascot Card */}
        {!isChatActive && !isGenerating && (
          <div className="bg-white border-2 border-black rounded-2xl p-5 text-center shadow-[5px_5px_0px_#000000] relative overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-slate-900 text-white font-black mx-auto flex items-center justify-center shadow-[2px_2px_0px_#000000] relative">
              <div className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 bg-[#00FFA3] rounded-full animate-ping" />
                <span className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full animate-pulse" />
              </div>
            </div>

            <h3 className="text-xl font-black text-black tracking-tight mt-2.5">Hello KSHITIJ</h3>
            <p className="text-xs font-bold text-slate-600 mb-4">What can I help you with?</p>

            <div className="grid grid-cols-2 gap-2">
              {QUICK_GRID_ACTIONS.map((act) => {
                const IconComp = act.icon;
                return (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => handleSend(act.prompt)}
                    className="bg-white hover:bg-slate-50 text-black font-black text-xs py-2 px-2.5 rounded-xl border-2 border-black shadow-[2.5px_2.5px_0px_#000000] hover:translate-x-[0.5px] hover:translate-y-[0.5px] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <IconComp className="w-3.5 h-3.5 text-black" />
                    <span>{act.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. CHAT ACTIVE MODE */}
        {isChatActive && (
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#FFE600] border-2 border-black rounded-xl text-xs font-black text-black shadow-[2px_2px_0px_#000000]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span>Aria Assistant Active</span>
            </div>
            <button
              type="button"
              onClick={() => setMessages([])}
              className="text-[10px] font-bold text-black underline hover:text-slate-800"
            >
              Reset Chat
            </button>
          </div>
        )}

        {/* Active Message Stream */}
        {isChatActive && (
          <div className="space-y-3 pt-1">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-start space-x-2 ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs border-2 border-black font-black ${
                    m.role === 'assistant'
                      ? 'bg-[#FFE600] text-black shadow-[1.5px_1.5px_0px_#000]'
                      : 'bg-black text-white shadow-[1.5px_1.5px_0px_#000]'
                  }`}
                >
                  {m.role === 'assistant' ? <Sparkles className="w-3 h-3 text-black" /> : <User className="w-3 h-3 text-white" />}
                </div>

                <div
                  className={`p-3 rounded-2xl max-w-[88%] leading-relaxed border-2 border-black shadow-[3px_3px_0px_#000000] ${
                    m.role === 'assistant'
                      ? 'bg-white text-black font-semibold'
                      : 'bg-[#FFE600] text-black font-extrabold'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. PLANNING MODE */}
        {isGenerating && (
          <PlanningCard isGenerating={isGenerating} lastPrompt={input} />
        )}

        {isGenerating && (
          <div className="flex items-center space-x-2 pt-1">
            <div className="w-6 h-6 rounded-lg bg-[#FFE600] border-2 border-black text-black flex items-center justify-center shadow-[1.5px_1.5px_0px_#000]">
              <Sparkles className="w-3.5 h-3.5 text-black animate-spin" />
            </div>
            <div className="bg-white border-2 border-black rounded-xl p-2.5 text-black font-mono text-[11px] font-bold shadow-[2px_2px_0px_#000] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-black animate-ping" />
              Updating layout blocks...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Chat Input Dock */}
      <div className="p-3 border-t-2 border-black bg-white space-y-2 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="border-2 border-black bg-white rounded-2xl p-2.5 shadow-[4px_4px_0px_#000000] space-y-2"
        >
          {activeContextBadge && (
            <div className="inline-flex items-center gap-1 bg-[#FFE600] border border-black text-black text-[10px] font-black px-2 py-0.5 rounded-full shadow-[1px_1px_0px_#000]">
              <span>{activeContextBadge}</span>
              <button
                type="button"
                onClick={() => setActiveContextBadge(null)}
                className="hover:text-red-600 ml-0.5 cursor-pointer font-black"
              >
                ✕
              </button>
            </div>
          )}

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want to change..."
            className="w-full bg-transparent px-1 text-xs text-black placeholder:text-slate-400 focus:outline-none font-bold"
          />

          <div className="flex items-center justify-between border-t-2 border-black/10 pt-2">
            <div className="flex items-center space-x-1.5 text-black">
              {/* Compact Model Selector Dropdown */}
              <ModelSelectorDropdown
                selectedModel={selectedModel}
                onSelect={setSelectedModel}
                compact
              />

              <button type="button" className="p-1 hover:bg-slate-100 rounded-lg text-black cursor-pointer" title="Attach context">
                <Plus className="w-3.5 h-3.5 text-black" />
              </button>
              <button type="button" className="p-1 hover:bg-slate-100 rounded-lg text-black cursor-pointer" title="Voice input">
                <Mic className="w-3.5 h-3.5 text-black" />
              </button>
            </div>

            <button
              type="submit"
              disabled={!input.trim() || isGenerating}
              className="p-2 bg-[#FFE600] hover:bg-[#ebd300] disabled:opacity-40 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_#000000] hover:translate-x-[0.5px] hover:translate-y-[0.5px] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
        </form>

        <p className="text-[10px] text-center text-slate-500 font-mono font-bold">
          AI can make mistakes. Always double-check results.
        </p>
      </div>

    </aside>
  );
}
