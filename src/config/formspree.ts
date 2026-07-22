/**
 * Formspree-Konfiguration fuer den Bewerbungsformular-Versand.
 *
 * WICHTIG: Dies ist ein Platzhalter. Die echte Formspree-Formular-ID muss
 * spaeter eingetragen werden (nach Anlage eines Formspree-Formulars unter
 * https://formspree.io). Die Ziel-E-Mail-Adresse steht bewusst NICHT im
 * Code - sie wird ausschliesslich im Formspree-Dashboard beim Anlegen des
 * Formulars hinterlegt (Formspree leitet Einsendungen dann automatisch an
 * die dort konfigurierte Adresse weiter). So bleibt die Ziel-Adresse aus
 * dem Frontend-Code raus und kann jederzeit ohne Deploy geaendert werden.
 *
 * Setup-Schritte (spaeter, durch den Betreiber):
 * 1. Konto auf https://formspree.io anlegen (Free-Tier reicht fuer den Start)
 * 2. Neues Formular anlegen, als Ziel-E-Mail "amar.minhas@outlook.de" eintragen
 * 3. Die vergebene Formular-ID unten bei FORMSPREE_ENDPOINT eintragen
 *    (Format: https://formspree.io/f/<ID>, die aktuelle YOUR_FORM_ID ersetzen)
 */
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
