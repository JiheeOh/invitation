export interface Theme {
  name: string;
  bg: string;
  ink: string;
  muted: string;
  line: string;
  accent: string;
  accentSoft: string;
  serif: string;
  sans: string;
}

export interface FontSet {
  name: string;
  serif: string;
  sans: string;
  script: string;
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    return new Promise((resolve, reject) => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      try {
        document.execCommand('copy');
        resolve();
      } catch (error) {
        reject(error);
      } finally {
        document.body.removeChild(textArea);
      }
    });
  }
}

export function padStart(str: string | number, targetLength: number, padString: string = '0'): string {
  return String(str).padStart(targetLength, padString);
}
