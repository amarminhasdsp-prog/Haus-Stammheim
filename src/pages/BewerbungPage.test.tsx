import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { BewerbungPage } from "./BewerbungPage";

function renderWithRoute(initialPath: string): ReturnType<typeof render> {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <BewerbungPage />
    </MemoryRouter>,
  );
}

describe("BewerbungPage", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("belegt das gewuenschte Zimmer aus dem URL-Parameter vor", () => {
    renderWithRoute("/bewerbung?zimmer=zimmer-2");
    const select = screen.getByLabelText(/Zimmer/i) as HTMLSelectElement;
    expect(select.value).toBe("zimmer-2");
  });

  it("zeigt Validierungsfehler bei leerem Submit", async () => {
    const user = userEvent.setup();
    renderWithRoute("/bewerbung");

    await user.click(screen.getByRole("button", { name: "Bewerbung absenden" }));

    expect(
      await screen.findByText("Bitte geben Sie Ihren Namen an."),
    ).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("sendet das Formular per POST an den Formspree-Endpoint und zeigt die Erfolgsmeldung", async () => {
    const user = userEvent.setup();
    renderWithRoute("/bewerbung");

    await user.type(screen.getByLabelText(/^Name/), "Erika Musterfrau");
    await user.type(screen.getByLabelText(/^Alter/), "28");
    await user.type(screen.getByLabelText(/^Beruf \/ Studium/), "Designerin");
    await user.type(
      screen.getByLabelText(/^Monatliches Einkommen/),
      "2200",
    );
    await user.type(
      screen.getByLabelText(/^E-Mail/),
      "erika@beispiel.de",
    );
    await user.type(screen.getByLabelText(/^Telefon/), "01701234567");
    await user.selectOptions(screen.getByLabelText(/Zimmer/i), "zimmer-1");
    await user.type(
      screen.getByLabelText(/^Gewuenschtes Einzugsdatum/),
      "2026-09-01",
    );
    await user.type(
      screen.getByLabelText(/^Kurze Vorstellung/),
      "Ich bin ordentlich und ruhig.",
    );

    await user.click(screen.getByRole("button", { name: "Bewerbung absenden" }));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    const mockedFetch = fetch as unknown as ReturnType<typeof vi.fn>;
    const firstCall = mockedFetch.mock.calls[0];
    if (!firstCall) throw new Error("fetch wurde nicht aufgerufen");
    const [, requestInit] = firstCall as [string, RequestInit];
    expect(requestInit.method).toBe("POST");
    expect(requestInit.body).toBeInstanceOf(FormData);

    expect(
      await screen.findByRole("heading", { name: "Bewerbung gesendet" }),
    ).toBeInTheDocument();
  });
});
