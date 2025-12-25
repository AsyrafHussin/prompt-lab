import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { HTMLAttributes, ReactNode } from 'react';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
  highlight?: boolean;
}

export function Card({ children, className, elevated = false, highlight = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg p-6 border border-border transition-shadow duration-200 ease-out-quad',
        elevated ? 'bg-card-elevated' : 'bg-card',
        highlight && 'card-highlight',
        'shadow-md hover:shadow-lg',
        className
      )}
      style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      {...props}
    >
      {children}
    </div>
  );
}
