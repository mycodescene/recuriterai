import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HeartHandshake,
  Sliders,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { GaugeMeter } from '../../components/ui/GaugeMeter';
import { Skeleton } from '../../components/ui/Skeleton';
import { retentionService } from '../../services/api/retentionService';
import { candidateService } from '../../services/api/candidateService';

export const RetentionPage = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState('cand-1');
  const [retentionData, setRetentionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // What-if simulator controls
  const [salaryDelta, setSalaryDelta] = useState(0); // -20% to +30%
  const [commuteMins, setCommuteMins] = useState(25); // 0 (remote) to 75 mins
  const [tenureTargetMonths, setTenureTargetMonths] = useState(24); // 6 to 48 months
  const [simulatedResult, setSimulatedResult] = useState(null);

  useEffect(() => {
    const fetchInit = async () => {
      try {
        const cands = await candidateService.getAll();
        setCandidates(cands);
      } catch (e) {
        console.error('Failed to load candidate list', e);
      }
    };
    fetchInit();
  }, []);

  useEffect(() => {
    const loadRetention = async () => {
      setIsLoading(true);
      try {
        const data = await retentionService.getPrediction(selectedCandidateId);
        setRetentionData(data);
      } catch (e) {
        console.error('Failed to load retention prediction', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadRetention();
  }, [selectedCandidateId]);

  // Recalculate simulation on parameter change
  useEffect(() => {
    if (!retentionData) return;
    const runSimulation = async () => {
      const sim = await retentionService.simulate(selectedCandidateId, {
        salaryDeltaPercent: salaryDelta,
        commuteMins,
        tenureMonths: tenureTargetMonths
      });
      setSimulatedResult(sim);
    };
    runSimulation();
  }, [selectedCandidateId, retentionData, salaryDelta, commuteMins, tenureTargetMonths]);

  if (isLoading || !retentionData) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-72 rounded-3xl" />
          <Skeleton className="h-72 rounded-3xl" />
        </div>
      </div>
    );
  }

  const effectiveScore = simulatedResult?.simulatedScore || retentionData.retentionScore;
  const originalScore = retentionData.retentionScore;
  const scoreDelta = effectiveScore - originalScore;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="brand" size="sm" dot>Module 6</Badge>
            <span className="text-xs font-mono text-muted-foreground uppercase">Tenure & Attrition Intel</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-foreground tracking-tight mt-1">
            AI Candidate Retention Predictor
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            SHAP-style explainable drivers modeling candidate longevity and interactive What-If offer scenario testing.
          </p>
        </div>

        {/* Candidate Selector */}
        <div className="w-full sm:w-auto">
          <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block mb-1">
            Evaluating Candidate
          </label>
          <select
            value={selectedCandidateId}
            onChange={(e) => setSelectedCandidateId(e.target.value)}
            className="w-full sm:w-72 h-11 px-3.5 bg-card border border-card-border rounded-xl text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
          >
            {candidates.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.title})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Top Gauges: Retention Likelihood & Attrition Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Animated Likelihood Gauge */}
        <Card className="flex flex-col items-center justify-center p-6 text-center">
          <GaugeMeter
            value={effectiveScore}
            min={0}
            max={100}
            type="retention"
            title="18-Month Projected Retention Likelihood"
            subtitle={scoreDelta !== 0 ? `Simulated scenario: ${scoreDelta > 0 ? `+${scoreDelta}%` : `${scoreDelta}%`}` : 'Baseline statistical projection'}
            size={240}
          />
        </Card>

        {/* What-If Live Simulator Panel */}
        <Card className="lg:col-span-2 p-6 sm:p-8 space-y-6 glass-panel border-brand-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-brand-500" />
              <h3 className="text-base font-bold font-heading text-foreground">
                Interactive What-If Offer Scenario Simulator
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-brand-500">Live Recalculation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Slider 1: Salary Delta */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted-foreground font-semibold">Compensation Delta</span>
                <span className={`font-bold ${salaryDelta >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {salaryDelta > 0 ? `+${salaryDelta}%` : `${salaryDelta}%`}
                </span>
              </div>
              <input
                type="range"
                min={-20}
                max={30}
                step={5}
                value={salaryDelta}
                onChange={(e) => setSalaryDelta(parseInt(e.target.value))}
                className="w-full accent-brand-500"
              />
              <span className="text-[10px] text-muted-foreground block">Tweak base offer vs market median</span>
            </div>

            {/* Slider 2: Commute / Remote */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted-foreground font-semibold">Daily Commute</span>
                <span className="font-bold text-foreground">
                  {commuteMins === 0 ? 'Fully Remote' : `${commuteMins} mins`}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={75}
                step={5}
                value={commuteMins}
                onChange={(e) => setCommuteMins(parseInt(e.target.value))}
                className="w-full accent-brand-500"
              />
              <span className="text-[10px] text-muted-foreground block">Zero indicates remote autonomy</span>
            </div>

            {/* Slider 3: Expected Target Tenure */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted-foreground font-semibold">Target Tenure</span>
                <span className="font-bold text-foreground">{tenureTargetMonths} Months</span>
              </div>
              <input
                type="range"
                min={12}
                max={48}
                step={6}
                value={tenureTargetMonths}
                onChange={(e) => setTenureTargetMonths(parseInt(e.target.value))}
                className="w-full accent-brand-500"
              />
              <span className="text-[10px] text-muted-foreground block">Expected project engagement</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-muted/40 border border-card-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-start sm:items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-500 shrink-0 mt-0.5 sm:mt-0" />
              <span className="text-muted-foreground leading-relaxed">
                Simulated Impact: Compensation ({simulatedResult?.breakdown?.salaryContribution > 0 ? `+${simulatedResult?.breakdown?.salaryContribution}%` : `${simulatedResult?.breakdown?.salaryContribution || 0}%`}), Commute ({simulatedResult?.breakdown?.commuteContribution > 0 ? `+${simulatedResult?.breakdown?.commuteContribution}%` : `${simulatedResult?.breakdown?.commuteContribution || 0}%`})
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => { setSalaryDelta(0); setCommuteMins(25); setTenureTargetMonths(24); }}
              className="text-xs shrink-0 w-full sm:w-auto justify-center"
            >
              Reset to Baseline
            </Button>
          </div>
        </Card>
      </div>

      {/* SHAP-Style Contributing Factors Chart (Positive vs Negative Drivers) */}
      <Card className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold font-heading text-foreground">
              Explainable Contributing Factors (SHAP Analysis)
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Empirical drivers positively and negatively pushing the candidate's baseline retention score.
            </p>
          </div>
          <Badge variant="brand" size="sm" dot>Feature Weights</Badge>
        </div>

        <div className="space-y-3.5">
          {retentionData.factors?.map((factor, idx) => {
            const isPositive = factor.type === 'positive';
            const absImpact = Math.abs(factor.impact);

            return (
              <div key={idx} className="p-3.5 rounded-xl bg-muted/30 border border-card-border space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                  <span className="font-semibold text-foreground flex items-center gap-2">
                    {isPositive ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                    <span>{factor.name}</span>
                  </span>
                  <span className={`font-bold shrink-0 ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {factor.impact > 0 ? `+${factor.impact}%` : `${factor.impact}%`} impact
                  </span>
                </div>

                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isPositive ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.min(100, absImpact * 4)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Bottom Retention Action Banner */}
      <div className="p-4 rounded-2xl bg-brand-500/10 dark:bg-brand-500/15 border border-brand-500/25 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 text-xs shadow-sm">
        <div className="flex items-center gap-3">
          <HeartHandshake className="w-5 h-5 text-brand-500 shrink-0" />
          <span className="text-muted-foreground font-mono font-medium leading-relaxed">
            Tenure probability is recalibrated dynamically. Candidate: {candidates.find(c => c.id === selectedCandidateId)?.name || 'Selected Candidate'}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => navigate(`/app/persona/${selectedCandidateId}`)}
            className="text-xs justify-center"
          >
            Inspect Persona Dossier
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate('/app/offers')}
            className="text-xs justify-center"
          >
            Optimize Compensation Offer
          </Button>
        </div>
      </div>
    </div>
  );
};
