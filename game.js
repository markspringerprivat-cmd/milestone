(() => {
  'use strict';

  const SENSES = {
    sehen: {
      id: 'sehen', label: 'Sehen', code: 'SINNE-SEHEN', enemy: 'sehen.webp', defeated: 'sehen_besiegt.webp',
      title: 'Level: Sehen', speech: '„Meine Illusionen blenden dich. Mal sehen, ob du den richtigen Reiz erkennst!“',
      intro: 'Hier geht es um das Auge, Lichtreize und die Verarbeitung von Sehinformationen.',
      content: ['Das Auge nimmt Lichtreize aus der Umgebung auf. Hornhaut und Linse bündeln das Licht, sodass auf der Netzhaut ein Bild entsteht.', 'Auf der Netzhaut sitzen Sinneszellen. Sie wandeln Licht in elektrische Signale um. Diese Signale gelangen über den Sehnerv zum Gehirn, wo sie verarbeitet und zu einem Bild zusammengesetzt werden.'],
      tasks: ['Beschreibe den Weg des Lichts durch das Auge.', 'Erkläre die Aufgabe von Netzhaut und Sehnerv.', 'Nenne eine Situation, in der gutes Sehen besonders wichtig ist.'],
      quiz: { q: 'Wo werden Lichtreize im Auge in Nervensignale umgewandelt?', a: ['In der Linse', 'Auf der Netzhaut', 'In der Ohrmuschel'], correct: 1 }
    },
    hoeren: {
      id: 'hoeren', label: 'Hören', code: 'SINNE-HOEREN', enemy: 'hoeren.webp', defeated: 'hoeren_besiegt.webp',
      title: 'Level: Hören', speech: '„Ich verdrehe jede Schallwelle. Ob du trotzdem den richtigen Ton triffst?“',
      intro: 'Hier geht es um das Ohr, Schallwellen und den Gleichgewichtssinn.',
      content: ['Das Ohr nimmt Schallwellen auf. Die Ohrmuschel leitet den Schall zum Trommelfell weiter. Dieses gerät in Schwingung.', 'Die Gehörknöchelchen verstärken die Schwingungen. In der Hörschnecke werden sie in Nervensignale umgewandelt. Außerdem ist das Innenohr wichtig für das Gleichgewicht.'],
      tasks: ['Ordne Außenohr, Mittelohr und Innenohr je eine Aufgabe zu.', 'Erkläre, wie Schall zu einem Nervensignal wird.', 'Beschreibe, warum das Ohr auch für Gleichgewicht wichtig ist.'],
      quiz: { q: 'Welches Sinnesorgan ist auch am Gleichgewicht beteiligt?', a: ['Die Zunge', 'Die Nase', 'Das Ohr'], correct: 2 }
    },
    riechen: {
      id: 'riechen', label: 'Riechen', code: 'SINNE-RIECHEN', enemy: 'riechen.webp', defeated: 'riechen_besiegt.webp',
      title: 'Level: Riechen', speech: '„Mein Nebel liegt in der Luft. Folge der Spur, wenn du dich traust!“',
      intro: 'Hier geht es um die Nase, Geruchsstoffe und die Bedeutung des Riechens im Alltag.',
      content: ['Die Nase erkennt Geruchsstoffe in der Luft. Beim Einatmen gelangen Duftmoleküle zur Riechschleimhaut.', 'Dort sitzen Riechzellen, die passende Moleküle erkennen und Signale an das Gehirn senden. Gerüche können warnen, Erinnerungen auslösen und den Geschmack beeinflussen.'],
      tasks: ['Beschreibe, wie ein Geruch von der Luft bis ins Gehirn gelangt.', 'Nenne zwei Situationen, in denen der Geruchssinn schützt.', 'Erkläre, warum Essen bei Schnupfen anders schmecken kann.'],
      quiz: { q: 'Warum schmeckt Essen bei Schnupfen oft schwächer?', a: ['Weil die Haut langsamer arbeitet', 'Weil Geruch und Geschmack zusammenwirken', 'Weil die Augen weniger Licht aufnehmen'], correct: 1 }
    },
    schmecken: {
      id: 'schmecken', label: 'Schmecken', code: 'SINNE-SCHMECKEN', enemy: 'schmecken.webp', defeated: 'schmecken_besiegt.webp',
      title: 'Level: Schmecken', speech: '„Süß, sauer, salzig? Ich bringe alles durcheinander. Beweise deinen Geschmack!“',
      intro: 'Hier geht es um die Zunge, Geschmacksrichtungen und das Zusammenspiel der Sinne.',
      content: ['Auf der Zunge befinden sich Geschmacksknospen. Sie erkennen Stoffe aus der Nahrung und ermöglichen Geschmackswahrnehmungen.', 'Häufig unterscheidet man süß, sauer, salzig, bitter und umami. Geschmack entsteht aber nicht nur auf der Zunge: Geruch, Temperatur und Konsistenz wirken mit.'],
      tasks: ['Nenne die fünf häufig genannten Geschmacksrichtungen.', 'Erkläre, warum Geruch und Geschmack zusammenhängen.', 'Beschreibe ein Lebensmittel mit mehreren Sinneseindrücken.'],
      quiz: { q: 'Welche Geschmacksrichtung gehört zu den häufig genannten Grundrichtungen?', a: ['Umami', 'Knusprig', 'Heiß'], correct: 0 }
    },
    fuehlen: {
      id: 'fuehlen', label: 'Fühlen', code: 'SINNE-FUEHLEN', enemy: 'fuehlen.webp', defeated: 'fuehlen_besiegt.webp',
      title: 'Level: Fühlen', speech: '„Meine Panzer fühlen alles. Spürst du, was Schutz wirklich bedeutet?“',
      intro: 'Hier geht es um die Haut, Berührung, Temperatur, Schmerz und Schutz.',
      content: ['Die Haut ist das größte Sinnesorgan des Körpers. Sie enthält Rezeptoren für Berührung, Druck, Wärme, Kälte und Schmerz.', 'Gleichzeitig schützt die Haut vor Verletzungen, Krankheitserregern und Austrocknung. Sie ist also Sinnesorgan und Schutzschicht zugleich.'],
      tasks: ['Nenne drei Reize, die die Haut wahrnehmen kann.', 'Erkläre, warum Schmerz eine Schutzfunktion hat.', 'Beschreibe, warum die Haut mehr ist als nur eine Hülle.'],
      quiz: { q: 'Welche Funktion hat Schmerz?', a: ['Er warnt vor möglicher Gefahr', 'Er verbessert das Sehen', 'Er ersetzt den Geruchssinn'], correct: 0 }
    }
  };

  const BOSS = {
    id: 'boss', label: 'Boss', enemy: 'boss.webp', defeated: 'boss_besiegt.webp', title: 'Finale: Boss der Sinne',
    speech: '„Alle Sinne gegen mich? Dann zeig, dass du das Königreich wirklich verstanden hast!“',
    intro: 'Im finalen Level geht es um das Zusammenspiel aller Sinnesorgane.',
    content: ['Sinnesorgane nehmen Reize aus der Umwelt oder aus dem Körper auf. Das Gehirn verarbeitet diese Informationen und ordnet sie ein.', 'Viele Wahrnehmungen entstehen durch das Zusammenspiel mehrerer Sinne. Beim Essen wirken zum Beispiel Geschmack, Geruch, Temperatur, Konsistenz und Sehen zusammen.'],
    tasks: ['Erkläre, warum Sinnesorgane nicht völlig getrennt voneinander arbeiten.', 'Nenne ein Beispiel, in dem mehrere Sinne zusammenwirken.', 'Beschreibe, welche Rolle das Gehirn bei der Wahrnehmung spielt.'],
    quiz: { q: 'Welche Aussage passt am besten?', a: ['Sinnesorgane arbeiten immer vollständig getrennt.', 'Nur die Zunge ist für Geschmack verantwortlich.', 'Das Gehirn verarbeitet Sinnesinformationen und ordnet sie ein.'], correct: 2 }
  };

  const LEVEL_POSITIONS = [
    { x: 47.8, y: 85.8 },
    { x: 50.2, y: 65.8 },
    { x: 50.4, y: 48.8 },
    { x: 50.3, y: 30.8 },
    { x: 50.5, y: 19.7 }
  ];
  const BOSS_POSITION = { x: 50.3, y: 7.4 };
  const STAGE_BACKGROUNDS = ['stage_gras.webp', 'stage_sand.webp', 'stage_eis.webp', 'stage_lava.webp', 'stage_himmel.webp'];
  const BOSS_BACKGROUND = 'stage_all.webp';
  const STORE = 'koenigreichSinneGameRebuildV1';
  const BOARD_RATIO = 1086 / 1448;

  let scanStream = null;
  let scanTimer = null;
  let html5Scanner = null;
  let activeSlotForScan = null;
  let pendingLaunch = null;

  const AUDIO_FILES = {
    background: 'background.mp3',
    levelstart: 'levelstart.mp3',
    levelunlocked: 'levelunlocked.mp3',
    fight: 'fight.mp3',
    win: 'win.mp3',
    lose: 'lose.mp3'
  };
  const SOUND_STORE = 'koenigreichSinneSoundMutedV1';
  const audio = {};
  let audioReady = false;
  let audioUnlocked = false;
  let soundMuted = localStorage.getItem(SOUND_STORE) === '1';
  let audioButton = null;

  function isBoardVisible() {
    return document.body.dataset.page === 'board' && !el('boardScreen')?.classList.contains('hidden');
  }

  function initAudio() {
    if (audioReady) return;
    Object.entries(AUDIO_FILES).forEach(([key, file]) => {
      const a = new Audio(file);
      a.preload = 'auto';
      a.setAttribute('playsinline', '');
      if (key === 'background') {
        a.loop = true;
        a.volume = 0.14;
      } else {
        a.volume = 0.86;
      }
      audio[key] = a;
    });
    audioReady = true;
  }

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
      } else {
        await unlockAudioFromGesture();
        if (isBoardVisible()) startBackgroundMusic();
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

  async function unlockAudioFromGesture() {
    initAudio();
    if (soundMuted) return;
    try {
      const probe = audio.levelstart || audio.background;
      probe.muted = true;
      await probe.play();
      probe.pause();
      probe.currentTime = 0;
      probe.muted = false;
      audioUnlocked = true;
    } catch {
      // Mobile Browser erlauben Audio häufig erst beim nächsten direkten Tippen.
    }
  }

  function stopBackgroundMusic() {
    initAudio();
    const bg = audio.background;
    if (!bg) return;
    try { bg.pause(); } catch {}
  }

  function playSound(key) {
    initAudio();
    if (soundMuted) return Promise.resolve();
    const a = audio[key];
    if (!a) return Promise.resolve();
    try {
      a.pause();
      a.currentTime = 0;
      return a.play().catch(() => {});
    } catch {
      return Promise.resolve();
    }
  }

  function startBackgroundMusic() {
    initAudio();
    if (soundMuted || !isBoardVisible()) return;
    const bg = audio.background;
    if (!bg || !bg.paused) return;
    bg.play().then(() => { audioUnlocked = true; }).catch(() => {});
  }

  function armAudioUnlock() {
    initAudio();
    ensureAudioButton();
    const unlock = async () => {
      await unlockAudioFromGesture();
      if (isBoardVisible()) startBackgroundMusic();
    };
    document.addEventListener('pointerdown', unlock, { once: true, passive: true });
    document.addEventListener('touchstart', unlock, { once: true, passive: true });
    document.addEventListener('click', unlock, { once: true });
    document.addEventListener('keydown', unlock, { once: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopBackgroundMusic();
      else if (isBoardVisible()) startBackgroundMusic();
    });
  }

  function defaultState() {
    return { started: false, slots: [null, null, null, null, null], completed: [false, false, false, false, false], bossCompleted: false };
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
  function senseList() { return Object.values(SENSES); }
  function usedSenseIds(state = getState()) { return state.slots.filter(Boolean); }
  function completedCount(state = getState()) { return state.completed.filter(Boolean).length; }
  function currentSlot(state = getState()) { return state.completed.findIndex(done => !done); }
  function allLevelsDone(state = getState()) { return state.completed.every(Boolean); }
  function codeToSense(text) {
    const raw = String(text || '').trim().toUpperCase();
    return senseList().find(s => raw.includes(s.code) || raw === s.id.toUpperCase() || raw.includes(s.label.toUpperCase())) || null;
  }
  function qs(name) { return new URLSearchParams(window.location.search).get(name); }
  function el(id) { return document.getElementById(id); }
  function show(node) { node && node.classList.remove('hidden'); }
  function hide(node) { node && node.classList.add('hidden'); }
  function setText(id, text) { const n = el(id); if (n) n.textContent = text; }

  document.addEventListener('DOMContentLoaded', () => {
    armAudioUnlock();
    const page = document.body.dataset.page;
    if (page === 'board') initBoard();
    if (page === 'level') { stopBackgroundMusic(); initLevel(); }
    if (page === 'codes') { stopBackgroundMusic(); initCodes(); }
  });

  function initBoard() {
    const state = getState();
    const intro = el('introScreen');
    const board = el('boardScreen');
    const below = el('belowBoard');

    if (state.started) {
      hide(intro); show(board); show(below);
    } else {
      show(intro); hide(board); hide(below);
    }

    const startBtn = el('startGameBtn');
    let startAlreadyHandled = false;
    const startGameNow = (event) => {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      if (startAlreadyHandled) return;
      startAlreadyHandled = true;
      const s = getState();
      s.started = true;
      setState(s);
      hide(intro);
      show(board);
      show(below);
      updateBoardBox();
      renderBoard();
      // Audio wird erst nach dem sicheren Wechsel gestartet, damit mobile Browser den Start nicht blockieren.
      unlockAudioFromGesture().then(() => startBackgroundMusic()).catch(() => {});
    };
    if (startBtn) {
      startBtn.addEventListener('click', startGameNow);
      startBtn.addEventListener('pointerup', startGameNow);
      startBtn.addEventListener('touchend', startGameNow, { passive: false });
    }
    el('resetGameBtn')?.addEventListener('click', resetGame);
    el('closeScanBtn')?.addEventListener('click', closeScanModal);
    el('backToBoardBtn')?.addEventListener('click', closeScanModal);
    el('manualUnlockBtn')?.addEventListener('click', () => handleScanText(el('manualCodeInput')?.value));
    el('manualCodeInput')?.addEventListener('keydown', e => { if (e.key === 'Enter') handleScanText(e.target.value); });
    el('encounterBackBtn')?.addEventListener('click', () => hide(el('encounterModal')));
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
    updateBoardBox(); renderBoard();
    if (state.started) startBackgroundMusic();
  }

  function updateBoardBox() {
    const screen = el('boardScreen');
    const inner = el('mapInner');
    if (!screen || !inner || screen.classList.contains('hidden')) return;
    const w = screen.clientWidth;
    const h = screen.clientHeight;
    let iw, ih;
    if (w / h > BOARD_RATIO) {
      iw = w; ih = w / BOARD_RATIO;
    } else {
      ih = h; iw = h * BOARD_RATIO;
    }
    inner.style.width = `${iw}px`;
    inner.style.height = `${ih}px`;
  }

  function renderBoard() {
    const inner = el('mapInner');
    if (!inner) return;
    inner.innerHTML = '';
    const state = getState();
    const active = currentSlot(state);

    LEVEL_POSITIONS.forEach((pos, index) => {
      const assigned = state.slots[index];
      const done = state.completed[index];
      const isActive = index === active && !done;
      const token = document.createElement('button');
      token.type = 'button';
      token.className = `map-token ${done ? 'done' : isActive ? 'hero-active' : 'locked'}`;
      token.style.left = `${pos.x}%`;
      token.style.top = `${pos.y}%`;
      token.innerHTML = tokenHtml(index + 1, assigned, done, isActive);
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
      ? '<div class="done-token crown-done">✓<span>Gerettet</span></div>'
      : bossActive
        ? '<img class="hero-token" src="held.webp" alt="Held"><span class="token-label">Boss</span>'
        : '<img class="lock-token" src="lock.png" alt="Schloss"><span class="token-label">Finale</span>';
    boss.addEventListener('click', handleBossClick);
    inner.appendChild(boss);

    renderProgress();
  }

  function tokenHtml(number, assigned, done, active) {
    if (done) {
      const label = assigned ? SENSES[assigned].label : `Level ${number}`;
      return `<div class="done-token">✓<span>${escapeHtml(label)}</span></div>`;
    }
    if (active) {
      return `<img class="hero-token" src="held.webp" alt="Held"><span class="token-label">Level ${number}</span>`;
    }
    return `<img class="lock-token" src="lock.png" alt="Schloss"><span class="token-label">Level ${number}</span>`;
  }

  function renderProgress() {
    const summary = el('progressSummary');
    if (!summary) return;
    const state = getState();
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

  function handleNodeClick(index) {
    const state = getState();
    const active = currentSlot(state);
    if (state.completed[index]) {
      const sense = state.slots[index];
      window.location.href = `level.html?sense=${encodeURIComponent(sense)}&slot=${index}`;
      return;
    }
    if (index !== active) return;
    if (state.slots[index]) {
      showEncounter(state.slots[index], index);
      return;
    }
    playSound('levelstart');
    openScanModal(index);
  }

  function handleBossClick() {
    const state = getState();
    if (state.bossCompleted) return;
    if (!allLevelsDone(state)) return;
    playSound('levelstart');
    showBossEncounter();
  }

  function openScanModal(slot) {
    activeSlotForScan = slot;
    setText('scanTitle', `Level ${slot + 1}: QR-Code scannen`);
    setText('scanHelp', 'Scanne einen beliebigen noch nicht erledigten Sinnes-Code. Der Code bestimmt das Thema dieses Levels.');
    setText('scanMessage', '');
    hide(el('scanMessage'));
    const input = el('manualCodeInput'); if (input) input.value = '';
    show(el('scanModal'));
    startCameraScan();
  }

  function closeScanModal() {
    stopCameraScan();
    hide(el('scanModal'));
  }

  async function startCameraScan() {
    const info = el('cameraInfo');
    const reader = el('qrReader');
    if (info) info.textContent = 'Kamera wird vorbereitet …';

    // Erste Wahl: html5-qrcode. Diese Bibliothek funktioniert in deutlich mehr mobilen Browsern
    // als die native BarcodeDetector-API. Falls sie nicht geladen wird, gibt es unten Fallbacks.
    if (reader && typeof Html5Qrcode !== 'undefined') {
      try {
        reader.innerHTML = '<p id="cameraInfo" class="camera-info">Kamera wird vorbereitet …</p>';
        html5Scanner = new Html5Qrcode('qrReader');
        const config = { fps: 10, qrbox: { width: 240, height: 240 }, aspectRatio: 1.0 };
        await html5Scanner.start(
          { facingMode: 'environment' },
          config,
          decodedText => handleScanText(decodedText),
          () => {}
        );
        const liveInfo = el('cameraInfo');
        if (liveInfo) liveInfo.textContent = 'Kamera aktiv. QR-Code vor die Kamera halten.';
        return;
      } catch (err) {
        if (reader) reader.innerHTML = '<p id="cameraInfo" class="camera-info">Kamera konnte nicht gestartet werden. Bitte Berechtigung prüfen oder Code manuell eingeben.</p>';
        return;
      }
    }

    // Fallback für Browser mit nativer QR-Erkennung.
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
      return;
    }
    try {
      scanStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false });
      video.srcObject = scanStream;
      await video.play();
      if (!('BarcodeDetector' in window)) {
        const i = el('cameraInfo'); if (i) i.textContent = 'Dieser Browser unterstützt den eingebauten QR-Scanner nicht. Bitte Code manuell eingeben.';
        return;
      }
      const detector = new BarcodeDetector({ formats: ['qr_code'] });
      const i = el('cameraInfo'); if (i) i.textContent = 'Kamera aktiv. QR-Code vor die Kamera halten.';
      scanTimer = window.setInterval(async () => {
        if (!video.videoWidth) return;
        try {
          const codes = await detector.detect(video);
          if (codes && codes.length) handleScanText(codes[0].rawValue || codes[0].rawData || '');
        } catch { /* ignore frame errors */ }
      }, 450);
    } catch {
      const i = el('cameraInfo'); if (i) i.textContent = 'Kamera konnte nicht gestartet werden. Bitte Berechtigung prüfen oder Code manuell eingeben.';
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

  function handleScanText(text) {
    const msg = el('scanMessage');
    const sense = codeToSense(text);
    if (!sense) {
      if (msg) { msg.className = 'message bad'; msg.textContent = 'Dieser Code passt zu keinem Sinnes-Level.'; show(msg); }
      return;
    }
    const state = getState();
    if (usedSenseIds(state).includes(sense.id)) {
      if (msg) { msg.className = 'message bad'; msg.textContent = 'Dieser QR-Code wurde in diesem Spiel bereits verwendet.'; show(msg); }
      return;
    }
    if (activeSlotForScan === null || activeSlotForScan < 0) return;
    state.slots[activeSlotForScan] = sense.id;
    setState(state);
    playSound('levelunlocked');
    closeScanModal();
    showEncounter(sense.id, activeSlotForScan);
    renderBoard();
  }

  function showEncounter(senseId, slot) {
    const sense = SENSES[senseId];
    pendingLaunch = { type: 'sense', sense: sense.id, slot };
    el('encounterImage').src = sense.enemy;
    el('encounterImage').alt = `Gegner ${sense.label}`;
    setText('encounterKicker', `Level ${slot + 1} freigeschaltet`);
    setText('encounterTitle', sense.title);
    setText('encounterSpeech', sense.speech);
    show(el('encounterModal'));
  }

  function showBossEncounter() {
    pendingLaunch = { type: 'boss' };
    el('encounterImage').src = BOSS.enemy;
    el('encounterImage').alt = 'Bossgegner';
    setText('encounterKicker', 'Finale freigeschaltet');
    setText('encounterTitle', BOSS.title);
    setText('encounterSpeech', BOSS.speech);
    show(el('encounterModal'));
  }

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
    document.body.classList.add('stage-page');
    document.body.style.setProperty('--stage-bg', `url("${bg}")`);
  }

  function renderLevel(data, meta) {
    applyStageBackground(meta);
    setText('levelBadge', meta.isBoss ? 'Finale' : `Level ${meta.slot + 1}`);
    setText('levelKicker', meta.isBoss ? 'Bosslevel' : 'Sinnes-Level');
    setText('levelTitle', data.title);
    setText('levelIntro', data.intro);
    const enemy = el('levelEnemy'); if (enemy) { enemy.src = data.enemy; enemy.alt = data.title; }
    const content = el('levelContent');
    if (content) content.innerHTML = data.content.map(p => `<p>${escapeHtml(p)}</p>`).join('');
    const tasks = el('levelTasks');
    if (tasks) tasks.innerHTML = data.tasks.map((t, i) => `<div class="task"><b>Aufgabe ${i + 1}</b>${escapeHtml(t)}</div>`).join('');
    setText('quizQuestion', data.quiz.q);
    const options = el('quizOptions');
    if (options) {
      options.innerHTML = data.quiz.a.map((opt, i) => `<label class="quiz-option"><input type="radio" id="answer_${i}" name="quizAnswer" value="${i}"><span>${escapeHtml(opt)}</span></label>`).join('');
    }
    el('checkAnswerBtn')?.addEventListener('click', () => checkAnswer(data, meta));
    el('outroResetBtn')?.addEventListener('click', resetGame);
  }

  function checkAnswer(data, meta) {
    const selected = document.querySelector('input[name="quizAnswer"]:checked');
    const feedback = el('quizFeedback');
    if (!selected) {
      if (feedback) { feedback.className = 'message bad'; feedback.textContent = 'Bitte wähle zuerst eine Antwort aus.'; show(feedback); }
      return;
    }
    const ok = Number(selected.value) === data.quiz.correct;
    if (ok) showWinFlow(data, meta);
    else showLoseFlow();
  }

  function showWinFlow(data, meta) {
    playSound('win');
    const modal = el('resultModal');
    el('resultImage').src = data.defeated;
    el('resultImage').alt = `${data.label || 'Boss'} besiegt`;
    setText('resultKicker', 'Richtig beantwortet');
    setText('resultTitle', meta.isBoss ? 'Boss besiegt!' : `${data.label} besiegt!`);
    setText('resultText', meta.isBoss ? 'Der Boss ist geschlagen. Das Königreich der Sinne ist gerettet.' : 'Du hast das Level geschafft. Gleich geht es zurück zum Spielbrett.');
    const buttons = el('resultButtons');
    buttons.innerHTML = '<button id="continueWinBtn" class="game-btn primary">Weiter</button>';
    show(modal);
    el('continueWinBtn').addEventListener('click', () => showHeroWon(meta));
  }

  function showHeroWon(meta) {
    el('resultImage').src = 'held_gewonnen.webp';
    el('resultImage').alt = 'Held gewonnen';
    setText('resultKicker', 'Sieg');
    setText('resultTitle', 'Held gewonnen!');
    setText('resultText', meta.isBoss ? 'Das letzte Level ist abgeschlossen. Jetzt erscheint das Outro.' : 'Der Held ist bereit für das nächste Feld.');
    const buttons = el('resultButtons');
    buttons.innerHTML = '<button id="finishLevelBtn" class="game-btn primary">Weiter</button>';
    el('finishLevelBtn').addEventListener('click', () => finishLevel(meta));
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
    setState(state);
    window.location.href = 'index.html';
  }

  function showLoseFlow() {
    playSound('lose');
    const modal = el('resultModal');
    el('resultImage').src = 'held_verloren.webp';
    el('resultImage').alt = 'Held verloren';
    setText('resultKicker', 'Noch nicht geschafft');
    setText('resultTitle', 'Held verloren');
    setText('resultText', 'Die Antwort war noch nicht richtig. Du kannst es direkt erneut versuchen oder zum Spielbrett zurückkehren.');
    const buttons = el('resultButtons');
    buttons.innerHTML = '<button id="retryBtn" class="game-btn primary">Neuer Versuch</button><a class="game-btn muted" href="index.html">Zurück zum Spielbrett</a>';
    show(modal);
    el('retryBtn').addEventListener('click', () => hide(modal));
  }

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

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c]));
  }
})();
