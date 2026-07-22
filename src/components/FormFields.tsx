import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

function ErrorIcon(): JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4 shrink-0 text-error"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}

function ErrorMessage({ id, message }: { id: string; message: string }): JSX.Element {
  return (
    <p id={id} role="alert" aria-live="polite" className="mt-1.5 flex items-start gap-1.5 text-small text-error">
      <ErrorIcon />
      <span>{message}</span>
    </p>
  );
}

const inputBaseClassName =
  "w-full rounded-sm border bg-background px-4 py-2.5 text-body text-text-primary transition-colors duration-150 placeholder:text-text-muted";

function fieldBorderClassName(hasError: boolean): string {
  return hasError
    ? "border-[1.5px] border-error bg-error-subtle"
    : "border-border hover:border-border-strong";
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export function TextField({
  label,
  error,
  hint,
  required,
  id: providedId,
  ...inputProps
}: TextFieldProps): JSX.Element {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-body-strong text-text-primary">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {hint && (
        <p id={hintId} className="mb-1.5 text-small text-text-secondary">
          {hint}
        </p>
      )}
      <input
        id={id}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={[error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined}
        className={`${inputBaseClassName} ${fieldBorderClassName(Boolean(error))}`}
        {...inputProps}
      />
      {error && <ErrorMessage id={errorId} message={error} />}
    </div>
  );
}

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  required?: boolean;
  maxLength: number;
}

export function TextAreaField({
  label,
  error,
  required,
  maxLength,
  id: providedId,
  value,
  ...textareaProps
}: TextAreaFieldProps): JSX.Element {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const errorId = `${id}-error`;
  const counterId = `${id}-counter`;
  const currentLength = typeof value === "string" ? value.length : 0;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-body-strong text-text-primary">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <textarea
        id={id}
        value={value}
        maxLength={maxLength}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={[error ? errorId : null, counterId].filter(Boolean).join(" ")}
        rows={5}
        className={`${inputBaseClassName} resize-y ${fieldBorderClassName(Boolean(error))}`}
        {...textareaProps}
      />
      <div className="mt-1.5 flex items-start justify-between gap-4">
        {error ? <ErrorMessage id={errorId} message={error} /> : <span />}
        <p id={counterId} className="whitespace-nowrap text-small text-text-secondary">
          {currentLength}/{maxLength}
        </p>
      </div>
    </div>
  );
}

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  id?: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
}

export function SelectField({
  label,
  error,
  required,
  id: providedId,
  name,
  value,
  onChange,
  options,
  placeholder,
}: SelectFieldProps): JSX.Element {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-body-strong text-text-primary">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          aria-required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`${inputBaseClassName} appearance-none pr-10 ${fieldBorderClassName(Boolean(error))}`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {error && <ErrorMessage id={errorId} message={error} />}
    </div>
  );
}
