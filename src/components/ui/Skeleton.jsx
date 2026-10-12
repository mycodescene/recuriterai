import React from 'react';
import { cn } from '../../lib/utils';

export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-xl bg-muted/60 animate-shimmer relative overflow-hidden",
        className
      )}
      {...props}
    />
  );
};
