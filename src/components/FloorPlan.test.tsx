import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FloorPlan } from "./FloorPlan";
import { rooms, getRoomsByFloor } from "../data/rooms";

describe("FloorPlan", () => {
  it("rendert einen Hotspot je EG-Zimmer initial (EG ist Standard-Tab)", () => {
    render(<FloorPlan onSelectRoom={vi.fn()} />);
    for (const room of getRoomsByFloor("eg")) {
      expect(
        screen.getByRole("button", { name: new RegExp(room.name) }),
      ).toBeInTheDocument();
    }
  });

  it("zeigt OG-Zimmer erst nach Wechsel auf den OG-Tab", async () => {
    const user = userEvent.setup();
    render(<FloorPlan onSelectRoom={vi.fn()} />);

    const ogRooms = getRoomsByFloor("og");
    const firstOgRoom = ogRooms[0];
    if (!firstOgRoom) throw new Error("Testdaten unvollstaendig: kein OG-Zimmer gefunden");

    expect(
      screen.queryByRole("button", { name: new RegExp(firstOgRoom.name) }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: /OG/ }));

    for (const room of ogRooms) {
      expect(
        screen.getByRole("button", { name: new RegExp(room.name) }),
      ).toBeInTheDocument();
    }
  });

  it("zeigt insgesamt alle 5 Zimmer ueber beide Etagen verteilt", () => {
    expect(rooms).toHaveLength(5);
    expect(getRoomsByFloor("eg")).toHaveLength(3);
    expect(getRoomsByFloor("og")).toHaveLength(2);
  });

  it("ruft onSelectRoom bei Klick auf einen Hotspot auf", async () => {
    const onSelectRoom = vi.fn();
    const user = userEvent.setup();
    render(<FloorPlan onSelectRoom={onSelectRoom} />);

    const firstRoom = getRoomsByFloor("eg")[0];
    if (!firstRoom) throw new Error("Testdaten unvollstaendig: kein EG-Zimmer gefunden");

    await user.click(screen.getByRole("button", { name: new RegExp(firstRoom.name) }));

    expect(onSelectRoom).toHaveBeenCalledWith(firstRoom);
  });

  it("ruft onSelectRoom bei Enter auf einem fokussierten Hotspot auf", async () => {
    const onSelectRoom = vi.fn();
    const user = userEvent.setup();
    render(<FloorPlan onSelectRoom={onSelectRoom} />);

    const secondRoom = getRoomsByFloor("eg")[1];
    if (!secondRoom) throw new Error("Testdaten unvollstaendig: kein zweites EG-Zimmer gefunden");

    const hotspot = screen.getByRole("button", { name: new RegExp(secondRoom.name) });
    act(() => {
      hotspot.focus();
    });
    await user.keyboard("{Enter}");

    expect(onSelectRoom).toHaveBeenCalledWith(secondRoom);
  });
});
