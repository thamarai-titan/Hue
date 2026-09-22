"use client";

import { useState } from "react";
import { Theme, ThemeVars, HarmonyType } from "./types";
import {
  generateHarmoniousPalette,
  evaluateContrast,
  hexToRgb,
} from "./palettes";

interface CustomizerModalProps {
  theme: Theme;
  isOpen: boolean;
  onClose: () => void;
  onApplyTheme: (updatedTheme: Theme) => void;
  onSaveCustomTheme: (newTheme: Theme) => void;
}

export default function CustomizerModal({
  theme,
  isOpen,
  onClose,
  onApplyTheme,
  onSaveCustomTheme,
}: CustomizerModalProps) {
  const [activeTab, setActiveTab] = useState<"tokens" | "generator">("tokens");
  const [vars, setVars] = useState<ThemeVars>({ ...theme.vars });
  const [customName, setCustomName] = useState(`${theme.name} Custom`);
  const [seedColor, setSeedColor] = useState(theme.vars.accent);
  const [harmonyType, setHarmonyType] = useState<HarmonyType>("analogous");
  const [genMode, setGenMode] = useState<"dark" | "light">("dark");
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const t = theme.vars;

  const handleColorChange = (key: keyof ThemeVars, newColor: string) => {
    const updated = { ...vars, [key]: newColor };
    // Automatically recalculate subtle tint if accent changes
    if (key === "accent") {
      try {
        const rgb = hexToRgb(newColor);
        updated.accentSubtle = `rgba(${rgb.join(",")},0.15)`;
      } catch {
        // ignore
      }
    }
    setVars(updated);
    onApplyTheme({
      ...theme,
      vars: updated,
    });
  };

  const handleGenerateHarmony = () => {
    const generated = generateHarmoniousPalette(seedColor, harmonyType, genMode === "dark");
    setVars(generated);
    onApplyTheme({
      ...theme,
      vars: generated,
    });
  };

  const handleSave = () => {
    const newCustom: Theme = {
      id: `custom-${Date.now()}`,
      name: customName.trim() || "My Custom Theme",
      description: "User-created custom color scheme",
      category: "custom",
      vars: { ...vars },
      isCustom: true,
    };
    onSaveCustomTheme(newCustom);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  // Contrast scores
  const textBgContrast = evaluateContrast(vars.textPrimary, vars.bg);
  const accentBgContrast = evaluateContrast(vars.accent, vars.bg);
  const textCardContrast = evaluateContrast(vars.textPrimary, vars.cardBg);

  const tokenList: Array<{ key: keyof ThemeVars; label: string; desc: string }> = [
    { key: "bg", label: "Background", desc: "Page root background" },
    { key: "cardBg", label: "Card Surface", desc: "Container & panel surface" },
    { key: "textPrimary", label: "Text Primary", desc: "Headings & main text" },
    { key: "textSecondary", label: "Text Secondary", desc: "Subheadings & body" },
    { key: "textMuted", label: "Text Muted", desc: "Labels & captions" },
    { key: "border", label: "Border Color", desc: "Dividers & card outlines" },
    { key: "accent", label: "Accent Brand", desc: "Buttons, highlights & links" },
    { key: "success", label: "Success", desc: "Completed states & badges" },
    { key: "warning", label: "Warning", desc: "Alerts & caution states" },
    { key: "danger", label: "Danger / Error", desc: "Destructive & error actions" },
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
              Palette Customizer & Harmony Studio
            </h3>
            <p className="text-xs" style={{ color: t.textSecondary }}>
              Fine-tune design tokens or generate mathematically harmonious schemes
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

        {/* Tab switch */}
        <div className="px-5 pt-3 flex items-center gap-2 border-b" style={{ borderColor: t.border }}>
          <button
            id="customizer-tab-tokens"
            onClick={() => setActiveTab("tokens")}
            className="px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors"
            style={{
              borderBottom: activeTab === "tokens" ? `2px solid ${t.accent}` : "none",
              color: activeTab === "tokens" ? t.accent : t.textSecondary,
            }}
          >
            Color Tokens ({tokenList.length})
          </button>
          <button
            id="customizer-tab-generator"
            onClick={() => setActiveTab("generator")}
            className="px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors"
            style={{
              borderBottom: activeTab === "generator" ? `2px solid ${t.accent}` : "none",
              color: activeTab === "generator" ? t.accent : t.textSecondary,
            }}
          >
            Algorithmic Harmony Generator
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {/* Contrast Auditor Strip */}
          <div className="p-3.5 rounded-xl border flex flex-wrap items-center justify-between gap-3 text-xs" style={{ borderColor: t.border, background: t.bg }}>
            <span className="font-semibold" style={{ color: t.textPrimary }}>WCAG Contrast Check:</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span style={{ color: t.textSecondary }}>Text/Bg:</span>
                <span className="font-mono font-bold" style={{ color: textBgContrast.gradeNormalAA ? t.success : t.danger }}>
                  {textBgContrast.ratio}:1 ({textBgContrast.label})
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span style={{ color: t.textSecondary }}>Accent/Bg:</span>
                <span className="font-mono font-bold" style={{ color: accentBgContrast.gradeLargeAA ? t.success : t.warning }}>
                  {accentBgContrast.ratio}:1 ({accentBgContrast.label})
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span style={{ color: t.textSecondary }}>Text/Card:</span>
                <span className="font-mono font-bold" style={{ color: textCardContrast.gradeNormalAA ? t.success : t.danger }}>
                  {textCardContrast.ratio}:1 ({textCardContrast.label})
                </span>
              </div>
            </div>
          </div>

          {activeTab === "tokens" ? (
            /* Tokens Tab */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {tokenList.map(({ key, label, desc }) => (
                <div
                  key={key}
                  className="p-3 rounded-xl border flex items-center justify-between gap-3"
                  style={{ borderColor: t.border, background: t.bg }}
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold truncate" style={{ color: t.textPrimary }}>{label}</p>
                    <p className="text-[10px] truncate" style={{ color: t.textMuted }}>{desc}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <input
                      type="color"
                      value={vars[key]?.startsWith("#") ? vars[key] : "#ffffff"}
                      onChange={(e) => handleColorChange(key, e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border border-black/20"
                    />
                    <input
                      type="text"
                      value={vars[key] || ""}
                      onChange={(e) => handleColorChange(key, e.target.value)}
                      className="w-20 px-2 py-1 text-xs font-mono rounded border text-center outline-none"
                      style={{
                        borderColor: t.border,
                        background: t.cardBg,
                        color: t.textPrimary,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Harmony Generator Tab */
            <div className="space-y-5">
              <div className="p-4 rounded-xl border space-y-4" style={{ borderColor: t.border, background: t.bg }}>
                <p className="text-xs font-semibold" style={{ color: t.textPrimary }}>
                  1. Brand Seed Color
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={seedColor.startsWith("#") ? seedColor : "#ff8c00"}
                    onChange={(e) => setSeedColor(e.target.value)}
                    className="w-10 h-10 rounded-xl cursor-pointer border border-black/20"
                  />
                  <input
                    type="text"
                    value={seedColor}
                    onChange={(e) => setSeedColor(e.target.value)}
                    className="w-28 px-3 py-1.5 text-xs font-mono rounded-lg border outline-none font-semibold"
                    style={{ borderColor: t.border, background: t.cardBg, color: t.textPrimary }}
                  />
                  <span className="text-xs" style={{ color: t.textSecondary }}>
                    Auto-calculates luminance, tints & borders
                  </span>
                </div>
              </div>

              {/* Harmony Rule */}
              <div className="p-4 rounded-xl border space-y-3" style={{ borderColor: t.border, background: t.bg }}>
                <p className="text-xs font-semibold" style={{ color: t.textPrimary }}>
                  2. Harmony Mathematical Type
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(
                    [
                      { id: "analogous", name: "Analogous (30°)", desc: "Warm & cohesive" },
                      { id: "complementary", name: "Complementary (180°)", desc: "High energy" },
                      { id: "triadic", name: "Triadic (120°)", desc: "Vibrant balance" },
                      { id: "monochromatic", name: "Monochrome", desc: "Subtle & clean" },
                      { id: "cyberpunk", name: "Cyberpunk (150°)", desc: "Electric glow" },
                      { id: "pastel", name: "Soft Pastel", desc: "Calm & gentle" },
                    ] as const
                  ).map((rule) => {
                    const isSel = harmonyType === rule.id;
                    return (
                      <button
                        key={rule.id}
                        type="button"
                        onClick={() => setHarmonyType(rule.id)}
                        className="p-2.5 rounded-xl border text-left transition-all"
                        style={{
                          borderColor: isSel ? t.accent : t.border,
                          background: isSel ? t.accentSubtle : t.cardBg,
                        }}
                      >
                        <div className="text-xs font-semibold" style={{ color: isSel ? t.accent : t.textPrimary }}>
                          {rule.name}
                        </div>
                        <div className="text-[10px]" style={{ color: t.textMuted }}>{rule.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mode */}
              <div className="flex items-center justify-between p-4 rounded-xl border" style={{ borderColor: t.border, background: t.bg }}>
                <div>
                  <p className="text-xs font-semibold" style={{ color: t.textPrimary }}>Base Mode</p>
                  <p className="text-[10px]" style={{ color: t.textMuted }}>Choose between deep obsidian or clean canvas</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setGenMode("dark")}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all"
                    style={{
                      borderColor: genMode === "dark" ? t.accent : t.border,
                      background: genMode === "dark" ? t.accent : t.cardBg,
                      color: genMode === "dark" ? t.accentText : t.textSecondary,
                    }}
                  >
                    Dark Theme
                  </button>
                  <button
                    type="button"
                    onClick={() => setGenMode("light")}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all"
                    style={{
                      borderColor: genMode === "light" ? t.accent : t.border,
                      background: genMode === "light" ? t.accent : t.cardBg,
                      color: genMode === "light" ? t.accentText : t.textSecondary,
                    }}
                  >
                    Light Theme
                  </button>
                </div>
              </div>

              <button
                id="customizer-generate-harmony-btn"
                type="button"
                onClick={handleGenerateHarmony}
                className="w-full py-3 rounded-xl text-xs font-semibold shadow transition-all hover:opacity-95"
                style={{ background: t.accent, color: t.accentText }}
              >
                ⚡ Generate Harmonious Palette
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: t.border, background: t.bg }}>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Name your theme..."
              className="px-3 py-1.5 text-xs rounded-xl border outline-none flex-1 sm:w-48"
              style={{ borderColor: t.border, background: t.cardBg, color: t.textPrimary }}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold border"
              style={{ borderColor: t.border, background: t.cardBg, color: t.textSecondary }}
            >
              Cancel
            </button>
            <button
              id="customizer-save-custom-btn"
              type="button"
              onClick={handleSave}
              className="px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-95 flex items-center gap-1.5"
              style={{ background: t.accent, color: t.accentText }}
            >
              {savedSuccess ? "✓ Saved to Library!" : "Save Custom Theme"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
