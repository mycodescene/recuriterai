import React from 'react';
import { Sparkles } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { cn } from '../../lib/utils';

export const Logo = ({
  className,
  size = 'md', // sm | md | lg
  collapsed = false,
  showSubtitle = true
}) => {
  const { theme } = useThemeStore();
  const isLight = theme === 'light';

  // If collapsed in sidebar, display compact emblem
  if (collapsed) {
    return (
      <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-all", isLight ? "bg-brand-500/10 border border-brand-500/20" : "bg-gradient-to-tr from-brand-600 to-indigo-500 text-white shadow-glow-sm")}>
        {isLight ? (
          <img src="/ai_rec_logo.png" alt="Recruiter.AI" className="h-6 w-auto object-contain" />
        ) : (
          <Sparkles className="w-5 h-5 text-white" />
        )}
      </div>
    );
  }

  // When Light theme is active: Use user's requested ai_rec_logo.png!
  if (isLight) {
    const heightClass = size === 'sm' ? 'h-6' : size === 'lg' ? 'h-10' : 'h-8';
    return (
      <div className={cn("inline-flex items-center gap-2", className)}>
        <img
          src="/ai_rec_logo.png"
          alt="Recruiter.AI"
          className={cn("w-auto object-contain transition-all duration-200", heightClass)}
        />
        {showSubtitle && size === 'lg' && (
          <span className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase font-semibold hidden sm:inline-block">
            Decision Intelligence
          </span>
        )}
      </div>
    );
  }

  // When Dark theme is active: Use dark mode brand identity with high-contrast text and electric violet glow
  return (
    <div className={cn("inline-flex items-center gap-3 group", className)}>
      <div className={cn(
        "rounded-xl bg-gradient-to-tr from-brand-500 to-indigo-600 flex items-center justify-center text-white shadow-glow-sm transition-transform group-hover:scale-105 shrink-0",
        size === 'sm' ? "w-7 h-7" : size === 'lg' ? "w-10 h-10" : "w-8 h-8"
      )}>
        <Sparkles className={size === 'sm' ? "w-4 h-4" : size === 'lg' ? "w-5 h-5" : "w-4 h-4"} />
      </div>
      <div className="flex flex-col">
        <span className={cn(
          "font-heading font-extrabold tracking-tight text-white flex items-center",
          size === 'sm' ? "text-sm" : size === 'lg' ? "text-xl" : "text-base"
        )}>
          Recruiter<span className="text-brand-500 font-black">.AI</span>
        </span>
        {showSubtitle && (
          <span className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase font-semibold leading-none mt-0.5">
            Decision Intelligence
          </span>
        )}
      </div>
    </div>
  );
};
