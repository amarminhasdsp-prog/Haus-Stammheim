import { useNavigate } from "react-router-dom";
import type { Room } from "../data/rooms";
import { Modal } from "./Modal";

const CURRENCY = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

interface RoomDetailModalProps {
  room: Room | null;
  onClose: () => void;
}

export function RoomDetailModal({ room, onClose }: RoomDetailModalProps): JSX.Element | null {
  const navigate = useNavigate();

  if (!room) return null;

  function handleApply(): void {
    onClose();
    navigate(`/bewerbung?zimmer=${room!.id}`);
  }

  return (
    <Modal isOpen={Boolean(room)} onClose={onClose} title={room.name}>
      <div className="flex flex-col gap-8">

        {/* Bildergalerie */}
        <div className={room.bilder.length === 1 ? "" : "grid grid-cols-1 gap-3 sm:grid-cols-2"}>
          {room.bilder.map((bild) => (
            <img
              key={bild.src}
              src={bild.src}
              alt={bild.alt}
              loading="lazy"
              className={`w-full rounded-lg object-cover ${room.bilder.length === 1 ? "aspect-[16/9] max-h-[400px]" : "aspect-[4/3]"}`}
            />
          ))}
        </div>

        {/* Kopfzeile: Preis + Status + Verfuegbarkeit */}
        <div className="flex flex-col gap-3 rounded-lg bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-2xl font-bold text-accent">
              {CURRENCY.format(room.preisEuro)} <span className="text-base font-normal text-text-secondary">/ Monat</span>
            </p>
            <p className="mt-1 text-sm text-text-secondary">{room.mietart}</p>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" aria-hidden="true" />
              <span className="font-medium text-text-primary">Verfügbar ab: {room.verfuegbarAb}</span>
            </span>
            <span className="text-text-secondary">{room.qm} m² · {room.etageLabel}</span>
          </div>
        </div>

        {/* Beschreibung */}
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Beschreibung</h3>
          <p className="mt-2 leading-relaxed text-text-secondary">{room.beschreibung}</p>
        </div>

        {/* Inklusive in der Pauschalmiete */}
        <div>
          <h3 className="text-lg font-semibold text-text-primary">In der Pauschalmiete enthalten</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {room.inklusivLeistungen.map((item) => (
              <span
                key={item}
                className="rounded-full bg-accent-subtle px-3 py-1 text-sm font-medium text-accent"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Zimmer-Ausstattung */}
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Zimmer-Ausstattung</h3>
          <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {room.ausstattung.map((punkt) => (
              <li key={punkt} className="flex items-start gap-2 text-text-secondary">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{punkt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Gemeinschaftsbereiche */}
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Gemeinschaftlich genutzt</h3>
          <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {room.gemeinschaft.map((punkt) => (
              <li key={punkt} className="flex items-start gap-2 text-text-secondary">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-text-muted">
                  <path d="M3 12h18M12 3v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span>{punkt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row">
          <button
            type="button"
            onClick={handleApply}
            disabled={room.status === "vermietet"}
            className="min-h-12 flex-1 rounded-md bg-accent px-6 text-base font-semibold text-white transition-colors duration-150 hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-border-strong disabled:text-text-muted cursor-pointer"
          >
            {room.status === "vermietet" ? "Bereits vermietet" : "Jetzt bewerben"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="min-h-12 rounded-md border border-border-strong px-6 text-base font-medium text-text-primary transition-colors duration-150 hover:border-accent hover:text-accent cursor-pointer"
          >
            Schliessen
          </button>
        </div>
      </div>
    </Modal>
  );
}
