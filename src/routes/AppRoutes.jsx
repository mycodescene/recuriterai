import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';
import { AppShell } from '../components/layout/AppShell';
import { useAuthStore } from '../store/authStore';

// Lazy-loaded routes with Suspense
const LandingPage = lazy(() => import('../pages/LandingPage').then(m => ({ default: m.LandingPage })));
const LoginPage = lazy(() => import('../pages/auth/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage').then(m => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));

const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage').then(m => ({ default: m.DashboardPage })));
const ReportsPage = lazy(() => import('../pages/dashboard/ReportsPage').then(m => ({ default: m.ReportsPage })));

const JobsPage = lazy(() => import('../pages/jobs/JobsPage').then(m => ({ default: m.JobsPage })));
const JobDetailPage = lazy(() => import('../pages/jobs/JobDetailPage').then(m => ({ default: m.JobDetailPage })));
const CreateJobPage = lazy(() => import('../pages/jobs/CreateJobPage').then(m => ({ default: m.CreateJobPage })));

const CandidatesPage = lazy(() => import('../pages/candidates/CandidatesPage').then(m => ({ default: m.CandidatesPage })));
const CandidateProfilePage = lazy(() => import('../pages/candidates/CandidateProfilePage').then(m => ({ default: m.CandidateProfilePage })));

const PersonaStudioPage = lazy(() => import('../pages/persona/PersonaStudioPage').then(m => ({ default: m.PersonaStudioPage })));
const MatchingPage = lazy(() => import('../pages/matching/MatchingPage').then(m => ({ default: m.MatchingPage })));
const RiskIntelligencePage = lazy(() => import('../pages/risk/RiskIntelligencePage').then(m => ({ default: m.RiskIntelligencePage })));
const RetentionPage = lazy(() => import('../pages/retention/RetentionPage').then(m => ({ default: m.RetentionPage })));
const WorkforceDemandPage = lazy(() => import('../pages/workforce/WorkforceDemandPage').then(m => ({ default: m.WorkforceDemandPage })));
const OfferOptimizerPage = lazy(() => import('../pages/offers/OfferOptimizerPage').then(m => ({ default: m.OfferOptimizerPage })));
const CommunicationsHubPage = lazy(() => import('../pages/communications/CommunicationsHubPage').then(m => ({ default: m.CommunicationsHubPage })));
const SettingsPage = lazy(() => import('../pages/settings/SettingsPage').then(m => ({ default: m.SettingsPage })));
const ProfilePage = lazy(() => import('../pages/profile/ProfilePage').then(m => ({ default: m.ProfilePage })));

// Unified Loading Fallback with matching Preloader aesthetic
const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 select-none">
    <div className="relative flex flex-col items-center max-w-xs w-full space-y-4 text-center">
      <div className="p-4 rounded-2xl glass-panel border border-card-border bg-card/90 shadow-lg flex items-center justify-center animate-pulse">
        <img
          src="/ai_rec_logo.png"
          alt="Recruiter.AI"
          className="h-10 w-auto object-contain drop-shadow"
        />
      </div>
      <div className="w-48 space-y-1.5">
        <div className="h-1.5 w-full bg-muted/60 rounded-full overflow-hidden border border-card-border/60">
          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 animate-pulse" />
        </div>
        <p className="text-[11px] font-mono text-muted-foreground">Loading workspace...</p>
      </div>
    </div>
  </div>
);

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected App Shell Workspace */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="reports" element={<ReportsPage />} />
          
          <Route path="jobs" element={<JobsPage />} />
          <Route path="jobs/create" element={<CreateJobPage />} />
          <Route path="jobs/:id" element={<JobDetailPage />} />

          <Route path="candidates" element={<CandidatesPage />} />
          <Route path="candidates/:id" element={<CandidateProfilePage />} />

          <Route path="persona" element={<Navigate to="/app/persona/cand-1" replace />} />
          <Route path="persona/:id" element={<PersonaStudioPage />} />

          <Route path="matching" element={<MatchingPage />} />
          <Route path="risk" element={<RiskIntelligencePage />} />
          <Route path="retention" element={<RetentionPage />} />
          <Route path="workforce" element={<WorkforceDemandPage />} />
          <Route path="offers" element={<OfferOptimizerPage />} />
          <Route path="communications" element={<CommunicationsHubPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
