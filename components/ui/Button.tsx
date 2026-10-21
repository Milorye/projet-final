import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      href,
      disabled,
      isLoading,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-full font-medium uppercase tracking-[0.15em] text-xs transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-[0_10px_25px_rgba(34,33,31,0.08)]';

    const variants = {
      primary:
        'bg-black text-white hover:bg-charcoal active:scale-[0.99] shadow-sm',
      secondary:
        'bg-white text-black border border-black/20 hover:border-black active:scale-[0.99]',
      outline:
        'bg-transparent text-charcoal border border-border-light hover:border-charcoal hover:bg-white',
      gold: 'bg-gold text-white hover:bg-gold-hover active:scale-[0.99]',
      ghost:
        'bg-transparent text-charcoal hover:text-black underline underline-offset-4 decoration-black/30 hover:decoration-black',
    };

    const sizes = {
      sm: 'h-9 px-4 text-[11px]',
      md: 'h-12 px-7 text-xs',
      lg: 'h-14 px-9 text-xs',
    };

    const combinedClassName = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      isLoading && 'opacity-70 pointer-events-none',
      className
    );

    if (href) {
      return (
        <Link href={href} className={combinedClassName}>
          {isLoading ? (
            <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
          ) : null}
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClassName}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
