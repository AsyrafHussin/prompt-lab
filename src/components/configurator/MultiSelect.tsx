
import { clsx } from 'clsx';
import { X } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

interface MultiSelectProps {
  label: string;
  value: string[];
  options: string[];
  onChange: (value: string[]) => void;
  description?: string;
}

export function MultiSelect({ label, value, options, onChange, description }: MultiSelectProps) {
  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {label}
      </label>
      {description && <p className="text-xs text-foreground/70">{description}</p>}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = value.includes(option);
          return (
            <button
              key={option}
              onClick={() => toggleOption(option)}
              className={clsx(
                'relative inline-flex items-center justify-center gap-1.5 rounded-full font-medium shrink-0',
                '[&>svg]:size-3 [&>svg]:pointer-events-none whitespace-nowrap',
                'shadow-sm card-highlight border border-border outline-none',
                'transition-[background-color] ease-out-quad duration-100',
                'focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-ring-offset/50',
                {
                  'px-2.5 py-1 text-sm bg-card-elevated text-foreground hover:bg-card-muted': isSelected,
                  'px-2.5 py-1 text-sm bg-card-elevated text-foreground/45 hover:bg-card-muted hover:text-foreground/70': !isSelected,
                }
              )}
            >
              {option}
              {isSelected && <X size={14} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
