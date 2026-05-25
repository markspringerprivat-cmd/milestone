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

## Update v27

- Das Minigame wurde auf ein Geschmack-/Obst-Minispiel umgebaut.
- Igel, Warnpfeile und alte Kugelblasen wurden entfernt.
- Der Ritter nutzt neue Walk-/Jump-/Fall-Sprites.
- Gute Obststücke `good_1..4` werden gesammelt.
- Chili `bad_1` zeigt kurz die Hot-Animation.
- Verdorbener Fisch `bad_2` zeigt kurz die Bad-Food-Animation.
- Herzlogik, Hintergrundmusik, Jump-Sound und Unverwundbarkeit bleiben erhalten.

## Update v28

- Das Obst-Ziel im Minigame liegt jetzt bei 50 gesammelten Obststücken.
- Vor dem Start erscheint ein Lern-/Anleitungs-Popup zum Geschmackssinn.
- Das Minigame startet erst nach Klick auf `Spiel starten`.
- Chilis und verdorbene Fische erscheinen am Anfang selten und werden mit dem Fortschritt etwas häufiger.

## Update v29

- Minigame-Steuerung ist jetzt nur noch Links/Rechts.
- Die Steuerungsleiste besteht aus zwei großen Hälften: links laufen und rechts laufen.
- Der Ritter bewegt sich etwas schneller.
- Chilis und verdorbene Fische erscheinen früher und mit dem Fortschritt etwas häufiger.
- Sammel-/Schadenssounds im Minigame nutzen kleine Audio-Pools, damit Einsammeln weniger ruckelt.

## Update v30

- Einsammeln wurde geglättet: Items werden nicht mehr per `display:none` entfernt, sondern unsichtbar geschaltet und im Pool behalten.
- Fallende Items haben jetzt feste DOM-Größen; unterschiedliche Größe läuft über `transform: scale(...)`.
- Der HUD-Zähler wird leicht verzögert gebündelt aktualisiert.
- Collect-Sound wird minimal verzögert gestartet, damit die sichtbare Kollisionsreaktion nicht im gleichen Frame blockiert.
- Drop-Shadow/Filter auf fallenden Items wurde entfernt.

## Update v32

- Ziel im Obst-Minispiel ist jetzt wieder 10 gesammelte Obstteile.
- Gute Obstteile erscheinen nur noch ungefähr alle fünf Sekunden.
- Dazwischen fallen überwiegend Chilis und verdorbene Fische.
- Die Anzahl der aktiven Obstteile ist auf eins begrenzt, damit beim Einsammeln deutlich weniger Aktionen/Sounds ausgelöst werden.

## Update v33

- Chilis und verdorbene Fische fallen etwas langsamer.
- Es sind jetzt 1-2 weniger schlechte Items gleichzeitig aktiv.
- Der Ritter kann horizontal um das Spielfeld laufen: rechts raus = links wieder rein, links raus = rechts wieder rein.
- Am Rand wird eine zweite Ritterdarstellung eingeblendet, damit die Figur beim Übergang geteilt sichtbar ist.

## Update v34

- Neues `minigame2.html` für Level 4 hinzugefügt.
- Minigame 2 ist ein Sehsinn-Memory mit 4×6 Karten und 12 Paaren.
- Level 4 auf dem Spielbrett startet jetzt das neue Memory-Minispiel.
- Während des Memorys kommen Blendkugeln von links oder rechts. Ein Warnpfeil zeigt die Richtung an.
- Unten gibt es nur einen großen Sprung-Button.
- Als Hintergrund wird `popup_sand.webp` genutzt.
