(() => {
  'use strict';

  const STORE = 'koenigreichSinneV4State';
  const BATTLE_STORE = 'koenigreichSinneV4Battle';
  const RETURN_STORE = 'koenigreichSinneV4BoardReturn';
  const SOUND_STORE = 'koenigreichSinneV4Muted';
  const STATE_VERSION = 'v4_73_space_board_biome_levels';
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
  const HERO_DEFAULT_POINT = { x: 50.0, y: 68.0 };
  const KEY_ORDER = ['riechen', 'hoeren', 'sehen', 'schmecken', 'fuehlen'];
  const BIOME_BY_SENSE = {
    riechen:   { id:'riechen', label:'Grasland', stageIndex:0, board:{ x:26.0, y:57.0 }, lock:'assets/images/ui/lock_grass.png', key:'assets/images/ui/key_grass.png' },
    hoeren:    { id:'hoeren', label:'Wüstenland', stageIndex:1, board:{ x:73.5, y:57.0 }, lock:'assets/images/ui/lock_sand.png', key:'assets/images/ui/key_sand.png' },
    fuehlen:   { id:'fuehlen', label:'Eisgebiet', stageIndex:2, board:{ x:25.0, y:80.5 }, lock:'assets/images/ui/lock_ice.png', key:'assets/images/ui/key_ice.png' },
    schmecken: { id:'schmecken', label:'Lavawelt', stageIndex:3, board:{ x:74.5, y:81.0 }, lock:'assets/images/ui/lock_lava.png', key:'assets/images/ui/key_lava.png' },
    sehen:     { id:'sehen', label:'Himmelswelt', stageIndex:4, board:{ x:50.0, y:42.0 }, lock:'assets/images/ui/lock_cloud.png', key:'assets/images/ui/key_cloud.png' },
    boss:      { id:'boss', label:'Kronenwelt', stageIndex:5, board:{ x:50.0, y:18.0 }, lock:'assets/images/ui/lock.png', key:'' }
  };
  const LOCK_RENDER_ORDER = ['riechen', 'hoeren', 'sehen', 'schmecken', 'fuehlen', 'boss'];
  const BIOME_LEVEL_PLAN = {
    riechen: [5, 4],
    hoeren: [9, 2],
    sehen: [3, 0],
    schmecken: [1, 6],
    fuehlen: [7, 8],
    boss: [10, 11]
  };
  const stageIndexForSlot = slot => { const senseId = SLOT_SENSE_MAP[Number(slot)] || 'boss'; return BIOME_BY_SENSE[senseId]?.stageIndex ?? 5; };
  const slotSenseId = slot => SLOT_SENSE_MAP[Number(slot)] || 'boss';
  const biomeForSenseId = senseId => BIOME_BY_SENSE[senseId] || BIOME_BY_SENSE.boss;
  const biomeForSlot = slot => biomeForSenseId(slotSenseId(slot));

  const ASSETS = {
    correct: ['assets/images/battle/richtig_1.webp', 'assets/images/battle/richtig_2.webp', 'assets/images/battle/richtig_3.webp'],
    wrong: ['assets/images/battle/falsch_1.webp', 'assets/images/battle/falsch_2.webp', 'assets/images/battle/falsch_3.webp'],
    final: 'assets/images/battle/final.webp',
    hero: 'assets/images/characters/held.webp',
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
    flip: 'assets/audio/flip.mp3', pair: 'assets/audio/pair.mp3', richtig: 'assets/audio/richtig.mp3',
    richtig_1: 'assets/audio/richtig_1.mp3', richtig_2: 'assets/audio/richtig_2.mp3', richtig_3: 'assets/audio/richtig_3.mp3', spray: 'assets/audio/spray.mp3', throw: 'assets/audio/throw.mp3',
    falsch_1: 'assets/audio/falsch_1.mp3', falsch_2: 'assets/audio/falsch_2.mp3', falsch_3: 'assets/audio/falsch_3.mp3'
  };

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

  let muted = localStorage.getItem(SOUND_STORE) === '1';
  const audio = new Map();
  const oneShotPools = new Map();
  const ONE_SHOT_SOUND_KEYS = ['richtig_1','richtig_2','richtig_3','falsch_1','falsch_2','falsch_3'];

  function audioVolumeForKey(key) {
    if (key === 'background') return .045;
    if (key === 'battle_background') return .11;
    if (key === 'minigame_background') return .24;
    if (key === 'collect') return .82;
    if (key === 'flip') return .70;
    if (key === 'pair') return .82;
    if (key === 'hurt' || key === 'glass_break') return .88;
    return /^(richtig|falsch)_/.test(key) ? .95 : .85;
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
    const pool = oneShotPools.get(key);
    if (!pool || !pool.length) return;
    const a = pool[pool.cursor++ % pool.length];
    try {
      a.pause();
      a.currentTime = 0;
      await a.play();
    } catch (_) {}
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
    } catch (_) {}
  }
  function stopSound(key) { const a = getAudio(key); if (a) { a.pause(); try { a.currentTime = 0; } catch (_) {} } }
  function stopAllBattleAudio() { ['battle_background','final','win','lose','fight','richtig_1','richtig_2','richtig_3','falsch_1','falsch_2','falsch_3'].forEach(stopSound); }
  function addSpeaker() {
    if ($('globalSpeakerBtn')) return;
    const b = document.createElement('button');
    b.id = 'globalSpeakerBtn'; b.className = 'speaker-btn'; b.type = 'button';
    b.textContent = muted ? '🔇' : '🔊';
    b.addEventListener('click', () => {
      muted = !muted; localStorage.setItem(SOUND_STORE, muted ? '1' : '0'); b.textContent = muted ? '🔇' : '🔊';
      if (muted) Array.from(audio.keys()).forEach(stopSound);
      else if (document.body.dataset.page === 'board' && !$('boardScreen')?.classList.contains('hidden')) playSound('background', { loop:true });
      else if (document.body.dataset.page === 'minigame' || document.body.dataset.page === 'minigame2' || document.body.dataset.page === 'minigame3' || document.body.dataset.page === 'minigame4') playSound('minigame_background', { loop:true, restart:false });
    });
    document.body.appendChild(b);
  }

  function blankFlags() { return { sehen:false, hoeren:false, riechen:false, schmecken:false, fuehlen:false, boss:false }; }
  function defaultState() { return { stateVersion:STATE_VERSION, started:false, slots:Array(LEVEL_COUNT).fill(null), completed:Array(LEVEL_COUNT).fill(false), bossCompleted:false, heroIndex:null, introUsed:false, revealedMax:0, keysFound:blankFlags(), removedLocks:blankFlags(), activeBiome:null }; }
  function normalizeState(raw) {
    const base = defaultState();
    if (!raw || raw.stateVersion !== STATE_VERSION) return base;
    const state = { ...base, ...(raw || {}) };
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
    if (Object.values(state.keysFound).slice(0, 5).every(Boolean)) state.keysFound.boss = true;
    if (!state.activeBiome || !BIOME_LEVEL_PLAN[state.activeBiome] || BIOME_LEVEL_PLAN[state.activeBiome].every(slot => state.completed[slot])) state.activeBiome = null;
    return state;
  }
  function getState() {
    try { return normalizeState(JSON.parse(localStorage.getItem(STORE)) || null); } catch (_) { return defaultState(); }
  }
  function setState(state) { localStorage.setItem(STORE, JSON.stringify(normalizeState(state))); }
  function currentSlot(state = getState()) { const i = state.completed.findIndex(v => !v); return i < 0 ? LEVEL_COUNT : i; }
  function biomeLevelPlan(id) { return BIOME_LEVEL_PLAN[id] || []; }
  function nextSlotForBiome(id, state = getState()) { return biomeLevelPlan(id).find(slot => !state.completed[slot]); }
  function biomeIsComplete(id, state = getState()) { return biomeLevelPlan(id).length > 0 && biomeLevelPlan(id).every(slot => state.completed[slot]); }
  function activeBoardSlot(state = getState()) { return state.activeBiome ? nextSlotForBiome(state.activeBiome, state) : null; }
  function allLevelsDone(state = getState()) { return ['riechen','hoeren','sehen','schmecken','fuehlen'].every(id => biomeIsComplete(id, state)) && biomeIsComplete('boss', state); }
  function usedIds(state = getState()) { return state.slots.filter(Boolean); }
  function dataForMeta(meta) { return meta?.isBoss || meta?.senseId === 'boss' ? BOSS : SENSES[meta?.senseId]; }
  function getQuestionsForId(id) { return QUESTION_BANK[id] || QUESTION_BANK.sehen; }
  function bgForMeta(meta) { return STAGE_BACKGROUNDS[stageIndexForSlot(meta?.slot)]; }
  function popupBgForMeta(meta) { return POPUP_BACKGROUNDS[stageIndexForSlot(meta?.slot)]; }
  function boardPointForSlot(index, state = getState()) {
    if (!Number.isInteger(index)) return HERO_DEFAULT_POINT;
    const assigned = state.slots[index];
    return biomeForSenseId(assigned || slotSenseId(index)).board || HERO_DEFAULT_POINT;
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
  function preloadBattleAssets(data, meta) {
    preloadAssets([ASSETS.hero, ASSETS.versus, ASSETS.text.kampf, ASSETS.text.richtig, ASSETS.text.falsch, ASSETS.text.gewonnen, ASSETS.text.verloren, data.enemy, data.defeated, ASSETS.loseHero, ASSETS.final, ...ASSETS.correct, ...ASSETS.wrong, bgForMeta(meta), popupBgForMeta(meta), ...Object.values(AUDIO_FILES)]);
    warmOneShotPools();
  }
  function prefetchPage(href) {
    const url = href.includes('://') || href.startsWith('file:') ? href : pageUrl(href);
    if (document.querySelector(`link[rel="prefetch"][href="${url}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  }

  function initBoard() {
    addSpeaker();
    const state = getState();
    hide($('outroScreen'));
    if (state.started) { showBoard(false); } else { show($('introScreen')); hide($('boardScreen')); hide($('openBoardMenuBtn')); hide($('belowBoard')); }
    const startGame = () => {
      const s = getState(); s.started = true; setState(s); showBoard(true); playSound('background', { loop:true, restart:true });
    };
    $('startGameBtn')?.addEventListener('click', startGame);
    $('introScreen')?.addEventListener('click', (ev) => { if (ev.target.closest('#startGameBtn')) return; startGame(); });
    $('outroContinueBtn')?.addEventListener('click', () => { hide($('outroScreen')); showBoard(false); });
    $('resetGameBtn')?.addEventListener('click', () => { if (confirm('Spielbrett wirklich zurücksetzen?')) { localStorage.removeItem(STORE); localStorage.removeItem(RETURN_STORE); location.href = pageUrl('index.html'); } });
    $('unlockAllLevelsBtn')?.addEventListener('click', unlockAllLevels);
    $('openBoardMenuBtn')?.addEventListener('click', () => document.body.classList.add('board-menu-open'));
    $('closeBoardMenuBtn')?.addEventListener('click', () => document.body.classList.remove('board-menu-open'));
    $('closeScanBtn')?.addEventListener('click', closeScan);
    $('backToBoardBtn')?.addEventListener('click', () => escapeToBoard(activeScanMeta()));
    $('manualUnlockBtn')?.addEventListener('click', () => unlockByCode($('manualCodeInput')?.value || ''));
    $('randomUnlockBtn')?.addEventListener('click', () => unlockRandom());
    $('skipLevelBtn')?.addEventListener('click', skipCurrentLevel);
    $('toggleScannerBtn')?.addEventListener('click', () => { document.querySelector('.camera-box')?.classList.toggle('hidden'); });
    $('scanJumpBottomBtn')?.addEventListener('click', () => $('randomUnlockBtn')?.scrollIntoView({ behavior:'smooth', block:'center' }));
    $('scanJumpTopBtn')?.addEventListener('click', () => $('scanTitle')?.scrollIntoView({ behavior:'smooth', block:'start' }));
    $('launchLevelBtn')?.addEventListener('click', handleLaunchLevel);
    $('encounterBackBtn')?.addEventListener('click', handleEncounterBack);
    $('levelUnlockedContinueBtn')?.addEventListener('click', handleLevelUnlockedContinue);
    $('boardGuide')?.addEventListener('click', startIntroHeroJourney);
    $('boardGuide')?.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); startIntroHeroJourney(); } });
    window.addEventListener('resize', updateMapGeometry);
    setTimeout(() => applyReturnModal(), 150);
  }

  function showBoard(firstStart=false) {
    hide($('introScreen')); show($('boardScreen')); show($('openBoardMenuBtn')); show($('belowBoard'));
    updateMapGeometry(); renderBoard();
    playSound('background', { loop:true, restart:!firstStart });
  }

  function updateMapGeometry() {
    const screen = $('boardScreen'), inner = $('mapInner'); if (!screen || !inner) return;
    const w = screen.clientWidth, h = screen.clientHeight;
    let imgW, imgH;
    if (w / h > BOARD_RATIO) {
      imgW = w;
      imgH = w / BOARD_RATIO;
    } else {
      imgH = h;
      imgW = h * BOARD_RATIO;
    }
    inner.style.width = `${imgW}px`;
    inner.style.height = `${imgH}px`;
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

  function renderBoard() {
    const inner = $('mapInner'); if (!inner) return;
    const state = getState();
    inner.innerHTML = '';

    const market = document.createElement('button');
    market.type = 'button';
    market.id = 'marketScanBtn';
    market.className = 'board-overlay-btn market-board-btn';
    market.setAttribute('aria-label', 'Marktbrett öffnen und QR-Code scannen');
    market.innerHTML = `<img src="${assetUrl('assets/images/ui/market_board.png')}" alt="Marktbrett">`;
    market.addEventListener('click', () => {
      if (allLevelsDone(getState())) { showOutro(); return; }
      openScan();
    });
    inner.appendChild(market);

    const lockRow = document.createElement('div');
    lockRow.className = 'board-lock-row';
    LOCK_RENDER_ORDER.forEach(id => {
      const lockBtn = document.createElement('button');
      lockBtn.type = 'button';
      lockBtn.className = 'board-overlay-btn board-lock-btn';
      lockBtn.dataset.lockId = id;
      const stateNow = getState();
      const hidden = Boolean(stateNow.removedLocks?.[id]);
      const unlockable = id === 'boss'
        ? KEY_ORDER.every(keyId => stateNow.removedLocks?.[keyId])
        : Boolean(stateNow.keysFound?.[id]);
      if (hidden) lockBtn.classList.add('is-hidden');
      if (unlockable && !hidden) lockBtn.classList.add('is-unlockable');
      const src = id === 'boss' ? assetUrl('assets/images/ui/lock.png') : assetUrl(BIOME_BY_SENSE[id].lock);
      lockBtn.innerHTML = `<img src="${src}" alt="${esc((BIOME_BY_SENSE[id]?.label || 'Kronenwelt') + '-Schloss')}">`;
      lockBtn.addEventListener('click', () => {
        const live = getState();
        const canUnlock = id === 'boss' ? KEY_ORDER.every(keyId => live.removedLocks?.[keyId]) : Boolean(live.keysFound?.[id]);
        if (!canUnlock || live.removedLocks?.[id]) {
          lockBtn.classList.remove('shake-once');
          void lockBtn.offsetWidth;
          lockBtn.classList.add('shake-once');
          return;
        }
        live.removedLocks[id] = true;
        setState(live);
        renderBoard();
      });
      lockRow.appendChild(lockBtn);
    });
    inner.appendChild(lockRow);

    const keyRow = document.createElement('div');
    keyRow.className = 'board-key-row';
    KEY_ORDER.forEach(id => {
      const card = document.createElement('div');
      card.className = `board-key-chip ${state.keysFound?.[id] ? 'is-found' : 'is-missing'}`;
      card.innerHTML = `
        <img src="${assetUrl(BIOME_BY_SENSE[id].key)}" alt="${esc(BIOME_BY_SENSE[id].label + '-Schlüssel')}">
        <span>${esc(BIOME_BY_SENSE[id].label)}</span>`;
      keyRow.appendChild(card);
    });
    inner.appendChild(keyRow);

    const status = document.createElement('div');
    status.className = 'board-biome-status';
    const activeSlot = activeBoardSlot(state);
    status.innerHTML = state.activeBiome && Number.isInteger(activeSlot)
      ? `<strong>Aktives Ziel:</strong> ${esc(BIOME_BY_SENSE[state.activeBiome].label)} · ${esc(levelTypeLabel(activeSlot))}`
      : `<strong>Aktives Ziel:</strong> Wähle am Marktbrett ein Biom aus.`;
    inner.appendChild(status);

    if (state.activeBiome && Number.isInteger(activeSlot)) {
      const node = document.createElement('button');
      node.type = 'button';
      node.className = 'board-overlay-btn board-biome-level-btn';
      node.style.left = `${boardPointForSlot(activeSlot, state).x}%`;
      node.style.top = `${boardPointForSlot(activeSlot, state).y}%`;
      node.setAttribute('aria-label', `${BIOME_BY_SENSE[state.activeBiome].label} ${levelTypeLabel(activeSlot)} öffnen`);
      node.innerHTML = `
        <span class="board-biome-level-chip">${esc(levelTypeLabel(activeSlot))}</span>
        <span class="board-biome-level-name">${esc(BIOME_BY_SENSE[state.activeBiome].label)}</span>`;
      node.addEventListener('click', () => onLevelNode(activeSlot));
      inner.appendChild(node);
    }

    const hero = document.createElement('button');
    hero.type = 'button';
    hero.id = 'movingHero';
    hero.className = 'map-token moving-hero-token';
    hero.innerHTML = '<img class="hero-token" src="assets/images/characters/held.webp" alt="Sir Nervus">';
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
    const state = getState();
    const completed = state.completed[index];
    await animateHeroTo(index, { fromIntro: state.heroIndex === null });
    const latest = getState();
    const assigned = latest.slots[index];
    if (isPlaceholderSlot(index)) {
      if (completed && index !== 1 && index !== 3 && index !== 5 && index !== 7) return;
      showPlaceholder(index);
      return;
    }
    if (completed) {
      if (!assigned) return;
      location.href = pageUrl(assigned === 'boss' ? `level.html?type=boss&slot=${index}` : `level.html?sense=${encodeURIComponent(assigned)}&slot=${index}`);
      return;
    }
    if (assigned) { showEncounter(assigned, index); return; }
    openScan(index);
  }

  let scanIndex = null, scanner = null;
  function activeScanMeta() { return null; }
  function openScan() {
    stopSound('background');
    scanIndex = null;
    $('manualCodeInput').value='';
    $('scanHelp').textContent = 'Scanne einen QR-Code. Danach erscheint im passenden Biom ein Levelfeld auf der Karte.';
    setScanMessage('');
    applyStagePopup($('scanModal'), { slot:(Number.isInteger(getState().heroIndex) ? getState().heroIndex : 6), isBoss:false });
    show($('scanModal'));
    startScanner();
  }
  function closeScan() { stopScanner(); hide($('scanModal')); scanIndex = null; playSound('background', { loop:true, restart:true }); }
  function skipCurrentLevel() {
    const state = getState();
    const slot = state.activeBiome ? nextSlotForBiome(state.activeBiome, state) : null;
    if (!Number.isInteger(slot)) return;
    stopScanner();
    hide($('scanModal'));
    scanIndex = null;
    state.completed[slot] = true;
    state.heroIndex = null;
    if (!nextSlotForBiome(state.activeBiome, state)) state.activeBiome = null;
    setState(state);
    renderBoard();
    localStorage.setItem(RETURN_STORE, JSON.stringify({ type:'unlocked', meta:{ slot, skipped:true, returnHome:true } }));
    applyReturnModal();
  }
  function unlockAllLevels() {
    if (!confirm('Alle Level zum Testen freischalten?')) return;
    const state = getState();
    state.started = true;
    state.slots = Array.from({ length: LEVEL_COUNT }, (_, i) => SLOT_SENSE_MAP[i] === 'boss' ? 'boss' : SLOT_SENSE_MAP[i]);
    state.completed = Array.from({ length: LEVEL_COUNT }, () => true);
    state.heroIndex = null;
    state.activeBiome = null;
    state.introUsed = true;
    state.revealedMax = LEVEL_COUNT - 1;
    state.keysFound = { sehen:true, hoeren:true, riechen:true, schmecken:true, fuehlen:true, boss:true };
    state.removedLocks = { sehen:true, hoeren:true, riechen:true, schmecken:true, fuehlen:true, boss:true };
    setState(state);
    localStorage.removeItem(RETURN_STORE);
    document.body.classList.remove('board-menu-open');
    hide($('introScreen'));
    show($('boardScreen'));
    show($('openBoardMenuBtn'));
    show($('belowBoard'));
    renderBoard();
    playSound('levelunlocked');
  }

  function setScanMessage(text, bad=false) { const msg=$('scanMessage'); if (!msg) return; msg.textContent=text; msg.className = text ? `message ${bad?'bad':'ok'}` : 'message hidden'; }
  async function startScanner() {
    const info = $('cameraInfo'); if (info) info.textContent='Kamera wird vorbereitet …';
    try {
      if (!window.Html5Qrcode) throw new Error('Scanner-Bibliothek nicht verfügbar.');
      scanner = new window.Html5Qrcode('qrReader');
      await scanner.start({ facingMode:'environment' }, { fps: 8, qrbox: { width: 220, height: 220 } }, txt => unlockByCode(txt));
      if (info) info.textContent='';
    } catch (e) { if (info) info.textContent='Kamera nicht verfügbar. Code bitte manuell eingeben.'; }
  }
  async function stopScanner() { try { if (scanner) await scanner.stop(); } catch (_) {} scanner = null; }
  function unlockByCode(raw) {
    const code = String(raw || '').trim().toUpperCase();
    const candidates = [...Object.values(SENSES), BOSS];
    const entry = candidates.find(s => s.code?.toUpperCase() === code || s.id.toUpperCase() === code.replace('SINNE-',''));
    if (!entry) { setScanMessage('Code nicht erkannt.', true); return; }
    if (entry.id === 'boss') {
      const state = getState();
      if (!KEY_ORDER.every(id => state.removedLocks?.[id])) {
        setScanMessage('Öffne zuerst alle fünf Schlösser unter der Krone.', true);
        return;
      }
    }
    const state = getState();
    const nextSlot = nextSlotForBiome(entry.id, state);
    if (!Number.isInteger(nextSlot)) {
      setScanMessage(entry.id === 'boss' ? 'Die Kronenwelt ist bereits abgeschlossen.' : 'Dieses Biom ist bereits abgeschlossen.', true);
      return;
    }
    unlockSense(entry.id, nextSlot);
  }
  function unlockRandom() {
    const state = getState();
    const candidates = Object.keys(SENSES).filter(id => Number.isInteger(nextSlotForBiome(id, state)));
    if (KEY_ORDER.every(id => state.removedLocks?.[id]) && Number.isInteger(nextSlotForBiome('boss', state))) candidates.push('boss');
    if (!candidates.length) { setScanMessage('Es gibt kein freies Biom mehr.', true); return; }
    const pick = candidates[Math.floor(Math.random()*candidates.length)];
    unlockSense(pick, nextSlotForBiome(pick, state));
  }
  async function unlockSense(id, index) {
    await stopScanner();
    hide($('scanModal'));
    const state = getState();
    state.started = true;
    state.activeBiome = id;
    state.heroIndex = null;
    state.slots[index] = id;
    setState(state);
    renderBoard();
    playSound('levelunlocked');
    playSound('background', { loop:true, restart:true });
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
      $('encounterImage').alt = 'Sir Nervus';
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
      $('encounterImage').alt = 'Sir Nervus';
      $('encounterKicker').textContent = 'Tastsinn-Kran';
      $('encounterTitle').textContent = 'Weich oder spitz?';
      $('encounterSpeech').textContent = done ? 'Du kannst den Tastsinn-Kran erneut spielen.' : 'Steuere den Kran und sammle nur weiche Gegenstände. Spitze Dinge lösen Schmerz aus und kosten ein Herz.';
      show(modal);
      return;
    }

    window.pendingLaunch = { placeholder:true, slot:index, meta };
    $('launchLevelBtn').textContent = index === 9 ? 'Hör-Level freischalten' : (index === LEVEL_COUNT - 1 ? 'Zum Finale' : 'Weiter');
    $('encounterBackBtn').textContent = 'Wegrennen';
    $('encounterImage').src = ASSETS.winHero;
    $('encounterImage').alt = 'Sir Nervus macht weiter';
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
    const state = getState();
    const senseId = slotSenseId(index);
    state.completed[index] = true;
    state.heroIndex = index;
    state.activeBiome = nextSlotForBiome(senseId, state) != null ? senseId : null;
    setState(state);
    renderBoard();
    playSound('levelunlocked');
    localStorage.setItem(RETURN_STORE, JSON.stringify({ type:'unlocked', meta:{ slot:index, placeholder:true, senseId, returnHome:true } }));
    applyReturnModal();
  }
  function escapeToBoard(meta) {
    closeScan(); hide($('encounterModal'));
    localStorage.setItem(RETURN_STORE, JSON.stringify({ type:'escape', meta })); applyReturnModal();
  }
  function showOutro() {
    stopSound('background');
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
  async function animateHeroHome(fromSlot) {
    const state = getState();
    state.heroIndex = fromSlot;
    setState(state);
    renderBoard();
    const hero = $('movingHero'); if (!hero) return;
    await sleep(80);
    setHeroAt(fromSlot, true);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      hero.style.transition = 'left 1.6s cubic-bezier(.22,1,.36,1), top 1.6s cubic-bezier(.22,1,.36,1), opacity .25s ease';
      setHeroAt(null, false);
      playSound('levelstart');
    }));
    await sleep(1650);
    const latest = getState();
    latest.heroIndex = null;
    setState(latest);
    renderBoard();
  }

  async function handleLevelUnlockedContinue() {
    hide($('levelUnlockedModal'));
    playSound('background', { loop:true, restart:true });
    const fromSlot = pendingHomeFromSlot;
    pendingHomeFromSlot = null;
    if (Number.isInteger(fromSlot)) await animateHeroHome(fromSlot);
  }

  function applyReturnModal() {
    const raw = localStorage.getItem(RETURN_STORE); if (!raw) return; localStorage.removeItem(RETURN_STORE);
    let data; try { data=JSON.parse(raw); } catch (_) { return; }
    const modal = $('levelUnlockedModal'); if (!modal) return;
    applyStagePopup(modal, data.meta);
    const img = modal.querySelector('img'); const title=$('levelUnlockedTitle'); const kicker=$('levelUnlockedKicker'); const text=$('levelUnlockedText');
    stopSound('background');
    pendingUnlockedFromSlot = null;
    pendingHomeFromSlot = data?.meta?.returnHome ? Number(data.meta.slot) : null;
    if (data.type === 'escape') {
      img.src=ASSETS.escapeHero; kicker.textContent=''; title.textContent='Du bist entkommen.'; text.textContent='Scanne am Marktbrett einen neuen QR-Code, um es erneut zu versuchen.';
    }
    else if (data?.meta?.foundKey) {
      img.src = data.meta.foundKey.image;
      kicker.textContent = 'Belohnung';
      title.textContent = `${data.meta.foundKey.label}-Schlüssel gefunden`;
      text.textContent = 'Tippe jetzt auf das passende Schloss unter der Krone, um es zu öffnen.';
      playSound('levelunlocked');
    }
    else {
      const senseId = data?.meta?.senseId || slotSenseId(Number(data?.meta?.slot));
      const nextSlot = nextSlotForBiome(senseId, getState());
      img.src=ASSETS.winHero;
      kicker.textContent='Erfolg';
      if (Number.isInteger(nextSlot)) {
        title.textContent = 'Nächstes Level sichtbar';
        text.textContent = `${BIOME_BY_SENSE[senseId]?.label || 'Das Biom'} zeigt jetzt das ${levelTypeLabel(nextSlot)}. Tippe auf das Levelfeld auf der Karte.`;
      } else {
        title.textContent = 'Zurück ins Dorf';
        text.textContent = 'Sir Nervus kehrt in die Dorfmitte zurück. Wähle danach am Marktbrett ein neues Biom aus.';
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
    sessionStorage.setItem(BATTLE_STORE, JSON.stringify(payload));
    showTransition('Kampf wird geladen …');
    setTimeout(() => location.href = pageUrl('battle.html'), 420);
  }
  function showTransition(text) {
    let overlay = document.createElement('div'); overlay.className='page-transition-overlay'; overlay.innerHTML=`<div>${esc(text)}</div>`; document.body.appendChild(overlay); requestAnimationFrame(()=>overlay.classList.add('active'));
  }

  function initBattle() {
    addSpeaker(); stopSound('background');
    let payload; try { payload = JSON.parse(sessionStorage.getItem(BATTLE_STORE) || ''); } catch (_) {}
    if (!payload || !payload.meta) { location.replace(pageUrl('index.html')); return; }
    const meta = payload.meta; const data = dataForMeta(meta); if (!data) { location.replace(pageUrl('index.html')); return; }
    document.body.style.setProperty('--battle-bg', `url("${popupBgForMeta(meta)}")`);
    preloadBattleAssets(data, meta);
    if ($('battleKampfText')) $('battleKampfText').src = ASSETS.text.kampf;
    $('battleHero').src = ASSETS.hero; $('battleEnemy').src = data.enemy; $('battleEnemyName').textContent = data.enemyName;
    $('battleBackBtn')?.addEventListener('click', () => history.back());
    $('battleStartBtn')?.addEventListener('click', () => runBattleSequence(payload, data, meta), { once:true });
  }
  function setBattleMode(mode) {
    document.body.dataset.battleMode = mode;
    if (mode === "sequence") { hide($("battleIntroScene")); show($("battleSequenceScene")); }
    if (mode === "intro") { show($("battleIntroScene")); hide($("battleSequenceScene")); }
  }
  function showFinalHint(text="Tippe auf die Wolke") { const n=$("finalHint"); if(!n) return; n.textContent=text; show(n); }
  function hideFinalHint() { hide($("finalHint")); }
  function waitForRenderable(node) {
    if (!node) return Promise.resolve();
    return new Promise(resolve => {
      const done = () => requestAnimationFrame(() => requestAnimationFrame(resolve));
      const finish = () => { try { node.onload = null; } catch (_) {} done(); };
      if (node.complete && node.naturalWidth > 0) { done(); return; }
      node.onload = finish;
      node.onerror = finish;
    });
  }
  function pickNoRepeat(list, prev) { const pool = list.filter(x=>x!==prev); return (pool.length?pool:list)[Math.floor(Math.random()*(pool.length?pool:list).length)]; }
  let lastCorrect=null,lastWrong=null;
  async function runBattleSequence(payload, data, meta) {
    warmOneShotPools();
    setBattleMode('sequence');
    await playSound('fight');
    playSound('battle_background', { loop:true });
    const img=$('sequenceImage'), label=$('sequenceLabel'), status=$('sequenceStatus'), dots=$('sequenceDots'), outcome=$('outcomeImage'), action=$('battleAction'), textImg=$('sequenceTextImage');
    action.innerHTML = '';    hide(action);
    hideFinalHint();
    if (textImg) { textImg.className = 'battle-text-img hidden'; textImg.removeAttribute('src'); }
    label.textContent = ''; status.textContent = '';
    dots.innerHTML = '<span></span>'.repeat(6);
    for (let i=0;i<payload.results.length;i++) {
      const ok = payload.results[i];
      const list = ok ? ASSETS.correct : ASSETS.wrong;
      const src = ok ? (lastCorrect=pickNoRepeat(list,lastCorrect)) : (lastWrong=pickNoRepeat(list,lastWrong));
      const textSrc = ok ? ASSETS.text.richtig : ASSETS.text.falsch;
      const soundMatch = src.match(/(?:richtig|falsch)_(\d)\.webp(?:$|[?#])/);
      const soundKey = `${ok ? 'richtig' : 'falsch'}_${soundMatch ? soundMatch[1] : ((i % 3) + 1)}`;
      label.textContent = `Frage ${i+1}`;
      status.textContent = ok ? 'Richtig' : 'Falsch';
      status.className = `battle-status sr-only ${ok?'ok':'bad'}`;
      [...dots.children].forEach((d,di)=>d.className=di===i?'active':'');
      await playAnswerStep(img, textImg, src, textSrc, ok ? 'Richtige Antwort' : 'Falsche Antwort', soundKey);
    }
    label.textContent = 'Finale';
    status.textContent = '';
    [...dots.children].forEach((d,di)=>d.className=di===5?'active':'');
    if (textImg) textImg.className = 'battle-text-img hidden';
    await showFinalCloud(img);
    showFinalHint();
    playSound('final');
    const wrong = payload.results.filter(v=>!v).length; const won = wrong <= 1;
    outcome.src = won ? data.defeated : ASSETS.loseHero; outcome.alt = won ? `${data.enemyName} besiegt` : 'Du wurdest besiegt';
    outcome.className='battle-outcome behind';
    img.onclick = async () => {
      img.onclick = null; hideFinalHint(); stopSound('final');
      stopSound('battle_background');
      playSound(won ? 'win' : 'lose');
      if (textImg) {
        textImg.src = won ? ASSETS.text.gewonnen : ASSETS.text.verloren;
        textImg.alt = won ? 'Gewonnen' : 'Verloren';
        textImg.className = 'battle-text-img result-preload';
      }
      outcome.classList.add('pre-visible');
      await sleep(180);
      img.classList.remove('final-idle'); img.classList.add('cloud-reveal');
      outcome.classList.add('visible');
      await sleep(1120);
      img.className='battle-seq-img hidden';
      outcome.className='battle-outcome visible idle';
      if (textImg) {
        await sleep(80);
        textImg.className = 'battle-text-img result-show';
      }
      showBattleResult(won, data, meta, action, label, status);
    };
  }

  function playAnswerStep(img, textImg, src, textSrc, alt, soundKey) {
    return new Promise(resolve => {
      img.onclick = null;
      img.className = "battle-seq-img preparing";
      img.removeAttribute("src");
      if (textImg) {
        textImg.className = "battle-text-img preparing";
        textImg.removeAttribute("src");
      }
      requestAnimationFrame(() => {
        img.src = src;
        img.alt = alt;
        if (textImg) { textImg.src = textSrc; textImg.alt = alt; }
        Promise.all([waitForRenderable(img), waitForRenderable(textImg)]).then(() => {
          playSound(soundKey);
          void img.offsetWidth;
          if (textImg) void textImg.offsetWidth;
          img.className = "battle-seq-img answer-cycle";
          if (textImg) textImg.className = "battle-text-img answer-text-cycle";
          window.setTimeout(() => {
            img.className = "battle-seq-img hidden";
            if (textImg) textImg.className = "battle-text-img hidden";
            resolve();
          }, 2000);
        });
      });
    });
  }

  function showSequenceImage(img, src, alt, index) {
    return new Promise(resolve => {
      img.className='battle-seq-img preparing'; img.src=src; img.alt=alt; img.onclick=null;
      const apply=()=>{ img.onload=null; void img.offsetWidth; img.className='battle-seq-img answer-cycle'; window.setTimeout(resolve, 2000); };
      img.onload=apply; if (img.complete) apply();
    });
  }
  function showFinalCloud(img) {
    return new Promise(resolve => {
      img.className='battle-seq-img preparing';
      img.removeAttribute('src');
      requestAnimationFrame(() => {
        img.src = ASSETS.final;
        img.alt = 'Finale Staubwolke';
        waitForRenderable(img).then(() => {
          void img.offsetWidth;
          img.className='battle-seq-img final-cloud final-idle';
          resolve();
        });
      });
    });
  }
  function showBattleResult(won, data, meta, action, label, status) {
    label.textContent = ''; status.textContent = ''; status.className = 'battle-status sr-only';
    action.innerHTML = '';
    show(action);
    if (won) {
      const btn = document.createElement('button'); btn.className='game-btn primary'; btn.textContent='Weiter'; btn.onclick=()=>finishBattleWin(meta); action.appendChild(btn);
    } else {
      const retry = document.createElement('button'); retry.className='game-btn primary'; retry.textContent='Neuer Versuch'; retry.onclick=()=>location.href = pageUrl(meta.isBoss ? `level.html?type=boss&slot=${meta.slot}` : `level.html?sense=${encodeURIComponent(meta.senseId)}&slot=${meta.slot}`);
      const run = document.createElement('button'); run.className='game-btn muted'; run.textContent='Wegrennen'; run.onclick=()=>{ localStorage.setItem(RETURN_STORE, JSON.stringify({ type:'escape', meta })); location.href = pageUrl('index.html'); };
      action.append(retry,run);
    }
  }
  function finishBattleWin(meta) {
    const state = getState();
    let foundKey = null;
    if (meta.isBoss) {
      state.bossCompleted = true;
      state.completed[meta.slot] = true;
      state.heroIndex = meta.slot;
      state.activeBiome = nextSlotForBiome('boss', state) != null ? 'boss' : null;
    } else {
      state.completed[meta.slot] = true;
      state.heroIndex = meta.slot;
      const senseId = meta.senseId || slotSenseId(meta.slot);
      state.activeBiome = nextSlotForBiome(senseId, state) != null ? senseId : null;
      if (KEY_ORDER.includes(senseId) && !state.keysFound[senseId]) {
        state.keysFound[senseId] = true;
        foundKey = keyInfoForSenseId(senseId);
      }
      if (KEY_ORDER.every(id => state.keysFound[id])) state.keysFound.boss = true;
    }
    setState(state); sessionStorage.removeItem(BATTLE_STORE);
    localStorage.setItem(RETURN_STORE, JSON.stringify({ type:'unlocked', meta: { ...meta, foundKey, returnHome:true } }));
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

    const heroClone = hero.cloneNode(false);
    heroClone.id = 'miniHeroClone';
    heroClone.className = `${hero.className} mini-hero-clone`;
    heroClone.alt = '';
    heroClone.setAttribute('aria-hidden', 'true');
    heroClone.style.visibility = 'hidden';
    heroClone.style.opacity = '1';
    hero.after(heroClone);

    const miniMeta = { slot: Number(qs('slot')) || 0, isBoss:false };
    stage.style.setProperty('--mini-stage-bg', `url("${popupBgForMeta(miniMeta)}")`);

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

    const tutorial = document.createElement('div');
    tutorial.className = 'mini-tutorial-modal stage-popup hidden';
    tutorial.setAttribute('role', 'dialog');
    tutorial.setAttribute('aria-modal', 'true');
    tutorial.setAttribute('aria-labelledby', 'miniTutorialTitle');
    tutorial.innerHTML = `
      <div class="mini-tutorial-card">
        <p class="mini-tutorial-kicker">Geschmackssinn</p>
        <h2 id="miniTutorialTitle">Bereite Sir Nervus auf den Weg vor</h2>
        <p>Bewege Sir Nervus nur nach <strong>links</strong> und <strong>rechts</strong>. Sammle <strong>10 lecker schmeckende Obststücke</strong>. Etwa alle fünf Sekunden kommt ein zufälliges Obstteil herunter – dazwischen fallen vor allem <strong>scharfe Chilischoten</strong> und <strong>verdorbener Fisch</strong>, denen du ausweichen musst.</p>
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
          if (Number.isInteger(slot) && slot >= 0) {
            const state = getState();
            state.completed[slot] = true;
            state.heroIndex = slot;
            setState(state);
            localStorage.setItem(RETURN_STORE, JSON.stringify({ type:'unlocked', meta:{ slot, placeholder:true } }));
          }
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

    const slot = Number(qs('slot')) || 3;
    const memory2Meta = { slot, isBoss:false };
    stage.style.setProperty('--memory2-bg', `url("${popupBgForMeta(memory2Meta)}")`);
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
        resultText.textContent = 'Du hast alle Symbolpaare gefunden und Sir Nervus sicher an den Blendkugeln vorbeigeführt.';
        retryBtn.textContent = 'Zurück zum Spielfeld';
        hide(boardBtn);
        retryBtn.onclick = () => {
          const state = getState();
          state.completed[slot] = true;
          state.heroIndex = slot;
          setState(state);
          localStorage.setItem(RETURN_STORE, JSON.stringify({ type:'unlocked', meta:{ slot, placeholder:true } }));
          location.href = pageUrl('index.html');
        };
      } else {
        gameOver = true;
        resultTitle.textContent = 'Verloren';
        resultText.textContent = 'Sir Nervus wurde zu oft von Blendkugeln getroffen.';
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
    const closeMenuBtn = $('pipe3CloseMenuBtn');
    if (!stage || !board || !valveBtn || !hero || !ogreZone || !ogre || !banana) return;

    const slot = Number(qs('slot')) || 5;
    const pipe3Meta = { slot, isBoss:false };
    stage.style.setProperty('--pipe3-bg', `url("${popupBgForMeta(pipe3Meta)}")`);
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
          const state = getState();
          state.completed[slot] = true;
          state.heroIndex = slot;
          setState(state);
          localStorage.setItem(RETURN_STORE, JSON.stringify({ type:'unlocked', meta:{ slot, placeholder:true } }));
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
            resultExtraImage.alt = 'Sir Nervus unter einem Berg Bananen';
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

    const TOUCH4_BG = assetUrl('assets/images/minigame4/lava_bg.png');
    const TOUCH4_CARD_BACK = assetUrl('assets/images/minigame4/card_back.png');
    const TOUCH4_HERO_IDLE = assetUrl('assets/images/minigame4/knight_idle.png');
    const TOUCH4_HERO_RUN = assetUrl('assets/images/minigame4/knight_run.png');
    const TOUCH4_HERO_HURT = assetUrl('assets/images/minigame4/knight_hurt.png');
    const TOUCH4_GAMEOVER_ART = assetUrl('assets/images/minigame4/gameover_screen.png');
    stage.style.setProperty('--touch4-bg', `url("${TOUCH4_BG}")`);
    const touch4Meta = { slot, isBoss:false };
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
          resultDetail.alt = 'Sir Nervus wurde kindgerecht von spitzen Gegenständen gepikst';
          show(resultDetail);
        }
      }
      resultTitle.textContent = won ? 'Gewonnen' : 'Verloren';
      resultText.textContent = won
        ? 'Alle drei Brückenkarten waren weich. Sir Nervus konnte sicher über die Grube laufen.'
        : 'Mindestens eine Brückenkarte war spitz. Sir Nervus wurde gepikst – das ist für die Haut ein Warnsignal.';
      playSound(won ? 'win' : 'lose');
      retryBtn.textContent = won ? 'Zurück zum Spielfeld' : 'Neuer Versuch';
      retryBtn.onclick = () => {
        if (won) {
          const state = getState();
          state.completed[slot] = true;
          state.heroIndex = slot;
          setState(state);
          localStorage.setItem(RETURN_STORE, JSON.stringify({ type:'unlocked', meta:{ slot, placeholder:true } }));
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

  document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page;
    if (page === 'board') initBoard();
    else if (page === 'level') initLevel();
    else if (page === 'battle') initBattle();
    else if (page === 'minigame') initMiniGame();
    else if (page === 'minigame2') initMiniGame2();
    else if (page === 'minigame3') initMiniGame3();
    else if (page === 'minigame4') initMiniGame4();
    else if (page === 'codes') initCodes();
  });
})();
