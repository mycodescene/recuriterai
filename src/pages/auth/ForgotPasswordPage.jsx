import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Logo } from '../../components/ui/Logo';
import { toast } from 'sonner';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setIsLoading(false);
    setSubmitted(true);
    toast.success('Reset link dispatched');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background text-foreground bg-grid-pattern relative">
      {/* Back to Home Button in top bar */}
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground bg-muted/60 hover:bg-muted border border-card-border transition-all group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="w-full max-w-md rounded-3xl glass-panel border border-card-border p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center justify-center mb-2">
            <Logo size="md" />
          </Link>
          <h1 className="text-2xl font-bold font-heading text-foreground">Reset Password</h1>
          <p className="text-xs text-muted-foreground">
            Enter your registered recruiter email to receive instructions.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h3 className="text-sm font-bold text-foreground">Instructions Sent</h3>
            <p className="text-xs text-muted-foreground">
              If an account exists for {email}, a password reset link has been dispatched.
            </p>
            <Link to="/login" className="inline-block mt-2 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Work Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sarah.jenkins@recruiter.ai"
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full mt-2 font-bold"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Send Reset Link
            </Button>
            <div className="text-center pt-2">
              <Link to="/login" className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
                ← Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
