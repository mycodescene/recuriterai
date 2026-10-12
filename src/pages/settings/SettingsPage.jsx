import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Building,
  Lock,
  Bell,
  Sun,
  Moon,
  Mail,
  CheckCircle2,
  Save,
  ShieldCheck
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import { toast } from 'sonner';

export const SettingsPage = () => {
  const { user, updateProfile } = useAuthStore();
  const { theme, setTheme } = useThemeStore();

  const [name, setName] = useState(user?.name || 'Sarah Jenkins');
  const [title, setTitle] = useState(user?.title || 'Lead Technical Talent Partner');
  const [email, setEmail] = useState(user?.email || 'sarah.jenkins@recruiter.ai');
  const [company, setCompany] = useState(user?.company || 'Synthetix Global Tech');
  const [department, setDepartment] = useState(user?.department || 'Engineering & Product');
  const [signature, setSignature] = useState(
    user?.signature || 'Sarah Jenkins\nLead Technical Talent Partner | Synthetix Global Tech'
  );

  const [notifications, setNotifications] = useState({
    emailAlerts: user?.notifications?.emailAlerts ?? true,
    candidateRiskAlerts: user?.notifications?.candidateRiskAlerts ?? true,
    weeklyReport: user?.notifications?.weeklyReport ?? true
  });

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 400));
    updateProfile({
      name,
      title,
      email,
      company,
      department,
      signature,
      notifications
    });
    setIsSaving(false);
    toast.success('Recruiter profile and preferences updated successfully');
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!newPassword) return;
    toast.success('Password updated successfully');
    setOldPassword('');
    setNewPassword('');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground tracking-tight">
          Recruiter Profile & System Settings
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Configure talent partner credentials, email signatures, notification thresholds, and theme ergonomics.
        </p>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* Recruiter Identity & Company Info */}
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-card-border">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-mono font-bold text-lg shadow-glow-sm">
              {user?.avatar || 'SJ'}
            </div>
            <div>
              <h2 className="text-base font-bold font-heading text-foreground">{name}</h2>
              <span className="text-xs text-brand-500 font-mono font-semibold">{user?.role || 'Recruiter'} • Verified Account</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
              required
            />
            <Input
              label="Recruiter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              leftIcon={<Building className="w-4 h-4" />}
              required
            />
            <Input
              label="Work Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />
            <Input
              label="Company Organization"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              leftIcon={<Building className="w-4 h-4" />}
              required
            />
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">
              Outgoing Email Signature
            </label>
            <textarea
              rows={3}
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-card border border-card-border text-xs sm:text-sm text-foreground outline-none font-mono focus:ring-2 focus:ring-brand-500/50"
              placeholder="Your email signature for candidate correspondence..."
            />
          </div>
        </Card>

        {/* Theme Preferences */}
        <Card className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold font-heading text-foreground">Theme & Visual Experience</h3>
              <p className="text-xs text-muted-foreground">Persisted in local storage with automatic system preference detection.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                theme === 'light' ? 'border-brand-500 bg-brand-500/10 shadow-glow-sm' : 'border-card-border bg-card'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sun className="w-5 h-5 text-amber-500" />
                <div>
                  <span className="text-xs font-bold text-foreground block">Light Mode</span>
                  <span className="text-[10px] text-muted-foreground font-mono">Clean off-white canvas</span>
                </div>
              </div>
              {theme === 'light' && <CheckCircle2 className="w-4 h-4 text-brand-500" />}
            </button>

            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                theme === 'dark' ? 'border-brand-500 bg-brand-500/10 shadow-glow-sm' : 'border-card-border bg-card'
              }`}
            >
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-indigo-400" />
                <div>
                  <span className="text-xs font-bold text-foreground block">Dark Mode</span>
                  <span className="text-[10px] text-muted-foreground font-mono">Deep midnight indigo</span>
                </div>
              </div>
              {theme === 'dark' && <CheckCircle2 className="w-4 h-4 text-brand-500" />}
            </button>
          </div>
        </Card>

        {/* Notification Preferences */}
        <Card className="p-6 sm:p-8 space-y-4">
          <div>
            <h3 className="text-sm font-bold font-heading text-foreground">Notification Preferences</h3>
            <p className="text-xs text-muted-foreground">Select intelligence triggers to receive in your workspace.</p>
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-card-border cursor-pointer text-xs">
              <div>
                <span className="font-semibold text-foreground block">Immediate Candidate Risk & Fraud Alerts</span>
                <span className="text-[11px] text-muted-foreground">Alert when overlapping tenures or plagiarized CV text are detected</span>
              </div>
              <input
                type="checkbox"
                checked={notifications.candidateRiskAlerts}
                onChange={(e) => setNotifications({ ...notifications, candidateRiskAlerts: e.target.checked })}
                className="rounded text-brand-500 focus:ring-brand-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-card-border cursor-pointer text-xs">
              <div>
                <span className="font-semibold text-foreground block">Email Communications Dispatch Confirmation</span>
                <span className="text-[11px] text-muted-foreground">Notify when AI drafts selection or feedback emails</span>
              </div>
              <input
                type="checkbox"
                checked={notifications.emailAlerts}
                onChange={(e) => setNotifications({ ...notifications, emailAlerts: e.target.checked })}
                className="rounded text-brand-500 focus:ring-brand-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-card-border cursor-pointer text-xs">
              <div>
                <span className="font-semibold text-foreground block">Weekly Macro Workforce Demand Briefing</span>
                <span className="text-[11px] text-muted-foreground">Summary of 6-month projected talent shortfalls</span>
              </div>
              <input
                type="checkbox"
                checked={notifications.weeklyReport}
                onChange={(e) => setNotifications({ ...notifications, weeklyReport: e.target.checked })}
                className="rounded text-brand-500 focus:ring-brand-500"
              />
            </label>
          </div>
        </Card>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save All Preferences
          </Button>
        </div>
      </form>
    </div>
  );
};
