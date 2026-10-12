import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(num);
}

export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'RA';
}

export function getScoreColor(score) {
  if (score >= 80) return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
  if (score >= 60) return 'text-amber-500 bg-amber-500/10 border-amber-500/30';
  return 'text-rose-500 bg-rose-500/10 border-rose-500/30';
}

export function getRiskBadge(level) {
  switch (level?.toLowerCase()) {
    case 'low':
      return { label: 'Low Risk', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
    case 'medium':
      return { label: 'Medium Risk', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
    case 'high':
      return { label: 'High Risk', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' };
    default:
      return { label: 'Evaluated', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20' };
  }
}
