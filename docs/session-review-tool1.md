---
layout: none
title: Session Review Tool
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

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #07101f;
  --surface: #0c1829;
  --surface2: #112035;
  --border: rgba(255,255,255,0.08);
  --text: #d8e4f0;
  --muted: #3d5068;
  --muted2: #5a7090;
  --accent: #4d8aff;
  --hero: #a78bfa;
  --green: #22d47a;
  --red: #f06060;
  --gold: #f5c542;
  --felt-dark: #0b2318;
  --felt-mid: #133320;
  --felt-light: #1a4229;
  --rail: #0a1c10;
  /* suits */
  --spade: #c8d8f0;
  --heart: #f06060;
  --diamond: #3dcfcf;
  --club: #5dd47a;
}

html, body { height: 100%; overflow: hidden; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Rajdhani', 'Trebuchet MS', sans-serif;
  display: flex; flex-direction: column;
  -webkit-tap-highlight-color: transparent;
}

/* ── SCROLLBARS ── */
::-webkit-scrollbar { width: 3px; height: 3px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #1e3050; border-radius: 3px; }

/* ── HEADER ── */
#header {
  display: flex; align-items: center; gap: 8px;
  padding: 0 12px; height: 44px; flex-shrink: 0;
  background: rgba(7,14,28,0.98);
  border-bottom: 1px solid var(--border);
  position: relative; z-index: 100;
}
.logo { font-size: 20px; }
.site-title { font-size: 13px; font-weight: 700; letter-spacing: 2px; color: var(--hero); }
.site-sub { font-size: 10px; color: var(--muted); letter-spacing: 1px; display: none; }
@media(min-width:600px){ .site-sub { display: inline; } }

#stakes-badge {
  background: rgba(77,138,255,0.12);
  border: 1px solid rgba(77,138,255,0.25);
  border-radius: 20px; padding: 2px 9px;
  font-size: 10px; font-family: 'IBM Plex Mono', monospace;
  color: var(--accent); display: none; letter-spacing: 0.5px;
}
#profit-badge {
  font-size: 11px; font-family: 'IBM Plex Mono', monospace;
  font-weight: 600; display: none;
  padding: 2px 9px; border-radius: 20px;
}
.profit-pos { background: rgba(34,212,122,0.1); border: 1px solid rgba(34,212,122,0.25); color: var(--green); }
.profit-neg { background: rgba(240,96,96,0.1); border: 1px solid rgba(240,96,96,0.25); color: var(--red); }

.hdr-spacer { flex: 1; }

.btn {
  border: none; border-radius: 6px; cursor: pointer;
  font-family: 'Rajdhani', sans-serif; font-weight: 700;
  letter-spacing: 0.5px; transition: all 0.15s;
  display: inline-flex; align-items: center; gap: 5px;
  white-space: nowrap;
}
.btn:active { transform: scale(0.96); }
.btn-load { background: linear-gradient(135deg,#2d4db0,#5535b0); color:#fff; padding:6px 11px; font-size:11px; }
.btn-export { background: linear-gradient(135deg,#0a6e5e,#0b9680); color:#fff; padding:6px 11px; font-size:11px; display:none; }
.btn-filter { 
  background: rgba(245,197,66,0.12); border: 1px solid rgba(245,197,66,0.3);
  color: var(--gold); padding: 5px 10px; font-size: 10px; display:none;
  border-radius: 5px;
}
.btn-filter.active { background: rgba(245,197,66,0.25); border-color: var(--gold); }

/* ── MAIN LAYOUT ── */
#main { display: flex; flex: 1; overflow: hidden; min-height: 0; }

/* ── SIDEBAR ── */
#sidebar {
  width: 160px; background: rgba(7,13,25,0.97);
  border-right: 1px solid var(--border);
  display: flex; flex-direction: column; overflow: hidden; flex-shrink: 0;
  transition: width 0.25s;
}
@media(max-width:700px){
  #sidebar { width: 0; border: none; position: absolute; z-index: 50; height: 100%; top: 44px; }
  #sidebar.open { width: 160px; border-right: 1px solid var(--border); box-shadow: 4px 0 20px rgba(0,0,0,0.6); }
}
.sb-hdr {
  padding: 7px 10px; font-size: 9px; font-weight: 700;
  letter-spacing: 1.5px; color: var(--muted); text-transform: uppercase;
  border-bottom: 1px solid var(--border); flex-shrink: 0;
  display: flex; align-items: center; justify-content: space-between;
}

#stats-panel { padding: 8px 10px; border-bottom: 1px solid var(--border); display: none; flex-shrink: 0; }
.stat-row { display: flex; justify-content: space-between; margin-bottom: 3px; font-size: 10px; }
.stat-k { color: var(--muted2); }
.stat-v { font-family: 'IBM Plex Mono', monospace; font-size: 9px; font-weight: 600; color: var(--text); }
.stat-v.pos { color: var(--green); }
.stat-v.neg { color: var(--red); }

#handlist { flex: 1; overflow-y: auto; }
.hand-item {
  padding: 6px 10px; cursor: pointer;
  border-bottom: 1px solid rgba(255,255,255,0.03);
  border-left: 2px solid transparent; transition: all 0.1s;
}
.hand-item:hover { background: rgba(77,138,255,0.07); }
.hand-item.active { background: rgba(77,138,255,0.13); border-left-color: var(--accent); }
.hand-item.big-pot { border-left-color: var(--gold) !important; }
.hand-item .hi-num { font-size: 10px; font-weight: 700; color: var(--muted2); }
.hand-item.active .hi-num { color: var(--hero); }
.hand-item .hi-meta { font-size: 9px; color: var(--muted); font-family: 'IBM Plex Mono', monospace; }
.hand-item .hi-win { font-size: 9px; color: var(--green); }
.hand-item .hi-new-player { font-size: 8px; color: var(--gold); }

/* ── CENTER ── */
#center { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }

/* ── INFO BAR ── */
#infobar {
  padding: 0 12px; height: 28px; flex-shrink: 0;
  display: flex; align-items: center; gap: 8px;
  background: rgba(7,13,25,0.95); border-bottom: 1px solid var(--border);
  font-size: 9px; font-family: 'IBM Plex Mono', monospace; overflow: hidden;
}
.ib-pill {
  background: rgba(77,138,255,0.1); border: 1px solid rgba(77,138,255,0.2);
  border-radius: 10px; padding: 1px 7px; color: var(--accent);
  font-size: 9px; white-space: nowrap;
}
#ib-event { margin-left: auto; font-size: 10px; color: var(--gold); font-weight: 600; font-family: 'Rajdhani',sans-serif; white-space: nowrap; }

/* ── MOBILE SIDEBAR TOGGLE ── */
#menu-btn {
  display: none; background: none; border: none; color: var(--muted2);
  font-size: 18px; cursor: pointer; padding: 4px; line-height: 1;
}
@media(max-width:700px){ #menu-btn { display: flex; } }

/* ── TABLE ── */
#table-area { flex: 1; position: relative; overflow: hidden; }

#felt-outer {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: min(88%, 560px); height: min(76%, 340px);
  min-width: 260px; min-height: 180px;
  border-radius: 50%;
  background: radial-gradient(ellipse at 40% 38%, var(--felt-light), var(--felt-mid) 50%, var(--felt-dark));
  border: 6px solid var(--rail);
  box-shadow:
    0 0 0 2px rgba(255,255,255,0.04),
    0 0 0 8px #050d12,
    0 0 60px rgba(0,0,0,0.8),
    inset 0 0 40px rgba(0,0,0,0.4);
}

#board-wrap {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -54%);
  display: flex; gap: 5px; align-items: center; z-index: 10;
}

#pot-display {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -220%);
  font-size: 11px; font-weight: 700; color: var(--gold);
  background: rgba(0,0,0,0.6); padding: 2px 10px;
  border-radius: 20px; z-index: 11; display: none;
  font-family: 'IBM Plex Mono', monospace; white-space: nowrap;
  letter-spacing: 0.5px;
}

#street-label {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -300%);
  font-size: 10px; font-weight: 700; letter-spacing: 2px;
  color: rgba(255,255,255,0.2); text-transform: uppercase;
  pointer-events: none; z-index: 9;
}

#players-wrap { position: absolute; inset: 0; z-index: 20; pointer-events: none; }

/* ── BET DISPLAY LAYER ── */
#bets-wrap { position: absolute; inset: 0; z-index: 15; pointer-events: none; }
.bet-chip {
  position: absolute; transform: translate(-50%, -50%);
  background: rgba(245,197,66,0.15); border: 1px solid rgba(245,197,66,0.5);
  border-radius: 6px; padding: 2px 6px;
  font-size: 9px; font-family: 'IBM Plex Mono', monospace;
  font-weight: 600; color: var(--gold); white-space: nowrap;
  animation: chipIn 0.2s ease;
}
@keyframes chipIn { from { transform: translate(-50%,-50%) scale(0.5); opacity:0; } to { transform: translate(-50%,-50%) scale(1); opacity:1; } }

/* ── PLAYER BOXES ── */
.player-box {
  position: absolute; transform: translate(-50%, -50%);
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  transition: all 0.2s ease;
}
.player-cards { display: flex; gap: 2px; margin-bottom: 1px; }

.p-chip {
  background: rgba(8,15,30,0.9); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 7px; padding: 3px 7px;
  display: flex; flex-direction: column; align-items: center;
  min-width: 60px; transition: all 0.2s;
}
.p-chip.is-hero { border-color: rgba(167,139,250,0.5); background: rgba(30,15,60,0.85); }
.p-chip.is-active {
  border-color: var(--gold) !important;
  box-shadow: 0 0 0 1px rgba(245,197,66,0.3), 0 0 16px rgba(245,197,66,0.25);
  background: rgba(40,30,5,0.9) !important;
  animation: activePulse 1s ease infinite;
}
@keyframes activePulse {
  0%,100% { box-shadow: 0 0 0 1px rgba(245,197,66,0.3), 0 0 12px rgba(245,197,66,0.2); }
  50%      { box-shadow: 0 0 0 2px rgba(245,197,66,0.5), 0 0 22px rgba(245,197,66,0.4); }
}
.p-chip.folded { opacity: 0.4; }
.p-chip.left-table { border-color: rgba(255,255,255,0.07); opacity: 0.35; }

.p-pos { font-size: 10px; font-weight: 700; color: var(--text); white-space: nowrap; }
.p-pos.hero-pos { color: var(--hero); }
.p-stack { font-size: 8px; color: var(--muted2); font-family: 'IBM Plex Mono', monospace; }

.dealer-btn {
  position: absolute; top: -7px; right: -7px;
  width: 15px; height: 15px; border-radius: 50%;
  background: var(--gold); color: #1a0800;
  font-size: 7px; font-weight: 900;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid #e0a800; z-index: 25;
}

.action-badge {
  border-radius: 10px; padding: 2px 7px;
  font-size: 8px; font-weight: 700; color: #fff;
  text-transform: uppercase; letter-spacing: 0.5px;
  white-space: nowrap;
  animation: badgePop 0.2s ease;
}
@keyframes badgePop { from { transform: scale(0.6); opacity:0; } to { transform: scale(1); opacity:1; } }

.new-player-badge {
  position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
  background: rgba(245,197,66,0.2); border: 1px solid rgba(245,197,66,0.5);
  border-radius: 4px; padding: 1px 5px;
  font-size: 7px; font-weight: 700; color: var(--gold);
  white-space: nowrap; letter-spacing: 0.5px;
}

/* ── ACTIVE TURN INDICATOR ── */
.turn-arrow {
  position: absolute; bottom: -14px; left: 50%; transform: translateX(-50%);
  font-size: 10px; animation: bounce 0.6s ease infinite alternate;
  color: var(--gold);
}
@keyframes bounce { from { transform: translateX(-50%) translateY(0); } to { transform: translateX(-50%) translateY(-3px); } }

/* ── CARDS ── */
.card {
  border-radius: 4px; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; position: relative; overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.6);
}
.card.sm { width: 26px; height: 36px; }
.card.md { width: 38px; height: 52px; }
.card.back {
  background: linear-gradient(145deg, #1a3565, #0d1f3e);
  border: 1px solid #243a5f;
}
.card.back::after {
  content: ''; position: absolute; inset: 2px;
  border: 1px solid rgba(255,255,255,0.06); border-radius: 2px;
}
.card.face { border: none; }
/* Suit backgrounds */
.card.suit-s { background: #0a1420; border: 1px solid #1e3050; }
.card.suit-h { background: #200a0a; border: 1px solid #501010; }
.card.suit-d { background: #081818; border: 1px solid #104040; }
.card.suit-c { background: #081408; border: 1px solid #124020; }

.card-rank {
  font-family: 'IBM Plex Mono', monospace; font-weight: 600;
  line-height: 1; letter-spacing: -1px;
  text-shadow: 0 0 8px currentColor;
}
.card.sm .card-rank { font-size: 13px; }
.card.md .card-rank { font-size: 18px; }
.suit-s .card-rank { color: var(--spade); }
.suit-h .card-rank { color: var(--heart); }
.suit-d .card-rank { color: var(--diamond); }
.suit-c .card-rank { color: var(--club); }

/* ── CONTROLS ── */
#controls {
  padding: 8px 12px 10px; flex-shrink: 0;
  background: rgba(6,11,22,0.98); border-top: 1px solid var(--border);
  display: flex; flex-direction: column; gap: 7px;
}
#scrub-row { display: flex; align-items: center; gap: 8px; }
#frame-lbl { font-size: 9px; color: var(--muted); font-family: 'IBM Plex Mono', monospace; min-width: 44px; }
#scrubber { flex: 1; accent-color: var(--accent); cursor: pointer; height: 4px; }
#btn-row { display: flex; gap: 5px; align-items: center; justify-content: center; flex-wrap: wrap; }

.ctrl-btn {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09);
  border-radius: 5px; width: 36px; height: 32px;
  color: #6080a0; font-size: 13px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.12s; touch-action: manipulation;
}
.ctrl-btn:hover:not(:disabled) { background: rgba(255,255,255,0.1); color: var(--text); }
.ctrl-btn:disabled { color: #1e2e40; cursor: not-allowed; }
.ctrl-btn:active:not(:disabled) { transform: scale(0.93); }

#play-btn {
  background: linear-gradient(135deg, #2d4db0, #5535b0);
  border: none; border-radius: 7px; width: 44px; height: 32px;
  color: #fff; font-size: 15px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.12s; touch-action: manipulation;
}
#play-btn.stop { background: linear-gradient(135deg, #8b1515, #c02020); }
#play-btn:active { transform: scale(0.93); }

.speed-btn {
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 4px; padding: 4px 9px;
  color: var(--muted2); font-size: 10px; font-weight: 700;
  cursor: pointer; font-family: 'IBM Plex Mono', monospace;
  transition: all 0.12s; touch-action: manipulation;
}
.speed-btn.on { background: rgba(77,138,255,0.2); border-color: var(--accent); color: var(--accent); }
.speed-btn:active { transform: scale(0.93); }

.ctrl-divider { width: 1px; height: 20px; background: rgba(255,255,255,0.07); margin: 0 3px; }

/* ── LOG PANEL ── */
#log-panel {
  width: 165px; background: rgba(7,13,25,0.97);
  border-left: 1px solid var(--border);
  display: flex; flex-direction: column; overflow: hidden; flex-shrink: 0;
}
@media(max-width:800px){ #log-panel { display: none; } }
#log-list { flex: 1; overflow-y: auto; padding: 4px 0; }
.log-entry { padding: 2px 9px; font-size: 9px; color: var(--muted2); font-family: 'IBM Plex Mono', monospace; }
.log-entry.log-street { color: var(--accent); font-weight: 600; letter-spacing: 1px; }
.log-entry.log-raise { color: var(--red); }
.log-entry.log-call { color: var(--green); }
.log-entry.log-bet { color: var(--gold); }
.log-hint { padding: 8px 10px; border-top: 1px solid var(--border); font-size: 9px; color: var(--muted); line-height: 1.5; }

/* ── UPLOAD SCREEN ── */
#upload-screen {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 20px; padding: 24px;
}
#drop-zone {
  width: min(340px, 100%); padding: 36px 28px;
  border-radius: 14px; border: 2px dashed rgba(77,138,255,0.3);
  background: rgba(77,138,255,0.04);
  display: flex; flex-direction: column; align-items: center;
  gap: 14px; cursor: pointer; transition: all 0.2s;
  animation: breathe 3s ease-in-out infinite;
}
#drop-zone:hover, #drop-zone.drag-over {
  border-color: rgba(77,138,255,0.65); background: rgba(77,138,255,0.1);
}
.dz-icon { font-size: 48px; }
.dz-title { font-size: 16px; font-weight: 700; color: var(--hero); letter-spacing: 0.5px; text-align: center; }
.dz-sub { font-size: 12px; color: var(--muted2); text-align: center; line-height: 1.7; }
#error-msg { color: var(--red); font-size: 12px; max-width: 320px; text-align: center; display: none; }
.upload-hint { font-size: 11px; color: var(--muted); text-align: center; max-width: 360px; line-height: 1.7; }

@keyframes breathe {
  0%,100% { box-shadow: 0 0 20px rgba(77,138,255,0.12); }
  50%      { box-shadow: 0 0 40px rgba(77,138,255,0.28); }
}

/* ── TOAST ── */
#toast {
  position: fixed; bottom: 20px; right: 20px; left: 20px; max-width: 400px; margin: auto;
  background: #0a7060; color: #fff; padding: 10px 16px;
  border-radius: 8px; font-size: 12px; font-weight: 700;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  transform: translateY(70px); opacity: 0;
  transition: all 0.3s ease; z-index: 999;
}
#toast.show { transform: translateY(0); opacity: 1; }

/* ── OVERLAY for mobile sidebar ── */
#sb-overlay {
  display: none; position: fixed; inset: 0; z-index: 49;
  background: rgba(0,0,0,0.5);
}
#sb-overlay.show { display: block; }
</style>
</head>
<body>

<!-- HEADER -->
<div id="header">
  <button id="menu-btn" onclick="toggleSidebar()" title="Menu">☰</button>
  <span class="logo">♠</span>
  <span class="site-title">ACR REPLAYER</span>
  <span class="site-sub">6-MAX</span>
  <span id="stakes-badge"></span>
  <span id="profit-badge"></span>
  <div class="hdr-spacer"></div>
  <button class="btn btn-filter" id="filter-btn" onclick="toggleFilter()">⭐ Big Hands</button>
  <button class="btn btn-export" id="export-btn" onclick="exportBlogPost()">📝 Export</button>
  <button class="btn btn-load" onclick="document.getElementById('file-input').click()">📂 Load</button>
  <input type="file" id="file-input" accept=".txt" style="display:none">
</div>

<!-- UPLOAD -->
<div id="upload-screen">
  <div id="drop-zone" onclick="document.getElementById('file-input').click()">
    <span class="dz-icon">🃏</span>
    <span class="dz-title">Load Your Hand History</span>
    <span class="dz-sub">ACR → My Hand History → export .txt<br>Drop file here or tap to browse</span>
    <button class="btn btn-load" style="pointer-events:none">Browse File</button>
  </div>
  <div id="error-msg"></div>
  <p class="upload-hint">Exports a Jekyll-ready <strong>.md + .html</strong> for learnpokerwithme.com<br>All players anonymised · Hero centred · BB display</p>
</div>

<!-- MAIN APP -->
<div id="main" style="display:none; flex:1; overflow:hidden; min-height:0;">
  <div id="sb-overlay" onclick="closeSidebar()"></div>

  <!-- SIDEBAR -->
  <div id="sidebar">
    <div class="sb-hdr">
      <span id="hands-hdr">HANDS (0)</span>
      <span id="filter-indicator" style="font-size:8px;color:var(--gold);display:none">★ FILTERED</span>
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

  <!-- CENTER -->
  <div id="center">
    <div id="infobar">
      <span class="ib-pill" id="ib-hand">—</span>
      <span style="color:var(--muted);font-size:9px" id="ib-stakes"></span>
      <span id="ib-event"></span>
    </div>

    <div id="table-area">
      <div id="felt-outer"></div>
      <div id="street-label"></div>
      <div id="board-wrap"></div>
      <div id="pot-display"></div>
      <div id="bets-wrap"></div>
      <div id="players-wrap"></div>
    </div>

    <div id="controls">
      <div id="scrub-row">
        <span id="frame-lbl">0/0</span>
        <input type="range" id="scrubber" min="0" max="0" value="0">
      </div>
      <div id="btn-row">
        <button class="ctrl-btn" id="btn-ph" onclick="prevHand()" disabled title="Prev Hand">⏮</button>
        <button class="ctrl-btn" onclick="stepBack()" title="Step Back">◀</button>
        <button id="play-btn" onclick="togglePlay()">▶</button>
        <button class="ctrl-btn" onclick="stepFwd()" title="Step Fwd">▶</button>
        <button class="ctrl-btn" id="btn-nh" onclick="nextHand()" title="Next Hand">⏭</button>
        <div class="ctrl-divider"></div>
        <button class="speed-btn on" data-speed="2200" onclick="setSpeed(this)">1×</button>
        <button class="speed-btn" data-speed="1300" onclick="setSpeed(this)">1.5×</button>
        <button class="speed-btn" data-speed="650" onclick="setSpeed(this)">3×</button>
      </div>
    </div>
  </div>

  <!-- LOG -->
  <div id="log-panel">
    <div class="sb-hdr">ACTION LOG</div>
    <div id="log-list"></div>
    <div class="log-hint">📝 Use Export to save .md + .html for Jekyll</div>
  </div>
</div>

<div id="toast"></div>

<script>
// ══════════════════════════════════════════════
// GLOBALS
// ══════════════════════════════════════════════
let ALL_HANDS = [];       // all parsed hands
let VIEW_HANDS = [];      // current filtered view
let handIdx = 0;
let frameIdx = 0;
let frames = [];
let playing = false;
let speed = 2200;
let ticker = null;
let actionLog = [];
let filterActive = false;
let BB_VAL = 0.02;        // updated on load

// Track player stacks across session for new-player detection
let playerLastSeen = {}; // name -> { stack, handIdx }
let newPlayersThisHand = new Set();

// ══════════════════════════════════════════════
// PARSER
// ══════════════════════════════════════════════
function parseHandHistory(raw) {
  const chunks = raw.split(/(?=Hand #\d+)/g).filter(c => c.trim().length > 60);
  return chunks.map(parseHand).filter(Boolean);
}

function parseHand(text) {
  try {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    const hand = {
      id: '', stakes: '', bb: 0.02, date: '', table: '',
      players: [], hero: null, button: null,
      smallBlind: null, bigBlind: null,
      streets: { preflop: [], flop: [], turn: [], river: [] },
      board: { flop: [], turn: null, river: null },
      pot: 0, potBB: 0, winners: [], raw: text,
      newPlayers: [],
    };

    // Header
    const hdr = lines[0] || '';
    const idM = hdr.match(/Hand #(\d+)/i);
    hand.id = idM ? idM[1] : Math.random().toString(36).slice(2,8);
    const skM = hdr.match(/\$?([\d.]+)\/([\d.]+)/);
    hand.stakes = skM ? `$${skM[1]}/$${skM[2]}` : 'Unknown';
    hand.bb = skM ? parseFloat(skM[2]) : 0.02;
    const dtM = hdr.match(/(\d{4}[-/]\d{2}[-/]\d{2}[\s\d:]+)/);
    hand.date = dtM ? dtM[1].trim() : '';

    // Table
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
        seat: parseInt(m[1]), name: m[2].trim(),
        stack: parseFloat(m[3].replace(',','')),
        cards: null, position: '', isHero: false,
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

    // Streets + actions
    let street = 'preflop';
    for (const line of lines) {
      if (/^\*\*\* (HOLE CARDS|PRE-?FLOP) \*\*\*/i.test(line)) { street = 'preflop'; continue; }
      if (/^\*\*\* FLOP \*\*\*/i.test(line)) {
        street = 'flop';
        const bm = line.match(/\[(.+?)\]/);
        if (bm) hand.board.flop = bm[1].split(' ').map(s=>s.trim());
        continue;
      }
      if (/^\*\*\* TURN \*\*\*/i.test(line)) {
        street = 'turn';
        const bm = line.match(/\[.+?\]\s*\[(.+?)\]/);
        if (bm) hand.board.turn = bm[1].trim();
        continue;
      }
      if (/^\*\*\* RIVER \*\*\*/i.test(line)) {
        street = 'river';
        const bm = line.match(/\[.+?\]\s*\[(.+?)\]/);
        if (bm) hand.board.river = bm[1].trim();
        continue;
      }
      if (/^\*\*\* (SHOW DOWN|SUMMARY) \*\*\*/i.test(line)) { street = 'summary'; continue; }

      const aM = line.match(/^(.+?):\s+(folds|checks|calls|bets|raises|shows|mucks|wins|collects)(.*)$/i);
      if (aM && street !== 'summary') {
        const a = { player: aM[1].trim(), type: aM[2].toLowerCase(), amount: 0, cards: null };
        const amtM = aM[3].match(/\$?([\d,.]+)/);
        if (amtM) a.amount = parseFloat(amtM[1].replace(',',''));
        const cM = aM[3].match(/\[(.+?)\]/);
        if (cM) a.cards = cM[1].split(' ').map(s=>s.trim());
        if (['preflop','flop','turn','river'].includes(street)) hand.streets[street].push(a);
      }

      if (/collected|wins/i.test(line) && street === 'summary') {
        const wM = line.match(/^(.+?)\s+(?:collected|wins)\s+\$?([\d,.]+)/i);
        if (wM) hand.winners.push({ name: wM[1].trim(), amount: parseFloat(wM[2].replace(',','')) });
      }
    }

    const pL = lines.find(l => /total pot/i.test(l));
    if (pL) { const pm = pL.match(/\$?([\d,.]+)/); if (pm) hand.pot = parseFloat(pm[1].replace(',','')); }
    hand.potBB = hand.bb > 0 ? Math.round(hand.pot / hand.bb) : 0;

    assignPositions(hand);
    return hand;
  } catch(e) { return null; }
}

function assignPositions(hand) {
  const posNames = ['BTN','SB','BB','UTG','HJ','CO'];
  const bi = hand.players.findIndex(p => p.seat === hand.button);
  if (bi < 0) {
    hand.players.forEach((p,i) => p.position = posNames[i] || `P${i+1}`);
    return;
  }
  for (let i = 0; i < hand.players.length; i++) {
    hand.players[(bi + i) % hand.players.length].position = posNames[i] || `P${i+1}`;
  }
}

// Detect new players (sat down between hands)
function detectNewPlayers(hands) {
  const lastSeen = {}; // name -> stack at end of previous hand
  hands.forEach((hand, hIdx) => {
    hand.newPlayers = [];
    hand.players.forEach(p => {
      if (lastSeen[p.name] !== undefined && Math.abs(lastSeen[p.name] - p.stack) > p.stack * 0.3) {
        // stack changed dramatically — treat as effectively new/rebought
      } else if (lastSeen[p.name] === undefined && hIdx > 0) {
        hand.newPlayers.push(p.name);
      }
      lastSeen[p.name] = p.stack;
    });
  });
}

// ══════════════════════════════════════════════
// FRAMES
// ══════════════════════════════════════════════
function buildFrames(hand) {
  const f = [];
  f.push({ type: 'deal' });
  hand.streets.preflop.forEach(a => f.push({ type:'action', street:'preflop', action:a }));
  if (hand.board.flop.length) {
    f.push({ type:'board', street:'flop', cards:hand.board.flop });
    hand.streets.flop.forEach(a => f.push({ type:'action', street:'flop', action:a }));
  }
  if (hand.board.turn) {
    f.push({ type:'board', street:'turn', card:hand.board.turn });
    hand.streets.turn.forEach(a => f.push({ type:'action', street:'turn', action:a }));
  }
  if (hand.board.river) {
    f.push({ type:'board', street:'river', card:hand.board.river });
    hand.streets.river.forEach(a => f.push({ type:'action', street:'river', action:a }));
  }
  f.push({ type:'result' });
  return f;
}

// ══════════════════════════════════════════════
// VISIBLE STATE
// ══════════════════════════════════════════════
function getState() {
  let flop = [], turn = null, river = null, street = 'preflop';
  const acts = {};   // player -> last action (cleared per street)
  const bets = {};   // player -> current bet amount for this street
  const folded = new Set();

  for (let i = 0; i <= frameIdx; i++) {
    const f = frames[i]; if (!f) continue;
    if (f.type === 'board') {
      if (f.street === 'flop')  { flop = f.cards; street = 'flop'; Object.keys(bets).forEach(k=>delete bets[k]); Object.keys(acts).forEach(k=>delete acts[k]); }
      if (f.street === 'turn')  { turn = f.card;  street = 'turn'; Object.keys(bets).forEach(k=>delete bets[k]); Object.keys(acts).forEach(k=>delete acts[k]); }
      if (f.street === 'river') { river = f.card; street = 'river'; Object.keys(bets).forEach(k=>delete bets[k]); Object.keys(acts).forEach(k=>delete acts[k]); }
    }
    if (f.type === 'action') {
      acts[f.action.player] = f.action;
      if (f.action.type === 'folds') folded.add(f.action.player);
      if (['bets','raises','calls'].includes(f.action.type) && f.action.amount > 0) {
        bets[f.action.player] = f.action.amount;
      }
    }
    if (f.type === 'deal') {
      Object.keys(acts).forEach(k=>delete acts[k]);
      Object.keys(bets).forEach(k=>delete bets[k]);
    }
  }

  const frame = frames[frameIdx];
  const active = frame?.type === 'action' ? frame.action.player : null;
  return { flop, turn, river, street, acts, bets, folded, active, frame };
}

// ══════════════════════════════════════════════
// CARD RENDERING
// ══════════════════════════════════════════════
const SUIT_CLASS = { s:'suit-s', h:'suit-h', d:'suit-d', c:'suit-c' };
const SUIT_SYM = { s:'♠', h:'♥', d:'♦', c:'♣' };

function cardHtml(str, size, faceDown) {
  if (faceDown || !str) return `<div class="card ${size} back"></div>`;
  const rank = str.slice(0,-1).toUpperCase();
  const suit = str.slice(-1).toLowerCase();
  const sc = SUIT_CLASS[suit] || 'suit-s';
  return `<div class="card ${size} face ${sc}"><span class="card-rank">${rank}</span></div>`;
}

// ══════════════════════════════════════════════
// POSITIONS → TABLE LAYOUT
// 6 seats. Hero always at bottom-center (index 0).
// We remap positions so Hero is always slot 0.
// Slots: 0=bottom-center, 1=bottom-left, 2=mid-left,
//        3=top-left, 4=top-right, 5=mid-right
// For mobile we compress vertical spacing a little.
// ══════════════════════════════════════════════
const SLOT_POS = [
  // desktop (percentage of table area)
  { top: '88%', left: '50%' },   // 0 hero
  { top: '78%', left: '22%' },   // 1 SB / left
  { top: '44%', left: '7%'  },   // 2 BB / far-left
  { top: '12%', left: '22%' },   // 3 UTG / top-left
  { top: '12%', left: '68%' },   // 4 HJ / top-right
  { top: '44%', left: '83%' },   // 5 CO / far-right
];

// We want hero always at slot 0. Build a mapping:
// slot[i] = player.position string for this hand's hero-relative layout
function buildSlotMap(hand) {
  // slot 0 = hero. Remaining slots follow CW order.
  const heroPos = hand.players.find(p => p.isHero)?.position;
  const posOrder = ['BTN','SB','BB','UTG','HJ','CO'];
  // Reorder starting from hero
  const heroIdx = posOrder.indexOf(heroPos);
  if (heroIdx < 0) {
    // fallback: just assign in order
    const map = {};
    hand.players.forEach((p,i) => { map[p.position] = i; });
    return map;
  }
  const map = {};
  // Hero at slot 0, then CW
  for (let i = 0; i < hand.players.length; i++) {
    const pos = posOrder[(heroIdx + i) % posOrder.length];
    // check if this position exists in this hand
    if (hand.players.find(p => p.position === pos)) {
      map[pos] = i;
    }
  }
  return map;
}

// Bet chip positions (between player and center)
const BET_POS = [
  { top: '70%', left: '50%' },
  { top: '66%', left: '32%' },
  { top: '50%', left: '20%' },
  { top: '28%', left: '32%' },
  { top: '28%', left: '62%' },
  { top: '50%', left: '72%' },
];

// ══════════════════════════════════════════════
// RENDER
// ══════════════════════════════════════════════
const ACTION_BADGE_COLORS = {
  folds:   '#374151',
  checks:  '#1e4080',
  calls:   '#145c30',
  bets:    '#7a4a00',
  raises:  '#7a1515',
  wins:    '#4a2080',
  collects:'#4a2080',
  shows:   '#1a3a50',
};

function render() {
  const hand = VIEW_HANDS[handIdx];
  if (!hand) return;
  const st = getState();
  const boardCards = [...st.flop, ...(st.turn?[st.turn]:[]), ...(st.river?[st.river]:[])];

  // Board
  document.getElementById('board-wrap').innerHTML = boardCards.map(c => cardHtml(c,'md',false)).join('');

  // Pot
  const potEl = document.getElementById('pot-display');
  if (boardCards.length && hand.pot > 0) {
    potEl.style.display = 'block';
    const potBB = (hand.pot / hand.bb).toFixed(1);
    potEl.textContent = `Pot: ${potBB}BB`;
  } else potEl.style.display = 'none';

  // Street label
  document.getElementById('street-label').textContent = st.street !== 'preflop' ? st.street.toUpperCase() : '';

  // Slot map
  const slotMap = buildSlotMap(hand);

  // Bet chips
  const betsWrap = document.getElementById('bets-wrap');
  betsWrap.innerHTML = '';
  Object.entries(st.bets).forEach(([playerName, amount]) => {
    const player = hand.players.find(p => p.name === playerName);
    if (!player) return;
    const slot = slotMap[player.position] ?? 0;
    const bp = BET_POS[slot] || BET_POS[0];
    const bbAmt = (amount / hand.bb).toFixed(1);
    const d = document.createElement('div');
    d.className = 'bet-chip';
    d.style.top = bp.top; d.style.left = bp.left;
    d.textContent = `${bbAmt}BB`;
    betsWrap.appendChild(d);
  });

  // Players
  const wrap = document.getElementById('players-wrap');
  wrap.innerHTML = '';

  hand.players.forEach(player => {
    const slot = slotMap[player.position] ?? 0;
    const pos = SLOT_POS[slot] || SLOT_POS[0];
    const isActive = st.active === player.name;
    const isHero = player.isHero;
    const isBtn = player.seat === hand.button;
    const hasFolded = st.folded.has(player.name);
    const isNewPlayer = hand.newPlayers.includes(player.name);
    const lastAct = st.acts[player.name];
    const stackBB = (player.stack / hand.bb).toFixed(0);
    const displayName = player.position + (isHero ? ' (You)' : '');

    let html = '';
    if (isBtn) html += `<div class="dealer-btn">D</div>`;
    if (isNewPlayer) html += `<div class="new-player-badge">NEW PLAYER</div>`;

    // Cards
    if (player.cards) {
      html += `<div class="player-cards">${player.cards.map(c => cardHtml(c,'sm',false)).join('')}</div>`;
    } else if (!hasFolded) {
      html += `<div class="player-cards">${cardHtml(null,'sm',true)}${cardHtml(null,'sm',true)}</div>`;
    }

    let chipCls = 'p-chip';
    if (isHero) chipCls += ' is-hero';
    if (isActive) chipCls += ' is-active';
    if (hasFolded) chipCls += ' folded';

    html += `<div class="${chipCls}">
      <span class="p-pos${isHero?' hero-pos':''}">${displayName}</span>
      <span class="p-stack">${stackBB}BB</span>
    </div>`;

    if (isActive) html += `<div class="turn-arrow">▼</div>`;

    if (lastAct) {
      const bg = ACTION_BADGE_COLORS[lastAct.type] || '#374151';
      const bbAmt = lastAct.amount > 0 ? ` ${(lastAct.amount/hand.bb).toFixed(1)}BB` : '';
      html += `<div class="action-badge" style="background:${bg}">${lastAct.type}${bbAmt}</div>`;
    }

    const div = document.createElement('div');
    div.className = 'player-box';
    div.style.top = pos.top; div.style.left = pos.left;
    div.innerHTML = html;
    wrap.appendChild(div);
  });

  // Infobar
  document.getElementById('ib-hand').textContent = `Hand #${handIdx+1}/${VIEW_HANDS.length}`;
  document.getElementById('ib-stakes').textContent = `${hand.stakes} · ${hand.potBB > 0 ? hand.potBB+'BB pot' : ''}`;

  const f = st.frame;
  let evtLbl = '';
  if (f) {
    if (f.type === 'deal') evtLbl = '🃏 Cards Dealt';
    else if (f.type === 'board') evtLbl = `🎴 ${f.street.toUpperCase()}: ${(f.cards||[f.card]).join(' ')}`;
    else if (f.type === 'action') {
      const a = f.action;
      const p = hand.players.find(pl => pl.name === a.player);
      const posName = p ? p.position + (p.isHero ? ' (You)' : '') : a.player;
      const bbAmt = a.amount > 0 ? ` ${(a.amount/hand.bb).toFixed(1)}BB` : '';
      evtLbl = `${posName} ${a.type}${bbAmt}`;
    } else if (f.type === 'result') {
      evtLbl = hand.winners.length
        ? `🏆 ${hand.winners.map(w => {
            const p = hand.players.find(pl => pl.name === w.name);
            const pn = p ? p.position+(p.isHero?' (You)':'') : 'Unknown';
            return `${pn} wins ${(w.amount/hand.bb).toFixed(1)}BB`;
          }).join(', ')}`
        : '🏁 Complete';
    }
  }
  document.getElementById('ib-event').textContent = evtLbl;

  document.getElementById('frame-lbl').textContent = `${frameIdx+1}/${frames.length}`;
  document.getElementById('scrubber').value = frameIdx;
  document.getElementById('btn-ph').disabled = handIdx === 0;
  document.getElementById('btn-nh').disabled = handIdx === VIEW_HANDS.length - 1;

  // Sidebar highlight
  document.querySelectorAll('.hand-item').forEach((el,i) => {
    el.classList.toggle('active', i === handIdx);
    if (i === handIdx) el.scrollIntoView({ block:'nearest' });
  });
}

// ══════════════════════════════════════════════
// ACTION LOG
// ══════════════════════════════════════════════
function updateLog() {
  const hand = VIEW_HANDS[handIdx];
  if (!hand) return;
  const f = frames[frameIdx];
  if (!f) return;
  if (f.type === 'deal') actionLog = [];
  else if (f.type === 'board') {
    actionLog = [...actionLog.slice(-28), `── ${f.street.toUpperCase()} ──`];
  } else if (f.type === 'action') {
    const a = f.action;
    const p = hand.players.find(pl => pl.name === a.player);
    const posName = p ? p.position + (p.isHero ? '(★)' : '') : '?';
    const bbAmt = a.amount > 0 ? ` ${(a.amount/hand.bb).toFixed(1)}BB` : '';
    actionLog = [...actionLog.slice(-28), `${posName}: ${a.type}${bbAmt}`];
  }
  const el = document.getElementById('log-list');
  el.innerHTML = actionLog.map(l => {
    let cls = 'log-entry';
    if (l.startsWith('──')) cls += ' log-street';
    else if (l.includes('raises')) cls += ' log-raise';
    else if (l.includes('calls')) cls += ' log-call';
    else if (l.includes('bets')) cls += ' log-bet';
    return `<div class="${cls}">${esc(l)}</div>`;
  }).join('');
  el.scrollTop = el.scrollHeight;
}

// ══════════════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════════════
function loadHand(idx) {
  handIdx = Math.max(0, Math.min(VIEW_HANDS.length-1, idx));
  frames = buildFrames(VIEW_HANDS[handIdx]);
  frameIdx = 0; actionLog = [];
  document.getElementById('scrubber').max = Math.max(0, frames.length-1);
  render(); updateLog();
}

function goFrame(idx) {
  frameIdx = Math.max(0, Math.min(frames.length-1, idx));
  render(); updateLog();
}

function prevHand() { stopPlay(); loadHand(handIdx-1); }
function nextHand() { stopPlay(); loadHand(handIdx+1); }
function stepBack()  { stopPlay(); goFrame(frameIdx-1); }
function stepFwd()   { stopPlay(); goFrame(frameIdx+1); }

function togglePlay() { playing ? stopPlay() : startPlay(); }
function startPlay() {
  if (playing) return;
  playing = true;
  document.getElementById('play-btn').textContent = '⏸';
  document.getElementById('play-btn').classList.add('stop');
  ticker = setInterval(() => {
    if (frameIdx >= frames.length - 1) {
      if (handIdx < VIEW_HANDS.length - 1) loadHand(handIdx+1);
      else stopPlay();
    } else goFrame(frameIdx+1);
  }, speed);
}
function stopPlay() {
  playing = false; clearInterval(ticker);
  document.getElementById('play-btn').textContent = '▶';
  document.getElementById('play-btn').classList.remove('stop');
}
function setSpeed(btn) {
  speed = parseInt(btn.dataset.speed);
  document.querySelectorAll('.speed-btn').forEach(b => b.classList.toggle('on', b===btn));
  if (playing) { stopPlay(); startPlay(); }
}

document.getElementById('scrubber').addEventListener('input', e => {
  stopPlay(); goFrame(parseInt(e.target.value));
});

// ══════════════════════════════════════════════
// BIG HAND FILTER
// ══════════════════════════════════════════════
function toggleFilter() {
  filterActive = !filterActive;
  document.getElementById('filter-btn').classList.toggle('active', filterActive);
  document.getElementById('filter-indicator').style.display = filterActive ? '' : 'none';
  rebuildView();
}

function getBigHandThreshold(hands) {
  // Top 20% by pot size as "big hands"
  const pots = hands.filter(h => h.pot > 0).map(h => h.potBB).sort((a,b) => b-a);
  const cutoff = Math.ceil(pots.length * 0.2);
  return pots[cutoff-1] || 0;
}

function rebuildView() {
  if (filterActive) {
    const threshold = getBigHandThreshold(ALL_HANDS);
    VIEW_HANDS = ALL_HANDS.filter(h => h.potBB >= threshold);
  } else {
    VIEW_HANDS = [...ALL_HANDS];
  }
  buildSidebar();
  loadHand(0);
  stopPlay();
}

// ══════════════════════════════════════════════
// SESSION STATS
// ══════════════════════════════════════════════
function calcStats(hands) {
  const hero = hands.find(h=>h.hero)?.hero || null;
  if (!hero) return null;
  const bb = hands[0]?.bb || 0.02;
  let profit = 0, vpip = 0, pfr = 0, heroHands = 0;
  let bigWin = null, bigLoss = null;

  for (const h of hands) {
    if (!h.players.find(p => p.name === hero)) continue;
    heroHands++;
    const pfActs = h.streets.preflop.filter(a => a.player === hero);
    if (pfActs.find(a => ['calls','bets','raises'].includes(a.type))) vpip++;
    if (pfActs.find(a => a.type === 'raises')) pfr++;

    const won = h.winners.find(w => w.name === hero)?.amount || 0;
    let inv = 0;
    ['preflop','flop','turn','river'].forEach(s => {
      h.streets[s].filter(a => a.player===hero && ['calls','bets','raises'].includes(a.type))
        .forEach(a => inv += a.amount);
    });
    if (h.smallBlind === hero) inv += bb/2;
    if (h.bigBlind === hero) inv += bb;

    const net = won - inv;
    profit += net;
    if (!bigWin || net > bigWin.net) bigWin = { hand:h, net };
    if (!bigLoss || net < bigLoss.net) bigLoss = { hand:h, net };
  }

  return {
    hero, stakes: hands[0]?.stakes||'?', bb, handsPlayed: hands.length, heroHands,
    totalProfit: profit.toFixed(2),
    totalProfitBB: (profit/bb).toFixed(1),
    bbPer100: heroHands ? ((profit/bb/heroHands)*100).toFixed(1) : '0',
    vpip: heroHands ? Math.round(vpip/heroHands*100) : 0,
    pfr:  heroHands ? Math.round(pfr/heroHands*100) : 0,
    bigWin, bigLoss,
  };
}

function renderStats(stats) {
  if (!stats) return;
  const net = parseFloat(stats.totalProfit);
  const cls = net >= 0 ? 'pos' : 'neg';
  document.getElementById('stats-panel').style.display = 'block';
  document.getElementById('s-hands').textContent = stats.handsPlayed;
  document.getElementById('s-net').innerHTML = `<span class="${cls}">${net>=0?'+':''}$${stats.totalProfit}</span>`;
  document.getElementById('s-bb100').textContent = stats.bbPer100;
  document.getElementById('s-vpip').textContent = stats.vpip + '%';
  document.getElementById('s-pfr').textContent  = stats.pfr  + '%';

  const pb = document.getElementById('profit-badge');
  pb.style.display = 'inline-flex';
  pb.className = net >= 0 ? 'profit-pos' : 'profit-neg';
  pb.textContent = `${net>=0?'+':''}${stats.totalProfitBB}BB`;

  document.getElementById('stakes-badge').style.display = 'inline-flex';
  document.getElementById('stakes-badge').textContent = stats.stakes;
}

// ══════════════════════════════════════════════
// SIDEBAR
// ══════════════════════════════════════════════
function buildSidebar() {
  const threshold = getBigHandThreshold(ALL_HANDS);
  const list = document.getElementById('handlist');
  list.innerHTML = '';
  VIEW_HANDS.forEach((h,i) => {
    const isBig = h.potBB >= threshold;
    const d = document.createElement('div');
    d.className = 'hand-item' + (i===0?' active':'') + (isBig?' big-pot':'');
    let extra = '';
    if (h.newPlayers.length) extra = `<div class="hi-new-player">⚡ new player</div>`;
    const potStr = h.potBB > 0 ? `${h.potBB}BB` : '';
    d.innerHTML = `<div class="hi-num">${isBig?'⭐ ':''}Hand #${ALL_HANDS.indexOf(h)+1}</div>
      <div class="hi-meta">${potStr}${potStr&&h.winners[0]?' · ':''}${h.winners[0]?winnerPos(h):'?'}</div>
      ${extra}`;
    d.onclick = () => { stopPlay(); loadHand(i); closeSidebar(); };
    list.appendChild(d);
  });
  document.getElementById('hands-hdr').textContent = `HANDS (${VIEW_HANDS.length})`;
}

function winnerPos(hand) {
  const w = hand.winners[0];
  if (!w) return '?';
  const p = hand.players.find(pl => pl.name === w.name);
  return p ? p.position + (p.isHero ? '★' : '') : '?';
}

// ══════════════════════════════════════════════
// FILE LOAD
// ══════════════════════════════════════════════
document.getElementById('file-input').addEventListener('change', e => {
  const file = e.target.files[0]; if (!file) return;
  const r = new FileReader();
  r.onload = ev => loadData(ev.target.result);
  r.readAsText(file);
});

const dz = document.getElementById('drop-zone');
dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('drag-over'); });
dz.addEventListener('dragleave', () => dz.classList.remove('drag-over'));
dz.addEventListener('drop', e => {
  e.preventDefault(); dz.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file) { const r = new FileReader(); r.onload = ev => loadData(ev.target.result); r.readAsText(file); }
});

function loadData(text) {
  const parsed = parseHandHistory(text);
  if (!parsed.length) {
    const em = document.getElementById('error-msg');
    em.style.display = 'block';
    em.textContent = 'No hands found. Make sure this is an ACR hand history .txt file.';
    return;
  }
  ALL_HANDS = parsed;
  BB_VAL = parsed[0]?.bb || 0.02;
  detectNewPlayers(ALL_HANDS);
  VIEW_HANDS = [...ALL_HANDS];
  filterActive = false;

  const stats = calcStats(ALL_HANDS);
  renderStats(stats);
  buildSidebar();

  document.getElementById('upload-screen').style.display = 'none';
  document.getElementById('main').style.display = 'flex';
  document.getElementById('export-btn').style.display = 'inline-flex';
  document.getElementById('filter-btn').style.display = 'inline-flex';
  loadHand(0);
}

// ══════════════════════════════════════════════
// MOBILE SIDEBAR
// ══════════════════════════════════════════════
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sb-overlay');
  const isOpen = sb.classList.contains('open');
  if (isOpen) { sb.classList.remove('open'); ov.classList.remove('show'); }
  else { sb.classList.add('open'); ov.classList.add('show'); }
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sb-overlay').classList.remove('show');
}

// ══════════════════════════════════════════════
// UTILS
// ══════════════════════════════════════════════
function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function dl(name, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download=name; a.click();
  URL.revokeObjectURL(url);
}
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4000);
}

// ══════════════════════════════════════════════
// EXPORT
// ══════════════════════════════════════════════
function describeHandMd(hand) {
  const board = [...hand.board.flop, ...(hand.board.turn?[hand.board.turn]:[]), ...(hand.board.river?[hand.board.river]:[])].join(' ');
  const allActs = [...hand.streets.preflop,...hand.streets.flop,...hand.streets.turn,...hand.streets.river];
  const heroP = hand.players.find(p=>p.isHero);
  const getPos = name => { const p=hand.players.find(pl=>pl.name===name); return p?(p.position+(p.isHero?' (Hero)':'')):'?'; };

  let lines = [];
  lines.push(`**${hand.potBB}BB pot** · Stakes: ${hand.stakes}` + (board ? ` · Board: \`${board}\`` : '') + (heroP?.cards ? ` · Hero (${heroP.position}): \`${heroP.cards.join(' ')}\`` : ''));

  const raises = allActs.filter(a=>a.type==='raises');
  const bigR = raises.length ? raises.reduce((mx,a)=>a.amount>mx.amount?a:mx,raises[0]) : null;
  if (bigR) lines.push(`Key action: **${getPos(bigR.player)}** raised to **${(bigR.amount/hand.bb).toFixed(1)}BB**.`);
  if (hand.winners[0]) lines.push(`**${getPos(hand.winners[0].name)}** won the **${hand.potBB}BB** pot.`);
  return lines.join(' ');
}

function exportBlogPost() {
  const stats = calcStats(ALL_HANDS);
  const today = new Date().toISOString().split('T')[0];
  const bigThreshold = getBigHandThreshold(ALL_HANDS);
  const keyHands = [...ALL_HANDS].filter(h=>h.potBB>=bigThreshold).sort((a,b)=>b.potBB-a.potBB).slice(0,6);
  const replayerFile = `${today}-poker-replayer.html`;
  const net = parseFloat(stats?.totalProfit||'0');

  // ── .md ──
  const md = `---
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

${net>=0
  ? `> ✅ **Winning session** +${stats?.totalProfitBB}BB`
  : `> 🔴 **Losing session** ${stats?.totalProfitBB}BB`}

---

## Key Hands (Biggest Pots)

${keyHands.length ? keyHands.map((h,i) => `### Hand ${i+1} — ${h.potBB}BB pot\n\n${describeHandMd(h)}\n`).join('\n') : '*No big hands recorded.*'}

---

## Interactive Replayer

<div style="overflow:hidden; border-radius:8px; border:1px solid #ddd; margin:1.5rem 0;">
<iframe
  src="/assets/replayers/${replayerFile}"
  style="width:100%; height:480px; border:none; display:block;"
  title="Hand Replayer"
></iframe>
</div>

> 💡 Tap **⭐ Big Hands** to filter to the largest pots. All players are anonymised by position.

---

## Notes

*Reads, adjustments, and reflections:*

- 
- 
- 
`;

  // ── Standalone replayer HTML ──
  const handsJson = JSON.stringify(ALL_HANDS.map(h=>({
    id:h.id, stakes:h.stakes, bb:h.bb, table:h.table, date:h.date,
    hero:h.hero, button:h.button, players:h.players.map(p=>({
      seat:p.seat, name:p.name, stack:p.stack, cards:p.cards,
      position:p.position, isHero:p.isHero
    })),
    streets:h.streets, board:h.board, pot:h.pot, potBB:h.potBB,
    winners:h.winners, newPlayers:h.newPlayers
  })));

  const embedHtml = buildEmbedHtml(handsJson);

  dl(`${today}-poker-session-review.md`, md, 'text/markdown');
  setTimeout(() => dl(replayerFile, embedHtml, 'text/html'), 300);
  toast(`✓ Downloaded .md + ${replayerFile}`);
}

// ══════════════════════════════════════════════
// EMBED HTML BUILDER
// ══════════════════════════════════════════════
function buildEmbedHtml(handsJson) {
  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>Poker Replayer</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#07101f;--surface:#0c1829;--border:rgba(255,255,255,0.08);--text:#d8e4f0;--muted:#3d5068;--muted2:#5a7090;--accent:#4d8aff;--hero:#a78bfa;--green:#22d47a;--red:#f06060;--gold:#f5c542;--felt-dark:#0b2318;--felt-mid:#133320;--felt-light:#1a4229;--rail:#0a1c10;--spade:#c8d8f0;--heart:#f06060;--diamond:#3dcfcf;--club:#5dd47a}
html,body{height:100%;overflow:hidden}
body{background:var(--bg);color:var(--text);font-family:'Trebuchet MS',sans-serif;display:flex;flex-direction:column;-webkit-tap-highlight-color:transparent}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#1e3050;border-radius:3px}
#hdr{display:flex;align-items:center;gap:8px;padding:0 10px;height:40px;background:rgba(7,14,28,0.98);border-bottom:1px solid var(--border);flex-shrink:0;z-index:100;position:relative}
.hlogo{font-size:16px}.httl{font-size:12px;font-weight:700;letter-spacing:2px;color:var(--hero)}.hsp{flex:1}
.hevt{font-size:10px;color:var(--gold);font-weight:700;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.hbtn{border:none;border-radius:5px;cursor:pointer;font-weight:700;font-family:inherit;letter-spacing:0.5px;transition:all 0.15s;display:inline-flex;align-items:center;gap:4px;padding:5px 9px;font-size:10px;touch-action:manipulation}
.hbtn:active{transform:scale(0.93)}
.hbtn-flt{background:rgba(245,197,66,0.12);border:1px solid rgba(245,197,66,0.3);color:var(--gold)}
.hbtn-flt.on{background:rgba(245,197,66,0.25)}
.hbtn-menu{background:none;border:none;color:var(--muted2);font-size:17px;cursor:pointer;padding:4px;line-height:1;display:none}
@media(max-width:650px){.hbtn-menu{display:flex}}
#bdy{display:flex;flex:1;overflow:hidden;min-height:0}
#sb{width:150px;background:rgba(7,13,25,0.97);border-right:1px solid var(--border);display:flex;flex-direction:column;overflow:hidden;flex-shrink:0;transition:width 0.25s}
@media(max-width:650px){#sb{width:0;position:absolute;z-index:50;height:calc(100% - 40px);top:40px}#sb.open{width:150px;border-right:1px solid var(--border);box-shadow:4px 0 20px rgba(0,0,0,0.6)}}
.sb-hdr{padding:6px 9px;font-size:9px;font-weight:700;letter-spacing:1.5px;color:var(--muted);border-bottom:1px solid var(--border);text-transform:uppercase;flex-shrink:0}
#hl{flex:1;overflow-y:auto}.hi{padding:5px 9px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.03);border-left:2px solid transparent;transition:all 0.1s}
.hi:hover{background:rgba(77,138,255,0.07)}.hi.a{background:rgba(77,138,255,0.13);border-left-color:var(--accent)}.hi.bp{border-left-color:var(--gold)!important}
.hin{font-size:10px;font-weight:700;color:var(--muted2)}.hi.a .hin{color:var(--hero)}.him{font-size:9px;color:var(--muted);font-family:monospace}.hiw{font-size:9px;color:var(--green)}.hinp{font-size:8px;color:var(--gold)}
#ct{flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0}
#ib{padding:0 10px;height:26px;display:flex;align-items:center;gap:6px;background:rgba(7,13,25,0.95);border-bottom:1px solid var(--border);font-size:9px;font-family:monospace;flex-shrink:0;overflow:hidden}
.ibp{background:rgba(77,138,255,0.1);border:1px solid rgba(77,138,255,0.2);border-radius:10px;padding:1px 6px;color:var(--accent);font-size:9px;white-space:nowrap}
.ibe{margin-left:auto;font-size:10px;color:var(--gold);font-weight:700;font-family:inherit;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:180px}
#ta{flex:1;position:relative;overflow:hidden}
#felt{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:min(88%,520px);height:min(76%,320px);min-width:240px;min-height:160px;border-radius:50%;background:radial-gradient(ellipse at 40% 38%,var(--felt-light),var(--felt-mid) 50%,var(--felt-dark));border:5px solid var(--rail);box-shadow:0 0 0 2px rgba(255,255,255,0.04),0 0 0 7px #050d12,0 0 50px rgba(0,0,0,0.8),inset 0 0 35px rgba(0,0,0,0.4)}
#bw{position:absolute;top:50%;left:50%;transform:translate(-50%,-54%);display:flex;gap:5px;align-items:center;z-index:10}
#pd{position:absolute;top:50%;left:50%;transform:translate(-50%,-220%);font-size:10px;font-weight:700;color:var(--gold);background:rgba(0,0,0,0.6);padding:2px 8px;border-radius:20px;z-index:11;display:none;font-family:monospace;white-space:nowrap}
#sl{position:absolute;top:50%;left:50%;transform:translate(-50%,-310%);font-size:10px;font-weight:700;letter-spacing:2px;color:rgba(255,255,255,0.18);text-transform:uppercase;pointer-events:none;z-index:9}
#pw{position:absolute;inset:0;z-index:20;pointer-events:none}
#betsw{position:absolute;inset:0;z-index:15;pointer-events:none}
.pb2{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:2px}
.pc2{display:flex;gap:2px}
.chip2{background:rgba(8,15,30,0.9);border:1px solid rgba(255,255,255,0.1);border-radius:7px;padding:3px 7px;display:flex;flex-direction:column;align-items:center;min-width:58px;transition:all 0.2s}
.chip2.hero{border-color:rgba(167,139,250,0.5);background:rgba(30,15,60,0.85)}
.chip2.act{border-color:var(--gold)!important;box-shadow:0 0 0 1px rgba(245,197,66,0.3),0 0 14px rgba(245,197,66,0.25);background:rgba(40,30,5,0.9)!important;animation:ap 1s ease infinite}
@keyframes ap{0%,100%{box-shadow:0 0 0 1px rgba(245,197,66,0.3),0 0 10px rgba(245,197,66,0.2)}50%{box-shadow:0 0 0 2px rgba(245,197,66,0.5),0 0 20px rgba(245,197,66,0.4)}}
.chip2.fld{opacity:0.35}.pn2{font-size:9px;font-weight:700;color:var(--text);white-space:nowrap}.pn2.h{color:var(--hero)}.pi2{font-size:8px;color:var(--muted2);font-family:monospace}
.db2{position:absolute;top:-7px;right:-7px;width:14px;height:14px;border-radius:50%;background:var(--gold);color:#1a0800;font-size:7px;font-weight:900;display:flex;align-items:center;justify-content:center;border:1px solid #e0a800;z-index:25}
.ab2{border-radius:10px;padding:2px 6px;font-size:8px;font-weight:700;color:#fff;text-transform:uppercase;letter-spacing:0.4px;white-space:nowrap;animation:bp2 0.2s ease}
@keyframes bp2{from{transform:scale(0.6);opacity:0}to{transform:scale(1);opacity:1}}
.ta2{position:absolute;bottom:-13px;left:50%;transform:translateX(-50%);font-size:9px;color:var(--gold);animation:bv 0.6s ease infinite alternate}
@keyframes bv{from{transform:translateX(-50%) translateY(0)}to{transform:translateX(-50%) translateY(-3px)}}
.nbadge{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:rgba(245,197,66,0.2);border:1px solid rgba(245,197,66,0.5);border-radius:4px;padding:1px 4px;font-size:7px;font-weight:700;color:var(--gold);white-space:nowrap}
.bc2{border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 1px 4px rgba(0,0,0,0.6)}
.bc2.sm{width:25px;height:35px}.bc2.md{width:36px;height:50px}
.bc2.back{background:linear-gradient(145deg,#1a3565,#0d1f3e);border:1px solid #243a5f}
.bc2.ss{background:#0a1420;border:1px solid #1e3050}.bc2.sh{background:#200a0a;border:1px solid #501010}
.bc2.sd{background:#081818;border:1px solid #104040}.bc2.sc{background:#081408;border:1px solid #124020}
.bcr{font-family:monospace;font-weight:600;line-height:1;text-shadow:0 0 6px currentColor}
.bc2.sm .bcr{font-size:12px}.bc2.md .bcr{font-size:17px}
.bc2.ss .bcr{color:#c8d8f0}.bc2.sh .bcr{color:#f06060}.bc2.sd .bcr{color:#3dcfcf}.bc2.sc .bcr{color:#5dd47a}
.betchip{position:absolute;transform:translate(-50%,-50%);background:rgba(245,197,66,0.15);border:1px solid rgba(245,197,66,0.5);border-radius:5px;padding:2px 5px;font-size:9px;font-family:monospace;font-weight:600;color:var(--gold);white-space:nowrap;animation:ci 0.2s ease}
@keyframes ci{from{transform:translate(-50%,-50%) scale(0.5);opacity:0}to{transform:translate(-50%,-50%) scale(1);opacity:1}}
#ctrl{padding:7px 10px 9px;background:rgba(6,11,22,0.98);border-top:1px solid var(--border);display:flex;flex-direction:column;gap:6px;flex-shrink:0}
#sr{display:flex;align-items:center;gap:7px}#fc{font-size:9px;color:var(--muted);font-family:monospace;min-width:42px}
#sc{flex:1;accent-color:var(--accent);cursor:pointer;height:4px}
#br{display:flex;gap:4px;align-items:center;justify-content:center;flex-wrap:wrap}
.cb{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.09);border-radius:5px;width:34px;height:30px;color:#6080a0;font-size:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;touch-action:manipulation}
.cb:disabled{color:#1e2e40;cursor:not-allowed}.cb:active:not(:disabled){transform:scale(0.93)}
#pb{background:linear-gradient(135deg,#2d4db0,#5535b0);border:none;border-radius:7px;width:42px;height:30px;color:#fff;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;touch-action:manipulation}
#pb.stop{background:linear-gradient(135deg,#8b1515,#c02020)}#pb:active{transform:scale(0.93)}
.sb{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:3px 8px;color:var(--muted2);font-size:10px;font-weight:700;cursor:pointer;font-family:monospace;touch-action:manipulation}
.sb.on{background:rgba(77,138,255,0.2);border-color:var(--accent);color:var(--accent)}
.dv{width:1px;height:18px;background:rgba(255,255,255,0.07);margin:0 2px}
#sbov{display:none;position:fixed;inset:0;z-index:49;background:rgba(0,0,0,0.5)}
#sbov.show{display:block}
</style></head><body>
<div id="hdr">
  <button class="hbtn-menu" id="mbtn" onclick="tSb()">☰</button>
  <span class="hlogo">♠</span><span class="httl">REPLAYER</span>
  <div class="hsp"></div>
  <button class="hbtn hbtn-flt" id="fltbtn" onclick="tFlt()">⭐ Big Hands</button>
  <span class="hevt" id="hevt"></span>
</div>
<div id="sbov" onclick="cSb()"></div>
<div id="bdy">
  <div id="sb">
    <div class="sb-hdr">HANDS (<span id="hcnt">0</span>)</div>
    <div id="hl"></div>
  </div>
  <div id="ct">
    <div id="ib">
      <span class="ibp" id="ibn">—</span>
      <span style="color:var(--muted);font-size:9px" id="ibs"></span>
      <span class="ibe" id="ibe"></span>
    </div>
    <div id="ta">
      <div id="felt"></div>
      <div id="sl"></div>
      <div id="bw"></div>
      <div id="pd"></div>
      <div id="betsw"></div>
      <div id="pw"></div>
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
        <button class="sb on" data-s="2200" onclick="sSp(this)">1×</button>
        <button class="sb" data-s="1300" onclick="sSp(this)">1.5×</button>
        <button class="sb" data-s="650" onclick="sSp(this)">3×</button>
      </div>
    </div>
  </div>
</div>
<script>
const HH=${handsJson};
const SPOS=[{t:'88%',l:'50%'},{t:'78%',l:'22%'},{t:'44%',l:'7%'},{t:'12%',l:'22%'},{t:'12%',l:'68%'},{t:'44%',l:'83%'}];
const BPOS=[{t:'70%',l:'50%'},{t:'66%',l:'32%'},{t:'50%',l:'20%'},{t:'28%',l:'32%'},{t:'28%',l:'62%'},{t:'50%',l:'72%'}];
const AC2={folds:'#374151',checks:'#1e4080',calls:'#145c30',bets:'#7a4a00',raises:'#7a1515',wins:'#4a2080',collects:'#4a2080'};
const SS2={s:'ss',h:'sh',d:'sd',c:'sc'};
let AH=HH,VH=[...HH],hi=0,fi=0,fr=[],pl=false,sp=2200,iv=null,al=[],fa=false;
function bF2(h){const f=[];f.push({t:'deal'});h.streets.preflop.forEach(a=>f.push({t:'action',s:'preflop',a}));if(h.board.flop.length){f.push({t:'board',s:'flop',c:h.board.flop});h.streets.flop.forEach(a=>f.push({t:'action',s:'flop',a}));}if(h.board.turn){f.push({t:'board',s:'turn',c2:h.board.turn});h.streets.turn.forEach(a=>f.push({t:'action',s:'turn',a}));}if(h.board.river){f.push({t:'board',s:'river',c2:h.board.river});h.streets.river.forEach(a=>f.push({t:'action',s:'river',a}));}f.push({t:'result'});return f;}
function gSM(h){const po=['BTN','SB','BB','UTG','HJ','CO'],hp=h.players.find(p=>p.isHero)?.position,bi=po.indexOf(hp);if(bi<0){const m={};h.players.forEach((p,i)=>m[p.position]=i);return m;}const m={};for(let i=0;i<h.players.length;i++){const pos=po[(bi+i)%po.length];if(h.players.find(p=>p.position===pos))m[pos]=i;}return m;}
function gVS2(){let fl=[],tu=null,rv=null,st='preflop';const ac={},bets={},fld=new Set();for(let i=0;i<=fi;i++){const f=fr[i];if(!f)continue;if(f.t==='board'){if(f.s==='flop'){fl=f.c;st='flop';Object.keys(bets).forEach(k=>delete bets[k]);Object.keys(ac).forEach(k=>delete ac[k]);}if(f.s==='turn'){tu=f.c2;st='turn';Object.keys(bets).forEach(k=>delete bets[k]);Object.keys(ac).forEach(k=>delete ac[k]);}if(f.s==='river'){rv=f.c2;st='river';Object.keys(bets).forEach(k=>delete bets[k]);Object.keys(ac).forEach(k=>delete ac[k]);}}if(f.t==='action'){ac[f.a.player]=f.a;if(f.a.type==='folds')fld.add(f.a.player);if(['bets','raises','calls'].includes(f.a.type)&&f.a.amount>0)bets[f.a.player]=f.a.amount;}if(f.t==='deal'){Object.keys(ac).forEach(k=>delete ac[k]);Object.keys(bets).forEach(k=>delete bets[k]);}}return{fl,tu,rv,st,ac,bets,fld,act:fr[fi]?.t==='action'?fr[fi].a.player:null,f:fr[fi]};}
function cH2(s,sz,fd){if(fd||!s)return\`<div class="bc2 \${sz} back"></div>\`;const r=s.slice(0,-1).toUpperCase(),su=s.slice(-1).toLowerCase(),sc2=SS2[su]||'ss';return\`<div class="bc2 \${sz} \${sc2}"><span class="bcr">\${r}</span></div>\`;}
function wpPos(h){const w=h.winners[0];if(!w)return'?';const p=h.players.find(pl=>pl.name===w.name);return p?p.position+(p.isHero?'★':''):'?';}
function ren2(){const h=VH[hi];if(!h)return;const st=gVS2(),sm=gSM(h),bc=[...st.fl,...(st.tu?[st.tu]:[]),...(st.rv?[st.rv]:[])];
document.getElementById('bw').innerHTML=bc.map(c=>cH2(c,'md',false)).join('');
const pd=document.getElementById('pd');if(bc.length&&h.pot>0){pd.style.display='block';pd.textContent='Pot '+(h.pot/h.bb).toFixed(1)+'BB';}else pd.style.display='none';
document.getElementById('sl').textContent=st.st!=='preflop'?st.st.toUpperCase():'';
const bw=document.getElementById('betsw');bw.innerHTML='';
Object.entries(st.bets).forEach(([pn,amt])=>{const p=h.players.find(pl=>pl.name===pn);if(!p)return;const sl=sm[p.position]??0,bp=BPOS[sl]||BPOS[0];const d=document.createElement('div');d.className='betchip';d.style.top=bp.t;d.style.left=bp.l;d.textContent=(amt/h.bb).toFixed(1)+'BB';bw.appendChild(d);});
const pw=document.getElementById('pw');pw.innerHTML='';
h.players.forEach(p=>{const sl=sm[p.position]??0,pos=SPOS[sl]||SPOS[0],ia=st.act===p.name,ih=p.isHero,ib=p.seat===h.button,hf=st.fld.has(p.name),la=st.ac[p.name],stBB=(p.stack/h.bb).toFixed(0),isNP=h.newPlayers&&h.newPlayers.includes(p.name),dn=p.position+(ih?' (You)':'');
let html='';if(ib)html+=\`<div class="db2">D</div>\`;if(isNP)html+=\`<div class="nbadge">NEW</div>\`;
if(p.cards)html+=\`<div class="pc2">\${p.cards.map(c=>cH2(c,'sm',false)).join('')}</div>\`;
else if(!hf)html+=\`<div class="pc2">\${cH2(null,'sm',true)}\${cH2(null,'sm',true)}</div>\`;
let cc='chip2'+(ih?' hero':'')+(ia?' act':'')+(hf?' fld':'');
html+=\`<div class="\${cc}"><span class="pn2\${ih?' h':''}">\${dn}</span><span class="pi2">\${stBB}BB</span></div>\`;
if(ia)html+=\`<div class="ta2">▼</div>\`;
if(la){const bg=AC2[la.type]||'#374151',ba=la.amount>0?' '+(la.amount/h.bb).toFixed(1)+'BB':'';html+=\`<div class="ab2" style="background:\${bg}">\${la.type}\${ba}</div>\`;}
const d=document.createElement('div');d.className='pb2';d.style.cssText=\`position:absolute;top:\${pos.t};left:\${pos.l};transform:translate(-50%,-50%)\`;d.innerHTML=html;pw.appendChild(d);});
document.getElementById('ibn').textContent='Hand #'+(hi+1)+'/'+VH.length;
document.getElementById('ibs').textContent=h.stakes+(h.potBB>0?' · '+h.potBB+'BB pot':'');
const f=st.f;let lb='';
const gp=n=>{const p=h.players.find(pl=>pl.name===n);return p?p.position+(p.isHero?' (You)':''):'?';};
if(f){if(f.t==='deal')lb='🃏 Cards Dealt';else if(f.t==='board')lb='🎴 '+(f.s.charAt(0).toUpperCase()+f.s.slice(1))+': '+(f.c||[f.c2]).join(' ');else if(f.t==='action'){const a=f.a,ba=a.amount>0?' '+(a.amount/h.bb).toFixed(1)+'BB':'';lb=gp(a.player)+' '+a.type+ba;}else if(f.t==='result')lb=h.winners.length?'🏆 '+h.winners.map(w=>gp(w.name)+' wins '+(w.amount/h.bb).toFixed(1)+'BB').join(', '):'🏁 Complete';}
document.getElementById('ibe').textContent=lb;document.getElementById('hevt').textContent=lb;
document.getElementById('fc').textContent=(fi+1)+'/'+fr.length;document.getElementById('sc').value=fi;
document.querySelectorAll('.hi').forEach((el,i)=>{el.classList.toggle('a',i===hi);if(i===hi)el.scrollIntoView({block:'nearest'});});
document.getElementById('bph').disabled=hi===0;document.getElementById('bnh').disabled=hi===VH.length-1;}
function lH2(i){hi=Math.max(0,Math.min(VH.length-1,i));fr=bF2(VH[hi]);fi=0;document.getElementById('sc').max=Math.max(0,fr.length-1);ren2();}
function gF2(i){fi=Math.max(0,Math.min(fr.length-1,i));ren2();}
function pH(){stP2();lH2(hi-1);}function nH(){stP2();lH2(hi+1);}
function sB(){stP2();gF2(fi-1);}function sF(){stP2();gF2(fi+1);}
function tP(){pl?stP2():stPl2();}
function stPl2(){if(pl)return;pl=true;document.getElementById('pb').textContent='⏸';document.getElementById('pb').classList.add('stop');iv=setInterval(()=>{if(fi>=fr.length-1){hi<VH.length-1?lH2(hi+1):stP2();}else gF2(fi+1);},sp);}
function stP2(){pl=false;clearInterval(iv);document.getElementById('pb').textContent='▶';document.getElementById('pb').classList.remove('stop');}
function sSp(b){sp=parseInt(b.dataset.s);document.querySelectorAll('.sb').forEach(x=>x.classList.toggle('on',x===b));if(pl){stP2();stPl2();}}
document.getElementById('sc').addEventListener('input',e=>{stP2();gF2(parseInt(e.target.value));});
function getBigThr(h){const pots=h.filter(x=>x.pot>0).map(x=>x.potBB).sort((a,b)=>b-a);const c=Math.ceil(pots.length*0.2);return pots[c-1]||0;}
function tFlt(){fa=!fa;document.getElementById('fltbtn').classList.toggle('on',fa);VH=fa?AH.filter(h=>h.potBB>=getBigThr(AH)):[...AH];bSb2();lH2(0);}
function bSb2(){const thr=getBigThr(AH),list=document.getElementById('hl');list.innerHTML='';VH.forEach((h,i)=>{const ib=h.potBB>=thr,d=document.createElement('div');d.className='hi'+(i===0?' a':'')+(ib?' bp':'');const np=h.newPlayers&&h.newPlayers.length?\`<div class="hinp">⚡ new player</div>\`:'';d.innerHTML=\`<div class="hin">\${ib?'⭐ ':''}Hand #\${AH.indexOf(h)+1}</div><div class="him">\${h.potBB>0?h.potBB+'BB · ':''}\${wpPos(h)}</div>\${np}\`;d.onclick=()=>{stP2();lH2(i);cSb();};list.appendChild(d);});document.getElementById('hcnt').textContent=VH.length;}
function tSb(){const s=document.getElementById('sb'),o=document.getElementById('sbov');s.classList.toggle('open');o.classList.toggle('show',s.classList.contains('open'));}
function cSb(){document.getElementById('sb').classList.remove('open');document.getElementById('sbov').classList.remove('show');}
bSb2();lH2(0);
<\/script></body></html>`;
}
</script>
</body>
</html>
