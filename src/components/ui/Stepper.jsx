import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Stepper = ({
  steps = [], // [{ id, title, description }]
  currentStep = 0,
  className
}) => {
  return (
    <div className={cn("w-full py-4", className)}>
      <div className="flex items-center justify-between relative">
        {/* Background track line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted -translate-y-1/2 z-0" />
        
        {/* Active progress track */}
        <motion.div
          className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-brand-500 to-indigo-500 -translate-y-1/2 z-0"
          initial={{ width: '0%' }}
          animate={{
            width: steps.length > 1 ? `${(currentStep / (steps.length - 1)) * 100}%` : '100%'
          }}
          transition={{ duration: 0.4 }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step.id || index} className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.15 : 1,
                  backgroundColor: isCompleted
                    ? '#10B981'
                    : isCurrent
                    ? '#6D5EF5'
                    : 'var(--bg-muted)',
                }}
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold border-2 transition-colors",
                  isCompleted
                    ? "border-emerald-500 text-white shadow-glow-success"
                    : isCurrent
                    ? "border-brand-500 text-white shadow-glow-sm"
                    : "border-card-border text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : index + 1}
              </motion.div>
              <div className="mt-2 text-center hidden sm:block">
                <span className={cn(
                  "text-xs font-semibold block",
                  isCurrent ? "text-brand-500 dark:text-brand-400" : isCompleted ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.title}
                </span>
                {step.description && (
                  <span className="text-[10px] text-muted-foreground block max-w-[100px] truncate">
                    {step.description}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
