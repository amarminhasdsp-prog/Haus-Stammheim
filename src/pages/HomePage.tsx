import { Link } from "react-router-dom";
import { rooms } from "../data/rooms";
import { RoomCard } from "../components/RoomCard";

const HAUS_FAKTEN = [
  { label: "Lage", value: "Ruhige Seitenstrasse, 5 Min. zur U-Bahn" },
  { label: "Zimmer", value: "5 Zimmer, 3 davon aktuell verfuegbar" },
  { label: "Ausstattung", value: "Vollausgestattete Kueche, Waschmaschine im Haus" },
  { label: "Nebenkosten", value: "In der Kaltmiete teilweise inkludiert (siehe Bewerbung)" },
];

export function HomePage(): JSX.Element {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-[2rem] font-bold leading-tight text-text-primary sm:text-h1">
            WG-Zimmer in ruhiger Lage
          </h1>
          <p className="mt-4 text-body text-text-secondary">
            Fuenf Zimmer, ein Haus, kurze Wege. Finden Sie Ihr neues Zimmer und
            bewerben Sie sich in wenigen Minuten online.
          </p>
          <Link
            to="/grundriss"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-6 text-body-strong text-white transition-colors duration-150 hover:bg-accent-hover cursor-pointer"
          >
            Zimmer ansehen
          </Link>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-h2 text-text-primary">Ueber das Haus</h2>
          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            {HAUS_FAKTEN.map((fakt) => (
              <div key={fakt.label} className="flex gap-3 rounded-lg border border-border bg-surface-raised p-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <dt className="text-body-strong text-text-primary">{fakt.label}</dt>
                  <dd className="mt-0.5 text-small text-text-secondary">{fakt.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-h2 text-text-primary">Verfuegbare Zimmer</h2>
          <Link
            to="/grundriss"
            className="hidden text-body-strong text-accent transition-colors duration-150 hover:text-accent-hover sm:inline cursor-pointer"
          >
            Alle Zimmer &amp; Grundriss →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} as="link" />
          ))}
        </div>
        <Link
          to="/grundriss"
          className="mt-6 inline-flex text-body-strong text-accent transition-colors duration-150 hover:text-accent-hover sm:hidden cursor-pointer"
        >
          Alle Zimmer &amp; Grundriss →
        </Link>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <p className="text-h4 text-text-primary">
            Seit mehreren Jahren vermieten wir zuverlaessig an Studierende und
            Berufstaetige.
          </p>
          <p className="mt-2 text-small text-text-muted">
            (Platzhalter-Text — bitte durch echte Angaben ersetzen)
          </p>
          <Link
            to="/bewerbung"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-6 text-body-strong text-white transition-colors duration-150 hover:bg-accent-hover cursor-pointer"
          >
            Jetzt bewerben
          </Link>
        </div>
      </section>
    </>
  );
}
