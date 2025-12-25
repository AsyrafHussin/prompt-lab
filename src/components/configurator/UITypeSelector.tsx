
import { clsx } from 'clsx';
import * as Icons from 'lucide-react';
import { useConfigStore } from '../../store/configStore';
import { templateEngine } from '../../templates';

export function UITypeSelector() {
  const currentUIType = useConfigStore((state) => state.currentUIType);
  const setUIType = useConfigStore((state) => state.setUIType);

  const uiTypes = templateEngine.getAvailableTypes();

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
        UI Type
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {uiTypes.map((type) => {
          const config = templateEngine.getConfig(type);
          const isSelected = currentUIType === type;
          const IconComponent = Icons[config.icon as keyof typeof Icons] as any;

          return (
            <button
              key={type}
              onClick={() => setUIType(type)}
              className={clsx(
                'relative p-4 rounded-md text-center',
                '[&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0',
                'transition-[background-color,color,box-shadow,filter] ease-out-quad duration-100',
                'focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-ring-offset/50 focus-visible:outline-none',
                {
                  'bg-linear-to-b from-gradient-from to-gradient-to hover:contrast-90 text-foreground': isSelected,
                  'shadow-[inset_0_1px_0_0_rgb(255_255_255/.32),0px_1px_1px_-0.5px_rgba(9,9,11,0.05),0px_3px_3px_-1.5px_rgba(9,9,11,0.05),0px_6px_6px_-3px_rgba(9,9,11,0.05)]': isSelected,
                  'dark:shadow-[inset_0_1px_0_0_rgb(255_255_255/.12),0px_1px_1px_-0.5px_rgba(9,9,11,0.05),0px_3px_3px_-1.5px_rgba(9,9,11,0.05),0px_6px_6px_-3px_rgba(9,9,11,0.05)]': isSelected,
                  'border border-border bg-card hover:bg-card-muted text-foreground shadow-sm card-highlight': !isSelected,
                }
              )}
            >
              <div className="flex justify-center mb-2">
                {IconComponent && (
                  <IconComponent size={32} />
                )}
              </div>
              <div className="text-sm font-medium">
                {config.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
