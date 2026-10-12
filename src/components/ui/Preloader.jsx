import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '../../store/themeStore';

export const Preloader = ({
  duration = 2000,
  onComplete,
  fullScreen = true
}) => {
  const { theme } = useThemeStore();
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          if (onComplete) onComplete();
        }, 300);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -70, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`${
            fullScreen ? 'fixed inset-0 z-[9999]' : 'w-full h-full min-h-[420px]'
          } flex flex-col items-center justify-center p-6 bg-background text-foreground select-none overflow-hidden`}
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute w-96 h-96 rounded-full bg-gradient-to-tr from-brand-600/20 to-indigo-600/20 blur-[100px] pointer-events-none -z-10" />

          <div className="relative z-10 flex flex-col items-center max-w-xs w-full space-y-6 text-center">
            {/* Clean Logo Box with subtle pulse */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative p-5 sm:p-6 rounded-3xl glass-panel border border-card-border bg-card/90 shadow-xl flex items-center justify-center"
            >
              <motion.img
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                src="/ai_rec_logo.png"
                alt="Recruiter.AI"
                className="h-12 sm:h-14 w-auto object-contain drop-shadow"
              />
            </motion.div>

            {/* Simple Progress Bar */}
            <div className="w-full space-y-2">
              <div className="h-1.5 w-full bg-muted/60 rounded-full overflow-hidden relative border border-card-border/60">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground px-1">
                <span className="text-[11px] font-medium tracking-tight">Initializing workspace...</span>
                <span className="text-[11px] font-bold text-foreground">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
