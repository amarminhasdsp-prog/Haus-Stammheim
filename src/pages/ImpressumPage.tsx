export function ImpressumPage(): JSX.Element {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-h1 text-text-primary">Impressum</h1>
      <p className="mt-4 rounded-md border border-border-strong bg-surface p-4 text-small text-text-secondary">
        Platzhalter — bitte durch echte Angaben ersetzen. Der folgende Text
        dient nur der Struktur und ist rechtlich nicht verbindlich.
      </p>

      <div className="mt-8 flex flex-col gap-6 text-body text-text-secondary">
        <section>
          <h2 className="text-h4 text-text-primary">Angaben gemaess § 5 TMG</h2>
          <p className="mt-2">
            Max Mustermann
            <br />
            Musterstrasse 12
            <br />
            10115 Berlin
          </p>
        </section>

        <section>
          <h2 className="text-h4 text-text-primary">Kontakt</h2>
          <p className="mt-2">
            E-Mail: kontakt@wg-am-stadtpark.example
          </p>
        </section>

        <section>
          <h2 className="text-h4 text-text-primary">Haftungsausschluss</h2>
          <p className="mt-2">
            Platzhalter-Rechtstext. Bitte durch eine rechtsgueltige
            Impressums-Erklaerung ersetzen, z. B. mithilfe eines
            Impressum-Generators oder rechtlicher Beratung.
          </p>
        </section>
      </div>
    </div>
  );
}
