import { useState } from "react";
import { Link } from "react-router-dom";
import { rooms } from "../data/rooms";
import type { Room } from "../data/rooms";
import { RoomCard } from "../components/RoomCard";
import { RoomDetailModal } from "../components/RoomDetailModal";

const ICONS: Record<string, JSX.Element> = {
  tram: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-accent" aria-hidden="true">
      <path d="M4 11V8a8 8 0 0116 0v3M4 11v7a2 2 0 002 2h12a2 2 0 002-2v-7M4 11h16M8 15h.01M16 15h.01M9 20v2M15 20v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  bus: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-accent" aria-hidden="true">
      <path d="M5 10V7a7 7 0 0114 0v3M5 10v7a2 2 0 002 2h10a2 2 0 002-2v-7M5 10h14M7.5 14h.01M16.5 14h.01M8 19v2M16 19v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  shop: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-accent" aria-hidden="true">
      <path d="M3 3h18v4H3V3zM5 7v12a2 2 0 002 2h10a2 2 0 002-2V7M10 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  health: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-accent" aria-hidden="true">
      <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  nature: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-accent" aria-hidden="true">
      <path d="M12 3L4 14h5v7h6v-7h5L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  city: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-accent" aria-hidden="true">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h2M13 9h2M9 13h2M13 13h2M9 17h2M13 17h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

function LageKarte({ titel, beschreibung, icon }: { titel: string; beschreibung: string; icon: string }) {
  return (
    <div className="flex gap-3 rounded-lg border border-border bg-surface-raised p-4">
      <div className="shrink-0">{ICONS[icon]}</div>
      <div>
        <h3 className="font-semibold text-text-primary">{titel}</h3>
        <p className="mt-1 text-sm text-text-secondary">{beschreibung}</p>
      </div>
    </div>
  );
}

const HAUS_FAKTEN = [
  { label: "Lage", value: "Stuttgart-Stammheim, ruhige Wohngegend" },
  { label: "ÖPNV", value: "Stadtbahn U15 in 5 Min. (direkt zum Hauptbahnhof in 20 Min.)" },
  { label: "Zimmer", value: "5 Einheiten (3 WG-Zimmer + 1 Apartment), alle verfuegbar" },
  { label: "Pauschalmiete", value: "Alle Nebenkosten inklusive (Strom, Wasser, Heizung, WLAN, GEZ)" },
];

export function HomePage(): JSX.Element {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  return (
    <>
      <RoomDetailModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-[2rem] font-bold leading-tight text-text-primary sm:text-h1">
            WG-Zimmer in Stuttgart-Stammheim
          </h1>
          <p className="mt-4 text-body text-text-secondary">
            Fünf Einheiten, ein Haus, Pauschalmiete — alle Nebenkosten inklusive.
            Stadtbahn U15 in 5 Minuten, Hauptbahnhof in 20 Minuten.
          </p>
          <a
            href="#zimmer"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-6 text-body-strong text-white transition-colors duration-150 hover:bg-accent-hover cursor-pointer"
          >
            Zimmer ansehen
          </a>
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

      <section id="zimmer" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-h2 text-text-primary">Verfuegbare Zimmer</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} onSelect={setSelectedRoom} />
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-h2 text-text-primary">Lage &amp; Umgebung</h2>
          <p className="mt-2 text-text-secondary">Stuttgart-Stammheim — ruhig wohnen, schnell in der Stadt.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <LageKarte
              titel="Stadtbahn U15"
              beschreibung="Haltestelle Stammheim in 5 Gehminuten. Direkte Verbindung zum Hauptbahnhof Stuttgart (ca. 20 Min.), Takt alle 10 Minuten."
              icon="tram"
            />
            <LageKarte
              titel="Bus 50 / 52"
              beschreibung="Busverbindungen nach Zuffenhausen, Kornwestheim und zu weiteren S-Bahn-Anschlüssen in der Umgebung."
              icon="bus"
            />
            <LageKarte
              titel="Einkaufen"
              beschreibung="Aldi, Edeka und Bäckereien in wenigen Minuten erreichbar. Alles für den täglichen Bedarf vor Ort."
              icon="shop"
            />
            <LageKarte
              titel="Apotheke & Ärzte"
              beschreibung="Freihof-Apotheke Stammheim und Hausärzte direkt im Stadtteil."
              icon="health"
            />
            <LageKarte
              titel="Naherholung"
              beschreibung="Grüne, ruhige Wohngegend mit Parks. Stammheimer Höhe und Grünanlagen direkt um die Ecke."
              icon="nature"
            />
            <LageKarte
              titel="Stuttgart City"
              beschreibung="Innenstadt, Uni Stuttgart und Hochschulen in 20–30 Minuten per Stadtbahn erreichbar."
              icon="city"
            />
          </div>
          {/* Google Maps Karte */}
          <div className="mt-8 overflow-hidden rounded-lg border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2623.5!2d9.195!3d48.8425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799db5b3b0a9c9d%3A0x3a1234567890!2sStammheim%2C+Stuttgart!5e0!3m2!1sde!2sde!4v1"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Standort der WG in Stuttgart-Stammheim auf Google Maps"
              className="w-full"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <p className="text-h4 text-text-primary">
            Alle Zimmer sofort verfügbar — Pauschalmiete, keine versteckten Kosten.
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
