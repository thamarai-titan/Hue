export interface ThemeVars {
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
}

export type ThemeCategory = "dark" | "light" | "cyber" | "editorial" | "custom";

export interface Theme {
  id: string;
  name: string;
  description: string;
  category: ThemeCategory;
  vars: ThemeVars;
  isCustom?: boolean;
}

export type ProjectViewId = "analytics" | "ide" | "ecommerce" | "chat" | "uikit";

export interface ProjectTab {
  id: ProjectViewId;
  name: string;
  iconName: string;
  description: string;
}

export type ExportFormat = "tailwind4" | "tailwind3" | "css" | "shadcn" | "json" | "typescript";

export type HarmonyType =
  | "analogous"
  | "complementary"
  | "triadic"
  | "monochromatic"
  | "cyberpunk"
  | "pastel";

export interface ContrastScore {
  ratio: number;
  gradeNormalAA: boolean;
  gradeNormalAAA: boolean;
  gradeLargeAA: boolean;
  gradeLargeAAA: boolean;
  label: string;
}
