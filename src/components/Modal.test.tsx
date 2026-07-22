import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./Modal";

describe("Modal", () => {
  it("rendert nichts, wenn isOpen false ist", () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Test">
        Inhalt
      </Modal>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("rendert den Dialog mit Titel, wenn isOpen true ist", () => {
    render(
      <Modal isOpen onClose={vi.fn()} title="Zimmer 1">
        Inhalt
      </Modal>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Zimmer 1" })).toBeInTheDocument();
  });

  it("ruft onClose bei Escape auf", () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Zimmer 1">
        Inhalt
      </Modal>,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("ruft onClose beim Klick auf den Schliessen-Button auf", () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Zimmer 1">
        Inhalt
      </Modal>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Dialog schliessen" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("setzt aria-hidden auf das App-Root waehrend das Modal offen ist", () => {
    const root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);

    const { unmount } = render(
      <Modal isOpen onClose={vi.fn()} title="Zimmer 1">
        Inhalt
      </Modal>,
    );

    expect(root.getAttribute("aria-hidden")).toBe("true");
    unmount();
    expect(root.getAttribute("aria-hidden")).toBeNull();
    root.remove();
  });
});
