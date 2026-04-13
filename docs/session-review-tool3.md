---
layout: none
title: Session Review Tool v3
nav_order: 2
has_children: true
---

<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>ACR Poker Replayer</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#07101f;--border:rgba(255,255,255,0.08);--text:#d8e4f0;
  --muted:#3d5068;--muted2:#5a7090;--accent:#4d8aff;--hero:#a78bfa;
  --green:#22d47a;--red:#f06060;--gold:#f5c542;
  --felt-dark:#0b2318;--felt-mid:#133320;--felt-light:#1a4229;--rail:#0a1c10;
  --spade:#c8d8f0;--heart:#f06060;--diamond:#3dcfcf;--club:#5dd47a;
}
html,body{height:100%;overflow:hidden}
body{background:var(--bg);color:var(--text);font-family:'Rajdhani','Trebuchet MS',sans-serif;display:flex;flex-direction:column;-webkit-tap-highlight-color:transparent}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#1e3050;border-radius:3px}

/* HEADER */
#header{display:flex;align-items:center;gap:7px;padding:0 10px;height:44px;flex-shrink:0;background:rgba(7,14,28,0.98);border-bottom:1px solid var(--border);position:relative;z-index:100;overflow:hidden}
.logo{font-size:18px;flex-shrink:0}
.site-title{font-size:13px;font-weight:700;letter-spacing:2px;color:var(--hero);flex-shrink:0}
#stakes-badge{background:rgba(77,138,255,0.12);border:1px solid rgba(77,138,255,0.25);border-radius:20px;padding:2px 8px;font-size:10px;font-family:'IBM Plex Mono',monospace;color:var(--accent);display:none;flex-shrink:0}
#profit-badge{font-size:11px;font-family:'IBM Plex Mono',monospace;font-weight:600;display:none;padding:2px 8px;border-radius:20px;flex-shrink:0}
.profit-pos{background:rgba(34,212,122,0.1);border:1px solid rgba(34,212,122,0.25);color:var(--green)}
.profit-neg{background:rgba(240,96,96,0.1);border:1px solid rgba(240,96,96,0.25);color:var(--red)}
.hdr-spacer{flex:1;min-width:4px}
.btn{border:none;border-radius:6px;cursor:pointer;font-family:'Rajdhani',sans-serif;font-weight:700;letter-spacing:0.5px;transition:all 0.15s;display:inline-flex;align-items:center;gap:4px;white-space:nowrap;flex-shrink:0}
.btn:active{transform:scale(0.94)}
.btn-load{background:linear-gradient(135deg,#2d4db0,#5535b0);color:#fff;padding:6px 10px;font-size:11px}
.btn-export{background:linear-gradient(135deg,#0a6e5e,#0b9680);color:#fff;padding:6px 10px;font-size:11px;display:none}
.btn-filter{background:rgba(245,197,66,0.12);border:1px solid rgba(245,197,66,0.3);color:var(--gold);padding:5px 9px;font-size:10px;display:none;border-radius:5px}
.btn-filter.active{background:rgba(245,197,66,0.25)}
#menu-btn{display:none;background:none;border:none;color:var(--muted2);font-size:19px;cursor:pointer;padding:4px;line-height:1;flex-shrink:0}
@media(max-width:680px){#menu-btn{display:flex}}

/* MAIN — sidebar is OUTSIDE flex flow on mobile */
#main{position:relative;flex:1;overflow:hidden;min-height:0;display:flex}

/* SIDEBAR */
#sidebar{width:160px;background:rgba(7,13,25,0.97);border-right:1px solid var(--border);display:flex;flex-direction:column;overflow:hidden;flex-shrink:0;z-index:50}
@media(max-width:680px){
  #sidebar{position:absolute;top:0;left:0;bottom:0;width:0;border:none;transition:width 0.22s;box-shadow:none}
  #sidebar.open{width:160px;border-right:1px solid var(--border);box-shadow:4px 0 24px rgba(0,0,0,0.7)}
}
#sb-overlay{display:none;position:absolute;inset:0;z-index:49;background:rgba(0,0,0,0.5)}
#sb-overlay.show{display:block}
.sb-hdr{padding:7px 10px;font-size:9px;font-weight:700;letter-spacing:1.5px;color:var(--muted);border-bottom:1px solid var(--border);text-transform:uppercase;flex-shrink:0;display:flex;align-items:center;justify-content:space-between}
#stats-panel{padding:8px 10px;border-bottom:1px solid var(--border);display:none;flex-shrink:0}
.stat-row{display:flex;justify-content:space-between;margin-bottom:3px;font-size:10px}
.stat-k{color:var(--muted2)}.stat-v{font-family:'IBM Plex Mono',monospace;font-size:9px;font-weight:600;color:var(--text)}
.stat-v.pos{color:var(--green)}.stat-v.neg{color:var(--red)}
#handlist{flex:1;overflow-y:auto}
.hand-item{padding:6px 10px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.03);border-left:2px solid transparent;transition:all 0.1s}
.hand-item:hover{background:rgba(77,138,255,0.07)}
.hand-item.active{background:rgba(77,138,255,0.13);border-left-color:var(--accent)}
.hand-item.big-pot{border-left-color:var(--gold)!important}
.hi-num{font-size:10px;font-weight:700;color:var(--muted2)}
.hand-item.active .hi-num{color:var(--hero)}
.hi-meta{font-size:9px;color:var(--muted);font-family:'IBM Plex Mono',monospace}
.hi-win{font-size:9px;color:var(--green)}
.hi-new{font-size:8px;color:var(--gold)}

/* CENTER — fills remaining space */
#center{flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0}

/* INFOBAR */
#infobar{padding:0 10px;height:27px;flex-shrink:0;display:flex;align-items:center;gap:8px;background:rgba(7,13,25,0.95);border-bottom:1px solid var(--border);font-size:9px;font-family:'IBM Plex Mono',monospace;overflow:hidden}
.ib-pill{background:rgba(77,138,255,0.1);border:1px solid rgba(77,138,255,0.2);border-radius:10px;padding:1px 7px;color:var(--accent);font-size:9px;white-space:nowrap;flex-shrink:0}
#ib-stakes{color:var(--muted2);font-size:9px;white-space:nowrap;flex-shrink:0}
#ib-event{margin-left:auto;font-size:10px;color:var(--gold);font-weight:700;font-family:'Rajdhani',sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:55%}

/* TABLE */
#table-area{flex:1;position:relative;overflow:hidden}
#felt-outer{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:min(86%,540px);height:min(74%,320px);min-width:250px;min-height:170px;border-radius:50%;background:radial-gradient(ellipse at 40% 38%,var(--felt-light),var(--felt-mid) 50%,var(--felt-dark));border:6px solid var(--rail);box-shadow:0 0 0 2px rgba(255,255,255,0.04),0 0 0 8px #050d12,0 0 60px rgba(0,0,0,0.8),inset 0 0 40px rgba(0,0,0,0.4)}
#board-wrap{position:absolute;top:50%;left:50%;transform:translate(-50%,-54%);display:flex;gap:5px;align-items:center;z-index:10}
#pot-display{position:absolute;top:50%;left:50%;transform:translate(-50%,-230%);font-size:11px;font-weight:700;color:var(--gold);background:rgba(0,0,0,0.6);padding:2px 10px;border-radius:20px;z-index:11;display:none;font-family:'IBM Plex Mono',monospace;white-space:nowrap}
#street-label{position:absolute;top:50%;left:50%;transform:translate(-50%,-320%);font-size:10px;font-weight:700;letter-spacing:2px;color:rgba(255,255,255,0.18);text-transform:uppercase;pointer-events:none;z-index:9}

/* ON-FELT ACTION LOG */
#felt-log{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);z-index:30;display:flex;flex-direction:column;align-items:center;gap:3px;pointer-events:none;width:min(300px,80%)}
.felt-log-line{background:rgba(5,10,22,0.82);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:2px 10px;font-size:10px;font-family:'IBM Plex Mono',monospace;color:var(--muted2);white-space:nowrap;animation:fadeup 0.25s ease}
.felt-log-line.fl-street{color:var(--accent);font-weight:600;letter-spacing:1px;background:rgba(5,10,35,0.85);border-color:rgba(77,138,255,0.2)}
.felt-log-line.fl-raise{color:var(--red)}
.felt-log-line.fl-bet{color:var(--gold)}
.felt-log-line.fl-call{color:var(--green)}
.felt-log-line.fl-win{color:var(--hero)}
@keyframes fadeup{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}

#players-wrap{position:absolute;inset:0;z-index:20;pointer-events:none}
#bets-wrap{position:absolute;inset:0;z-index:15;pointer-events:none}
.bet-chip{position:absolute;transform:translate(-50%,-50%);background:rgba(245,197,66,0.15);border:1px solid rgba(245,197,66,0.5);border-radius:6px;padding:2px 6px;font-size:9px;font-family:'IBM Plex Mono',monospace;font-weight:600;color:var(--gold);white-space:nowrap;animation:chipIn 0.18s ease}
@keyframes chipIn{from{transform:translate(-50%,-50%) scale(0.4);opacity:0}to{transform:translate(-50%,-50%) scale(1);opacity:1}}

/* PLAYER BOXES */
.player-box{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:2px;transition:transform 0.2s}
.player-cards{display:flex;gap:2px;margin-bottom:1px}
.p-chip{background:rgba(8,15,30,0.9);border:1px solid rgba(255,255,255,0.1);border-radius:7px;padding:3px 7px;display:flex;flex-direction:column;align-items:center;min-width:58px;transition:all 0.2s}
.p-chip.is-hero{border-color:rgba(167,139,250,0.5);background:rgba(28,12,55,0.88)}
.p-chip.is-active{border-color:var(--gold)!important;box-shadow:0 0 0 1px rgba(245,197,66,0.3),0 0 16px rgba(245,197,66,0.25);background:rgba(38,28,5,0.92)!important;animation:activePulse 1s ease infinite}
@keyframes activePulse{0%,100%{box-shadow:0 0 0 1px rgba(245,197,66,0.3),0 0 10px rgba(245,197,66,0.18)}50%{box-shadow:0 0 0 2px rgba(245,197,66,0.55),0 0 22px rgba(245,197,66,0.4)}}
.p-chip.folded{opacity:0.35}
.p-pos{font-size:10px;font-weight:700;color:var(--text);white-space:nowrap}
.p-pos.hero-pos{color:var(--hero)}
.p-stack{font-size:8px;color:var(--muted2);font-family:'IBM Plex Mono',monospace}
.dealer-btn{position:absolute;top:-7px;right:-7px;width:15px;height:15px;border-radius:50%;background:var(--gold);color:#1a0800;font-size:7px;font-weight:900;display:flex;align-items:center;justify-content:center;border:1px solid #e0a800;z-index:25}
.action-badge{border-radius:10px;padding:2px 7px;font-size:8px;font-weight:700;color:#fff;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;animation:badgePop 0.18s ease}
@keyframes badgePop{from{transform:scale(0.5);opacity:0}to{transform:scale(1);opacity:1}}
.turn-arrow{position:absolute;bottom:-14px;left:50%;transform:translateX(-50%);font-size:10px;color:var(--gold);animation:bounce 0.55s ease infinite alternate}
@keyframes bounce{from{transform:translateX(-50%) translateY(0)}to{transform:translateX(-50%) translateY(-3px)}}
.new-player-badge{position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:rgba(245,197,66,0.18);border:1px solid rgba(245,197,66,0.45);border-radius:4px;padding:1px 5px;font-size:7px;font-weight:700;color:var(--gold);white-space:nowrap;letter-spacing:0.5px}

/* CARDS */
.card{border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 1px 4px rgba(0,0,0,0.6)}
.card.sm{width:26px;height:36px}.card.md{width:38px;height:52px}
.card.back{background:linear-gradient(145deg,#1a3565,#0d1f3e);border:1px solid #243a5f}
.card.suit-s{background:#0a1420;border:1px solid #1e3050}
.card.suit-h{background:#200a0a;border:1px solid #501010}
.card.suit-d{background:#081818;border:1px solid #104040}
.card.suit-c{background:#081408;border:1px solid #124020}
.card-rank{font-family:'IBM Plex Mono',monospace;font-weight:600;line-height:1;letter-spacing:-1px;text-shadow:0 0 8px currentColor}
.card.sm .card-rank{font-size:13px}.card.md .card-rank{font-size:18px}
.suit-s .card-rank{color:var(--spade)}.suit-h .card-rank{color:var(--heart)}
.suit-d .card-rank{color:var(--diamond)}.suit-c .card-rank{color:var(--club)}

/* CONTROLS */
#controls{padding:8px 10px 10px;flex-shrink:0;background:rgba(6,11,22,0.98);border-top:1px solid var(--border);display:flex;flex-direction:column;gap:6px}
#scrub-row{display:flex;align-items:center;gap:8px}
#frame-lbl{font-size:9px;color:var(--muted);font-family:'IBM Plex Mono',monospace;min-width:40px}
#scrubber{flex:1;accent-color:var(--accent);cursor:pointer;height:4px}
#btn-row{display:flex;gap:5px;align-items:center;justify-content:center;flex-wrap:wrap}
.ctrl-btn{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.09);border-radius:5px;width:36px;height:32px;color:#6080a0;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.12s;touch-action:manipulation}
.ctrl-btn:hover:not(:disabled){background:rgba(255,255,255,0.1);color:var(--text)}
.ctrl-btn:disabled{color:#1e2e40;cursor:not-allowed}
.ctrl-btn:active:not(:disabled){transform:scale(0.92)}
#play-btn{background:linear-gradient(135deg,#2d4db0,#5535b0);border:none;border-radius:7px;width:44px;height:32px;color:#fff;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;touch-action:manipulation;transition:all 0.12s}
#play-btn.stop{background:linear-gradient(135deg,#8b1515,#c02020)}
#play-btn:active{transform:scale(0.92)}
.speed-btn{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:4px 9px;color:var(--muted2);font-size:10px;font-weight:700;cursor:pointer;font-family:'IBM Plex Mono',monospace;touch-action:manipulation}
.speed-btn.on{background:rgba(77,138,255,0.2);border-color:var(--accent);color:var(--accent)}
.ctrl-div{width:1px;height:20px;background:rgba(255,255,255,0.07);margin:0 2px}

/* UPLOAD SCREEN */
#upload-screen{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;padding:24px}
#drop-zone{width:min(330px,100%);padding:36px 28px;border-radius:14px;border:2px dashed rgba(77,138,255,0.3);background:rgba(77,138,255,0.04);display:flex;flex-direction:column;align-items:center;gap:14px;cursor:pointer;transition:all 0.2s;animation:breathe 3s ease-in-out infinite}
#drop-zone:hover,#drop-zone.drag-over{border-color:rgba(77,138,255,0.65);background:rgba(77,138,255,0.1)}
.dz-icon{font-size:46px}.dz-title{font-size:16px;font-weight:700;color:var(--hero);text-align:center}.dz-sub{font-size:12px;color:var(--muted2);text-align:center;line-height:1.7}
#error-msg{color:var(--red);font-size:12px;max-width:320px;text-align:center;display:none}
.upload-hint{font-size:11px;color:var(--muted);text-align:center;max-width:360px;line-height:1.7}
@keyframes breathe{0%,100%{box-shadow:0 0 20px rgba(77,138,255,0.1)}50%{box-shadow:0 0 40px rgba(77,138,255,0.28)}}

/* TOAST */
#toast{position:fixed;bottom:16px;right:16px;left:16px;max-width:420px;margin:0 auto;background:#0a7060;color:#fff;padding:10px 14px;border-radius:8px;font-size:12px;font-weight:700;box-shadow:0 4px 20px rgba(0,0,0,0.5);transform:translateY(70px);opacity:0;transition:all 0.3s ease;z-index:999}
#toast.show{transform:translateY(0);opacity:1}
</style>
</head>
<body>

<div id="header">
  <button id="menu-btn" onclick="toggleSidebar()">☰</button>
  <span class="logo">♠</span>
  <span class="site-title">ACR REPLAYER</span>
  <span id="stakes-badge"></span>
  <span id="profit-badge"></span>
  <div class="hdr-spacer"></div>
  <button class="btn btn-filter" id="filter-btn" onclick="toggleFilter()">⭐ Big Hands</button>
  <button class="btn btn-export" id="export-btn" onclick="exportBlogPost()">📝 Export</button>
  <button class="btn btn-load" onclick="document.getElementById('file-input').click()">📂 Load</button>
  <input type="file" id="file-input" accept=".txt" style="display:none">
</div>

<div id="upload-screen">
  <div id="drop-zone" onclick="document.getElementById('file-input').click()">
    <span class="dz-icon">🃏</span>
    <span class="dz-title">Load Your Hand History</span>
    <span class="dz-sub">ACR → My Hand History → export .txt<br>Drop here or tap to browse</span>
    <button class="btn btn-load" style="pointer-events:none">Browse File</button>
  </div>
  <div id="error-msg"></div>
  <p class="upload-hint">Exports Jekyll-ready <strong>.md + .html</strong> for learnpokerwithme.com<br>All players anonymised · Hero front-centre · BB display</p>
</div>

<div id="main" style="display:none">
  <div id="sb-overlay" onclick="closeSidebar()"></div>
  <div id="sidebar">
    <div class="sb-hdr">
      <span id="hands-hdr">HANDS (0)</span>
      <span id="filter-ind" style="font-size:8px;color:var(--gold);display:none">★</span>
    </div>
    <div id="stats-panel">
      <div class="stat-row"><span class="stat-k">Hands</span><span class="stat-v" id="s-hands">—</span></div>
      <div class="stat-row"><span class="stat-k">Net</span><span class="stat-v" id="s-net">—</span></div>
      <div class="stat-row"><span class="stat-k">BB/100</span><span class="stat-v" id="s-bb100">—</span></div>
      <div class="stat-row"><span class="stat-k">VPIP</span><span class="stat-v" id="s-vpip">—</span></div>
      <div class="stat-row"><span class="stat-k">PFR</span><span class="stat-v" id="s-pfr">—</span></div>
    </div>
    <div id="handlist"></div>
  </div>

  <div id="center">
    <div id="infobar">
      <span class="ib-pill" id="ib-hand">—</span>
      <span id="ib-stakes"></span>
      <span id="ib-event"></span>
    </div>
    <div id="table-area">
      <div id="felt-outer"></div>
      <div id="street-label"></div>
      <div id="board-wrap"></div>
      <div id="pot-display"></div>
      <div id="bets-wrap"></div>
      <div id="players-wrap"></div>
      <div id="felt-log"></div>
    </div>
    <div id="controls">
      <div id="scrub-row">
        <span id="frame-lbl">0/0</span>
        <input type="range" id="scrubber" min="0" max="0" value="0">
      </div>
      <div id="btn-row">
        <button class="ctrl-btn" id="btn-ph" onclick="prevHand()" disabled>⏮</button>
        <button class="ctrl-btn" onclick="stepBack()">◀</button>
        <button id="play-btn" onclick="togglePlay()">▶</button>
        <button class="ctrl-btn" onclick="stepFwd()">▶</button>
        <button class="ctrl-btn" id="btn-nh" onclick="nextHand()">⏭</button>
        <div class="ctrl-div"></div>
        <button class="speed-btn on" data-speed="2200" onclick="setSpeed(this)">1×</button>
        <button class="speed-btn" data-speed="1300" onclick="setSpeed(this)">1.5×</button>
        <button class="speed-btn" data-speed="650" onclick="setSpeed(this)">3×</button>
      </div>
    </div>
  </div>
</div>

<div id="toast"></div>

<script>
// ══════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════
let ALL_HANDS = [], VIEW_HANDS = [];
let handIdx = 0, frameIdx = 0, frames = [];
let playing = false, speed = 2200, ticker = null;
let feltLog = [];   // last N action strings shown on felt
let filterActive = false;

// ══════════════════════════════════════════════
// PARSER  — FIX: strict stakes regex, no date collision
// ══════════════════════════════════════════════
function parseHandHistory(raw) {
  return raw.split(/(?=Hand #\d+)/g)
    .filter(c => c.trim().length > 60)
    .map(parseHand).filter(Boolean);
}

function parseHand(text) {
  try {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    const hand = {
      id:'', stakes:'', bb:0.02, date:'', table:'',
      players:[], hero:null, button:null,
      smallBlind:null, bigBlind:null,
      streets:{preflop:[],flop:[],turn:[],river:[]},
      board:{flop:[],turn:null,river:null},
      pot:0, potBB:0, winners:[], newPlayers:[],
    };

    const hdr = lines[0] || '';

    // Hand ID
    const idM = hdr.match(/Hand #(\d+)/i);
    hand.id = idM ? idM[1] : Math.random().toString(36).slice(2,8);

    // STAKES — must look like $0.01/$0.02 or 0.01/0.02 (small decimals, not year-like numbers)
    // Strategy: find the stakes token that sits BEFORE any date-like pattern
    const stkM = hdr.match(/\$(\d{1,4}(?:\.\d{1,4})?)\/\$?(\d{1,4}(?:\.\d{1,4})?)/);
    if (stkM) {
      hand.stakes = `$${stkM[1]}/$${stkM[2]}`;
      hand.bb = parseFloat(stkM[2]);
    } else {
      // fallback: no-$ version, but only accept small numbers (< 1000)
      const stk2 = hdr.match(/\b(\d{1,3}(?:\.\d{1,4})?)\/(\d{1,3}(?:\.\d{1,4})?)\b/);
      if (stk2 && parseFloat(stk2[1]) < 500) {
        hand.stakes = `$${stk2[1]}/$${stk2[2]}`;
        hand.bb = parseFloat(stk2[2]);
      }
    }

    // Date — look for ISO-style date
    const dtM = hdr.match(/(\d{4}[-/]\d{2}[-/]\d{2})/);
    hand.date = dtM ? dtM[1] : '';

    // Table + button
    const tL = lines.find(l => /^table /i.test(l));
    if (tL) {
      const tM = tL.match(/Table '?([^']+)'?\s+\d+-max/i);
      hand.table = tM ? tM[1].trim() : (tL.split(' ')[1] || '');
      const bM = tL.match(/Seat #(\d+) is the button/i);
      hand.button = bM ? parseInt(bM[1]) : null;
    }

    // Players
    lines.filter(l => /^Seat \d+:/i.test(l)).forEach(l => {
      const m = l.match(/^Seat (\d+):\s+(.+?)\s+\(\$?([\d,.]+)/i);
      if (m) hand.players.push({
        seat:parseInt(m[1]), name:m[2].trim(),
        stack:parseFloat(m[3].replace(',','')),
        cards:null, position:'', isHero:false,
      });
    });

    // Blinds
    const sbL = lines.find(l => /posts small blind/i.test(l));
    const bbL = lines.find(l => /posts big blind/i.test(l));
    if (sbL) { const m = sbL.match(/^(.+?)\s*:/); if (m) hand.smallBlind = m[1].trim(); }
    if (bbL) { const m = bbL.match(/^(.+?)\s*:/); if (m) hand.bigBlind = m[1].trim(); }

    // Hero
    const dL = lines.find(l => /^Dealt to /i.test(l));
    if (dL) {
      const m = dL.match(/^Dealt to (.+?)\s*\[(.+?)\]/i);
      if (m) {
        hand.hero = m[1].trim();
        const hp = hand.players.find(p => p.name === hand.hero);
        if (hp) { hp.cards = m[2].split(' ').map(s=>s.trim()); hp.isHero = true; }
      }
    }

    // Streets
    let street = 'preflop';
    for (const line of lines) {
      if (/^\*\*\* (HOLE CARDS|PRE-?FLOP) \*\*\*/i.test(line)) { street='preflop'; continue; }
      if (/^\*\*\* FLOP \*\*\*/i.test(line)) {
        street='flop';
        const bm = line.match(/\[(.+?)\]/);
        if (bm) hand.board.flop = bm[1].split(' ').map(s=>s.trim());
        continue;
      }
      if (/^\*\*\* TURN \*\*\*/i.test(line)) {
        street='turn';
        const bm = line.match(/\[.+?\]\s*\[(.+?)\]/);
        if (bm) hand.board.turn = bm[1].trim();
        continue;
      }
      if (/^\*\*\* RIVER \*\*\*/i.test(line)) {
        street='river';
        const bm = line.match(/\[.+?\]\s*\[(.+?)\]/);
        if (bm) hand.board.river = bm[1].trim();
        continue;
      }
      if (/^\*\*\* (SHOW DOWN|SUMMARY) \*\*\*/i.test(line)) { street='summary'; continue; }

      const aM = line.match(/^(.+?):\s+(folds|checks|calls|bets|raises|shows|mucks|wins|collects)(.*)$/i);
      if (aM && street !== 'summary') {
        const a = { player:aM[1].trim(), type:aM[2].toLowerCase(), amount:0, cards:null };
        const amtM = aM[3].match(/\$?([\d,.]+)/);
        if (amtM) a.amount = parseFloat(amtM[1].replace(',',''));
        const cM = aM[3].match(/\[(.+?)\]/);
        if (cM) a.cards = cM[1].split(' ').map(s=>s.trim());
        if (['preflop','flop','turn','river'].includes(street)) hand.streets[street].push(a);
      }

      if (/collected|wins/i.test(line) && street==='summary') {
        const wM = line.match(/^(.+?)\s+(?:collected|wins)\s+\$?([\d,.]+)/i);
        if (wM) hand.winners.push({ name:wM[1].trim(), amount:parseFloat(wM[2].replace(',','')) });
      }
    }

    // Pot
    const pL = lines.find(l => /total pot/i.test(l));
    if (pL) { const pm = pL.match(/\$?([\d,.]+)/); if (pm) hand.pot = parseFloat(pm[1].replace(',','')); }

    // If pot still 0, estimate from winner amounts
    if (hand.pot === 0 && hand.winners.length) {
      hand.pot = hand.winners.reduce((s,w) => s+w.amount, 0);
    }
    hand.potBB = hand.bb > 0 ? Math.round(hand.pot / hand.bb) : 0;

    assignPositions(hand);
    return hand;
  } catch(e) { return null; }
}

function assignPositions(hand) {
  const pos = ['BTN','SB','BB','UTG','HJ','CO'];
  const bi = hand.players.findIndex(p => p.seat === hand.button);
  if (bi < 0) { hand.players.forEach((p,i) => p.position=pos[i]||`P${i+1}`); return; }
  for (let i = 0; i < hand.players.length; i++) {
    hand.players[(bi+i)%hand.players.length].position = pos[i]||`P${i+1}`;
  }
}

function detectNewPlayers(hands) {
  const seen = {};
  hands.forEach((hand, hi) => {
    hand.newPlayers = [];
    hand.players.forEach(p => {
      if (seen[p.name] === undefined && hi > 0) hand.newPlayers.push(p.name);
      seen[p.name] = p.stack;
    });
  });
}

// ══════════════════════════════════════════════
// FRAMES
// ══════════════════════════════════════════════
function buildFrames(hand) {
  const f = [];
  f.push({type:'deal'});
  hand.streets.preflop.forEach(a => f.push({type:'action',street:'preflop',action:a}));
  if (hand.board.flop.length) {
    f.push({type:'board',street:'flop',cards:hand.board.flop});
    hand.streets.flop.forEach(a => f.push({type:'action',street:'flop',action:a}));
  }
  if (hand.board.turn) {
    f.push({type:'board',street:'turn',card:hand.board.turn});
    hand.streets.turn.forEach(a => f.push({type:'action',street:'turn',action:a}));
  }
  if (hand.board.river) {
    f.push({type:'board',street:'river',card:hand.board.river});
    hand.streets.river.forEach(a => f.push({type:'action',street:'river',action:a}));
  }
  f.push({type:'result'});
  return f;
}

// ══════════════════════════════════════════════
// VISIBLE STATE  — FIX: bets persist within a street,
// acts show last action per player (not cleared on board).
// folded players stay folded. Bets clear only on new street.
// ══════════════════════════════════════════════
function getState() {
  let flop=[], turn=null, river=null, curStreet='preflop';
  // acts: last action badge per player (clears on new hand/deal only)
  const acts = {};
  // bets: current bet chips on table (clears per street)
  const bets = {};
  const folded = new Set();

  for (let i = 0; i <= frameIdx; i++) {
    const f = frames[i]; if (!f) continue;
    if (f.type === 'deal') {
      // New hand — clear everything
      Object.keys(acts).forEach(k=>delete acts[k]);
      Object.keys(bets).forEach(k=>delete bets[k]);
      folded.clear();
    } else if (f.type === 'board') {
      // New street — clear bets and action badges for fresh street
      Object.keys(bets).forEach(k=>delete bets[k]);
      Object.keys(acts).forEach(k=>delete acts[k]);
      if (f.street==='flop')  { flop=f.cards; curStreet='flop'; }
      if (f.street==='turn')  { turn=f.card;  curStreet='turn'; }
      if (f.street==='river') { river=f.card; curStreet='river'; }
    } else if (f.type === 'action') {
      const a = f.action;
      acts[a.player] = a;
      if (a.type==='folds') {
        folded.add(a.player);
        delete bets[a.player]; // folder removes their bet chip
      } else if (['bets','raises','calls'].includes(a.type) && a.amount > 0) {
        bets[a.player] = a.amount;
      } else if (a.type==='checks') {
        delete bets[a.player];
      }
    }
  }

  const frame = frames[frameIdx];
  const active = frame?.type==='action' ? frame.action.player : null;
  return {flop, turn, river, street:curStreet, acts, bets, folded, active, frame};
}

// ══════════════════════════════════════════════
// CARD HTML
// ══════════════════════════════════════════════
const SUIT_CLS = {s:'suit-s',h:'suit-h',d:'suit-d',c:'suit-c'};
function cardHtml(str, size, faceDown) {
  if (faceDown||!str) return `<div class="card ${size} back"></div>`;
  const rank = str.slice(0,-1).toUpperCase();
  const suit = str.slice(-1).toLowerCase();
  return `<div class="card ${size} ${SUIT_CLS[suit]||'suit-s'}"><span class="card-rank">${rank}</span></div>`;
}

// ══════════════════════════════════════════════
// SLOT POSITIONS — hero always at bottom-centre
// ══════════════════════════════════════════════
const SLOT_POS = [
  {top:'88%',left:'50%'},   // 0 = hero
  {top:'78%',left:'22%'},   // 1
  {top:'44%',left:'7%' },   // 2
  {top:'12%',left:'22%'},   // 3
  {top:'12%',left:'68%'},   // 4
  {top:'44%',left:'83%'},   // 5
];
const BET_POS = [
  {top:'70%',left:'50%'},
  {top:'66%',left:'32%'},
  {top:'50%',left:'20%'},
  {top:'28%',left:'32%'},
  {top:'28%',left:'62%'},
  {top:'50%',left:'72%'},
];

function buildSlotMap(hand) {
  const posOrder = ['BTN','SB','BB','UTG','HJ','CO'];
  const heroPos = hand.players.find(p=>p.isHero)?.position;
  const heroIdx = posOrder.indexOf(heroPos);
  const map = {};
  if (heroIdx < 0) { hand.players.forEach((p,i)=>map[p.position]=i); return map; }
  let slot = 0;
  for (let i = 0; i < posOrder.length; i++) {
    const pos = posOrder[(heroIdx+i)%posOrder.length];
    if (hand.players.find(p=>p.position===pos)) { map[pos]=slot; slot++; }
  }
  return map;
}

// ══════════════════════════════════════════════
// RENDER
// ══════════════════════════════════════════════
const BADGE_COLORS = {
  folds:'#374151',checks:'#1e4080',calls:'#145c30',
  bets:'#7a4a00',raises:'#7a1515',wins:'#4a2080',collects:'#4a2080',shows:'#1a3a50'
};

function posName(hand, playerName) {
  const p = hand.players.find(pl=>pl.name===playerName);
  return p ? p.position + (p.isHero?' (You)':'') : '?';
}

function render() {
  const hand = VIEW_HANDS[handIdx];
  if (!hand) return;
  const st = getState();
  const boardCards = [...st.flop,...(st.turn?[st.turn]:[]),...(st.river?[st.river]:[])];
  const slotMap = buildSlotMap(hand);

  // Board
  document.getElementById('board-wrap').innerHTML = boardCards.map(c=>cardHtml(c,'md',false)).join('');

  // Pot
  const potEl = document.getElementById('pot-display');
  if (boardCards.length && hand.pot > 0) {
    potEl.style.display = 'block';
    potEl.textContent = `Pot: ${(hand.pot/hand.bb).toFixed(1)}BB`;
  } else potEl.style.display = 'none';

  // Street label
  document.getElementById('street-label').textContent = st.street!=='preflop' ? st.street.toUpperCase() : '';

  // Bet chips
  const betsWrap = document.getElementById('bets-wrap');
  betsWrap.innerHTML = '';
  Object.entries(st.bets).forEach(([pn,amt]) => {
    const p = hand.players.find(pl=>pl.name===pn); if (!p) return;
    const slot = slotMap[p.position]??0;
    const bp = BET_POS[slot]||BET_POS[0];
    const d = document.createElement('div');
    d.className = 'bet-chip';
    d.style.top = bp.top; d.style.left = bp.left;
    d.textContent = `${(amt/hand.bb).toFixed(1)}BB`;
    betsWrap.appendChild(d);
  });

  // Players
  const wrap = document.getElementById('players-wrap');
  wrap.innerHTML = '';
  hand.players.forEach(player => {
    const slot = slotMap[player.position]??0;
    const pos = SLOT_POS[slot]||SLOT_POS[0];
    const isActive = st.active === player.name;
    const isHero = player.isHero;
    const isBtn = player.seat === hand.button;
    const hasFolded = st.folded.has(player.name);
    const isNew = hand.newPlayers.includes(player.name);
    const lastAct = st.acts[player.name];
    const stackBB = (player.stack/hand.bb).toFixed(0);
    const dn = player.position + (isHero?' (You)':'');

    let html = '';
    if (isBtn) html += `<div class="dealer-btn">D</div>`;
    if (isNew) html += `<div class="new-player-badge">NEW</div>`;
    if (player.cards) {
      html += `<div class="player-cards">${player.cards.map(c=>cardHtml(c,'sm',false)).join('')}</div>`;
    } else if (!hasFolded) {
      html += `<div class="player-cards">${cardHtml(null,'sm',true)}${cardHtml(null,'sm',true)}</div>`;
    }
    let chipCls = 'p-chip'+(isHero?' is-hero':'')+(isActive?' is-active':'')+(hasFolded?' folded':'');
    html += `<div class="${chipCls}"><span class="p-pos${isHero?' hero-pos':''}">${dn}</span><span class="p-stack">${stackBB}BB</span></div>`;
    if (isActive) html += `<div class="turn-arrow">▼</div>`;
    if (lastAct) {
      const bg = BADGE_COLORS[lastAct.type]||'#374151';
      const ba = lastAct.amount>0 ? ` ${(lastAct.amount/hand.bb).toFixed(1)}BB` : '';
      html += `<div class="action-badge" style="background:${bg}">${lastAct.type}${ba}</div>`;
    }

    const div = document.createElement('div');
    div.className = 'player-box';
    div.style.top = pos.top; div.style.left = pos.left;
    div.innerHTML = html;
    wrap.appendChild(div);
  });

  // Infobar
  document.getElementById('ib-hand').textContent = `Hand #${handIdx+1}/${VIEW_HANDS.length}`;
  document.getElementById('ib-stakes').textContent = hand.stakes + (hand.potBB>0 ? ` · ${hand.potBB}BB pot` : '');

  const f = st.frame;
  let evtLbl = '';
  if (f) {
    if (f.type==='deal') evtLbl = '🃏 Cards Dealt';
    else if (f.type==='board') evtLbl = `🎴 ${f.street.toUpperCase()}: ${(f.cards||[f.card]).join(' ')}`;
    else if (f.type==='action') {
      const a=f.action, pn=posName(hand,a.player), ba=a.amount>0?` ${(a.amount/hand.bb).toFixed(1)}BB`:'';
      evtLbl = `${pn} ${a.type}${ba}`;
    } else if (f.type==='result') {
      evtLbl = hand.winners.length
        ? `🏆 ${hand.winners.map(w=>`${posName(hand,w.name)} wins ${(w.amount/hand.bb).toFixed(1)}BB`).join(', ')}`
        : '🏁 Complete';
    }
  }
  document.getElementById('ib-event').textContent = evtLbl;

  // Update on-felt log
  updateFeltLog(f, hand);

  document.getElementById('frame-lbl').textContent = `${frameIdx+1}/${frames.length}`;
  document.getElementById('scrubber').value = frameIdx;
  document.getElementById('btn-ph').disabled = handIdx===0;
  document.getElementById('btn-nh').disabled = handIdx===VIEW_HANDS.length-1;
  document.querySelectorAll('.hand-item').forEach((el,i) => {
    el.classList.toggle('active',i===handIdx);
    if (i===handIdx) el.scrollIntoView({block:'nearest'});
  });
}

// ══════════════════════════════════════════════
// ON-FELT LOG (replaces sidebar log on mobile, supplements on desktop)
// ══════════════════════════════════════════════
function updateFeltLog(f, hand) {
  if (!f) return;
  if (f.type==='deal') { feltLog=[]; }
  else if (f.type==='board') {
    const label = `── ${f.street.toUpperCase()} ──`;
    feltLog = [...feltLog.slice(-3), {text:label, cls:'fl-street'}];
  } else if (f.type==='action') {
    const a=f.action, pn=posName(hand,a.player), ba=a.amount>0?` ${(a.amount/hand.bb).toFixed(1)}BB`:'';
    let cls='';
    if (a.type==='raises') cls='fl-raise';
    else if (a.type==='bets') cls='fl-bet';
    else if (a.type==='calls') cls='fl-call';
    feltLog = [...feltLog.slice(-3), {text:`${pn}: ${a.type}${ba}`, cls}];
  } else if (f.type==='result' && hand.winners.length) {
    const w=hand.winners[0], pn=posName(hand,w.name);
    feltLog = [...feltLog.slice(-3), {text:`🏆 ${pn} wins ${(w.amount/hand.bb).toFixed(1)}BB`, cls:'fl-win'}];
  }

  const el = document.getElementById('felt-log');
  el.innerHTML = feltLog.map(l=>`<div class="felt-log-line ${l.cls||''}">${esc(l.text)}</div>`).join('');
}

// ══════════════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════════════
function loadHand(idx) {
  handIdx = Math.max(0,Math.min(VIEW_HANDS.length-1,idx));
  frames = buildFrames(VIEW_HANDS[handIdx]);
  frameIdx = 0; feltLog = [];
  document.getElementById('scrubber').max = Math.max(0,frames.length-1);
  render();
}
function goFrame(idx) { frameIdx=Math.max(0,Math.min(frames.length-1,idx)); render(); }
function prevHand() { stopPlay(); loadHand(handIdx-1); }
function nextHand() { stopPlay(); loadHand(handIdx+1); }
function stepBack()  { stopPlay(); goFrame(frameIdx-1); }
function stepFwd()   { stopPlay(); goFrame(frameIdx+1); }
function togglePlay() { playing ? stopPlay() : startPlay(); }
function startPlay() {
  if (playing) return;
  playing=true;
  document.getElementById('play-btn').textContent='⏸';
  document.getElementById('play-btn').classList.add('stop');
  ticker=setInterval(()=>{
    if (frameIdx>=frames.length-1) { handIdx<VIEW_HANDS.length-1?loadHand(handIdx+1):stopPlay(); }
    else goFrame(frameIdx+1);
  },speed);
}
function stopPlay() {
  playing=false; clearInterval(ticker);
  document.getElementById('play-btn').textContent='▶';
  document.getElementById('play-btn').classList.remove('stop');
}
function setSpeed(btn) {
  speed=parseInt(btn.dataset.speed);
  document.querySelectorAll('.speed-btn').forEach(b=>b.classList.toggle('on',b===btn));
  if (playing) { stopPlay(); startPlay(); }
}
document.getElementById('scrubber').addEventListener('input',e=>{ stopPlay(); goFrame(parseInt(e.target.value)); });

// ══════════════════════════════════════════════
// FILTER
// ══════════════════════════════════════════════
function bigHandThreshold(hands) {
  const sorted = hands.filter(h=>h.pot>0).map(h=>h.potBB).sort((a,b)=>b-a);
  return sorted[Math.ceil(sorted.length*0.2)-1]||0;
}
function toggleFilter() {
  filterActive=!filterActive;
  document.getElementById('filter-btn').classList.toggle('active',filterActive);
  document.getElementById('filter-ind').style.display=filterActive?'':'none';
  VIEW_HANDS = filterActive ? ALL_HANDS.filter(h=>h.potBB>=bigHandThreshold(ALL_HANDS)) : [...ALL_HANDS];
  buildSidebar(); loadHand(0); stopPlay();
}

// ══════════════════════════════════════════════
// STATS
// ══════════════════════════════════════════════
function calcStats(hands) {
  const hero = hands.find(h=>h.hero)?.hero||null;
  if (!hero) return null;
  const bb = hands[0]?.bb||0.02;
  let profit=0, vpip=0, pfr=0, heroHands=0;
  for (const h of hands) {
    if (!h.players.find(p=>p.name===hero)) continue;
    heroHands++;
    const pfa = h.streets.preflop.filter(a=>a.player===hero);
    if (pfa.find(a=>['calls','bets','raises'].includes(a.type))) vpip++;
    if (pfa.find(a=>a.type==='raises')) pfr++;
    const won = h.winners.find(w=>w.name===hero)?.amount||0;
    let inv=0;
    ['preflop','flop','turn','river'].forEach(s=>h.streets[s].filter(a=>a.player===hero&&['calls','bets','raises'].includes(a.type)).forEach(a=>inv+=a.amount));
    if (h.smallBlind===hero) inv+=bb/2;
    if (h.bigBlind===hero) inv+=bb;
    profit += won-inv;
  }
  return {
    hero, stakes:hands[0]?.stakes||'?', bb, handsPlayed:hands.length, heroHands,
    totalProfit:profit.toFixed(2), totalProfitBB:(profit/bb).toFixed(1),
    bbPer100:heroHands?((profit/bb/heroHands)*100).toFixed(1):'0',
    vpip:heroHands?Math.round(vpip/heroHands*100):0,
    pfr:heroHands?Math.round(pfr/heroHands*100):0,
  };
}

function renderStats(stats) {
  if (!stats) return;
  const net=parseFloat(stats.totalProfit);
  document.getElementById('stats-panel').style.display='block';
  document.getElementById('s-hands').textContent=stats.handsPlayed;
  document.getElementById('s-net').innerHTML=`<span class="${net>=0?'pos':'neg'}">${net>=0?'+':''}$${stats.totalProfit}</span>`;
  document.getElementById('s-bb100').textContent=stats.bbPer100;
  document.getElementById('s-vpip').textContent=stats.vpip+'%';
  document.getElementById('s-pfr').textContent=stats.pfr+'%';
  const pb=document.getElementById('profit-badge');
  pb.style.display='inline-flex'; pb.className=net>=0?'profit-pos':'profit-neg';
  pb.textContent=`${net>=0?'+':''}${stats.totalProfitBB}BB`;
  document.getElementById('stakes-badge').style.display='inline-flex';
  document.getElementById('stakes-badge').textContent=stats.stakes;
}

// ══════════════════════════════════════════════
// SIDEBAR
// ══════════════════════════════════════════════
function winnerPos(hand) {
  const w=hand.winners[0]; if (!w) return '?';
  const p=hand.players.find(pl=>pl.name===w.name);
  return p?p.position+(p.isHero?'★':''):'?';
}

function buildSidebar() {
  const thr = bigHandThreshold(ALL_HANDS);
  const list = document.getElementById('handlist');
  list.innerHTML='';
  VIEW_HANDS.forEach((h,i)=>{
    const isBig=h.potBB>=thr;
    const d=document.createElement('div');
    d.className='hand-item'+(i===0?' active':'')+(isBig?' big-pot':'');
    const np=h.newPlayers.length?`<div class="hi-new">⚡ new player</div>`:'';
    const realIdx=ALL_HANDS.indexOf(h)+1;
    d.innerHTML=`<div class="hi-num">${isBig?'⭐ ':''}Hand #${realIdx}</div>
      <div class="hi-meta">${h.potBB>0?h.potBB+'BB':'?'} · ${winnerPos(h)}</div>${np}`;
    d.onclick=()=>{ stopPlay(); loadHand(i); closeSidebar(); };
    list.appendChild(d);
  });
  document.getElementById('hands-hdr').textContent=`HANDS (${VIEW_HANDS.length})`;
}

// ══════════════════════════════════════════════
// FILE LOAD
// ══════════════════════════════════════════════
document.getElementById('file-input').addEventListener('change',e=>{
  const file=e.target.files[0]; if (!file) return;
  const r=new FileReader(); r.onload=ev=>loadData(ev.target.result); r.readAsText(file);
  e.target.value=''; // allow re-loading same file
});
const dz=document.getElementById('drop-zone');
dz.addEventListener('dragover',e=>{e.preventDefault();dz.classList.add('drag-over');});
dz.addEventListener('dragleave',()=>dz.classList.remove('drag-over'));
dz.addEventListener('drop',e=>{e.preventDefault();dz.classList.remove('drag-over');const f=e.dataTransfer.files[0];if(f){const r=new FileReader();r.onload=ev=>loadData(ev.target.result);r.readAsText(f);}});

function loadData(text) {
  const parsed = parseHandHistory(text);
  if (!parsed.length) {
    const em=document.getElementById('error-msg');
    em.style.display='block';
    em.textContent='No hands found. Make sure this is an ACR hand history .txt file.';
    return;
  }
  ALL_HANDS=parsed; VIEW_HANDS=[...parsed]; filterActive=false;
  detectNewPlayers(ALL_HANDS);
  const stats=calcStats(ALL_HANDS);
  renderStats(stats);
  buildSidebar();
  document.getElementById('upload-screen').style.display='none';
  document.getElementById('main').style.display='flex';
  document.getElementById('export-btn').style.display='inline-flex';
  document.getElementById('filter-btn').style.display='inline-flex';
  loadHand(0);
}

// ══════════════════════════════════════════════
// SIDEBAR MOBILE
// ══════════════════════════════════════════════
function toggleSidebar() {
  const sb=document.getElementById('sidebar'),ov=document.getElementById('sb-overlay');
  const open=sb.classList.contains('open');
  sb.classList.toggle('open',!open); ov.classList.toggle('show',!open);
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sb-overlay').classList.remove('show');
}

// ══════════════════════════════════════════════
// UTILS
// ══════════════════════════════════════════════
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function dl(name,content,mime){
  const b=new Blob([content],{type:mime}),u=URL.createObjectURL(b),a=document.createElement('a');
  a.href=u;a.download=name;a.click();URL.revokeObjectURL(u);
}
function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),4000);}

// ══════════════════════════════════════════════
// EXPORT
// ══════════════════════════════════════════════
function describeHandMd(hand) {
  const board=[...hand.board.flop,...(hand.board.turn?[hand.board.turn]:[]),...(hand.board.river?[hand.board.river]:[])].join(' ');
  const allActs=[...hand.streets.preflop,...hand.streets.flop,...hand.streets.turn,...hand.streets.river];
  const hp=hand.players.find(p=>p.isHero);
  const gp=n=>{const p=hand.players.find(pl=>pl.name===n);return p?p.position+(p.isHero?' (Hero)':''):'?';};
  let parts=[`**${hand.potBB}BB pot** · ${hand.stakes}`];
  if (board) parts.push(`Board: \`${board}\``);
  if (hp?.cards) parts.push(`Hero (${hp.position}): \`${hp.cards.join(' ')}\``);
  const raises=allActs.filter(a=>a.type==='raises');
  const bigR=raises.length?raises.reduce((mx,a)=>a.amount>mx.amount?a:mx,raises[0]):null;
  let actions='';
  if (bigR) actions+=`${gp(bigR.player)} raised to ${(bigR.amount/hand.bb).toFixed(1)}BB. `;
  if (hand.winners[0]) actions+=`${gp(hand.winners[0].name)} won ${hand.potBB}BB.`;
  return parts.join(' · ')+(actions?'\n\n'+actions:'');
}

function exportBlogPost() {
  const stats=calcStats(ALL_HANDS);
  const today=new Date().toISOString().split('T')[0];
  const thr=bigHandThreshold(ALL_HANDS);
  const keyHands=[...ALL_HANDS].filter(h=>h.potBB>=thr).sort((a,b)=>b.potBB-a.potBB).slice(0,6);
  const net=parseFloat(stats?.totalProfit||'0');
  const replayerFile=`${today}-poker-replayer.html`;

  const md=`---
layout: default
title: "Session — ${today}"
date: ${today}
parent: Session Reviews
nav_order: 1
description: "ACR 6-max ${stats?.stakes||''} · ${ALL_HANDS.length} hands · ${net>=0?'+':''}${stats?.totalProfitBB||'0'}BB"
tags: [poker, ACR, session-review, cash-game]
---

# Session Review — ${today}
{: .no_toc }

<details open markdown="block">
  <summary>Contents</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

## Session Stats

| | |
|:--|--:|
| **Stakes** | ${stats?.stakes||'—'} |
| **Hands** | ${stats?.handsPlayed||ALL_HANDS.length} |
| **Net** | ${net>=0?'+':''}$${stats?.totalProfit||'0'} (${net>=0?'+':''}${stats?.totalProfitBB||'0'} BB) |
| **BB/100** | ${stats?.bbPer100||'0'} |
| **VPIP / PFR** | ${stats?.vpip||0}% / ${stats?.pfr||0}% |

${net>=0?`> ✅ **Winning session** +${stats?.totalProfitBB}BB`:`> 🔴 **Losing session** ${stats?.totalProfitBB}BB`}

---

## Key Hands

${keyHands.length?keyHands.map((h,i)=>`### Hand ${i+1} — ${h.potBB}BB pot\n\n${describeHandMd(h)}\n`).join('\n'):'*No big hands recorded.*'}

---

## Interactive Replayer

<div style="overflow:hidden;border-radius:8px;border:1px solid #ddd;margin:1.5rem 0;">
<iframe src="/assets/replayers/${replayerFile}" style="width:100%;height:480px;border:none;display:block;" title="Hand Replayer"></iframe>
</div>

> 💡 Tap **⭐ Big Hands** to filter largest pots. All players shown by position only.

---

## Notes

- 
- 
- 
`;

  const handsJson=JSON.stringify(ALL_HANDS.map(h=>({
    id:h.id,stakes:h.stakes,bb:h.bb,table:h.table,date:h.date,
    hero:h.hero,button:h.button,
    players:h.players.map(p=>({seat:p.seat,name:p.name,stack:p.stack,cards:p.cards,position:p.position,isHero:p.isHero})),
    streets:h.streets,board:h.board,pot:h.pot,potBB:h.potBB,winners:h.winners,newPlayers:h.newPlayers
  })));
  const embedHtml=buildEmbedHtml(handsJson);
  dl(`${today}-poker-session-review.md`,md,'text/markdown');
  setTimeout(()=>dl(replayerFile,embedHtml,'text/html'),300);
  showToast(`✓ Downloaded .md + ${replayerFile}`);
}

// ══════════════════════════════════════════════
// EMBED HTML — same logic, self-contained
// ══════════════════════════════════════════════
function buildEmbedHtml(hj) {
  return `<!DOCTYPE html><html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>Poker Replayer</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#07101f;--border:rgba(255,255,255,0.08);--text:#d8e4f0;--muted:#3d5068;--muted2:#5a7090;--accent:#4d8aff;--hero:#a78bfa;--green:#22d47a;--red:#f06060;--gold:#f5c542;--felt-dark:#0b2318;--felt-mid:#133320;--felt-light:#1a4229;--rail:#0a1c10;--spade:#c8d8f0;--heart:#f06060;--diamond:#3dcfcf;--club:#5dd47a}
html,body{height:100%;overflow:hidden}
body{background:var(--bg);color:var(--text);font-family:'Trebuchet MS',sans-serif;display:flex;flex-direction:column;-webkit-tap-highlight-color:transparent}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#1e3050;border-radius:3px}
#hdr{display:flex;align-items:center;gap:7px;padding:0 10px;height:40px;background:rgba(7,14,28,0.98);border-bottom:1px solid var(--border);flex-shrink:0;z-index:100;position:relative;overflow:hidden}
.hlogo{font-size:16px;flex-shrink:0}.httl{font-size:12px;font-weight:700;letter-spacing:2px;color:var(--hero);flex-shrink:0}
.hsp{flex:1;min-width:4px}
.hflt{background:rgba(245,197,66,0.12);border:1px solid rgba(245,197,66,0.3);color:var(--gold);border-radius:5px;padding:4px 9px;font-size:10px;font-weight:700;cursor:pointer;font-family:inherit;touch-action:manipulation}
.hflt.on{background:rgba(245,197,66,0.25)}
.hmb{display:none;background:none;border:none;color:var(--muted2);font-size:18px;cursor:pointer;padding:4px;line-height:1;flex-shrink:0}
@media(max-width:640px){.hmb{display:flex}}
#mn{position:relative;flex:1;overflow:hidden;min-height:0;display:flex}
#sbov{display:none;position:absolute;inset:0;z-index:49;background:rgba(0,0,0,0.5)}
#sbov.show{display:block}
#sb{width:150px;background:rgba(7,13,25,0.97);border-right:1px solid var(--border);display:flex;flex-direction:column;overflow:hidden;flex-shrink:0;z-index:50}
@media(max-width:640px){#sb{position:absolute;top:0;left:0;bottom:0;width:0;border:none;transition:width 0.22s}#sb.open{width:150px;border-right:1px solid var(--border);box-shadow:4px 0 24px rgba(0,0,0,0.7)}}
.shdr{padding:6px 9px;font-size:9px;font-weight:700;letter-spacing:1.5px;color:var(--muted);border-bottom:1px solid var(--border);text-transform:uppercase;flex-shrink:0}
#hl{flex:1;overflow-y:auto}
.hi{padding:6px 9px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.03);border-left:2px solid transparent;transition:all 0.1s}
.hi.a{background:rgba(77,138,255,0.13);border-left-color:var(--accent)}.hi.bp{border-left-color:var(--gold)!important}
.hn{font-size:10px;font-weight:700;color:var(--muted2)}.hi.a .hn{color:var(--hero)}.hm{font-size:9px;color:var(--muted);font-family:monospace}.hnp{font-size:8px;color:var(--gold)}
#ct{flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0}
#ib{padding:0 10px;height:26px;display:flex;align-items:center;gap:7px;background:rgba(7,13,25,0.95);border-bottom:1px solid var(--border);font-size:9px;font-family:monospace;flex-shrink:0;overflow:hidden}
.ibp{background:rgba(77,138,255,0.1);border:1px solid rgba(77,138,255,0.2);border-radius:10px;padding:1px 6px;color:var(--accent);white-space:nowrap;flex-shrink:0}
.ibs{color:var(--muted2);white-space:nowrap;flex-shrink:0}
.ibe{margin-left:auto;font-size:10px;color:var(--gold);font-weight:700;font-family:'Trebuchet MS',sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:55%}
#ta{flex:1;position:relative;overflow:hidden}
#flt{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:min(86%,520px);height:min(74%,310px);min-width:240px;min-height:160px;border-radius:50%;background:radial-gradient(ellipse at 40% 38%,var(--felt-light),var(--felt-mid) 50%,var(--felt-dark));border:5px solid var(--rail);box-shadow:0 0 0 2px rgba(255,255,255,0.04),0 0 0 7px #050d12,0 0 50px rgba(0,0,0,0.8),inset 0 0 35px rgba(0,0,0,0.4)}
#bw{position:absolute;top:50%;left:50%;transform:translate(-50%,-54%);display:flex;gap:5px;align-items:center;z-index:10}
#pd{position:absolute;top:50%;left:50%;transform:translate(-50%,-230%);font-size:10px;font-weight:700;color:var(--gold);background:rgba(0,0,0,0.6);padding:2px 8px;border-radius:20px;z-index:11;display:none;font-family:monospace;white-space:nowrap}
#sl{position:absolute;top:50%;left:50%;transform:translate(-50%,-310%);font-size:10px;font-weight:700;letter-spacing:2px;color:rgba(255,255,255,0.18);text-transform:uppercase;pointer-events:none;z-index:9}
#fl{position:absolute;bottom:10px;left:50%;transform:translateX(-50%);z-index:30;display:flex;flex-direction:column;align-items:center;gap:3px;pointer-events:none;width:min(290px,82%)}
.fll{background:rgba(5,10,22,0.82);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:2px 9px;font-size:10px;font-family:monospace;color:var(--muted2);white-space:nowrap;animation:fu 0.22s ease}
.fll.fs{color:var(--accent);font-weight:600;letter-spacing:1px;background:rgba(5,10,35,0.85);border-color:rgba(77,138,255,0.2)}
.fll.fr{color:var(--red)}.fll.fb{color:var(--gold)}.fll.fc{color:var(--green)}.fll.fw{color:var(--hero)}
@keyframes fu{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
#pw{position:absolute;inset:0;z-index:20;pointer-events:none}
#betsw{position:absolute;inset:0;z-index:15;pointer-events:none}
.btc{position:absolute;transform:translate(-50%,-50%);background:rgba(245,197,66,0.15);border:1px solid rgba(245,197,66,0.5);border-radius:5px;padding:2px 6px;font-size:9px;font-family:monospace;font-weight:600;color:var(--gold);white-space:nowrap;animation:ci 0.18s ease}
@keyframes ci{from{transform:translate(-50%,-50%) scale(0.4);opacity:0}to{transform:translate(-50%,-50%) scale(1);opacity:1}}
.pb3{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:2px}
.pc3{display:flex;gap:2px;margin-bottom:1px}
.ch3{background:rgba(8,15,30,0.9);border:1px solid rgba(255,255,255,0.1);border-radius:7px;padding:3px 6px;display:flex;flex-direction:column;align-items:center;min-width:54px;transition:all 0.2s}
.ch3.h{border-color:rgba(167,139,250,0.5);background:rgba(28,12,55,0.88)}
.ch3.act{border-color:var(--gold)!important;box-shadow:0 0 0 1px rgba(245,197,66,0.3),0 0 14px rgba(245,197,66,0.25);background:rgba(38,28,5,0.92)!important;animation:ap 1s ease infinite}
@keyframes ap{0%,100%{box-shadow:0 0 0 1px rgba(245,197,66,0.3),0 0 10px rgba(245,197,66,0.18)}50%{box-shadow:0 0 0 2px rgba(245,197,66,0.55),0 0 20px rgba(245,197,66,0.4)}}
.ch3.fd{opacity:0.35}
.pn3{font-size:9px;font-weight:700;color:var(--text);white-space:nowrap}.pn3.h{color:var(--hero)}
.pi3{font-size:8px;color:var(--muted2);font-family:monospace}
.db3{position:absolute;top:-7px;right:-7px;width:14px;height:14px;border-radius:50%;background:var(--gold);color:#1a0800;font-size:7px;font-weight:900;display:flex;align-items:center;justify-content:center;border:1px solid #e0a800;z-index:25}
.ab3{border-radius:10px;padding:2px 6px;font-size:8px;font-weight:700;color:#fff;text-transform:uppercase;letter-spacing:0.4px;white-space:nowrap;animation:bp 0.18s ease}
@keyframes bp{from{transform:scale(0.5);opacity:0}to{transform:scale(1);opacity:1}}
.ta3{position:absolute;bottom:-13px;left:50%;transform:translateX(-50%);font-size:9px;color:var(--gold);animation:bv 0.55s ease infinite alternate}
@keyframes bv{from{transform:translateX(-50%) translateY(0)}to{transform:translateX(-50%) translateY(-3px)}}
.nb3{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:rgba(245,197,66,0.18);border:1px solid rgba(245,197,66,0.45);border-radius:4px;padding:1px 4px;font-size:7px;font-weight:700;color:var(--gold);white-space:nowrap}
.cd{border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 1px 4px rgba(0,0,0,0.6)}
.cd.sm{width:25px;height:35px}.cd.md{width:36px;height:50px}
.cd.bk{background:linear-gradient(145deg,#1a3565,#0d1f3e);border:1px solid #243a5f}
.cd.ss{background:#0a1420;border:1px solid #1e3050}.cd.sh{background:#200a0a;border:1px solid #501010}
.cd.sd{background:#081818;border:1px solid #104040}.cd.sc{background:#081408;border:1px solid #124020}
.cdr{font-family:monospace;font-weight:600;line-height:1;text-shadow:0 0 6px currentColor}
.cd.sm .cdr{font-size:12px}.cd.md .cdr{font-size:17px}
.cd.ss .cdr{color:#c8d8f0}.cd.sh .cdr{color:#f06060}.cd.sd .cdr{color:#3dcfcf}.cd.sc .cdr{color:#5dd47a}
#ctrl{padding:7px 10px 9px;background:rgba(6,11,22,0.98);border-top:1px solid var(--border);display:flex;flex-direction:column;gap:6px;flex-shrink:0}
#sr{display:flex;align-items:center;gap:7px}#fc{font-size:9px;color:var(--muted);font-family:monospace;min-width:40px}
#sc{flex:1;accent-color:var(--accent);cursor:pointer;height:4px}
#br{display:flex;gap:4px;align-items:center;justify-content:center;flex-wrap:wrap}
.cb{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.09);border-radius:5px;width:34px;height:30px;color:#6080a0;font-size:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;touch-action:manipulation}
.cb:disabled{color:#1e2e40;cursor:not-allowed}.cb:active:not(:disabled){transform:scale(0.92)}
#pb{background:linear-gradient(135deg,#2d4db0,#5535b0);border:none;border-radius:7px;width:42px;height:30px;color:#fff;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;touch-action:manipulation}
#pb.stop{background:linear-gradient(135deg,#8b1515,#c02020)}#pb:active{transform:scale(0.92)}
.sbb{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:3px 8px;color:var(--muted2);font-size:10px;font-weight:700;cursor:pointer;font-family:monospace;touch-action:manipulation}
.sbb.on{background:rgba(77,138,255,0.2);border-color:var(--accent);color:var(--accent)}
.dv{width:1px;height:18px;background:rgba(255,255,255,0.07);margin:0 2px}
</style></head><body>
<div id="hdr">
  <button class="hmb" id="mbtn" onclick="tSb()">☰</button>
  <span class="hlogo">♠</span><span class="httl">REPLAYER</span>
  <div class="hsp"></div>
  <button class="hflt" id="fltb" onclick="tFlt()">⭐ Big Hands</button>
</div>
<div id="mn">
  <div id="sbov" onclick="cSb()"></div>
  <div id="sb"><div class="shdr">HANDS (<span id="hcnt">0</span>)</div><div id="hl"></div></div>
  <div id="ct">
    <div id="ib"><span class="ibp" id="ibn">—</span><span class="ibs" id="ibs2">—</span><span class="ibe" id="ibe2">—</span></div>
    <div id="ta">
      <div id="flt"></div><div id="sl"></div><div id="bw"></div><div id="pd"></div>
      <div id="betsw"></div><div id="pw"></div><div id="fl"></div>
    </div>
    <div id="ctrl">
      <div id="sr"><span id="fc">0/0</span><input type="range" id="sc" min="0" max="0" value="0"></div>
      <div id="br">
        <button class="cb" id="bph" onclick="pH()" disabled>⏮</button>
        <button class="cb" onclick="sB()">◀</button>
        <button id="pb" onclick="tP()">▶</button>
        <button class="cb" onclick="sF()">▶</button>
        <button class="cb" id="bnh" onclick="nH()">⏭</button>
        <div class="dv"></div>
        <button class="sbb on" data-s="2200" onclick="sSp(this)">1×</button>
        <button class="sbb" data-s="1300" onclick="sSp(this)">1.5×</button>
        <button class="sbb" data-s="650" onclick="sSp(this)">3×</button>
      </div>
    </div>
  </div>
</div>
<script>
const HH=${hj};
const SP2=[{t:'88%',l:'50%'},{t:'78%',l:'22%'},{t:'44%',l:'7%'},{t:'12%',l:'22%'},{t:'12%',l:'68%'},{t:'44%',l:'83%'}];
const BP2=[{t:'70%',l:'50%'},{t:'66%',l:'32%'},{t:'50%',l:'20%'},{t:'28%',l:'32%'},{t:'28%',l:'62%'},{t:'50%',l:'72%'}];
const AC3={folds:'#374151',checks:'#1e4080',calls:'#145c30',bets:'#7a4a00',raises:'#7a1515',wins:'#4a2080',collects:'#4a2080'};
const SC3={s:'ss',h:'sh',d:'sd',c:'sc'};
let AH2=HH,VH2=[...HH],hi=0,fi=0,fr=[],pl=false,sp=2200,iv=null,fl2=[],fa=false;
function gPN(h,n){const p=h.players.find(x=>x.name===n);return p?p.position+(p.isHero?' (You)':''):'?';}
function cH3(s,sz,fd){if(fd||!s)return\`<div class="cd \${sz} bk"></div>\`;const r=s.slice(0,-1).toUpperCase(),su=s.slice(-1).toLowerCase();return\`<div class="cd \${sz} \${SC3[su]||'ss'}"><span class="cdr">\${r}</span></div>\`;}
function gSM2(h){const po=['BTN','SB','BB','UTG','HJ','CO'],hp=h.players.find(p=>p.isHero)?.position,bi=po.indexOf(hp);const m={};if(bi<0){h.players.forEach((p,i)=>m[p.position]=i);return m;}let s=0;for(let i=0;i<po.length;i++){const pos=po[(bi+i)%po.length];if(h.players.find(p=>p.position===pos)){m[pos]=s++;}}return m;}
function gVS3(){let fl=[],tu=null,rv=null,cs='preflop';const ac={},bets={},fld=new Set();for(let i=0;i<=fi;i++){const f=fr[i];if(!f)continue;if(f.t==='deal'){Object.keys(ac).forEach(k=>delete ac[k]);Object.keys(bets).forEach(k=>delete bets[k]);fld.clear();}else if(f.t==='board'){Object.keys(bets).forEach(k=>delete bets[k]);Object.keys(ac).forEach(k=>delete ac[k]);if(f.s==='flop'){fl=f.c;cs='flop';}if(f.s==='turn'){tu=f.c2;cs='turn';}if(f.s==='river'){rv=f.c2;cs='river';}}else if(f.t==='action'){const a=f.a;ac[a.player]=a;if(a.type==='folds'){fld.add(a.player);delete bets[a.player];}else if(['bets','raises','calls'].includes(a.type)&&a.amount>0)bets[a.player]=a.amount;else if(a.type==='checks')delete bets[a.player];}}return{fl,tu,rv,cs,ac,bets,fld,act:fr[fi]?.t==='action'?fr[fi].a.player:null,f:fr[fi]};}
function bF3(h){const f=[];f.push({t:'deal'});h.streets.preflop.forEach(a=>f.push({t:'action',s:'preflop',a}));if(h.board.flop.length){f.push({t:'board',s:'flop',c:h.board.flop});h.streets.flop.forEach(a=>f.push({t:'action',s:'flop',a}));}if(h.board.turn){f.push({t:'board',s:'turn',c2:h.board.turn});h.streets.turn.forEach(a=>f.push({t:'action',s:'turn',a}));}if(h.board.river){f.push({t:'board',s:'river',c2:h.board.river});h.streets.river.forEach(a=>f.push({t:'action',s:'river',a}));}f.push({t:'result'});return f;}
function ren3(){const h=VH2[hi];if(!h)return;const st=gVS3(),sm=gSM2(h),bc=[...st.fl,...(st.tu?[st.tu]:[]),...(st.rv?[st.rv]:[])];
document.getElementById('bw').innerHTML=bc.map(c=>cH3(c,'md',false)).join('');
const pd=document.getElementById('pd');if(bc.length&&h.pot>0){pd.style.display='block';pd.textContent='Pot '+(h.pot/h.bb).toFixed(1)+'BB';}else pd.style.display='none';
document.getElementById('sl').textContent=st.cs!=='preflop'?st.cs.toUpperCase():'';
const bw=document.getElementById('betsw');bw.innerHTML='';Object.entries(st.bets).forEach(([pn,amt])=>{const p=h.players.find(x=>x.name===pn);if(!p)return;const sl=sm[p.position]??0,bp=BP2[sl]||BP2[0],d=document.createElement('div');d.className='btc';d.style.top=bp.t;d.style.left=bp.l;d.textContent=(amt/h.bb).toFixed(1)+'BB';bw.appendChild(d);});
const pw=document.getElementById('pw');pw.innerHTML='';h.players.forEach(p=>{const sl=sm[p.position]??0,pos=SP2[sl]||SP2[0],ia=st.act===p.name,ih=p.isHero,ib=p.seat===h.button,hf=st.fld.has(p.name),la=st.ac[p.name],stBB=(p.stack/h.bb).toFixed(0),isN=h.newPlayers&&h.newPlayers.includes(p.name),dn=p.position+(ih?' (You)':'');let html='';if(ib)html+=\`<div class="db3">D</div>\`;if(isN)html+=\`<div class="nb3">NEW</div>\`;if(p.cards)html+=\`<div class="pc3">\${p.cards.map(c=>cH3(c,'sm',false)).join('')}</div>\`;else if(!hf)html+=\`<div class="pc3">\${cH3(null,'sm',true)}\${cH3(null,'sm',true)}</div>\`;html+=\`<div class="ch3\${ih?' h':''}\${ia?' act':''}\${hf?' fd':''}">\<span class="pn3\${ih?' h':''}">\${dn}</span><span class="pi3">\${stBB}BB</span></div>\`;if(ia)html+=\`<div class="ta3">▼</div>\`;if(la){const bg=AC3[la.type]||'#374151',ba=la.amount>0?' '+(la.amount/h.bb).toFixed(1)+'BB':'';html+=\`<div class="ab3" style="background:\${bg}">\${la.type}\${ba}</div>\`;}const d=document.createElement('div');d.className='pb3';d.style.cssText=\`position:absolute;top:\${pos.t};left:\${pos.l};transform:translate(-50%,-50%)\`;d.innerHTML=html;pw.appendChild(d);});
document.getElementById('ibn').textContent='Hand #'+(hi+1)+'/'+VH2.length;
document.getElementById('ibs2').textContent=h.stakes+(h.potBB>0?' · '+h.potBB+'BB pot':'');
const f=st.f;let lb='';if(f){if(f.t==='deal')lb='🃏 Cards Dealt';else if(f.t==='board')lb='🎴 '+(f.s.charAt(0).toUpperCase()+f.s.slice(1))+': '+(f.c||[f.c2]).join(' ');else if(f.t==='action'){const a=f.a,ba=a.amount>0?' '+(a.amount/h.bb).toFixed(1)+'BB':'';lb=gPN(h,a.player)+' '+a.type+ba;}else if(f.t==='result')lb=h.winners.length?'🏆 '+h.winners.map(w=>gPN(h,w.name)+' wins '+(w.amount/h.bb).toFixed(1)+'BB').join(', '):'🏁 Complete';}
document.getElementById('ibe2').textContent=lb;
// felt log
const fle=document.getElementById('fl');if(f){if(f.t==='deal')fl2=[];else if(f.t==='board'){fl2=[...fl2.slice(-3),{tx:'── '+f.s.toUpperCase()+' ──',c:'fs'}];}else if(f.t==='action'){const a=f.a,ba=a.amount>0?' '+(a.amount/h.bb).toFixed(1)+'BB':'';let c='';if(a.type==='raises')c='fr';else if(a.type==='bets')c='fb';else if(a.type==='calls')c='fc';fl2=[...fl2.slice(-3),{tx:gPN(h,a.player)+': '+a.type+ba,c}];}else if(f.t==='result'&&h.winners.length){const w=h.winners[0];fl2=[...fl2.slice(-3),{tx:'🏆 '+gPN(h,w.name)+' wins '+(w.amount/h.bb).toFixed(1)+'BB',c:'fw'}];}}fle.innerHTML=fl2.map(l=>\`<div class="fll \${l.c||''}">\${l.tx.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</div>\`).join('');
document.getElementById('fc').textContent=(fi+1)+'/'+fr.length;document.getElementById('sc').value=fi;document.querySelectorAll('.hi').forEach((el,i)=>{el.classList.toggle('a',i===hi);if(i===hi)el.scrollIntoView({block:'nearest'});});document.getElementById('bph').disabled=hi===0;document.getElementById('bnh').disabled=hi===VH2.length-1;}
function lH3(i){hi=Math.max(0,Math.min(VH2.length-1,i));fr=bF3(VH2[hi]);fi=0;fl2=[];document.getElementById('sc').max=Math.max(0,fr.length-1);ren3();}
function gF3(i){fi=Math.max(0,Math.min(fr.length-1,i));ren3();}
function pH(){stP3();lH3(hi-1);}function nH(){stP3();lH3(hi+1);}
function sB(){stP3();gF3(fi-1);}function sF(){stP3();gF3(fi+1);}
function tP(){pl?stP3():stPl3();}
function stPl3(){if(pl)return;pl=true;document.getElementById('pb').textContent='⏸';document.getElementById('pb').classList.add('stop');iv=setInterval(()=>{if(fi>=fr.length-1){hi<VH2.length-1?lH3(hi+1):stP3();}else gF3(fi+1);},sp);}
function stP3(){pl=false;clearInterval(iv);document.getElementById('pb').textContent='▶';document.getElementById('pb').classList.remove('stop');}
function sSp(b){sp=parseInt(b.dataset.s);document.querySelectorAll('.sbb').forEach(x=>x.classList.toggle('on',x===b));if(pl){stP3();stPl3();}}
document.getElementById('sc').addEventListener('input',e=>{stP3();gF3(parseInt(e.target.value));});
function gBT(h){const p=h.filter(x=>x.pot>0).map(x=>x.potBB).sort((a,b)=>b-a);return p[Math.ceil(p.length*0.2)-1]||0;}
function tFlt(){fa=!fa;document.getElementById('fltb').classList.toggle('on',fa);VH2=fa?AH2.filter(h=>h.potBB>=gBT(AH2)):[...AH2];bSb3();lH3(0);}
function wPos(h){const w=h.winners[0];if(!w)return'?';const p=h.players.find(x=>x.name===w.name);return p?p.position+(p.isHero?'★':''):'?';}
function bSb3(){const thr=gBT(AH2),list=document.getElementById('hl');list.innerHTML='';VH2.forEach((h,i)=>{const ib=h.potBB>=thr,d=document.createElement('div');d.className='hi'+(i===0?' a':'')+(ib?' bp':'');const np=h.newPlayers&&h.newPlayers.length?\`<div class="hnp">⚡ new</div>\`:'';const ri=AH2.indexOf(h)+1;d.innerHTML=\`<div class="hn">\${ib?'⭐ ':''}Hand #\${ri}</div><div class="hm">\${h.potBB>0?h.potBB+'BB · ':''}\${wPos(h)}</div>\${np}\`;d.onclick=()=>{stP3();lH3(i);cSb();};list.appendChild(d);});document.getElementById('hcnt').textContent=VH2.length;}
function tSb(){const s=document.getElementById('sb'),o=document.getElementById('sbov');s.classList.toggle('open');o.classList.toggle('show',s.classList.contains('open'));}
function cSb(){document.getElementById('sb').classList.remove('open');document.getElementById('sbov').classList.remove('show');}
bSb3();lH3(0);
<\/script></body></html>`;
}
</script>
</body>
</html>
