import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'gold' | 'outline' | 'dark';
}

export function Badge({
  children,
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-sand/40 text-charcoal border border-border-light',
    gold: 'bg-gold/10 text-gold-hover border border-gold/30',
    outline: 'bg-transparent text-charcoal border border-border-light',
    dark: 'bg-black text-white',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-medium transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
