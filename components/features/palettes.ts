import { Theme, ThemeVars, HarmonyType, ContrastScore } from "./types";

export const defaultThemes: Theme[] = [
  {
    id: "vercel-dark",
    name: "Geist",
    description: "Vercel-inspired stark contrast & precision",
    category: "dark",
    vars: {
      bg: "#000000",
      cardBg: "#0a0a0a",
      textPrimary: "#ffffff",
      textSecondary: "#a1a1a1",
      textMuted: "#555555",
      border: "#222222",
      accent: "#ffffff",
      accentSubtle: "rgba(255,255,255,0.08)",
      accentText: "#000000",
      success: "#0070f3",
      successBg: "rgba(0,112,243,0.12)",
      warning: "#f5a623",
      warningBg: "rgba(245,166,35,0.12)",
      danger: "#ee0000",
      dangerBg: "rgba(238,0,0,0.12)",
      muted: "#171717",
    },
  },
  {
    id: "apple-light",
    name: "Cupertino",
    description: "Clean Apple-style titanium & porcelain",
    category: "light",
    vars: {
      bg: "#f5f5f7",
      cardBg: "#ffffff",
      textPrimary: "#1d1d1f",
      textSecondary: "#6e6e73",
      textMuted: "#a1a1a6",
      border: "#d2d2d7",
      accent: "#0071e3",
      accentSubtle: "rgba(0,113,227,0.08)",
      accentText: "#ffffff",
      success: "#34c759",
      successBg: "rgba(52,199,89,0.12)",
      warning: "#ff9500",
      warningBg: "rgba(255,149,0,0.12)",
      danger: "#ff3b30",
      dangerBg: "rgba(255,59,48,0.12)",
      muted: "#e5e5ea",
    },
  },
  {
    id: "claude-light",
    name: "Anthropic",
    description: "Claude.ai warm paper & terracotta",
    category: "editorial",
    vars: {
      bg: "#fbf8f3",
      cardBg: "#ffffff",
      textPrimary: "#1f1e1b",
      textSecondary: "#6b6966",
      textMuted: "#9a9791",
      border: "#e7e2d7",
      accent: "#d97757",
      accentSubtle: "rgba(217,119,87,0.1)",
      accentText: "#ffffff",
      success: "#528a70",
      successBg: "rgba(82,138,112,0.12)",
      warning: "#c28e40",
      warningBg: "rgba(194,142,64,0.12)",
      danger: "#b34d4d",
      dangerBg: "rgba(179,77,77,0.12)",
      muted: "#eae4d8",
    },
  },
  {
    id: "linear-dark",
    name: "Deep Space",
    description: "Linear-style charcoal & luminous indigo",
    category: "dark",
    vars: {
      bg: "#08090a",
      cardBg: "#111214",
      textPrimary: "#f7f8f8",
      textSecondary: "#8a8f98",
      textMuted: "#4b4e54",
      border: "#23252a",
      accent: "#5e6ad2",
      accentSubtle: "rgba(94,106,210,0.14)",
      accentText: "#ffffff",
      success: "#4df299",
      successBg: "rgba(77,242,153,0.12)",
      warning: "#f2a64d",
      warningBg: "rgba(242,166,77,0.12)",
      danger: "#f24d4d",
      dangerBg: "rgba(242,77,77,0.12)",
      muted: "#191b1f",
    },
  },
  {
    id: "mono-tangerine",
    name: "Tangerine",
    description: "Architectural dark mode with neon ember",
    category: "dark",
    vars: {
      bg: "#0a0a0a",
      cardBg: "#141414",
      textPrimary: "#fafafa",
      textSecondary: "#a1a1aa",
      textMuted: "#52525b",
      border: "#262626",
      accent: "#ff8c00",
      accentSubtle: "rgba(255,140,0,0.14)",
      accentText: "#000000",
      success: "#22c55e",
      successBg: "rgba(34,197,94,0.12)",
      warning: "#eab308",
      warningBg: "rgba(234,179,8,0.12)",
      danger: "#ef4444",
      dangerBg: "rgba(239,68,68,0.12)",
      muted: "#262626",
    },
  },
  {
    id: "github-dim",
    name: "Primer",
    description: "GitHub-style dimmed navy & crisp sapphire",
    category: "dark",
    vars: {
      bg: "#0d1117",
      cardBg: "#161b22",
      textPrimary: "#c9d1d9",
      textSecondary: "#8b949e",
      textMuted: "#484f58",
      border: "#30363d",
      accent: "#2f81f7",
      accentSubtle: "rgba(47,129,247,0.14)",
      accentText: "#ffffff",
      success: "#238636",
      successBg: "rgba(35,134,54,0.14)",
      warning: "#d29922",
      warningBg: "rgba(210,153,34,0.14)",
      danger: "#f85149",
      dangerBg: "rgba(248,81,73,0.14)",
      muted: "#21262d",
    },
  },
  {
    id: "framer-purple",
    name: "Framer",
    description: "Creative electric violet & midnight chrome",
    category: "cyber",
    vars: {
      bg: "#050505",
      cardBg: "#0f0f12",
      textPrimary: "#ffffff",
      textSecondary: "#9e9eb0",
      textMuted: "#484857",
      border: "#202029",
      accent: "#aa33ff",
      accentSubtle: "rgba(170,51,255,0.16)",
      accentText: "#ffffff",
      success: "#00ff88",
      successBg: "rgba(0,255,136,0.12)",
      warning: "#ffaa00",
      warningBg: "rgba(255,170,0,0.12)",
      danger: "#ff3366",
      dangerBg: "rgba(255,51,102,0.12)",
      muted: "#181822",
    },
  },
  {
    id: "notion-bone",
    name: "Notion",
    description: "Editorial bone & charcoal minimalist",
    category: "editorial",
    vars: {
      bg: "#ffffff",
      cardBg: "#f7f6f3",
      textPrimary: "#37352f",
      textSecondary: "#73726e",
      textMuted: "#9b9a97",
      border: "#e8e7e3",
      accent: "#2f343b",
      accentSubtle: "rgba(47,52,59,0.08)",
      accentText: "#ffffff",
      success: "#0f7b5f",
      successBg: "rgba(15,123,95,0.1)",
      warning: "#df9139",
      warningBg: "rgba(223,145,57,0.1)",
      danger: "#d44c47",
      dangerBg: "rgba(212,76,71,0.1)",
      muted: "#eeeeeb",
    },
  },
  {
    id: "midnight-neon",
    name: "Cyberpunk",
    description: "High-voltage neon teal & cyan grid",
    category: "cyber",
    vars: {
      bg: "#030712",
      cardBg: "#0b1329",
      textPrimary: "#f3f4f6",
      textSecondary: "#9ca3af",
      textMuted: "#4b5563",
      border: "#1e293b",
      accent: "#06b6d4",
      accentSubtle: "rgba(6,182,212,0.15)",
      accentText: "#030712",
      success: "#10b981",
      successBg: "rgba(16,185,129,0.14)",
      warning: "#f59e0b",
      warningBg: "rgba(245,158,11,0.14)",
      danger: "#f43f5e",
      dangerBg: "rgba(244,63,94,0.14)",
      muted: "#111827",
    },
  },
  {
    id: "nordic-snow",
    name: "Nord",
    description: "Arctic frost & calm glacier blue",
    category: "dark",
    vars: {
      bg: "#242933",
      cardBg: "#2e3440",
      textPrimary: "#eceff4",
      textSecondary: "#d8dee9",
      textMuted: "#4c566a",
      border: "#3b4252",
      accent: "#88c0d0",
      accentSubtle: "rgba(136,192,208,0.16)",
      accentText: "#242933",
      success: "#a3be8c",
      successBg: "rgba(163,190,140,0.14)",
      warning: "#ebcb8b",
      warningBg: "rgba(235,203,139,0.14)",
      danger: "#bf616a",
      dangerBg: "rgba(191,97,106,0.14)",
      muted: "#434c5e",
    },
  },
  {
    id: "tokyo-night",
    name: "Tokyo Night",
    description: "Neo-Tokyo midnight indigo & electric magenta",
    category: "cyber",
    vars: {
      bg: "#1a1b26",
      cardBg: "#24283b",
      textPrimary: "#c0caf5",
      textSecondary: "#9aa5ce",
      textMuted: "#565f89",
      border: "#292e42",
      accent: "#bb9af7",
      accentSubtle: "rgba(187,154,247,0.15)",
      accentText: "#1a1b26",
      success: "#9ece6a",
      successBg: "rgba(158,206,106,0.14)",
      warning: "#e0af68",
      warningBg: "rgba(224,175,104,0.14)",
      danger: "#f7768e",
      dangerBg: "rgba(247,118,142,0.14)",
      muted: "#343b58",
    },
  },
  {
    id: "dracula-pro",
    name: "Dracula",
    description: "Gothic dark purple, pink & vivid emerald",
    category: "dark",
    vars: {
      bg: "#1e1f29",
      cardBg: "#282a36",
      textPrimary: "#f8f8f2",
      textSecondary: "#bfbfbf",
      textMuted: "#6272a4",
      border: "#44475a",
      accent: "#ff79c6",
      accentSubtle: "rgba(255,121,198,0.15)",
      accentText: "#1e1f29",
      success: "#50fa7b",
      successBg: "rgba(80,250,123,0.12)",
      warning: "#ffb86c",
      warningBg: "rgba(255,184,108,0.12)",
      danger: "#ff5555",
      dangerBg: "rgba(255,85,85,0.12)",
      muted: "#383a59",
    },
  },
  {
    id: "emerald-forest",
    name: "Emerald",
    description: "Deep pine canopy & luminous mint",
    category: "dark",
    vars: {
      bg: "#061412",
      cardBg: "#0c201d",
      textPrimary: "#e6f4f1",
      textSecondary: "#87aaa3",
      textMuted: "#395b54",
      border: "#163832",
      accent: "#10b981",
      accentSubtle: "rgba(16,185,129,0.16)",
      accentText: "#061412",
      success: "#34d399",
      successBg: "rgba(52,211,153,0.14)",
      warning: "#fbb03b",
      warningBg: "rgba(251,176,59,0.14)",
      danger: "#f87171",
      dangerBg: "rgba(248,113,113,0.14)",
      muted: "#183a34",
    },
  },
  {
    id: "sunset-synth",
    name: "Synthwave",
    description: "80s retro sunset glow with violet & coral",
    category: "cyber",
    vars: {
      bg: "#160f29",
      cardBg: "#231842",
      textPrimary: "#fde8f5",
      textSecondary: "#b89ec9",
      textMuted: "#66517a",
      border: "#3d2b6b",
      accent: "#f72585",
      accentSubtle: "rgba(247,37,133,0.16)",
      accentText: "#ffffff",
      success: "#4cc9f0",
      successBg: "rgba(76,201,240,0.14)",
      warning: "#f39c12",
      warningBg: "rgba(243,156,18,0.14)",
      danger: "#e74c3c",
      dangerBg: "rgba(231,76,60,0.14)",
      muted: "#32225a",
    },
  },
];

// ─── Color Math Utilities ───────────────────────────────────────────────────

export function hexToRgb(hex: string): [number, number, number] {
  let clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    clean = clean.split("").map((c) => c + c).join("");
  }
  if (clean.length < 6) return [0, 0, 0];
  const num = parseInt(clean.substring(0, 6), 16);
  if (isNaN(num)) return [0, 0, 0];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  const toHex = (n: number) => clamp(n).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h = ((h % 360) + 360) % 360;
  h /= 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;

  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const r = hue2rgb(p, q, h + 1 / 3);
  const g = hue2rgb(p, q, h);
  const b = hue2rgb(p, q, h - 1 / 3);

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function hslToHex(h: number, s: number, l: number): string {
  const [r, g, b] = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
}

// ─── WCAG Contrast Utilities ────────────────────────────────────────────────

export function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);
  return Math.round(ratio * 10) / 10;
}

export function evaluateContrast(fgHex: string, bgHex: string): ContrastScore {
  const ratio = getContrastRatio(fgHex, bgHex);
  const gradeNormalAA = ratio >= 4.5;
  const gradeNormalAAA = ratio >= 7.0;
  const gradeLargeAA = ratio >= 3.0;
  const gradeLargeAAA = ratio >= 4.5;

  let label = "Fail";
  if (gradeNormalAAA) label = "AAA";
  else if (gradeNormalAA) label = "AA";
  else if (gradeLargeAA) label = "AA (Large)";

  return {
    ratio,
    gradeNormalAA,
    gradeNormalAAA,
    gradeLargeAA,
    gradeLargeAAA,
    label,
  };
}

// ─── Algorithmic Harmony Palette Generator ──────────────────────────────────

export function generateHarmoniousPalette(
  seedHex: string,
  harmony: HarmonyType = "analogous",
  isDark = true
): ThemeVars {
  const [r, g, b] = hexToRgb(seedHex);
  const [h, s] = rgbToHsl(r, g, b);

  let accentHue = h;
  const bgHue = h;

  switch (harmony) {
    case "analogous":
      accentHue = (h + 30) % 360;
      break;
    case "complementary":
      accentHue = (h + 180) % 360;
      break;
    case "triadic":
      accentHue = (h + 120) % 360;
      break;
    case "cyberpunk":
      accentHue = (h + 150) % 360;
      break;
    case "pastel":
      accentHue = h;
      break;
    case "monochromatic":
    default:
      accentHue = h;
      break;
  }

  if (isDark) {
    const bg = hslToHex(bgHue, Math.min(s, 20), 4);
    const cardBg = hslToHex(bgHue, Math.min(s, 24), 8);
    const border = hslToHex(bgHue, Math.min(s, 22), 16);
    const muted = hslToHex(bgHue, Math.min(s, 20), 12);
    const textPrimary = "#fafafa";
    const textSecondary = hslToHex(bgHue, 12, 68);
    const textMuted = hslToHex(bgHue, 10, 42);
    const accent = hslToHex(accentHue, Math.max(s, 75), 58);
    const accentSubtle = `rgba(${hexToRgb(accent).join(",")},0.15)`;
    const accentText = relativeLuminance(accent) > 0.4 ? "#09090b" : "#ffffff";

    return {
      bg,
      cardBg,
      textPrimary,
      textSecondary,
      textMuted,
      border,
      accent,
      accentSubtle,
      accentText,
      success: "#10b981",
      successBg: "rgba(16,185,129,0.14)",
      warning: "#f59e0b",
      warningBg: "rgba(245,158,11,0.14)",
      danger: "#ef4444",
      dangerBg: "rgba(239,68,68,0.14)",
      muted,
    };
  } else {
    const bg = hslToHex(bgHue, Math.min(s, 15), 97);
    const cardBg = "#ffffff";
    const border = hslToHex(bgHue, Math.min(s, 20), 86);
    const muted = hslToHex(bgHue, Math.min(s, 15), 92);
    const textPrimary = hslToHex(bgHue, 20, 10);
    const textSecondary = hslToHex(bgHue, 15, 38);
    const textMuted = hslToHex(bgHue, 10, 60);
    const accent = hslToHex(accentHue, Math.max(s, 80), 44);
    const accentSubtle = `rgba(${hexToRgb(accent).join(",")},0.08)`;
    const accentText = relativeLuminance(accent) > 0.4 ? "#09090b" : "#ffffff";

    return {
      bg,
      cardBg,
      textPrimary,
      textSecondary,
      textMuted,
      border,
      accent,
      accentSubtle,
      accentText,
      success: "#059669",
      successBg: "rgba(5,150,105,0.1)",
      warning: "#d97706",
      warningBg: "rgba(217,119,6,0.1)",
      danger: "#dc2626",
      dangerBg: "rgba(220,38,38,0.1)",
      muted,
    };
  }
}

export function invertTheme(vars: ThemeVars): ThemeVars {
  const isCurrentlyDark = relativeLuminance(vars.bg) < 0.2;
  return generateHarmoniousPalette(
    vars.accent,
    "monochromatic",
    !isCurrentlyDark
  );
}

export function getRandomPreset(excludeId?: string): Theme {
  const choices = defaultThemes.filter((t) => t.id !== excludeId);
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}
