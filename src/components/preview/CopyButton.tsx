
import { Check, Copy } from 'lucide-react';
import { Button } from '../common/Button';
import { useClipboard } from '../../hooks/useClipboard';
import { useUIStore } from '../../store/uiStore';

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const { copy, isCopied } = useClipboard();
  const addToast = useUIStore((state) => state.addToast);

  const handleCopy = async () => {
    const success = await copy(text);
    if (success) {
      addToast('Copied to clipboard!', 'success');
    } else {
      addToast('Failed to copy to clipboard', 'error');
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={!text}
      className="relative inline-flex w-full cursor-pointer items-center justify-center rounded-md font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 transition-[background-color,color,box-shadow,filter] ease-out-quad duration-100 focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-ring-offset/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 bg-linear-to-b from-gradient-from to-gradient-to hover:contrast-90 shadow-[inset_0_1px_0_0_rgb(255_255_255/.32),0px_1px_1px_-0.5px_rgba(9,9,11,0.05),0px_3px_3px_-1.5px_rgba(9,9,11,0.05),0px_6px_6px_-3px_rgba(9,9,11,0.05)] dark:shadow-[inset_0_1px_0_0_rgb(255_255_255/.12),0px_1px_1px_-0.5px_rgba(9,9,11,0.05),0px_3px_3px_-1.5px_rgba(9,9,11,0.05),0px_6px_6px_-3px_rgba(9,9,11,0.05)] text-foreground h-9 px-4 py-2 gap-2 has-[>svg]:px-3 text-sm"
    >
      {isCopied ? (
        <>
          <Check size={16} />
          Copied!
        </>
      ) : (
        <>
          <Copy size={16} />
          Copy to Clipboard
        </>
      )}
    </button>
  );
}
