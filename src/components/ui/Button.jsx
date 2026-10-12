import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Button = React.forwardRef(({
  children,
  className,
  variant = 'primary', // primary | secondary | outline | ghost | danger | success
  size = 'md', // sm | md | lg | xl | icon
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  type = 'button',
  onClick,
  ...props
}, ref) => {
  const baseStyles = "relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/50 disabled:opacity-50 disabled:cursor-not-allowed select-none whitespace-nowrap";

  const sizeStyles = {
    sm: "text-xs px-4 py-2 gap-2 min-h-[36px] font-semibold",
    md: "text-sm px-5 py-2.5 gap-2.5 min-h-[42px] font-bold",
    lg: "text-base px-6 py-3 gap-3 min-h-[48px] font-bold tracking-tight",
    xl: "text-lg px-8 py-4 gap-3.5 min-h-[54px] font-bold tracking-tight",
    icon: "h-10 w-10 p-0 items-center justify-center shrink-0"
  };

  const variants = {
    primary: "bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 text-white shadow-glow-sm hover:shadow-glow-md hover:from-brand-700 hover:to-indigo-700 active:scale-[0.98] btn-shine-sweep border border-brand-400/20",
    secondary: "bg-card hover:bg-muted text-foreground border border-card-border shadow-sm hover:shadow hover:border-slate-400 dark:hover:border-white/20 active:scale-[0.98]",
    outline: "border-2 border-brand-500/40 text-brand-600 dark:text-brand-300 hover:bg-brand-500/10 hover:border-brand-500 active:scale-[0.98]",
    ghost: "text-muted-foreground hover:text-foreground hover:bg-muted/80 active:scale-[0.98]",
    danger: "bg-risk-500 text-white hover:bg-risk-600 shadow-glow-risk active:scale-[0.98]",
    success: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-glow-success active:scale-[0.98]"
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      whileHover={disabled || isLoading ? undefined : { scale: 1.015 }}
      whileTap={disabled || isLoading ? undefined : { scale: 0.98 }}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={cn(baseStyles, sizeStyles[size], variants[variant], className)}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0 items-center justify-center">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0 items-center justify-center">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';
