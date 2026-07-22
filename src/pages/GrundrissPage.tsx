import { useState } from "react";
import { rooms, type Room } from "../data/rooms";
import { FloorPlan } from "../components/FloorPlan";
import { RoomDetailModal } from "../components/RoomDetailModal";
import { RoomCard } from "../components/RoomCard";

export function GrundrissPage(): JSX.Element {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-h1 text-text-primary">Grundriss &amp; Zimmer</h1>
      <p className="mt-3 max-w-2xl text-body text-text-secondary">
        Waehlen Sie oben die Etage (EG oder OG) und klicken Sie auf ein
        Zimmer im Grundriss, um Groesse, Preis und Ausstattung zu sehen.
        Auf kleinen Bildschirmen finden Sie unten zusaetzlich alle Zimmer
        als Liste.
      </p>

      <div className="mt-10">
        <FloorPlan onSelectRoom={setSelectedRoom} />
      </div>

      <h2 className="mt-16 text-h2 text-text-primary">Alle Zimmer</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} onSelect={setSelectedRoom} as="button" />
        ))}
      </div>

      <RoomDetailModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
    </div>
  );
}
