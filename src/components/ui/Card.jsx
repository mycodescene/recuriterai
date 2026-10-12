import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const Card = ({
  children,
  className = '',
  hoverable = false,
  glow = false,
  glass = true,
  spotlight = true,
  onClick,
  ...props
}) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!spotlight || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const hasExplicitPadding = /(^|\s)p[xytb]?-/.test(className);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={hoverable ? { y: -4, transition: { duration: 0.2, ease: "easeOut" } } : undefined}
      onClick={onClick}
      className={cn(
        "relative rounded-2xl border transition-all duration-300",
        !hasExplicitPadding && "p-5 sm:p-6",
        glass ? "glass-panel" : "bg-card",
        "border-card-border hover:border-card-border/80",
        glow && "hover:border-brand-500/50 hover:shadow-glow-sm",
        hoverable && "cursor-pointer",
        className
      )}
      {...props}
    >
      {/* Interactive Cursor Spotlight Glow */}
      {spotlight && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px opacity-100 transition-opacity duration-300 z-0 rounded-2xl overflow-hidden"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124, 58, 237, 0.12), transparent 80%)`,
          }}
        />
      )}

      {/* Card Content with relative positioning above spotlight */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};
