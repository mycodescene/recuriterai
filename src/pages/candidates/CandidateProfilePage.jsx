import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Sparkles,
  ShieldAlert,
  HeartHandshake,
  DollarSign,
  Mail,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  MapPin,
  Building,
  Calendar,
  Briefcase
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { CircularScore } from '../../components/ui/CircularScore';
import { Skeleton } from '../../components/ui/Skeleton';
import { candidateService } from '../../services/api/candidateService';

export const CandidateProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchCandidate = async () => {
      setIsLoading(true);
      try {
        const data = await candidateService.getById(id);
        setCandidate(data);
      } catch (e) {
        console.error('Failed to load candidate', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCandidate();
  }, [id]);

  if (isLoading || !candidate) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'persona', label: 'AI Persona & Claims', badge: 'AI' },
    { id: 'experience', label: 'Work History' },
    { id: 'skills', label: 'Skills & Stack' },
    { id: 'risk', label: 'Risk Intel', badge: candidate.riskLevel },
    { id: 'retention', label: 'Retention' },
    { id: 'offer', label: 'Job Offer' },
    { id: 'communication', label: 'Communication' }
  ];

  return (
    <div className="space-y-8">
      {/* Header & Back Button */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/app/candidates')}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          className="text-xs mb-3"
        >
          Back to Candidates
        </Button>

        {/* Candidate Hero Card */}
        <Card className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-brand-500/30">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-mono font-extrabold text-2xl shadow-glow-sm">
              {candidate.avatar}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold font-heading text-foreground">
                  {candidate.name}
                </h1>
                <Badge variant={candidate.riskLevel === 'Low' ? 'success' : 'risk'} size="sm">
                  {candidate.riskLevel} Risk
                </Badge>
                <Badge variant="brand" size="sm">
                  {candidate.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                {candidate.title} • {candidate.currentCompany}
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-1">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {candidate.location}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {candidate.experienceYears} Years Exp</span>
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {candidate.email}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-card-border">
            <div className="text-center md:text-right">
              <span className="text-2xl font-extrabold font-mono text-emerald-500 block">
                {candidate.matchScore}%
              </span>
              <span className="text-[10px] text-muted-foreground font-mono uppercase">Semantic Match</span>
            </div>
            <Button
              onClick={() => navigate(`/app/persona/${candidate.id}`)}
              variant="primary"
              size="md"
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Open Persona Studio
            </Button>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Panels */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 space-y-4">
            <h2 className="text-base font-bold font-heading text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-500" />
              AI Persona Synthesis
            </h2>
            <p className="text-xs text-foreground leading-relaxed bg-muted/40 p-4 rounded-xl border border-card-border">
              {candidate.personaSummary}
            </p>

            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                Key Validated Strengths
              </h3>
              <ul className="space-y-1.5 text-xs text-foreground">
                {candidate.strengths?.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card className="space-y-4">
            <h2 className="text-base font-bold font-heading text-foreground">Workflow Quick Actions</h2>
            <div className="space-y-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate(`/app/persona/${candidate.id}`)}
                className="w-full text-xs justify-start"
                leftIcon={<Sparkles className="w-3.5 h-3.5 text-brand-500" />}
              >
                Inspect Persona & Claims Dossier
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate(`/app/matching`)}
                className="w-full text-xs justify-start"
                leftIcon={<Briefcase className="w-3.5 h-3.5 text-indigo-400" />}
              >
                Compare Against Other Requisitions
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate(`/app/retention`)}
                className="w-full text-xs justify-start"
                leftIcon={<HeartHandshake className="w-3.5 h-3.5 text-amber-500" />}
              >
                Simulate Retention & Tenure
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate(`/app/offers`)}
                className="w-full text-xs justify-start"
                leftIcon={<DollarSign className="w-3.5 h-3.5 text-emerald-500" />}
              >
                Calibrate Salary & Compensation Offer
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate(`/app/communications`)}
                className="w-full text-xs justify-start"
                leftIcon={<Mail className="w-3.5 h-3.5 text-brand-500" />}
              >
                Review AI Draft Email
              </Button>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'persona' && (
        <Card className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold font-heading text-foreground">Audited Evidence Claims</h2>
              <p className="text-xs text-muted-foreground">Corroborated by GitHub repositories and corporate databases</p>
            </div>
            <Button size="sm" variant="primary" onClick={() => navigate(`/app/persona/${candidate.id}`)}>
              Launch Flagship Studio View
            </Button>
          </div>

          <div className="divide-y divide-card-border">
            {candidate.claims?.map((claim) => (
              <div key={claim.id} className="py-3 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      claim.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {claim.status}
                    </span>
                    <span className="text-xs font-semibold text-foreground">{claim.text}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Source: {claim.source}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'experience' && (
        <Card className="space-y-6">
          <h2 className="text-base font-bold font-heading text-foreground">Chronological Employment Record</h2>
          <div className="space-y-6 relative border-l-2 border-card-border ml-3 pl-6">
            {candidate.experienceTimeline?.map((exp, idx) => (
              <div key={idx} className="relative space-y-1">
                <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-brand-500 ring-4 ring-background" />
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-foreground">{exp.role}</h3>
                  <span className="text-xs font-mono text-muted-foreground">{exp.period}</span>
                </div>
                <p className="text-xs font-semibold text-brand-500">{exp.company}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'skills' && (
        <Card className="space-y-6">
          <h2 className="text-base font-bold font-heading text-foreground">Skills Proficiency Spectrum</h2>
          <div className="space-y-4">
            {candidate.skillsProficiency?.map((skill, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-foreground font-semibold">{skill.skill}</span>
                  <span className="text-brand-500 font-bold">{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brand-500 to-indigo-500 rounded-full" style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'risk' && (
        <Card className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold font-heading text-foreground">Fraud & Anomaly Diagnostics</h2>
            <Button size="sm" variant="outline" onClick={() => navigate('/app/risk')}>
              Open Risk Intelligence
            </Button>
          </div>
          {candidate.riskFlags?.length === 0 ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <h3 className="text-sm font-bold text-foreground">Zero Discrepancies Detected</h3>
              <p className="text-xs text-muted-foreground">No employment overlaps, CV text plagiarism, or phantom credentials found.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {candidate.riskFlags?.map(flag => (
                <div key={flag.id} className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-500 font-mono uppercase">{flag.title}</span>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">{flag.severity}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{flag.description}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {activeTab === 'retention' && (
        <Card className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold font-heading text-foreground">Retention Prediction Drivers</h2>
            <Button size="sm" variant="outline" onClick={() => navigate('/app/retention')}>
              Launch What-If Simulator
            </Button>
          </div>
          <div className="space-y-3">
            {candidate.retentionFactors?.map((f, i) => (
              <div key={i} className="p-3 rounded-xl bg-muted/40 border border-card-border flex items-center justify-between text-xs">
                <span className="text-foreground">{f.name}</span>
                <span className={`font-mono font-bold ${f.type === 'positive' ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {f.impact > 0 ? `+${f.impact}%` : `${f.impact}%`}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'offer' && (
        <Card className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold font-heading text-foreground">Compensation Calibration</h2>
            <Button size="sm" variant="outline" onClick={() => navigate('/app/offers')}>
              Launch Offer Optimizer
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
            <div className="p-4 rounded-xl bg-muted/40 border border-card-border">
              <span className="text-[10px] text-muted-foreground uppercase block">Recommended Base</span>
              <span className="text-lg font-bold text-foreground">${candidate.offerRecommendation?.baseSalary / 1000}k</span>
            </div>
            <div className="p-4 rounded-xl bg-muted/40 border border-card-border">
              <span className="text-[10px] text-muted-foreground uppercase block">Market Median</span>
              <span className="text-lg font-bold text-foreground">${candidate.offerRecommendation?.marketMedian / 1000}k</span>
            </div>
            <div className="p-4 rounded-xl bg-muted/40 border border-card-border">
              <span className="text-[10px] text-muted-foreground uppercase block">Signing Bonus</span>
              <span className="text-lg font-bold text-emerald-500">${candidate.offerRecommendation?.signingBonus / 1000}k</span>
            </div>
            <div className="p-4 rounded-xl bg-muted/40 border border-card-border">
              <span className="text-[10px] text-muted-foreground uppercase block">Acceptance Probability</span>
              <span className="text-lg font-bold text-brand-500">{candidate.offerRecommendation?.acceptanceProbability}%</span>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'communication' && (
        <Card className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold font-heading text-foreground">Automated Candidate Email Dispatch</h2>
            <Button size="sm" variant="primary" onClick={() => navigate('/app/communications')}>
              Open Communications Hub
            </Button>
          </div>
          <div className="p-4 rounded-xl bg-muted/40 border border-card-border text-xs text-muted-foreground leading-relaxed">
            AI has prepared selection or constructive rejection drafts linked to this candidate's evaluation score. Remember: no email is sent until you review and approve it.
          </div>
        </Card>
      )}
    </div>
  );
};
