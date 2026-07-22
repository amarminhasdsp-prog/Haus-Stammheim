import { Link } from "react-router-dom";

export function Footer(): JSX.Element {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:grid-cols-3">
        <div>
          <h2 className="text-h4 text-text-primary">Kontakt</h2>
          <address className="mt-3 text-small text-text-secondary not-italic">
            WG am Stadtpark
            <br />
            Musterstrasse 12
            <br />
            10115 Berlin
            <br />
            <a
              href="mailto:kontakt@wg-am-stadtpark.example"
              className="cursor-pointer text-accent transition-colors duration-150 hover:text-accent-hover"
            >
              kontakt@wg-am-stadtpark.example
            </a>
          </address>
        </div>

        <nav aria-label="Footer-Navigation">
          <h2 className="text-h4 text-text-primary">Navigation</h2>
          <ul className="mt-3 flex flex-col gap-2 text-small">
            <li>
              <Link
                to="/grundriss"
                className="cursor-pointer text-text-secondary transition-colors duration-150 hover:text-accent"
              >
                Zimmer &amp; Grundriss
              </Link>
            </li>
            <li>
              <Link
                to="/bewerbung"
                className="cursor-pointer text-text-secondary transition-colors duration-150 hover:text-accent"
              >
                Bewerbung
              </Link>
            </li>
            <li>
              <Link
                to="/impressum"
                className="cursor-pointer text-text-secondary transition-colors duration-150 hover:text-accent"
              >
                Impressum
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-h4 text-text-primary">Hinweis</h2>
          <p className="mt-3 text-small text-text-secondary">
            Wir melden uns in der Regel innerhalb von 2-3 Werktagen auf
            eingegangene Bewerbungen.
          </p>
        </div>
      </div>
    </footer>
  );
}
