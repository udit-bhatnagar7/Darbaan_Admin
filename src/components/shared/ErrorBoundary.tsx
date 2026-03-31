import React from 'react';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
          <div className="mb-6 rounded-full bg-destructive/10 p-4 text-destructive">
            <AlertCircle size={48} />
          </div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Something went wrong</h1>
          <p className="mb-8 max-w-md text-muted-foreground">
            An unexpected error occurred. Our team has been notified.
            {this.state.error && (
              <code className="mt-4 block rounded bg-muted p-2 text-xs text-destructive">
                {this.state.error.message}
              </code>
            )}
          </p>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Try again
            </Button>
            <Button onClick={this.handleReset}>
              <Home className="mr-2 h-4 w-4" />
              Go home
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
