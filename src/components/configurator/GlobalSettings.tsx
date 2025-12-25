import React from 'react';
import { Code } from 'lucide-react';
import { useConfigStore } from '../../store/configStore';
import { useThemeStore } from '../../store/themeStore';
import type { TechStack } from '../../templates/types';
import { clsx } from 'clsx';

export const GlobalSettings: React.FC = () => {
  const { techStack, setTechStack } = useConfigStore();

  return (
    <div className="mb-6 space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
        Tech Stack
      </h3>

      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {(['React + Tailwind v4', 'HTML + CSS'] as TechStack[]).map((stack) => (
            <button
              key={stack}
              onClick={() => setTechStack(stack)}
              className={clsx(
                'relative px-4 py-2 rounded-md text-sm font-medium',
                '[&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0',
                'transition-[background-color,color,box-shadow,filter] ease-out-quad duration-100',
                'focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-ring-offset/50 focus-visible:outline-none',
                'h-9 gap-2',
                {
                  'bg-linear-to-b from-gradient-from to-gradient-to hover:contrast-90 text-foreground': techStack === stack,
                  'shadow-[inset_0_1px_0_0_rgb(255_255_255/.32),0px_1px_1px_-0.5px_rgba(9,9,11,0.05),0px_3px_3px_-1.5px_rgba(9,9,11,0.05),0px_6px_6px_-3px_rgba(9,9,11,0.05)]': techStack === stack,
                  'dark:shadow-[inset_0_1px_0_0_rgb(255_255_255/.12),0px_1px_1px_-0.5px_rgba(9,9,11,0.05),0px_3px_3px_-1.5px_rgba(9,9,11,0.05),0px_6px_6px_-3px_rgba(9,9,11,0.05)]': techStack === stack,
                  'border border-border bg-card hover:bg-card-muted text-foreground shadow-sm card-highlight': techStack !== stack,
                }
              )}
            >
              {stack}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
