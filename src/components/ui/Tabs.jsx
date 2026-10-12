import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const Tabs = ({
  tabs = [], // [{ id, label, icon, badge }]
  activeTab,
  onChange,
  className,
  layoutId = 'activeTabIndicator'
}) => {
  return (
    <div className={cn("flex items-center space-x-1 border-b border-card-border overflow-x-auto no-scrollbar", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2",
              isActive ? "text-brand-500 dark:text-brand-400 font-semibold" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className={cn(
                "px-1.5 py-0.5 text-[10px] font-mono rounded-full font-bold",
                isActive ? "bg-brand-500/20 text-brand-500" : "bg-muted text-muted-foreground"
              )}>
                {tab.badge}
              </span>
            )}
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-500 to-indigo-500"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
