import { Theme, ExportFormat } from "./types";
import { hexToRgb, rgbToHsl } from "./palettes";

export function generateTailwind4(theme: Theme): string {
  const v = theme.vars;
  return `@theme {
  --color-background: ${v.bg};
  --color-card: ${v.cardBg};
  --color-foreground: ${v.textPrimary};
  --color-muted-foreground: ${v.textSecondary};
  --color-border: ${v.border};
  --color-accent: ${v.accent};
  --color-accent-subtle: ${v.accentSubtle};
  --color-accent-foreground: ${v.accentText};
  --color-success: ${v.success};
  --color-warning: ${v.warning};
  --color-danger: ${v.danger};
}`;
}

export function generateTailwind3(theme: Theme): string {
  const v = theme.vars;
  return `// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        background: '${v.bg}',
        card: '${v.cardBg}',
        foreground: '${v.textPrimary}',
        'muted-foreground': '${v.textSecondary}',
        border: '${v.border}',
        accent: {
          DEFAULT: '${v.accent}',
          foreground: '${v.accentText}',
          subtle: '${v.accentSubtle}',
        },
        success: '${v.success}',
        warning: '${v.warning}',
        danger: '${v.danger}',
      },
    },
  },
};`;
}

export function generateCssVariables(theme: Theme): string {
  const v = theme.vars;
  return `:root {
  --bg: ${v.bg};
  --card-bg: ${v.cardBg};
  --text-primary: ${v.textPrimary};
  --text-secondary: ${v.textSecondary};
  --text-muted: ${v.textMuted};
  --border: ${v.border};
  --accent: ${v.accent};
  --accent-subtle: ${v.accentSubtle};
  --accent-text: ${v.accentText};
  --success: ${v.success};
  --success-bg: ${v.successBg};
  --warning: ${v.warning};
  --warning-bg: ${v.warningBg};
  --danger: ${v.danger};
  --danger-bg: ${v.dangerBg};
  --muted: ${v.muted};
}`;
}

export function generateShadcn(theme: Theme): string {
  const v = theme.vars;
  const toHslString = (hex: string) => {
    const [r, g, b] = hexToRgb(hex);
    const [h, s, l] = rgbToHsl(r, g, b);
    return `${h} ${s}% ${l}%`;
  };

  return `@layer base {
  :root {
    --background: ${toHslString(v.bg)};
    --foreground: ${toHslString(v.textPrimary)};
    --card: ${toHslString(v.cardBg)};
    --card-foreground: ${toHslString(v.textPrimary)};
    --popover: ${toHslString(v.cardBg)};
    --popover-foreground: ${toHslString(v.textPrimary)};
    --primary: ${toHslString(v.accent)};
    --primary-foreground: ${toHslString(v.accentText)};
    --secondary: ${toHslString(v.muted)};
    --secondary-foreground: ${toHslString(v.textPrimary)};
    --muted: ${toHslString(v.muted)};
    --muted-foreground: ${toHslString(v.textSecondary)};
    --accent: ${toHslString(v.accent)};
    --accent-foreground: ${toHslString(v.accentText)};
    --destructive: ${toHslString(v.danger)};
    --destructive-foreground: 0 0% 100%;
    --border: ${toHslString(v.border)};
    --input: ${toHslString(v.border)};
    --ring: ${toHslString(v.accent)};
    --radius: 0.5rem;
  }
}`;
}

export function generateTokensJson(theme: Theme): string {
  const v = theme.vars;
  const tokens = {
    $schema: "https://design-tokens.github.io/community-group/format/",
    name: theme.name,
    color: {
      background: { $value: v.bg, $type: "color" },
      card: { $value: v.cardBg, $type: "color" },
      foreground: {
        primary: { $value: v.textPrimary, $type: "color" },
        secondary: { $value: v.textSecondary, $type: "color" },
        muted: { $value: v.textMuted, $type: "color" },
      },
      border: { $value: v.border, $type: "color" },
      accent: {
        base: { $value: v.accent, $type: "color" },
        foreground: { $value: v.accentText, $type: "color" },
        subtle: { $value: v.accentSubtle, $type: "color" },
      },
      status: {
        success: { $value: v.success, $type: "color" },
        warning: { $value: v.warning, $type: "color" },
        danger: { $value: v.danger, $type: "color" },
      },
    },
  };
  return JSON.stringify(tokens, null, 2);
}

export function generateTypeScript(theme: Theme): string {
  const v = theme.vars;
  return `export const ${theme.name.toLowerCase().replace(/[^a-z0-9]/g, "")}Theme = {
  id: "${theme.id}",
  name: "${theme.name}",
  colors: {
    bg: "${v.bg}",
    cardBg: "${v.cardBg}",
    textPrimary: "${v.textPrimary}",
    textSecondary: "${v.textSecondary}",
    textMuted: "${v.textMuted}",
    border: "${v.border}",
    accent: "${v.accent}",
    accentSubtle: "${v.accentSubtle}",
    accentText: "${v.accentText}",
    success: "${v.success}",
    warning: "${v.warning}",
    danger: "${v.danger}",
    muted: "${v.muted}",
  },
} as const;

export type AppTheme = typeof ${theme.name.toLowerCase().replace(/[^a-z0-9]/g, "")}Theme;`;
}

export function exportThemeCode(theme: Theme, format: ExportFormat): string {
  switch (format) {
    case "tailwind4":
      return generateTailwind4(theme);
    case "tailwind3":
      return generateTailwind3(theme);
    case "css":
      return generateCssVariables(theme);
    case "shadcn":
      return generateShadcn(theme);
    case "json":
      return generateTokensJson(theme);
    case "typescript":
      return generateTypeScript(theme);
    default:
      return generateCssVariables(theme);
  }
}
