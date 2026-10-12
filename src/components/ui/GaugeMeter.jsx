import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const GaugeMeter = ({
  value = 0,
  min = 0,
  max = 100,
  title = '',
  subtitle = '',
  statusLabel = '',
  type = 'risk', // risk | retention | acceptance
  size = 220,
  className
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    let current = 0;
    const duration = 1200;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const ease = 1 - Math.pow(1 - progress, 3);
      current = Math.min(value, Math.round(value * ease));
      setAnimatedValue(current);

      if (frame >= totalFrames) {
        setAnimatedValue(value);
        clearInterval(timer);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [value]);

  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  // Needle rotation from -90deg to +90deg (180deg total)
  const rotation = -90 + (percentage / 100) * 180;

  const getColor = () => {
    if (type === 'risk') {
      if (value < 25) return { color: '#10B981', label: statusLabel || 'Low Risk' };
      if (value < 55) return { color: '#F59E0B', label: statusLabel || 'Medium Risk' };
      return { color: '#F43F5E', label: statusLabel || 'High Risk' };
    }
    // Retention or acceptance
    if (value >= 80) return { color: '#10B981', label: statusLabel || 'High Confidence' };
    if (value >= 60) return { color: '#6D5EF5', label: statusLabel || 'Moderate' };
    return { color: '#F59E0B', label: statusLabel || 'Requires Attention' };
  };

  const { color, label } = getColor();

  return (
    <div className={cn("flex flex-col items-center justify-center p-4", className)}>
      <div className="relative" style={{ width: size, height: size * 0.6 }}>
        <svg width={size} height={size * 0.6} viewBox="0 0 200 120" className="overflow-visible">
          <defs>
            <linearGradient id="gaugeArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              {type === 'risk' ? (
                <>
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#F43F5E" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#F43F5E" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#10B981" />
                </>
              )}
            </linearGradient>
          </defs>

          {/* Background Track */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinecap="round"
            className="text-muted/40 dark:text-muted/20"
          />

          {/* Gradient Value Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#gaugeArcGrad)"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Needle Center Pin */}
          <circle cx="100" cy="100" r="7" fill={color} />
          <circle cx="100" cy="100" r="12" fill={color} opacity="0.25" />
        </svg>

        {/* Animated Needle */}
        <motion.div
          className="absolute left-1/2 bottom-0 origin-bottom"
          style={{ width: 4, height: 74, marginLeft: -2, bottom: 4 }}
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="w-full h-full rounded-full shadow-lg" style={{ backgroundColor: color }} />
        </motion.div>
      </div>

      <div className="text-center mt-2">
        <div className="flex items-baseline justify-center gap-1 font-mono">
          <span className="text-4xl font-extrabold tracking-tight text-foreground font-heading">{animatedValue}</span>
          <span className="text-sm font-semibold text-muted-foreground">/ 100</span>
        </div>
        <div className="mt-1">
          <span
            className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full uppercase tracking-wider font-mono"
            style={{ backgroundColor: `${color}18`, color }}
          >
            {label}
          </span>
        </div>
        {title && <h4 className="text-sm font-semibold text-foreground mt-2">{title}</h4>}
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
};
