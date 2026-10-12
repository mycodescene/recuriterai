import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  GitCompare,
  Plus
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Skeleton } from '../../components/ui/Skeleton';
import { jobService } from '../../services/api/jobService';
import { candidateService } from '../../services/api/candidateService';

export const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [jobData, candsData] = await Promise.all([
          jobService.getById(id),
          candidateService.getAll({ jobId: id })
        ]);
        setJob(jobData);
        // Rank descending
        const sorted = [...candsData].sort((a, b) => b.matchScore - a.matchScore);
        setCandidates(sorted);
      } catch (e) {
        console.error('Failed to load job details', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading || !job) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-80 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top back navigation */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/app/jobs')}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          className="text-xs mb-3"
        >
          Back to Jobs
        </Button>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground tracking-tight">
                {job.title}
              </h1>
              <Badge variant={job.status === 'Active' ? 'success' : 'neutral'} size="sm" dot>
                {job.status}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground font-mono mt-1">
              Requisition ID: {job.id} • Posted {job.postedDate} • {job.department}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigate('/app/matching')}
              variant="primary"
              size="md"
              leftIcon={<GitCompare className="w-4 h-4" />}
            >
              Calibrate Matching Weights
            </Button>
          </div>
        </div>
      </div>

      {/* Role Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 space-y-5">
          <div>
            <h2 className="text-sm font-bold font-heading text-foreground mb-1">Position Overview</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">{job.description}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
              Required Technical Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-xl text-xs font-mono font-medium bg-brand-500/10 text-brand-500 dark:text-brand-400 border border-brand-500/20"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
              Qualifications & Minimum Criteria
            </h3>
            <ul className="space-y-1.5 text-xs text-foreground">
              {job.qualifications.map((q, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Requirements Stats */}
        <Card className="space-y-4">
          <h2 className="text-sm font-bold font-heading text-foreground">Budget & Guidelines</h2>
          
          <div className="space-y-3 text-xs divide-y divide-card-border font-mono">
            <div className="flex justify-between py-1.5">
              <span className="text-muted-foreground">Compensation Band:</span>
              <span className="font-bold text-emerald-500">
                ${job.salaryMin / 1000}k - ${job.salaryMax / 1000}k
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-muted-foreground">Experience Range:</span>
              <span className="text-foreground">{job.experienceYears?.[0]} - {job.experienceYears?.[1]} Years</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-muted-foreground">Location Model:</span>
              <span className="text-foreground">{job.location}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-muted-foreground">Match Threshold:</span>
              <span className="text-brand-500 font-bold">{job.matchThreshold}% Qualified</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-muted/40 border border-card-border text-xs text-muted-foreground">
            <Sparkles className="w-4 h-4 text-brand-500 mb-1" />
            AI semantic matching automatically ranks incoming candidate profiles against these criteria.
          </div>
        </Card>
      </div>

      {/* Matched Candidate Ranking Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold font-heading text-foreground">
              Matched Candidates ({candidates.length})
            </h2>
            <p className="text-xs text-muted-foreground">
              Ranked in real-time by semantic similarity, verified skills, and experience depth.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/app/candidates')}
          >
            Upload More CVs
          </Button>
        </div>

        {candidates.length === 0 ? (
          <Card className="p-12 text-center text-xs text-muted-foreground space-y-2">
            <Users className="w-8 h-8 mx-auto text-muted-foreground stroke-1" />
            <p>No candidates applied to this requisition yet.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {candidates.map((cand, idx) => (
              <Card
                key={cand.id}
                onClick={() => navigate(`/app/persona/${cand.id}`)}
                className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:border-brand-500/40 transition-colors"
                hoverable
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-muted font-mono font-bold text-xs flex items-center justify-center text-muted-foreground">
                    #{idx + 1}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-mono font-bold text-xs shadow-glow-sm">
                    {cand.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground">{cand.name}</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold">
                        {cand.riskLevel} Risk
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {cand.title} • {cand.experienceYears}y exp • {cand.currentCompany}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <span className="text-base font-extrabold font-mono text-emerald-500 block">
                      {cand.matchScore}% Match
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      Skills: {cand.matchBreakdown?.skills}% | Exp: {cand.matchBreakdown?.experience}%
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
