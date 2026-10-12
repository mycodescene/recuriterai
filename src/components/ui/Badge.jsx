import React from 'react';
import { cn } from '../../lib/utils';

export const Badge = ({
  children,
  variant = 'brand', // brand | success | warning | risk | neutral
  size = 'md', // sm | md
  className,
  dot = false,
  ...props
}) => {
  const variants = {
    brand: "bg-brand-500/10 text-brand-500 dark:text-brand-400 border-brand-500/20",
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
    warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25",
    risk: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/25",
    neutral: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20"
  };

  const sizes = {
    sm: "text-[11px] px-2 py-0.5 gap-1 font-medium",
    md: "text-xs px-2.5 py-1 gap-1.5 font-medium"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border tracking-wide uppercase font-mono select-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn(
          "w-1.5 h-1.5 rounded-full shrink-0",
          variant === 'brand' && "bg-brand-500",
          variant === 'success' && "bg-emerald-500",
          variant === 'warning' && "bg-amber-500",
          variant === 'risk' && "bg-rose-500",
          variant === 'neutral' && "bg-slate-400"
        )} />
      )}
      {children}
    </span>
  );
};
