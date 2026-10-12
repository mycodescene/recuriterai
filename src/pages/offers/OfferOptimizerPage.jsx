import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Gift,
  CheckCircle2,
  TrendingUp,
  Save,
  Sparkles,
  Sliders,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { GaugeMeter } from '../../components/ui/GaugeMeter';
import { Skeleton } from '../../components/ui/Skeleton';
import { offerService } from '../../services/api/offerService';
import { candidateService } from '../../services/api/candidateService';
import { jobService } from '../../services/api/jobService';
import { toast } from 'sonner';

export const OfferOptimizerPage = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState('cand-1');
  const [selectedJobId, setSelectedJobId] = useState('job-1');
  const [offerData, setOfferData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Interactive offer sliders
  const [baseSalary, setBaseSalary] = useState(115000);
  const [signingBonus, setSigningBonus] = useState(10000);
  const [equityPercent, setEquityPercent] = useState(0.15);
  const [selectedBenefits, setSelectedBenefits] = useState([0, 1, 2, 3]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchSelectors = async () => {
      try {
        const [cands, jbs] = await Promise.all([
          candidateService.getAll(),
          jobService.getAll()
        ]);
        setCandidates(cands);
        setJobs(jbs);
      } catch (e) {
        console.error('Failed to load offer selector data', e);
      }
    };
    fetchSelectors();
  }, []);

  useEffect(() => {
    const loadOffer = async () => {
      setIsLoading(true);
      try {
        const data = await offerService.getOfferRecommendation(selectedCandidateId, selectedJobId);
        setOfferData(data);
        if (data.recommendation) {
          setBaseSalary(data.recommendation.baseSalary || 115000);
          setSigningBonus(data.recommendation.signingBonus || 10000);
          setEquityPercent(data.recommendation.equityPercent || 0.15);
        }
      } catch (e) {
        console.error('Failed to load offer data', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadOffer();
  }, [selectedCandidateId, selectedJobId]);

  const marketMedian = offerData?.recommendation?.marketMedian || 112000;
  const minRec = offerData?.recommendation?.minRecommended || 100000;
  const maxRec = offerData?.recommendation?.maxRecommended || 130000;

  // Calculate live acceptance probability
  const dynamicProbability = offerService.calculateAcceptanceProbability(
    baseSalary,
    marketMedian,
    signingBonus,
    equityPercent
  );

  const handleSaveOffer = async () => {
    setIsSaving(true);
    try {
      await offerService.saveOffer({
        candidateId: selectedCandidateId,
        jobId: selectedJobId,
        baseSalary,
        signingBonus,
        equityPercent,
        acceptanceProbability: dynamicProbability
      });
      toast.success(`Calibrated offer of $${baseSalary.toLocaleString()} saved to candidate dossier!`);
    } catch (e) {
      toast.error('Failed to save offer');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleBenefit = (idx) => {
    if (selectedBenefits.includes(idx)) {
      setSelectedBenefits(selectedBenefits.filter(i => i !== idx));
    } else {
      setSelectedBenefits([...selectedBenefits, idx]);
    }
  };

  if (isLoading || !offerData) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-72 rounded-3xl" />
          <Skeleton className="md:col-span-2 h-72 rounded-3xl" />
        </div>
      </div>
    );
  }

  // Calculate position percentage for market median marker on range bar
  const rangeSpan = maxRec - minRec || 1;
  const medianPercent = Math.min(100, Math.max(0, ((marketMedian - minRec) / rangeSpan) * 100));
  const currentOfferPercent = Math.min(100, Math.max(0, ((baseSalary - minRec) / rangeSpan) * 100));

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="brand" size="sm" dot>Module 8</Badge>
            <span className="text-xs font-mono text-muted-foreground uppercase">Compensation Economics</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-foreground tracking-tight mt-1">
            AI Job Offer Optimization
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Calibrate competitive salary bands, calculate live acceptance probabilities, and tailor incentive packages.
          </p>
        </div>

        {/* Candidate & Job Selectors */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedCandidateId}
            onChange={(e) => setSelectedCandidateId(e.target.value)}
            className="h-11 px-3 bg-card border border-card-border rounded-xl text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer w-full sm:w-56"
          >
            {candidates.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="h-11 px-3 bg-card border border-card-border rounded-xl text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer w-full sm:w-60"
          >
            {jobs.map(j => (
              <option key={j.id} value={j.id}>
                {j.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Top Gauges: Acceptance Probability & Range Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Acceptance Probability Gauge */}
        <Card className="flex flex-col items-center justify-center p-6 text-center">
          <GaugeMeter
            value={dynamicProbability}
            min={0}
            max={100}
            type="acceptance"
            title="Calibrated Offer Acceptance Probability"
            subtitle="Updates live as compensation sliders move"
            size={240}
          />
        </Card>

        {/* Range Bar with Market Median Marker & Sliders */}
        <Card className="lg:col-span-2 p-6 sm:p-8 space-y-6 glass-panel border-brand-500/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-heading text-foreground">
                Market Compensation Range & Current Proposal
              </h3>
              <p className="text-xs text-muted-foreground">Benchmarks based on similar engineering seniority across global peers</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-500">Live Calibration</span>
          </div>

          {/* Animated Range Bar with Median Marker */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground">Min Rec: ${minRec / 1000}k</span>
              <span className="text-brand-500 font-bold">Proposal: ${baseSalary.toLocaleString()}</span>
              <span className="text-muted-foreground">Max Rec: ${maxRec / 1000}k</span>
            </div>

            {/* Track */}
            <div className="h-4 w-full bg-muted/60 rounded-full relative overflow-visible">
              {/* Range fill */}
              <div className="absolute inset-y-0 left-0 right-0 rounded-full bg-gradient-to-r from-brand-500/20 via-emerald-500/30 to-brand-500/20" />
              
              {/* Market median pin */}
              <div
                className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center -ml-2.5 z-10"
                style={{ left: `${medianPercent}%` }}
                title={`Market Median: $${marketMedian.toLocaleString()}`}
              >
                <div className="w-5 h-5 rounded-full bg-amber-500 text-midnight-950 font-bold text-[9px] flex items-center justify-center shadow-md">
                  M
                </div>
              </div>

              {/* Current proposed salary indicator */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center -ml-3 z-20"
                style={{ left: `${currentOfferPercent}%` }}
                animate={{ left: `${currentOfferPercent}%` }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center shadow-glow-success ring-2 ring-background">
                  $
                </div>
              </motion.div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pt-1">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                Market Median ($112k)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                Your Current Proposed Offer
              </span>
            </div>
          </div>

          {/* Interactive Sliders: Base Salary, Signing Bonus, Equity */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-card-border">
            {/* Slider 1: Base Salary */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted-foreground font-semibold">Base Annual Salary</span>
                <span className="text-foreground font-bold">${baseSalary.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={minRec - 15000}
                max={maxRec + 25000}
                step={2500}
                value={baseSalary}
                onChange={(e) => setBaseSalary(parseInt(e.target.value))}
                className="w-full accent-brand-500"
              />
            </div>

            {/* Slider 2: Signing Bonus */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted-foreground font-semibold">Signing Bonus</span>
                <span className="text-emerald-500 font-bold">${signingBonus.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={0}
                max={30000}
                step={2000}
                value={signingBonus}
                onChange={(e) => setSigningBonus(parseInt(e.target.value))}
                className="w-full accent-brand-500"
              />
            </div>

            {/* Slider 3: Stock Equity % */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted-foreground font-semibold">Equity Grant</span>
                <span className="text-brand-500 font-bold">{equityPercent}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={0.5}
                step={0.02}
                value={equityPercent}
                onChange={(e) => setEquityPercent(parseFloat(e.target.value))}
                className="w-full accent-brand-500"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end">
            <Button
              onClick={handleSaveOffer}
              isLoading={isSaving}
              variant="primary"
              size="md"
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Offer to Candidate Dossier
            </Button>
          </div>
        </Card>
      </div>

      {/* Benefits Package Recommendations & Total Compensation Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recommended Benefits Package */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-heading text-foreground">
                Incentive & Benefits Package Tailoring
              </h3>
              <p className="text-xs text-muted-foreground">Select perks that resonate with this candidate's persona</p>
            </div>
            <Gift className="w-5 h-5 text-brand-500" />
          </div>

          <div className="space-y-2.5">
            {offerData.benefitsRecommendations?.map((ben, idx) => {
              const isChecked = selectedBenefits.includes(idx);

              return (
                <div
                  key={idx}
                  onClick={() => toggleBenefit(idx)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-colors ${
                    isChecked
                      ? 'bg-brand-500/10 border-brand-500/40 text-foreground'
                      : 'bg-muted/30 border-card-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                      isChecked ? 'bg-brand-500 border-brand-500 text-white' : 'border-card-border'
                    }`}>
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="font-medium">{ben.name}</span>
                  </div>
                  <span className="font-mono text-[11px] text-emerald-500 font-semibold">{ben.impact}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Total Compensation Economics Summary */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-heading text-foreground">
                Total Annual Value & Offer Economics
              </h3>
              <p className="text-xs text-muted-foreground">Estimated annualized cost to the organization</p>
            </div>
            <DollarSign className="w-5 h-5 text-emerald-500" />
          </div>

          <div className="p-5 rounded-2xl bg-muted/40 border border-card-border space-y-3 font-mono text-xs">
            <div className="flex justify-between py-1 border-b border-card-border">
              <span className="text-muted-foreground">Base Salary:</span>
              <span className="font-bold text-foreground">${baseSalary.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-card-border">
              <span className="text-muted-foreground">Signing Bonus (Year 1):</span>
              <span className="font-bold text-foreground">${signingBonus.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-card-border">
              <span className="text-muted-foreground">Equity Stock Grant:</span>
              <span className="font-bold text-brand-500">{equityPercent}%</span>
            </div>
            <div className="flex justify-between py-1 border-b border-card-border">
              <span className="text-muted-foreground">Benefits Valuation:</span>
              <span className="font-bold text-foreground">${(selectedBenefits.length * 3500).toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 text-sm">
              <span className="font-bold text-foreground">Year 1 Total Package:</span>
              <span className="font-extrabold text-emerald-500">
                ${(baseSalary + signingBonus + (selectedBenefits.length * 3500)).toLocaleString()} USD
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-card border border-card-border text-xs text-muted-foreground flex items-center justify-between">
            <span>Ready to dispatch formal offer letter?</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate('/app/communications')}
              className="text-xs"
            >
              Draft Email in Comms Hub
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
