import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sun, Moon, ShieldCheck, Menu, X } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo - Compact without overflowing subtitle */}
        <Link to="/" className="flex items-center group shrink-0">
          <Logo size="md" showSubtitle={false} />
        </Link>

        {/* Navigation Links - Strictly 1 Line, 1 Row, Whitespace Nowrap */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-muted-foreground whitespace-nowrap shrink-0">
          <a
            href="#features"
            className="hover:text-foreground transition-colors whitespace-nowrap shrink-0 inline-flex items-center"
          >
            Platform Modules
          </a>
          <a
            href="#flagship"
            className="hover:text-foreground transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1.5"
          >
            <span>Persona Studio</span>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-brand-500/15 text-brand-500 rounded-full shrink-0">
              Flagship
            </span>
          </a>
          <a
            href="#how-it-works"
            className="hover:text-foreground transition-colors whitespace-nowrap shrink-0 inline-flex items-center"
          >
            How It Works
          </a>
          <a
            href="#human-loop"
            className="hover:text-foreground transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Human-in-Loop</span>
          </a>
          <a
            href="#faq"
            className="hover:text-foreground transition-colors whitespace-nowrap shrink-0 inline-flex items-center"
          >
            FAQ
          </a>
        </nav>

        {/* CTA and Theme Toggle - 1 Row Only */}
        <div className="flex items-center gap-3 shrink-0 whitespace-nowrap">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
            aria-label="Toggle color theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500 shrink-0" />
            )}
          </button>

          {isAuthenticated ? (
            <Button
              onClick={() => navigate('/app/dashboard')}
              variant="primary"
              size="md"
              className="shrink-0 whitespace-nowrap"
              rightIcon={<ArrowRight className="w-4 h-4 shrink-0" />}
            >
              Dashboard
            </Button>
          ) : (
            <div className="hidden sm:flex items-center gap-3 shrink-0 whitespace-nowrap">
              <Button
                onClick={() => navigate('/login')}
                variant="ghost"
                size="md"
                className="shrink-0 whitespace-nowrap"
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate('/login')}
                variant="primary"
                size="md"
                className="shrink-0 whitespace-nowrap"
                rightIcon={<ArrowRight className="w-4 h-4 shrink-0" />}
              >
                Launch Demo
              </Button>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
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
            className="lg:hidden border-b border-card-border bg-card/95 backdrop-blur-2xl px-5 py-6 space-y-4 shadow-2xl"
          >
            <nav className="flex flex-col space-y-3 text-sm font-medium text-muted-foreground">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-foreground p-2 rounded-lg hover:bg-muted transition-colors whitespace-nowrap"
              >
                Platform Modules
              </a>
              <a
                href="#flagship"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-foreground p-2 rounded-lg hover:bg-muted transition-colors flex items-center justify-between whitespace-nowrap"
              >
                <span>Persona Studio</span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-brand-500/15 text-brand-500 rounded-full">
                  Flagship
                </span>
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-foreground p-2 rounded-lg hover:bg-muted transition-colors whitespace-nowrap"
              >
                How It Works
              </a>
              <a
                href="#human-loop"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-foreground p-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Human-in-Loop</span>
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-foreground p-2 rounded-lg hover:bg-muted transition-colors whitespace-nowrap"
              >
                FAQ
              </a>
            </nav>

            <div className="pt-3 border-t border-card-border flex flex-col gap-2.5">
              <Button
                onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}
                variant="secondary"
                size="md"
                className="w-full font-bold whitespace-nowrap"
              >
                Sign In
              </Button>
              <Button
                onClick={handleLaunchDemo}
                variant="primary"
                size="md"
                className="w-full font-bold whitespace-nowrap"
                rightIcon={<ArrowRight className="w-4 h-4 shrink-0" />}
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

export default Navbar;
