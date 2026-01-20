import * as React from "react";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  message?: string;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: unknown): State {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { hasError: true, message };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    // Keep a breadcrumb in the console for remote debugging.
    console.error("App crashed:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen flex items-center justify-center bg-background p-6">
          <section className="max-w-md text-center">
            <h1 className="font-serif text-2xl text-foreground">Something went wrong</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              This browser hit a runtime error and couldn’t render the page.
            </p>
            <p className="mt-2 text-xs text-muted-foreground/70 break-words">
              {this.state.message}
            </p>
            <button
              className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              onClick={() => window.location.reload()}
            >
              Refresh
            </button>
            <p className="mt-4 text-xs text-muted-foreground/70">
              If you have any browser extensions enabled, try disabling them (wallet extensions can
              inject scripts).
            </p>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
