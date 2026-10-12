import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Target,
  FileCheck,
  ShieldAlert,
  GitCompare,
  TrendingUp,
  Brain,
  Layers,
  ChevronDown,
  Lock,
  Briefcase,
  ExternalLink,
  Zap,
  Mail,
  Award,
  BarChart3
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CircularScore } from '../components/ui/CircularScore';
import { Marquee } from '../components/ui/Marquee';
import { CountUp } from '../components/ui/CountUp';
import { GoogleIcon, FacebookIcon, LinkedInIcon } from '../components/ui/SocialIcons';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { demoLogin } = useAuthStore();
  const [openFaq, setOpenFaq] = useState(null);
  const [previewTab, setPreviewTab] = useState('dossier'); // 'dossier' | 'cybernetic'

  const handleLaunchDemo = () => {
    demoLogin();
    toast.success('Signed in as Sarah Jenkins (Lead Talent Partner)');
    navigate('/app/dashboard');
  };

  const handleSocialAuth = (provider) => {
    demoLogin();
    toast.success(`Signed in via ${provider}`);
    navigate('/app/dashboard');
  };

  const companyLogos = [
    <div className="flex items-center gap-2.5 px-6 py-2.5 rounded-2xl glass-panel border border-card-border/60 text-muted-foreground hover:text-foreground transition-all">
      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
      <span className="font-heading font-bold text-sm tracking-tight text-foreground">Careem Tech Labs</span>
    </div>,
    <div className="flex items-center gap-2.5 px-6 py-2.5 rounded-2xl glass-panel border border-card-border/60 text-muted-foreground hover:text-foreground transition-all">
      <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
      <span className="font-heading font-bold text-sm tracking-tight text-foreground">Systems Limited</span>
    </div>,
    <div className="flex items-center gap-2.5 px-6 py-2.5 rounded-2xl glass-panel border border-card-border/60 text-muted-foreground hover:text-foreground transition-all">
      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
      <span className="font-heading font-bold text-sm tracking-tight text-foreground">Motive Global</span>
    </div>,
    <div className="flex items-center gap-2.5 px-6 py-2.5 rounded-2xl glass-panel border border-card-border/60 text-muted-foreground hover:text-foreground transition-all">
      <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
      <span className="font-heading font-bold text-sm tracking-tight text-foreground">Arbisoft</span>
    </div>,
    <div className="flex items-center gap-2.5 px-6 py-2.5 rounded-2xl glass-panel border border-card-border/60 text-muted-foreground hover:text-foreground transition-all">
      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
      <span className="font-heading font-bold text-sm tracking-tight text-foreground">Dubizzle Group</span>
    </div>,
    <div className="flex items-center gap-2.5 px-6 py-2.5 rounded-2xl glass-panel border border-card-border/60 text-muted-foreground hover:text-foreground transition-all">
      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
      <span className="font-heading font-bold text-sm tracking-tight text-foreground">VentureDive</span>
    </div>,
    <div className="flex items-center gap-2.5 px-6 py-2.5 rounded-2xl glass-panel border border-card-border/60 text-muted-foreground hover:text-foreground transition-all">
      <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
      <span className="font-heading font-bold text-sm tracking-tight text-foreground">10Pearls Tech</span>
    </div>,
    <div className="flex items-center gap-2.5 px-6 py-2.5 rounded-2xl glass-panel border border-card-border/60 text-muted-foreground hover:text-foreground transition-all">
      <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
      <span className="font-heading font-bold text-sm tracking-tight text-foreground">Stripe Talent Hub</span>
    </div>,
    <div className="flex items-center gap-2.5 px-6 py-2.5 rounded-2xl glass-panel border border-card-border/60 text-muted-foreground hover:text-foreground transition-all">
      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
      <span className="font-heading font-bold text-sm tracking-tight text-foreground">Datadog Engineering</span>
    </div>
  ];

  const intelligenceSignals = [
    <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl glass-panel border border-brand-500/30 text-xs font-bold text-foreground shadow-sm">
      <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
      <span>🎯 94% Semantic Match Precision</span>
    </div>,
    <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl glass-panel border border-emerald-500/30 text-xs font-bold text-foreground shadow-sm">
      <span className="w-2 h-2 rounded-full bg-emerald-500" />
      <span>🛡️ Zero False Claims: Fraud Radar</span>
    </div>,
    <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl glass-panel border border-indigo-500/30 text-xs font-bold text-foreground shadow-sm">
      <span className="w-2 h-2 rounded-full bg-indigo-500" />
      <span>⚡ Real-Time SHAP Factor Weighting</span>
    </div>,
    <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl glass-panel border border-cyan-500/30 text-xs font-bold text-foreground shadow-sm">
      <span className="w-2 h-2 rounded-full bg-cyan-500" />
      <span>🔍 GitHub Commits & Codebase Cross-Check</span>
    </div>,
    <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl glass-panel border border-amber-500/30 text-xs font-bold text-foreground shadow-sm">
      <span className="w-2 h-2 rounded-full bg-amber-500" />
      <span>📊 Cox Proportional Retention Hazard Model</span>
    </div>,
    <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl glass-panel border border-rose-500/30 text-xs font-bold text-foreground shadow-sm">
      <span className="w-2 h-2 rounded-full bg-rose-500" />
      <span>💼 93.8% Recruiter Offer Acceptance Rate</span>
    </div>,
    <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl glass-panel border border-teal-500/30 text-xs font-bold text-foreground shadow-sm">
      <span className="w-2 h-2 rounded-full bg-teal-500" />
      <span>👥 Evidence-Backed AI Persona Dossiers</span>
    </div>,
    <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl glass-panel border border-purple-500/30 text-xs font-bold text-foreground shadow-sm">
      <span className="w-2 h-2 rounded-full bg-purple-500" />
      <span>🤝 100% Recruiter Human Review Mandate</span>
    </div>
  ];

  const workflowSteps = [
    {
      num: "01",
      title: "Multi-Source CV Ingestion",
      desc: "Drag and drop unstructured candidate CVs. Our parser extracts experience, projects, credentials, and code repositories with zero manual data entry.",
      badge: "Fast Ingestion"
    },
    {
      num: "02",
      title: "Evidence Cross-Verification",
      desc: "Autonomous engines cross-reference CV claims against GitHub commits, LinkedIn tenure, and degree registries, highlighting verified proof vs unverified claims.",
      badge: "Anti-Fraud Auditing"
    },
    {
      num: "03",
      title: "Persona & Semantic Scoring",
      desc: "Synthesize an evidence-backed persona, technical depth radar breakdown, and calibrated job-fit ranking with explainable dimension weighting.",
      badge: "Deep Synthesis"
    },
    {
      num: "04",
      title: "Human Approval & Delivery",
      desc: "Recruiters review fraud flags, run retention simulations, calibrate compensation offers, and approve AI-drafted communications before sending.",
      badge: "100% Recruiter Controlled"
    }
  ];

  const faqs = [
    {
      q: "Does Recruiter.AI make automated rejection or hiring decisions?",
      a: "Strictly no. Recruiter.AI is architected under the principle: 'AI assists, humans decide.' The system computes evidence scores and drafts communications, but every single email send, shortlist, or rejection requires explicit recruiter confirmation."
    },
    {
      q: "How does the system verify candidate claims?",
      a: "The engine links with external evidence sources (GitHub repos, commit frequency, verified LinkedIn profiles, and public registries) to classify claims into 'Verified' with source links or 'Unverified' self-reports."
    },
    {
      q: "Can I use Recruiter.AI standalone without a live backend?",
      a: "Yes. Recruiter.AI includes a comprehensive, realistic mock service layer with Pakistani and global candidates. You can test the complete end-to-end workflow standalone or flip the environment variable to connect with your FastAPI service."
    },
    {
      q: "Is candidate data protected?",
      a: "Absolutely. All processing respects role-based JWT authentication, zero persistent storage of unredacted credentials, and strict audit logs."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground bg-grid-pattern relative overflow-hidden selection:bg-brand-500/20">
      <Navbar />

      {/* Aurora glow ambient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] aurora-glow pointer-events-none -z-10" />

      {/* 1. Hero Section */}
      <section className="pt-36 sm:pt-44 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 max-w-4xl mx-auto"
        >
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-600 dark:text-brand-300 text-xs sm:text-sm font-medium shadow-glow-sm">
            <Sparkles className="w-4 h-4 text-brand-cyan animate-spin-slow" />
            <span className="font-heading">Autonomous Decision Support System for Modern Talent Teams</span>
          </div>

          {/* Scaled Editorial H1 with animated gradient sweep */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight font-heading leading-[1.04] text-foreground">
            Hire smarter.{' '}
            <br />
            Decide with{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-500 via-indigo-500 to-brand-cyan animate-gradient-flow inline-block">
              evidence.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-normal">
            Eliminate CV guesswork with evidence-audited candidate personas, multi-source verification, fraud risk intelligence, and human-in-the-loop offer optimization.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <Button
              onClick={handleLaunchDemo}
              size="xl"
              variant="primary"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="w-full sm:w-auto text-base px-9 h-14 shadow-glow-lg font-bold"
            >
              Explore Interactive Demo Workspace
            </Button>
            <Button
              onClick={() => navigate('/login')}
              size="xl"
              variant="secondary"
              className="w-full sm:w-auto text-base px-8 h-14 font-semibold"
            >
              Sign In to Organization
            </Button>
          </div>

          {/* Quick 1-Click Social Sign-In Bar on Landing Page */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              Or 1-click recruiter access:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSocialAuth('Google')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-card-border bg-card/80 hover:bg-muted text-xs font-bold text-foreground transition-all shadow-sm hover:scale-105"
                title="Sign in with Google"
              >
                <GoogleIcon size={16} />
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialAuth('LinkedIn')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-card-border bg-card/80 hover:bg-muted text-xs font-bold text-foreground transition-all shadow-sm hover:scale-105"
                title="Sign in with LinkedIn"
              >
                <LinkedInIcon size={16} />
                <span>LinkedIn</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialAuth('Facebook')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-card-border bg-card/80 hover:bg-muted text-xs font-bold text-foreground transition-all shadow-sm hover:scale-105"
                title="Sign in with Facebook"
              >
                <FacebookIcon size={16} />
                <span>Facebook</span>
              </button>
              <button
                type="button"
                onClick={handleLaunchDemo}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-brand-500/30 bg-brand-500/10 hover:bg-brand-500/20 text-xs font-bold text-brand-600 dark:text-brand-400 transition-all shadow-sm hover:scale-105"
                title="Instant Demo Access"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                <span>Sarah (Demo)</span>
              </button>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-muted-foreground">
            <span className="flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Human-in-the-Loop Mandate
            </span>
            <span className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-brand-500" />
              Multi-Source Cross Verification
            </span>
            <span className="flex items-center gap-2 font-medium">
              <Lock className="w-4 h-4 text-indigo-400" />
              Role-Based JWT Security
            </span>
          </div>
        </motion.div>

        {/* 2. 3D-Tilted Dashboard Preview with Floating Glass Chips */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 sm:mt-20 max-w-5xl mx-auto relative perspective-1000"
        >
          {/* Floating Glass Chip 1: 94% Match Fit */}
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-6 -left-4 sm:-left-8 z-30 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-panel border border-brand-500/40 shadow-glow-md bg-card/95"
          >
            <div className="w-8 h-8 rounded-full bg-brand-500/20 text-brand-500 flex items-center justify-center font-bold text-xs">
              94%
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-foreground font-heading">Match Fit Calibrated</p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">Top 2% Requisition Match</p>
            </div>
          </motion.div>

          {/* Floating Glass Chip 2: 14 Claims Verified */}
          <motion.div
            animate={{ y: [6, -6, 6] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-8 -right-4 sm:-right-8 z-30 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-panel border border-emerald-500/40 shadow-glow-md bg-card/95"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-foreground font-heading">14 Claims Verified</p>
              <p className="text-[10px] text-muted-foreground font-mono">GitHub & LinkedIn Corroborated</p>
            </div>
          </motion.div>

          {/* Floating Glass Chip 3: Low Attrition Risk */}
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-6 -left-2 sm:-left-6 z-30 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-panel border border-indigo-500/40 shadow-glow-md bg-card/95"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-foreground font-heading">Low Attrition Risk (12%)</p>
              <p className="text-[10px] text-muted-foreground font-mono">Stable Career Trajectory</p>
            </div>
          </motion.div>

          {/* Floating Glass Chip 4: Human Sign-off */}
          <motion.div
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute -bottom-6 -right-2 sm:-right-6 z-30 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-panel border border-brand-cyan/40 shadow-glow-md bg-card/95"
          >
            <div className="w-8 h-8 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-foreground font-heading">Offer Approved by Sarah J.</p>
              <p className="text-[10px] text-brand-cyan font-mono">Recruiter Human Sign-Off</p>
            </div>
          </motion.div>

          {/* Main 3D Card Shell with Rotating Aura Border */}
          <div className="relative rounded-3xl glass-panel p-5 sm:p-7 shadow-2xl border border-card-border overflow-hidden group">
            {/* Window Topbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-card-border mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-3 text-xs font-mono text-muted-foreground truncate hidden sm:inline">
                  recruiter.ai/app/persona/hamza-tariq
                </span>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-muted/60 border border-card-border text-xs">
                <button
                  type="button"
                  onClick={() => setPreviewTab('dossier')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    previewTab === 'dossier'
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Evidence Dossier
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('cybernetic')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    previewTab === 'cybernetic'
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-brand-500" />
                  <span>Radar AI Studio</span>
                </button>
              </div>

              <Badge variant="success" size="sm" dot>Live Evidence Stream</Badge>
            </div>

            {previewTab === 'dossier' ? (
              /* Simulated Live Persona Hero Preview */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold font-mono shadow-glow-sm">
                      HT
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold font-heading text-foreground">Hamza Tariq</h3>
                        <Badge variant="brand" size="sm">Staff Engineer</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Islamabad, PK • Careem Tech Labs • 6.5 yrs exp
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-muted/60 border border-card-border text-xs text-foreground leading-relaxed">
                    <p className="font-semibold text-brand-500 dark:text-brand-400 mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-brand-cyan" /> AI Persona Evidence Synthesis
                    </p>
                    "Demonstrates pragmatic systems craftsmanship across distributed Python ASGI microservices and React. Code review records and GitHub commits confirm 1.2M daily event architecture without fraud flags."
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 rounded-xl text-xs font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/25 flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 14 Claims Verified
                    </span>
                    <span className="px-3 py-1.5 rounded-xl text-xs font-mono bg-brand-500/10 text-brand-500 border border-brand-500/25 font-bold">
                      GitHub: 1,420 Commits
                    </span>
                    <span className="px-3 py-1.5 rounded-xl text-xs font-mono bg-muted text-muted-foreground border border-card-border font-bold">
                      Low Risk (12%)
                    </span>
                  </div>
                </div>

                {/* Match and Confidence Gauges */}
                <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-muted/40 border border-card-border text-center space-y-3">
                  <CircularScore score={94} size={114} strokeWidth={8} label="MATCH FIT" colorScheme="auto" />
                  <div>
                    <span className="text-xs font-bold text-foreground block">Senior Full Stack Lead</span>
                    <span className="text-[11px] text-emerald-500 font-mono">Calibrated top 2% candidate</span>
                  </div>
                  <Button size="sm" variant="primary" onClick={handleLaunchDemo} className="w-full text-xs font-bold">
                    Review Persona & Send Offer
                  </Button>
                </div>
              </div>
            ) : (
              /* High-Fidelity Holographic Radar Studio Visual */
              <div className="relative rounded-2xl overflow-hidden border border-brand-500/30 group/img">
                <img
                  src="/talent_dossier_preview.jpg"
                  alt="Recruiter.AI Talent Dossier Studio"
                  className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 group-hover/img:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/80 via-transparent to-transparent flex items-end p-6 justify-between">
                  <div className="text-left text-white space-y-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-brand-500/30 border border-brand-500/40 text-brand-300">
                      High-Precision Telemetry
                    </span>
                    <p className="text-base font-bold font-heading">
                      Alex Chen • Senior AI Engineer Dossier
                    </p>
                    <p className="text-xs text-slate-300 font-mono">
                      94% Requisition Match • Multi-Factor Radar Dimension Analysis
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={handleLaunchDemo}
                    className="font-bold shadow-glow-md"
                  >
                    Open Live Dossier
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* 3. Dual Infinite Marquee Strip: Companies (Left) & Real-Time Signals (Right) */}
      <section className="py-14 border-y border-card-border bg-card/40 backdrop-blur-md space-y-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
            Trusted by top engineering organizations • Real-time continuous talent intelligence
          </p>
        </div>
        
        {/* Row 1: Leftward scrolling companies */}
        <Marquee items={companyLogos} speed={32} direction="left" />

        {/* Row 2: Rightward scrolling intelligence signals */}
        <Marquee items={intelligenceSignals} speed={26} direction="right" />
      </section>

      {/* 4. Bento Grid: 9-Module Feature Architecture */}
      <section id="features" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="brand" size="md">Core Intelligence Architecture</Badge>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-heading">
            Nine Specialized Modules. One Verifiable Hub.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Every layer designed to eradicate blind spots, detect resume inconsistencies, and give recruiters decision superpowers.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Card 1: Large col-span-2 */}
          <div className="md:col-span-2 p-8 rounded-3xl glass-panel border border-card-border hover:border-brand-500/40 transition-all space-y-5 relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <div className="p-3.5 rounded-2xl bg-brand-500/10 text-brand-500 border border-brand-500/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <Badge variant="brand" size="sm">Flagship Studio</Badge>
            </div>
            <div>
              <h3 className="text-2xl font-bold font-heading text-foreground">AI Candidate Persona Studio</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-xl leading-relaxed">
                Transform static PDFs into dynamic evidence dossiers with automated GitHub code auditing, claimed tenure verification, and tailored interview probes.
              </p>
            </div>
            {/* Live Progress Mini-Visual */}
            <div className="p-5 rounded-2xl bg-muted/60 border border-card-border space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-foreground font-semibold">Distributed Architecture Evidence</span>
                <span className="text-emerald-500 font-bold">96% Verified</span>
              </div>
              <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[96%]" />
              </div>
              <p className="text-[11px] text-muted-foreground font-mono">
                Corroborated by 4 public open-source repos & verified commit logs
              </p>
            </div>
          </div>

          {/* Bento Card 2: Semantic Matching */}
          <div className="p-8 rounded-3xl glass-panel border border-card-border hover:border-brand-500/40 transition-all space-y-5 group">
            <div className="p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 w-fit">
              <GitCompare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading text-foreground">Semantic Matching</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Multi-dimensional vector scoring comparing real capability depth rather than keyword frequency.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center">
              <CircularScore score={92} size={100} strokeWidth={7} label="VECTOR FIT" colorScheme="auto" />
            </div>
          </div>

          {/* Bento Card 3: Fraud Risk Intelligence */}
          <div className="p-8 rounded-3xl glass-panel border border-card-border hover:border-brand-500/40 transition-all space-y-5 group">
            <div className="p-3.5 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20 w-fit">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading text-foreground">Fraud & Anomaly Intel</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Detect 20-month overlapping full-time tenures, plagiarized project summaries, and phantom credentials.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-mono text-rose-400 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Zero undetected overlapping tenures</span>
            </div>
          </div>

          {/* Bento Card 4: Retention Predictor */}
          <div className="p-8 rounded-3xl glass-panel border border-card-border hover:border-brand-500/40 transition-all space-y-5 group">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading text-foreground">Retention Predictor</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Explainable tenure drivers assessing compensation fairness, commute distance, and growth ceiling.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 flex items-center justify-between">
              <span>Projected 2-Year Retention:</span>
              <span className="font-bold">88%</span>
            </div>
          </div>

          {/* Bento Card 5: Offer Optimizer & Comms (Large col-span-1) */}
          <div className="p-8 rounded-3xl glass-panel border border-card-border hover:border-brand-500/40 transition-all space-y-5 group">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 w-fit">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading text-foreground">Offer Optimizer & Comms</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Simulate acceptance probability across salary ranges and generate personalized emails with human sign-off.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Mandatory Recruiter Review</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Workflow Timeline */}
      <section id="how-it-works" className="py-24 border-t border-card-border bg-card/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <Badge variant="brand" size="md">Step-by-Step Architecture</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
              Four Steps from Ingestion to Approved Offer
            </h2>
            <p className="text-sm text-muted-foreground">
              A disciplined, verifiable evaluation workflow designed to save hundreds of hours while boosting candidate match quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step) => (
              <div
                key={step.num}
                className="p-7 rounded-3xl glass-panel border border-card-border relative space-y-4 hover:border-brand-500/40 hover:shadow-glow-sm transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-black font-mono text-brand-500/25 group-hover:text-brand-500/50 transition-colors">
                    {step.num}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500 border border-brand-500/20">
                    {step.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-heading text-foreground">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Human in the Loop Mandate Banner */}
      <section id="human-loop" className="py-24 border-t border-card-border bg-gradient-to-b from-brand-500/5 via-card/10 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="w-18 h-18 p-4 rounded-3xl bg-brand-500/10 text-brand-500 border border-brand-500/25 flex items-center justify-center mx-auto shadow-glow-sm">
            <ShieldCheck className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight">
            "AI assists. Recruiters decide."
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Autonomous hiring engines create bias and alienate candidates. Recruiter.AI provides radical transparency: explainable scores, verified sources, and mandatory human sign-offs for every offer and email.
          </p>
          <div className="pt-3">
            <Button size="xl" variant="primary" onClick={handleLaunchDemo} className="font-bold px-8 h-12 shadow-glow-md">
              Launch Recruiter Demo Account
            </Button>
          </div>
        </div>
      </section>

      {/* 7. Animated CountUp KPI Stats Band */}
      <section className="py-20 border-y border-card-border bg-card/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl font-black text-brand-500 font-heading">
              <CountUp target={94} duration={1.5} suffix="%" />
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Claim Verification Accuracy</p>
          </div>
          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl font-black text-foreground font-heading">
              <CountUp target={18} duration={1.5} suffix=" min" />
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Avg Time to Screen CV</p>
          </div>
          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl font-black text-emerald-500 font-heading">
              <CountUp target={0} duration={1} suffix="%" />
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Unapproved Auto-Sends</p>
          </div>
          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl font-black text-brand-cyan font-heading">
              <CountUp target={42} duration={1.5} suffix="%" />
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Cycle Time Reduction</p>
          </div>
        </div>
      </section>

      {/* 8. FAQ Accordion */}
      <section id="faq" className="py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-14 space-y-3">
          <Badge variant="brand" size="md">Clarity & Confidence</Badge>
          <h2 className="text-3xl sm:text-4xl font-black font-heading">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-card-border glass-panel overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between text-base font-semibold text-foreground hover:bg-muted/30 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-5 pt-0 text-sm text-muted-foreground leading-relaxed border-t border-card-border/50"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. Grand Aurora CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="p-12 sm:p-16 rounded-3xl bg-gradient-to-b from-brand-500/15 via-card/80 to-card border border-brand-500/35 shadow-glow-md space-y-7 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-cyan/15 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-4xl sm:text-6xl font-black font-heading text-foreground tracking-tight">
            Ready to upgrade your talent decision standard?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Experience the complete platform right now with our interactive recruiter demo account.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <Button
              onClick={handleLaunchDemo}
              size="xl"
              variant="primary"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="text-base px-9 h-14 shadow-glow-lg font-bold"
            >
              Launch Interactive Demo
            </Button>
            <Button
              onClick={() => navigate('/login')}
              size="xl"
              variant="secondary"
              className="text-base px-8 h-14 font-semibold"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
