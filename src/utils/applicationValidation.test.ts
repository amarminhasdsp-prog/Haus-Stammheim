import { describe, it, expect } from "vitest";
import {
  validateApplicationForm,
  validateFile,
  MAX_FILE_SIZE_BYTES,
  MAX_UEBER_MICH_LENGTH,
  type ApplicationFormValues,
} from "./applicationValidation";

function buildValidValues(): ApplicationFormValues {
  return {
    name: "Max Mustermann",
    alter: "25",
    berufOderStudium: "Softwareentwickler",
    einkommen: "2500",
    einzugsdatum: "2026-09-01",
    ueberMich: "Ich bin ruhig, ordentlich und freue mich auf die WG.",
    email: "max@beispiel.de",
    telefon: "+49 170 1234567",
    gewuenschtesZimmer: "zimmer-1",
  };
}

describe("validateApplicationForm", () => {
  it("liefert keine Fehler bei vollstaendig gueltigen Werten", () => {
    const errors = validateApplicationForm(buildValidValues());
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it("meldet fehlenden Namen", () => {
    const errors = validateApplicationForm({ ...buildValidValues(), name: "  " });
    expect(errors.name).toBeDefined();
  });

  it.each(["abc", "5", "150", ""])("meldet ungueltiges Alter: %s", (alter) => {
    const errors = validateApplicationForm({ ...buildValidValues(), alter });
    expect(errors.alter).toBeDefined();
  });

  it("akzeptiert gueltiges Alter am unteren Rand", () => {
    const errors = validateApplicationForm({ ...buildValidValues(), alter: "16" });
    expect(errors.alter).toBeUndefined();
  });

  it.each(["keine-email", "max@", "max@beispiel", ""])(
    "meldet ungueltige E-Mail: %s",
    (email) => {
      const errors = validateApplicationForm({ ...buildValidValues(), email });
      expect(errors.email).toBeDefined();
    },
  );

  it.each(["abc", "12", ""])("meldet ungueltige Telefonnummer: %s", (telefon) => {
    const errors = validateApplicationForm({ ...buildValidValues(), telefon });
    expect(errors.telefon).toBeDefined();
  });

  it("akzeptiert gueltige Telefonnummer mit Sonderzeichen", () => {
    const errors = validateApplicationForm({
      ...buildValidValues(),
      telefon: "+49 (30) 123-4567",
    });
    expect(errors.telefon).toBeUndefined();
  });

  it("meldet zu langen Ueber-mich-Text", () => {
    const errors = validateApplicationForm({
      ...buildValidValues(),
      ueberMich: "a".repeat(MAX_UEBER_MICH_LENGTH + 1),
    });
    expect(errors.ueberMich).toBeDefined();
  });

  it("meldet fehlendes gewuenschtes Zimmer", () => {
    const errors = validateApplicationForm({ ...buildValidValues(), gewuenschtesZimmer: "" });
    expect(errors.gewuenschtesZimmer).toBeDefined();
  });

  it("meldet negatives Einkommen", () => {
    const errors = validateApplicationForm({ ...buildValidValues(), einkommen: "-100" });
    expect(errors.einkommen).toBeDefined();
  });
});

describe("validateFile", () => {
  it("akzeptiert Dateien innerhalb des Limits", () => {
    const file = new File(["x"], "test.pdf", { type: "application/pdf" });
    Object.defineProperty(file, "size", { value: MAX_FILE_SIZE_BYTES - 1 });
    expect(validateFile(file)).toBeNull();
  });

  it("lehnt Dateien ueber dem Limit ab", () => {
    const file = new File(["x"], "test.pdf", { type: "application/pdf" });
    Object.defineProperty(file, "size", { value: MAX_FILE_SIZE_BYTES + 1 });
    expect(validateFile(file)).toContain("zu gross");
  });
});
