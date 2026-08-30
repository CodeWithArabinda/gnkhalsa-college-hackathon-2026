import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, History, X, Plus, Mic, User, RefreshCw, Palette, HelpCircle } from 'lucide-react';
import PlanningCard from './PlanningCard';

const QUICK_GRID_ACTIONS = [
  { id: 'generate', label: 'Generate', icon: RefreshCw, prompt: '✨ Generate a new modern hero layout for developer portfolio.' },
  { id: 'add', label: 'Add', icon: Plus, prompt: '⚡ Add a new project section block with live GitHub links.' },
  { id: 'design', label: 'Design', icon: Palette, prompt: '🎨 Apply a sleek Dark Cinematic design theme with neon accents.' },
  { id: 'howto', label: 'How to?', icon: HelpCircle, prompt: '📄 How do I customize my portfolio slug and domain?' }
];

export default function CopilotChat({ schema, onApplyPrompt, isGenerating: externalGenerating }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
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
        responseText = await onApplyPrompt(query);
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
    <aside className="w-full lg:w-[332px] bg-[#f8fafc] border-l border-slate-200 flex flex-col h-full shrink-0 text-slate-900 select-none shadow-sm z-30">
      
      {/* Top Header */}
      <div className="p-3.5 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-[#0053ff] text-white flex items-center justify-center font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-heading font-extrabold text-sm text-slate-900 tracking-tight">Aria</span>
          <span className="text-[10px] font-mono bg-blue-50 text-[#0053ff] px-1.5 py-0.2 rounded border border-blue-200 font-bold">
            Copilot
          </span>
        </div>

        <div className="flex items-center space-x-1 text-slate-500">
          <button type="button" className="p-1 hover:bg-slate-100 rounded-md" title="Chat history">
            <History className="w-4 h-4" />
          </button>
          <button type="button" className="p-1 hover:bg-slate-100 rounded-md" title="Close panel">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 font-sans text-xs">
        
        {/* 1. IDLE MODE: Show ONLY Welcome Mascot Card */}
        {!isChatActive && !isGenerating && (
          <div className="bg-gradient-to-b from-[#eef4ff] to-[#dfeaff] border border-blue-100 rounded-2xl p-4 text-center shadow-xs relative overflow-hidden animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-full bg-slate-900 text-white font-black mx-auto flex items-center justify-center shadow-md relative">
              <div className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 bg-[#00FFA3] rounded-full animate-ping" />
                <span className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full animate-pulse" />
              </div>
            </div>

            <h3 className="text-base font-extrabold text-[#081a5e] tracking-tight mt-2">Hello KSHITIJ</h3>
            <p className="text-xs text-slate-600 font-medium mb-3">What can I help you with?</p>

            <div className="grid grid-cols-2 gap-2">
              {QUICK_GRID_ACTIONS.map((act) => {
                const IconComp = act.icon;
                return (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => handleSend(act.prompt)}
                    className="bg-white/90 hover:bg-white text-slate-800 font-semibold text-xs py-2 px-2.5 rounded-xl border border-blue-200/60 shadow-xs flex items-center justify-center gap-1.5 transition-all hover:shadow-sm cursor-pointer"
                  >
                    <IconComp className="w-3.5 h-3.5 text-[#0053ff]" />
                    <span>{act.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. CHAT / PLANNING MODE: Compact Top Status Chip Header */}
        {isChatActive && (
          <div className="flex items-center justify-between px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-xl text-xs font-semibold text-[#0053ff] animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0053ff] animate-pulse" />
              <span>Aria Assistant Active</span>
            </div>
            <button
              type="button"
              onClick={() => setMessages([])}
              className="text-[10px] text-slate-500 hover:text-slate-900 underline"
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
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs ${
                    m.role === 'assistant'
                      ? 'bg-[#0053ff] text-white shadow-xs'
                      : 'bg-slate-200 text-slate-800 border border-slate-300'
                  }`}
                >
                  {m.role === 'assistant' ? <Sparkles className="w-3 h-3" /> : <User className="w-3 h-3" />}
                </div>

                <div
                  className={`p-3 rounded-2xl max-w-[88%] leading-relaxed ${
                    m.role === 'assistant'
                      ? 'bg-white border border-slate-200 text-slate-800 shadow-xs'
                      : 'bg-[#0053ff] text-white font-medium shadow-xs'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. PLANNING MODE: Collapsible Step Checklist */}
        {isGenerating && (
          <PlanningCard isGenerating={isGenerating} lastPrompt={input} />
        )}

        {isGenerating && (
          <div className="flex items-center space-x-2 pt-1">
            <div className="w-6 h-6 rounded-full bg-[#0053ff] text-white flex items-center justify-center">
              <Sparkles className="w-3 h-3 animate-spin" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-2.5 text-slate-600 font-mono text-[11px] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0053ff] animate-ping" />
              Updating layout blocks...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Chat Input Dock */}
      <div className="p-3 border-t border-slate-200 bg-white space-y-2 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="bg-slate-50 border border-slate-200 focus-within:border-[#0053ff] focus-within:bg-white rounded-xl p-2 shadow-2xs transition-colors space-y-1.5"
        >
          {activeContextBadge && (
            <div className="inline-flex items-center gap-1 bg-blue-50 text-[#0053ff] text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200">
              <span>{activeContextBadge}</span>
              <button
                type="button"
                onClick={() => setActiveContextBadge(null)}
                className="hover:text-red-500 ml-0.5"
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
            className="w-full bg-transparent px-1 text-xs text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
          />

          <div className="flex items-center justify-between border-t border-slate-200/60 pt-1.5">
            <div className="flex items-center space-x-1 text-slate-400">
              <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500" title="Attach context">
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500" title="Voice input">
                <Mic className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="submit"
              disabled={!input.trim() || isGenerating}
              className="p-1.5 bg-[#0053ff] hover:bg-[#0043cc] disabled:opacity-40 text-white rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        <p className="text-[10px] text-center text-slate-400 font-sans">
          AI can make mistakes. Always double-check the results.
        </p>
      </div>

    </aside>
  );
}
