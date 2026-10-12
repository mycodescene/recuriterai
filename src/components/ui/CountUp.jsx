import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const CountUp = ({
  target = 0,
  duration = 1.2,
  prefix = '',
  suffix = '',
  className = '',
  decimals = 0
}) => {
  const [current, setCurrent] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let startTime = null;
    let animationFrame = null;
    const numTarget = typeof target === 'number' ? target : parseFloat(target) || 0;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = ease * numTarget;

      setCurrent(val);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setIsFinished(true);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  const formatted = decimals > 0 ? current.toFixed(decimals) : Math.round(current);

  return (
    <motion.span
      animate={isFinished ? { scale: [1, 1.04, 1] } : {}}
      transition={{ duration: 0.3 }}
      className={`tabular-nums font-mono ${className}`}
    >
      {prefix}
      {formatted}
      {suffix}
    </motion.span>
  );
};
