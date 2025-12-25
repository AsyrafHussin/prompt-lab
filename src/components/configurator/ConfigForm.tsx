
import { useCallback, memo } from 'react';
import { useConfigStore } from '../../store/configStore';
import { templateEngine } from '../../templates';
import { Dropdown } from './Dropdown';
import { MultiSelect } from './MultiSelect';
import { Toggle } from './Toggle';
import { clsx } from 'clsx';
import type { ConfigOption } from '../../templates/types';

// Memoized field component to prevent unnecessary re-renders
const ConfigField = memo(({
  option,
  value,
  onChange
}: {
  option: ConfigOption;
  value: any;
  onChange: (value: any) => void;
}) => {
  if (option.type === 'select') {
    return (
      <Dropdown
        label={option.label}
        value={value}
        options={option.options || []}
        onChange={onChange}
        description={option.description}
      />
    );
  }

  if (option.type === 'multiSelect') {
    return (
      <MultiSelect
        label={option.label}
        value={value || []}
        options={option.options || []}
        onChange={onChange}
        description={option.description}
      />
    );
  }

  if (option.type === 'toggle') {
    return (
      <Toggle
        label={option.label}
        value={value}
        onChange={onChange}
        description={option.description}
      />
    );
  }

  if (option.type === 'text' || option.type === 'textarea') {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          {option.label}
        </label>
        {option.description && (
          <p className="text-xs text-foreground/70">{option.description}</p>
        )}
        {option.type === 'text' ? (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={option.placeholder}
            className={clsx(
              'w-full rounded-lg px-4 py-2.5 outline-none',
              'border border-border bg-card-elevated text-foreground placeholder:text-foreground/45',
              'transition-[background-color,border-color,box-shadow] ease-out-quad duration-100',
              'hover:border-foreground/45',
              'focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-ring-offset/50'
            )}
            style={{
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          />
        ) : (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={option.placeholder}
            rows={4}
            className={clsx(
              'w-full rounded-lg px-4 py-2.5 outline-none resize-none',
              'border border-border bg-card-elevated text-foreground placeholder:text-foreground/45',
              'transition-[background-color,border-color,box-shadow] ease-out-quad duration-100',
              'hover:border-foreground/45',
              'focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-ring-offset/50'
            )}
            style={{
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          />
        )}
      </div>
    );
  }

  return null;
});

ConfigField.displayName = 'ConfigField';

export function ConfigForm() {
  const currentUIType = useConfigStore((state) => state.currentUIType);
  const configurations = useConfigStore((state) => state.configurations);
  const updateConfig = useConfigStore((state) => state.updateConfig);

  const config = templateEngine.getConfig(currentUIType);
  const currentConfig = configurations[currentUIType];

  // Memoize handleChange to prevent recreating on every render
  const handleChange = useCallback((fieldId: string, value: any) => {
    updateConfig(currentUIType, { [fieldId]: value });
  }, [currentUIType, updateConfig]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide mb-1 text-foreground">
          Configuration
        </h3>
        <p className="text-sm text-foreground/70">{config.description}</p>
      </div>

      <div className="space-y-6">
        {config.configOptions.map((option) => (
          <ConfigField
            key={option.id}
            option={option}
            value={currentConfig[option.id]}
            onChange={(value) => handleChange(option.id, value)}
          />
        ))}
      </div>
    </div>
  );
}
