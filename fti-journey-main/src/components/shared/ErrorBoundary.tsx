import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6">
          <div className="max-w-md text-center space-y-4">
            <h1 className="text-2xl font-black text-slate-900">Something went wrong</h1>
            <p className="text-slate-500 text-sm">
              The page hit an unexpected error. Refresh to continue, or go back to the home page.
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-white font-semibold"
            >
              Go to Home
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
