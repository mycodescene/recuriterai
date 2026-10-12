import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
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
  UserCheck
} from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { CommandPalette } from './CommandPalette';
import { useThemeStore } from '../../store/themeStore';
import { cn } from '../../lib/utils';

export const AppShell = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const location = useLocation();
  const { theme } = useThemeStore();

  const mobileNavTabs = [
    { path: "/app/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { path: "/app/jobs", label: "Jobs", icon: <Briefcase className="w-3.5 h-3.5" /> },
    { path: "/app/candidates", label: "Candidates", icon: <Users className="w-3.5 h-3.5" /> },
    { path: "/app/persona/cand-1", label: "Persona", icon: <Sparkles className="w-3.5 h-3.5 text-brand-500" />, badge: "AI" },
    { path: "/app/matching", label: "Matching", icon: <GitCompare className="w-3.5 h-3.5" /> },
    { path: "/app/risk", label: "Risk Intel", icon: <ShieldAlert className="w-3.5 h-3.5 text-risk-500" />, badge: "Alerts" },
    { path: "/app/retention", label: "Retention", icon: <HeartHandshake className="w-3.5 h-3.5 text-pink-500" /> },
    { path: "/app/workforce", label: "Workforce", icon: <TrendingUp className="w-3.5 h-3.5 text-amber-500" /> },
    { path: "/app/offers", label: "Offers", icon: <DollarSign className="w-3.5 h-3.5 text-emerald-500" /> },
    { path: "/app/communications", label: "Comms", icon: <Mail className="w-3.5 h-3.5 text-blue-500" />, badge: "4" },
    { path: "/app/reports", label: "Reports", icon: <FileBarChart className="w-3.5 h-3.5" /> },
    { path: "/app/settings", label: "Settings", icon: <Settings className="w-3.5 h-3.5" /> },
    { path: "/app/profile", label: "Profile", icon: <UserCheck className="w-3.5 h-3.5 text-brand-500" /> },
  ];

  // Global Cmd+K / Ctrl+K keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex bg-grid-pattern selection:bg-brand-500 selection:text-white">
      {/* Toast notifications */}
      <Toaster
        theme={theme}
        position="top-right"
        richColors
        closeButton
      />

      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main App Body */}
      <div
        className={cn(
          "flex-1 flex flex-col min-w-0 transition-all duration-300",
          isSidebarCollapsed ? "lg:pl-20" : "lg:pl-64"
        )}
      >
        <Topbar
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Mobile Horizontal Navigation Tabs Strip */}
        <nav
          aria-label="Mobile Navigation Tabs"
          className="lg:hidden sticky top-16 z-20 bg-card/95 backdrop-blur-xl border-b border-card-border px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shadow-xs"
        >
          {mobileNavTabs.map((tab) => {
            const isActive = location.pathname === tab.path || (tab.path.includes('/persona') && location.pathname.includes('/persona'));
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-150 shrink-0",
                  isActive
                    ? "bg-brand-500 text-white font-semibold shadow-sm shadow-brand-500/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/70 bg-card/60 border border-card-border/60"
                )}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={cn(
                    "px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold uppercase",
                    isActive ? "bg-white/25 text-white" : "bg-brand-500/15 text-brand-600 dark:text-brand-300"
                  )}>
                    {tab.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </div>
  );
};
