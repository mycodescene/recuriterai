import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const CircularScore = ({
  score = 0,
  size = 80,
  strokeWidth = 6,
  label = '',
  colorScheme = 'auto', // auto | brand | success | risk | warning
  showText = true,
  className
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let current = 0;
    const duration = 1000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      current = Math.min(score, Math.round(score * ease));
      setAnimatedScore(current);

      if (frame >= totalFrames) {
        setAnimatedScore(score);
        clearInterval(timer);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [score]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (colorScheme === 'brand') return '#6D5EF5';
    if (colorScheme === 'risk') return score > 50 ? '#F43F5E' : '#10B981';
    if (colorScheme === 'success') return '#10B981';
    if (colorScheme === 'warning') return '#F59E0B';
    
    // Auto
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#6D5EF5';
    if (score >= 40) return '#F59E0B';
    return '#F43F5E';
  };

  const strokeColor = getColor();

  return (
    <div className={cn("relative inline-flex items-center justify-center font-mono", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-muted/40 dark:text-muted/20"
        />
        {/* Animated fill circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      {showText && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-sm font-bold tracking-tight text-foreground font-heading">
            {animatedScore}%
          </span>
          {label && <span className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</span>}
        </div>
      )}
    </div>
  );
};
