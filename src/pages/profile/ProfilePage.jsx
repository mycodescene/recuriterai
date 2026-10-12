import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building,
  Key,
  ExternalLink,
  Award,
  Sparkles,
  FileCheck,
  Activity,
  Save,
  Check,
  Globe
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { GoogleIcon, FacebookIcon, LinkedInIcon } from '../../components/ui/SocialIcons';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'sonner';

export const ProfilePage = () => {
  const { user } = useAuthStore();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Sarah Jenkins',
    email: user?.email || 'sarah.jenkins@recruiter.ai',
    title: 'Lead Technical Talent Partner & AI Strategy',
    company: 'Recruiter.AI Enterprise Cloud',
    location: 'San Francisco, CA (Hybrid)',
    phone: '+1 (555) 234-5678',
    bio: 'Specializing in Senior & Principal distributed systems engineers, ML researchers, and product leadership. Leveraging evidence-based AI screening and persona dossiers since 2024.',
    confidenceThreshold: '85',
    blindScreening: true,
    autoCrossReference: true,
    shapExplainer: true
  });

  const [connectedAccounts, setConnectedAccounts] = useState({
    linkedin: { connected: true, username: 'sarah-jenkins-recruiter', lastSync: '12 mins ago' },
    google: { connected: true, email: 'sarah.jenkins@recruiter.ai', lastSync: 'Active Session' },
    facebook: { connected: false, username: '', lastSync: 'Not connected' }
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 600));
    setIsSaving(false);
    toast.success('Recruiter Profile & Preferences saved successfully!');
  };

  const toggleConnection = (provider) => {
    setConnectedAccounts(prev => {
      const isCurrently = prev[provider].connected;
      const updated = {
        ...prev,
        [provider]: {
          ...prev[provider],
          connected: !isCurrently,
          lastSync: !isCurrently ? 'Just now' : 'Disconnected'
        }
      };
      toast.success(`${provider.toUpperCase()} account ${!isCurrently ? 'connected' : 'disconnected'}`);
      return updated;
    });
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-mono font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Talent Partner Workspace</span>
          </div>
          <h1 className="text-3xl font-black font-heading text-foreground tracking-tight">
            Recruiter Profile & Integration Settings
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your credentials, connected identity providers (LinkedIn, Google), and AI decision support preferences.
          </p>
        </div>

        <Button
          onClick={handleSave}
          variant="primary"
          size="md"
          isLoading={isSaving}
          leftIcon={<Save className="w-4 h-4" />}
        >
          Save Changes
        </Button>
      </div>

      {/* Recruiter Identity Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-card-border bg-gradient-to-br from-card via-card to-brand-500/5 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-black font-heading shadow-glow-md">
              {profileData.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 p-1 rounded-full bg-emerald-500 text-white shadow-sm" title="Active Verified Recruiter">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-black font-heading text-foreground">
                {profileData.name}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-brand-500/15 text-brand-600 dark:text-brand-300 border border-brand-500/25">
                Senior Talent Partner
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Level 4 Reviewer
              </span>
            </div>

            <p className="text-sm text-muted-foreground font-medium">
              {profileData.title} • {profileData.company}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-brand-500" />
                {profileData.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-brand-500" />
                {profileData.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                98.4% Decision Accuracy
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-card-border">
          <div className="p-3.5 rounded-2xl bg-muted/40 border border-card-border">
            <p className="text-[11px] font-mono text-muted-foreground uppercase font-medium">Dossiers Reviewed</p>
            <p className="text-xl font-black font-heading text-foreground mt-0.5">248</p>
            <p className="text-[10px] text-emerald-500 font-mono mt-0.5">+18% this month</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-muted/40 border border-card-border">
            <p className="text-[11px] font-mono text-muted-foreground uppercase font-medium">Fraud Signals Blocked</p>
            <p className="text-xl font-black font-heading text-risk-500 mt-0.5">19</p>
            <p className="text-[10px] text-muted-foreground font-mono mt-0.5">100% false-claim audit</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-muted/40 border border-card-border">
            <p className="text-[11px] font-mono text-muted-foreground uppercase font-medium">Avg Time to Offer</p>
            <p className="text-xl font-black font-heading text-brand-500 mt-0.5">11.4d</p>
            <p className="text-[10px] text-emerald-500 font-mono mt-0.5">-3.2 days vs target</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-muted/40 border border-card-border">
            <p className="text-[11px] font-mono text-muted-foreground uppercase font-medium">Offer Acceptance</p>
            <p className="text-xl font-black font-heading text-emerald-500 mt-0.5">93.8%</p>
            <p className="text-[10px] text-muted-foreground font-mono mt-0.5">Target: 85%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Profile Info Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl bg-card border border-card-border shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-card-border pb-4">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">Personal Information</h3>
                <p className="text-xs text-muted-foreground">Update your contact profile and public recruiter bio.</p>
              </div>
              <User className="w-5 h-5 text-brand-500" />
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  leftIcon={<User className="w-4 h-4" />}
                />
                <Input
                  label="Official Email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  leftIcon={<Mail className="w-4 h-4" />}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Title / Role"
                  value={profileData.title}
                  onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                  leftIcon={<Award className="w-4 h-4" />}
                />
                <Input
                  label="Primary Location"
                  value={profileData.location}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  leftIcon={<Building className="w-4 h-4" />}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Recruiter Bio & Focus Areas</label>
                <textarea
                  rows={3}
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-card-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/40 resize-none font-sans"
                />
              </div>
            </form>
          </div>

          {/* AI Decision Support Preferences */}
          <div className="p-6 rounded-3xl bg-card border border-card-border shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-card-border pb-4">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">AI Intelligence & Evaluation Guardrails</h3>
                <p className="text-xs text-muted-foreground">Configure thresholds and automated evidence extraction policies.</p>
              </div>
              <Sparkles className="w-5 h-5 text-brand-500" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/30 border border-card-border">
                <div className="space-y-0.5 pr-4">
                  <p className="text-sm font-bold text-foreground">Continuous Social Proof Cross-Referencing</p>
                  <p className="text-xs text-muted-foreground">Auto-match candidate GitHub commits, LinkedIn tenure dates, and university alumni lists.</p>
                </div>
                <input
                  type="checkbox"
                  checked={profileData.autoCrossReference}
                  onChange={(e) => setProfileData({ ...profileData, autoCrossReference: e.target.checked })}
                  className="w-5 h-5 rounded accent-brand-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/30 border border-card-border">
                <div className="space-y-0.5 pr-4">
                  <p className="text-sm font-bold text-foreground">Anonymized Blind Screening Gate</p>
                  <p className="text-xs text-muted-foreground">Mask candidate name, age, and photos during initial radar competency evaluation to reduce bias.</p>
                </div>
                <input
                  type="checkbox"
                  checked={profileData.blindScreening}
                  onChange={(e) => setProfileData({ ...profileData, blindScreening: e.target.checked })}
                  className="w-5 h-5 rounded accent-brand-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/30 border border-card-border">
                <div className="space-y-0.5 pr-4">
                  <p className="text-sm font-bold text-foreground">SHAP Explainable Factor Breakdown</p>
                  <p className="text-xs text-muted-foreground">Always include mathematical weight contribution charts for match score decisions.</p>
                </div>
                <input
                  type="checkbox"
                  checked={profileData.shapExplainer}
                  onChange={(e) => setProfileData({ ...profileData, shapExplainer: e.target.checked })}
                  className="w-5 h-5 rounded accent-brand-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Connected Identity Providers */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-card border border-card-border shadow-sm space-y-5">
            <div className="border-b border-card-border pb-4">
              <h3 className="text-lg font-bold font-heading text-foreground">Connected Social Logins</h3>
              <p className="text-xs text-muted-foreground">Link your external accounts for seamless sign-in & candidate imports.</p>
            </div>

            <div className="space-y-3.5">
              {/* LinkedIn */}
              <div className="p-4 rounded-2xl border border-card-border bg-muted/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <LinkedInIcon size={22} />
                    <div>
                      <p className="text-xs font-bold text-foreground">LinkedIn Recruiter</p>
                      <p className="text-[11px] text-muted-foreground font-mono">
                        {connectedAccounts.linkedin.connected ? connectedAccounts.linkedin.username : 'Not connected'}
                      </p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    connectedAccounts.linkedin.connected
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {connectedAccounts.linkedin.connected ? 'Connected' : 'Offline'}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-card-border/60">
                  <span className="text-[10px] text-muted-foreground font-mono">Sync: {connectedAccounts.linkedin.lastSync}</span>
                  <button
                    onClick={() => toggleConnection('linkedin')}
                    className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    {connectedAccounts.linkedin.connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>

              {/* Google */}
              <div className="p-4 rounded-2xl border border-card-border bg-muted/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <GoogleIcon size={22} />
                    <div>
                      <p className="text-xs font-bold text-foreground">Google Workspace</p>
                      <p className="text-[11px] text-muted-foreground font-mono">
                        {connectedAccounts.google.connected ? connectedAccounts.google.email : 'Not connected'}
                      </p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    connectedAccounts.google.connected
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {connectedAccounts.google.connected ? 'Connected' : 'Offline'}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-card-border/60">
                  <span className="text-[10px] text-muted-foreground font-mono">Sync: {connectedAccounts.google.lastSync}</span>
                  <button
                    onClick={() => toggleConnection('google')}
                    className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    {connectedAccounts.google.connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>

              {/* Facebook */}
              <div className="p-4 rounded-2xl border border-card-border bg-muted/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FacebookIcon size={22} />
                    <div>
                      <p className="text-xs font-bold text-foreground">Facebook Workplace</p>
                      <p className="text-[11px] text-muted-foreground font-mono">Meta Talent Cloud</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    connectedAccounts.facebook.connected
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {connectedAccounts.facebook.connected ? 'Connected' : 'Offline'}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-card-border/60">
                  <span className="text-[10px] text-muted-foreground font-mono">Sync: {connectedAccounts.facebook.lastSync}</span>
                  <button
                    onClick={() => toggleConnection('facebook')}
                    className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    {connectedAccounts.facebook.connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Security & Access Session Card */}
          <div className="p-6 rounded-3xl bg-card border border-card-border shadow-sm space-y-4">
            <h3 className="text-sm font-bold font-heading text-foreground flex items-center gap-2">
              <Key className="w-4 h-4 text-brand-500" />
              <span>Session & Audit Logs</span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Your actions are encrypted and logged under SOC2 Type II compliance standards.
            </p>
            <div className="p-3 rounded-xl bg-muted/50 border border-card-border text-[11px] font-mono text-muted-foreground space-y-1">
              <div>Session ID: <span className="text-foreground">REC-2026-US-W2</span></div>
              <div>2FA Verification: <span className="text-emerald-500 font-bold">Hardware Passkey Active</span></div>
              <div>IP Location: <span className="text-foreground">San Francisco, CA (192.0.2.42)</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
