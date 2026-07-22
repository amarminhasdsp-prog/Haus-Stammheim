import { useId, useRef } from "react";

interface FileUploadFieldProps {
  label: string;
  name: string;
  required?: boolean;
  files: File[];
  onFilesChange: (files: File[]) => void;
  error?: string;
  hint?: string;
}

/**
 * Datei-Upload-Feld mit Drag-Over-Optik (dashed border) und Liste bereits
 * ausgewaehlter Dateien inkl. Entfernen-Moeglichkeit pro Datei.
 */
export function FileUploadField({
  label,
  name,
  required,
  files,
  onFilesChange,
  error,
  hint,
}: FileUploadFieldProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const id = `${name}-${generatedId}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const selected = Array.from(event.target.files ?? []);
    onFilesChange([...files, ...selected]);
    event.target.value = "";
  }

  function removeFile(indexToRemove: number): void {
    onFilesChange(files.filter((_, index) => index !== indexToRemove));
  }

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-body-strong text-text-primary">
        {label}
        {required ? <span aria-hidden="true"> *</span> : <span className="text-text-secondary"> (optional)</span>}
      </label>
      {hint && (
        <p id={hintId} className="mb-1.5 text-small text-text-secondary">
          {hint}
        </p>
      )}

      <label
        htmlFor={id}
        className={[
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-[1.5px] border-dashed bg-surface px-4 py-8 text-center transition-colors duration-150",
          error ? "border-error bg-error-subtle" : "border-border-strong hover:border-accent hover:bg-accent-subtle",
        ].join(" ")}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6 text-text-secondary">
          <path
            d="M12 16V4m0 0L7 9m5-5l5 5M5 20h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-small text-text-secondary">
          Datei(en) auswaehlen (max. 5 MB je Datei)
        </span>
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="file"
          multiple
          onChange={handleFileInputChange}
          aria-required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={[error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined}
          className="sr-only"
        />
      </label>

      {files.length > 0 && (
        <ul className="mt-3 flex flex-col gap-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${file.lastModified}-${index}`}
              className="flex items-center justify-between gap-3 rounded-sm border border-border bg-background px-3 py-2 text-small text-text-secondary"
            >
              <span className="truncate">
                {file.name} ({(file.size / (1024 * 1024)).toFixed(1)} MB)
              </span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                aria-label={`${file.name} entfernen`}
                className="shrink-0 rounded-sm px-2 py-1 text-text-secondary transition-colors duration-150 hover:text-error cursor-pointer"
              >
                Entfernen
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p id={errorId} role="alert" aria-live="polite" className="mt-1.5 flex items-start gap-1.5 text-small text-error">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4 shrink-0 text-error">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path d="M12 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="16" r="1" fill="currentColor" />
          </svg>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
