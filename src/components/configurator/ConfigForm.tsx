
import { useConfigStore } from '../../store/configStore';
import { useThemeStore } from '../../store/themeStore';
import { templateEngine } from '../../templates';
import { Dropdown } from './Dropdown';
import { MultiSelect } from './MultiSelect';
import { Toggle } from './Toggle';
import { clsx } from 'clsx';

export function ConfigForm() {
  const currentUIType = useConfigStore((state) => state.currentUIType);
  const configurations = useConfigStore((state) => state.configurations);
  const updateConfig = useConfigStore((state) => state.updateConfig);
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === 'dark';

  const config = templateEngine.getConfig(currentUIType);
  const currentConfig = configurations[currentUIType];

  const handleChange = (fieldId: string, value: any) => {
    updateConfig(currentUIType, { [fieldId]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide mb-1 text-foreground">
          Configuration
        </h3>
        <p className="text-sm text-foreground/70">{config.description}</p>
      </div>

      <div className="space-y-6">
        {config.configOptions.map((option) => {
          const value = currentConfig[option.id];

          if (option.type === 'select') {
            return (
              <Dropdown
                key={option.id}
                label={option.label}
                value={value}
                options={option.options || []}
                onChange={(newValue) => handleChange(option.id, newValue)}
                description={option.description}
              />
            );
          }

          if (option.type === 'multiSelect') {
            return (
              <MultiSelect
                key={option.id}
                label={option.label}
                value={value || []}
                options={option.options || []}
                onChange={(newValue) => handleChange(option.id, newValue)}
                description={option.description}
              />
            );
          }

          if (option.type === 'toggle') {
            return (
              <Toggle
                key={option.id}
                label={option.label}
                value={value}
                onChange={(newValue) => handleChange(option.id, newValue)}
                description={option.description}
              />
            );
          }

          if (option.type === 'text' || option.type === 'textarea') {
            return (
              <div key={option.id} className="space-y-2">
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
                    onChange={(e) => handleChange(option.id, e.target.value)}
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
                    onChange={(e) => handleChange(option.id, e.target.value)}
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
        })}
      </div>
    </div>
  );
}
