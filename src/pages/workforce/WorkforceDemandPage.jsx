import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Sparkles,
  AlertCircle,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Skeleton } from '../../components/ui/Skeleton';
import { WorkforceForecastChart } from '../../components/charts/WorkforceForecastChart';
import { workforceService } from '../../services/api/workforceService';

export const WorkforceDemandPage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [department, setDepartment] = useState('all');

  useEffect(() => {
    const fetchDemand = async () => {
      setIsLoading(true);
      try {
        const res = await workforceService.getDemand(department);
        setData(res);
      } catch (e) {
        console.error('Failed to load workforce demand data', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDemand();
  }, [department]);

  if (isLoading || !data) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-80 rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-64 rounded-3xl" />
          <Skeleton className="h-64 rounded-3xl" />
        </div>
      </div>
    );
  }

  const departments = ['all', 'AI & ML Labs', 'Core Platform & Infra', 'Product Design', 'Talent & People Ops', 'Data & BI Analytics'];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="brand" size="sm" dot>Module 7</Badge>
            <span className="text-xs font-mono text-muted-foreground uppercase">Workforce Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-foreground tracking-tight mt-1">
            AI Workforce Demand Predictor
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Statistical 6-12 month hiring velocity forecasts, emerging skill requirements, and departmental headcount heatmaps.
          </p>
        </div>

        {/* Department Filter */}
        <div className="flex items-center gap-2">
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="h-11 px-3.5 bg-card border border-card-border rounded-xl text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
          >
            {departments.map(d => (
              <option key={d} value={d}>
                {d === 'all' ? 'All Departments' : d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* AI Insight Plain-English Summary Card */}
      <Card className="p-6 bg-gradient-to-r from-brand-500/10 via-indigo-500/10 to-transparent border-brand-500/30 space-y-2">
        <div className="flex items-center gap-2 text-brand-500 font-mono text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Strategic Macro Insight</span>
        </div>
        <h3 className="text-base font-bold font-heading text-foreground">
          {data.aiInsight?.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {data.aiInsight?.summary}
        </p>
      </Card>

      {/* Forecast Line/Area Chart with Confidence Band */}
      <Card className="p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold font-heading text-foreground">
              12-Month Headcount Hiring Demand Projection
            </h3>
            <p className="text-xs text-muted-foreground">
              Shaded region denotes 95% confidence intervals based on historical sprint velocity and attrition telemetry.
            </p>
          </div>
          <Badge variant="brand" size="sm">Nov 2026 – Oct 2027</Badge>
        </div>

        <WorkforceForecastChart data={data.forecast} height={320} />
      </Card>

      {/* Emerging Skills Ranking & Department Demand Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Emerging Skills Ranking with Trend Arrows */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-heading text-foreground">
                Emerging & Deprecating Skills Ranking
              </h3>
              <p className="text-xs text-muted-foreground">Relative demand trajectory across new requisitions</p>
            </div>
            <TrendingUp className="w-5 h-5 text-brand-500" />
          </div>

          <div className="divide-y divide-card-border">
            {data.emergingSkills?.map((skill, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">{skill.skill}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      skill.urgency === 'Critical' ? 'bg-rose-500/10 text-rose-400' :
                      skill.urgency === 'High' ? 'bg-amber-500/10 text-amber-400' :
                      skill.urgency === 'Deprecating' ? 'bg-slate-500/10 text-slate-400' :
                      'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {skill.urgency}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground font-mono">
                    Current Squad: {skill.currentHeadcount} engineers • Projected Need: {skill.projectedNeed}
                  </p>
                </div>

                <div className="flex items-center gap-1 font-mono font-bold text-xs shrink-0">
                  {skill.trend === 'up' ? (
                    <span className="text-emerald-500 flex items-center">
                      <ArrowUpRight className="w-4 h-4" /> {skill.demandGrowth}
                    </span>
                  ) : (
                    <span className="text-rose-500 flex items-center">
                      <ArrowDownRight className="w-4 h-4" /> {skill.demandGrowth}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Role Demand Heatmap by Quarter */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-heading text-foreground">
                Quarterly Department Headcount Demand
              </h3>
              <p className="text-xs text-muted-foreground">Projected net hiring additions by quarter</p>
            </div>
            <Layers className="w-5 h-5 text-indigo-400" />
          </div>

          <div className="space-y-3">
            {data.departmentHeatmap?.map((dept, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-muted/40 border border-card-border space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-foreground">{dept.department}</span>
                  <Badge variant={dept.riskLevel === 'High Growth' ? 'brand' : 'neutral'} size="sm">
                    {dept.riskLevel}
                  </Badge>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center font-mono text-xs">
                  <div className="p-2 rounded bg-card border border-card-border">
                    <span className="text-[10px] text-muted-foreground block">Q1</span>
                    <span className="font-bold text-foreground">+{dept.q1}</span>
                  </div>
                  <div className="p-2 rounded bg-card border border-card-border">
                    <span className="text-[10px] text-muted-foreground block">Q2</span>
                    <span className="font-bold text-foreground">+{dept.q2}</span>
                  </div>
                  <div className="p-2 rounded bg-card border border-card-border">
                    <span className="text-[10px] text-muted-foreground block">Q3</span>
                    <span className="font-bold text-brand-500">+{dept.q3}</span>
                  </div>
                  <div className="p-2 rounded bg-card border border-card-border">
                    <span className="text-[10px] text-muted-foreground block">Q4</span>
                    <span className="font-bold text-emerald-500">+{dept.q4}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
