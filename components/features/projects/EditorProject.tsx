"use client";

import { useState } from "react";
import { Theme } from "../types";

export default function EditorProject({ theme }: { theme: Theme }) {
  const [activeTab, setActiveTab] = useState<"page.tsx" | "database.ts" | "api.go">("page.tsx");
  const [copied, setCopied] = useState(false);
  const t = theme.vars;

  const files = [
    { name: "page.tsx", lang: "TypeScript", branch: "feat/hue-engine" },
    { name: "database.ts", lang: "TypeScript", branch: "feat/hue-engine" },
    { name: "api.go", lang: "Go", branch: "feat/hue-engine" },
  ];

  const codeSnippets: Record<string, { lines: Array<{ num: number; tokens: Array<{ text: string; color?: string; bold?: boolean; italic?: boolean }> }> }> = {
    "page.tsx": {
      lines: [
        { num: 1, tokens: [{ text: "import", color: t.accent, bold: true }, { text: " { useState, useEffect } " }, { text: "from", color: t.accent }, { text: ' "react"', color: t.success }] },
        { num: 2, tokens: [{ text: "import", color: t.accent, bold: true }, { text: " { createThemeEngine } " }, { text: "from", color: t.accent }, { text: ' "@/lib/hue"', color: t.success }] },
        { num: 3, tokens: [] },
        { num: 4, tokens: [{ text: "// Initialize reactive theme system with dynamic tokens", color: t.textMuted, italic: true }] },
        { num: 5, tokens: [{ text: "export default async function", color: t.accent, bold: true }, { text: " ThemeWorkspace() {" }] },
        { num: 6, tokens: [{ text: "  const", color: t.accent }, { text: " engine = " }, { text: "await", color: t.warning }, { text: " createThemeEngine({" }] },
        { num: 7, tokens: [{ text: '    palette: ' }, { text: `"${theme.name}"`, color: t.success }, { text: "," }] },
        { num: 8, tokens: [{ text: '    mode: ' }, { text: `"${theme.category}"`, color: t.success }, { text: "," }] },
        { num: 9, tokens: [{ text: '    wcagCompliance: ' }, { text: '"AAA"', color: t.success }, { text: "," }] },
        { num: 10, tokens: [{ text: '    telemetry: ' }, { text: "true", color: t.warning }] },
        { num: 11, tokens: [{ text: "  });" }] },
        { num: 12, tokens: [] },
        { num: 13, tokens: [{ text: "  return", color: t.accent, bold: true }, { text: " (" }] },
        { num: 14, tokens: [{ text: '    <main className="theme-shell p-8">' }] },
        { num: 15, tokens: [{ text: '      <h1 style={{ color: ' }, { text: 'engine.tokens.accent', color: t.accent }, { text: " }}>" }] },
        { num: 16, tokens: [{ text: `        Welcome to ${theme.name}` }] },
        { num: 17, tokens: [{ text: "      </h1>" }] },
        { num: 18, tokens: [{ text: "    </main>" }] },
        { num: 19, tokens: [{ text: "  );" }] },
        { num: 20, tokens: [{ text: "}" }] },
      ],
    },
    "database.ts": {
      lines: [
        { num: 1, tokens: [{ text: "import", color: t.accent, bold: true }, { text: " { PrismaClient } " }, { text: "from", color: t.accent }, { text: ' "@prisma/client"', color: t.success }] },
        { num: 2, tokens: [] },
        { num: 3, tokens: [{ text: "export const", color: t.accent }, { text: " db = " }, { text: "new", color: t.accent }, { text: " PrismaClient({" }] },
        { num: 4, tokens: [{ text: "  log: [" }, { text: '"query"', color: t.success }, { text: ", " }, { text: '"error"', color: t.danger }, { text: "]," }] },
        { num: 5, tokens: [{ text: "});" }] },
        { num: 6, tokens: [] },
        { num: 7, tokens: [{ text: "export async function", color: t.accent, bold: true }, { text: " saveUserPalette(userId: " }, { text: "string", color: t.warning }, { text: ", tokens: " }, { text: "Record<string, string>", color: t.warning }, { text: ") {" }] },
        { num: 8, tokens: [{ text: "  return", color: t.accent }, { text: " await db.palette.upsert({" }] },
        { num: 9, tokens: [{ text: "    where: { userId }," }] },
        { num: 10, tokens: [{ text: "    create: { userId, tokens }," }] },
        { num: 11, tokens: [{ text: "    update: { tokens, updatedAt: new Date() }," }] },
        { num: 12, tokens: [{ text: "  });" }] },
        { num: 13, tokens: [{ text: "}" }] },
      ],
    },
    "api.go": {
      lines: [
        { num: 1, tokens: [{ text: "package", color: t.accent, bold: true }, { text: " main" }] },
        { num: 2, tokens: [] },
        { num: 3, tokens: [{ text: "import", color: t.accent, bold: true }, { text: ' (\n\t"fmt"\n\t"net/http"\n)', color: t.success }] },
        { num: 4, tokens: [] },
        { num: 5, tokens: [{ text: "func", color: t.accent, bold: true }, { text: " ThemeStreamHandler(w http.ResponseWriter, r *http.Request) {" }] },
        { num: 6, tokens: [{ text: "\tw.Header().Set(" }, { text: '"Content-Type"', color: t.success }, { text: ", " }, { text: '"application/json"', color: t.success }, { text: ")" }] },
        { num: 7, tokens: [{ text: "\tfmt.Fprintf(w, " }, { text: '`{"status":"ok","theme":"%s"}`', color: t.success }, { text: `, "${theme.name}")` }] },
        { num: 8, tokens: [{ text: "}" }] },
      ],
    },
  };

  const handleCopyCode = () => {
    const raw = codeSnippets[activeTab].lines
      .map((l) => l.tokens.map((tok) => tok.text).join(""))
      .join("\n");
    navigator.clipboard.writeText(raw).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: t.border }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: t.accentSubtle, color: t.accent }}
            >
              Developer IDE
            </span>
            <span className="text-xs" style={{ color: t.textMuted }}>Live Code Studio</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight" style={{ color: t.textPrimary }}>
            Syntax & Terminal Preview
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="editor-copy-code-btn"
            onClick={handleCopyCode}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-all"
            style={{ borderColor: t.border, background: t.cardBg, color: t.textPrimary }}
          >
            {copied ? "✓ Copied!" : "Copy Code"}
          </button>
        </div>
      </div>

      {/* Editor Window */}
      <div className="rounded-2xl border overflow-hidden shadow-2xl" style={{ background: t.bg, borderColor: t.border }}>
        {/* Top Window Bar */}
        <div className="px-4 py-3 border-b flex items-center justify-between" style={{ background: t.cardBg, borderColor: t.border }}>
          {/* Window dots */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: t.danger }} />
            <span className="w-3 h-3 rounded-full" style={{ background: t.warning }} />
            <span className="w-3 h-3 rounded-full" style={{ background: t.success }} />
            <span className="text-xs font-mono ml-2 hidden sm:inline" style={{ color: t.textMuted }}>
              workspace / hue-studio
            </span>
          </div>

          {/* File Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {files.map((f) => {
              const isActive = activeTab === f.name;
              return (
                <button
                  key={f.name}
                  id={`editor-tab-${f.name}`}
                  onClick={() => setActiveTab(f.name as "page.tsx" | "database.ts" | "api.go")}
                  className="px-3 py-1 text-xs font-mono rounded-md transition-all flex items-center gap-1.5"
                  style={{
                    background: isActive ? t.bg : "transparent",
                    color: isActive ? t.textPrimary : t.textSecondary,
                    borderBottom: isActive ? `2px solid ${t.accent}` : "none",
                  }}
                >
                  <span>{f.name}</span>
                </button>
              );
            })}
          </div>

          {/* Git Branch Badge */}
          <div className="hidden md:flex items-center gap-1.5 text-xs font-mono" style={{ color: t.textSecondary }}>
            <span style={{ color: t.accent }}>⎇</span>
            <span>feat/hue-engine</span>
          </div>
        </div>

        {/* Code Lines Area */}
        <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto" style={{ background: t.bg }}>
          {codeSnippets[activeTab]?.lines.map((line) => (
            <div key={line.num} className="flex items-start gap-4 hover:bg-white/[0.02] py-0.5 rounded px-1">
              <span className="w-6 text-right select-none shrink-0" style={{ color: t.textMuted }}>
                {line.num}
              </span>
              <div className="flex-1 whitespace-pre" style={{ color: t.textPrimary }}>
                {line.tokens.length > 0 ? (
                  line.tokens.map((tok, i) => (
                    <span
                      key={i}
                      style={{
                        color: tok.color || t.textPrimary,
                        fontWeight: tok.bold ? 600 : 400,
                        fontStyle: tok.italic ? "italic" : "normal",
                      }}
                    >
                      {tok.text}
                    </span>
                  ))
                ) : (
                  <span>&nbsp;</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Embedded Terminal Console */}
        <div className="border-t" style={{ borderColor: t.border, background: t.cardBg }}>
          <div className="px-4 py-2 border-b flex items-center justify-between text-xs font-mono" style={{ borderColor: t.border }}>
            <div className="flex items-center gap-2">
              <span className="font-semibold" style={{ color: t.accent }}>TERMINAL</span>
              <span style={{ color: t.textMuted }}>node (zsh)</span>
            </div>
            <div className="flex items-center gap-3" style={{ color: t.textMuted }}>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ background: t.success }} />
                <span>0 errors</span>
              </span>
              <span>UTF-8</span>
            </div>
          </div>
          <div className="p-4 font-mono text-xs space-y-1.5 overflow-x-auto" style={{ background: t.bg }}>
            <div className="flex items-center gap-2">
              <span style={{ color: t.accent }}>hue@workstation:~$</span>
              <span style={{ color: t.textPrimary }}>next build --turbopack</span>
            </div>
            <div style={{ color: t.textMuted }}>▲ Next.js 16.2.3 (Turbopack)</div>
            <div style={{ color: t.textSecondary }}>✓ Compiled /app in 1.4s (312 modules)</div>
            <div className="flex items-center gap-2" style={{ color: t.success }}>
              <span>✓ Build completed: 0 errors, ready in 1791ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
