import React from 'react';
import { Button } from './Button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-16 px-4',
        className
      )}
    >
      {icon && <div className="text-taupe mb-4">{icon}</div>}
      <h3 className="font-serif text-2xl text-black mb-2">{title}</h3>
      <p className="text-taupe text-sm max-w-md mb-8">{description}</p>
      {actionLabel && (
        <Button
          variant="primary"
          href={actionHref}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
