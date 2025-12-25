
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  description?: string;
}

export function Dropdown({ label, value, options, onChange, description }: DropdownProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {label}
      </label>
      {description && <p className="text-xs text-foreground/70">{description}</p>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={clsx(
            'w-full appearance-none rounded-lg px-4 py-2.5 pr-10 cursor-pointer outline-none',
            'border border-border bg-card-elevated text-foreground',
            'transition-[background-color,border-color,box-shadow] ease-out-quad duration-100',
            'hover:border-foreground/45',
            'focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-ring-offset/50'
          )}
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          size={20}
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/45"
        />
      </div>
    </div>
  );
}
