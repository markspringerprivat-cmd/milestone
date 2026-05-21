const LEVELS = [
  { id: 'auge', name: 'Auge', token: 'SINNE-AUGE-2026', file: 'auge.html', x: 47, y: 85.5, theme: '#58c76a', short: 'Sehen' },
  { id: 'ohr', name: 'Ohr', token: 'SINNE-OHR-2026', file: 'ohr.html', x: 49.5, y: 66.5, theme: '#f4c74b', short: 'Hören' },
  { id: 'nase', name: 'Nase', token: 'SINNE-NASE-2026', file: 'nase.html', x: 50.2, y: 49.5, theme: '#67b9f5', short: 'Riechen' },
  { id: 'zunge', name: 'Zunge', token: 'SINNE-ZUNGE-2026', file: 'zunge.html', x: 50.5, y: 31.8, theme: '#f36d55', short: 'Schmecken' },
  { id: 'haut', name: 'Haut', token: 'SINNE-HAUT-2026', file: 'haut.html', x: 54.5, y: 14.7, theme: '#9f84ff', short: 'Fühlen' }
];
const ENDLEVEL = { file: 'endlevel.html', x: 56, y: 5.8 };
const STORE = 'sinneQrMilestonesV3';
let activeScanLevel = null;
let qrScanner = null;

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORE)) || { unlocked: [], score: null };
  } catch {
    return { unlocked: [], score: null };
  }
}
function saveProgress(p) { localStorage.setItem(STORE, JSON.stringify(p)); }
function resetProgress() { localStorage.removeItem(STORE); location.href = 'index.html'; }
function isUnlocked(id) { return loadProgress().unlocked.includes(id); }
function allUnlocked() { return LEVELS.every(l => isUnlocked(l.id)); }
function nextLevel() { return LEVELS.find(l => !isUnlocked(l.id)) || null; }
function unlock(id) {
  const p = loadProgress();
  if (!p.unlocked.includes(id)) p.unlocked.push(id);
  saveProgress(p);
}
function tokenToLevel(text) {
  const raw = String(text || '').trim();
  return LEVELS.find(l => raw.includes(l.token) || raw.toLowerCase() === l.id || raw.toLowerCase().includes(l.id));
}
function showToast(text, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.className = `toast show ${type}`;
  toast.textContent = text;
  setTimeout(() => { toast.className = 'toast'; }, 2600);
}
function initCommon() {
  document.querySelectorAll('[data-reset]').forEach(btn => btn.addEventListener('click', resetProgress));
  document.querySelectorAll('[data-home]').forEach(btn => btn.addEventListener('click', () => location.href = 'index.html'));
  document.querySelectorAll('[data-progress-badge]').forEach(el => {
    const count = loadProgress().unlocked.length;
    el.textContent = `${count} / ${LEVELS.length} Level freigeschaltet`;
  });
}
function initIndex() {
  initCommon();
  renderBoard();
  const closeBtn = document.getElementById('closeModal');
  const manualBtn = document.getElementById('modalManualBtn');
  const manualInput = document.getElementById('modalManualCode');
  if (closeBtn) closeBtn.addEventListener('click', closeScanModal);
  if (manualBtn) manualBtn.addEventListener('click', () => handleScan(manualInput.value));
  if (manualInput) manualInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleScan(manualInput.value); });
  const overlay = document.getElementById('scanModal');
  if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) closeScanModal(); });
}
function renderBoard() {
  const board = document.getElementById('boardLevels');
  if (!board) return;
  board.innerHTML = '';
  const progress = loadProgress();
  const next = nextLevel();
  const meter = document.getElementById('progressText');
  if (meter) meter.textContent = `${progress.unlocked.length} von ${LEVELS.length} Sinnesorganen freigeschaltet`;

  LEVELS.forEach((level, index) => {
    const unlocked = progress.unlocked.includes(level.id);
    const current = next && next.id === level.id;
    const el = document.createElement(unlocked ? 'a' : 'button');
    el.className = `map-node ${unlocked ? 'done' : current ? 'current' : 'locked'}`;
    el.style.left = `${level.x}%`;
    el.style.top = `${level.y}%`;
    el.style.setProperty('--node-color', level.theme);
    if (unlocked) el.href = level.file;
    if (!unlocked) el.type = 'button';
    el.innerHTML = `<span class="node-level">Level ${index + 1}</span><strong>${level.name}</strong><small>${unlocked ? 'öffnen' : current ? 'QR-Code scannen' : 'noch gesperrt'}</small>`;
    el.addEventListener('click', (e) => {
      if (unlocked) return;
      e.preventDefault();
      if (current) openScanModal(level.id);
      else showToast('Bitte zuerst das vorherige Level freischalten.', 'warn');
    });
    board.appendChild(el);
  });

  const crown = document.getElementById('endNode');
  if (crown) {
    crown.style.left = `${ENDLEVEL.x}%`;
    crown.style.top = `${ENDLEVEL.y}%`;
    crown.className = `end-node ${allUnlocked() ? 'done' : 'locked'}`;
    crown.onclick = (e) => {
      if (allUnlocked()) {
        location.href = ENDLEVEL.file;
      } else {
        e.preventDefault();
        showToast('Das Endlevel wird erst freigeschaltet, wenn alle Sinnesorgane bearbeitet wurden.', 'warn');
      }
    };
  }
}
function openScanModal(levelId) {
  activeScanLevel = levelId;
  const level = LEVELS.find(l => l.id === levelId);
  const modal = document.getElementById('scanModal');
  const title = document.getElementById('modalTitle');
  const hint = document.getElementById('modalHint');
  const msg = document.getElementById('modalMsg');
  if (title) title.textContent = `QR-Code scannen: ${level.name}`;
  if (hint) hint.textContent = `Scanne jetzt den QR-Code für „${level.name}“, um dieses Level freizuschalten.`;
  if (msg) { msg.className = 'modal-alert hidden'; msg.textContent = ''; }
  if (modal) modal.classList.add('open');
  initModalScanner();
}
function closeScanModal() {
  const modal = document.getElementById('scanModal');
  if (modal) modal.classList.remove('open');
  const reader = document.getElementById('modalReader');
  if (reader) reader.innerHTML = '<p class="small">Scanner wird vorbereitet …</p>';
  const input = document.getElementById('modalManualCode');
  if (input) input.value = '';
  if (qrScanner) {
    qrScanner.stop().catch(() => {}).finally(() => { qrScanner.clear().catch(() => {}); qrScanner = null; });
  }
}
function initModalScanner() {
  const reader = document.getElementById('modalReader');
  if (!reader) return;
  if (typeof Html5Qrcode === 'undefined') {
    reader.innerHTML = '<p class="small">Kamera-Scanner konnte nicht geladen werden. Nutze stattdessen die manuelle Code-Eingabe.</p>';
    return;
  }
  reader.innerHTML = '';
  qrScanner = new Html5Qrcode('modalReader');
  Html5Qrcode.getCameras().then(cameras => {
    if (!cameras || !cameras.length) {
      reader.innerHTML = '<p class="small">Keine Kamera gefunden. Nutze die manuelle Code-Eingabe.</p>';
      return;
    }
    return qrScanner.start(
      { facingMode: 'environment' },
      { fps: 8, qrbox: { width: 220, height: 220 } },
      (decodedText) => handleScan(decodedText)
    );
  }).catch(() => {
    reader.innerHTML = '<p class="small">Kamerazugriff nicht möglich. Bitte Berechtigung erlauben oder Code manuell eingeben.</p>';
  });
}
function handleScan(text) {
  const msg = document.getElementById('modalMsg');
  const expected = LEVELS.find(l => l.id === activeScanLevel) || nextLevel();
  const found = tokenToLevel(text);
  if (!found) {
    if (msg) { msg.className = 'modal-alert'; msg.textContent = 'Dieser QR-Code passt zu keinem bekannten Level.'; }
    return;
  }
  if (!expected || found.id !== expected.id) {
    if (msg) { msg.className = 'modal-alert'; msg.textContent = `Dieser QR-Code passt nicht zum aktuellen Freischalt-Level. Erwartet wird: ${expected ? expected.name : 'kein Level'}.`; }
    return;
  }
  if (qrScanner) { qrScanner.stop().catch(() => {}); }
  unlock(found.id);
  if (msg) { msg.className = 'modal-alert success'; msg.textContent = `${found.name} wurde freigeschaltet. Das Level wird geöffnet …`; }
  setTimeout(() => { closeScanModal(); location.href = found.file; }, 700);
}
function requireLevel(id) {
  initCommon();
  if (!isUnlocked(id)) {
    document.body.innerHTML = `<main class="shell"><section class="hero"><h1>Level gesperrt</h1><p>Bitte gehe zuerst auf die Spielbrett-Seite und scanne den passenden QR-Code.</p><div class="action-row"><a class="btn primary" href="index.html">Zurück zum Spielbrett</a></div></section></main>`;
    return false;
  }
  return true;
}
function initCodes() {
  initCommon();
  const wrap = document.getElementById('qrCodes');
  if (!wrap) return;
  LEVELS.forEach((level, index) => {
    const card = document.createElement('article');
    card.className = 'info-card code-card';
    card.innerHTML = `<div class="code-head"><span class="pill">Level ${index + 1}</span><h3>${level.name}</h3></div><div class="qr-slot" id="qr-${level.id}"></div><p class="small"><strong>Code:</strong> ${level.token}</p>`;
    wrap.appendChild(card);
  });
  if (typeof QRCode !== 'undefined') {
    LEVELS.forEach(level => new QRCode(document.getElementById(`qr-${level.id}`), { text: level.token, width: 160, height: 160 }));
  }
}
function initEnd() {
  initCommon();
  const mount = document.getElementById('endMount');
  if (!mount) return;
  if (!allUnlocked()) {
    mount.innerHTML = `<section class="hero"><h1>Endlevel noch gesperrt</h1><p>Scanne zuerst alle fünf QR-Codes und bearbeite die dazugehörigen Level.</p><div class="action-row"><a class="btn primary" href="index.html">Zurück zum Spielbrett</a></div></section>`;
    return;
  }
  const form = document.getElementById('quiz');
  const result = document.getElementById('result');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const correct = { q1: 'b', q2: 'c', q3: 'b', q4: 'a', q5: 'c' };
    let score = 0;
    Object.keys(correct).forEach(key => { if (data.get(key) === correct[key]) score++; });
    const p = loadProgress();
    p.score = score;
    saveProgress(p);
    result.className = 'modal-alert success';
    result.textContent = `Dein Ergebnis: ${score} von 5 Punkten.`;
  });
}
