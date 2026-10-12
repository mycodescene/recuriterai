import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './Button';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background text-foreground">
          <div className="max-w-md w-full p-8 rounded-3xl glass-panel border border-card-border shadow-2xl text-center space-y-5">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-risk-500/10 text-risk-500 border border-risk-500/20 flex items-center justify-center">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl font-bold font-heading text-foreground">
                Workspace Encountered an Error
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                An unexpected interface issue occurred. You can refresh or return home without losing your stored data.
              </p>
            </div>

            {this.state.error?.message && (
              <div className="p-3 rounded-xl bg-muted/60 border border-card-border text-[11px] font-mono text-muted-foreground text-left overflow-x-auto max-h-24">
                {this.state.error.message}
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="secondary"
                size="md"
                onClick={this.handleHome}
                leftIcon={<Home className="w-4 h-4" />}
                className="w-1/2"
              >
                Go Home
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={this.handleReload}
                leftIcon={<RefreshCw className="w-4 h-4" />}
                className="w-1/2"
              >
                Reload
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
