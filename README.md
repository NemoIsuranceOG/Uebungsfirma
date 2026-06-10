# NEMO Insurance OG Website

Moderne statische Website für die ACT-Übungsfirma **NEMO Insurance OG**.

## Inhalt

- Startseite mit Hero, Logo, Claim und Call-to-Actions
- Produktbereich für Handyversicherung, Laptopversicherung und Tabletversicherung
- Mehrstufiger Online-Antrag ohne echte Zahlung
- Kontaktformular
- Über-uns-Bereich mit Mission, Vision und Werten
- Impressum und Datenschutz
- GitHub-Pages-Workflow
- KI-Bildprompts in `docs/image-prompts.md`

## Projektstruktur

- `index.html` - Hauptseite
- `assets/styles.css` - Layout, Branding, Responsive Design
- `assets/app.js` - Produktdaten, Formularschritte, Navigation
- `assets/logo.svg` - NEMO-Fischlogo als SVG
- `assets/favicon.svg` - Browser-Icon
- `data/site.json` - Firmendaten, Werte und Produkt-/Tarifdaten
- `impressum.html` - Impressum
- `datenschutz.html` - Datenschutzhinweise
- `.github/workflows/pages.yml` - Deployment für GitHub Pages

## GitHub Pages aktivieren

1. Repository auf GitHub öffnen.
2. **Settings > Pages** öffnen.
3. Bei **Source** die Option **GitHub Actions** wählen.
4. Danach wird der Workflow `Deploy website to GitHub Pages` beim nächsten Push auf `main` ausgeführt.

## Formularlösung

Die Website nutzt [FormSubmit](https://formsubmit.co/) als kostenlose, GitHub-Pages-kompatible Formularlösung.

- Empfänger: `nemo3018@uebungsfirmen.at`
- Keine geheimen API-Keys im Frontend
- Keine echten Zahlungen
- Keine Passwörter, PINs, Bankzugänge, Kreditkartendaten oder CVCs
- Formularinhalte werden als strukturierte Tabelle per E-Mail gesendet

Wichtig: Bei der ersten Formularübermittlung sendet FormSubmit in der Regel eine Aktivierungs-/Bestätigungs-E-Mail an die Empfängeradresse. Diese muss einmal bestätigt werden, damit die Weiterleitung dauerhaft funktioniert.

## Inhalte bearbeiten

Produktdaten und Firmendaten werden in `data/site.json` gepflegt. Änderungen an dieser Datei werden von GitHub versioniert und automatisch von der Website geladen.

## Lokale Vorschau optional

Die Website ist statisch. Falls eine lokale Vorschau gewünscht ist, kann im Repository-Ordner ein kleiner Server gestartet werden:

```bash
python3 -m http.server 8080
```

Dann im Browser öffnen:

```text
http://localhost:8080
```

## Hinweis zur ACT-Übungsfirma

Diese Website bildet einen realitätsnahen Geschäftsprozess ab. Die dargestellten Angebote und Formulare dienen Ausbildungs- und Übungszwecken.
