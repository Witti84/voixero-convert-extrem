# Voixero Convert extrem

Eigenständige Landingpage für https://becomeextrem.voixero.com/.
Die bestehende Seite tryconvert.voixero.com wird nicht verändert.

## GitHub und Vercel

1. ZIP entpacken. Auf GitHub ein neues Repository `voixero-convert-extrem` anlegen. Den **Inhalt** des Ordners hochladen, sodass `package.json` und `vercel.json` direkt im Repository-Hauptverzeichnis liegen. Auch `.gitignore` übernehmen. Kein Upload von node_modules, dist, .env oder .vercel.
2. In Vercel „Add New → Project → Import Git Repository“ wählen. Framework: **Other**. Build Command: `npm run build`. Output Directory: `dist`. Die Datei vercel.json enthält diese Einstellungen bereits. Deployment ausführen.
3. Unter Settings → Domains `becomeextrem.voixero.com` hinzufügen. Den von Vercel konkret angegebenen DNS-Eintrag beim DNS-Anbieter setzen. Keine bestehenden Einträge für tryconvert ändern.

## Kontaktformular aktivieren

Anfragen gehen an sales@voixero.com. In Vercel unter Settings → Environment Variables folgende Variablen aus dem bestehenden Trial-Projekt übernehmen, ohne sie in GitHub zu speichern:

- SMTP_HOST
- SMTP_PORT (587 mit STARTTLS, alternativ 465 mit TLS)
- SMTP_USER
- SMTP_PASSWORD
- SMTP_FROM (eine für das Konto erlaubte Absenderadresse)

Nach dem Setzen der Variablen neu deployen. Die Datei `.env.example` enthält nur Platzhalter. Zugangsdaten sind nicht Bestandteil dieses Pakets. Nach Einrichtung eine eigene Testanfrage senden und Eingang bei sales@voixero.com prüfen. Ohne SMTP meldet das Formular einen Fehler und bietet einen vorausgefüllten E-Mail-Link an; es zeigt keinen falschen Versand-Erfolg.

## Inhalte

- Launch 02.11.2026; erste fünf Kunden CHF 650 pro Monat für drei Monate, Total CHF 1’950 zzgl. MwSt.; keine automatische Verlängerung.
- Sichtbarkeit, Produkte, Kundenfeedback/Reputation, Werbung, Inhalte/Distribution und laufende Optimierung.
- Originales Voixero-Logo aus der bestehenden Landingpage.
- Vollständiger bereitgestellter Produktfilm (ca. 98 Sekunden), per Klick mit nativen Steuerelementen; kein Autoplay.
- Originale Enthüllungsgrafik, als damaliger Teaser gekennzeichnet, da sie „heute 18:42“ enthält.
- Calendly-Terminlink und Direktkontakt.
- SEO, Canonical, Social-Vorschau, Sitemap und robots.txt für becomeextrem.voixero.com.

## Lokale Prüfung

Node.js 22 oder höher:

```sh
npm ci
npm run check
npm run build
npx vercel dev
```

`dist/` enthält die statische Seite. Das Formular benötigt die Vercel Function unter `api/contact.js`; ein reiner statischer Server führt sie nicht aus.

## Vor dem Livegang

Anbieterinformationen und vollständige Datenschutzerklärung auf der Voixero-Hauptseite auf Aktualität prüfen. Der Footer verweist bewusst auf den aktuellen Anbieterauftritt; widersprüchliche ältere Firmenangaben wurden nicht übernommen. Die Seite verwendet keine Analyse- oder Werbetracker.

## Prüfung dieser Lieferung

JavaScript-Syntax und statischer Build geprüft. Browserprüfung der Desktopdarstellung und internen Navigation. Formulardaten werden serverseitig validiert; fehlende SMTP-Konfiguration führt zu HTTP 503. Echter E-Mail-Versand und Custom Domain erst nach Konfiguration prüfbar.
