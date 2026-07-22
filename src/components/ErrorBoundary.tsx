import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Feature-Error-Boundary. Faengt Rendering-Fehler in Kind-Komponenten ab
 * und zeigt einen ruhigen Fallback statt eines weissen Bildschirms.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("Unerwarteter Fehler in der Anwendung:", error, info);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center gap-4 px-6 text-center"
        >
          <h1 className="text-h3 text-text-primary">Etwas ist schiefgelaufen</h1>
          <p className="text-body text-text-secondary">
            Diese Seite konnte nicht geladen werden. Bitte laden Sie die Seite
            neu oder versuchen Sie es spaeter erneut.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="min-h-11 rounded-md bg-accent px-6 text-body-strong text-white transition-colors duration-150 hover:bg-accent-hover cursor-pointer"
          >
            Seite neu laden
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
