import type { Room } from "../data/rooms";

const CURRENCY_FORMATTER = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function StatusBadge({ status }: { status: Room["status"] }): JSX.Element {
  const isAvailable = status === "verfuegbar";
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-caption",
        isAvailable ? "bg-accent-subtle text-accent" : "bg-surface text-text-secondary",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "h-1.5 w-1.5 rounded-full",
          isAvailable ? "bg-accent" : "bg-text-secondary",
        ].join(" ")}
      />
      {isAvailable ? "Verfuegbar" : "Vermietet"}
    </span>
  );
}

interface RoomCardProps {
  room: Room;
  onSelect?: (room: Room) => void;
}

export function RoomCard({ room, onSelect }: RoomCardProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(room)}
      className="block w-full text-left rounded-lg border border-border bg-surface-raised shadow-xs transition-[transform,box-shadow] duration-150 hover:shadow-sm hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 cursor-pointer"
    >
      <div className="aspect-[4/3] w-full overflow-hidden rounded-t-lg bg-surface">
        <img
          src={room.bilder[0]?.src}
          alt={room.bilder[0]?.alt ?? `${room.name}, ${room.qm} m²`}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-h4 text-text-primary">{room.name}</h3>
          <StatusBadge status={room.status} />
        </div>
        <p className="text-small text-text-secondary">{room.qm} m²</p>
        <p className="text-body-strong text-accent">
          {CURRENCY_FORMATTER.format(room.preisEuro)} / Monat
        </p>
        <p className="text-small text-text-secondary">{room.kurzbeschreibung}</p>
      </div>
    </button>
  );
}
