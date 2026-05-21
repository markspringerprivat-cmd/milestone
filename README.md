# Sinnesorgane QR-Spielbrett

Statische Webseite für GitHub Pages.

## Ablauf
- Beim Öffnen der Startseite ist zuerst nur das Spielbrett sichtbar.
- Die runden Felder werden nacheinander aktiv.
- Auf einem aktiven Feld kann ein beliebiger noch nicht verwendeter QR-Code gescannt werden.
- Das gescannte Sinnesorgan wird dem aktuellen Level-Feld zugeordnet.
- Nach dem Levelabschluss wird das nächste Feld aktiv.
- Nach fünf abgeschlossenen Leveln wird die Krone mit dem Endlevel freigeschaltet.

## Dateien
- `index.html` – Spielbrett
- `codes.html` – QR-Codes zum Anzeigen/Drucken
- `auge.html`, `ohr.html`, `nase.html`, `zunge.html`, `haut.html` – Levelseiten
- `endlevel.html` – Abschlusstest
- `board.png` – Spielbrett-Hintergrund
- `lock.png` – Schloss-Symbol
- `style-game.css` – Gestaltung
- `script-game.js` – Logik

Der Fortschritt wird lokal im Browser per `localStorage` gespeichert.
