
import { clsx } from 'clsx';

interface ToggleProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  description?: string;
}

export function Toggle({ label, value, onChange, description }: ToggleProps) {
  // Generate unique ID for proper label association
  const toggleId = `toggle-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <label htmlFor={toggleId} className="block text-sm font-medium text-foreground cursor-pointer">
          {label}
        </label>
        {description && (
          <p id={`${toggleId}-description`} className="text-xs text-foreground/70 mt-1">
            {description}
          </p>
        )}
      </div>
      <button
        id={toggleId}
        type="button"
        role="switch"
        aria-checked={value}
        aria-labelledby={toggleId}
        aria-describedby={description ? `${toggleId}-description` : undefined}
        onClick={() => onChange(!value)}
        className={clsx(
          'relative inline-flex h-6 w-11 items-centers rounded-full outline-none',
          'transition-[background-color] ease-out-quad duration-100',
          'focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset/50',
          {
            'bg-card-elevated border border-border': value,
            'bg-card-muted border border-border': !value,
          }
        )}
      >
        <span
          className={clsx(
            'inline-block h-4 w-4 transform rounded-full bg-foreground transition-transform ease-out-quad duration-100',
            {
              'translate-x-6': value,
              'translate-x-1': !value,
            }
          )}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
