/**
 * Zentrale Datenquelle fuer alle vermietbaren Einheiten im Haus.
 *
 * Das Haus hat 2 Etagen (EG + OG) mit insgesamt 5 vermietbaren Einheiten.
 * Bild-Hinweis: Zimmer 1, Zimmer 2 und das grosse Bad im OG haben echte
 * Fotos, die spaeter als statische Assets eingebunden werden. Bis dahin
 * bleiben picsum.photos-Platzhalter fuer ALLE Zimmer, mit alt-Texten, die
 * bereits die echte Ausstattung beschreiben (leichter Austausch spaeter,
 * ohne Komponenten anpassen zu muessen).
 */

export interface RoomImage {
  /** Absolute Bild-URL (Platzhalter: picsum.photos mit deterministischem seed) */
  src: string;
  /** Aussagekraeftiger alt-Text, beschreibt die ECHTE Ausstattung (siehe design-system.md Abschnitt 9) */
  alt: string;
}

export interface Room {
  /** Eindeutige, URL-sichere ID (wird u. a. als ?zimmer=<id> verwendet) */
  id: string;
  /** Anzeigename, z. B. "Zimmer 1" oder ein eigener Name */
  name: string;
  /** Groesse in Quadratmetern */
  qm: number;
  /** Pauschalmiete in Euro pro Monat */
  preisEuro: number;
  /** Verfuegbarkeitsstatus */
  status: "verfuegbar" | "vermietet";
  /** Kurzer Ein-Zeiler fuer Kartenansicht (max. ca. 60 Zeichen) */
  kurzbeschreibung: string;
  /** Ausstattungsliste als Stichpunkte */
  ausstattung: string[];
  /** 2-3 Platzhalterbilder pro Zimmer */
  bilder: RoomImage[];
  /** Etage, auf der sich die Einheit befindet — steuert, auf welchem Grundriss sie erscheint */
  floor: "eg" | "og";
  /** Position/Groesse des Hotspots auf dem jeweiligen Etagen-Grundriss-SVG (Prozentwerte 0-100) */
  hotspot: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export const rooms: Room[] = [
  {
    id: "zimmer-1",
    name: "Zimmer 1",
    qm: 25,
    preisEuro: 750,
    status: "verfuegbar",
    kurzbeschreibung: "Grosses Zimmer mit Parkettboden im Erdgeschoss.",
    ausstattung: [
      "Parkettboden",
      "Doppelbett mit LED-Kopfteil",
      "Kleiderschrank",
      "Regal",
      "Deckenspots",
      "Fenster",
    ],
    bilder: [
      { src: "/images/zimmer1.jpeg", alt: "Zimmer 1: Doppelbett mit LED-Kopfteil-Beleuchtung, Kleiderschrank und Regal auf Parkettboden" },
    ],
    floor: "eg",
    hotspot: { x: 5, y: 6, width: 32, height: 40 },
  },
  {
    id: "zimmer-2",
    name: "Zimmer 2",
    qm: 18,
    preisEuro: 700,
    status: "verfuegbar",
    kurzbeschreibung: "Gemuetliches Zimmer mit Parkettboden im Erdgeschoss.",
    ausstattung: [
      "Parkettboden",
      "Doppelbett mit Nachttisch",
      "Teppich",
      "Deckenleuchte",
    ],
    bilder: [
      { src: "/images/zimmer2.jpeg", alt: "Zimmer 2: Doppelbett mit Nachttisch und Teppich auf Parkettboden" },
    ],
    floor: "eg",
    hotspot: { x: 40, y: 6, width: 26, height: 40 },
  },
  {
    id: "apartment-eg",
    // Hinweis: Im Auftrag wurde keine qm-Zahl fuer das Apartment genannt.
    // 28 qm ist eine plausible Platzhalter-Schaetzung fuer eine eigenstaendige
    // Einheit mit Kueche+Bad — bitte durch die echte Wohnflaeche ersetzen.
    name: "1-Zimmer-Apartment",
    qm: 28,
    preisEuro: 800,
    status: "verfuegbar",
    kurzbeschreibung: "Eigenstaendige Einheit mit separatem Zugang, Kueche und Bad inklusive.",
    ausstattung: [
      "Eigene Kueche",
      "Eigenes Bad",
      "Separater Eingang (Treppe rechts)",
      "Komplett autark",
    ],
    bilder: [
      { src: "https://picsum.photos/seed/apartment-eg-a/800/600", alt: "1-Zimmer-Apartment: Eigene Kueche der autarken Einheit" },
      { src: "https://picsum.photos/seed/apartment-eg-b/800/600", alt: "1-Zimmer-Apartment: Eigenes Bad" },
      { src: "https://picsum.photos/seed/apartment-eg-c/800/600", alt: "1-Zimmer-Apartment: Separater Eingang ueber die Treppe rechts" },
    ],
    floor: "eg",
    hotspot: { x: 70, y: 6, width: 25, height: 40 },
  },
  {
    id: "zimmer-3",
    name: "Zimmer 3",
    qm: 6,
    preisEuro: 450,
    status: "verfuegbar",
    kurzbeschreibung: "Kompaktes, ruhiges Zimmer im Obergeschoss.",
    ausstattung: [
      "Kompakt",
      "Ruhige Lage",
      "Zugang zum grossen Bad im OG",
      "Zugang zum Aufenthaltsraum",
    ],
    bilder: [
      { src: "https://picsum.photos/seed/zimmer-3-a/800/600", alt: "Zimmer 3: Kompaktes Zimmer in ruhiger Lage im Obergeschoss" },
      { src: "/images/bad-og.jpeg", alt: "Grosses Bad im OG: Marmorboden, Glasdusche mit Massageduesen, Handtuchheizkoerper" },
    ],
    floor: "og",
    hotspot: { x: 5, y: 6, width: 22, height: 30 },
  },
  {
    id: "zimmer-4",
    name: "Zimmer 4",
    qm: 10,
    preisEuro: 600,
    status: "verfuegbar",
    kurzbeschreibung: "Zimmer mit mehr Platz im Obergeschoss.",
    ausstattung: [
      "Mehr Platz als Zimmer 3",
      "Zugang zum grossen Bad im OG",
      "Zugang zum Aufenthaltsraum",
    ],
    bilder: [
      { src: "https://picsum.photos/seed/zimmer-4-a/800/600", alt: "Zimmer 4: Geraeumiges Zimmer im Obergeschoss" },
      { src: "/images/bad-og.jpeg", alt: "Grosses Bad im OG: Marmorboden, Glasdusche mit Massageduesen" },
    ],
    floor: "og",
    hotspot: { x: 65, y: 6, width: 30, height: 30 },
  },
];

export function getRoomById(id: string): Room | undefined {
  return rooms.find((room) => room.id === id);
}

/** Liefert alle Zimmer einer Etage, in fester Reihenfolge wie in `rooms` definiert. */
export function getRoomsByFloor(floor: Room["floor"]): Room[] {
  return rooms.filter((room) => room.floor === floor);
}
