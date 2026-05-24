(() => {
  'use strict';

  // ─── Spielwelt-Daten ───────────────────────────────────────────────────────

  const SENSES = {
    sehen: {
      id: 'sehen', label: 'Sehen', enemyName: 'Sehlina', code: 'SINNE-SEHEN', enemy: 'sehen.webp', defeated: 'sehen_besiegt.webp',
      title: 'Level: Sehen', speech: '„Meine Illusionen blenden dich. Mal sehen, ob du den richtigen Reiz erkennst!"',
      intro: 'Hier geht es um das Auge, Lichtreize und die Verarbeitung von Sehinformationen.',
      content: ['Das Auge nimmt Lichtreize aus der Umgebung auf. Hornhaut und Linse bündeln das Licht, sodass auf der Netzhaut ein Bild entsteht.', 'Auf der Netzhaut sitzen Sinneszellen. Sie wandeln Licht in elektrische Signale um. Diese Signale gelangen über den Sehnerv zum Gehirn, wo sie verarbeitet und zu einem Bild zusammengesetzt werden.'],
      tasks: ['Beschreibe den Weg des Lichts durch das Auge.', 'Erkläre die Aufgabe von Netzhaut und Sehnerv.', 'Nenne eine Situation, in der gutes Sehen besonders wichtig ist.'],
    },
    hoeren: {
      id: 'hoeren', label: 'Hören', enemyName: 'Höhribert', code: 'SINNE-HOEREN', enemy: 'hoeren.webp', defeated: 'hoeren_besiegt.webp',
      title: 'Level: Hören', speech: '„Ich verdrehe jede Schallwelle. Ob du trotzdem den richtigen Ton triffst?"',
      intro: 'Hier geht es um das Ohr, Schallwellen und den Gleichgewichtssinn.',
      content: ['Das Ohr nimmt Schallwellen auf. Die Ohrmuschel leitet den Schall zum Trommelfell weiter. Dieses gerät in Schwingung.', 'Die Gehörknöchelchen verstärken die Schwingungen. In der Hörschnecke werden sie in Nervensignale umgewandelt. Außerdem ist das Innenohr wichtig für das Gleichgewicht.'],
      tasks: ['Ordne Außenohr, Mittelohr und Innenohr je eine Aufgabe zu.', 'Erkläre, wie Schall zu einem Nervensignal wird.', 'Beschreibe, warum das Ohr auch für Gleichgewicht wichtig ist.'],
    },
    riechen: {
      id: 'riechen', label: 'Riechen', enemyName: 'Riechard', code: 'SINNE-RIECHEN', enemy: 'riechen.webp', defeated: 'riechen_besiegt.webp',
      title: 'Level: Riechen', speech: '„Mein Nebel liegt in der Luft. Folge der Spur, wenn du dich traust!"',
      intro: 'Hier geht es um die Nase, Geruchsstoffe und die Bedeutung des Riechens im Alltag.',
      content: ['Die Nase erkennt Geruchsstoffe in der Luft. Beim Einatmen gelangen Duftmoleküle zur Riechschleimhaut.', 'Dort sitzen Riechzellen, die passende Moleküle erkennen und Signale an das Gehirn senden. Gerüche können warnen, Erinnerungen auslösen und den Geschmack beeinflussen.'],
      tasks: ['Beschreibe, wie ein Geruch von der Luft bis ins Gehirn gelangt.', 'Nenne zwei Situationen, in denen der Geruchssinn schützt.', 'Erkläre, warum Essen bei Schnupfen anders schmecken kann.'],
    },
    schmecken: {
      id: 'schmecken', label: 'Schmecken', enemyName: 'König Schmatz', code: 'SINNE-SCHMECKEN', enemy: 'schmecken.webp', defeated: 'schmecken_besiegt.webp',
      title: 'Level: Schmecken', speech: '„Süß, sauer, salzig? Ich bringe alles durcheinander. Beweise deinen Geschmack!"',
      intro: 'Hier geht es um die Zunge, Geschmacksrichtungen und das Zusammenspiel der Sinne.',
      content: ['Auf der Zunge befinden sich Geschmacksknospen. Sie erkennen Stoffe aus der Nahrung und ermöglichen Geschmackswahrnehmungen.', 'Häufig unterscheidet man süß, sauer, salzig, bitter und umami. Geschmack entsteht aber nicht nur auf der Zunge: Geruch, Temperatur und Konsistenz wirken mit.'],
      tasks: ['Nenne die fünf häufig genannten Geschmacksrichtungen.', 'Erkläre, warum Geruch und Geschmack zusammenhängen.', 'Beschreibe ein Lebensmittel mit mehreren Sinneseindrücken.'],
    },
    fuehlen: {
      id: 'fuehlen', label: 'Fühlen', enemyName: 'Dr. Tastibald', code: 'SINNE-FUEHLEN', enemy: 'fuehlen.webp', defeated: 'fuehlen_besiegt.webp',
      title: 'Level: Fühlen', speech: '„Meine Panzer fühlen alles. Spürst du, was Schutz wirklich bedeutet?"',
      intro: 'Hier geht es um die Haut, Berührung, Temperatur, Schmerz und Schutz.',
      content: ['Die Haut ist das größte Sinnesorgan des Körpers. Sie enthält Rezeptoren für Berührung, Druck, Wärme, Kälte und Schmerz.', 'Gleichzeitig schützt die Haut vor Verletzungen, Krankheitserregern und Austrocknung. Sie ist also Sinnesorgan und Schutzschicht zugleich.'],
      tasks: ['Nenne drei Reize, die die Haut wahrnehmen kann.', 'Erkläre, warum Schmerz eine Schutzfunktion hat.', 'Beschreibe, warum die Haut mehr ist als nur eine Hülle.'],
    }
  };

  const BOSS = {
    id: 'boss', label: 'Boss', enemyName: 'Sinntron 3000', enemy: 'boss.webp', defeated: 'boss_besiegt.webp', title: 'Finale: Boss der Sinne',
    speech: '„Alle Sinne gegen mich? Dann zeig, dass du das Königreich wirklich verstanden hast!"',
    intro: 'Im finalen Level geht es um das Zusammenspiel aller Sinnesorgane.',
    content: ['Sinnesorgane nehmen Reize aus der Umwelt oder aus dem Körper auf. Das Gehirn verarbeitet diese Informationen und ordnet sie ein.', 'Viele Wahrnehmungen entstehen durch das Zusammenspiel mehrerer Sinne. Beim Essen wirken zum Beispiel Geschmack, Geruch, Temperatur, Konsistenz und Sehen zusammen.'],
    tasks: ['Erkläre, warum Sinnesorgane nicht völlig getrennt voneinander arbeiten.', 'Nenne ein Beispiel, in dem mehrere Sinne zusammenwirken.', 'Beschreibe, welche Rolle das Gehirn bei der Wahrnehmung spielt.'],
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

  const EVALUATION_IMAGES = {
    correct: ['richtig_1.webp', 'richtig_2.webp', 'richtig_3.webp'],
    wrong: ['falsch_1.webp', 'falsch_2.webp', 'falsch_3.webp'],
    final: 'final.webp'
  };

  const LEVEL_POSITIONS = [
    { x: 47.2, y: 85.8 },
    { x: 51.8, y: 63.9 },
    { x: 49.9, y: 47.7 },
    { x: 51.5, y: 32.8 },
    { x: 50.1, y: 18.8 }
  ];
  const BOSS_POSITION = { x: 50.0, y: 8.6 };
  const STAGE_BACKGROUNDS = ['stage_gras.webp', 'stage_sand.webp', 'stage_eis.webp', 'stage_lava.webp', 'stage_himmel.webp'];
  const BOSS_BACKGROUND = 'stage_all.webp';
  const POPUP_BACKGROUNDS = ['popup_gras.webp', 'popup_sand.webp', 'popup_eis.webp', 'popup_lava.webp', 'popup_himmel.webp'];
  const BOSS_POPUP_BACKGROUND = 'popup_all.webp';
  const BOARD_RATIO = 1086 / 1448;

  let boardTravel = null;
  let boardTravelToken = 0;

  const STORE = 'koenigreichSinneGameRebuildV1';
  const UNLOCKED_MODAL_STORE = 'koenigreichSinneShowUnlockedModalV1';
  const RETURN_MODAL_STORE = 'koenigreichSinneReturnModalV1';
  const SOUND_STORE = 'koenigreichSinneSoundMutedV1';

  // ─── Kamera-Zustand ────────────────────────────────────────────────────────

  let scanStream = null;
  let scanTimer = null;
  let html5Scanner = null;
  let activeSlotForScan = null;
  let pendingLaunch = null;
  let pendingBattleContext = null;

  // ─── Audio ─────────────────────────────────────────────────────────────────

  const AUDIO_FILES = {
    background: 'background.mp3',
    levelstart: 'levelstart.mp3',
    levelunlocked: 'levelunlocked.mp3',
    fight: 'fight.mp3',
    win: 'win.mp3',
    lose: 'lose.mp3',
    richtig: 'richtig.mp3',
    falsch: 'falsch.mp3',
    final: 'final.mp3',
    richtig_1: 'richtig_1.mp3',
    richtig_2: 'richtig_2.mp3',
    richtig_3: 'richtig_3.mp3',
    falsch_1: 'falsch_1.mp3',
    falsch_2: 'falsch_2.mp3',
    falsch_3: 'falsch_3.mp3',
    battle_background: 'battle_background.mp3'
  };

  const audio = {};
  const managedPlayers = {};
  const playerTokens = {};
  let audioReady = false;
  let soundMuted = localStorage.getItem(SOUND_STORE) === '1';
  let audioButton = null;

  function volumeForKey(key) {
    if (key === 'background') return 0.04;
    if (key === 'battle_background') return 0.10;
    if (key === 'win' || key === 'lose') return 0.96;
    if (key === 'final') return 0.94;
    if (/^(richtig|falsch)_\d+$/.test(key)) return 0.92;
    return 0.88;
  }

  function channelForKey(key) {
    if (key === 'win' || key === 'lose') return 'outcome';
    if (key === 'final' || /^(richtig|falsch)_\d+$/.test(key)) return 'evaluation';
    return 'ui';
  }

  function initAudio() {
    if (audioReady) return;
    Object.entries(AUDIO_FILES).forEach(([key, file]) => {
      const a = new Audio(file);
      a.preload = 'auto';
      a.setAttribute('playsinline', '');
      a.playsInline = true;
      a.volume = volumeForKey(key);
      if (key === 'background' || key === 'battle_background') a.loop = true;
      audio[key] = a;
    });
    managedPlayers.ui = createManagedPlayer();
    managedPlayers.evaluation = createManagedPlayer();
    managedPlayers.outcome = createManagedPlayer();
    audioReady = true;
  }

  function createManagedPlayer() {
    const player = new Audio();
    player.preload = 'auto';
    player.setAttribute('playsinline', '');
    player.playsInline = true;
    return player;
  }

  // ─── Audio-Button ──────────────────────────────────────────────────────────

  function ensureAudioButton() {
    if (audioButton) return audioButton;
    audioButton = document.createElement('button');
    audioButton.type = 'button';
    audioButton.id = 'speakerToggleBtn';
    audioButton.className = 'speaker-btn';
    audioButton.setAttribute('aria-label', 'Ton umschalten');
    audioButton.addEventListener('click', async (event) => {
      event.preventDefault();
      soundMuted = !soundMuted;
      localStorage.setItem(SOUND_STORE, soundMuted ? '1' : '0');
      updateAudioButton();
      if (soundMuted) {
        stopBackgroundMusic();
        stopBattleBackground();
        stopManagedChannel('ui');
        stopManagedChannel('evaluation');
        stopManagedChannel('outcome');
      } else {
        initAudio();
        if (isBoardVisible()) startBackgroundMusic(true);
      }
    });
    document.body.appendChild(audioButton);
    updateAudioButton();
    return audioButton;
  }

  function updateAudioButton() {
    const btn = ensureAudioButton();
    btn.textContent = soundMuted ? '🔇' : '🔊';
    btn.title = soundMuted ? 'Ton einschalten' : 'Ton ausschalten';
    btn.setAttribute('aria-pressed', soundMuted ? 'true' : 'false');
  }

  // ─── Hintergrundmusik ──────────────────────────────────────────────────────

  function isBoardVisible() {
    return document.body.dataset.page === 'board' && !el('boardScreen')?.classList.contains('hidden');
  }

  function startBackgroundMusic(restart = false) {
    initAudio();
    if (soundMuted || !isBoardVisible()) return Promise.resolve();
    const bg = audio.background;
    if (!bg) return Promise.resolve();
    try {
      bg.volume = volumeForKey('background');
      if (restart) { bg.pause(); bg.currentTime = 0; }
    } catch {}
    return bg.play().catch(() => {});
  }

  function stopBackgroundMusic() {
    if (!audioReady) return;
    try { audio.background?.pause(); } catch {}
  }

  function startBattleBackground() {
    initAudio();
    if (soundMuted) return;
    const bg = audio.battle_background;
    if (!bg) return;
    try { bg.pause(); bg.currentTime = 0; bg.volume = volumeForKey('battle_background'); } catch {}
    bg.play().catch(() => {});
  }

  function stopBattleBackground() {
    if (!audioReady) return;
    const bg = audio.battle_background;
    if (!bg) return;
    try { bg.pause(); bg.currentTime = 0; } catch {}
  }

  function scheduleBoardMusicResume() {
    if (!isBoardVisible() || soundMuted) return;
    const attempts = [0, 120, 350, 800, 1500, 2600];
    attempts.forEach(delay => window.setTimeout(() => startBackgroundMusic(delay === 0), delay));
    const resumeOnce = () => startBackgroundMusic(true);
    window.addEventListener('pointerdown', resumeOnce, { once: true, passive: true });
    window.addEventListener('touchstart', resumeOnce, { once: true, passive: true });
    window.addEventListener('click', resumeOnce, { once: true });
  }

  // ─── Managed Audio-Channels ────────────────────────────────────────────────

  function stopManagedChannel(channel) {
    const player = managedPlayers[channel];
    if (!player) return;
    try { player.pause(); player.currentTime = 0; } catch {}
  }

  async function playManagedSound(key, channel = channelForKey(key)) {
    initAudio();
    if (soundMuted) return;
    const file = AUDIO_FILES[key];
    const player = managedPlayers[channel];
    if (!file || !player) return;

    const token = (playerTokens[channel] || 0) + 1;
    playerTokens[channel] = token;

    try {
      player.pause();
      player.loop = false;
      player.volume = volumeForKey(key);
      if (player.dataset.soundKey !== key) {
        player.src = file;
        player.dataset.soundKey = key;
        player.load();
      } else {
        player.currentTime = 0;
      }
      const attempt = () => {
        if (playerTokens[channel] !== token || soundMuted) return Promise.resolve();
        try { player.currentTime = 0; } catch {}
        return player.play().catch(() => {});
      };
      await attempt();
      if (player.paused && playerTokens[channel] === token && !soundMuted) {
        await new Promise(resolve => window.setTimeout(resolve, 80));
        await attempt();
      }
    } catch {}
  }

  function playSound(key) {
    initAudio();
    if (soundMuted) return Promise.resolve();
    if (!AUDIO_FILES[key]) return Promise.resolve();
    if (key === 'background') return audio.background?.play().catch(() => {}) || Promise.resolve();
    if (key === 'battle_background') { startBattleBackground(); return Promise.resolve(); }
    return playManagedSound(key);
  }

  function stopSound(key) {
    if (key === 'background') { stopBackgroundMusic(); return; }
    if (key === 'battle_background') { stopBattleBackground(); return; }
    stopManagedChannel(channelForKey(key));
  }

  function prepareOutcomeSound() {
    stopManagedChannel('evaluation');
    stopManagedChannel('outcome');
  }

  // ─── Board-Rückkehr-Modal & Musik-Resume ──────────────────────────────────

  function markBoardMusicResume() {
    sessionStorage.setItem('resumeBoardMusic', '1');
    localStorage.setItem('koenigreichSinneResumeMusicV1', String(Date.now()));
  }

  function storeBoardReturnModal(type, meta = {}) {
    localStorage.setItem(RETURN_MODAL_STORE, JSON.stringify({
      type,
      slot: Number.isInteger(meta.slot) ? meta.slot : null,
      isBoss: !!meta.isBoss
    }));
  }

  function readBoardReturnModal() {
    try {
      const raw = localStorage.getItem(RETURN_MODAL_STORE);
      if (!raw) return null;
      localStorage.removeItem(RETURN_MODAL_STORE);
      return JSON.parse(raw);
    } catch {
      localStorage.removeItem(RETURN_MODAL_STORE);
      return null;
    }
  }

  // ─── Spielstand ────────────────────────────────────────────────────────────

  function defaultState() {
    return { started: false, slots: [null, null, null, null, null], completed: [false, false, false, false, false], bossCompleted: false, boardGuideSeen: false, heroNode: null };
  }

  function getState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORE));
      if (!parsed || !Array.isArray(parsed.slots) || !Array.isArray(parsed.completed)) return defaultState();
      return { ...defaultState(), ...parsed };
    } catch {
      return defaultState();
    }
  }

  function setState(state) { localStorage.setItem(STORE, JSON.stringify(state)); }
  function resetGame() { localStorage.removeItem(STORE); window.location.href = 'index.html'; }

  // ─── Hilfsfunktionen Spielzustand ─────────────────────────────────────────

  function senseList() { return Object.values(SENSES); }
  function usedSenseIds(state = getState()) { return state.slots.filter(Boolean); }
  function currentSlot(state = getState()) { return state.completed.findIndex(done => !done); }
  function getHeroNode(state = getState()) {
    if (Number.isInteger(state.heroNode) && state.heroNode >= 0 && state.heroNode < LEVEL_POSITIONS.length) return state.heroNode;
    for (let i = state.completed.length - 1; i >= 0; i -= 1) {
      if (state.completed[i]) return i;
    }
    return null;
  }
  function allLevelsDone(state = getState()) { return state.completed.every(Boolean); }
  function isBoardGuidePending(state = getState()) {
    return !!(state.started && !state.boardGuideSeen && !state.slots.some(Boolean) && !state.completed.some(Boolean) && !state.bossCompleted);
  }

  function codeToSense(text) {
    const raw = String(text || '').trim().toUpperCase();
    return senseList().find(s => raw.includes(s.code) || raw === s.id.toUpperCase() || raw.includes(s.label.toUpperCase())) || null;
  }

  function getQuestions(data) {
    return QUESTION_BANK[data.id] || [];
  }

  // ─── DOM-Hilfsfunktionen ──────────────────────────────────────────────────

  function qs(name) { return new URLSearchParams(window.location.search).get(name); }
  function el(id) { return document.getElementById(id); }
  function show(node) { node && node.classList.remove('hidden'); }
  function hide(node) { node && node.classList.add('hidden'); }
  function setText(id, text) { const n = el(id); if (n) n.textContent = text; }
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c]));
  }

  // ─── Board-Menü ───────────────────────────────────────────────────────────

  function setBoardMenuOpen(open) {
    if (document.body.dataset.page !== 'board') return;
    document.body.classList.toggle('board-menu-open', !!open);
  }

  function toggleBoardMenu(open) {
    if (!getState().started) return;
    setBoardMenuOpen(typeof open === 'boolean' ? open : !document.body.classList.contains('board-menu-open'));
  }

  // ─── Initialisierung ──────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', () => {
    initAudio();
    ensureAudioButton();

    // Hintergrundmusik-Resume merken wenn man zum Board zurücknavigiert
    const rememberBoardReturn = event => {
      if (event.target.closest?.('a[href="index.html"], button[data-board-return]')) markBoardMusicResume();
    };
    document.addEventListener('pointerdown', rememberBoardReturn, true);
    document.addEventListener('touchstart', rememberBoardReturn, true);
    document.addEventListener('click', rememberBoardReturn, true);

    // Musik pausieren/fortsetzen bei Tab-Wechsel
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopBackgroundMusic();
      else if (isBoardVisible()) startBackgroundMusic(true);
    });

    const page = document.body.dataset.page;
    if (page === 'board') initBoard();
    if (page === 'level') { stopBackgroundMusic(); initLevel(); }
    if (page === 'codes') { stopBackgroundMusic(); initCodes(); }
  });

  // ─── Board ────────────────────────────────────────────────────────────────

  function initBoard() {
    const state = getState();
    const intro = el('introScreen');
    const board = el('boardScreen');
    const below = el('belowBoard');

    if (state.started) {
      hide(intro); show(board); show(below); show(el('openBoardMenuBtn'));
    } else {
      show(intro); hide(board); hide(below); hide(el('openBoardMenuBtn')); setBoardMenuOpen(false);
    }

    // Start-Button (mehrfache Event-Typen für mobile Zuverlässigkeit)
    const startBtn = el('startGameBtn');
    let startHandled = false;
    const startGameNow = (event) => {
      if (event) { event.preventDefault(); event.stopPropagation(); }
      if (startHandled) return;
      startHandled = true;
      const s = getState();
      s.started = true;
      s.heroNode = null;
      setState(s);
      hide(intro); show(board); show(below); show(el('openBoardMenuBtn'));
      setBoardMenuOpen(false);
      updateBoardBox();
      renderBoard();
      renderBoardGuide();
      startBackgroundMusic(true);
    };
    if (startBtn) {
      startBtn.addEventListener('click', startGameNow);
      startBtn.addEventListener('pointerup', startGameNow);
      startBtn.addEventListener('touchend', startGameNow, { passive: false });
    }

    el('resetGameBtn')?.addEventListener('click', resetGame);
    el('openBoardMenuBtn')?.addEventListener('click', () => toggleBoardMenu(true));
    el('closeBoardMenuBtn')?.addEventListener('click', () => toggleBoardMenu(false));

    el('levelUnlockedContinueBtn')?.addEventListener('click', () => {
      const m = el('levelUnlockedModal');
      hide(m);
      m?.classList.remove('stage-popup');
      m?.style.removeProperty('--popup-bg');
      startBackgroundMusic(true);
    });

    el('scanJumpBottomBtn')?.addEventListener('click', () => scrollScanModal('bottom'));
    el('scanJumpTopBtn')?.addEventListener('click', () => scrollScanModal('top'));
    el('toggleScannerBtn')?.addEventListener('click', toggleScannerPanel);
    el('closeScanBtn')?.addEventListener('click', closeScanModal);
    el('backToBoardBtn')?.addEventListener('click', () => escapeFromBoardModal('scan'));
    el('manualUnlockBtn')?.addEventListener('click', () => handleScanText(el('manualCodeInput')?.value));
    el('manualCodeInput')?.addEventListener('keydown', e => { if (e.key === 'Enter') handleScanText(e.target.value); });
    el('randomUnlockBtn')?.addEventListener('click', handleRandomUnlock);
    el('encounterBackBtn')?.addEventListener('click', () => escapeFromBoardModal('encounter'));

    el('launchLevelBtn')?.addEventListener('click', async () => {
      if (!pendingLaunch) return;
      await playSound('fight');
      window.setTimeout(() => {
        stopBackgroundMusic();
        if (pendingLaunch.type === 'boss') window.location.href = 'level.html?type=boss';
        else window.location.href = `level.html?sense=${encodeURIComponent(pendingLaunch.sense)}&slot=${pendingLaunch.slot}`;
      }, 450);
    });

    window.addEventListener('resize', () => { updateBoardBox(); renderBoard(); });
    el('boardImage')?.addEventListener('load', () => { updateBoardBox(); renderBoard(); });
    updateBoardBox();
    renderBoard();
    renderBoardGuide();

    if (state.started) {
      const shouldResume = sessionStorage.getItem('resumeBoardMusic') === '1' || localStorage.getItem('koenigreichSinneResumeMusicV1');
      sessionStorage.removeItem('resumeBoardMusic');
      localStorage.removeItem('koenigreichSinneResumeMusicV1');
      const returnModal = readBoardReturnModal();
      if (returnModal) {
        window.setTimeout(() => showLevelUnlockedModalOnBoard(returnModal), 120);
      } else if (localStorage.getItem(UNLOCKED_MODAL_STORE) === '1') {
        localStorage.removeItem(UNLOCKED_MODAL_STORE);
        window.setTimeout(() => showLevelUnlockedModalOnBoard({ type: 'unlocked' }), 120);
      } else if (shouldResume) {
        scheduleBoardMusicResume();
      } else {
        window.setTimeout(() => startBackgroundMusic(true), 250);
      }
    }
  }

  function escapeFromBoardModal(source) {
    const state = getState();
    let slot = null;
    if (source === 'scan') {
      slot = Number.isInteger(activeSlotForScan) ? activeSlotForScan : null;
      closeScanModal(false);
    } else if (source === 'encounter') {
      slot = pendingLaunch && Number.isInteger(pendingLaunch.slot) ? pendingLaunch.slot : null;
      hide(el('encounterModal'));
      pendingLaunch = null;
    }
    if (Number.isInteger(slot) && !state.completed[slot]) {
      state.slots[slot] = null;
      setState(state);
      renderBoard();
    }
    showLevelUnlockedModalOnBoard({ type: 'escaped', slot });
    stopBackgroundMusic();
  }

  function showLevelUnlockedModalOnBoard(options = {}) {
    const modal = el('levelUnlockedModal');
    if (!modal) { startBackgroundMusic(true); return; }

    const isEscape = options.type === 'escaped' || options.type === 'run';
    setText('levelUnlockedTitle', isEscape ? 'Du bist entkommen' : 'Neues Level freigeschaltet');
    setText('levelUnlockedText', isEscape ? 'Scanne einen neuen QR-Code, um es erneut zu versuchen.' : 'Weiter zum Spielbrett.');

    const kicker = el('levelUnlockedKicker');
    if (kicker) { kicker.textContent = isEscape ? '' : 'Erfolg'; kicker.classList.toggle('hidden', isEscape); }

    const image = modal.querySelector('.character-img');
    if (image) {
      image.src = isEscape ? 'held_entkommen.webp' : 'held_gewonnen.webp';
      image.alt = isEscape ? 'Held ist entkommen' : 'Held steckt die Flagge in den Boden';
    }

    setModalPopupBackground(modal, options.isBoss ? BOSS_POPUP_BACKGROUND : (Number.isInteger(options.slot) ? POPUP_BACKGROUNDS[options.slot] : null));
    show(modal);
  }

  // ─── Board-Guide & Runner ─────────────────────────────────────────────────

  function renderBoardGuide() {
    const guide = el('boardGuide');
    const runner = el('boardRunner');
    if (guide) {
      guide.classList.remove('go-away');
      guide.classList.toggle('hidden', !isBoardGuidePending() || document.body.dataset.page !== 'board' || el('boardScreen')?.classList.contains('hidden'));
    }
    if (runner) {
      runner.classList.remove('running');
      runner.style.opacity = '0';
      hide(runner);
    }
    boardTravel = null;
  }

  function setRunnerPosition(runner, pos) {
    if (!runner || !pos) return;
    runner.style.left = `${pos.x}%`;
    runner.style.top = `${pos.y}%`;
  }

  function animateRunner(fromPos, toPos, duration = 2000, onArrive) {
    const runner = el('boardRunner');
    const token = ++boardTravelToken;
    if (!runner || !fromPos || !toPos) {
      onArrive?.();
      return;
    }

    runner.classList.remove('hidden', 'running');
    runner.style.opacity = '1';
    runner.style.transitionDuration = `${duration}ms`;
    setRunnerPosition(runner, fromPos);
    runner.style.setProperty('--target-left', `${toPos.x}%`);
    runner.style.setProperty('--target-top', `${toPos.y}%`);
    void runner.offsetWidth;
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => runner.classList.add('running'));
    });

    window.setTimeout(() => {
      if (token !== boardTravelToken) return;
      runner.classList.remove('running');
      runner.style.opacity = '0';
      hide(runner);
      onArrive?.();
    }, duration + 50);
  }

  function playBoardStartSequence(index, onArrive) {
    if (boardTravel) return;
    const state = getState();
    state.boardGuideSeen = true;
    setState(state);
    const guide = el('boardGuide');
    const target = LEVEL_POSITIONS[index] || LEVEL_POSITIONS[0];
    boardTravel = { from: 'intro', to: index };
    guide?.classList.add('go-away');

    window.setTimeout(() => {
      hide(guide);
      const movingState = getState();
      movingState.heroNode = null;
      setState(movingState);
      renderBoard();
      playSound('levelstart');
      const startPos = { x: 18.5, y: 95.2 };
      animateRunner(startPos, target, 2000, () => {
        const nextState = getState();
        nextState.heroNode = index;
        setState(nextState);
        boardTravel = null;
        renderBoard();
        stopBackgroundMusic();
        window.setTimeout(() => onArrive?.(), 350);
      });
    }, 800);
  }

  function playBoardTravelSequence(fromIndex, toIndex, onArrive) {
    if (boardTravel || fromIndex === toIndex) {
      if (fromIndex === toIndex) onArrive?.();
      return;
    }

    const from = LEVEL_POSITIONS[fromIndex] || LEVEL_POSITIONS[toIndex] || LEVEL_POSITIONS[0];
    const target = LEVEL_POSITIONS[toIndex] || from;
    boardTravel = { from: fromIndex, to: toIndex };

    const movingState = getState();
    movingState.heroNode = fromIndex;
    setState(movingState);
    renderBoard();
    playSound('levelstart');

    window.setTimeout(() => {
      const transientState = getState();
      transientState.heroNode = null;
      setState(transientState);
      renderBoard();
      animateRunner(from, target, 2000, () => {
        const nextState = getState();
        nextState.heroNode = toIndex;
        setState(nextState);
        boardTravel = null;
        renderBoard();
        window.setTimeout(() => onArrive?.(), 250);
      });
    }, 60);
  }

  // ─── Board-Rendering ──────────────────────────────────────────────────────

  function updateBoardBox() {
    const screen = el('boardScreen');
    const inner = el('mapInner');
    if (!screen || !inner || screen.classList.contains('hidden')) return;
    const w = screen.clientWidth;
    const h = screen.clientHeight;
    let iw, ih;
    if (w / h > BOARD_RATIO) { iw = w; ih = w / BOARD_RATIO; }
    else { ih = h; iw = h * BOARD_RATIO; }
    inner.style.width = `${iw}px`;
    inner.style.height = `${ih}px`;
  }

  function renderBoard() {
    const inner = el('mapInner');
    if (!inner) return;
    inner.innerHTML = '';
    const state = getState();
    const active = currentSlot(state);
    const heroNode = getHeroNode(state);

    LEVEL_POSITIONS.forEach((pos, index) => {
      const assigned = state.slots[index];
      const done = state.completed[index];
      const isActive = index === active && !done;
      const guidePending = isBoardGuidePending(state) && index === 0 && isActive && !assigned;
      const heroHere = heroNode === index && !(boardTravel && boardTravel.from === index);
      const token = document.createElement('button');
      token.type = 'button';
      token.className = `map-token ${guidePending ? 'guide-active' : heroHere ? 'hero-active standing' : done ? 'done' : isActive ? 'available' : 'locked'}`;
      token.style.left = `${pos.x}%`;
      token.style.top = `${pos.y}%`;
      token.innerHTML = tokenHtml(index + 1, assigned, done, isActive, guidePending, heroHere);
      token.addEventListener('click', () => handleNodeClick(index));
      inner.appendChild(token);
    });

    const bossDone = state.bossCompleted;
    const bossActive = allLevelsDone(state) && !bossDone;
    const boss = document.createElement('button');
    boss.type = 'button';
    boss.className = `map-token final ${bossDone ? 'done' : bossActive ? 'hero-active' : 'locked'}`;
    boss.style.left = `${BOSS_POSITION.x}%`;
    boss.style.top = `${BOSS_POSITION.y}%`;
    boss.innerHTML = bossDone
      ? '<img class="done-flag-token boss-flag-token" src="flag_complete.webp" alt="Finale abgeschlossen">'
      : bossActive
        ? '<img class="hero-token" src="held.webp" alt="Held"><span class="token-label">Boss</span>'
        : '<img class="lock-token" src="lock.png" alt="Schloss"><span class="token-label">Finale</span>';
    boss.addEventListener('click', handleBossClick);
    inner.appendChild(boss);

    renderProgress(state);
  }

  function tokenHtml(number, assigned, done, active, guidePending = false, heroHere = false) {
    if (heroHere) return `<img class="hero-token" src="held.webp" alt="Sir Nervus"><span class="token-label">Level ${number}</span>`;
    if (done) {
      const label = assigned ? SENSES[assigned].label : `Level ${number}`;
      return `<img class="done-flag-token" src="flag_complete.webp" alt="${escapeHtml(label)} abgeschlossen">`;
    }
    if (guidePending) return `<span class="token-label guide-only">Level ${number}</span>`;
    if (active) return `<span class="token-label open-level-pill">Level ${number}</span>`;
    return `<img class="lock-token" src="lock.png" alt="Schloss"><span class="token-label">Level ${number}</span>`;
  }

  function renderProgress(state = getState()) {
    const summary = el('progressSummary');
    if (!summary) return;
    summary.innerHTML = '';
    LEVEL_POSITIONS.forEach((_, index) => {
      const assigned = state.slots[index];
      const done = state.completed[index];
      const div = document.createElement('div');
      div.className = 'progress-item';
      div.innerHTML = `<b>Level ${index + 1}</b><span>${done ? `${SENSES[assigned].label} geschafft` : assigned ? `${SENSES[assigned].label} begonnen` : 'noch verschlossen'}</span>`;
      summary.appendChild(div);
    });
    const boss = document.createElement('div');
    boss.className = 'progress-item';
    boss.innerHTML = `<b>Finale</b><span>${state.bossCompleted ? 'Boss besiegt' : allLevelsDone(state) ? 'freigeschaltet' : 'noch verschlossen'}</span>`;
    summary.appendChild(boss);
  }

  // ─── Board-Interaktion ────────────────────────────────────────────────────

  function handleNodeClick(index) {
    if (boardTravel) return;

    const state = getState();
    const active = currentSlot(state);
    const heroNode = getHeroNode(state);
    setBoardMenuOpen(false);

    const moveHeroThen = (callback) => {
      stopBackgroundMusic();
      if (index === 0 && isBoardGuidePending(getState())) {
        playBoardStartSequence(index, callback);
        return;
      }
      if (Number.isInteger(heroNode) && heroNode !== index) {
        playBoardTravelSequence(heroNode, index, callback);
        return;
      }
      const nextState = getState();
      nextState.heroNode = index;
      setState(nextState);
      renderBoard();
      callback?.();
    };

    if (state.completed[index]) {
      moveHeroThen(() => {
        const latest = getState();
        latest.heroNode = index;
        setState(latest);
        window.setTimeout(() => {
          window.location.href = `level.html?sense=${encodeURIComponent(state.slots[index])}&slot=${index}`;
        }, 140);
      });
      return;
    }

    if (index !== active) return;

    if (state.slots[index]) {
      moveHeroThen(() => showEncounter(state.slots[index], index));
      return;
    }

    moveHeroThen(() => openScanModal(index));
  }

  function handleBossClick() {
    setBoardMenuOpen(false);
    const state = getState();
    if (state.bossCompleted || !allLevelsDone(state)) return;
    stopBackgroundMusic();
    playSound('levelstart');
    showBossEncounter();
  }

  // ─── Popup-Hintergründe ───────────────────────────────────────────────────

  function setModalPopupBackground(modal, bg) {
    if (!modal) return;
    if (bg) {
      modal.classList.add('stage-popup');
      modal.style.setProperty('--popup-bg', `url("${bg}")`);
    } else {
      modal.classList.remove('stage-popup');
      modal.style.removeProperty('--popup-bg');
    }
  }

  function setStagePopupState(slot, isBoss = false) {
    const bg = isBoss ? BOSS_POPUP_BACKGROUND : (Number.isInteger(slot) ? POPUP_BACKGROUNDS[slot] : null);
    ['scanModal', 'encounterModal'].forEach(id => setModalPopupBackground(el(id), bg));
  }

  // ─── QR-Scan-Modal ────────────────────────────────────────────────────────

  function scanCard() { return document.querySelector('#scanModal .scan-card'); }

  function scrollScanModal(direction) {
    const card = scanCard();
    if (!card) return;
    card.scrollTo({ top: direction === 'top' ? 0 : card.scrollHeight, behavior: 'smooth' });
  }

  function toggleScannerPanel() {
    const card = scanCard();
    if (!card) return;
    const collapsed = card.classList.toggle('scanner-collapsed');
    setText('toggleScannerBtn', collapsed ? 'Scanner ausklappen' : 'Scanner einklappen');
    window.setTimeout(() => scrollScanModal(collapsed ? 'bottom' : 'top'), 80);
  }

  function openScanModal(slot) {
    stopBackgroundMusic();
    setStagePopupState(slot);
    activeSlotForScan = slot;
    setText('scanTitle', `Level ${slot + 1}: QR-Code scannen`);
    setText('scanHelp', 'Scanne einen beliebigen noch nicht erledigten Sinnes-Code. Der Code bestimmt das Thema dieses Levels.');
    setText('scanMessage', '');
    hide(el('scanMessage'));
    const input = el('manualCodeInput'); if (input) input.value = '';
    const card = scanCard();
    card?.classList.remove('scanner-collapsed');
    setText('toggleScannerBtn', 'Scanner einklappen');
    if (card) card.scrollTop = 0;
    show(el('scanModal'));
    startCameraScan();
  }

  function closeScanModal(resumeMusic = true) {
    setStagePopupState(null);
    stopCameraScan();
    hide(el('scanModal'));
    if (resumeMusic && isBoardVisible()) startBackgroundMusic(true);
  }

  async function startCameraScan() {
    const info = el('cameraInfo');
    const reader = el('qrReader');
    if (info) info.textContent = 'Kamera wird vorbereitet …';

    // Bevorzugt html5-qrcode (breitere mobile Browser-Unterstützung)
    if (reader && typeof Html5Qrcode !== 'undefined') {
      try {
        reader.innerHTML = '<p id="cameraInfo" class="camera-info">Kamera wird vorbereitet …</p>';
        html5Scanner = new Html5Qrcode('qrReader');
        await html5Scanner.start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: { width: 240, height: 240 }, aspectRatio: 1.0 },
          decodedText => handleScanText(decodedText),
          () => {}
        );
        const liveInfo = el('cameraInfo');
        if (liveInfo) liveInfo.textContent = 'Kamera aktiv. QR-Code vor die Kamera halten.';
        return;
      } catch {
        if (reader) reader.innerHTML = '<p id="cameraInfo" class="camera-info">Kamera konnte nicht gestartet werden. Bitte Berechtigung prüfen oder Code manuell eingeben.</p>';
        const card = scanCard(); card?.classList.add('scanner-collapsed'); setText('toggleScannerBtn', 'Scanner ausklappen');
        return;
      }
    }

    // Fallback: native BarcodeDetector-API
    const video = document.createElement('video');
    video.className = 'camera-video';
    video.playsInline = true;
    video.muted = true;
    if (reader) {
      reader.innerHTML = '';
      reader.appendChild(video);
      const infoEl = document.createElement('p');
      infoEl.id = 'cameraInfo';
      infoEl.className = 'camera-info';
      infoEl.textContent = 'Kamera wird vorbereitet …';
      reader.appendChild(infoEl);
    }

    if (!('mediaDevices' in navigator) || !navigator.mediaDevices.getUserMedia) {
      const i = el('cameraInfo'); if (i) i.textContent = 'Kamera nicht verfügbar. Bitte Code manuell eingeben.';
      const card = scanCard(); card?.classList.add('scanner-collapsed'); setText('toggleScannerBtn', 'Scanner ausklappen');
      return;
    }

    try {
      scanStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false });
      video.srcObject = scanStream;
      await video.play();
      if (!('BarcodeDetector' in window)) {
        const i = el('cameraInfo'); if (i) i.textContent = 'Dieser Browser unterstützt den eingebauten QR-Scanner nicht. Bitte Code manuell eingeben.';
        const card = scanCard(); card?.classList.add('scanner-collapsed'); setText('toggleScannerBtn', 'Scanner ausklappen');
        return;
      }
      const detector = new BarcodeDetector({ formats: ['qr_code'] });
      const i = el('cameraInfo'); if (i) i.textContent = 'Kamera aktiv. QR-Code vor die Kamera halten.';
      scanTimer = window.setInterval(async () => {
        if (!video.videoWidth) return;
        try {
          const codes = await detector.detect(video);
          if (codes?.length) handleScanText(codes[0].rawValue || codes[0].rawData || '');
        } catch {}
      }, 450);
    } catch {
      const i = el('cameraInfo'); if (i) i.textContent = 'Kamera konnte nicht gestartet werden. Bitte Berechtigung prüfen oder Code manuell eingeben.';
      const card = scanCard(); card?.classList.add('scanner-collapsed'); setText('toggleScannerBtn', 'Scanner ausklappen');
    }
  }

  function stopCameraScan() {
    if (html5Scanner) {
      html5Scanner.stop().catch(() => {}).finally(() => {
        try { html5Scanner.clear(); } catch {}
        html5Scanner = null;
      });
    }
    if (scanTimer) window.clearInterval(scanTimer);
    scanTimer = null;
    if (scanStream) scanStream.getTracks().forEach(t => t.stop());
    scanStream = null;
    const reader = el('qrReader');
    if (reader) reader.innerHTML = '<p id="cameraInfo" class="camera-info">Kamera wird vorbereitet …</p>';
  }

  // ─── Code-Eingabe & Sense-Freischaltung ───────────────────────────────────

  function handleScanText(text) {
    const msg = el('scanMessage');
    const sense = codeToSense(text);
    if (!sense) {
      if (msg) { msg.className = 'message bad'; msg.textContent = 'Dieser Code passt zu keinem Sinnes-Level.'; show(msg); }
      return;
    }
    unlockSenseForActiveSlot(sense);
  }

  function handleRandomUnlock() {
    const state = getState();
    const available = senseList().filter(sense => !usedSenseIds(state).includes(sense.id));
    const msg = el('scanMessage');
    if (!available.length) {
      if (msg) { msg.className = 'message bad'; msg.textContent = 'Es ist kein zufälliger Gegner mehr verfügbar.'; show(msg); }
      return;
    }
    unlockSenseForActiveSlot(available[Math.floor(Math.random() * available.length)]);
  }

  function unlockSenseForActiveSlot(sense) {
    if (!sense) return false;
    const msg = el('scanMessage');
    const state = getState();
    if (usedSenseIds(state).includes(sense.id)) {
      if (msg) { msg.className = 'message bad'; msg.textContent = 'Dieser Gegner wurde in diesem Spiel bereits verwendet.'; show(msg); }
      return false;
    }
    if (activeSlotForScan === null || activeSlotForScan < 0) return false;
    state.slots[activeSlotForScan] = sense.id;
    setState(state);
    playSound('levelunlocked');
    closeScanModal(false);
    showEncounter(sense.id, activeSlotForScan);
    renderBoard();
    return true;
  }

  // ─── Encounter-Modals ─────────────────────────────────────────────────────

  function showEncounter(senseId, slot) {
    const sense = SENSES[senseId];
    setStagePopupState(slot);
    pendingLaunch = { type: 'sense', sense: sense.id, slot };
    el('encounterImage').src = sense.enemy;
    el('encounterImage').alt = `Gegner ${sense.label}`;
    setText('encounterKicker', `Level ${slot + 1} freigeschaltet`);
    setText('encounterTitle', sense.enemyName || sense.title);
    setText('encounterSpeech', sense.speech);
    show(el('encounterModal'));
  }

  function showBossEncounter() {
    setStagePopupState(null, true);
    pendingLaunch = { type: 'boss' };
    el('encounterImage').src = BOSS.enemy;
    el('encounterImage').alt = 'Bossgegner';
    setText('encounterKicker', 'Finale freigeschaltet');
    setText('encounterTitle', BOSS.enemyName || BOSS.title);
    setText('encounterSpeech', BOSS.speech);
    show(el('encounterModal'));
  }

  // ─── Level ────────────────────────────────────────────────────────────────

  function initLevel() {
    const type = qs('type');
    const isBoss = type === 'boss';
    const slot = Number(qs('slot'));
    const senseId = qs('sense');
    const state = getState();

    if (isBoss) {
      if (!allLevelsDone(state)) { window.location.replace('index.html'); return; }
      renderLevel(BOSS, { isBoss: true, slot: null });
      return;
    }
    if (!Number.isInteger(slot) || slot < 0 || slot > 4 || !SENSES[senseId] || state.slots[slot] !== senseId) {
      window.location.replace('index.html'); return;
    }
    renderLevel(SENSES[senseId], { isBoss: false, slot });
  }

  function applyStageBackground(meta) {
    const bg = meta.isBoss ? BOSS_BACKGROUND : STAGE_BACKGROUNDS[meta.slot] || STAGE_BACKGROUNDS[0];
    const popupBg = meta.isBoss ? BOSS_POPUP_BACKGROUND : (POPUP_BACKGROUNDS[meta.slot] || POPUP_BACKGROUNDS[0]);
    document.body.classList.add('stage-page', 'stage-popups');
    document.body.style.setProperty('--stage-bg', `url("${bg}")`);
    document.body.style.setProperty('--popup-bg', `url("${popupBg}")`);
  }

  function renderLevel(data, meta) {
    applyStageBackground(meta);
    setText('levelBadge', meta.isBoss ? 'Finale' : `Level ${meta.slot + 1}`);
    setText('levelKicker', meta.isBoss ? 'Bosslevel' : 'Sinnes-Level');
    setText('levelTitle', data.title);
    setText('levelIntro', data.intro);
    const enemy = el('levelEnemy'); if (enemy) { enemy.src = data.enemy; enemy.alt = data.enemyName || data.title; }
    const content = el('levelContent');
    if (content) content.innerHTML = data.content.map(p => `<p>${escapeHtml(p)}</p>`).join('');
    const tasks = el('levelTasks');
    if (tasks) tasks.innerHTML = data.tasks.map((t, i) => `<div class="task"><b>Aufgabe ${i + 1}</b>${escapeHtml(t)}</div>`).join('');

    const questions = getQuestions(data);
    setText('quizQuestion', 'Beantworte alle fünf Fragen richtig, um das Level abzuschließen.');
    const options = el('quizOptions');
    if (options) {
      options.innerHTML = questions.map((question, qi) => `
        <article class="quiz-question-card">
          <h3>Frage ${qi + 1}: ${escapeHtml(question.q)}</h3>
          ${question.a.map((opt, oi) => `<label class="quiz-option"><input type="radio" id="answer_${qi}_${oi}" name="quizAnswer_${qi}" value="${oi}"><span>${escapeHtml(opt)}</span></label>`).join('')}
        </article>
      `).join('');
    }

    el('checkAnswerBtn')?.addEventListener('click', () => checkAnswer(data, meta));
    el('runAwayBtn')?.addEventListener('click', () => runAwayFromLevel(meta));

    // battleIntroModal-Buttons (statisch im HTML, als Fallback falls showBattleIntro den Modal direkt nutzt)
    el('battleBeginBtn')?.addEventListener('click', async () => {
      if (!pendingBattleContext) return;
      const ctx = pendingBattleContext;
      pendingBattleContext = null;
      hide(el('battleIntroModal'));
      await playSound('fight');
      window.setTimeout(() => showEvaluationFlow(ctx.results, ctx.data, ctx.meta), 180);
    });
    el('battleRunBtn')?.addEventListener('click', () => {
      const ctx = pendingBattleContext;
      pendingBattleContext = null;
      hide(el('battleIntroModal'));
      runAwayFromLevel(ctx?.meta || meta);
    });

    el('outroResetBtn')?.addEventListener('click', resetGame);
  }

  // ─── Quiz & Kampfablauf ───────────────────────────────────────────────────

  function checkAnswer(data, meta) {
    const feedback = el('quizFeedback');
    const questions = getQuestions(data);
    const answers = questions.map((_, qi) => document.querySelector(`input[name="quizAnswer_${qi}"]:checked`));
    if (answers.some(answer => !answer)) {
      if (feedback) { feedback.className = 'message bad'; feedback.textContent = 'Bitte beantworte zuerst alle fünf Fragen.'; show(feedback); }
      return;
    }
    if (feedback) hide(feedback);
    const results = answers.map((answer, qi) => Number(answer.value) === questions[qi].correct);
    showBattleIntro(results, data, meta);
  }

  function popupBgForMeta(meta) {
    return meta?.isBoss ? BOSS_POPUP_BACKGROUND : (Number.isInteger(meta?.slot) ? POPUP_BACKGROUNDS[meta.slot] : null);
  }

  function showBattleIntro(results, data, meta) {
    const modal = el('evaluationModal');
    const card = modal?.querySelector('.evaluation-card');
    if (!modal || !card) { showEvaluationFlow(results, data, meta); return; }

    pendingBattleContext = { results, data, meta };
    setModalPopupBackground(modal, popupBgForMeta(meta));
    card.className = 'modal-card evaluation-card unified-popup unified-intro';
    card.innerHTML = `
      <div class="battle-inline-layout">
        <div class="battle-inline-side left">
          <img class="battle-inline-actor pulse" src="held.webp" alt="Sir Nervus">
          <div class="battle-inline-name">Sir Nervus</div>
        </div>
        <div class="battle-inline-versus-wrap">
          <img class="battle-inline-versus wobble" src="versus_final.webp" alt="Versus">
        </div>
        <div class="battle-inline-side right">
          <img class="battle-inline-actor pulse" src="${data.enemy}" alt="${escapeHtml(data.enemyName || data.title || 'Gegner')}">
          <div class="battle-inline-name">${escapeHtml(data.enemyName || data.title || 'Gegner')}</div>
        </div>
      </div>
      <div class="battle-inline-actions">
        <button id="unifiedBattleBeginBtn" class="game-btn primary" type="button">Kampf beginnen</button>
        <button id="unifiedBattleRunBtn" class="game-btn muted" type="button">Wegrennen</button>
      </div>
    `;
    show(modal);

    el('unifiedBattleBeginBtn')?.addEventListener('click', async () => {
      if (!pendingBattleContext) return;
      const ctx = pendingBattleContext;
      pendingBattleContext = null;
      await playSound('fight');
      window.setTimeout(() => showEvaluationFlow(ctx.results, ctx.data, ctx.meta), 120);
    }, { once: true });

    el('unifiedBattleRunBtn')?.addEventListener('click', () => {
      const ctx = pendingBattleContext;
      pendingBattleContext = null;
      hide(modal);
      runAwayFromLevel(ctx?.meta || meta);
    }, { once: true });
  }

  // ─── Auswertungssequenz ───────────────────────────────────────────────────

  let lastEvaluationImage = { correct: null, wrong: null };
  let evaluationRunToken = 0;
  const EVALUATION_ENTRY_CLASSES = ['enter-left', 'enter-right', 'enter-top', 'enter-bottom', 'enter-zoom'];
  const FINAL_ENTRY_CLASSES = ['enter-zoom', 'enter-top', 'enter-bottom'];

  function randomFrom(list) { return list[Math.floor(Math.random() * list.length)]; }

  function randomFromNoRepeat(list, group) {
    const previous = lastEvaluationImage[group];
    const choices = list.length > 1 ? list.filter(item => item !== previous) : list;
    const picked = randomFrom(choices);
    lastEvaluationImage[group] = picked;
    return picked;
  }

  function wait(ms) { return new Promise(resolve => window.setTimeout(resolve, ms)); }

  function nextPaint(frames = 2) {
    return new Promise(resolve => {
      const step = () => { if (--frames <= 0) { resolve(); return; } window.requestAnimationFrame(step); };
      window.requestAnimationFrame(step);
    });
  }

  function applyUnifiedEvaluationAssetLayout(node) {
    if (!node) return;
    node.style.position = 'absolute';
    node.style.inset = 'auto';
    node.style.left = '50%';
    node.style.right = 'auto';
    node.style.bottom = 'auto';
    node.style.top = window.matchMedia('(max-width: 560px)').matches ? '54.5%' : '54%';
    node.style.margin = '0';
    node.style.objectFit = 'contain';
    node.style.objectPosition = 'center center';
    node.style.transform = 'translate(-50%, -50%) scale(1)';
    node.style.transformOrigin = 'center center';
  }

  function setEvaluationImage(image, src, alt, finalStep = false) {
    if (!image) return;
    const entryClass = finalStep ? 'enter-center-final' : 'enter-center';
    image.className = 'evaluation-img preparing';
    image.style.animation = 'none';
    image.alt = alt;
    image.decoding = 'async';
    image.dataset.evalSrc = src;
    applyUnifiedEvaluationAssetLayout(image);

    const apply = () => {
      if (image.dataset.evalSrc !== src) return;
      image.onload = null;
      image.onerror = null;
      applyUnifiedEvaluationAssetLayout(image);
      void image.offsetWidth;
      image.style.animation = '';
      image.className = `evaluation-img ${finalStep ? 'final-step' : 'answer-step'} ${entryClass}`;
      applyUnifiedEvaluationAssetLayout(image);
    };

    image.onload = apply;
    image.onerror = apply;
    image.src = src;
    if (image.complete) apply();
  }

  function setEvaluationStatus(text, kind = '') {
    const status = el('evaluationStatus');
    if (!status) return;
    status.textContent = text || '';
    status.className = `evaluation-status${kind ? ' ' + kind : ''}`;
    if (text) show(status); else hide(status);
  }

  function setEvaluationDots(activeIndex, total) {
    const dots = el('evaluationDots');
    if (!dots) return;
    dots.innerHTML = Array.from({ length: total }, (_, i) => `<span class="${i === activeIndex ? 'active' : ''}"></span>`).join('');
  }

  function soundKeyForEvaluationImage(src) {
    return String(src || '').replace(/\.(webp|png|jpg|jpeg)$/i, '');
  }

  async function playEvaluationCue(imageSrc, runToken) {
    if (runToken !== evaluationRunToken) return;
    prepareOutcomeSound();
    await playSound(soundKeyForEvaluationImage(imageSrc));
  }

  async function playFinalCue(runToken) {
    if (runToken !== evaluationRunToken) return;
    prepareOutcomeSound();
    await nextPaint(2);
    if (runToken !== evaluationRunToken) return;
    await playSound('final');
  }

  function ensureEvaluationSequenceShell() {
    const modal = el('evaluationModal');
    const card = modal?.querySelector('.evaluation-card');
    if (!card) return false;
    card.className = 'modal-card evaluation-card unified-popup unified-sequence';
    card.innerHTML = `
      <div class="evaluation-label" id="evaluationLabel">Frage 1</div>
      <div class="evaluation-stage" id="evaluationStage">
        <img id="evaluationOutcomeImage" class="evaluation-outcome-img hidden" alt="Ergebnis">
        <img id="evaluationImage" class="evaluation-img preparing hidden" alt="Auswertung">
      </div>
      <div id="evaluationStatus" class="evaluation-status hidden" aria-live="polite"></div>
      <div id="evaluationDots" class="evaluation-dots" aria-hidden="true"></div>
      <div id="evaluationAction" class="evaluation-action hidden"></div>
    `;
    return true;
  }

  async function showEvaluationFlow(results, data, meta) {
    const modal = el('evaluationModal');
    if (!ensureEvaluationSequenceShell()) {
      const wrong = results.filter(r => !r).length;
      if (wrong >= 2) showLoseFlow(meta); else showWinFlow(data, meta);
      return;
    }
    const image = el('evaluationImage');
    const label = el('evaluationLabel');
    if (!modal || !image || !label) {
      const wrong = results.filter(r => !r).length;
      if (wrong >= 2) showLoseFlow(meta); else showWinFlow(data, meta);
      return;
    }

    setModalPopupBackground(modal, popupBgForMeta(meta));
    const action = el('evaluationAction');
    const outcomeLayer = el('evaluationOutcomeImage');
    const checkBtn = el('checkAnswerBtn');

    if (checkBtn) checkBtn.disabled = true;
    if (action) { action.innerHTML = ''; hide(action); }
    if (outcomeLayer) {
      outcomeLayer.className = 'evaluation-outcome-img hidden';
      outcomeLayer.removeAttribute('src');
      outcomeLayer.alt = 'Ergebnis';
      applyUnifiedEvaluationAssetLayout(outcomeLayer);
    }
    applyUnifiedEvaluationAssetLayout(image);
    show(modal);
    startBattleBackground();

    const runToken = ++evaluationRunToken;
    const totalSteps = results.length + 1;

    for (let index = 0; index < results.length; index += 1) {
      if (runToken !== evaluationRunToken) return;
      const isCorrect = results[index];
      label.textContent = `Frage ${index + 1}`;
      const group = isCorrect ? 'correct' : 'wrong';
      const imageSrc = isCorrect
        ? randomFromNoRepeat(EVALUATION_IMAGES.correct, group)
        : randomFromNoRepeat(EVALUATION_IMAGES.wrong, group);
      setEvaluationImage(image, imageSrc, `Auswertung Frage ${index + 1}`);
      setEvaluationStatus(isCorrect ? 'Richtig' : 'Falsch', isCorrect ? 'ok' : 'bad');
      setEvaluationDots(index, totalSteps);
      await playEvaluationCue(imageSrc, runToken);
      if (runToken !== evaluationRunToken) return;
      await wait(1500);
    }

    if (runToken !== evaluationRunToken) return;
    label.textContent = 'Finale Auswertung';
    setEvaluationImage(image, EVALUATION_IMAGES.final, 'Finale Auswertung', true);
    setEvaluationStatus('Tippe auf das Bild, um das Ergebnis aufzudecken.', '');
    setEvaluationDots(results.length, totalSteps);
    if (action) { action.innerHTML = ''; hide(action); }
    await playFinalCue(runToken);
    if (runToken !== evaluationRunToken) return;

    image.classList.add('final-loop', 'final-clickable');
    image.setAttribute('role', 'button');
    image.setAttribute('tabindex', '0');
    image.setAttribute('aria-label', 'Ergebnis aufdecken');

    const wrong = results.filter(r => !r).length;
    const won = wrong < 2;
    const outcomeImage = el('evaluationOutcomeImage');
    if (outcomeImage) {
      outcomeImage.src = won ? data.defeated : 'held_verloren.webp';
      outcomeImage.alt = won ? `${data.enemyName || data.label || 'Gegner'} besiegt` : 'Besiegter Ritter';
      outcomeImage.className = `evaluation-outcome-img hidden ${won ? 'won' : 'lost'}`;
      applyUnifiedEvaluationAssetLayout(outcomeImage);
    }

    const revealOutcome = async () => {
      if (runToken !== evaluationRunToken || image.dataset.revealing === '1') return;
      image.dataset.revealing = '1';
      image.classList.remove('final-loop', 'final-clickable');
      if (outcomeImage) {
        outcomeImage.className = `evaluation-outcome-img behind preloaded ${won ? 'won' : 'lost'}`;
        applyUnifiedEvaluationAssetLayout(outcomeImage);
      }
      await nextPaint(1);
      window.setTimeout(() => {
        if (outcomeImage) {
          outcomeImage.className = `evaluation-outcome-img behind visible ${won ? 'won' : 'lost'}`;
          applyUnifiedEvaluationAssetLayout(outcomeImage);
        }
      }, 520);
      image.classList.add('final-reveal');
      setEvaluationStatus('');
      stopSound('final');
      stopBattleBackground();
      await wait(1325);
      if (runToken !== evaluationRunToken) return;

      image.className = 'evaluation-img hidden';
      image.removeAttribute('role');
      image.removeAttribute('tabindex');
      image.removeAttribute('aria-label');
      if (outcomeImage) outcomeImage.className = `evaluation-outcome-img outcome-step ${won ? 'won' : 'lost'}`;

      if (won) {
        label.textContent = meta.isBoss ? `${data.enemyName || 'Boss'} besiegt!` : `${data.enemyName || data.label} besiegt!`;
        setEvaluationStatus(meta.isBoss ? 'Das Königreich der Sinne ist gerettet.' : 'Du hast das Level geschafft.', 'ok');
      } else {
        label.textContent = 'Du wurdest besiegt.';
        setEvaluationStatus('', 'bad');
      }

      const dots = el('evaluationDots');
      if (dots) dots.innerHTML = '';
      prepareOutcomeSound();
      await playSound(won ? 'win' : 'lose');
      if (checkBtn) checkBtn.disabled = false;

      if (!action) { hide(modal); if (won) finishLevel(meta); return; }

      if (won) {
        action.innerHTML = '<button id="evaluationContinueBtn" class="game-btn primary">Weiter</button>';
        show(action);
        el('evaluationContinueBtn')?.addEventListener('click', () => { hide(modal); finishLevel(meta); }, { once: true });
      } else {
        action.innerHTML = '<button id="evaluationRetryBtn" class="game-btn primary">Neuer Versuch</button><button id="evaluationEscapeBtn" class="game-btn muted">Wegrennen</button>';
        show(action);
        el('evaluationRetryBtn')?.addEventListener('click', () => {
          hide(modal);
          delete image.dataset.revealing;
          const oi = el('evaluationOutcomeImage');
          if (oi) oi.className = 'evaluation-outcome-img hidden';
        });
        el('evaluationEscapeBtn')?.addEventListener('click', () => runAwayFromLevel(meta), { once: true });
      }
    };

    image.addEventListener('click', revealOutcome, { once: true });
    image.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); revealOutcome(); }
    }, { once: true });
  }

  // ─── Win/Lose-Flows (resultModal) ─────────────────────────────────────────

  function showWinFlow(data, meta) {
    const modal = el('resultModal');
    modal?.querySelector('.encounter-card')?.classList.remove('outcome-clean', 'outcome-hero');
    el('resultImage').src = data.defeated;
    el('resultImage').alt = `${data.enemyName || data.label || 'Boss'} besiegt`;
    setText('resultKicker', 'Richtig beantwortet');
    setText('resultTitle', meta.isBoss ? `${data.enemyName || 'Boss'} besiegt!` : `${data.enemyName || data.label} besiegt!`);
    setText('resultText', meta.isBoss ? 'Der Boss ist geschlagen. Das Königreich der Sinne ist gerettet.' : 'Du hast das Level geschafft. Gleich geht es zurück zum Spielbrett.');
    const buttons = el('resultButtons');
    buttons.innerHTML = '<button id="continueWinBtn" class="game-btn primary">Weiter</button>';
    show(modal);
    prepareOutcomeSound();
    playSound('win');
    el('continueWinBtn').addEventListener('click', () => {
      if (meta.isBoss) showHeroWon(meta); else finishLevel(meta);
    });
  }

  function showHeroWon(meta) {
    const card = el('resultModal')?.querySelector('.encounter-card');
    card?.classList.remove('outcome-clean');
    card?.classList.add('outcome-hero');
    el('resultImage').src = 'held_gewonnen.webp';
    el('resultImage').alt = 'Held gewinnt';
    setText('resultKicker', 'Erfolg');
    setText('resultTitle', meta.isBoss ? 'Königreich gerettet' : 'Neues Level freigeschaltet');
    setText('resultText', meta.isBoss ? 'Du hast das Finale geschafft.' : 'Weiter zum Spielbrett.');
    const buttons = el('resultButtons');
    buttons.innerHTML = '<button id="finishLevelBtn" class="game-btn primary">Weiter</button>';
    el('finishLevelBtn').addEventListener('click', () => finishLevel(meta));
  }

  function showLoseFlow(meta) {
    const modal = el('resultModal');
    modal?.querySelector('.encounter-card')?.classList.remove('outcome-hero');
    modal?.querySelector('.encounter-card')?.classList.add('outcome-clean');
    el('resultImage').src = 'held_verloren.webp';
    el('resultImage').alt = 'Held verloren';
    setText('resultKicker', '');
    setText('resultTitle', '');
    setText('resultText', '');
    const buttons = el('resultButtons');
    buttons.innerHTML = '<button id="retryBtn" class="game-btn primary">Neuer Versuch</button><button id="escapeBtn" class="game-btn muted">Wegrennen</button>';
    show(modal);
    prepareOutcomeSound();
    playSound('lose');
    el('retryBtn')?.addEventListener('click', () => hide(modal));
    el('escapeBtn')?.addEventListener('click', () => runAwayFromLevel(meta));
  }

  // ─── Level abschließen / Flucht ───────────────────────────────────────────

  function runAwayFromLevel(meta) {
    const state = getState();
    if (!meta.isBoss && Number.isInteger(meta.slot) && !state.completed[meta.slot]) {
      state.slots[meta.slot] = null;
      setState(state);
    }
    storeBoardReturnModal('escaped', meta);
    markBoardMusicResume();
    window.location.href = 'index.html';
  }

  function finishLevel(meta) {
    const state = getState();
    if (meta.isBoss) {
      state.bossCompleted = true;
      setState(state);
      hide(el('resultModal'));
      show(el('outroModal'));
      return;
    }
    state.completed[meta.slot] = true;
    state.heroNode = meta.slot;
    setState(state);
    storeBoardReturnModal('unlocked', meta);
    markBoardMusicResume();
    window.location.href = 'index.html';
  }

  // ─── QR-Code-Seite ────────────────────────────────────────────────────────

  function initCodes() {
    el('printCodesBtn')?.addEventListener('click', () => window.print());
    const grid = el('qrGrid');
    if (!grid) return;
    grid.innerHTML = '';
    senseList().forEach(sense => {
      const card = document.createElement('article');
      card.className = 'panel qr-card';
      card.innerHTML = `<h2>${sense.label}</h2><img src="qr_${sense.id}.png" alt="QR-Code ${sense.label}"><div class="code">${sense.code}</div>`;
      grid.appendChild(card);
    });
  }
})();
