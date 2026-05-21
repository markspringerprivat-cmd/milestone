const LEVELS=[
  {id:'auge',name:'Level 1: Auge',token:'SINNE-AUGE-2026',file:'auge.html'},
  {id:'ohr',name:'Level 2: Ohr',token:'SINNE-OHR-2026',file:'ohr.html'},
  {id:'nase',name:'Level 3: Nase',token:'SINNE-NASE-2026',file:'nase.html'},
  {id:'zunge',name:'Level 4: Zunge',token:'SINNE-ZUNGE-2026',file:'zunge.html'},
  {id:'haut',name:'Level 5: Haut',token:'SINNE-HAUT-2026',file:'haut.html'}
];
const STORE='sinneQrProgressV1';
function loadProgress(){try{return JSON.parse(localStorage.getItem(STORE))||{unlocked:[],answers:{},score:null}}catch{return{unlocked:[],answers:{},score:null}}}
function saveProgress(p){localStorage.setItem(STORE,JSON.stringify(p));}
function isUnlocked(id){return loadProgress().unlocked.includes(id)}
function unlock(id){const p=loadProgress(); if(!p.unlocked.includes(id)){p.unlocked.push(id); saveProgress(p);} return p;}
function allUnlocked(){return LEVELS.every(l=>isUnlocked(l.id));}
function resetProgress(){localStorage.removeItem(STORE); location.href='index.html';}
function tokenToLevel(text){let raw=String(text||'').trim(); let last=raw.split('/').pop(); let clean=decodeURIComponent(last).replace(/[?#].*$/,''); return LEVELS.find(l=>raw.includes(l.token)||clean===l.token||raw.toLowerCase().includes(l.id));}
function initCommon(){
  document.querySelectorAll('[data-reset]').forEach(b=>b.addEventListener('click',resetProgress));
  document.querySelectorAll('[data-home]').forEach(b=>b.addEventListener('click',()=>location.href='index.html'));
  const badge=document.querySelector('[data-progress-badge]'); if(badge){const n=loadProgress().unlocked.length; badge.textContent=`${n} von ${LEVELS.length} Level freigeschaltet`;}
}
function initIndex(){
  renderProgress(); initScanner();
  const manual=document.getElementById('manualCode'); const btn=document.getElementById('manualBtn');
  if(btn) btn.addEventListener('click',()=>handleScan(manual.value));
  if(manual) manual.addEventListener('keydown',e=>{if(e.key==='Enter')handleScan(manual.value)});
}
function renderProgress(){
  const p=loadProgress(); const n=p.unlocked.length; const bar=document.querySelector('.progress'); if(bar)bar.style.width=`${(n/LEVELS.length)*100}%`;
  const list=document.getElementById('levelList'); if(!list)return;
  list.innerHTML='';
  LEVELS.forEach((l,i)=>{const open=p.unlocked.includes(l.id); const a=document.createElement(open?'a':'div'); a.className=`card level-card ${open?'':'locked'}`; if(open)a.href=l.file;
    a.innerHTML=`<div><span class="status ${open?'open':''}">${open?'freigeschaltet':'gesperrt'}</span><h3>${l.name}</h3><p>${levelTeaser(l.id)}</p></div><strong>${open?'Level öffnen':'QR-Code scannen'}</strong>`; list.appendChild(a);});
  const end=document.getElementById('endLevel'); if(end){ if(allUnlocked()){end.classList.remove('locked'); end.href='endlevel.html'; end.querySelector('.status').textContent='freigeschaltet'; end.querySelector('.status').classList.add('open');} }
}
function levelTeaser(id){return {auge:'Aufbau des Auges, Reizaufnahme und Sehvorgang.',ohr:'Schall, Hören und Gleichgewicht.',nase:'Geruchsstoffe und Riechwahrnehmung.',zunge:'Geschmacksrichtungen und Zusammenspiel der Sinne.',haut:'Tasten, Temperatur, Schmerz und Schutzfunktion.'}[id]||''}
function handleScan(text){const msg=document.getElementById('scanMsg'); const lvl=tokenToLevel(text); if(!lvl){if(msg)msg.className='alert',msg.textContent='QR-Code wurde gelesen, passt aber zu keinem Level.';return;} unlock(lvl.id); if(msg){msg.className='alert success'; msg.textContent=`${lvl.name} wurde freigeschaltet. Du wirst weitergeleitet …`;} setTimeout(()=>location.href=lvl.file,700);}
function initScanner(){
  const el=document.getElementById('reader'); if(!el)return;
  if(typeof Html5Qrcode==='undefined'){el.innerHTML='<p class="small">QR-Scanner konnte nicht geladen werden. Nutze die manuelle Code-Eingabe.</p>';return;}
  const qr=new Html5Qrcode('reader'); Html5Qrcode.getCameras().then(cams=>{if(!cams.length){el.innerHTML='<p class="small">Keine Kamera gefunden. Nutze die manuelle Code-Eingabe.</p>';return;} return qr.start({facingMode:'environment'},{fps:8,qrbox:{width:220,height:220}},txt=>{qr.stop().catch(()=>{});handleScan(txt);});}).catch(()=>{el.innerHTML='<p class="small">Kamera nicht verfügbar. Erlaube den Kamerazugriff oder nutze die manuelle Code-Eingabe.</p>';});
}
function requireLevel(id){initCommon(); if(!isUnlocked(id)){document.body.innerHTML=`<main class="shell"><section class="hero"><h1>Level gesperrt</h1><p>Scanne zuerst den passenden QR-Code auf der Startseite.</p><div class="footer-actions"><a class="btn primary" href="index.html">Zur Startseite</a></div></section></main>`; return false;} return true;}
function initEnd(){initCommon(); if(!allUnlocked()){document.getElementById('endContent').innerHTML='<section class="hero"><h1>Endlevel noch gesperrt</h1><p>Scanne zuerst alle fünf QR-Codes.</p><a class="btn primary" href="index.html">Zur Startseite</a></section>';return;}
 const form=document.getElementById('quiz'); if(!form)return; form.addEventListener('submit',e=>{e.preventDefault(); const data=new FormData(form); const correct={q1:'b',q2:'c',q3:'b',q4:'a',q5:'c'}; let score=0; Object.keys(correct).forEach(k=>{if(data.get(k)===correct[k])score++}); const p=loadProgress(); p.score=score; saveProgress(p); document.getElementById('result').className='alert success'; document.getElementById('result').textContent=`Ergebnis: ${score} von 5 Punkten.`;});}
function initCodes(){initCommon(); const wrap=document.getElementById('qrCodes'); LEVELS.forEach(l=>{const card=document.createElement('article'); card.className='card qr-card'; card.innerHTML=`<h3>${l.name}</h3><div class="qr-slot" id="qr-${l.id}"></div><p class="small">Code: ${l.token}</p>`; wrap.appendChild(card);}); if(typeof QRCode!=='undefined'){LEVELS.forEach(l=>new QRCode(document.getElementById(`qr-${l.id}`),{text:l.token,width:150,height:150}));}}
document.addEventListener('DOMContentLoaded',initCommon);
