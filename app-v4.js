(() => {
  'use strict';

  const STORE = 'koenigreichSinneV4State';
  const BATTLE_STORE = 'koenigreichSinneV4Battle';
  const RETURN_STORE = 'koenigreichSinneV4BoardReturn';
  const SOUND_STORE = 'koenigreichSinneV4Muted';
  const STATE_VERSION = 'v4_13levels_minigame_lives_hedgehog';

  const SENSES = {
    sehen: {
      id: 'sehen', label: 'Sehen', enemyName: 'Sehlina', code: 'SINNE-SEHEN', enemy: 'sehen.webp', defeated: 'sehen_besiegt.webp',
      title: 'Level: Sehen', speech: '„Meine Illusionen blenden dich. Mal sehen, ob du den richtigen Reiz erkennst!”',
      intro: 'Hier geht es um das Auge, Lichtreize und die Verarbeitung von Sehinformationen.',
      content: ['Das Auge nimmt Lichtreize aus der Umgebung auf. Hornhaut und Linse bündeln das Licht, sodass auf der Netzhaut ein Bild entsteht.', 'Auf der Netzhaut sitzen Sinneszellen. Sie wandeln Licht in elektrische Signale um. Diese Signale gelangen über den Sehnerv zum Gehirn, wo sie verarbeitet und zu einem Bild zusammengesetzt werden.']
    },
    hoeren: {
      id: 'hoeren', label: 'Hören', enemyName: 'Höhribert', code: 'SINNE-HOEREN', enemy: 'hoeren.webp', defeated: 'hoeren_besiegt.webp',
      title: 'Level: Hören', speech: '„Ich verdrehe jede Schallwelle. Ob du trotzdem den richtigen Ton triffst?”',
      intro: 'Hier geht es um das Ohr, Schallwellen und den Gleichgewichtssinn.',
      content: ['Das Ohr nimmt Schallwellen auf. Die Ohrmuschel leitet den Schall zum Trommelfell weiter. Dieses gerät in Schwingung.', 'Die Gehörknöchelchen verstärken die Schwingungen. In der Hörschnecke werden sie in Nervensignale umgewandelt. Außerdem ist das Innenohr wichtig für das Gleichgewicht.']
    },
    riechen: {
      id: 'riechen', label: 'Riechen', enemyName: 'Riechard', code: 'SINNE-RIECHEN', enemy: 'riechen.webp', defeated: 'riechen_besiegt.webp',
      title: 'Level: Riechen', speech: '„Mein Nebel liegt in der Luft. Folge der Spur, wenn du dich traust!”',
      intro: 'Hier geht es um die Nase, Geruchsstoffe und die Bedeutung des Riechens im Alltag.',
      content: ['Die Nase erkennt Geruchsstoffe in der Luft. Beim Einatmen gelangen Duftmoleküle zur Riechschleimhaut.', 'Dort sitzen Riechzellen, die passende Moleküle erkennen und Signale an das Gehirn senden. Gerüche können warnen, Erinnerungen auslösen und den Geschmack beeinflussen.']
    },
    schmecken: {
      id: 'schmecken', label: 'Schmecken', enemyName: 'König Schmatz', code: 'SINNE-SCHMECKEN', enemy: 'schmecken.webp', defeated: 'schmecken_besiegt.webp',
      title: 'Level: Schmecken', speech: '„Süß, sauer, salzig? Ich bringe alles durcheinander. Beweise deinen Geschmack!”',
      intro: 'Hier geht es um die Zunge, Geschmacksrichtungen und das Zusammenspiel der Sinne.',
      content: ['Auf der Zunge befinden sich Geschmacksknospen. Sie erkennen Stoffe aus der Nahrung und ermöglichen Geschmackswahrnehmungen.', 'Häufig unterscheidet man süß, sauer, salzig, bitter und umami. Geschmack entsteht aber nicht nur auf der Zunge: Geruch, Temperatur und Konsistenz wirken mit.']
    },
    fuehlen: {
      id: 'fuehlen', label: 'Fühlen', enemyName: 'Dr. Tastibald', code: 'SINNE-FUEHLEN', enemy: 'fuehlen.webp', defeated: 'fuehlen_besiegt.webp',
      title: 'Level: Fühlen', speech: '„Meine Panzer fühlen alles. Spürst du, was Schutz wirklich bedeutet?”',
      intro: 'Hier geht es um die Haut, Berührung, Temperatur, Schmerz und Schutz.',
      content: ['Die Haut ist das größte Sinnesorgan des Körpers. Sie enthält Rezeptoren für Berührung, Druck, Wärme, Kälte und Schmerz.', 'Gleichzeitig schützt die Haut vor Verletzungen, Krankheitserregern und Austrocknung. Sie ist also Sinnesorgan und Schutzschicht zugleich.']
    }
  };

  const BOSS = {
    id: 'boss', label: 'Boss', code: 'SINNE-BOSS', enemyName: 'Sinntron 3000', enemy: 'boss.webp', defeated: 'boss_besiegt.webp', title: 'Finale: Boss der Sinne',
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
  const STAGE_BACKGROUNDS = ['stage_gras.webp', 'stage_sand.webp', 'stage_eis.webp', 'stage_lava.webp', 'stage_himmel.webp', 'stage_all.webp'];
  const POPUP_BACKGROUNDS = ['popup_gras.webp', 'popup_sand.webp', 'popup_eis.webp', 'popup_lava.webp', 'popup_himmel.webp', 'popup_all.webp'];
  const isPlaceholderSlot = index => PLACEHOLDER_LEVELS.includes(Number(index));
  const isQrSlot = index => QR_LEVELS.includes(Number(index));
  const stageIndexForSlot = slot => Math.max(0, Math.min(5, Math.floor((Number(slot) || 0) / 2)));

  const ASSETS = {
    correct: ['richtig_1.webp', 'richtig_2.webp', 'richtig_3.webp'],
    wrong: ['falsch_1.webp', 'falsch_2.webp', 'falsch_3.webp'],
    final: 'final.webp',
    hero: 'held.webp',
    winHero: 'held_gewonnen.webp',
    loseHero: 'held_verloren.webp',
    escapeHero: 'held_entkommen.webp',
    versus: 'versus_final.webp',
    text: {
      kampf: 'kampf_text.webp',
      richtig: 'richtig_text.webp',
      falsch: 'falsch_text.webp',
      gewonnen: 'gewonnen_text.webp',
      verloren: 'verloren_text.webp'
    }
  };

  const AUDIO_FILES = {
    background: 'background.mp3', battle_background: 'battle_background.mp3', levelstart: 'levelstart.mp3',
    levelunlocked: 'levelunlocked.mp3', fight: 'fight.mp3', win: 'win.mp3', lose: 'lose.mp3',
    final: 'final.mp3', richtig_1: 'richtig_1.mp3', richtig_2: 'richtig_2.mp3', richtig_3: 'richtig_3.mp3',
    falsch_1: 'falsch_1.mp3', falsch_2: 'falsch_2.mp3', falsch_3: 'falsch_3.mp3'
  };

  const $ = id => document.getElementById(id);
  const qs = name => new URLSearchParams(location.search).get(name);
  const hide = node => node && node.classList.add('hidden');
  const show = node => node && node.classList.remove('hidden');
  const esc = txt => String(txt ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const clamp = (n,min,max) => Math.max(min, Math.min(max, n));

  let muted = localStorage.getItem(SOUND_STORE) === '1';
  const audio = new Map();
  function getAudio(key) {
    if (!AUDIO_FILES[key]) return null;
    if (!audio.has(key)) {
      const a = new Audio(AUDIO_FILES[key]);
      a.preload = 'auto';
      if (key === 'background') a.volume = .045;
      else if (key === 'battle_background') a.volume = .11;
      else a.volume = /^(richtig|falsch)_/.test(key) ? .95 : .85;
      audio.set(key, a);
    }
    return audio.get(key);
  }
  async function playSound(key, { loop = false, restart = true } = {}) {
    if (muted) return;
    const a = getAudio(key); if (!a) return;
    try {
      a.loop = loop;
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
      if (muted) Array.from(audio.keys()).forEach(stopSound); else if (document.body.dataset.page === 'board' && !$('boardScreen')?.classList.contains('hidden')) playSound('background', { loop:true });
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
    preloadAssets(['intro_text.webp','outro.webp',ASSETS.hero, ASSETS.versus, ASSETS.text.kampf, ASSETS.text.richtig, ASSETS.text.falsch, ASSETS.text.gewonnen, ASSETS.text.verloren, data.enemy, data.defeated, ASSETS.loseHero, ASSETS.final, ...ASSETS.correct, ...ASSETS.wrong, bgForMeta(meta), popupBgForMeta(meta), ...Object.values(AUDIO_FILES)]);
  }
  function prefetchPage(href) {
    if (document.querySelector(`link[rel="prefetch"][href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
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
    $('resetGameBtn')?.addEventListener('click', () => { if (confirm('Spielbrett wirklich zurücksetzen?')) { localStorage.removeItem(STORE); localStorage.removeItem(RETURN_STORE); location.href = 'index.html'; } });
    $('openBoardMenuBtn')?.addEventListener('click', () => document.body.classList.add('board-menu-open'));
    $('closeBoardMenuBtn')?.addEventListener('click', () => document.body.classList.remove('board-menu-open'));
    $('closeScanBtn')?.addEventListener('click', closeScan);
    $('backToBoardBtn')?.addEventListener('click', () => escapeToBoard(activeScanMeta()));
    $('manualUnlockBtn')?.addEventListener('click', () => unlockByCode($('manualCodeInput')?.value || ''));
    $('randomUnlockBtn')?.addEventListener('click', () => unlockRandom());
    $('toggleScannerBtn')?.addEventListener('click', () => { document.querySelector('.camera-box')?.classList.toggle('hidden'); });
    $('scanJumpBottomBtn')?.addEventListener('click', () => $('randomUnlockBtn')?.scrollIntoView({ behavior:'smooth', block:'center' }));
    $('scanJumpTopBtn')?.addEventListener('click', () => $('scanTitle')?.scrollIntoView({ behavior:'smooth', block:'start' }));
    $('launchLevelBtn')?.addEventListener('click', handleLaunchLevel);
    $('encounterBackBtn')?.addEventListener('click', handleEncounterBack);
    $('levelUnlockedContinueBtn')?.addEventListener('click', () => { hide($('levelUnlockedModal')); playSound('background', { loop:true }); });
    window.addEventListener('resize', updateMapGeometry);
    setTimeout(() => applyReturnModal(), 150);
  }

  function showBoard(firstStart=false) {
    hide($('introScreen')); show($('boardScreen')); show($('openBoardMenuBtn')); show($('belowBoard'));
    updateMapGeometry(); renderBoard();
    if (!firstStart) playSound('background', { loop:true, restart:true });
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
    return new Promise(resolve => {
      hero.classList.remove('hidden');
      hero.style.opacity = '1';
      if (fromIntro || current === null) {
        hero.style.transition = 'none'; hero.style.left = '92%'; hero.style.top = '96%'; hero.dataset.index = 'intro';
      } else {
        setHeroAt(current, true);
      }
      requestAnimationFrame(() => requestAnimationFrame(() => {
        hero.style.transition = 'left 2s cubic-bezier(.22,1,.36,1), top 2s cubic-bezier(.22,1,.36,1), opacity .25s ease';
        const pos = boardPos(targetIndex); hero.style.left = `${pos.x}%`; hero.style.top = `${pos.y}%`;
        playSound('levelstart');
      }));
      setTimeout(() => { const s = getState(); s.heroIndex = targetIndex; s.introUsed = true; setState(s); setHeroAt(targetIndex, true); resolve(); }, 2050);
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
      if (done) btn.innerHTML = `<img class="done-flag-token" src="flag_complete.webp" alt="abgeschlossen"><span class="token-label">Level ${index+1}</span>`;
      else if (isActive) btn.innerHTML = `<span class="token-label open-level-pill">Level ${index+1}</span>`;
      else btn.innerHTML = `<img class="lock-token" src="lock.png" alt="Schloss"><span class="token-label">Level ${index+1}</span>`;
      btn.addEventListener('click', () => onLevelNode(index)); inner.appendChild(btn);
    });
    const hero = document.createElement('button'); hero.type='button'; hero.id='movingHero'; hero.className='map-token moving-hero-token'; hero.innerHTML='<img class="hero-token" src="held.webp" alt="Sir Nervus">'; inner.appendChild(hero);
    if (heroIndex !== null) setHeroAt(heroIndex, true); else { hero.classList.add('hidden'); hero.style.left='92%'; hero.style.top='96%'; }
    renderGuide(state);
  }

  function renderGuide(state) {
    const guide = $('boardGuide'); if (!guide) return;
    const showGuide = state.started && state.heroIndex === null && !state.introUsed && currentSlot(state) === 0;
    guide.classList.toggle('hidden', !showGuide); guide.classList.remove('go-away');
  }

  async function onLevelNode(index) {
    const state = getState(); const active = currentSlot(state); const completed = state.completed[index];
    if (!completed && index !== active) return;
    const fromIntro = state.heroIndex === null && index === 0 && !state.introUsed;
    if (fromIntro) { $('boardGuide')?.classList.add('go-away'); await sleep(650); hide($('boardGuide')); }
    await animateHeroTo(index, { fromIntro });
    const latest = getState(); const assigned = latest.slots[index];

    if (isPlaceholderSlot(index)) {
      if (completed) return;
      showPlaceholder(index);
      return;
    }

    if (completed) {
      if (!assigned) return;
      location.href = assigned === 'boss' ? `level.html?type=boss&slot=${index}` : `level.html?sense=${encodeURIComponent(assigned)}&slot=${index}`;
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
    window.pendingLaunch = { url:isBoss ? `level.html?type=boss&slot=${index}` : `level.html?sense=${encodeURIComponent(id)}&slot=${index}`, meta };
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
      window.pendingLaunch = { placeholder:true, minigame:true, slot:index, meta };
      $('launchLevelBtn').textContent = 'Weiter';
      $('encounterBackBtn').textContent = 'Spiel starten';
      $('encounterImage').src = ASSETS.hero;
      $('encounterImage').alt = 'Sir Nervus';
      $('encounterKicker').textContent = '';
      $('encounterTitle').textContent = 'Test';
      $('encounterSpeech').textContent = '';
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
      hide($('encounterModal'));
      location.href = `minigame.html?slot=${window.pendingLaunch.slot}`;
      return;
    }
    escapeToBoard(window.pendingLaunch?.meta);
  }

  function handleLaunchLevel() {
    if (!window.pendingLaunch) return;
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
    if (!Number.isInteger(slot) || slot < 0 || slot >= LEVEL_COUNT) { location.replace('index.html'); return; }
    if (isBoss) {
      if (state.slots[slot] !== 'boss') { location.replace('index.html'); return; }
    } else if (!SENSES[senseId] || state.slots[slot] !== senseId) { location.replace('index.html'); return; }
    const data = isBoss ? BOSS : SENSES[senseId]; const meta = { isBoss, slot, senseId };
    document.body.style.setProperty('--stage-bg', `url("${bgForMeta(meta)}")`);
    $('levelBadge').textContent = `Level ${slot+1}`;
    const enemy = $('levelEnemy'); if (enemy) { enemy.src=data.enemy; enemy.alt=data.enemyName; }
    const content = $('levelContent'); if (content) content.innerHTML = `<p>${esc(data.intro)}</p>` + data.content.map(p=>`<p>${esc(p)}</p>`).join('');
    const questions = getQuestionsForId(senseId);
    const opts = $('quizOptions'); if (opts) opts.innerHTML = questions.map((q,qi)=>`<article class="quiz-question-card"><h3>Frage ${qi+1}: ${esc(q.q)}</h3>${q.a.map((a,ai)=>`<label class="quiz-option"><input type="radio" name="quizAnswer_${qi}" value="${ai}"><span>${esc(a)}</span></label>`).join('')}</article>`).join('');
    preloadBattleAssets(data, meta);
    prefetchPage('battle.html');
    $('checkAnswerBtn')?.addEventListener('click', () => startBattleFromLevel(data, meta, questions));
    $('runAwayBtn')?.addEventListener('click', () => { localStorage.setItem(RETURN_STORE, JSON.stringify({ type:'escape', meta })); location.href='index.html'; });
  }
  function startBattleFromLevel(data, meta, questions) {
    const selected = questions.map((_,qi)=>document.querySelector(`input[name="quizAnswer_${qi}"]:checked`));
    if (selected.some(x=>!x)) { const f=$('quizFeedback'); f.textContent='Bitte beantworte zuerst alle fünf Fragen.'; f.className='message bad'; return; }
    const answers = selected.map(x=>Number(x.value)); const results = answers.map((a,i)=>a===questions[i].correct);
    const payload = { senseId: data.id, meta, answers, results, time:Date.now() };
    sessionStorage.setItem(BATTLE_STORE, JSON.stringify(payload));
    showTransition('Kampf wird geladen …');
    setTimeout(() => location.href='battle.html', 420);
  }
  function showTransition(text) {
    let overlay = document.createElement('div'); overlay.className='page-transition-overlay'; overlay.innerHTML=`<div>${esc(text)}</div>`; document.body.appendChild(overlay); requestAnimationFrame(()=>overlay.classList.add('active'));
  }

  function initBattle() {
    addSpeaker(); stopSound('background');
    let payload; try { payload = JSON.parse(sessionStorage.getItem(BATTLE_STORE) || ''); } catch (_) {}
    if (!payload || !payload.meta) { location.replace('index.html'); return; }
    const meta = payload.meta; const data = dataForMeta(meta); if (!data) { location.replace('index.html'); return; }
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
      const base = src.replace(/\.webp$/,'');
      label.textContent = `Frage ${i+1}`;
      status.textContent = ok ? 'Richtig' : 'Falsch';
      status.className = `battle-status sr-only ${ok?'ok':'bad'}`;
      [...dots.children].forEach((d,di)=>d.className=di===i?'active':'');
      await playAnswerStep(img, textImg, src, textSrc, ok ? 'Richtige Antwort' : 'Falsche Antwort', base);
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
      const retry = document.createElement('button'); retry.className='game-btn primary'; retry.textContent='Neuer Versuch'; retry.onclick=()=>location.href = meta.isBoss ? 'level.html?type=boss' : `level.html?sense=${encodeURIComponent(meta.senseId)}&slot=${meta.slot}`;
      const run = document.createElement('button'); run.className='game-btn muted'; run.textContent='Wegrennen'; run.onclick=()=>{ localStorage.setItem(RETURN_STORE, JSON.stringify({ type:'escape', meta })); location.href='index.html'; };
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
    location.href='index.html';
  }




  function initMiniGame() {
    addSpeaker();
    stopSound('background');

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
    const retryBtn = $('miniRetryBtn');
    const resultBoardBtn = $('miniResultBoardBtn');
    const hud = $('miniHud');
    if (!hero || !stage) return;

    const SPRITES = {
      right1: 'mini_right_1.png',
      right2: 'mini_right_2.png',
      left1: 'mini_left_1.png',
      left2: 'mini_left_2.png',
      jumpRight: 'mini_jump_right.png',
      fallRight: 'mini_fall_right.png',
      jumpLeft: 'mini_jump_left.png',
      fallLeft: 'mini_fall_left.png',
      damageTop: 'mini_damage_top.png',
      damageBottom: 'mini_damage_bottom.png',
      heartFull: 'mini_heart_full.png',
      heartBroken: 'mini_heart_broken.png',
      hedgehogLeft1: 'mini_hedgehog_left_1.png',
      hedgehogLeft2: 'mini_hedgehog_left_2.png',
      hedgehogRight1: 'mini_hedgehog_right_1.png',
      hedgehogRight2: 'mini_hedgehog_right_2.png'
    };
    Object.values(SPRITES).forEach(src => { const img = new Image(); img.src = src; });

    const jumpAudio = new Audio('jump_sound.mp3');
    jumpAudio.preload = 'auto';
    jumpAudio.volume = 0.82;

    const TARGET_DODGES = 10;
    const MAX_HAZARDS = 5;
    const SPAWN_MS = 3000;
    const MAX_HEARTS = 3;
    const HURT_FREEZE_MS = 500;
    const INVULNERABLE_MS = 3000;
    const HEDGE_FRAME_MS = 300;
    const HEDGE_RESPAWN_MS = 700;

    let x = 50;
    let direction = 1;
    let pressedLeft = false;
    let pressedRight = false;
    let velocity = 0;
    let jumping = false;
    let jumpY = 0;
    let jumpVelocity = 0;
    let last = performance.now();
    let lastSprite = '';
    let hazards = [];
    let spawned = 0;
    let dodged = 0;
    let gameOver = false;
    let gameWon = false;
    let lastSpawn = performance.now() + 900;
    let lives = MAX_HEARTS;
    let hurtFreezeUntil = 0;
    let invulnerableUntil = 0;
    let blinkUntil = 0;
    let hurtSprite = '';
    let pendingGameOver = false;

    let heartsWrap = $('miniLives');
    if (!heartsWrap) {
      heartsWrap = document.createElement('div');
      heartsWrap.id = 'miniLives';
      heartsWrap.className = 'mini-hearts';
      heartsWrap.setAttribute('aria-label', 'Leben');
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

    const hedgehogNode = document.createElement('img');
    hedgehogNode.className = 'mini-hedgehog';
    hedgehogNode.alt = '';
    hedgehogNode.setAttribute('aria-hidden', 'true');
    stage.appendChild(hedgehogNode);

    const hedgehog = {
      active: false,
      direction: -1,
      x: 0,
      width: 108,
      frame: 0,
      lastFrameSwap: 0,
      respawnAt: performance.now() + 1200,
      cycle: 0,
      speed: 180
    };

    function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
    function updateHud() { if (hud) hud.textContent = `${dodged} / ${TARGET_DODGES}`; }
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
      lastSprite = src;
    }
    function updateSprite(now) {
      if (now < hurtFreezeUntil) {
        setSprite(hurtSprite || SPRITES.damageTop);
        hero.classList.remove('walking');
        return;
      }
      if (jumping) {
        if (direction < 0) setSprite(jumpVelocity >= 0 ? SPRITES.jumpLeft : SPRITES.fallLeft);
        else setSprite(jumpVelocity >= 0 ? SPRITES.jumpRight : SPRITES.fallRight);
        hero.classList.remove('walking');
        return;
      }
      if (velocity < 0) {
        setSprite((Math.floor(now / 300) % 2 === 0) ? SPRITES.left1 : SPRITES.left2);
      } else if (velocity > 0) {
        setSprite((Math.floor(now / 300) % 2 === 0) ? SPRITES.right1 : SPRITES.right2);
      } else {
        setSprite(direction < 0 ? SPRITES.left1 : SPRITES.right1);
      }
      hero.classList.toggle('walking', velocity !== 0 && !gameOver && !gameWon);
    }
    function updateBlink(now) {
      if (now >= blinkUntil || now < hurtFreezeUntil) {
        hero.style.opacity = '1';
        return;
      }
      hero.style.opacity = (Math.floor(now / 140) % 2 === 0) ? '0.32' : '1';
    }
    function applyHero() {
      hero.style.left = `${x}%`;
      hero.style.transform = `translateX(-50%) translateY(${-jumpY}px)`;
    }
    function playJumpSound() {
      try {
        jumpAudio.currentTime = 0;
        jumpAudio.play().catch(() => {});
      } catch (_) {}
    }
    function jump() {
      if (jumping || gameOver || gameWon || performance.now() < hurtFreezeUntil) return;
      jumping = true;
      jumpVelocity = 790;
      hero.classList.add('jumping');
      playJumpSound();
      setSprite(direction < 0 ? SPRITES.jumpLeft : SPRITES.jumpRight);
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
    jumpBtn?.addEventListener('pointerdown', (ev) => {
      blockDefault(ev);
      if (gameOver || gameWon) return;
      jumpBtn.classList.add('pressed');
      jump();
      try { jumpBtn.setPointerCapture?.(ev.pointerId); } catch (_) {}
    }, { passive:false });
    ['pointerup','pointercancel','pointerleave','lostpointercapture'].forEach(type => jumpBtn?.addEventListener(type, (ev) => {
      ev?.preventDefault?.(); ev?.stopPropagation?.(); jumpBtn.classList.remove('pressed');
    }, { passive:false }));

    [controls, jumpBtn, leftBtn, rightBtn].forEach(node => {
      if (!node) return;
      node.addEventListener('contextmenu', blockDefault);
      node.addEventListener('selectstart', blockDefault);
      node.addEventListener('dragstart', blockDefault);
      node.addEventListener('touchstart', ev => ev.preventDefault(), { passive:false });
    });

    window.addEventListener('blur', stopMovement);
    document.addEventListener('visibilitychange', () => { if (document.hidden) stopMovement(); });

    settingsBtn?.addEventListener('click', () => { stopMovement(); show(menu); });
    closeMenu?.addEventListener('click', () => hide(menu));
    boardBtn?.addEventListener('click', () => location.href = 'index.html');
    resultBoardBtn?.addEventListener('click', () => location.href = 'index.html');

    function spawnHazard() {
      if (gameOver || gameWon || hazards.length >= MAX_HAZARDS || spawned >= TARGET_DODGES) return;
      const rect = stage.getBoundingClientRect();
      const size = Math.round(32 + Math.random() * 24);
      const node = document.createElement('div');
      node.className = 'mini-hazard';
      node.setAttribute('aria-hidden', 'true');
      node.style.width = `${size}px`;
      node.style.height = `${size}px`;
      const xPx = Math.round(size / 2 + Math.random() * Math.max(1, rect.width - size));
      node.style.left = `${xPx}px`;
      node.style.top = `${-size - 8}px`;
      stage.appendChild(node);
      hazards.push({ node, x: xPx, y: -size - 8, size, speed: 145 + Math.random() * 70 });
      spawned += 1;
    }

    function removeHazard(h) {
      h.node?.remove();
    }

    function collide(a, b) {
      const padX = Math.min(32, a.width * 0.18);
      const padY = Math.min(38, a.height * 0.12);
      const aa = { left:a.left + padX, right:a.right - padX, top:a.top + padY, bottom:a.bottom - 4 };
      return !(aa.right < b.left || aa.left > b.right || aa.bottom < b.top || aa.top > b.bottom);
    }

    function showMiniResult(won) {
      if (won) {
        gameWon = true;
        stopMovement();
        if (resultTitle) resultTitle.textContent = 'Geschafft!';
        if (resultText) resultText.textContent = 'Du bist zehn Kugeln ausgewichen.';
        if (retryBtn) retryBtn.textContent = 'Weiter';
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
          location.href = 'index.html';
        };
      } else {
        gameOver = true;
        stopMovement();
        if (resultTitle) resultTitle.textContent = 'Game Over';
        if (resultText) resultText.textContent = 'Alle drei Herzen sind kaputt. Starte einen neuen Versuch oder kehre zum Spielfeld zurück.';
        if (retryBtn) retryBtn.textContent = 'Neuer Versuch';
        if (resultBoardBtn) show(resultBoardBtn);
        retryBtn.onclick = () => location.reload();
      }
      hazards.forEach(removeHazard);
      hazards = [];
      hedgehog.active = false;
      hedgehogNode.style.display = 'none';
      show(resultModal);
    }

    function damageHero(kind) {
      const now = performance.now();
      if (gameOver || gameWon || now < invulnerableUntil) return;
      lives = Math.max(0, lives - 1);
      updateHearts();
      hurtSprite = kind === 'bottom' ? SPRITES.damageBottom : SPRITES.damageTop;
      hurtFreezeUntil = now + HURT_FREEZE_MS;
      blinkUntil = hurtFreezeUntil + INVULNERABLE_MS;
      invulnerableUntil = blinkUntil;
      hero.classList.remove('walking');
      hero.classList.add('jumping');
      if (lives <= 0) pendingGameOver = true;
    }

    function updateHazards(dt, now) {
      if (!gameOver && !gameWon && now - lastSpawn >= SPAWN_MS) {
        spawnHazard();
        lastSpawn = now;
      }
      const stageRect = stage.getBoundingClientRect();
      const heroRect = hero.getBoundingClientRect();
      for (let i = hazards.length - 1; i >= 0; i--) {
        const h = hazards[i];
        h.y += h.speed * dt;
        h.node.style.top = `${h.y}px`;
        const hazardRect = h.node.getBoundingClientRect();
        if (!gameOver && !gameWon && collide(heroRect, hazardRect)) {
          removeHazard(h);
          hazards.splice(i, 1);
          damageHero('top');
          continue;
        }
        if (h.y > stageRect.height + h.size) {
          removeHazard(h);
          hazards.splice(i, 1);
          if (!gameOver && !gameWon) {
            dodged = Math.min(TARGET_DODGES, dodged + 1);
            updateHud();
            if (dodged >= TARGET_DODGES) showMiniResult(true);
          }
        }
      }
    }

    function hedgeFrames(dir) {
      return dir < 0
        ? [SPRITES.hedgehogLeft1, SPRITES.hedgehogLeft2]
        : [SPRITES.hedgehogRight1, SPRITES.hedgehogRight2];
    }
    function startHedgehog(now) {
      const stageRect = stage.getBoundingClientRect();
      hedgehog.direction = (hedgehog.cycle % 2 === 0) ? -1 : 1;
      hedgehog.cycle += 1;
      hedgehog.width = Math.round(clamp(stageRect.width * 0.16, 92, 140));
      hedgehog.speed = clamp(stageRect.width * 0.18, 150, 240);
      hedgehog.frame = 0;
      hedgehog.lastFrameSwap = now;
      hedgehog.active = true;
      hedgehog.x = hedgehog.direction < 0 ? stageRect.width + hedgehog.width : -hedgehog.width;
      hedgehogNode.style.display = 'block';
      hedgehogNode.style.width = `${hedgehog.width}px`;
      hedgehogNode.src = hedgeFrames(hedgehog.direction)[0];
      hedgehogNode.style.left = `${hedgehog.x}px`;
    }
    function updateHedgehog(dt, now) {
      if (!hedgehog.active) {
        if (!gameOver && !gameWon && now >= hedgehog.respawnAt) startHedgehog(now);
        return;
      }
      const stageRect = stage.getBoundingClientRect();
      hedgehog.x += hedgehog.speed * dt * hedgehog.direction;
      hedgehogNode.style.left = `${hedgehog.x}px`;
      if (now - hedgehog.lastFrameSwap >= HEDGE_FRAME_MS) {
        hedgehog.frame = (hedgehog.frame + 1) % 2;
        hedgehogNode.src = hedgeFrames(hedgehog.direction)[hedgehog.frame];
        hedgehog.lastFrameSwap = now;
      }
      const offLeft = hedgehog.direction < 0 && hedgehog.x < -hedgehog.width - 20;
      const offRight = hedgehog.direction > 0 && hedgehog.x > stageRect.width + hedgehog.width + 20;
      if (offLeft || offRight) {
        hedgehog.active = false;
        hedgehogNode.style.display = 'none';
        hedgehog.respawnAt = now + HEDGE_RESPAWN_MS;
        return;
      }
      if (!gameOver && !gameWon && collide(hero.getBoundingClientRect(), hedgehogNode.getBoundingClientRect())) {
        damageHero('bottom');
      }
    }

    function tick(now) {
      const dt = Math.min(0.033, (now - last) / 1000 || 0);
      last = now;
      if (!gameOver && !gameWon) {
        if (now >= hurtFreezeUntil) {
          if (velocity) x = clamp(x + velocity * 26 * dt, 8, 92);
          if (jumping) {
            jumpY += jumpVelocity * dt;
            jumpVelocity -= 1750 * dt;
            if (jumpY <= 0) {
              jumpY = 0;
              jumpVelocity = 0;
              jumping = false;
              hero.classList.remove('jumping');
              recomputeVelocity();
            }
          }
        }
        updateSprite(now);
        applyHero();
        updateBlink(now);
        updateHazards(dt, now);
        updateHedgehog(dt, now);
        if (pendingGameOver && now >= hurtFreezeUntil) {
          pendingGameOver = false;
          showMiniResult(false);
          return;
        }
      }
      requestAnimationFrame(tick);
    }

    updateHud();
    updateHearts();
    setSprite(SPRITES.right1);
    applyHero();
    requestAnimationFrame(tick);
  }

  function initCodes() {
    addSpeaker(); $('printCodesBtn')?.addEventListener('click', () => print());
    const grid=$('qrGrid'); if (!grid) return;
    grid.innerHTML = [...Object.values(SENSES), BOSS].map(s=>`<article class="qr-card"><img src="qr_${s.id}.png" alt="QR-Code ${esc(s.label)}"><h2>${esc(s.label)}</h2><p>${esc(s.code)}</p></article>`).join('');
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
