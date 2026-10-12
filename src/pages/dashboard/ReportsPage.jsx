import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, Filter, CheckCircle2, FileBarChart, Loader2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { dashboardService } from '../../services/api/dashboardService';
import { toast } from 'sonner';

export const ReportsPage = () => {
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [reportType, setReportType] = useState('Executive Talent Overview');
  const [isExporting, setIsExporting] = useState(false);
  const [includeFraudAudit, setIncludeFraudAudit] = useState(true);
  const [includeRetentionDrivers, setIncludeRetentionDrivers] = useState(true);

  const handleExport = async (format) => {
    setIsExporting(true);
    const toastId = toast.loading(`Generating calibrated ${format.toUpperCase()} report...`);
    
    try {
      const res = await dashboardService.exportReport(format, {
        dateRange,
        reportType,
        includeFraudAudit,
        includeRetentionDrivers
      });

      // Simulate file download trigger
      const element = document.createElement("a");
      const file = new Blob([`Recruiter.AI Decision Support Export\nReport: ${reportType}\nDate Range: ${dateRange}\nRecords: ${res.recordCount}\nGenerated: ${new Date().toISOString()}`], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = res.filename;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      toast.success(`${format.toUpperCase()} Report downloaded successfully`, { id: toastId });
    } catch (e) {
      toast.error('Export failed. Please retry.', { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground tracking-tight">
          Reports & Intelligence Export
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Generate board-ready talent summaries, compliance audit logs, and workforce pipeline benchmarks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Report configuration */}
        <Card className="md:col-span-2 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground block">
              Report Template
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Executive Talent Overview', desc: 'KPIs, funnel conversion, and top candidates' },
                { title: 'Fraud & Verification Audit', desc: 'Detailed log of CV claim verifications and flags' },
                { title: 'Workforce Demand & Skills', desc: '6-12 month hiring projections and skill trends' },
                { title: 'Retention Risk Analysis', desc: 'SHAP-calibrated turnover drivers across squads' }
              ].map(t => (
                <div
                  key={t.title}
                  onClick={() => setReportType(t.title)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    reportType === t.title
                      ? 'border-brand-500 bg-brand-500/10 shadow-glow-sm'
                      : 'border-card-border bg-card hover:bg-muted/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">{t.title}</span>
                    {reportType === t.title && <CheckCircle2 className="w-4 h-4 text-brand-500" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground block">
              Evaluation Date Window
            </label>
            <div className="flex flex-wrap gap-2">
              {['Last 7 Days', 'Last 30 Days', 'This Quarter (Q4)', 'Year-to-Date (2026)'].map(d => (
                <button
                  key={d}
                  onClick={() => setDateRange(d)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium font-mono transition-colors ${
                    dateRange === d
                      ? 'bg-brand-500 text-white font-bold'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-card-border">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground block">
              Compliance & Audit Elements
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2.5 text-xs text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeFraudAudit}
                  onChange={(e) => setIncludeFraudAudit(e.target.checked)}
                  className="rounded border-card-border text-brand-500 focus:ring-brand-500"
                />
                <span>Include candidate fraud discrepancies & verified source links</span>
              </label>
              <label className="flex items-center gap-2.5 text-xs text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeRetentionDrivers}
                  onChange={(e) => setIncludeRetentionDrivers(e.target.checked)}
                  className="rounded border-card-border text-brand-500 focus:ring-brand-500"
                />
                <span>Include SHAP retention drivers and compensation benchmark percentiles</span>
              </label>
            </div>
          </div>
        </Card>

        {/* Export summary & actions */}
        <div className="space-y-4">
          <Card className="space-y-4 bg-muted/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
                <FileBarChart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">Export Summary</h3>
                <span className="text-[11px] font-mono text-muted-foreground">169 candidates indexed</span>
              </div>
            </div>

            <div className="space-y-2 text-xs divide-y divide-card-border">
              <div className="flex justify-between py-1.5">
                <span className="text-muted-foreground">Type:</span>
                <span className="font-semibold text-foreground text-right">{reportType}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-muted-foreground">Window:</span>
                <span className="font-semibold text-foreground font-mono">{dateRange}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-muted-foreground">Format:</span>
                <span className="font-semibold text-brand-500 font-mono">PDF (Printable) or CSV</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <Button
                variant="primary"
                size="md"
                disabled={isExporting}
                onClick={() => handleExport('pdf')}
                leftIcon={isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                className="w-full text-xs"
              >
                Download PDF Executive Report
              </Button>
              <Button
                variant="secondary"
                size="md"
                disabled={isExporting}
                onClick={() => handleExport('csv')}
                leftIcon={<Download className="w-4 h-4" />}
                className="w-full text-xs"
              >
                Export Raw Dataset (CSV)
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
