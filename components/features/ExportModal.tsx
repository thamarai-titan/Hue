"use client";

import { useState } from "react";
import { Theme, ExportFormat } from "./types";
import { exportThemeCode } from "./exporters";

interface ExportModalProps {
  theme: Theme;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportModal({ theme, isOpen, onClose }: ExportModalProps) {
  const [format, setFormat] = useState<ExportFormat>("tailwind4");
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  if (!isOpen) return null;

  const t = theme.vars;
  const code = exportThemeCode(theme, format);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCopyShareLink = () => {
    try {
      const payload = encodeURIComponent(JSON.stringify(theme.vars));
      const shareUrl = `${window.location.origin}${window.location.pathname}?themeData=${payload}&themeName=${encodeURIComponent(theme.name)}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      });
    } catch {
      // fallback
    }
  };

  const handleDownloadFile = () => {
    const extensions: Record<ExportFormat, string> = {
      tailwind4: "css",
      tailwind3: "js",
      css: "css",
      shadcn: "css",
      json: "json",
      typescript: "ts",
    };
    const ext = extensions[format];
    const filename = `${theme.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-theme.${ext}`;
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formats: Array<{ id: ExportFormat; label: string; tag: string }> = [
    { id: "tailwind4", label: "Tailwind v4", tag: "@theme" },
    { id: "tailwind3", label: "Tailwind v3", tag: "config.js" },
    { id: "css", label: "CSS Variables", tag: ":root" },
    { id: "shadcn", label: "Shadcn UI", tag: "base layer" },
    { id: "json", label: "Figma Tokens", tag: "W3C JSON" },
    { id: "typescript", label: "TypeScript", tag: ".ts object" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div
        className="w-full max-w-2xl max-h-[90vh] rounded-2xl border flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        style={{ background: t.cardBg, borderColor: t.border }}
      >
        {/* Header */}
        <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: t.border }}>
          <div>
            <h3 className="text-base font-bold" style={{ color: t.textPrimary }}>
              Export Design Tokens
            </h3>
            <p className="text-xs" style={{ color: t.textSecondary }}>
              Ready-to-use theme code for {theme.name} across frameworks & design tools
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-black/10 transition-colors text-xs font-semibold"
            style={{ color: t.textMuted }}
          >
            ✕
          </button>
        </div>

        {/* Format Selector Tabs */}
        <div className="px-5 pt-3 flex items-center gap-1.5 border-b overflow-x-auto" style={{ borderColor: t.border }}>
          {formats.map((f) => {
            const isActive = format === f.id;
            return (
              <button
                key={f.id}
                id={`export-format-${f.id}`}
                onClick={() => setFormat(f.id)}
                className="px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap flex items-center gap-1.5"
                style={{
                  borderBottom: isActive ? `2px solid ${t.accent}` : "none",
                  color: isActive ? t.accent : t.textSecondary,
                }}
              >
                <span>{f.label}</span>
                <span className="text-[10px] opacity-60 font-mono">({f.tag})</span>
              </button>
            );
          })}
        </div>

        {/* Code Preview Area */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4" style={{ background: t.bg }}>
          <div className="relative rounded-xl border overflow-hidden" style={{ borderColor: t.border, background: t.cardBg }}>
            <div className="px-4 py-2 border-b flex items-center justify-between text-[11px] font-mono" style={{ borderColor: t.border }}>
              <span style={{ color: t.textMuted }}>{format} output snippet</span>
              <span style={{ color: t.accent }}>UTF-8</span>
            </div>
            <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed max-h-72" style={{ color: t.textSecondary }}>
              <code>{code}</code>
            </pre>
          </div>

          {/* Quick share URL box */}
          <div className="p-3.5 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ borderColor: t.border, background: t.cardBg }}>
            <div className="flex items-center gap-2">
              <span style={{ color: t.accent }}>🔗</span>
              <div>
                <p className="font-semibold" style={{ color: t.textPrimary }}>Shareable Palette Link</p>
                <p className="text-[11px]" style={{ color: t.textMuted }}>Direct URL containing this exact color palette configuration</p>
              </div>
            </div>
            <button
              id="export-copy-share-url-btn"
              onClick={handleCopyShareLink}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all hover:opacity-90 shrink-0"
              style={{ borderColor: t.border, background: t.bg, color: t.textPrimary }}
            >
              {linkCopied ? "✓ Link Copied!" : "Copy Link"}
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t flex items-center justify-end gap-2" style={{ borderColor: t.border, background: t.cardBg }}>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold border"
            style={{ borderColor: t.border, background: t.bg, color: t.textSecondary }}
          >
            Close
          </button>
          <button
            id="export-download-file-btn"
            onClick={handleDownloadFile}
            className="px-4 py-2 rounded-xl text-xs font-semibold border"
            style={{ borderColor: t.border, background: t.bg, color: t.textPrimary }}
          >
            Download File
          </button>
          <button
            id="export-copy-code-btn"
            onClick={handleCopyCode}
            className="px-5 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-95 shadow"
            style={{ background: t.accent, color: t.accentText }}
          >
            {copied ? "✓ Copied to Clipboard!" : "Copy Code"}
          </button>
        </div>
      </div>
    </div>
  );
}
