import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/grundriss", label: "Grundriss & Zimmer" },
  { to: "/bewerbung", label: "Bewerbung" },
] as const;

function navLinkClassName({ isActive }: { isActive: boolean }): string {
  return [
    "text-body-strong transition-colors duration-150 cursor-pointer",
    isActive ? "text-accent" : "text-text-primary hover:text-accent",
  ].join(" ");
}

/**
 * Mobiles Menu-Panel. Wird per createPortal direkt in document.body
 * gerendert (NICHT als Kind des Headers), weil der Header backdrop-blur
 * nutzt: jedes Element mit aktivem filter/backdrop-filter erzeugt einen
 * neuen containing block fuer position:fixed-Nachkommen, wodurch das Panel
 * auf die Kopfleisten-Hoehe kollabieren wuerde (siehe LEARNINGS.md).
 */
function MobileMenu({
  isOpen,
  onClose,
  titleId,
}: {
  isOpen: boolean;
  onClose: () => void;
  titleId: string;
}): JSX.Element | null {
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    firstLinkRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        type="button"
        aria-label="Hintergrund, Menu schliessen"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-pointer bg-text-primary/40"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="absolute right-0 top-0 flex h-full w-72 max-w-[85vw] flex-col gap-6 bg-background p-6 shadow-md"
      >
        <div className="flex items-center justify-between">
          <span id={titleId} className="text-h4 text-text-primary">
            Menu
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Menu schliessen"
            className="flex h-11 w-11 items-center justify-center rounded-md text-text-secondary transition-colors duration-150 hover:bg-surface hover:text-accent cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <nav aria-label="Hauptnavigation mobil">
          <ul className="flex flex-col gap-4">
            {NAV_ITEMS.map((item, index) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  ref={index === 0 ? firstLinkRef : undefined}
                  onClick={onClose}
                  className={navLinkClassName}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>,
    document.body,
  );
}

export function Header(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <NavLink to="/" className="text-h4 text-text-primary cursor-pointer">
          WG&nbsp;am&nbsp;Stadtpark
        </NavLink>

        <nav aria-label="Hauptnavigation" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={navLinkClassName}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Menu oeffnen"
          className="flex h-11 w-11 items-center justify-center rounded-md text-text-primary transition-colors duration-150 hover:bg-surface hover:text-accent md:hidden cursor-pointer"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        titleId={titleId}
      />
    </header>
  );
}
