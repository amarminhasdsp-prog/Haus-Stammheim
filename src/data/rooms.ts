/**
 * Zentrale Datenquelle fuer alle vermietbaren Einheiten im Haus Stammheim.
 * Hardcoded — kein Backend, keine Datenbank.
 */

export interface RoomImage {
  src: string;
  alt: string;
}

export interface Room {
  id: string;
  name: string;
  qm: number;
  preisEuro: number;
  status: "verfuegbar" | "vermietet";
  kurzbeschreibung: string;
  beschreibung: string;
  ausstattung: string[];
  gemeinschaft: string[];
  bilder: RoomImage[];
  floor: "eg" | "og";
  etageLabel: string;
  verfuegbarAb: string;
  mietart: string;
  inklusivLeistungen: string[];
  hotspot: { x: number; y: number; width: number; height: number };
}

export const rooms: Room[] = [
  {
    id: "zimmer-1",
    name: "Zimmer 1",
    qm: 25,
    preisEuro: 750,
    status: "verfuegbar",
    kurzbeschreibung: "Grosses Zimmer mit Parkettboden im Erdgeschoss.",
    beschreibung:
      "Das groesste Zimmer im Haus mit 25 qm bietet viel Platz zum Wohnen und Arbeiten. Hochwertiger Parkettboden, modernes Doppelbett mit integrierter LED-Beleuchtung am Kopfteil, geräumiger Kleiderschrank und ein offenes Regal sorgen dafuer, dass du direkt einziehen kannst. Die Deckenspots setzen den Raum stimmungsvoll in Szene. Das Zimmer liegt im Erdgeschoss mit direktem Zugang zu Kueche, Bad und dem grossen Aufenthaltsraum.",
    ausstattung: [
      "Parkettboden",
      "Doppelbett mit LED-Kopfteil",
      "Kleiderschrank (Schiebetüren)",
      "Offenes Regal",
      "Deckenspots (dimmbar)",
      "Fenster mit Blick nach draussen",
      "Heizung",
    ],
    gemeinschaft: [
      "Gemeinschaftskueche (EG)",
      "Badezimmer (EG)",
      "Aufenthaltsraum (EG)",
      "Wintergarten (EG)",
      "Waschmaschine/Trockner",
      "WLAN inklusive",
    ],
    bilder: [
      { src: "/images/zimmer1.jpeg", alt: "Zimmer 1: Doppelbett mit LED-Kopfteil, Kleiderschrank, Regal und Parkettboden" },
    ],
    floor: "eg",
    etageLabel: "Erdgeschoss",
    verfuegbarAb: "Sofort",
    mietart: "Pauschalmiete (alle Nebenkosten inklusive)",
    inklusivLeistungen: [
      "Strom",
      "Wasser/Abwasser",
      "Heizung",
      "Internet/WLAN",
      "Müllentsorgung",
      "GEZ-Anteil",
    ],
    hotspot: { x: 5, y: 6, width: 32, height: 40 },
  },
  {
    id: "zimmer-2",
    name: "Zimmer 2",
    qm: 18,
    preisEuro: 700,
    status: "verfuegbar",
    kurzbeschreibung: "Gemuetliches Zimmer mit Parkettboden im Erdgeschoss.",
    beschreibung:
      "Ein gemuetliches Zimmer mit 18 qm und schonem Parkettboden. Das Doppelbett mit Nachttisch ist bereits vorhanden, ein weicher Teppich macht den Raum wohnlich. Liegt direkt neben dem Aufenthaltsraum und hat kurze Wege zu Kueche und Bad. Ideal fuer jemanden der es kompakt aber gemuetlich mag.",
    ausstattung: [
      "Parkettboden",
      "Doppelbett mit Nachttisch",
      "Teppich",
      "Deckenleuchte",
      "Heizung",
      "Fenster",
    ],
    gemeinschaft: [
      "Gemeinschaftskueche (EG)",
      "Badezimmer (EG)",
      "Aufenthaltsraum (EG)",
      "Wintergarten (EG)",
      "Waschmaschine/Trockner",
      "WLAN inklusive",
    ],
    bilder: [
      { src: "/images/zimmer2.jpeg", alt: "Zimmer 2: Doppelbett mit Nachttisch und Teppich auf Parkettboden" },
    ],
    floor: "eg",
    etageLabel: "Erdgeschoss",
    verfuegbarAb: "Sofort",
    mietart: "Pauschalmiete (alle Nebenkosten inklusive)",
    inklusivLeistungen: [
      "Strom",
      "Wasser/Abwasser",
      "Heizung",
      "Internet/WLAN",
      "Müllentsorgung",
      "GEZ-Anteil",
    ],
    hotspot: { x: 40, y: 6, width: 26, height: 40 },
  },
  {
    id: "apartment-eg",
    name: "1-Zimmer-Apartment",
    qm: 28,
    preisEuro: 800,
    status: "verfuegbar",
    kurzbeschreibung: "Eigenstaendige Einheit mit Kueche und Bad — komplett autark.",
    beschreibung:
      "Das 1-Zimmer-Apartment ist eine komplett eigenstaendige Wohneinheit mit separatem Eingang ueber eine eigene Treppe an der rechten Hausseite. Eigene Kueche und eigenes Bad — du teilst nichts mit den anderen Bewohnern. Perfekt fuer jemanden der seine Ruhe will aber trotzdem in einer Hausgemeinschaft lebt. Die Pauschalmiete deckt alle Nebenkosten ab.",
    ausstattung: [
      "Eigene Kueche (komplett ausgestattet)",
      "Eigenes Badezimmer",
      "Separater Eingang (eigene Treppe)",
      "Komplett autark",
      "Heizung",
      "Fenster",
    ],
    gemeinschaft: [
      "Kein Teilen noetig — eigene Kueche und Bad",
      "Garten-Mitbenutzung",
      "WLAN inklusive",
    ],
    bilder: [
      { src: "https://picsum.photos/seed/apartment-eg-a/800/600", alt: "1-Zimmer-Apartment: Wohnbereich" },
      { src: "https://picsum.photos/seed/apartment-eg-b/800/600", alt: "1-Zimmer-Apartment: Eigene Kueche" },
    ],
    floor: "eg",
    etageLabel: "Erdgeschoss (separater Zugang)",
    verfuegbarAb: "Sofort",
    mietart: "Pauschalmiete (alle Nebenkosten inklusive)",
    inklusivLeistungen: [
      "Strom",
      "Wasser/Abwasser",
      "Heizung",
      "Internet/WLAN",
      "Müllentsorgung",
      "GEZ-Anteil",
    ],
    hotspot: { x: 70, y: 6, width: 25, height: 40 },
  },
  {
    id: "zimmer-3",
    name: "Zimmer 3",
    qm: 6,
    preisEuro: 450,
    status: "verfuegbar",
    kurzbeschreibung: "Kompaktes Zimmer im Obergeschoss — guenstiger Einstieg.",
    beschreibung:
      "Das kleinste Zimmer im Haus, aber perfekt als Schlafzimmer wenn du den grossen Aufenthaltsraum im OG als Wohn-/Arbeitsbereich nutzt. Ruhige Lage, Zugang zum hochwertigen grossen Bad (Marmorboden, Glasdusche mit Massageduesen, Handtuchheizkoerper) und dem geraeumigen Aufenthaltsraum. Ideal fuer Studenten oder Berufseinsteiger die guenstig wohnen wollen.",
    ausstattung: [
      "Kompaktes Zimmer",
      "Ruhige Lage",
      "Heizung",
      "Fenster",
    ],
    gemeinschaft: [
      "Grosses Bad im OG (Marmor, Glasdusche, Massageduesen)",
      "Aufenthaltsraum im OG",
      "Gemeinschaftskueche (EG)",
      "Waschmaschine/Trockner",
      "WLAN inklusive",
    ],
    bilder: [
      { src: "https://picsum.photos/seed/zimmer-3-a/800/600", alt: "Zimmer 3: Kompaktes Zimmer im Obergeschoss" },
      { src: "/images/bad-og.jpeg", alt: "Grosses Bad im OG: Marmorboden, Glasdusche mit Massageduesen" },
    ],
    floor: "og",
    etageLabel: "Obergeschoss",
    verfuegbarAb: "Sofort",
    mietart: "Pauschalmiete (alle Nebenkosten inklusive)",
    inklusivLeistungen: [
      "Strom",
      "Wasser/Abwasser",
      "Heizung",
      "Internet/WLAN",
      "Müllentsorgung",
      "GEZ-Anteil",
    ],
    hotspot: { x: 5, y: 6, width: 22, height: 30 },
  },
  {
    id: "zimmer-4",
    name: "Zimmer 4",
    qm: 10,
    preisEuro: 600,
    status: "verfuegbar",
    kurzbeschreibung: "Zimmer mit mehr Platz im Obergeschoss.",
    beschreibung:
      "Mit 10 qm etwas groesser als Zimmer 3 und damit komfortabler fuer den Alltag. Du teilst dir das hochwertige grosse Bad (Marmorboden, Glasdusche mit Massageduesen, Handtuchheizkoerper) und den geraeumigen Aufenthaltsraum im OG mit nur einem weiteren Mitbewohner. Ruhige Lage, gutes Preis-Leistungs-Verhaeltnis.",
    ausstattung: [
      "Mehr Platz (10 qm)",
      "Ruhige Lage",
      "Heizung",
      "Fenster",
    ],
    gemeinschaft: [
      "Grosses Bad im OG (Marmor, Glasdusche, Massageduesen)",
      "Aufenthaltsraum im OG",
      "Gemeinschaftskueche (EG)",
      "Waschmaschine/Trockner",
      "WLAN inklusive",
    ],
    bilder: [
      { src: "https://picsum.photos/seed/zimmer-4-a/800/600", alt: "Zimmer 4: Zimmer im Obergeschoss" },
      { src: "/images/bad-og.jpeg", alt: "Grosses Bad im OG: Marmorboden, Glasdusche mit Massageduesen" },
    ],
    floor: "og",
    etageLabel: "Obergeschoss",
    verfuegbarAb: "Sofort",
    mietart: "Pauschalmiete (alle Nebenkosten inklusive)",
    inklusivLeistungen: [
      "Strom",
      "Wasser/Abwasser",
      "Heizung",
      "Internet/WLAN",
      "Müllentsorgung",
      "GEZ-Anteil",
    ],
    hotspot: { x: 65, y: 6, width: 30, height: 30 },
  },
];

export function getRoomById(id: string): Room | undefined {
  return rooms.find((room) => room.id === id);
}

export function getRoomsByFloor(floor: Room["floor"]): Room[] {
  return rooms.filter((room) => room.floor === floor);
}
