import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, User, Mail, Lock, Building, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Logo } from '../../components/ui/Logo';
import { GoogleIcon, FacebookIcon, LinkedInIcon } from '../../components/ui/SocialIcons';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'sonner';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { login, demoLogin } = useAuthStore();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    password: '',
    role: 'Lead Technical Recruiter'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 600));
    login(formData.email, formData.password);
    toast.success('Account created successfully! Welcome to Recruiter.AI');
    setIsLoading(false);
    navigate('/app/dashboard');
  };

  const handleSocialSignup = (provider) => {
    demoLogin();
    toast.success(`Account registered via ${provider}`);
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground transition-colors duration-200">
      {/* Left split-screen: Animated brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-midnight-950 p-12 flex-col justify-between overflow-hidden border-r border-card-border">
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <Link to="/" className="relative z-10 flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 to-indigo-600 flex items-center justify-center text-white shadow-glow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-heading font-extrabold text-xl tracking-tight text-white">
            Recruiter<span className="text-brand-500">.AI</span>
          </span>
        </Link>

        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Enterprise Talent Decision Suite</span>
          </div>

          <h2 className="text-3xl font-extrabold font-heading text-white tracking-tight leading-tight">
            Elevate your recruiting team with evidence intelligence.
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Join hundreds of engineering talent squads using automated evidence dossiers, radar competency scores, and offer probability calculations.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>9 specialized intelligence modules in one platform</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>AI-generated persona dossiers with recruiter review gates</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Fraud detection, retention forecasting, offer optimization</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-slate-400 font-mono">
          © 2026 Recruiter.AI Enterprise Cloud
        </div>
      </div>

      {/* Register form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 max-w-xl mx-auto w-full overflow-y-auto">
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

        <div className="space-y-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-heading text-foreground tracking-tight">
              Create your Recruiter.AI Account
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Set up your talent decision intelligence workspace in seconds.
            </p>
          </div>

          {/* Social Sign-up Buttons */}
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleSocialSignup('Google')}
                className="flex items-center justify-center gap-2 h-11 px-3 rounded-xl border border-card-border bg-card hover:bg-muted/70 hover:border-slate-400 dark:hover:border-white/20 transition-all shadow-sm text-xs font-bold text-foreground group focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              >
                <GoogleIcon size={18} />
                <span className="truncate">Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialSignup('Facebook')}
                className="flex items-center justify-center gap-2 h-11 px-3 rounded-xl border border-card-border bg-card hover:bg-muted/70 hover:border-[#1877F2]/50 transition-all shadow-sm text-xs font-bold text-foreground group focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              >
                <FacebookIcon size={18} />
                <span className="truncate">Facebook</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialSignup('LinkedIn')}
                className="flex items-center justify-center gap-2 h-11 px-3 rounded-xl border border-card-border bg-card hover:bg-muted/70 hover:border-[#0A66C2]/50 transition-all shadow-sm text-xs font-bold text-foreground group focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              >
                <LinkedInIcon size={18} />
                <span className="truncate">LinkedIn</span>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-card-border w-full" />
            <span className="bg-background px-3 text-[11px] font-mono uppercase text-muted-foreground whitespace-nowrap">
              or register with email
            </span>
            <div className="border-t border-card-border w-full" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <Input
              label="Full Name"
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Sarah Jenkins"
              leftIcon={<User className="w-4 h-4" />}
              required
            />

            <Input
              label="Work Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="sarah.jenkins@company.com"
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label="Company Name"
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Stripe, Datadog, etc."
              leftIcon={<Building className="w-4 h-4" />}
              required
            />

            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••••••"
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full mt-3 font-bold"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Start 14-Day Free Trial
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-600 dark:text-brand-400 font-bold hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
