"use client";

import { useState, useEffect, useCallback } from "react";
import { Theme, ThemeCategory, ProjectViewId } from "./types";
import {
  defaultThemes,
  getRandomPreset,
  invertTheme,
  evaluateContrast,
} from "./palettes";
import AnalyticsProject from "./projects/AnalyticsProject";
import EditorProject from "./projects/EditorProject";
import EcommerceProject from "./projects/EcommerceProject";
import AiChatProject from "./projects/AiChatProject";
import ComponentsProject from "./projects/ComponentsProject";
import CustomizerModal from "./CustomizerModal";
import ExportModal from "./ExportModal";

export default function ThemeShowcase() {
  const [themesList, setThemesList] = useState<Theme[]>(() => {
    if (typeof window === "undefined") return defaultThemes;
    try {
      const saved = localStorage.getItem("hue_custom_themes");
      if (saved) {
        const parsed: Theme[] = JSON.parse(saved);
        return [...defaultThemes, ...parsed];
      }
    } catch {
      // ignore
    }
    return defaultThemes;
  });

  const [active, setActive] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultThemes[0];
    try {
      const params = new URLSearchParams(window.location.search);
      const themeData = params.get("themeData");
      const themeName = params.get("themeName");
      if (themeData) {
        const parsedVars = JSON.parse(decodeURIComponent(themeData));
        return {
          id: `shared-${Date.now()}`,
          name: themeName ? decodeURIComponent(themeName) : "Shared Palette",
          description: "Imported via shareable URL",
          category: "custom",
          vars: parsedVars,
          isCustom: true,
        };
      }
    } catch {
      // ignore
    }
    return defaultThemes[0];
  });

  const [activeProject, setActiveProject] = useState<ProjectViewId>("analytics");
  const [categoryFilter, setCategoryFilter] = useState<ThemeCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  // Apply theme to CSS variables in DOM
  const applyThemeVars = useCallback((t: Theme) => {
    const root = document.documentElement;
    Object.entries(t.vars).forEach(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`);
      root.style.setProperty(`--th-${cssKey}`, value);
    });
  }, []);

  useEffect(() => {
    applyThemeVars(active);
  }, [active, applyThemeVars]);

  const handleRandomize = useCallback(() => {
    const nextTheme = getRandomPreset(active.id);
    setActive(nextTheme);
    showToast(`Switched to "${nextTheme.name}"`);
  }, [active.id, showToast]);

  // Keyboard shortcut: Space to randomize (when not typing in an input/textarea)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.code === "Space" &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName) &&
        !isCustomizerOpen &&
        !isExportOpen
      ) {
        e.preventDefault();
        handleRandomize();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRandomize, isCustomizerOpen, isExportOpen]);

  const handleInvert = () => {
    const invertedVars = invertTheme(active.vars);
    const updated: Theme = {
      ...active,
      id: `inverted-${Date.now()}`,
      name: `${active.name} (Inverted)`,
      vars: invertedVars,
    };
    setActive(updated);
    showToast("Palette inverted!");
  };

  const handleSaveCustomTheme = (newTheme: Theme) => {
    const updatedList = [newTheme, ...themesList.filter((t) => t.id !== newTheme.id)];
    setThemesList(updatedList);
    setActive(newTheme);
    try {
      const customOnly = updatedList.filter((t) => t.isCustom);
      localStorage.setItem("hue_custom_themes", JSON.stringify(customOnly));
    } catch {
      // ignore
    }
    showToast(`Saved "${newTheme.name}" to your library!`);
  };

  const handleDeleteCustomTheme = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = themesList.filter((t) => t.id !== id);
    setThemesList(updated);
    try {
      const customOnly = updated.filter((t) => t.isCustom);
      localStorage.setItem("hue_custom_themes", JSON.stringify(customOnly));
    } catch {
      // ignore
    }
    if (active.id === id) {
      setActive(defaultThemes[0]);
    }
    showToast("Custom theme removed");
  };

  const handleCopyHex = (color: string, label: string) => {
    navigator.clipboard.writeText(color).then(() => {
      showToast(`Copied ${label} (${color})`);
    });
  };

  // Filter themes
  const filteredThemes = themesList.filter((t) => {
    const matchesCat = categoryFilter === "all" || t.category === categoryFilter;
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const t = active.vars;
  const contrast = evaluateContrast(t.textPrimary, t.bg);

  const projectTabs: Array<{ id: ProjectViewId; label: string; icon: string }> = [
    { id: "analytics", label: "SaaS Analytics", icon: "📊" },
    { id: "ide", label: "Cloud IDE", icon: "💻" },
    { id: "ecommerce", label: "E-Commerce", icon: "🛍️" },
    { id: "chat", label: "AI Chat", icon: "💬" },
    { id: "uikit", label: "UI Kit", icon: "🧩" },
  ];

  return (
    <div
      className="min-h-screen w-full transition-colors duration-300 relative"
      style={{ background: t.bg, color: t.textPrimary }}
    >
      {/* Toast popup */}
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl border text-xs font-semibold shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3"
          style={{
            background: t.cardBg,
            borderColor: t.accent,
            color: t.textPrimary,
          }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: t.accent }} />
            <span>{toast}</span>
          </div>
        </div>
      )}

      {/* Main Studio Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
        {/* Studio Top Control Deck */}
        <div
          className="rounded-3xl border p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${t.cardBg}, ${t.muted})`,
            borderColor: t.border,
          }}
        >
          {/* Subtle Ambient Glow */}
          <div
            className="absolute -right-24 -top-24 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
            style={{ background: t.accent }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <span
                  className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
                  style={{
                    background: t.accentSubtle,
                    color: t.accent,
                    borderColor: t.border,
                  }}
                >
                  Theme Studio v2.0
                </span>
                <span
                  className="text-xs font-mono px-2.5 py-1 rounded-full border flex items-center gap-1.5"
                  style={{
                    borderColor: t.border,
                    background: t.cardBg,
                    color: contrast.gradeNormalAA ? t.success : t.warning,
                  }}
                >
                  <span>WCAG {contrast.label}</span>
                  <span className="opacity-70 font-semibold">{contrast.ratio}:1</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2" style={{ color: t.textPrimary }}>
                {active.name}
              </h1>
              <p className="text-sm max-w-xl" style={{ color: t.textSecondary }}>
                {active.description}. Explore how your tokens adapt dynamically across enterprise apps.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {/* Randomize */}
              <button
                id="btn-randomize-palette"
                onClick={handleRandomize}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                style={{
                  borderColor: t.border,
                  background: t.cardBg,
                  color: t.textPrimary,
                }}
                title="Press Spacebar to randomize"
              >
                <span>🎲</span>
                <span>Randomize</span>
                <span className="text-[10px] opacity-50 font-mono hidden sm:inline">[Space]</span>
              </button>

              {/* Invert */}
              <button
                id="btn-invert-palette"
                onClick={handleInvert}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all hover:scale-105"
                style={{
                  borderColor: t.border,
                  background: t.cardBg,
                  color: t.textPrimary,
                }}
              >
                <span>🌓</span>
                <span>Invert</span>
              </button>

              {/* Customize */}
              <button
                id="btn-customize-palette"
                onClick={() => setIsCustomizerOpen(true)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all hover:scale-105"
                style={{
                  borderColor: t.accent,
                  background: t.accentSubtle,
                  color: t.accent,
                }}
              >
                <span>🎨</span>
                <span>Customize</span>
              </button>

              {/* Export */}
              <button
                id="btn-export-code"
                onClick={() => setIsExportOpen(true)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-105 shadow-lg flex items-center gap-1.5"
                style={{
                  background: t.accent,
                  color: t.accentText,
                }}
              >
                <span>⚡</span>
                <span>Export Code</span>
              </button>
            </div>
          </div>

          {/* Color Swatch Bar */}
          <div className="mt-6 pt-5 border-t grid grid-cols-5 sm:grid-cols-10 gap-2" style={{ borderColor: t.border }}>
            {[
              { label: "bg", color: t.bg },
              { label: "card", color: t.cardBg },
              { label: "text", color: t.textPrimary },
              { label: "secondary", color: t.textSecondary },
              { label: "muted", color: t.textMuted },
              { label: "border", color: t.border },
              { label: "accent", color: t.accent },
              { label: "success", color: t.success },
              { label: "warning", color: t.warning },
              { label: "danger", color: t.danger },
            ].map(({ label, color }) => (
              <div
                key={label}
                onClick={() => handleCopyHex(color, label)}
                className="group cursor-pointer flex flex-col items-center gap-1.5 p-1.5 rounded-xl hover:bg-black/10 transition-colors"
                title={`Click to copy ${label} (${color})`}
              >
                <div
                  className="w-full h-7 rounded-lg border transition-transform group-hover:scale-105 shadow-sm"
                  style={{
                    background: color,
                    borderColor: t.border,
                  }}
                />
                <span className="text-[10px] font-mono tracking-tight text-center truncate w-full" style={{ color: t.textMuted }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Project View Tabs Bar */}
        <div
          className="p-1.5 rounded-2xl border flex flex-wrap items-center gap-1.5 shadow-sm"
          style={{ background: t.cardBg, borderColor: t.border }}
        >
          <span className="text-xs font-semibold px-3 py-1.5 hidden md:inline" style={{ color: t.textMuted }}>
            PROJECT PREVIEW:
          </span>
          {projectTabs.map((tab) => {
            const isSel = activeProject === tab.id;
            return (
              <button
                key={tab.id}
                id={`project-tab-${tab.id}`}
                onClick={() => setActiveProject(tab.id)}
                className="px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2"
                style={{
                  background: isSel ? t.accent : "transparent",
                  color: isSel ? t.accentText : t.textSecondary,
                  boxShadow: isSel ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Studio Workspace: Sidebar + Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 items-start">
          {/* Sidebar: Theme Catalog */}
          <aside
            className="rounded-2xl border p-4 sm:p-5 flex flex-col gap-4 shadow-lg sticky top-6"
            style={{ background: t.cardBg, borderColor: t.border }}
          >
            {/* Header & Count */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider uppercase" style={{ color: t.textPrimary }}>
                Themes Library
              </span>
              <span
                className="text-[11px] font-mono px-2 py-0.5 rounded-full"
                style={{ background: t.muted, color: t.textMuted }}
              >
                {filteredThemes.length} available
              </span>
            </div>

            {/* Search Input */}
            <input
              type="text"
              id="theme-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search palettes..."
              className="w-full px-3.5 py-2 rounded-xl text-xs outline-none border transition-colors"
              style={{
                background: t.bg,
                borderColor: t.border,
                color: t.textPrimary,
              }}
            />

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-1.5">
              {(["all", "dark", "light", "cyber", "editorial", "custom"] as const).map((cat) => (
                <button
                  key={cat}
                  id={`cat-filter-${cat}`}
                  onClick={() => setCategoryFilter(cat)}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-lg capitalize transition-colors"
                  style={{
                    background: categoryFilter === cat ? t.accent : t.bg,
                    color: categoryFilter === cat ? t.accentText : t.textSecondary,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Themes List Scrollable */}
            <div className="max-h-[440px] overflow-y-auto space-y-1.5 pr-1">
              {filteredThemes.map((theme) => {
                const isSelected = active.id === theme.id;
                return (
                  <div
                    key={theme.id}
                    id={`theme-item-${theme.id}`}
                    onClick={() => setActive(theme)}
                    className="group w-full p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between gap-3 hover:scale-[1.01]"
                    style={{
                      borderColor: isSelected ? t.accent : t.border,
                      background: isSelected ? t.accentSubtle : t.bg,
                    }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Color Preview Swatch */}
                      <span
                        className="w-4 h-4 rounded-full shrink-0 border ring-2 ring-offset-1"
                        style={{
                          background: theme.vars.accent,
                          borderColor: theme.vars.border,
                          outline: isSelected ? theme.vars.accent : "transparent",
                          boxShadow: isSelected
                            ? `0 0 0 2px ${theme.vars.bg}, 0 0 0 4px ${theme.vars.accent}`
                            : "none",
                        }}
                      />
                      <div className="min-w-0">
                        <p
                          className="text-xs font-semibold truncate"
                          style={{ color: isSelected ? t.textPrimary : t.textSecondary }}
                        >
                          {theme.name}
                        </p>
                        <p className="text-[10px] truncate" style={{ color: t.textMuted }}>
                          {theme.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {theme.isCustom && (
                        <button
                          onClick={(e) => handleDeleteCustomTheme(e, theme.id)}
                          className="text-xs p-1 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"
                          title="Delete custom theme"
                        >
                          ✕
                        </button>
                      )}
                      {isSelected && (
                        <span className="text-xs font-bold" style={{ color: t.accent }}>
                          ✓
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {filteredThemes.length === 0 && (
                <div className="py-8 text-center text-xs" style={{ color: t.textMuted }}>
                  No palettes found matching &ldquo;{searchQuery}&rdquo;
                </div>
              )}
            </div>

            {/* Add Custom Theme Button */}
            <button
              id="sidebar-create-custom-btn"
              onClick={() => setIsCustomizerOpen(true)}
              className="w-full py-2.5 rounded-xl text-xs font-semibold border border-dashed flex items-center justify-center gap-1.5 transition-colors hover:opacity-90"
              style={{
                borderColor: t.accent,
                color: t.accent,
                background: t.accentSubtle,
              }}
            >
              <span>+</span>
              <span>Create Custom Theme</span>
            </button>
          </aside>

          {/* Active Project Showcase Surface */}
          <main
            className="rounded-3xl border p-6 sm:p-8 shadow-2xl transition-all duration-300"
            style={{
              background: t.bg,
              borderColor: t.border,
            }}
          >
            {activeProject === "analytics" && <AnalyticsProject theme={active} />}
            {activeProject === "ide" && <EditorProject theme={active} />}
            {activeProject === "ecommerce" && <EcommerceProject theme={active} />}
            {activeProject === "chat" && <AiChatProject theme={active} />}
            {activeProject === "uikit" && <ComponentsProject theme={active} />}
          </main>
        </div>
      </div>

      {/* Modals */}
      <CustomizerModal
        theme={active}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onApplyTheme={(updated) => setActive(updated)}
        onSaveCustomTheme={handleSaveCustomTheme}
      />

      <ExportModal
        theme={active}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
}