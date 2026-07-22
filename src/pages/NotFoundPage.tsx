import { Link } from "react-router-dom";

export function NotFoundPage(): JSX.Element {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
      <h1 className="text-h1 text-text-primary">Seite nicht gefunden</h1>
      <p className="text-body text-text-secondary">
        Die aufgerufene Seite existiert nicht oder wurde verschoben.
      </p>
      <Link
        to="/"
        className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-6 text-body-strong text-white transition-colors duration-150 hover:bg-accent-hover cursor-pointer"
      >
        Zur Startseite
      </Link>
    </div>
  );
}
