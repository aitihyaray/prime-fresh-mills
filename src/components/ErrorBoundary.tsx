import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  public handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#FAF7E8] text-[#1C1917] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-[#EADFB4] shadow-xl text-center">
            <div className="w-16 h-16 rounded-full bg-[#FEE6B3] text-[#8d4b00] flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[32px]">warning</span>
            </div>
            <h2 className="text-xl font-bold text-[#1C1917] mb-2">
              Something went wrong
            </h2>
            <p className="text-sm text-[#44403C] mb-4">
              The application encountered an unexpected issue while rendering.
            </p>
            {this.state.error && (
              <div className="p-3 bg-[#FAF4DD] rounded-lg text-left text-xs font-mono text-[#8d4b00] overflow-x-auto mb-4 max-h-32">
                {this.state.error.message}
              </div>
            )}
            <button
              onClick={this.handleReload}
              className="w-full py-2.5 px-4 bg-[#8d4b00] hover:bg-[#b15f00] text-white font-semibold rounded-lg transition-colors text-sm shadow-sm"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
