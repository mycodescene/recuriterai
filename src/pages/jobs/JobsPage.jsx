import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  MapPin,
  Clock,
  DollarSign,
  Users,
  ChevronRight,
  Sparkles,
  Layers,
  Code2,
  Cpu,
  Palette,
  Server,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Skeleton } from '../../components/ui/Skeleton';
import { CountUp } from '../../components/ui/CountUp';
import { jobService } from '../../services/api/jobService';

export const JobsPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('all');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const data = await jobService.getAll({ search, department, status });
        setJobs(data);
      } catch (e) {
        console.error('Failed to fetch jobs', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, [search, department, status]);

  const departments = ['all', 'Engineering', 'AI Research', 'Product Design', 'Infrastructure', 'Human Resources', 'Analytics'];

  // Calculate summary stats
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter(j => j.status === 'Active').length;
  const draftJobs = jobs.filter(j => j.status !== 'Active').length;
  const avgApplicants = totalJobs > 0 ? Math.round(jobs.reduce((acc, j) => acc + (j.applicantsCount || 0), 0) / totalJobs) : 0;

  const getDeptIcon = (dept) => {
    switch (dept) {
      case 'Engineering':
        return <Code2 className="w-4 h-4 text-brand-500" />;
      case 'AI Research':
        return <Cpu className="w-4 h-4 text-brand-cyan" />;
      case 'Product Design':
        return <Palette className="w-4 h-4 text-purple-400" />;
      case 'Infrastructure':
        return <Server className="w-4 h-4 text-amber-400" />;
      default:
        return <Layers className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto w-full">
      {/* 1. Header with Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-500/10 text-brand-500 border border-brand-500/20">
              <Briefcase className="w-5 h-5" />
            </span>
            <h1 className="text-3xl sm:text-4xl font-black font-heading text-foreground tracking-tight">
              Job Requisitions & Roles
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1.5 max-w-xl">
            Calibrate job specs, salary bands, required evidence signals, and manage live candidate matching pipelines.
          </p>
        </div>

        <Button
          onClick={() => navigate('/app/jobs/create')}
          variant="primary"
          size="lg"
          leftIcon={<Plus className="w-5 h-5" />}
          className="shadow-glow-md font-bold text-sm"
        >
          Create New Job Requisition
        </Button>
      </div>

      {/* 2. Top Summary Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-panel border border-card-border/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">Total Requisitions</p>
            <div className="text-2xl sm:text-3xl font-black font-heading text-foreground mt-1 tabular-nums">
              <CountUp target={totalJobs || 6} duration={1.2} />
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-card-border/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">Active Hiring</p>
            <div className="text-2xl sm:text-3xl font-black font-heading text-emerald-500 mt-1 tabular-nums">
              <CountUp target={activeJobs || 5} duration={1.2} />
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-card-border/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">Draft / On Hold</p>
            <div className="text-2xl sm:text-3xl font-black font-heading text-amber-500 mt-1 tabular-nums">
              <CountUp target={draftJobs || 1} duration={1.2} />
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-card-border/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">Avg Applicants / Role</p>
            <div className="text-2xl sm:text-3xl font-black font-heading text-brand-cyan mt-1 tabular-nums">
              <CountUp target={avgApplicants || 38} duration={1.2} />
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Filter and View Controls Bar (High Contrast in Dark & Light) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-3xl glass-panel border border-card-border shadow-sm">
        {/* Search Input with high contrast */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search role title, required skills, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 bg-muted/60 dark:bg-muted/40 border border-card-border rounded-2xl text-xs sm:text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all"
          />
        </div>

        {/* Department Filter with dark-friendly background */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="h-11 px-4 bg-muted/60 dark:bg-midnight-800 text-foreground border border-card-border rounded-2xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 cursor-pointer font-medium"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept} className="bg-card text-foreground">
                {dept === 'all' ? 'All Departments' : dept}
              </option>
            ))}
          </select>

          {/* View toggle */}
          <div className="flex items-center bg-muted/80 p-1 rounded-2xl border border-card-border">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-card text-brand-500 shadow-sm font-bold' : 'text-muted-foreground hover:text-foreground'}`}
              title="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'table' ? 'bg-card text-brand-500 shadow-sm font-bold' : 'text-muted-foreground hover:text-foreground'}`}
              title="Table view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Job Content: Rich Cards Grid or Detailed Table */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-64 rounded-3xl" />)}
        </div>
      ) : jobs.length === 0 ? (
        <div className="p-16 text-center rounded-3xl border border-card-border glass-panel space-y-4">
          <Briefcase className="w-14 h-14 text-muted-foreground mx-auto stroke-1" />
          <h3 className="text-lg font-bold text-foreground">No matching job requisitions found</h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
            Try adjusting your search criteria or create a new requisition to begin sourcing.
          </p>
          <Button
            onClick={() => { setSearch(''); setDepartment('all'); }}
            variant="outline"
            size="sm"
          >
            Clear Filters
          </Button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className="p-6 h-full flex flex-col justify-between space-y-5 cursor-pointer relative overflow-hidden group border border-card-border/80 hover:border-brand-500/40"
                hoverable
                glow
                onClick={() => navigate(`/app/jobs/${job.id}`)}
              >
                {/* Top Aurora Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-indigo-500 to-brand-cyan opacity-80 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-muted text-foreground">
                        {getDeptIcon(job.department)}
                      </span>
                      <span className="text-xs font-mono font-medium text-muted-foreground">
                        {job.department}
                      </span>
                    </div>

                    <Badge variant={job.status === 'Active' ? 'success' : 'neutral'} size="sm" dot>
                      {job.status}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-foreground group-hover:text-brand-500 transition-colors line-clamp-1">
                    {job.title}
                  </h3>

                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-card-border/70">
                  {/* Skill Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {job.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-muted/80 text-muted-foreground border border-card-border/60"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 4 && (
                      <span className="px-2 py-1 rounded-lg text-[10px] font-mono bg-brand-500/10 text-brand-500 font-semibold">
                        +{job.skills.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Metadata: Location, Salary & Applicant Count */}
                  <div className="flex items-center justify-between text-xs font-mono pt-1 text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span className="truncate max-w-[120px]">{job.location.split('/')[0]}</span>
                    </span>

                    <span className="font-bold text-foreground bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-500/20">
                      ${job.salaryMin / 1000}k - ${job.salaryMax / 1000}k
                    </span>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="flex items-center gap-1.5 text-muted-foreground font-mono">
                      <Users className="w-3.5 h-3.5 text-brand-500" />
                      <strong>{job.applicantsCount}</strong> Applicants
                    </span>

                    <span className="text-brand-500 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      View Pipeline <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card className="p-0 overflow-hidden border border-card-border/80">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-muted/60 border-b border-card-border font-mono text-muted-foreground uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-4 font-semibold">Job Title</th>
                  <th className="p-4 font-semibold">Department</th>
                  <th className="p-4 font-semibold">Location</th>
                  <th className="p-4 font-semibold">Salary Range</th>
                  <th className="p-4 font-semibold">Applicants</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border">
                {jobs.map((job) => (
                  <tr
                    key={job.id}
                    onClick={() => navigate(`/app/jobs/${job.id}`)}
                    className="hover:bg-muted/40 cursor-pointer transition-colors"
                  >
                    <td className="p-4 font-bold text-foreground">
                      <span className="hover:text-brand-500 transition-colors">{job.title}</span>
                    </td>
                    <td className="p-4 text-muted-foreground font-medium">{job.department}</td>
                    <td className="p-4 text-muted-foreground">{job.location}</td>
                    <td className="p-4 font-mono font-semibold text-foreground">
                      ${job.salaryMin / 1000}k - ${job.salaryMax / 1000}k
                    </td>
                    <td className="p-4 font-mono font-semibold">{job.applicantsCount}</td>
                    <td className="p-4">
                      <Badge variant={job.status === 'Active' ? 'success' : 'neutral'} size="sm" dot>
                        {job.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};
