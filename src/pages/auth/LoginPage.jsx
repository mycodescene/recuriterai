import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Eye, EyeOff, Lock, Mail, ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Logo } from '../../components/ui/Logo';
import { GoogleIcon, FacebookIcon, LinkedInIcon } from '../../components/ui/SocialIcons';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'sonner';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, demoLogin } = useAuthStore();
  
  const [email, setEmail] = useState('sarah.jenkins@recruiter.ai');
  const [password, setPassword] = useState('recruiter2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide email and password');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      await new Promise(r => setTimeout(r, 600));
      login(email, password);
      toast.success('Signed in successfully as Recruiter');
      navigate('/app/dashboard');
    } catch (err) {
      setError('Authentication failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    demoLogin();
    toast.success('Signed in with Recruiter Demo Account');
    navigate('/app/dashboard');
  };

  const handleSocialLogin = (provider) => {
    demoLogin();
    toast.success(`Signed in via ${provider}`);
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground transition-colors duration-200">
      {/* Left split-screen: Animated brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-midnight-950 p-12 flex-col justify-between overflow-hidden border-r border-card-border">
        {/* Glow & grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Brand */}
        <Link to="/" className="relative z-10 flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 to-indigo-600 flex items-center justify-center text-white shadow-glow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-heading font-extrabold text-xl tracking-tight text-white">
            Recruiter<span className="text-brand-500">.AI</span>
          </span>
        </Link>

        {/* Middle Feature Highlights */}
        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Intelligent Hiring Decision Support</span>
          </div>

          <h2 className="text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
            Evidence-backed candidate dossiers with human review built in.
          </h2>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Continuous cross-referencing with GitHub, LinkedIn & degrees</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Multi-dimensional semantic matching & fraud detection</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Retention forecasting with SHAP explainable factor models</span>
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="relative z-10 p-5 rounded-2xl bg-midnight-900/80 border border-white/10 text-xs text-slate-300">
          <p className="italic">
            "Recruiter.AI gives our talent partners complete confidence. We screen twice as many candidates while eliminating fraud signals."
          </p>
          <p className="mt-2 font-mono font-semibold text-brand-400">
            — Sarah Jenkins, Lead Technical Talent Partner
          </p>
        </div>
      </div>

      {/* Right split-screen: Authentication Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 max-w-xl mx-auto w-full">
        {/* Top bar with Back to Home button */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted border border-card-border transition-all group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Home</span>
          </Link>

          <div className="lg:hidden">
            <Link to="/" className="flex items-center">
              <Logo size="sm" />
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-heading text-foreground tracking-tight">
              Sign in to Recruiter.AI
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Access your intelligent candidate pipelines and decision support workspace.
            </p>
          </div>

          {/* Quick Demo Button */}
          <div className="p-4 rounded-2xl bg-brand-500/10 border border-brand-500/20 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-600 dark:text-brand-400 font-mono uppercase">
                Instant 1-Click Access
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                Demo Ready
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Skip credentials to explore all 9 modules with pre-populated candidates and active jobs.
            </p>
            <Button
              onClick={handleDemoLogin}
              variant="primary"
              size="md"
              className="w-full text-sm font-bold"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Use Demo Account (Sarah Jenkins)
            </Button>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-card-border w-full" />
              <span className="bg-background px-3 text-[11px] font-mono uppercase text-muted-foreground whitespace-nowrap">
                or continue with
              </span>
              <div className="border-t border-card-border w-full" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="flex items-center justify-center gap-2 h-11 px-3 rounded-xl border border-card-border bg-card hover:bg-muted/70 hover:border-slate-400 dark:hover:border-white/20 transition-all shadow-sm text-xs font-bold text-foreground group focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              >
                <GoogleIcon size={18} />
                <span className="truncate">Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin('Facebook')}
                className="flex items-center justify-center gap-2 h-11 px-3 rounded-xl border border-card-border bg-card hover:bg-muted/70 hover:border-[#1877F2]/50 transition-all shadow-sm text-xs font-bold text-foreground group focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              >
                <FacebookIcon size={18} />
                <span className="truncate">Facebook</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin('LinkedIn')}
                className="flex items-center justify-center gap-2 h-11 px-3 rounded-xl border border-card-border bg-card hover:bg-muted/70 hover:border-[#0A66C2]/50 transition-all shadow-sm text-xs font-bold text-foreground group focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              >
                <LinkedInIcon size={18} />
                <span className="truncate">LinkedIn</span>
              </button>
            </div>
          </div>

          {/* Email / Password Login */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-card-border w-full" />
            <span className="bg-background px-3 text-[11px] font-mono uppercase text-muted-foreground whitespace-nowrap">
              or enter credentials
            </span>
            <div className="border-t border-card-border w-full" />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-risk-500/10 border border-risk-500/25 text-xs text-risk-500 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Work Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sarah.jenkins@recruiter.ai"
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-muted-foreground">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  leftIcon={<Lock className="w-4 h-4" />}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full mt-2 font-bold"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to Workspace
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an enterprise account?{' '}
            <Link to="/register" className="text-brand-600 dark:text-brand-400 font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
