# Königreich der Sinne – flache GitHub-Version

Diese Version enthält keine Unterordner. Alle Dateien liegen direkt auf oberster Ebene.

## Upload auf GitHub
1. ZIP lokal entpacken.
2. Nicht die ZIP-Datei hochladen.
3. Alle entpackten Dateien gemeinsam direkt in das Repository hochladen.
4. `index.html`, `level.html`, `codes.html`, `css/style.css`, `game.js` und alle Bilddateien müssen direkt nebeneinander sichtbar sein.

Der Fortschritt wird lokal im Browser gespeichert.

## Ordnerstruktur

- `index.html`, `level.html`, `battle.html`, `minigame.html`, `codes.html`: Hauptseiten im Projektroot.
- `css/`: Stylesheets.
- `js/`: Spiel-Logik.
- `assets/audio/`: Musik und Soundeffekte.
- `assets/images/characters/`: Figuren und Gegner.
- `assets/images/minigame/`: Minigame-Sprites.
- `assets/images/stages/`: Level-Hintergründe.
- `assets/images/popups/`: Popup-/Minigame-Hintergründe.
- `assets/images/battle/`: Kampf- und Ergebnisbilder.
- `assets/images/qr/`: QR-Codes.
- `assets/images/ui/`: Spielbrett, Intro/Outro und UI-Bilder.

## Pfad-Hinweis

Alle Projektseiten liegen im Hauptordner. Stylesheets liegen in `css/`, JavaScript in `js/`, und alle Medien liegen unter `assets/`.
Die JavaScript-Navigation benutzt `pageUrl(...)`, damit `index.html`, `level.html`, `battle.html` und `minigame.html` unabhängig vom Hosting-Unterordner korrekt aufgerufen werden.

## Update v21

- Minigame-Sprungbilder wurden neu zugeordnet (`mini_jump_left/right`, `mini_fall_left/right`).
- Minigame-Ergebnis nutzt jetzt die vorhandenen `gewonnen_text.webp`/`verloren_text.webp` Bilder.
- Battle-Sounds werden nicht mehr aus Bildpfaden abgeleitet, sondern passend über `richtig_1..3` und `falsch_1..3` ausgelöst.
- Erster Levelstart: Ritter fliegt rechts aus dem Spielbrett und kommt links wieder herein.

## Update v22

- Minigame-Sprites wurden verkleinert, damit der Browser beim Springen weniger große PNGs dekodieren muss.
- Minigame-Bewegungen laufen nun über `transform: translate3d(...)` statt über `left/top`.
- Kollisionen im Minigame werden mathematisch aus gespeicherten Positionen berechnet, ohne `getBoundingClientRect()` pro Frame.
- Igel, Kugeln und Ritter werden im Spiel mit GPU-freundlichen Transform-Werten bewegt.

## Update v25

- Minigame-Kugeln werden jetzt über einen festen Object-Pool wiederverwendet.
- Während des Spiels werden keine Kugel-Elemente mehr per `appendChild()` neu erzeugt oder per `.remove()` gelöscht.
- Die aktiven Kugeln werden über feste Slots und aktive Zähler verwaltet, damit das Spiel bei längerer Laufzeit stabiler bleibt.

## Update v26

- Battle-Sounds `richtig_1..3` und `falsch_1..3` werden jetzt über vorgewärmte Audio-Pools abgespielt, statt bei jedem Treffer eine neue Audio-Datei zu erzeugen.
- Minigame-Loop hat jetzt eine klare `requestAnimationFrame`-Verwaltung mit `cancelAnimationFrame`.
- Bei Minigame-Ende oder Navigation wird der Loop gestoppt.
- Nach Tab-/Sichtbarkeitswechsel wird die Zeitbasis zurückgesetzt, damit kein großer Physik-Sprung entsteht.
- Zusätzliche GPU-/Compositing-Hinweise für Minigame- und Battle-Elemente.
