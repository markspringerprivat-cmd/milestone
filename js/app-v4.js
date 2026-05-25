(() => {
  'use strict';

  const STORE = 'koenigreichSinneV4State';
  const BATTLE_STORE = 'koenigreichSinneV4Battle';
  const RETURN_STORE = 'koenigreichSinneV4BoardReturn';
  const SOUND_STORE = 'koenigreichSinneV4Muted';
  const STATE_VERSION = 'v4_33levels_food_wraparound';
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
    { x: 34.8, y: 90.6 },
    { x: 77.0, y: 91.0 },
    { x: 82.9, y: 70.2 },
    { x: 36.5, y: 64.5 },
    { x: 40.9, y: 55.1 },
    { x: 81.9, y: 48.1 },
    { x: 77.4, y: 39.0 },
    { x: 37.1, y: 36.3 },
    { x: 36.9, y: 22.6 },
    { x: 78.3, y: 17.2 },
    { x: 65.4, y: 6.4 },
    { x: 35.7, y: 11.2 }
  ];
  const BOARD_RATIO = 941 / 1672;
  const STAGE_BACKGROUNDS = ['assets/images/stages/stage_gras.webp', 'assets/images/stages/stage_sand.webp', 'assets/images/stages/stage_eis.webp', 'assets/images/stages/stage_lava.webp', 'assets/images/stages/stage_himmel.webp', 'assets/images/stages/stage_all.webp'];
  const POPUP_BACKGROUNDS = ['assets/images/popups/popup_gras.webp', 'assets/images/popups/popup_sand.webp', 'assets/images/popups/popup_eis.webp', 'assets/images/popups/popup_lava.webp', 'assets/images/popups/popup_himmel.webp', 'assets/images/popups/popup_all.webp'];
  const isPlaceholderSlot = index => PLACEHOLDER_LEVELS.includes(Number(index));
  const isQrSlot = index => QR_LEVELS.includes(Number(index));
  const stageIndexForSlot = slot => Math.max(0, Math.min(5, Math.floor((Number(slot) || 0) / 2)));

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
    richtig_1: 'assets/audio/richtig_1.mp3', richtig_2: 'assets/audio/richtig_2.mp3', richtig_3: 'assets/audio/richtig_3.mp3',
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
      else if (document.body.dataset.page === 'minigame') playSound('minigame_background', { loop:true, restart:false });
    });
    document.body.appendChild(b);
  }

  function defaultState() { return { stateVersion:STATE_VERSION, started:false, slots:Array(LEVEL_COUNT).fill(null), completed:Array(LEVEL_COUNT).fill(false), bossCompleted:false, heroIndex:null, introUsed:false }; }
  function normalizeState(raw) {
    const base = defaultState();
    if (!raw || raw.stateVersion !== STATE_VERSION) return base;
    const state = { ...base, ...(raw || {}) };
    const oldSlots = Array.isArray(raw?.slots) ? raw.slots : [];
    const oldCompleted = Array.isArray(raw?.completed) ? raw.completed : [];
    state.slots = Array.from({ length: LEVEL_COUNT }, (_, i) => oldSlots[i] || null);
    state.completed = Array.from({ length: LEVEL_COUNT }, (_, i) => Boolean(oldCompleted[i]));
    if (!Number.isInteger(state.heroIndex) || state.heroIndex < 0 || state.heroIndex >= LEVEL_COUNT) state.heroIndex = null;
    return state;
  }
  function getState() {
    try { return normalizeState(JSON.parse(localStorage.getItem(STORE)) || null); } catch (_) { return defaultState(); }
  }
  function setState(state) { localStorage.setItem(STORE, JSON.stringify(normalizeState(state))); }
  function currentSlot(state = getState()) { const i = state.completed.findIndex(v => !v); return i < 0 ? LEVEL_COUNT : i; }
  function allLevelsDone(state = getState()) { return state.completed.length === LEVEL_COUNT && state.completed.every(Boolean); }
  function usedIds(state = getState()) { return state.slots.filter(Boolean); }
  function dataForMeta(meta) { return meta?.isBoss || meta?.senseId === 'boss' ? BOSS : SENSES[meta?.senseId]; }
  function getQuestionsForId(id) { return QUESTION_BANK[id] || QUESTION_BANK.sehen; }
  function bgForMeta(meta) { return STAGE_BACKGROUNDS[stageIndexForSlot(meta?.slot)]; }
  function popupBgForMeta(meta) { return POPUP_BACKGROUNDS[stageIndexForSlot(meta?.slot)]; }
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
    $('levelUnlockedContinueBtn')?.addEventListener('click', () => { hide($('levelUnlockedModal')); playSound('background', { loop:true }); });
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
    const imgW = Math.max(w, h * BOARD_RATIO), imgH = imgW / BOARD_RATIO;
    inner.style.width = `${imgW}px`; inner.style.height = `${imgH}px`;
  }

  function boardPos(index) { return LEVEL_POSITIONS[index]; }
  function setHeroAt(index, instant=true) {
    const hero = $('movingHero'); if (!hero) return;
    const pos = boardPos(index); if (!pos) return;
    hero.style.transition = instant ? 'none' : 'left 2s cubic-bezier(.22,1,.36,1), top 2s cubic-bezier(.22,1,.36,1), opacity .25s ease';
    hero.style.left = `${pos.x}%`; hero.style.top = `${pos.y}%`; hero.style.opacity = '1';
    hero.dataset.index = String(index);
  }
  function animateHeroTo(targetIndex, { fromIntro=false } = {}) {
    const hero = $('movingHero'); if (!hero) return Promise.resolve();
    const state = getState();
    const current = Number.isInteger(state.heroIndex) ? state.heroIndex : null;
    if (!fromIntro && current === targetIndex) { setHeroAt(targetIndex, true); return Promise.resolve(); }
    const pos = boardPos(targetIndex);
    return new Promise(resolve => {
      hero.classList.remove('hidden');
      hero.style.opacity = '1';

      if (fromIntro || current === null) {
        hero.style.transition = 'none';
        hero.style.left = '92%';
        hero.style.top = '96%';
        hero.dataset.index = 'intro';

        requestAnimationFrame(() => requestAnimationFrame(() => {
          playSound('levelstart');
          hero.style.transition = 'left .7s ease-in, top .7s ease-in, opacity .25s ease';
          hero.style.left = '112%';
          hero.style.top = '96%';

          setTimeout(() => {
            hero.style.transition = 'none';
            hero.style.left = '-10%';
            hero.style.top = '96%';
            hero.dataset.index = 'intro-left';

            requestAnimationFrame(() => requestAnimationFrame(() => {
              hero.style.transition = 'left 2s cubic-bezier(.22,1,.36,1), top 2s cubic-bezier(.22,1,.36,1), opacity .25s ease';
              hero.style.left = `${pos.x}%`;
              hero.style.top = `${pos.y}%`;
            }));
          }, 740);
        }));

        setTimeout(() => {
          const s = getState();
          s.heroIndex = targetIndex;
          s.introUsed = true;
          setState(s);
          setHeroAt(targetIndex, true);
          resolve();
        }, 2850);
        return;
      }

      setHeroAt(current, true);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        hero.style.transition = 'left 2s cubic-bezier(.22,1,.36,1), top 2s cubic-bezier(.22,1,.36,1), opacity .25s ease';
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
      }, 2050);
    });
  }

  function renderBoard() {
    const inner = $('mapInner'); if (!inner) return;
    const state = getState(); const active = currentSlot(state); const heroIndex = Number.isInteger(state.heroIndex) ? state.heroIndex : null;
    inner.innerHTML = '';
    LEVEL_POSITIONS.forEach((pos, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `map-token v4-node ${isPlaceholderSlot(index) ? 'placeholder-node' : 'quiz-node'}`;
      btn.style.left = `${pos.x}%`; btn.style.top = `${pos.y}%`;
      const assigned = state.slots[index]; const done = state.completed[index]; const isActive = index === active;
      if (done) btn.innerHTML = `<img class="done-flag-token" src="assets/images/ui/flag_complete.webp" alt="abgeschlossen"><span class="token-label">Level ${index+1}</span>`;
      else if (isActive) btn.innerHTML = `<span class="token-label open-level-pill">Level ${index+1}</span>`;
      else btn.innerHTML = `<img class="lock-token" src="assets/images/ui/lock.png" alt="Schloss"><span class="token-label">Level ${index+1}</span>`;
      btn.addEventListener('click', () => onLevelNode(index)); inner.appendChild(btn);
    });
    const hero = document.createElement('button'); hero.type='button'; hero.id='movingHero'; hero.className='map-token moving-hero-token'; hero.innerHTML='<img class="hero-token" src="assets/images/characters/held.webp" alt="Sir Nervus">'; inner.appendChild(hero);
    if (heroIndex !== null) setHeroAt(heroIndex, true); else { hero.classList.add('hidden'); hero.style.left='92%'; hero.style.top='96%'; }
    renderGuide(state);
  }

  function renderGuide(state) {
    const guide = $('boardGuide'); if (!guide) return;
    const showGuide = state.started && state.heroIndex === null && !state.introUsed && currentSlot(state) === 0;
    guide.classList.toggle('hidden', !showGuide); guide.classList.remove('go-away');
  }

  let introHeroMoving = false;
  async function startIntroHeroJourney() {
    const state = getState();
    if (introHeroMoving || state.heroIndex !== null || state.introUsed || currentSlot(state) !== 0) return;
    introHeroMoving = true;
    const guide = $('boardGuide');
    guide?.classList.add('go-away');
    await sleep(450);
    hide(guide);
    await animateHeroTo(0, { fromIntro:true });
    introHeroMoving = false;
    openScan(0);
  }

  async function onLevelNode(index) {
    const state = getState(); const active = currentSlot(state); const completed = state.completed[index];
    if (!completed && index !== active) return;
    const fromIntro = state.heroIndex === null && index === 0 && !state.introUsed;
    if (fromIntro) { $('boardGuide')?.classList.add('go-away'); await sleep(650); hide($('boardGuide')); }
    await animateHeroTo(index, { fromIntro });
    const latest = getState(); const assigned = latest.slots[index];

    if (isPlaceholderSlot(index)) {
      if (completed && index !== 1) return;
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
  function activeScanMeta() { return Number.isInteger(scanIndex) ? { slot: scanIndex, isBoss:false } : null; }
  function openScan(index) {
    stopSound('background'); scanIndex = index; $('manualCodeInput').value=''; setScanMessage(''); applyStagePopup($('scanModal'), { slot:index, isBoss:false }); show($('scanModal')); startScanner();
  }
  function closeScan() { stopScanner(); hide($('scanModal')); scanIndex = null; playSound('background', { loop:true, restart:true }); }
  function skipCurrentLevel() {
    const index = Number.isInteger(scanIndex) ? scanIndex : currentSlot(getState());
    if (!Number.isInteger(index) || index < 0 || index >= LEVEL_COUNT) return;
    stopScanner();
    hide($('scanModal'));
    scanIndex = null;
    const state = getState();
    state.completed[index] = true;
    state.heroIndex = index;
    setState(state);
    renderBoard();
    localStorage.setItem(RETURN_STORE, JSON.stringify({ type:'unlocked', meta:{ slot:index, skipped:true } }));
    applyReturnModal();
  }
  function setScanMessage(text, bad=false) { const msg=$('scanMessage'); if (!msg) return; msg.textContent=text; msg.className = text ? `message ${bad?'bad':'ok'}` : 'message hidden'; }
  async function startScanner() {
    const info = $('cameraInfo'); if (info) info.textContent='Kamera wird vorbereitet …';
    try {
      if (!window.Html5Qrcode) throw new Error('Scanner-Bibliothek nicht verfügbar.');
      scanner = new window.Html5Qrcode('qrReader');
      await scanner.start({ facingMode:'environment' }, { fps: 8, qrbox: { width: 220, height: 220 } }, txt => unlockByCode(txt));
      if (info) info.textContent='';
    } catch (e) { if (info) info.textContent='Kamera nicht verfügbar. Code bitte manuell eingeben oder zufälligen Gegner wählen.'; }
  }
  async function stopScanner() { try { if (scanner) await scanner.stop(); } catch (_) {} scanner = null; }
  function unlockByCode(raw) {
    if (!Number.isInteger(scanIndex)) return;
    const code = String(raw || '').trim().toUpperCase();
    const candidates = scanIndex === BOSS_SLOT ? [BOSS] : Object.values(SENSES);
    const entry = candidates.find(s => s.code?.toUpperCase() === code || s.id.toUpperCase() === code.replace('SINNE-',''));
    if (!entry) { setScanMessage(scanIndex === BOSS_SLOT ? 'Für dieses Feld brauchst du den Boss-Code.' : 'Code nicht erkannt.', true); return; }
    if (usedIds().includes(entry.id)) { setScanMessage('Dieser Gegner wurde schon verwendet.', true); return; }
    unlockSense(entry.id, scanIndex);
  }
  function unlockRandom() {
    if (!Number.isInteger(scanIndex)) return;
    if (scanIndex === BOSS_SLOT) { unlockSense('boss', scanIndex); return; }
    const unused = Object.keys(SENSES).filter(id => !usedIds().includes(id));
    if (!unused.length) { setScanMessage('Alle Sinnes-Gegner wurden bereits verwendet.', true); return; }
    unlockSense(unused[Math.floor(Math.random()*unused.length)], scanIndex);
  }
  async function unlockSense(id, index) {
    await stopScanner(); hide($('scanModal'));
    const state = getState(); state.slots[index]=id; state.heroIndex=index; setState(state);
    playSound('levelunlocked'); renderBoard(); showEncounter(id,index);
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

    window.pendingLaunch = { placeholder:true, slot:index, meta };
    $('launchLevelBtn').textContent = index === LEVEL_COUNT - 1 ? 'Zum Finale' : 'Weiter';
    $('encounterBackBtn').textContent = 'Wegrennen';
    $('encounterImage').src = ASSETS.winHero;
    $('encounterImage').alt = 'Sir Nervus macht weiter';
    $('encounterKicker').textContent = 'Zwischenstation';
    $('encounterTitle').textContent = `Level ${index + 1}`;
    $('encounterSpeech').textContent = index === LEVEL_COUNT - 1 ? 'Das Königreich ist gerettet. Weiter zum Abschluss!' : 'Kurze Rast geschafft. Weiter zum nächsten Feld!';
    show(modal);
  }

  function handleEncounterBack() {
    if (window.pendingLaunch?.minigame) {
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
    if (window.pendingLaunch.placeholder) { completePlaceholder(window.pendingLaunch.slot); return; }
    location.href = window.pendingLaunch.url;
  }

  async function completePlaceholder(index) {
    hide($('encounterModal'));
    const state = getState();
    state.completed[index] = true;
    state.heroIndex = index;
    setState(state);
    renderBoard();
    playSound('levelunlocked');
    const next = currentSlot(getState());
    if (next >= LEVEL_COUNT) { showOutro(); return; }
    await animateHeroTo(next);
    const latest = getState();
    if (isPlaceholderSlot(next)) showPlaceholder(next);
    else if (latest.slots[next]) showEncounter(latest.slots[next], next);
    else openScan(next);
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

  function applyReturnModal() {
    const raw = localStorage.getItem(RETURN_STORE); if (!raw) return; localStorage.removeItem(RETURN_STORE);
    let data; try { data=JSON.parse(raw); } catch (_) { return; }
    const modal = $('levelUnlockedModal'); if (!modal) return;
    applyStagePopup(modal, data.meta);
    const img = modal.querySelector('img'); const title=$('levelUnlockedTitle'); const kicker=$('levelUnlockedKicker'); const text=$('levelUnlockedText');
    stopSound('background');
    if (data.type === 'escape') { img.src=ASSETS.escapeHero; kicker.textContent=''; title.textContent='Du bist entkommen.'; text.textContent='Scanne einen neuen QR-Code, um es erneut zu versuchen.'; }
    else { img.src=ASSETS.winHero; kicker.textContent='Erfolg'; title.textContent='Neues Level freigeschaltet'; text.textContent='Weiter zum Spielbrett.'; playSound('levelunlocked'); }
    show(modal);
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
    if (meta.isBoss) {
      state.bossCompleted = true;
      state.completed[meta.slot] = true;
      state.heroIndex = meta.slot;
    } else {
      state.completed[meta.slot] = true;
      state.heroIndex = meta.slot;
    }
    setState(state); sessionStorage.removeItem(BATTLE_STORE);
    localStorage.setItem(RETURN_STORE, JSON.stringify({ type:'unlocked', meta }));
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
    tutorial.className = 'mini-tutorial-modal hidden';
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
    else if (page === 'codes') initCodes();
  });
})();
