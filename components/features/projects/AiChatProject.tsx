"use client";

import { useState } from "react";
import { Theme } from "../types";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  codeSnippet?: string;
  timestamp: string;
}

export default function AiChatProject({ theme }: { theme: Theme }) {
  const [model, setModel] = useState<string>("Claude 3.5 Sonnet");
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      sender: "user",
      text: "How should I structure the design tokens for our multi-brand design system in Next.js?",
      timestamp: "10:42 AM",
    },
    {
      id: "m2",
      sender: "assistant",
      text: `For a multi-brand architecture, separate semantic tokens from raw primitives. Here is how your \`theme.config.ts\` should map into CSS variables using the current ${theme.name} palette:`,
      codeSnippet: `// theme.config.ts
export const brandTokens = {
  surface: "var(--th-card-bg)",
  accent: "var(--th-accent)",
  contrastText: "var(--th-accent-text)",
  status: {
    ready: "var(--th-success)",
    alert: "var(--th-warning)",
  }
} as const;`,
      timestamp: "10:43 AM",
    },
  ]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const t = theme.vars;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: inputVal,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");

    // Simulate AI response
    setTimeout(() => {
      const aiReply: Message = {
        id: `reply-${Date.now()}`,
        sender: "assistant",
        text: `Understood! With ${theme.name}'s accent token (${t.accent}), this component layout ensures maximum contrast and passes WCAG accessibility standards smoothly.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 600);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: t.border }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: t.accentSubtle, color: t.accent }}
            >
              AI Workspace
            </span>
            <span className="text-xs" style={{ color: t.textMuted }}>Interactive Chat Flow</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight" style={{ color: t.textPrimary }}>
            Conversational Copilot Shell
          </h2>
        </div>

        {/* Model Picker */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl border" style={{ borderColor: t.border, background: t.cardBg }}>
          {["Claude 3.5 Sonnet", "GPT-4o", "Gemini 2.5"].map((m) => (
            <button
              key={m}
              id={`ai-model-${m.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setModel(m)}
              className="px-2.5 py-1 text-xs font-medium rounded-lg transition-all"
              style={{
                background: model === m ? t.accent : "transparent",
                color: model === m ? t.accentText : t.textSecondary,
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <div
        className="rounded-2xl border flex flex-col h-[520px] overflow-hidden shadow-xl"
        style={{ background: t.cardBg, borderColor: t.border }}
      >
        {/* Chat Status Bar */}
        <div className="px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: t.border, background: t.bg }}>
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ background: t.accent, color: t.accentText }}
            >
              AI
            </div>
            <div>
              <p className="text-xs font-semibold" style={{ color: t.textPrimary }}>Hue Neural Intelligence</p>
              <p className="text-[10px] flex items-center gap-1" style={{ color: t.success }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.success }} />
                Active Session • Context: 128k
              </p>
            </div>
          </div>

          <span className="text-xs font-mono" style={{ color: t.textMuted }}>{model}</span>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4" style={{ background: t.bg }}>
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${isUser ? "ml-auto justify-end" : "mr-auto justify-start"}`}
              >
                {!isUser && (
                  <div
                    className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-[10px] font-bold mt-1"
                    style={{ background: t.accent, color: t.accentText }}
                  >
                    AI
                  </div>
                )}

                <div className="space-y-2">
                  <div
                    className="p-4 rounded-2xl text-xs sm:text-sm leading-relaxed"
                    style={{
                      background: isUser ? t.accent : t.cardBg,
                      color: isUser ? t.accentText : t.textPrimary,
                      border: isUser ? "none" : `1px solid ${t.border}`,
                    }}
                  >
                    <p>{msg.text}</p>
                    {msg.codeSnippet && (
                      <div className="mt-3 rounded-xl border p-3 font-mono text-xs overflow-x-auto" style={{ background: t.bg, borderColor: t.border }}>
                        <div className="flex justify-between items-center mb-2 text-[10px]" style={{ color: t.textMuted }}>
                          <span>TypeScript</span>
                          <button
                            onClick={() => handleCopy(msg.id, msg.codeSnippet!)}
                            className="hover:underline font-sans"
                            style={{ color: t.accent }}
                          >
                            {copiedId === msg.id ? "✓ Copied" : "Copy"}
                          </button>
                        </div>
                        <pre style={{ color: t.textSecondary }}>{msg.codeSnippet}</pre>
                      </div>
                    )}
                  </div>
                  <div
                    className={`text-[10px] font-mono px-1 ${isUser ? "text-right" : "text-left"}`}
                    style={{ color: t.textMuted }}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {isUser && (
                  <div
                    className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-[10px] font-bold mt-1 border"
                    style={{ background: t.cardBg, borderColor: t.border, color: t.textSecondary }}
                  >
                    You
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSend}
          className="p-3 border-t flex items-center gap-2"
          style={{ background: t.cardBg, borderColor: t.border }}
        >
          <input
            type="text"
            id="ai-chat-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={`Ask about design tokens, Tailwind, or ${theme.name}...`}
            className="flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm outline-none border transition-colors"
            style={{
              background: t.bg,
              borderColor: t.border,
              color: t.textPrimary,
            }}
          />
          <button
            type="submit"
            id="ai-chat-send-btn"
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: t.accent, color: t.accentText }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
