import type { ReactNode } from 'react';
import { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component that catches JavaScript errors in child component tree
 * and displays a fallback UI instead of crashing the entire app.
 *
 * Usage:
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 *
 * With custom fallback:
 * <ErrorBoundary fallback={(error, reset) => <CustomErrorUI error={error} onReset={reset} />}>
 *   <YourComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error to console for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetErrorBoundary = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetErrorBoundary);
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <div className="w-full max-w-md">
            <div className="bg-card-elevated border border-border rounded-lg p-8 shadow-lg">
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Error Icon */}
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>

                {/* Error Title */}
                <div className="space-y-2">
                  <h1 className="text-2xl font-semibold text-foreground">
                    Something went wrong
                  </h1>
                  <p className="text-sm text-foreground/70">
                    We encountered an unexpected error. Please try refreshing the page.
                  </p>
                </div>

                {/* Error Details (development only) */}
                {import.meta.env.DEV && (
                  <div className="w-full">
                    <details className="text-left">
                      <summary className="text-sm font-medium text-foreground cursor-pointer hover:text-foreground/70 transition-colors">
                        Error Details
                      </summary>
                      <div className="mt-3 p-3 bg-card-muted border border-border rounded text-xs text-foreground/90 overflow-auto max-h-48">
                        <pre className="whitespace-pre-wrap break-words">
                          {this.state.error.toString()}
                          {'\n\n'}
                          {this.state.error.stack}
                        </pre>
                      </div>
                    </details>
                  </div>
                )}

                {/* Reset Button */}
                <button
                  type="button"
                  onClick={this.resetErrorBoundary}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md font-medium text-sm bg-linear-to-b from-gradient-from to-gradient-to hover:contrast-90 text-foreground shadow-[inset_0_1px_0_0_rgb(255_255_255/.32),0px_1px_1px_-0.5px_rgba(9,9,11,0.05),0px_3px_3px_-1.5px_rgba(9,9,11,0.05),0px_6px_6px_-3px_rgba(9,9,11,0.05)] dark:shadow-[inset_0_1px_0_0_rgb(255_255_255/.12),0px_1px_1px_-0.5px_rgba(9,9,11,0.05),0px_3px_3px_-1.5px_rgba(9,9,11,0.05),0px_6px_6px_-3px_rgba(9,9,11,0.05)] transition-[filter] ease-out-quad duration-100 focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:outline-none"
                >
                  <RefreshCw size={16} />
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
