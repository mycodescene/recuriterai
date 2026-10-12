import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldCheck, Cpu, Database, CheckCircle2 } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

export const Preloader = ({
  duration = 2800,
  onComplete,
  fullScreen = true
}) => {
  const { theme } = useThemeStore();
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const steps = [
    { label: 'Initializing Neural Ontology & Knowledge Graph', icon: Database },
    { label: 'Ingesting Multi-Source Verification Signals', icon: Cpu },
    { label: 'Calibrating Human-in-the-Loop Decision Guardrails', icon: ShieldCheck },
    { label: 'Workspace Ready — Autonomous Intelligence Active', icon: CheckCircle2 }
  ];

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 28) {
        setActiveStep(0);
      } else if (pct < 58) {
        setActiveStep(1);
      } else if (pct < 88) {
        setActiveStep(2);
      } else {
        setActiveStep(3);
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          if (onComplete) onComplete();
        }, 400);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -80, scale: 0.97, filter: 'blur(12px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`${
            fullScreen ? 'fixed inset-0 z-[9999]' : 'w-full h-full min-h-[480px]'
          } flex flex-col items-center justify-center p-6 bg-background text-foreground select-none overflow-hidden`}
        >
          {/* Deep Aurora ambient background glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full bg-gradient-to-tr from-brand-600/25 via-brand-cyan/20 to-indigo-600/20 blur-[120px] pointer-events-none animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(124,58,237,0.12),rgba(255,255,255,0))] pointer-events-none" />

          {/* Background grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-md w-full space-y-8 text-center px-4">
            {/* Logo with multi-layered aura */}
            <div className="relative flex items-center justify-center">
              {/* Outer rotating gradient ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute w-44 h-44 rounded-full p-[2px] bg-gradient-to-tr from-brand-500 via-brand-cyan to-transparent opacity-70 blur-[2px]"
              />

              {/* Counter-rotating dotted ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute w-36 h-36 rounded-full border border-dashed border-brand-400/40 opacity-60"
              />

              {/* Core glass card with logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative px-7 py-6 rounded-3xl glass-panel border border-brand-500/35 shadow-2xl shadow-brand-500/20 flex flex-col items-center justify-center bg-card/95 backdrop-blur-2xl overflow-hidden"
              >
                {/* Scan sweep */}
                <motion.div
                  animate={{ y: [-60, 90] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-brand-cyan/20 to-transparent pointer-events-none"
                />

                <img
                  src="/ai_rec_logo.png"
                  alt="Recruiter.AI Logo"
                  className="h-14 sm:h-16 w-auto object-contain drop-shadow-xl filter"
                />
              </motion.div>
            </div>

            {/* Title & Brand statement */}
            <div className="space-y-2.5">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-600 dark:text-brand-300 text-xs font-semibold tracking-wide"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-cyan animate-spin-slow" />
                <span className="font-heading">Autonomous Decision Support System</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground tracking-tight"
              >
                Recruiter<span className="text-gradient">.AI</span>
              </motion.h1>

              {/* Live step label */}
              <div className="h-6 flex items-center justify-center gap-2 text-xs text-muted-foreground font-mono">
                <span className="w-2 h-2 rounded-full bg-brand-cyan animate-ping" />
                <span className="transition-all duration-300">
                  {steps[activeStep]?.label || 'Loading...'}
                </span>
              </div>
            </div>

            {/* Progress Track */}
            <div className="w-full space-y-3">
              <div className="h-2.5 w-full bg-muted/70 rounded-full overflow-hidden relative border border-card-border shadow-inner">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 via-indigo-500 to-brand-cyan relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/80 rounded-full blur-[1px] shadow-[0_0_12px_#06B6D4]" />
                </motion.div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Human-in-the-Loop Active</span>
                </span>
                <span className="font-bold font-mono text-foreground tracking-wider">
                  {progress}%
                </span>
              </div>
            </div>

            {/* Step indicator dots */}
            <div className="flex items-center justify-center gap-2 pt-1">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    idx === activeStep
                      ? 'w-6 bg-brand-500 shadow-glow-sm'
                      : idx < activeStep
                      ? 'w-2 bg-emerald-500'
                      : 'w-2 bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
