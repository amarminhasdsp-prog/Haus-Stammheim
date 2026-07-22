import { useState } from "react";
import type { Room } from "../data/rooms";
import { getRoomsByFloor } from "../data/rooms";

interface FloorPlanProps {
  onSelectRoom: (room: Room) => void;
}

type Floor = "eg" | "og";

const VIEWBOX_SIZE = 100;

const FLOOR_LABELS: Record<Floor, string> = {
  eg: "Erdgeschoss",
  og: "Obergeschoss",
};

/** Rein dekorative Gemeinschaftsbereiche pro Etage (kein Hotspot, keine Zimmerdaten). */
interface CommonArea {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const EG_COMMON_AREAS: CommonArea[] = [
  { id: "garage", label: "Garage", x: 5, y: 50, width: 32, height: 12 },
  { id: "flur", label: "Flur", x: 5, y: 64, width: 32, height: 12 },
  { id: "haupteingang", label: "Haupteingang", x: 5, y: 78, width: 32, height: 16 },
  { id: "treppenaufgang", label: "Treppe → OG", x: 70, y: 50, width: 25, height: 12 },
  { id: "aufenthaltsraum", label: "Aufenthaltsraum / Wintergarten", x: 38, y: 64, width: 30, height: 30 },
  { id: "kueche", label: "Kueche", x: 70, y: 64, width: 25, height: 14 },
  { id: "bad-eg", label: "Bad", x: 70, y: 80, width: 25, height: 14 },
];

const OG_COMMON_AREAS: CommonArea[] = [
  { id: "aufenthaltsraum-og", label: "Aufenthaltsraum", x: 5, y: 40, width: 55, height: 30 },
  { id: "bad-og", label: "Grosses Bad (Marmorboden, Glasdusche, Massageduesen, Handtuchheizkoerper)", x: 65, y: 40, width: 30, height: 30 },
  { id: "treppe-og", label: "Treppe → EG", x: 5, y: 74, width: 25, height: 16 },
  { id: "flur-dachgeschoss", label: "Flur → Dachgeschoss", x: 65, y: 74, width: 30, height: 16 },
];

const FLOOR_AREAS: Record<Floor, CommonArea[]> = {
  eg: EG_COMMON_AREAS,
  og: OG_COMMON_AREAS,
};

/**
 * Grundriss mit klickbaren Zimmer-Hotspots, umschaltbar zwischen Erdgeschoss
 * und Obergeschoss.
 *
 * Austauschbarkeit: Die Gemeinschaftsbereiche (CommonArea) sind rein
 * dekorativ/informativ und unabhaengig von den Zimmerdaten in rooms.ts.
 * Sobald ein echtes Grundriss-SVG vorliegt, koennen die <rect>-Flaechen der
 * Gemeinschaftsbereiche durch die echten Formen ersetzt werden - die
 * Hotspot-Logik (Positionen aus room.hotspot in Prozent, Klick/Tastatur,
 * qm+Preis-Label) bleibt unveraendert.
 */
export function FloorPlan({ onSelectRoom }: FloorPlanProps): JSX.Element {
  const [activeFloor, setActiveFloor] = useState<Floor>("eg");
  const [hoveredRoomId, setHoveredRoomId] = useState<string | null>(null);
  const [focusedRoomId, setFocusedRoomId] = useState<string | null>(null);

  const roomsOnFloor = getRoomsByFloor(activeFloor);
  const commonAreas = FLOOR_AREAS[activeFloor];

  return (
    <div className="flex flex-col gap-4">
      <div
        role="tablist"
        aria-label="Etage auswaehlen"
        className="inline-flex w-fit gap-1 rounded-md border border-border bg-surface p-1"
      >
        {(["eg", "og"] as const).map((floor) => {
          const isActive = activeFloor === floor;
          return (
            <button
              key={floor}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveFloor(floor)}
              className={[
                "min-h-11 rounded-sm px-4 text-body-strong transition-colors duration-150 cursor-pointer",
                isActive
                  ? "bg-accent text-white"
                  : "text-text-secondary hover:bg-accent-subtle hover:text-accent",
              ].join(" ")}
            >
              {floor.toUpperCase()} · {FLOOR_LABELS[floor]}
            </button>
          );
        })}
      </div>

      <svg
        viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        role="img"
        aria-label={`Grundriss ${FLOOR_LABELS[activeFloor]} mit ${roomsOnFloor.length} klickbaren Zimmern`}
        className="h-auto w-full rounded-lg border border-border bg-surface"
      >
        {/* Aussenlinien - austauschbar, siehe Kommentar oben */}
        <g aria-hidden="true">
          <rect
            x={2}
            y={2}
            width={VIEWBOX_SIZE - 4}
            height={VIEWBOX_SIZE - 4}
            fill="none"
            stroke="#C9C9C5"
            strokeWidth={0.6}
          />
        </g>

        {/* Gemeinschaftsbereiche - rein informativ, kein Hotspot */}
        <g aria-hidden="true">
          {commonAreas.map((area) => (
            <g key={area.id}>
              <rect
                x={area.x}
                y={area.y}
                width={area.width}
                height={area.height}
                rx={1}
                fill="#FFFFFF"
                stroke="#C9C9C5"
                strokeWidth={0.4}
                strokeDasharray="1.2 1"
              />
              <text
                x={area.x + area.width / 2}
                y={area.y + area.height / 2}
                textAnchor="middle"
                fontSize={2.2}
                fill="#8A8A85"
              >
                <tspan x={area.x + area.width / 2} dy="0">
                  {area.label.length > 22 ? `${area.label.slice(0, 20)}…` : area.label}
                </tspan>
              </text>
            </g>
          ))}
        </g>

        {roomsOnFloor.map((room) => {
          const isHovered = hoveredRoomId === room.id;
          const isFocused = focusedRoomId === room.id;
          const isApartment = room.id === "apartment-eg";
          return (
            <g
              key={room.id}
              role="button"
              tabIndex={0}
              aria-label={`${room.name}, ${room.qm} Quadratmeter, ${room.preisEuro} Euro Pauschalmiete, Status: ${
                room.status === "verfuegbar" ? "verfuegbar" : "vermietet"
              }. Details oeffnen.`}
              onClick={() => onSelectRoom(room)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelectRoom(room);
                }
              }}
              onMouseEnter={() => setHoveredRoomId(room.id)}
              onMouseLeave={() => setHoveredRoomId(null)}
              onFocus={() => setFocusedRoomId(room.id)}
              onBlur={() => setFocusedRoomId(null)}
              className="cursor-pointer outline-none"
            >
              <rect
                x={room.hotspot.x}
                y={room.hotspot.y}
                width={room.hotspot.width}
                height={room.hotspot.height}
                rx={1.2}
                fill={isHovered ? "#E8EFEC" : "transparent"}
                stroke={room.status === "verfuegbar" ? "#2F5D50" : "#8A8A85"}
                strokeWidth={isHovered ? 0.8 : 0.5}
                className="transition-[fill,stroke-width] duration-150 motion-reduce:transition-none"
              />
              {/* Sichtbarer Fokus-Indikator fuer Tastaturnutzer */}
              {isFocused && (
                <rect
                  x={room.hotspot.x - 0.6}
                  y={room.hotspot.y - 0.6}
                  width={room.hotspot.width + 1.2}
                  height={room.hotspot.height + 1.2}
                  rx={1.5}
                  fill="none"
                  stroke="#2F5D50"
                  strokeWidth={1.2}
                  className="pointer-events-none"
                />
              )}
              {/* Treppe/Pfeil-Symbol fuer die eigenstaendige Apartment-Einheit (separater Zugang) */}
              {isApartment && (
                <path
                  d={`M ${room.hotspot.x + room.hotspot.width / 2 - 4} ${room.hotspot.y + 4} l 8 0 l -4 -5 z`}
                  fill="#2F5D50"
                  aria-hidden="true"
                />
              )}
              <text
                x={room.hotspot.x + room.hotspot.width / 2}
                y={room.hotspot.y + room.hotspot.height / 2 - 3}
                textAnchor="middle"
                fontSize={3}
                fontWeight={600}
                fill="#1E1E1C"
              >
                {room.name}
              </text>
              <text
                x={room.hotspot.x + room.hotspot.width / 2}
                y={room.hotspot.y + room.hotspot.height / 2 + 2}
                textAnchor="middle"
                fontSize={2.6}
                fill="#5B5B57"
              >
                {room.qm} m²
              </text>
              <text
                x={room.hotspot.x + room.hotspot.width / 2}
                y={room.hotspot.y + room.hotspot.height / 2 + 6}
                textAnchor="middle"
                fontSize={2.6}
                fontWeight={600}
                fill="#2F5D50"
              >
                {room.preisEuro} €
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
