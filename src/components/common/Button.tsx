
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'relative inline-flex cursor-pointer items-center justify-center rounded-md font-medium',
        '[&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0',
        'transition-[background-color,color,box-shadow,filter] ease-out-quad duration-100',
        'focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-ring-offset/50 focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        {
          // Primary with gradient and sophisticated shadows
          'bg-linear-to-b from-gradient-from to-gradient-to hover:contrast-90 text-foreground': variant === 'primary',
          'shadow-[inset_0_1px_0_0_rgb(255_255_255/.32),0px_1px_1px_-0.5px_rgba(9,9,11,0.05),0px_3px_3px_-1.5px_rgba(9,9,11,0.05),0px_6px_6px_-3px_rgba(9,9,11,0.05)]': variant === 'primary',
          'dark:shadow-[inset_0_1px_0_0_rgb(255_255_255/.12),0px_1px_1px_-0.5px_rgba(9,9,11,0.05),0px_3px_3px_-1.5px_rgba(9,9,11,0.05),0px_6px_6px_-3px_rgba(9,9,11,0.05)]': variant === 'primary',
          // Secondary/ghost
          'bg-transparent text-foreground/70 hover:text-foreground hover:bg-card-muted': variant === 'secondary' || variant === 'ghost',
          // Danger
          'bg-red-500 text-white hover:bg-red-600': variant === 'danger',
          // Sizes
          'h-7 py-1 px-2.5 gap-1 has-[>svg]:px-2 text-xs': size === 'sm',
          'h-8 py-1.5 px-3 gap-1.5 has-[>svg]:px-2.5 text-xs': size === 'md',
          'h-10 py-2 px-4 gap-2 has-[>svg]:px-3 text-sm': size === 'lg',
          'w-full': fullWidth,
        },
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
