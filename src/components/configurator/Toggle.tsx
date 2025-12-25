
import { clsx } from 'clsx';

interface ToggleProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  description?: string;
}

export function Toggle({ label, value, onChange, description }: ToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <label className="block text-sm font-medium text-foreground">{label}</label>
        {description && <p className="text-xs text-foreground/70 mt-1">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!value)}
        className={clsx(
          'relative inline-flex h-6 w-11 items-center rounded-full outline-none',
          'transition-[background-color] ease-out-quad duration-100',
          'focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-ring-offset/50',
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
        />
      </button>
    </div>
  );
}
