---
layout: none
title: Session Review Tool v5
nav_order: 2
has_children: true
---

<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>ACR Poker Replayer</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#06101c;--border:rgba(255,255,255,0.09);
  --text:#d4e0f0;--muted:#3a4e65;--muted2:#526a85;
  --accent:#4d8aff;--hero:#a78bfa;--green:#22d47a;--red:#f06060;--gold:#f5c542;
  --felt-d:#091f14;--felt-m:#102a1a;--felt-l:#184028;--rail:#081510;
}
html,body{height:100%;overflow:hidden}
body{background:var(--bg);color:var(--text);font-family:'Rajdhani','Trebuchet MS',sans-serif;display:flex;flex-direction:column;-webkit-tap-highlight-color:transparent;user-select:none}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#1e3050;border-radius:3px}

/* ── HEADER ── */
#hdr{display:flex;align-items:center;gap:6px;padding:0 8px;height:44px;flex-shrink:0;background:rgba(6,14,26,0.99);border-bottom:1px solid var(--border);z-index:200;position:relative;overflow:hidden}
.h-logo{font-size:18px;flex-shrink:0}
.h-title{font-size:13px;font-weight:700;letter-spacing:2px;color:var(--hero);flex-shrink:0}
#h-stakes{background:rgba(77,138,255,0.12);border:1px solid rgba(77,138,255,0.25);border-radius:20px;padding:2px 7px;font-size:10px;font-family:'IBM Plex Mono',monospace;color:var(--accent);display:none;flex-shrink:0}
#h-profit{font-size:10px;font-family:'IBM Plex Mono',monospace;font-weight:600;display:none;padding:2px 7px;border-radius:20px;flex-shrink:0}
.pp{background:rgba(34,212,122,0.1);border:1px solid rgba(34,212,122,0.25);color:var(--green)}
.pn{background:rgba(240,96,96,0.1);border:1px solid rgba(240,96,96,0.25);color:var(--red)}
.h-sp{flex:1;min-width:2px}
.btn{border:none;border-radius:6px;cursor:pointer;font-family:'Rajdhani',sans-serif;font-weight:700;letter-spacing:0.5px;transition:opacity 0.15s;display:inline-flex;align-items:center;gap:4px;white-space:nowrap;flex-shrink:0}
.btn:active{opacity:0.75}
.btn-load{background:linear-gradient(135deg,#2a48aa,#5030a8);color:#fff;padding:6px 9px;font-size:11px}
.btn-export{background:linear-gradient(135deg,#0a6855,#0b9070);color:#fff;padding:6px 9px;font-size:11px;display:none}
.btn-filter{background:rgba(245,197,66,0.1);border:1px solid rgba(245,197,66,0.28);color:var(--gold);padding:5px 8px;font-size:10px;display:none;border-radius:5px}
.btn-filter.on{background:rgba(245,197,66,0.22)}
#mbtn{display:none;background:none;border:none;color:var(--muted2);font-size:20px;cursor:pointer;padding:3px;line-height:1;flex-shrink:0}
@media(max-width:680px){
  #mbtn{display:flex}
  /* hide text label on very small screens, keep icon */
  .h-title{display:none}
  #h-stakes{font-size:9px;padding:2px 6px}
  #h-profit{font-size:9px;padding:2px 6px}
  .btn-load span, .btn-export span, .btn-filter span{display:none}
}

/* ── ROOT LAYOUT ── */
/* On mobile: #app is a single column, sidebar is absolutely overlaid */
#app{flex:1;overflow:hidden;min-height:0;position:relative;display:flex}

/* ── SIDEBAR (always absolute-overlay, even on desktop at narrow widths) ── */
#sb{
  position:absolute;top:0;left:0;bottom:0;
  width:0;overflow:hidden;
  background:rgba(6,12,24,0.98);
  border-right:1px solid var(--border);
  display:flex;flex-direction:column;
  z-index:150;transition:width 0.22s ease;
  /* On wider screens, default to open */
}
#sb.open{width:160px}
@media(min-width:681px){
  #sb{width:158px}
  #sb.closed{width:0}
}
#sb-ov{display:none;position:absolute;inset:0;z-index:149;background:rgba(0,0,0,0.55)}
#sb-ov.show{display:block}
.sb-hdr{padding:7px 10px;font-size:9px;font-weight:700;letter-spacing:1.5px;color:var(--muted);border-bottom:1px solid var(--border);text-transform:uppercase;flex-shrink:0;display:flex;align-items:center;justify-content:space-between}
#stats{padding:8px 10px;border-bottom:1px solid var(--border);display:none;flex-shrink:0}
.sr{display:flex;justify-content:space-between;margin-bottom:2px;font-size:10px}
.sk{color:var(--muted2)}.sv{font-family:'IBM Plex Mono',monospace;font-size:9px;font-weight:600;color:var(--text)}
.sv.pos{color:var(--green)}.sv.neg{color:var(--red)}
#hlist{flex:1;overflow-y:auto}
.hi{padding:6px 10px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.03);border-left:2px solid transparent;transition:background 0.1s}
.hi:hover{background:rgba(77,138,255,0.07)}
.hi.act{background:rgba(77,138,255,0.13);border-left-color:var(--accent)}
.hi.bp{border-left-color:var(--gold)!important}
.hi-n{font-size:10px;font-weight:700;color:var(--muted2)}.hi.act .hi-n{color:var(--hero)}
.hi-m{font-size:9px;color:var(--muted);font-family:'IBM Plex Mono',monospace}
.hi-np{font-size:8px;color:var(--gold)}

/* ── CENTER — must fill ALL remaining space regardless of sidebar ── */
#ct{
  position:absolute;top:0;right:0;bottom:0;
  /* left shifts when sidebar is open on desktop */
  left:0;
  display:flex;flex-direction:column;
  transition:left 0.22s ease;
}
@media(min-width:681px){
  #ct{left:158px}
  #ct.sb-closed{left:0}
}

/* ── INFOBAR ── */
#ib{padding:0 10px;height:26px;flex-shrink:0;display:flex;align-items:center;gap:7px;background:rgba(6,12,24,0.96);border-bottom:1px solid var(--border);font-size:9px;font-family:'IBM Plex Mono',monospace;overflow:hidden}
.ib-pill{background:rgba(77,138,255,0.1);border:1px solid rgba(77,138,255,0.2);border-radius:10px;padding:1px 7px;color:var(--accent);white-space:nowrap;flex-shrink:0}
#ib-s{color:var(--muted2);white-space:nowrap;flex-shrink:0}
#ib-e{margin-left:auto;font-size:10px;color:var(--gold);font-weight:700;font-family:'Rajdhani',sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:52%}

/* ── TABLE AREA ── */
#ta{flex:1;position:relative;overflow:hidden}

/* Felt — perfectly centred, always */
#felt{
  position:absolute;top:50%;left:50%;
  transform:translate(-50%,-50%);
  /* Ellipse sized to fill available space nicely */
  width:min(90%,500px);
  height:min(72%,300px);
  min-width:240px;min-height:160px;
  border-radius:50%;
  background:radial-gradient(ellipse at 40% 38%,var(--felt-l),var(--felt-m) 55%,var(--felt-d));
  border:6px solid var(--rail);
  box-shadow:0 0 0 3px rgba(255,255,255,0.04),0 0 0 9px #040c10,0 0 70px rgba(0,0,0,0.85),inset 0 0 40px rgba(0,0,0,0.45);
}

/* Board cards */
#brd{position:absolute;top:50%;left:50%;transform:translate(-50%,-52%);display:flex;gap:5px;align-items:center;z-index:10}

/* Pot */
#pot{position:absolute;top:50%;left:50%;transform:translate(-50%,-200%);font-size:11px;font-weight:700;color:var(--gold);background:rgba(0,0,0,0.65);padding:2px 10px;border-radius:20px;z-index:11;display:none;font-family:'IBM Plex Mono',monospace;white-space:nowrap;pointer-events:none}

/* Street label */
#stlbl{position:absolute;top:50%;left:50%;transform:translate(-50%,-290%);font-size:9px;font-weight:700;letter-spacing:3px;color:rgba(255,255,255,0.15);text-transform:uppercase;pointer-events:none;z-index:9}

/* Players & bets layers */
#pw{position:absolute;inset:0;z-index:20;pointer-events:none}
#bw{position:absolute;inset:0;z-index:16;pointer-events:none}

/* ── ACTION LABEL — shown inside player box, always visible ── */
.act-label{
  border-radius:8px;padding:3px 9px;
  font-size:11px;font-weight:700;font-family:'Rajdhani',sans-serif;
  letter-spacing:0.5px;text-transform:uppercase;
  white-space:nowrap;margin-top:1px;
  border:1px solid rgba(255,255,255,0.15);
}
.act-folds  {background:#1e2530;color:#6a8090;border-color:#2a3540}
.act-checks {background:#0e1e3a;color:#5080d0;border-color:#1a2e5a}
.act-calls  {background:#0a2a15;color:#30b860;border-color:#155530}
.act-bets   {background:#2a1a04;color:#e09020;border-color:#5a3a08}
.act-raises {background:#2a0808;color:#e03030;border-color:#5a1010}
.act-wins,.act-collects{background:#180830;color:#a060f0;border-color:#3a1060}
.act-shows  {background:#081830;color:#4080c0;border-color:#103060}

/* Active player: big glowing ring */
.pchip.active{
  border-color:var(--gold)!important;
  box-shadow:0 0 0 3px rgba(245,197,66,0.4),0 0 20px rgba(245,197,66,0.35);
  background:rgba(40,28,4,0.95)!important;
}
/* Pulse only when it's their turn and no action taken yet */
.pchip.active.waiting{animation:glow 0.9s ease infinite}
@keyframes glow{0%,100%{box-shadow:0 0 0 2px rgba(245,197,66,0.3),0 0 12px rgba(245,197,66,0.2)}50%{box-shadow:0 0 0 4px rgba(245,197,66,0.6),0 0 24px rgba(245,197,66,0.45)}}

/* ── BET CHIP ── */
.bchip{
  position:absolute;transform:translate(-50%,-50%);
  background:rgba(0,0,0,0.7);border:1px solid rgba(245,197,66,0.5);
  border-radius:5px;padding:2px 6px;
  font-size:9px;font-family:'IBM Plex Mono',monospace;font-weight:600;
  color:var(--gold);white-space:nowrap;pointer-events:none;
  animation:chipIn 0.15s ease;
}
@keyframes chipIn{from{transform:translate(-50%,-50%) scale(0.4);opacity:0}to{transform:translate(-50%,-50%) scale(1);opacity:1}}

/* ── PLAYER BOX ── */
.pbox{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:2px}
.pcards{display:flex;gap:2px;margin-bottom:2px}
.pchip{background:rgba(6,12,26,0.92);border:1px solid rgba(255,255,255,0.11);border-radius:7px;padding:3px 7px;display:flex;flex-direction:column;align-items:center;min-width:56px;transition:border-color 0.2s,box-shadow 0.2s,background 0.2s}
.pchip.hero{border-color:rgba(167,139,250,0.55);background:rgba(25,10,55,0.9)}
.pchip.active{border-color:var(--gold)!important;box-shadow:0 0 0 2px rgba(245,197,66,0.25),0 0 18px rgba(245,197,66,0.3);background:rgba(35,25,4,0.95)!important;animation:glow 0.9s ease infinite}
@keyframes glow{0%,100%{box-shadow:0 0 0 1px rgba(245,197,66,0.25),0 0 12px rgba(245,197,66,0.2)}50%{box-shadow:0 0 0 2px rgba(245,197,66,0.5),0 0 22px rgba(245,197,66,0.4)}}
.pchip.fold{opacity:0.3}
.ppos{font-size:10px;font-weight:700;color:var(--text);white-space:nowrap}
.ppos.hero{color:var(--hero)}
.pstk{font-size:8px;color:var(--muted2);font-family:'IBM Plex Mono',monospace}
.dbtn{position:absolute;top:-7px;right:-7px;width:15px;height:15px;border-radius:50%;background:var(--gold);color:#1a0800;font-size:7px;font-weight:900;display:flex;align-items:center;justify-content:center;border:1px solid #d4a800;z-index:30}
.newbdg{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:rgba(245,197,66,0.15);border:1px solid rgba(245,197,66,0.4);border-radius:4px;padding:1px 4px;font-size:7px;font-weight:700;color:var(--gold);white-space:nowrap}
.tarrow{position:absolute;bottom:-14px;left:50%;transform:translateX(-50%);font-size:10px;color:var(--gold);animation:bob 0.5s ease infinite alternate;pointer-events:none}
@keyframes bob{from{transform:translateX(-50%) translateY(0)}to{transform:translateX(-50%) translateY(-3px)}}

/* ── CARDS — solid, high-contrast ── */
.card{border-radius:5px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 2px 6px rgba(0,0,0,0.7)}
.card.sm{width:26px;height:36px}
.card.md{width:38px;height:52px}
.card.bk{background:#1a2a40;border:1.5px solid #2a3d5a}
/* Solid suit colours */
.card.cs{background:#1a2b45;border:1.5px solid #4a6fa0}  /* spade - steel blue */
.card.ch{background:#4a1010;border:1.5px solid #a03030}  /* heart - deep red */
.card.cd{background:#0d3535;border:1.5px solid #2a8080}  /* diamond - teal */
.card.cc{background:#0d3a18;border:1.5px solid #2a8040}  /* club - green */
.crank{font-family:'IBM Plex Mono',monospace;font-weight:600;line-height:1;letter-spacing:-0.5px}
.card.sm .crank{font-size:14px}.card.md .crank{font-size:20px}
.card.cs .crank{color:#a8ccf0}
.card.ch .crank{color:#ff8080}
.card.cd .crank{color:#40d0d0}
.card.cc .crank{color:#40c860}

/* ── CONTROLS ── */
#ctrl{padding:8px 10px 10px;flex-shrink:0;background:rgba(5,10,20,0.99);border-top:1px solid var(--border);display:flex;flex-direction:column;gap:6px}
#srow{display:flex;align-items:center;gap:8px}
#flbl{font-size:9px;color:var(--muted);font-family:'IBM Plex Mono',monospace;min-width:38px}
#scr{flex:1;accent-color:var(--accent);cursor:pointer;height:4px}
#brow{display:flex;gap:5px;align-items:center;justify-content:center;flex-wrap:wrap}
.cb{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.09);border-radius:5px;width:36px;height:32px;color:#5878a0;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;touch-action:manipulation;transition:opacity 0.1s}
.cb:disabled{color:#1e2e40;cursor:not-allowed;opacity:0.4}
.cb:active:not(:disabled){opacity:0.6}
#pbtn{background:linear-gradient(135deg,#2a48aa,#5030a8);border:none;border-radius:7px;width:44px;height:32px;color:#fff;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;touch-action:manipulation}
#pbtn.stop{background:linear-gradient(135deg,#8a1212,#c01818)}
#pbtn:active{opacity:0.7}
.spd{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:4px 9px;color:var(--muted2);font-size:10px;font-weight:700;cursor:pointer;font-family:'IBM Plex Mono',monospace;touch-action:manipulation}
.spd.on{background:rgba(77,138,255,0.2);border-color:var(--accent);color:var(--accent)}
.cdiv{width:1px;height:20px;background:rgba(255,255,255,0.07);margin:0 2px}

/* ── UPLOAD ── */
#upload{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;padding:24px}
#dz{width:min(320px,100%);padding:34px 26px;border-radius:14px;border:2px dashed rgba(77,138,255,0.28);background:rgba(77,138,255,0.04);display:flex;flex-direction:column;align-items:center;gap:14px;cursor:pointer;transition:all 0.2s;animation:breathe 3s ease-in-out infinite}
#dz:hover,#dz.over{border-color:rgba(77,138,255,0.6);background:rgba(77,138,255,0.1)}
.dz-ic{font-size:44px}.dz-t{font-size:16px;font-weight:700;color:var(--hero);text-align:center}.dz-s{font-size:12px;color:var(--muted2);text-align:center;line-height:1.7}
#err{color:var(--red);font-size:12px;max-width:300px;text-align:center;display:none}
.u-hint{font-size:11px;color:var(--muted);text-align:center;max-width:340px;line-height:1.7}
@keyframes breathe{0%,100%{box-shadow:0 0 20px rgba(77,138,255,0.1)}50%{box-shadow:0 0 40px rgba(77,138,255,0.28)}}

/* ── TOAST ── */
#toast{position:fixed;bottom:14px;right:14px;left:14px;max-width:400px;margin:0 auto;background:#0a6a58;color:#fff;padding:9px 14px;border-radius:8px;font-size:12px;font-weight:700;box-shadow:0 4px 20px rgba(0,0,0,0.55);transform:translateY(70px);opacity:0;transition:all 0.3s;z-index:999}
#toast.show{transform:translateY(0);opacity:1}
</style>
</head>
<body>

<div id="hdr">
  <button id="mbtn" onclick="toggleSB()">☰</button>
  <span class="h-logo">♠</span>
  <span class="h-title">ACR REPLAYER</span>
  <span id="h-stakes"></span>
  <span id="h-profit"></span>
  <div class="h-sp"></div>
  <button class="btn btn-filter" id="filtbtn" onclick="toggleFilter()">⭐<span> Big Hands</span></button>
  <button class="btn btn-export" id="expbtn" onclick="exportPost()">📝<span> Export</span></button>
  <button class="btn btn-load" onclick="document.getElementById('fi').click()">📂<span> Load</span></button>
  <input type="file" id="fi" accept=".txt" style="display:none">
</div>

<!-- UPLOAD -->
<div id="upload">
  <div id="dz" onclick="document.getElementById('fi').click()">
    <span class="dz-ic">🃏</span>
    <span class="dz-t">Load Your Hand History</span>
    <span class="dz-s">ACR → My Hand History → export .txt<br>Drop here or tap to browse</span>
    <button class="btn btn-load" style="pointer-events:none">Browse File</button>
  </div>
  <div id="err"></div>
  <p class="u-hint">Exports Jekyll-ready <strong>.md + .html</strong> for learnpokerwithme.com<br>All players anonymised · Hero front-centre · BB display</p>
</div>

<!-- MAIN APP -->
<div id="app" style="display:none">
  <div id="sb-ov" onclick="closeSB()"></div>
  <div id="sb">
    <div class="sb-hdr"><span id="sbhdr">HANDS (0)</span><span id="filtind" style="font-size:8px;color:var(--gold);display:none">★</span></div>
    <div id="stats">
      <div class="sr"><span class="sk">Hands</span><span class="sv" id="s0">—</span></div>
      <div class="sr"><span class="sk">Net</span><span class="sv" id="s1">—</span></div>
      <div class="sr"><span class="sk">BB/100</span><span class="sv" id="s2">—</span></div>
      <div class="sr"><span class="sk">VPIP</span><span class="sv" id="s3">—</span></div>
      <div class="sr"><span class="sk">PFR</span><span class="sv" id="s4">—</span></div>
    </div>
    <div id="hlist"></div>
  </div>
  <div id="ct">
    <div id="ib">
      <span class="ib-pill" id="ibh">—</span>
      <span id="ib-s"></span>
      <span id="ib-e"></span>
    </div>
    <div id="ta">
      <div id="felt"></div>
      <div id="stlbl"></div>
      <div id="brd"></div>
      <div id="pot"></div>
      <div id="bw"></div>
      <div id="pw"></div>
    </div>
    <div id="ctrl">
      <div id="srow">
        <span id="flbl">0/0</span>
        <input type="range" id="scr" min="0" max="0" value="0">
      </div>
      <div id="brow">
        <button class="cb" id="bph" onclick="prevH()" disabled>⏮</button>
        <button class="cb" onclick="stepB()">◀</button>
        <button id="pbtn" onclick="togglePlay()">▶</button>
        <button class="cb" onclick="stepF()">▶</button>
        <button class="cb" id="bnh" onclick="nextH()">⏭</button>
        <div class="cdiv"></div>
        <button class="spd on" data-ms="2200" onclick="setSpd(this)">1×</button>
        <button class="spd" data-ms="1300" onclick="setSpd(this)">1.5×</button>
        <button class="spd" data-ms="650" onclick="setSpd(this)">3×</button>
      </div>
    </div>
  </div>
</div>

<div id="toast"></div>

<script>
// ════════════════════════════════════════════
// GLOBALS
// ════════════════════════════════════════════
let ALL=[], VIEW=[], hi=0, fi=0, frames=[], playing=false, spd=2200, tick=null, filtOn=false;
let toastTimers={}; // for fading action toasts

// ════════════════════════════════════════════
// PARSER — strict stakes, no date collision
// ════════════════════════════════════════════
function parseAll(raw){
  return raw.split(/(?=Hand #\d+)/g).filter(c=>c.trim().length>60).map(parseOne).filter(Boolean);
}
function parseOne(txt){
  try{
    const L=txt.split('\n').map(l=>l.trim()).filter(Boolean);
    const h={id:'',stakes:'',bb:0.02,date:'',players:[],hero:null,button:null,
      SB:null,BB:null,streets:{preflop:[],flop:[],turn:[],river:[]},
      board:{flop:[],turn:null,river:null},pot:0,potBB:0,winners:[],newP:[]};

    // ID
    const idM=L[0].match(/Hand #(\d+)/i); h.id=idM?idM[1]:rnd();

    // Stakes — require $ prefix OR small decimal numbers (not year-like)
    const skM=L[0].match(/\$(\d{1,4}(?:\.\d{1,4})?)\/\$?(\d{1,4}(?:\.\d{1,4})?)/);
    if(skM){h.stakes=`$${skM[1]}/$${skM[2]}`;h.bb=parseFloat(skM[2]);}
    else{
      // Try without $ but reject if looks like year (> 999)
      const sk2=L[0].match(/\b(\d{1,3}(?:\.\d+)?)\/(\d{1,3}(?:\.\d+)?)\b/);
      if(sk2&&parseFloat(sk2[1])<500){h.stakes=`$${sk2[1]}/$${sk2[2]}`;h.bb=parseFloat(sk2[2]);}
    }

    // Date
    const dtM=L[0].match(/(\d{4}[-/]\d{2}[-/]\d{2})/); h.date=dtM?dtM[1]:'';

    // Table + button
    const tL=L.find(l=>/^table /i.test(l));
    if(tL){
      const tM=tL.match(/Table '?([^']+)'?\s+\d+-max/i);
      h.table=tM?tM[1].trim():(tL.split(' ')[1]||'');
      const bM=tL.match(/Seat #(\d+) is the button/i);
      h.button=bM?parseInt(bM[1]):null;
    }

    // Seats
    L.filter(l=>/^Seat \d+:/i.test(l)).forEach(l=>{
      const m=l.match(/^Seat (\d+):\s+(.+?)\s+\(\$?([\d,.]+)/i);
      if(m) h.players.push({seat:parseInt(m[1]),name:m[2].trim(),stack:parseFloat(m[3].replace(',','')),cards:null,position:'',isHero:false});
    });

    // Blinds
    const sbL=L.find(l=>/posts small blind/i.test(l));
    const bbL=L.find(l=>/posts big blind/i.test(l));
    if(sbL){const m=sbL.match(/^(.+?)\s*:/);if(m)h.SB=m[1].trim();}
    if(bbL){const m=bbL.match(/^(.+?)\s*:/);if(m)h.BB=m[1].trim();}

    // Hero cards
    const dL=L.find(l=>/^Dealt to /i.test(l));
    if(dL){
      const m=dL.match(/^Dealt to (.+?)\s*\[(.+?)\]/i);
      if(m){h.hero=m[1].trim();const hp=h.players.find(p=>p.name===h.hero);if(hp){hp.cards=m[2].split(' ').map(s=>s.trim());hp.isHero=true;}}
    }

    // Streets
    let st='preflop';
    for(const line of L){
      if(/^\*\*\* (HOLE CARDS|PRE-?FLOP) \*\*\*/i.test(line)){st='preflop';continue;}
      if(/^\*\*\* FLOP \*\*\*/i.test(line)){st='flop';const bm=line.match(/\[(.+?)\]/);if(bm)h.board.flop=bm[1].split(' ').map(s=>s.trim());continue;}
      if(/^\*\*\* TURN \*\*\*/i.test(line)){st='turn';const bm=line.match(/\[.+?\]\s*\[(.+?)\]/);if(bm)h.board.turn=bm[1].trim();continue;}
      if(/^\*\*\* RIVER \*\*\*/i.test(line)){st='river';const bm=line.match(/\[.+?\]\s*\[(.+?)\]/);if(bm)h.board.river=bm[1].trim();continue;}
      if(/^\*\*\* (SHOW DOWN|SUMMARY) \*\*\*/i.test(line)){st='summary';continue;}
      const aM=line.match(/^(.+?):\s+(folds|checks|calls|bets|raises|shows|mucks|wins|collects)(.*)$/i);
      if(aM&&st!=='summary'){
        const a={player:aM[1].trim(),type:aM[2].toLowerCase(),amount:0,cards:null};
        const amM=aM[3].match(/\$?([\d,.]+)/);if(amM)a.amount=parseFloat(amM[1].replace(',',''));
        const cM=aM[3].match(/\[(.+?)\]/);if(cM)a.cards=cM[1].split(' ').map(s=>s.trim());
        if(['preflop','flop','turn','river'].includes(st))h.streets[st].push(a);
      }
      if(/collected|wins/i.test(line)&&st==='summary'){
        const wM=line.match(/^(.+?)\s+(?:collected|wins)\s+\$?([\d,.]+)/i);
        if(wM)h.winners.push({name:wM[1].trim(),amount:parseFloat(wM[2].replace(',',''))});
      }
    }

    // Pot
    const pL=L.find(l=>/total pot/i.test(l));
    if(pL){const pm=pL.match(/\$?([\d,.]+)/);if(pm)h.pot=parseFloat(pm[1].replace(',',''));}
    if(!h.pot&&h.winners.length)h.pot=h.winners.reduce((s,w)=>s+w.amount,0);
    h.potBB=h.bb>0?Math.round(h.pot/h.bb):0;

    assignPos(h);
    return h;
  }catch(e){return null;}
}

function assignPos(h){
  const pn=['BTN','SB','BB','UTG','HJ','CO'];
  const bi=h.players.findIndex(p=>p.seat===h.button);
  if(bi<0){h.players.forEach((p,i)=>p.position=pn[i]||`P${i+1}`);return;}
  for(let i=0;i<h.players.length;i++) h.players[(bi+i)%h.players.length].position=pn[i]||`P${i+1}`;
}

function detectNew(hands){
  const seen={};
  hands.forEach((h,i)=>{h.newP=[];h.players.forEach(p=>{if(seen[p.name]===undefined&&i>0)h.newP.push(p.name);seen[p.name]=p.stack;});});
}

function rnd(){return Math.random().toString(36).slice(2,8);}

// ════════════════════════════════════════════
// FRAMES
// ════════════════════════════════════════════
function buildFrames(h){
  const f=[{t:'deal'}];
  h.streets.preflop.forEach(a=>f.push({t:'action',s:'preflop',a}));
  if(h.board.flop.length){f.push({t:'board',s:'flop',c:h.board.flop});h.streets.flop.forEach(a=>f.push({t:'action',s:'flop',a}));}
  if(h.board.turn){f.push({t:'board',s:'turn',c2:h.board.turn});h.streets.turn.forEach(a=>f.push({t:'action',s:'turn',a}));}
  if(h.board.river){f.push({t:'board',s:'river',c2:h.board.river});h.streets.river.forEach(a=>f.push({t:'action',s:'river',a}));}
  f.push({t:'result'});
  return f;
}

// ════════════════════════════════════════════
// STATE — accumulates correctly through frames
// ════════════════════════════════════════════
function getState(){
  let flop=[],turn=null,river=null,cs='preflop';
  const acts={},bets={};
  const folded=new Set();
  for(let i=0;i<=fi;i++){
    const f=frames[i];if(!f)continue;
    if(f.t==='deal'){Object.keys(acts).forEach(k=>delete acts[k]);Object.keys(bets).forEach(k=>delete bets[k]);folded.clear();}
    else if(f.t==='board'){
      Object.keys(bets).forEach(k=>delete bets[k]);Object.keys(acts).forEach(k=>delete acts[k]);
      if(f.s==='flop'){flop=f.c;cs='flop';}
      if(f.s==='turn'){turn=f.c2;cs='turn';}
      if(f.s==='river'){river=f.c2;cs='river';}
    }else if(f.t==='action'){
      const a=f.a;acts[a.player]=a;
      if(a.type==='folds'){folded.add(a.player);delete bets[a.player];}
      else if(['bets','raises','calls'].includes(a.type)&&a.amount>0)bets[a.player]=a.amount;
      else if(a.type==='checks')delete bets[a.player];
    }
  }
  const frame=frames[fi];
  const active=frame?.t==='action'?frame.a.player:null;
  return{flop,turn,river,cs,acts,bets,folded,active,frame};
}

// ════════════════════════════════════════════
// CARDS
// ════════════════════════════════════════════
const SC={'s':'cs','h':'ch','d':'cd','c':'cc'};
function cardH(str,sz,fd){
  if(fd||!str)return`<div class="card ${sz} bk"></div>`;
  const r=str.slice(0,-1).toUpperCase(),su=str.slice(-1).toLowerCase();
  return`<div class="card ${sz} ${SC[su]||'cs'}"><span class="crank">${r}</span></div>`;
}

// ════════════════════════════════════════════
// SEAT POSITIONS — symmetric ellipse
// Hero always slot 0 (bottom centre)
// Positions evenly distributed around ellipse
// ════════════════════════════════════════════
// 6 seats at angles (degrees from bottom, clockwise)
// Bottom=90°, going clockwise: 90, 150, 210, 270(top), 330, 30
// In CSS top/left (origin top-left):
// angle from top CW: bottom=180°
// We define as fraction of container [0..1]
const SLOT6=[
  {top:0.90,left:0.50},  // 0  bottom-centre (hero)
  {top:0.74,left:0.18},  // 1  bottom-left
  {top:0.40,left:0.04},  // 2  mid-left
  {top:0.08,left:0.18},  // 3  top-left
  {top:0.08,left:0.72},  // 4  top-right
  {top:0.40,left:0.88},  // 5  mid-right
  // 4-player fallbacks (BTN out)
];
// Extra for 5-seat
const SLOT5=[
  {top:0.90,left:0.50},
  {top:0.76,left:0.16},
  {top:0.10,left:0.16},
  {top:0.10,left:0.74},
  {top:0.76,left:0.74},
];
const SLOT4=[
  {top:0.90,left:0.50},
  {top:0.42,left:0.04},
  {top:0.08,left:0.42},
  {top:0.42,left:0.88},
];

// Bet chip positions (midpoint between seat and centre)
const BET6=[
  {top:0.70,left:0.50},
  {top:0.64,left:0.32},
  {top:0.48,left:0.22},
  {top:0.30,left:0.32},
  {top:0.30,left:0.60},
  {top:0.48,left:0.70},
];
const BET5=[
  {top:0.70,left:0.50},
  {top:0.62,left:0.30},
  {top:0.28,left:0.30},
  {top:0.28,left:0.65},
  {top:0.62,left:0.65},
];
const BET4=[
  {top:0.70,left:0.50},
  {top:0.50,left:0.24},
  {top:0.26,left:0.46},
  {top:0.50,left:0.68},
];

function getSlots(n){return n<=4?SLOT4:n===5?SLOT5:SLOT6;}
function getBetSlots(n){return n<=4?BET4:n===5?BET5:BET6;}

function buildSlotMap(hand){
  const pOrder=['BTN','SB','BB','UTG','HJ','CO'];
  const heroPos=hand.players.find(p=>p.isHero)?.position;
  const hi2=pOrder.indexOf(heroPos);
  const map={};
  if(hi2<0){hand.players.forEach((p,i)=>map[p.position]=i);return map;}
  let slot=0;
  for(let i=0;i<pOrder.length;i++){
    const pos=pOrder[(hi2+i)%pOrder.length];
    if(hand.players.find(p=>p.position===pos)){map[pos]=slot++;};
  }
  return map;
}

// ════════════════════════════════════════════
// ACTION LABEL COLORS (inline in player box)
// ════════════════════════════════════════════
// (no separate toast system needed - labels are part of the player box HTML)

// ════════════════════════════════════════════
// RENDER
// ════════════════════════════════════════════
function render(){
  const hand=VIEW[hi];if(!hand)return;
  const st=getState();
  const n=hand.players.length;
  const slots=getSlots(n);
  const betSlots=getBetSlots(n);
  const sm=buildSlotMap(hand);
  const bc=[...st.flop,...(st.turn?[st.turn]:[]),...(st.river?[st.river]:[])];

  // Board
  document.getElementById('brd').innerHTML=bc.map(c=>cardH(c,'md',false)).join('');

  // Pot
  const potEl=document.getElementById('pot');
  if(bc.length&&hand.pot>0){potEl.style.display='block';potEl.textContent=`Pot: ${(hand.pot/hand.bb).toFixed(1)}BB`;}
  else potEl.style.display='none';

  // Street label
  document.getElementById('stlbl').textContent=st.cs!=='preflop'?st.cs.toUpperCase():'';

  // Bet chips
  const bwEl=document.getElementById('bw');bwEl.innerHTML='';
  Object.entries(st.bets).forEach(([pn,amt])=>{
    const p=hand.players.find(x=>x.name===pn);if(!p)return;
    const slot=sm[p.position]??0;
    const bp=betSlots[slot]||betSlots[0];
    const d=document.createElement('div');d.className='bchip';
    d.style.top=(bp.top*100)+'%';d.style.left=(bp.left*100)+'%';
    d.textContent=(amt/hand.bb).toFixed(1)+'BB';
    bwEl.appendChild(d);
  });

  // Players
  const pwEl=document.getElementById('pw');
  pwEl.innerHTML='';

  hand.players.forEach(p=>{
    const slot=sm[p.position]??0;
    const pos=slots[slot]||slots[0];
    const isActive=st.active===p.name;
    const ih=p.isHero,ib=p.seat===hand.button;
    const hf=st.folded.has(p.name),isN=hand.newP.includes(p.name);
    const stBB=(p.stack/hand.bb).toFixed(0);
    const dn=p.position+(ih?' (You)':'');

    // Last action for this player (shown as inline label)
    const lastAct=st.acts[p.name];

    let html='';
    if(ib)html+=`<div class="dbtn">D</div>`;
    if(isN)html+=`<div class="newbdg">NEW</div>`;

    // Cards
    if(p.cards){
      html+=`<div class="pcards">${p.cards.map(c=>cardH(c,'sm',false)).join('')}</div>`;
    }else if(!hf){
      html+=`<div class="pcards">${cardH(null,'sm',true)}${cardH(null,'sm',true)}</div>`;
    }

    // Chip (name + stack)
    // isActive: gold ring. waiting = active but no action taken this street yet
    const isWaiting=isActive&&!lastAct;
    let cc='pchip'+(ih?' hero':'')+(isActive?' active':'')+(isWaiting?' waiting':'')+(hf?' fold':'');
    html+=`<div class="${cc}">`;
    html+=`<span class="ppos${ih?' hero':''}">${dn}</span>`;
    html+=`<span class="pstk">${stBB}BB</span>`;
    html+=`</div>`;

    // Action label — show BELOW chip for all players who have acted this street
    if(lastAct){
      const ba=lastAct.amount>0?` ${(lastAct.amount/hand.bb).toFixed(1)}BB`:'';
      html+=`<div class="act-label act-${lastAct.type}">${lastAct.type.toUpperCase()}${ba}</div>`;
    }

    // Arrow for active player who hasn't acted yet
    if(isActive){
      html+=`<div class="tarrow">▼</div>`;
    }

    const div=document.createElement('div');div.className='pbox';
    div.style.top=(pos.top*100)+'%';div.style.left=(pos.left*100)+'%';
    div.innerHTML=html;pwEl.appendChild(div);
  });

  // Infobar
  document.getElementById('ibh').textContent=`Hand #${hi+1}/${VIEW.length}`;
  document.getElementById('ib-s').textContent=hand.stakes+(hand.potBB>0?` · ${hand.potBB}BB pot`:'');

  const f=st.frame;let evtStr='';
  if(f){
    if(f.t==='deal')evtStr='🃏 Cards Dealt';
    else if(f.t==='board'){const cards=(f.c||[f.c2]).join(' ');evtStr=`🎴 ${f.s.toUpperCase()}: ${cards}`;}
    else if(f.t==='action'){
      const p=hand.players.find(x=>x.name===f.a.player);
      const pn=p?p.position+(p.isHero?' (You)':''):'?';
      const ba=f.a.amount>0?` ${(f.a.amount/hand.bb).toFixed(1)}BB`:'';
      evtStr=`${pn} ${f.a.type.toUpperCase()}${ba}`;
    }
    else if(f.t==='result'){
      evtStr=hand.winners.length
        ?`🏆 ${hand.winners.map(w=>{const p=hand.players.find(x=>x.name===w.name);return(p?p.position+(p.isHero?' (You)':''):'?')+' wins '+(w.amount/hand.bb).toFixed(1)+'BB';}).join(', ')}`
        :'🏁 Complete';
    }
  }
  document.getElementById('ib-e').textContent=evtStr;
  document.getElementById('flbl').textContent=`${fi+1}/${frames.length}`;
  document.getElementById('scr').value=fi;
  document.getElementById('bph').disabled=hi===0;
  document.getElementById('bnh').disabled=hi===VIEW.length-1;
  document.querySelectorAll('.hi').forEach((e,i)=>{e.classList.toggle('act',i===hi);if(i===hi)e.scrollIntoView({block:'nearest'});});
}

// ════════════════════════════════════════════
// NAVIGATION
// ════════════════════════════════════════════
function loadH(idx){
  hi=Math.max(0,Math.min(VIEW.length-1,idx));
  frames=buildFrames(VIEW[hi]);fi=0;clearAllToasts();
  document.getElementById('scr').max=Math.max(0,frames.length-1);
  render();
}
function goF(idx){fi=Math.max(0,Math.min(frames.length-1,idx));render();}
function prevH(){stopPlay();loadH(hi-1);}
function nextH(){stopPlay();loadH(hi+1);}
function stepB(){stopPlay();goF(fi-1);}
function stepF(){stopPlay();goF(fi+1);}
function togglePlay(){playing?stopPlay():startPlay();}
function startPlay(){
  if(playing)return;playing=true;
  document.getElementById('pbtn').textContent='⏸';
  document.getElementById('pbtn').classList.add('stop');
  tick=setInterval(()=>{if(fi>=frames.length-1){hi<VIEW.length-1?loadH(hi+1):stopPlay();}else goF(fi+1);},spd);
}
function stopPlay(){
  playing=false;clearInterval(tick);
  document.getElementById('pbtn').textContent='▶';
  document.getElementById('pbtn').classList.remove('stop');
}
function setSpd(btn){spd=parseInt(btn.dataset.ms);document.querySelectorAll('.spd').forEach(b=>b.classList.toggle('on',b===btn));if(playing){stopPlay();startPlay();}}
document.getElementById('scr').addEventListener('input',e=>{stopPlay();goF(parseInt(e.target.value));});

// ════════════════════════════════════════════
// FILTER
// ════════════════════════════════════════════
function bigThr(h){const p=h.filter(x=>x.pot>0).map(x=>x.potBB).sort((a,b)=>b-a);return p[Math.ceil(p.length*0.2)-1]||0;}
function toggleFilter(){
  filtOn=!filtOn;
  document.getElementById('filtbtn').classList.toggle('on',filtOn);
  document.getElementById('filtind').style.display=filtOn?'':'none';
  VIEW=filtOn?ALL.filter(h=>h.potBB>=bigThr(ALL)):[...ALL];
  buildSidebar();loadH(0);stopPlay();
}

// ════════════════════════════════════════════
// STATS
// ════════════════════════════════════════════
function calcStats(hands){
  const hero=hands.find(h=>h.hero)?.hero||null;if(!hero)return null;
  const bb=hands[0]?.bb||0.02;let profit=0,vpip=0,pfr=0,hh=0;
  for(const h of hands){
    if(!h.players.find(p=>p.name===hero))continue;hh++;
    const pfa=h.streets.preflop.filter(a=>a.player===hero);
    if(pfa.find(a=>['calls','bets','raises'].includes(a.type)))vpip++;
    if(pfa.find(a=>a.type==='raises'))pfr++;
    const won=h.winners.find(w=>w.name===hero)?.amount||0;
    let inv=0;['preflop','flop','turn','river'].forEach(s=>h.streets[s].filter(a=>a.player===hero&&['calls','bets','raises'].includes(a.type)).forEach(a=>inv+=a.amount));
    if(h.SB===hero)inv+=bb/2;if(h.BB===hero)inv+=bb;
    profit+=won-inv;
  }
  return{hero,stakes:hands[0]?.stakes||'?',bb,total:hands.length,hh,
    tp:profit.toFixed(2),tpBB:(profit/bb).toFixed(1),
    bb100:hh?((profit/bb/hh)*100).toFixed(1):'0',
    vpip:hh?Math.round(vpip/hh*100):0,pfr:hh?Math.round(pfr/hh*100):0};
}
function showStats(s){
  if(!s)return;const net=parseFloat(s.tp);
  document.getElementById('stats').style.display='block';
  document.getElementById('s0').textContent=s.total;
  document.getElementById('s1').innerHTML=`<span class="${net>=0?'pos':'neg'}">${net>=0?'+':''}$${s.tp}</span>`;
  document.getElementById('s2').textContent=s.bb100;
  document.getElementById('s3').textContent=s.vpip+'%';
  document.getElementById('s4').textContent=s.pfr+'%';
  const pb=document.getElementById('h-profit');pb.style.display='inline-flex';pb.className=net>=0?'pp':'pn';pb.textContent=`${net>=0?'+':''}${s.tpBB}BB`;
  document.getElementById('h-stakes').style.display='inline-flex';document.getElementById('h-stakes').textContent=s.stakes;
}

// ════════════════════════════════════════════
// SIDEBAR
// ════════════════════════════════════════════
function wpPos(h){const w=h.winners[0];if(!w)return'?';const p=h.players.find(x=>x.name===w.name);return p?p.position+(p.isHero?'★':''):'?';}
function buildSidebar(){
  const thr=bigThr(ALL),list=document.getElementById('hlist');list.innerHTML='';
  VIEW.forEach((h,i)=>{
    const ib=h.potBB>=thr,d=document.createElement('div');
    d.className='hi'+(i===0?' act':'')+(ib?' bp':'');
    const ri=ALL.indexOf(h)+1;
    const np=h.newP.length?`<div class="hi-np">⚡ new player</div>`:'';
    d.innerHTML=`<div class="hi-n">${ib?'⭐ ':''}Hand #${ri}</div><div class="hi-m">${h.potBB>0?h.potBB+'BB · ':''}${wpPos(h)}</div>${np}`;
    d.onclick=()=>{stopPlay();loadH(i);closeSB();};
    list.appendChild(d);
  });
  document.getElementById('sbhdr').textContent=`HANDS (${VIEW.length})`;
}

// ════════════════════════════════════════════
// SIDEBAR TOGGLE
// ════════════════════════════════════════════
function toggleSB(){
  const sb=document.getElementById('sb'),ov=document.getElementById('sb-ov'),ct=document.getElementById('ct');
  const isMobile=window.innerWidth<=680;
  if(isMobile){
    const open=sb.classList.contains('open');
    sb.classList.toggle('open',!open);ov.classList.toggle('show',!open);
  }else{
    const closed=sb.classList.contains('closed');
    sb.classList.toggle('closed',!closed);ct.classList.toggle('sb-closed',!closed);
  }
}
function closeSB(){
  document.getElementById('sb').classList.remove('open');
  document.getElementById('sb-ov').classList.remove('show');
}

// ════════════════════════════════════════════
// FILE LOAD
// ════════════════════════════════════════════
document.getElementById('fi').addEventListener('change',e=>{
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();r.onload=ev=>loadData(ev.target.result);r.readAsText(f);
  e.target.value='';
});
const dz=document.getElementById('dz');
dz.addEventListener('dragover',e=>{e.preventDefault();dz.classList.add('over');});
dz.addEventListener('dragleave',()=>dz.classList.remove('over'));
dz.addEventListener('drop',e=>{e.preventDefault();dz.classList.remove('over');const f=e.dataTransfer.files[0];if(f){const r=new FileReader();r.onload=ev=>loadData(ev.target.result);r.readAsText(f);}});

function loadData(txt){
  const p=parseAll(txt);
  if(!p.length){const em=document.getElementById('err');em.style.display='block';em.textContent='No hands found. Check this is an ACR hand history .txt file.';return;}
  ALL=p;VIEW=[...p];filtOn=false;
  detectNew(ALL);
  const s=calcStats(ALL);showStats(s);
  buildSidebar();
  document.getElementById('upload').style.display='none';
  document.getElementById('app').style.display='flex';
  document.getElementById('expbtn').style.display='inline-flex';
  document.getElementById('filtbtn').style.display='inline-flex';
  loadH(0);
}

// ════════════════════════════════════════════
// UTILS
// ════════════════════════════════════════════
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function dl(name,content,mime){const b=new Blob([content],{type:mime}),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=name;a.click();URL.revokeObjectURL(u);}
function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),4000);}

// ════════════════════════════════════════════
// EXPORT — builds .md + standalone .html
// ════════════════════════════════════════════
function descMd(hand){
  const board=[...hand.board.flop,...(hand.board.turn?[hand.board.turn]:[]),...(hand.board.river?[hand.board.river]:[])].join(' ');
  const allA=[...hand.streets.preflop,...hand.streets.flop,...hand.streets.turn,...hand.streets.river];
  const hp=hand.players.find(p=>p.isHero);
  const gp=n=>{const p=hand.players.find(x=>x.name===n);return p?p.position+(p.isHero?' (Hero)':''):'?';};
  const raises=allA.filter(a=>a.type==='raises');
  const bigR=raises.length?raises.reduce((mx,a)=>a.amount>mx.amount?a:mx,raises[0]):null;
  let s=`**${hand.potBB}BB pot** · ${hand.stakes}`;
  if(board)s+=` · Board: \`${board}\``;
  if(hp?.cards)s+=` · Hero (${hp.position}): \`${hp.cards.join(' ')}\``;
  if(bigR)s+=`\n\n${gp(bigR.player)} raised to ${(bigR.amount/hand.bb).toFixed(1)}BB.`;
  if(hand.winners[0])s+=` ${gp(hand.winners[0].name)} won ${hand.potBB}BB.`;
  return s;
}

function exportPost(){
  const stats=calcStats(ALL);
  const today=new Date().toISOString().split('T')[0];
  const thr=bigThr(ALL);
  const key=[...ALL].filter(h=>h.potBB>=thr).sort((a,b)=>b.potBB-a.potBB).slice(0,6);
  const net=parseFloat(stats?.tp||'0');
  const rf=`${today}-poker-replayer.html`;

  const md=`---
layout: default
title: "Session — ${today}"
date: ${today}
parent: Session Reviews
nav_order: 1
description: "ACR 6-max ${stats?.stakes||''} · ${ALL.length} hands · ${net>=0?'+':''}${stats?.tpBB||'0'}BB"
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
| **Hands** | ${stats?.total||ALL.length} |
| **Net** | ${net>=0?'+':''}$${stats?.tp||'0'} (${net>=0?'+':''}${stats?.tpBB||'0'} BB) |
| **BB/100** | ${stats?.bb100||'0'} |
| **VPIP / PFR** | ${stats?.vpip||0}% / ${stats?.pfr||0}% |

${net>=0?`> ✅ Winning session +${stats?.tpBB}BB`:`> 🔴 Losing session ${stats?.tpBB}BB`}

---

## Key Hands

${key.length?key.map((h,i)=>`### Hand ${i+1} — ${h.potBB}BB pot\n\n${descMd(h)}\n`).join('\n'):'*No significant pots found.*'}

---

## Interactive Replayer

<div style="overflow:hidden;border-radius:8px;border:1px solid #ddd;margin:1.5rem 0;">
<iframe src="/assets/replayers/${rf}" style="width:100%;height:480px;border:none;display:block;" title="Hand Replayer"></iframe>
</div>

> 💡 Tap **⭐ Big Hands** to filter to the largest pots. All players shown by position only.

---

## Notes

- 
- 
- 
`;

  const hj=JSON.stringify(ALL.map(h=>({
    id:h.id,stakes:h.stakes,bb:h.bb,table:h.table,date:h.date,
    hero:h.hero,button:h.button,
    players:h.players.map(p=>({seat:p.seat,name:p.name,stack:p.stack,cards:p.cards,position:p.position,isHero:p.isHero})),
    streets:h.streets,board:h.board,pot:h.pot,potBB:h.potBB,winners:h.winners,newP:h.newP
  })));

  dl(`${today}-poker-session-review.md`,md,'text/markdown');
  setTimeout(()=>dl(rf,buildEmbed(hj),'text/html'),300);
  showToast(`✓ Downloaded .md + ${rf}`);
}

// ════════════════════════════════════════════
// EMBED HTML — mirrors main app logic exactly
// ════════════════════════════════════════════
function buildEmbed(hj){
return `<!DOCTYPE html><html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>Poker Replayer</title>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#06101c;--border:rgba(255,255,255,0.09);--text:#d4e0f0;--muted:#3a4e65;--muted2:#526a85;--accent:#4d8aff;--hero:#a78bfa;--green:#22d47a;--red:#f06060;--gold:#f5c542;--fd:#091f14;--fm:#102a1a;--fl:#184028;--rl:#081510}
html,body{height:100%;overflow:hidden}
body{background:var(--bg);color:var(--text);font-family:'Trebuchet MS',sans-serif;display:flex;flex-direction:column;-webkit-tap-highlight-color:transparent;user-select:none}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#1e3050;border-radius:3px}
#hdr{display:flex;align-items:center;gap:6px;padding:0 9px;height:40px;flex-shrink:0;background:rgba(6,14,26,0.99);border-bottom:1px solid var(--border);z-index:200;position:relative}
.hl{font-size:16px;flex-shrink:0}.ht{font-size:12px;font-weight:700;letter-spacing:2px;color:var(--hero);flex-shrink:0}.hsp{flex:1;min-width:2px}
.hfb{background:rgba(245,197,66,0.1);border:1px solid rgba(245,197,66,0.28);color:var(--gold);border-radius:5px;padding:4px 9px;font-size:10px;font-weight:700;cursor:pointer;font-family:inherit;touch-action:manipulation}
.hfb.on{background:rgba(245,197,66,0.22)}
.hmb{display:none;background:none;border:none;color:var(--muted2);font-size:19px;cursor:pointer;padding:3px;line-height:1;flex-shrink:0}
@media(max-width:640px){.hmb{display:flex}}
#app2{flex:1;overflow:hidden;min-height:0;position:relative;display:flex}
#sbov{display:none;position:absolute;inset:0;z-index:149;background:rgba(0,0,0,0.55)}#sbov.show{display:block}
#sb2{position:absolute;top:0;left:0;bottom:0;width:0;overflow:hidden;background:rgba(6,12,24,0.98);border-right:1px solid var(--border);display:flex;flex-direction:column;z-index:150;transition:width 0.22s ease}
#sb2.open{width:150px}
@media(min-width:641px){#sb2{width:148px}#sb2.closed{width:0}}
.shdr{padding:6px 9px;font-size:9px;font-weight:700;letter-spacing:1.5px;color:var(--muted);border-bottom:1px solid var(--border);text-transform:uppercase;flex-shrink:0}
#hl2{flex:1;overflow-y:auto}
.hi2{padding:5px 9px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.03);border-left:2px solid transparent}
.hi2.a{background:rgba(77,138,255,0.13);border-left-color:var(--accent)}.hi2.bp{border-left-color:var(--gold)!important}
.hn2{font-size:10px;font-weight:700;color:var(--muted2)}.hi2.a .hn2{color:var(--hero)}.hm2{font-size:9px;color:var(--muted);font-family:monospace}.hnp2{font-size:8px;color:var(--gold)}
#ct2{position:absolute;top:0;right:0;bottom:0;left:0;display:flex;flex-direction:column;transition:left 0.22s ease}
@media(min-width:641px){#ct2{left:148px}#ct2.sbc{left:0}}
#ib2{padding:0 9px;height:25px;flex-shrink:0;display:flex;align-items:center;gap:6px;background:rgba(6,12,24,0.96);border-bottom:1px solid var(--border);font-size:9px;font-family:monospace;overflow:hidden}
.ibp2{background:rgba(77,138,255,0.1);border:1px solid rgba(77,138,255,0.2);border-radius:10px;padding:1px 6px;color:var(--accent);white-space:nowrap;flex-shrink:0}
.ibs2{color:var(--muted2);white-space:nowrap;flex-shrink:0}
.ibe2{margin-left:auto;font-size:10px;color:var(--gold);font-weight:700;font-family:'Trebuchet MS',sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:52%}
#ta2{flex:1;position:relative;overflow:hidden}
#flt2{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:min(90%,500px);height:min(72%,295px);min-width:235px;min-height:158px;border-radius:50%;background:radial-gradient(ellipse at 40% 38%,var(--fl),var(--fm) 55%,var(--fd));border:5px solid var(--rl);box-shadow:0 0 0 3px rgba(255,255,255,0.04),0 0 0 8px #040c10,0 0 60px rgba(0,0,0,0.85),inset 0 0 38px rgba(0,0,0,0.45)}
#brd2{position:absolute;top:50%;left:50%;transform:translate(-50%,-52%);display:flex;gap:5px;align-items:center;z-index:10}
#pot2{position:absolute;top:50%;left:50%;transform:translate(-50%,-200%);font-size:10px;font-weight:700;color:var(--gold);background:rgba(0,0,0,0.65);padding:2px 9px;border-radius:20px;z-index:11;display:none;font-family:monospace;white-space:nowrap;pointer-events:none}
#stl2{position:absolute;top:50%;left:50%;transform:translate(-50%,-285%);font-size:9px;font-weight:700;letter-spacing:3px;color:rgba(255,255,255,0.15);text-transform:uppercase;pointer-events:none;z-index:9}
#pw2{position:absolute;inset:0;z-index:20;pointer-events:none}
#bw2{position:absolute;inset:0;z-index:16;pointer-events:none}
.atst{display:none}
.al4{border-radius:7px;padding:3px 8px;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;white-space:nowrap;margin-top:1px;border:1px solid rgba(255,255,255,0.1)}
.al4.af{background:#1e2530;color:#6a8090;border-color:#2a3540}
.al4.ac{background:#0e1e3a;color:#5080d0;border-color:#1a2e5a}
.al4.ak{background:#0a2a15;color:#30b860;border-color:#155530}
.al4.ab{background:#2a1a04;color:#e09020;border-color:#5a3a08}
.al4.ar{background:#2a0808;color:#e03030;border-color:#5a1010}
.al4.aw{background:#180830;color:#a060f0;border-color:#3a1060}
.bch{position:absolute;transform:translate(-50%,-50%);background:rgba(0,0,0,0.7);border:1px solid rgba(245,197,66,0.5);border-radius:5px;padding:2px 5px;font-size:9px;font-family:monospace;font-weight:600;color:var(--gold);white-space:nowrap;pointer-events:none;animation:cIn 0.15s ease}
@keyframes cIn{from{transform:translate(-50%,-50%) scale(0.4);opacity:0}to{transform:translate(-50%,-50%) scale(1);opacity:1}}
.pb4{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:2px}
.pc4{display:flex;gap:2px;margin-bottom:2px}
.ch4{background:rgba(6,12,26,0.92);border:1px solid rgba(255,255,255,0.11);border-radius:7px;padding:3px 6px;display:flex;flex-direction:column;align-items:center;min-width:54px;transition:all 0.2s}
.ch4.hero{border-color:rgba(167,139,250,0.55);background:rgba(25,10,55,0.9)}
.ch4.act{border-color:var(--gold)!important;box-shadow:0 0 0 3px rgba(245,197,66,0.4),0 0 20px rgba(245,197,66,0.35);background:rgba(40,28,4,0.95)!important}
.ch4.fld{opacity:0.3}
.pp4{font-size:9px;font-weight:700;color:var(--text);white-space:nowrap}.pp4.h{color:var(--hero)}
.ps4{font-size:8px;color:var(--muted2);font-family:monospace}
.db4{position:absolute;top:-7px;right:-7px;width:14px;height:14px;border-radius:50%;background:var(--gold);color:#1a0800;font-size:7px;font-weight:900;display:flex;align-items:center;justify-content:center;border:1px solid #d4a800;z-index:30}
.nb4{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:rgba(245,197,66,0.15);border:1px solid rgba(245,197,66,0.4);border-radius:4px;padding:1px 4px;font-size:7px;font-weight:700;color:var(--gold);white-space:nowrap}
.ta4{font-size:9px;color:var(--gold);animation:bb 0.5s ease infinite alternate;margin-top:1px}
@keyframes bb{from{opacity:0.6}to{opacity:1}}
.c4{border-radius:5px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 2px 6px rgba(0,0,0,0.7)}
.c4.sm{width:25px;height:35px}.c4.md{width:36px;height:50px}
.c4.bk{background:#1a2a40;border:1.5px solid #2a3d5a}
.c4.cs{background:#1a2b45;border:1.5px solid #4a6fa0}.c4.ch{background:#4a1010;border:1.5px solid #a03030}
.c4.cd{background:#0d3535;border:1.5px solid #2a8080}.c4.cc{background:#0d3a18;border:1.5px solid #2a8040}
.cr4{font-family:monospace;font-weight:600;line-height:1;letter-spacing:-0.5px}
.c4.sm .cr4{font-size:13px}.c4.md .cr4{font-size:18px}
.c4.cs .cr4{color:#a8ccf0}.c4.ch .cr4{color:#ff8080}.c4.cd .cr4{color:#40d0d0}.c4.cc .cr4{color:#40c860}
#ctrl2{padding:7px 9px 9px;flex-shrink:0;background:rgba(5,10,20,0.99);border-top:1px solid var(--border);display:flex;flex-direction:column;gap:5px}
#sr2{display:flex;align-items:center;gap:7px}#fl2{font-size:9px;color:var(--muted);font-family:monospace;min-width:36px}
#sc2{flex:1;accent-color:var(--accent);cursor:pointer;height:4px}
#br2{display:flex;gap:4px;align-items:center;justify-content:center;flex-wrap:wrap}
.cb2{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.09);border-radius:5px;width:34px;height:30px;color:#5878a0;font-size:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;touch-action:manipulation}
.cb2:disabled{color:#1e2e40;cursor:not-allowed;opacity:0.4}.cb2:active:not(:disabled){opacity:0.6}
#pb2{background:linear-gradient(135deg,#2a48aa,#5030a8);border:none;border-radius:7px;width:42px;height:30px;color:#fff;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;touch-action:manipulation}
#pb2.stop{background:linear-gradient(135deg,#8a1212,#c01818)}#pb2:active{opacity:0.7}
.sp2{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:3px 8px;color:var(--muted2);font-size:10px;font-weight:700;cursor:pointer;font-family:monospace;touch-action:manipulation}
.sp2.on{background:rgba(77,138,255,0.2);border-color:var(--accent);color:var(--accent)}
.dv2{width:1px;height:19px;background:rgba(255,255,255,0.07);margin:0 2px}
</style></head><body>
<div id="hdr">
  <button class="hmb" id="mb2" onclick="tSb2()">☰</button>
  <span class="hl">♠</span><span class="ht">REPLAYER</span>
  <div class="hsp"></div>
  <button class="hfb" id="fb2" onclick="tFlt2()">⭐ Big Hands</button>
</div>
<div id="app2">
  <div id="sbov" onclick="cSb2()"></div>
  <div id="sb2">
    <div class="shdr">HANDS (<span id="hcnt2">0</span>)</div>
    <div id="hl2"></div>
  </div>
  <div id="ct2">
    <div id="ib2"><span class="ibp2" id="ibn2">—</span><span class="ibs2" id="ibs2x">—</span><span class="ibe2" id="ibe2x">—</span></div>
    <div id="ta2">
      <div id="flt2"></div><div id="stl2"></div><div id="brd2"></div><div id="pot2"></div>
      <div id="bw2"></div><div id="pw2"></div>
    </div>
    <div id="ctrl2">
      <div id="sr2"><span id="fl2">0/0</span><input type="range" id="sc2" min="0" max="0" value="0"></div>
      <div id="br2">
        <button class="cb2" id="bph2" onclick="pH2()" disabled>⏮</button>
        <button class="cb2" onclick="sB2()">◀</button>
        <button id="pb2" onclick="tP2()">▶</button>
        <button class="cb2" onclick="sF2()">▶</button>
        <button class="cb2" id="bnh2" onclick="nH2()">⏭</button>
        <div class="dv2"></div>
        <button class="sp2 on" data-ms="2200" onclick="sSp2(this)">1×</button>
        <button class="sp2" data-ms="1300" onclick="sSp2(this)">1.5×</button>
        <button class="sp2" data-ms="650" onclick="sSp2(this)">3×</button>
      </div>
    </div>
  </div>
</div>
<script>
const HH2=${hj};
const SC4={s:'cs',h:'ch',d:'cd',c:'cc'};
const S6=[{t:0.90,l:0.50},{t:0.74,l:0.18},{t:0.40,l:0.04},{t:0.08,l:0.18},{t:0.08,l:0.72},{t:0.40,l:0.88}];
const S5=[{t:0.90,l:0.50},{t:0.76,l:0.16},{t:0.10,l:0.16},{t:0.10,l:0.74},{t:0.76,l:0.74}];
const S4=[{t:0.90,l:0.50},{t:0.42,l:0.04},{t:0.08,l:0.42},{t:0.42,l:0.88}];
const B6=[{t:0.70,l:0.50},{t:0.64,l:0.32},{t:0.48,l:0.22},{t:0.30,l:0.32},{t:0.30,l:0.60},{t:0.48,l:0.70}];
const B5=[{t:0.70,l:0.50},{t:0.62,l:0.30},{t:0.28,l:0.30},{t:0.28,l:0.65},{t:0.62,l:0.65}];
const B4=[{t:0.70,l:0.50},{t:0.50,l:0.24},{t:0.26,l:0.46},{t:0.50,l:0.68}];
function gSl(n){return n<=4?S4:n===5?S5:S6;}
function gBl(n){return n<=4?B4:n===5?B5:B6;}
let AH2=HH2,VH2=[...HH2],hi2=0,fi2=0,fr2=[],pl2=false,sp2=2200,iv2=null,fa2=false;
function cH4(s,sz,fd){if(fd||!s)return\`<div class="c4 \${sz} bk"></div>\`;const r=s.slice(0,-1).toUpperCase(),su=s.slice(-1).toLowerCase();return\`<div class="c4 \${sz} \${SC4[su]||'cs'}"><span class="cr4">\${r}</span></div>\`;}
function gSM4(h){const po=['BTN','SB','BB','UTG','HJ','CO'],hp=h.players.find(p=>p.isHero)?.position,hi4=po.indexOf(hp);const m={};if(hi4<0){h.players.forEach((p,i)=>m[p.position]=i);return m;}let s=0;for(let i=0;i<po.length;i++){const pos=po[(hi4+i)%po.length];if(h.players.find(p=>p.position===pos)){m[pos]=s++;}}return m;}
function bF4(h){const f=[{t:'deal'}];h.streets.preflop.forEach(a=>f.push({t:'action',s:'preflop',a}));if(h.board.flop.length){f.push({t:'board',s:'flop',c:h.board.flop});h.streets.flop.forEach(a=>f.push({t:'action',s:'flop',a}));}if(h.board.turn){f.push({t:'board',s:'turn',c2:h.board.turn});h.streets.turn.forEach(a=>f.push({t:'action',s:'turn',a}));}if(h.board.river){f.push({t:'board',s:'river',c2:h.board.river});h.streets.river.forEach(a=>f.push({t:'action',s:'river',a}));}f.push({t:'result'});return f;}
function gVS4(){let fl=[],tu=null,rv=null,cs='preflop';const ac={},bts={};const fd=new Set();for(let i=0;i<=fi2;i++){const f=fr2[i];if(!f)continue;if(f.t==='deal'){Object.keys(ac).forEach(k=>delete ac[k]);Object.keys(bts).forEach(k=>delete bts[k]);fd.clear();}else if(f.t==='board'){Object.keys(bts).forEach(k=>delete bts[k]);Object.keys(ac).forEach(k=>delete ac[k]);if(f.s==='flop'){fl=f.c;cs='flop';}if(f.s==='turn'){tu=f.c2;cs='turn';}if(f.s==='river'){rv=f.c2;cs='river';}}else if(f.t==='action'){const a=f.a;ac[a.player]=a;if(a.type==='folds'){fd.add(a.player);delete bts[a.player];}else if(['bets','raises','calls'].includes(a.type)&&a.amount>0)bts[a.player]=a.amount;else if(a.type==='checks')delete bts[a.player];}}return{fl,tu,rv,cs,ac,bts,fd,act:fr2[fi2]?.t==='action'?fr2[fi2].a.player:null,f:fr2[fi2]};}
function gPN4(h,n){const p=h.players.find(x=>x.name===n);return p?p.position+(p.isHero?' (You)':''):'?';}
function gAC4(t){return t==='folds'?'af':t==='checks'?'ac':t==='calls'?'ak':t==='bets'?'ab':t==='raises'?'ar':t==='wins'||t==='collects'?'aw':'ac';}
function ren4(){const h=VH2[hi2];if(!h)return;const st=gVS4(),n=h.players.length,slots=gSl(n),bslots=gBl(n),sm=gSM4(h),bc=[...st.fl,...(st.tu?[st.tu]:[]),...(st.rv?[st.rv]:[])];
document.getElementById('brd2').innerHTML=bc.map(c=>cH4(c,'md',false)).join('');
const pd=document.getElementById('pot2');if(bc.length&&h.pot>0){pd.style.display='block';pd.textContent='Pot: '+(h.pot/h.bb).toFixed(1)+'BB';}else pd.style.display='none';
document.getElementById('stl2').textContent=st.cs!=='preflop'?st.cs.toUpperCase():'';
const bw=document.getElementById('bw2');bw.innerHTML='';Object.entries(st.bts).forEach(([pn,amt])=>{const p=h.players.find(x=>x.name===pn);if(!p)return;const sl=sm[p.position]??0,bp=bslots[sl]||bslots[0],d=document.createElement('div');d.className='bch';d.style.top=(bp.t*100)+'%';d.style.left=(bp.l*100)+'%';d.textContent=(amt/h.bb).toFixed(1)+'BB';bw.appendChild(d);});
const pw=document.getElementById('pw2');pw.innerHTML='';
h.players.forEach(p=>{const sl=sm[p.position]??0,pos=slots[sl]||slots[0],ia=st.act===p.name,ih=p.isHero,ib=p.seat===h.button,hf=st.fd.has(p.name),isN=h.newP&&h.newP.includes(p.name),stBB=(p.stack/h.bb).toFixed(0),dn=p.position+(ih?' (You)':''),la=st.ac[p.name];
let html='';
if(ib)html+=\`<div class="db4">D</div>\`;
if(isN)html+=\`<div class="nb4">NEW</div>\`;
if(p.cards)html+=\`<div class="pc4">\${p.cards.map(c=>cH4(c,'sm',false)).join('')}</div>\`;
else if(!hf)html+=\`<div class="pc4">\${cH4(null,'sm',true)}\${cH4(null,'sm',true)}</div>\`;
html+=\`<div class="ch4\${ih?' hero':''}\${ia?' act':''}\${hf?' fld':''}"><span class="pp4\${ih?' h':''}">\${dn}</span><span class="ps4">\${stBB}BB</span></div>\`;
if(la){const ba=la.amount>0?' '+(la.amount/h.bb).toFixed(1)+'BB':'';html+=\`<div class="al4 \${gAC4(la.type)}">\${la.type.toUpperCase()}\${ba}</div>\`;}
if(ia)html+=\`<div class="ta4">▼ ACTING</div>\`;
const d=document.createElement('div');d.className='pb4';d.style.cssText=\`position:absolute;top:\${pos.t*100}%;left:\${pos.l*100}%;transform:translate(-50%,-50%)\`;d.innerHTML=html;pw.appendChild(d);});
document.getElementById('ibn2').textContent='Hand #'+(hi2+1)+'/'+VH2.length;
document.getElementById('ibs2x').textContent=h.stakes+(h.potBB>0?' · '+h.potBB+'BB pot':'');
const f2=st.f;let lb='';if(f2){if(f2.t==='deal')lb='🃏 Cards Dealt';else if(f2.t==='board')lb='🎴 '+(f2.s.charAt(0).toUpperCase()+f2.s.slice(1))+': '+(f2.c||[f2.c2]).join(' ');else if(f2.t==='action'){const a=f2.a,ba=a.amount>0?' '+(a.amount/h.bb).toFixed(1)+'BB':'';lb=gPN4(h,a.player)+' '+a.type+ba;}else if(f2.t==='result')lb=h.winners.length?'🏆 '+h.winners.map(w=>gPN4(h,w.name)+' wins '+(w.amount/h.bb).toFixed(1)+'BB').join(', '):'🏁 Complete';}
document.getElementById('ibe2x').textContent=lb;
document.getElementById('fl2').textContent=(fi2+1)+'/'+fr2.length;document.getElementById('sc2').value=fi2;document.querySelectorAll('.hi2').forEach((e,i)=>{e.classList.toggle('a',i===hi2);if(i===hi2)e.scrollIntoView({block:'nearest'});});document.getElementById('bph2').disabled=hi2===0;document.getElementById('bnh2').disabled=hi2===VH2.length-1;}
function lH4(i){hi2=Math.max(0,Math.min(VH2.length-1,i));fr2=bF4(VH2[hi2]);fi2=0;clrAll();document.getElementById('sc2').max=Math.max(0,fr2.length-1);ren4();}
function gF4(i){fi2=Math.max(0,Math.min(fr2.length-1,i));ren4();}
function pH2(){sP4();lH4(hi2-1);}function nH2(){sP4();lH4(hi2+1);}
function sB2(){sP4();gF4(fi2-1);}function sF2(){sP4();gF4(fi2+1);}
function tP2(){pl2?sP4():stPl4();}
function stPl4(){if(pl2)return;pl2=true;document.getElementById('pb2').textContent='⏸';document.getElementById('pb2').classList.add('stop');iv2=setInterval(()=>{if(fi2>=fr2.length-1){hi2<VH2.length-1?lH4(hi2+1):sP4();}else gF4(fi2+1);},sp2);}
function sP4(){pl2=false;clearInterval(iv2);document.getElementById('pb2').textContent='▶';document.getElementById('pb2').classList.remove('stop');}
function sSp2(b){sp2=parseInt(b.dataset.ms);document.querySelectorAll('.sp2').forEach(x=>x.classList.toggle('on',x===b));if(pl2){sP4();stPl4();}}
document.getElementById('sc2').addEventListener('input',e=>{sP4();gF4(parseInt(e.target.value));});
function gBT2(h){const p=h.filter(x=>x.pot>0).map(x=>x.potBB).sort((a,b)=>b-a);return p[Math.ceil(p.length*0.2)-1]||0;}
function tFlt2(){fa2=!fa2;document.getElementById('fb2').classList.toggle('on',fa2);VH2=fa2?AH2.filter(h=>h.potBB>=gBT2(AH2)):[...AH2];bSb4();lH4(0);}
function wP4(h){const w=h.winners[0];if(!w)return'?';const p=h.players.find(x=>x.name===w.name);return p?p.position+(p.isHero?'★':''):'?';}
function bSb4(){const thr=gBT2(AH2),list=document.getElementById('hl2');list.innerHTML='';VH2.forEach((h,i)=>{const ib=h.potBB>=thr,d=document.createElement('div');d.className='hi2'+(i===0?' a':'')+(ib?' bp':'');const ri=AH2.indexOf(h)+1,np=h.newP&&h.newP.length?\`<div class="hnp2">⚡ new</div>\`:'';d.innerHTML=\`<div class="hn2">\${ib?'⭐ ':''}Hand #\${ri}</div><div class="hm2">\${h.potBB>0?h.potBB+'BB · ':''}\${wP4(h)}</div>\${np}\`;d.onclick=()=>{sP4();lH4(i);cSb2();};list.appendChild(d);});document.getElementById('hcnt2').textContent=VH2.length;}
function tSb2(){const s=document.getElementById('sb2'),o=document.getElementById('sbov'),c=document.getElementById('ct2');if(window.innerWidth<=640){const op=s.classList.contains('open');s.classList.toggle('open',!op);o.classList.toggle('show',!op);}else{const cl=s.classList.contains('closed');s.classList.toggle('closed',!cl);c.classList.toggle('sbc',!cl);}}
function cSb2(){document.getElementById('sb2').classList.remove('open');document.getElementById('sbov').classList.remove('show');}
bSb4();lH4(0);
<\/script></body></html>`;
}
</script>
</body>
</html>
