'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component to catch and handle runtime errors
 * Prevents the entire app from crashing when an error occurs in a component
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Component stack:', errorInfo.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
          <div className="bg-[var(--card-bg)] p-8 rounded-lg shadow-lg max-w-md w-full border border-[var(--border-color)]">
            <h2 className="text-xl font-bold text-[var(--error-color)] mb-4">Something went wrong</h2>
            <p className="text-[var(--foreground)]/80 mb-6">
              We apologize for the inconvenience. Please try refreshing the page or contact support if the problem persists.
            </p>
            <div className="overflow-auto max-h-32 p-3 bg-[var(--background)] rounded text-sm text-[var(--foreground)]/70 mb-6 border border-[var(--border-color)]">
              {this.state.error?.message || 'Unknown error'}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[var(--primary-gradient-from)] text-white rounded hover:bg-[var(--primary-gradient-from)]/90 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 