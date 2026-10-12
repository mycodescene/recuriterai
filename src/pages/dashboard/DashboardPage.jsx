import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Users,
  Target,
  Mail,
  ArrowUpRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  PlusCircle,
  FileBarChart,
  UserCheck,
  Clock,
  ArrowRight,
  CheckSquare
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Skeleton } from '../../components/ui/Skeleton';
import { CountUp } from '../../components/ui/CountUp';
import { Sparkline } from '../../components/charts/Sparkline';
import { FunnelChart } from '../../components/charts/FunnelChart';
import { CandidatesAreaChart } from '../../components/charts/CandidatesAreaChart';
import { RiskDonutChart } from '../../components/charts/RiskDonutChart';
import { dashboardService } from '../../services/api/dashboardService';
import { candidateService } from '../../services/api/candidateService';
import { useAuthStore } from '../../store/authStore';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [metrics, setMetrics] = useState(null);
  const [topCandidates, setTopCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        const [dashData, candData] = await Promise.all([
          dashboardService.getMetrics(),
          candidateService.getAll()
        ]);
        setMetrics(dashData);
        // Top 4 candidates by match score
        const sorted = [...candData].sort((a, b) => b.matchScore - a.matchScore).slice(0, 4);
        setTopCandidates(sorted);
      } catch (e) {
        console.error('Error fetching dashboard metrics', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  const todayStr = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  if (isLoading || !metrics) {
    return (
      <div className="space-y-6 max-w-[1600px] mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-10 w-36" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-36 rounded-2xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-80 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      </div>
    );
  }

  // Parse numeric values for CountUp
  const getNumericValue = (val) => {
    if (typeof val === 'number') return val;
    const num = parseFloat(String(val).replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
  };

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto w-full">
      {/* 1. Hero Greeting Banner with Gradient Mesh */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-brand-500/10 via-indigo-500/10 to-brand-cyan/10 border border-brand-500/20 overflow-hidden shadow-glow-sm">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/15 px-2.5 py-1 rounded-full border border-brand-500/25">
                {todayStr}
              </span>
              <span className="flex items-center gap-1 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Telemetry Active
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black font-heading text-foreground tracking-tight flex items-center gap-2.5">
              <span>Good morning, {user?.name?.split(' ')[0] || 'Sarah'}</span>
              <span className="inline-block animate-wiggle">👋</span>
            </h1>

            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              3 candidate claim discrepancies require human verification, and 2 calibrated offer recommendations are ready for review.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <Button
              onClick={() => navigate('/app/jobs/create')}
              variant="primary"
              size="lg"
              leftIcon={<PlusCircle className="w-5 h-5" />}
              className="flex-1 sm:flex-initial shadow-glow-md font-bold text-sm"
            >
              Create Job Requisition
            </Button>
            <Button
              onClick={() => navigate('/app/reports')}
              variant="secondary"
              size="lg"
              leftIcon={<FileBarChart className="w-5 h-5" />}
              className="flex-1 sm:flex-initial text-sm"
            >
              Export Intelligence Report
            </Button>
          </div>
        </div>
      </div>

      {/* 2. 4 Large Animated KPI Cards with CountUp & Sparklines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.kpis.map((kpi, idx) => (
          <motion.div
            key={kpi.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.3 }}
          >
            <Card className="p-6 relative overflow-hidden h-full flex flex-col justify-between" hoverable glow>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    {kpi.title}
                  </span>
                  <div className="p-2.5 rounded-2xl bg-muted/80 text-brand-500 border border-card-border/80 shadow-sm">
                    {kpi.icon === 'Briefcase' && <Briefcase className="w-4 h-4 text-brand-500" />}
                    {kpi.icon === 'Users' && <Users className="w-4 h-4 text-indigo-400" />}
                    {kpi.icon === 'Target' && <Target className="w-4 h-4 text-brand-cyan" />}
                    {kpi.icon === 'Mail' && <Mail className="w-4 h-4 text-emerald-500" />}
                  </div>
                </div>

                <div className="mt-5 flex items-baseline justify-between gap-2">
                  <div className="text-3xl sm:text-4xl font-black font-heading text-foreground tracking-tight tabular-nums">
                    <CountUp
                      target={getNumericValue(kpi.value)}
                      duration={1.2}
                      suffix={String(kpi.value).includes('%') ? '%' : ''}
                    />
                  </div>
                  <Sparkline data={kpi.sparkline} color={idx === 3 ? '#10B981' : '#7C3AED'} />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-card-border/60 flex items-center justify-between text-xs font-mono">
                <span className={kpi.trend === 'up' ? 'text-emerald-500 font-bold flex items-center gap-1' : 'text-muted-foreground font-medium flex items-center gap-1'}>
                  <TrendingUp className="w-3.5 h-3.5" />
                  {kpi.delta}
                </span>
                <span className="text-[11px] text-muted-foreground">vs previous 30d</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 3. Attention-Grabbing AI Alert Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-brand-500/10 to-rose-500/10 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-glow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 border border-amber-500/30 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono text-amber-500 uppercase tracking-wide">
                Priority Intelligence Notice
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">10m ago</span>
            </div>
            <p className="text-sm text-foreground mt-0.5 font-medium leading-snug">
              Candidate <strong className="text-foreground">Bilal Ahmed</strong> has overlapping concurrent full-time employment roles detected.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            size="md"
            variant="primary"
            onClick={() => navigate('/app/risk')}
            rightIcon={<ChevronRight className="w-4 h-4" />}
            className="text-xs font-bold w-full md:w-auto"
          >
            Audit Risk Evidence
          </Button>
        </div>
      </div>

      {/* 4. Main Charts Section (Hiring Funnel & Qualification Area) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Candidates Over Time Area Chart (7 cols) */}
        <Card className="lg:col-span-7 space-y-4 p-6" hoverable>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold font-heading text-foreground">Candidate Acquisition & Qualification</h2>
              <p className="text-xs text-muted-foreground">Monthly volume vs candidates achieving ≥75% verified match</p>
            </div>
            <Badge variant="brand" size="sm">6-Month Trend</Badge>
          </div>
          <CandidatesAreaChart data={metrics.candidatesOverTime} height={280} />
        </Card>

        {/* Hiring Funnel Drop-off (5 cols) */}
        <Card className="lg:col-span-5 space-y-4 p-6" hoverable>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold font-heading text-foreground">Hiring Conversion Funnel</h2>
              <p className="text-xs text-muted-foreground">From CV ingest to approved offer stage</p>
            </div>
            <span className="text-xs font-mono text-emerald-500 font-bold">14.6% Conversion</span>
          </div>
          <FunnelChart data={metrics.funnelData} />
        </Card>
      </div>

      {/* 5. Lower Section: Risk Distribution & Top Candidate Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Risk Distribution Donut (4 cols) */}
        <Card className="lg:col-span-4 space-y-3 p-6" hoverable>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold font-heading text-foreground">Pipeline Risk Distribution</h2>
              <p className="text-xs text-muted-foreground">CV fraud & discrepancy index breakdown</p>
            </div>
            <Button size="sm" variant="ghost" onClick={() => navigate('/app/risk')} className="text-xs">
              View All
            </Button>
          </div>
          <RiskDonutChart data={metrics.riskDistribution} height={240} />
        </Card>

        {/* Top Matched Candidates Leaderboard (8 cols) */}
        <Card className="lg:col-span-8 space-y-4 p-6" hoverable>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold font-heading text-foreground">Top Calibrated Candidates</h2>
              <p className="text-xs text-muted-foreground">Highest verified evidence-to-role requirement score</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => navigate('/app/matching')} className="text-xs">
              Open Matching Studio
            </Button>
          </div>

          <div className="divide-y divide-card-border/80">
            {topCandidates.map((cand) => (
              <div
                key={cand.id}
                onClick={() => navigate(`/app/persona/${cand.id}`)}
                className="py-3.5 flex items-center justify-between hover:bg-muted/40 px-3 rounded-2xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-mono font-bold text-sm shadow-glow-sm shrink-0">
                    {cand.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground group-hover:text-brand-500 transition-colors">
                        {cand.name}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-semibold">
                        {cand.riskLevel} Risk
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {cand.title} • {cand.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <span className="text-sm font-bold font-mono text-emerald-500 block">
                      {cand.matchScore}% Match
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {cand.claims?.filter(c => c.status === 'Verified').length || 12} Verified Claims
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 6. Human Decision Audit Log & Upcoming Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recruiter Audit Log (8 cols) */}
        <Card className="lg:col-span-8 space-y-4 p-6" hoverable>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <h2 className="text-lg font-bold font-heading text-foreground">Human Decision Audit Log</h2>
            </div>
            <span className="text-xs font-mono text-muted-foreground">100% Recruiter Controlled</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metrics.recentActivity.map((act) => (
              <div key={act.id} className="p-4 rounded-2xl bg-muted/40 border border-card-border/80 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span className="font-semibold text-foreground flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {act.user}
                  </span>
                  <span>{act.time}</span>
                </div>
                <p className="text-xs font-medium text-foreground">{act.action}</p>
                <p className="text-[11px] text-brand-600 dark:text-brand-400 font-semibold truncate">{act.target}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Items Checklist (4 cols) */}
        <Card className="lg:col-span-4 space-y-4 p-6" hoverable>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-brand-500" />
              <h2 className="text-lg font-bold font-heading text-foreground">Pending Human Actions</h2>
            </div>
            <Badge variant="brand" size="sm">3 Tasks</Badge>
          </div>

          <div className="space-y-3">
            <div
              onClick={() => navigate('/app/risk')}
              className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/15 cursor-pointer transition-colors space-y-1"
            >
              <div className="flex items-center justify-between text-xs font-bold text-rose-500">
                <span>Investigate Anomaly</span>
                <span className="font-mono text-[10px]">Urgent</span>
              </div>
              <p className="text-xs text-foreground font-medium">Verify Bilal Ahmed 20-month overlapping roles</p>
            </div>

            <div
              onClick={() => navigate('/app/offers')}
              className="p-3.5 rounded-2xl bg-brand-500/10 border border-brand-500/20 hover:bg-brand-500/15 cursor-pointer transition-colors space-y-1"
            >
              <div className="flex items-center justify-between text-xs font-bold text-brand-500">
                <span>Approve Offer Package</span>
                <span className="font-mono text-[10px]">Today</span>
              </div>
              <p className="text-xs text-foreground font-medium">Confirm PKR 650K package for Hamza Tariq</p>
            </div>

            <div
              onClick={() => navigate('/app/communications')}
              className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 cursor-pointer transition-colors space-y-1"
            >
              <div className="flex items-center justify-between text-xs font-bold text-emerald-500">
                <span>Review Feedback Draft</span>
                <span className="font-mono text-[10px]">Pending</span>
              </div>
              <p className="text-xs text-foreground font-medium">Approve constructive feedback for Dr. Zainab</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
