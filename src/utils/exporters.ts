
import type { UIType, TemplateConfig } from '../types';

export function exportAsText(prompt: string, filename: string = 'prompt.txt') {
  const blob = new Blob([prompt], { type: 'text/plain' });
  downloadBlob(blob, filename);
}

export function exportAsMarkdown(prompt: string, filename: string = 'prompt.md') {
  const markdown = `# UI Design Prompt\n\n${prompt}`;
  const blob = new Blob([markdown], { type: 'text/markdown' });
  downloadBlob(blob, filename);
}

export function exportAsJSON(
  uiType: UIType,
  config: TemplateConfig,
  prompt: string,
  filename: string = 'config.json'
) {
  const data = {
    uiType,
    config,
    prompt,
    exportedAt: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  downloadBlob(blob, filename);
}

export function generateShareLink(uiType: UIType, config: TemplateConfig): string {
  const data = { uiType, config };
  const encoded = btoa(JSON.stringify(data));
  const url = new URL(window.location.href);
  url.searchParams.set('config', encoded);
  return url.toString();
}

export function parseShareLink(url: string): { uiType: UIType; config: TemplateConfig } | null {
  try {
    const urlObj = new URL(url);
    const encoded = urlObj.searchParams.get('config');
    if (!encoded) return null;

    const decoded = atob(encoded);
    const data = JSON.parse(decoded);

    if (data.uiType && data.config) {
      return data;
    }

    return null;
  } catch (error) {
    console.error('Error parsing share link:', error);
    return null;
  }
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
