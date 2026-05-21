# Sinnesorgane QR-Spielbrett

Diese statische Webseite ist für GitHub Pages geeignet.

## Dateien
- `index.html` – Spielbrett mit Hintergrundbild und anklickbaren Level-Feldern
- `codes.html` – Lehrkraftseite mit QR-Codes zum Anzeigen oder Drucken
- `auge.html`, `ohr.html`, `nase.html`, `zunge.html`, `haut.html` – einzelne Levelseiten
- `endlevel.html` – Abschlusstest
- `style.css` – Gestaltung
- `script.js` – Freischaltlogik, QR-Scanner, Fortschrittsspeicherung
- `board.png` – Hintergrundbild des Spielbretts

## Hinweise
- Auf GitHub Pages funktioniert der QR-Scanner über HTTPS.
- Die Lernenden klicken auf das aktuelle Level-Feld, scannen den passenden QR-Code und schalten damit das Level frei.
- Der Fortschritt wird im Browser über `localStorage` gespeichert.
