(() => {
  'use strict';

  const STORE = 'koenigreichSinneV4State';
  const BATTLE_STORE = 'koenigreichSinneV4Battle';
  const RETURN_STORE = 'koenigreichSinneV4BoardReturn';
  const SOUND_STORE = 'koenigreichSinneV4Muted';

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
    id: 'boss', label: 'Boss', enemyName: 'Sinntron 3000', enemy: 'boss.webp', defeated: 'boss_besiegt.webp', title: 'Finale: Boss der Sinne',
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

  const LEVEL_POSITIONS = [
    { x: 24.5, y: 91.5 },
    { x: 28.7, y: 78.2 },
    { x: 28.7, y: 62.5 },
    { x: 31.1, y: 44.2 },
    { x: 30.8, y: 31.5 }
  ];
  const BOSS_POSITION = { x: 50.0, y: 10.3 };
  const BOARD_RATIO = 941 / 1672;
  const STAGE_BACKGROUNDS = ['stage_gras.webp', 'stage_sand.webp', 'stage_eis.webp', 'stage_lava.webp', 'stage_himmel.webp'];
  const POPUP_BACKGROUNDS = ['popup_gras.webp', 'popup_sand.webp', 'popup_eis.webp', 'popup_lava.webp', 'popup_himmel.webp'];

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

  function defaultState() { return { started:false, slots:[null,null,null,null,null], completed:[false,false,false,false,false], bossCompleted:false, heroIndex:null, introUsed:false }; }
  function getState() {
    try { return { ...defaultState(), ...(JSON.parse(localStorage.getItem(STORE)) || {}) }; } catch (_) { return defaultState(); }
  }
  function setState(state) { localStorage.setItem(STORE, JSON.stringify({ ...defaultState(), ...state })); }
  function currentSlot(state = getState()) { const i = state.completed.findIndex(v => !v); return i < 0 ? 5 : i; }
  function allLevelsDone(state = getState()) { return state.completed.every(Boolean); }
  function usedIds(state = getState()) { return state.slots.filter(Boolean); }
  function dataForMeta(meta) { return meta?.isBoss ? BOSS : SENSES[meta?.senseId]; }
  function getQuestionsForId(id) { return QUESTION_BANK[id] || QUESTION_BANK.sehen; }
  function bgForMeta(meta) { return meta?.isBoss ? 'stage_all.webp' : STAGE_BACKGROUNDS[Number(meta?.slot) || 0]; }
  function popupBgForMeta(meta) { return meta?.isBoss ? 'popup_all.webp' : POPUP_BACKGROUNDS[Number(meta?.slot) || 0]; }
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
    $('launchLevelBtn')?.addEventListener('click', () => { if (!window.pendingLaunch) return; location.href = window.pendingLaunch.url; });
    $('encounterBackBtn')?.addEventListener('click', () => escapeToBoard(window.pendingLaunch?.meta));
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

  function boardPos(index) { return index === 5 ? BOSS_POSITION : LEVEL_POSITIONS[index]; }
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
        hero.style.transition = 'none'; hero.style.left = '16%'; hero.style.top = '94%'; hero.dataset.index = 'intro';
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
      const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'map-token v4-node'; btn.style.left = `${pos.x}%`; btn.style.top = `${pos.y}%`;
      const assigned = state.slots[index]; const done = state.completed[index]; const isActive = index === active;
      if (done) btn.innerHTML = `<img class="done-flag-token" src="flag_complete.webp" alt="abgeschlossen"><span class="token-label">Level ${index+1}</span>`;
      else if (isActive) btn.innerHTML = `<span class="token-label open-level-pill">Level ${index+1}</span>`;
      else btn.innerHTML = `<img class="lock-token" src="lock.png" alt="Schloss"><span class="token-label">Level ${index+1}</span>`;
      btn.addEventListener('click', () => onLevelNode(index)); inner.appendChild(btn);
    });
    const boss = document.createElement('button'); boss.type='button'; boss.className='map-token v4-node boss'; boss.style.left=`${BOSS_POSITION.x}%`; boss.style.top=`${BOSS_POSITION.y}%`;
    boss.innerHTML = state.bossCompleted ? `<img class="done-flag-token" src="flag_complete.webp" alt="Finale geschafft"><span class="token-label">Finale</span>` : `<img class="lock-token" src="lock.png" alt="Boss verschlossen"><span class="token-label">Finale</span>`;
    boss.addEventListener('click', onBossNode); inner.appendChild(boss);
    const hero = document.createElement('button'); hero.type='button'; hero.id='movingHero'; hero.className='map-token moving-hero-token'; hero.innerHTML='<img class="hero-token" src="held.webp" alt="Sir Nervus">'; inner.appendChild(hero);
    if (heroIndex !== null) setHeroAt(heroIndex, true); else { hero.classList.add('hidden'); hero.style.left='16%'; hero.style.top='94%'; }
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
    if (completed) { location.href = `level.html?sense=${encodeURIComponent(assigned)}&slot=${index}`; return; }
    if (assigned) { showEncounter(assigned, index); return; }
    openScan(index);
  }
  async function onBossNode() {
    const state = getState(); if (!allLevelsDone(state) || state.bossCompleted) return;
    await animateHeroTo(5); showBossEncounter();
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
    const sense = Object.values(SENSES).find(s => s.code.toUpperCase() === code || s.id.toUpperCase() === code.replace('SINNE-',''));
    if (!sense) { setScanMessage('Code nicht erkannt.', true); return; }
    if (usedIds().includes(sense.id)) { setScanMessage('Dieser Gegner wurde schon verwendet.', true); return; }
    unlockSense(sense.id, scanIndex);
  }
  function unlockRandom() {
    if (!Number.isInteger(scanIndex)) return;
    const unused = Object.keys(SENSES).filter(id => !usedIds().includes(id));
    if (!unused.length) return;
    unlockSense(unused[Math.floor(Math.random()*unused.length)], scanIndex);
  }
  async function unlockSense(id, index) {
    await stopScanner(); hide($('scanModal'));
    const state = getState(); state.slots[index]=id; state.heroIndex=index; setState(state);
    playSound('levelunlocked'); renderBoard(); showEncounter(id,index);
  }
  function showEncounter(id,index) {
    const data = SENSES[id]; const meta = { isBoss:false, slot:index, senseId:id };
    window.pendingLaunch = { url:`level.html?sense=${encodeURIComponent(id)}&slot=${index}`, meta };
    const modal = $('encounterModal'); applyStagePopup(modal, meta);
    $('encounterImage').src=data.enemy; $('encounterImage').alt=data.enemyName; $('encounterKicker').textContent='Level freigeschaltet'; $('encounterTitle').textContent=data.enemyName; $('encounterSpeech').textContent=data.speech; show(modal);
  }
  function showBossEncounter() {
    const meta = { isBoss:true, senseId:'boss' };
    window.pendingLaunch = { url:'level.html?type=boss', meta };
    const modal = $('encounterModal'); applyStagePopup(modal, meta);
    $('encounterImage').src=BOSS.enemy; $('encounterImage').alt=BOSS.enemyName; $('encounterKicker').textContent='Finale freigeschaltet'; $('encounterTitle').textContent=BOSS.enemyName; $('encounterSpeech').textContent=BOSS.speech; show(modal);
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
    else if (data.meta?.isBoss) { showOutro(); return; }
    else { img.src=ASSETS.winHero; kicker.textContent='Erfolg'; title.textContent='Neues Level freigeschaltet'; text.textContent='Weiter zum Spielbrett.'; playSound('levelunlocked'); }
    show(modal);
  }

  function initLevel() {
    addSpeaker();
    const isBoss = qs('type') === 'boss'; const slot = Number(qs('slot')); const senseId = isBoss ? 'boss' : qs('sense'); const state=getState();
    if (!isBoss && (!Number.isInteger(slot) || !SENSES[senseId] || state.slots[slot] !== senseId)) { location.replace('index.html'); return; }
    if (isBoss && !allLevelsDone(state)) { location.replace('index.html'); return; }
    const data = isBoss ? BOSS : SENSES[senseId]; const meta = { isBoss, slot: isBoss ? null : slot, senseId };
    document.body.style.setProperty('--stage-bg', `url("${bgForMeta(meta)}")`);
    $('levelBadge').textContent = isBoss ? 'Finale' : `Level ${slot+1}`;
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
      if (textImg) {
        textImg.src = won ? ASSETS.text.gewonnen : ASSETS.text.verloren;
        textImg.alt = won ? 'Gewonnen' : 'Verloren';
        textImg.className = 'battle-text-img result-preload';
      }
      outcome.classList.add('pre-visible');
      await sleep(180);
      img.classList.remove('final-idle'); img.classList.add('cloud-reveal');
      outcome.classList.add('visible');
      await sleep(1320);
      img.className='battle-seq-img hidden';
      outcome.className='battle-outcome visible idle';
      stopSound('battle_background');
      playSound(won ? 'win' : 'lose');
      if (textImg) {
        await sleep(60);
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
    if (meta.isBoss) state.bossCompleted = true; else { state.completed[meta.slot]=true; state.heroIndex=meta.slot; }
    setState(state); sessionStorage.removeItem(BATTLE_STORE);
    localStorage.setItem(RETURN_STORE, JSON.stringify({ type:'unlocked', meta }));
    location.href='index.html';
  }

  function initCodes() {
    addSpeaker(); $('printCodesBtn')?.addEventListener('click', () => print());
    const grid=$('qrGrid'); if (!grid) return;
    grid.innerHTML = Object.values(SENSES).map(s=>`<article class="qr-card"><img src="qr_${s.id}.png" alt="QR-Code ${esc(s.label)}"><h2>${esc(s.label)}</h2><p>${esc(s.code)}</p></article>`).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page;
    if (page === 'board') initBoard();
    else if (page === 'level') initLevel();
    else if (page === 'battle') initBattle();
    else if (page === 'codes') initCodes();
  });
})();
