import { useNavigate } from "react-router-dom";
import type { Room } from "../data/rooms";
import { Modal } from "./Modal";
import { StatusBadge } from "./RoomCard";

const CURRENCY_FORMATTER = new Intl.NumberFormat("de-DE", {
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

  const currentRoom = room;

  function handleApply(): void {
    onClose();
    navigate(`/bewerbung?zimmer=${currentRoom.id}`);
  }

  return (
    <Modal isOpen={Boolean(room)} onClose={onClose} title={room.name}>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {room.bilder.map((bild) => (
            <img
              key={bild.src}
              src={bild.src}
              alt={bild.alt}
              loading="lazy"
              width={800}
              height={600}
              className="aspect-[4/3] w-full rounded-md object-cover"
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <StatusBadge status={room.status} />
          <p className="text-small text-text-secondary">{room.qm} m²</p>
          <p className="text-body-strong text-accent">
            {CURRENCY_FORMATTER.format(room.preisEuro)} / Monat
          </p>
        </div>

        <div>
          <h3 className="text-h4 text-text-primary">Ausstattung</h3>
          <ul className="mt-2 flex flex-col gap-1.5 text-body text-text-secondary">
            {room.ausstattung.map((punkt) => (
              <li key={punkt} className="flex items-start gap-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="mt-1 h-4 w-4 shrink-0 text-accent"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{punkt}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={handleApply}
          disabled={room.status === "vermietet"}
          className="min-h-11 w-full rounded-md bg-accent px-6 text-body-strong text-white transition-colors duration-150 hover:bg-accent-hover disabled:cursor-not-allowed disabled:bg-border-strong disabled:text-text-muted sm:w-auto cursor-pointer disabled:cursor-not-allowed"
        >
          {room.status === "vermietet"
            ? "Bereits vermietet"
            : "Fuer dieses Zimmer bewerben"}
        </button>
      </div>
    </Modal>
  );
}
