import { Zap, Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useEffect } from 'react';

export function Header() {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  // Add/remove dark class on document for CSS utilities
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <nav className="fixed top-2 inset-x-0 z-50 flex justify-center px-2 md:px-4" aria-label="Main navigation">
      <div
        className="relative flex w-full max-w-7xl items-center justify-between rounded-lg py-1.5 px-4 text-foreground transition-shadow duration-[350ms] ease-navbar shadow-lg card-highlight border border-border"
        style={{
          backdropFilter: 'blur(16px)',
          backgroundColor: `color-mix(in oklab, var(${isDark ? '--color-dark-card' : '--color-card'}) 75%, transparent)`,
          ['--highlight-opacity' as any]: 1,
        }}
      >
        {/* Logo */}
        <button
          type="button"
          role="menuitem"
          className="relative inline-flex cursor-pointer items-center justify-center rounded-md [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 transition-[background-color,color,box-shadow,filter] ease-out-quad duration-100 focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-ring-offset/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 h-8 gap-1.5 has-[>svg]:px-2.5 p-0 text-sm font-medium text-foreground hover:bg-transparent"
        >
          <div className="flex items-center gap-2">
            <Zap className="size-4" />
            <span>PromptLab</span>
          </div>
        </button>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <div className="text-xs text-foreground/70">
            Design Prompt Generator
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex cursor-pointer items-center justify-center rounded-md font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 transition-[background-color,color,box-shadow,filter] ease-out-quad duration-100 focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-ring-offset/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 gap-1.5 has-[>svg]:px-2.5 size-8 p-0 text-sm bg-transparent hover:bg-transparent text-foreground/70 hover:text-foreground relative overflow-hidden [&_svg]:size-4"
            aria-label="Toggle theme"
          >
            <Sun className={`transition-transform ease-out-quad duration-100 ${isDark ? '' : 'scale-0 absolute'}`} size={15} />
            <Moon className={`transition-transform ease-out-quad duration-100 ${isDark ? 'scale-0 absolute' : ''}`} size={15} />
          </button>
        </div>
      </div>
    </nav>
  );
}
