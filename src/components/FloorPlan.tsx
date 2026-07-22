import { useState } from "react";
import type { Room } from "../data/rooms";
import { getRoomsByFloor } from "../data/rooms";

interface FloorPlanProps {
  onSelectRoom: (room: Room) => void;
}

type Floor = "eg" | "og";

const FLOOR_LABELS: Record<Floor, string> = {
  eg: "Erdgeschoss",
  og: "Obergeschoss",
};

/**
 * Interaktiver Grundriss basierend auf der handgezeichneten Skizze.
 * EG: Garage oben, Zimmer 1 (links gross), Zimmer 2 (mitte), Wintergarten + Apartment (rechts),
 *     unten: Treppenaufgang, Flur, Aufenthaltsraum, Kueche, Bad
 * OG: Zimmer 3 (links klein), Zimmer 4 (rechts), Aufenthaltsraum (gross mitte/links),
 *     Grosses Bad (rechts), Flur zum Dachgeschoss
 */
export function FloorPlan({ onSelectRoom }: FloorPlanProps): JSX.Element {
  const [activeFloor, setActiveFloor] = useState<Floor>("eg");
  const [hoveredRoomId, setHoveredRoomId] = useState<string | null>(null);
  const [focusedRoomId, setFocusedRoomId] = useState<string | null>(null);

  const roomsOnFloor = getRoomsByFloor(activeFloor);

  return (
    <div className="flex flex-col gap-4">
      {/* Etagen-Toggle */}
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
                "min-h-11 rounded-sm px-4 text-sm font-semibold transition-colors duration-150 cursor-pointer",
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

      {/* SVG Grundriss */}
      <svg
        viewBox="0 0 600 450"
        role="img"
        aria-label={`Grundriss ${FLOOR_LABELS[activeFloor]} mit ${roomsOnFloor.length} klickbaren Zimmern`}
        className="h-auto w-full rounded-lg border border-border bg-white"
        style={{ maxHeight: "600px" }}
      >
        {activeFloor === "eg" ? <EGFloorPlan /> : <OGFloorPlan />}

        {/* Klickbare Zimmer-Hotspots */}
        {roomsOnFloor.map((room) => {
          const isHovered = hoveredRoomId === room.id;
          const isFocused = focusedRoomId === room.id;
          const pos = ROOM_POSITIONS[room.id];
          if (!pos) return null;

          return (
            <g
              key={room.id}
              role="button"
              tabIndex={0}
              aria-label={`${room.name}, ${room.qm} Quadratmeter, ${room.preisEuro} Euro Pauschalmiete. Details oeffnen.`}
              onClick={() => onSelectRoom(room)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
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
                x={pos.x}
                y={pos.y}
                width={pos.w}
                height={pos.h}
                rx={4}
                fill={isHovered ? "#E8EFEC" : "#F7F7F5"}
                stroke={isFocused ? "#2F5D50" : "#2F5D50"}
                strokeWidth={isFocused ? 3 : 1.5}
              />
              <text
                x={pos.x + pos.w / 2}
                y={pos.y + pos.h / 2 - 20}
                textAnchor="middle"
                fontSize={16}
                fontWeight={700}
                fill="#1E1E1C"
              >
                {room.name}
              </text>
              <text
                x={pos.x + pos.w / 2}
                y={pos.y + pos.h / 2 + 5}
                textAnchor="middle"
                fontSize={14}
                fill="#5B5B57"
              >
                {room.qm} m²
              </text>
              <text
                x={pos.x + pos.w / 2}
                y={pos.y + pos.h / 2 + 28}
                textAnchor="middle"
                fontSize={15}
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

/* ========== Zimmer-Positionen (pixelgenau, passend zur Skizze) ========== */

const ROOM_POSITIONS: Record<string, { x: number; y: number; w: number; h: number }> = {
  // EG
  "zimmer-1": { x: 20, y: 60, w: 200, h: 180 },
  "zimmer-2": { x: 230, y: 60, w: 150, h: 180 },
  "apartment-eg": { x: 430, y: 60, w: 150, h: 180 },
  // OG
  "zimmer-3": { x: 20, y: 30, w: 170, h: 140 },
  "zimmer-4": { x: 350, y: 30, w: 230, h: 140 },
};

/* ========== EG Grundriss (dekorative Waende/Bereiche) ========== */

function EGFloorPlan() {
  return (
    <g aria-hidden="true">
      {/* Aussenwand */}
      <rect x={10} y={10} width={580} height={430} fill="none" stroke="#1E1E1C" strokeWidth={3} rx={2} />

      {/* Trennlinie oben: Garage */}
      <rect x={200} y={12} width={200} height={42} fill="#F7F7F5" stroke="#C9C9C5" strokeWidth={1} />
      <text x={300} y={38} textAnchor="middle" fontSize={13} fill="#8A8A85">Garage</text>

      {/* Trennlinie: obere Zimmer vs untere Bereiche */}
      <line x1={10} y1={250} x2={590} y2={250} stroke="#1E1E1C" strokeWidth={2} />

      {/* Wintergarten-Bereich (zwischen Zimmer 2 und Apartment) */}
      <rect x={390} y={60} width={35} height={180} fill="#F7F7F5" stroke="#C9C9C5" strokeWidth={1} strokeDasharray="4 2" />
      <text x={407} y={155} textAnchor="middle" fontSize={9} fill="#8A8A85" transform="rotate(-90, 407, 155)">Wintergarten</text>

      {/* Pfeil zum Apartment (Treppe rechts) */}
      <text x={505} y={50} textAnchor="middle" fontSize={10} fill="#2F5D50">↑ Treppe</text>

      {/* Untere Bereiche */}
      {/* Treppenaufgang links */}
      <rect x={15} y={255} width={140} height={80} fill="#F7F7F5" stroke="#C9C9C5" strokeWidth={1} strokeDasharray="4 2" />
      <text x={85} y={300} textAnchor="middle" fontSize={11} fill="#8A8A85">Treppenaufgang</text>
      <text x={85} y={316} textAnchor="middle" fontSize={10} fill="#8A8A85">zum 1. OG</text>

      {/* Flur */}
      <rect x={15} y={340} width={140} height={90} fill="#F7F7F5" stroke="#C9C9C5" strokeWidth={1} strokeDasharray="4 2" />
      <text x={85} y={385} textAnchor="middle" fontSize={11} fill="#8A8A85">Flur</text>
      <text x={85} y={420} textAnchor="middle" fontSize={10} fill="#8A8A85">Haupteingang</text>

      {/* Aufenthaltsraum */}
      <rect x={160} y={255} width={230} height={175} fill="#F7F7F5" stroke="#C9C9C5" strokeWidth={1} strokeDasharray="4 2" />
      <text x={275} y={345} textAnchor="middle" fontSize={12} fill="#8A8A85">Aufenthaltsraum</text>

      {/* Kueche */}
      <rect x={395} y={255} width={190} height={85} fill="#F7F7F5" stroke="#C9C9C5" strokeWidth={1} strokeDasharray="4 2" />
      <text x={490} y={302} textAnchor="middle" fontSize={12} fill="#8A8A85">Küche</text>

      {/* Bad EG */}
      <rect x={395} y={345} width={190} height={85} fill="#F7F7F5" stroke="#C9C9C5" strokeWidth={1} strokeDasharray="4 2" />
      <text x={490} y={392} textAnchor="middle" fontSize={12} fill="#8A8A85">Bad</text>

      {/* Vertikale Trennlinien */}
      <line x1={220} y1={60} x2={220} y2={250} stroke="#1E1E1C" strokeWidth={1.5} />
      <line x1={380} y1={60} x2={380} y2={250} stroke="#1E1E1C" strokeWidth={1.5} />
      <line x1={425} y1={60} x2={425} y2={250} stroke="#1E1E1C" strokeWidth={1.5} />
    </g>
  );
}

/* ========== OG Grundriss ========== */

function OGFloorPlan() {
  return (
    <g aria-hidden="true">
      {/* Aussenwand */}
      <rect x={10} y={10} width={580} height={430} fill="none" stroke="#1E1E1C" strokeWidth={3} rx={2} />

      {/* Trennlinie: Zimmer vs Rest */}
      <line x1={10} y1={180} x2={590} y2={180} stroke="#1E1E1C" strokeWidth={2} />

      {/* Vertikale Trennung Zimmer */}
      <line x1={200} y1={12} x2={200} y2={180} stroke="#1E1E1C" strokeWidth={1.5} />
      <line x1={340} y1={12} x2={340} y2={180} stroke="#1E1E1C" strokeWidth={1.5} />

      {/* Aufenthaltsraum (gross, mitte/links) */}
      <rect x={15} y={185} width={320} height={200} fill="#F7F7F5" stroke="#C9C9C5" strokeWidth={1} strokeDasharray="4 2" />
      <text x={175} y={290} textAnchor="middle" fontSize={14} fill="#8A8A85">Aufenthaltsraum</text>

      {/* Grosses Bad (rechts) */}
      <rect x={340} y={185} width={245} height={200} fill="#F7F7F5" stroke="#C9C9C5" strokeWidth={1} strokeDasharray="4 2" />
      <text x={462} y={280} textAnchor="middle" fontSize={13} fill="#8A8A85">Großes Bad</text>
      <text x={462} y={298} textAnchor="middle" fontSize={10} fill="#8A8A85">(Marmor, Glasdusche,</text>
      <text x={462} y={312} textAnchor="middle" fontSize={10} fill="#8A8A85">Massagedüsen)</text>

      {/* Treppe unten links */}
      <rect x={15} y={390} width={160} height={45} fill="#F7F7F5" stroke="#C9C9C5" strokeWidth={1} strokeDasharray="4 2" />
      <text x={95} y={418} textAnchor="middle" fontSize={11} fill="#8A8A85">Treppe ↓ EG</text>

      {/* Flur zum Dachgeschoss */}
      <rect x={340} y={390} width={245} height={45} fill="#F7F7F5" stroke="#C9C9C5" strokeWidth={1} strokeDasharray="4 2" />
      <text x={462} y={418} textAnchor="middle" fontSize={11} fill="#8A8A85">Flur → Dachgeschoss</text>
    </g>
  );
}
