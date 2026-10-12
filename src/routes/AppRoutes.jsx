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

// Loading Fallback with animated spinner
const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4">
    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-500 to-indigo-600 flex items-center justify-center text-white shadow-glow-sm animate-pulse">
      <Sparkles className="w-6 h-6" />
    </div>
    <div className="text-center">
      <span className="text-sm font-bold font-heading text-foreground block">
        Recruiter<span className="text-brand-500">.AI</span>
      </span>
      <span className="text-xs font-mono text-muted-foreground">Loading intelligent workspace...</span>
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
