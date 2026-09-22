"use client";

import { useState } from "react";
import { Theme } from "../types";

export default function ComponentsProject({ theme }: { theme: Theme }) {
  const [toggleState, setToggleState] = useState(true);
  const [sliderVal, setSliderVal] = useState(65);
  const [checkboxState, setCheckboxState] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const t = theme.vars;

  const handleSimulateLoading = () => {
    setBtnLoading(true);
    setTimeout(() => setBtnLoading(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: t.border }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: t.accentSubtle, color: t.accent }}
            >
              Design System
            </span>
            <span className="text-xs" style={{ color: t.textMuted }}>Interactive UI Kit</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight" style={{ color: t.textPrimary }}>
            Primacy Component Library
          </h2>
        </div>

        <button
          id="uikit-open-dialog-btn"
          onClick={() => setShowModal(true)}
          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all"
          style={{ borderColor: t.accent, color: t.accent, background: t.accentSubtle }}
        >
          Preview Modal Dialog
        </button>
      </div>

      {/* Grid of UI Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Buttons Section */}
        <div className="p-6 rounded-2xl border space-y-4" style={{ background: t.cardBg, borderColor: t.border }}>
          <h3 className="text-xs font-semibold tracking-wider uppercase" style={{ color: t.textMuted }}>
            Action Buttons
          </h3>

          <div className="flex flex-wrap gap-2.5 items-center">
            {/* Solid Accent */}
            <button
              className="px-4 py-2 rounded-xl text-xs font-semibold shadow transition-all hover:opacity-90"
              style={{ background: t.accent, color: t.accentText }}
            >
              Solid Primary
            </button>

            {/* Subtle */}
            <button
              className="px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-90"
              style={{ background: t.accentSubtle, color: t.accent }}
            >
              Subtle Tint
            </button>

            {/* Outline */}
            <button
              className="px-4 py-2 rounded-xl text-xs font-semibold border transition-all hover:opacity-90"
              style={{ borderColor: t.border, background: t.bg, color: t.textPrimary }}
            >
              Secondary
            </button>

            {/* Danger */}
            <button
              className="px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-90"
              style={{ background: t.dangerBg, color: t.danger }}
            >
              Destructive
            </button>

            {/* Loading */}
            <button
              onClick={handleSimulateLoading}
              className="px-4 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all"
              style={{ borderColor: t.border, background: t.bg, color: t.textSecondary }}
            >
              {btnLoading ? (
                <>
                  <span className="w-3 h-3 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: `${t.accent} transparent transparent transparent` }} />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Test Spinner</span>
              )}
            </button>
          </div>
        </div>

        {/* Inputs & Search */}
        <div className="p-6 rounded-2xl border space-y-4" style={{ background: t.cardBg, borderColor: t.border }}>
          <h3 className="text-xs font-semibold tracking-wider uppercase" style={{ color: t.textMuted }}>
            Form Fields & Search
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: t.textSecondary }}>
                Project Title
              </label>
              <input
                type="text"
                defaultValue="Quantum Engine v2"
                className="w-full px-3.5 py-2 rounded-xl text-xs outline-none border transition-colors focus:ring-1"
                style={{
                  background: t.bg,
                  borderColor: t.border,
                  color: t.textPrimary,
                }}
              />
            </div>

            <div className="relative">
              <label className="block text-xs font-medium mb-1" style={{ color: t.textSecondary }}>
                Quick Search
              </label>
              <input
                type="text"
                placeholder="Search commands, files..."
                className="w-full px-3.5 py-2 rounded-xl text-xs outline-none border pr-14"
                style={{
                  background: t.bg,
                  borderColor: t.border,
                  color: t.textPrimary,
                }}
              />
              <span
                className="absolute right-2.5 top-[27px] px-1.5 py-0.5 rounded text-[10px] font-mono border"
                style={{ borderColor: t.border, color: t.textMuted, background: t.cardBg }}
              >
                ⌘K
              </span>
            </div>
          </div>
        </div>

        {/* Switches, Checkboxes, Range */}
        <div className="p-6 rounded-2xl border space-y-4" style={{ background: t.cardBg, borderColor: t.border }}>
          <h3 className="text-xs font-semibold tracking-wider uppercase" style={{ color: t.textMuted }}>
            Toggles & Interactive Controls
          </h3>

          <div className="space-y-4">
            {/* Toggle Switch */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold" style={{ color: t.textPrimary }}>Automatic Cloud Deployment</p>
                <p className="text-[11px]" style={{ color: t.textMuted }}>Sync changes instantly upon Git push</p>
              </div>
              <button
                id="uikit-toggle-switch"
                onClick={() => setToggleState(!toggleState)}
                className="w-11 h-6 rounded-full transition-colors relative p-0.5 shrink-0"
                style={{ background: toggleState ? t.accent : t.muted }}
              >
                <div
                  className="w-5 h-5 rounded-full bg-white transition-transform"
                  style={{
                    transform: toggleState ? "translateX(20px)" : "translateX(0px)",
                  }}
                />
              </button>
            </div>

            {/* Checkbox */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checkboxState}
                onChange={(e) => setCheckboxState(e.target.checked)}
                className="rounded border"
                style={{ accentColor: t.accent }}
              />
              <span className="text-xs font-medium" style={{ color: t.textSecondary }}>
                Enable WCAG real-time contrast warnings
              </span>
            </label>

            {/* Range Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span style={{ color: t.textSecondary }}>Ambient Lighting</span>
                <span className="font-mono font-semibold" style={{ color: t.accent }}>{sliderVal}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={(e) => setSliderVal(Number(e.target.value))}
                className="w-full cursor-pointer h-1.5 rounded-lg appearance-none"
                style={{
                  background: `linear-gradient(to right, ${t.accent} ${sliderVal}%, ${t.muted} ${sliderVal}%)`,
                  accentColor: t.accent,
                }}
              />
            </div>
          </div>
        </div>

        {/* Feedback Banners & Badges */}
        <div className="p-6 rounded-2xl border space-y-4" style={{ background: t.cardBg, borderColor: t.border }}>
          <h3 className="text-xs font-semibold tracking-wider uppercase" style={{ color: t.textMuted }}>
            Alerts & Status Pills
          </h3>

          <div className="space-y-3">
            {/* Success */}
            <div
              className="p-3.5 rounded-xl border flex items-center justify-between"
              style={{ background: t.successBg, borderColor: t.success }}
            >
              <div className="flex items-center gap-2 text-xs font-medium" style={{ color: t.success }}>
                <span>✓</span>
                <span>Production build deployed successfully.</span>
              </div>
              <span className="text-[10px] font-mono" style={{ color: t.success }}>200 OK</span>
            </div>

            {/* Warning */}
            <div
              className="p-3.5 rounded-xl border flex items-center justify-between"
              style={{ background: t.warningBg, borderColor: t.warning }}
            >
              <div className="flex items-center gap-2 text-xs font-medium" style={{ color: t.warning }}>
                <span>⚠</span>
                <span>API rate limits at 85% utilization.</span>
              </div>
              <span className="text-[10px] font-mono" style={{ color: t.warning }}>WARN</span>
            </div>

            {/* Badges list */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: t.accent, color: t.accentText }}>
                Primary Pill
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: t.accentSubtle, color: t.accent }}>
                Subtle Pill
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: t.successBg, color: t.success }}>
                Live Active
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: t.dangerBg, color: t.danger }}>
                Offline
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Modal Dialog Preview */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className="w-full max-w-md rounded-2xl border p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200"
            style={{ background: t.cardBg, borderColor: t.border }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-base font-bold" style={{ color: t.textPrimary }}>
                  Confirm Deployment
                </h4>
                <p className="text-xs" style={{ color: t.textSecondary }}>
                  Deploying with {theme.name} palette tokens to production edge network.
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-xs p-1 rounded hover:bg-black/10 transition-colors"
                style={{ color: t.textMuted }}
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-xl border text-xs" style={{ borderColor: t.border, background: t.bg, color: t.textSecondary }}>
              This change will invalidate edge caches across 38 global points of presence.
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold border"
                style={{ borderColor: t.border, background: t.bg, color: t.textSecondary }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold"
                style={{ background: t.accent, color: t.accentText }}
              >
                Confirm Push
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
