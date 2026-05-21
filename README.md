# Sinnesorgane QR-Level Webseite

Statische Webseite für GitHub Pages.

## Dateien
- `index.html` Startseite mit QR-Scanner und Milestone-Übersicht
- `codes.html` QR-Codes zum Anzeigen/Drucken
- `auge.html`, `ohr.html`, `nase.html`, `zunge.html`, `haut.html` einzelne Levelseiten
- `endlevel.html` Abschlusstest
- `style.css` Gestaltung
- `script.js` Logik, Freischaltung, Speicherung im Browser

## Nutzung
1. Repository bei GitHub erstellen.
2. Alle Dateien aus diesem Ordner direkt ins Repository hochladen.
3. GitHub Pages aktivieren.
4. `codes.html` öffnen und QR-Codes anzeigen oder drucken.
5. Lernende öffnen `index.html`, scannen die Codes und schalten die Level frei.

Hinweis: Der Kamerascanner funktioniert im Browser nur auf HTTPS-Seiten zuverlässig. GitHub Pages nutzt HTTPS. Lokal per `file://` kann die Kamera blockiert sein. Deshalb gibt es zusätzlich eine manuelle Code-Eingabe.
