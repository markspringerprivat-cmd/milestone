(() => {
  'use strict';

  const STORE = 'koenigreichSinneV4State';
  const BATTLE_STORE = 'koenigreichSinneV4Battle';
  const BATTLE_BACKUP_STORE = 'koenigreichSinneV4BattleBackup';
  const RETURN_STORE = 'koenigreichSinneV4BoardReturn';
  const SOUND_STORE = 'koenigreichSinneV4Muted';
  const BOARD_WELCOME_STORE = 'koenigreichSinneV4PendingBoardWelcome';
  const BOARD_ONBOARDING_STORE = 'koenigreichSinneV4BoardOnboardingDone';
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
    state.seenIslandStories = { ...keyFlags, ...(raw?.seenIslandStories || {}) };
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
    removeBoardViewportBars?.();
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
      text: 'Gib deinen Namen ein, wähle männlich oder weiblich und starte dann die Geschichte.',
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
      <div class="story-profile-title">Ritterfigur anlegen</div>
      <div class="story-profile-row">
        <label class="story-profile-label" for="storyHeroNameInput">Name</label>
        <input id="storyHeroNameInput" type="text" name="storyHeroNameInput" autocomplete="off" maxlength="28" placeholder="Name eingeben" value="${esc(profile.name === DEFAULT_HERO_NAME ? '' : profile.name)}">
      </div>
      <fieldset class="story-gender-box" aria-label="Geschlecht der Ritterfigur">
        <legend>Geschlecht</legend>
        <label class="story-gender-option"><input type="radio" name="storyHeroGender" value="male" ${profile.gender === 'male' ? 'checked' : ''}> <span>Männlich</span></label>
        <label class="story-gender-option"><input type="radio" name="storyHeroGender" value="female" ${profile.gender === 'female' ? 'checked' : ''}> <span>Weiblich</span></label>
      </fieldset>
      <p id="storyProfileHint" class="story-profile-hint">Der Name wird in Geschichte und Spiel verwendet.</p>
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
    const firstBoardWelcome = (() => {
      try { return localStorage.getItem(BOARD_ONBOARDING_STORE) !== '1'; } catch (_) { return true; }
    })();
    const pendingBoardWelcome = qs('welcome') === '1' || firstBoardWelcome || (() => {
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
    if (state.started) { showBoard(false, { playMusic: !pendingBoardWelcome }); } else { document.body.classList.remove('board-ui-active'); removeBoardViewportBars(); show($('introScreen')); hide($('boardScreen')); hide($('openBoardMenuBtn')); hide($('belowBoard')); }
    if (pendingBoardWelcome && state.started) {
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
    $('boardWelcomeContinueBtn')?.addEventListener('click', startBoardAfterWelcome);
    $('boardWelcomeModal')?.addEventListener('click', ev => { if (ev.target === $('boardWelcomeModal')) startBoardAfterWelcome(); });
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
    window.addEventListener('pageshow', () => {
      resetBoardViewport();
      updateMapGeometry();
      if (boardScreenIsVisible()) {
        renderBoard();
        startMagicCastleBoardFloat();
        window.setTimeout(() => maybeShowIslandStoryForNode(currentBoardNode(getState())), 250);
      } else {
        removeBoardViewportBars();
      }
    }, { passive:true });
    setTimeout(() => applyReturnModal(), 150);
  }

  function showBoard(firstStart=false, options={}) {
    const { playMusic = true } = options;
    document.body.classList.add('board-ui-active');
    hide($('introScreen')); show($('boardScreen')); hide($('openBoardMenuBtn')); hide($('belowBoard')); document.body.classList.remove('board-menu-open');
    resetBoardViewport();
    updateMapGeometry(); renderBoard();
    startMagicCastleBoardFloat();
    window.setTimeout(() => {
      if (!$('boardScreen')?.classList.contains('hidden')) maybeShowIslandStoryForNode(currentBoardNode(getState()));
    }, 350);
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


  function boardPreloadAssetList() {
    const list = [
      JOURNEY_BOARD_BG,
      ...Object.values(JOURNEY_ISLAND_IMAGES || {}),
      ASSETS.hero,
      ASSETS.winHero,
      ASSETS.triumphHero,
      ASSETS.versus,
      ASSETS.escapeHero,
      ASSETS.loseHero,
      ASSETS.final,
      ASSETS.text?.kampf,
      ASSETS.text?.richtig,
      ASSETS.text?.falsch,
      ASSETS.text?.gewonnen,
      ASSETS.text?.verloren,
      assetUrl('assets/images/ui/market_board.png'),
      assetUrl('assets/images/magiccastle/magieschloss_background.png'),
      assetUrl('assets/images/magiccastle/eisschloss.png'),
      assetUrl('assets/images/magiccastle/grasschloss.png'),
      assetUrl('assets/images/magiccastle/lavaschloss.png'),
      assetUrl('assets/images/magiccastle/wolkenschloss.png'),
      assetUrl('assets/images/magiccastle/wuestenschloss.png')
    ];
    Object.values(BIOME_BY_SENSE || {}).forEach(entry => {
      list.push(entry.enemy, entry.defeated, entry.key, entry.bg, entry.popupBg);
    });
    Object.values(SENSES || {}).forEach(entry => {
      list.push(entry.enemy, entry.defeated);
    });
    return [...new Set(list.filter(Boolean))];
  }

  function setBoardWelcomeLoadProgress(value) {
    const percent = Math.round(clamp(value, 0, 1) * 100);
    const bar = $('boardWelcomeLoadBar');
    const label = $('boardWelcomeLoadPercent');
    if (bar) bar.style.width = `${percent}%`;
    if (label) label.textContent = `${percent}%`;
  }

  let boardWelcomeLoading = false;
  async function startBoardAfterWelcome() {
    if (boardWelcomeLoading) return;
    boardWelcomeLoading = true;
    const btn = $('boardWelcomeContinueBtn');
    const loader = $('boardWelcomeLoader');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Lädt ...';
    }
    loader?.classList.remove('hidden');
    setBoardWelcomeLoadProgress(0);
    if (!muted) playSound('background', { loop:true, restart:true });
    try {
      await Promise.all([
        preloadImagesWithProgress(boardPreloadAssetList(), setBoardWelcomeLoadProgress),
        sleep(520)
      ]);
    } catch (_) {}
    setBoardWelcomeLoadProgress(1);
    try { localStorage.setItem(BOARD_ONBOARDING_STORE, '1'); } catch (_) {}
    boardWelcomeLoading = false;
    closeBoardWelcomeModal(false);
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
    inner.style.width = '100vw';
    inner.style.height = '100dvh';
    inner.style.left = '0px';
    inner.style.top = '0px';
    inner.style.transform = 'none';
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

  function renderBoard() {
    const inner = $('mapInner'); if (!inner) return;
    const boardScreen = $('boardScreen');
    const state = getState();
    inner.innerHTML = '';
    boardScreen?.querySelector('#marketScanBtn')?.remove();

    if (state.activeBiome) {
      const activeSlot = activeBoardSlot(state);
      if (Number.isInteger(activeSlot)) inner.appendChild(createBiomeRouteSvg(state.activeBiome, activeSlot, state));
    }

    const market = document.createElement('button');
    market.type = 'button';
    market.id = 'marketScanBtn';
    market.className = 'board-overlay-btn market-board-btn';
    market.setAttribute('aria-label', 'Marktbrett öffnen und QR-Code scannen');
    const marketAvailable = !allLevelsDone(state) && !(state.activeBiome && Number.isInteger(activeBoardSlot(state)));
    if (!marketAvailable) market.classList.add('is-disabled');
    else market.classList.add('is-guided');
    market.innerHTML = `<img src="${assetUrl('assets/images/ui/market_board.png')}" alt="Marktbrett">`;
    market.addEventListener('click', () => {
      const live = getState();
      if (allLevelsDone(live)) { showOutro(); return; }
      if (live.activeBiome && Number.isInteger(activeBoardSlot(live))) return;
      openScan();
    });
    (boardScreen || inner).appendChild(market);

    KEY_ORDER.forEach(id => {
      if (!state.keysFound?.[id] || state.removedLocks?.[id]) return;
      const key = document.createElement('button');
      key.type = 'button';
      key.className = 'board-biome-key';
      key.dataset.keyId = id;
      key.setAttribute('aria-label', `${BIOME_BY_SENSE[id].label}-Schlüssel zum Schloss schicken`);
      const pos = biomeKeyPoint(id);
      key.style.left = `${pos.x}%`;
      key.style.top = `${pos.y}%`;
      key.innerHTML = `<img src="${assetUrl(BIOME_BY_SENSE[id].key)}" alt="${esc(BIOME_BY_SENSE[id].label + '-Schlüssel')}">`;
      key.addEventListener('click', () => { location.href = pageUrl('index.html?board=1'); });
      inner.appendChild(key);
    });

    const status = document.createElement('div');
    status.className = 'board-biome-status';
    const activeSlot = activeBoardSlot(state);
    status.innerHTML = state.activeBiome && Number.isInteger(activeSlot)
      ? `<strong>Aktives Ziel:</strong> ${esc(BIOME_BY_SENSE[state.activeBiome].label)} · ${esc(levelTypeLabel(activeSlot))}`
      : `<strong>Aktives Ziel:</strong> Scanne am Marktbrett ein Biom.`;
    inner.appendChild(status);

    if (state.activeBiome && Number.isInteger(activeSlot)) {
      const first = firstSlotForBiome(state.activeBiome);
      const second = questionSlotForBiome(state.activeBiome);
      if (activeSlot === second && state.completed[first]) inner.appendChild(createLevelNode(first, state, { passive:true }));
      inner.appendChild(createLevelNode(activeSlot, state, { active:true }));
    }

    const hero = document.createElement('button');
    hero.type = 'button';
    hero.id = 'movingHero';
    hero.className = 'map-token moving-hero-token';
    hero.innerHTML = `<img class="hero-token" src="assets/images/characters/held.webp" alt="${esc(getHeroName())}">`;
    inner.appendChild(hero);

    if (Number.isInteger(state.heroIndex)) setHeroAt(state.heroIndex, true);
    else {
      hero.classList.remove('hidden');
      setHeroAt(null, true);
    }

    renderGuide(state);
  }

  function renderGuide() {
    const guide = $('boardGuide'); if (!guide) return;
    guide.classList.add('hidden');
  }

  let introHeroMoving = false;
  async function startIntroHeroJourney() {
    if (introHeroMoving) return;
    introHeroMoving = true;
    renderGuide();
    openScan();
    introHeroMoving = false;
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

  let scanIndex = null, scanner = null, scanCloseTimer = null;
  function activeScanMeta() { return null; }
  function resetScanModalState() {
    if (scanCloseTimer) {
      clearTimeout(scanCloseTimer);
      scanCloseTimer = null;
    }
    document.body.classList.remove('market-popup-open');
    const modal = $('scanModal');
    modal?.classList.remove('market-scan-modal', 'is-closing', 'stage-popup');
    hide(modal);
    scanIndex = null;
  }
  function openScan() {
    stopScanner();
    if (scanCloseTimer) {
      clearTimeout(scanCloseTimer);
      scanCloseTimer = null;
    }
    scanIndex = null;
    const modal = $('scanModal');
    document.body.classList.add('market-popup-open');
    modal?.classList.add('market-scan-modal');
    modal?.classList.remove('stage-popup', 'is-closing');
    modal?.style.removeProperty('--popup-bg');
    if ($('manualCodeInput')) $('manualCodeInput').value='';
    if ($('scanHelp')) $('scanHelp').textContent = '';
    setScanMessage('');
    show(modal);
    setTimeout(startScanner, 120);
  }
  function closeScan() {
    stopScanner();
    const modal = $('scanModal');
    document.body.classList.remove('market-popup-open');
    if (!modal || modal.classList.contains('hidden')) {
      scanIndex = null;
      playSound('background', { loop:true, restart:false });
      return;
    }
    modal.classList.add('is-closing');
    scanIndex = null;
    if (scanCloseTimer) clearTimeout(scanCloseTimer);
    scanCloseTimer = setTimeout(() => {
      hide(modal);
      modal.classList.remove('market-scan-modal', 'is-closing', 'stage-popup');
      scanCloseTimer = null;
      playSound('background', { loop:true, restart:false });
    }, 420);
  }
  function skipCurrentLevel() {
    const state = getState();
    const slot = state.activeBiome ? nextSlotForBiome(state.activeBiome, state) : null;
    if (!Number.isInteger(slot)) return;
    stopScanner();
    resetScanModalState();
    state.completed[slot] = true;
    state.heroIndex = null;
    if (!nextSlotForBiome(state.activeBiome, state)) state.activeBiome = null;
    setState(state);
    renderBoard();
    localStorage.setItem(RETURN_STORE, JSON.stringify({ type:'unlocked', meta:{ slot, skipped:true, returnHome:true } }));
    applyReturnModal();
  }
  function unlockAllLevels() {
    if (!confirm('Alle Schluessel zum Testen bereitstellen?')) return;
    const state = getState();
    state.started = true;
    state.heroIndex = null;
    state.activeBiome = null;
    state.introUsed = true;
    state.keysFound = { sehen:true, hoeren:true, riechen:true, schmecken:true, fuehlen:true, boss:false };
    state.removedLocks = { ...state.removedLocks, boss:false };
    setState(state);
    localStorage.removeItem(RETURN_STORE);
    document.body.classList.remove('board-menu-open');
    hide($('introScreen'));
    show($('boardScreen'));
    hide($('openBoardMenuBtn'));
    hide($('belowBoard'));
    document.body.classList.remove('board-menu-open');
    renderBoard();
    playSound('levelunlocked');
  }

  function setScanMessage(text, bad=false) { const msg=$('scanMessage'); if (!msg) return; msg.textContent=text; msg.className = text ? `message ${bad?'bad':'ok'}` : 'message hidden'; }
  async function waitForScannerLibrary(timeoutMs = 2200) {
    const start = Date.now();
    while (!window.Html5Qrcode && Date.now() - start < timeoutMs) {
      await sleep(80);
    }
    return Boolean(window.Html5Qrcode);
  }
  async function startScanner() {
    const info = $('cameraInfo'); if (info) info.textContent='Kamera wird vorbereitet …';
    try {
      if (!await waitForScannerLibrary()) throw new Error('Scanner-Bibliothek nicht verfügbar.');
      scanner = new window.Html5Qrcode('qrReader');
      const rect = $('qrReader')?.getBoundingClientRect();
      const side = Math.max(130, Math.round(Math.min(rect?.width || 180, rect?.height || 180) * 0.86));
      await scanner.start({ facingMode:'environment' }, { fps: 8, qrbox: { width: side, height: side } }, txt => unlockByCode(txt));
      if (info) info.textContent='';
    } catch (e) { if (info) info.textContent='QR-Scanner nicht verfügbar.'; }
  }
  async function stopScanner() { try { if (scanner) await scanner.stop(); } catch (_) {} scanner = null; }
  function unlockByCode(raw) {
    const code = String(raw || '').trim().toUpperCase();
    const candidates = [...Object.values(SENSES)];
    const entry = candidates.find(s => s.code?.toUpperCase() === code || s.id.toUpperCase() === code.replace('SINNE-',''));
    if (!entry) { setScanMessage('Code nicht erkannt.', true); return; }
    const state = getState();
    if (state.activeBiome && Number.isInteger(activeBoardSlot(state))) {
      setScanMessage('Schließe zuerst das bereits geöffnete Biom ab.', true);
      return;
    }
    const nextSlot = nextSlotForBiome(entry.id, state);
    if (!Number.isInteger(nextSlot)) {
      setScanMessage('Dieses Biom ist bereits abgeschlossen.', true);
      return;
    }
    unlockSense(entry.id, nextSlot);
  }
  function unlockRandom() {

    const state = getState();
    const candidates = Object.keys(SENSES).filter(id => Number.isInteger(nextSlotForBiome(id, state)));
    if (!candidates.length) { setScanMessage('Es gibt kein freies Biom mehr.', true); return; }
    const pick = candidates[Math.floor(Math.random()*candidates.length)];
    unlockSense(pick, nextSlotForBiome(pick, state));
  }
  async function unlockSense(id, index) {
    await stopScanner();
    resetScanModalState();
    const state = getState();
    state.started = true;
    state.activeBiome = id;
    state.heroIndex = null;
    state.slots[index] = id;
    setState(state);
    renderBoard();
    playSound('levelunlocked');
    playSound('background', { loop:true, restart:false });
  }
  function showEncounter(id,index) {
    const isBoss = id === 'boss';
    const data = isBoss ? BOSS : SENSES[id];
    if (!data) return;
    const meta = { isBoss, slot:index, senseId:id };
    window.pendingLaunch = { url: pageUrl(isBoss ? `level.html?type=boss&slot=${index}` : `level.html?sense=${encodeURIComponent(id)}&slot=${index}`), meta };
    const modal = $('encounterModal'); applyStagePopup(modal, meta); modal?.classList.remove('test-placeholder-modal');
    $('launchLevelBtn').textContent = isBoss ? 'Finale starten' : 'Level starten';
    $('encounterBackBtn').textContent = 'Wegrennen';
    $('encounterImage').src=data.enemy; $('encounterImage').alt=data.enemyName; $('encounterKicker').textContent=isBoss ? 'Finale freigeschaltet' : 'Level freigeschaltet'; $('encounterTitle').textContent=data.enemyName; $('encounterSpeech').textContent=data.speech; show(modal);
  }

  function showPlaceholder(index) {
    const meta = { isBoss:false, slot:index, placeholder:true };
    const modal = $('encounterModal');
    applyStagePopup(modal, meta);
    modal?.classList.toggle('test-placeholder-modal', index === 1);

    if (index === 1) {
      const done = Boolean(getState().completed[index]);
      window.pendingLaunch = { placeholder:true, minigame:true, slot:index, meta };
      $('launchLevelBtn').textContent = done ? 'Spiel erneut starten' : 'Spiel starten';
      $('encounterBackBtn').textContent = done ? 'Zurück' : 'Überspringen';
      $('encounterImage').src = ASSETS.hero;
      $('encounterImage').alt = getHeroName();
      $('encounterKicker').textContent = done ? 'Level wiederholen' : '';
      $('encounterTitle').textContent = 'Test';
      $('encounterSpeech').textContent = done ? 'Du kannst das Minispiel erneut spielen.' : '';
      show(modal);
      return;
    }

    if (index === 3) {
      const done = Boolean(getState().completed[index]);
      window.pendingLaunch = { placeholder:true, minigame2:true, slot:index, meta };
      $('launchLevelBtn').textContent = done ? 'Memory erneut starten' : 'Spiel starten';
      $('encounterBackBtn').textContent = done ? 'Zurück' : 'Überspringen';
      $('encounterImage').src = assetUrl('assets/images/minigame2/auge.png');
      $('encounterImage').alt = 'Auge';
      $('encounterKicker').textContent = 'Sehsinn-Memory';
      $('encounterTitle').textContent = 'Augen auf!';
      $('encounterSpeech').textContent = done ? 'Du kannst das Sehsinn-Memory erneut spielen.' : 'Finde gleiche Symbole und springe über Blendkugeln. So trainierst du genaues Hinsehen, Formen erkennen und schnelle Reaktion auf sichtbare Warnsignale.';
      show(modal);
      return;
    }

    if (index === 5) {
      const done = Boolean(getState().completed[index]);
      window.pendingLaunch = { placeholder:true, minigame3:true, slot:index, meta };
      $('launchLevelBtn').textContent = done ? 'Duftrohre erneut starten' : 'Spiel starten';
      $('encounterBackBtn').textContent = done ? 'Zurück' : 'Überspringen';
      $('encounterImage').src = assetUrl('assets/images/minigame2/nase.png');
      $('encounterImage').alt = 'Nase';
      $('encounterKicker').textContent = 'Riechsinn-Rohrsystem';
      $('encounterTitle').textContent = 'Folge dem Duft!';
      $('encounterSpeech').textContent = done ? 'Du kannst das Rohr-Rätsel erneut spielen.' : 'Drehe die Rohrstücke so, dass der Geruch vom Ventil durch alle vier Luftreinigungsfilter bis zum oberen Endpunkt gelangt. Verbundene Rohre leuchten grün. Die vier Filter liegen auf B2, E2, B5 und E5.';
      show(modal);
      return;
    }


    if (index === 7) {
      const done = Boolean(getState().completed[index]);
      window.pendingLaunch = { placeholder:true, minigame4:true, slot:index, meta };
      $('launchLevelBtn').textContent = done ? 'Fühl-Kran erneut starten' : 'Spiel starten';
      $('encounterBackBtn').textContent = done ? 'Zurück' : 'Überspringen';
      $('encounterImage').src = ASSETS.hero;
      $('encounterImage').alt = getHeroName();
      $('encounterKicker').textContent = 'Tastsinn-Kran';
      $('encounterTitle').textContent = 'Weich oder spitz?';
      $('encounterSpeech').textContent = done ? 'Du kannst den Tastsinn-Kran erneut spielen.' : 'Steuere den Kran und sammle nur weiche Gegenstände. Spitze Dinge lösen Schmerz aus und kosten ein Herz.';
      show(modal);
      return;
    }

    if (index === 11) {
      window.pendingLaunch = { placeholder:true, slot:index, meta };
      $('launchLevelBtn').textContent = 'Platzhalter schaffen';
      $('encounterBackBtn').textContent = 'Wegrennen';
      $('encounterImage').src = ASSETS.winHero;
      $('encounterImage').alt = `${getHeroName()} auf dem Weg zur Krone`;
      $('encounterKicker').textContent = 'Kronenpfad';
      $('encounterTitle').textContent = 'Der Weg zur Krone';
      $('encounterSpeech').textContent = 'Hier kommt spaeter ein neues Minispiel hin. Fuer jetzt zaehlt dieser Platzhalter als geschafft und schaltet danach die Krone mit dem Roboter frei.';
      show(modal);
      return;
    }

    window.pendingLaunch = { placeholder:true, slot:index, meta };
    $('launchLevelBtn').textContent = index === 9 ? 'Hör-Level freischalten' : (index === LEVEL_COUNT - 1 ? 'Zum Finale' : 'Weiter');
    $('encounterBackBtn').textContent = 'Wegrennen';
    $('encounterImage').src = ASSETS.winHero;
    $('encounterImage').alt = `${getHeroName()} macht weiter`;
    $('encounterKicker').textContent = index === 9 ? 'Hör-Station' : 'Zwischenstation';
    $('encounterTitle').textContent = index === 9 ? 'Lausch genau hin!' : `Level ${index + 1}`;
    $('encounterSpeech').textContent = index === 9 ? 'Dieses Feld dient als Hör-Station. Nach dem Antippen wird das Fragen-Level im Wüstenland freigeschaltet.' : (index === LEVEL_COUNT - 1 ? 'Das Königreich ist gerettet. Weiter zum Abschluss!' : 'Kurze Rast geschafft. Weiter zum nächsten Feld!');
    show(modal);
  }

  function handleEncounterBack() {
    if (window.pendingLaunch?.minigame || window.pendingLaunch?.minigame2 || window.pendingLaunch?.minigame3 || window.pendingLaunch?.minigame4) {
      const slot = window.pendingLaunch.slot;
      if (getState().completed[slot]) { hide($('encounterModal')); return; }
      completePlaceholder(slot);
      return;
    }
    escapeToBoard(window.pendingLaunch?.meta);
  }

  function handleLaunchLevel() {
    if (!window.pendingLaunch) return;
    if (window.pendingLaunch.minigame) {
      hide($('encounterModal'));
      location.href = pageUrl(`minigame.html?slot=${window.pendingLaunch.slot}`);
      return;
    }
    if (window.pendingLaunch.minigame2) {
      hide($('encounterModal'));
      location.href = pageUrl(`minigame2.html?slot=${window.pendingLaunch.slot}`);
      return;
    }
    if (window.pendingLaunch.minigame3) {
      hide($('encounterModal'));
      location.href = pageUrl(`minigame3.html?slot=${window.pendingLaunch.slot}`);
      return;
    }
    if (window.pendingLaunch.minigame4) {
      hide($('encounterModal'));
      location.href = pageUrl(`minigame4.html?slot=${window.pendingLaunch.slot}`);
      return;
    }
    if (window.pendingLaunch.placeholder) { completePlaceholder(window.pendingLaunch.slot); return; }
    location.href = window.pendingLaunch.url;
  }

  async function completePlaceholder(index) {
    hide($('encounterModal'));
    completeMinigameSlot(index);
    applyReturnModal();
  }

  function completeMinigameSlot(index) {
    const state = getState();
    const senseId = state.slots[index] || slotSenseId(index);
    state.started = true;
    state.completed[index] = true;
    state.heroIndex = index;
    state.slots[index] = senseId;
    const nextSlot = nextSlotForBiome(senseId, state);
    if (Number.isInteger(nextSlot)) {
      state.activeBiome = senseId;
      state.slots[nextSlot] = senseId;
    } else {
      state.activeBiome = null;
    }
    setState(state);
    playSound('levelunlocked');
    localStorage.setItem(RETURN_STORE, JSON.stringify({ type:'unlocked', meta:{ slot:index, placeholder:true, senseId, returnHome:false } }));
  }
  function escapeToBoard(meta) {
    closeScan(); hide($('encounterModal'));
    localStorage.setItem(RETURN_STORE, JSON.stringify({ type:'escape', meta })); applyReturnModal();
  }
  function showOutro() {
    stopSound('background');
    document.body.classList.remove('board-ui-active');
    removeBoardViewportBars();
    hide($('introScreen'));
    hide($('boardScreen'));
    hide($('belowBoard'));
    hide($('openBoardMenuBtn'));
    show($('outroScreen'));
    playSound('levelunlocked');
  }

  async function animateBoardUnlockPath(fromSlot) {
    if (!Number.isInteger(fromSlot)) return;
    const toSlot = fromSlot + 1;
    if (toSlot >= LEVEL_COUNT) return;
    const state = getState();
    if (state.revealedMax >= toSlot) return;
    pendingUnlockAnimation = { from: fromSlot, to: toSlot };
    renderBoard();
    await sleep(1450);
    const latest = getState();
    latest.revealedMax = Math.max(latest.revealedMax, toSlot);
    setState(latest);
    pendingUnlockAnimation = null;
    renderBoard();
  }

  let pendingHomeFromSlot = null;
  let pendingHomeViaSlot = null;

  async function animateHeroStep(fromIndex, toIndex) {
    const hero = $('movingHero'); if (!hero) return;
    setHeroAt(fromIndex, true);
    await sleep(80);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      hero.style.transition = 'left 1.45s cubic-bezier(.22,1,.36,1), top 1.45s cubic-bezier(.22,1,.36,1), opacity .25s ease';
      setHeroAt(toIndex, false);
      playSound('levelstart');
    }));
    await sleep(1500);
  }

  async function animateHeroHome(fromSlot, viaSlot = null) {
    const state = getState();
    state.heroIndex = fromSlot;
    setState(state);
    renderBoard();
    if (Number.isInteger(viaSlot) && viaSlot !== fromSlot) {
      await animateHeroStep(fromSlot, viaSlot);
      const mid = getState();
      mid.heroIndex = viaSlot;
      setState(mid);
      renderBoard();
      fromSlot = viaSlot;
    }
    await animateHeroStep(fromSlot, null);
    const latest = getState();
    latest.heroIndex = null;
    setState(latest);
    renderBoard();
  }

  async function handleLevelUnlockedContinue() {
    hide($('levelUnlockedModal'));
    playSound('background', { loop:true, restart:true });
    pendingUnlockedFromSlot = null;
    pendingHomeFromSlot = null;
    pendingHomeViaSlot = null;
    renderBoard();
  }

  function applyReturnModal() {
    const raw = localStorage.getItem(RETURN_STORE); if (!raw) return; localStorage.removeItem(RETURN_STORE);
    let data; try { data=JSON.parse(raw); } catch (_) { return; }
    const modal = $('levelUnlockedModal'); if (!modal) return;
    applyStagePopup(modal, data.meta);
    const img = modal.querySelector('img'); const title=$('levelUnlockedTitle'); const kicker=$('levelUnlockedKicker'); const text=$('levelUnlockedText');
    stopSound('background');
    pendingUnlockedFromSlot = null;
    pendingHomeFromSlot = null;
    pendingHomeViaSlot = null;
    if (data.type === 'escape') {
      img.src=ASSETS.escapeHero; kicker.textContent=''; title.textContent='Du bist entkommen.'; text.textContent='Du bist zurück auf dem Spielbrett. Tippe auf die Startinsel, um im Dorf einen neuen Steckbrief zu scannen.';
    }
    else if (data?.meta?.foundKey) {
      img.src = data.meta.foundKey.image;
      kicker.textContent = 'Belohnung';
      title.textContent = `${data.meta.foundKey.label}-Schlüssel gefunden`;
      text.textContent = 'Der Schlüssel schwebt nun vor der Insel. Scanne im Dorf auf der Startinsel den nächsten Steckbrief.';
      playSound('levelunlocked');
    }
    else {
      const senseId = data?.meta?.senseId || slotSenseId(Number(data?.meta?.slot));
      const nextSlot = nextSlotForBiome(senseId, getState());
      img.src=ASSETS.winHero;
      kicker.textContent='Erfolg';
      if (senseId === 'boss' && Number.isInteger(nextSlot)) {
        title.textContent = 'Krone freigeschaltet';
        text.textContent = 'Der Weg zur Kronenplattform ist frei. Tippe auf die Krone, um den Roboter zu bekaempfen.';
      } else if (Number.isInteger(nextSlot)) {
        title.textContent = 'Fragen-Level sichtbar';
        text.textContent = 'Das Quiz ist nun auf der Insel freigeschaltet. Tippe die Insel erneut an, um die Biom-Seite mit Minispiel und Quiz zu öffnen.';
      } else if (senseId !== 'boss' && finalBridgeUnlocked(getState())) {
        title.textContent = 'Finale Insel freigeschaltet';
        text.textContent = 'Alle fünf Inseln sind abgeschlossen. Die finale Insel wurde automatisch freigeschaltet. Blättere nach rechts bis zur finalen Insel.';
      } else {
        title.textContent = 'Zurück ins Dorf';
        text.textContent = 'Scanne im Dorf auf der Startinsel einen neuen Steckbrief, um die nächste Insel freizuschalten. Tippe dazu auf die Startinsel.';
      }
      playSound('levelunlocked');
    }
    show(modal);
    renderBoard();
  }

  function initLevel() {
    addSpeaker();
    const isBoss = qs('type') === 'boss'; const slot = Number(qs('slot')); const senseId = isBoss ? 'boss' : qs('sense'); const state=getState();
    if (!Number.isInteger(slot) || slot < 0 || slot >= LEVEL_COUNT) { location.replace(pageUrl('index.html')); return; }
    if (isBoss) {
      if (state.slots[slot] !== 'boss') {
        state.slots[slot] = 'boss';
        state.heroIndex = slot;
        setState(state);
      }
    } else if (!SENSES[senseId]) {
      location.replace(pageUrl('index.html'));
      return;
    } else if (state.slots[slot] !== senseId) {
      state.slots[slot] = senseId;
      state.heroIndex = slot;
      setState(state);
    }
    const data = isBoss ? BOSS : SENSES[senseId]; const meta = { isBoss, slot, senseId };
    document.body.style.setProperty('--stage-bg', `url("${bgForMeta(meta)}")`);
    $('levelBadge').textContent = `Level ${slot+1}`;
    const enemy = $('levelEnemy'); if (enemy) { enemy.src=data.enemy; enemy.alt=data.enemyName; }
    const content = $('levelContent'); if (content) content.innerHTML = `<p>${esc(data.intro)}</p>` + data.content.map(p=>`<p>${esc(p)}</p>`).join('');
    const questions = getQuestionsForId(senseId);
    const opts = $('quizOptions'); if (opts) opts.innerHTML = questions.map((q,qi)=>`<article class="quiz-question-card"><h3>Frage ${qi+1}: ${esc(q.q)}</h3>${q.a.map((a,ai)=>`<label class="quiz-option"><input type="radio" name="quizAnswer_${qi}" value="${ai}"><span>${esc(a)}</span></label>`).join('')}</article>`).join('');
    preloadBattleAssets(data, meta);
    prefetchPage(pageUrl('battle.html'));
    $('checkAnswerBtn')?.addEventListener('click', () => startBattleFromLevel(data, meta, questions));
    $('runAwayBtn')?.addEventListener('click', () => { localStorage.setItem(RETURN_STORE, JSON.stringify({ type:'escape', meta })); location.href = pageUrl('index.html'); });
  }
  function startBattleFromLevel(data, meta, questions) {
    const selected = questions.map((_,qi)=>document.querySelector(`input[name="quizAnswer_${qi}"]:checked`));
    if (selected.some(x=>!x)) { const f=$('quizFeedback'); f.textContent='Bitte beantworte zuerst alle fünf Fragen.'; f.className='message bad'; return; }
    const answers = selected.map(x=>Number(x.value)); const results = answers.map((a,i)=>a===questions[i].correct);
    const payload = { senseId: data.id, meta, answers, results, time:Date.now() };
    const serialized = JSON.stringify(payload);
    sessionStorage.setItem(BATTLE_STORE, serialized);
    localStorage.setItem(BATTLE_BACKUP_STORE, serialized);
    showTransition('Kampf wird geladen …');
    setTimeout(() => location.assign(pageUrl('battle.html')), 420);
  }
  function showTransition(text) {
    let overlay = document.createElement('div'); overlay.className='page-transition-overlay'; overlay.innerHTML=`<div>${esc(text)}</div>`; document.body.appendChild(overlay); requestAnimationFrame(()=>overlay.classList.add('active'));
  }

  function initBattle() {
    addSpeaker();
    stopSound('background');
    stopAllBattleAudio();

    let payload;
    try { payload = JSON.parse(sessionStorage.getItem(BATTLE_STORE) || localStorage.getItem(BATTLE_BACKUP_STORE) || ''); } catch (_) {}
    if (!payload || !payload.meta) { location.replace(pageUrl('index.html')); return; }

    const meta = payload.meta;
    const data = dataForMeta(meta);
    if (!data) { location.replace(pageUrl('index.html')); return; }

    const els = battleElements();
    document.body.style.setProperty('--battle-bg', `url("${bgForMeta(meta)}")`);
    if (els.kampfTitle) els.kampfTitle.src = ASSETS.text.kampf;
    if (els.introHero) {
      els.introHero.src = ASSETS.hero;
      els.introHero.alt = getHeroName();
      const heroNameNode = els.introHero.closest('.battle-v84-intro-side')?.querySelector('.battle-v84-name');
      if (heroNameNode) heroNameNode.textContent = getHeroName();
    }
    if (els.introEnemy) { els.introEnemy.src = data.enemy; els.introEnemy.alt = data.enemyName; }
    if (els.introEnemyName) els.introEnemyName.textContent = data.enemyName;
    if (els.preloadStatus) els.preloadStatus.textContent = 'Kampf wird vorbereitet ...';

    const prepared = prepareBattle(data, payload).then(rounds => {
      if (els.preloadStatus) els.preloadStatus.textContent = 'Alles bereit.';
      return rounds;
    });

    els.back?.addEventListener('click', () => history.back());
    let battleStarting = false;
    els.start?.addEventListener('click', async () => {
      if (battleStarting) return;
      battleStarting = true;
      els.start.disabled = true;
      stopAllBattleAudio();
      const audioReady = startBattleAudioFromButton();
      setBattleMode('loading');
      try {
        const rounds = await prepared;
        await Promise.race([audioReady, sleep(700)]);
        await sleep(180);
        await runBattleSequence(payload, data, meta, rounds);
      } catch (err) {
        console.error('Battle konnte nicht gestartet werden:', err);
        battleStarting = false;
        els.start.disabled = false;
        setBattleMode('intro');
        if (els.preloadStatus) els.preloadStatus.textContent = 'Bitte noch einmal starten.';
      }
    });
  }

  function battleElements() {
    return {
      intro: $('battleIntroScene'),
      loading: $('battleLoadingScene'),
      sequence: $('battleSequenceScene'),
      start: $('battleStartBtn'),
      back: $('battleBackBtn'),
      preloadStatus: $('battlePreloadStatus'),
      kampfTitle: $('battleKampfText'),
      introHero: $('battleHero'),
      introEnemy: $('battleEnemy'),
      introEnemyName: $('battleEnemyName'),
      dots: $('sequenceDots'),
      label: $('sequenceLabel'),
      status: $('sequenceStatus'),
      roundText: $('sequenceTextImage'),
      roundActor: $('sequenceImage'),
      finalHint: $('finalHint'),
      finalCloud: $('finalCloudImage'),
      resultStage: $('finalResultStage'),
      resultText: $('resultTextImage'),
      outcomeGroup: $('outcomeGroup'),
      victoryHero: $('victoryHeroImage'),
      outcome: $('outcomeImage'),
      action: $('battleAction')
    };
  }

  function setBattleMode(mode) {
    document.body.dataset.battleMode = mode;
    const els = battleElements();
    hide(els.intro);
    hide(els.loading);
    hide(els.sequence);
    if (mode === 'intro') show(els.intro);
    if (mode === 'loading') show(els.loading);
    if (mode === 'sequence') show(els.sequence);
  }

  function showFinalHint(text = 'Tippe auf die Wolke') {
    const n = $('finalHint');
    if (!n) return;
    n.textContent = text;
    show(n);
  }
  function hideFinalHint() { hide($('finalHint')); }
  function waitForRenderable(node) {
    if (!node) return Promise.resolve();
    return new Promise(resolve => {
      let settled = false;
      const done = () => requestAnimationFrame(() => requestAnimationFrame(resolve));
      const finish = () => {
        if (settled) return;
        settled = true;
        try { node.onload = null; node.onerror = null; } catch (_) {}
        done();
      };
      if (node.complete && node.naturalWidth > 0) { done(); return; }
      node.onload = finish;
      node.onerror = finish;
      window.setTimeout(finish, 1400);
    });
  }
  function loadImageAsset(src) {
    return new Promise(resolve => {
      if (!src) { resolve(); return; }
      const img = new Image();
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        img.onload = null;
        img.onerror = null;
        resolve();
      };
      img.decoding = 'async';
      img.onload = finish;
      img.onerror = finish;
      img.src = src;
      if (img.complete) finish();
      window.setTimeout(finish, 1600);
    });
  }

  function buildBattleRounds(results = []) {
    const cursor = { richtig:0, falsch:0 };
    return results.slice(0, 5).map((ok, index) => {
      const type = ok ? 'richtig' : 'falsch';
      const number = (cursor[type]++ % 3) + 1;
      const list = ok ? ASSETS.correct : ASSETS.wrong;
      return {
        index,
        ok,
        type,
        number,
        actorSrc: list[number - 1],
        textSrc: ok ? ASSETS.text.richtig : ASSETS.text.falsch,
        soundKey: `${type}_${number}`,
        alt: ok ? `Treffer ${number}` : `Autsch ${number}`
      };
    });
  }

  function prepareBattle(data, payload) {
    const rounds = buildBattleRounds(payload.results);
    const imageAssets = [
      ASSETS.text.kampf,
      ASSETS.hero,
      ASSETS.triumphHero,
      ASSETS.loseHero,
      ASSETS.final,
      ASSETS.text.gewonnen,
      ASSETS.text.verloren,
      data.enemy,
      data.defeated,
      ...rounds.flatMap(round => [round.actorSrc, round.textSrc])
    ];
    return Promise.all(imageAssets.map(loadImageAsset)).then(() => rounds);
  }

  async function runBattleSequence(payload, data, meta, rounds) {
    const els = battleElements();
    resetBattleStage(els);
    setBattleMode('sequence');
    if (els.sequence) {
      els.sequence.classList.remove('hidden');
      els.sequence.style.opacity = '1';
      els.sequence.style.transform = 'none';
    }

    const totalSteps = rounds.length + 1;
    if (els.dots) els.dots.innerHTML = '<span></span>'.repeat(totalSteps);
    await sleep(340);
    for (const round of rounds) await playBattleRound(els, round, totalSteps);

    const wrong = payload.results.filter(v => !v).length;
    const won = wrong <= 1;
    await playBattleFinal(els, won, data, meta, totalSteps);
  }

  function resetBattleStage(els) {
    hideFinalHint();
    hide(els.action);
    if (els.action) els.action.innerHTML = '';
    if (els.label) els.label.textContent = '';
    if (els.status) els.status.textContent = '';
    if (els.roundText) { els.roundText.className = 'battle-v84-hit-text hidden'; els.roundText.removeAttribute('src'); }
    if (els.roundActor) { els.roundActor.className = 'battle-v84-answer-actor hidden'; els.roundActor.removeAttribute('src'); }
    if (els.finalCloud) { els.finalCloud.className = 'battle-v84-final-cloud hidden'; els.finalCloud.removeAttribute('src'); els.finalCloud.onclick = null; }
    if (els.resultStage) els.resultStage.className = 'battle-v84-result-stage hidden';
    if (els.resultText) { els.resultText.removeAttribute('src'); els.resultText.alt = ''; }
    if (els.victoryHero) { els.victoryHero.className = 'battle-v84-victory-hero hidden'; els.victoryHero.removeAttribute('src'); }
    if (els.outcome) { els.outcome.removeAttribute('src'); els.outcome.alt = ''; }
  }

  async function playBattleRound(els, round, totalSteps) {
    if (els.label) els.label.textContent = `Frage ${round.index + 1}`;
    if (els.status) els.status.textContent = round.ok ? 'Treffer' : 'Autsch';
    setBattleDot(els.dots, round.index);

    els.roundText.src = round.textSrc;
    els.roundText.alt = round.ok ? 'Treffer' : 'Autsch';
    els.roundActor.src = round.actorSrc;
    els.roundActor.alt = round.alt;
    els.roundText.className = 'battle-v84-hit-text is-preparing';
    els.roundActor.className = 'battle-v84-answer-actor is-preparing';
    await Promise.all([waitForRenderable(els.roundText), waitForRenderable(els.roundActor)]);

    els.roundText.getAnimations?.().forEach(animation => animation.cancel());
    els.roundActor.getAnimations?.().forEach(animation => animation.cancel());
    void els.roundText.offsetWidth;
    void els.roundActor.offsetWidth;
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    els.roundText.className = 'battle-v84-hit-text is-in';
    els.roundActor.className = 'battle-v84-answer-actor is-in';
    void els.roundText.offsetWidth;
    void els.roundActor.offsetWidth;
    await new Promise(resolve => requestAnimationFrame(resolve));
    void playBattleCue(round.soundKey);
    await sleep(2150);
    els.roundText.className = 'battle-v84-hit-text hidden';
    els.roundActor.className = 'battle-v84-answer-actor hidden';
    if (totalSteps) setBattleDot(els.dots, round.index);
  }

  function setBattleDot(dots, activeIndex) {
    if (!dots) return;
    [...dots.children].forEach((dot, index) => {
      dot.className = index === activeIndex ? 'active' : '';
    });
  }

  async function playBattleFinal(els, won, data, meta, totalSteps) {
    setBattleDot(els.dots, totalSteps - 1);
    if (els.label) els.label.textContent = 'Finale';
    if (els.status) els.status.textContent = '';

    els.finalCloud.src = ASSETS.final;
    els.finalCloud.alt = 'Finale Wolke';
    els.finalCloud.className = 'battle-v84-final-cloud is-preparing';
    await waitForRenderable(els.finalCloud);
    void els.finalCloud.offsetWidth;
    els.finalCloud.className = 'battle-v84-final-cloud is-idle is-pulsing';
    startFinalCloudPulse(els.finalCloud);
    showFinalHint('Tippe auf die Wolke');
    void playBattleCue('final', { stopSame:true });

    await new Promise(resolve => {
      const finish = () => {
        els.finalCloud.onclick = null;
        els.finalHint.onclick = null;
        resolve();
      };
      els.finalCloud.onclick = finish;
      els.finalHint.onclick = finish;
    });

    hideFinalHint();
    stopSound('final');
    stopSound('battle_background');
    stopFinalCloudPulse(els.finalCloud);
    configureBattleResult(els, won, data);
    show(els.resultStage);
    void els.resultStage?.offsetWidth;
    els.finalCloud.className = 'battle-v84-final-cloud is-reveal';
    await sleep(560);
    els.resultStage.classList.add('is-visible', won ? 'is-win' : 'is-loss');
    void playBattleCue(won ? 'win' : 'lose', { stopSame:true });
    await sleep(1120);
    els.finalCloud.className = 'battle-v84-final-cloud hidden';
    renderBattleActions(won, meta, els.action);
  }

  function configureBattleResult(els, won, data) {
    els.resultText.src = won ? ASSETS.text.gewonnen : ASSETS.text.verloren;
    els.resultText.alt = won ? 'Gewonnen' : 'Verloren';
    els.outcome.src = won ? data.defeated : ASSETS.loseHero;
    els.outcome.alt = won ? `${data.enemyName} besiegt` : `${getHeroName()} besiegt`;
    if (els.outcomeGroup) els.outcomeGroup.className = `battle-v84-outcome-group ${won ? 'is-win' : 'is-loss'}`;
    if (won) {
      els.victoryHero.src = ASSETS.triumphHero;
      els.victoryHero.alt = `${getHeroName()} triumphiert`;
      els.victoryHero.className = 'battle-v84-victory-hero';
    } else {
      els.victoryHero.className = 'battle-v84-victory-hero hidden';
      els.victoryHero.removeAttribute('src');
    }
  }

  function renderBattleActions(won, meta, action) {
    if (!action) return;
    action.innerHTML = '';
    show(action);
    if (won) {
      const btn = document.createElement('button');
      btn.className = 'game-btn primary';
      btn.type = 'button';
      btn.textContent = 'Weiter';
      btn.onclick = () => finishBattleWin(meta);
      action.appendChild(btn);
    } else {
      const retry = document.createElement('button');
      retry.className = 'game-btn primary';
      retry.type = 'button';
      retry.textContent = 'Neuer Versuch';
      retry.onclick = () => location.href = pageUrl(meta.isBoss ? `level.html?type=boss&slot=${meta.slot}` : `level.html?sense=${encodeURIComponent(meta.senseId)}&slot=${meta.slot}`);
      const run = document.createElement('button');
      run.className = 'game-btn muted';
      run.type = 'button';
      run.textContent = 'Wegrennen';
      run.onclick = () => {
        localStorage.setItem(RETURN_STORE, JSON.stringify({ type:'escape', meta }));
        location.href = pageUrl('index.html');
      };
      action.append(retry, run);
    }
  }
  function finishBattleWin(meta) {
    const state = getState();
    let foundKey = null;
    if (meta.isBoss) {
      state.bossCompleted = true;
      state.completed[meta.slot] = true;
      state.heroIndex = meta.slot;
      state.activeBiome = null;
    } else {
      state.completed[meta.slot] = true;
      state.heroIndex = meta.slot;
      const senseId = meta.senseId || slotSenseId(meta.slot);
      const nextSlot = nextSlotForBiome(senseId, state);
      state.activeBiome = Number.isInteger(nextSlot) ? senseId : null;
      if (biomeIsComplete(senseId, state) && KEY_ORDER.includes(senseId) && !state.keysFound[senseId]) {
        state.keysFound[senseId] = true;
        foundKey = keyInfoForSenseId(senseId);
      }
    }
    setState(state); sessionStorage.removeItem(BATTLE_STORE); localStorage.removeItem(BATTLE_BACKUP_STORE);
    const senseId = meta.senseId || slotSenseId(meta.slot);
    const shouldReturn = !meta.isBoss && !Number.isInteger(nextSlotForBiome(senseId, state));
    localStorage.setItem(RETURN_STORE, JSON.stringify({ type:'unlocked', meta: { ...meta, foundKey, returnHome:shouldReturn, returnVia:null } }));
    location.href = pageUrl('index.html');
  }







  function initMiniGame() {
    addSpeaker();
    stopSound('background');
    stopSound('battle_background');
    playSound('minigame_background', { loop:true, restart:true });

    const hero = $('miniHero');
    const stage = document.querySelector('.mini-game-stage');
    const controls = document.querySelector('.mini-controls');
    const leftBtn = $('miniLeftBtn');
    const rightBtn = $('miniRightBtn');
    const jumpBtn = $('miniJumpBtn');
    const settingsBtn = $('miniSettingsBtn');
    const menu = $('miniMenu');
    const closeMenu = $('miniCloseMenuBtn');
    const boardBtn = $('miniBackBoardBtn');
    const resultModal = $('miniResult');
    const resultTitle = $('miniResultTitle');
    const resultText = $('miniResultText');
    const resultImage = $('miniResultImage');
    const retryBtn = $('miniRetryBtn');
    const resultBoardBtn = $('miniResultBoardBtn');
    const hud = $('miniHud');
    if (!hero || !stage) return;
    hero.alt = getHeroName();

    const heroClone = hero.cloneNode(false);
    heroClone.id = 'miniHeroClone';
    heroClone.className = `${hero.className} mini-hero-clone`;
    heroClone.alt = '';
    heroClone.setAttribute('aria-hidden', 'true');
    heroClone.style.visibility = 'hidden';
    heroClone.style.opacity = '1';
    hero.after(heroClone);

    const miniMeta = { slot: Number(qs('slot')) || 0, isBoss:false };
    stage.style.setProperty('--mini-stage-bg', `url("${bgForMeta(miniMeta)}")`);

    const SPRITES = {
      walkRight1: assetUrl('assets/images/minigame/mini_walk_right_1.png'),
      walkRight2: assetUrl('assets/images/minigame/mini_walk_right_2.png'),
      walkLeft1: assetUrl('assets/images/minigame/mini_walk_left_1.png'),
      walkLeft2: assetUrl('assets/images/minigame/mini_walk_left_2.png'),
      jumpRight: assetUrl('assets/images/minigame/mini_jump_right.png'),
      fallRight: assetUrl('assets/images/minigame/mini_fall_right.png'),
      jumpLeft: assetUrl('assets/images/minigame/mini_jump_left.png'),
      fallLeft: assetUrl('assets/images/minigame/mini_fall_left.png'),
      hot: assetUrl('assets/images/minigame/mini_hot.png'),
      badFood: assetUrl('assets/images/minigame/mini_bad_food.png'),
      heartFull: assetUrl('assets/images/minigame/mini_heart_full.png'),
      heartBroken: assetUrl('assets/images/minigame/mini_heart_broken.png')
    };
    const GOOD_FOOD = [
      assetUrl('assets/images/minigame/good_1.png'),
      assetUrl('assets/images/minigame/good_2.png'),
      assetUrl('assets/images/minigame/good_3.png'),
      assetUrl('assets/images/minigame/good_4.png')
    ];
    const BAD_FOOD = {
      chili: assetUrl('assets/images/minigame/bad_1.png'),
      fish: assetUrl('assets/images/minigame/bad_2.png')
    };

    function preloadImage(src) {
      return new Promise(resolve => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = img.onerror = () => resolve(img);
        img.src = src;
        if (img.decode) img.decode().then(() => resolve(img)).catch(() => {});
      });
    }
    const spriteReady = Promise.all([
      ...Object.values(SPRITES),
      ...GOOD_FOOD,
      ...Object.values(BAD_FOOD),
      ASSETS.text.gewonnen,
      ASSETS.text.verloren
    ].map(preloadImage));

    const jumpAudios = Array.from({ length: 3 }, () => {
      const a = new Audio(assetUrl('assets/audio/jump_sound.mp3'));
      a.preload = 'auto';
      a.volume = 0.74;
      try { a.load(); } catch (_) {}
      return a;
    });
    let jumpAudioIndex = 0;
    function makeMiniSoundPool(key, count = 3) {
      return Array.from({ length: count }, () => {
        const a = new Audio(AUDIO_FILES[key]);
        a.preload = 'auto';
        a.volume = audioVolumeForKey(key);
        try { a.load(); } catch (_) {}
        return a;
      });
    }
    const miniSfxPools = {
      collect: makeMiniSoundPool('collect', 4),
      hurt: makeMiniSoundPool('hurt', 2),
      glass_break: makeMiniSoundPool('glass_break', 2)
    };
    const miniSfxCursor = { collect:0, hurt:0, glass_break:0 };
    function playMiniSfx(key, delayMs = 0) {
      const pool = miniSfxPools[key];
      if (!pool || !pool.length || muted) return;
      const run = () => {
        const a = pool[miniSfxCursor[key]++ % pool.length];
        try {
          a.pause();
          a.currentTime = 0;
          a.play().catch(() => {});
        } catch (_) {}
      };
      if (delayMs > 0) window.setTimeout(run, delayMs);
      else run();
    }
    try {
      ['collect','hurt','glass_break','minigame_background'].forEach(key => getAudio(key)?.load?.());
    } catch (_) {}

    const TARGET_GOOD = 10;
    const MAX_HEARTS = 3;
    const MAX_GOOD_ACTIVE = 1;
    const MAX_BAD_ACTIVE = 4;
    const FOOD_POOL_SIZE = MAX_GOOD_ACTIVE + MAX_BAD_ACTIVE + 6;
    const FOOD_BASE_SIZE = 62;
    const GOOD_SPAWN_MS = 5000;
    const BAD_SPAWN_START_MS = 950;
    const BAD_SPAWN_END_MS = 720;
    const HURT_FREEZE_MS = 500;
    const INVULNERABLE_MS = 3000;

    let stageW = 1, stageH = 1, heroW = 150, heroH = 166;
    let heroX = 0;
    let heroRatio = 0.5;
    let direction = 1;
    let pressedLeft = false;
    let pressedRight = false;
    let velocity = 0;
    let jumping = false;
    let jumpY = 0;
    let jumpVelocity = 0;
    let last = performance.now();
    let lastSprite = '';
    let foodItems = [];
    let activeGood = 0;
    let activeBad = 0;
    let collectedGood = 0;
    let badCycle = 0;
    let hudUpdateTimer = 0;
    let gameOver = false;
    let gameWon = false;
    let lastGoodSpawn = performance.now() + 650;
    let lastBadSpawn = performance.now() + 1500;
    let lives = MAX_HEARTS;
    let hurtFreezeUntil = 0;
    let invulnerableUntil = 0;
    let blinkUntil = 0;
    let hurtSprite = '';
    let pendingGameOver = false;
    let rafId = null;
    let loopActive = false;

    let heartsWrap = $('miniLives');
    if (!heartsWrap) {
      heartsWrap = document.createElement('div');
      heartsWrap.id = 'miniLives';
      heartsWrap.className = 'mini-hearts';
      heartsWrap.setAttribute('role', 'status');
      heartsWrap.setAttribute('aria-live', 'polite');
      stage.appendChild(heartsWrap);
    }
    heartsWrap.innerHTML = '';
    const heartNodes = Array.from({ length: MAX_HEARTS }, (_, index) => {
      const img = document.createElement('img');
      img.className = 'mini-heart';
      img.alt = index === 0 ? 'Lebensanzeige' : '';
      if (index > 0) img.setAttribute('aria-hidden', 'true');
      heartsWrap.appendChild(img);
      return img;
    });

    foodItems = Array.from({ length: FOOD_POOL_SIZE }, (_, index) => {
      const node = document.createElement('img');
      node.className = 'mini-food pooled';
      node.alt = '';
      node.setAttribute('aria-hidden', 'true');
      node.dataset.poolIndex = String(index);
      node.style.width = `${FOOD_BASE_SIZE}px`;
      node.style.height = `${FOOD_BASE_SIZE}px`;
      node.style.visibility = 'hidden';
      node.style.opacity = '0';
      node.style.transform = 'translate3d(-9999px,-9999px,0) scale(1)';
      stage.appendChild(node);
      return { node, active:false, kind:'', x:0, y:0, size:0, scale:1, scaleStr:'1.000', speed:0 };
    });

    const heroName = esc(getHeroName());
    const tutorial = document.createElement('div');
    tutorial.className = 'mini-tutorial-modal stage-popup hidden';
    tutorial.setAttribute('role', 'dialog');
    tutorial.setAttribute('aria-modal', 'true');
    tutorial.setAttribute('aria-labelledby', 'miniTutorialTitle');
    tutorial.innerHTML = `
      <div class="mini-tutorial-card">
        <p class="mini-tutorial-kicker">Geschmackssinn</p>
        <h2 id="miniTutorialTitle">Bereite ${heroName} auf den Weg vor</h2>
        <p>Bewege ${heroName} nur nach <strong>links</strong> und <strong>rechts</strong>. Sammle <strong>10 lecker schmeckende Obststücke</strong>. Etwa alle fünf Sekunden kommt ein zufälliges Obstteil herunter – dazwischen fallen vor allem <strong>scharfe Chilischoten</strong> und <strong>verdorbener Fisch</strong>, denen du ausweichen musst.</p>
        <p>Der Geschmackssinn hilft uns, Speisen zu unterscheiden: süßes oder frisches Essen kann angenehm schmecken, sehr scharfe oder verdorbene Dinge warnen den Körper. In diesem Minispiel trainierst du genau diese Entscheidung: gutes Essen sammeln, gefährliche Reize vermeiden.</p>
        <div class="mini-tutorial-actions">
          <button id="miniTutorialStartBtn" class="game-btn" type="button">Spiel starten</button>
          <button id="miniTutorialBackBtn" class="game-btn muted" type="button">Zurück zum Spielfeld</button>
        </div>
      </div>`;
    stage.appendChild(tutorial);
    tutorial.style.setProperty('--popup-bg', `url("${popupBgForMeta(miniMeta)}")`);
    applyStagePopup(resultModal, miniMeta);
    applyStagePopup(menu, miniMeta);
    const tutorialStartBtn = tutorial.querySelector('#miniTutorialStartBtn');
    const tutorialBackBtn = tutorial.querySelector('#miniTutorialBackBtn');

    function localClamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
    function updateMetrics() {
      const prevRatio = Number.isFinite(heroRatio) ? heroRatio : 0.5;
      stageW = Math.max(1, stage.clientWidth || window.innerWidth || 1);
      stageH = Math.max(1, stage.clientHeight || window.innerHeight || 1);
      heroW = Math.max(1, hero.clientWidth || 150);
      heroH = Math.max(1, hero.clientHeight || 166);
      heroX = ((prevRatio * stageW) % stageW + stageW) % stageW;
      heroRatio = heroX / stageW;
      applyHero();
    }
    window.addEventListener('resize', updateMetrics, { passive:true });

    // Pre-computed scale strings to avoid toFixed() allocation every frame
    const SCALE_STRINGS = new Map();
    function scaleStr(s) {
      let v = SCALE_STRINGS.get(s);
      if (v === undefined) { v = s.toFixed(3); SCALE_STRINGS.set(s, v); }
      return v;
    }

    // Cached hero hitbox values (updated once per frame, not per food item)
    let hbLeft = 0, hbRight = 0, hbTop = 0, hbBottom = 0;
    let hb2Active = false, hb2Left = 0, hb2Right = 0, hb2Top = 0, hb2Bottom = 0;
    function updateHeroHitbox() {
      const bottom = stageH - 4 - jumpY;
      const top = bottom - heroH;
      hbLeft   = heroX - heroW * 0.22;
      hbRight  = heroX + heroW * 0.22;
      hbTop    = top   + heroH * 0.22;
      hbBottom = bottom - 6;
      hb2Active = false;
      if (hbLeft < 0) {
        hb2Active = true;
        hb2Left = hbLeft + stageW;
        hb2Right = hbRight + stageW;
        hb2Top = hbTop;
        hb2Bottom = hbBottom;
      } else if (hbRight > stageW) {
        hb2Active = true;
        hb2Left = hbLeft - stageW;
        hb2Right = hbRight - stageW;
        hb2Top = hbTop;
        hb2Bottom = hbBottom;
      }
    }

    // Last-applied hero opacity to avoid redundant style writes
    let lastHeroOpacity = '1';
    function setHeroOpacity(v) {
      if (lastHeroOpacity !== v) {
        hero.style.opacity = v;
        heroClone.style.opacity = v;
        lastHeroOpacity = v;
      }
    }

    function updateHud() {
      if (hud) hud.textContent = `Obst ${collectedGood} / ${TARGET_GOOD}`;
    }
    let hudDirty = false;
    function scheduleHudUpdate() {
      if (!hud) return;
      hudDirty = true;
    }
    function updateHearts() {
      heartNodes.forEach((node, index) => {
        const intact = index < lives;
        node.src = intact ? SPRITES.heartFull : SPRITES.heartBroken;
        node.classList.toggle('broken', !intact);
      });
      heartsWrap.setAttribute('aria-label', `Leben: ${lives} von ${MAX_HEARTS}`);
    }
    function currentVelocity() {
      if (pressedLeft && !pressedRight) return -1;
      if (pressedRight && !pressedLeft) return 1;
      return 0;
    }
    function recomputeVelocity() {
      velocity = currentVelocity();
      if (velocity !== 0) direction = velocity > 0 ? 1 : -1;
      hero.classList.toggle('walking', velocity !== 0 && !jumping && !gameOver && !gameWon && performance.now() >= hurtFreezeUntil);
    }
    function setSprite(src) {
      if (lastSprite === src) return;
      hero.src = src;
      heroClone.src = src;
      lastSprite = src;
    }
    function updateSprite(now) {
      if (now < hurtFreezeUntil) {
        setSprite(hurtSprite || SPRITES.badFood);
        hero.classList.remove('walking');
        return;
      }
      if (velocity < 0) setSprite((Math.floor(now / 230) % 2 === 0) ? SPRITES.walkLeft1 : SPRITES.walkLeft2);
      else if (velocity > 0) setSprite((Math.floor(now / 230) % 2 === 0) ? SPRITES.walkRight1 : SPRITES.walkRight2);
      else setSprite(direction < 0 ? SPRITES.walkLeft1 : SPRITES.walkRight1);
      hero.classList.toggle('walking', velocity !== 0 && !gameOver && !gameWon);
    }
    function updateBlink(now) {
      if (now >= blinkUntil || now < hurtFreezeUntil) {
        setHeroOpacity('1');
        return;
      }
      setHeroOpacity((Math.floor(now / 140) % 2 === 0) ? '0.32' : '1');
    }
    function applyHero() {
      const x = heroX - heroW / 2;
      const y = -jumpY;
      hero.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
      let cloneX = null;
      if (x < 0) cloneX = x + stageW;
      else if (x + heroW > stageW) cloneX = x - stageW;
      if (cloneX === null) {
        heroClone.style.visibility = 'hidden';
      } else {
        heroClone.style.visibility = 'visible';
        heroClone.style.transform = `translate3d(${Math.round(cloneX)}px, ${Math.round(y)}px, 0)`;
      }
    }
    function playJumpSound() {
      try {
        const a = jumpAudios[jumpAudioIndex++ % jumpAudios.length];
        a.pause();
        a.currentTime = 0;
        a.play().catch(() => {});
      } catch (_) {}
    }
    function jump() {
      // Dieses Minispiel wird nur mit Links/Rechts gesteuert.
    }
    function stopMovement() {
      pressedLeft = false;
      pressedRight = false;
      recomputeVelocity();
    }
    function blockDefault(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      return false;
    }
    function bindHold(btn, side) {
      if (!btn) return;
      const down = (ev) => {
        blockDefault(ev);
        if (gameOver || gameWon) return;
        ensureMiniMusic?.();
        btn.classList.add('pressed');
        if (side === 'left') pressedLeft = true;
        if (side === 'right') pressedRight = true;
        recomputeVelocity();
        try { btn.setPointerCapture?.(ev.pointerId); } catch (_) {}
      };
      const up = (ev) => {
        ev?.preventDefault?.();
        ev?.stopPropagation?.();
        btn.classList.remove('pressed');
        if (side === 'left') pressedLeft = false;
        if (side === 'right') pressedRight = false;
        recomputeVelocity();
      };
      btn.addEventListener('pointerdown', down, { passive:false });
      btn.addEventListener('pointerup', up, { passive:false });
      btn.addEventListener('pointercancel', up, { passive:false });
      btn.addEventListener('pointerleave', up, { passive:false });
      btn.addEventListener('lostpointercapture', up, { passive:false });
      btn.addEventListener('contextmenu', blockDefault);
      btn.addEventListener('selectstart', blockDefault);
      btn.addEventListener('dragstart', blockDefault);
    }

    bindHold(leftBtn, 'left');
    bindHold(rightBtn, 'right');
    if (jumpBtn) {
      jumpBtn.disabled = true;
      jumpBtn.hidden = true;
      jumpBtn.setAttribute('aria-hidden', 'true');
    }

    [controls, leftBtn, rightBtn].forEach(node => {
      if (!node) return;
      node.addEventListener('contextmenu', blockDefault);
      node.addEventListener('selectstart', blockDefault);
      node.addEventListener('dragstart', blockDefault);
      node.addEventListener('touchstart', ev => ev.preventDefault(), { passive:false });
    });

    window.addEventListener('blur', stopMovement);
    document.addEventListener('visibilitychange', () => {
      last = performance.now();
      if (document.hidden) stopMovement();
    });

    settingsBtn?.addEventListener('click', () => { stopMovement(); show(menu); });
    closeMenu?.addEventListener('click', () => hide(menu));
    boardBtn?.addEventListener('click', () => { stopMiniLoop(); stopSound('minigame_background'); location.href = pageUrl('index.html'); });
    resultBoardBtn?.addEventListener('click', () => { stopMiniLoop(); stopSound('minigame_background'); location.href = pageUrl('index.html'); });

    const ensureMiniMusic = () => playSound('minigame_background', { loop:true, restart:false });
    ['pointerdown','touchstart','keydown','click'].forEach(type => {
      document.addEventListener(type, ensureMiniMusic, { passive:true });
    });

    function startFoodGame() {
      hide(tutorial);
      ensureMiniMusic();
      loopActive = true;
      last = performance.now();
      lastGoodSpawn = last - GOOD_SPAWN_MS + 1200;
      lastBadSpawn = last - BAD_SPAWN_START_MS;
      requestMiniTick();
    }
    tutorialStartBtn?.addEventListener('click', startFoodGame);
    tutorialBackBtn?.addEventListener('click', () => {
      stopMiniLoop();
      stopSound('minigame_background');
      location.href = pageUrl('index.html');
    });

    function difficultyProgress() {
      return Math.min(1, collectedGood / TARGET_GOOD);
    }
    function currentBadSpawnMs() {
      const p = difficultyProgress();
      return BAD_SPAWN_START_MS - (BAD_SPAWN_START_MS - BAD_SPAWN_END_MS) * p;
    }
    function currentBadLimit() {
      const p = difficultyProgress();
      if (p < 0.45) return 3;
      return MAX_BAD_ACTIVE;
    }

    function createFood(kind) {
      const item = foodItems.find(obj => !obj.active);
      if (!item) return false;
      const isGood = kind === 'good';
      const src = isGood
        ? GOOD_FOOD[Math.floor(Math.random() * GOOD_FOOD.length)]
        : (kind === 'chili' ? BAD_FOOD.chili : BAD_FOOD.fish);
      const scale = isGood ? (0.82 + Math.random() * 0.18) : (0.92 + Math.random() * 0.16);
      const size = FOOD_BASE_SIZE * scale;
      const x = Math.round(size / 2 + Math.random() * Math.max(1, stageW - size * 1.5));
      const y = -size - 8;
      const p = difficultyProgress();
      const speed = isGood ? 138 + Math.random() * 42 : 150 + p * 25 + Math.random() * 45;
      item.active = true;
      item.kind = kind;
      item.x = x;
      item.y = y;
      item.size = size;
      item.scale = scale;
      item.scaleStr = scaleStr(scale);
      item.speed = speed;
      if (item.node.src !== src) item.node.src = src;
      item.node.className = `mini-food ${isGood ? 'good-food' : 'bad-food'} ${kind}`;
      item.node.style.visibility = 'visible';
      item.node.style.opacity = '1';
      item.node.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0) scale(${item.scaleStr})`;
      if (isGood) activeGood += 1;
      else activeBad += 1;
      return true;
    }
    function removeFood(item) {
      if (!item || !item.active) return;
      if (item.kind === 'good') activeGood = Math.max(0, activeGood - 1);
      else activeBad = Math.max(0, activeBad - 1);
      item.active = false;
      item.kind = '';
      item.x = 0;
      item.y = 0;
      item.size = 0;
      item.scale = 1;
      item.scaleStr = '1.000';
      item.speed = 0;
      item.node.style.opacity = '0';
      item.node.style.visibility = 'hidden';
      item.node.style.transform = 'translate3d(-9999px,-9999px,0) scale(1)';
    }
    function intersects(a, b) {
      return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
    }
    function foodHitbox(item) {
      return {
        left: item.x + item.size * 0.18,
        right: item.x + item.size * 0.82,
        top: item.y + item.size * 0.18,
        bottom: item.y + item.size * 0.82
      };
    }

    function stopMiniLoop() {
      loopActive = false;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }
    function requestMiniTick() {
      if (!loopActive) return;
      rafId = requestAnimationFrame(tick);
    }

    function showMiniResult(won) {
      stopMiniLoop();
      hudDirty = false;
      stopSound('minigame_background');
      if (resultImage) {
        resultImage.src = won ? ASSETS.text.gewonnen : ASSETS.text.verloren;
        resultImage.alt = won ? 'Gewonnen' : 'Verloren';
        show(resultImage);
      }
      if (won) {
        gameWon = true;
        stopMovement();
        if (resultTitle) resultTitle.textContent = 'Gewonnen';
        if (resultText) resultText.textContent = 'Du hast 10 gute Obststücke eingesammelt.';
        if (retryBtn) retryBtn.textContent = 'Zurück zum Spielfeld';
        if (resultBoardBtn) hide(resultBoardBtn);
        retryBtn.onclick = () => {
          const slot = Number(qs('slot'));
          if (Number.isInteger(slot) && slot >= 0) completeMinigameSlot(slot);
          location.href = pageUrl('index.html');
        };
      } else {
        gameOver = true;
        stopMovement();
        if (resultTitle) resultTitle.textContent = 'Verloren';
        if (resultText) resultText.textContent = 'Du hast alle Herzen verloren.';
        if (retryBtn) retryBtn.textContent = 'Neuer Versuch';
        if (resultBoardBtn) show(resultBoardBtn);
        retryBtn.onclick = () => { stopMiniLoop(); location.reload(); };
      }
      foodItems.forEach(removeFood);
      activeGood = 0;
      activeBad = 0;
      show(resultModal);
    }

    function damageHero(kind) {
      const now = performance.now();
      if (gameOver || gameWon || now < invulnerableUntil) return;
      lives = Math.max(0, lives - 1);
      playMiniSfx('hurt');
      playMiniSfx('glass_break');
      updateHearts();
      hurtSprite = kind === 'chili' ? SPRITES.hot : SPRITES.badFood;
      hurtFreezeUntil = now + HURT_FREEZE_MS;
      blinkUntil = hurtFreezeUntil + INVULNERABLE_MS;
      invulnerableUntil = blinkUntil;
      hero.classList.remove('walking');
      if (lives <= 0) pendingGameOver = true;
    }

    function updateFood(dt, now) {
      if (!gameOver && !gameWon && activeGood < MAX_GOOD_ACTIVE && now - lastGoodSpawn >= GOOD_SPAWN_MS) {
        createFood('good');
        lastGoodSpawn = now;
      }
      if (!gameOver && !gameWon && activeBad < currentBadLimit() && now - lastBadSpawn >= currentBadSpawnMs()) {
        createFood((badCycle++ % 2 === 0) ? 'chili' : 'fish');
        lastBadSpawn = now;
      }
      updateHeroHitbox();
      for (let i = 0; i < foodItems.length; i += 1) {
        const item = foodItems[i];
        if (!item.active) continue;
        item.y += item.speed * dt;
        const iy = Math.round(item.y);
        item.node.style.transform = `translate3d(${Math.round(item.x)}px, ${iy}px, 0) scale(${item.scaleStr})`;
        // Inline intersection test against cached hero hitbox (no object allocation)
        const fLeft   = item.x + item.size * 0.18;
        const fRight  = item.x + item.size * 0.82;
        const fTop    = item.y + item.size * 0.18;
        const fBottom = item.y + item.size * 0.82;
        const hitMain = !(hbRight < fLeft || hbLeft > fRight || hbBottom < fTop || hbTop > fBottom);
        const hitWrap = hb2Active && !(hb2Right < fLeft || hb2Left > fRight || hb2Bottom < fTop || hb2Top > fBottom);
        if (hitMain || hitWrap) {
          const kind = item.kind;
          removeFood(item);
          if (kind === 'good') {
            collectedGood = Math.min(TARGET_GOOD, collectedGood + 1);
            playMiniSfx('collect', 18);
            if (collectedGood >= TARGET_GOOD) {
              updateHud();
              showMiniResult(true);
            } else {
              scheduleHudUpdate();
            }
          } else {
            damageHero(kind);
          }
          continue;
        }
        if (item.y > stageH + item.size) removeFood(item);
      }
    }

    function tick(now) {
      if (!loopActive) return;
      if (!Number.isFinite(now)) now = performance.now();
      const elapsed = now - last;
      const dt = elapsed > 120 ? 0 : Math.min(0.03, Math.max(0, elapsed / 1000 || 0));
      last = now;

      if (!gameOver && !gameWon) {
        if (now >= hurtFreezeUntil) {
          if (velocity) {
            heroX += velocity * stageW * 0.38 * dt;
            if (heroX < 0) heroX += stageW;
            else if (heroX >= stageW) heroX -= stageW;
            heroRatio = heroX / stageW;
          }
        }
        updateSprite(now);
        applyHero();
        updateBlink(now);
        updateFood(dt, now);
        // Flush deferred HUD update at end of frame (no setTimeout needed)
        if (hudDirty) { hudDirty = false; updateHud(); }
        if (pendingGameOver && now >= hurtFreezeUntil) {
          pendingGameOver = false;
          showMiniResult(false);
          return;
        }
      }

      if (!gameOver && !gameWon) requestMiniTick();
    }

    updateMetrics();
    updateHud();
    updateHearts();
    setSprite(SPRITES.walkRight1);
    applyHero();
    hero.style.visibility = 'hidden';
    spriteReady.finally(() => {
      updateMetrics();
      hero.style.visibility = 'visible';
      show(tutorial);
      tutorialStartBtn?.focus?.();
    });
  }



  function initMiniGame2() {
    addSpeaker();
    stopSound('background');
    stopSound('battle_background');
    playSound('minigame_background', { loop:true, restart:true });

    const stage = document.querySelector('.memory2-stage');
    const grid = $('memory2Grid');
    const hero = $('memory2Hero');
    const jumpBtn = $('memory2JumpBtn');
    const hud = $('memory2Hud');
    const leftWarn = $('memory2WarnLeft');
    const rightWarn = $('memory2WarnRight');
    const projectile = $('memory2Projectile');
    const resultModal = $('memory2Result');
    const resultImage = $('memory2ResultImage');
    const resultTitle = $('memory2ResultTitle');
    const resultText = $('memory2ResultText');
    const retryBtn = $('memory2RetryBtn');
    const boardBtn = $('memory2BoardBtn');
    const settingsBtn = $('memory2SettingsBtn');
    const menu = $('memory2Menu');
    const menuBoardBtn = $('memory2MenuBoardBtn');
    const closeMenuBtn = $('memory2CloseMenuBtn');
    const introModal = $('memory2Intro');
    const introStartBtn = $('memory2IntroStartBtn');
    const introBoardBtn = $('memory2IntroBoardBtn');
    if (!stage || !grid || !hero || !jumpBtn || !projectile) return;
    hero.alt = getHeroName();
    const memoryIntroTitle = $('memory2IntroTitle');
    if (memoryIntroTitle) memoryIntroTitle.textContent = `Bereite ${getHeroName()} auf den Weg vor`;

    const slot = Number(qs('slot')) || 3;
    const memory2Meta = { slot, isBoss:false };
    stage.style.setProperty('--memory2-bg', `url("${bgForMeta(memory2Meta)}")`);
    applyStagePopup(introModal, memory2Meta);
    applyStagePopup(resultModal, memory2Meta);
    applyStagePopup(menu, memory2Meta);

    const CARD_BACK = assetUrl('assets/images/minigame2/karte.png');
    const MEMORY_SYMBOLS = [
      ['nase', 'Nase'], ['mund', 'Mund'], ['auge', 'Auge'], ['sonne', 'Sonne'],
      ['blatt', 'Blatt'], ['brille', 'Brille'], ['hand', 'Hand'], ['erdbeere', 'Erdbeere'],
      ['schwert', 'Schwert'], ['helm', 'Helm'], ['schild', 'Schild'], ['ohr', 'Ohr']
    ].map(([id, label]) => ({ id, label, src: assetUrl(`assets/images/minigame2/${id}.png`) }));
    const HERO = {
      stand: assetUrl('assets/images/minigame/mini_walk_right_1.png'),
      jump: assetUrl('assets/images/minigame/mini_jump_right.png'),
      fall: assetUrl('assets/images/minigame/mini_fall_right.png'),
      hurt: assetUrl('assets/images/minigame/mini_bad_food.png')
    };
    const HEART = {
      full: assetUrl('assets/images/minigame/mini_heart_full.png'),
      broken: assetUrl('assets/images/minigame/mini_heart_broken.png')
    };

    const MAX_HEARTS = 3;
    const WARNING_MS = 1150;
    const PROJECTILE_MIN_DELAY = 3000;
    const PROJECTILE_MAX_DELAY = 6000;
    const PROJECTILE_SIZE = 46;
    const PROJECTILE_TRAVEL_MS = 1850;
    const JUMP_VELOCITY = 720;
    const GRAVITY = 1420;
    const HURT_FREEZE_MS = 450;
    const INVULNERABLE_MS = 2200;

    let cards = [];
    let firstCard = null;
    let secondCard = null;
    let checking = false;
    let matchedPairs = 0;
    let lives = MAX_HEARTS;
    let jumping = false;
    let jumpY = 0;
    let jumpVelocity = 0;
    let heroW = 128;
    let heroH = 150;
    let heroX = 0;
    let heroBaseY = 0;
    let stageW = 1;
    let stageH = 1;
    let last = performance.now();
    let rafId = null;
    let loopActive = false;
    let gameOver = false;
    let gameWon = false;
    let hurtUntil = 0;
    let invulnerableUntil = 0;
    let blinkUntil = 0;
    let lastHeroSrc = '';
    let nextProjectileAt = performance.now() + 1800;
    let projectilePhase = 'idle';
    let projectileDir = 1;
    let projectileStart = 0;
    let projectileX = -9999;
    let projectileY = 0;

    const heartWrap = $('memory2Lives');
    const heartNodes = Array.from({ length: MAX_HEARTS }, (_, index) => {
      const img = document.createElement('img');
      img.className = 'memory2-heart';
      img.alt = index === 0 ? 'Leben' : '';
      if (index > 0) img.setAttribute('aria-hidden', 'true');
      heartWrap?.appendChild(img);
      return img;
    });

    const jumpAudios = Array.from({ length: 3 }, () => {
      const a = new Audio(assetUrl('assets/audio/jump_sound.mp3'));
      a.preload = 'auto';
      a.volume = .72;
      try { a.load(); } catch (_) {}
      return a;
    });
    let jumpAudioIndex = 0;
    try {
      getAudio('flip')?.load?.();
      getAudio('pair')?.load?.();
    } catch (_) {}

    function preloadImage(src) {
      return new Promise(resolve => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = img.onerror = () => resolve(img);
        img.src = src;
        if (img.decode) img.decode().then(() => resolve(img)).catch(() => {});
      });
    }
    Promise.all([CARD_BACK, ...MEMORY_SYMBOLS.map(s => s.src), ...Object.values(HERO), ...Object.values(HEART)].map(preloadImage)).then(() => {
      hero.style.visibility = 'visible';
    });

    function shuffle(list) {
      const arr = list.slice();
      for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function makeCards() {
      cards = shuffle(MEMORY_SYMBOLS.flatMap(symbol => [
        { ...symbol, pairKey: symbol.id, cardId: `${symbol.id}-a`, matched:false, flipped:false },
        { ...symbol, pairKey: symbol.id, cardId: `${symbol.id}-b`, matched:false, flipped:false }
      ]));
      grid.innerHTML = cards.map((card, index) => `
        <button class="memory2-card" type="button" data-index="${index}" aria-label="Memory-Karte ${index + 1}">
          <span class="memory2-card-inner">
            <span class="memory2-card-face memory2-card-back"><img src="${CARD_BACK}" alt="Rückseite"></span>
            <span class="memory2-card-face memory2-card-front"><img src="${card.src}" alt="${esc(card.label)}"></span>
          </span>
        </button>`).join('');
      grid.querySelectorAll('.memory2-card').forEach(btn => btn.addEventListener('click', () => flipCard(Number(btn.dataset.index))));
    }

    function updateHud() {
      if (hud) hud.textContent = `Paare ${matchedPairs} / ${MEMORY_SYMBOLS.length}`;
    }
    function updateHearts() {
      heartNodes.forEach((node, index) => {
        node.src = index < lives ? HEART.full : HEART.broken;
        node.classList.toggle('broken', index >= lives);
      });
    }
    function setHero(src) {
      if (lastHeroSrc === src) return;
      hero.src = src;
      lastHeroSrc = src;
    }
    function updateHeroSprite(now) {
      hero.classList.toggle('hurt', now < hurtUntil);
      hero.classList.toggle('jumping', jumping);
      if (now < hurtUntil) { setHero(HERO.hurt); return; }
      if (jumping) setHero(jumpVelocity >= 0 ? HERO.jump : HERO.fall);
      else setHero(HERO.stand);
    }
    function updateMetrics() {
      stageW = Math.max(1, stage.clientWidth || window.innerWidth || 1);
      stageH = Math.max(1, stage.clientHeight || window.innerHeight || 1);
      heroW = hero.clientWidth || 128;
      heroH = hero.clientHeight || 150;
      heroX = stageW / 2;
      heroBaseY = stageH - 16;
      projectileY = Math.max(12, stageH - 86);
      applyHero();
      applyProjectile();
    }
    window.addEventListener('resize', updateMetrics, { passive:true });

    function applyHero() {
      hero.style.transform = `translate3d(${Math.round(heroX - heroW / 2)}px, ${Math.round(-jumpY)}px, 0)`;
    }
    function applyProjectile() {
      projectile.style.transform = `translate3d(${Math.round(projectileX)}px, ${Math.round(projectileY)}px, 0)`;
    }
    function playJump() {
      if (muted) return;
      try {
        const a = jumpAudios[jumpAudioIndex++ % jumpAudios.length];
        a.pause(); a.currentTime = 0; a.play().catch(() => {});
      } catch (_) {}
    }
    function jump() {
      if (gameOver || gameWon || jumping || performance.now() < hurtUntil) return;
      jumping = true;
      jumpVelocity = JUMP_VELOCITY;
      playJump();
    }

    jumpBtn.addEventListener('pointerdown', ev => {
      ev.preventDefault();
      playSound('minigame_background', { loop:true, restart:false });
      jumpBtn.classList.add('pressed');
      jump();
      try { jumpBtn.setPointerCapture?.(ev.pointerId); } catch (_) {}
    }, { passive:false });
    ['pointerup','pointercancel','pointerleave','lostpointercapture'].forEach(type => jumpBtn.addEventListener(type, ev => {
      ev?.preventDefault?.();
      jumpBtn.classList.remove('pressed');
    }, { passive:false }));
    settingsBtn?.addEventListener('click', () => show(menu));
    closeMenuBtn?.addEventListener('click', () => hide(menu));
    menuBoardBtn?.addEventListener('click', () => { stopLoop(); stopSound('minigame_background'); location.href = pageUrl('index.html'); });
    boardBtn?.addEventListener('click', () => { stopLoop(); stopSound('minigame_background'); location.href = pageUrl('index.html'); });

    function flipCard(index) {
      if (checking || gameOver || gameWon) return;
      const card = cards[index];
      if (!card || card.matched || card.flipped) return;
      card.flipped = true;
      playSound('flip');
      const node = grid.querySelector(`[data-index="${index}"]`);
      node?.classList.add('flipped');
      if (firstCard === null) { firstCard = index; return; }
      secondCard = index;
      checking = true;
      const a = cards[firstCard];
      const b = cards[secondCard];
      if (a.pairKey === b.pairKey) {
        playSound('pair');
        a.matched = b.matched = true;
        node?.classList.add('matched');
        grid.querySelector(`[data-index="${firstCard}"]`)?.classList.add('matched');
        matchedPairs += 1;
        updateHud();
        firstCard = null; secondCard = null; checking = false;
        if (matchedPairs >= MEMORY_SYMBOLS.length) showResult(true);
      } else {
        window.setTimeout(() => {
          [firstCard, secondCard].forEach(i => {
            if (i === null) return;
            cards[i].flipped = false;
            grid.querySelector(`[data-index="${i}"]`)?.classList.remove('flipped');
          });
          firstCard = null; secondCard = null; checking = false;
        }, 720);
      }
    }

    function scheduleNextProjectile(now) {
      projectilePhase = 'idle';
      projectile.classList.remove('active');
      projectileX = -9999;
      applyProjectile();
      nextProjectileAt = now + PROJECTILE_MIN_DELAY + Math.random() * (PROJECTILE_MAX_DELAY - PROJECTILE_MIN_DELAY);
    }
    function startWarning(now) {
      projectilePhase = 'warning';
      projectileDir = Math.random() < .5 ? 1 : -1;
      projectileStart = now + WARNING_MS;
      if (projectileDir > 0) leftWarn.classList.add('active');
      else rightWarn.classList.add('active');
    }
    function startProjectile(now) {
      updateMetrics();
      projectileY = Math.max(12, stageH - 86);
      projectilePhase = 'flying';
      projectileStart = now;
      leftWarn.classList.remove('active');
      rightWarn.classList.remove('active');
      projectile.classList.add('active');
      projectileX = projectileDir > 0 ? -PROJECTILE_SIZE - 8 : stageW + PROJECTILE_SIZE + 8;
      applyProjectile();
    }
    function updateProjectile(now) {
      if (gameOver || gameWon) return;
      if (projectilePhase === 'idle') {
        if (now >= nextProjectileAt) startWarning(now);
        return;
      }
      if (projectilePhase === 'warning') {
        if (now >= projectileStart) startProjectile(now);
        return;
      }
      const travel = (now - projectileStart) / PROJECTILE_TRAVEL_MS;
      if (projectileDir > 0) projectileX = -PROJECTILE_SIZE + (stageW + PROJECTILE_SIZE * 2) * travel;
      else projectileX = stageW + PROJECTILE_SIZE - (stageW + PROJECTILE_SIZE * 2) * travel;
      applyProjectile();
      if (checkProjectileHit()) damageHero(now);
      const finished = projectileDir > 0 ? projectileX > stageW + PROJECTILE_SIZE : projectileX < -PROJECTILE_SIZE * 2;
      if (finished) scheduleNextProjectile(now);
    }
    function checkProjectileHit() {
      if (performance.now() < invulnerableUntil || projectilePhase !== 'flying') return false;
      const heroBottom = heroBaseY - jumpY;
      const heroTop = heroBottom - heroH;
      const hLeft = heroX - heroW * .20;
      const hRight = heroX + heroW * .20;
      const hTop = heroTop + heroH * .18;
      const hBottom = heroBottom - heroH * .08;
      const pLeft = projectileX + 7;
      const pRight = projectileX + PROJECTILE_SIZE - 7;
      const pTop = projectileY + 7;
      const pBottom = projectileY + PROJECTILE_SIZE - 7;
      return !(hRight < pLeft || hLeft > pRight || hBottom < pTop || hTop > pBottom);
    }
    function damageHero(now) {
      if (gameOver || gameWon || now < invulnerableUntil) return;
      lives = Math.max(0, lives - 1);
      playSound('hurt');
      playSound('glass_break');
      updateHearts();
      hurtUntil = now + HURT_FREEZE_MS;
      blinkUntil = hurtUntil + INVULNERABLE_MS;
      invulnerableUntil = blinkUntil;
      scheduleNextProjectile(now + 300);
      if (lives <= 0) showResult(false);
    }
    function updateBlink(now) {
      if (now >= blinkUntil || now < hurtUntil) { hero.style.opacity = '1'; return; }
      hero.style.opacity = (Math.floor(now / 140) % 2 === 0) ? '.32' : '1';
    }

    function showResult(won) {
      stopLoop();
      stopSound('minigame_background');
      if (resultImage) {
        resultImage.src = won ? ASSETS.text.gewonnen : ASSETS.text.verloren;
        resultImage.alt = won ? 'Gewonnen' : 'Verloren';
        show(resultImage);
      }
      if (won) {
        gameWon = true;
        resultTitle.textContent = 'Gewonnen';
        resultText.textContent = `Du hast alle Symbolpaare gefunden und ${getHeroName()} sicher an den Blendkugeln vorbeigeführt.`;
        retryBtn.textContent = 'Zurück zum Spielfeld';
        hide(boardBtn);
        retryBtn.onclick = () => {
          completeMinigameSlot(slot);
          location.href = pageUrl('index.html');
        };
      } else {
        gameOver = true;
        resultTitle.textContent = 'Verloren';
        resultText.textContent = `${getHeroName()} wurde zu oft von Blendkugeln getroffen.`;
        retryBtn.textContent = 'Neuer Versuch';
        retryBtn.onclick = () => { stopLoop(); location.reload(); };
        show(boardBtn);
      }
      show(resultModal);
    }

    function stopLoop() {
      loopActive = false;
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
    }
    function requestTick() {
      if (!loopActive) return;
      rafId = requestAnimationFrame(tick);
    }
    function tick(now) {
      if (!loopActive) return;
      if (!Number.isFinite(now)) now = performance.now();
      const dt = Math.min(.032, Math.max(0, (now - last) / 1000 || 0));
      last = now;
      if (!gameOver && !gameWon) {
        if (now >= hurtUntil && jumping) {
          jumpY += jumpVelocity * dt;
          jumpVelocity -= GRAVITY * dt;
          if (jumpY <= 0) { jumpY = 0; jumpVelocity = 0; jumping = false; }
        }
        updateHeroSprite(now);
        applyHero();
        updateBlink(now);
        updateProjectile(now);
      }
      requestTick();
    }

    document.addEventListener('visibilitychange', () => { last = performance.now(); });
    window.addEventListener('blur', () => {});
    makeCards();
    updateHud();
    updateHearts();
    updateMetrics();
    setHero(HERO.stand);
    hero.style.visibility = 'hidden';
    function startMemory2Game() {
      hide(introModal);
      loopActive = true;
      last = performance.now();
      scheduleNextProjectile(last + 900);
      requestTick();
    }
    introStartBtn?.addEventListener('click', startMemory2Game);
    introBoardBtn?.addEventListener('click', () => { stopLoop(); stopSound('minigame_background'); location.href = pageUrl('index.html'); });
    show(introModal);
    introStartBtn?.focus?.();
  }




  function initMiniGame3() {
    addSpeaker();
    stopSound('background');
    stopSound('battle_background');
    stopSound('minigame_background');

    const stage = document.querySelector('.pipe3-stage');
    const board = $('pipe3Board');
    const valveBtn = $('pipe3ValveBtn');
    const valvePad = document.querySelector('.pipe3-valve-pad');
    const valveImg = $('pipe3ValveImg');
    const hintBtn = $('pipe3HintBtn');
    const hud = $('pipe3Hud');
    const livesWrap = $('pipe3Lives');
    const hero = $('pipe3Hero');
    const heroWrap = hero?.closest('.pipe3-hero-wrap');
    const guardBtn = $('pipe3GuardBtn');
    const guardBarFill = $('pipe3GuardBarFill');
    const ogreZone = $('pipe3OgreZone');
    const ogre = $('pipe3Ogre');
    const banana = $('pipe3Banana');
    const sprayOverlay = $('pipe3SprayOverlay');
    const topConnector = $('pipe3TopConnector');
    const introModal = $('pipe3Intro');
    const introStartBtn = $('pipe3IntroStartBtn');
    const introBoardBtn = $('pipe3IntroBoardBtn');
    const resultModal = $('pipe3Result');
    const resultImage = $('pipe3ResultImage');
    const resultExtraImage = $('pipe3ResultExtraImage');
    const resultTitle = $('pipe3ResultTitle');
    const resultText = $('pipe3ResultText');
    const retryBtn = $('pipe3RetryBtn');
    const boardBtn = $('pipe3BoardBtn');
    const settingsBtn = $('pipe3SettingsBtn');
    const menu = $('pipe3Menu');
    const menuBoardBtn = $('pipe3MenuBoardBtn');
    if (hero) hero.alt = getHeroName();
    const closeMenuBtn = $('pipe3CloseMenuBtn');
    if (!stage || !board || !valveBtn || !hero || !ogreZone || !ogre || !banana) return;

    const slot = Number(qs('slot')) || 5;
    const pipe3Meta = { slot, isBoss:false };
    stage.style.setProperty('--pipe3-bg', `url("${bgForMeta(pipe3Meta)}")`);
    applyStagePopup(introModal, pipe3Meta);
    applyStagePopup(resultModal, pipe3Meta);
    applyStagePopup(menu, pipe3Meta);

    const IMG = {
      V: assetUrl('assets/images/minigame3/pipe_V.png'),
      I: assetUrl('assets/images/minigame3/pipe_I.png'),
      T: assetUrl('assets/images/minigame3/pipe_T.png'),
      F: assetUrl('assets/images/minigame3/filter.png'),
      Vg: assetUrl('assets/images/minigame3/pipe_V_green.png'),
      Ig: assetUrl('assets/images/minigame3/pipe_I_green.png'),
      Tg: assetUrl('assets/images/minigame3/pipe_T_green.png'),
      Fg: assetUrl('assets/images/minigame3/pipe_X_green.png'),
      no: assetUrl('assets/images/minigame3/no_pipe.png'),
      valve: assetUrl('assets/images/minigame3/ventil.png'),
      flakon: assetUrl('assets/images/minigame3/flakon_tile.png'),
      heroIdle: assetUrl('assets/images/minigame3/hero_idle.png'),
      heroGuard: assetUrl('assets/images/minigame3/hero_guard.png'),
      ogreIdle: assetUrl('assets/images/minigame3/ogre_idle.png'),
      ogreThrow: assetUrl('assets/images/minigame3/ogre_throw.png'),
      ogreShocked: assetUrl('assets/images/minigame3/ogre_shocked.png'),
      ogreClean: assetUrl('assets/images/minigame3/ogre_clean.png'),
      banana: assetUrl('assets/images/minigame3/banana_peel.png'),
      sprayOverlay: assetUrl('assets/images/minigame3/spray_overlay.png'),
      feedBanana: assetUrl('assets/images/minigame3/feed_banana.png')
    };
    const HEART = {
      full: assetUrl('assets/images/minigame/mini_heart_full.png'),
      broken: assetUrl('assets/images/minigame/mini_heart_broken.png')
    };

    const heroIdleSrc = IMG.heroIdle;
    if (topConnector) topConnector.src = IMG.flakon;
    hero.dataset.idleSrc = heroIdleSrc;
    hero.src = heroIdleSrc;
    hero.style.visibility = 'visible';
    ogre.src = IMG.ogreIdle;
    banana.src = IMG.banana;
    if (sprayOverlay) {
      sprayOverlay.src = IMG.sprayOverlay;
      // Wolke ist absichtlich Kind des Ogers: dadurch bleibt sie exakt auf seinem Mittelpunkt,
      // unabhängig von Browserhöhe, Handy-Safe-Area oder Spielfeld-Skalierung.
      ogreZone?.appendChild(sprayOverlay);
    }

    const rotateAudios = Array.from({ length: 3 }, () => {
      const a = new Audio(AUDIO_FILES.flip || assetUrl('assets/audio/flip.mp3'));
      a.preload = 'auto';
      a.volume = audioVolumeForKey('flip');
      try { a.load(); } catch (_) {}
      return a;
    });
    let rotateAudioIndex = 0;
    function playRotateSound() {
      if (muted) return;
      const a = rotateAudios[rotateAudioIndex++ % rotateAudios.length];
      try { a.pause(); a.currentTime = 0; a.play().catch(() => {}); } catch (_) {}
    }

    const ROWS = 6;
    const COLS = 6;
    const FILTER_TOTAL = 4;
    const MAX_HEARTS = 3;
    const ENTRY_COL = 3;
    const START = { r:5, c:ENTRY_COL, dir:'S' };
    const EXIT = { r:0, c:ENTRY_COL, dir:'N' };
    const OPP = { N:'S', E:'W', S:'N', W:'E' };
    const STEP = { N:[-1,0], E:[0,1], S:[1,0], W:[0,-1] };
    const ORDER = ['N','E','S','W'];
    const BASE = {
      I: ['N','S'],
      V: ['N','E'],
      T: ['N','E','W'],
      F: ['N','E','S','W']
    };

    const solution = [
      ['T','V','I','V','T','I'],
      ['V','F','T','V','F','V'],
      ['I','I','V','I','T','I'],
      ['T','I','V','I','V','V'],
      ['I','F','I','V','F','T'],
      ['V','T','I','V','V','I']
    ];
    const solvedRot = [
      [0,1,1,3,2,0],
      [2,0,3,1,0,2],
      [0,0,1,0,1,0],
      [2,0,2,0,1,3],
      [1,0,1,3,0,1],
      [0,1,0,1,3,1]
    ];
    const initialRot = [
      [1,2,0,0,0,1],
      [0,0,0,2,0,3],
      [1,1,1,1,3,1],
      [1,1,0,1,2,0],
      [0,0,0,0,0,0],
      [2,1,1,2,0,0]
    ];
    const filterCells = new Set(['1,1','1,4','4,1','4,4']);
    const hintPath = [
      [5,3],[5,4],[4,4],[3,4],[3,5],[2,5],[1,5],[1,4],
      [1,3],[2,3],[3,3],[4,3],[4,2],[4,1],
      [3,1],[2,1],[1,1],[0,1],[0,2],[0,3]
    ];

    let tiles = [];
    let selected = null;
    let checking = false;
    let finished = false;
    let started = false;
    let pausedAt = 0;
    let encounterStopped = true;
    let encounterRaf = 0;
    let lives = MAX_HEARTS;
    let invulnerableUntil = 0;
    let loseReason = '';
    let valveReady = false;

    const heartNodes = Array.from({ length: MAX_HEARTS }, (_, index) => {
      const img = document.createElement('img');
      img.className = 'memory2-heart';
      img.alt = index === 0 ? 'Leben' : '';
      if (index > 0) img.setAttribute('aria-hidden', 'true');
      livesWrap?.appendChild(img);
      return img;
    });
    function updateHearts() {
      heartNodes.forEach((node, index) => {
        node.src = index < lives ? HEART.full : HEART.broken;
        node.classList.toggle('broken', index >= lives);
      });
    }

    function preloadImage(src) {
      return new Promise(resolve => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = img.onerror = () => resolve(img);
        img.src = src;
        if (img.decode) img.decode().then(() => resolve(img)).catch(() => {});
      });
    }
    Promise.all([
      IMG.flakon, IMG.heroIdle, IMG.heroGuard, IMG.ogreIdle, IMG.ogreThrow, IMG.ogreShocked, IMG.ogreClean, IMG.banana, IMG.sprayOverlay, IMG.feedBanana,
      HEART.full, HEART.broken, ASSETS.text.gewonnen, ASSETS.text.verloren
    ].map(preloadImage)).catch(() => {});
    ['glass_break','hurt','richtig_1','richtig_3','spray','throw','minigame_background'].forEach(key => getAudio(key)?.load?.());

    function initTiles() {
      tiles = [];
      for (let r = 0; r < ROWS; r += 1) {
        for (let c = 0; c < COLS; c += 1) {
          const type = solution[r][c];
          tiles.push({
            r, c, type,
            rotation: initialRot[r][c],
            filter: type === 'F',
            flow: false,
            locked: false
          });
        }
      }
      computeFlowFromStart();
    }
    const tileAt = (r, c) => tiles.find(t => t.r === r && t.c === c);
    const rotateDir = (dir, rot) => ORDER[(ORDER.indexOf(dir) + rot) % 4];
    const openings = tile => (BASE[tile.type] || []).map(d => rotateDir(d, tile.rotation));
    const key = (r, c) => `${r},${c}`;
    function imgFor(tile) {
      const green = tile.flow || tile.locked;
      if (tile.type === 'F') return green ? IMG.Fg : IMG.F;
      if (tile.type === 'I') return green ? IMG.Ig : IMG.I;
      if (tile.type === 'T') return green ? IMG.Tg : IMG.T;
      return green ? IMG.Vg : IMG.V;
    }

    function renderBoard() {
      board.innerHTML = tiles.map((tile, index) => {
        const rot = (tile.rotation % 4) * 90;
        const label = tile.type === 'F' ? 'Luftreinigungsfilter' : `Rohrstück ${tile.type}`;
        return `<button class="pipe3-tile ${tile.filter ? 'filter' : 'rotatable'}" type="button" data-index="${index}" aria-label="${label}"><img src="${imgFor(tile)}" alt="" style="transform:rotate(${rot}deg)"></button>`;
      }).join('');
      updateTileClasses();
      board.querySelectorAll('.pipe3-tile').forEach(btn => btn.addEventListener('click', () => onTileClick(Number(btn.dataset.index))));
    }
    function updateTileClasses() {
      board.querySelectorAll('.pipe3-tile').forEach((node, index) => {
        const tile = tiles[index];
        node.classList.toggle('selected', selected === index);
        node.classList.toggle('flow', Boolean(tile.flow));
        node.classList.toggle('locked', Boolean(tile.locked));
        node.classList.toggle('filter-found', tile.filter && tile.flow);
        const img = node.querySelector('img');
        if (img) {
          const nextSrc = imgFor(tile);
          if (img.getAttribute('src') !== nextSrc) img.setAttribute('src', nextSrc);
          img.style.transform = `rotate(${(tile.rotation % 4) * 90}deg)`;
        }
      });
    }
    function onTileClick(index) {
      if (checking || finished) return;
      const tile = tiles[index];
      if (!tile || tile.filter || tile.locked) return;
      playRotateSound();
      if (selected === index) tile.rotation = (tile.rotation + 1) % (tile.type === 'I' ? 2 : 4);
      else selected = index;
      computeFlowFromStart();
      updateTileClasses();
      updateHud();
      updateValveReadyState();
    }
    function clearFlow() { tiles.forEach(t => { t.flow = false; }); }
    function computeFlowFromStart() {
      clearFlow();
      const start = tileAt(START.r, START.c);
      const visited = new Set();
      const filters = new Set();
      if (!start || !openings(start).includes(START.dir)) return { exit:false, filters, visited };
      const q = [start];
      visited.add(key(start.r, start.c));
      while (q.length) {
        const tile = q.shift();
        tile.flow = true;
        if (tile.filter) filters.add(key(tile.r, tile.c));
        for (const dir of openings(tile)) {
          if (tile.r === EXIT.r && tile.c === EXIT.c && dir === EXIT.dir) continue;
          const [dr, dc] = STEP[dir];
          const nr = tile.r + dr, nc = tile.c + dc;
          if (nr < 0 || nc < 0 || nr >= ROWS || nc >= COLS) continue;
          const next = tileAt(nr, nc);
          if (!next || !openings(next).includes(OPP[dir])) continue;
          const k = key(nr, nc);
          if (visited.has(k)) continue;
          visited.add(k);
          q.push(next);
        }
      }
      const end = tileAt(EXIT.r, EXIT.c);
      const exit = Boolean(end && visited.has(key(EXIT.r, EXIT.c)) && openings(end).includes(EXIT.dir));
      return { exit, filters, visited };
    }
    function validatePipeSystem() {
      const result = computeFlowFromStart();
      const allFilters = [...filterCells].every(f => result.filters.has(f));
      updateTileClasses();
      updateHud();
      return result.exit && allFilters;
    }
    function updateHud(text) {
      if (!hud) return;
      if (text) { hud.textContent = text; return; }
      const result = computeFlowFromStart();
      hud.textContent = `Verbundene Filter ${result.filters.size} / ${FILTER_TOTAL}`;
    }
    function updateValveReadyState() {
      const result = computeFlowFromStart();
      valveReady = result.exit && [...filterCells].every(f => result.filters.has(f));
      valvePad?.classList.toggle('ready', valveReady);
      valveBtn?.classList.toggle('ready', valveReady);
      return valveReady;
    }
    function applyHint() {
      if (checking || finished) return;
      selected = null;
      const target = hintPath.map(([r, c]) => tileAt(r, c)).find(tile => tile && !tile.filter && (!tile.locked || tile.rotation !== solvedRot[tile.r][tile.c]));
      if (!target) { updateHud('Der Lösungsweg ist bereits vollständig als Tipp gesetzt.'); return; }
      target.rotation = solvedRot[target.r][target.c];
      target.locked = true;
      computeFlowFromStart();
      playSound('levelunlocked');
      updateTileClasses();
      updateHud('Tipp gesetzt: Eine Weg-Kachel wurde korrekt eingerastet.');
      updateValveReadyState();
    }

    const GUARD_ACTIVE_MS = 700;
    const GUARD_COOLDOWN_MS = 1300;
    let guardState = 'ready';
    let guardActiveUntil = 0;
    let guardCooldownUntil = 0;
    function setGuardBarFill(progress) {
      if (!guardBarFill) return;
      guardBarFill.style.transform = `scaleX(${clamp(progress, 0, 1)})`;
    }
    function updateGuardUi() {
      if (!guardBtn) return;
      const disabled = guardState !== 'ready' || !started || finished || Boolean(pausedAt);
      guardBtn.disabled = disabled;
      guardBtn.classList.toggle('cooldown', disabled);
    }
    function setHeroGuarding(active) {
      hero.src = active ? IMG.heroGuard : heroIdleSrc;
      heroWrap?.classList.toggle('guarding', active);
    }
    function activateGuard() {
      if (guardState !== 'ready' || finished || !started || pausedAt) return;
      const now = performance.now();
      guardState = 'active';
      guardActiveUntil = now + GUARD_ACTIVE_MS;
      setHeroGuarding(true);
      updateGuardUi();
      setGuardBarFill(1);
      playSound('richtig_3');
    }
    function tickGuard(now) {
      if (guardState === 'active') {
        const remaining = Math.max(0, guardActiveUntil - now);
        setGuardBarFill(remaining / GUARD_ACTIVE_MS);
        if (remaining <= 0) {
          guardState = 'cooldown';
          guardCooldownUntil = now + GUARD_COOLDOWN_MS;
          setHeroGuarding(false);
          updateGuardUi();
          setGuardBarFill(0);
        }
      } else if (guardState === 'cooldown') {
        const elapsed = GUARD_COOLDOWN_MS - Math.max(0, guardCooldownUntil - now);
        setGuardBarFill(elapsed / GUARD_COOLDOWN_MS);
        if (now >= guardCooldownUntil) {
          guardState = 'ready';
          updateGuardUi();
          setGuardBarFill(1);
        }
      } else {
        setGuardBarFill(1);
      }
    }

    let activeBanana = null;
    let nextAttackAt = 0;
    let ogreThrowUntil = 0;
    function scheduleNextAttack(now) { nextAttackAt = now + 3000 + Math.random() * 2000; }
    function clearBanana() {
      activeBanana = null;
      banana.classList.add('hidden');
      banana.style.opacity = '0';
    }
    function resetSprayOverlay() {
      if (!sprayOverlay) return;
      sprayOverlay.classList.add('hidden');
      sprayOverlay.classList.remove('fade-out');
      sprayOverlay.style.opacity = '0';
    }
    function positionOgreZone() {
      if (!ogreZone || !board) return;
      const stageRect = stage.getBoundingClientRect();
      const boardRect = board.getBoundingClientRect();
      const flakonRect = topConnector?.getBoundingClientRect?.();
      const zoneRect = ogreZone.getBoundingClientRect();
      const tileW = boardRect.width / 6;

      // v51: prozentuale Richtwerte statt harte Pixel.
      // 60% Abstand vom linken Bildschirm-/Stage-Rand bis zum Flakon-Mittelpunkt.
      // 30% des Ogers überlappen in das Spielfeld hinein, um transparente Bildränder auszugleichen.
      const FLACON_DISTANCE_RATIO = 0.60;
      const BOARD_OVERLAP_RATIO = 0.30;

      const flakonCenterX = flakonRect
        ? (flakonRect.left - stageRect.left + flakonRect.width * 0.50)
        : (boardRect.left - stageRect.left + tileW * 3.5);
      const targetCenterX = flakonCenterX * FLACON_DISTANCE_RATIO;

      // Sicherheitskorridor: bleibt im Bereich der beiden linken oberen Kacheln, aber nie an der Ecke.
      const minCenterX = boardRect.left - stageRect.left + tileW * 0.55;
      const maxCenterX = boardRect.left - stageRect.left + tileW * 1.65;
      const desiredCenterX = clamp(targetCenterX, minCenterX, maxCenterX);
      const desiredLeft = clamp(desiredCenterX - zoneRect.width / 2, 8, stageRect.width - zoneRect.width - 8);

      const boardTop = boardRect.top - stageRect.top;
      const desiredTop = clamp(boardTop - zoneRect.height * (1 - BOARD_OVERLAP_RATIO), 8, stageRect.height - zoneRect.height - 8);

      ogreZone.style.left = `${Math.round(desiredLeft)}px`;
      ogreZone.style.top = `${Math.round(desiredTop)}px`;
    }
    function positionSprayOverlay() {
      // v51: Wolke ist Kind vom Oger-Container. CSS zentriert sie exakt mit 50%/50%.
      if (!sprayOverlay) return;
      sprayOverlay.style.removeProperty('left');
      sprayOverlay.style.removeProperty('top');
      sprayOverlay.style.removeProperty('width');
      sprayOverlay.style.removeProperty('height');
    }
    function showSprayOverlay() {
      if (!sprayOverlay) return;
      positionSprayOverlay();
      sprayOverlay.classList.remove('hidden','fade-out');
      sprayOverlay.style.opacity = '1';
    }
    function fadeSprayOverlay() {
      if (!sprayOverlay) return;
      sprayOverlay.classList.add('fade-out');
    }
    function heroShake() {
      if (!heroWrap) return;
      heroWrap.classList.remove('hit');
      void heroWrap.offsetWidth;
      heroWrap.classList.add('hit');
      window.setTimeout(() => heroWrap.classList.remove('hit'), 620);
    }
    function damageHero(now) {
      if (finished || now < invulnerableUntil) return;
      invulnerableUntil = now + 950;
      lives = Math.max(0, lives - 1);
      updateHearts();
      playSound('glass_break');
      playSound('hurt');
      heroShake();
      if (lives <= 0) {
        loseReason = 'lives';
        window.setTimeout(() => showResult(false), 240);
      }
    }
    function startBananaDrop(now) {
      const stageRect = stage.getBoundingClientRect();
      const ogreRect = ogre.getBoundingClientRect();
      const heroRect = hero.getBoundingClientRect();
      const heroCenterX = heroRect.left - stageRect.left + heroRect.width * 0.50;
      const heroCenterY = heroRect.top - stageRect.top + heroRect.height * 0.45;
      activeBanana = {
        startTime: now,
        duration: 3600,
        startX: ogreRect.left - stageRect.left + ogreRect.width * 0.72 - 14,
        startY: ogreRect.top - stageRect.top + ogreRect.height * 0.54,
        endX: heroCenterX - 34,
        endY: heroCenterY,
        resolved: false
      };
      banana.classList.remove('hidden');
      banana.style.opacity = '1';
      banana.style.left = `${activeBanana.startX}px`;
      banana.style.top = `${activeBanana.startY}px`;
      banana.style.transform = 'translate(-50%, -50%) rotate(0deg)';
    }
    function startOgreAttack(now) {
      if (finished || activeBanana || !started || pausedAt) return;
      ogre.src = IMG.ogreThrow;
      ogre.classList.add('throwing');
      ogreThrowUntil = now + 820;
      startBananaDrop(now);
      playSound('throw');
    }
    function setOgreIdle() {
      ogre.src = IMG.ogreIdle;
      ogre.classList.remove('throwing','shocked');
    }
    function setOgreShocked() {
      ogre.src = IMG.ogreShocked;
      ogre.classList.remove('throwing');
      ogre.classList.add('shocked');
    }
    const intersects = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    function resolveBanana(blocked, now) {
      if (!activeBanana) return;
      banana.style.opacity = blocked ? '0' : '.18';
      if (blocked) playSound('richtig_1');
      else damageHero(now);
      window.setTimeout(clearBanana, blocked ? 90 : 140);
      scheduleNextAttack(now);
    }
    function tickOgreAttack(now) {
      if (finished || !started || pausedAt) return;
      if (ogreThrowUntil && now >= ogreThrowUntil) {
        ogreThrowUntil = 0;
        setOgreIdle();
      }
      if (!activeBanana && now >= nextAttackAt) startOgreAttack(now);
      if (!activeBanana) return;
      const progress = clamp((now - activeBanana.startTime) / activeBanana.duration, 0, 1);
      const wobbleX = Math.sin(progress * Math.PI * 6) * 10;
      const wobbleRot = Math.sin(progress * Math.PI * 8) * 12;
      const x = activeBanana.startX + (activeBanana.endX - activeBanana.startX) * progress + wobbleX;
      const y = activeBanana.startY + (activeBanana.endY - activeBanana.startY) * (1 - Math.pow(1 - progress, 2.15));
      banana.style.left = `${x}px`;
      banana.style.top = `${y}px`;
      banana.style.transform = `translate(-50%, -50%) rotate(${wobbleRot}deg)`;
      const bananaRect = { left:x - 26, right:x + 26, top:y - 24, bottom:y + 24 };
      const heroRect = hero.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      const targetRect = {
        left: heroRect.left - stageRect.left + heroRect.width * 0.26,
        right: heroRect.left - stageRect.left + heroRect.width * 0.74,
        top: heroRect.top - stageRect.top + heroRect.height * 0.18,
        bottom: heroRect.top - stageRect.top + heroRect.height * 0.72
      };
      if (!activeBanana.resolved && intersects(bananaRect, targetRect)) {
        activeBanana.resolved = true;
        resolveBanana(guardState === 'active', now);
        return;
      }
      if (progress >= 1 && !activeBanana.resolved) {
        activeBanana.resolved = true;
        resolveBanana(guardState === 'active', now);
      }
    }

    function encounterLoop(now) {
      if (encounterStopped || pausedAt) return;
      const t = now || performance.now();
      tickGuard(t);
      tickOgreAttack(t);
      encounterRaf = window.requestAnimationFrame(encounterLoop);
    }
    function pauseEncounter() {
      if (!started || finished || pausedAt) return;
      pausedAt = performance.now();
      if (encounterRaf) window.cancelAnimationFrame(encounterRaf);
      encounterRaf = 0;
      updateGuardUi();
    }
    function resumeEncounter() {
      if (!started || finished || !pausedAt) return;
      const now = performance.now();
      const shift = now - pausedAt;
      if (guardState === 'active') guardActiveUntil += shift;
      if (guardState === 'cooldown') guardCooldownUntil += shift;
      if (activeBanana) activeBanana.startTime += shift;
      if (nextAttackAt) nextAttackAt += shift;
      if (ogreThrowUntil) ogreThrowUntil += shift;
      pausedAt = 0;
      updateGuardUi();
      encounterRaf = window.requestAnimationFrame(encounterLoop);
    }
    function startEncounter() {
      if (started) return;
      started = true;
      encounterStopped = false;
      pausedAt = 0;
      updateGuardUi();
      hide(introModal);
      playSound('minigame_background', { loop:true, restart:true });
      resetSprayOverlay();
      scheduleNextAttack(performance.now());
      encounterRaf = window.requestAnimationFrame(encounterLoop);
    }

    function showResult(won) {
      if (finished) return;
      finished = true;
      encounterStopped = true;
      pausedAt = 0;
      if (encounterRaf) window.cancelAnimationFrame(encounterRaf);
      stopSound('minigame_background');
      if (resultExtraImage) hide(resultExtraImage);
      if (resultText) show(resultText);
      if (resultTitle) show(resultTitle);
      if (resultImage) {
        resultImage.src = won ? ASSETS.text.gewonnen : ASSETS.text.verloren;
        resultImage.alt = won ? 'Gewonnen' : 'Verloren';
        show(resultImage);
      }
      if (won) {
        playSound('win');
        resultTitle.textContent = 'Gewonnen';
        resultText.textContent = 'Der Duft startet am Ventil, läuft durch alle vier Luftreinigungsfilter und erreicht den Flakon am oberen Anschluss.';
        retryBtn.textContent = 'Zurück zum Spielfeld';
        hide(boardBtn);
        retryBtn.onclick = () => {
          completeMinigameSlot(slot);
          location.href = pageUrl('index.html');
        };
      } else {
        playSound('lose');
        retryBtn.textContent = 'Neuer Versuch';
        retryBtn.onclick = () => location.reload();
        show(boardBtn);
        if (loseReason === 'lives') {
          if (resultImage) {
            resultImage.src = ASSETS.text.verloren;
            resultImage.alt = 'Verloren';
            show(resultImage);
          }
          resultTitle.textContent = '';
          resultText.textContent = '';
          if (resultTitle) hide(resultTitle);
          if (resultText) hide(resultText);
          if (resultExtraImage) {
            resultExtraImage.src = IMG.feedBanana;
            resultExtraImage.alt = `${getHeroName()} unter einem Berg Bananen`;
            show(resultExtraImage);
          }
        } else {
          resultTitle.textContent = 'Verloren';
          resultText.textContent = 'Der Duftweg ist noch nicht richtig verbunden. Er muss vom unteren Ventil durch alle vier Filter bis zum Flakon am oberen Anschluss führen.';
        }
      }
      show(resultModal);
    }

    valveBtn.addEventListener('click', () => {
      if (checking || finished) return;
      if (!updateValveReadyState()) {
        valveBtn.classList.remove('not-ready');
        void valveBtn.offsetWidth;
        valveBtn.classList.add('not-ready');
        playSound('flip');
        updateHud('Verbinde erst alle vier Filter bis zum Flakon, dann kannst du das Ventil auslösen.');
        window.setTimeout(() => valveBtn.classList.remove('not-ready'), 420);
        return;
      }
      checking = true;
      pauseEncounter();
      encounterStopped = true;
      clearBanana();
      resetSprayOverlay();
      setOgreIdle();
      selected = null;
      updateTileClasses();
      updateHud('Der Duft wird versprüht …');
      valveImg?.classList.add('spinning');
      playSound('levelstart');
      playSound('spray');
      showSprayOverlay();
      window.setTimeout(() => {
        ogre.src = IMG.ogreClean;
        ogre.classList.remove('throwing','shocked');
      }, 700);
      window.setTimeout(() => {
        valveImg?.classList.remove('spinning');
        fadeSprayOverlay();
        updateHud('Der Oger ist jetzt sauber.');
        window.setTimeout(() => {
          resetSprayOverlay();
          window.setTimeout(() => {
            checking = false;
            showResult(true);
          }, 3000);
        }, 220);
      }, 2000);
    });

    introStartBtn?.addEventListener('click', startEncounter);
    guardBtn?.addEventListener('click', activateGuard);
    hintBtn?.addEventListener('click', applyHint);
    settingsBtn?.addEventListener('click', () => { pauseEncounter(); show(menu); });
    closeMenuBtn?.addEventListener('click', () => { hide(menu); resumeEncounter(); });
    menuBoardBtn?.addEventListener('click', () => { stopSound('minigame_background'); location.href = pageUrl('index.html'); });
    boardBtn?.addEventListener('click', () => { stopSound('minigame_background'); location.href = pageUrl('index.html'); });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) pauseEncounter();
      else if (!menu || menu.classList.contains('hidden')) resumeEncounter();
    });

    window.addEventListener('resize', () => {
      positionOgreZone();
      if (!sprayOverlay || sprayOverlay.classList.contains('hidden')) return;
      positionSprayOverlay();
    });

    initTiles();
    renderBoard();
    updateHud();
    updateValveReadyState();
    updateHearts();
    updateGuardUi();
    setGuardBarFill(1);
    clearBanana();
    resetSprayOverlay();
    setOgreIdle();
    positionOgreZone();
    show(introModal);
  }


  function initMiniGame4() {
    addSpeaker();
    stopSound('background');
    stopSound('battle_background');
    playSound('minigame_background', { loop:true, restart:true });

    const slot = Number(qs('slot')) || 7;
    const stage = document.querySelector('.touch4-v60-stage');
    const grid = $('touch4Grid');
    const bridge = $('touch4Bridge');
    const hero = $('touch4Hero');
    const scoreEl = $('touch4Score');
    const messageEl = $('touch4Message');
    const continueBtn = $('touch4ContinueBtn');
    const countdownEl = $('touch4Countdown');
    const countdownNumEl = $('touch4CountdownNum');
    const intro = $('touch4Intro');
    const introBoardBtn = $('touch4BoardIntroBtn');
    const result = $('touch4Result');
    const resultImage = $('touch4ResultImage');
    const resultTitle = $('touch4ResultTitle');
    const resultText = $('touch4ResultText');
    const resultDetail = $('touch4ResultDetail');
    const retryBtn = $('touch4RetryBtn');
    const boardBtn = $('touch4BoardBtn');
    const menu = $('touch4Menu');
    const countdownSegmentEls = () => Array.from(document.querySelectorAll('.touch4-v60-countdown-segment'));
    if (!stage || !grid || !bridge) return;
    if (hero) hero.alt = getHeroName();

    const TOUCH4_CARD_BACK = assetUrl('assets/images/minigame4/card_back.png');
    const TOUCH4_HERO_IDLE = assetUrl('assets/images/minigame4/knight_idle.png');
    const TOUCH4_HERO_RUN = assetUrl('assets/images/minigame4/knight_run.png');
    const TOUCH4_HERO_HURT = assetUrl('assets/images/minigame4/knight_hurt.png');
    const TOUCH4_GAMEOVER_ART = assetUrl('assets/images/minigame4/gameover_screen.png');
    const touch4Meta = { slot, isBoss:false };
    stage.style.setProperty('--touch4-bg', `url("${bgForMeta(touch4Meta)}")`);
    applyStagePopup(intro, touch4Meta);
    applyStagePopup(result, touch4Meta);
    applyStagePopup(menu, touch4Meta);

    const TOTAL_ROUNDS = 3;
    const SHOW_MS = 5000;
    const SWAP_COUNTS = [5, 6, 7];
    const BASE_SWAP_MS = 920;
    const FLY_MS = 680;

    const softRounds = [
      { type:'soft', label:'weiches Kissen', img:assetUrl('assets/images/minigame4/soft_pillow.png') },
      { type:'soft', label:'weiche Wolke', img:assetUrl('assets/images/minigame4/soft_cloud.png') },
      { type:'soft', label:'weicher Teddy', img:assetUrl('assets/images/minigame4/soft_teddy.png') }
    ];
    const sharpCards = [
      { type:'sharp', label:'spitzer Kaktus', img:assetUrl('assets/images/minigame4/sharp_cactus.png') },
      { type:'sharp', label:'stacheliger Igel', img:assetUrl('assets/images/minigame4/sharp_hedgehog.png') },
      { type:'sharp', label:'spitze Reißzwecke', img:assetUrl('assets/images/minigame4/sharp_pin.png') },
      { type:'sharp', label:'spitzer Nagel', img:assetUrl('assets/images/minigame4/sharp_nail.png') },
      { type:'sharp', label:'spitzer Bleistift', img:assetUrl('assets/images/minigame4/sharp_pencil.png') },
      { type:'sharp', label:'Rose mit Dornen', img:assetUrl('assets/images/minigame4/sharp_rose.png') },
      { type:'sharp', label:'spitze Kristalle', img:assetUrl('assets/images/minigame4/sharp_crystal.png') },
      { type:'sharp', label:'stachelige Kugel', img:assetUrl('assets/images/minigame4/sharp_spikeball.png') }
    ];

    let cards = [];
    let bridgeCards = [];
    let roundIndex = 0;
    let phase = 'intro';
    let face = 'front';
    let timers = [];
    let countdownInterval = null;
    let heroWalkInterval = null;
    let heroFrame = 0;
    let finished = false;
    let selected = false;

    function schedule(fn, ms) {
      const id = window.setTimeout(fn, ms);
      timers.push(id);
      return id;
    }
    function clearTimers() {
      timers.forEach(id => window.clearTimeout(id));
      timers = [];
      if (countdownInterval) {
        window.clearInterval(countdownInterval);
        countdownInterval = null;
      }
      if (heroWalkInterval) {
        window.clearInterval(heroWalkInterval);
        heroWalkInterval = null;
      }
    }
    function shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }
    function setMessage(text, kind='') {
      if (!messageEl) return;
      messageEl.textContent = text;
      messageEl.className = `touch4-v60-message ${kind}`;
    }
    function updateScore() {
      if (scoreEl) scoreEl.textContent = '';
    }
    function setHeroSprite(src) {
      if (hero) hero.src = src;
    }
    function setHeroPose(state = 'idle') {
      if (!hero) return;
      if (state === 'hurt') {
        setHeroSprite(TOUCH4_HERO_HURT);
        return;
      }
      if (state === 'run') {
        setHeroSprite(heroFrame % 2 === 0 ? TOUCH4_HERO_IDLE : TOUCH4_HERO_RUN);
        return;
      }
      setHeroSprite(TOUCH4_HERO_IDLE);
    }
    function startHeroWalkCycle() {
      if (!hero) return;
      if (heroWalkInterval) window.clearInterval(heroWalkInterval);
      heroFrame = 0;
      hero.classList.add('walking');
      setHeroPose('run');
      heroWalkInterval = window.setInterval(() => {
        heroFrame += 1;
        setHeroPose('run');
      }, 400);
    }
    function stopHeroWalkCycle(endPose = 'idle') {
      if (heroWalkInterval) {
        window.clearInterval(heroWalkInterval);
        heroWalkInterval = null;
      }
      if (hero) hero.classList.remove('walking');
      setHeroPose(endPose);
    }
    function hideCountdown() {
      if (!countdownEl) return;
      if (countdownInterval) {
        window.clearInterval(countdownInterval);
        countdownInterval = null;
      }
      countdownEl.classList.add('hidden');
      if (countdownNumEl) countdownNumEl.textContent = '';
    }
    function startCountdown(seconds = 5) {
      if (!countdownEl) return;
      if (countdownInterval) {
        window.clearInterval(countdownInterval);
        countdownInterval = null;
      }
      let remaining = seconds;
      countdownEl.classList.remove('hidden');
      const tick = () => {
        const safe = Math.max(0, remaining);
        if (countdownNumEl) countdownNumEl.textContent = String(safe);
        if (safe <= 0) {
          hideCountdown();
          return;
        }
        remaining -= 1;
      };
      tick();
      countdownInterval = window.setInterval(tick, 1000);
    }

    function buildCardsForRound() {
      const soft = { ...softRounds[roundIndex], id:`soft-${roundIndex}-${Date.now()}` };
      const sharp = sharpCards.map((item, i) => ({ ...item, id:`sharp-${roundIndex}-${i}-${Date.now()}` }));
      cards = shuffleArray([soft, ...sharp]);
      face = 'front';
      selected = false;
    }
    function cardInner(card, showFront=true) {
      if (!showFront) return `<img class="touch4-v60-card-back-img" src="${TOUCH4_CARD_BACK}" alt="Kartenrückseite">`;
      return `<img class="touch4-v60-card-img" src="${card.img}" alt="${card.label}">`;
    }
    function renderGrid() {
      const selectable = phase === 'choice';
      grid.innerHTML = cards.map((card, index) => {
        const isFront = face === 'front';
        const state = isFront ? 'front' : 'back';
        const softMark = isFront && phase === 'show' && card.type === 'soft' ? ' soft-target' : '';
        return `<button class="touch4-v60-card ${state}${softMark}" type="button" data-index="${index}" ${selectable ? '' : 'disabled'} aria-label="${isFront ? card.label : 'verdeckte Karte'}">
          ${cardInner(card, isFront)}
        </button>`;
      }).join('');
      grid.querySelectorAll('.touch4-v60-card').forEach(btn => {
        btn.addEventListener('click', () => chooseCard(Number(btn.dataset.index)));
      });
    }
    function renderBridge(revealIndex = -1) {
      bridge.innerHTML = '';
      for (let i = 0; i < TOTAL_ROUNDS; i += 1) {
        const card = bridgeCards[i];
        const slotEl = document.createElement('div');
        slotEl.className = 'touch4-v60-bridge-slot';
        slotEl.dataset.slot = String(i);
        if (!card) {
          slotEl.classList.add('empty');
        } else if (i <= revealIndex) {
          slotEl.classList.add('revealed', card.type);
          slotEl.innerHTML = cardInner(card, true);
        } else {
          slotEl.classList.add('back');
          slotEl.innerHTML = cardInner(card, false);
        }
        bridge.appendChild(slotEl);
      }
    }
    function neighborsOf(i) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      const neighbors = [];
      if (col > 0) neighbors.push(i - 1);
      if (col < 2) neighbors.push(i + 1);
      if (row > 0) neighbors.push(i - 3);
      if (row < 2) neighbors.push(i + 3);
      return neighbors;
    }
    function adjacentPairFor(kind = 'any') {
      const all = Array.from({ length: 9 }, (_, i) => i);
      const candidates = [];
      all.forEach(i => {
        neighborsOf(i).forEach(j => {
          if (j < i) return;
          const a = cards[i];
          const b = cards[j];
          if (!a || !b) return;
          if (kind === 'soft' && a.type !== 'soft' && b.type !== 'soft') return;
          if (kind === 'sharp' && (a.type !== 'sharp' || b.type !== 'sharp')) return;
          candidates.push([i, j]);
        });
      });
      if (!candidates.length && kind !== 'any') return adjacentPairFor('any');
      return candidates[Math.floor(Math.random() * candidates.length)] || [0, 1];
    }
    function makeMixPlan() {
      const total = SWAP_COUNTS[roundIndex] || 5;
      const plan = [
        ...Array(Math.min(3, total)).fill('soft'),
        ...Array(Math.max(0, total - 3)).fill('sharp')
      ];
      return shuffleArray(plan);
    }
    function currentSwapMs() {
      return Math.round(BASE_SWAP_MS * Math.pow(0.9, roundIndex));
    }
    function animateSwap(i, j, done) {
      const cells = grid.querySelectorAll('.touch4-v60-card');
      const a = cells[i];
      const b = cells[j];
      if (!a || !b) { done(); return; }
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      const dx = br.left - ar.left;
      const dy = br.top - ar.top;
      a.style.setProperty('--swap-x', `${dx}px`);
      a.style.setProperty('--swap-y', `${dy}px`);
      b.style.setProperty('--swap-x', `${-dx}px`);
      b.style.setProperty('--swap-y', `${-dy}px`);
      a.classList.add('swap-highlight', 'swap-move');
      b.classList.add('swap-highlight', 'swap-move');
      playSound('flip');
      schedule(() => {
        [cards[i], cards[j]] = [cards[j], cards[i]];
        renderGrid();
        done();
      }, 620);
    }
    function mixCards(step = 0, plan = makeMixPlan()) {
      if (finished || phase !== 'mix') return;
      if (step >= plan.length) {
        phase = 'choice';
        face = 'back';
        renderGrid();
        setMessage('', 'good');
        return;
      }
      setMessage('');
      const [i, j] = adjacentPairFor(plan[step]);
      const swapMs = currentSwapMs();
      animateSwap(i, j, () => schedule(() => mixCards(step + 1, plan), Math.max(120, swapMs - 620)));
    }
    function beginRound() {
      if (finished || roundIndex >= TOTAL_ROUNDS) return;
      phase = 'show';
      grid.classList.remove('turning-to-back', 'chests-arrive');
      buildCardsForRound();
      renderGrid();
      renderBridge();
      updateScore();
      startCountdown(5);
      const softName = ['Kissen', 'Wolke', 'Teddy'][roundIndex];
      setMessage('');
      schedule(() => {
        if (finished) return;
        hideCountdown();
        grid.classList.add('turning-to-back');
        schedule(() => {
          if (finished) return;
          phase = 'mix';
          face = 'back';
          grid.classList.remove('turning-to-back');
          grid.classList.add('chests-arrive');
          renderGrid();
          schedule(() => {
            grid.classList.remove('chests-arrive');
            mixCards(0);
          }, 420);
        }, 420);
      }, SHOW_MS);
    }
    function animateToBridge(cell, card, done) {
      const slots = bridge.querySelectorAll('.touch4-v60-bridge-slot');
      const target = slots[bridgeCards.length];
      if (!cell || !target) { done(); return; }
      const start = cell.getBoundingClientRect();
      const end = target.getBoundingClientRect();
      const clone = cell.cloneNode(true);
      clone.classList.add('touch4-v60-flying');
      clone.style.left = `${start.left}px`;
      clone.style.top = `${start.top}px`;
      clone.style.width = `${start.width}px`;
      clone.style.height = `${start.height}px`;
      document.body.appendChild(clone);
      cell.classList.add('picked');
      requestAnimationFrame(() => {
        clone.style.transform = `translate(${end.left - start.left}px, ${end.top - start.top}px) scale(${end.width / start.width})`;
      });
      schedule(() => {
        clone.remove();
        done();
      }, FLY_MS);
    }
    function chooseCard(index) {
      if (finished || phase !== 'choice' || selected) return;
      const card = cards[index];
      if (!card) return;
      selected = true;
      hideCountdown();
      phase = 'selected';
      setMessage('');
      playSound('collect');
      const cell = grid.querySelector(`.touch4-v60-card[data-index="${index}"]`);
      animateToBridge(cell, card, () => {
        bridgeCards.push({ ...card });
        updateScore();
        renderBridge();
        roundIndex += 1;
        if (bridgeCards.length >= TOTAL_ROUNDS) {
          setMessage('');
          show(continueBtn);
        } else {
          setMessage('');
          schedule(beginRound, 900);
        }
      });
    }
    function heroMoveTo(targetX, done, duration = 740) {
      if (!hero) { done(); return; }
      startHeroWalkCycle();
      hero.style.left = `${targetX}px`;
      schedule(() => {
        stopHeroWalkCycle('idle');
        done();
      }, duration);
    }
    function continuePath() {
      if (finished || phase === 'walking') return;
      phase = 'walking';
      hide(continueBtn);
      setMessage('');
      const pitScene = document.querySelector('.touch4-v60-pit-scene');
      if (!pitScene) return;
      const sceneRect = pitScene.getBoundingClientRect();
      const gapRect = document.querySelector('.touch4-v60-gap')?.getBoundingClientRect();
      const edgeX = gapRect ? Math.max(0, gapRect.left - sceneRect.left - 42) : sceneRect.width * 0.24;

      function revealAll(index = 0) {
        if (index >= bridgeCards.length) {
          schedule(() => walkAcross(0), 360);
          return;
        }
        renderBridge(index);
        playSound('flip');
        schedule(() => revealAll(index + 1), 520);
      }

      function walkAcross(i = 0) {
        const currentSlots = Array.from(bridge.querySelectorAll('.touch4-v60-bridge-slot'));
        if (i >= bridgeCards.length) {
          const exitX = sceneRect.width + 28;
          heroMoveTo(exitX, () => showResult(true));
          return;
        }
        const slotRect = currentSlots[i]?.getBoundingClientRect();
        const x = slotRect ? (slotRect.left - sceneRect.left + slotRect.width * 0.5 - 30) : sceneRect.width * 0.5;
        heroMoveTo(x, () => {
          const card = bridgeCards[i];
          if (card.type === 'sharp') {
            setMessage('', 'bad');
            playSound('hurt');
            stopHeroWalkCycle('hurt');
            schedule(() => showResult(false), 2000);
          } else {
            i += 1;
            schedule(() => walkAcross(i), 220);
          }
        });
      }

      heroMoveTo(edgeX, () => schedule(() => revealAll(0), 260));
    }
    function showResult(won) {
      if (finished) return;
      finished = true;
      clearTimers();
      stopSound('minigame_background');
      if (resultImage) {
        resultImage.src = won ? ASSETS.text.gewonnen : ASSETS.text.verloren;
        resultImage.alt = won ? 'Gewonnen' : 'Verloren';
        show(resultImage);
      }
      if (resultDetail) {
        if (won) {
          hide(resultDetail);
          resultDetail.removeAttribute('src');
          resultDetail.alt = '';
        } else {
          resultDetail.src = TOUCH4_GAMEOVER_ART;
          resultDetail.alt = `${getHeroName()} wurde kindgerecht von spitzen Gegenständen gepikst`;
          show(resultDetail);
        }
      }
      resultTitle.textContent = won ? 'Gewonnen' : 'Verloren';
      resultText.textContent = won
        ? `Alle drei Brückenkarten waren weich. ${getHeroName()} konnte sicher über die Grube laufen.`
        : `Mindestens eine Brückenkarte war spitz. ${getHeroName()} wurde gepikst – das ist für die Haut ein Warnsignal.`;
      playSound(won ? 'win' : 'lose');
      retryBtn.textContent = won ? 'Zurück zum Spielfeld' : 'Neuer Versuch';
      retryBtn.onclick = () => {
        if (won) {
          completeMinigameSlot(slot);
          location.href = pageUrl('index.html');
        } else location.reload();
      };
      show(boardBtn);
      show(result);
    }

    setHeroPose('idle');

    $('touch4StartBtn')?.addEventListener('click', () => { hide(intro); beginRound(); });
    introBoardBtn?.addEventListener('click', () => { stopSound('minigame_background'); location.href = pageUrl('index.html'); });
    $('touch4SettingsBtn')?.addEventListener('click', () => show(menu));
    $('touch4CloseMenuBtn')?.addEventListener('click', () => hide(menu));
    $('touch4MenuBoardBtn')?.addEventListener('click', () => { stopSound('minigame_background'); location.href = pageUrl('index.html'); });
    boardBtn?.addEventListener('click', () => { stopSound('minigame_background'); location.href = pageUrl('index.html'); });
    continueBtn?.addEventListener('click', continuePath);

    updateScore();
    renderBridge();
    show(intro);
  }


  function initCodes() {
    addSpeaker(); $('printCodesBtn')?.addEventListener('click', () => print());
    const grid=$('qrGrid'); if (!grid) return;
    grid.innerHTML = [...Object.values(SENSES), BOSS].map(s=>`<article class="qr-card"><img src="${assetUrl(`assets/images/qr/qr_${s.id}.png`)}" alt="QR-Code ${esc(s.label)}"><h2>${esc(s.label)}</h2><p>${esc(s.code)}</p></article>`).join('');
  }

  function initMagicCastle() {
    addSpeaker();
    const root = $('magicCastleModal') || document.body;
    const alreadyBound = root?.dataset?.magicCastleReady === '1';
    const hero = $('magicCastleHero');
    if (hero) hero.alt = `${getHeroName()} auf der Brücke`;
    const keyBar = $('magicCastleKeyBar');
    let magicUnlockingId = null;
    const renderKeyBar = state => {
      if (!keyBar) return;
      keyBar.innerHTML = KEY_ORDER
        .filter(id => state.keysFound?.[id] && !state.removedLocks?.[id])
        .map(id => `<button class="magic-castle-key-chip" type="button" data-key-id="${id}" aria-label="${esc(BIOME_BY_SENSE[id].label)}-Schlüssel verwenden"><img src="${assetUrl(BIOME_BY_SENSE[id].key)}" alt="${esc(BIOME_BY_SENSE[id].label + '-Schlüssel')}"></button>`)
        .join('');
      keyBar.querySelectorAll('.magic-castle-key-chip').forEach(chip => {
        chip.addEventListener('click', () => document.querySelector(`.magic-castle-lock[data-lock-id="${chip.dataset.keyId}"]`)?.click());
      });
    };
    const renderLocks = () => {
      const state = getState();
      renderKeyBar(state);
      document.querySelectorAll('.magic-castle-lock').forEach(lock => {
        const id = lock.dataset.lockId;
        const opened = Boolean(state.removedLocks?.[id]);
        const unlockable = Boolean(state.keysFound?.[id]);
        lock.classList.toggle('is-opened', opened);
        lock.classList.toggle('is-unlockable', unlockable && !opened);
        lock.classList.toggle('is-locked', !unlockable && !opened);
        lock.classList.remove('is-targeted');
        lock.disabled = opened;
      });
    };
    window.__refreshMagicCastleLocks = renderLocks;
    if (alreadyBound) {
      renderLocks();
      return;
    }
    if (root?.dataset) root.dataset.magicCastleReady = '1';
    $('magicCastlePopupBack')?.addEventListener('click', hideMagicCastleModal);
    $('magicCastleModal')?.addEventListener('click', ev => {
      if (ev.target === $('magicCastleModal')) hideMagicCastleModal();
    });

    const flyKeyToLock = (id, lock) => {
      if (magicUnlockingId) return;
      const state = getState();
      if (state.removedLocks?.[id] || !state.keysFound?.[id]) return;
      magicUnlockingId = id;
      const chip = document.querySelector(`.magic-castle-key-chip[data-key-id="${id}"]`);
      const heroRect = hero?.getBoundingClientRect?.();
      const lockRect = lock.getBoundingClientRect();
      const start = heroRect
        ? { x: heroRect.left + heroRect.width * .62, y: heroRect.top + heroRect.height * .48 }
        : { x: lockRect.left - 70, y: lockRect.top + lockRect.height * .8 };
      const end = { x: lockRect.left + lockRect.width * .5, y: lockRect.top + lockRect.height * .5 };
      const control = { x:(start.x + end.x) / 2, y: Math.min(start.y, end.y) - Math.max(54, Math.abs(end.x - start.x) * .18) };
      const flyer = document.createElement('div');
      flyer.className = 'magic-castle-flying-key';
      flyer.innerHTML = `<img src="${assetUrl(BIOME_BY_SENSE[id].key)}" alt="">`;
      flyer.style.left = `${start.x}px`;
      flyer.style.top = `${start.y}px`;
      flyer.style.width = `${Math.max(46, Math.min(74, lockRect.width * .82))}px`;
      document.body.appendChild(flyer);
      chip?.classList.add('is-launching');
      lock.classList.add('is-targeted');
      playSound('collect');
      const duration = 900;
      const started = performance.now();
      const ease = t => 1 - Math.pow(1 - t, 3);
      const tick = now => {
        const raw = Math.min(1, (now - started) / duration);
        const t = ease(raw);
        const omt = 1 - t;
        const x = omt * omt * start.x + 2 * omt * t * control.x + t * t * end.x;
        const y = omt * omt * start.y + 2 * omt * t * control.y + t * t * end.y;
        flyer.style.left = `${x}px`;
        flyer.style.top = `${y}px`;
        flyer.style.transform = `translate(-50%,-50%) rotate(${Math.round(t * 620)}deg) scale(${(1 - t * .18).toFixed(3)})`;
        if (raw < 1) {
          requestAnimationFrame(tick);
          return;
        }
        flyer.classList.add('is-burst');
        lock.classList.add('is-opening');
        playSound('levelunlocked');
        window.setTimeout(() => {
          flyer.remove();
          const next = getState();
          next.removedLocks[id] = true;
          setState(next);
          magicUnlockingId = null;
          renderLocks();
        }, 280);
      };
      requestAnimationFrame(tick);
    };
    document.querySelectorAll('.magic-castle-lock').forEach(lock => {
      lock.addEventListener('click', () => {
        const id = lock.dataset.lockId;
        const state = getState();
        if (state.removedLocks?.[id] || magicUnlockingId) return;
        if (!state.keysFound?.[id]) {
          triggerLockShake(lock);
          return;
        }
        flyKeyToLock(id, lock);
      });
    });
    renderLocks();
  }



  /* === 2026-06-06 v19 rebuilt board island slider === */
  const JOURNEY_BOARD_BG = assetUrl('assets/images/board/universe_bg.png');
  const JOURNEY_ISLAND_IMAGES = {
    start: assetUrl('assets/images/board/start_island.png'),
    riechen: assetUrl('assets/images/board/grass_island.png'),
    hoeren: assetUrl('assets/images/board/desert_island.png'),
    sehen: assetUrl('assets/images/board/cloud_island.png'),
    schmecken: assetUrl('assets/images/board/lava_island.png'),
    fuehlen: assetUrl('assets/images/board/ice_island.png'),
    boss: assetUrl('assets/images/board/final_island.png')
  };
  const JOURNEY_LABELS = {
    start:'Marktplatz des Königreichs',
    riechen:'Grasinsel',
    hoeren:'Wüsteninsel',
    sehen:'Wolkeninsel',
    schmecken:'Lavainsel',
    fuehlen:'Eisinsel',
    boss:'Magieschloss'
  };
  const ISLAND_STORIES = {
    riechen: 'Ein grüner Wind trägt den Duft von Moos, Blumen und frischem Gras heran. Auf der Grasinsel wartet der erste Hinweis zwischen Bäumen und alten Steinen.',
    hoeren: 'Aus der Wüste weht ein leises Echo über Sand und Ruinen. Zwischen heißen Steinen muss genau hingehört werden, um den nächsten Schlüssel zu finden.',
    sehen: 'Über den Wolken glitzern helle Pfade und leuchtende Kristalle. Wer genau hinsieht, erkennt dort die Spur des Magiers.',
    schmecken: 'Auf der Lavainsel brodelt die Hitze. Zwischen Feuer, Rauch und glühendem Gestein verbirgt sich ein weiterer Hinweis.',
    fuehlen: 'Die Eisinsel knistert vor Kälte. Glatte Kristalle, Schnee und frostige Wege prüfen, ob {heroName} mutig weitergeht.',
    boss: 'Alle fünf Inseln sind geschafft. Der Weg zum Magieschloss liegt offen, und hinter dem Tor wartet die letzte Prüfung.',
    start: 'Auf dem Marktplatz beginnt die Reise. Dort können neue Steckbriefe gescannt werden, um weitere Inseln freizuschalten.'
  };
  let boardSlideTransition = null;
  let boardSlideTimer = 0;

let boardDockSelection = null;
const BOARD_UI_ASSETS = {
  topBar: assetUrl('assets/images/custom_ui/name_board.png'),
  options: assetUrl('assets/images/custom_ui/options_shield.png'),
  qr: assetUrl('assets/images/custom_ui/qr_board.png'),
  bottomGrass: assetUrl('assets/images/custom_ui/down_grass.png'),
  treasure: assetUrl('assets/images/custom_ui/treasure_chest.png')
};
const BOARD_DOCK_LABELS = {
  options: 'Optionen',
  qr: 'QR-Board',
  treasure: 'Schatz'
};
const BOARD_KEY_SUMMARY = [
  { id:'riechen', title:'Grasinsel', image: assetUrl('assets/images/ui/key_grass.png') },
  { id:'hoeren', title:'Wüsteninsel', image: assetUrl('assets/images/ui/key_sand.png') },
  { id:'fuehlen', title:'Eisinsel', image: assetUrl('assets/images/ui/key_ice.png') },
  { id:'schmecken', title:'Lavainsel', image: assetUrl('assets/images/ui/key_lava.png') },
  { id:'sehen', title:'Himmelsinsel', image: assetUrl('assets/images/ui/key_cloud.png') }
];

  function blankFlags() { return { sehen:false, hoeren:false, riechen:false, schmecken:false, fuehlen:false, boss:false }; }
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
      boardCurrentNode:'start',
      seenIslandStories:blankFlags()
    };
  }
  function sanitizeJourneyOrder(rawOrder = [], state = getStateSafe()) {
    const out = [];
    const valid = new Set(Object.values(state.slots || {}).filter(id => KEY_ORDER.includes(id)));
    rawOrder.forEach(id => {
      if (KEY_ORDER.includes(id) && valid.has(id) && !out.includes(id)) out.push(id);
    });
    (state.slots || []).forEach(id => {
      if (KEY_ORDER.includes(id) && !out.includes(id)) out.push(id);
    });
    if (state.activeBiome && KEY_ORDER.includes(state.activeBiome) && !out.includes(state.activeBiome)) out.push(state.activeBiome);
    return out.slice(0, 5);
  }
  function finalBridgeUnlocked(state = getState()) {
    return KEY_ORDER.every(id => biomeIsComplete(id, state));
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
    const inferredReveal = state.completed.every(Boolean) ? LEVEL_COUNT - 1 : Math.max(0, Math.min(LEVEL_COUNT - 1, state.completed.findIndex(v => !v)));
    state.revealedMax = Number.isInteger(state.revealedMax) ? Math.max(0, Math.min(LEVEL_COUNT - 1, state.revealedMax)) : inferredReveal;
    if (state.revealedMax < inferredReveal) state.revealedMax = inferredReveal;
    state.keysFound = { ...blankFlags(), ...(raw?.keysFound || {}) };
    state.removedLocks = { ...blankFlags(), ...(raw?.removedLocks || {}) };
    state.seenIslandStories = { ...blankFlags(), ...(raw?.seenIslandStories || {}) };
    const keySlots = { sehen:0, hoeren:2, riechen:4, schmecken:6, fuehlen:8 };
    Object.entries(keySlots).forEach(([id, slot]) => { if (state.completed[slot]) state.keysFound[id] = true; });
    if (!state.activeBiome || !BIOME_LEVEL_PLAN[state.activeBiome] || BIOME_LEVEL_PLAN[state.activeBiome].every(slot => state.completed[slot])) state.activeBiome = null;
    if (!state.activeBiome && KEY_ORDER.every(id => state.removedLocks?.[id]) && !state.bossCompleted && !biomeIsComplete('boss', state)) {
      const bossSlot = nextSlotForBiome('boss', state);
      if (Number.isInteger(bossSlot)) { state.activeBiome = 'boss'; state.slots[bossSlot] = 'boss'; }
    }
    state.journeyOrder = sanitizeJourneyOrder(raw?.journeyOrder || [], state);
    const nodes = ['start', ...state.journeyOrder, ...(finalBridgeUnlocked(state) ? ['boss'] : [])];
    state.boardCurrentNode = nodes.includes(raw?.boardCurrentNode) ? raw.boardCurrentNode : 'start';
    return state;
  }
  function getStateSafe() {
    try { return JSON.parse(localStorage.getItem(STORE)) || defaultState(); } catch (_) { return defaultState(); }
  }
  function getState() { try { return normalizeState(JSON.parse(localStorage.getItem(STORE)) || null); } catch (_) { return defaultState(); } }
  function setState(state) { localStorage.setItem(STORE, JSON.stringify(normalizeState(state))); }

  function boardSlotForSense(id, state = getState()) { return state.slots.findIndex(s => s === id); }
  function boardNodeForSenseId(id, state = getState()) {
    if (id === 'boss') return finalBridgeUnlocked(state) ? 'boss' : null;
    const index = state.journeyOrder.indexOf(id);
    return index >= 0 ? id : null;
  }
  function getCarouselNodes(state = getState()) {
    const nodes = ['start', ...state.journeyOrder];
    if (finalBridgeUnlocked(state)) nodes.push('boss');
    return nodes;
  }
  function currentBoardNode(state = getState()) {
    const nodes = getCarouselNodes(state);
    return nodes.includes(state.boardCurrentNode) ? state.boardCurrentNode : 'start';
  }
  function getCarouselEntry(node, state = getState()) {
    if (node === 'start') return { node:'start', type:'start', title:JOURNEY_LABELS.start, image:JOURNEY_ISLAND_IMAGES.start };
    if (node === 'boss') return { node:'boss', type:'boss', title:JOURNEY_LABELS.boss, image:JOURNEY_ISLAND_IMAGES.boss };
    if (KEY_ORDER.includes(node)) return { node, type:node, title:JOURNEY_LABELS[node] || BIOME_BY_SENSE[node]?.label || node, image:JOURNEY_ISLAND_IMAGES[node] };
    return null;
  }
  function boardPointForSlot(index, state = getState()) { return { x:50, y:50 }; }
  function boardScreenIsVisible() { const s = $('boardScreen'); return Boolean(s && !s.classList.contains('hidden')); }

  function clearBoardSlideTimer() {
    if (boardSlideTimer) window.clearTimeout(boardSlideTimer);
    boardSlideTimer = 0;
  }
  function setCurrentBoardNode(node) {
    const state = getState();
    state.boardCurrentNode = node;
    setState(state);
  }
  function moveCarousel(delta) {
    if (boardSlideTransition || !delta) return;
    const state = getState();
    const nodes = getCarouselNodes(state);
    const fromNode = currentBoardNode(state);
    const fromIndex = Math.max(0, nodes.indexOf(fromNode));
    const toIndex = Math.max(0, Math.min(nodes.length - 1, fromIndex + delta));
    if (toIndex === fromIndex) return;
    const toNode = nodes[toIndex];
    boardSlideTransition = { from:fromNode, to:toNode, direction:delta > 0 ? 1 : -1 };
    renderBoard();
    clearBoardSlideTimer();
    boardSlideTimer = window.setTimeout(() => {
      setCurrentBoardNode(toNode);
      boardSlideTransition = null;
      renderBoard();
      window.setTimeout(() => maybeShowIslandStoryForNode(toNode), 260);
    }, 1120);
  }
  function jumpCarouselToLatest() {
    if (boardSlideTransition) return;
    const state = getState();
    const nodes = getCarouselNodes(state);
    const fromNode = currentBoardNode(state);
    const toNode = nodes[nodes.length - 1];
    if (!toNode || toNode === fromNode) return;
    boardSlideTransition = { from:fromNode, to:toNode, direction:1 };
    renderBoard();
    clearBoardSlideTimer();
    boardSlideTimer = window.setTimeout(() => {
      setCurrentBoardNode(toNode);
      boardSlideTransition = null;
      renderBoard();
      window.setTimeout(() => maybeShowIslandStoryForNode(toNode), 260);
    }, 1120);
  }

  function ensureBoardShellAssets() {
    const img = $('boardImage');
    if (img) {
      img.src = JOURNEY_BOARD_BG;
      img.alt = 'Himmel über dem Königreich der Sinne';
      img.decoding = 'async';
    }
    hide($('magicCastleBtn'));
  }
  function removeBoardViewportBars() {
    document.querySelectorAll('.board-world-topbar, .board-market-bottombar').forEach(el => el.remove());
    document.body.classList.remove('board-ui-active');
  }
  function updateBoardStatusText(status, state = getState()) {
    if (!status) return;
    const nodes = getCarouselNodes(state);
    const current = currentBoardNode(state);
    const idx = Math.max(0, nodes.indexOf(current));
    status.textContent = `${idx + 1} / ${nodes.length}`;
  }
  function createIslandElement(entry, role) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'board-carousel-island';
    btn.dataset.node = String(entry.node);
    btn.dataset.type = String(entry.type);
    btn.dataset.role = String(role || 'current');
    if (role === 'current') btn.classList.add('is-active');
    btn.innerHTML = `<img src="${entry.image}" alt="${esc(entry.title)}">`;
    btn.addEventListener('click', ev => {
      ev.preventDefault();
      ev.stopPropagation();
      if (!boardSlideTransition) handleCarouselIslandClick(entry);
    });
    return btn;
  }

function createBoardStageHero() {
  const hero = document.createElement('div');
  hero.className = 'board-stage-hero';
  hero.setAttribute('aria-hidden', 'true');
  hero.innerHTML = `<img class="hero-token" src="${ASSETS.hero}" alt="">`;
  return hero;
}
function setBoardDockSelection(kind = null) {
  boardDockSelection = kind;
  document.querySelectorAll('.board-dock-item').forEach(btn => {
    btn.classList.toggle('is-selected', btn.dataset.kind === kind);
    btn.setAttribute('aria-pressed', btn.dataset.kind === kind ? 'true' : 'false');
  });
}
function ensureBoardOverlayModals() {
  let treasureModal = $('treasureModal');
  if (!treasureModal) {
    treasureModal = document.createElement('div');
    treasureModal.id = 'treasureModal';
    treasureModal.className = 'modal hidden';
    treasureModal.innerHTML = `
      <div class="modal-card board-popup-card" role="dialog" aria-modal="true" aria-labelledby="treasureTitle">
        <div class="board-popup-head">
          <div>
            <span class="kicker">Schatzkammer</span>
            <h2 id="treasureTitle">Gefundene Schlüssel</h2>
          </div>
          <button type="button" class="round-btn" data-close-treasure aria-label="Schließen">×</button>
        </div>
        <p class="board-popup-copy">Hier siehst du, welche Schlüssel bereits gesammelt wurden.</p>
        <div id="treasureKeyGrid" class="board-key-grid"></div>
      </div>`;
    treasureModal.addEventListener('click', ev => { if (ev.target === treasureModal) hide(treasureModal); });
    treasureModal.querySelector('[data-close-treasure]')?.addEventListener('click', () => hide(treasureModal));
    document.body.appendChild(treasureModal);
  }
  let optionsModal = $('boardOptionsModal');
  if (!optionsModal) {
    optionsModal = document.createElement('div');
    optionsModal.id = 'boardOptionsModal';
    optionsModal.className = 'modal hidden';
    optionsModal.innerHTML = `
      <div class="modal-card board-popup-card" role="dialog" aria-modal="true" aria-labelledby="boardOptionsTitle">
        <div class="board-popup-head">
          <div>
            <span class="kicker">Optionen</span>
            <h2 id="boardOptionsTitle">Einstellungen & Aktionen</h2>
          </div>
          <button type="button" class="round-btn" data-close-options aria-label="Schließen">×</button>
        </div>
        <p class="board-popup-copy">Hier findest du die wichtigsten Einstellungen für das Spielbrett.</p>
        <div class="board-option-actions">
          <button id="boardOptionsSoundBtn" class="game-btn secondary" type="button">Ton umschalten</button>
          <a class="game-btn secondary" href="./codes.html">QR-Codes anzeigen</a>
          <button id="boardOptionsUnlockBtn" class="game-btn secondary" type="button">Alle Schlüssel freischalten</button>
          <button id="boardOptionsResetBtn" class="game-btn danger" type="button">Spielbrett zurücksetzen</button>
        </div>
      </div>`;
    optionsModal.addEventListener('click', ev => { if (ev.target === optionsModal) hide(optionsModal); });
    optionsModal.querySelector('[data-close-options]')?.addEventListener('click', () => hide(optionsModal));
    optionsModal.querySelector('#boardOptionsSoundBtn')?.addEventListener('click', () => $('globalSpeakerBtn')?.click());
    optionsModal.querySelector('#boardOptionsUnlockBtn')?.addEventListener('click', () => { unlockAllLevels(); hide(optionsModal); });
    optionsModal.querySelector('#boardOptionsResetBtn')?.addEventListener('click', () => {
      if (confirm('Spielbrett wirklich zurücksetzen?')) {
        localStorage.removeItem(STORE);
        localStorage.removeItem(RETURN_STORE);
        location.href = pageUrl('index.html');
      }
    });
    document.body.appendChild(optionsModal);
  }
  return { treasureModal, optionsModal };
}
function showTreasureModal() {
  const { treasureModal } = ensureBoardOverlayModals();
  const grid = $('treasureKeyGrid');
  if (grid) {
    const state = getState();
    grid.innerHTML = '';
    BOARD_KEY_SUMMARY.forEach(item => {
      const found = Boolean(state.keysFound?.[item.id] || biomeIsComplete(item.id, state));
      const card = document.createElement('div');
      card.className = `board-key-card ${found ? 'is-found' : 'is-missing'}`;
      card.innerHTML = `
        <img src="${item.image}" alt="${esc(item.title)} Schlüssel">
        <h3>${esc(item.title)}</h3>
        <p>${found ? 'Schlüssel gefunden' : 'Noch nicht gefunden'}</p>`;
      grid.appendChild(card);
    });
  }
  show(treasureModal);
}
function showBoardOptionsModal() {
  const { optionsModal } = ensureBoardOverlayModals();
  const soundBtn = $('boardOptionsSoundBtn');
  if (soundBtn) soundBtn.textContent = muted ? 'Ton einschalten' : 'Ton ausschalten';
  show(optionsModal);
}
function createBoardTopBar(title) {
  const top = document.createElement('div');
  top.className = 'board-world-topbar';
  top.innerHTML = `
    <img class="board-topbar-art" src="${BOARD_UI_ASSETS.topBar}" alt="Namensschild">
    <div class="board-world-topbar-text">${esc(title || 'Königreich der Sinne')}</div>`;
  return top;
}
function createDockButton(kind, imgSrc, label, onClick) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'board-dock-item';
  btn.dataset.kind = kind;
  btn.dataset.label = label;
  btn.setAttribute('aria-label', label);
  btn.setAttribute('aria-pressed', boardDockSelection === kind ? 'true' : 'false');
  btn.innerHTML = `<img src="${imgSrc}" alt="${esc(label)}"><span class="board-dock-label">${esc(label)}</span>`;
  btn.addEventListener('click', ev => {
    ev.preventDefault();
    ev.stopPropagation();
    setBoardDockSelection(kind);
    onClick?.();
  });
  return btn;
}
function createBoardBottomDock() {
  const bottom = document.createElement('div');
  bottom.className = 'board-market-bottombar';
  const items = document.createElement('div');
  items.className = 'board-dock-items';
  items.appendChild(createDockButton('options', BOARD_UI_ASSETS.options, BOARD_DOCK_LABELS.options, showBoardOptionsModal));
  items.appendChild(createDockButton('qr', BOARD_UI_ASSETS.qr, BOARD_DOCK_LABELS.qr, () => openScan()));
  items.appendChild(createDockButton('treasure', BOARD_UI_ASSETS.treasure, BOARD_DOCK_LABELS.treasure, showTreasureModal));
  const grass = document.createElement('img');
  grass.className = 'board-bottom-foreground';
  grass.src = BOARD_UI_ASSETS.bottomGrass;
  grass.alt = 'Wiesenleiste';
  bottom.append(items, grass);
  return bottom;
}
function handleCarouselIslandClick(entry) {
  if (!entry) return;
  const state = getState();
  if (entry.type === 'start') { openScan(); return; }
  if (entry.type === 'boss') { onLevelNode(BOSS_SLOT, 'boss'); return; }
  const slot = nextSlotForBiome(entry.type, state);
  if (Number.isInteger(slot)) { onLevelNode(slot, entry.type); return; }
  showVillageScanReminder();
}
function renderBoard() {
  const inner = $('mapInner');
  if (!inner || !boardScreenIsVisible()) return;
  document.body.classList.add('board-ui-active');
  ensureBoardShellAssets();
  document.querySelectorAll('.board-world-topbar, .board-market-bottombar').forEach(el => el.remove());
  inner.replaceChildren();
  const state = getState();
  const nodes = getCarouselNodes(state);
  const current = currentBoardNode(state);
  const currentEntry = getCarouselEntry(current, state) || getCarouselEntry('start', state);
  const currentIndex = Math.max(0, nodes.indexOf(current));

  document.body.appendChild(createBoardTopBar(currentEntry?.title || 'Königreich der Sinne'));

  const status = document.createElement('div');
  status.className = 'board-journey-status board-carousel-status';
  updateBoardStatusText(status, state);
  inner.appendChild(status);

  const stage = document.createElement('div');
  stage.className = 'board-carousel-stage';
  if (boardSlideTransition) {
    stage.classList.add('is-sliding', boardSlideTransition.direction > 0 ? 'slide-next' : 'slide-prev');
    const track = document.createElement('div');
    track.className = 'board-carousel-track';
    const fromEntry = getCarouselEntry(boardSlideTransition.from, state);
    const toEntry = getCarouselEntry(boardSlideTransition.to, state);
    if (fromEntry) track.appendChild(createIslandElement(fromEntry, 'from'));
    if (toEntry) track.appendChild(createIslandElement(toEntry, 'to'));
    stage.appendChild(track);
  } else if (currentEntry) {
    stage.appendChild(createIslandElement(currentEntry, 'current'));
  }
  stage.appendChild(createBoardStageHero());
  inner.appendChild(stage);

  if (currentIndex > 0) {
    const left = document.createElement('button');
    left.type = 'button';
    left.className = 'board-carousel-arrow board-carousel-arrow-left';
    left.textContent = '‹';
    left.setAttribute('aria-label','Vorherige Insel');
    left.addEventListener('click', ev => { ev.preventDefault(); ev.stopPropagation(); moveCarousel(-1); });
    inner.appendChild(left);
  }
  if (currentIndex < nodes.length - 1) {
    const right = document.createElement('button');
    right.type = 'button';
    right.className = 'board-carousel-arrow board-carousel-arrow-right';
    right.textContent = '›';
    right.setAttribute('aria-label','Nächste Insel');
    right.addEventListener('click', ev => { ev.preventDefault(); ev.stopPropagation(); moveCarousel(1); });
    inner.appendChild(right);
    if (nodes.length > 2) {
      const latest = document.createElement('button');
      latest.type = 'button';
      latest.className = 'board-carousel-arrow board-carousel-arrow-latest';
      latest.textContent = '»';
      latest.setAttribute('aria-label','Zur neuesten Insel');
      latest.addEventListener('click', ev => { ev.preventDefault(); ev.stopPropagation(); jumpCarouselToLatest(); });
      inner.appendChild(latest);
    }
  }

  document.body.appendChild(createBoardBottomDock());
  setBoardDockSelection(boardDockSelection);
  renderGuide(state);
}
  function onLevelNode(slot, senseId = null) {
    const state = getState();
    const id = senseId || state.slots?.[slot] || state.activeBiome;
    if (!id) { showVillageScanReminder(); return; }
    const current = currentBoardNode(state);
    if (id !== 'boss' && current !== id) { setCurrentBoardNode(id); renderBoard(); window.setTimeout(() => maybeShowIslandStoryForNode(id), 220); return; }
    if (id === 'boss' && current !== 'boss') { setCurrentBoardNode('boss'); renderBoard(); window.setTimeout(() => maybeShowIslandStoryForNode('boss'), 220); return; }
    const next = nextSlotForBiome(id, state);
    if (Number.isInteger(next)) showEncounter(id, next);
    else showVillageScanReminder();
  }
  function unlockSense(id, { silent=false } = {}) {
    if (!BIOME_LEVEL_PLAN[id]) return false;
    const state = getState();
    if (id === 'boss') {
      if (!finalBridgeUnlocked(state)) return false;
      state.activeBiome = 'boss';
      state.slots[BOSS_SLOT] = 'boss';
      state.boardCurrentNode = 'boss';
      setState(state);
      if (!silent) showIslandUnlockedModal('boss');
      renderBoard();
      return true;
    }
    if (!KEY_ORDER.includes(id)) return false;
    if (!state.journeyOrder.includes(id)) state.journeyOrder.push(id);
    const firstSlot = firstSlotForBiome(id);
    if (Number.isInteger(firstSlot) && !state.slots[firstSlot]) state.slots[firstSlot] = id;
    state.activeBiome = id;
    state.boardCurrentNode = currentBoardNode(state);
    setState(state);
    if (!silent) showIslandUnlockedModal(id);
    renderBoard();
    return true;
  }
  async function animateHeroHome(fromSlot, viaSlot = null) {
    const state = getState();
    if (finalBridgeUnlocked(state) && !state.journeyOrder.includes('boss')) state.boardCurrentNode = currentBoardNode(state);
    setState(state);
    renderBoard();
  }
  function showVillageScanReminder() {
    const modal = ensureIslandUnlockedModal();
    modal.querySelector('[data-island-image]').src = JOURNEY_ISLAND_IMAGES.start;
    modal.querySelector('[data-island-kicker]').textContent = 'Nächster Steckbrief';
    modal.querySelector('[data-island-title]').textContent = 'Zurück zum Marktplatz';
    modal.querySelector('[data-island-text]').textContent = 'Scanne am Marktbrett auf der Startinsel einen neuen Steckbrief, um die nächste Insel freizuschalten.';
    show(modal);
  }
  function ensureIslandUnlockedModal() {
    let modal = $('islandUnlockedModal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'islandUnlockedModal';
    modal.className = 'modal hidden island-unlocked-modal';
    modal.innerHTML = `<div class="modal-card encounter-card island-unlocked-card"><img data-island-image class="character-img" alt="Neue Insel"><div class="encounter-text"><span data-island-kicker class="kicker">Insel</span><h2 data-island-title>Neue Insel freigeschaltet</h2><p data-island-text></p><div class="button-line center"><button class="game-btn primary" type="button" data-island-close>Weiter</button></div></div></div>`;
    modal.querySelector('[data-island-close]').addEventListener('click', () => hide(modal));
    document.body.appendChild(modal);
    return modal;
  }
  function showIslandUnlockedModal(id) {
    const modal = ensureIslandUnlockedModal();
    const image = modal.querySelector('[data-island-image]');
    const kicker = modal.querySelector('[data-island-kicker]');
    const title = modal.querySelector('[data-island-title]');
    const text = modal.querySelector('[data-island-text]');
    const label = JOURNEY_LABELS[id] || BIOME_BY_SENSE[id]?.label || 'Neue Insel';
    image.src = JOURNEY_ISLAND_IMAGES[id] || JOURNEY_ISLAND_IMAGES.start;
    kicker.textContent = id === 'boss' ? 'Finale Insel' : 'Neue Insel freigeschaltet';
    title.textContent = label;
    text.textContent = id === 'boss' ? 'Die finale Insel wurde freigeschaltet. Blättere nach rechts bis zum Magieschloss.' : `Die ${label} wurde freigeschaltet. Nutze den Pfeil rechts, um zur neuen Insel zu reisen.`;
    show(modal);
  }
  function ensureIslandStoryModal() {
    let modal = $('islandStoryModal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'islandStoryModal';
    modal.className = 'modal hidden island-story-modal';
    modal.innerHTML = `<div class="modal-card island-story-card"><h2 data-island-story-title>Insel</h2><p data-island-story-text></p><div class="button-line center"><button class="game-btn primary" type="button" data-island-story-close>Weiter</button></div></div>`;
    modal.querySelector('[data-island-story-close]').addEventListener('click', () => hide(modal));
    document.body.appendChild(modal);
    return modal;
  }
  function maybeShowIslandStoryForNode(node) {
    if (!boardScreenIsVisible() || !node || node === 'start') return;
    const state = getState();
    const key = node === 'boss' ? 'boss' : node;
    if (!state.seenIslandStories || state.seenIslandStories[key]) return;
    state.seenIslandStories[key] = true;
    setState(state);
    const modal = ensureIslandStoryModal();
    modal.querySelector('[data-island-story-title]').textContent = JOURNEY_LABELS[key] || 'Neue Insel';
    modal.querySelector('[data-island-story-text]').textContent = heroText(ISLAND_STORIES[key] || 'Eine neue Insel liegt vor dir.');
    show(modal);
  }
  document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page;
    if (page === 'board') initBoard();
    else if (page === 'magiccastle') initMagicCastle();
    else if (page === 'story') initStory();
    else if (page === 'level') initLevel();
    else if (page === 'biome') initBiomePage();
    else if (page === 'battle') initBattle();
    else if (page === 'minigame') initMiniGame();
    else if (page === 'minigame2') initMiniGame2();
    else if (page === 'minigame3') initMiniGame3();
    else if (page === 'minigame4') initMiniGame4();
    else if (page === 'codes') initCodes();
  });
})();
