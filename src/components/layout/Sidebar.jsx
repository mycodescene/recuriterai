import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Sparkles,
  GitCompare,
  ShieldAlert,
  HeartHandshake,
  TrendingUp,
  DollarSign,
  Mail,
  FileBarChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  X,
  UserCheck
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Logo } from '../ui/Logo';
import { useAuthStore } from '../../store/authStore';

export const Sidebar = ({ isCollapsed, onToggleCollapse, isMobileOpen, onCloseMobile }) => {
  const location = useLocation();
  const { user } = useAuthStore();

  const navGroups = [
    {
      group: "Overview",
      items: [
        { path: "/app/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
        { path: "/app/reports", label: "Reports & Exports", icon: <FileBarChart className="w-4 h-4" /> },
      ]
    },
    {
      group: "Talent Pipeline",
      items: [
        { path: "/app/jobs", label: "Jobs & Requirements", icon: <Briefcase className="w-4 h-4" /> },
        { path: "/app/candidates", label: "Candidates & CVs", icon: <Users className="w-4 h-4" /> },
        { path: "/app/persona/cand-1", label: "Persona Studio", icon: <Sparkles className="w-4 h-4 text-brand-500" />, badge: "AI" },
      ]
    },
    {
      group: "Decision Intelligence",
      items: [
        { path: "/app/matching", label: "Semantic Matching", icon: <GitCompare className="w-4 h-4" /> },
        { path: "/app/risk", label: "Risk & Fraud Intel", icon: <ShieldAlert className="w-4 h-4 text-risk-500" />, badge: "Alerts" },
        { path: "/app/retention", label: "Retention Predictor", icon: <HeartHandshake className="w-4 h-4" /> },
        { path: "/app/workforce", label: "Workforce Demand", icon: <TrendingUp className="w-4 h-4" /> },
        { path: "/app/offers", label: "Offer Optimizer", icon: <DollarSign className="w-4 h-4 text-emerald-500" /> },
      ]
    },
    {
      group: "Operations",
      items: [
        { path: "/app/profile", label: "Recruiter Profile", icon: <UserCheck className="w-4 h-4 text-brand-500" /> },
        { path: "/app/communications", label: "Communications", icon: <Mail className="w-4 h-4" />, badge: "4" },
        { path: "/app/settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
      ]
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-card/95 border-r border-card-border backdrop-blur-2xl">
      {/* Brand Header */}
      <div className="h-20 px-5 flex items-center justify-between border-b border-card-border shrink-0">
        <NavLink to="/app/dashboard" className="flex items-center">
          <Logo collapsed={isCollapsed} size="md" showSubtitle={false} />
        </NavLink>

        {/* Mobile close button */}
        {isMobileOpen && (
          <button onClick={onCloseMobile} className="lg:hidden p-2 rounded-xl text-muted-foreground hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-5 space-y-6 no-scrollbar">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {!isCollapsed && (
              <p className="px-3 text-xs font-semibold text-muted-foreground/80 tracking-normal mb-2">
                {group.group}
              </p>
            )}
            {group.items.map((item) => {
              const isActive = location.pathname === item.path || (item.path.includes('/persona') && location.pathname.includes('/persona'));

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => isMobileOpen && onCloseMobile()}
                  className={cn(
                    "relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group",
                    isActive
                      ? "text-brand-600 dark:text-brand-300 font-semibold"
                      : "text-slate-600 dark:text-slate-300 hover:text-foreground hover:bg-muted/60",
                    isCollapsed && "justify-center px-0"
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-brand-500/10 dark:bg-brand-500/15 border border-brand-500/25 rounded-xl -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    >
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-brand-500 to-brand-cyan rounded-r-full" />
                    </motion.div>
                  )}

                  <span className={cn(
                    "shrink-0 transition-transform duration-150 group-hover:scale-110",
                    isActive ? "text-brand-600 dark:text-brand-300" : "text-muted-foreground group-hover:text-foreground"
                  )}>
                    {item.icon}
                  </span>

                  {!isCollapsed && (
                    <span className="truncate flex-1">{item.label}</span>
                  )}

                  {!isCollapsed && item.badge && (
                    <span className={cn(
                      "px-2 py-0.5 text-[10px] font-mono font-bold rounded-full uppercase tracking-wider",
                      item.badge === 'AI' && "bg-brand-500/15 text-brand-600 dark:text-brand-300 border border-brand-500/20",
                      item.badge === 'Alerts' && "bg-risk-500/15 text-risk-500 border border-risk-500/20",
                      item.badge === '4' && "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* Human-in-the-loop guarantee banner (Fixed Theme Contrast) */}
      {!isCollapsed && (
        <div className="p-3.5 mx-3 mb-3 rounded-2xl bg-gradient-to-br from-brand-50/90 via-white to-indigo-50/50 dark:from-brand-950/40 dark:via-ink-800 dark:to-ink-800/80 border border-brand-500/25 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Human-in-the-Loop</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            AI provides evidence dossiers; all hiring actions require recruiter approval.
          </p>
        </div>
      )}

      {/* Recruiter User Snippet & Collapse Toggle */}
      <div className="p-3 border-t border-card-border flex items-center justify-between gap-2">
        {!isCollapsed && (
          <NavLink
            to="/app/profile"
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-muted/80 transition-colors min-w-0 flex-1 group"
            title="View Recruiter Profile"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-500 to-indigo-600 flex items-center justify-center text-white font-mono text-xs font-bold shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              {user?.avatar || 'SJ'}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-foreground truncate leading-none group-hover:text-brand-500 transition-colors">
                {user?.name || 'Sarah Jenkins'}
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Verified Recruiter
              </span>
            </div>
          </NavLink>
        )}

        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0 ml-auto"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:block fixed left-0 top-0 bottom-0 z-30 transition-all duration-300",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 bg-midnight-950/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="relative w-72 max-w-[85vw] h-full z-10"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
