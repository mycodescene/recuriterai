import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Upload,
  Search,
  Filter,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  LayoutGrid,
  List,
  Loader2,
  Trash2,
  Check
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Skeleton } from '../../components/ui/Skeleton';
import { candidateService } from '../../services/api/candidateService';
import { jobService } from '../../services/api/jobService';
import { toast } from 'sonner';

export const CandidatesPage = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedJobId, setSelectedJobId] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  // Drag and drop state
  const [isDragging, setIsDragging] = useState(false);
  const [uploadQueue, setUploadQueue] = useState([]); // [{ name, size, progress, status }]
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const [candsData, jobsData] = await Promise.all([
          candidateService.getAll({ search, jobId: selectedJobId, status: selectedStatus }),
          jobService.getAll()
        ]);
        setCandidates(candsData);
        setJobs(jobsData);
      } catch (e) {
        console.error('Failed to load candidate directory', e);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [search, selectedJobId, selectedStatus]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.includes('pdf') || f.name.endsWith('.pdf'));
    if (files.length === 0) {
      toast.error('Please upload PDF CV files');
      return;
    }
    await processFiles(files);
  };

  const handleFileInput = async (e) => {
    const files = Array.from(e.target.files).filter(f => f.type.includes('pdf') || f.name.endsWith('.pdf'));
    if (files.length > 0) {
      await processFiles(files);
    }
  };

  const processFiles = async (files) => {
    setIsUploading(true);
    const queue = files.map(f => ({ name: f.name, size: (f.size / 1024).toFixed(0) + ' KB', progress: 10, status: 'Parsing PDF...' }));
    setUploadQueue(queue);

    // Simulate progressive file extraction
    for (let p = 25; p <= 90; p += 30) {
      await new Promise(r => setTimeout(r, 350));
      setUploadQueue(prev => prev.map(item => ({ ...item, progress: p, status: p < 60 ? 'Extracting skills & experience...' : 'Cross-checking evidence...' })));
    }

    try {
      const added = await candidateService.uploadCVs(files);
      setUploadQueue(prev => prev.map(item => ({ ...item, progress: 100, status: 'AI Extraction Complete' })));
      toast.success(`Successfully ingested ${files.length} candidate CV(s) with AI persona extraction`);
      setCandidates(prev => [...added, ...prev]);
      setTimeout(() => {
        setUploadQueue([]);
        setIsUploading(false);
      }, 1500);
    } catch (e) {
      toast.error('Failed to parse uploaded CVs');
      setIsUploading(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedCandidates.length === candidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(candidates.map(c => c.id));
    }
  };

  const toggleSelectCandidate = (id, e) => {
    e.stopPropagation();
    if (selectedCandidates.includes(id)) {
      setSelectedCandidates(selectedCandidates.filter(c => c !== id));
    } else {
      setSelectedCandidates([...selectedCandidates, id]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground tracking-tight">
            Candidate Pipeline & CV Ingest
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Ingest unstructured CVs, verify claims, and inspect multi-dimensional AI dossiers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {selectedCandidates.length > 0 && (
            <Badge variant="brand" size="md">
              {selectedCandidates.length} Selected
            </Badge>
          )}
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-10 text-center transition-all duration-200 ${
          isDragging
            ? 'border-brand-500 bg-brand-500/10 scale-[1.01]'
            : 'border-card-border hover:border-brand-500/50 glass-panel'
        }`}
      >
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-500/10 text-brand-500 border border-brand-500/20 flex items-center justify-center mx-auto shadow-glow-sm">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold font-heading text-foreground">
              Drag & Drop PDF Resumes
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Supports single or multi-file CV ingestion. Autonomous parser extracts employment chronology, skill taxonomy, and corroborates online evidence.
            </p>
          </div>

          <label className="inline-block cursor-pointer">
            <input
              type="file"
              multiple
              accept=".pdf"
              onChange={handleFileInput}
              className="hidden"
            />
            <Button variant="secondary" size="sm" className="text-xs pointer-events-none">
              Browse PDF Files
            </Button>
          </label>
        </div>

        {/* Upload Queue Progress */}
        <AnimatePresence>
          {uploadQueue.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 pt-6 border-t border-card-border text-left space-y-3 max-w-xl mx-auto"
            >
              <h4 className="text-xs font-mono font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                AI Extraction Queue
              </h4>
              {uploadQueue.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-muted/60 border border-card-border space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-semibold text-foreground truncate max-w-[280px]">{item.name}</span>
                    <span className="text-brand-500 font-bold">{item.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-500 to-indigo-500 rounded-full transition-all duration-300"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>{item.status}</span>
                    <span>{item.size}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filter and View Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl glass-panel border border-card-border">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search candidate name, skills, or headline..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 bg-muted/60 dark:bg-muted/40 border border-card-border rounded-2xl text-xs sm:text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="h-11 px-4 bg-muted/60 dark:bg-midnight-800 text-foreground border border-card-border rounded-2xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 cursor-pointer font-medium"
          >
            <option value="all" className="bg-card text-foreground">All Requisitions</option>
            {jobs.map(j => <option key={j.id} value={j.id} className="bg-card text-foreground">{j.title}</option>)}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-11 px-4 bg-muted/60 dark:bg-midnight-800 text-foreground border border-card-border rounded-2xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 cursor-pointer font-medium"
          >
            <option value="all" className="bg-card text-foreground">All Statuses</option>
            <option value="Shortlisted" className="bg-card text-foreground">Shortlisted</option>
            <option value="Screening" className="bg-card text-foreground">Screening</option>
            <option value="Under Review" className="bg-card text-foreground">Under Review</option>
          </select>

          <div className="flex items-center bg-muted/60 p-1 rounded-xl border border-card-border">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-card text-brand-500 shadow-sm' : 'text-muted-foreground'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-card text-brand-500 shadow-sm' : 'text-muted-foreground'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Candidate Directory Content */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-16 rounded-xl" />)}
        </div>
      ) : candidates.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-card-border glass-panel space-y-3">
          <Users className="w-12 h-12 text-muted-foreground mx-auto stroke-1" />
          <h3 className="text-base font-bold text-foreground">No matching candidates</h3>
          <p className="text-xs text-muted-foreground">Upload resumes or clear filter criteria.</p>
        </div>
      ) : viewMode === 'table' ? (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/50 border-b border-card-border font-mono text-muted-foreground uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-4 w-10">
                    <input
                      type="checkbox"
                      checked={selectedCandidates.length === candidates.length && candidates.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-card-border text-brand-500 focus:ring-brand-500 cursor-pointer"
                    />
                  </th>
                  <th className="p-4 font-semibold">Candidate</th>
                  <th className="p-4 font-semibold">Headline & Company</th>
                  <th className="p-4 font-semibold">Match %</th>
                  <th className="p-4 font-semibold">Risk Index</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Dossier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border">
                {candidates.map((cand) => (
                  <tr
                    key={cand.id}
                    onClick={() => navigate(`/app/candidates/${cand.id}`)}
                    className="hover:bg-muted/30 cursor-pointer transition-colors group"
                  >
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedCandidates.includes(cand.id)}
                        onChange={(e) => toggleSelectCandidate(cand.id, e)}
                        className="rounded border-card-border text-brand-500 focus:ring-brand-500 cursor-pointer"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-mono font-bold text-xs shadow-glow-sm">
                          {cand.avatar}
                        </div>
                        <div>
                          <span className="font-bold text-foreground block group-hover:text-brand-500 transition-colors">
                            {cand.name}
                          </span>
                          <span className="text-[11px] text-muted-foreground font-mono">{cand.location}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-foreground block">{cand.title}</span>
                      <span className="text-[11px] text-muted-foreground">{cand.currentCompany}</span>
                    </td>
                    <td className="p-4 font-mono font-bold text-emerald-500">
                      {cand.matchScore}%
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase ${
                        cand.riskLevel === 'Low' ? 'bg-emerald-500/10 text-emerald-400' :
                        cand.riskLevel === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-rose-500/10 text-rose-400'
                      }`}>
                        {cand.riskLevel} ({cand.riskScore}%)
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge variant={cand.status === 'Shortlisted' ? 'brand' : 'neutral'} size="sm">
                        {cand.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/app/persona/${cand.id}`);
                        }}
                        className="p-1.5 rounded-lg text-brand-500 hover:bg-brand-500/10 transition-colors font-mono text-[11px] inline-flex items-center gap-1 font-semibold"
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Persona
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((cand) => (
            <Card
              key={cand.id}
              onClick={() => navigate(`/app/candidates/${cand.id}`)}
              className="p-6 space-y-4 cursor-pointer hover:border-brand-500/40 transition-colors"
              hoverable
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-mono font-bold text-sm shadow-glow-sm">
                    {cand.avatar}
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-heading text-foreground">{cand.name}</h3>
                    <p className="text-xs text-muted-foreground">{cand.location}</p>
                  </div>
                </div>
                <Badge variant={cand.riskLevel === 'Low' ? 'success' : cand.riskLevel === 'Medium' ? 'warning' : 'risk'} size="sm">
                  {cand.riskLevel}
                </Badge>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-foreground block">{cand.title}</span>
                <span className="text-[11px] text-muted-foreground">{cand.currentCompany} • {cand.experienceYears}y exp</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-card-border text-xs font-mono">
                <span className="text-emerald-500 font-bold">{cand.matchScore}% Match</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/app/persona/${cand.id}`);
                  }}
                  className="text-brand-500 font-bold hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Open Persona
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
