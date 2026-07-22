import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { rooms } from "../data/rooms";
import { FORMSPREE_ENDPOINT } from "../config/formspree";
import { TextField, TextAreaField, SelectField } from "../components/FormFields";
import { FileUploadField } from "../components/FileUploadField";
import {
  validateApplicationForm,
  validateFile,
  MAX_UEBER_MICH_LENGTH,
  type ApplicationFormValues,
  type ApplicationFormErrors,
} from "../utils/applicationValidation";

type SubmitState = "idle" | "submitting" | "success" | "error";

const EMPTY_VALUES: ApplicationFormValues = {
  name: "",
  alter: "",
  berufOderStudium: "",
  einkommen: "",
  einzugsdatum: "",
  ueberMich: "",
  email: "",
  telefon: "",
  gewuenschtesZimmer: "",
};

const ROOM_OPTIONS = rooms.map((room) => ({
  value: room.id,
  label: `${room.name} — ${room.qm} m², ${room.preisEuro} € / Monat${
    room.status === "vermietet" ? " (vermietet)" : ""
  }`,
}));

export function BewerbungPage(): JSX.Element {
  const [searchParams] = useSearchParams();
  const preselectedZimmer = searchParams.get("zimmer") ?? "";

  const [values, setValues] = useState<ApplicationFormValues>({
    ...EMPTY_VALUES,
    gewuenschtesZimmer: rooms.some((room) => room.id === preselectedZimmer)
      ? preselectedZimmer
      : "",
  });
  const [errors, setErrors] = useState<ApplicationFormErrors>({});
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);

  const ueberMichLength = values.ueberMich.length;

  const isFormDisabled = submitState === "submitting";

  function updateField<K extends keyof ApplicationFormValues>(
    field: K,
    value: ApplicationFormValues[K],
  ): void {
    setValues((previous) => ({ ...previous, [field]: value }));
  }

  function handleFilesChange(nextFiles: File[]): void {
    const invalidFile = nextFiles.find((file) => validateFile(file) !== null);
    if (invalidFile) {
      setFileError(validateFile(invalidFile));
      return;
    }
    setFileError(null);
    setFiles(nextFiles);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const validationErrors = validateApplicationForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSubmitState("error");
      setSubmitErrorMessage(
        "Bitte korrigieren Sie die markierten Felder und senden Sie das Formular erneut ab.",
      );
      return;
    }

    setSubmitState("submitting");
    setSubmitErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("alter", values.alter);
      formData.append("berufOderStudium", values.berufOderStudium);
      formData.append("einkommen", values.einkommen);
      formData.append("einzugsdatum", values.einzugsdatum);
      formData.append("ueberMich", values.ueberMich);
      formData.append("email", values.email);
      formData.append("telefon", values.telefon);
      formData.append("gewuenschtesZimmer", values.gewuenschtesZimmer);
      files.forEach((file) => formData.append("dokumente", file));

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Formspree antwortete mit Status ${response.status}`);
      }

      setSubmitState("success");
    } catch {
      setSubmitState("error");
      setSubmitErrorMessage(
        "Die Bewerbung konnte nicht gesendet werden. Bitte pruefen Sie Ihre Internetverbindung und versuchen Sie es erneut.",
      );
    }
  }

  const submitButtonLabel = useMemo(() => {
    if (submitState === "submitting") return "Wird gesendet…";
    return "Bewerbung absenden";
  }, [submitState]);

  if (submitState === "success") {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success-subtle">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-7 w-7 text-success">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-h2 text-text-primary">Bewerbung gesendet</h1>
        <p className="text-body text-text-secondary">
          Vielen Dank fuer Ihre Bewerbung! Wir melden uns in der Regel
          innerhalb von 2-3 Werktagen bei Ihnen per E-Mail oder Telefon.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-h1 text-text-primary">Bewerbung</h1>
      <p className="mt-3 text-body text-text-secondary">
        Fuellen Sie das Formular aus, um sich fuer ein Zimmer zu bewerben.
        Felder mit * sind Pflichtfelder.
      </p>

      {submitState === "error" && submitErrorMessage && (
        <div
          role="alert"
          aria-live="polite"
          className="mt-8 flex items-start gap-2 rounded-md border border-error bg-error-subtle p-4 text-small text-error"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path d="M12 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="16" r="1" fill="currentColor" />
          </svg>
          <span>{submitErrorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-10" noValidate>
        <fieldset className="flex flex-col gap-6" disabled={isFormDisabled}>
          <legend className="text-h3 text-text-primary">Persoenliche Daten</legend>

          <TextField
            label="Name"
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            error={errors.name}
            placeholder="z. B. Max Mustermann"
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              label="Alter"
              name="alter"
              type="number"
              inputMode="numeric"
              min={16}
              max={99}
              required
              value={values.alter}
              onChange={(event) => updateField("alter", event.target.value)}
              error={errors.alter}
              placeholder="z. B. 24"
            />
            <TextField
              label="Beruf / Studium"
              name="berufOderStudium"
              required
              value={values.berufOderStudium}
              onChange={(event) => updateField("berufOderStudium", event.target.value)}
              error={errors.berufOderStudium}
              placeholder="z. B. Studentin, Informatik"
            />
          </div>

          <TextField
            label="Monatliches Einkommen (netto, in €)"
            name="einkommen"
            type="number"
            inputMode="numeric"
            min={0}
            required
            value={values.einkommen}
            onChange={(event) => updateField("einkommen", event.target.value)}
            error={errors.einkommen}
            placeholder="z. B. 1200"
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              label="E-Mail"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              error={errors.email}
              placeholder="z. B. max@beispiel.de"
            />
            <TextField
              label="Telefon"
              name="telefon"
              type="tel"
              autoComplete="tel"
              required
              value={values.telefon}
              onChange={(event) => updateField("telefon", event.target.value)}
              error={errors.telefon}
              placeholder="z. B. 0170 1234567"
            />
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-6" disabled={isFormDisabled}>
          <legend className="text-h3 text-text-primary">Gewuenschtes Zimmer</legend>
          <SelectField
            label="Zimmer"
            name="gewuenschtesZimmer"
            required
            value={values.gewuenschtesZimmer}
            onChange={(event) => updateField("gewuenschtesZimmer", event.target.value)}
            options={ROOM_OPTIONS}
            placeholder="Bitte waehlen…"
            error={errors.gewuenschtesZimmer}
          />
        </fieldset>

        <fieldset className="flex flex-col gap-6" disabled={isFormDisabled}>
          <legend className="text-h3 text-text-primary">Zeitraum</legend>
          <TextField
            label="Gewuenschtes Einzugsdatum"
            name="einzugsdatum"
            type="date"
            required
            value={values.einzugsdatum}
            onChange={(event) => updateField("einzugsdatum", event.target.value)}
            error={errors.einzugsdatum}
          />
        </fieldset>

        <fieldset className="flex flex-col gap-6" disabled={isFormDisabled}>
          <legend className="text-h3 text-text-primary">Ueber mich</legend>
          <TextAreaField
            label="Kurze Vorstellung"
            name="ueberMich"
            required
            maxLength={MAX_UEBER_MICH_LENGTH}
            value={values.ueberMich}
            onChange={(event) => updateField("ueberMich", event.target.value)}
            error={errors.ueberMich}
            placeholder="Erzaehlen Sie kurz etwas ueber sich, Ihren Alltag und warum Sie gut in die WG passen."
          />
          <p className="sr-only" aria-live="polite">
            {ueberMichLength} von {MAX_UEBER_MICH_LENGTH} Zeichen verwendet
          </p>
        </fieldset>

        <fieldset className="flex flex-col gap-6" disabled={isFormDisabled}>
          <legend className="text-h3 text-text-primary">Dokumente (optional)</legend>
          <FileUploadField
            label="Schufa-Auskunft, Gehaltsnachweis, Personalausweis"
            name="dokumente"
            files={files}
            onFilesChange={handleFilesChange}
            error={fileError ?? undefined}
            hint="Optional, aber empfohlen. Max. 5 MB je Datei (PDF, JPG oder PNG)."
          />
        </fieldset>

        <button
          type="submit"
          disabled={isFormDisabled}
          className="flex min-h-11 min-w-[220px] items-center justify-center gap-2 self-start rounded-md bg-accent px-6 text-body-strong text-white transition-colors duration-150 hover:bg-accent-hover disabled:cursor-not-allowed disabled:bg-border-strong disabled:text-text-muted cursor-pointer"
        >
          {submitState === "submitting" && (
            <svg
              className="h-4 w-4 animate-spin motion-reduce:animate-none"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="3"
                strokeOpacity="0.3"
              />
              <path
                d="M21 12a9 9 0 0 0-9-9"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          )}
          {submitButtonLabel}
        </button>
      </form>
    </div>
  );
}
