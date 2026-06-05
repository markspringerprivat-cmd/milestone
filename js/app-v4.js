(() => {
  'use strict';

  const STORE = 'koenigreichSinneV4State';
  const BATTLE_STORE = 'koenigreichSinneV4Battle';
  const BATTLE_BACKUP_STORE = 'koenigreichSinneV4BattleBackup';
  const RETURN_STORE = 'koenigreichSinneV4BoardReturn';
  const SOUND_STORE = 'koenigreichSinneV4Muted';
  const BOARD_WELCOME_STORE = 'koenigreichSinneV4PendingBoardWelcome';
  const DEFAULT_HERO_NAME = 'Sir Nervus';
  const HERO_GENDER_OPTIONS = ['male', 'female'];
  const DEFAULT_HERO_GENDER = 'male';
  const DEFAULT_HERO_PRONOUN = 'er';
  const STATE_VERSION = 'v4_76_stable_village_layout';
  const APP_ROOT = new URL('./', document.baseURI);
  const pageUrl = target => new URL(target, APP_ROOT).href;
  const assetUrl = target => new URL(target, APP_ROOT).href;

  const SENSES = {
    sehen: {
      id: 'sehen', label: 'Sehen', enemyName: 'Sehlina', code: 'SINNE-SEHEN', enemy: 'assets/images/characters/sehen.webp', defeated: 'assets/images/characters/sehen_besiegt.webp',
      title: 'Level: Sehen', speech: '„Meine Illusionen blenden dich. Mal sehen, ob du den richtigen Reiz erkennst!”',
      intro: 'Hier geht es um das Auge, Lichtreize und die Verarbeitung von Sehinformationen.',
      content: ['Das Auge nimmt Lichtreize aus der Umgebung auf. Hornhaut und Linse bündeln das Licht, sodass auf der Netzhaut ein Bild entsteht.', 'Auf der Netzhaut sitzen Sinneszellen. Sie wandeln Licht in elektrische Signale um. Diese Signale gelangen über den Sehnerv zum Gehirn, wo sie verarbeitet und zu einem Bild zusammengesetzt werden.']
    },
    hoeren: {
      id: 'hoeren', label: 'Hören', enemyName: 'Höhribert', code: 'SINNE-HOEREN', enemy: 'assets/images/characters/hoeren.webp', defeated: 'assets/images/characters/hoeren_besiegt.webp',
      title: 'Level: Hören', speech: '„Ich verdrehe jede Schallwelle. Ob du trotzdem den richtigen Ton triffst?”',
      intro: 'Hier geht es um das Ohr, Schallwellen und den Gleichgewichtssinn.',
      content: ['Das Ohr nimmt Schallwellen auf. Die Ohrmuschel leitet den Schall zum Trommelfell weiter. Dieses gerät in Schwingung.', 'Die Gehörknöchelchen verstärken die Schwingungen. In der Hörschnecke werden sie in Nervensignale umgewandelt. Außerdem ist das Innenohr wichtig für das Gleichgewicht.']
    },
    riechen: {
      id: 'riechen', label: 'Riechen', enemyName: 'Riechard', code: 'SINNE-RIECHEN', enemy: 'assets/images/characters/riechen.webp', defeated: 'assets/images/characters/riechen_besiegt.webp',
      title: 'Level: Riechen', speech: '„Mein Nebel liegt in der Luft. Folge der Spur, wenn du dich traust!”',
      intro: 'Hier geht es um die Nase, Geruchsstoffe und die Bedeutung des Riechens im Alltag.',
      content: ['Die Nase erkennt Geruchsstoffe in der Luft. Beim Einatmen gelangen Duftmoleküle zur Riechschleimhaut.', 'Dort sitzen Riechzellen, die passende Moleküle erkennen und Signale an das Gehirn senden. Gerüche können warnen, Erinnerungen auslösen und den Geschmack beeinflussen.']
    },
    schmecken: {
      id: 'schmecken', label: 'Schmecken', enemyName: 'König Schmatz', code: 'SINNE-SCHMECKEN', enemy: 'assets/images/characters/schmecken.webp', defeated: 'assets/images/characters/schmecken_besiegt.webp',
      title: 'Level: Schmecken', speech: '„Süß, sauer, salzig? Ich bringe alles durcheinander. Beweise deinen Geschmack!”',
      intro: 'Hier geht es um die Zunge, Geschmacksrichtungen und das Zusammenspiel der Sinne.',
      content: ['Auf der Zunge befinden sich Geschmacksknospen. Sie erkennen Stoffe aus der Nahrung und ermöglichen Geschmackswahrnehmungen.', 'Häufig unterscheidet man süß, sauer, salzig, bitter und umami. Geschmack entsteht aber nicht nur auf der Zunge: Geruch, Temperatur und Konsistenz wirken mit.']
    },
    fuehlen: {
      id: 'fuehlen', label: 'Fühlen', enemyName: 'Dr. Tastibald', code: 'SINNE-FUEHLEN', enemy: 'assets/images/characters/fuehlen.webp', defeated: 'assets/images/characters/fuehlen_besiegt.webp',
      title: 'Level: Fühlen', speech: '„Meine Panzer fühlen alles. Spürst du, was Schutz wirklich bedeutet?”',
      intro: 'Hier geht es um die Haut, Berührung, Temperatur, Schmerz und Schutz.',
      content: ['Die Haut ist das größte Sinnesorgan des Körpers. Sie enthält Rezeptoren für Berührung, Druck, Wärme, Kälte und Schmerz.', 'Gleichzeitig schützt die Haut vor Verletzungen, Krankheitserregern und Austrocknung. Sie ist also Sinnesorgan und Schutzschicht zugleich.']
    }
  };

  const BOSS = {
    id: 'boss', label: 'Boss', code: 'SINNE-BOSS', enemyName: 'Sinntron 3000', enemy: 'assets/images/characters/boss.webp', defeated: 'assets/images/characters/boss_besiegt.webp', title: 'Finale: Boss der Sinne',
    speech: '„Alle Sinne gegen mich? Dann zeig, dass du das Königreich wirklich verstanden hast!”',
    intro: 'Im finalen Level geht es um das Zusammenspiel aller Sinnesorgane.',
    content: ['Sinnesorgane nehmen Reize aus der Umwelt oder aus dem Körper auf. Das Gehirn verarbeitet diese Informationen und ordnet sie ein.', 'Viele Wahrnehmungen entstehen durch das Zusammenspiel mehrerer Sinne. Beim Essen wirken zum Beispiel Geschmack, Geruch, Temperatur, Konsistenz und Sehen zusammen.']
  };

  const QUESTION_BANK = {
    sehen: [
      { q: 'Wo werden Lichtreize im Auge in Nervensignale umgewandelt?', a: ['In der Linse', 'Auf der Netzhaut', 'In der Ohrmuschel'], correct: 1 },
      { q: 'Welche Aufgabe hat die Linse?', a: ['Sie bündelt das Licht', 'Sie erzeugt Geräusche', 'Sie schmeckt süß'], correct: 0 },
      { q: 'Wohin leitet der Sehnerv die Signale?', a: ['Zum Gehirn', 'Zur Haut', 'Zur Zunge'], correct: 0 },
      { q: 'Was erkennt das Auge besonders gut?', a: ['Licht, Farben und Bewegung', 'Gerüche und Düfte', 'Wärme im Essen'], correct: 0 },
      { q: 'Warum arbeiten Auge und Gehirn zusammen?', a: ['Das Gehirn ordnet die Sehinformationen ein', 'Das Auge verdaut Nahrung', 'Das Gehirn ersetzt die Netzhaut'], correct: 0 }
    ],
    hoeren: [
      { q: 'Welches Sinnesorgan ist auch am Gleichgewicht beteiligt?', a: ['Die Zunge', 'Die Nase', 'Das Ohr'], correct: 2 },
      { q: 'Was sammelt Schallwellen zuerst?', a: ['Die Ohrmuschel', 'Die Netzhaut', 'Die Geschmacksknospe'], correct: 0 },
      { q: 'Was gerät durch Schall in Schwingung?', a: ['Das Trommelfell', 'Die Pupille', 'Die Hautporen'], correct: 0 },
      { q: 'Wo werden Schwingungen in Nervensignale umgewandelt?', a: ['In der Hörschnecke', 'In der Linse', 'Auf der Zunge'], correct: 0 },
      { q: 'Warum ist lauter Schall problematisch?', a: ['Er kann das Gehör schädigen', 'Er macht Farben unsichtbar', 'Er verhindert jeden Geschmack'], correct: 0 }
    ],
    riechen: [
      { q: 'Warum schmeckt Essen bei Schnupfen oft schwächer?', a: ['Weil die Haut langsamer arbeitet', 'Weil Geruch und Geschmack zusammenwirken', 'Weil die Augen weniger Licht aufnehmen'], correct: 1 },
      { q: 'Was gelangt beim Riechen zur Riechschleimhaut?', a: ['Duftmoleküle', 'Lichtstrahlen', 'Schallwellen'], correct: 0 },
      { q: 'Welche Zellen erkennen Geruchsstoffe?', a: ['Riechzellen', 'Hörzellen', 'Sehzellen der Netzhaut'], correct: 0 },
      { q: 'Wobei kann der Geruchssinn helfen?', a: ['Vor Rauch oder verdorbenem Essen warnen', 'Bücher schneller lesen', 'Kälte sehen'], correct: 0 },
      { q: 'Womit sind Gerüche oft eng verbunden?', a: ['Erinnerungen und Gefühlen', 'Nur mit Knochen', 'Nur mit Muskeln'], correct: 0 }
    ],
    schmecken: [
      { q: 'Welche Geschmacksrichtung gehört zu den häufig genannten Grundrichtungen?', a: ['Umami', 'Knusprig', 'Heiß'], correct: 0 },
      { q: 'Wo befinden sich viele Geschmacksknospen?', a: ['Auf der Zunge', 'Im Trommelfell', 'In der Pupille'], correct: 0 },
      { q: 'Was gehört nicht zu den klassischen Geschmacksrichtungen?', a: ['Süß', 'Bitter', 'Glänzend'], correct: 2 },
      { q: 'Warum beeinflusst die Nase den Geschmack?', a: ['Geruch und Geschmack werden gemeinsam verarbeitet', 'Die Nase kaut die Nahrung', 'Die Nase ersetzt die Zunge vollständig'], correct: 0 },
      { q: 'Was kann den Geschmack zusätzlich beeinflussen?', a: ['Temperatur und Konsistenz', 'Nur die Haarfarbe', 'Nur die Schuhgröße'], correct: 0 }
    ],
    fuehlen: [
      { q: 'Welche Funktion hat Schmerz?', a: ['Er warnt vor möglicher Gefahr', 'Er verbessert das Sehen', 'Er ersetzt den Geruchssinn'], correct: 0 },
      { q: 'Welches ist das größte Sinnesorgan des Körpers?', a: ['Die Haut', 'Das Auge', 'Das Ohr'], correct: 0 },
      { q: 'Welche Reize kann die Haut wahrnehmen?', a: ['Druck, Wärme, Kälte und Schmerz', 'Nur Farben', 'Nur Musik'], correct: 0 },
      { q: 'Welche zusätzliche Aufgabe hat die Haut?', a: ['Sie schützt den Körper', 'Sie bündelt Licht auf der Netzhaut', 'Sie erzeugt Schallwellen'], correct: 0 },
      { q: 'Warum ist Berührung ein Sinneseindruck?', a: ['Rezeptoren in der Haut nehmen sie wahr', 'Die Zunge sieht sie', 'Die Nase hört sie'], correct: 0 }
    ],
    boss: [
      { q: 'Welche Aussage passt am besten?', a: ['Sinnesorgane arbeiten immer vollständig getrennt.', 'Nur die Zunge ist für Geschmack verantwortlich.', 'Das Gehirn verarbeitet Sinnesinformationen und ordnet sie ein.'], correct: 2 },
      { q: 'Was nehmen Sinnesorgane auf?', a: ['Reize', 'Hausaufgaben', 'Batterien'], correct: 0 },
      { q: 'Warum wirken beim Essen mehrere Sinne zusammen?', a: ['Geruch, Geschmack, Temperatur und Konsistenz ergänzen sich', 'Nur das Ohr entscheidet über Geschmack', 'Die Haut ersetzt das Gehirn'], correct: 0 },
      { q: 'Was macht das Gehirn mit Sinnesinformationen?', a: ['Es verarbeitet und ordnet sie ein', 'Es löscht sie sofort', 'Es schickt sie zur Pflanze'], correct: 0 },
      { q: 'Was zeigt das Königreich der Sinne insgesamt?', a: ['Wahrnehmung entsteht durch mehrere zusammenarbeitende Systeme', 'Nur ein Sinn ist wichtig', 'Sinne haben nichts mit Lernen zu tun'], correct: 0 }
    ]
  };

  const LEVEL_COUNT = 12;
  const QR_LEVELS = [0, 2, 4, 6, 8, 10];
  const PLACEHOLDER_LEVELS = [1, 3, 5, 7, 9, 11];
  const BOSS_SLOT = 10;
  const LEVEL_POSITIONS = [
    { x: 31.0, y: 90.2 },
    { x: 66.8, y: 84.6 },
    { x: 70.5, y: 67.2 },
    { x: 31.5, y: 66.8 },
    { x: 22.8, y: 51.8 },
    { x: 62.2, y: 47.6 },
    { x: 66.4, y: 36.2 },
    { x: 31.0, y: 36.8 },
    { x: 23.4, y: 21.8 },
    { x: 69.8, y: 21.2 },
    { x: 86.0, y: 8.2 },
    { x: 50.0, y: 9.8 }
  ];
  const BOARD_RATIO = 1024 / 1536;
  const STAGE_BACKGROUNDS = ['assets/images/stages/stage_gras.webp', 'assets/images/stages/stage_sand.webp', 'assets/images/stages/stage_eis.webp', 'assets/images/stages/stage_lava.webp', 'assets/images/stages/stage_himmel.webp', 'assets/images/stages/stage_all.webp'];
  const POPUP_BACKGROUNDS = ['assets/images/popups/popup_gras.webp', 'assets/images/popups/popup_sand.webp', 'assets/images/popups/popup_eis.webp', 'assets/images/popups/popup_lava.webp', 'assets/images/popups/popup_himmel.webp', 'assets/images/popups/popup_all.webp'];
  const isPlaceholderSlot = index => PLACEHOLDER_LEVELS.includes(Number(index));
  const isQrSlot = index => QR_LEVELS.includes(Number(index));
  const SLOT_SENSE_MAP = { 0:'sehen', 1:'sehen', 2:'hoeren', 3:'hoeren', 4:'riechen', 5:'riechen', 6:'schmecken', 7:'schmecken', 8:'fuehlen', 9:'fuehlen', 10:'boss', 11:'boss' };
  const HERO_DEFAULT_POINT = { x: 50.1, y: 66.8 };
  const KEY_ORDER = ['riechen', 'hoeren', 'sehen', 'schmecken', 'fuehlen'];
  const BIOME_BY_SENSE = {
    riechen:   { id:'riechen', label:'Grasland', stageIndex:0, board:{ minigame:{ x:31.0, y:54.2 }, question:{ x:18.8, y:46.8 }, key:{ x:27.4, y:58.0 } }, lock:'assets/images/ui/lock_grass.png', key:'assets/images/ui/key_grass.png' },
    hoeren:    { id:'hoeren', label:'Wüstenland', stageIndex:1, board:{ minigame:{ x:66.8, y:56.8 }, question:{ x:81.5, y:46.5 }, key:{ x:73.6, y:53.4 } }, lock:'assets/images/ui/lock_sand.png', key:'assets/images/ui/key_sand.png' },
    fuehlen:   { id:'fuehlen', label:'Eisgebiet', stageIndex:2, board:{ minigame:{ x:33.0, y:76.8 }, question:{ x:24.8, y:83.6 }, key:{ x:25.0, y:79.4 } }, lock:'assets/images/ui/lock_ice.png', key:'assets/images/ui/key_ice.png' },
    schmecken: { id:'schmecken', label:'Lavawelt', stageIndex:3, board:{ minigame:{ x:67.5, y:82.0 }, question:{ x:81.8, y:73.8 }, key:{ x:74.8, y:79.7 } }, lock:'assets/images/ui/lock_lava.png', key:'assets/images/ui/key_lava.png' },
    sehen:     { id:'sehen', label:'Himmelswelt', stageIndex:4, board:{ minigame:{ x:44.2, y:37.6 }, question:{ x:57.4, y:33.2 }, key:{ x:50.0, y:39.8 } }, lock:'assets/images/ui/lock_cloud.png', key:'assets/images/ui/key_cloud.png' },
    boss:      { id:'boss', label:'Kronenwelt', stageIndex:5, board:{ minigame:{ x:50.0, y:22.0 }, question:{ x:50.0, y:12.0 }, key:{ x:50.0, y:9.0 } }, lock:'assets/images/ui/lock.png', key:'' }
  };
  const LOCK_RENDER_ORDER = ['riechen', 'hoeren', 'sehen', 'schmecken', 'fuehlen'];
  const BIOME_LEVEL_PLAN = {
    riechen: [5, 4],
    hoeren: [9, 2],
    sehen: [3, 0],
    schmecken: [1, 6],
    fuehlen: [7, 8],
    boss: [11, 10]
  };
  const slotSenseId = slot => SLOT_SENSE_MAP[Number(slot)] || 'boss';
  const biomeForSenseId = senseId => BIOME_BY_SENSE[senseId] || BIOME_BY_SENSE.boss;
  const biomeForSlot = slot => biomeForSenseId(slotSenseId(slot));
  const stageIndexForSlot = slot => {
    const senseId = slotSenseId(slot);
    return BIOME_BY_SENSE[senseId]?.stageIndex ?? 5;
  };
  function senseIdForMeta(meta) {
    if (meta?.isBoss || meta?.senseId === 'boss') return 'boss';
    if (meta?.senseId && BIOME_BY_SENSE[meta.senseId]) return meta.senseId;
    const slot = Number(meta?.slot);
    const assigned = Number.isInteger(slot) ? getState().slots?.[slot] : null;
    if (assigned && BIOME_BY_SENSE[assigned]) return assigned;
    return slotSenseId(slot);
  }
  function stageIndexForMeta(meta) {
    const senseId = senseIdForMeta(meta);
    return BIOME_BY_SENSE[senseId]?.stageIndex ?? stageIndexForSlot(meta?.slot);
  }

  const ASSETS = {
    correct: ['assets/images/battle/richtig_1.webp', 'assets/images/battle/richtig_2.webp', 'assets/images/battle/richtig_3.webp'],
    wrong: ['assets/images/battle/falsch_1.webp', 'assets/images/battle/falsch_2.webp', 'assets/images/battle/falsch_3.webp'],
    final: 'assets/images/battle/final.webp',
    hero: 'assets/images/characters/held.webp',
    triumphHero: 'assets/images/characters/held_triumph.webp',
    winHero: 'assets/images/characters/held_gewonnen.webp',
    loseHero: 'assets/images/characters/held_verloren.webp',
    escapeHero: 'assets/images/characters/held_entkommen.webp',
    versus: 'assets/images/battle/versus_final.webp',
    text: {
      kampf: 'assets/images/battle/kampf_text.webp',
      richtig: 'assets/images/battle/richtig_text.webp',
      falsch: 'assets/images/battle/falsch_text.webp',
      gewonnen: 'assets/images/battle/gewonnen_text.webp',
      verloren: 'assets/images/battle/verloren_text.webp'
    }
  };

  const AUDIO_FILES = {
    background: 'assets/audio/background.mp3', battle_background: 'assets/audio/battle_background.mp3', minigame_background: 'assets/audio/minigame_background.mp3',
    levelstart: 'assets/audio/levelstart.mp3', levelunlocked: 'assets/audio/levelunlocked.mp3', fight: 'assets/audio/fight.mp3', win: 'assets/audio/win.mp3', lose: 'assets/audio/lose.mp3',
    final: 'assets/audio/final.mp3', hurt: 'assets/audio/hurt.mp3', glass_break: 'assets/audio/glass_break.mp3', collect: 'assets/audio/collect.mp3',
    story_wallbreak: 'assets/audio/wallbreak.mp3', story_spell: 'assets/audio/spell.mp3',
    flip: 'assets/audio/flip.mp3', pair: 'assets/audio/pair.mp3', richtig: 'assets/audio/richtig.mp3',
    richtig_1: 'assets/audio/richtig_1.mp3', richtig_2: 'assets/audio/richtig_2.mp3', richtig_3: 'assets/audio/richtig_3.mp3', spray: 'assets/audio/spray.mp3', throw: 'assets/audio/throw.mp3',
    falsch_1: 'assets/audio/falsch_1.mp3', falsch_2: 'assets/audio/falsch_2.mp3', falsch_3: 'assets/audio/falsch_3.mp3'
  };

  const STORY_SLIDES = [
    { image: 'assets/images/story/1.png', text: 'Hoch über dem Land schwebte das Schloss der Sinne...' },
    { image: 'assets/images/story/2.png', text: 'Dort feierten König und Hof ein fröhliches Fest...' },
    { image: 'assets/images/story/3.png', text: 'Doch draußen beobachtete ein böser Magier alles heimlich...' },
    { image: 'assets/images/story/4-8.png', text: 'Er sah leckeres Essen, schöne Blumen, weiche Sitze und hörte herrliche Harfenklänge...' },
    { image: 'assets/images/story/9.png', text: 'Vor Wut ließ er die Mauer bersten...' },
    { image: 'assets/images/story/10.png', text: 'Dann wirkte er einen finsteren Zauber...' },
    { image: 'assets/images/story/11.png', text: 'Dunkle Magie raste durch den Festsaal...' },
    { image: 'assets/images/story/12-16.png', text: 'Plötzlich stank, kratzte und klang vieles ganz falsch...' },
    { image: 'assets/images/story/17.png', text: 'Zufrieden zog sich der Magier in sein Schloss zurück...' },
    { image: 'assets/images/story/18.png', text: 'Sein Fluch legte sich über das ganze Königreich...' },
    { image: 'assets/images/story/19.png', text: 'Überall warteten nun rätselhafte Prüfungen...' },
    { image: 'assets/images/story/20.png', text: 'Fünf magische Schlüssel wurden im ganzen Land versteckt...' },
    { image: 'assets/images/story/21.png', text: 'Und fünf Vorhängeschlösser verriegelten das Tor des Magiers...' },
    { image: 'assets/images/story/22.png', text: 'Im Schloss hofften nun alle auf Hilfe...' },
    { image: 'assets/images/story/23.png', text: 'Da tauchte in der Speisekammer ein wichtiger Hinweis auf...' },
    { image: 'assets/images/story/24.png', text: 'Dort entdeckte {heroName} die entscheidende Spur...' },
    { image: 'assets/images/story/25.png', text: '{HeroNom} eilte sofort damit zum König...' },
    { image: 'assets/images/story/26.png', text: 'Der König bat {heroAcc}, das Königreich zu retten...' },
    { image: 'assets/images/story/27.png', text: 'Also machte sich {heroName} mutig auf den Weg...' },
    { image: 'assets/images/story/28.png', text: 'Mit viel Mut begann nun die Reise...' },
    { image: 'assets/images/story/29.png', text: 'Jetzt sucht {heroName} die fünf Schlüssel des Königreichs...' }
  ];

  function normalizeAssetPaths() {
    Object.values(SENSES).forEach(item => {
      item.enemy = assetUrl(item.enemy);
      item.defeated = assetUrl(item.defeated);
    });
    BOSS.enemy = assetUrl(BOSS.enemy);
    BOSS.defeated = assetUrl(BOSS.defeated);
    for (let i = 0; i < STAGE_BACKGROUNDS.length; i += 1) STAGE_BACKGROUNDS[i] = assetUrl(STAGE_BACKGROUNDS[i]);
    for (let i = 0; i < POPUP_BACKGROUNDS.length; i += 1) POPUP_BACKGROUNDS[i] = assetUrl(POPUP_BACKGROUNDS[i]);
    ASSETS.correct = ASSETS.correct.map(assetUrl);
    ASSETS.wrong = ASSETS.wrong.map(assetUrl);
    ASSETS.final = assetUrl(ASSETS.final);
    ASSETS.hero = assetUrl(ASSETS.hero);
    ASSETS.triumphHero = assetUrl(ASSETS.triumphHero);
    ASSETS.winHero = assetUrl(ASSETS.winHero);
    ASSETS.loseHero = assetUrl(ASSETS.loseHero);
    ASSETS.escapeHero = assetUrl(ASSETS.escapeHero);
    ASSETS.versus = assetUrl(ASSETS.versus);
    Object.keys(ASSETS.text).forEach(key => { ASSETS.text[key] = assetUrl(ASSETS.text[key]); });
    Object.keys(AUDIO_FILES).forEach(key => { AUDIO_FILES[key] = assetUrl(AUDIO_FILES[key]); });
  }
  normalizeAssetPaths();

  const $ = id => document.getElementById(id);
  const qs = name => new URLSearchParams(location.search).get(name);
  const hide = node => node && node.classList.add('hidden');
  const show = node => node && node.classList.remove('hidden');
  const esc = txt => String(txt ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const clamp = (n,min,max) => Math.max(min, Math.min(max, n));
  const cleanHeroName = value => String(value || '').replace(/\s+/g, ' ').trim().slice(0, 28);
  function cleanHeroPronoun(value) { return String(value || '').replace(/[^\p{L}\p{M}\s-]/gu, '').replace(/\s+/g, ' ').trim().slice(0, 24); }
  const capFirst = value => { const text = String(value || ''); return text ? text.charAt(0).toUpperCase() + text.slice(1) : text; };

  let muted = localStorage.getItem(SOUND_STORE) === '1';
  const audio = new Map();
  const oneShotPools = new Map();
  const activeOneShotAudio = new Set();
  const ONE_SHOT_SOUND_KEYS = ['richtig_1','richtig_2','richtig_3','falsch_1','falsch_2','falsch_3'];
  const BATTLE_CUE_KEYS = ['final','win','lose',...ONE_SHOT_SOUND_KEYS];
  let battleAudioContext = null;
  let battleWebBackground = null;
  const battleAudioBuffers = new Map();
  const activeBattleCueAudio = new Set();
  const activeBattleCueSources = new Set();

  function audioVolumeForKey(key) {
    if (key === 'background') return .045;
    if (key === 'battle_background') return .22;
    if (key === 'minigame_background') return .24;
    if (key === 'story_spell') return .70;
    if (key === 'story_wallbreak') return .82;
    if (key === 'collect') return .82;
    if (key === 'flip') return .70;
    if (key === 'pair') return .82;
    if (key === 'hurt' || key === 'glass_break') return .88;
    return /^(richtig|falsch)_/.test(key) ? .95 : .85;
  }

  function getBattleAudioContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!battleAudioContext) battleAudioContext = new AudioContextClass();
    return battleAudioContext;
  }

  async function loadBattleAudioBuffer(key) {
    if (battleAudioBuffers.has(key)) return battleAudioBuffers.get(key);
    if (!AUDIO_FILES[key]) return null;
    const ctx = getBattleAudioContext();
    if (!ctx || typeof fetch !== 'function') return null;
    const response = await fetch(AUDIO_FILES[key]);
    const data = await response.arrayBuffer();
    const buffer = await ctx.decodeAudioData(data.slice(0));
    battleAudioBuffers.set(key, buffer);
    return buffer;
  }

  function stopBattleWebBackground() {
    if (!battleWebBackground) return;
    try { battleWebBackground.source.stop(0); } catch (_) {}
    try { battleWebBackground.source.disconnect(); battleWebBackground.gain.disconnect(); } catch (_) {}
    battleWebBackground = null;
  }

  function playBattleWebAudio(key, { loop = false } = {}) {
    if (muted) return false;
    const ctx = getBattleAudioContext();
    const buffer = battleAudioBuffers.get(key);
    if (!ctx || !buffer) return false;
    try {
      if (ctx.state === 'suspended') void ctx.resume();
      if (key === 'battle_background') stopBattleWebBackground();
      const source = ctx.createBufferSource();
      const gain = ctx.createGain();
      source.buffer = buffer;
      source.loop = loop;
      gain.gain.value = audioVolumeForKey(key);
      source.connect(gain);
      gain.connect(ctx.destination);
      source.start(0);
      if (loop && key === 'battle_background') battleWebBackground = { source, gain };
      else {
        const item = { key, source, gain };
        activeBattleCueSources.add(item);
        source.onended = () => activeBattleCueSources.delete(item);
      }
      return true;
    } catch (_) {
      return false;
    }
  }

  async function primeBattleWebAudioFromGesture(keys = ['battle_background']) {
    const ctx = getBattleAudioContext();
    if (!ctx) return;
    try { await ctx.resume(); } catch (_) {}
    await Promise.allSettled(keys.map(key => loadBattleAudioBuffer(key)));
    const bg = audio.get('battle_background');
    if (!bg || bg.paused) playBattleWebAudio('battle_background', { loop:true });
  }

  function stopBattleCues(key) {
    activeBattleCueAudio.forEach(a => {
      if (key && a._battleCueKey !== key) return;
      try { a.pause(); a.currentTime = 0; } catch (_) {}
      activeBattleCueAudio.delete(a);
    });
    activeBattleCueSources.forEach(item => {
      if (key && item.key !== key) return;
      try { item.source.stop(0); } catch (_) {}
      try { item.source.disconnect(); item.gain.disconnect(); } catch (_) {}
      activeBattleCueSources.delete(item);
    });
  }

  async function startBattleAudioFromButton() {
    muted = false;
    localStorage.setItem(SOUND_STORE, '0');
    const speaker = $('globalSpeakerBtn');
    if (speaker) speaker.textContent = String.fromCodePoint(0x1f50a);

    const ctx = getBattleAudioContext();
    try { await ctx?.resume?.(); } catch (_) {}
    const preload = Promise.allSettled(['battle_background', ...BATTLE_CUE_KEYS].map(key => loadBattleAudioBuffer(key)));

    const bg = getAudio('battle_background');
    if (bg) {
      try {
        bg.pause();
        bg.loop = true;
        bg.muted = false;
        bg.volume = audioVolumeForKey('battle_background');
        bg.currentTime = 0;
        await bg.play();
      } catch (_) {
        void loadBattleAudioBuffer('battle_background').then(() => playBattleWebAudio('battle_background', { loop:true }));
      }
    } else {
      void loadBattleAudioBuffer('battle_background').then(() => playBattleWebAudio('battle_background', { loop:true }));
    }
    return preload;
  }

  async function playBattleCue(key, { stopSame = false } = {}) {
    if (muted || !AUDIO_FILES[key]) return;
    if (stopSame) stopBattleCues(key);
    if (/^(richtig|falsch)_\d$/.test(key)) stopBattleCues();
    const cue = new Audio(AUDIO_FILES[key]);
    cue.preload = 'auto';
    cue.volume = audioVolumeForKey(key);
    cue._battleCueKey = key;
    activeBattleCueAudio.add(cue);
    cue.addEventListener('ended', () => activeBattleCueAudio.delete(cue), { once:true });
    cue.addEventListener('error', () => activeBattleCueAudio.delete(cue), { once:true });
    try {
      cue.currentTime = 0;
      await cue.play();
    } catch (_) {
      activeBattleCueAudio.delete(cue);
      const buffer = battleAudioBuffers.get(key) || await loadBattleAudioBuffer(key);
      if (buffer) playBattleWebAudio(key);
    }
  }

  function getAudio(key) {
    if (!AUDIO_FILES[key]) return null;
    if (!audio.has(key)) {
      const a = new Audio(AUDIO_FILES[key]);
      a.preload = 'auto';
      a.volume = audioVolumeForKey(key);
      try { a.load(); } catch (_) {}
      audio.set(key, a);
    }
    return audio.get(key);
  }

  function warmOneShotPools(keys = ONE_SHOT_SOUND_KEYS) {
    keys.forEach(key => {
      if (!/^(richtig|falsch)_\d$/.test(key)) return;
      if (!AUDIO_FILES[key] || oneShotPools.has(key)) return;
      const pool = Array.from({ length: 3 }, () => {
        const a = new Audio(AUDIO_FILES[key]);
        a.preload = 'auto';
        a.volume = audioVolumeForKey(key);
        try { a.load(); } catch (_) {}
        return a;
      });
      pool.cursor = 0;
      oneShotPools.set(key, pool);
    });
  }

  async function playPooledOneShot(key) {
    if (!oneShotPools.has(key)) warmOneShotPools([key]);
    stopActiveOneShots(/^(richtig|falsch)_/);
    const base = getAudio(key);
    if (base) {
      try {
        base.pause();
        base.currentTime = 0;
        base.loop = false;
        base.volume = audioVolumeForKey(key);
        activeOneShotAudio.add(base);
        base.addEventListener('ended', () => activeOneShotAudio.delete(base), { once:true });
        base.addEventListener('error', () => activeOneShotAudio.delete(base), { once:true });
        await base.play();
        return;
      } catch (_) {
        activeOneShotAudio.delete(base);
      }
    }
    const pool = oneShotPools.get(key);
    if (!pool || !pool.length) return;
    const a = pool[pool.cursor++ % pool.length];
    try {
      a.pause();
      a.currentTime = 0;
      activeOneShotAudio.add(a);
      a.addEventListener('ended', () => activeOneShotAudio.delete(a), { once:true });
      a.addEventListener('error', () => activeOneShotAudio.delete(a), { once:true });
      await a.play();
    } catch (_) {
      activeOneShotAudio.delete(a);
      let fallback = null;
      try {
        fallback = new Audio(AUDIO_FILES[key]);
        fallback.preload = 'auto';
        fallback.volume = audioVolumeForKey(key);
        activeOneShotAudio.add(fallback);
        fallback.addEventListener('ended', () => activeOneShotAudio.delete(fallback), { once:true });
        fallback.addEventListener('error', () => activeOneShotAudio.delete(fallback), { once:true });
        await fallback.play();
      } catch (__) {
        if (fallback) activeOneShotAudio.delete(fallback);
        if (!playBattleWebAudio(key)) void loadBattleAudioBuffer(key).then(() => playBattleWebAudio(key));
      }
    }
  }

  function stopActiveOneShots(pattern) {
    activeOneShotAudio.forEach(a => {
      const src = a.currentSrc || a.src || '';
      const matches = !pattern || pattern.test(Object.keys(AUDIO_FILES).find(key => src.includes(AUDIO_FILES[key].split('/').pop())) || src);
      if (!matches) return;
      try { a.pause(); a.currentTime = 0; } catch (_) {}
      activeOneShotAudio.delete(a);
    });
  }

  async function playSound(key, { loop = false, restart = true } = {}) {
    if (muted) return;
    const a = getAudio(key); if (!a) return;
    try {
      a.loop = loop;
      const oneShot = !loop && /^(richtig|falsch)_\d$/.test(key);
      if (oneShot) {
        await playPooledOneShot(key);
        return;
      }
      if (restart) a.currentTime = 0;
      await a.play();
    } catch (_) {
      if (!playBattleWebAudio(key, { loop })) void loadBattleAudioBuffer(key).then(() => playBattleWebAudio(key, { loop }));
    }
  }
  function stopSound(key) {
    const a = audio.get(key);
    if (a) { a.pause(); try { a.currentTime = 0; } catch (_) {} }
    if (key === 'battle_background') stopBattleWebBackground();
    stopBattleCues(key);
  }
  function stopAllBattleAudio() { stopActiveOneShots(); ['battle_background','final','win','lose','fight','richtig_1','richtig_2','richtig_3','falsch_1','falsch_2','falsch_3'].forEach(stopSound); }
  function ensureBattleBackgroundMusic({ restart = false } = {}) {
    if (muted) return;
    if (battleWebBackground) return;
    const bg = getAudio('battle_background');
    if (!bg) return;
    if (!restart && !bg.paused) return;
    void playSound('battle_background', { loop:true, restart });
  }
  function startFinalCloudPulse(node) {
    if (!node) return;
    stopFinalCloudPulse(node);
    node.style.animation = 'none';
    node.style.transformOrigin = 'center center';
    const startedAt = performance.now();
    const run = now => {
      const phase = ((now - startedAt) % 760) / 760;
      const wave = 0.5 - Math.cos(phase * Math.PI * 2) / 2;
      const scale = 0.84 + wave * 0.46;
      const glow = 0.24 + wave * 0.24;
      node.style.opacity = '1';
      node.style.transform = `translate(-50%,-50%) scale(${scale.toFixed(3)})`;
      node.style.filter = `drop-shadow(0 ${Math.round(18 + wave * 14)}px ${Math.round(30 + wave * 22)}px rgba(255,255,255,${glow.toFixed(2)}))`;
      node._battlePulseRaf = requestAnimationFrame(run);
    };
    node._battlePulseRaf = requestAnimationFrame(run);
  }
  function stopFinalCloudPulse(node) {
    try {
      if (node?._battlePulseAnimation) {
        node._battlePulseAnimation.cancel();
        node._battlePulseAnimation = null;
      }
      if (node?._battlePulseRaf) {
        cancelAnimationFrame(node._battlePulseRaf);
        node._battlePulseRaf = null;
      }
      if (node) {
        node.style.animation = '';
        node.style.transform = '';
        node.style.filter = '';
        node.style.opacity = '';
      }
    } catch (_) {}
  }
  function addSpeaker() {
    if ($('globalSpeakerBtn')) return;
    const b = document.createElement('button');
    b.id = 'globalSpeakerBtn'; b.className = 'speaker-btn'; b.type = 'button';
    b.textContent = muted ? '🔇' : '🔊';
    b.addEventListener('click', () => {
      muted = !muted; localStorage.setItem(SOUND_STORE, muted ? '1' : '0'); b.textContent = muted ? '🔇' : '🔊';
      if (muted) { stopActiveOneShots(); Array.from(audio.keys()).forEach(stopSound); }
      else if (document.body.dataset.page === 'board' && !$('boardScreen')?.classList.contains('hidden')) playSound('background', { loop:true });
      else if (document.body.dataset.page === 'minigame' || document.body.dataset.page === 'minigame2' || document.body.dataset.page === 'minigame3' || document.body.dataset.page === 'minigame4') playSound('minigame_background', { loop:true, restart:false });
    });
    document.body.appendChild(b);
  }

  function blankFlags() { return { sehen:false, hoeren:false, riechen:false, schmecken:false, fuehlen:false, boss:false }; }
  function defaultState() { return { stateVersion:STATE_VERSION, started:false, slots:Array(LEVEL_COUNT).fill(null), completed:Array(LEVEL_COUNT).fill(false), bossCompleted:false, heroIndex:null, heroName:DEFAULT_HERO_NAME, heroGender:DEFAULT_HERO_GENDER, heroPronoun:DEFAULT_HERO_PRONOUN, introUsed:false, revealedMax:0, keysFound:blankFlags(), removedLocks:blankFlags(), activeBiome:null }; }
  function normalizeState(raw) {
    const base = defaultState();
    if (!raw || raw.stateVersion !== STATE_VERSION) return base;
    const state = { ...base, ...(raw || {}) };
    state.heroName = cleanHeroName(raw?.heroName) || DEFAULT_HERO_NAME;
    state.heroGender = HERO_GENDER_OPTIONS.includes(raw?.heroGender) ? raw.heroGender : DEFAULT_HERO_GENDER;
    state.heroPronoun = state.heroGender === 'female' ? 'sie' : 'er';
    const oldSlots = Array.isArray(raw?.slots) ? raw.slots : [];
    const oldCompleted = Array.isArray(raw?.completed) ? raw.completed : [];
    state.slots = Array.from({ length: LEVEL_COUNT }, (_, i) => oldSlots[i] || null);
    state.completed = Array.from({ length: LEVEL_COUNT }, (_, i) => Boolean(oldCompleted[i]));
    if (!Number.isInteger(state.heroIndex) || state.heroIndex < 0 || state.heroIndex >= LEVEL_COUNT) state.heroIndex = null;
    const inferredReveal = state.completed.every(Boolean)
      ? LEVEL_COUNT - 1
      : Math.max(0, Math.min(LEVEL_COUNT - 1, state.completed.findIndex(v => !v)));
    state.revealedMax = Number.isInteger(state.revealedMax)
      ? Math.max(0, Math.min(LEVEL_COUNT - 1, state.revealedMax))
      : inferredReveal;
    if (state.revealedMax < inferredReveal) state.revealedMax = inferredReveal;
    const keyFlags = blankFlags();
    state.keysFound = { ...keyFlags, ...(raw?.keysFound || {}) };
    state.removedLocks = { ...keyFlags, ...(raw?.removedLocks || {}) };
    const keySlots = { sehen:0, hoeren:2, riechen:4, schmecken:6, fuehlen:8 };
    Object.entries(keySlots).forEach(([id, slot]) => {
      if (state.completed[slot]) state.keysFound[id] = true;
    });
    if (!state.activeBiome || !BIOME_LEVEL_PLAN[state.activeBiome] || BIOME_LEVEL_PLAN[state.activeBiome].every(slot => state.completed[slot])) state.activeBiome = null;
    if (!state.activeBiome && KEY_ORDER.every(id => state.removedLocks?.[id]) && !state.bossCompleted && !biomeIsComplete('boss', state)) {
      const bossSlot = nextSlotForBiome('boss', state);
      if (Number.isInteger(bossSlot)) {
        state.activeBiome = 'boss';
        state.slots[bossSlot] = 'boss';
      }
    }
    return state;
  }
  function getState() {
    try { return normalizeState(JSON.parse(localStorage.getItem(STORE)) || null); } catch (_) { return defaultState(); }
  }
  function setState(state) { localStorage.setItem(STORE, JSON.stringify(normalizeState(state))); }
  function getHeroName() { return getState().heroName || DEFAULT_HERO_NAME; }
  function getHeroProfile(state = getState()) {
    const gender = HERO_GENDER_OPTIONS.includes(state.heroGender) ? state.heroGender : DEFAULT_HERO_GENDER;
    const sets = {
      male: { gender:'male', nom:'er', acc:'ihn', dat:'ihm', poss:'sein', title:'Ritter', role:'Held' },
      female: { gender:'female', nom:'sie', acc:'sie', dat:'ihr', poss:'ihr', title:'Ritterin', role:'Heldin' }
    };
    return { name: cleanHeroName(state.heroName) || DEFAULT_HERO_NAME, ...sets[gender] };
  }
  function setHeroProfile({ name, gender } = {}) {
    const state = getState();
    const nextGender = HERO_GENDER_OPTIONS.includes(gender) ? gender : DEFAULT_HERO_GENDER;
    state.heroName = cleanHeroName(name) || DEFAULT_HERO_NAME;
    state.heroGender = nextGender;
    state.heroPronoun = nextGender === 'female' ? 'sie' : 'er';
    setState(state);
    return getHeroProfile(state);
  }
  function setHeroName(name) {
    const state = getState();
    state.heroName = cleanHeroName(name) || DEFAULT_HERO_NAME;
    setState(state);
    return state.heroName;
  }
  function heroText(rawText, name = getHeroName()) {
    const profile = getHeroProfile();
    const effectiveName = cleanHeroName(name) || profile.name;
    const values = {
      heroName: effectiveName,
      heroNom: profile.nom,
      HeroNom: capFirst(profile.nom),
      heroAcc: profile.acc,
      HeroAcc: capFirst(profile.acc),
      heroDat: profile.dat,
      HeroDat: capFirst(profile.dat),
      heroPoss: profile.poss,
      HeroPoss: capFirst(profile.poss),
      heroTitle: profile.title,
      HeroTitle: capFirst(profile.title),
      heroRole: profile.role,
      HeroRole: capFirst(profile.role)
    };
    return String(rawText || '').replace(/\{(heroName|heroNom|HeroNom|heroAcc|HeroAcc|heroDat|HeroDat|heroPoss|HeroPoss|heroTitle|HeroTitle|heroRole|HeroRole)\}/g, (_, key) => values[key] ?? '');
  }
  function currentSlot(state = getState()) { const i = state.completed.findIndex(v => !v); return i < 0 ? LEVEL_COUNT : i; }
  function biomeLevelPlan(id) { return BIOME_LEVEL_PLAN[id] || []; }
  function nextSlotForBiome(id, state = getState()) { return biomeLevelPlan(id).find(slot => !state.completed[slot]); }
  function biomeIsComplete(id, state = getState()) { return biomeLevelPlan(id).length > 0 && biomeLevelPlan(id).every(slot => state.completed[slot]); }
  function firstSlotForBiome(id) { return biomeLevelPlan(id)[0] ?? null; }
  function questionSlotForBiome(id) { return biomeLevelPlan(id)[1] ?? null; }
  function activeBoardSlot(state = getState()) { return state.activeBiome ? nextSlotForBiome(state.activeBiome, state) : null; }
  function allLocksOpened(state = getState()) { return KEY_ORDER.every(id => state.removedLocks?.[id]); }
  function allLevelsDone(state = getState()) { return Boolean(state.bossCompleted); }
  function usedIds(state = getState()) { return state.slots.filter(Boolean); }
  function dataForMeta(meta) { return meta?.isBoss || meta?.senseId === 'boss' ? BOSS : SENSES[meta?.senseId]; }
  function getQuestionsForId(id) { return QUESTION_BANK[id] || QUESTION_BANK.sehen; }
  function bgForMeta(meta) { return STAGE_BACKGROUNDS[stageIndexForMeta(meta)]; }
  function popupBgForMeta(meta) { return POPUP_BACKGROUNDS[stageIndexForMeta(meta)]; }
  function boardPointForSlot(index, state = getState()) {
    if (!Number.isInteger(index)) return HERO_DEFAULT_POINT;
    const assigned = state.slots[index] || slotSenseId(index);
    const biome = biomeForSenseId(assigned);
    const first = firstSlotForBiome(assigned);
    const second = questionSlotForBiome(assigned);
    if (Number(index) === first) return biome.board?.minigame || HERO_DEFAULT_POINT;
    if (Number(index) === second) return biome.board?.question || biome.board?.minigame || HERO_DEFAULT_POINT;
    return biome.board?.minigame || HERO_DEFAULT_POINT;
  }
  function biomeKeyPoint(id) {
    return BIOME_BY_SENSE[id]?.board?.key || BIOME_BY_SENSE[id]?.board?.question || HERO_DEFAULT_POINT;
  }
  function keyInfoForSenseId(id) {
    if (!id || !BIOME_BY_SENSE[id]?.key) return null;
    return { id, label: BIOME_BY_SENSE[id].label, image: assetUrl(BIOME_BY_SENSE[id].key) };
  }
  function currentBiomeLabel(state = getState()) {
    if (state.activeBiome && BIOME_BY_SENSE[state.activeBiome]) return BIOME_BY_SENSE[state.activeBiome].label;
    return 'Marktbrett auswählen';
  }
  function levelTypeLabel(slot) {
    if (!Number.isInteger(slot)) return 'Level';
    if (slotSenseId(slot) === 'boss') return slot === 10 ? 'Bosskampf' : 'Finale';
    return isPlaceholderSlot(slot) ? 'Minispiel' : 'Fragen-Level';
  }
  function applyStagePopup(modal, meta) {
    if (!modal) return;
    modal.classList.add('stage-popup');
    modal.style.setProperty('--popup-bg', `url("${popupBgForMeta(meta)}")`);
  }

  function preloadAssets(list) {
    list.filter(Boolean).forEach(src => {
      if (/\.mp3$/i.test(src)) { const a = new Audio(src); a.preload = 'auto'; return; }
      const img = new Image(); img.src = src;
    });
  }
  function preloadImagesWithProgress(list, onProgress) {
    const sources = list.filter(Boolean);
    if (!sources.length) {
      onProgress?.(1);
      return Promise.resolve();
    }
    let done = 0;
    const report = () => onProgress?.(done / sources.length);
    report();
    return new Promise(resolve => {
      sources.forEach(src => {
        const img = new Image();
        const finish = () => {
          done += 1;
          report();
          if (done >= sources.length) resolve();
        };
        img.onload = finish;
        img.onerror = finish;
        img.src = src;
      });
    });
  }
  function ensureIntroStoryLoader() {
    let loader = $('introStoryLoader');
    if (loader) return loader;
    const intro = $('introScreen');
    if (!intro) return null;
    loader = document.createElement('div');
    loader.id = 'introStoryLoader';
    loader.className = 'intro-loading-panel';
    loader.innerHTML = '<div class="intro-loading-title">Geschichte wird geladen</div><div class="intro-loading-track"><div id="introStoryLoadBar" class="intro-loading-bar"></div></div><div id="introStoryLoadPercent" class="intro-loading-percent">0%</div>';
    intro.appendChild(loader);
    return loader;
  }
  function setIntroStoryProgress(value) {
    const percent = Math.round(clamp(value, 0, 1) * 100);
    const bar = $('introStoryLoadBar');
    const label = $('introStoryLoadPercent');
    if (bar) bar.style.width = `${percent}%`;
    if (label) label.textContent = `${percent}%`;
  }
  function preloadBattleAssets(data, meta) {
    preloadAssets([ASSETS.hero, ASSETS.triumphHero, ASSETS.versus, ASSETS.text.kampf, ASSETS.text.richtig, ASSETS.text.falsch, ASSETS.text.gewonnen, ASSETS.text.verloren, data.enemy, data.defeated, ASSETS.loseHero, ASSETS.final, ...ASSETS.correct, ...ASSETS.wrong, bgForMeta(meta), popupBgForMeta(meta)]);
  }
  function prefetchPage(href) {
    const url = href.includes('://') || href.startsWith('file:') ? href : pageUrl(href);
    if (document.querySelector(`link[rel="prefetch"][href="${url}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  }

  function resetBoardViewport() {
    if (document.body.dataset.page !== 'board') return;
    try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (_) {}
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  function stopStoryMusic() {
    stopSound('story_wallbreak');
    stopSound('story_spell');
    stopSound('story_happy');
    stopSound('story_bad');
  }

  function playStoryMood() {
    // Keine Story-Hintergrundmusik; nur Effekt-Sounds auf einzelnen Bildern.
  }

  function storyMoodForIndex() {
    return 'story';
  }

  function enableStorySoundFromGesture() {
    muted = false;
    localStorage.setItem(SOUND_STORE, '0');
    const speaker = $('globalSpeakerBtn');
    if (speaker) speaker.textContent = String.fromCodePoint(0x1f50a);
    ['story_wallbreak', 'story_spell'].forEach(key => {
      const cue = getAudio(key);
      if (!cue) return;
      try {
        cue.pause();
        cue.currentTime = 0;
        cue.muted = true;
        cue.volume = 0;
        const played = cue.play();
        Promise.resolve(played).then(() => {
          try { cue.pause(); cue.currentTime = 0; } catch (_) {}
          cue.muted = false;
          cue.volume = audioVolumeForKey(key);
        }).catch(() => {
          cue.muted = false;
          cue.volume = audioVolumeForKey(key);
        });
      } catch (_) {
        cue.muted = false;
        cue.volume = audioVolumeForKey(key);
      }
    });
  }

  async function playStoryEffect(key) {
    if (muted || !AUDIO_FILES[key]) return;
    let cue = null;
    try {
      cue = new Audio(AUDIO_FILES[key]);
      cue.preload = 'auto';
      cue.volume = audioVolumeForKey(key);
      activeOneShotAudio.add(cue);
      cue.addEventListener('ended', () => activeOneShotAudio.delete(cue), { once:true });
      cue.addEventListener('error', () => activeOneShotAudio.delete(cue), { once:true });
      cue.currentTime = 0;
      await cue.play();
    } catch (_) {
      if (cue) activeOneShotAudio.delete(cue);
      playSound(key, { loop:false, restart:true });
    }
  }

  function initStory() {
    const card = document.querySelector('.story-card');
    const text = $('storyText');
    const counter = $('storyCounter');
    const prevBtn = $('storyPrevBtn');
    const nextBtn = $('storyNextBtn');
    const startBtn = $('storyStartBtn');
    const skipBtn = $('storySkipBtn');
    const nameBox = $('storyHeroNameBox');
    if (!card || !text || !counter || !prevBtn || !nextBtn || !startBtn || !nameBox || !skipBtn) return;

    const START_STORY_SLIDE = {
      image: 'assets/images/story/story_bookcover.png',
      text: 'Gib den Namen ein, wähle männlich oder weiblich und starte die Geschichte...',
      isStoryStart:true
    };
    const slides = [START_STORY_SLIDE, ...STORY_SLIDES];
    const images = slides.map(slide => assetUrl(slide.image));
    const lastIndex = slides.length - 1;
    const slideDuration = 4000;

    card.classList.add('story-autoplay-card');
    nameBox.classList.add('story-profile-box');
    nameBox.classList.remove('hidden');
    const profile = getHeroProfile();
    nameBox.innerHTML = `
      <label for="storyHeroNameInput">Name des Ritters</label>
      <input id="storyHeroNameInput" name="storyHeroNameInput" autocomplete="off" maxlength="28" placeholder="z. B. Leo" value="${esc(profile.name === DEFAULT_HERO_NAME ? '' : profile.name)}">
      <fieldset class="story-gender-box" aria-label="Geschlecht des Ritters">
        <legend>Geschlecht</legend>
        <label><input type="radio" name="storyHeroGender" value="male" ${profile.gender === 'male' ? 'checked' : ''}> männlich</label>
        <label><input type="radio" name="storyHeroGender" value="female" ${profile.gender === 'female' ? 'checked' : ''}> weiblich</label>
      </fieldset>
      <p id="storyProfileHint" class="story-profile-hint">Name und Geschlecht werden für die ganze Geschichte und das Spiel gespeichert.</p>
    `;
    const liveNameInput = $('storyHeroNameInput');
    const genderInputs = [...document.querySelectorAll('input[name="storyHeroGender"]')];

    const oldWrap = card.querySelector('.story-image-wrap');
    const trackWrap = document.createElement('div');
    trackWrap.className = 'story-autoplay-window';
    const track = document.createElement('div');
    track.className = 'story-autoplay-track';
    trackWrap.appendChild(track);

    slides.forEach((slide, i) => {
      const panel = document.createElement('figure');
      panel.className = 'story-autoplay-panel';
      const img = document.createElement('img');
      img.src = images[i];
      img.alt = i === 0 ? 'Geschichte starten' : `Geschichte ${i}`;
      img.loading = i < 3 ? 'eager' : 'lazy';
      panel.appendChild(img);
      track.appendChild(panel);
    });
    oldWrap?.replaceWith(trackWrap);

    let index = 0;
    let timer = 0;
    let finished = false;
    let running = false;
    let currentMood = '';
    const playedStoryFx = new Set();

    const selectedGender = () => genderInputs.find(input => input.checked)?.value || DEFAULT_HERO_GENDER;
    const formReady = () => Boolean(cleanHeroName(liveNameInput?.value));

    function syncProfileForm() {
      nextBtn.disabled = index === 0 ? !formReady() : true;
    }

    function saveProfileFromForm() {
      return setHeroProfile({
        name: liveNameInput?.value,
        gender: selectedGender()
      });
    }

    function stopAuto() {
      if (timer) window.clearTimeout(timer);
      timer = 0;
    }

    function setTrackPosition(instant=false) {
      track.classList.toggle('is-instant', instant);
      track.style.transform = `translateX(${-index * 100}%)`;
      if (instant) window.setTimeout(() => track.classList.remove('is-instant'), 40);
    }

    function showText(rawText) {
      const rendered = heroText(rawText, cleanHeroName(liveNameInput?.value) || getHeroName());
      text.classList.remove('is-visible');
      window.setTimeout(() => {
        text.innerHTML = rendered
          .split(/\s+/)
          .filter(Boolean)
          .map(word => `<span class="story-word visible">${esc(word)}</span>`)
          .join(' ');
        text.classList.add('is-visible');
      }, 170);
    }

    function updateMood() {
      if (index === 0) return;
      const mood = storyMoodForIndex(index - 1);
      if (mood !== currentMood) {
        playStoryMood(mood);
        currentMood = mood;
      }
    }

    function playStorySlideFx() {
      if (index === 0) return;
      const image = slides[index]?.image || '';
      if (image.includes('/9.') && !playedStoryFx.has('9')) {
        playedStoryFx.add('9');
        playStoryEffect('story_wallbreak');
      }
      if (image.includes('/10.') && !playedStoryFx.has('10')) {
        playedStoryFx.add('10');
        playStoryEffect('story_spell');
      }
    }

    function updateControls() {
      counter.textContent = index === 0 ? 'Start' : `${index} / ${STORY_SLIDES.length}`;
      prevBtn.classList.toggle('hidden', index === 0);
      prevBtn.disabled = index <= 1;
      nextBtn.classList.toggle('hidden', index !== 0);
      nextBtn.textContent = 'Geschichte starten';
      startBtn.classList.toggle('hidden', index !== lastIndex);
      skipBtn.classList.toggle('hidden', index !== 0);
      startBtn.classList.toggle('is-disabled', false);
      startBtn.setAttribute('aria-disabled', 'false');
      nameBox.classList.toggle('hidden', index !== 0);
      syncProfileForm();
    }

    function render(instant=false) {
      setTrackPosition(instant);
      showText(slides[index].text);
      updateMood();
      playStorySlideFx();
      updateControls();
    }

    function nextAuto() {
      if (finished || !running) return;
      if (index >= lastIndex) {
        finished = true;
        running = false;
        stopAuto();
        render(false);
        return;
      }
      index += 1;
      render(false);
      if (index >= lastIndex) {
        finished = true;
        running = false;
        stopAuto();
        return;
      }
      stopAuto();
      timer = window.setTimeout(nextAuto, slideDuration);
    }


    function goDirectToBoard() {
      saveProfileFromForm();
      const state = getState();
      state.started = true;
      state.introUsed = true;
      setState(state);
      try { sessionStorage.setItem(BOARD_WELCOME_STORE, '1'); } catch (_) {}
      stopAuto();
      stopStoryMusic();
      window.setTimeout(() => { location.href = pageUrl('index.html?board=1&welcome=1'); }, 120);
    }

    function startAuto() {
      if (!formReady()) {
        liveNameInput?.focus();
        syncProfileForm();
        return;
      }
      saveProfileFromForm();
      enableStorySoundFromGesture();
      currentMood = 'story';
      running = true;
      finished = false;
      index = 1;
      render(false);
      stopAuto();
      timer = window.setTimeout(nextAuto, slideDuration);
    }

    nextBtn.addEventListener('click', startAuto);
    skipBtn.addEventListener('click', goDirectToBoard);
    liveNameInput?.addEventListener('input', syncProfileForm);
    genderInputs.forEach(input => input.addEventListener('change', syncProfileForm));

    prevBtn.addEventListener('click', () => {
      if (index <= 1) return;
      stopAuto();
      index = Math.max(1, index - 1);
      running = true;
      finished = false;
      render(false);
      timer = window.setTimeout(nextAuto, slideDuration);
    });

    startBtn.addEventListener('click', ev => {
      ev?.preventDefault?.();
      saveProfileFromForm();
      const state = getState();
      state.started = true;
      state.introUsed = true;
      setState(state);
      try { sessionStorage.setItem(BOARD_WELCOME_STORE, '1'); } catch (_) {}
      stopStoryMusic();
      window.setTimeout(() => { location.href = pageUrl('index.html?board=1&welcome=1'); }, 120);
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAuto();
        return;
      }
      if (running && !finished) {
        updateMood();
        timer = window.setTimeout(nextAuto, slideDuration);
      }
    }, { passive:true });

    preloadAssets(images);
    render(true);
  }

  function initBoard() {
    addSpeaker();
    resetBoardViewport();
    const state = getState();
    const pendingBoardWelcome = qs('welcome') === '1' || (() => {
      try { return sessionStorage.getItem(BOARD_WELCOME_STORE) === '1'; } catch (_) { return false; }
    })();
    const shouldForceBoardMusic = !pendingBoardWelcome && (qs('music') === '1');
    if (qs('board') === '1') {
      state.started = true;
      state.introUsed = true;
      setState(state);
      try { history.replaceState(null, '', pageUrl('index.html')); } catch (_) {}
    }
    hide($('outroScreen'));
    if (state.started) { showBoard(false, { playMusic: !pendingBoardWelcome }); } else { show($('introScreen')); hide($('boardScreen')); hide($('openBoardMenuBtn')); hide($('belowBoard')); }
    if (pendingBoardWelcome) {
      window.setTimeout(showBoardWelcomeModal, 220);
    }
    if (shouldForceBoardMusic) {
      const ensureBoardBackgroundMusic = () => {
        if (muted) return;
        playSound('background', { loop:true, restart:false });
      };
      [120, 420, 900, 1500].forEach(delay => window.setTimeout(ensureBoardBackgroundMusic, delay));
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && !$('boardScreen')?.classList.contains('hidden')) ensureBoardBackgroundMusic();
      }, { passive:true, once:true });
    }
    let introTransitioning = false;
    const startGame = async () => {
      if (introTransitioning) return;
      introTransitioning = true;
      const intro = $('introScreen');
      const startBtn = $('startGameBtn');
      ensureIntroStoryLoader();
      setIntroStoryProgress(0);
      intro?.classList.add('is-loading');
      startBtn?.setAttribute('disabled', 'disabled');
      const storyImages = STORY_SLIDES.map(slide => assetUrl(slide.image));
      await Promise.all([
        preloadImagesWithProgress(storyImages, setIntroStoryProgress),
        sleep(520)
      ]);
      setIntroStoryProgress(1);
      window.setTimeout(() => {
        intro?.classList.add('intro-leaving');
        window.setTimeout(() => { location.href = pageUrl('Geschichte.html'); }, 620);
      }, 160);
    };
    $('startGameBtn')?.addEventListener('click', startGame);
    $('boardWelcomeContinueBtn')?.addEventListener('click', () => closeBoardWelcomeModal(true));
    $('boardWelcomeModal')?.addEventListener('click', ev => { if (ev.target === $('boardWelcomeModal')) closeBoardWelcomeModal(true); });
    $('introScreen')?.addEventListener('click', (ev) => { if (ev.target.closest('#startGameBtn')) return; startGame(); });
    $('outroContinueBtn')?.addEventListener('click', () => { hide($('outroScreen')); showBoard(false); });
    $('resetGameBtn')?.addEventListener('click', () => { if (confirm('Spielbrett wirklich zurücksetzen?')) { localStorage.removeItem(STORE); localStorage.removeItem(RETURN_STORE); location.href = pageUrl('index.html'); } });
    $('unlockAllLevelsBtn')?.addEventListener('click', unlockAllLevels);
    $('openBoardMenuBtn')?.addEventListener('click', () => document.body.classList.add('board-menu-open'));
    $('closeBoardMenuBtn')?.addEventListener('click', () => document.body.classList.remove('board-menu-open'));
    $('closeScanBtn')?.addEventListener('click', closeScan);
    $('backToBoardBtn')?.addEventListener('click', closeScan);
    $('manualUnlockBtn')?.addEventListener('click', () => unlockByCode($('manualCodeInput')?.value || ''));
    $('randomUnlockBtn')?.addEventListener('click', () => unlockRandom());
    $('skipLevelBtn')?.addEventListener('click', skipCurrentLevel);
    $('toggleScannerBtn')?.addEventListener('click', () => { document.querySelector('.camera-box')?.classList.toggle('hidden'); });
    $('scanJumpBottomBtn')?.addEventListener('click', () => $('randomUnlockBtn')?.scrollIntoView({ behavior:'smooth', block:'center' }));
    $('scanJumpTopBtn')?.addEventListener('click', () => $('scanTitle')?.scrollIntoView({ behavior:'smooth', block:'start' }));
    $('launchLevelBtn')?.addEventListener('click', handleLaunchLevel);
    $('encounterBackBtn')?.addEventListener('click', handleEncounterBack);
    $('levelUnlockedContinueBtn')?.addEventListener('click', handleLevelUnlockedContinue);
    $('magicCastleBtn')?.addEventListener('click', showMagicCastleModal);
    $('boardGuide')?.addEventListener('click', startIntroHeroJourney);
    $('boardGuide')?.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); startIntroHeroJourney(); } });
    window.addEventListener('resize', () => { resetBoardViewport(); updateMapGeometry(); }, { passive:true });
    window.visualViewport?.addEventListener?.('resize', () => { resetBoardViewport(); updateMapGeometry(); }, { passive:true });
    window.addEventListener('pageshow', () => { resetBoardViewport(); updateMapGeometry(); renderBoard(); startMagicCastleBoardFloat(); }, { passive:true });
    setTimeout(() => applyReturnModal(), 150);
  }

  function showBoard(firstStart=false, options={}) {
    const { playMusic = true } = options;
    hide($('introScreen')); show($('boardScreen')); show($('openBoardMenuBtn')); show($('belowBoard'));
    resetBoardViewport();
    updateMapGeometry(); renderBoard();
    startMagicCastleBoardFloat();
    if (playMusic) playSound('background', { loop:true, restart:!firstStart });
  }

  function showMagicCastleModal(ev) {
    ev?.preventDefault?.();
    const modal = $('magicCastleModal');
    if (!modal) return;
    show(modal);
    document.body.classList.add('magic-castle-modal-open');
    initMagicCastle();
    window.__refreshMagicCastleLocks?.();
  }

  function hideMagicCastleModal() {
    const modal = $('magicCastleModal');
    hide(modal);
    document.body.classList.remove('magic-castle-modal-open');
  }

  let magicCastleBoardFloatRaf = 0;

  function startMagicCastleBoardFloat() {
    const btn = $('magicCastleBtn');
    if (!btn) return;
    if (magicCastleBoardFloatRaf) cancelAnimationFrame(magicCastleBoardFloatRaf);
    const baseOffset = -18.9;
    const amplitude = 9.5;
    const cycleMs = 3600;
    const tick = now => {
      const phase = (now % cycleMs) / cycleMs;
      const offset = baseOffset + Math.sin(phase * Math.PI * 2) * amplitude;
      btn.style.setProperty('transform', `translate(-50%, -50%) translateY(${offset.toFixed(2)}px)`, 'important');
      magicCastleBoardFloatRaf = requestAnimationFrame(tick);
    };
    magicCastleBoardFloatRaf = requestAnimationFrame(tick);
  }

  function closeBoardWelcomeModal(startMusic=false) {
    const modal = $('boardWelcomeModal');
    hide(modal);
    try { sessionStorage.removeItem(BOARD_WELCOME_STORE); } catch (_) {}
    if (startMusic && !muted) playSound('background', { loop:true, restart:true });
  }

  function showBoardWelcomeModal() {
    const modal = $('boardWelcomeModal');
    if (!modal) return;
    show(modal);
  }

  function updateMapGeometry() {
    const screen = $('boardScreen'), inner = $('mapInner'); if (!screen || !inner) return;
    const w = screen.clientWidth, h = screen.clientHeight;
    let imgW, imgH;
    if (w / h > BOARD_RATIO) {
      imgH = h;
      imgW = h * BOARD_RATIO;
    } else {
      imgW = w;
      imgH = w / BOARD_RATIO;
    }
    inner.style.width = `${imgW}px`;
    inner.style.height = `${imgH}px`;
    inner.style.top = '0px';
    inner.style.transform = 'translateX(-50%)';
  }

  function boardPos(index) { return boardPointForSlot(index); }
  function setHeroAt(index, instant=true) {
    const hero = $('movingHero'); if (!hero) return;
    const pos = boardPointForSlot(index);
    hero.style.transition = instant ? 'none' : 'left 1.6s cubic-bezier(.22,1,.36,1), top 1.6s cubic-bezier(.22,1,.36,1), opacity .25s ease';
    hero.style.left = `${pos.x}%`; hero.style.top = `${pos.y}%`; hero.style.opacity = '1';
    hero.dataset.index = Number.isInteger(index) ? String(index) : 'center';
  }
  function animateHeroTo(targetIndex, { fromIntro=false } = {}) {
    const hero = $('movingHero'); if (!hero) return Promise.resolve();
    const state = getState();
    const current = Number.isInteger(state.heroIndex) ? state.heroIndex : null;
    if (!fromIntro && current === targetIndex) { setHeroAt(targetIndex, true); return Promise.resolve(); }
    const pos = boardPointForSlot(targetIndex);
    return new Promise(resolve => {
      hero.classList.remove('hidden');
      hero.style.opacity = '1';
      setHeroAt(current, true);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        hero.style.transition = 'left 1.6s cubic-bezier(.22,1,.36,1), top 1.6s cubic-bezier(.22,1,.36,1), opacity .25s ease';
        hero.style.left = `${pos.x}%`;
        hero.style.top = `${pos.y}%`;
        playSound('levelstart');
      }));
      setTimeout(() => {
        const s = getState();
        s.heroIndex = targetIndex;
        s.introUsed = true;
        setState(s);
        setHeroAt(targetIndex, true);
        resolve();
      }, 1650);
    });
  }

  let pendingUnlockAnimation = null;
  let pendingUnlockedFromSlot = null;

  function createBoardPaths(state) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.classList.add('board-paths');

    const visibleLinks = Math.max(0, Math.min(state.revealedMax, LEVEL_COUNT - 1));
    for (let i = 0; i < visibleLinks; i += 1) {
      const from = LEVEL_POSITIONS[i];
      const to = LEVEL_POSITIONS[i + 1];
      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', from.x);
      line.setAttribute('y1', from.y);
      line.setAttribute('x2', to.x);
      line.setAttribute('y2', to.y);
      line.setAttribute('pathLength', '100');
      line.setAttribute('class', 'board-path revealed');
      svg.appendChild(line);
    }

    if (pendingUnlockAnimation && pendingUnlockAnimation.from + 1 === pendingUnlockAnimation.to) {
      const from = LEVEL_POSITIONS[pendingUnlockAnimation.from];
      const to = LEVEL_POSITIONS[pendingUnlockAnimation.to];
      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', from.x);
      line.setAttribute('y1', from.y);
      line.setAttribute('x2', to.x);
      line.setAttribute('y2', to.y);
      line.setAttribute('pathLength', '100');
      line.setAttribute('class', 'board-path reveal-now');
      svg.appendChild(line);
    }

    return svg;
  }

  function createBiomeRouteSvg(senseId, activeSlot, state = getState()) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.classList.add('board-biome-routes');
    const first = firstSlotForBiome(senseId);
    const second = questionSlotForBiome(senseId);
    const start = HERO_DEFAULT_POINT;
    const mid = boardPointForSlot(first, state);
    const end = activeSlot === second ? boardPointForSlot(second, state) : null;
    const addLine = (from, to) => {
      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', from.x);
      line.setAttribute('y1', from.y);
      line.setAttribute('x2', to.x);
      line.setAttribute('y2', to.y);
      line.setAttribute('class', 'board-biome-route');
      svg.appendChild(line);
    };
    addLine(start, mid);
    if (end) addLine(mid, end);
    return svg;
  }

  function createLevelNode(slot, state, { active=false, passive=false } = {}) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'board-overlay-btn board-biome-level-btn';
    if (active) btn.classList.add('is-active');
    if (passive) btn.classList.add('is-passive');
    const pos = boardPointForSlot(slot, state);
    btn.style.left = `${pos.x}%`;
    btn.style.top = `${pos.y}%`;
    const senseId = state.slots[slot] || slotSenseId(slot);
    const title = isPlaceholderSlot(slot) ? 'Minispiel' : 'Fragen';
    btn.dataset.kind = isPlaceholderSlot(slot) ? 'minigame' : 'question';
    btn.setAttribute('aria-label', `${BIOME_BY_SENSE[senseId]?.label || 'Biom'} ${title}`);
    btn.innerHTML = '<span class="board-biome-level-core" aria-hidden="true"></span>';
    if (!passive) btn.addEventListener('click', () => onLevelNode(slot));
    return btn;
  }

  let unlockingBiomeId = null;

  function triggerLockShake(lockBtn) {
    if (!lockBtn) return;
    lockBtn.classList.remove('shake-once');
    void lockBtn.offsetWidth;
    lockBtn.classList.add('shake-once');
  }

  function unlockBiomeLockAnimated(id) {
    if (unlockingBiomeId) return;
    const live = getState();
    if (!live.keysFound?.[id] || live.removedLocks?.[id]) return;
    const inner = $('mapInner');
    const lockBtn = inner?.querySelector(`.board-lock-btn[data-lock-id="${id}"]`);
    const keyEl = inner?.querySelector(`.board-biome-key[data-key-id="${id}"]`);
    if (!inner || !lockBtn || !keyEl) {
      live.removedLocks[id] = true;
      setState(live);
      renderBoard();
      return;
    }
    unlockingBiomeId = id;
    inner.classList.add('is-unlocking-key');
    const innerRect = inner.getBoundingClientRect();
    const keyRect = keyEl.getBoundingClientRect();
    const lockRect = lockBtn.getBoundingClientRect();
    const start = { x:(keyRect.left - innerRect.left) + keyRect.width / 2, y:(keyRect.top - innerRect.top) + keyRect.height / 2 };
    const end = { x:(lockRect.left - innerRect.left) + lockRect.width / 2, y:(lockRect.top - innerRect.top) + lockRect.height / 2 };
    const control = { x:(start.x + end.x) / 2, y: Math.min(start.y, end.y) - Math.max(54, Math.abs(start.x - end.x) * 0.12) };
    const flyer = document.createElement('div');
    flyer.className = 'board-key-flyer';
    flyer.innerHTML = `<img src="${assetUrl(BIOME_BY_SENSE[id].key)}" alt="">`;
    flyer.style.left = `${start.x}px`;
    flyer.style.top = `${start.y}px`;
    flyer.style.width = `${keyRect.width}px`;
    inner.appendChild(flyer);
    keyEl.classList.add('is-launching');
    lockBtn.classList.add('is-targeted');
    const duration = 820;
    const startTime = performance.now();
    const ease = t => 1 - Math.pow(1 - t, 3);
    const endScale = Math.max(0.46, Math.min(0.92, lockRect.width / Math.max(1, keyRect.width)));
    function tick(now) {
      const raw = Math.min(1, (now - startTime) / duration);
      const t = ease(raw);
      const omt = 1 - t;
      const x = (omt * omt * start.x) + (2 * omt * t * control.x) + (t * t * end.x);
      const y = (omt * omt * start.y) + (2 * omt * t * control.y) + (t * t * end.y);
      const scale = 1 - ((1 - endScale) * t);
      flyer.style.left = `${x}px`;
      flyer.style.top = `${y}px`;
      flyer.style.transform = `translate(-50%, -50%) rotate(${t * 540}deg) scale(${scale})`;
      if (raw < 1) requestAnimationFrame(tick);
      else {
        flyer.classList.add('is-burst');
        keyEl.classList.add('is-fading-out');
        lockBtn.classList.add('is-fading-out');
        playSound('levelunlocked');
        setTimeout(() => {
          flyer.remove();
          const state = getState();
          state.removedLocks[id] = true;
          setState(state);
          unlockingBiomeId = null;
          inner.classList.remove('is-unlocking-key');
          renderBoard();
        }, 280);
      }
    }
    requestAnimationFrame(tick);
  }


  /* === 2026-06-05 journey-board overrides === */
  const JOURNEY_NODE_POINTS = {
    start: { x: 18.0, y: 90.5 },
    1: { x: 60.0, y: 87.5 },
    2: { x: 82.0, y: 69.0 },
    3: { x: 28.0, y: 69.0 },
    4: { x: 18.0, y: 47.0 },
    5: { x: 73.0, y: 45.5 },
    6: { x: 50.0, y: 18.5 }
  };
  const JOURNEY_BOARD_BG = assetUrl('assets/images/board/universe_bg.png');
  const JOURNEY_ISLAND_IMAGES = {
    start: assetUrl('assets/images/board/start_island.png'),
    riechen: assetUrl('assets/images/board/grass_island.png'),
    fuehlen: assetUrl('assets/images/board/ice_island.png'),
    sehen: assetUrl('assets/images/board/cloud_island.png'),
    hoeren: assetUrl('assets/images/board/desert_island.png'),
    schmecken: assetUrl('assets/images/board/lava_island.png'),
    boss: assetUrl('assets/images/magiccastle/magieschloss_interaktiv.png')
  };
  const JOURNEY_LABELS = {
    start: 'Startinsel',
    riechen: 'Grasinsel',
    fuehlen: 'Eisinsel',
    sehen: 'Wolkeninsel',
    hoeren: 'Wüsteninsel',
    schmecken: 'Vulkaninsel',
    boss: 'Magieschloss'
  };
  let pendingJourneyReveal = null;
  let journeyRevealTimer = null;
  let journeyPathTimer = null;
  let journeyMoveTimer = null;
  let boardTravel = null;
  let boardTravelTimer = null;

  function clearJourneyRevealTimers() {
    if (journeyRevealTimer) window.clearTimeout(journeyRevealTimer);
    if (journeyPathTimer) window.clearTimeout(journeyPathTimer);
    if (journeyMoveTimer) window.clearTimeout(journeyMoveTimer);
    journeyRevealTimer = null;
    journeyPathTimer = null;
    journeyMoveTimer = null;
  }

  function clearBoardTravelTimer() {
    if (boardTravelTimer) window.clearTimeout(boardTravelTimer);
    boardTravelTimer = null;
  }

  function boardNodeOrdinal(node) {
    return String(node) === 'start' ? 0 : Math.max(0, Number(node) || 0);
  }

  function ordinalBoardNode(value) {
    return value <= 0 ? 'start' : value;
  }

  function boardPathBetweenNodes(fromNode, toNode) {
    const from = boardNodeOrdinal(fromNode);
    const to = boardNodeOrdinal(toNode);
    if (from === to) return [ordinalBoardNode(from)];
    const dir = from < to ? 1 : -1;
    const path = [ordinalBoardNode(from)];
    for (let step = from + dir; dir > 0 ? step <= to : step >= to; step += dir) {
      path.push(ordinalBoardNode(step));
    }
    return path;
  }

  function boardIsBusy() {
    return Boolean(pendingJourneyReveal || boardTravel);
  }

  function defaultState() {
    return {
      stateVersion:STATE_VERSION,
      started:false,
      slots:Array(LEVEL_COUNT).fill(null),
      completed:Array(LEVEL_COUNT).fill(false),
      bossCompleted:false,
      heroIndex:null,
      heroName:DEFAULT_HERO_NAME,
      heroGender:DEFAULT_HERO_GENDER,
      heroPronoun:DEFAULT_HERO_PRONOUN,
      introUsed:false,
      revealedMax:0,
      keysFound:blankFlags(),
      removedLocks:blankFlags(),
      activeBiome:null,
      journeyOrder:[],
      boardCurrentNode:'start'
    };
  }

  function sanitizeJourneyOrder(raw) {
    const valid = [];
    (Array.isArray(raw) ? raw : []).forEach(id => {
      if (!KEY_ORDER.includes(id) || valid.includes(id)) return;
      valid.push(id);
    });
    return valid;
  }

  function inferJourneyOrder(state) {
    const order = [];
    (Array.isArray(state?.slots) ? state.slots : []).forEach(id => {
      if (!KEY_ORDER.includes(id) || order.includes(id)) return;
      order.push(id);
    });
    if (state?.activeBiome && KEY_ORDER.includes(state.activeBiome) && !order.includes(state.activeBiome)) order.push(state.activeBiome);
    return order.slice(0, 5);
  }

  function boardNodeForSenseId(id, state = getState()) {
    if (id === 'boss') return 6;
    const order = sanitizeJourneyOrder(state?.journeyOrder).length ? sanitizeJourneyOrder(state?.journeyOrder) : inferJourneyOrder(state);
    const index = order.indexOf(id);
    return index >= 0 ? index + 1 : null;
  }

  function isValidBoardNode(value) {
    return value === 'start' || value === 6 || (Number.isInteger(value) && value >= 1 && value <= 5);
  }

  function deriveBoardCurrentNode(state) {
    if (state?.activeBiome === 'boss') return 6;
    if (state?.activeBiome && KEY_ORDER.includes(state.activeBiome)) {
      const node = boardNodeForSenseId(state.activeBiome, state);
      if (node) return node;
    }
    if (Number.isInteger(state?.heroIndex)) {
      const assigned = state?.slots?.[state.heroIndex];
      if (assigned === 'boss') return 6;
      const heroNode = boardNodeForSenseId(assigned, state);
      if (heroNode) return heroNode;
    }
    return state?.journeyOrder?.length ? Math.min(5, state.journeyOrder.length) : 'start';
  }

  function normalizeState(raw) {
    const base = defaultState();
    if (!raw || raw.stateVersion !== STATE_VERSION) return base;
    const state = { ...base, ...(raw || {}) };
    state.heroName = cleanHeroName(raw?.heroName) || DEFAULT_HERO_NAME;
    state.heroGender = HERO_GENDER_OPTIONS.includes(raw?.heroGender) ? raw.heroGender : DEFAULT_HERO_GENDER;
    state.heroPronoun = state.heroGender === 'female' ? 'sie' : 'er';
    const oldSlots = Array.isArray(raw?.slots) ? raw.slots : [];
    const oldCompleted = Array.isArray(raw?.completed) ? raw.completed : [];
    state.slots = Array.from({ length: LEVEL_COUNT }, (_, i) => oldSlots[i] || null);
    state.completed = Array.from({ length: LEVEL_COUNT }, (_, i) => Boolean(oldCompleted[i]));
    if (!Number.isInteger(state.heroIndex) || state.heroIndex < 0 || state.heroIndex >= LEVEL_COUNT) state.heroIndex = null;
    const inferredReveal = state.completed.every(Boolean)
      ? LEVEL_COUNT - 1
      : Math.max(0, Math.min(LEVEL_COUNT - 1, state.completed.findIndex(v => !v)));
    state.revealedMax = Number.isInteger(state.revealedMax)
      ? Math.max(0, Math.min(LEVEL_COUNT - 1, state.revealedMax))
      : inferredReveal;
    if (state.revealedMax < inferredReveal) state.revealedMax = inferredReveal;
    const keyFlags = blankFlags();
    state.keysFound = { ...keyFlags, ...(raw?.keysFound || {}) };
    state.removedLocks = { ...keyFlags, ...(raw?.removedLocks || {}) };
    const keySlots = { sehen:0, hoeren:2, riechen:4, schmecken:6, fuehlen:8 };
    Object.entries(keySlots).forEach(([id, slot]) => {
      if (state.completed[slot]) state.keysFound[id] = true;
    });
    state.journeyOrder = sanitizeJourneyOrder(raw?.journeyOrder);
    if (!state.journeyOrder.length) state.journeyOrder = inferJourneyOrder(state);
    if (state.activeBiome && KEY_ORDER.includes(state.activeBiome) && !state.journeyOrder.includes(state.activeBiome)) {
      state.journeyOrder = [...state.journeyOrder, state.activeBiome].slice(0, 5);
    }
    if (!state.activeBiome || !BIOME_LEVEL_PLAN[state.activeBiome] || BIOME_LEVEL_PLAN[state.activeBiome].every(slot => state.completed[slot])) state.activeBiome = null;
    if (!state.activeBiome && KEY_ORDER.every(id => state.removedLocks?.[id]) && !state.bossCompleted && !biomeIsComplete('boss', state)) {
      const bossSlot = nextSlotForBiome('boss', state);
      if (Number.isInteger(bossSlot)) {
        state.activeBiome = 'boss';
        state.slots[bossSlot] = 'boss';
      }
    }
    state.boardCurrentNode = isValidBoardNode(raw?.boardCurrentNode) ? raw.boardCurrentNode : deriveBoardCurrentNode(state);
    return state;
  }

  function boardPointForNode(node) {
    return JOURNEY_NODE_POINTS[String(node)] || JOURNEY_NODE_POINTS.start;
  }

  function boardPointForSlot(index, state = getState()) {
    if (!Number.isInteger(index)) return boardPointForNode(state?.boardCurrentNode || 'start');
    const assigned = state?.slots?.[index];
    if (assigned === 'boss') return boardPointForNode(6);
    const node = boardNodeForSenseId(assigned, state);
    return boardPointForNode(node || state?.boardCurrentNode || 'start');
  }

  function currentBoardNode(state = getState()) {
    return isValidBoardNode(state?.boardCurrentNode) ? state.boardCurrentNode : deriveBoardCurrentNode(state);
  }

  function finalBridgeUnlocked(state = getState()) {
    return KEY_ORDER.every(id => biomeIsComplete(id, state));
  }

  function boardSlotForSense(id, state = getState()) {
    if (id === 'boss') return nextSlotForBiome('boss', state) ?? questionSlotForBiome('boss') ?? firstSlotForBiome('boss');
    return nextSlotForBiome(id, state) ?? questionSlotForBiome(id) ?? firstSlotForBiome(id);
  }

  function createJourneyPathSvg(state) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.classList.add('board-journey-paths');
    const pairs = [];
    if (state.journeyOrder.length > 0) pairs.push(['start', 1]);
    for (let index = 1; index < state.journeyOrder.length; index += 1) pairs.push([index, index + 1]);
    if (finalBridgeUnlocked(state)) pairs.push([5, 6]);
    const pendingPhase = pendingJourneyReveal?.phase;
    pairs.forEach(([fromNode, toNode]) => {
      const isPendingPair = pendingJourneyReveal
        && String(pendingJourneyReveal.from) === String(fromNode)
        && String(pendingJourneyReveal.to) === String(toNode);
      if (isPendingPair && pendingPhase === 'reveal') return;
      const from = boardPointForNode(fromNode);
      const to = boardPointForNode(toNode);
      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', String(from.x));
      line.setAttribute('y1', String(from.y));
      line.setAttribute('x2', String(to.x));
      line.setAttribute('y2', String(to.y));
      line.setAttribute('class', isPendingPair && (pendingPhase === 'path' || pendingPhase === 'move')
        ? 'journey-path journey-path--active'
        : 'journey-path');
      svg.appendChild(line);
    });
    return svg;
  }

  function islandKeyBadge(id) {
    if (!id || id === 'boss' || !BIOME_BY_SENSE[id]?.key) return '';
    return `<span class="board-island-key-floating"><img src="${assetUrl(BIOME_BY_SENSE[id].key)}" alt="${esc((JOURNEY_LABELS[id] || id) + '-Schlüssel')}"></span>`;
  }

  function createIslandButton(node, type, state) {
    const pos = boardPointForNode(node);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `board-island board-island--${type === 'start' ? 'start' : (type === 'boss' ? 'castle' : 'sense')}`;
    btn.dataset.node = String(node);
    btn.style.left = `${pos.x}%`;
    btn.style.top = `${pos.y}%`;
    const floating = !boardTravel && String(currentBoardNode(state)) === String(node);
    if (floating) btn.classList.add('is-current');
    if (pendingJourneyReveal && String(pendingJourneyReveal.to) === String(node) && pendingJourneyReveal.phase === 'reveal') btn.classList.add('is-newly-revealed');
    const shouldShowRider = !boardTravel && floating && !(pendingJourneyReveal && pendingJourneyReveal.phase === 'move');
    const riderMarkup = shouldShowRider
      ? `<span class="board-island-rider"><img class="hero-token" src="${ASSETS.hero}" alt="${esc(getHeroName())}"></span>`
      : '';
    if (type === 'start') {
      const canScan = !allLevelsDone(state) && !(state.activeBiome && Number.isInteger(activeBoardSlot(state)));
      btn.setAttribute('aria-label', 'Startinsel mit Marktbrett');
      btn.innerHTML = `
        <img src="${JOURNEY_ISLAND_IMAGES.start}" alt="Startinsel mit Dorf und Burg">
        ${riderMarkup}`;
      btn.classList.toggle('is-quest-target', canScan && String(currentBoardNode(state)) === 'start');
      btn.addEventListener('click', () => {
        const live = getState();
        if (boardIsBusy()) return;
        if (String(currentBoardNode(live)) !== 'start') {
          travelHeroToBoardNode('start');
          return;
        }
        if (allLevelsDone(live)) { showOutro(); return; }
        if (live.activeBiome && Number.isInteger(activeBoardSlot(live))) return;
        openScan();
      });
      return btn;
    }
    if (type === 'boss') {
      const ready = finalBridgeUnlocked(state) || state.activeBiome === 'boss' || state.bossCompleted;
      if (ready && String(currentBoardNode(state)) === '6') btn.classList.add('is-quest-target');
      btn.setAttribute('aria-label', 'Magieschloss');
      btn.classList.add('is-always-floating');
      btn.innerHTML = `
        <img src="${JOURNEY_ISLAND_IMAGES.boss}" alt="Magieschloss">
        ${riderMarkup}`;
      btn.addEventListener('click', () => {
        const live = getState();
        if (boardIsBusy() || !ready) return;
        if (String(currentBoardNode(live)) !== '6') {
          travelHeroToBoardNode(6);
          return;
        }
        showMagicCastleModal();
      });
      return btn;
    }
    const complete = biomeIsComplete(type, state);
    const active = state.activeBiome === type;
    const slot = boardSlotForSense(type, state);
    if (active && String(currentBoardNode(state)) === String(node)) btn.classList.add('is-quest-target');
    if (complete) btn.classList.add('is-complete');
    btn.setAttribute('aria-label', `${JOURNEY_LABELS[type] || BIOME_BY_SENSE[type]?.label || type} öffnen`);
    btn.innerHTML = `
      <img src="${JOURNEY_ISLAND_IMAGES[type]}" alt="${esc(JOURNEY_LABELS[type] || type)}">
      ${state.keysFound?.[type] ? islandKeyBadge(type) : ''}
      ${riderMarkup}`;
    btn.addEventListener('click', () => { if (Number.isInteger(slot)) onLevelNode(slot); });
    return btn;
  }

  function updateBoardStatusText(node, state) {
    const activeSlot = activeBoardSlot(state);
    if (!node) return;
    if (state.activeBiome === 'boss') {
      node.innerHTML = '<strong>Ziel:</strong> Die Brücke zum Magieschloss ist frei.';
      return;
    }
    if (state.activeBiome && Number.isInteger(activeSlot)) {
      node.innerHTML = `<strong>Ziel:</strong> ${esc(JOURNEY_LABELS[state.activeBiome] || BIOME_BY_SENSE[state.activeBiome]?.label || state.activeBiome)} · ${esc(levelTypeLabel(activeSlot))}`;
      return;
    }
    if (finalBridgeUnlocked(state)) {
      node.innerHTML = '<strong>Ziel:</strong> Tippe auf das Magieschloss.';
      return;
    }
    node.innerHTML = '<strong>Ziel:</strong> Tippe auf die Startinsel und scanne am Marktbrett einen Steckbrief.';
  }

  function setHeroAtVisualNode(node, instant = true) {
    const hero = $('movingHero');
    if (!hero) return;
    const pos = boardPointForNode(node);
    hero.style.transition = instant ? 'none' : 'left 1.55s cubic-bezier(.22,1,.36,1), top 1.55s cubic-bezier(.22,1,.36,1), opacity .25s ease';
    hero.style.left = `${pos.x}%`;
    hero.style.top = `${pos.y}%`;
    hero.style.opacity = '1';
    hero.dataset.boardNode = String(node);
  }

  function finalizeBoardTravel(targetNode) {
    const live = getState();
    live.boardCurrentNode = targetNode;
    setState(live);
    boardTravel = null;
    clearBoardTravelTimer();
    renderBoard();
  }

  function travelHeroToBoardNode(targetNode) {
    if (boardIsBusy()) return false;
    const live = getState();
    const fromNode = currentBoardNode(live);
    if (String(fromNode) === String(targetNode)) return false;
    boardTravel = { path: boardPathBetweenNodes(fromNode, targetNode), stepIndex: 0 };
    renderBoard();
    return true;
  }


  function renderBoard() {
    const inner = $('mapInner');
    if (!inner) return;
    clearJourneyRevealTimers();
    clearBoardTravelTimer();
    const state = getState();
    const boardImage = $('boardImage');
    if (boardImage) {
      boardImage.src = JOURNEY_BOARD_BG;
      boardImage.alt = 'Weltraum-Spielbrett';
    }
    inner.innerHTML = '';

    const status = document.createElement('div');
    status.className = 'board-journey-status';
    updateBoardStatusText(status, state);
    inner.appendChild(createJourneyPathSvg(state));
    inner.appendChild(status);
    inner.appendChild(createIslandButton('start', 'start', state));
    state.journeyOrder.forEach((senseId, index) => {
      inner.appendChild(createIslandButton(index + 1, senseId, state));
    });
    inner.appendChild(createIslandButton(6, 'boss', state));

    const hero = document.createElement('div');
    hero.id = 'movingHero';
    hero.className = 'map-token moving-hero-token hidden';
    hero.innerHTML = `<img class="hero-token" src="${ASSETS.hero}" alt="${esc(getHeroName())}">`;
    inner.appendChild(hero);

    const currentNode = currentBoardNode(state);
    if (boardTravel?.path?.length > 1) {
      const path = boardTravel.path;
      const fromNode = path[Math.min(boardTravel.stepIndex, path.length - 1)];
      const toNode = path[Math.min(boardTravel.stepIndex + 1, path.length - 1)];
      hero.classList.remove('hidden');
      hero.classList.add('is-travelling');
      setHeroAtVisualNode(fromNode, true);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setHeroAtVisualNode(toNode, false);
        playSound('levelstart');
      }));
      boardTravelTimer = window.setTimeout(() => {
        if (!boardTravel) return;
        boardTravel.stepIndex += 1;
        if (boardTravel.stepIndex >= boardTravel.path.length - 1) {
          finalizeBoardTravel(boardTravel.path[boardTravel.path.length - 1]);
          return;
        }
        renderBoard();
      }, 1560);
    } else if (!pendingJourneyReveal) {
      setHeroAtVisualNode(currentNode, true);
      hero.classList.add('hidden');
    } else if (pendingJourneyReveal.phase === 'reveal') {
      setHeroAtVisualNode(pendingJourneyReveal.from, true);
      hero.classList.add('hidden');
      journeyRevealTimer = window.setTimeout(() => {
        if (!pendingJourneyReveal || pendingJourneyReveal.phase !== 'reveal') return;
        pendingJourneyReveal = { ...pendingJourneyReveal, phase: 'path' };
        renderBoard();
      }, 760);
    } else if (pendingJourneyReveal.phase === 'path') {
      setHeroAtVisualNode(pendingJourneyReveal.from, true);
      hero.classList.add('hidden');
      journeyPathTimer = window.setTimeout(() => {
        if (!pendingJourneyReveal || pendingJourneyReveal.phase !== 'path') return;
        pendingJourneyReveal = { ...pendingJourneyReveal, phase: 'move' };
        renderBoard();
      }, 520);
    } else if (pendingJourneyReveal.phase === 'move') {
      hero.classList.remove('hidden');
      hero.classList.add('is-travelling');
      setHeroAtVisualNode(pendingJourneyReveal.from, true);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setHeroAtVisualNode(pendingJourneyReveal.to, false);
        playSound('levelstart');
      }));
      journeyMoveTimer = window.setTimeout(() => {
        const live = getState();
        live.boardCurrentNode = pendingJourneyReveal.to;
        setState(live);
        pendingJourneyReveal = null;
        renderBoard();
      }, 1680);
    }

    renderGuide(state);
  }


  async function onLevelNode(index) {
    if (boardIsBusy()) return;
    const state = getState();
    const completed = state.completed[index];
    const assigned = state.slots[index];
    if (!assigned) return;
    const targetNode = assigned === 'boss' ? 6 : (boardNodeForSenseId(assigned, state) || currentBoardNode(state));
    if (String(currentBoardNode(state)) !== String(targetNode)) {
      travelHeroToBoardNode(targetNode);
      return;
    }
    if (isPlaceholderSlot(index)) {
      if (completed && index !== 1 && index !== 3 && index !== 5 && index !== 7) return;
      showPlaceholder(index);
      return;
    }
    if (completed) {
      location.href = pageUrl(assigned === 'boss'
        ? `level.html?type=boss&slot=${index}`
        : `level.html?sense=${encodeURIComponent(assigned)}&slot=${index}`);
      return;
    }
    showEncounter(assigned, index);
  }

  async function unlockSense(id, index) {
    await stopScanner();
    resetScanModalState();
    clearJourneyRevealTimers();
    const state = getState();
    const fromNode = currentBoardNode(state);
    state.started = true;
    state.activeBiome = id;
    state.heroIndex = index;
    state.slots[index] = id;
    if (KEY_ORDER.includes(id) && !state.journeyOrder.includes(id)) state.journeyOrder = [...state.journeyOrder, id].slice(0, 5);
    const toNode = id === 'boss' ? 6 : (boardNodeForSenseId(id, state) || 'start');
    state.boardCurrentNode = fromNode || 'start';
    setState(state);
    pendingJourneyReveal = { from: fromNode || 'start', to: toNode, senseId: id, phase: 'reveal' };
    renderBoard();
    playSound('levelunlocked');
  }

  async function animateHeroHome(fromSlot, viaSlot = null) {
    const state = getState();
    state.heroIndex = fromSlot;
    state.boardCurrentNode = state.slots[fromSlot] === 'boss' ? 6 : (boardNodeForSenseId(state.slots[fromSlot], state) || currentBoardNode(state));
    setState(state);
    renderBoard();
    if (Number.isInteger(viaSlot) && viaSlot !== fromSlot) {
      await animateHeroStep(fromSlot, viaSlot);
      const mid = getState();
      mid.heroIndex = viaSlot;
      mid.boardCurrentNode = mid.slots[viaSlot] === 'boss' ? 6 : (boardNodeForSenseId(mid.slots[viaSlot], mid) || currentBoardNode(mid));
      setState(mid);
      renderBoard();
      fromSlot = viaSlot;
    }
    await animateHeroStep(fromSlot, null);
    const latest = getState();
    latest.heroIndex = null;
    latest.boardCurrentNode = 'start';
    setState(latest);
    renderBoard();
  }

  document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page;
    if (page === 'board') initBoard();
    else if (page === 'magiccastle') initMagicCastle();
    else if (page === 'story') initStory();
    else if (page === 'level') initLevel();
    else if (page === 'battle') initBattle();
    else if (page === 'minigame') initMiniGame();
    else if (page === 'minigame2') initMiniGame2();
    else if (page === 'minigame3') initMiniGame3();
    else if (page === 'minigame4') initMiniGame4();
    else if (page === 'codes') initCodes();
  });
})();
