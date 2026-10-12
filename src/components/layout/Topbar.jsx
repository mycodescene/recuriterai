import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  LogOut,
  Settings,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useAuthStore } from '../../store/authStore';

export const Topbar = ({ onOpenCommandPalette, onOpenMobileSidebar }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();
  const { user, logout } = useAuthStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Inconsistent tenure dates detected",
      description: "Candidate Bilal Ahmed has 20-month overlapping roles.",
      time: "10m ago",
      icon: <AlertTriangle className="w-4 h-4 text-risk-500" />,
      type: "risk"
    },
    {
      id: 2,
      title: "AI Persona generation completed",
      description: "Evidence profile for Hamza Tariq is ready for review.",
      time: "45m ago",
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
      type: "success"
    },
    {
      id: 3,
      title: "New candidate applied",
      description: "Dr. Zainab Malik submitted CV for Lead AI Scientist.",
      time: "2h ago",
      icon: <User className="w-4 h-4 text-brand-500" />,
      type: "info"
    }
  ];

  return (
    <header className="h-16 px-4 sm:px-6 flex items-center justify-between border-b border-card-border bg-card/80 backdrop-blur-xl sticky top-0 z-20">
      {/* Left section: Hamburger (mobile) + Quick Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-muted/60 hover:bg-muted border border-card-border text-muted-foreground hover:text-foreground text-xs transition-colors w-44 sm:w-72 justify-between"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5" />
            <span className="truncate">Search candidates, jobs...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-background rounded border border-card-border">
            <span>⌘</span>K
          </kbd>
        </button>
      </div>

      {/* Right section: Theme toggle, Notifications, User menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors relative"
          aria-label="Toggle theme"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === 'dark' ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}
          </motion.div>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl glass-panel shadow-2xl border border-card-border p-4 z-50 overflow-hidden"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-card-border">
                    <h4 className="text-sm font-bold text-foreground font-heading">AI Notifications</h4>
                    <span className="text-[11px] font-mono font-medium text-brand-500 bg-brand-500/10 px-2 py-0.5 rounded-full">
                      3 new
                    </span>
                  </div>
                  <div className="divide-y divide-card-border py-1 max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="py-2.5 flex items-start gap-3 hover:bg-muted/40 p-2 rounded-xl transition-colors cursor-pointer">
                        <div className="mt-0.5 p-1.5 rounded-lg bg-muted shrink-0">
                          {n.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-foreground truncate">{n.title}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{n.description}</p>
                          <span className="text-[10px] text-muted-foreground/70 font-mono mt-1 block">{n.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 p-1.5 pl-2 rounded-xl hover:bg-muted/80 transition-colors border border-transparent hover:border-card-border max-w-[200px] sm:max-w-[240px]"
            aria-label="User profile menu"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-500 to-indigo-600 flex items-center justify-center text-white font-mono text-xs font-bold shadow-glow-sm shrink-0">
              {user?.avatar || 'SJ'}
            </div>
            <div className="hidden sm:flex flex-col text-left min-w-0 flex-1">
              <span className="text-xs font-semibold text-foreground leading-tight truncate">
                {user?.name || 'Sarah Jenkins'}
              </span>
              <span className="text-[10px] text-muted-foreground leading-tight mt-0.5 truncate font-medium">
                {user?.role || 'Lead Recruiter'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0 hidden sm:block" />
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-64 rounded-2xl glass-panel shadow-2xl border border-card-border p-2 z-50 bg-card/95 backdrop-blur-xl"
                >
                  <div className="px-3 py-2.5 border-b border-card-border mb-1.5">
                    <p className="text-xs font-bold text-foreground truncate">{user?.name || 'Sarah Jenkins'}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{user?.email || 'sarah@recruiter.ai'}</p>
                    <div className="flex items-center gap-1.5 mt-2 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">Verified Recruiter Access</span>
                    </div>
                  </div>
                  <button
                    onClick={() => { setShowUserMenu(false); navigate('/app/profile'); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-foreground hover:bg-muted text-left transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-brand-500" />
                    <span>My Recruiter Profile</span>
                  </button>
                  <button
                    onClick={() => { setShowUserMenu(false); navigate('/app/settings'); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-foreground hover:bg-muted text-left transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Account & Model Settings</span>
                  </button>
                  <button
                    onClick={() => { setShowUserMenu(false); logout(); navigate('/login'); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-risk-500 hover:bg-risk-500/10 text-left transition-colors mt-0.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
