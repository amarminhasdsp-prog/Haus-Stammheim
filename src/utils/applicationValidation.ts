/**
 * Validierungslogik fuer das Bewerbungsformular.
 * Reine Funktionen, unabhaengig von React, damit sie einfach testbar sind.
 */

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
export const MAX_UEBER_MICH_LENGTH = 500;
export const MIN_ALTER = 16;
export const MAX_ALTER = 99;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Erlaubt deutsche/internationale Telefonnummern mit optionalem +, Ziffern,
// Leerzeichen, Bindestrichen und Klammern, mindestens 6 Ziffern insgesamt.
const PHONE_PATTERN = /^\+?[0-9\s\-()]{6,20}$/;

export interface ApplicationFormValues {
  name: string;
  alter: string;
  berufOderStudium: string;
  einkommen: string;
  einzugsdatum: string;
  ueberMich: string;
  email: string;
  telefon: string;
  gewuenschtesZimmer: string;
}

export type ApplicationFormErrors = Partial<Record<keyof ApplicationFormValues, string>>;

export function validateApplicationForm(
  values: ApplicationFormValues,
): ApplicationFormErrors {
  const errors: ApplicationFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Bitte geben Sie Ihren Namen an.";
  }

  if (!values.alter.trim()) {
    errors.alter = "Bitte geben Sie Ihr Alter an.";
  } else {
    const alterNumber = Number(values.alter);
    if (!Number.isInteger(alterNumber) || Number.isNaN(alterNumber)) {
      errors.alter = "Bitte geben Sie eine gueltige Zahl ein.";
    } else if (alterNumber < MIN_ALTER || alterNumber > MAX_ALTER) {
      errors.alter = `Das Alter muss zwischen ${MIN_ALTER} und ${MAX_ALTER} liegen.`;
    }
  }

  if (!values.berufOderStudium.trim()) {
    errors.berufOderStudium = "Bitte geben Sie Ihren Beruf oder Studiengang an.";
  }

  if (!values.einkommen.trim()) {
    errors.einkommen = "Bitte geben Sie Ihr monatliches Einkommen an.";
  } else if (Number.isNaN(Number(values.einkommen)) || Number(values.einkommen) < 0) {
    errors.einkommen = "Bitte geben Sie einen gueltigen Betrag ein.";
  }

  if (!values.einzugsdatum.trim()) {
    errors.einzugsdatum = "Bitte geben Sie Ihr gewuenschtes Einzugsdatum an.";
  }

  if (!values.ueberMich.trim()) {
    errors.ueberMich = "Bitte schreiben Sie ein paar Worte ueber sich.";
  } else if (values.ueberMich.length > MAX_UEBER_MICH_LENGTH) {
    errors.ueberMich = `Bitte kuerzen Sie den Text auf maximal ${MAX_UEBER_MICH_LENGTH} Zeichen.`;
  }

  if (!values.email.trim()) {
    errors.email = "Bitte geben Sie Ihre E-Mail-Adresse an.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Bitte geben Sie eine gueltige E-Mail-Adresse an.";
  }

  if (!values.telefon.trim()) {
    errors.telefon = "Bitte geben Sie Ihre Telefonnummer an.";
  } else if (!PHONE_PATTERN.test(values.telefon.trim())) {
    errors.telefon = "Bitte geben Sie eine gueltige Telefonnummer an.";
  }

  if (!values.gewuenschtesZimmer.trim()) {
    errors.gewuenschtesZimmer = "Bitte waehlen Sie ein Zimmer aus.";
  }

  return errors;
}

export function validateFile(file: File): string | null {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `Datei "${file.name}" ist zu gross (max. 5 MB).`;
  }
  return null;
}
