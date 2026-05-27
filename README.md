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

## Update v35

- Minigame2: Ritter pulsiert im Stand leicht.
- Minigame2: `flip.mp3` wird beim Umdrehen einer Karte abgespielt.
- Minigame2: `pair.mp3` wird bei einem gefundenen Paar abgespielt.
- Minigame2: schwarze Ränder der Memory-Kartenbilder wurden per Transparenz entfernt.
- Minigame2: Blendkugel-Bahn wird beim Start jeder Kugel neu auf die Ritterebene über der Navigationsleiste gesetzt.
- Minigame2: Herzen sind oben mittig positioniert.
- Minigame2: Warnpfeile sind größer und neon-rot hervorgehoben.

## Update v36

- Neues Riechsinn-Minispiel `minigame3.html`.
- Level 6 / Slot 5 startet das Duftrohr-Rätsel und kann nach Abschluss erneut gespielt werden.
- Rohrkacheln: viele `pipe_V`/`pipe_I`, einige `pipe_T` und vier feste Filter.
- `pipe_V`, `pipe_I` und `pipe_T` können ausgewählt und per erneutem Klick um 90 Grad gedreht werden.
- Der Duftweg muss vom oberen Spielrand durch alle vier Filter bis zum Ventil führen.
- Das Ventil liegt auf einer `no_pipe`-Plattform rechts neben Sir Nervus und prüft nach einer 3-Sekunden-Drehanimation, ob gewonnen oder verloren wurde.

## Update v37

- Minigame3 startet jetzt unten am Ventil und endet oben am Endpunkt.
- Über und unter dem 6x6-Rohrfeld sitzt jeweils eine zusätzliche grüne Anschlusskachel.
- Das untere grüne Anschlussstück ist visuell mit dem Ventil verbunden.
- Die Rohrverbindung wird während des Drehens dynamisch vom Startpunkt aus geprüft.
- Alle Rohre und Filter, die eine Verbindung zum Ventil/Startpunkt haben, werden sofort durch grüne Versionen ersetzt.
- Gewonnen wird nur, wenn der Duft vom unteren Startpunkt durch alle vier Luftreinigungsfilter bis zum oberen Endpunkt läuft.

## Update v38

- Minigame3 nutzt jetzt ein festes, immer gleiches Rohrlayout.
- Die vier Luftfilter liegen auf B2, E2, B5 und E5.
- Das Ventilfeld ist direkt unter der ersten unteren Röhre angebracht, in Kachelgröße und ohne zusätzliches grünes Zwischenstück.
- Der gelbe Auswahlrahmen ist dünner, eckiger und liegt am Rand der Kachel.
- Das Rohrfeld wurde ungefähr um eine Kachellänge nach unten geschoben.
- Der Drehsound für Rohrkacheln wird direkt beim Klick gestartet.
- Das Ventil dreht jetzt 2 Sekunden statt 3 Sekunden.
- Der Tipp-Button unten rechts setzt eine Lösungskachel korrekt, markiert sie grün und sperrt sie.
- Das Ventilbild wurde erneut freigestellt, inklusive heller Innenflächen.


## Minigame3 v48 – stabile Oger-/Duftwolken-Logik

Diese Version stabilisiert das Riech-Minispiel:

- Der Oger wird per JavaScript am realen Rohrfeld ausgerichtet.
- Position: mittig über den beiden oberen linken Kacheln, am oberen Spielfeldrand.
- Die Duftwolke wird nicht mehr an der Düse berechnet, sondern exakt über dem Oger zentriert.
- Die Duftwolke liegt im Vordergrund und ist nur etwas größer als der Oger, damit sie ihn verdeckt.
- Beim korrekten Ventil-Klick:
  1. Banane verschwindet sofort.
  2. Ventil dreht 2 Sekunden.
  3. Duftwolke ist genau diese 2 Sekunden sichtbar.
  4. Während die Wolke sichtbar ist, wird der Oger im Hintergrund zu `ogre_clean`.
  5. Wolke verschwindet.
  6. Der saubere Oger bleibt 3 Sekunden sichtbar.
  7. Danach erscheint das Gewinn-Popup.
- Wenn der Weg noch nicht vollständig grün verbunden ist, verliert man nicht mehr sofort. Das Ventil bewegt sich nur kurz und springt zurück.
- Sobald der Weg vollständig korrekt ist, bekommt die Ventil-Kachel einen goldenen Rahmen.
- Cache-Buster für `minigame3.html`: `v4_48_stable_ogre_cloud_valve_20260526`.


## Update v49 – Oger-/Duftwolken-Fix

- Oger bleibt an der oberen linken Spielfeldkante positioniert, mittig über den beiden linken oberen Kacheln.
- Duftwolke wird jetzt **exakt über dem Mittelpunkt des Ogers** positioniert.
- Duftwolke ist nur leicht größer als der Oger, damit sie ihn verdeckt, aber nicht das halbe Spielfeld überlagert.
- Ventil-, Spray- und Oger-Clean-Logik aus v48 bleibt erhalten.

### Test
- `minigame3.html?v=49` aufrufen oder hart neu laden.


## Update v50 – gekoppelte Oger-/Duftwolken-Darstellung

Diese Version ersetzt die Minigame-3-Bilder durch die neu hochgeladenen kleineren Assets und koppelt die Positionen stabil aneinander.

### Wichtigste Änderung

- Die Duftwolke ist jetzt ein Kind des Oger-Containers.
- Dadurch wird sie nicht mehr frei auf der Stage berechnet, sondern bleibt exakt auf dem Oger zentriert.
- Der Mittelpunkt der Wolke liegt auf dem Mittelpunkt des Ogers.
- Die Wolke ist ca. 1–2 cm größer als der Oger und verdeckt ihn während des Sprühens.
- Der Oger steht weiterhin am oberen linken Spielfeldrand, mittig über den beiden oberen linken Kacheln.

### Verhalten

1. Unfertiger Rohrweg: Ventil tippen → kurzer Drehimpuls, kein Verloren-Popup.
2. Fertiger Rohrweg: Ventil-Kachel erhält Goldrahmen.
3. Ventil tippen → Spray-Sound, Duftwolke 2 Sekunden über dem Oger.
4. Während die Wolke sichtbar ist, wird der Oger zu `ogre_clean`.
5. Wolke verschwindet, sauberer Oger bleibt 3 Sekunden sichtbar.
6. Danach erscheint das Gewinn-Popup.

### Test

Nach GitHub-Upload testen mit:

`minigame3.html?v=50`


## Update v51 – Prozentuale Oger-Positionierung

- Neue, kleinere Minigame-3-Assets wurden übernommen.
- Oger-Position nutzt jetzt prozentuale Richtwerte:
  - 60% Abstand vom linken Stage-Rand bis zum Flakon-Mittelpunkt.
  - 30% Überlappung in das obere Spielfeld hinein.
  - Zusätzlich wird die Position in den Bereich der beiden oberen linken Kacheln geklemmt, damit er nicht mehr in die Bildschirmecke springt.
- Die Duftwolke liegt als echtes Kind im Oger-Container. Dadurch ist sie nicht mehr separat auf der Bühne positioniert, sondern exakt am Oger zentriert.
- Die Duftwolke ist ca. 180% der Oger-Containergröße und verdeckt den Oger zuverlässig.

Test: `minigame3.html?v=51`


## Update v52 – Oger und Duftwolke größer

- Oger normal wird doppelt so groß angezeigt.
- Oger Wurfposition wird doppelt so groß angezeigt.
- Oger Clean wird über dasselbe Oger-Element ebenfalls doppelt so groß angezeigt.
- Duftwolke bleibt am Oger gekoppelt und wird durch die größere Oger-Zone ebenfalls deutlich größer dargestellt.
- Spiel-, Sound- und Ventillogik bleiben unverändert.

### Test
- `minigame3.html?v=52` öffnen oder hart neu laden.


## Update v53 – Ritter/Throw/Valve-Feinschliff

- Neues Standard-Ritterbild (`hero_idle.png`) eingebunden.
- Ritter-Idle bleibt größenmäßig an die Schutzschild-Version angepasst.
- Neues `throw.mp3` eingebunden und wird exakt beim Start des Oger-Wurfs abgespielt.
- Angriffstakt des Ogers auf 3–5 Sekunden gesetzt.
- Schilddauer auf 0,7 Sekunden gesetzt.
- Schild-Aufladung auf 1,3 Sekunden gesetzt.
- Ventilbild auf transparenten Hintergrund umgestellt, damit es direkt auf der Steinkachel liegt.

### Test
- `minigame3.html?v=53`

## Update v54 – Level 8 Tastsinn-Kran + Board-Testbutton

### Level 8 / Minigame 4

- Neues HTML-Minispiel `minigame4.html` eingebaut.
- Slot/Level: Level 8, intern Platzhalter-Slot `7`.
- Thema: Tastsinn.
- Spielprinzip: Kran über ein 4×4-Feld bewegen und weiche Gegenstände einsammeln.
- Weiche Gegenstände geben Fortschritt.
- Spitze Gegenstände kosten ein Herz.
- Neutrale Gegenstände geben Feedback, kosten aber kein Herz.
- Gewinn: alle 5 weichen Gegenstände gesammelt.
- Verlust: 3 Herzen verbraucht.

### Spielbrett-Menü

- Im unteren Board-Menü wurde ein Button `Alle Level freischalten` ergänzt.
- Der Button setzt lokal alle Level auf abgeschlossen/freigeschaltet und weist die QR-Level sinnvoll zu.
- Level 8 kann danach direkt erneut als Fühl-Kran gestartet werden.

### Test

- Board: `index.html?v=54`
- Level 8 direkt: `minigame4.html?slot=7&v=54`


## Update v56 – Level 8 Tastsinn-Kran mit Fallgrube

- Minigame 4 wurde auf die gezeichnete 2D-Fallgruben-Idee umgebaut.
- Unten steht Sir Nervus links vor einer Fallgrube.
- Oben befindet sich ein 4×4-Kranspielfeld mit weichen, spitzen und neutralen Gegenständen.
- Steuerung:
  - ↑ gedrückt halten: grüne Kranmarkierung fährt langsam nach oben.
  - Nach Loslassen wird ↑ ausgegraut.
  - → gedrückt halten: grüne Markierung fährt langsam nach rechts.
  - Beim Loslassen oder am rechten Rand fällt der Kran nach unten.
- Gegriffen wird exakt das Item unter der grünen Markierung.
- Weiche Items füllen die Fallgrube als sicheren Boden.
- Spitze Items verursachen Schaden.
- Ziel: 5 weiche Bodenstücke sammeln, damit Sir Nervus über die Grube laufen kann.

### Test
- `minigame4.html?slot=7&v=56`


## Update v57 – Kran-Merkspiel mit Fallgrube

- Level 8 / `minigame4.html` wurde zu einem 3×3-Merkspiel umgebaut.
- Pro Runde werden 8 spitze Gegenstände und 1 weicher Gegenstand gezeigt.
- Die Gegenstände sind 5 Sekunden sichtbar.
- Danach werden die Karten verdeckt und 5 Sekunden lang langsam gemischt.
- Während des Mischens sind die Gegenstände nicht sichtbar.
- Der Kran ist jetzt ein sichtbarer roter Punkt statt nur ein grüner Feldrahmen.
- Mit ↑ wird die Höhe gewählt, danach mit → die horizontale Position.
- Beim Loslassen von → fällt der Kran nach unten und wählt die verdeckte Karte darunter.
- Drei ausgewählte Karten fallen verdeckt in die Grube.
- Danach werden die drei Grubenkarten nacheinander aufgedeckt.
- Sobald eine spitze Karte dabei ist, ist das Level verloren.
- Das Herzsystem wurde für dieses Minigame entfernt.
- Große schwarze Pfeile und sichtbare Feldlinien wurden entfernt.

### Test

`minigame4.html?slot=7&v=57`


## Update v58 – Kranbewegung und 3×3-Raster korrigiert

- Das Kranfeld zeigt jetzt ein sauberes 3×3-Raster mit genau einem Item pro Feld.
- Die Feldlinien bleiben unsichtbar, aber die Items sind gleichmäßig über drei Reihen und drei Spalten verteilt.
- Der rote Kranpunkt bewegt sich sichtbar und langsam über das Raster.
- Die Auswahl des Items richtet sich nach der Position des roten Kranpunkts.
- Beim Mischen heben sich zwei Karten sichtbar an und tauschen ihre Position.
- Die obere Beschreibung wurde ausgeblendet, damit mehr Platz für das Spielfeld bleibt.

### Test
- `minigame4.html?slot=7&v=58`


## Update v59 – Level 8 ohne Kransteuerung

- Level 8 wurde von der Pfeil-/Kransteuerung auf ein direktes Auswahl-Merkspiel umgestellt.
- Das obere Spielfeld ist ein zentriertes quadratisches 3×3-Raster.
- Alle neun Felder sind gleich groß und füllen das Quadrat vollständig.
- In jedem Feld liegt genau ein Gegenstand.
- Pro Runde gibt es acht spitze Gegenstände und einen weichen Gegenstand.
- Nach fünf Sekunden werden die Karten verdeckt und fünfmal gemischt.
- Getauscht werden ausschließlich benachbarte Karten: links/rechts oder oben/unten.
- Beim Tausch heben sich die beiden Karten sichtbar an und wechseln ihre Position.
- Nach dem Mischen erscheint „Wähle einen Gegenstand“.
- Der gewählte verdeckte Gegenstand fliegt in die nächste freie Brückenposition in der Grube.
- Nach drei gewählten Gegenständen werden die Brückenkarten nacheinander aufgedeckt.

### Test
- `minigame4.html?slot=7&v=59`


## Update v60 – Level 8 Fühlbrücke neu aufgebaut

- `minigame4.html` wurde als eigenständiges 3×3-Brücken-Merkspiel neu aufgebaut.
- Die alte Kran-/Pfeilsteuerung wurde entfernt.
- Oben gibt es ein zentriertes quadratisches 3×3-Raster mit gleich großen Feldern.
- In jeder Runde werden 8 spitze Gegenstände und genau 1 weicher Gegenstand geladen.
- Weiche Gegenstände sind fest nach Runde: 1. Kissen, 2. Wolke, 3. Teddy.
- Die Karten werden erst offen gezeigt, dann verdeckt und fünfmal sichtbar gemischt.
- Es werden ausschließlich direkt benachbarte Karten getauscht.
- Nach dem Mischen wählt der Spieler eine Karte, die verdeckt in die nächste Brückenposition gelegt wird.
- Nach drei gewählten Karten erscheint „Weg fortsetzen“.
- Sir Nervus läuft über die drei Karten; jede Karte wird beim Betreten aufgedeckt.
- Eine spitze Karte führt sofort zum Verlust, drei weiche Karten führen zum Gewinn.

### Test

`minigame4.html?slot=7&v=60`
