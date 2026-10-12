import React from 'react';
import { cn } from '../../lib/utils';

export const Input = React.forwardRef(({
  label,
  error,
  leftIcon,
  rightIcon,
  className,
  type = 'text',
  helperText,
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-secondaryText">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-muted-foreground">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            "w-full h-11 rounded-xl bg-card border border-card-border px-3.5 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 dark:bg-ink-800 dark:border-white/10 dark:text-white dark:placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            error && "border-risk-500 focus:ring-risk-500/50 focus:border-risk-500",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 flex items-center text-muted-foreground">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-risk-500 font-medium">{error}</p>
      )}
      {!error && helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
