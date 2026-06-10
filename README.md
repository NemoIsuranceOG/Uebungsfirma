# Nemo Uebungsfirma Website

Dieses Repository enthaelt die Website fuer die Nemo Uebungsfirma.

## Struktur

- `index.html` - Einstiegspunkt der Website
- `assets/styles.css` - Gestaltung
- `assets/app.js` - Laedt Inhalte aus der Daten-Datei
- `data/site.json` - Bearbeitbare Website-Inhalte
- `.github/workflows/pages.yml` - Vorbereitung fuer GitHub Pages Deployment

## Inhalte bearbeiten

Texte, Kontaktadresse und Leistungs-Karten liegen in `data/site.json`. Aenderungen an dieser Datei werden von GitHub versioniert und koennen spaeter direkt in die Website uebernommen werden.

## Deployment

Das Repository ist fuer GitHub Pages mit GitHub Actions vorbereitet. Falls Pages noch nicht aktiv ist, in den Repository-Einstellungen unter **Pages** als Quelle **GitHub Actions** auswaehlen.
