
import { useState, useRef, useEffect } from 'react';
import { Download, FileText, FileCode, Link as LinkIcon, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { useConfigStore } from '../../store/configStore';
import { useUIStore } from '../../store/uiStore';
import { exportAsText, exportAsMarkdown, exportAsJSON, generateShareLink } from '../../utils/exporters';
import { useClipboard } from '../../hooks/useClipboard';

export function ExportOptions() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const currentUIType = useConfigStore((state) => state.currentUIType);
  const configurations = useConfigStore((state) => state.configurations);
  const generatedPrompt = useConfigStore((state) => state.generatedPrompt);
  const addToast = useUIStore((state) => state.addToast);
  const { copy } = useClipboard();

  const menuItems = 4; // Total number of menu items

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          buttonRef.current?.focus();
          break;

        case 'ArrowDown':
          e.preventDefault();
          {
            const currentIndex = menuItemsRef.current.indexOf(document.activeElement as HTMLButtonElement);
            const nextIndex = (currentIndex + 1) % menuItems;
            menuItemsRef.current[nextIndex]?.focus();
          }
          break;

        case 'ArrowUp':
          e.preventDefault();
          {
            const currentIndex = menuItemsRef.current.indexOf(document.activeElement as HTMLButtonElement);
            const prevIndex = currentIndex === 0 ? menuItems - 1 : currentIndex - 1;
            menuItemsRef.current[prevIndex]?.focus();
          }
          break;

        case 'Home':
          e.preventDefault();
          menuItemsRef.current[0]?.focus();
          break;

        case 'End':
          e.preventDefault();
          menuItemsRef.current[menuItems - 1]?.focus();
          break;

        case 'Tab':
          // Close dropdown when tabbing out
          setIsOpen(false);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, menuItems]);

  // Focus first item when dropdown opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        menuItemsRef.current[0]?.focus();
      }, 0);
    }
  }, [isOpen]);

  const handleExportText = () => {
    exportAsText(generatedPrompt);
    addToast('Exported as text file', 'success');
    setIsOpen(false);
  };

  const handleExportMarkdown = () => {
    exportAsMarkdown(generatedPrompt);
    addToast('Exported as markdown file', 'success');
    setIsOpen(false);
  };

  const handleExportJSON = () => {
    exportAsJSON(currentUIType, configurations[currentUIType], generatedPrompt);
    addToast('Exported as JSON file', 'success');
    setIsOpen(false);
  };

  const handleShareLink = async () => {
    const link = generateShareLink(currentUIType, configurations[currentUIType]);
    await copy(link);
    addToast('Share link copied to clipboard!', 'success');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={!generatedPrompt}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Export options menu"
        className={clsx(
          'relative inline-flex w-full cursor-pointer items-center justify-center rounded-md font-medium',
          '[&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0',
          'transition-[background-color,color,box-shadow,filter] ease-out-quad duration-100',
          'focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-ring-offset/50 focus-visible:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'border border-border bg-card hover:bg-card-muted text-foreground shadow-sm card-highlight',
          'h-9 px-4 py-2 gap-2 has-[>svg]:px-3 text-sm'
        )}
      >
        <Download size={16} />
        Export
        <ChevronDown size={16} className={clsx('transition-transform ease-out-quad duration-100', { 'rotate-180': isOpen })} />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute bottom-full right-0 mb-2 w-56 bg-card-elevated border border-border rounded-lg shadow-lg z-50 animate-scale-in"
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          <div className="py-1">
            <button
              ref={(el) => (menuItemsRef.current[0] = el)}
              type="button"
              role="menuitem"
              onClick={handleExportText}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/70 hover:text-foreground transition-[background-color,color] ease-out-quad duration-100 focus:text-foreground focus:outline-none rounded-md hover:bg-[oklch(96.1%_0_0)] dark:hover:bg-[oklch(25%_0.02_265)] focus:bg-[oklch(96.1%_0_0)] dark:focus:bg-[oklch(25%_0.02_265)]"
            >
              <FileText size={16} />
              Export as Text (.txt)
            </button>
            <button
              ref={(el) => (menuItemsRef.current[1] = el)}
              type="button"
              role="menuitem"
              onClick={handleExportMarkdown}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/70 hover:text-foreground transition-[background-color,color] ease-out-quad duration-100 focus:text-foreground focus:outline-none rounded-md hover:bg-[oklch(96.1%_0_0)] dark:hover:bg-[oklch(25%_0.02_265)] focus:bg-[oklch(96.1%_0_0)] dark:focus:bg-[oklch(25%_0.02_265)]"
            >
              <FileText size={16} />
              Export as Markdown (.md)
            </button>
            <button
              ref={(el) => (menuItemsRef.current[2] = el)}
              type="button"
              role="menuitem"
              onClick={handleExportJSON}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/70 hover:text-foreground transition-[background-color,color] ease-out-quad duration-100 focus:text-foreground focus:outline-none rounded-md hover:bg-[oklch(96.1%_0_0)] dark:hover:bg-[oklch(25%_0.02_265)] focus:bg-[oklch(96.1%_0_0)] dark:focus:bg-[oklch(25%_0.02_265)]"
            >
              <FileCode size={16} />
              Export as JSON (.json)
            </button>
            <div className="border-t border-border my-1" role="separator" />
            <button
              ref={(el) => (menuItemsRef.current[3] = el)}
              type="button"
              role="menuitem"
              onClick={handleShareLink}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/70 hover:text-foreground transition-[background-color,color] ease-out-quad duration-100 focus:text-foreground focus:outline-none rounded-md hover:bg-[oklch(96.1%_0_0)] dark:hover:bg-[oklch(25%_0.02_265)] focus:bg-[oklch(96.1%_0_0)] dark:focus:bg-[oklch(25%_0.02_265)]"
            >
              <LinkIcon size={16} />
              Copy Share Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
