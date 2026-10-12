import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
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
  Sun,
  Moon,
  PlusCircle,
  Upload
} from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

export const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();

  const commands = [
    { id: 'dash', title: 'Dashboard & Reporting', icon: <LayoutDashboard className="w-4 h-4" />, path: '/app/dashboard', category: 'Navigation' },
    { id: 'jobs', title: 'Job Requisitions & Requirements', icon: <Briefcase className="w-4 h-4" />, path: '/app/jobs', category: 'Navigation' },
    { id: 'create-job', title: 'Create New Job (Wizard)', icon: <PlusCircle className="w-4 h-4 text-brand-500" />, path: '/app/jobs/create', category: 'Actions' },
    { id: 'cands', title: 'Candidates Management & CV Upload', icon: <Users className="w-4 h-4" />, path: '/app/candidates', category: 'Navigation' },
    { id: 'upload-cv', title: 'Upload Candidate CVs', icon: <Upload className="w-4 h-4 text-brand-500" />, path: '/app/candidates', category: 'Actions' },
    { id: 'persona', title: 'AI Candidate Persona Studio', icon: <Sparkles className="w-4 h-4 text-brand-500" />, path: '/app/persona/cand-1', category: 'Navigation' },
    { id: 'match', title: 'Candidate Screening & Semantic Matching', icon: <GitCompare className="w-4 h-4" />, path: '/app/matching', category: 'Navigation' },
    { id: 'risk', title: 'Recruitment Fraud & Risk Intelligence', icon: <ShieldAlert className="w-4 h-4 text-risk-500" />, path: '/app/risk', category: 'Navigation' },
    { id: 'retention', title: 'Retention Predictor & What-If Simulator', icon: <HeartHandshake className="w-4 h-4" />, path: '/app/retention', category: 'Navigation' },
    { id: 'workforce', title: 'Workforce Demand & Emerging Skills', icon: <TrendingUp className="w-4 h-4" />, path: '/app/workforce', category: 'Navigation' },
    { id: 'offers', title: 'AI Job Offer Optimization', icon: <DollarSign className="w-4 h-4 text-emerald-500" />, path: '/app/offers', category: 'Navigation' },
    { id: 'comms', title: 'Candidate Communications Hub', icon: <Mail className="w-4 h-4" />, path: '/app/communications', category: 'Navigation' },
    { id: 'reports', title: 'Talent Analytics Reports Builder', icon: <FileBarChart className="w-4 h-4" />, path: '/app/reports', category: 'Navigation' },
    { id: 'settings', title: 'Profile & Recruiter Settings', icon: <Settings className="w-4 h-4" />, path: '/app/settings', category: 'Navigation' },
    { id: 'theme', title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`, icon: theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />, action: toggleTheme, category: 'Preferences' }
  ];

  const filtered = commands.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (cmd) => {
    onClose();
    if (cmd.action) {
      cmd.action();
    } else if (cmd.path) {
      navigate(cmd.path);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-midnight-950/75 backdrop-blur-sm"
        />

        {/* Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-xl rounded-2xl glass-panel shadow-2xl border border-card-border overflow-hidden z-10"
        >
          <div className="flex items-center px-4 border-b border-card-border">
            <Search className="w-5 h-5 text-muted-foreground shrink-0 mr-3" />
            <input
              autoFocus
              type="text"
              placeholder="Search features, candidates, workflows... (Cmd+K)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-14 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold text-muted-foreground bg-muted/60 rounded border border-card-border">
              ESC
            </kbd>
          </div>

          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No commands matching "{query}"
              </div>
            ) : (
              filtered.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={() => handleSelect(cmd)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-left hover:bg-muted/70 text-foreground transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-muted text-muted-foreground group-hover:text-foreground group-hover:bg-brand-500/10">
                      {cmd.icon}
                    </span>
                    <span className="font-medium">{cmd.title}</span>
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/70">
                    {cmd.category}
                  </span>
                </button>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
