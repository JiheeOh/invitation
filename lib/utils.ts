export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text.replace(/[^\d\-]/g, ''));
}

export function padStart(value: number, length: number = 2): string {
  return String(value).padStart(length, '0');
}

export function mergeBg(color: string, opacity: number = 0.13): string {
  return color + Math.round(opacity * 255).toString(16).padStart(2, '0');
}

export type Theme = {
  name: string;
  bg: string;
  paper: string;
  coverBg: string;
  ink: string;
  muted: string;
  line: string;
  accent: string;
  accentSoft: string;
  serif: string;
  sans: string;
  script: string;
};

export type FontSet = {
  name: string;
  serif: string;
  sans: string;
  script: string;
};
