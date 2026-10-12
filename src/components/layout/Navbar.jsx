import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Sun, Moon, ShieldCheck, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';
import { useThemeStore } from '../../store/themeStore';
import { useAuthStore } from '../../store/authStore';

export const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();
  const { isAuthenticated, demoLogin } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLaunchDemo = () => {
    setMobileMenuOpen(false);
    demoLogin();
    navigate('/app/dashboard');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center group shrink-0">
          <Logo size="lg" />
        </Link>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Platform Modules</a>
          <a href="#flagship" className="hover:text-foreground transition-colors flex items-center gap-1.5">
            <span>Persona Studio</span>
            <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-brand-500/15 text-brand-500 rounded-full">Flagship</span>
          </a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          <a href="#human-loop" className="hover:text-foreground transition-colors flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Human-in-Loop</span>
          </a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </nav>

        {/* CTA and Theme Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle color theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}
          </button>

          {isAuthenticated ? (
            <Button
              onClick={() => navigate('/app/dashboard')}
              variant="primary"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Dashboard
            </Button>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Button
                onClick={() => navigate('/login')}
                variant="ghost"
                size="md"
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate('/login')}
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Launch Demo
              </Button>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-card-border bg-card/95 backdrop-blur-2xl px-5 py-6 space-y-4 shadow-2xl"
          >
            <nav className="flex flex-col space-y-3 text-sm font-medium text-muted-foreground">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-foreground p-2 rounded-lg hover:bg-muted transition-colors"
              >
                Platform Modules
              </a>
              <a
                href="#flagship"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-foreground p-2 rounded-lg hover:bg-muted transition-colors flex items-center justify-between"
              >
                <span>Persona Studio</span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-brand-500/15 text-brand-500 rounded-full">Flagship</span>
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-foreground p-2 rounded-lg hover:bg-muted transition-colors"
              >
                How It Works
              </a>
              <a
                href="#human-loop"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-foreground p-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Human-in-Loop</span>
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-foreground p-2 rounded-lg hover:bg-muted transition-colors"
              >
                FAQ
              </a>
            </nav>

            <div className="pt-3 border-t border-card-border flex flex-col gap-2.5">
              <Button
                onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}
                variant="secondary"
                size="md"
                className="w-full font-bold"
              >
                Sign In
              </Button>
              <Button
                onClick={handleLaunchDemo}
                variant="primary"
                size="md"
                className="w-full font-bold"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Launch Demo (Instant Access)
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
