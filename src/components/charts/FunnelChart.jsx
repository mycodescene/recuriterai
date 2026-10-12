import React from 'react';
import { motion } from 'framer-motion';

export const FunnelChart = ({ data = [] }) => {
  if (!data || data.length === 0) return null;

  const maxCount = Math.max(...data.map(d => d.count)) || 1;

  return (
    <div className="space-y-3.5">
      {data.map((stage, idx) => {
        const percent = Math.round((stage.count / maxCount) * 100);
        return (
          <div key={stage.stage} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-foreground flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-brand-500/10 text-brand-500 dark:text-brand-400 font-mono text-[11px] font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                {stage.stage}
              </span>
              <div className="flex items-center gap-3 font-mono">
                <span className="font-bold text-foreground">{stage.count}</span>
                <span className="text-[11px] text-muted-foreground w-12 text-right">({stage.dropoff})</span>
              </div>
            </div>
            
            <div className="h-3 w-full bg-muted/40 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-brand-500 via-indigo-500 to-emerald-400"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
