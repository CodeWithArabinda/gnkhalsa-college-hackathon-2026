import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User, RefreshCw, Wand2, ArrowRight } from 'lucide-react';
import PlanningCard from './PlanningCard';
import { useStudioTheme } from '../../context/ThemeContext';

const QUICK_PROMPTS = [
  "✨ Make theme Dark Cinematic",
  "⚡ Add React, Node & Tailwind skills",
  "🚀 Rewrite bio to sound senior",
  "🎨 Add project: AI Copilot Studio"
];

export default function CopilotChat({ schema, onApplyPrompt, isGenerating: externalGenerating }) {
  const { isLight } = useStudioTheme();
  const [messages, setMessages] = useState([
    {
      id: "m1",
      role: "assistant",
      text: "Hey! I'm your StackFolio Copilot. Ask me to rewrite your bio, change layout themes, add new projects, or update skills!"
    }
  ]);
  const [input, setInput] = useState("");
  const [internalGenerating, setInternalGenerating] = useState(false);
  const messagesEndRef = useRef(null);

  const isGenerating = externalGenerating !== undefined ? externalGenerating : internalGenerating;

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
    <aside className={`w-full lg:w-96 flex flex-col h-full shrink-0 select-none transition-colors duration-200 ${
      isLight ? 'bg-white border-l-2 border-slate-200 text-slate-900 shadow-xl' : 'bg-[#12141D] border-l-2 border-black text-white'
    }`}>
      
      {/* Copilot Header */}
      <div className={`p-4 border-b flex items-center justify-between transition-colors ${
        isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#181A24] border-white/10'
      }`}>
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#FFE600] border border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_#000]">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className={`font-heading font-extrabold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>AI Copilot</h3>
            <p className="font-mono text-[10px] text-[#00FFA3] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FFA3] animate-pulse" /> Active & Ready
            </p>
          </div>
        </div>

        <div className={`text-[10px] font-mono rounded-lg px-2 py-1 ${
          isLight ? 'bg-slate-200 text-slate-700 border border-slate-300' : 'text-slate-400 bg-white/5 border border-white/10'
        }`}>
          v2.4
        </div>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start space-x-2.5 ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                m.role === 'assistant'
                  ? 'bg-[#FF6B1A] text-black border border-black'
                  : isLight ? 'bg-slate-200 text-slate-800 border border-slate-300' : 'bg-white/10 text-white border border-white/20'
              }`}
            >
              {m.role === 'assistant' ? <Wand2 className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                m.role === 'assistant'
                  ? isLight
                    ? 'bg-slate-100 border border-slate-300 text-slate-800 shadow-sm'
                    : 'bg-[#1D202D] border border-white/10 text-slate-200 shadow-md'
                  : 'bg-[#FFE600] text-black font-medium border border-black shadow-[2px_2px_0px_0px_#000]'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {/* Step-by-Step AI Planning Card */}
        <PlanningCard isGenerating={isGenerating} lastPrompt={input} />

        {isGenerating && (
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#FF6B1A] text-black border border-black flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
            </div>
            <div className={`rounded-2xl p-3 font-mono text-[11px] flex items-center gap-2 ${
              isLight ? 'bg-slate-100 border border-slate-300 text-slate-700' : 'bg-[#1D202D] border border-white/10 text-slate-400'
            }`}>
              <span className="w-2 h-2 rounded-full bg-[#FF6B1A] animate-ping" />
              Updating schema & layout blocks...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Pills */}
      <div className={`p-3 border-t space-y-2 ${
        isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#161822] border-white/10'
      }`}>
        <p className={`text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 ${
          isLight ? 'text-slate-600' : 'text-slate-400'
        }`}>
          <Sparkles className="w-3 h-3 text-[#FFE600]" /> Quick Prompt Actions
        </p>
        <div className="flex flex-wrap gap-1.5">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handleSend(prompt)}
              className={`text-[10px] font-mono border rounded-lg px-2.5 py-1 transition-all text-left ${
                isLight
                  ? 'bg-white hover:bg-[#FFE600] border-slate-300 text-slate-800 hover:text-black'
                  : 'bg-white/5 hover:bg-[#FFE600] border-white/10 text-slate-300 hover:text-black'
              }`}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className={`p-3 border-t ${
        isLight ? 'bg-slate-100 border-slate-300' : 'bg-[#0F1117] border-black'
      }`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className={`flex items-center space-x-2 border rounded-xl p-1.5 focus-within:border-[#FFE600] transition-colors ${
            isLight ? 'bg-white border-slate-300' : 'bg-[#1A1D27] border-white/15'
          }`}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI Copilot to edit portfolio..."
            className={`flex-1 bg-transparent px-3 text-xs focus:outline-none ${
              isLight ? 'text-slate-900 placeholder-slate-400' : 'text-white placeholder-slate-500'
            }`}
          />

          <button
            type="submit"
            disabled={!input.trim() || isGenerating}
            className="p-2 bg-[#FFE600] hover:bg-[#ffed4d] disabled:opacity-40 text-black rounded-lg border border-black shadow-[1.5px_1.5px_0px_0px_#000] transition-all"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </aside>
  );
}
