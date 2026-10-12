import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const Marquee = ({
  items = [],
  speed = 25,
  direction = 'left',
  className
}) => {
  return (
    <div className={cn("overflow-hidden whitespace-nowrap flex select-none relative", className)}>
      {/* Edge gradient fades */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%']
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="flex items-center gap-8 shrink-0"
      >
        {items.concat(items).map((item, idx) => (
          <div key={idx} className="shrink-0 flex items-center">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
