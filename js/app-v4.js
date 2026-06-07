(() => {
  'use strict';

  // ─── Konstanten ────────────────────────────────────────────────────────────

  const STORE               = 'koenigreichSinneV4State';
  const BATTLE_STORE        = 'koenigreichSinneV4Battle';
  const BATTLE_BACKUP_STORE = 'koenigreichSinneV4BattleBackup';
  const RETURN_STORE        = 'koenigreichSinneV4BoardReturn';
  const SOUND_STORE         = 'koenigreichSinneV4Muted';
  const BOARD_WELCOME_STORE = 'koenigreichSinneV4PendingBoardWelcome';
  const BOARD_ONBOARDING_STORE = 'koenigreichSinneV4BoardOnboardingDone';
  const STATE_VERSION       = 'v4_76_stable_village_layout';
  const DEFAULT_HERO_NAME   = 'Sir Nervus';
  const DEFAULT_HERO_GENDER = 'male';
  const HERO_GENDER_OPTIONS = ['male', 'female'];
  const LEVEL_COUNT  = 12;
  const BOSS_SLOT    = 10;
  const QR_LEVELS    = [0, 2, 4, 6, 8, 10];
  const PLACEHOLDER_LEVELS = [1, 3, 5, 7, 9, 11];
  const KEY_ORDER    = ['riechen', 'hoeren', 'sehen', 'schmecken', 'fuehlen'];
  const SLOT_SENSE_MAP = { 0:'sehen',1:'sehen',2:'hoeren',3:'hoeren',4:'riechen',5:'riechen',6:'schmecken',7:'schmecken',8:'fuehlen',9:'fuehlen',10:'boss',11:'boss' };
  const BIOME_LEVEL_PLAN = { riechen:[5,4], hoeren:[9,2], sehen:[3,0], schmecken:[1,6], fuehlen:[7,8], boss:[11,10] };
  const HERO_DEFAULT_POINT = { x:50.1, y:66.8 };
  const APP_ROOT = new URL('./', document.baseURI);
  const pageUrl  = t => new URL(t, APP_ROOT).href;
  const assetUrl = t => new URL(t, APP_ROOT).href;

  const SENSES = {
    sehen:    { id:'sehen',    label:'Sehen',    enemyName:'Sehlina',       code:'SINNE-SEHEN',     enemy:'assets/images/characters/sehen.webp',     defeated:'assets/images/characters/sehen_besiegt.webp',     title:'Level: Sehen',    speech:'„Meine Illusionen blenden dich. Mal sehen, ob du den richtigen Reiz erkennst!"', intro:'Hier geht es um das Auge, Lichtreize und die Verarbeitung von Sehinformationen.', content:['Das Auge nimmt Lichtreize aus der Umgebung auf. Hornhaut und Linse bündeln das Licht, sodass auf der Netzhaut ein Bild entsteht.','Auf der Netzhaut sitzen Sinneszellen. Sie wandeln Licht in elektrische Signale um. Diese Signale gelangen über den Sehnerv zum Gehirn, wo sie verarbeitet und zu einem Bild zusammengesetzt werden.'] },
    hoeren:   { id:'hoeren',   label:'Hören',    enemyName:'Höhribert',     code:'SINNE-HOEREN',    enemy:'assets/images/characters/hoeren.webp',    defeated:'assets/images/characters/hoeren_besiegt.webp',    title:'Level: Hören',    speech:'„Ich verdrehe jede Schallwelle. Ob du trotzdem den richtigen Ton triffst?"', intro:'Hier geht es um das Ohr, Schallwellen und den Gleichgewichtssinn.', content:['Das Ohr nimmt Schallwellen auf. Die Ohrmuschel leitet den Schall zum Trommelfell weiter. Dieses gerät in Schwingung.','Die Gehörknöchelchen verstärken die Schwingungen. In der Hörschnecke werden sie in Nervensignale umgewandelt. Außerdem ist das Innenohr wichtig für das Gleichgewicht.'] },
    riechen:  { id:'riechen',  label:'Riechen',  enemyName:'Riechard',      code:'SINNE-RIECHEN',   enemy:'assets/images/characters/riechen.webp',   defeated:'assets/images/characters/riechen_besiegt.webp',   title:'Level: Riechen',  speech:'„Mein Nebel liegt in der Luft. Folge der Spur, wenn du dich traust!"', intro:'Hier geht es um die Nase, Geruchsstoffe und die Bedeutung des Riechens im Alltag.', content:['Die Nase erkennt Geruchsstoffe in der Luft. Beim Einatmen gelangen Duftmoleküle zur Riechschleimhaut.','Dort sitzen Riechzellen, die passende Moleküle erkennen und Signale an das Gehirn senden. Gerüche können warnen, Erinnerungen auslösen und den Geschmack beeinflussen.'] },
    schmecken:{ id:'schmecken',label:'Schmecken',enemyName:'König Schmatz', code:'SINNE-SCHMECKEN', enemy:'assets/images/characters/schmecken.webp', defeated:'assets/images/characters/schmecken_besiegt.webp', title:'Level: Schmecken',speech:'„Süß, sauer, salzig? Ich bringe alles durcheinander. Beweise deinen Geschmack!"', intro:'Hier geht es um die Zunge, Geschmacksrichtungen und das Zusammenspiel der Sinne.', content:['Auf der Zunge befinden sich Geschmacksknospen. Sie erkennen Stoffe aus der Nahrung und ermöglichen Geschmackswahrnehmungen.','Häufig unterscheidet man süß, sauer, salzig, bitter und umami. Geschmack entsteht aber nicht nur auf der Zunge: Geruch, Temperatur und Konsistenz wirken mit.'] },
    fuehlen:  { id:'fuehlen',  label:'Fühlen',   enemyName:'Dr. Tastibald', code:'SINNE-FUEHLEN',   enemy:'assets/images/characters/fuehlen.webp',   defeated:'assets/images/characters/fuehlen_besiegt.webp',   title:'Level: Fühlen',   speech:'„Meine Panzer fühlen alles. Spürst du, was Schutz wirklich bedeutet?"', intro:'Hier geht es um die Haut, Berührung, Temperatur, Schmerz und Schutz.', content:['Die Haut ist das größte Sinnesorgan des Körpers. Sie enthält Rezeptoren für Berührung, Druck, Wärme, Kälte und Schmerz.','Gleichzeitig schützt die Haut vor Verletzungen, Krankheitserregern und Austrocknung. Sie ist also Sinnesorgan und Schutzschicht zugleich.'] }
  };

  const BOSS = {
    id:'boss', label:'Boss', code:'SINNE-BOSS', enemyName:'Sinntron 3000',
    enemy:'assets/images/characters/boss.webp', defeated:'assets/images/characters/boss_besiegt.webp',
    title:'Finale: Boss der Sinne',
    speech:'„Alle Sinne gegen mich? Dann zeig, dass du das Königreich wirklich verstanden hast!"',
    intro:'Im finalen Level geht es um das Zusammenspiel aller Sinnesorgane.',
    content:['Sinnesorgane nehmen Reize aus der Umwelt oder aus dem Körper auf. Das Gehirn verarbeitet diese Informationen und ordnet sie ein.','Viele Wahrnehmungen entstehen durch das Zusammenspiel mehrerer Sinne. Beim Essen wirken zum Beispiel Geschmack, Geruch, Temperatur, Konsistenz und Sehen zusammen.']
  };

  const QUESTION_BANK = {
    sehen: [
      { q:'Wo werden Lichtreize im Auge in Nervensignale umgewandelt?', a:['In der Linse','Auf der Netzhaut','In der Ohrmuschel'], correct:1 },
      { q:'Welche Aufgabe hat die Linse?', a:['Sie bündelt das Licht','Sie erzeugt Geräusche','Sie schmeckt süß'], correct:0 },
      { q:'Wohin leitet der Sehnerv die Signale?', a:['Zum Gehirn','Zur Haut','Zur Zunge'], correct:0 },
      { q:'Was erkennt das Auge besonders gut?', a:['Licht, Farben und Bewegung','Gerüche und Düfte','Wärme im Essen'], correct:0 },
      { q:'Warum arbeiten Auge und Gehirn zusammen?', a:['Das Gehirn ordnet die Sehinformationen ein','Das Auge verdaut Nahrung','Das Gehirn ersetzt die Netzhaut'], correct:0 }
    ],
    hoeren: [
      { q:'Welches Sinnesorgan ist auch am Gleichgewicht beteiligt?', a:['Die Zunge','Die Nase','Das Ohr'], correct:2 },
      { q:'Was sammelt Schallwellen zuerst?', a:['Die Ohrmuschel','Die Netzhaut','Die Geschmacksknospe'], correct:0 },
      { q:'Was gerät durch Schall in Schwingung?', a:['Das Trommelfell','Die Pupille','Die Hautporen'], correct:0 },
      { q:'Wo werden Schwingungen in Nervensignale umgewandelt?', a:['In der Hörschnecke','In der Linse','Auf der Zunge'], correct:0 },
      { q:'Warum ist lauter Schall problematisch?', a:['Er kann das Gehör schädigen','Er macht Farben unsichtbar','Er verhindert jeden Geschmack'], correct:0 }
    ],
    riechen: [
      { q:'Warum schmeckt Essen bei Schnupfen oft schwächer?', a:['Weil die Haut langsamer arbeitet','Weil Geruch und Geschmack zusammenwirken','Weil die Augen weniger Licht aufnehmen'], correct:1 },
      { q:'Was gelangt beim Riechen zur Riechschleimhaut?', a:['Duftmoleküle','Lichtstrahlen','Schallwellen'], correct:0 },
      { q:'Welche Zellen erkennen Geruchsstoffe?', a:['Riechzellen','Hörzellen','Sehzellen der Netzhaut'], correct:0 },
      { q:'Wobei kann der Geruchssinn helfen?', a:['Vor Rauch oder verdorbenem Essen warnen','Bücher schneller lesen','Kälte sehen'], correct:0 },
      { q:'Womit sind Gerüche oft eng verbunden?', a:['Erinnerungen und Gefühlen','Nur mit Knochen','Nur mit Muskeln'], correct:0 }
    ],
    schmecken: [
      { q:'Welche Geschmacksrichtung gehört zu den häufig genannten Grundrichtungen?', a:['Umami','Knusprig','Heiß'], correct:0 },
      { q:'Wo befinden sich viele Geschmacksknospen?', a:['Auf der Zunge','Im Trommelfell','In der Pupille'], correct:0 },
      { q:'Was gehört nicht zu den klassischen Geschmacksrichtungen?', a:['Süß','Bitter','Glänzend'], correct:2 },
      { q:'Warum beeinflusst die Nase den Geschmack?', a:['Geruch und Geschmack werden gemeinsam verarbeitet','Die Nase kaut die Nahrung','Die Nase ersetzt die Zunge vollständig'], correct:0 },
      { q:'Was kann den Geschmack zusätzlich beeinflussen?', a:['Temperatur und Konsistenz','Nur die Haarfarbe','Nur die Schuhgröße'], correct:0 }
    ],
    fuehlen: [
      { q:'Welche Funktion hat Schmerz?', a:['Er warnt vor möglicher Gefahr','Er verbessert das Sehen','Er ersetzt den Geruchssinn'], correct:0 },
      { q:'Welches ist das größte Sinnesorgan des Körpers?', a:['Die Haut','Das Auge','Das Ohr'], correct:0 },
      { q:'Welche Reize kann die Haut wahrnehmen?', a:['Druck, Wärme, Kälte und Schmerz','Nur Farben','Nur Musik'], correct:0 },
      { q:'Welche zusätzliche Aufgabe hat die Haut?', a:['Sie schützt den Körper','Sie bündelt Licht auf der Netzhaut','Sie erzeugt Schallwellen'], correct:0 },
      { q:'Warum ist Berührung ein Sinneseindruck?', a:['Rezeptoren in der Haut nehmen sie wahr','Die Zunge sieht sie','Die Nase hört sie'], correct:0 }
    ],
    boss: [
      { q:'Welche Aussage passt am besten?', a:['Sinnesorgane arbeiten immer vollständig getrennt.','Nur die Zunge ist für Geschmack verantwortlich.','Das Gehirn verarbeitet Sinnesinformationen und ordnet sie ein.'], correct:2 },
      { q:'Was nehmen Sinnesorgane auf?', a:['Reize','Hausaufgaben','Batterien'], correct:0 },
      { q:'Warum wirken beim Essen mehrere Sinne zusammen?', a:['Geruch, Geschmack, Temperatur und Konsistenz ergänzen sich','Nur das Ohr entscheidet über Geschmack','Die Haut ersetzt das Gehirn'], correct:0 },
      { q:'Was macht das Gehirn mit Sinnesinformationen?', a:['Es verarbeitet und ordnet sie ein','Es löscht sie sofort','Es schickt sie zur Pflanze'], correct:0 },
      { q:'Was zeigt das Königreich der Sinne insgesamt?', a:['Wahrnehmung entsteht durch mehrere zusammenarbeitende Systeme','Nur ein Sinn ist wichtig','Sinne haben nichts mit Lernen zu tun'], correct:0 }
    ]
  };

  const BIOME_BY_SENSE = {
    riechen:  { id:'riechen',  label:'Grasland',    stageIndex:0, board:{ minigame:{x:31.0,y:54.2}, question:{x:18.8,y:46.8}, key:{x:27.4,y:58.0} }, lock:'assets/images/ui/lock_grass.png', key:'assets/images/ui/key_grass.png' },
    hoeren:   { id:'hoeren',   label:'Wüstenland',  stageIndex:1, board:{ minigame:{x:66.8,y:56.8}, question:{x:81.5,y:46.5}, key:{x:73.6,y:53.4} }, lock:'assets/images/ui/lock_sand.png',  key:'assets/images/ui/key_sand.png'  },
    fuehlen:  { id:'fuehlen',  label:'Eisgebiet',   stageIndex:2, board:{ minigame:{x:33.0,y:76.8}, question:{x:24.8,y:83.6}, key:{x:25.0,y:79.4} }, lock:'assets/images/ui/lock_ice.png',  key:'assets/images/ui/key_ice.png'  },
    schmecken:{ id:'schmecken',label:'Lavawelt',    stageIndex:3, board:{ minigame:{x:67.5,y:82.0}, question:{x:81.8,y:73.8}, key:{x:74.8,y:79.7} }, lock:'assets/images/ui/lock_lava.png', key:'assets/images/ui/key_lava.png' },
    sehen:    { id:'sehen',    label:'Himmelswelt', stageIndex:4, board:{ minigame:{x:44.2,y:37.6}, question:{x:57.4,y:33.2}, key:{x:50.0,y:39.8} }, lock:'assets/images/ui/lock_cloud.png',key:'assets/images/ui/key_cloud.png'},
    boss:     { id:'boss',     label:'Kronenwelt',  stageIndex:5, board:{ minigame:{x:50.0,y:22.0}, question:{x:50.0,y:12.0}, key:{x:50.0,y:9.0}  }, lock:'assets/images/ui/lock.png',      key:'' }
  };

  const STAGE_BACKGROUNDS = ['assets/images/stages/stage_gras.webp','assets/images/stages/stage_sand.webp','assets/images/stages/stage_eis.webp','assets/images/stages/stage_lava.webp','assets/images/stages/stage_himmel.webp','assets/images/stages/stage_all.webp'];
  const POPUP_BACKGROUNDS = ['assets/images/popups/popup_gras.webp','assets/images/popups/popup_sand.webp','assets/images/popups/popup_eis.webp','assets/images/popups/popup_lava.webp','assets/images/popups/popup_himmel.webp','assets/images/popups/popup_all.webp'];

  const ASSETS = {
    correct:['assets/images/battle/richtig_1.webp','assets/images/battle/richtig_2.webp','assets/images/battle/richtig_3.webp'],
    wrong:  ['assets/images/battle/falsch_1.webp','assets/images/battle/falsch_2.webp','assets/images/battle/falsch_3.webp'],
    final:'assets/images/battle/final.webp', hero:'assets/images/characters/held.webp',
    triumphHero:'assets/images/characters/held_triumph.webp', winHero:'assets/images/characters/held_gewonnen.webp',
    loseHero:'assets/images/characters/held_verloren.webp', escapeHero:'assets/images/characters/held_entkommen.webp',
    versus:'assets/images/battle/versus_final.webp',
    text:{ kampf:'assets/images/battle/kampf_text.webp', richtig:'assets/images/battle/richtig_text.webp', falsch:'assets/images/battle/falsch_text.webp', gewonnen:'assets/images/battle/gewonnen_text.webp', verloren:'assets/images/battle/verloren_text.webp' }
  };

  const AUDIO_FILES = {
    background:'assets/audio/background.mp3', battle_background:'assets/audio/battle_background.mp3', minigame_background:'assets/audio/minigame_background.mp3',
    levelstart:'assets/audio/levelstart.mp3', levelunlocked:'assets/audio/levelunlocked.mp3', fight:'assets/audio/fight.mp3', win:'assets/audio/win.mp3', lose:'assets/audio/lose.mp3',
    final:'assets/audio/final.mp3', hurt:'assets/audio/hurt.mp3', glass_break:'assets/audio/glass_break.mp3', collect:'assets/audio/collect.mp3',
    story_wallbreak:'assets/audio/wallbreak.mp3', story_spell:'assets/audio/spell.mp3',
    flip:'assets/audio/flip.mp3', pair:'assets/audio/pair.mp3', richtig:'assets/audio/richtig.mp3',
    richtig_1:'assets/audio/richtig_1.mp3', richtig_2:'assets/audio/richtig_2.mp3', richtig_3:'assets/audio/richtig_3.mp3',
    spray:'assets/audio/spray.mp3', throw:'assets/audio/throw.mp3',
    falsch_1:'assets/audio/falsch_1.mp3', falsch_2:'assets/audio/falsch_2.mp3', falsch_3:'assets/audio/falsch_3.mp3'
  };

  const STORY_SLIDES = [
    { image:'assets/images/story/1.png',     text:'Hoch über dem Land schwebte das Schloss der Sinne...' },
    { image:'assets/images/story/2.png',     text:'Dort feierten König und Hof ein fröhliches Fest...' },
    { image:'assets/images/story/3.png',     text:'Doch draußen beobachtete ein böser Magier alles heimlich...' },
    { image:'assets/images/story/4-8.png',   text:'Er sah leckeres Essen, schöne Blumen, weiche Sitze und hörte herrliche Harfenklänge...' },
    { image:'assets/images/story/9.png',     text:'Vor Wut ließ er die Mauer bersten...' },
    { image:'assets/images/story/10.png',    text:'Dann wirkte er einen finsteren Zauber...' },
    { image:'assets/images/story/11.png',    text:'Dunkle Magie raste durch den Festsaal...' },
    { image:'assets/images/story/12-16.png', text:'Plötzlich stank, kratzte und klang vieles ganz falsch...' },
    { image:'assets/images/story/17.png',    text:'Zufrieden zog sich der Magier in sein Schloss zurück...' },
    { image:'assets/images/story/18.png',    text:'Sein Fluch legte sich über das ganze Königreich...' },
    { image:'assets/images/story/19.png',    text:'Überall warteten nun rätselhafte Prüfungen...' },
    { image:'assets/images/story/20.png',    text:'Fünf magische Schlüssel wurden im ganzen Land versteckt...' },
    { image:'assets/images/story/21.png',    text:'Und fünf Vorhängeschlösser verriegelten das Tor des Magiers...' },
    { image:'assets/images/story/22.png',    text:'Im Schloss hofften nun alle auf Hilfe...' },
    { image:'assets/images/story/23.png',    text:'Da tauchte in der Speisekammer ein wichtiger Hinweis auf...' },
    { image:'assets/images/story/24.png',    text:'Dort entdeckte {heroName} die entscheidende Spur...' },
    { image:'assets/images/story/25.png',    text:'{HeroNom} eilte sofort damit zum König...' },
    { image:'assets/images/story/26.png',    text:'Der König bat {heroAcc}, das Königreich zu retten...' },
    { image:'assets/images/story/27.png',    text:'Also machte sich {heroName} mutig auf den Weg...' },
    { image:'assets/images/story/28.png',    text:'Mit viel Mut begann nun die Reise...' },
    { image:'assets/images/story/29.png',    text:'Jetzt sucht {heroName} die fünf Schlüssel des Königreichs...' }
  ];

  // Asset-URLs normalisieren
  (() => {
    Object.values(SENSES).forEach(s => { s.enemy=assetUrl(s.enemy); s.defeated=assetUrl(s.defeated); });
    BOSS.enemy=assetUrl(BOSS.enemy); BOSS.defeated=assetUrl(BOSS.defeated);
    STAGE_BACKGROUNDS.forEach((v,i)=>{ STAGE_BACKGROUNDS[i]=assetUrl(v); });
    POPUP_BACKGROUNDS.forEach((v,i)=>{ POPUP_BACKGROUNDS[i]=assetUrl(v); });
    ASSETS.correct=ASSETS.correct.map(assetUrl); ASSETS.wrong=ASSETS.wrong.map(assetUrl);
    ['final','hero','triumphHero','winHero','loseHero','escapeHero','versus'].forEach(k=>{ ASSETS[k]=assetUrl(ASSETS[k]); });
    Object.keys(ASSETS.text).forEach(k=>{ ASSETS.text[k]=assetUrl(ASSETS.text[k]); });
    Object.keys(AUDIO_FILES).forEach(k=>{ AUDIO_FILES[k]=assetUrl(AUDIO_FILES[k]); });
  })();

  // ─── Journey/Board-Daten ───────────────────────────────────────────────────

  const JOURNEY_BOARD_BG = assetUrl('assets/images/board/universe_bg.png');
  const JOURNEY_ISLAND_IMAGES = {
    start:assetUrl('assets/images/board/start_island.png'), riechen:assetUrl('assets/images/board/grass_island.png'),
    hoeren:assetUrl('assets/images/board/desert_island.png'), sehen:assetUrl('assets/images/board/cloud_island.png'),
    schmecken:assetUrl('assets/images/board/lava_island.png'), fuehlen:assetUrl('assets/images/board/ice_island.png'),
    boss:assetUrl('assets/images/board/final_island.png')
  };
  const JOURNEY_LABELS = {
    start:'Marktplatz des Königreichs', riechen:'Grasinsel', hoeren:'Wüsteninsel',
    sehen:'Wolkeninsel', schmecken:'Lavainsel', fuehlen:'Eisinsel', boss:'Magieschloss'
  };
  const ISLAND_STORIES = {
    riechen:  'Ein grüner Wind trägt den Duft von Moos, Blumen und frischem Gras heran. Auf der Grasinsel wartet der erste Hinweis zwischen Bäumen und alten Steinen.',
    hoeren:   'Aus der Wüste weht ein leises Echo über Sand und Ruinen. Zwischen heißen Steinen muss genau hingehört werden, um den nächsten Schlüssel zu finden.',
    sehen:    'Über den Wolken glitzern helle Pfade und leuchtende Kristalle. Wer genau hinsieht, erkennt dort die Spur des Magiers.',
    schmecken:'Auf der Lavainsel brodelt die Hitze. Zwischen Feuer, Rauch und glühendem Gestein verbirgt sich ein weiterer Hinweis.',
    fuehlen:  'Die Eisinsel knistert vor Kälte. Glatte Kristalle, Schnee und frostige Wege prüfen, ob {heroName} mutig weitergeht.',
    boss:     'Alle fünf Inseln sind geschafft. Der Weg zum Magieschloss liegt offen, und hinter dem Tor wartet die letzte Prüfung.',
    start:    'Auf dem Marktplatz beginnt die Reise. Dort können neue Steckbriefe gescannt werden, um weitere Inseln freizuschalten.'
  };

  let boardDockSelection = null;
  const BOARD_UI_ASSETS = {
    topBar:assetUrl('assets/images/custom_ui/name_board.png'), options:assetUrl('assets/images/custom_ui/options_shield.png'),
    qr:assetUrl('assets/images/custom_ui/qr_board.png'), bottomGrass:assetUrl('assets/images/custom_ui/down_grass.png'),
    treasure:assetUrl('assets/images/custom_ui/treasure_chest.png')
  };
  const BOARD_DOCK_LABELS = { options:'Optionen', qr:'QR-Board', treasure:'' };
  const BOARD_KEY_SUMMARY = [
    { id:'riechen',  title:'Grasinsel',   image:assetUrl('assets/images/ui/key_grass.png') },
    { id:'hoeren',   title:'Wüsteninsel', image:assetUrl('assets/images/ui/key_sand.png')  },
    { id:'fuehlen',  title:'Eisinsel',    image:assetUrl('assets/images/ui/key_ice.png')   },
    { id:'schmecken',title:'Lavainsel',   image:assetUrl('assets/images/ui/key_lava.png')  },
    { id:'sehen',    title:'Himmelsinsel',image:assetUrl('assets/images/ui/key_cloud.png') }
  ];

  // ─── Hilfsfunktionen ───────────────────────────────────────────────────────

  const $       = id => document.getElementById(id);
  const qs      = name => new URLSearchParams(location.search).get(name);
  const hide    = node => node && node.classList.add('hidden');
  const show    = node => node && node.classList.remove('hidden');
  const esc     = txt => String(txt??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const sleep   = ms => new Promise(r=>setTimeout(r,ms));
  const clamp   = (n,a,b) => Math.max(a,Math.min(b,n));
  const capFirst= v => { const s=String(v||''); return s?s[0].toUpperCase()+s.slice(1):s; };
  const cleanHeroName = v => String(v||'').replace(/\s+/g,' ').trim().slice(0,28);
  const shuffle = arr => { const a=arr.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
  const isPlaceholderSlot = i => PLACEHOLDER_LEVELS.includes(Number(i));
  const slotSenseId       = slot => SLOT_SENSE_MAP[Number(slot)]||'boss';
  const biomeForSenseId   = id => BIOME_BY_SENSE[id]||BIOME_BY_SENSE.boss;
  const stageIndexForSense= id => BIOME_BY_SENSE[id]?.stageIndex??5;
  const stageIndexForMeta = meta => stageIndexForSense(senseIdForMeta(meta));
  const bgForMeta         = meta => STAGE_BACKGROUNDS[stageIndexForMeta(meta)];
  const popupBgForMeta    = meta => POPUP_BACKGROUNDS[stageIndexForMeta(meta)];
  const dataForMeta       = meta => (meta?.isBoss||meta?.senseId==='boss')?BOSS:SENSES[meta?.senseId];
  const getQuestionsForId = id => QUESTION_BANK[id]||QUESTION_BANK.sehen;

  function senseIdForMeta(meta) {
    if (meta?.isBoss||meta?.senseId==='boss') return 'boss';
    if (meta?.senseId&&BIOME_BY_SENSE[meta.senseId]) return meta.senseId;
    const slot=Number(meta?.slot);
    if (Number.isInteger(slot)) { const a=getState().slots?.[slot]; if(a&&BIOME_BY_SENSE[a])return a; }
    return slotSenseId(meta?.slot);
  }
  function applyStagePopup(modal,meta) {
    if (!modal) return;
    modal.classList.add('stage-popup');
    modal.style.setProperty('--popup-bg',`url("${popupBgForMeta(meta)}")`);
  }

  // ─── State ─────────────────────────────────────────────────────────────────

  const blankFlags = () => ({ sehen:false,hoeren:false,riechen:false,schmecken:false,fuehlen:false,boss:false });

  function defaultState() {
    return { stateVersion:STATE_VERSION,started:false,slots:Array(LEVEL_COUNT).fill(null),completed:Array(LEVEL_COUNT).fill(false),bossCompleted:false,heroIndex:null,heroName:DEFAULT_HERO_NAME,heroGender:DEFAULT_HERO_GENDER,heroPronoun:'er',introUsed:false,revealedMax:0,keysFound:blankFlags(),removedLocks:blankFlags(),seenIslandStories:blankFlags(),activeBiome:null,journeyOrder:[],boardCurrentNode:'start' };
  }

  function normalizeState(raw) {
    const base=defaultState(); if(!raw||raw.stateVersion!==STATE_VERSION) return base;
    const state={...base,...raw};
    state.heroName=cleanHeroName(raw.heroName)||DEFAULT_HERO_NAME;
    state.heroGender=HERO_GENDER_OPTIONS.includes(raw.heroGender)?raw.heroGender:DEFAULT_HERO_GENDER;
    state.heroPronoun=state.heroGender==='female'?'sie':'er';
    const oldSlots=Array.isArray(raw.slots)?raw.slots:[], oldDone=Array.isArray(raw.completed)?raw.completed:[];
    state.slots=Array.from({length:LEVEL_COUNT},(_,i)=>oldSlots[i]||null);
    state.completed=Array.from({length:LEVEL_COUNT},(_,i)=>Boolean(oldDone[i]));
    if (!Number.isInteger(state.heroIndex)||state.heroIndex<0||state.heroIndex>=LEVEL_COUNT) state.heroIndex=null;
    const inf=state.completed.every(Boolean)?LEVEL_COUNT-1:Math.max(0,Math.min(LEVEL_COUNT-1,state.completed.findIndex(v=>!v)));
    state.revealedMax=Number.isInteger(state.revealedMax)?Math.max(inf,Math.min(LEVEL_COUNT-1,state.revealedMax)):inf;
    state.keysFound={...blankFlags(),...(raw.keysFound||{})};
    state.removedLocks={...blankFlags(),...(raw.removedLocks||{})};
    state.seenIslandStories={...blankFlags(),...(raw.seenIslandStories||{})};
    Object.entries({sehen:0,hoeren:2,riechen:4,schmecken:6,fuehlen:8}).forEach(([id,slot])=>{ if(state.completed[slot])state.keysFound[id]=true; });
    if (!state.activeBiome||!BIOME_LEVEL_PLAN[state.activeBiome]||BIOME_LEVEL_PLAN[state.activeBiome].every(s=>state.completed[s])) state.activeBiome=null;
    if (!state.activeBiome&&KEY_ORDER.every(id=>state.removedLocks?.[id])&&!state.bossCompleted&&!biomeIsComplete('boss',state)) {
      const bs=nextSlotForBiome('boss',state); if(Number.isInteger(bs)){state.activeBiome='boss';state.slots[bs]='boss';}
    }
    const inSlots=new Set(state.slots.filter(id=>KEY_ORDER.includes(id)));
    const jo=[]; (raw.journeyOrder||[]).forEach(id=>{if(KEY_ORDER.includes(id)&&inSlots.has(id)&&!jo.includes(id))jo.push(id);});
    state.slots.forEach(id=>{if(KEY_ORDER.includes(id)&&!jo.includes(id))jo.push(id);});
    if (state.activeBiome&&KEY_ORDER.includes(state.activeBiome)&&!jo.includes(state.activeBiome)) jo.push(state.activeBiome);
    state.journeyOrder=jo.slice(0,5);
    const nodes=getCarouselNodesFromState(state);
    state.boardCurrentNode=nodes.includes(raw.boardCurrentNode)?raw.boardCurrentNode:'start';
    return state;
  }

  function getState()  { try{return normalizeState(JSON.parse(localStorage.getItem(STORE))||null);}catch(_){return defaultState();} }
  function setState(s) { localStorage.setItem(STORE,JSON.stringify(normalizeState(s))); }

  // ─── Hero-Profil ───────────────────────────────────────────────────────────

  function getHeroName() { return getState().heroName||DEFAULT_HERO_NAME; }
  function getHeroProfile(state=getState()) {
    const g=HERO_GENDER_OPTIONS.includes(state.heroGender)?state.heroGender:DEFAULT_HERO_GENDER;
    const sets={male:{gender:'male',nom:'er',acc:'ihn',dat:'ihm',poss:'sein',title:'Ritter',role:'Held'},female:{gender:'female',nom:'sie',acc:'sie',dat:'ihr',poss:'ihr',title:'Ritterin',role:'Heldin'}};
    return {name:cleanHeroName(state.heroName)||DEFAULT_HERO_NAME,...sets[g]};
  }
  function setHeroProfile({name,gender}={}) {
    const state=getState(),g=HERO_GENDER_OPTIONS.includes(gender)?gender:DEFAULT_HERO_GENDER;
    state.heroName=cleanHeroName(name)||DEFAULT_HERO_NAME; state.heroGender=g; state.heroPronoun=g==='female'?'sie':'er';
    setState(state); return getHeroProfile(state);
  }
  function heroText(rawText,name=getHeroName()) {
    const p=getHeroProfile(),n=cleanHeroName(name)||p.name;
    const v={heroName:n,heroNom:p.nom,HeroNom:capFirst(p.nom),heroAcc:p.acc,HeroAcc:capFirst(p.acc),heroDat:p.dat,HeroDat:capFirst(p.dat),heroPoss:p.poss,HeroPoss:capFirst(p.poss),heroTitle:p.title,HeroTitle:capFirst(p.title),heroRole:p.role,HeroRole:capFirst(p.role)};
    return String(rawText||'').replace(/\{(heroName|heroNom|HeroNom|heroAcc|HeroAcc|heroDat|HeroDat|heroPoss|HeroPoss|heroTitle|HeroTitle|heroRole|HeroRole)\}/g,(_,k)=>v[k]??'');
  }

  // ─── Biom-Helfer ───────────────────────────────────────────────────────────

  const biomeLevelPlan     = id => BIOME_LEVEL_PLAN[id]||[];
  const nextSlotForBiome   = (id,s=getState()) => biomeLevelPlan(id).find(slot=>!s.completed[slot]);
  const biomeIsComplete    = (id,s=getState()) => { const p=biomeLevelPlan(id); return p.length>0&&p.every(slot=>s.completed[slot]); };
  const firstSlotForBiome  = id => biomeLevelPlan(id)[0]??null;
  const questionSlotForBiome=id=> biomeLevelPlan(id)[1]??null;
  const finalBridgeUnlocked= (s=getState()) => KEY_ORDER.every(id=>biomeIsComplete(id,s));
  const allLevelsDone      = (s=getState()) => Boolean(s.bossCompleted);
  const keyInfoForSenseId  = id => (!id||!BIOME_BY_SENSE[id]?.key)?null:{id,label:BIOME_BY_SENSE[id].label,image:assetUrl(BIOME_BY_SENSE[id].key)};
  const boardPointForSlot  = (index,s=getState()) => {
    if (!Number.isInteger(index)) return HERO_DEFAULT_POINT;
    const assigned=s.slots[index]||slotSenseId(index),biome=biomeForSenseId(assigned);
    const first=firstSlotForBiome(assigned),second=questionSlotForBiome(assigned);
    if (Number(index)===first)  return biome.board?.minigame||HERO_DEFAULT_POINT;
    if (Number(index)===second) return biome.board?.question||biome.board?.minigame||HERO_DEFAULT_POINT;
    return biome.board?.minigame||HERO_DEFAULT_POINT;
  };

  // ─── Carousel-Navigation ───────────────────────────────────────────────────

  const getCarouselNodesFromState = state => { const n=['start',...state.journeyOrder]; if(finalBridgeUnlocked(state))n.push('boss'); return n; };
  const getCarouselNodes = (s=getState()) => getCarouselNodesFromState(s);
  const currentBoardNode = (s=getState()) => { const n=getCarouselNodes(s); return n.includes(s.boardCurrentNode)?s.boardCurrentNode:'start'; };
  function setCurrentBoardNode(node) { const s=getState(); s.boardCurrentNode=node; setState(s); }
  function getCarouselEntry(node,s=getState()) {
    if (node==='start') return {node:'start',type:'start',title:JOURNEY_LABELS.start,image:JOURNEY_ISLAND_IMAGES.start};
    if (node==='boss')  return {node:'boss', type:'boss', title:JOURNEY_LABELS.boss, image:JOURNEY_ISLAND_IMAGES.boss};
    if (KEY_ORDER.includes(node)) return {node,type:node,title:JOURNEY_LABELS[node]||BIOME_BY_SENSE[node]?.label||node,image:JOURNEY_ISLAND_IMAGES[node]};
    return null;
  }

  // ─── Audio-System ──────────────────────────────────────────────────────────

  let muted = localStorage.getItem(SOUND_STORE)==='1';
  const audioCache = new Map();
  const oneShotPools = new Map();
  const activeOneShotAudio = new Set();
  const ONE_SHOT_SOUND_KEYS = ['richtig_1','richtig_2','richtig_3','falsch_1','falsch_2','falsch_3'];
  const BATTLE_CUE_KEYS = ['final','win','lose',...ONE_SHOT_SOUND_KEYS];
  let battleAudioContext=null, battleWebBackground=null;
  const battleAudioBuffers=new Map(), activeBattleCueAudio=new Set(), activeBattleCueSources=new Set();

  function audioVolumeForKey(key) {
    if (key==='background')return .045; if(key==='battle_background')return .22; if(key==='minigame_background')return .24;
    if (key==='story_spell')return .70; if(key==='story_wallbreak')return .82; if(key==='collect')return .82;
    if (key==='flip')return .70; if(key==='pair')return .82; if(key==='hurt'||key==='glass_break')return .88;
    return /^(richtig|falsch)_/.test(key)?.95:.85;
  }
  function getBattleAudioContext() { const C=window.AudioContext||window.webkitAudioContext; if(!C)return null; if(!battleAudioContext)battleAudioContext=new C(); return battleAudioContext; }
  async function loadBattleAudioBuffer(key) {
    if (battleAudioBuffers.has(key))return battleAudioBuffers.get(key); if(!AUDIO_FILES[key])return null;
    const ctx=getBattleAudioContext(); if(!ctx||typeof fetch!=='function')return null;
    const buf=await ctx.decodeAudioData((await(await fetch(AUDIO_FILES[key])).arrayBuffer()).slice(0));
    battleAudioBuffers.set(key,buf); return buf;
  }
  function stopBattleWebBackground() {
    if (!battleWebBackground)return;
    try{battleWebBackground.source.stop(0);}catch(_){}
    try{battleWebBackground.source.disconnect();battleWebBackground.gain.disconnect();}catch(_){}
    battleWebBackground=null;
  }
  function playBattleWebAudio(key,{loop=false}={}) {
    if (muted)return false; const ctx=getBattleAudioContext(),buffer=battleAudioBuffers.get(key); if(!ctx||!buffer)return false;
    try { if(ctx.state==='suspended')void ctx.resume(); if(key==='battle_background')stopBattleWebBackground(); const source=ctx.createBufferSource(),gain=ctx.createGain(); source.buffer=buffer;source.loop=loop;gain.gain.value=audioVolumeForKey(key);source.connect(gain);gain.connect(ctx.destination);source.start(0); if(loop&&key==='battle_background'){battleWebBackground={source,gain};}else{const item={key,source,gain};activeBattleCueSources.add(item);source.onended=()=>activeBattleCueSources.delete(item);} return true; } catch(_){return false;}
  }
  function stopBattleCues(key) {
    activeBattleCueAudio.forEach(a=>{if(key&&a._battleCueKey!==key)return;try{a.pause();a.currentTime=0;}catch(_){}activeBattleCueAudio.delete(a);});
    activeBattleCueSources.forEach(item=>{if(key&&item.key!==key)return;try{item.source.stop(0);}catch(_){}try{item.source.disconnect();item.gain.disconnect();}catch(_){}activeBattleCueSources.delete(item);});
  }
  async function startBattleAudioFromButton() {
    muted=false;localStorage.setItem(SOUND_STORE,'0');
    const sp=$('globalSpeakerBtn');if(sp)sp.textContent=String.fromCodePoint(0x1f50a);
    const ctx=getBattleAudioContext();try{await ctx?.resume?.();}catch(_){}
    const preload=Promise.allSettled(['battle_background',...BATTLE_CUE_KEYS].map(k=>loadBattleAudioBuffer(k)));
    const bg=getAudio('battle_background');
    if (bg){try{bg.pause();bg.loop=true;bg.muted=false;bg.volume=audioVolumeForKey('battle_background');bg.currentTime=0;await bg.play();}catch(_){void loadBattleAudioBuffer('battle_background').then(()=>playBattleWebAudio('battle_background',{loop:true}));}}
    else void loadBattleAudioBuffer('battle_background').then(()=>playBattleWebAudio('battle_background',{loop:true}));
    return preload;
  }
  async function playBattleCue(key,{stopSame=false}={}) {
    if (muted||!AUDIO_FILES[key])return; if(stopSame)stopBattleCues(key); if(/^(richtig|falsch)_\d$/.test(key))stopBattleCues();
    const cue=new Audio(AUDIO_FILES[key]);cue.preload='auto';cue.volume=audioVolumeForKey(key);cue._battleCueKey=key;
    activeBattleCueAudio.add(cue); cue.addEventListener('ended',()=>activeBattleCueAudio.delete(cue),{once:true}); cue.addEventListener('error',()=>activeBattleCueAudio.delete(cue),{once:true});
    try{cue.currentTime=0;await cue.play();}catch(_){activeBattleCueAudio.delete(cue);const buf=battleAudioBuffers.get(key)||await loadBattleAudioBuffer(key);if(buf)playBattleWebAudio(key);}
  }
  function getAudio(key) {
    if (!AUDIO_FILES[key])return null;
    if (!audioCache.has(key)){const a=new Audio(AUDIO_FILES[key]);a.preload='auto';a.volume=audioVolumeForKey(key);try{a.load();}catch(_){}audioCache.set(key,a);}
    return audioCache.get(key);
  }
  function warmOneShotPools(keys=ONE_SHOT_SOUND_KEYS) {
    keys.forEach(key=>{if(!/^(richtig|falsch)_\d$/.test(key)||!AUDIO_FILES[key]||oneShotPools.has(key))return;const pool=Array.from({length:3},()=>{const a=new Audio(AUDIO_FILES[key]);a.preload='auto';a.volume=audioVolumeForKey(key);try{a.load();}catch(_){}return a;});pool.cursor=0;oneShotPools.set(key,pool);});
  }
  function stopActiveOneShots(pattern) {
    activeOneShotAudio.forEach(a=>{const src=a.currentSrc||a.src||'';const matches=!pattern||pattern.test(Object.keys(AUDIO_FILES).find(k=>src.includes(AUDIO_FILES[k].split('/').pop()))||src);if(!matches)return;try{a.pause();a.currentTime=0;}catch(_){}activeOneShotAudio.delete(a);});
  }
  async function playPooledOneShot(key) {
    if (!oneShotPools.has(key))warmOneShotPools([key]); stopActiveOneShots(/^(richtig|falsch)_/);
    const base=getAudio(key);
    if (base){try{base.pause();base.currentTime=0;base.loop=false;base.volume=audioVolumeForKey(key);activeOneShotAudio.add(base);base.addEventListener('ended',()=>activeOneShotAudio.delete(base),{once:true});base.addEventListener('error',()=>activeOneShotAudio.delete(base),{once:true});await base.play();return;}catch(_){activeOneShotAudio.delete(base);}}
    const pool=oneShotPools.get(key);if(!pool?.length)return;
    const a=pool[pool.cursor++%pool.length];
    try{a.pause();a.currentTime=0;activeOneShotAudio.add(a);a.addEventListener('ended',()=>activeOneShotAudio.delete(a),{once:true});a.addEventListener('error',()=>activeOneShotAudio.delete(a),{once:true});await a.play();}
    catch(_){activeOneShotAudio.delete(a);if(!playBattleWebAudio(key))void loadBattleAudioBuffer(key).then(()=>playBattleWebAudio(key));}
  }
  async function playSound(key,{loop=false,restart=true}={}) {
    if (muted)return; const a=getAudio(key);if(!a)return;
    try{a.loop=loop;if(!loop&&/^(richtig|falsch)_\d$/.test(key)){await playPooledOneShot(key);return;}if(restart)a.currentTime=0;await a.play();}
    catch(_){if(!playBattleWebAudio(key,{loop}))void loadBattleAudioBuffer(key).then(()=>playBattleWebAudio(key,{loop}));}
  }
  function stopSound(key) { const a=audioCache.get(key);if(a){a.pause();try{a.currentTime=0;}catch(_){}} if(key==='battle_background')stopBattleWebBackground();stopBattleCues(key); }
  function stopAllBattleAudio() { stopActiveOneShots();['battle_background','final','win','lose','fight','richtig_1','richtig_2','richtig_3','falsch_1','falsch_2','falsch_3'].forEach(stopSound); }
  function addSpeaker() {
    if ($('globalSpeakerBtn'))return;
    const b=document.createElement('button');b.id='globalSpeakerBtn';b.className='speaker-btn';b.type='button';b.textContent=muted?'🔇':'🔊';
    b.addEventListener('click',()=>{muted=!muted;localStorage.setItem(SOUND_STORE,muted?'1':'0');b.textContent=muted?'🔇':'🔊';if(muted){stopActiveOneShots();audioCache.forEach((_,k)=>stopSound(k));}else{const page=document.body.dataset.page;if(page==='board'&&!$('boardScreen')?.classList.contains('hidden'))playSound('background',{loop:true});else if(['minigame','minigame2','minigame3','minigame4'].includes(page))playSound('minigame_background',{loop:true,restart:false});}});
    document.body.appendChild(b);
  }

  // ─── Asset-Laden ───────────────────────────────────────────────────────────

  function preloadAssets(list) { list.filter(Boolean).forEach(src=>{if(/\.mp3$/i.test(src)){const a=new Audio(src);a.preload='auto';return;}new Image().src=src;}); }
  function preloadImagesWithProgress(list,onProgress) {
    const sources=list.filter(Boolean);if(!sources.length){onProgress?.(1);return Promise.resolve();}
    let done=0;const report=()=>onProgress?.(done/sources.length);report();
    return new Promise(resolve=>{sources.forEach(src=>{const img=new Image();const finish=()=>{done++;report();if(done>=sources.length)resolve();};img.onload=finish;img.onerror=finish;img.src=src;});});
  }
  function preloadImage(src) {
    return new Promise(resolve=>{const img=new Image();img.decoding='async';img.onload=img.onerror=()=>resolve(img);img.src=src;if(img.decode)img.decode().then(()=>resolve(img)).catch(()=>{});});
  }
  function preloadBattleAssets(data,meta) { preloadAssets([ASSETS.hero,ASSETS.triumphHero,ASSETS.versus,ASSETS.text.kampf,ASSETS.text.richtig,ASSETS.text.falsch,ASSETS.text.gewonnen,ASSETS.text.verloren,data.enemy,data.defeated,ASSETS.loseHero,ASSETS.final,...ASSETS.correct,...ASSETS.wrong,bgForMeta(meta),popupBgForMeta(meta)]); }
  function prefetchPage(href) { const url=href.includes('://')||href.startsWith('file:')?href:pageUrl(href);if(document.querySelector(`link[rel="prefetch"][href="${url}"]`))return;const link=document.createElement('link');link.rel='prefetch';link.href=url;document.head.appendChild(link); }

  // ─── Board-Viewport-Helfer ─────────────────────────────────────────────────

  function resetBoardViewport() { if(document.body.dataset.page!=='board')return;try{if('scrollRestoration'in history)history.scrollRestoration='manual';}catch(_){}document.documentElement.scrollTop=document.body.scrollTop=0;window.scrollTo(0,0); }
  function updateMapGeometry() { const screen=$('boardScreen'),inner=$('mapInner');if(!screen||!inner)return;inner.style.cssText='width:100vw;height:100dvh;left:0px;top:0px;transform:none'; }
  function removeBoardViewportBars() { document.querySelectorAll('.board-world-topbar,.board-market-bottombar').forEach(el=>el.remove());document.body.classList.remove('board-ui-active'); }
  function boardScreenIsVisible() { const s=$('boardScreen');return Boolean(s&&!s.classList.contains('hidden')); }

  // ─── Lade-Balken ───────────────────────────────────────────────────────────

  function ensureIntroStoryLoader() {
    let el=$('introStoryLoader');if(el)return el;
    const intro=$('introScreen');if(!intro)return null;
    el=document.createElement('div');el.id='introStoryLoader';el.className='intro-loading-panel';
    el.innerHTML='<div class="intro-loading-title">Geschichte wird geladen</div><div class="intro-loading-track"><div id="introStoryLoadBar" class="intro-loading-bar"></div></div><div id="introStoryLoadPercent" class="intro-loading-percent">0%</div>';
    intro.appendChild(el);return el;
  }
  function setIntroStoryProgress(v) { const pct=Math.round(clamp(v,0,1)*100);const bar=$('introStoryLoadBar'),lbl=$('introStoryLoadPercent');if(bar)bar.style.width=`${pct}%`;if(lbl)lbl.textContent=`${pct}%`; }
  function setBoardWelcomeLoadProgress(v) { const pct=Math.round(clamp(v,0,1)*100);const bar=$('boardWelcomeLoadBar'),lbl=$('boardWelcomeLoadPercent');if(bar)bar.style.width=`${pct}%`;if(lbl)lbl.textContent=`${pct}%`; }

  // ─── Story-Effekte ─────────────────────────────────────────────────────────

  async function playStoryEffect(key) {
    if (muted||!AUDIO_FILES[key])return;let cue=null;
    try{cue=new Audio(AUDIO_FILES[key]);cue.preload='auto';cue.volume=audioVolumeForKey(key);activeOneShotAudio.add(cue);cue.addEventListener('ended',()=>activeOneShotAudio.delete(cue),{once:true});cue.addEventListener('error',()=>activeOneShotAudio.delete(cue),{once:true});cue.currentTime=0;await cue.play();}
    catch(_){if(cue)activeOneShotAudio.delete(cue);playSound(key,{loop:false,restart:true});}
  }
  function enableStorySoundFromGesture() {
    muted=false;localStorage.setItem(SOUND_STORE,'0');const sp=$('globalSpeakerBtn');if(sp)sp.textContent=String.fromCodePoint(0x1f50a);
    ['story_wallbreak','story_spell'].forEach(key=>{const cue=getAudio(key);if(!cue)return;try{cue.pause();cue.currentTime=0;cue.muted=true;cue.volume=0;Promise.resolve(cue.play()).then(()=>{try{cue.pause();cue.currentTime=0;}catch(_){}cue.muted=false;cue.volume=audioVolumeForKey(key);}).catch(()=>{cue.muted=false;cue.volume=audioVolumeForKey(key);});}catch(_){cue.muted=false;cue.volume=audioVolumeForKey(key);}});
  }

  // ─── Final-Cloud-Puls ──────────────────────────────────────────────────────

  function startFinalCloudPulse(node) {
    if (!node)return;stopFinalCloudPulse(node);node.style.animation='none';node.style.transformOrigin='center center';
    const t0=performance.now();const run=now=>{const phase=((now-t0)%760)/760,wave=0.5-Math.cos(phase*Math.PI*2)/2;node.style.opacity='1';node.style.transform=`translate(-50%,-50%) scale(${(0.84+wave*0.46).toFixed(3)})`;node.style.filter=`drop-shadow(0 ${Math.round(18+wave*14)}px ${Math.round(30+wave*22)}px rgba(255,255,255,${(0.24+wave*0.24).toFixed(2)}))`;node._battlePulseRaf=requestAnimationFrame(run);};node._battlePulseRaf=requestAnimationFrame(run);
  }
  function stopFinalCloudPulse(node) {
    try{if(node?._battlePulseRaf){cancelAnimationFrame(node._battlePulseRaf);node._battlePulseRaf=null;}if(node){node.style.animation=node.style.transform=node.style.filter=node.style.opacity='';}}catch(_){}
  }

  // ─── Story-Screen ──────────────────────────────────────────────────────────

  function initStory() {
    removeBoardViewportBars?.();
    const card=document.querySelector('.story-card'),text=$('storyText'),counter=$('storyCounter');
    const prevBtn=$('storyPrevBtn'),nextBtn=$('storyNextBtn'),startBtn=$('storyStartBtn'),skipBtn=$('storySkipBtn'),nameBox=$('storyHeroNameBox');
    if (!card||!text||!counter||!prevBtn||!nextBtn||!startBtn||!nameBox||!skipBtn)return;
    const START_SLIDE={image:'assets/images/story/story_bookcover.png',text:'Gib deinen Namen ein, wähle männlich oder weiblich und starte dann die Geschichte.',isStoryStart:true};
    const slides=[START_SLIDE,...STORY_SLIDES],images=slides.map(s=>assetUrl(s.image)),lastIndex=slides.length-1,SLIDE_DURATION=4000;
    card.classList.add('story-autoplay-card');nameBox.classList.add('story-profile-box');nameBox.classList.remove('hidden');
    const profile=getHeroProfile();
    nameBox.innerHTML=`<div class="story-profile-title">Ritterfigur anlegen</div><div class="story-profile-row"><label class="story-profile-label" for="storyHeroNameInput">Name</label><input id="storyHeroNameInput" type="text" name="storyHeroNameInput" autocomplete="off" maxlength="28" placeholder="Name eingeben" value="${esc(profile.name===DEFAULT_HERO_NAME?'':profile.name)}"></div><fieldset class="story-gender-box" aria-label="Geschlecht der Ritterfigur"><legend>Geschlecht</legend><label class="story-gender-option"><input type="radio" name="storyHeroGender" value="male" ${profile.gender==='male'?'checked':''}> <span>Männlich</span></label><label class="story-gender-option"><input type="radio" name="storyHeroGender" value="female" ${profile.gender==='female'?'checked':''}> <span>Weiblich</span></label></fieldset><p id="storyProfileHint" class="story-profile-hint">Der Name wird in Geschichte und Spiel verwendet.</p>`;
    const liveNameInput=$('storyHeroNameInput'),genderInputs=[...document.querySelectorAll('input[name="storyHeroGender"]')];
    const selectedGender=()=>genderInputs.find(i=>i.checked)?.value||DEFAULT_HERO_GENDER;
    const formReady=()=>Boolean(cleanHeroName(liveNameInput?.value));
    const saveProfile=()=>setHeroProfile({name:liveNameInput?.value,gender:selectedGender()});
    const trackWrap=document.createElement('div');trackWrap.className='story-autoplay-window';
    const track=document.createElement('div');track.className='story-autoplay-track';trackWrap.appendChild(track);
    slides.forEach((slide,i)=>{const panel=document.createElement('figure');panel.className='story-autoplay-panel';const img=document.createElement('img');img.src=images[i];img.alt=i===0?'Geschichte starten':`Geschichte ${i}`;img.loading=i<3?'eager':'lazy';panel.appendChild(img);track.appendChild(panel);});
    card.querySelector('.story-image-wrap')?.replaceWith(trackWrap);
    let index=0,timer=0,finished=false,running=false;const playedFx=new Set();
    const setTrackPos=(instant=false)=>{track.classList.toggle('is-instant',instant);track.style.transform=`translateX(${-index*100}%)`;if(instant)window.setTimeout(()=>track.classList.remove('is-instant'),40);};
    const showText=raw=>{const rendered=heroText(raw,cleanHeroName(liveNameInput?.value)||getHeroName());text.classList.remove('is-visible');window.setTimeout(()=>{text.innerHTML=rendered.split(/\s+/).filter(Boolean).map(w=>`<span class="story-word visible">${esc(w)}</span>`).join(' ');text.classList.add('is-visible');},170);};
    const syncForm=()=>{nextBtn.disabled=index===0?!formReady():true;};
    const stopAuto=()=>{if(timer){window.clearTimeout(timer);timer=0;}};
    const playFx=()=>{if(index===0)return;const img=slides[index]?.image||'';if(img.includes('/9.')&&!playedFx.has('9')){playedFx.add('9');playStoryEffect('story_wallbreak');}if(img.includes('/10.')&&!playedFx.has('10')){playedFx.add('10');playStoryEffect('story_spell');}};
    const updateControls=()=>{counter.textContent=index===0?'Start':`${index} / ${STORY_SLIDES.length}`;prevBtn.classList.toggle('hidden',index===0);prevBtn.disabled=index<=1;nextBtn.classList.toggle('hidden',index!==0);nextBtn.textContent='Geschichte starten';startBtn.classList.toggle('hidden',index!==lastIndex);startBtn.classList.toggle('is-disabled',false);startBtn.setAttribute('aria-disabled','false');skipBtn.classList.toggle('hidden',index!==0);nameBox.classList.toggle('hidden',index!==0);syncForm();};
    const render=(instant=false)=>{setTrackPos(instant);showText(slides[index].text);playFx();updateControls();};
    const nextAuto=()=>{if(finished||!running)return;if(index>=lastIndex){finished=running=false;stopAuto();render(false);return;}index++;render(false);if(index>=lastIndex){finished=running=false;stopAuto();return;}stopAuto();timer=window.setTimeout(nextAuto,SLIDE_DURATION);};
    const goToBoard=()=>{saveProfile();const s=getState();s.started=s.introUsed=true;setState(s);try{sessionStorage.setItem(BOARD_WELCOME_STORE,'1');}catch(_){}stopAuto();window.setTimeout(()=>{location.href=pageUrl('index.html?board=1&welcome=1');},120);};
    const startAuto=()=>{if(!formReady()){liveNameInput?.focus();syncForm();return;}saveProfile();enableStorySoundFromGesture();running=true;finished=false;index=1;render(false);stopAuto();timer=window.setTimeout(nextAuto,SLIDE_DURATION);};
    nextBtn.addEventListener('click',startAuto);skipBtn.addEventListener('click',goToBoard);liveNameInput?.addEventListener('input',syncForm);genderInputs.forEach(i=>i.addEventListener('change',syncForm));
    prevBtn.addEventListener('click',()=>{if(index<=1)return;stopAuto();index=Math.max(1,index-1);running=true;finished=false;render(false);timer=window.setTimeout(nextAuto,SLIDE_DURATION);});
    startBtn.addEventListener('click',ev=>{ev?.preventDefault?.();saveProfile();const s=getState();s.started=s.introUsed=true;setState(s);try{sessionStorage.setItem(BOARD_WELCOME_STORE,'1');}catch(_){}window.setTimeout(()=>{location.href=pageUrl('index.html?board=1&welcome=1');},120);});
    document.addEventListener('visibilitychange',()=>{if(document.hidden){stopAuto();return;}if(running&&!finished)timer=window.setTimeout(nextAuto,SLIDE_DURATION);},{passive:true});
    preloadAssets(images);render(true);
  }

  // ─── Board-Screen ──────────────────────────────────────────────────────────

  function boardPreloadAssetList() {
    const list=[JOURNEY_BOARD_BG,...Object.values(JOURNEY_ISLAND_IMAGES),ASSETS.hero,ASSETS.winHero,ASSETS.triumphHero,ASSETS.versus,ASSETS.escapeHero,ASSETS.loseHero,ASSETS.final,ASSETS.text?.kampf,ASSETS.text?.richtig,ASSETS.text?.falsch,ASSETS.text?.gewonnen,ASSETS.text?.verloren,assetUrl('assets/images/ui/market_board.png'),assetUrl('assets/images/magiccastle/magieschloss_background.png'),assetUrl('assets/images/magiccastle/eisschloss.png'),assetUrl('assets/images/magiccastle/grasschloss.png'),assetUrl('assets/images/magiccastle/lavaschloss.png'),assetUrl('assets/images/magiccastle/wolkenschloss.png'),assetUrl('assets/images/magiccastle/wuestenschloss.png')];
    Object.values(SENSES).forEach(e=>{list.push(e.enemy,e.defeated);});
    return [...new Set(list.filter(Boolean))];
  }

  let boardWelcomeLoading=false;
  async function startBoardAfterWelcome() {
    if (boardWelcomeLoading)return;boardWelcomeLoading=true;
    const btn=$('boardWelcomeContinueBtn'),loader=$('boardWelcomeLoader');if(btn){btn.disabled=true;btn.textContent='Lädt ...';}loader?.classList.remove('hidden');setBoardWelcomeLoadProgress(0);
    if (!muted)playSound('background',{loop:true,restart:true});
    try{await Promise.all([preloadImagesWithProgress(boardPreloadAssetList(),setBoardWelcomeLoadProgress),sleep(520)]);}catch(_){}
    setBoardWelcomeLoadProgress(1);try{localStorage.setItem(BOARD_ONBOARDING_STORE,'1');}catch(_){}boardWelcomeLoading=false;closeBoardWelcomeModal(false);
  }
  function closeBoardWelcomeModal(startMusic=false) { hide($('boardWelcomeModal'));try{sessionStorage.removeItem(BOARD_WELCOME_STORE);}catch(_){}if(startMusic&&!muted)playSound('background',{loop:true,restart:true}); }
  function showBoardWelcomeModal() { show($('boardWelcomeModal')); }

  function initBoard() {
    addSpeaker();resetBoardViewport();const state=getState();
    const firstWelcome=!(() => {try{return localStorage.getItem(BOARD_ONBOARDING_STORE)==='1';}catch(_){return false;}})();
    const pendingWelcome=qs('welcome')==='1'||firstWelcome||(()=>{try{return sessionStorage.getItem(BOARD_WELCOME_STORE)==='1';}catch(_){return false;}})();
    const forceMusic=!pendingWelcome&&(qs('music')==='1');
    if (qs('board')==='1'){state.started=state.introUsed=true;setState(state);try{history.replaceState(null,'',pageUrl('index.html'));}catch(_){}}
    hide($('outroScreen'));
    if (state.started){showBoard(false,{playMusic:!pendingWelcome});}else{document.body.classList.remove('board-ui-active');removeBoardViewportBars();show($('introScreen'));hide($('boardScreen'));hide($('openBoardMenuBtn'));hide($('belowBoard'));}
    if (pendingWelcome&&state.started)window.setTimeout(showBoardWelcomeModal,220);
    if (forceMusic){const ensureBGM=()=>{if(!muted)playSound('background',{loop:true,restart:false});};[120,420,900,1500].forEach(d=>window.setTimeout(ensureBGM,d));document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!$('boardScreen')?.classList.contains('hidden'))ensureBGM();},{passive:true,once:true});}
    let introTransitioning=false;
    const startGame=async()=>{if(introTransitioning)return;introTransitioning=true;const intro=$('introScreen'),startBtn=$('startGameBtn');ensureIntroStoryLoader();setIntroStoryProgress(0);intro?.classList.add('is-loading');startBtn?.setAttribute('disabled','disabled');await Promise.all([preloadImagesWithProgress(STORY_SLIDES.map(s=>assetUrl(s.image)),setIntroStoryProgress),sleep(520)]);setIntroStoryProgress(1);window.setTimeout(()=>{intro?.classList.add('intro-leaving');window.setTimeout(()=>{location.href=pageUrl('Geschichte.html');},620);},160);};
    $('startGameBtn')?.addEventListener('click',startGame);
    $('boardWelcomeContinueBtn')?.addEventListener('click',startBoardAfterWelcome);
    $('boardWelcomeModal')?.addEventListener('click',ev=>{if(ev.target===$('boardWelcomeModal'))startBoardAfterWelcome();});
    $('introScreen')?.addEventListener('click',ev=>{if(ev.target.closest('#startGameBtn'))return;startGame();});
    $('outroContinueBtn')?.addEventListener('click',()=>{hide($('outroScreen'));showBoard(false);});
    $('resetGameBtn')?.addEventListener('click',()=>{if(confirm('Spielbrett wirklich zurücksetzen?')){localStorage.removeItem(STORE);localStorage.removeItem(RETURN_STORE);location.href=pageUrl('index.html');}});
    $('unlockAllLevelsBtn')?.addEventListener('click',unlockAllLevels);
    $('openBoardMenuBtn')?.addEventListener('click',()=>document.body.classList.add('board-menu-open'));
    $('closeBoardMenuBtn')?.addEventListener('click',()=>document.body.classList.remove('board-menu-open'));
    $('closeScanBtn')?.addEventListener('click',closeScan);$('backToBoardBtn')?.addEventListener('click',closeScan);
    $('manualUnlockBtn')?.addEventListener('click',()=>unlockByCode($('manualCodeInput')?.value||''));
    $('randomUnlockBtn')?.addEventListener('click',unlockRandom);
    $('skipLevelBtn')?.addEventListener('click',skipCurrentLevel);
    $('toggleScannerBtn')?.addEventListener('click',()=>document.querySelector('.camera-box')?.classList.toggle('hidden'));
    $('scanJumpBottomBtn')?.addEventListener('click',()=>$('randomUnlockBtn')?.scrollIntoView({behavior:'smooth',block:'center'}));
    $('scanJumpTopBtn')?.addEventListener('click',()=>$('scanTitle')?.scrollIntoView({behavior:'smooth',block:'start'}));
    $('launchLevelBtn')?.addEventListener('click',handleLaunchLevel);
    $('encounterBackBtn')?.addEventListener('click',handleEncounterBack);
    $('levelUnlockedContinueBtn')?.addEventListener('click',handleLevelUnlockedContinue);
    $('magicCastleBtn')?.addEventListener('click',showMagicCastleModal);
    $('boardGuide')?.addEventListener('click',openScan);
    $('boardGuide')?.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();openScan();}});
    window.addEventListener('resize',()=>{resetBoardViewport();updateMapGeometry();},{passive:true});
    window.visualViewport?.addEventListener?.('resize',()=>{resetBoardViewport();updateMapGeometry();},{passive:true});
    window.addEventListener('pageshow',()=>{resetBoardViewport();updateMapGeometry();if(boardScreenIsVisible()){renderBoard();startMagicCastleBoardFloat();window.setTimeout(()=>maybeShowIslandStoryForNode(currentBoardNode(getState())),250);}else{removeBoardViewportBars();}},{passive:true});
    setTimeout(()=>applyReturnModal(),150);
  }

  function showBoard(firstStart=false,options={}) {
    const{playMusic=true}=options;document.body.classList.add('board-ui-active');
    hide($('introScreen'));show($('boardScreen'));hide($('openBoardMenuBtn'));hide($('belowBoard'));document.body.classList.remove('board-menu-open');
    resetBoardViewport();updateMapGeometry();renderBoard();startMagicCastleBoardFloat();
    window.setTimeout(()=>{if(!$('boardScreen')?.classList.contains('hidden'))maybeShowIslandStoryForNode(currentBoardNode(getState()));},350);
    if (playMusic)playSound('background',{loop:true,restart:!firstStart});
  }
  function showMagicCastleModal(ev) { ev?.preventDefault?.();const modal=$('magicCastleModal');if(!modal)return;show(modal);document.body.classList.add('magic-castle-modal-open');initMagicCastle();window.__refreshMagicCastleLocks?.(); }
  function hideMagicCastleModal() { hide($('magicCastleModal'));document.body.classList.remove('magic-castle-modal-open'); }

  let magicCastleBoardFloatRaf=0;
  function startMagicCastleBoardFloat() {
    const btn=$('magicCastleBtn');if(!btn)return;if(magicCastleBoardFloatRaf)cancelAnimationFrame(magicCastleBoardFloatRaf);
    const tick=now=>{const phase=(now%3600)/3600;btn.style.setProperty('transform',`translate(-50%, -50%) translateY(${(-18.9+Math.sin(phase*Math.PI*2)*9.5).toFixed(2)}px)`,'important');magicCastleBoardFloatRaf=requestAnimationFrame(tick);};magicCastleBoardFloatRaf=requestAnimationFrame(tick);
  }

  // ─── Board-Render & Carousel ───────────────────────────────────────────────

  let boardSlideTransition=null,boardSlideTimer=0;

  function ensureBoardShellAssets() { const img=$('boardImage');if(!img)return;img.src=JOURNEY_BOARD_BG;img.alt='Himmel über dem Königreich der Sinne';img.decoding='async';hide($('magicCastleBtn')); }
  function updateBoardStatusText(status,state=getState()) { if(!status)return;const nodes=getCarouselNodes(state),idx=Math.max(0,nodes.indexOf(currentBoardNode(state)));status.textContent=`${idx+1} / ${nodes.length}`; }
  function createIslandElement(entry,role) {
    const btn=document.createElement('button');btn.type='button';btn.className='board-carousel-island';btn.dataset.node=String(entry.node);btn.dataset.type=String(entry.type);btn.dataset.role=String(role||'current');if(role==='current')btn.classList.add('is-active');
    btn.innerHTML=`<img src="${entry.image}" alt="${esc(entry.title)}">`;
    btn.addEventListener('click',ev=>{ev.preventDefault();ev.stopPropagation();if(!boardSlideTransition)handleCarouselIslandClick(entry);});return btn;
  }
  function createBoardStageHero() { const el=document.createElement('div');el.className='board-stage-hero';el.setAttribute('aria-hidden','true');el.innerHTML=`<img class="hero-token" src="${ASSETS.hero}" alt="">`;return el; }
  function clearBoardSlideTimer() { if(boardSlideTimer){window.clearTimeout(boardSlideTimer);boardSlideTimer=0;} }
  function moveCarousel(delta) {
    if (boardSlideTransition||!delta)return;const state=getState(),nodes=getCarouselNodes(state),fromNode=currentBoardNode(state);
    const fromIdx=Math.max(0,nodes.indexOf(fromNode)),toIdx=Math.max(0,Math.min(nodes.length-1,fromIdx+delta));if(toIdx===fromIdx)return;
    const toNode=nodes[toIdx];boardSlideTransition={from:fromNode,to:toNode,direction:delta>0?1:-1};renderBoard();clearBoardSlideTimer();
    boardSlideTimer=window.setTimeout(()=>{setCurrentBoardNode(toNode);boardSlideTransition=null;renderBoard();window.setTimeout(()=>maybeShowIslandStoryForNode(toNode),260);},1120);
  }

  function setBoardDockSelection(kind=null) { boardDockSelection=kind;document.querySelectorAll('.board-dock-item').forEach(btn=>{btn.classList.toggle('is-selected',btn.dataset.kind===kind);btn.setAttribute('aria-pressed',btn.dataset.kind===kind?'true':'false');}); }
  function ensureBoardOverlayModals() {
    let treasureModal=$('treasureModal');
    if (!treasureModal){treasureModal=document.createElement('div');treasureModal.id='treasureModal';treasureModal.className='modal hidden';treasureModal.innerHTML=`<div class="modal-card board-popup-card" role="dialog" aria-modal="true" aria-labelledby="treasureTitle"><div class="board-popup-head"><div><span class="kicker">Schatzkammer</span><h2 id="treasureTitle">Gefundene Schlüssel</h2></div><button type="button" class="round-btn" data-close-treasure aria-label="Schließen">×</button></div><p class="board-popup-copy">Hier siehst du, welche Schlüssel bereits gesammelt wurden.</p><div id="treasureKeyGrid" class="board-key-grid"></div></div>`;treasureModal.addEventListener('click',ev=>{if(ev.target===treasureModal)hide(treasureModal);});treasureModal.querySelector('[data-close-treasure]')?.addEventListener('click',()=>hide(treasureModal));document.body.appendChild(treasureModal);}
    let optionsModal=$('boardOptionsModal');
    if (!optionsModal){optionsModal=document.createElement('div');optionsModal.id='boardOptionsModal';optionsModal.className='modal hidden';optionsModal.innerHTML=`<div class="modal-card board-popup-card" role="dialog" aria-modal="true" aria-labelledby="boardOptionsTitle"><div class="board-popup-head"><div><span class="kicker">Optionen</span><h2 id="boardOptionsTitle">Einstellungen & Aktionen</h2></div><button type="button" class="round-btn" data-close-options aria-label="Schließen">×</button></div><p class="board-popup-copy">Hier findest du die wichtigsten Einstellungen für das Spielbrett.</p><div class="board-option-actions"><button id="boardOptionsSoundBtn" class="game-btn secondary" type="button">Ton umschalten</button><a class="game-btn secondary" href="./codes.html">QR-Codes anzeigen</a><button id="boardOptionsUnlockBtn" class="game-btn secondary" type="button">Alle Schlüssel freischalten</button><button id="boardOptionsResetBtn" class="game-btn danger" type="button">Spielbrett zurücksetzen</button></div></div>`;optionsModal.addEventListener('click',ev=>{if(ev.target===optionsModal)hide(optionsModal);});optionsModal.querySelector('[data-close-options]')?.addEventListener('click',()=>hide(optionsModal));optionsModal.querySelector('#boardOptionsSoundBtn')?.addEventListener('click',()=>$('globalSpeakerBtn')?.click());optionsModal.querySelector('#boardOptionsUnlockBtn')?.addEventListener('click',()=>{unlockAllLevels();hide(optionsModal);});optionsModal.querySelector('#boardOptionsResetBtn')?.addEventListener('click',()=>{if(confirm('Spielbrett wirklich zurücksetzen?')){localStorage.removeItem(STORE);localStorage.removeItem(RETURN_STORE);location.href=pageUrl('index.html');}});document.body.appendChild(optionsModal);}
    return{treasureModal,optionsModal};
  }
  function showTreasureModal() { const{treasureModal}=ensureBoardOverlayModals(),grid=$('treasureKeyGrid');if(!grid){show(treasureModal);return;}const state=getState();grid.innerHTML='';BOARD_KEY_SUMMARY.forEach(item=>{const found=Boolean(state.keysFound?.[item.id]||biomeIsComplete(item.id,state));const card=document.createElement('div');card.className=`board-key-card ${found?'is-found':'is-missing'}`;card.innerHTML=`<img src="${item.image}" alt="${esc(item.title)} Schlüssel"><h3>${esc(item.title)}</h3><p>${found?'Schlüssel gefunden':'Noch nicht gefunden'}</p>`;grid.appendChild(card);});show(treasureModal); }
  function showBoardOptionsModal() { const{optionsModal}=ensureBoardOverlayModals();const soundBtn=$('boardOptionsSoundBtn');if(soundBtn)soundBtn.textContent=muted?'Ton einschalten':'Ton ausschalten';show(optionsModal); }
  function createBoardTopBar(title) { const top=document.createElement('div');top.className='board-world-topbar';top.innerHTML=`<img class="board-topbar-art" src="${BOARD_UI_ASSETS.topBar}" alt="Namensschild"><div class="board-world-topbar-text">${esc(title||'Königreich der Sinne')}</div>`;return top; }
  function createDockButton(kind,imgSrc,label,onClick) {
    const btn=document.createElement('button');btn.type='button';btn.className='board-dock-item';btn.dataset.kind=kind;btn.setAttribute('aria-label',label||kind);btn.setAttribute('aria-pressed',boardDockSelection===kind?'true':'false');
    btn.innerHTML=`<img src="${imgSrc}" alt="${esc(label||kind)}">${label?`<span class="board-dock-label">${esc(label)}</span>`:''}`;
    btn.addEventListener('click',ev=>{ev.preventDefault();ev.stopPropagation();setBoardDockSelection(kind);onClick?.();});return btn;
  }
  function createBoardBottomDock() {
    const bottom=document.createElement('div');bottom.className='board-market-bottombar';const items=document.createElement('div');items.className='board-dock-items';
    items.appendChild(createDockButton('options',BOARD_UI_ASSETS.options,BOARD_DOCK_LABELS.options,showBoardOptionsModal));
    items.appendChild(createDockButton('qr',BOARD_UI_ASSETS.qr,BOARD_DOCK_LABELS.qr,()=>openScan()));
    items.appendChild(createDockButton('treasure',BOARD_UI_ASSETS.treasure,BOARD_DOCK_LABELS.treasure,showTreasureModal));
    const grass=document.createElement('img');grass.className='board-bottom-foreground';grass.src=BOARD_UI_ASSETS.bottomGrass;grass.alt='Wiesenleiste';bottom.append(items,grass);return bottom;
  }
  function handleCarouselIslandClick(entry) {
    if (!entry)return;const state=getState();
    if (entry.type==='start'){openScan();return;}if(entry.type==='boss'){onLevelNode(BOSS_SLOT,'boss');return;}
    const slot=nextSlotForBiome(entry.type,state);if(Number.isInteger(slot)){onLevelNode(slot,entry.type);return;}showVillageScanReminder();
  }
  function renderBoard() {
    const inner=$('mapInner');if(!inner||!boardScreenIsVisible())return;
    document.body.classList.add('board-ui-active');ensureBoardShellAssets();
    document.querySelectorAll('.board-world-topbar,.board-market-bottombar').forEach(el=>el.remove());inner.replaceChildren();
    const state=getState(),nodes=getCarouselNodes(state),current=currentBoardNode(state);
    const currentEntry=getCarouselEntry(current,state)||getCarouselEntry('start',state),currentIndex=Math.max(0,nodes.indexOf(current));
    document.body.appendChild(createBoardTopBar(currentEntry?.title||'Königreich der Sinne'));
    const status=document.createElement('div');status.className='board-journey-status board-carousel-status';updateBoardStatusText(status,state);inner.appendChild(status);
    const stage=document.createElement('div');stage.className='board-carousel-stage';
    if (boardSlideTransition){stage.classList.add('is-sliding',boardSlideTransition.direction>0?'slide-next':'slide-prev');const track=document.createElement('div');track.className='board-carousel-track';const fromEntry=getCarouselEntry(boardSlideTransition.from,state),toEntry=getCarouselEntry(boardSlideTransition.to,state);if(fromEntry)track.appendChild(createIslandElement(fromEntry,'from'));if(toEntry)track.appendChild(createIslandElement(toEntry,'to'));stage.appendChild(track);}
    else if (currentEntry)stage.appendChild(createIslandElement(currentEntry,'current'));
    stage.appendChild(createBoardStageHero());inner.appendChild(stage);
    if (currentIndex>0){const left=document.createElement('button');left.type='button';left.className='board-carousel-arrow board-carousel-arrow-left';left.textContent='‹';left.setAttribute('aria-label','Vorherige Insel');left.addEventListener('click',ev=>{ev.preventDefault();ev.stopPropagation();moveCarousel(-1);});inner.appendChild(left);}
    if (currentIndex<nodes.length-1){const right=document.createElement('button');right.type='button';right.className='board-carousel-arrow board-carousel-arrow-right';right.textContent='›';right.setAttribute('aria-label','Nächste Insel');right.addEventListener('click',ev=>{ev.preventDefault();ev.stopPropagation();moveCarousel(1);});inner.appendChild(right);}
    document.body.appendChild(createBoardBottomDock());setBoardDockSelection(boardDockSelection);
    const guide=$('boardGuide');if(guide)guide.classList.add('hidden');
  }

  function onLevelNode(slot,senseId=null) {
    const state=getState(),id=senseId||state.slots?.[slot]||state.activeBiome;if(!id){showVillageScanReminder();return;}
    const current=currentBoardNode(state);
    if (id!=='boss'&&current!==id){setCurrentBoardNode(id);renderBoard();window.setTimeout(()=>maybeShowIslandStoryForNode(id),220);return;}
    if (id==='boss'&&current!=='boss'){setCurrentBoardNode('boss');renderBoard();window.setTimeout(()=>maybeShowIslandStoryForNode('boss'),220);return;}
    const next=nextSlotForBiome(id,state);if(Number.isInteger(next))showEncounter(id,next);else showVillageScanReminder();
  }
  function unlockSense(id,{silent=false}={}) {
    if (!BIOME_LEVEL_PLAN[id])return false;const state=getState();
    if (id==='boss'){if(!finalBridgeUnlocked(state))return false;state.activeBiome='boss';state.slots[BOSS_SLOT]='boss';state.boardCurrentNode='boss';setState(state);if(!silent)showIslandUnlockedModal('boss');renderBoard();return true;}
    if (!KEY_ORDER.includes(id))return false;
    if (!state.journeyOrder.includes(id))state.journeyOrder.push(id);
    const firstSlot=firstSlotForBiome(id);if(Number.isInteger(firstSlot)&&!state.slots[firstSlot])state.slots[firstSlot]=id;
    state.activeBiome=id;state.boardCurrentNode=currentBoardNode(state);setState(state);if(!silent)showIslandUnlockedModal(id);renderBoard();return true;
  }

  // ─── Scan ──────────────────────────────────────────────────────────────────

  let scanIndex=null,scanner=null,scanCloseTimer=null;
  function setScanMessage(text,bad=false){const msg=$('scanMessage');if(!msg)return;msg.textContent=text;msg.className=text?`message ${bad?'bad':'ok'}`:'message hidden';}
  function resetScanModalState(){if(scanCloseTimer){clearTimeout(scanCloseTimer);scanCloseTimer=null;}document.body.classList.remove('market-popup-open');const modal=$('scanModal');modal?.classList.remove('market-scan-modal','is-closing','stage-popup');hide(modal);scanIndex=null;}
  function openScan(){stopScanner();if(scanCloseTimer){clearTimeout(scanCloseTimer);scanCloseTimer=null;}scanIndex=null;const modal=$('scanModal');document.body.classList.add('market-popup-open');modal?.classList.add('market-scan-modal');modal?.classList.remove('stage-popup','is-closing');modal?.style.removeProperty('--popup-bg');if($('manualCodeInput'))$('manualCodeInput').value='';if($('scanHelp'))$('scanHelp').textContent='';setScanMessage('');show(modal);setTimeout(startScanner,120);}
  function closeScan(){stopScanner();const modal=$('scanModal');document.body.classList.remove('market-popup-open');if(!modal||modal.classList.contains('hidden')){scanIndex=null;playSound('background',{loop:true,restart:false});return;}modal.classList.add('is-closing');scanIndex=null;if(scanCloseTimer)clearTimeout(scanCloseTimer);scanCloseTimer=setTimeout(()=>{hide(modal);modal.classList.remove('market-scan-modal','is-closing','stage-popup');scanCloseTimer=null;playSound('background',{loop:true,restart:false});},420);}
  async function waitForScannerLibrary(ms=2200){const t0=Date.now();while(!window.Html5Qrcode&&Date.now()-t0<ms)await sleep(80);return Boolean(window.Html5Qrcode);}
  async function startScanner(){const info=$('cameraInfo');if(info)info.textContent='Kamera wird vorbereitet …';try{if(!await waitForScannerLibrary())throw new Error('Scanner-Bibliothek nicht verfügbar.');scanner=new window.Html5Qrcode('qrReader');const rect=$('qrReader')?.getBoundingClientRect(),side=Math.max(130,Math.round(Math.min(rect?.width||180,rect?.height||180)*0.86));await scanner.start({facingMode:'environment'},{fps:8,qrbox:{width:side,height:side}},txt=>unlockByCode(txt));if(info)info.textContent='';}catch(e){if(info)info.textContent='QR-Scanner nicht verfügbar.';}}
  async function stopScanner(){try{if(scanner)await scanner.stop();}catch(_){}scanner=null;}

  function unlockByCode(raw){const code=String(raw||'').trim().toUpperCase();const entry=Object.values(SENSES).find(s=>s.code?.toUpperCase()===code||s.id.toUpperCase()===code.replace('SINNE-',''));if(!entry){setScanMessage('Code nicht erkannt.',true);return;}const state=getState();if(state.activeBiome&&Number.isInteger(nextSlotForBiome(state.activeBiome,state))){setScanMessage('Schließe zuerst das bereits geöffnete Biom ab.',true);return;}if(!Number.isInteger(nextSlotForBiome(entry.id,state))){setScanMessage('Dieses Biom ist bereits abgeschlossen.',true);return;}_doUnlockSense(entry.id);}
  function unlockRandom(){const state=getState(),candidates=Object.keys(SENSES).filter(id=>Number.isInteger(nextSlotForBiome(id,state)));if(!candidates.length){setScanMessage('Es gibt kein freies Biom mehr.',true);return;}_doUnlockSense(candidates[Math.floor(Math.random()*candidates.length)]);}
  async function _doUnlockSense(id){await stopScanner();resetScanModalState();const state=getState();state.started=true;state.activeBiome=id;state.heroIndex=null;const slot=nextSlotForBiome(id,state);if(Number.isInteger(slot))state.slots[slot]=id;if(!state.journeyOrder.includes(id))state.journeyOrder.push(id);setState(state);renderBoard();playSound('levelunlocked');playSound('background',{loop:true,restart:false});}

  function skipCurrentLevel(){const state=getState(),slot=state.activeBiome?nextSlotForBiome(state.activeBiome,state):null;if(!Number.isInteger(slot))return;stopScanner();resetScanModalState();state.completed[slot]=true;state.heroIndex=null;if(!nextSlotForBiome(state.activeBiome,state))state.activeBiome=null;setState(state);renderBoard();localStorage.setItem(RETURN_STORE,JSON.stringify({type:'unlocked',meta:{slot,skipped:true,returnHome:true}}));applyReturnModal();}
  function unlockAllLevels(){if(!confirm('Alle Schluessel zum Testen bereitstellen?'))return;const state=getState();state.started=state.introUsed=true;state.heroIndex=null;state.activeBiome=null;state.keysFound={sehen:true,hoeren:true,riechen:true,schmecken:true,fuehlen:true,boss:false};state.removedLocks={...state.removedLocks,boss:false};setState(state);localStorage.removeItem(RETURN_STORE);document.body.classList.remove('board-menu-open');hide($('introScreen'));show($('boardScreen'));hide($('openBoardMenuBtn'));hide($('belowBoard'));renderBoard();playSound('levelunlocked');}

  // ─── Encounter ─────────────────────────────────────────────────────────────

  function showEncounter(id,index){const isBoss=id==='boss',data=isBoss?BOSS:SENSES[id];if(!data)return;const meta={isBoss,slot:index,senseId:id};window.pendingLaunch={url:pageUrl(isBoss?`level.html?type=boss&slot=${index}`:`level.html?sense=${encodeURIComponent(id)}&slot=${index}`),meta};const modal=$('encounterModal');applyStagePopup(modal,meta);modal?.classList.remove('test-placeholder-modal');$('launchLevelBtn').textContent=isBoss?'Finale starten':'Level starten';$('encounterBackBtn').textContent='Wegrennen';$('encounterImage').src=data.enemy;$('encounterImage').alt=data.enemyName;$('encounterKicker').textContent=isBoss?'Finale freigeschaltet':'Level freigeschaltet';$('encounterTitle').textContent=data.enemyName;$('encounterSpeech').textContent=data.speech;show(modal);}

  const PLACEHOLDER_DATA={
    1: {kicker:'',title:'Test',text:done=>done?'Du kannst das Minispiel erneut spielen.':'',launchText:done=>done?'Spiel erneut starten':'Spiel starten',backText:done=>done?'Zurück':'Überspringen',imgSrc:()=>ASSETS.hero,imgAlt:()=>getHeroName(),url:slot=>`minigame.html?slot=${slot}`},
    3: {kicker:'Sehsinn-Memory',title:'Augen auf!',text:done=>done?'Du kannst das Sehsinn-Memory erneut spielen.':'Finde gleiche Symbole und springe über Blendkugeln. So trainierst du genaues Hinsehen, Formen erkennen und schnelle Reaktion auf sichtbare Warnsignale.',launchText:done=>done?'Memory erneut starten':'Spiel starten',backText:done=>done?'Zurück':'Überspringen',imgSrc:()=>assetUrl('assets/images/minigame2/auge.png'),imgAlt:()=>'Auge',url:slot=>`minigame2.html?slot=${slot}`},
    5: {kicker:'Riechsinn-Rohrsystem',title:'Folge dem Duft!',text:done=>done?'Du kannst das Rohr-Rätsel erneut spielen.':'Drehe die Rohrstücke so, dass der Geruch vom Ventil durch alle vier Luftreinigungsfilter bis zum oberen Endpunkt gelangt.',launchText:done=>done?'Duftrohre erneut starten':'Spiel starten',backText:done=>done?'Zurück':'Überspringen',imgSrc:()=>assetUrl('assets/images/minigame2/nase.png'),imgAlt:()=>'Nase',url:slot=>`minigame3.html?slot=${slot}`},
    7: {kicker:'Tastsinn-Kran',title:'Weich oder spitz?',text:done=>done?'Du kannst den Tastsinn-Kran erneut spielen.':'Steuere den Kran und sammle nur weiche Gegenstände. Spitze Dinge lösen Schmerz aus und kosten ein Herz.',launchText:done=>done?'Fühl-Kran erneut starten':'Spiel starten',backText:done=>done?'Zurück':'Überspringen',imgSrc:()=>ASSETS.hero,imgAlt:()=>getHeroName(),url:slot=>`minigame4.html?slot=${slot}`},
    11:{kicker:'Kronenpfad',title:'Der Weg zur Krone',text:()=>'Hier kommt spaeter ein neues Minispiel hin. Fuer jetzt zaehlt dieser Platzhalter als geschafft.',launchText:()=>'Platzhalter schaffen',backText:()=>'Wegrennen',imgSrc:()=>ASSETS.winHero,imgAlt:()=>`${getHeroName()} auf dem Weg zur Krone`}
  };

  function showPlaceholder(index){const meta={isBoss:false,slot:index,placeholder:true};const modal=$('encounterModal');applyStagePopup(modal,meta);const cfg=PLACEHOLDER_DATA[index],done=Boolean(getState().completed[index]);window.pendingLaunch={placeholder:true,...(cfg||{}),slot:index,meta};modal?.classList.toggle('test-placeholder-modal',index===1);$('launchLevelBtn').textContent=cfg?.launchText?.(done)||(index===LEVEL_COUNT-1?'Zum Finale':'Weiter');$('encounterBackBtn').textContent=cfg?.backText?.(done)||'Wegrennen';$('encounterImage').src=cfg?.imgSrc?.()||ASSETS.winHero;$('encounterImage').alt=cfg?.imgAlt?.()||`${getHeroName()} macht weiter`;$('encounterKicker').textContent=cfg?.kicker||'Zwischenstation';$('encounterTitle').textContent=cfg?.title||`Level ${index+1}`;$('encounterSpeech').textContent=cfg?.text?.(done)||'';show(modal);}

  function handleEncounterBack(){const pl=window.pendingLaunch;if(pl?.minigame||pl?.minigame2||pl?.minigame3||pl?.minigame4){if(getState().completed[pl.slot]){hide($('encounterModal'));return;}completePlaceholder(pl.slot);return;}escapeToBoard(pl?.meta);}
  function handleLaunchLevel(){const pl=window.pendingLaunch;if(!pl)return;if(pl.minigame||pl.minigame2||pl.minigame3||pl.minigame4){hide($('encounterModal'));location.href=pageUrl(pl.url||'index.html');return;}if(pl.placeholder){completePlaceholder(pl.slot);return;}location.href=pl.url;}
  async function completePlaceholder(index){hide($('encounterModal'));completeMinigameSlot(index);applyReturnModal();}
  function completeMinigameSlot(index){const state=getState(),senseId=state.slots[index]||slotSenseId(index);state.started=true;state.completed[index]=true;state.heroIndex=index;state.slots[index]=senseId;const nextSlot=nextSlotForBiome(senseId,state);if(Number.isInteger(nextSlot)){state.activeBiome=senseId;state.slots[nextSlot]=senseId;}else state.activeBiome=null;setState(state);playSound('levelunlocked');localStorage.setItem(RETURN_STORE,JSON.stringify({type:'unlocked',meta:{slot:index,placeholder:true,senseId,returnHome:false}}));}
  function escapeToBoard(meta){closeScan();hide($('encounterModal'));localStorage.setItem(RETURN_STORE,JSON.stringify({type:'escape',meta}));applyReturnModal();}
  function showOutro(){stopSound('background');document.body.classList.remove('board-ui-active');removeBoardViewportBars();hide($('introScreen'));hide($('boardScreen'));hide($('belowBoard'));hide($('openBoardMenuBtn'));show($('outroScreen'));playSound('levelunlocked');}
  async function handleLevelUnlockedContinue(){hide($('levelUnlockedModal'));playSound('background',{loop:true,restart:true});renderBoard();}

  function applyReturnModal(){const raw=localStorage.getItem(RETURN_STORE);if(!raw)return;localStorage.removeItem(RETURN_STORE);let data;try{data=JSON.parse(raw);}catch(_){return;}const modal=$('levelUnlockedModal');if(!modal)return;applyStagePopup(modal,data.meta);const img=modal.querySelector('img'),title=$('levelUnlockedTitle'),kicker=$('levelUnlockedKicker'),text=$('levelUnlockedText');stopSound('background');
    if(data.type==='escape'){img.src=ASSETS.escapeHero;kicker.textContent='';title.textContent='Du bist entkommen.';text.textContent='Du bist zurück auf dem Spielbrett. Tippe auf die Startinsel, um im Dorf einen neuen Steckbrief zu scannen.';}
    else if(data?.meta?.foundKey){img.src=data.meta.foundKey.image;kicker.textContent='Belohnung';title.textContent=`${data.meta.foundKey.label}-Schlüssel gefunden`;text.textContent='Der Schlüssel schwebt nun vor der Insel. Scanne im Dorf auf der Startinsel den nächsten Steckbrief.';playSound('levelunlocked');}
    else{const senseId=data?.meta?.senseId||slotSenseId(Number(data?.meta?.slot)),nextSlot=nextSlotForBiome(senseId,getState());img.src=ASSETS.winHero;kicker.textContent='Erfolg';if(senseId==='boss'&&Number.isInteger(nextSlot)){title.textContent='Krone freigeschaltet';text.textContent='Der Weg zur Kronenplattform ist frei. Tippe auf die Krone, um den Roboter zu bekaempfen.';}else if(Number.isInteger(nextSlot)){title.textContent='Fragen-Level sichtbar';text.textContent='Das Quiz ist nun auf der Insel freigeschaltet. Tippe die Insel erneut an.';}else if(senseId!=='boss'&&finalBridgeUnlocked(getState())){title.textContent='Finale Insel freigeschaltet';text.textContent='Alle fünf Inseln sind abgeschlossen. Die finale Insel wurde automatisch freigeschaltet.';}else{title.textContent='Zurück ins Dorf';text.textContent='Scanne im Dorf auf der Startinsel einen neuen Steckbrief, um die nächste Insel freizuschalten.';} playSound('levelunlocked');}
    show(modal);renderBoard();
  }

  // ─── Insel-Story-Modals ────────────────────────────────────────────────────

  function showVillageScanReminder(){const modal=ensureIslandUnlockedModal();modal.querySelector('[data-island-image]').src=JOURNEY_ISLAND_IMAGES.start;modal.querySelector('[data-island-kicker]').textContent='Nächster Steckbrief';modal.querySelector('[data-island-title]').textContent='Zurück zum Marktplatz';modal.querySelector('[data-island-text]').textContent='Scanne am Marktbrett auf der Startinsel einen neuen Steckbrief, um die nächste Insel freizuschalten.';show(modal);}
  function ensureIslandUnlockedModal(){let modal=$('islandUnlockedModal');if(modal)return modal;modal=document.createElement('div');modal.id='islandUnlockedModal';modal.className='modal hidden island-unlocked-modal';modal.innerHTML=`<div class="modal-card encounter-card island-unlocked-card"><img data-island-image class="character-img" alt="Neue Insel"><div class="encounter-text"><span data-island-kicker class="kicker">Insel</span><h2 data-island-title>Neue Insel freigeschaltet</h2><p data-island-text></p><div class="button-line center"><button class="game-btn primary" type="button" data-island-close>Weiter</button></div></div></div>`;modal.querySelector('[data-island-close]').addEventListener('click',()=>hide(modal));document.body.appendChild(modal);return modal;}
  function showIslandUnlockedModal(id){const modal=ensureIslandUnlockedModal(),label=JOURNEY_LABELS[id]||BIOME_BY_SENSE[id]?.label||'Neue Insel';modal.querySelector('[data-island-image]').src=JOURNEY_ISLAND_IMAGES[id]||JOURNEY_ISLAND_IMAGES.start;modal.querySelector('[data-island-kicker]').textContent=id==='boss'?'Finale Insel':'Neue Insel freigeschaltet';modal.querySelector('[data-island-title]').textContent=label;modal.querySelector('[data-island-text]').textContent=id==='boss'?'Die finale Insel wurde freigeschaltet. Blättere nach rechts bis zum Magieschloss.':`Die ${label} wurde freigeschaltet. Nutze den Pfeil rechts, um zur neuen Insel zu reisen.`;show(modal);}
  function ensureIslandStoryModal(){let modal=$('islandStoryModal');if(modal)return modal;modal=document.createElement('div');modal.id='islandStoryModal';modal.className='modal hidden island-story-modal';modal.innerHTML=`<div class="modal-card island-story-card"><h2 data-island-story-title>Insel</h2><p data-island-story-text></p><div class="button-line center"><button class="game-btn primary" type="button" data-island-story-close>Weiter</button></div></div>`;modal.querySelector('[data-island-story-close]').addEventListener('click',()=>hide(modal));document.body.appendChild(modal);return modal;}
  function maybeShowIslandStoryForNode(node){if(!boardScreenIsVisible()||!node||node==='start')return;const state=getState(),key=node==='boss'?'boss':node;if(!state.seenIslandStories||state.seenIslandStories[key])return;state.seenIslandStories[key]=true;setState(state);const modal=ensureIslandStoryModal();modal.querySelector('[data-island-story-title]').textContent=JOURNEY_LABELS[key]||'Neue Insel';modal.querySelector('[data-island-story-text]').textContent=heroText(ISLAND_STORIES[key]||'Eine neue Insel liegt vor dir.');show(modal);}

  // ─── Level-Screen ──────────────────────────────────────────────────────────

  function initLevel(){
    addSpeaker();const isBoss=qs('type')==='boss',slot=Number(qs('slot')),senseId=isBoss?'boss':qs('sense'),state=getState();
    if(!Number.isInteger(slot)||slot<0||slot>=LEVEL_COUNT){location.replace(pageUrl('index.html'));return;}
    if(isBoss){if(state.slots[slot]!=='boss'){state.slots[slot]='boss';state.heroIndex=slot;setState(state);}}
    else if(!SENSES[senseId]){location.replace(pageUrl('index.html'));return;}
    else if(state.slots[slot]!==senseId){state.slots[slot]=senseId;state.heroIndex=slot;setState(state);}
    const data=isBoss?BOSS:SENSES[senseId],meta={isBoss,slot,senseId};
    document.body.style.setProperty('--stage-bg',`url("${bgForMeta(meta)}")`);
    $('levelBadge').textContent=`Level ${slot+1}`;const enemy=$('levelEnemy');if(enemy){enemy.src=data.enemy;enemy.alt=data.enemyName;}
    const content=$('levelContent');if(content)content.innerHTML=`<p>${esc(data.intro)}</p>`+data.content.map(p=>`<p>${esc(p)}</p>`).join('');
    const questions=getQuestionsForId(senseId);
    const opts=$('quizOptions');if(opts)opts.innerHTML=questions.map((q,qi)=>`<article class="quiz-question-card"><h3>Frage ${qi+1}: ${esc(q.q)}</h3>${q.a.map((a,ai)=>`<label class="quiz-option"><input type="radio" name="quizAnswer_${qi}" value="${ai}"><span>${esc(a)}</span></label>`).join('')}</article>`).join('');
    preloadBattleAssets(data,meta);prefetchPage(pageUrl('battle.html'));
    $('checkAnswerBtn')?.addEventListener('click',()=>startBattleFromLevel(data,meta,questions));
    $('runAwayBtn')?.addEventListener('click',()=>{localStorage.setItem(RETURN_STORE,JSON.stringify({type:'escape',meta}));location.href=pageUrl('index.html');});
  }
  function startBattleFromLevel(data,meta,questions){
    const selected=questions.map((_,qi)=>document.querySelector(`input[name="quizAnswer_${qi}"]:checked`));if(selected.some(x=>!x)){const f=$('quizFeedback');f.textContent='Bitte beantworte zuerst alle fünf Fragen.';f.className='message bad';return;}
    const answers=selected.map(x=>Number(x.value)),results=answers.map((a,i)=>a===questions[i].correct);
    const payload={senseId:data.id,meta,answers,results,time:Date.now()},serialized=JSON.stringify(payload);
    sessionStorage.setItem(BATTLE_STORE,serialized);localStorage.setItem(BATTLE_BACKUP_STORE,serialized);
    let overlay=document.createElement('div');overlay.className='page-transition-overlay';overlay.innerHTML=`<div>${esc('Kampf wird geladen …')}</div>`;document.body.appendChild(overlay);requestAnimationFrame(()=>overlay.classList.add('active'));
    setTimeout(()=>location.assign(pageUrl('battle.html')),420);
  }

  // ─── Battle-Screen ─────────────────────────────────────────────────────────

  function initBattle(){
    addSpeaker();stopSound('background');stopAllBattleAudio();
    let payload;try{payload=JSON.parse(sessionStorage.getItem(BATTLE_STORE)||localStorage.getItem(BATTLE_BACKUP_STORE)||'');}catch(_){}
    if(!payload?.meta){location.replace(pageUrl('index.html'));return;}
    const meta=payload.meta,data=dataForMeta(meta);if(!data){location.replace(pageUrl('index.html'));return;}
    const els=battleElements();document.body.style.setProperty('--battle-bg',`url("${bgForMeta(meta)}")`);
    if(els.kampfTitle)els.kampfTitle.src=ASSETS.text.kampf;if(els.introHero){els.introHero.src=ASSETS.hero;els.introHero.alt=getHeroName();const nameNode=els.introHero.closest('.battle-v84-intro-side')?.querySelector('.battle-v84-name');if(nameNode)nameNode.textContent=getHeroName();}
    if(els.introEnemy){els.introEnemy.src=data.enemy;els.introEnemy.alt=data.enemyName;}if(els.introEnemyName)els.introEnemyName.textContent=data.enemyName;if(els.preloadStatus)els.preloadStatus.textContent='Kampf wird vorbereitet ...';
    const prepared=prepareBattle(data,payload).then(rounds=>{if(els.preloadStatus)els.preloadStatus.textContent='Alles bereit.';return rounds;});
    els.back?.addEventListener('click',()=>history.back());
    let battleStarting=false;
    els.start?.addEventListener('click',async()=>{if(battleStarting)return;battleStarting=true;els.start.disabled=true;stopAllBattleAudio();const audioReady=startBattleAudioFromButton();setBattleMode('loading');try{const rounds=await prepared;await Promise.race([audioReady,sleep(700)]);await sleep(180);await runBattleSequence(payload,data,meta,rounds);}catch(err){console.error('Battle konnte nicht gestartet werden:',err);battleStarting=false;els.start.disabled=false;setBattleMode('intro');if(els.preloadStatus)els.preloadStatus.textContent='Bitte noch einmal starten.';}});
  }
  function battleElements(){return{intro:$('battleIntroScene'),loading:$('battleLoadingScene'),sequence:$('battleSequenceScene'),start:$('battleStartBtn'),back:$('battleBackBtn'),preloadStatus:$('battlePreloadStatus'),kampfTitle:$('battleKampfText'),introHero:$('battleHero'),introEnemy:$('battleEnemy'),introEnemyName:$('battleEnemyName'),dots:$('sequenceDots'),label:$('sequenceLabel'),status:$('sequenceStatus'),roundText:$('sequenceTextImage'),roundActor:$('sequenceImage'),finalHint:$('finalHint'),finalCloud:$('finalCloudImage'),resultStage:$('finalResultStage'),resultText:$('resultTextImage'),outcomeGroup:$('outcomeGroup'),victoryHero:$('victoryHeroImage'),outcome:$('outcomeImage'),action:$('battleAction')};}
  function setBattleMode(mode){document.body.dataset.battleMode=mode;const els=battleElements();hide(els.intro);hide(els.loading);hide(els.sequence);if(mode==='intro')show(els.intro);if(mode==='loading')show(els.loading);if(mode==='sequence')show(els.sequence);}
  function showFinalHint(text='Tippe auf die Wolke'){const n=$('finalHint');if(!n)return;n.textContent=text;show(n);}
  function hideFinalHint(){hide($('finalHint'));}
  function waitForRenderable(node){if(!node)return Promise.resolve();return new Promise(resolve=>{let settled=false;const done=()=>requestAnimationFrame(()=>requestAnimationFrame(resolve));const finish=()=>{if(settled)return;settled=true;try{node.onload=node.onerror=null;}catch(_){}done();};if(node.complete&&node.naturalWidth>0){done();return;}node.onload=finish;node.onerror=finish;window.setTimeout(finish,1400);});}
  function loadImageAsset(src){return new Promise(resolve=>{if(!src){resolve();return;}const img=new Image();let done=false;const finish=()=>{if(done)return;done=true;img.onload=img.onerror=null;resolve();};img.decoding='async';img.onload=finish;img.onerror=finish;img.src=src;if(img.complete)finish();window.setTimeout(finish,1600);});}
  function buildBattleRounds(results=[]){const cursor={richtig:0,falsch:0};return results.slice(0,5).map((ok,index)=>{const type=ok?'richtig':'falsch',number=(cursor[type]++%3)+1,list=ok?ASSETS.correct:ASSETS.wrong;return{index,ok,type,number,actorSrc:list[number-1],textSrc:ok?ASSETS.text.richtig:ASSETS.text.falsch,soundKey:`${type}_${number}`,alt:ok?`Treffer ${number}`:`Autsch ${number}`};});}
  function prepareBattle(data,payload){const rounds=buildBattleRounds(payload.results);const imgs=[ASSETS.text.kampf,ASSETS.hero,ASSETS.triumphHero,ASSETS.loseHero,ASSETS.final,ASSETS.text.gewonnen,ASSETS.text.verloren,data.enemy,data.defeated,...rounds.flatMap(r=>[r.actorSrc,r.textSrc])];return Promise.all(imgs.map(loadImageAsset)).then(()=>rounds);}
  async function runBattleSequence(payload,data,meta,rounds){const els=battleElements();resetBattleStage(els);setBattleMode('sequence');if(els.sequence){els.sequence.classList.remove('hidden');els.sequence.style.opacity='1';els.sequence.style.transform='none';}const totalSteps=rounds.length+1;if(els.dots)els.dots.innerHTML='<span></span>'.repeat(totalSteps);await sleep(340);for(const round of rounds)await playBattleRound(els,round,totalSteps);await playBattleFinal(els,payload.results.filter(v=>!v).length<=1,data,meta,totalSteps);}
  function resetBattleStage(els){hideFinalHint();hide(els.action);if(els.action)els.action.innerHTML='';if(els.label)els.label.textContent='';if(els.status)els.status.textContent='';if(els.roundText){els.roundText.className='battle-v84-hit-text hidden';els.roundText.removeAttribute('src');}if(els.roundActor){els.roundActor.className='battle-v84-answer-actor hidden';els.roundActor.removeAttribute('src');}if(els.finalCloud){els.finalCloud.className='battle-v84-final-cloud hidden';els.finalCloud.removeAttribute('src');els.finalCloud.onclick=null;}if(els.resultStage)els.resultStage.className='battle-v84-result-stage hidden';if(els.resultText){els.resultText.removeAttribute('src');els.resultText.alt='';}if(els.victoryHero){els.victoryHero.className='battle-v84-victory-hero hidden';els.victoryHero.removeAttribute('src');}if(els.outcome){els.outcome.removeAttribute('src');els.outcome.alt='';}}
  async function playBattleRound(els,round,totalSteps){if(els.label)els.label.textContent=`Frage ${round.index+1}`;if(els.status)els.status.textContent=round.ok?'Treffer':'Autsch';setBattleDot(els.dots,round.index);els.roundText.src=round.textSrc;els.roundText.alt=round.ok?'Treffer':'Autsch';els.roundActor.src=round.actorSrc;els.roundActor.alt=round.alt;els.roundText.className='battle-v84-hit-text is-preparing';els.roundActor.className='battle-v84-answer-actor is-preparing';await Promise.all([waitForRenderable(els.roundText),waitForRenderable(els.roundActor)]);els.roundText.getAnimations?.().forEach(a=>a.cancel());els.roundActor.getAnimations?.().forEach(a=>a.cancel());void els.roundText.offsetWidth;void els.roundActor.offsetWidth;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));els.roundText.className='battle-v84-hit-text is-in';els.roundActor.className='battle-v84-answer-actor is-in';void els.roundText.offsetWidth;void els.roundActor.offsetWidth;await new Promise(r=>requestAnimationFrame(r));void playBattleCue(round.soundKey);await sleep(2150);els.roundText.className='battle-v84-hit-text hidden';els.roundActor.className='battle-v84-answer-actor hidden';if(totalSteps)setBattleDot(els.dots,round.index);}
  function setBattleDot(dots,activeIndex){if(!dots)return;[...dots.children].forEach((d,i)=>{d.className=i===activeIndex?'active':'';}); }
  async function playBattleFinal(els,won,data,meta,totalSteps){setBattleDot(els.dots,totalSteps-1);if(els.label)els.label.textContent='Finale';if(els.status)els.status.textContent='';els.finalCloud.src=ASSETS.final;els.finalCloud.alt='Finale Wolke';els.finalCloud.className='battle-v84-final-cloud is-preparing';await waitForRenderable(els.finalCloud);void els.finalCloud.offsetWidth;els.finalCloud.className='battle-v84-final-cloud is-idle is-pulsing';startFinalCloudPulse(els.finalCloud);showFinalHint('Tippe auf die Wolke');void playBattleCue('final',{stopSame:true});await new Promise(resolve=>{const finish=()=>{els.finalCloud.onclick=null;els.finalHint.onclick=null;resolve();};els.finalCloud.onclick=finish;els.finalHint.onclick=finish;});hideFinalHint();stopSound('final');stopSound('battle_background');stopFinalCloudPulse(els.finalCloud);configureBattleResult(els,won,data);show(els.resultStage);void els.resultStage?.offsetWidth;els.finalCloud.className='battle-v84-final-cloud is-reveal';await sleep(560);els.resultStage.classList.add('is-visible',won?'is-win':'is-loss');void playBattleCue(won?'win':'lose',{stopSame:true});await sleep(1120);els.finalCloud.className='battle-v84-final-cloud hidden';renderBattleActions(won,meta,els.action);}
  function configureBattleResult(els,won,data){els.resultText.src=won?ASSETS.text.gewonnen:ASSETS.text.verloren;els.resultText.alt=won?'Gewonnen':'Verloren';els.outcome.src=won?data.defeated:ASSETS.loseHero;els.outcome.alt=won?`${data.enemyName} besiegt`:`${getHeroName()} besiegt`;if(els.outcomeGroup)els.outcomeGroup.className=`battle-v84-outcome-group ${won?'is-win':'is-loss'}`;if(won){els.victoryHero.src=ASSETS.triumphHero;els.victoryHero.alt=`${getHeroName()} triumphiert`;els.victoryHero.className='battle-v84-victory-hero';}else{els.victoryHero.className='battle-v84-victory-hero hidden';els.victoryHero.removeAttribute('src');}}
  function renderBattleActions(won,meta,action){if(!action)return;action.innerHTML='';show(action);if(won){const btn=document.createElement('button');btn.className='game-btn primary';btn.type='button';btn.textContent='Weiter';btn.onclick=()=>finishBattleWin(meta);action.appendChild(btn);}else{const retry=document.createElement('button');retry.className='game-btn primary';retry.type='button';retry.textContent='Neuer Versuch';retry.onclick=()=>location.href=pageUrl(meta.isBoss?`level.html?type=boss&slot=${meta.slot}`:`level.html?sense=${encodeURIComponent(meta.senseId)}&slot=${meta.slot}`);const run=document.createElement('button');run.className='game-btn muted';run.type='button';run.textContent='Wegrennen';run.onclick=()=>{localStorage.setItem(RETURN_STORE,JSON.stringify({type:'escape',meta}));location.href=pageUrl('index.html');};action.append(retry,run);}}
  function finishBattleWin(meta){const state=getState();let foundKey=null;if(meta.isBoss){state.bossCompleted=true;state.completed[meta.slot]=true;state.heroIndex=meta.slot;state.activeBiome=null;}else{state.completed[meta.slot]=true;state.heroIndex=meta.slot;const senseId=meta.senseId||slotSenseId(meta.slot),nextSlot=nextSlotForBiome(senseId,state);state.activeBiome=Number.isInteger(nextSlot)?senseId:null;if(biomeIsComplete(senseId,state)&&KEY_ORDER.includes(senseId)&&!state.keysFound[senseId]){state.keysFound[senseId]=true;foundKey=keyInfoForSenseId(senseId);}}setState(state);sessionStorage.removeItem(BATTLE_STORE);localStorage.removeItem(BATTLE_BACKUP_STORE);const senseId=meta.senseId||slotSenseId(meta.slot),shouldReturn=!meta.isBoss&&!Number.isInteger(nextSlotForBiome(senseId,state));localStorage.setItem(RETURN_STORE,JSON.stringify({type:'unlocked',meta:{...meta,foundKey,returnHome:shouldReturn,returnVia:null}}));location.href=pageUrl('index.html');}

  // ─── Minispiel 1 (Fangen) ──────────────────────────────────────────────────

  function initMiniGame(){
    addSpeaker();stopSound('background');stopSound('battle_background');playSound('minigame_background',{loop:true,restart:true});
    const hero=$('miniHero'),stage=document.querySelector('.mini-game-stage'),controls=document.querySelector('.mini-controls'),leftBtn=$('miniLeftBtn'),rightBtn=$('miniRightBtn');
    const jumpBtn=$('miniJumpBtn'),settingsBtn=$('miniSettingsBtn'),menu=$('miniMenu'),closeMenu=$('miniCloseMenuBtn'),boardBtn=$('miniBackBoardBtn');
    const resultModal=$('miniResult'),resultTitle=$('miniResultTitle'),resultText=$('miniResultText'),resultImage=$('miniResultImage');
    const retryBtn=$('miniRetryBtn'),resultBoardBtn=$('miniResultBoardBtn'),hud=$('miniHud');
    if(!hero||!stage)return;hero.alt=getHeroName();
    const heroClone=hero.cloneNode(false);heroClone.id='miniHeroClone';heroClone.className=`${hero.className} mini-hero-clone`;heroClone.alt='';heroClone.setAttribute('aria-hidden','true');heroClone.style.visibility='hidden';hero.after(heroClone);
    const miniMeta={slot:Number(qs('slot'))||0,isBoss:false};stage.style.setProperty('--mini-stage-bg',`url("${bgForMeta(miniMeta)}")`);
    const SPRITES={walkRight1:assetUrl('assets/images/minigame/mini_walk_right_1.png'),walkRight2:assetUrl('assets/images/minigame/mini_walk_right_2.png'),walkLeft1:assetUrl('assets/images/minigame/mini_walk_left_1.png'),walkLeft2:assetUrl('assets/images/minigame/mini_walk_left_2.png'),jumpRight:assetUrl('assets/images/minigame/mini_jump_right.png'),fallRight:assetUrl('assets/images/minigame/mini_fall_right.png'),jumpLeft:assetUrl('assets/images/minigame/mini_jump_left.png'),fallLeft:assetUrl('assets/images/minigame/mini_fall_left.png'),hot:assetUrl('assets/images/minigame/mini_hot.png'),badFood:assetUrl('assets/images/minigame/mini_bad_food.png'),heartFull:assetUrl('assets/images/minigame/mini_heart_full.png'),heartBroken:assetUrl('assets/images/minigame/mini_heart_broken.png')};
    const GOOD_FOOD=[assetUrl('assets/images/minigame/good_1.png'),assetUrl('assets/images/minigame/good_2.png'),assetUrl('assets/images/minigame/good_3.png'),assetUrl('assets/images/minigame/good_4.png')];
    const BAD_FOOD={chili:assetUrl('assets/images/minigame/bad_1.png'),fish:assetUrl('assets/images/minigame/bad_2.png')};
    const spriteReady=Promise.all([...Object.values(SPRITES),...GOOD_FOOD,...Object.values(BAD_FOOD),ASSETS.text.gewonnen,ASSETS.text.verloren].map(preloadImage));
    const jumpAudios=Array.from({length:3},()=>{const a=new Audio(assetUrl('assets/audio/jump_sound.mp3'));a.preload='auto';a.volume=0.74;try{a.load();}catch(_){}return a;});
    let jumpAudioIndex=0;
    const makeSfxPool=(key,n=3)=>Array.from({length:n},()=>{const a=new Audio(AUDIO_FILES[key]);a.preload='auto';a.volume=audioVolumeForKey(key);try{a.load();}catch(_){}return a;});
    const miniSfxPools={collect:makeSfxPool('collect',4),hurt:makeSfxPool('hurt',2),glass_break:makeSfxPool('glass_break',2)};
    const miniSfxCursor={collect:0,hurt:0,glass_break:0};
    function playMiniSfx(key,delayMs=0){const pool=miniSfxPools[key];if(!pool?.length||muted)return;const run=()=>{const a=pool[miniSfxCursor[key]++%pool.length];try{a.pause();a.currentTime=0;a.play().catch(()=>{});}catch(_){}};if(delayMs>0)window.setTimeout(run,delayMs);else run();}
    const TARGET_GOOD=10,MAX_HEARTS=3,MAX_GOOD_ACTIVE=1,MAX_BAD_ACTIVE=4;
    const FOOD_POOL_SIZE=MAX_GOOD_ACTIVE+MAX_BAD_ACTIVE+6,FOOD_BASE_SIZE=62;
    const GOOD_SPAWN_MS=5000,BAD_SPAWN_START_MS=950,BAD_SPAWN_END_MS=720;
    const HURT_FREEZE_MS=500,INVULNERABLE_MS=3000;
    let stageW=1,stageH=1,heroW=150,heroH=166,heroX=0,heroRatio=0.5,direction=1;
    let pressedLeft=false,pressedRight=false,velocity=0;
    let foodItems=[],activeGood=0,activeBad=0,collectedGood=0,badCycle=0;
    let gameOver=false,gameWon=false,lastGoodSpawn=performance.now()+650,lastBadSpawn=performance.now()+1500;
    let lives=MAX_HEARTS,hurtFreezeUntil=0,invulnerableUntil=0,blinkUntil=0,hurtSprite='',pendingGameOver=false;
    let rafId=null,loopActive=false,last=performance.now(),lastSprite='';
    let hb={l:0,r:0,t:0,b:0},hb2={active:false,l:0,r:0,t:0,b:0};
    let lastHeroOpacity='1',hudDirty=false;
    const SCALE_STRINGS=new Map();const scaleStr=s=>{let v=SCALE_STRINGS.get(s);if(v===undefined){v=s.toFixed(3);SCALE_STRINGS.set(s,v);}return v;};
    let heartsWrap=$('miniLives');
    if(!heartsWrap){heartsWrap=document.createElement('div');heartsWrap.id='miniLives';heartsWrap.className='mini-hearts';heartsWrap.setAttribute('role','status');heartsWrap.setAttribute('aria-live','polite');stage.appendChild(heartsWrap);}
    heartsWrap.innerHTML='';
    const heartNodes=Array.from({length:MAX_HEARTS},(_,i)=>{const img=document.createElement('img');img.className='mini-heart';img.alt=i===0?'Lebensanzeige':'';if(i>0)img.setAttribute('aria-hidden','true');heartsWrap.appendChild(img);return img;});
    foodItems=Array.from({length:FOOD_POOL_SIZE},(_,i)=>{const node=document.createElement('img');node.className='mini-food pooled';node.alt='';node.setAttribute('aria-hidden','true');node.dataset.poolIndex=String(i);node.style.width=node.style.height=`${FOOD_BASE_SIZE}px`;node.style.visibility='hidden';node.style.opacity='0';node.style.transform='translate3d(-9999px,-9999px,0) scale(1)';stage.appendChild(node);return{node,active:false,kind:'',x:0,y:0,size:0,scale:1,scaleStr:'1.000',speed:0};});
    const heroName=esc(getHeroName());
    const tutorial=document.createElement('div');tutorial.className='mini-tutorial-modal stage-popup hidden';tutorial.setAttribute('role','dialog');tutorial.setAttribute('aria-modal','true');tutorial.setAttribute('aria-labelledby','miniTutorialTitle');
    tutorial.innerHTML=`<div class="mini-tutorial-card"><p class="mini-tutorial-kicker">Geschmackssinn</p><h2 id="miniTutorialTitle">Bereite ${heroName} auf den Weg vor</h2><p>Bewege ${heroName} nur nach <strong>links</strong> und <strong>rechts</strong>. Sammle <strong>10 lecker schmeckende Obststücke</strong>. Etwa alle fünf Sekunden kommt ein zufälliges Obstteil herunter – dazwischen fallen vor allem <strong>scharfe Chilischoten</strong> und <strong>verdorbener Fisch</strong>, denen du ausweichen musst.</p><div class="mini-tutorial-actions"><button id="miniTutorialStartBtn" class="game-btn" type="button">Spiel starten</button><button id="miniTutorialBackBtn" class="game-btn muted" type="button">Zurück zum Spielfeld</button></div></div>`;
    stage.appendChild(tutorial);tutorial.style.setProperty('--popup-bg',`url("${popupBgForMeta(miniMeta)}")`);
    applyStagePopup(resultModal,miniMeta);applyStagePopup(menu,miniMeta);
    const tutorialStartBtn=tutorial.querySelector('#miniTutorialStartBtn'),tutorialBackBtn=tutorial.querySelector('#miniTutorialBackBtn');
    function updateMetrics(){const prev=Number.isFinite(heroRatio)?heroRatio:0.5;stageW=Math.max(1,stage.clientWidth||window.innerWidth||1);stageH=Math.max(1,stage.clientHeight||window.innerHeight||1);heroW=Math.max(1,hero.clientWidth||150);heroH=Math.max(1,hero.clientHeight||166);heroX=((prev*stageW)%stageW+stageW)%stageW;heroRatio=heroX/stageW;applyHero();}
    window.addEventListener('resize',updateMetrics,{passive:true});
    function updateHeroHitbox(){const bottom=stageH-4,top=bottom-heroH;hb.l=heroX-heroW*.22;hb.r=heroX+heroW*.22;hb.t=top+heroH*.22;hb.b=bottom-6;hb2.active=false;if(hb.l<0){hb2.active=true;hb2.l=hb.l+stageW;hb2.r=hb.r+stageW;hb2.t=hb.t;hb2.b=hb.b;}else if(hb.r>stageW){hb2.active=true;hb2.l=hb.l-stageW;hb2.r=hb.r-stageW;hb2.t=hb.t;hb2.b=hb.b;}}
    const setHeroOpacity=v=>{if(lastHeroOpacity!==v){hero.style.opacity=v;heroClone.style.opacity=v;lastHeroOpacity=v;}};
    const updateHud=()=>{if(hud)hud.textContent=`Obst ${collectedGood} / ${TARGET_GOOD}`;};
    const updateHearts=()=>{heartNodes.forEach((n,i)=>{const ok=i<lives;n.src=ok?SPRITES.heartFull:SPRITES.heartBroken;n.classList.toggle('broken',!ok);});heartsWrap.setAttribute('aria-label',`Leben: ${lives} von ${MAX_HEARTS}`);};
    const currentVelocity=()=>pressedLeft&&!pressedRight?-1:pressedRight&&!pressedLeft?1:0;
    function recomputeVelocity(){velocity=currentVelocity();if(velocity!==0)direction=velocity>0?1:-1;hero.classList.toggle('walking',velocity!==0&&!gameOver&&!gameWon&&performance.now()>=hurtFreezeUntil);}
    const setSprite=src=>{if(lastSprite!==src){hero.src=src;heroClone.src=src;lastSprite=src;}};
    function updateSprite(now){if(now<hurtFreezeUntil){setSprite(hurtSprite||SPRITES.badFood);hero.classList.remove('walking');return;}if(velocity<0)setSprite((Math.floor(now/230)%2===0)?SPRITES.walkLeft1:SPRITES.walkLeft2);else if(velocity>0)setSprite((Math.floor(now/230)%2===0)?SPRITES.walkRight1:SPRITES.walkRight2);else setSprite(direction<0?SPRITES.walkLeft1:SPRITES.walkRight1);hero.classList.toggle('walking',velocity!==0&&!gameOver&&!gameWon);}
    function updateBlink(now){if(now>=blinkUntil||now<hurtFreezeUntil){setHeroOpacity('1');return;}setHeroOpacity((Math.floor(now/140)%2===0)?'0.32':'1');}
    function applyHero(){const x=heroX-heroW/2,y=0;hero.style.transform=`translate3d(${Math.round(x)}px,${Math.round(y)}px,0)`;let cx=null;if(x<0)cx=x+stageW;else if(x+heroW>stageW)cx=x-stageW;if(cx===null)heroClone.style.visibility='hidden';else{heroClone.style.visibility='visible';heroClone.style.transform=`translate3d(${Math.round(cx)}px,${Math.round(y)}px,0)`;}}
    const blockDefault=ev=>{ev.preventDefault();ev.stopPropagation();};
    function bindHold(btn,side){if(!btn)return;const down=ev=>{blockDefault(ev);if(gameOver||gameWon)return;ensureMiniMusic?.();btn.classList.add('pressed');if(side==='left')pressedLeft=true;if(side==='right')pressedRight=true;recomputeVelocity();try{btn.setPointerCapture?.(ev.pointerId);}catch(_){}};const up=ev=>{ev?.preventDefault?.();ev?.stopPropagation?.();btn.classList.remove('pressed');if(side==='left')pressedLeft=false;if(side==='right')pressedRight=false;recomputeVelocity();};btn.addEventListener('pointerdown',down,{passive:false});['pointerup','pointercancel','pointerleave','lostpointercapture'].forEach(t=>btn.addEventListener(t,up,{passive:false}));btn.addEventListener('contextmenu',blockDefault);btn.addEventListener('selectstart',blockDefault);}
    bindHold(leftBtn,'left');bindHold(rightBtn,'right');
    if(jumpBtn){jumpBtn.disabled=true;jumpBtn.hidden=true;jumpBtn.setAttribute('aria-hidden','true');}
    [controls,leftBtn,rightBtn].forEach(n=>{if(!n)return;n.addEventListener('contextmenu',blockDefault);n.addEventListener('selectstart',blockDefault);n.addEventListener('touchstart',ev=>ev.preventDefault(),{passive:false});});
    const stopMovement=()=>{pressedLeft=false;pressedRight=false;recomputeVelocity();};
    window.addEventListener('blur',stopMovement);document.addEventListener('visibilitychange',()=>{last=performance.now();if(document.hidden)stopMovement();});
    settingsBtn?.addEventListener('click',()=>{stopMovement();show(menu);});closeMenu?.addEventListener('click',()=>hide(menu));
    boardBtn?.addEventListener('click',()=>{stopMiniLoop();stopSound('minigame_background');location.href=pageUrl('index.html');});
    resultBoardBtn?.addEventListener('click',()=>{stopMiniLoop();stopSound('minigame_background');location.href=pageUrl('index.html');});
    const ensureMiniMusic=()=>playSound('minigame_background',{loop:true,restart:false});
    ['pointerdown','touchstart','keydown','click'].forEach(t=>document.addEventListener(t,ensureMiniMusic,{passive:true}));
    const diffProg=()=>Math.min(1,collectedGood/TARGET_GOOD);
    const curBadSpawnMs=()=>BAD_SPAWN_START_MS-(BAD_SPAWN_START_MS-BAD_SPAWN_END_MS)*diffProg();
    const curBadLimit=()=>diffProg()<.45?3:MAX_BAD_ACTIVE;
    function createFood(kind){const item=foodItems.find(o=>!o.active);if(!item)return false;const isGood=kind==='good';const src=isGood?GOOD_FOOD[Math.floor(Math.random()*GOOD_FOOD.length)]:(kind==='chili'?BAD_FOOD.chili:BAD_FOOD.fish);const scale=isGood?.82+Math.random()*.18:.92+Math.random()*.16;const size=FOOD_BASE_SIZE*scale;const x=Math.round(size/2+Math.random()*Math.max(1,stageW-size*1.5));const p=diffProg();const speed=isGood?138+Math.random()*42:150+p*25+Math.random()*45;item.active=true;item.kind=kind;item.x=x;item.y=-size-8;item.size=size;item.scale=scale;item.scaleStr=scaleStr(scale);item.speed=speed;if(item.node.src!==src)item.node.src=src;item.node.className=`mini-food ${isGood?'good-food':'bad-food'} ${kind}`;item.node.style.visibility='visible';item.node.style.opacity='1';item.node.style.transform=`translate3d(${Math.round(x)}px,${Math.round(-size-8)}px,0) scale(${item.scaleStr})`;if(isGood)activeGood++;else activeBad++;return true;}
    function removeFood(item){if(!item?.active)return;if(item.kind==='good')activeGood=Math.max(0,activeGood-1);else activeBad=Math.max(0,activeBad-1);item.active=false;item.kind='';item.x=item.y=item.size=item.speed=0;item.scale=1;item.scaleStr='1.000';item.node.style.opacity='0';item.node.style.visibility='hidden';item.node.style.transform='translate3d(-9999px,-9999px,0) scale(1)';}
    function stopMiniLoop(){loopActive=false;if(rafId!==null){cancelAnimationFrame(rafId);rafId=null;}}
    const requestMiniTick=()=>{if(loopActive)rafId=requestAnimationFrame(tick);};
    function showMiniResult(won){stopMiniLoop();hudDirty=false;stopSound('minigame_background');if(resultImage){resultImage.src=won?ASSETS.text.gewonnen:ASSETS.text.verloren;resultImage.alt=won?'Gewonnen':'Verloren';show(resultImage);}if(won){gameWon=true;stopMovement();if(resultTitle)resultTitle.textContent='Gewonnen';if(resultText)resultText.textContent='Du hast 10 gute Obststücke eingesammelt.';if(retryBtn)retryBtn.textContent='Zurück zum Spielfeld';if(resultBoardBtn)hide(resultBoardBtn);retryBtn.onclick=()=>{const slot=Number(qs('slot'));if(Number.isInteger(slot)&&slot>=0)completeMinigameSlot(slot);location.href=pageUrl('index.html');};}else{gameOver=true;stopMovement();if(resultTitle)resultTitle.textContent='Verloren';if(resultText)resultText.textContent='Du hast alle Herzen verloren.';if(retryBtn)retryBtn.textContent='Neuer Versuch';if(resultBoardBtn)show(resultBoardBtn);retryBtn.onclick=()=>{stopMiniLoop();location.reload();};}foodItems.forEach(removeFood);activeGood=activeBad=0;show(resultModal);}
    function damageHero(kind){const now=performance.now();if(gameOver||gameWon||now<invulnerableUntil)return;lives=Math.max(0,lives-1);playMiniSfx('hurt');playMiniSfx('glass_break');updateHearts();hurtSprite=kind==='chili'?SPRITES.hot:SPRITES.badFood;hurtFreezeUntil=now+HURT_FREEZE_MS;blinkUntil=invulnerableUntil=hurtFreezeUntil+INVULNERABLE_MS;hero.classList.remove('walking');if(lives<=0)pendingGameOver=true;}
    function updateFood(dt,now){if(!gameOver&&!gameWon&&activeGood<MAX_GOOD_ACTIVE&&now-lastGoodSpawn>=GOOD_SPAWN_MS){createFood('good');lastGoodSpawn=now;}if(!gameOver&&!gameWon&&activeBad<curBadLimit()&&now-lastBadSpawn>=curBadSpawnMs()){createFood((badCycle++%2===0)?'chili':'fish');lastBadSpawn=now;}updateHeroHitbox();for(let i=0;i<foodItems.length;i++){const item=foodItems[i];if(!item.active)continue;item.y+=item.speed*dt;item.node.style.transform=`translate3d(${Math.round(item.x)}px,${Math.round(item.y)}px,0) scale(${item.scaleStr})`;const fL=item.x+item.size*.18,fR=item.x+item.size*.82,fT=item.y+item.size*.18,fB=item.y+item.size*.82;if(!(hb.r<fL||hb.l>fR||hb.b<fT||hb.t>fB)||(hb2.active&&!(hb2.r<fL||hb2.l>fR||hb2.b<fT||hb2.t>fB))){const kind=item.kind;removeFood(item);if(kind==='good'){collectedGood=Math.min(TARGET_GOOD,collectedGood+1);playMiniSfx('collect',18);if(collectedGood>=TARGET_GOOD){updateHud();showMiniResult(true);}else hudDirty=true;}else damageHero(kind);continue;}if(item.y>stageH+item.size)removeFood(item);}}
    function tick(now){if(!loopActive)return;if(!Number.isFinite(now))now=performance.now();const elapsed=now-last,dt=elapsed>120?0:Math.min(.03,Math.max(0,elapsed/1000||0));last=now;if(!gameOver&&!gameWon){if(now>=hurtFreezeUntil&&velocity){heroX+=velocity*stageW*.38*dt;if(heroX<0)heroX+=stageW;else if(heroX>=stageW)heroX-=stageW;heroRatio=heroX/stageW;}updateSprite(now);applyHero();updateBlink(now);updateFood(dt,now);if(hudDirty){hudDirty=false;updateHud();}if(pendingGameOver&&now>=hurtFreezeUntil){pendingGameOver=false;showMiniResult(false);return;}}if(!gameOver&&!gameWon)requestMiniTick();}
    function startFoodGame(){hide(tutorial);ensureMiniMusic();loopActive=true;last=performance.now();lastGoodSpawn=last-GOOD_SPAWN_MS+1200;lastBadSpawn=last-BAD_SPAWN_START_MS;requestMiniTick();}
    tutorialStartBtn?.addEventListener('click',startFoodGame);tutorialBackBtn?.addEventListener('click',()=>{stopMiniLoop();stopSound('minigame_background');location.href=pageUrl('index.html');});
    updateMetrics();updateHud();updateHearts();setSprite(SPRITES.walkRight1);applyHero();hero.style.visibility='hidden';
    spriteReady.finally(()=>{updateMetrics();hero.style.visibility='visible';show(tutorial);tutorialStartBtn?.focus?.();});
  }

  // ─── Minispiel 2 (Memory) ──────────────────────────────────────────────────

  function initMiniGame2(){
    addSpeaker();stopSound('background');stopSound('battle_background');playSound('minigame_background',{loop:true,restart:true});
    const stage=document.querySelector('.memory2-stage'),grid=$('memory2Grid'),hero=$('memory2Hero'),jumpBtn=$('memory2JumpBtn');
    const hud=$('memory2Hud'),leftWarn=$('memory2WarnLeft'),rightWarn=$('memory2WarnRight'),projectile=$('memory2Projectile');
    const resultModal=$('memory2Result'),resultImage=$('memory2ResultImage'),resultTitle=$('memory2ResultTitle'),resultText=$('memory2ResultText');
    const retryBtn=$('memory2RetryBtn'),boardBtn=$('memory2BoardBtn'),settingsBtn=$('memory2SettingsBtn');
    const menu=$('memory2Menu'),menuBoardBtn=$('memory2MenuBoardBtn'),closeMenuBtn=$('memory2CloseMenuBtn');
    const introModal=$('memory2Intro'),introStartBtn=$('memory2IntroStartBtn'),introBoardBtn=$('memory2IntroBoardBtn');
    if(!stage||!grid||!hero||!jumpBtn||!projectile)return;hero.alt=getHeroName();
    const titleEl=$('memory2IntroTitle');if(titleEl)titleEl.textContent=`Bereite ${getHeroName()} auf den Weg vor`;
    const slot=Number(qs('slot'))||3,memory2Meta={slot,isBoss:false};
    stage.style.setProperty('--memory2-bg',`url("${bgForMeta(memory2Meta)}")`);
    applyStagePopup(introModal,memory2Meta);applyStagePopup(resultModal,memory2Meta);applyStagePopup(menu,memory2Meta);
    const CARD_BACK=assetUrl('assets/images/minigame2/karte.png');
    const MEMORY_SYMBOLS=[['nase','Nase'],['mund','Mund'],['auge','Auge'],['sonne','Sonne'],['blatt','Blatt'],['brille','Brille'],['hand','Hand'],['erdbeere','Erdbeere'],['schwert','Schwert'],['helm','Helm'],['schild','Schild'],['ohr','Ohr']].map(([id,label])=>({id,label,src:assetUrl(`assets/images/minigame2/${id}.png`)}));
    const HERO={stand:assetUrl('assets/images/minigame/mini_walk_right_1.png'),jump:assetUrl('assets/images/minigame/mini_jump_right.png'),fall:assetUrl('assets/images/minigame/mini_fall_right.png'),hurt:assetUrl('assets/images/minigame/mini_bad_food.png')};
    const HEART={full:assetUrl('assets/images/minigame/mini_heart_full.png'),broken:assetUrl('assets/images/minigame/mini_heart_broken.png')};
    const MAX_HEARTS=3,WARNING_MS=1150,PROJECTILE_MIN_DELAY=3000,PROJECTILE_MAX_DELAY=6000;
    const PROJECTILE_SIZE=46,PROJECTILE_TRAVEL_MS=1850,JUMP_VELOCITY=720,GRAVITY=1420;
    const HURT_FREEZE_MS=450,INVULNERABLE_MS=2200;
    let cards=[],firstCard=null,secondCard=null,checking=false,matchedPairs=0;
    let lives=MAX_HEARTS,jumping=false,jumpY=0,jumpVelocity=0;
    let heroW=128,heroH=150,heroX=0,heroBaseY=0,stageW=1,stageH=1;
    let last=performance.now(),rafId=null,loopActive=false,gameOver=false,gameWon=false;
    let hurtUntil=0,invulnerableUntil=0,blinkUntil=0,lastHeroSrc='';
    let nextProjectileAt=performance.now()+1800,projectilePhase='idle',projectileDir=1;
    let projectileStart=0,projectileX=-9999,projectileY=0;
    const heartWrap=$('memory2Lives');
    const heartNodes=Array.from({length:MAX_HEARTS},(_,i)=>{const img=document.createElement('img');img.className='memory2-heart';img.alt=i===0?'Leben':'';if(i>0)img.setAttribute('aria-hidden','true');heartWrap?.appendChild(img);return img;});
    const jumpAudios=Array.from({length:3},()=>{const a=new Audio(assetUrl('assets/audio/jump_sound.mp3'));a.preload='auto';a.volume=.72;try{a.load();}catch(_){}return a;});let jumpAudioIndex=0;
    Promise.all([CARD_BACK,...MEMORY_SYMBOLS.map(s=>s.src),...Object.values(HERO),...Object.values(HEART)].map(preloadImage)).then(()=>{hero.style.visibility='visible';});
    function makeCards(){cards=shuffle(MEMORY_SYMBOLS.flatMap(s=>[{...s,pairKey:s.id,cardId:`${s.id}-a`,matched:false,flipped:false},{...s,pairKey:s.id,cardId:`${s.id}-b`,matched:false,flipped:false}]));grid.innerHTML=cards.map((card,i)=>`<button class="memory2-card" type="button" data-index="${i}" aria-label="Memory-Karte ${i+1}"><span class="memory2-card-inner"><span class="memory2-card-face memory2-card-back"><img src="${CARD_BACK}" alt="Rückseite"></span><span class="memory2-card-face memory2-card-front"><img src="${card.src}" alt="${esc(card.label)}"></span></span></button>`).join('');grid.querySelectorAll('.memory2-card').forEach(btn=>btn.addEventListener('click',()=>flipCard(Number(btn.dataset.index))));}
    const updateHud=()=>{if(hud)hud.textContent=`Paare ${matchedPairs} / ${MEMORY_SYMBOLS.length}`;};
    const updateHearts=()=>{heartNodes.forEach((n,i)=>{n.src=i<lives?HEART.full:HEART.broken;n.classList.toggle('broken',i>=lives);});};
    const setHero=src=>{if(lastHeroSrc!==src){hero.src=src;lastHeroSrc=src;}};
    const updateHeroSprite=now=>{hero.classList.toggle('hurt',now<hurtUntil);hero.classList.toggle('jumping',jumping);if(now<hurtUntil){setHero(HERO.hurt);return;}if(jumping)setHero(jumpVelocity>=0?HERO.jump:HERO.fall);else setHero(HERO.stand);};
    function updateMetrics(){stageW=Math.max(1,stage.clientWidth||window.innerWidth||1);stageH=Math.max(1,stage.clientHeight||window.innerHeight||1);heroW=hero.clientWidth||128;heroH=hero.clientHeight||150;heroX=stageW/2;heroBaseY=stageH-16;projectileY=Math.max(12,stageH-86);applyHero();applyProjectile();}
    window.addEventListener('resize',updateMetrics,{passive:true});
    const applyHero=()=>{hero.style.transform=`translate3d(${Math.round(heroX-heroW/2)}px,${Math.round(-jumpY)}px,0)`;};
    const applyProjectile=()=>{projectile.style.transform=`translate3d(${Math.round(projectileX)}px,${Math.round(projectileY)}px,0)`;};
    function playJump(){if(muted)return;try{const a=jumpAudios[jumpAudioIndex++%jumpAudios.length];a.pause();a.currentTime=0;a.play().catch(()=>{});}catch(_){}}
    function jump(){if(gameOver||gameWon||jumping||performance.now()<hurtUntil)return;jumping=true;jumpVelocity=JUMP_VELOCITY;playJump();}
    jumpBtn.addEventListener('pointerdown',ev=>{ev.preventDefault();playSound('minigame_background',{loop:true,restart:false});jumpBtn.classList.add('pressed');jump();try{jumpBtn.setPointerCapture?.(ev.pointerId);}catch(_){}},{passive:false});
    ['pointerup','pointercancel','pointerleave','lostpointercapture'].forEach(t=>jumpBtn.addEventListener(t,ev=>{ev?.preventDefault?.();jumpBtn.classList.remove('pressed');},{passive:false}));
    settingsBtn?.addEventListener('click',()=>show(menu));closeMenuBtn?.addEventListener('click',()=>hide(menu));menuBoardBtn?.addEventListener('click',()=>{stopLoop();stopSound('minigame_background');location.href=pageUrl('index.html');});boardBtn?.addEventListener('click',()=>{stopLoop();stopSound('minigame_background');location.href=pageUrl('index.html');});
    function flipCard(index){if(checking||gameOver||gameWon)return;const card=cards[index];if(!card||card.matched||card.flipped)return;card.flipped=true;playSound('flip');const node=grid.querySelector(`[data-index="${index}"]`);node?.classList.add('flipped');if(firstCard===null){firstCard=index;return;}secondCard=index;checking=true;const a=cards[firstCard],b=cards[secondCard];if(a.pairKey===b.pairKey){playSound('pair');a.matched=b.matched=true;node?.classList.add('matched');grid.querySelector(`[data-index="${firstCard}"]`)?.classList.add('matched');matchedPairs++;updateHud();firstCard=secondCard=null;checking=false;if(matchedPairs>=MEMORY_SYMBOLS.length)showResult(true);}else{window.setTimeout(()=>{[firstCard,secondCard].forEach(i=>{if(i===null)return;cards[i].flipped=false;grid.querySelector(`[data-index="${i}"]`)?.classList.remove('flipped');});firstCard=secondCard=null;checking=false;},720);}}
    const scheduleNextProjectile=now=>{projectilePhase='idle';projectile.classList.remove('active');projectileX=-9999;applyProjectile();nextProjectileAt=now+PROJECTILE_MIN_DELAY+Math.random()*(PROJECTILE_MAX_DELAY-PROJECTILE_MIN_DELAY);};
    const startWarning=now=>{projectilePhase='warning';projectileDir=Math.random()<.5?1:-1;projectileStart=now+WARNING_MS;if(projectileDir>0)leftWarn.classList.add('active');else rightWarn.classList.add('active');};
    const startProjectile=now=>{updateMetrics();projectileY=Math.max(12,stageH-86);projectilePhase='flying';projectileStart=now;leftWarn.classList.remove('active');rightWarn.classList.remove('active');projectile.classList.add('active');projectileX=projectileDir>0?-PROJECTILE_SIZE-8:stageW+PROJECTILE_SIZE+8;applyProjectile();};
    function updateProjectile(now){if(gameOver||gameWon)return;if(projectilePhase==='idle'){if(now>=nextProjectileAt)startWarning(now);return;}if(projectilePhase==='warning'){if(now>=projectileStart)startProjectile(now);return;}const travel=(now-projectileStart)/PROJECTILE_TRAVEL_MS;projectileX=projectileDir>0?-PROJECTILE_SIZE+(stageW+PROJECTILE_SIZE*2)*travel:stageW+PROJECTILE_SIZE-(stageW+PROJECTILE_SIZE*2)*travel;applyProjectile();if(checkProjectileHit())damageHero(now);const done=projectileDir>0?projectileX>stageW+PROJECTILE_SIZE:projectileX<-PROJECTILE_SIZE*2;if(done)scheduleNextProjectile(now);}
    function checkProjectileHit(){if(performance.now()<invulnerableUntil||projectilePhase!=='flying')return false;const hB=heroBaseY-jumpY,hT=hB-heroH,hL=heroX-heroW*.20,hR=heroX+heroW*.20,hTop=hT+heroH*.18,hBot=hB-heroH*.08;const pL=projectileX+7,pR=projectileX+PROJECTILE_SIZE-7,pT=projectileY+7,pB=projectileY+PROJECTILE_SIZE-7;return!(hR<pL||hL>pR||hBot<pT||hTop>pB);}
    function damageHero(now){if(gameOver||gameWon||now<invulnerableUntil)return;lives=Math.max(0,lives-1);playSound('hurt');playSound('glass_break');updateHearts();hurtUntil=now+HURT_FREEZE_MS;blinkUntil=invulnerableUntil=hurtUntil+INVULNERABLE_MS;scheduleNextProjectile(now+300);if(lives<=0)showResult(false);}
    const updateBlink=now=>{if(now>=blinkUntil||now<hurtUntil){hero.style.opacity='1';return;}hero.style.opacity=(Math.floor(now/140)%2===0)?'.32':'1';};
    function showResult(won){stopLoop();stopSound('minigame_background');if(resultImage){resultImage.src=won?ASSETS.text.gewonnen:ASSETS.text.verloren;resultImage.alt=won?'Gewonnen':'Verloren';show(resultImage);}if(won){gameWon=true;resultTitle.textContent='Gewonnen';resultText.textContent=`Du hast alle Symbolpaare gefunden und ${getHeroName()} sicher an den Blendkugeln vorbeigeführt.`;retryBtn.textContent='Zurück zum Spielfeld';hide(boardBtn);retryBtn.onclick=()=>{completeMinigameSlot(slot);location.href=pageUrl('index.html');};}else{gameOver=true;resultTitle.textContent='Verloren';resultText.textContent=`${getHeroName()} wurde zu oft von Blendkugeln getroffen.`;retryBtn.textContent='Neuer Versuch';retryBtn.onclick=()=>{stopLoop();location.reload();};show(boardBtn);}show(resultModal);}
    const stopLoop=()=>{loopActive=false;if(rafId!==null){cancelAnimationFrame(rafId);rafId=null;}};const requestTick=()=>{if(loopActive)rafId=requestAnimationFrame(tick);};
    function tick(now){if(!loopActive)return;if(!Number.isFinite(now))now=performance.now();const dt=Math.min(.032,Math.max(0,(now-last)/1000||0));last=now;if(!gameOver&&!gameWon){if(now>=hurtUntil&&jumping){jumpY+=jumpVelocity*dt;jumpVelocity-=GRAVITY*dt;if(jumpY<=0){jumpY=jumpVelocity=0;jumping=false;}}updateHeroSprite(now);applyHero();updateBlink(now);updateProjectile(now);}requestTick();}
    document.addEventListener('visibilitychange',()=>{last=performance.now();});
    makeCards();updateHud();updateHearts();updateMetrics();setHero(HERO.stand);hero.style.visibility='hidden';
    introStartBtn?.addEventListener('click',()=>{hide(introModal);loopActive=true;last=performance.now();scheduleNextProjectile(last+900);requestTick();});
    introBoardBtn?.addEventListener('click',()=>{stopLoop();stopSound('minigame_background');location.href=pageUrl('index.html');});
    show(introModal);introStartBtn?.focus?.();
  }

  // ─── Minispiel 3 (Rohrsystem) ──────────────────────────────────────────────

  function initMiniGame3(){
    addSpeaker();stopSound('background');stopSound('battle_background');stopSound('minigame_background');
    const stage=document.querySelector('.pipe3-stage'),board=$('pipe3Board'),valveBtn=$('pipe3ValveBtn');
    const valvePad=document.querySelector('.pipe3-valve-pad'),valveImg=$('pipe3ValveImg'),hintBtn=$('pipe3HintBtn');
    const hud=$('pipe3Hud'),livesWrap=$('pipe3Lives'),hero=$('pipe3Hero'),heroWrap=hero?.closest('.pipe3-hero-wrap');
    const guardBtn=$('pipe3GuardBtn'),guardBarFill=$('pipe3GuardBarFill'),ogreZone=$('pipe3OgreZone'),ogre=$('pipe3Ogre');
    const banana=$('pipe3Banana'),sprayOverlay=$('pipe3SprayOverlay'),topConnector=$('pipe3TopConnector');
    const introModal=$('pipe3Intro'),introStartBtn=$('pipe3IntroStartBtn'),introBoardBtn=$('pipe3IntroBoardBtn');
    const resultModal=$('pipe3Result'),resultImage=$('pipe3ResultImage'),resultExtraImage=$('pipe3ResultExtraImage');
    const resultTitle=$('pipe3ResultTitle'),resultText=$('pipe3ResultText'),retryBtn=$('pipe3RetryBtn'),boardBtn=$('pipe3BoardBtn');
    const settingsBtn=$('pipe3SettingsBtn'),menu=$('pipe3Menu'),menuBoardBtn=$('pipe3MenuBoardBtn'),closeMenuBtn=$('pipe3CloseMenuBtn');
    if(hero)hero.alt=getHeroName();if(!stage||!board||!valveBtn||!hero||!ogreZone||!ogre||!banana)return;
    const slot=Number(qs('slot'))||5,pipe3Meta={slot,isBoss:false};
    stage.style.setProperty('--pipe3-bg',`url("${bgForMeta(pipe3Meta)}")`);
    applyStagePopup(introModal,pipe3Meta);applyStagePopup(resultModal,pipe3Meta);applyStagePopup(menu,pipe3Meta);
    const IMG={V:assetUrl('assets/images/minigame3/pipe_V.png'),I:assetUrl('assets/images/minigame3/pipe_I.png'),T:assetUrl('assets/images/minigame3/pipe_T.png'),F:assetUrl('assets/images/minigame3/filter.png'),Vg:assetUrl('assets/images/minigame3/pipe_V_green.png'),Ig:assetUrl('assets/images/minigame3/pipe_I_green.png'),Tg:assetUrl('assets/images/minigame3/pipe_T_green.png'),Fg:assetUrl('assets/images/minigame3/pipe_X_green.png'),no:assetUrl('assets/images/minigame3/no_pipe.png'),valve:assetUrl('assets/images/minigame3/ventil.png'),flakon:assetUrl('assets/images/minigame3/flakon_tile.png'),heroIdle:assetUrl('assets/images/minigame3/hero_idle.png'),heroGuard:assetUrl('assets/images/minigame3/hero_guard.png'),ogreIdle:assetUrl('assets/images/minigame3/ogre_idle.png'),ogreThrow:assetUrl('assets/images/minigame3/ogre_throw.png'),ogreShocked:assetUrl('assets/images/minigame3/ogre_shocked.png'),ogreClean:assetUrl('assets/images/minigame3/ogre_clean.png'),banana:assetUrl('assets/images/minigame3/banana_peel.png'),sprayOverlay:assetUrl('assets/images/minigame3/spray_overlay.png'),feedBanana:assetUrl('assets/images/minigame3/feed_banana.png')};
    const HEART={full:assetUrl('assets/images/minigame/mini_heart_full.png'),broken:assetUrl('assets/images/minigame/mini_heart_broken.png')};
    const heroIdleSrc=IMG.heroIdle;if(topConnector)topConnector.src=IMG.flakon;hero.dataset.idleSrc=heroIdleSrc;hero.src=heroIdleSrc;hero.style.visibility='visible';ogre.src=IMG.ogreIdle;banana.src=IMG.banana;if(sprayOverlay){sprayOverlay.src=IMG.sprayOverlay;ogreZone?.appendChild(sprayOverlay);}
    const rotateAudios=Array.from({length:3},()=>{const a=new Audio(AUDIO_FILES.flip||assetUrl('assets/audio/flip.mp3'));a.preload='auto';a.volume=audioVolumeForKey('flip');try{a.load();}catch(_){}return a;});let rotateAudioIndex=0;
    const playRotateSound=()=>{if(muted)return;const a=rotateAudios[rotateAudioIndex++%rotateAudios.length];try{a.pause();a.currentTime=0;a.play().catch(()=>{});}catch(_){}};
    const ROWS=6,COLS=6,FILTER_TOTAL=4,MAX_HEARTS=3,ENTRY_COL=3;
    const START={r:5,c:ENTRY_COL,dir:'S'},EXIT={r:0,c:ENTRY_COL,dir:'N'};
    const OPP={N:'S',E:'W',S:'N',W:'E'},STEP={N:[-1,0],E:[0,1],S:[1,0],W:[0,-1]},ORDER=['N','E','S','W'];
    const BASE={I:['N','S'],V:['N','E'],T:['N','E','W'],F:['N','E','S','W']};
    const solution=[['T','V','I','V','T','I'],['V','F','T','V','F','V'],['I','I','V','I','T','I'],['T','I','V','I','V','V'],['I','F','I','V','F','T'],['V','T','I','V','V','I']];
    const solvedRot=[[0,1,1,3,2,0],[2,0,3,1,0,2],[0,0,1,0,1,0],[2,0,2,0,1,3],[1,0,1,3,0,1],[0,1,0,1,3,1]];
    const initialRot=[[1,2,0,0,0,1],[0,0,0,2,0,3],[1,1,1,1,3,1],[1,1,0,1,2,0],[0,0,0,0,0,0],[2,1,1,2,0,0]];
    const filterCells=new Set(['1,1','1,4','4,1','4,4']);
    const hintPath=[[5,3],[5,4],[4,4],[3,4],[3,5],[2,5],[1,5],[1,4],[1,3],[2,3],[3,3],[4,3],[4,2],[4,1],[3,1],[2,1],[1,1],[0,1],[0,2],[0,3]];
    let tiles=[],selected=null,checking=false,finished=false,started=false,pausedAt=0;
    let encounterStopped=true,encounterRaf=0,lives=MAX_HEARTS,invulnerableUntil=0,loseReason='',valveReady=false;
    const heartNodes=Array.from({length:MAX_HEARTS},(_,i)=>{const img=document.createElement('img');img.className='memory2-heart';img.alt=i===0?'Leben':'';if(i>0)img.setAttribute('aria-hidden','true');livesWrap?.appendChild(img);return img;});
    const updateHearts=()=>{heartNodes.forEach((n,i)=>{n.src=i<lives?HEART.full:HEART.broken;n.classList.toggle('broken',i>=lives);});};
    Promise.all([IMG.flakon,IMG.heroIdle,IMG.heroGuard,IMG.ogreIdle,IMG.ogreThrow,IMG.ogreShocked,IMG.ogreClean,IMG.banana,IMG.sprayOverlay,IMG.feedBanana,HEART.full,HEART.broken,ASSETS.text.gewonnen,ASSETS.text.verloren].map(preloadImage)).catch(()=>{});
    ['glass_break','hurt','richtig_1','richtig_3','spray','throw','minigame_background'].forEach(k=>getAudio(k)?.load?.());
    function initTiles(){tiles=[];for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++){const type=solution[r][c];tiles.push({r,c,type,rotation:initialRot[r][c],filter:type==='F',flow:false,locked:false});} computeFlow();}
    const tileAt=(r,c)=>tiles.find(t=>t.r===r&&t.c===c);
    const rotateDir=(dir,rot)=>ORDER[(ORDER.indexOf(dir)+rot)%4];
    const openings=tile=>(BASE[tile.type]||[]).map(d=>rotateDir(d,tile.rotation));
    const tileKey=(r,c)=>`${r},${c}`;
    const imgFor=tile=>{const green=tile.flow||tile.locked;if(tile.type==='F')return green?IMG.Fg:IMG.F;if(tile.type==='I')return green?IMG.Ig:IMG.I;if(tile.type==='T')return green?IMG.Tg:IMG.T;return green?IMG.Vg:IMG.V;};
    function renderPipeBoard(){board.innerHTML=tiles.map((tile,i)=>{const rot=(tile.rotation%4)*90,label=tile.type==='F'?'Luftreinigungsfilter':`Rohrstück ${tile.type}`;return`<button class="pipe3-tile ${tile.filter?'filter':'rotatable'}" type="button" data-index="${i}" aria-label="${label}"><img src="${imgFor(tile)}" alt="" style="transform:rotate(${rot}deg)"></button>`;}).join('');updateTileClasses();board.querySelectorAll('.pipe3-tile').forEach(btn=>btn.addEventListener('click',()=>onTileClick(Number(btn.dataset.index))));}
    function updateTileClasses(){board.querySelectorAll('.pipe3-tile').forEach((node,i)=>{const tile=tiles[i];node.classList.toggle('selected',selected===i);node.classList.toggle('flow',Boolean(tile.flow));node.classList.toggle('locked',Boolean(tile.locked));node.classList.toggle('filter-found',tile.filter&&tile.flow);const img=node.querySelector('img');if(img){const ns=imgFor(tile);if(img.getAttribute('src')!==ns)img.setAttribute('src',ns);img.style.transform=`rotate(${(tile.rotation%4)*90}deg)`;}});}
    function onTileClick(i){if(checking||finished)return;const tile=tiles[i];if(!tile||tile.filter||tile.locked)return;playRotateSound();if(selected===i)tile.rotation=(tile.rotation+1)%(tile.type==='I'?2:4);else selected=i;computeFlow();updateTileClasses();updateHud();updateValveReadyState();}
    const clearFlow=()=>tiles.forEach(t=>{t.flow=false;});
    function computeFlow(){clearFlow();const start=tileAt(START.r,START.c),visited=new Set(),filters=new Set();if(!start||!openings(start).includes(START.dir))return{exit:false,filters,visited};const q=[start];visited.add(tileKey(start.r,start.c));while(q.length){const tile=q.shift();tile.flow=true;if(tile.filter)filters.add(tileKey(tile.r,tile.c));for(const dir of openings(tile)){if(tile.r===EXIT.r&&tile.c===EXIT.c&&dir===EXIT.dir)continue;const[dr,dc]=STEP[dir],nr=tile.r+dr,nc=tile.c+dc;if(nr<0||nc<0||nr>=ROWS||nc>=COLS)continue;const next=tileAt(nr,nc);if(!next||!openings(next).includes(OPP[dir]))continue;const k=tileKey(nr,nc);if(visited.has(k))continue;visited.add(k);q.push(next);}}const end=tileAt(EXIT.r,EXIT.c),exit=Boolean(end&&visited.has(tileKey(EXIT.r,EXIT.c))&&openings(end).includes(EXIT.dir));return{exit,filters,visited};}
    function updateHud(text){if(!hud)return;if(text){hud.textContent=text;return;}const r=computeFlow();hud.textContent=`Verbundene Filter ${r.filters.size} / ${FILTER_TOTAL}`;}
    function updateValveReadyState(){const r=computeFlow();valveReady=r.exit&&[...filterCells].every(f=>r.filters.has(f));valvePad?.classList.toggle('ready',valveReady);valveBtn?.classList.toggle('ready',valveReady);return valveReady;}
    function applyHint(){if(checking||finished)return;selected=null;const target=hintPath.map(([r,c])=>tileAt(r,c)).find(t=>t&&!t.filter&&(!t.locked||t.rotation!==solvedRot[t.r][t.c]));if(!target){updateHud('Der Lösungsweg ist bereits vollständig als Tipp gesetzt.');return;}target.rotation=solvedRot[target.r][target.c];target.locked=true;computeFlow();playSound('levelunlocked');updateTileClasses();updateHud('Tipp gesetzt: Eine Weg-Kachel wurde korrekt eingerastet.');updateValveReadyState();}
    const GUARD_ACTIVE_MS=700,GUARD_COOLDOWN_MS=1300;let guardState='ready',guardActiveUntil=0,guardCooldownUntil=0;
    const setGuardBarFill=p=>{if(guardBarFill)guardBarFill.style.transform=`scaleX(${clamp(p,0,1)})`;};
    const updateGuardUi=()=>{if(!guardBtn)return;const dis=guardState!=='ready'||!started||finished||Boolean(pausedAt);guardBtn.disabled=dis;guardBtn.classList.toggle('cooldown',dis);};
    const setHeroGuarding=active=>{hero.src=active?IMG.heroGuard:heroIdleSrc;heroWrap?.classList.toggle('guarding',active);};
    function activateGuard(){if(guardState!=='ready'||finished||!started||pausedAt)return;const now=performance.now();guardState='active';guardActiveUntil=now+GUARD_ACTIVE_MS;setHeroGuarding(true);updateGuardUi();setGuardBarFill(1);playSound('richtig_3');}
    function tickGuard(now){if(guardState==='active'){const rem=Math.max(0,guardActiveUntil-now);setGuardBarFill(rem/GUARD_ACTIVE_MS);if(rem<=0){guardState='cooldown';guardCooldownUntil=now+GUARD_COOLDOWN_MS;setHeroGuarding(false);updateGuardUi();setGuardBarFill(0);}}else if(guardState==='cooldown'){const el=GUARD_COOLDOWN_MS-Math.max(0,guardCooldownUntil-now);setGuardBarFill(el/GUARD_COOLDOWN_MS);if(now>=guardCooldownUntil){guardState='ready';updateGuardUi();setGuardBarFill(1);}}else setGuardBarFill(1);}
    let activeBanana=null,nextAttackAt=0,ogreThrowUntil=0;
    const scheduleNextAttack=now=>{nextAttackAt=now+3000+Math.random()*2000;};
    const clearBanana=()=>{activeBanana=null;banana.classList.add('hidden');banana.style.opacity='0';};
    const resetSprayOverlay=()=>{if(!sprayOverlay)return;sprayOverlay.classList.add('hidden');sprayOverlay.classList.remove('fade-out');sprayOverlay.style.opacity='0';};
    function positionOgreZone(){if(!ogreZone||!board)return;const sR=stage.getBoundingClientRect(),bR=board.getBoundingClientRect(),fR=topConnector?.getBoundingClientRect?.(),zR=ogreZone.getBoundingClientRect(),tW=bR.width/6;const fCX=fR?(fR.left-sR.left+fR.width*.50):(bR.left-sR.left+tW*3.5);const tCX=fCX*.60;const minCX=bR.left-sR.left+tW*.55,maxCX=bR.left-sR.left+tW*1.65;const dCX=clamp(tCX,minCX,maxCX),dL=clamp(dCX-zR.width/2,8,sR.width-zR.width-8);const bTop=bR.top-sR.top,dTop=clamp(bTop-zR.height*.70,8,sR.height-zR.height-8);ogreZone.style.left=`${Math.round(dL)}px`;ogreZone.style.top=`${Math.round(dTop)}px`;}
    const showSprayOverlay=()=>{if(!sprayOverlay)return;sprayOverlay.style.removeProperty('left');sprayOverlay.style.removeProperty('top');sprayOverlay.style.removeProperty('width');sprayOverlay.style.removeProperty('height');sprayOverlay.classList.remove('hidden','fade-out');sprayOverlay.style.opacity='1';};
    const fadeSprayOverlay=()=>{if(sprayOverlay)sprayOverlay.classList.add('fade-out');};
    function heroShake(){if(!heroWrap)return;heroWrap.classList.remove('hit');void heroWrap.offsetWidth;heroWrap.classList.add('hit');window.setTimeout(()=>heroWrap.classList.remove('hit'),620);}
    function damageHero(now){if(finished||now<invulnerableUntil)return;invulnerableUntil=now+950;lives=Math.max(0,lives-1);updateHearts();playSound('glass_break');playSound('hurt');heroShake();if(lives<=0){loseReason='lives';window.setTimeout(()=>showResult(false),240);}}
    function startBananaDrop(now){const sR=stage.getBoundingClientRect(),oR=ogre.getBoundingClientRect(),hR=hero.getBoundingClientRect();const hCX=hR.left-sR.left+hR.width*.50,hCY=hR.top-sR.top+hR.height*.45;activeBanana={startTime:now,duration:3600,startX:oR.left-sR.left+oR.width*.72-14,startY:oR.top-sR.top+oR.height*.54,endX:hCX-34,endY:hCY,resolved:false};banana.classList.remove('hidden');banana.style.opacity='1';banana.style.left=`${activeBanana.startX}px`;banana.style.top=`${activeBanana.startY}px`;banana.style.transform='translate(-50%, -50%) rotate(0deg)';}
    function startOgreAttack(now){if(finished||activeBanana||!started||pausedAt)return;ogre.src=IMG.ogreThrow;ogre.classList.add('throwing');ogreThrowUntil=now+820;startBananaDrop(now);playSound('throw');}
    const setOgreIdle=()=>{ogre.src=IMG.ogreIdle;ogre.classList.remove('throwing','shocked');};
    const intersects=(a,b)=>a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top;
    function resolveBanana(blocked,now){if(!activeBanana)return;banana.style.opacity=blocked?'0':'.18';if(blocked)playSound('richtig_1');else damageHero(now);window.setTimeout(clearBanana,blocked?90:140);scheduleNextAttack(now);}
    function tickOgreAttack(now){if(finished||!started||pausedAt)return;if(ogreThrowUntil&&now>=ogreThrowUntil){ogreThrowUntil=0;setOgreIdle();}if(!activeBanana&&now>=nextAttackAt)startOgreAttack(now);if(!activeBanana)return;const progress=clamp((now-activeBanana.startTime)/activeBanana.duration,0,1);const wobX=Math.sin(progress*Math.PI*6)*10,wobRot=Math.sin(progress*Math.PI*8)*12;const x=activeBanana.startX+(activeBanana.endX-activeBanana.startX)*progress+wobX;const y=activeBanana.startY+(activeBanana.endY-activeBanana.startY)*(1-Math.pow(1-progress,2.15));banana.style.left=`${x}px`;banana.style.top=`${y}px`;banana.style.transform=`translate(-50%, -50%) rotate(${wobRot}deg)`;const bR={left:x-26,right:x+26,top:y-24,bottom:y+24},hR=hero.getBoundingClientRect(),sR=stage.getBoundingClientRect();const tR={left:hR.left-sR.left+hR.width*.26,right:hR.left-sR.left+hR.width*.74,top:hR.top-sR.top+hR.height*.18,bottom:hR.top-sR.top+hR.height*.72};if(!activeBanana.resolved&&intersects(bR,tR)){activeBanana.resolved=true;resolveBanana(guardState==='active',now);return;}if(progress>=1&&!activeBanana.resolved){activeBanana.resolved=true;resolveBanana(guardState==='active',now);}}
    const encounterLoop=now=>{if(encounterStopped||pausedAt)return;const t=now||performance.now();tickGuard(t);tickOgreAttack(t);encounterRaf=window.requestAnimationFrame(encounterLoop);};
    function pauseEncounter(){if(!started||finished||pausedAt)return;pausedAt=performance.now();if(encounterRaf){window.cancelAnimationFrame(encounterRaf);encounterRaf=0;}updateGuardUi();}
    function resumeEncounter(){if(!started||finished||!pausedAt)return;const now=performance.now(),shift=now-pausedAt;if(guardState==='active')guardActiveUntil+=shift;if(guardState==='cooldown')guardCooldownUntil+=shift;if(activeBanana)activeBanana.startTime+=shift;if(nextAttackAt)nextAttackAt+=shift;if(ogreThrowUntil)ogreThrowUntil+=shift;pausedAt=0;updateGuardUi();encounterRaf=window.requestAnimationFrame(encounterLoop);}
    function startEncounter(){if(started)return;started=true;encounterStopped=false;pausedAt=0;updateGuardUi();hide(introModal);playSound('minigame_background',{loop:true,restart:true});resetSprayOverlay();scheduleNextAttack(performance.now());encounterRaf=window.requestAnimationFrame(encounterLoop);}
    function showResult(won){if(finished)return;finished=true;encounterStopped=true;pausedAt=0;if(encounterRaf)window.cancelAnimationFrame(encounterRaf);stopSound('minigame_background');if(resultExtraImage)hide(resultExtraImage);if(resultText)show(resultText);if(resultTitle)show(resultTitle);if(resultImage){resultImage.src=won?ASSETS.text.gewonnen:ASSETS.text.verloren;resultImage.alt=won?'Gewonnen':'Verloren';show(resultImage);}
      if(won){playSound('win');resultTitle.textContent='Gewonnen';resultText.textContent='Der Duft startet am Ventil, läuft durch alle vier Luftreinigungsfilter und erreicht den Flakon am oberen Anschluss.';retryBtn.textContent='Zurück zum Spielfeld';hide(boardBtn);retryBtn.onclick=()=>{completeMinigameSlot(slot);location.href=pageUrl('index.html');};}
      else{playSound('lose');retryBtn.textContent='Neuer Versuch';retryBtn.onclick=()=>location.reload();show(boardBtn);if(loseReason==='lives'){if(resultImage){resultImage.src=ASSETS.text.verloren;show(resultImage);}if(resultTitle)hide(resultTitle);if(resultText)hide(resultText);if(resultExtraImage){resultExtraImage.src=IMG.feedBanana;resultExtraImage.alt=`${getHeroName()} unter einem Berg Bananen`;show(resultExtraImage);}}else{resultTitle.textContent='Verloren';resultText.textContent='Der Duftweg ist noch nicht richtig verbunden.';}}
      show(resultModal);}
    valveBtn.addEventListener('click',()=>{if(checking||finished)return;if(!updateValveReadyState()){valveBtn.classList.remove('not-ready');void valveBtn.offsetWidth;valveBtn.classList.add('not-ready');playSound('flip');updateHud('Verbinde erst alle vier Filter bis zum Flakon.');window.setTimeout(()=>valveBtn.classList.remove('not-ready'),420);return;}checking=true;pauseEncounter();encounterStopped=true;clearBanana();resetSprayOverlay();setOgreIdle();selected=null;updateTileClasses();updateHud('Der Duft wird versprüht …');valveImg?.classList.add('spinning');playSound('levelstart');playSound('spray');showSprayOverlay();window.setTimeout(()=>{ogre.src=IMG.ogreClean;ogre.classList.remove('throwing','shocked');},700);window.setTimeout(()=>{valveImg?.classList.remove('spinning');fadeSprayOverlay();updateHud('Der Oger ist jetzt sauber.');window.setTimeout(()=>{resetSprayOverlay();window.setTimeout(()=>{checking=false;showResult(true);},3000);},220);},2000);});
    introStartBtn?.addEventListener('click',startEncounter);guardBtn?.addEventListener('click',activateGuard);hintBtn?.addEventListener('click',applyHint);
    settingsBtn?.addEventListener('click',()=>{pauseEncounter();show(menu);});closeMenuBtn?.addEventListener('click',()=>{hide(menu);resumeEncounter();});
    menuBoardBtn?.addEventListener('click',()=>{stopSound('minigame_background');location.href=pageUrl('index.html');});boardBtn?.addEventListener('click',()=>{stopSound('minigame_background');location.href=pageUrl('index.html');});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseEncounter();else if(!menu||menu.classList.contains('hidden'))resumeEncounter();});
    window.addEventListener('resize',()=>{positionOgreZone();});
    initTiles();renderPipeBoard();updateHud();updateValveReadyState();updateHearts();updateGuardUi();setGuardBarFill(1);clearBanana();resetSprayOverlay();setOgreIdle();positionOgreZone();show(introModal);
  }

  // ─── Minispiel 4 (Tastsinn-Kran) ───────────────────────────────────────────

  function initMiniGame4(){
    addSpeaker();stopSound('background');stopSound('battle_background');playSound('minigame_background',{loop:true,restart:true});
    const slot=Number(qs('slot'))||7,stage=document.querySelector('.touch4-v60-stage'),grid=$('touch4Grid'),bridge=$('touch4Bridge');
    const hero=$('touch4Hero'),scoreEl=$('touch4Score'),messageEl=$('touch4Message'),continueBtn=$('touch4ContinueBtn');
    const countdownEl=$('touch4Countdown'),countdownNumEl=$('touch4CountdownNum'),intro=$('touch4Intro'),introBoardBtn=$('touch4BoardIntroBtn');
    const result=$('touch4Result'),resultImage=$('touch4ResultImage'),resultTitle=$('touch4ResultTitle'),resultText=$('touch4ResultText');
    const resultDetail=$('touch4ResultDetail'),retryBtn=$('touch4RetryBtn'),boardBtn=$('touch4BoardBtn');
    const menu=$('touch4Menu');
    if(!stage||!grid||!bridge)return;if(hero)hero.alt=getHeroName();
    const TOUCH4_CARD_BACK=assetUrl('assets/images/minigame4/card_back.png');
    const TOUCH4_HERO_IDLE=assetUrl('assets/images/minigame4/knight_idle.png');
    const TOUCH4_HERO_RUN=assetUrl('assets/images/minigame4/knight_run.png');
    const TOUCH4_HERO_HURT=assetUrl('assets/images/minigame4/knight_hurt.png');
    const TOUCH4_GAMEOVER_ART=assetUrl('assets/images/minigame4/gameover_screen.png');
    const touch4Meta={slot,isBoss:false};
    stage.style.setProperty('--touch4-bg',`url("${bgForMeta(touch4Meta)}")`);
    applyStagePopup(intro,touch4Meta);applyStagePopup(result,touch4Meta);applyStagePopup(menu,touch4Meta);
    const TOTAL_ROUNDS=3,SHOW_MS=5000,SWAP_COUNTS=[5,6,7],BASE_SWAP_MS=920,FLY_MS=680;
    const softRounds=[{type:'soft',label:'weiches Kissen',img:assetUrl('assets/images/minigame4/soft_pillow.png')},{type:'soft',label:'weiche Wolke',img:assetUrl('assets/images/minigame4/soft_cloud.png')},{type:'soft',label:'weicher Teddy',img:assetUrl('assets/images/minigame4/soft_teddy.png')}];
    const sharpCards=[{type:'sharp',label:'spitzer Kaktus',img:assetUrl('assets/images/minigame4/sharp_cactus.png')},{type:'sharp',label:'stacheliger Igel',img:assetUrl('assets/images/minigame4/sharp_hedgehog.png')},{type:'sharp',label:'spitze Reißzwecke',img:assetUrl('assets/images/minigame4/sharp_pin.png')},{type:'sharp',label:'spitzer Nagel',img:assetUrl('assets/images/minigame4/sharp_nail.png')},{type:'sharp',label:'spitzer Bleistift',img:assetUrl('assets/images/minigame4/sharp_pencil.png')},{type:'sharp',label:'Rose mit Dornen',img:assetUrl('assets/images/minigame4/sharp_rose.png')},{type:'sharp',label:'spitze Kristalle',img:assetUrl('assets/images/minigame4/sharp_crystal.png')},{type:'sharp',label:'stachelige Kugel',img:assetUrl('assets/images/minigame4/sharp_spikeball.png')}];
    let cards=[],bridgeCards=[],roundIndex=0,phase='intro',face='front',timers=[],countdownInterval=null,heroWalkInterval=null,heroFrame=0,finished=false,selected=false;
    const schedule=(fn,ms)=>{const id=window.setTimeout(fn,ms);timers.push(id);return id;};
    const clearTimers=()=>{timers.forEach(id=>window.clearTimeout(id));timers=[];if(countdownInterval){window.clearInterval(countdownInterval);countdownInterval=null;}if(heroWalkInterval){window.clearInterval(heroWalkInterval);heroWalkInterval=null;}};
    const setMessage=(text,kind='')=>{if(!messageEl)return;messageEl.textContent=text;messageEl.className=`touch4-v60-message ${kind}`;};
    const setHeroSprite=src=>{if(hero)hero.src=src;};
    const setHeroPose=(state='idle')=>{if(!hero)return;if(state==='hurt'){setHeroSprite(TOUCH4_HERO_HURT);return;}if(state==='run'){setHeroSprite(heroFrame%2===0?TOUCH4_HERO_IDLE:TOUCH4_HERO_RUN);return;}setHeroSprite(TOUCH4_HERO_IDLE);};
    const startHeroWalk=()=>{if(!hero)return;if(heroWalkInterval)window.clearInterval(heroWalkInterval);heroFrame=0;hero.classList.add('walking');setHeroPose('run');heroWalkInterval=window.setInterval(()=>{heroFrame++;setHeroPose('run');},400);};
    const stopHeroWalk=(endPose='idle')=>{if(heroWalkInterval){window.clearInterval(heroWalkInterval);heroWalkInterval=null;}if(hero)hero.classList.remove('walking');setHeroPose(endPose);};
    const hideCountdown=()=>{if(!countdownEl)return;if(countdownInterval){window.clearInterval(countdownInterval);countdownInterval=null;}countdownEl.classList.add('hidden');if(countdownNumEl)countdownNumEl.textContent='';};
    function startCountdown(seconds=5){if(!countdownEl)return;if(countdownInterval){window.clearInterval(countdownInterval);countdownInterval=null;}let rem=seconds;countdownEl.classList.remove('hidden');const tick=()=>{const safe=Math.max(0,rem);if(countdownNumEl)countdownNumEl.textContent=String(safe);if(safe<=0){hideCountdown();return;}rem--;};tick();countdownInterval=window.setInterval(tick,1000);}
    const buildCards=()=>{const soft={...softRounds[roundIndex],id:`soft-${roundIndex}-${Date.now()}`};const sharp=sharpCards.map((c,i)=>({...c,id:`sharp-${roundIndex}-${i}-${Date.now()}`}));cards=shuffle([soft,...sharp]);face='front';selected=false;};
    const cardInner=(card,showFront=true)=>showFront?`<img class="touch4-v60-card-img" src="${card.img}" alt="${card.label}">`:`<img class="touch4-v60-card-back-img" src="${TOUCH4_CARD_BACK}" alt="Kartenrückseite">`;
    function renderGrid(){const sel=phase==='choice';grid.innerHTML=cards.map((card,i)=>{const isFront=face==='front',state=isFront?'front':'back',softMark=isFront&&phase==='show'&&card.type==='soft'?' soft-target':'';return`<button class="touch4-v60-card ${state}${softMark}" type="button" data-index="${i}" ${sel?'':'disabled'} aria-label="${isFront?card.label:'verdeckte Karte'}">${cardInner(card,isFront)}</button>`;}).join('');grid.querySelectorAll('.touch4-v60-card').forEach(btn=>btn.addEventListener('click',()=>chooseCard(Number(btn.dataset.index))));}
    function renderBridge(revealIndex=-1){bridge.innerHTML='';for(let i=0;i<TOTAL_ROUNDS;i++){const card=bridgeCards[i],slotEl=document.createElement('div');slotEl.className='touch4-v60-bridge-slot';slotEl.dataset.slot=String(i);if(!card)slotEl.classList.add('empty');else if(i<=revealIndex){slotEl.classList.add('revealed',card.type);slotEl.innerHTML=cardInner(card,true);}else{slotEl.classList.add('back');slotEl.innerHTML=cardInner(card,false);}bridge.appendChild(slotEl);}}
    const neighborsOf=i=>{const row=Math.floor(i/3),col=i%3,n=[];if(col>0)n.push(i-1);if(col<2)n.push(i+1);if(row>0)n.push(i-3);if(row<2)n.push(i+3);return n;};
    function adjacentPairFor(kind='any'){const candidates=[];Array.from({length:9},(_,i)=>i).forEach(i=>neighborsOf(i).forEach(j=>{if(j<i)return;const a=cards[i],b=cards[j];if(!a||!b)return;if(kind==='soft'&&a.type!=='soft'&&b.type!=='soft')return;if(kind==='sharp'&&(a.type!=='sharp'||b.type!=='sharp'))return;candidates.push([i,j]);}));if(!candidates.length&&kind!=='any')return adjacentPairFor('any');return candidates[Math.floor(Math.random()*candidates.length)]||[0,1];}
    const makeMixPlan=()=>shuffle([...Array(Math.min(3,SWAP_COUNTS[roundIndex]||5)).fill('soft'),...Array(Math.max(0,(SWAP_COUNTS[roundIndex]||5)-3)).fill('sharp')]);
    const curSwapMs=()=>Math.round(BASE_SWAP_MS*Math.pow(0.9,roundIndex));
    function animateSwap(i,j,done){const cells=grid.querySelectorAll('.touch4-v60-card'),a=cells[i],b=cells[j];if(!a||!b){done();return;}const ar=a.getBoundingClientRect(),br=b.getBoundingClientRect(),dx=br.left-ar.left,dy=br.top-ar.top;a.style.setProperty('--swap-x',`${dx}px`);a.style.setProperty('--swap-y',`${dy}px`);b.style.setProperty('--swap-x',`${-dx}px`);b.style.setProperty('--swap-y',`${-dy}px`);a.classList.add('swap-highlight','swap-move');b.classList.add('swap-highlight','swap-move');playSound('flip');schedule(()=>{[cards[i],cards[j]]=[cards[j],cards[i]];renderGrid();done();},620);}
    function mixCards(step=0,plan=makeMixPlan()){if(finished||phase!=='mix')return;if(step>=plan.length){phase='choice';face='back';renderGrid();setMessage('','good');return;}setMessage('');const[i,j]=adjacentPairFor(plan[step]),swapMs=curSwapMs();animateSwap(i,j,()=>schedule(()=>mixCards(step+1,plan),Math.max(120,swapMs-620)));}
    function beginRound(){if(finished||roundIndex>=TOTAL_ROUNDS)return;phase='show';grid.classList.remove('turning-to-back','chests-arrive');buildCards();renderGrid();renderBridge();startCountdown(5);setMessage('');schedule(()=>{if(finished)return;hideCountdown();grid.classList.add('turning-to-back');schedule(()=>{if(finished)return;phase='mix';face='back';grid.classList.remove('turning-to-back');grid.classList.add('chests-arrive');renderGrid();schedule(()=>{grid.classList.remove('chests-arrive');mixCards(0);},420);},420);},SHOW_MS);}
    function animateToBridge(cell,card,done){const slots=bridge.querySelectorAll('.touch4-v60-bridge-slot'),target=slots[bridgeCards.length];if(!cell||!target){done();return;}const start=cell.getBoundingClientRect(),end=target.getBoundingClientRect(),clone=cell.cloneNode(true);clone.classList.add('touch4-v60-flying');clone.style.left=`${start.left}px`;clone.style.top=`${start.top}px`;clone.style.width=`${start.width}px`;clone.style.height=`${start.height}px`;document.body.appendChild(clone);cell.classList.add('picked');requestAnimationFrame(()=>{clone.style.transform=`translate(${end.left-start.left}px,${end.top-start.top}px) scale(${end.width/start.width})`;});schedule(()=>{clone.remove();done();},FLY_MS);}
    function chooseCard(index){if(finished||phase!=='choice'||selected)return;const card=cards[index];if(!card)return;selected=true;hideCountdown();phase='selected';setMessage('');playSound('collect');const cell=grid.querySelector(`.touch4-v60-card[data-index="${index}"]`);animateToBridge(cell,card,()=>{bridgeCards.push({...card});roundIndex++;if(bridgeCards.length>=TOTAL_ROUNDS){setMessage('');show(continueBtn);}else{setMessage('');schedule(beginRound,900);}});}
    function heroMoveTo(targetX,done,duration=740){if(!hero){done();return;}startHeroWalk();hero.style.left=`${targetX}px`;schedule(()=>{stopHeroWalk('idle');done();},duration);}
    function continuePath(){if(finished||phase==='walking')return;phase='walking';hide(continueBtn);setMessage('');const pitScene=document.querySelector('.touch4-v60-pit-scene');if(!pitScene)return;const sceneRect=pitScene.getBoundingClientRect(),gapRect=document.querySelector('.touch4-v60-gap')?.getBoundingClientRect(),edgeX=gapRect?Math.max(0,gapRect.left-sceneRect.left-42):sceneRect.width*.24;function revealAll(i=0){if(i>=bridgeCards.length){schedule(()=>walkAcross(0),360);return;}renderBridge(i);playSound('flip');schedule(()=>revealAll(i+1),520);}function walkAcross(i=0){const curSlots=Array.from(bridge.querySelectorAll('.touch4-v60-bridge-slot'));if(i>=bridgeCards.length){heroMoveTo(sceneRect.width+28,()=>showResult(true));return;}const sR=curSlots[i]?.getBoundingClientRect(),x=sR?(sR.left-sceneRect.left+sR.width*.5-30):sceneRect.width*.5;heroMoveTo(x,()=>{const card=bridgeCards[i];if(card.type==='sharp'){setMessage('','bad');playSound('hurt');stopHeroWalk('hurt');schedule(()=>showResult(false),2000);}else{i++;schedule(()=>walkAcross(i),220);}});}heroMoveTo(edgeX,()=>schedule(()=>revealAll(0),260));}
    function showResult(won){if(finished)return;finished=true;clearTimers();stopSound('minigame_background');if(resultImage){resultImage.src=won?ASSETS.text.gewonnen:ASSETS.text.verloren;resultImage.alt=won?'Gewonnen':'Verloren';show(resultImage);}if(resultDetail){if(won){hide(resultDetail);resultDetail.removeAttribute('src');}else{resultDetail.src=TOUCH4_GAMEOVER_ART;resultDetail.alt=`${getHeroName()} wurde von spitzen Gegenständen gepikst`;show(resultDetail);}}resultTitle.textContent=won?'Gewonnen':'Verloren';resultText.textContent=won?`Alle drei Brückenkarten waren weich. ${getHeroName()} konnte sicher über die Grube laufen.`:`Mindestens eine Brückenkarte war spitz. ${getHeroName()} wurde gepikst – das ist für die Haut ein Warnsignal.`;playSound(won?'win':'lose');retryBtn.textContent=won?'Zurück zum Spielfeld':'Neuer Versuch';retryBtn.onclick=()=>{if(won){completeMinigameSlot(slot);location.href=pageUrl('index.html');}else location.reload();};show(boardBtn);show(result);}
    setHeroPose('idle');$('touch4StartBtn')?.addEventListener('click',()=>{hide(intro);beginRound();});introBoardBtn?.addEventListener('click',()=>{stopSound('minigame_background');location.href=pageUrl('index.html');});
    $('touch4SettingsBtn')?.addEventListener('click',()=>show(menu));$('touch4CloseMenuBtn')?.addEventListener('click',()=>hide(menu));$('touch4MenuBoardBtn')?.addEventListener('click',()=>{stopSound('minigame_background');location.href=pageUrl('index.html');});
    boardBtn?.addEventListener('click',()=>{stopSound('minigame_background');location.href=pageUrl('index.html');});continueBtn?.addEventListener('click',continuePath);
    renderBridge();show(intro);
  }

  // ─── Codes-Screen ──────────────────────────────────────────────────────────

  function initCodes(){
    addSpeaker();$('printCodesBtn')?.addEventListener('click',()=>print());
    const grid=$('qrGrid');if(!grid)return;
    grid.innerHTML=[...Object.values(SENSES),BOSS].map(s=>`<article class="qr-card"><img src="${assetUrl(`assets/images/qr/qr_${s.id}.png`)}" alt="QR-Code ${esc(s.label)}"><h2>${esc(s.label)}</h2><p>${esc(s.code)}</p></article>`).join('');
  }

  // ─── Magic Castle ──────────────────────────────────────────────────────────

  function initMagicCastle(){
    addSpeaker();const root=$('magicCastleModal')||document.body;
    if(root?.dataset?.magicCastleReady==='1'){window.__refreshMagicCastleLocks?.();return;}if(root?.dataset)root.dataset.magicCastleReady='1';
    const hero=$('magicCastleHero');if(hero)hero.alt=`${getHeroName()} auf der Brücke`;
    const keyBar=$('magicCastleKeyBar');let magicUnlockingId=null;
    const renderKeyBar=state=>{if(!keyBar)return;keyBar.innerHTML=KEY_ORDER.filter(id=>state.keysFound?.[id]&&!state.removedLocks?.[id]).map(id=>`<button class="magic-castle-key-chip" type="button" data-key-id="${id}" aria-label="${esc(BIOME_BY_SENSE[id].label)}-Schlüssel verwenden"><img src="${assetUrl(BIOME_BY_SENSE[id].key)}" alt="${esc(BIOME_BY_SENSE[id].label+'-Schlüssel')}"></button>`).join('');keyBar.querySelectorAll('.magic-castle-key-chip').forEach(chip=>chip.addEventListener('click',()=>document.querySelector(`.magic-castle-lock[data-lock-id="${chip.dataset.keyId}"]`)?.click()));};
    const renderLocks=()=>{const state=getState();renderKeyBar(state);document.querySelectorAll('.magic-castle-lock').forEach(lock=>{const id=lock.dataset.lockId,opened=Boolean(state.removedLocks?.[id]),unlockable=Boolean(state.keysFound?.[id]);lock.classList.toggle('is-opened',opened);lock.classList.toggle('is-unlockable',unlockable&&!opened);lock.classList.toggle('is-locked',!unlockable&&!opened);lock.classList.remove('is-targeted');lock.disabled=opened;});};
    window.__refreshMagicCastleLocks=renderLocks;
    $('magicCastlePopupBack')?.addEventListener('click',hideMagicCastleModal);$('magicCastleModal')?.addEventListener('click',ev=>{if(ev.target===$('magicCastleModal'))hideMagicCastleModal();});
    const flyKeyToLock=(id,lock)=>{if(magicUnlockingId)return;const state=getState();if(state.removedLocks?.[id]||!state.keysFound?.[id])return;magicUnlockingId=id;const chip=document.querySelector(`.magic-castle-key-chip[data-key-id="${id}"]`),heroRect=hero?.getBoundingClientRect?.(),lockRect=lock.getBoundingClientRect();const start=heroRect?{x:heroRect.left+heroRect.width*.62,y:heroRect.top+heroRect.height*.48}:{x:lockRect.left-70,y:lockRect.top+lockRect.height*.8};const end={x:lockRect.left+lockRect.width*.5,y:lockRect.top+lockRect.height*.5},control={x:(start.x+end.x)/2,y:Math.min(start.y,end.y)-Math.max(54,Math.abs(end.x-start.x)*.18)};const flyer=document.createElement('div');flyer.className='magic-castle-flying-key';flyer.innerHTML=`<img src="${assetUrl(BIOME_BY_SENSE[id].key)}" alt="">`;flyer.style.left=`${start.x}px`;flyer.style.top=`${start.y}px`;flyer.style.width=`${Math.max(46,Math.min(74,lockRect.width*.82))}px`;document.body.appendChild(flyer);chip?.classList.add('is-launching');lock.classList.add('is-targeted');playSound('collect');const t0=performance.now(),ease=t=>1-Math.pow(1-t,3);const tick=now=>{const raw=Math.min(1,(now-t0)/900),t=ease(raw),omt=1-t;const x=omt*omt*start.x+2*omt*t*control.x+t*t*end.x,y=omt*omt*start.y+2*omt*t*control.y+t*t*end.y;flyer.style.left=`${x}px`;flyer.style.top=`${y}px`;flyer.style.transform=`translate(-50%,-50%) rotate(${Math.round(t*620)}deg) scale(${(1-t*.18).toFixed(3)})`;if(raw<1){requestAnimationFrame(tick);return;}flyer.classList.add('is-burst');lock.classList.add('is-opening');playSound('levelunlocked');window.setTimeout(()=>{flyer.remove();const next=getState();next.removedLocks[id]=true;setState(next);magicUnlockingId=null;renderLocks();},280);};requestAnimationFrame(tick);};
    document.querySelectorAll('.magic-castle-lock').forEach(lock=>lock.addEventListener('click',()=>{const id=lock.dataset.lockId,state=getState();if(state.removedLocks?.[id]||magicUnlockingId)return;if(!state.keysFound?.[id]){const btn=lock;btn.classList.remove('shake-once');void btn.offsetWidth;btn.classList.add('shake-once');return;}flyKeyToLock(id,lock);}));
    renderLocks();
  }

  // ─── Dispatcher ────────────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded',()=>{
    const page=document.body.dataset.page;
    if      (page==='board')     initBoard();
    else if (page==='magiccastle')initMagicCastle();
    else if (page==='story')     initStory();
    else if (page==='level')     initLevel();
    else if (page==='battle')    initBattle();
    else if (page==='minigame')  initMiniGame();
    else if (page==='minigame2') initMiniGame2();
    else if (page==='minigame3') initMiniGame3();
    else if (page==='minigame4') initMiniGame4();
    else if (page==='codes')     initCodes();
  });

})();
