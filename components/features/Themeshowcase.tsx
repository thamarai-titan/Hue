"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Inline types & data (from data.ts) ─────────────────────────────────────

interface Theme {
    id: string;
    name: string;
    description: string;
    vars: {
        bg: string;
        cardBg: string;
        textPrimary: string;
        textSecondary: string;
        textMuted: string;
        border: string;
        accent: string;
        accentSubtle: string;
        accentText: string;
        success: string;
        successBg: string;
        warning: string;
        warningBg: string;
        danger: string;
        dangerBg: string;
        muted: string;
    };
}

const themes: Theme[] = [
    {
        id: "vercel-dark",
        name: "Geist",
        description: "Vercel-inspired stark contrast",
        vars: {
            bg: "#000000",
            cardBg: "#111111",
            textPrimary: "#ffffff",
            textSecondary: "#a1a1a1",
            textMuted: "#666666",
            border: "#333333",
            accent: "#ffffff",
            accentSubtle: "#333333",
            accentText: "#000000",
            success: "#0070f3",
            successBg: "rgba(0,112,243,0.1)",
            warning: "#f5a623",
            warningBg: "rgba(245,166,35,0.1)",
            danger: "#ee0000",
            dangerBg: "rgba(238,0,0,0.1)",
            muted: "#222222",
        },
    },
    {
        id: "apple-light",
        name: "Cupertino",
        description: "Clean Apple-style silver",
        vars: {
            bg: "#f5f5f7",
            cardBg: "#ffffff",
            textPrimary: "#1d1d1f",
            textSecondary: "#86868b",
            textMuted: "#a1a1a6",
            border: "#d2d2d7",
            accent: "#0071e3",
            accentSubtle: "#e8f2ff",
            accentText: "#ffffff",
            success: "#34c759",
            successBg: "#f2fff5",
            warning: "#ff9500",
            warningBg: "#fff9f0",
            danger: "#ff3b30",
            dangerBg: "#fff1f0",
            muted: "#e5e5ea",
        },
    },
    {
        id: "claude-light",
        name: "Anthropic",
        description: "Claude.ai warm paper aesthetic",
        vars: {
            bg: "#f9f6f1",
            cardBg: "#ffffff",
            textPrimary: "#1f1e1b",
            textSecondary: "#6b6966",
            textMuted: "#a6a4a1",
            border: "#e6e1d6",
            accent: "#d97757",
            accentSubtle: "#f4ede4",
            accentText: "#ffffff",
            success: "#528a70",
            successBg: "#f1f7f4",
            warning: "#c28e40",
            warningBg: "#f9f4ec",
            danger: "#b34d4d",
            dangerBg: "#f9f1f1",
            muted: "#d8d1c5",
        },
    },
    {
        id: "linear-dark",
        name: "Deep Space",
        description: "Linear-style charcoal & indigo",
        vars: {
            bg: "#08090a",
            cardBg: "#111214",
            textPrimary: "#f7f8f8",
            textSecondary: "#8a8f98",
            textMuted: "#4b4e54",
            border: "#222326",
            accent: "#5e6ad2",
            accentSubtle: "rgba(94,106,210,0.1)",
            accentText: "#ffffff",
            success: "#4df299",
            successBg: "rgba(77,242,153,0.1)",
            warning: "#f2a64d",
            warningBg: "rgba(242,166,77,0.1)",
            danger: "#f24d4d",
            dangerBg: "rgba(242,77,77,0.1)",
            muted: "#1a1c1e",
        },
    },
    {
        id: "mono-tangerine",
        name: "Tangerine",
        description: "Your custom minimalist orange",
        vars: {
            bg: "#0a0a0a",
            cardBg: "#141414",
            textPrimary: "#fafafa",
            textSecondary: "#a1a1aa",
            textMuted: "#52525b",
            border: "#262626",
            accent: "#ff8c00",
            accentSubtle: "rgba(255,140,0,0.12)",
            accentText: "#000000",
            success: "#22c55e",
            successBg: "rgba(34,197,94,0.1)",
            warning: "#eab308",
            warningBg: "rgba(234,179,8,0.1)",
            danger: "#ef4444",
            dangerBg: "rgba(239,68,68,0.1)",
            muted: "#262626",
        },
    },
    {
        id: "github-dim",
        name: "Primer",
        description: "GitHub-style dimmed navy",
        vars: {
            bg: "#0d1117",
            cardBg: "#161b22",
            textPrimary: "#c9d1d9",
            textSecondary: "#8b949e",
            textMuted: "#484f58",
            border: "#30363d",
            accent: "#2f81f7",
            accentSubtle: "rgba(47,129,247,0.1)",
            accentText: "#ffffff",
            success: "#238636",
            successBg: "rgba(35,134,54,0.1)",
            warning: "#d29922",
            warningBg: "rgba(210,153,34,0.1)",
            danger: "#f85149",
            dangerBg: "rgba(248,81,73,0.1)",
            muted: "#21262d",
        },
    },
    {
        id: "framer-purple",
        name: "Framer",
        description: "Creative electric violet",
        vars: {
            bg: "#050505",
            cardBg: "#0f0f0f",
            textPrimary: "#ffffff",
            textSecondary: "#999999",
            textMuted: "#444444",
            border: "#222222",
            accent: "#aa33ff",
            accentSubtle: "rgba(170,51,255,0.15)",
            accentText: "#ffffff",
            success: "#00ff88",
            successBg: "rgba(0,255,136,0.1)",
            warning: "#ffaa00",
            warningBg: "rgba(255,170,0,0.1)",
            danger: "#ff3366",
            dangerBg: "rgba(255,51,102,0.1)",
            muted: "#1a1a1a",
        },
    },
    {
        id: "notion-bone",
        name: "Notion",
        description: "Ink & bone productivity",
        vars: {
            bg: "#ffffff",
            cardBg: "#f7f6f3",
            textPrimary: "#37352f",
            textSecondary: "#73726e",
            textMuted: "#acaba9",
            border: "#e9e9e7",
            accent: "#37352f",
            accentSubtle: "#dfdedd",
            accentText: "#ffffff",
            success: "#0b6e4f",
            successBg: "#e7f3ef",
            warning: "#df9139",
            warningBg: "#fbf3db",
            danger: "#d44c47",
            dangerBg: "#fbe4e4",
            muted: "#efefef",
        },
    },
    {
        id: "midnight-neon",
        name: "Cyber",
        description: "High-contrast electric teal",
        vars: {
            bg: "#02040a",
            cardBg: "#0b0e14",
            textPrimary: "#e6edf3",
            textSecondary: "#7d8590",
            textMuted: "#484f58",
            border: "#1b1f23",
            accent: "#2dd4bf",
            accentSubtle: "rgba(45,212,191,0.1)",
            accentText: "#02040a",
            success: "#3fb950",
            successBg: "rgba(63,185,80,0.1)",
            warning: "#d29922",
            warningBg: "rgba(210,153,34,0.1)",
            danger: "#f85149",
            dangerBg: "rgba(248,81,73,0.1)",
            muted: "#161b22",
        },
    },
    {
        id: "nordic-snow",
        name: "Nord",
        description: "Cool arctic frost",
        vars: {
            bg: "#2e3440",
            cardBg: "#3b4252",
            textPrimary: "#eceff4",
            textSecondary: "#d8dee9",
            textMuted: "#4c566a",
            border: "#434c5e",
            accent: "#88c0d0",
            accentSubtle: "rgba(136,192,208,0.15)",
            accentText: "#2e3440",
            success: "#a3be8c",
            successBg: "rgba(163,190,140,0.1)",
            warning: "#ebcb8b",
            warningBg: "rgba(235,203,139,0.1)",
            danger: "#bf616a",
            dangerBg: "rgba(191,97,106,0.1)",
            muted: "#4c566a",
        },
    },
];

// ─── CSS export generator ────────────────────────────────────────────────────

function generateCSS(theme: Theme): string {
    return `:root {
  --bg: ${theme.vars.bg};
  --card-bg: ${theme.vars.cardBg};
  --text-primary: ${theme.vars.textPrimary};
  --text-secondary: ${theme.vars.textSecondary};
  --text-muted: ${theme.vars.textMuted};
  --border: ${theme.vars.border};
  --accent: ${theme.vars.accent};
  --accent-subtle: ${theme.vars.accentSubtle};
  --accent-text: ${theme.vars.accentText};
  --success: ${theme.vars.success};
  --success-bg: ${theme.vars.successBg};
  --warning: ${theme.vars.warning};
  --warning-bg: ${theme.vars.warningBg};
  --danger: ${theme.vars.danger};
  --danger-bg: ${theme.vars.dangerBg};
  --muted: ${theme.vars.muted};
}`;
}

// ─── Apply theme to CSS vars ─────────────────────────────────────────────────

function applyTheme(theme: Theme) {
    const root = document.documentElement;
    Object.entries(theme.vars).forEach(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`);
        root.style.setProperty(`--th-${cssKey}`, value);
    });
}

const v = (name: string) => `var(--th-${name})`;

// ─── Check icon ──────────────────────────────────────────────────────────────

function CheckIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function CopyIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M2 10V2h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// ─── Color swatch preview ────────────────────────────────────────────────────

function ColorSwatch({ color, label }: { color: string; label: string }) {
    return (
        <div className="flex flex-col gap-1.5">
            <div
                className="w-full h-8 rounded-md border"
                style={{ background: color, borderColor: "rgba(128,128,128,0.2)" }}
            />
            <span className="text-[10px] font-mono" style={{ color: v("text-muted") }}>
                {label}
            </span>
            <span className="text-[10px] font-mono" style={{ color: v("text-muted") }}>
                {color}
            </span>
        </div>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ThemeShowcase() {
    const [active, setActive] = useState<Theme>(themes[0]);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        applyTheme(active);
    }, [active]);

    useEffect(() => {
        applyTheme(themes[0]);
    }, []);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(generateCSS(active)).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, [active]);

    const t = active.vars;

    return (
        <div
            className="min-h-screen w-full transition-colors duration-300"
            style={{ background: v("bg") }}
        >
            {/* ── Header ── */}
            <header
                className="sticky top-0 border-b backdrop-blur-xl pointer-events-none"
                style={{ borderColor: v("border"), background: `color-mix(in srgb, ${t.bg} 85%, transparent)` }}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4 pointer-events-auto">
                    <div className="flex items-center gap-2.5">
                        <div
                            className="w-6 h-6 rounded-md flex items-center justify-center"
                            style={{ background: v("accent") }}
                        >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6h8M6 2v8" stroke={t.accentText} strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <span className="text-sm font-semibold tracking-tight" style={{ color: v("text-primary") }}>
                            Palettes
                        </span>
                    </div>
                    <span className="text-xs" style={{ color: v("text-muted") }}>
                        {themes.length} themes
                    </span>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

                {/* ── Hero ── */}
                <div className="mb-10">
                    <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: v("accent") }}>
                        Color System
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2" style={{ color: v("text-primary") }}>
                        Premium palettes,<br className="sm:hidden" /> zero configuration.
                    </h1>
                    <p className="text-sm" style={{ color: v("text-secondary") }}>
                        Pick a vibe. Grab the variables. See how it Looks on Components.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">

                    {/* ── Sidebar: Theme Selector ── */}
                    <aside className="flex flex-col gap-2">
                        {/* Theme list */}
                        <div
                            className="rounded-xl border overflow-hidden"
                            style={{ borderColor: v("border") }}
                        >
                            {themes.map((theme, i) => {
                                const isActive = active.id === theme.id;
                                return (
                                    <button
                                        key={theme.id}
                                        onClick={() => setActive(theme)}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
                                        style={{
                                            background: isActive ? v("accent-subtle") : v("card-bg"),
                                            borderBottom: i < themes.length - 1 ? `1px solid ${v("border")}` : "none",
                                        }}
                                    >
                                        {/* Color dot */}
                                        <span
                                            className="w-3 h-3 rounded-full shrink-0 ring-2 ring-offset-1"
                                            style={{
                                                background: theme.vars.accent,
                                                outline: isActive ? theme.vars.accent : "transparent",
                                                outlineOffset: theme.vars.bg,
                                                boxShadow: isActive ? `0 0 0 2px ${theme.vars.bg}, 0 0 0 3.5px ${theme.vars.accent}` : "none",
                                            }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <span
                                                className="text-sm font-medium block"
                                                style={{ color: isActive ? v("text-primary") : v("text-secondary") }}
                                            >
                                                {theme.name}
                                            </span>
                                            <span className="text-xs" style={{ color: v("text-muted") }}>
                                                {theme.description}
                                            </span>
                                        </div>
                                        {isActive && (
                                            <span style={{ color: v("accent") }}>
                                                <CheckIcon />
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Copy Button */}
                        <button
                            onClick={handleCopy}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                            style={{
                                background: copied ? v("success") : v("accent"),
                                color: copied ? "#fff" : v("accent-text"),
                                opacity: 1,
                            }}
                        >
                            {copied ? <CheckIcon /> : <CopyIcon />}
                            {copied ? "Copied!" : "Copy CSS Variables"}
                        </button>

                        {/* CSS Preview */}
                        <div
                            className="rounded-xl border p-4 overflow-hidden"
                            style={{ borderColor: v("border"), background: v("card-bg") }}
                        >
                            <p className="text-[10px] font-semibold tracking-widest uppercase mb-3" style={{ color: v("text-muted") }}>
                                CSS Output
                            </p>
                            <pre
                                className="text-[11px] font-mono leading-relaxed overflow-x-auto"
                                style={{ color: v("text-secondary") }}
                            >
                                <code>{generateCSS(active)}</code>
                            </pre>
                        </div>
                    </aside>

                    {/* ── Main Preview Panel ── */}
                    <div className="flex flex-col gap-4">

                        {/* Panel header */}
                        <div
                            className="rounded-xl border p-5 sm:p-6"
                            style={{ borderColor: v("border"), background: v("card-bg") }}
                        >
                            <div className="flex items-start justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="text-lg font-bold mb-0.5" style={{ color: v("text-primary") }}>
                                        {active.name}
                                    </h2>
                                    <p className="text-sm" style={{ color: v("text-secondary") }}>
                                        {active.description}
                                    </p>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button
                                        className="px-3.5 py-1.5 rounded-lg text-xs font-semibold"
                                        style={{ background: v("accent"), color: v("accent-text") }}
                                    >
                                        Get started
                                    </button>
                                    <button
                                        className="px-3.5 py-1.5 rounded-lg text-xs font-semibold border"
                                        style={{ borderColor: v("border"), color: v("text-secondary"), background: v("card-bg") }}
                                    >
                                        Docs
                                    </button>
                                </div>
                            </div>

                            {/* Color Palette Grid */}
                            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                                <ColorSwatch color={t.bg} label="bg" />
                                <ColorSwatch color={t.cardBg} label="card-bg" />
                                <ColorSwatch color={t.textPrimary} label="text" />
                                <ColorSwatch color={t.border} label="border" />
                                <ColorSwatch color={t.accent} label="accent" />
                                <ColorSwatch color={t.success} label="success" />
                                <ColorSwatch color={t.warning} label="warning" />
                                <ColorSwatch color={t.danger} label="danger" />
                            </div>
                        </div>

                        {/* Stats row */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-4">
                            {[
                                { label: "Revenue", value: "$48.2K", delta: "+12.4%", pos: true },
                                { label: "Active Users", value: "8,421", delta: "+5.2%", pos: true },
                                { label: "Churn Rate", value: "2.1%", delta: "-0.4%", pos: true },
                            ].map((s) => (
                                <div
                                    key={s.label}
                                    className="rounded-xl border p-4"
                                    style={{ borderColor: v("border"), background: v("card-bg") }}
                                >
                                    <p className="text-xs mb-2" style={{ color: v("text-muted") }}>
                                        {s.label}
                                    </p>
                                    <p className="text-xl font-bold mb-1" style={{ color: v("text-primary") }}>
                                        {s.value}
                                    </p>
                                    <p className="text-xs font-medium" style={{ color: v("success") }}>
                                        {s.delta}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Two column */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Left: Alerts */}
                            <div className="flex flex-col gap-3">
                                {[
                                    { kind: "success", label: "Deployed", msg: "v2.4.1 is live on production." },
                                    { kind: "warning", label: "Rate limit", msg: "80% of monthly quota used." },
                                    { kind: "danger", label: "Build failed", msg: "Unexpected token in config.ts." },
                                ].map(({ kind, label, msg }) => {
                                    const colorKey = kind as "success" | "warning" | "danger";
                                    const bgKey = `${kind}Bg` as keyof typeof t;
                                    return (
                                        <div
                                            key={kind}
                                            className="rounded-xl border px-4 py-3 flex items-start gap-3"
                                            style={{ borderColor: t[colorKey], background: t[bgKey] as string }}
                                        >
                                            <span
                                                className="text-xs font-bold mt-0.5 shrink-0"
                                                style={{ color: t[colorKey] }}
                                            >
                                                {kind === "success" ? "✓" : kind === "warning" ? "⚠" : "✕"}
                                            </span>
                                            <div>
                                                <p className="text-xs font-bold mb-0.5" style={{ color: t[colorKey] }}>
                                                    {label}
                                                </p>
                                                <p className="text-xs" style={{ color: v("text-secondary") }}>
                                                    {msg}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Right: Profile + Input + Tags */}
                            <div className="flex flex-col gap-3">

                                {/* Avatar card */}
                                <div
                                    className="rounded-xl border p-4 flex items-center gap-3"
                                    style={{ borderColor: v("border"), background: v("card-bg") }}
                                >
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-base shrink-0 border"
                                        style={{ background: v("accent-subtle"), borderColor: v("accent"), color: v("accent") }}
                                    >
                                        AK
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold" style={{ color: v("text-primary") }}>
                                            Arjun Krishnan
                                        </p>
                                        <p className="text-xs" style={{ color: v("text-muted") }}>
                                            Product Designer
                                        </p>
                                    </div>
                                    <span
                                        className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                                        style={{ background: v("accent-subtle"), color: v("accent") }}
                                    >
                                        Pro
                                    </span>
                                </div>

                                {/* Input */}
                                <div
                                    className="rounded-xl border p-4"
                                    style={{ borderColor: v("border"), background: v("card-bg") }}
                                >
                                    <label
                                        className="block text-[10px] font-semibold uppercase tracking-widest mb-2"
                                        style={{ color: v("text-muted") }}
                                    >
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full px-3 py-2 rounded-lg text-sm outline-none border transition-colors"
                                        style={{
                                            background: v("bg"),
                                            borderColor: v("border"),
                                            color: v("text-primary"),
                                            fontFamily: "inherit",
                                        }}
                                    />
                                </div>

                                {/* Tags */}
                                <div
                                    className="rounded-xl border p-4"
                                    style={{ borderColor: v("border"), background: v("card-bg") }}
                                >
                                    <p
                                        className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                                        style={{ color: v("text-muted") }}
                                    >
                                        Stack
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {["React", "TypeScript", "Next.js", "Tailwind", "Prisma"].map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs font-medium px-2.5 py-1 rounded-full border"
                                                style={{
                                                    background: v("accent-subtle"),
                                                    color: v("text-secondary"),
                                                    borderColor: v("border"),
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Progress bars */}
                        <div
                            className="rounded-xl border p-5"
                            style={{ borderColor: v("border"), background: v("card-bg") }}
                        >
                            <p
                                className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                                style={{ color: v("text-muted") }}
                            >
                                Usage
                            </p>
                            <div className="flex flex-col gap-4">
                                {[
                                    { label: "Storage", value: 72 },
                                    { label: "API Quota", value: 45 },
                                    { label: "Bandwidth", value: 88 },
                                ].map(({ label, value }) => (
                                    <div key={label}>
                                        <div className="flex justify-between mb-1.5">
                                            <span className="text-xs" style={{ color: v("text-secondary") }}>
                                                {label}
                                            </span>
                                            <span className="text-xs font-semibold" style={{ color: v("text-primary") }}>
                                                {value}%
                                            </span>
                                        </div>
                                        <div
                                            className="h-1.5 rounded-full overflow-hidden"
                                            style={{ background: v("muted") }}
                                        >
                                            <div
                                                className="h-full rounded-full transition-all duration-700"
                                                style={{ width: `${value}%`, background: v("accent") }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Typography */}
                        <div
                            className="rounded-xl border p-5"
                            style={{ borderColor: v("border"), background: v("card-bg") }}
                        >
                            <p
                                className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                                style={{ color: v("text-muted") }}
                            >
                                Typography
                            </p>
                            <div className="space-y-2">
                                <p className="text-2xl font-bold" style={{ color: v("text-primary") }}>
                                    The quick brown fox
                                </p>
                                <p className="text-sm leading-relaxed" style={{ color: v("text-secondary") }}>
                                    Jumps over the lazy dog.{" "}
                                    <span style={{ color: v("accent") }} className="font-semibold">
                                        Accent color
                                    </span>{" "}
                                    makes important details stand out while{" "}
                                    <span style={{ color: v("text-muted") }}>muted text</span> recedes quietly.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}