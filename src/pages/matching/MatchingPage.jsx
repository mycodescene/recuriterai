import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitCompare,
  Sliders,
  Sparkles,
  ChevronRight,
  X,
  CheckCircle2,
  AlertCircle,
  Users,
  Briefcase
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { CircularScore } from '../../components/ui/CircularScore';
import { RadarSkillsChart } from '../../components/charts/RadarSkillsChart';
import { matchingService } from '../../services/api/matchingService';
import { jobService } from '../../services/api/jobService';

export const MatchingPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState('job-1');
  const [rankedCandidates, setRankedCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Live dynamic weights
  const [weights, setWeights] = useState({
    skills: 50,
    experience: 30,
    education: 20
  });

  // Comparison drawer/modal (up to 3 candidates)
  const [comparisonList, setComparisonList] = useState([]);

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const jobsData = await jobService.getAll();
        setJobs(jobsData);
      } catch (e) {
        console.error('Failed to load jobs', e);
      }
    };
    fetchInitial();
  }, []);

  useEffect(() => {
    const fetchRankings = async () => {
      setIsLoading(true);
      try {
        const rankings = await matchingService.getRankings(selectedJobId, {
          skills: weights.skills / 100,
          experience: weights.experience / 100,
          education: weights.education / 100
        });
        setRankedCandidates(rankings);
      } catch (e) {
        console.error('Failed to calculate rankings', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRankings();
  }, [selectedJobId, weights]);

  const toggleCompare = (candidate, e) => {
    e.stopPropagation();
    if (comparisonList.some(c => c.id === candidate.id)) {
      setComparisonList(comparisonList.filter(c => c.id !== candidate.id));
    } else {
      if (comparisonList.length >= 3) {
        // Drop oldest or limit to 3
        setComparisonList([...comparisonList.slice(1), candidate]);
      } else {
        setComparisonList([...comparisonList, candidate]);
      }
    }
  };

  const selectedJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

  // Prepare radar overlay data for side-by-side comparison
  const comparisonRadarData = [
    { subject: 'System Design', fullMark: 100 },
    { subject: 'React / Frontend', fullMark: 100 },
    { subject: 'Python / APIs', fullMark: 100 },
    { subject: 'Cloud & DevOps', fullMark: 100 },
    { subject: 'Leadership', fullMark: 100 },
    { subject: 'Testing & QA', fullMark: 100 }
  ].map((item, idx) => {
    const entry = { ...item };
    comparisonList.forEach((cand, cIdx) => {
      const val = cand.radarSkills?.[idx]?.A || Math.floor(Math.random() * 25) + 70;
      entry[`cand_${cIdx}`] = val;
    });
    return entry;
  });

  const comparisonColors = ['#6D5EF5', '#10B981', '#F59E0B'];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="brand" size="sm" dot>Module 4</Badge>
            <span className="text-xs font-mono text-muted-foreground uppercase">Semantic Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-foreground tracking-tight mt-1">
            Candidate Screening & Matching
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Calibrated multi-dimensional vector matching against role ontology with live weight adjustments.
          </p>
        </div>

        {/* Job selector */}
        <div className="w-full sm:w-auto">
          <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block mb-1">
            Target Requisition
          </label>
          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="w-full sm:w-72 h-11 px-3.5 bg-card border border-card-border rounded-xl text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
          >
            {jobs.map(j => (
              <option key={j.id} value={j.id}>
                {j.title} ({j.department})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dynamic Weight Sliders Panel */}
      <Card className="p-6 space-y-4 glass-panel border-brand-500/25">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-brand-500" />
            <h2 className="text-sm font-bold font-heading text-foreground">
              Dynamic Semantic Calibration Sliders
            </h2>
          </div>
          <span className="text-xs font-mono text-muted-foreground">Live Re-ranking Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Skills Weight */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground font-semibold">Verified Skills Weight</span>
              <span className="text-brand-500 font-bold">{weights.skills}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={80}
              value={weights.skills}
              onChange={(e) => setWeights({ ...weights, skills: parseInt(e.target.value) })}
              className="w-full accent-brand-500"
            />
          </div>

          {/* Experience Weight */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground font-semibold">Tenure & Project Depth</span>
              <span className="text-brand-500 font-bold">{weights.experience}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={80}
              value={weights.experience}
              onChange={(e) => setWeights({ ...weights, experience: parseInt(e.target.value) })}
              className="w-full accent-brand-500"
            />
          </div>

          {/* Education Weight */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground font-semibold">Education & Pedigree</span>
              <span className="text-brand-500 font-bold">{weights.education}%</span>
            </div>
            <input
              type="range"
              min={5}
              max={50}
              value={weights.education}
              onChange={(e) => setWeights({ ...weights, education: parseInt(e.target.value) })}
              className="w-full accent-brand-500"
            />
          </div>
        </div>
      </Card>

      {/* Side-by-Side Comparison Overlay Panel (up to 3 candidates) */}
      <AnimatePresence>
        {comparisonList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-3xl glass-panel border border-brand-500/30 p-6 sm:p-8 space-y-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground flex items-center gap-2">
                  <GitCompare className="w-5 h-5 text-brand-500" />
                  Side-by-Side Candidate Radar Overlay ({comparisonList.length}/3)
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Direct multi-axis competency alignment across shortlisted profiles.
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setComparisonList([])}
                className="text-xs text-muted-foreground"
              >
                Clear Comparison
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Radar Chart Overlay */}
              <div className="w-full">
                <RadarSkillsChart
                  data={comparisonRadarData}
                  candidates={comparisonList.map((c, i) => ({
                    name: c.name,
                    dataKey: `cand_${i}`,
                    color: comparisonColors[i]
                  }))}
                  height={320}
                />
              </div>

              {/* Candidates Side-by-side summary cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {comparisonList.map((cand, i) => (
                  <div
                    key={cand.id}
                    className="p-4 rounded-2xl bg-muted/40 border border-card-border space-y-3 text-center"
                    style={{ borderTopColor: comparisonColors[i], borderTopWidth: 3 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono font-bold uppercase" style={{ color: comparisonColors[i] }}>
                        Candidate #{i + 1}
                      </span>
                      <button
                        onClick={(e) => toggleCompare(cand, e)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-mono font-bold text-sm mx-auto shadow-sm">
                      {cand.avatar}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-foreground truncate">{cand.name}</h4>
                      <span className="text-xs font-mono font-bold text-emerald-500 block">
                        {cand.dynamicScore || cand.matchScore}% Fit
                      </span>
                    </div>

                    <div className="text-[11px] text-muted-foreground font-mono space-y-1 pt-2 border-t border-card-border">
                      <p>Exp: {cand.experienceYears}y</p>
                      <p>Risk: {cand.riskLevel}</p>
                    </div>

                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => navigate(`/app/persona/${cand.id}`)}
                      className="w-full text-xs"
                    >
                      Dossier
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ranked Candidate List with Layout Animation */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-heading text-foreground">
            Ranked Candidate Cohort ({rankedCandidates.length})
          </h2>
          <span className="text-xs font-mono text-muted-foreground">
            Click checkbox to compare up to 3 candidates
          </span>
        </div>

        <div className="space-y-3">
          {rankedCandidates.map((cand, idx) => {
            const isComparing = comparisonList.some(c => c.id === cand.id);

            return (
              <motion.div
                key={cand.id}
                layout
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <Card
                  onClick={() => navigate(`/app/persona/${cand.id}`)}
                  className={`p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 cursor-pointer transition-all ${
                    isComparing ? 'border-brand-500 bg-brand-500/5 shadow-glow-sm' : 'hover:border-card-border/80'
                  }`}
                  hoverable
                >
                  {/* Left rank, avatar, and headline */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-8 h-8 rounded-xl bg-muted font-mono font-extrabold text-xs flex items-center justify-center text-muted-foreground shrink-0">
                      #{idx + 1}
                    </div>

                    <button
                      onClick={(e) => toggleCompare(cand, e)}
                      className={`p-2 rounded-xl border text-xs font-mono transition-colors shrink-0 ${
                        isComparing ? 'bg-brand-500 text-white border-brand-500' : 'bg-card border-card-border text-muted-foreground hover:text-foreground'
                      }`}
                      title="Add to comparison"
                    >
                      <GitCompare className="w-4 h-4" />
                    </button>

                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-mono font-bold text-sm shadow-glow-sm shrink-0">
                      {cand.avatar}
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold font-heading text-foreground truncate">
                          {cand.name}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          cand.riskLevel === 'Low' ? 'bg-emerald-500/10 text-emerald-400' :
                          cand.riskLevel === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                          'bg-rose-500/10 text-rose-400'
                        }`}>
                          {cand.riskLevel} Risk
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {cand.title} • {cand.experienceYears}y exp • {cand.currentCompany}
                      </p>

                      {/* Matched and missing skills chips */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {cand.matchedSkills?.slice(0, 4).map(s => (
                          <span key={s} className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            ✓ {s}
                          </span>
                        ))}
                        {cand.missingSkills?.slice(0, 2).map(s => (
                          <span key={s} className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            ✕ {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right score ring and breakdown */}
                  <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-4 lg:pt-0 border-card-border">
                    <div className="text-right space-y-1 font-mono text-xs">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground text-[11px]">Skills Fit:</span>
                        <span className="font-bold text-foreground">{cand.matchBreakdown?.skills}%</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground text-[11px]">Experience Fit:</span>
                        <span className="font-bold text-foreground">{cand.matchBreakdown?.experience}%</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground text-[11px]">Education Fit:</span>
                        <span className="font-bold text-foreground">{cand.matchBreakdown?.education}%</span>
                      </div>
                    </div>

                    <CircularScore
                      score={cand.dynamicScore || cand.matchScore}
                      size={74}
                      strokeWidth={6}
                      label="FIT"
                      colorScheme="auto"
                    />

                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
