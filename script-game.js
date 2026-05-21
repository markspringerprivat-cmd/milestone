const TOPICS = [
  { id: 'auge', name: 'Auge', token: 'SINNE-AUGE-2026', file: 'auge.html', theme: '#58c76a', short: 'Sehen' },
  { id: 'ohr', name: 'Ohr', token: 'SINNE-OHR-2026', file: 'ohr.html', theme: '#f4c74b', short: 'Hören' },
  { id: 'nase', name: 'Nase', token: 'SINNE-NASE-2026', file: 'nase.html', theme: '#67b9f5', short: 'Riechen' },
  { id: 'zunge', name: 'Zunge', token: 'SINNE-ZUNGE-2026', file: 'zunge.html', theme: '#f36d55', short: 'Schmecken' },
  { id: 'haut', name: 'Haut', token: 'SINNE-HAUT-2026', file: 'haut.html', theme: '#9f84ff', short: 'Fühlen' }
];
const SLOTS = [
  { x: 47, y: 85.5 },
  { x: 49.5, y: 66.5 },
  { x: 50.2, y: 49.5 },
  { x: 50.5, y: 31.8 },
  { x: 51.8, y: 19.4 }
];
const ENDLEVEL = { file: 'endlevel.html', x: 50.6, y: 8.2 };
const STORE = 'sinneQrFreeMilestonesV1';
let activeSlot = null;
let qrScanner = null;
let pendingTopic = null;

function blankProgress() {
  return { slots: SLOTS.map(() => ({ topicId: null, completed: false })), score: null };
}
function loadProgress() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORE));
    if (!parsed || !Array.isArray(parsed.slots) || parsed.slots.length !== SLOTS.length) return blankProgress();
    return parsed;
  } catch {
    return blankProgress();
  }
}
function saveProgress(p) { localStorage.setItem(STORE, JSON.stringify(p)); }
function resetProgress() { localStorage.removeItem(STORE); location.href = 'index.html'; }
function topicById(id) { return TOPICS.find(t => t.id === id); }
function topicByToken(text) {
  const raw = String(text || '').trim();
  return TOPICS.find(t => raw.includes(t.token) || raw.toLowerCase() === t.id || raw.toLowerCase().includes(t.id));
}
function usedTopicIds() { return loadProgress().slots.map(s => s.topicId).filter(Boolean); }
function isTopicAvailable(id) { return !usedTopicIds().includes(id); }
function completedCount() { return loadProgress().slots.filter(s => s.completed).length; }
function currentSlotIndex() {
  const p = loadProgress();
  return p.slots.findIndex(s => !s.completed);
}
function allCompleted() { return loadProgress().slots.every(s => s.completed); }
function isTopicAccessible(topicId) { return loadProgress().slots.some(s => s.topicId === topicId); }
function assignTopicToSlot(slotIndex, topicId) {
  const p = loadProgress();
  p.slots[slotIndex] = { topicId, completed: false };
  saveProgress(p);
}
function completeTopic(topicId) {
  const p = loadProgress();
  const slot = p.slots.find(s => s.topicId === topicId && !s.completed);
  if (slot) slot.completed = true;
  saveProgress(p);
}
function getTopicSlot(topicId) { return loadProgress().slots.findIndex(s => s.topicId === topicId); }
function showToast(text, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.className = `toast show ${type}`;
  toast.textContent = text;
  setTimeout(() => { toast.className = 'toast'; }, 2600);
}
function initCommon() {
  document.querySelectorAll('[data-reset]').forEach(btn => btn.addEventListener('click', resetProgress));
  document.querySelectorAll('[data-progress-badge]').forEach(el => el.textContent = `${completedCount()} / ${SLOTS.length} Level abgeschlossen`);
}
function initIndex() {
  initCommon();
  renderBoard();
  document.getElementById('closeModal')?.addEventListener('click', closeScanModal);
  document.getElementById('startLevelBtn')?.addEventListener('click', startPendingLevel);
  document.getElementById('backToBoardBtn')?.addEventListener('click', closeScanModal);
  document.getElementById('confirmBackToBoardBtn')?.addEventListener('click', closeScanModal);
  const manualBtn = document.getElementById('modalManualBtn');
  const manualInput = document.getElementById('modalManualCode');
  if (manualBtn) manualBtn.addEventListener('click', () => handleScan(manualInput.value));
  if (manualInput) manualInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleScan(manualInput.value); });
  const overlay = document.getElementById('scanModal');
  if (overlay) overlay.addEventListener('click', e => { if (e.target === overlay) closeScanModal(); });
}
function renderBoard() {
  const board = document.getElementById('boardLevels');
  if (!board) return;
  board.innerHTML = '';
  const p = loadProgress();
  const current = currentSlotIndex();
  const meter = document.getElementById('progressText');
  if (meter) meter.textContent = `${completedCount()} von ${SLOTS.length} Level abgeschlossen`;

  SLOTS.forEach((slotPos, index) => {
    const slot = p.slots[index];
    const topic = slot.topicId ? topicById(slot.topicId) : null;
    const completed = !!slot.completed;
    const active = index === current && !completed;
    const assigned = !!topic && !completed;
    const el = document.createElement(assigned ? 'a' : 'button');
    el.className = `map-node ${completed ? 'done' : active ? 'active' : 'locked'} ${assigned ? 'assigned' : ''}`;
    el.style.left = `${slotPos.x}%`;
    el.style.top = `${slotPos.y}%`;
    el.style.setProperty('--node-color', topic?.theme || '#ffd84d');
    if (assigned) el.href = `${topic.file}?slot=${index + 1}`;
    if (!assigned) el.type = 'button';
    const label = topic ? topic.name : `Level ${index + 1}`;
    const sub = completed ? 'fertig' : assigned ? 'starten' : active ? 'QR-Code scannen' : 'gesperrt';
    el.innerHTML = `<span class="node-level">Level ${index + 1}</span><strong>${label}</strong><small>${sub}</small><img class="lock-icon" src="lock.png" alt="">`;
    el.addEventListener('click', e => {
      if (assigned) return;
      e.preventDefault();
      if (active) openScanModal(index);
      else showToast('Dieses Feld wird erst nach dem vorherigen Level aktiv.', 'warn');
    });
    board.appendChild(el);
  });

  const crown = document.getElementById('endNode');
  if (crown) {
    crown.style.left = `${ENDLEVEL.x}%`;
    crown.style.top = `${ENDLEVEL.y}%`;
    crown.className = `end-node ${allCompleted() ? 'done' : 'locked'}`;
    crown.onclick = e => {
      if (allCompleted()) location.href = ENDLEVEL.file;
      else { e.preventDefault(); showToast('Die Krone wird nach allen fünf Leveln freigeschaltet.', 'warn'); }
    };
  }
}
function openScanModal(slotIndex) {
  activeSlot = slotIndex;
  pendingTopic = null;
  const modal = document.getElementById('scanModal');
  const title = document.getElementById('modalTitle');
  const hint = document.getElementById('modalHint');
  const msg = document.getElementById('modalMsg');
  const confirm = document.getElementById('scanConfirm');
  if (title) title.textContent = `Level ${slotIndex + 1} freischalten`;
  if (hint) hint.textContent = 'Scanne einen beliebigen noch nicht verwendeten QR-Code. Das gescannte Sinnesorgan wird diesem Level zugeordnet.';
  if (msg) { msg.className = 'modal-alert hidden'; msg.textContent = ''; }
  if (confirm) confirm.classList.add('hidden');
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
  const confirm = document.getElementById('scanConfirm');
  if (confirm) confirm.classList.add('hidden');
  if (qrScanner) qrScanner.stop().catch(() => {}).finally(() => { qrScanner?.clear?.().catch(() => {}); qrScanner = null; });
}
function initModalScanner() {
  const reader = document.getElementById('modalReader');
  if (!reader) return;
  if (typeof Html5Qrcode === 'undefined') {
    reader.innerHTML = '<p class="small">Kamera-Scanner konnte nicht geladen werden. Nutze die manuelle Code-Eingabe.</p>';
    return;
  }
  reader.innerHTML = '';
  qrScanner = new Html5Qrcode('modalReader');
  Html5Qrcode.getCameras().then(cameras => {
    if (!cameras?.length) {
      reader.innerHTML = '<p class="small">Keine Kamera gefunden. Nutze die manuelle Code-Eingabe.</p>';
      return;
    }
    return qrScanner.start({ facingMode: 'environment' }, { fps: 8, qrbox: { width: 220, height: 220 } }, decodedText => handleScan(decodedText));
  }).catch(() => {
    reader.innerHTML = '<p class="small">Kamerazugriff nicht möglich. Erlaube den Zugriff oder nutze die manuelle Code-Eingabe.</p>';
  });
}
function handleScan(text) {
  const msg = document.getElementById('modalMsg');
  const confirm = document.getElementById('scanConfirm');
  const found = topicByToken(text);
  if (!found) {
    if (msg) { msg.className = 'modal-alert'; msg.textContent = 'Dieser QR-Code passt zu keinem Sinnesorgan-Level.'; }
    return;
  }
  if (!isTopicAvailable(found.id)) {
    if (msg) { msg.className = 'modal-alert'; msg.textContent = `${found.name} wurde bereits einem Level zugeordnet. Scanne einen anderen QR-Code.`; }
    return;
  }
  if (activeSlot === null || activeSlot < 0) return;
  if (qrScanner) qrScanner.stop().catch(() => {});
  pendingTopic = found;
  assignTopicToSlot(activeSlot, found.id);
  if (msg) { msg.className = 'modal-alert success'; msg.textContent = `Level ${activeSlot + 1} wurde als „${found.name}“ freigeschaltet.`; }
  if (confirm) {
    confirm.classList.remove('hidden');
    confirm.querySelector('strong').textContent = found.name;
    confirm.querySelector('span').textContent = found.short;
  }
  renderBoard();
}
function startPendingLevel() {
  if (!pendingTopic) return;
  location.href = `${pendingTopic.file}?slot=${activeSlot + 1}`;
}
function requireLevel(id) {
  initCommon();
  if (!isTopicAccessible(id)) {
    document.body.innerHTML = `<main class="shell level-shell"><section class="hero"><h1>Level noch nicht freigeschaltet</h1><p>Gehe zuerst zum Spielbrett und scanne einen QR-Code.</p><div class="action-row"><a class="btn primary" href="index.html">Zum Spielbrett</a></div></section></main>`;
    return false;
  }
  const topic = topicById(id);
  document.querySelectorAll('[data-complete-level]').forEach(btn => {
    btn.addEventListener('click', () => {
      completeTopic(id);
      location.href = 'index.html#info';
    });
  });
  document.querySelectorAll('[data-topic-slot]').forEach(el => {
    const slot = getTopicSlot(id);
    el.textContent = slot >= 0 ? `Level ${slot + 1} · ${topic.name}` : topic.name;
  });
  return true;
}
function initCodes() {
  initCommon();
  const wrap = document.getElementById('qrCodes');
  if (!wrap) return;
  TOPICS.forEach(topic => {
    const card = document.createElement('article');
    card.className = 'info-card code-card';
    card.innerHTML = `<div class="code-head"><span class="pill">Sinnesorgan</span><h3>${topic.name}</h3></div><div class="qr-slot" id="qr-${topic.id}"></div><p class="small"><strong>Code:</strong> ${topic.token}</p>`;
    wrap.appendChild(card);
  });
  if (typeof QRCode !== 'undefined') {
    TOPICS.forEach(topic => new QRCode(document.getElementById(`qr-${topic.id}`), { text: topic.token, width: 160, height: 160 }));
  }
}
function initEnd() {
  initCommon();
  const mount = document.getElementById('endMount');
  if (!mount) return;
  if (!allCompleted()) {
    mount.innerHTML = `<section class="hero"><h1>Endlevel noch gesperrt</h1><p>Schließe zuerst alle fünf Level ab.</p><div class="action-row"><a class="btn primary" href="index.html">Zum Spielbrett</a></div></section>`;
    return;
  }
  const form = document.getElementById('quiz');
  const result = document.getElementById('result');
  form?.addEventListener('submit', e => {
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
document.addEventListener('DOMContentLoaded', initCommon);
