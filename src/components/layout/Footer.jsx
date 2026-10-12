import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart } from 'lucide-react';
import { Logo } from '../ui/Logo';

export const Footer = () => {
  return (
    <footer className="border-t border-card-border bg-card/60 backdrop-blur-md pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <Logo size="md" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Intelligent hiring decision support system empowering talent acquisition leaders with verified evidence personas, semantic matching, and risk detection.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-500">
              <Shield className="w-3.5 h-3.5" />
              <span>Human-Review Mandatory Guarantee</span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-foreground mb-4">Platform</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link to="/app/persona/cand-1" className="hover:text-foreground">AI Persona Studio</Link></li>
              <li><Link to="/app/matching" className="hover:text-foreground">Semantic Screening</Link></li>
              <li><Link to="/app/risk" className="hover:text-foreground">Risk & Fraud Intel</Link></li>
              <li><Link to="/app/retention" className="hover:text-foreground">Retention Predictor</Link></li>
              <li><Link to="/app/workforce" className="hover:text-foreground">Workforce Demand</Link></li>
              <li><Link to="/app/offers" className="hover:text-foreground">Offer Optimizer</Link></li>
            </ul>
          </div>

          {/* Architecture */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-foreground mb-4">Architecture</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>FastAPI Microservices Core</li>
              <li>JWT Bearer Security</li>
              <li>Multi-Source Evidence Verification</li>
              <li>Explainable SHAP Feature Drivers</li>
              <li>Human Approval Guardrails</li>
            </ul>
          </div>

          {/* Ethics & Compliance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-foreground mb-4">Ethics & Trust</h4>
            <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
              <li>No autonomous rejection without human sign-off</li>
              <li>GDPR & Data Protection Compliant</li>
              <li>Unbiased Semantic Embeddings</li>
              <li>Audit Trails for Every Decision</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-card-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 Recruiter.AI Decision Systems. Built with precision for modern talent teams.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for elite engineering recruiting
          </p>
        </div>
      </div>
    </footer>
  );
};
