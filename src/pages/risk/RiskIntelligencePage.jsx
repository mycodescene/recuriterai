import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  FileWarning,
  Eye,
  Check,
  Search,
  Filter,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { GaugeMeter } from '../../components/ui/GaugeMeter';
import { RiskDonutChart } from '../../components/charts/RiskDonutChart';
import { Skeleton } from '../../components/ui/Skeleton';
import { riskService } from '../../services/api/riskService';
import { toast } from 'sonner';

export const RiskIntelligencePage = () => {
  const navigate = useNavigate();
  const [riskData, setRiskData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterSeverity, setFilterSeverity] = useState('all');

  useEffect(() => {
    const fetchRisk = async () => {
      setIsLoading(true);
      try {
        const data = await riskService.getOverview();
        setRiskData(data);
      } catch (e) {
        console.error('Failed to load risk intelligence data', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRisk();
  }, []);

  const handleMarkReviewed = async (flagId, e) => {
    e.stopPropagation();
    try {
      await riskService.markFlagReviewed(flagId);
      toast.success('Discrepancy flag marked as reviewed by recruiter');
      setRiskData(prev => ({
        ...prev,
        flags: prev.flags.map(f => f.id === flagId ? { ...f, status: 'reviewed' } : f)
      }));
    } catch (e) {
      toast.error('Failed to update flag');
    }
  };

  if (isLoading || !riskData) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-64 rounded-3xl" />
          <Skeleton className="md:col-span-2 h-64 rounded-3xl" />
        </div>
      </div>
    );
  }

  const filteredFlags = (riskData.flags || []).filter(f => {
    if (filterSeverity === 'all') return true;
    return f.severity.toLowerCase() === filterSeverity.toLowerCase();
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="risk" size="sm" dot>Module 5</Badge>
            <span className="text-xs font-mono text-muted-foreground uppercase">Fraud & Integrity Intel</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-foreground tracking-tight mt-1">
            AI Recruitment Fraud & Risk Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Identify overlapping full-time engagements, plagiarized resumes, phantom credentials, and unverified achievements.
          </p>
        </div>
      </div>

      {/* Top Overview: Animated Gauge & Risk Distribution Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Animated Risk Gauge */}
        <Card className="flex flex-col items-center justify-center p-6 text-center">
          <GaugeMeter
            value={riskData.averageRiskScore}
            min={0}
            max={100}
            type="risk"
            title="Portfolio Aggregate Risk Level"
            subtitle="Calculated across all evaluated CVs"
            size={240}
          />
        </Card>

        {/* Risk Distribution Donut */}
        <Card className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold font-heading text-foreground">
              Candidate Pipeline Risk Share
            </h3>
            <span className="text-xs font-mono text-muted-foreground">Thresholds: 25% / 50%</span>
          </div>
          <RiskDonutChart height={220} />
        </Card>

        {/* Risk Policy Guarantee */}
        <Card className="p-6 space-y-4 bg-muted/20">
          <div className="flex items-center gap-2.5 text-brand-500">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-sm font-bold font-heading text-foreground">
              Human Review Guarantee
            </h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Recruiter.AI never autonomously disqualifies or blacklists a candidate without recruiter verification.
          </p>
          <div className="p-3 rounded-xl bg-card border border-card-border space-y-1.5 text-xs">
            <div className="flex justify-between font-mono">
              <span className="text-muted-foreground">High Risk Candidates:</span>
              <span className="text-rose-500 font-bold">{riskData.highRiskCandidates?.length || 0}</span>
            </div>
            <div className="flex justify-between font-mono">
              <span className="text-muted-foreground">Pending Review Flags:</span>
              <span className="text-amber-500 font-bold">
                {riskData.flags?.filter(f => f.status === 'open').length || 0}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Discrepancy Flag Explanations Feed */}
      <Card className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold font-heading text-foreground flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Flagged Discrepancies Requiring Recruiter Review ({filteredFlags.length})
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Explainable anomalies surfaced during external repository cross-audits.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {['all', 'high', 'medium', 'low'].map(sev => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium capitalize transition-colors ${
                  filterSeverity === sev ? 'bg-brand-500 text-white font-bold' : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-card-border">
          {filteredFlags.map((flag) => (
            <div
              key={flag.id}
              className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-muted/20 px-2 rounded-xl transition-colors"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                    flag.severity === 'High' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' :
                    flag.severity === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                    'bg-slate-500/10 text-slate-400 border border-slate-500/30'
                  }`}>
                    {flag.severity} Severity
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {flag.title}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {flag.description}
                </p>
                <div className="flex items-center gap-3 text-[11px] font-mono text-muted-foreground pt-1">
                  <span>Candidate: <strong className="text-foreground">{flag.candidateName}</strong></span>
                  <span>•</span>
                  <span>Status: <strong className={flag.status === 'reviewed' ? 'text-emerald-500' : 'text-amber-500'}>{flag.status}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/app/persona/${flag.candidateId}`)}
                  className="text-xs"
                >
                  Inspect Dossier
                </Button>
                {flag.status !== 'reviewed' && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => handleMarkReviewed(flag.id, e)}
                    className="text-xs"
                    leftIcon={<Check className="w-3.5 h-3.5 text-emerald-500" />}
                  >
                    Mark Reviewed
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Sortable High-Risk Candidates Table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-card-border">
          <h3 className="text-base font-bold font-heading text-foreground">
            Elevated Risk Profiles Requiring Senior Sign-Off
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Profiles with multiple flagged claims or inaccessible validation repositories.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-card-border font-mono text-muted-foreground uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4 font-semibold">Candidate</th>
                <th className="p-4 font-semibold">Headline</th>
                <th className="p-4 font-semibold">Risk Index</th>
                <th className="p-4 font-semibold">Active Flags</th>
                <th className="p-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border">
              {riskData.highRiskCandidates?.map((cand) => (
                <tr
                  key={cand.id}
                  onClick={() => navigate(`/app/persona/${cand.id}`)}
                  className="hover:bg-muted/30 cursor-pointer transition-colors"
                >
                  <td className="p-4 font-bold text-foreground">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-600 to-red-600 flex items-center justify-center text-white font-mono font-bold text-xs shadow-sm">
                        {cand.avatar}
                      </div>
                      <span>{cand.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{cand.title}</td>
                  <td className="p-4 font-mono font-bold text-rose-500">
                    {cand.riskScore}% Risk
                  </td>
                  <td className="p-4 font-mono">
                    {cand.riskFlags?.length || 0} Flags Logged
                  </td>
                  <td className="p-4 text-right">
                    <Button size="sm" variant="outline" className="text-xs">
                      Examine Dossier
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
