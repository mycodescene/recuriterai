import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const Typewriter = ({
  text = '',
  speed = 14,
  onComplete,
  className = '',
  showAiBadge = false
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsDone(false);
    let index = 0;

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
        setIsDone(true);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <div className={`relative ${className}`}>
      {showAiBadge && !isDone && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 mb-2 rounded-full text-[10px] font-mono bg-brand-500/15 text-brand-500 dark:text-brand-300 border border-brand-500/25 animate-pulse">
          <Sparkles className="w-3 h-3" /> AI synthesis in progress...
        </span>
      )}
      <p className="leading-relaxed whitespace-pre-wrap">
        {displayedText}
        {!isDone && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block w-2 h-4 ml-1 bg-gradient-to-t from-brand-cyan to-brand-500 rounded-sm align-middle shadow-glow-sm"
          />
        )}
      </p>
    </div>
  );
};
