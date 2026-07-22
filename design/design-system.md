# Design System — WG-Haus Vermietung

> Hinweis: Diese Datei wurde beim Vite-Scaffold versehentlich durch
> `--overwrite` entfernt und hier 1:1 aus dem bereits eingelesenen
> Originalinhalt wiederherstellt (kein Inhalt veraendert).

Referenz-Stil: "Erich Automobile Stuttgart" — clean, professionell, ruhig, viel
Weissraum, keine grellen Farben, keine verspielten Animationen. Ziel ist
Vertrauenswuerdigkeit (Vermieter wirkt seriös) bei niedriger kognitiver Last
(Bewerber findet schnell Zimmer + Preis + Bewerbungsweg).

## 1. Farbpalette (Light Mode, Standard)

| Token | Hex | Verwendung |
|---|---|---|
| background | #FFFFFF | Seiten-Hintergrund |
| surface | #F7F7F5 | Off-White, Kartenhintergrund |
| surface-raised | #FFFFFF | Karten auf surface-Hintergrund |
| border | #E4E4E1 | Trennlinien, Card-Border |
| border-strong | #C9C9C5 | Input-Border hover |
| text-primary | #1E1E1C | Fliesstext & Ueberschriften |
| text-secondary | #5B5B57 | Sekundaertext |
| text-muted | #8A8A85 | Placeholder, disabled |
| accent | #2F5D50 | Buttons, Links, Preise |
| accent-hover | #254A40 | Hover Accent |
| accent-subtle | #E8EFEC | Accent-Hintergrund |
| error | #B3261E | Fehlerzustand |
| error-subtle | #FBEAE9 | Fehlerzustand Hintergrund |
| success | #2F6B4F | Erfolgsmeldung |
| success-subtle | #EAF3EE | Erfolgsmeldung Hintergrund |

## 2. Typografie

Font: Inter (Google Fonts), Fallback -apple-system, "Segoe UI", sans-serif.

| Ebene | Groesse | Line-Height | Weight |
|---|---|---|---|
| H1 | 2.75rem/44px | 1.15 | 700 |
| H2 | 2rem/32px | 1.2 | 700 |
| H3 | 1.5rem/24px | 1.3 | 600 |
| H4 | 1.125rem/18px | 1.4 | 600 |
| Body | 1rem/16px | 1.6 | 400 |
| Body-strong | 1rem/16px | 1.6 | 600 |
| Small | 0.875rem/14px | 1.5 | 400 |
| Caption | 0.75rem/12px | 1.4 | 500 |

Mobile: H1 auf 2rem/32px, H2 auf 1.5rem/24px.

## 4. Border-Radius & Schatten

radius-sm 6px, radius-md 10px, radius-lg 16px, radius-full 9999px.
shadow-xs `0 1px 2px rgba(20,20,18,0.04)`, shadow-sm `0 2px 6px rgba(20,20,18,0.06)`,
shadow-md `0 8px 20px rgba(20,20,18,0.08)`.

## 5. Buttons

Radius-md, Fokus-Ring Pflicht: focus-visible:ring-2 focus-visible:ring-accent
focus-visible:ring-offset-2, min. Touch-Target 44x44px.
Primary: bg accent, Text weiss, hover accent-hover.
Secondary: transparent, Border border-strong, hover Border+Text accent.
Ghost: transparent, Text accent, hover accent-subtle Hintergrund.
Transition: transition-colors duration-150, kein Bounce/Scale.

## 6. Formular-Elemente

Jedes Feld hat ein echtes `<label>`. Placeholder ersetzt niemals das Label.
Error-State: Border error 1.5px, bg error-subtle, Icon + Text unter dem Feld.
aria-describedby verweist auf Fehlertext-ID, aria-invalid="true" im Fehlerfall,
Fehlertext-Container aria-live="polite"; Sammel-Fehlermeldung bei Submit
role="alert".

## 7. Karten-Design (Zimmer-Kacheln)

radius-lg, shadow-xs ruhend / shadow-sm + translate-y(-2px) hover (150ms,
reduced-motion: kein Translate). Bild 4:3/16:10 object-cover oben abgerundet.
Struktur: Bild → Name+Status-Badge → qm → Preis (accent, Body-strong) →
optional 1 Satz. Karte als Ganzes klickbar mit Fokus-Ring.

## 8. Tailwind-Config (theme.extend)

```js
export default {
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        surface: '#F7F7F5',
        'surface-raised': '#FFFFFF',
        border: { DEFAULT: '#E4E4E1', strong: '#C9C9C5' },
        text: { primary: '#1E1E1C', secondary: '#5B5B57', muted: '#8A8A85' },
        accent: { DEFAULT: '#2F5D50', hover: '#254A40', subtle: '#E8EFEC' },
        error: { DEFAULT: '#B3261E', subtle: '#FBEAE9' },
        success: { DEFAULT: '#2F6B4F', subtle: '#EAF3EE' },
      },
      fontFamily: { sans: ['Inter', '-apple-system', 'Segoe UI', 'sans-serif'] },
      fontSize: {
        h1: ['2.75rem', { lineHeight: '1.15', fontWeight: '700' }],
        h2: ['2rem', { lineHeight: '1.2', fontWeight: '700' }],
        h3: ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        h4: ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
        body: ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        small: ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        caption: ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
      },
      borderRadius: { sm: '6px', md: '10px', lg: '16px' },
      boxShadow: {
        xs: '0 1px 2px rgba(20,20,18,0.04)',
        sm: '0 2px 6px rgba(20,20,18,0.06)',
        md: '0 8px 20px rgba(20,20,18,0.08)',
      },
      ringColor: { accent: '#2F5D50' },
    },
  },
  plugins: [],
};
```

## 9. Accessibility (verbindlich)

Kontrast: text-primary auf background ~15.8:1, accent auf background ~7.2:1,
Weiss auf accent ~7.2:1, error auf background ~5.7:1 — alle AA/AAA-konform.
text-muted NIE fuer Body-Text < 18px verwenden.
Jedes interaktive Element: sichtbarer Fokus-Ring min. 2px, ring-offset-2.
Touch-Targets >= 44x44px. prefers-reduced-motion deaktiviert Hover-Translate
und Modal-Bewegung (nur Opacity bleibt). Bilder brauchen aussagekraeftige alt-Texte.

## 10. Layout-Konzept

**Landing Page:** Hero (Headline + Subline + 1 Primary-CTA) → "Ueber das
Haus" (3-4 Fakten als Text-Zeilen) → Zimmer-Vorschau-Kartenraster (max 3
Spalten Desktop) → Trust-Block → CTA zur Bewerbung. Sektionswechsel nur
zwischen background/surface, kein hartes Farbwechsel.

**Grundriss-Seite:** Grundriss-Grafik mit klickbaren Hotspots (Status-Punkt:
accent=verfuegbar, text-muted=vermietet), tastaturfokussierbar. Klick/Enter
oeffnet Modal: Bildergalerie, qm, Preis, Ausstattungsliste, CTA "Fuer dieses
Zimmer bewerben". Modal = echter Dialog (Fokus-Trap, Escape schliesst,
aria-hidden auf Hintergrund). Zusaetzlich textuelle Fallback-Kartenliste
(v.a. Mobile).

**Bewerbungsformular:** Einspaltig, gruppiert mit H3-Zwischenueberschriften:
1. Persoenliche Daten, 2. Gewuenschtes Zimmer (vorbelegt via ?zimmer=X),
3. Zeitraum/Einzugsdatum, 4. Motivation (Textarea mit Zeichenlimit),
5. Optionaler Dokumenten-Upload. Inline-Fehler pro Feld. Nach Submit:
eigener Bestaetigungszustand (kein Popup). Submit-Button mit Spinner,
disabled, fester Mindestbreite.

**Footer:** Dreispaltig (Kontakt, Navigation, Hinweis), Trennung durch
border, Hintergrund surface, Text text-secondary/Small.

## 11. Breakpoints

375 / 768 / 1024 / 1440. Kartenraster: 1 Spalte Mobile → 2 Tablet → 3 Desktop.
