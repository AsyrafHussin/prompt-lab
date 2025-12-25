
import { useState } from 'react';

export function useClipboard() {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async (text: string): Promise<boolean> => {
    try {
      // Modern Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        return true;
      }

      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand('copy');
      textArea.remove();

      if (successful) {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Failed to copy:', error);
      return false;
    }
  };

  return { copy, isCopied };
}
