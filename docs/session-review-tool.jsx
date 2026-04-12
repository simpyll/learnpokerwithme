---
layout: default
title: Session Review Tool
---

import { useState, useEffect, useRef, useCallback } from "react";

// \u2500\u2500\u2500 PARSER \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

function parseHandHistory(text) {
  const hands = text
    .split(/(?=Hand #\d+|PolyPoker Hand #|Hand ID:)/g)
    .filter(h => h.trim().length > 50);
  return hands.map(parseHand).filter(Boolean);
}

function parseHand(text) {
  try {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    const hand = {
      id: '', stakes: '', date: '', table: '',
      players: [], hero: null, button: null,
      smallBlind: null, bigBlind: null,
      streets: { preflop: [], flop: [], turn: [], river: [] },
      board: { flop: [], turn: null, river: null },
      pot: 0, winners: [], raw: text,
    };

    const headerLine = lines[0] || '';
    const idMatch = headerLine.match(/Hand #(\d+)/i) || headerLine.match(/ID:\s*(\d+)/i);
    hand.id = idMatch ? idMatch[1] : Math.random().toString(36).slice(2);
    const stakesMatch = headerLine.match(/\$?([\d.]+)\/([\d.]+)/);
    hand.stakes = stakesMatch ? `$${stakesMatch[1]}/$${stakesMatch[2]}` : 'Unknown';
    const dateMatch = headerLine.match(/(\d{4}[-/]\d{2}[-/]\d{2}[\s\d:]+)/);
    hand.date = dateMatch ? dateMatch[1].trim() : '';

    const tableLine = lines.find(l => l.toLowerCase().startsWith('table '));
    if (tableLine) {
      const tMatch = tableLine.match(/Table '?([^']+)'?\s+(\d+)-max/i);
      hand.table = tMatch ? tMatch[1].trim() : tableLine.replace(/^table\s+/i,'').split(' ')[0];
      const btnMatch = tableLine.match(/Seat #(\d+) is the button/i);
      hand.button = btnMatch ? parseInt(btnMatch[1]) : null;
    }

    lines.filter(l => /^Seat \d+:/i.test(l)).forEach(l => {
      const m = l.match(/^Seat (\d+):\s+(.+?)\s+\(\$?([\d,.]+)/i);
      if (m) hand.players.push({
        seat: parseInt(m[1]), name: m[2].trim(),
        stack: parseFloat(m[3].replace(',', '')),
        cards: null, position: '',
      });
    });

    const sbLine = lines.find(l => /posts small blind/i.test(l));
    const bbLine = lines.find(l => /posts big blind/i.test(l));
    if (sbLine) { const m = sbLine.match(/^(.+?)\s*:/); if (m) hand.smallBlind = m[1].trim(); }
    if (bbLine) { const m = bbLine.match(/^(.+?)\s*:/); if (m) hand.bigBlind = m[1].trim(); }

    const dealtLine = lines.find(l => /^Dealt to /i.test(l));
    if (dealtLine) {
      const m = dealtLine.match(/^Dealt to (.+?)\s*\[(.+?)\]/i);
      if (m) {
        hand.hero = m[1].trim();
        const hp = hand.players.find(p => p.name === hand.hero);
        if (hp) hp.cards = m[2].split(' ').map(s => s.trim());
      }
    }

    let currentStreet = 'preflop';
    for (const line of lines) {
      if (/^\*\*\* (HOLE CARDS|PRE-?FLOP) \*\*\*/i.test(line)) { currentStreet = 'preflop'; continue; }
      if (/^\*\*\* FLOP \*\*\*/i.test(line)) {
        currentStreet = 'flop';
        const bm = line.match(/\[(.+?)\]/);
        if (bm) hand.board.flop = bm[1].split(' ').map(s => s.trim());
        continue;
      }
      if (/^\*\*\* TURN \*\*\*/i.test(line)) {
        currentStreet = 'turn';
        const bm = line.match(/\[.+?\]\s*\[(.+?)\]/);
        if (bm) hand.board.turn = bm[1].trim();
        continue;
      }
      if (/^\*\*\* RIVER \*\*\*/i.test(line)) {
        currentStreet = 'river';
        const bm = line.match(/\[.+?\]\s*\[(.+?)\]/);
        if (bm) hand.board.river = bm[1].trim();
        continue;
      }
      if (/^\*\*\* (SHOW DOWN|SUMMARY) \*\*\*/i.test(line)) { currentStreet = 'summary'; continue; }

      const actionMatch = line.match(/^(.+?):\s+(folds|checks|calls|bets|raises|shows|mucks|wins|collects)(.*)$/i);
      if (actionMatch && currentStreet !== 'summary') {
        const action = { player: actionMatch[1].trim(), type: actionMatch[2].toLowerCase(), amount: 0, cards: null };
        const amtMatch = actionMatch[3].match(/\$?([\d,.]+)/);
        if (amtMatch) action.amount = parseFloat(amtMatch[1].replace(',',''));
        const cardsMatch = actionMatch[3].match(/\[(.+?)\]/);
        if (cardsMatch) action.cards = cardsMatch[1].split(' ').map(s => s.trim());
        if (['preflop','flop','turn','river'].includes(currentStreet)) hand.streets[currentStreet].push(action);
      }

      if (/collected|wins/i.test(line) && currentStreet === 'summary') {
        const wm = line.match(/^(.+?)\s+(?:collected|wins)\s+\$?([\d,.]+)/i);
        if (wm) hand.winners.push({ name: wm[1].trim(), amount: parseFloat(wm[2].replace(',','')) });
      }
    }

    const potLine = lines.find(l => /total pot/i.test(l));
    if (potLine) { const pm = potLine.match(/\$?([\d,.]+)/); if (pm) hand.pot = parseFloat(pm[1].replace(',','')); }

    assignPositions(hand);
    return hand;
  } catch { return null; }
}

function assignPositions(hand) {
  if (!hand.players.length) return;
  const posNames = ['BTN','SB','BB','UTG','HJ','CO'];
  const btnIdx = hand.players.findIndex(p => p.seat === hand.button);
  if (btnIdx === -1) return;
  for (let i = 0; i < hand.players.length; i++) {
    hand.players[(btnIdx + i) % hand.players.length].position = posNames[i] || `P${i+1}`;
  }
}

// \u2500\u2500\u2500 SESSION STATS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

function calcSessionStats(hands) {
  if (!hands.length) return null;
  const hero = hands.find(h => h.hero)?.hero || null;
  let totalProfit = 0, handsPlayed = hands.length;
  let vpipCount = 0, pfrCount = 0, heroHands = 0;
  let biggestWin = null, biggestLoss = null;
  const stakes = hands[0]?.stakes || 'Unknown';
  const bb = parseFloat((hands[0]?.stakes || '0/0').split('/')[1]) || 1;

  for (const hand of hands) {
    if (!hero) continue;
    const heroPlayer = hand.players.find(p => p.name === hero);
    if (!heroPlayer) continue;
    heroHands++;

    // VPIP: hero voluntarily put money in preflop
    const preflopActions = hand.streets.preflop.filter(a => a.player === hero);
    const voluntaryAction = preflopActions.find(a => ['calls','bets','raises'].includes(a.type));
    if (voluntaryAction) vpipCount++;

    // PFR: hero raised preflop
    if (preflopActions.find(a => a.type === 'raises')) pfrCount++;

    // Profit/loss: hero collected minus posted blinds minus calls/bets
    const heroWon = hand.winners.find(w => w.name === hero);
    const heroWonAmt = heroWon ? heroWon.amount : 0;

    // Approximate invested
    let invested = 0;
    for (const street of ['preflop','flop','turn','river']) {
      for (const a of hand.streets[street]) {
        if (a.player === hero && ['calls','bets','raises'].includes(a.type)) {
          invested += a.amount;
        }
      }
    }
    // Blinds posted
    if (hand.smallBlind === hero) invested += bb / 2;
    if (hand.bigBlind === hero) invested += bb;

    const net = heroWonAmt - invested;
    totalProfit += net;

    if (!biggestWin || net > biggestWin.net) biggestWin = { hand, net };
    if (!biggestLoss || net < biggestLoss.net) biggestLoss = { hand, net };
  }

  const vpip = heroHands ? Math.round((vpipCount / heroHands) * 100) : 0;
  const pfr = heroHands ? Math.round((pfrCount / heroHands) * 100) : 0;

  return {
    hero, stakes, handsPlayed, heroHands,
    totalProfit: totalProfit.toFixed(2),
    totalProfitBB: (totalProfit / bb).toFixed(1),
    bbPer100: heroHands ? ((totalProfit / bb / heroHands) * 100).toFixed(1) : '0',
    vpip, pfr,
    biggestWin, biggestLoss,
    bb,
  };
}

// \u2500\u2500\u2500 KEY HANDS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

function getKeyHands(hands, n = 5) {
  return [...hands]
    .filter(h => h.pot > 0)
    .sort((a, b) => b.pot - a.pot)
    .slice(0, n);
}

function describeHand(hand) {
  const board = [
    ...hand.board.flop,
    ...(hand.board.turn ? [hand.board.turn] : []),
    ...(hand.board.river ? [hand.board.river] : []),
  ].join(' ');

  const allActions = [
    ...hand.streets.preflop,
    ...hand.streets.flop,
    ...hand.streets.turn,
    ...hand.streets.river,
  ];
  const raises = allActions.filter(a => a.type === 'raises');
  const bigRaise = raises.length ? raises.reduce((mx, a) => a.amount > mx.amount ? a : mx, raises[0]) : null;
  const winner = hand.winners[0];
  const heroPlayer = hand.players.find(p => p.name === hand.hero);
  const heroCards = heroPlayer?.cards?.join(' ') || '';

  let desc = `**Hand #${hand.id}** \u2014 Pot: $${hand.pot} | Stakes: ${hand.stakes}`;
  if (board) desc += ` | Board: ${board}`;
  if (heroCards) desc += ` | Hero held: ${heroCards}`;
  if (bigRaise) desc += `\n\nKey action: **${bigRaise.player}** raised to **$${bigRaise.amount}**.`;
  if (winner) desc += ` The pot of **$${hand.pot}** was taken down by **${winner.name}**.`;
  return desc;
}

// \u2500\u2500\u2500 BLOG POST GENERATOR \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

function generateBlogPost(hands, stats, replayerHtml) {
  const today = new Date().toISOString().split('T')[0];
  const keyHands = getKeyHands(hands);

  const frontMatter = `---
layout: post
title: "Poker Session Review \u2014 ${today}"
date: ${today}
parent: Session Reviews
nav_order: 1
description: "ACR 6-max cash session \u2014 ${stats?.handsPlayed || 0} hands at ${stats?.stakes || 'Unknown'}"
tags: [poker, cash-game, ACR, session-review]
---

# Session Review \u2014 ${today}
{: .no_toc }

<details open markdown="block">
  <summary>Table of contents</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---
`;

  const statsSection = stats ? `## Session Stats

| Stat | Value |
|:-----|------:|
| Stakes | ${stats.stakes} |
| Hands Played | ${stats.handsPlayed} |
| Net Profit/Loss | $${stats.totalProfit} (${stats.totalProfitBB} BB) |
| BB/100 | ${stats.bbPer100} |
| VPIP | ${stats.vpip}% |
| PFR | ${stats.pfr}% |

${parseFloat(stats.totalProfit) >= 0
  ? `> \u2705 **Winning session** \u2014 +$${stats.totalProfit} (+${stats.totalProfitBB} BB)`
  : `> \ud83d\udd34 **Losing session** \u2014 $${stats.totalProfit} (${stats.totalProfitBB} BB)`
}

---
` : '';

  const biggestWinSection = stats?.biggestWin?.net > 0 ? `### Biggest Win

${describeHand(stats.biggestWin.hand)}

**Net: +$${stats.biggestWin.net.toFixed(2)}**

---
` : '';

  const biggestLossSection = stats?.biggestLoss?.net < 0 ? `### Biggest Loss

${describeHand(stats.biggestLoss.hand)}

**Net: $${stats.biggestLoss.net.toFixed(2)}**

---
` : '';

  const keyHandsSection = `## Key Hands

${keyHands.map((h, i) => `### Hand ${i + 1} of ${keyHands.length}

${describeHand(h)}
`).join('\n')}

---
`;

  const replayerSection = `## Interactive Hand Replayer

The replayer below contains all ${hands.length} hands from this session. Use the controls to step through each hand or let it play automatically.

<div class="poker-replayer-wrapper" style="border-radius:8px;overflow:hidden;border:1px solid var(--border-color, #e0e0e0);margin:1.5rem 0;">
${replayerHtml}
</div>

---
`;

  const notesSection = `## Session Notes

*Add your notes, reads, and reflections here.*

- 
- 
- 

`;

  return frontMatter + statsSection + biggestWinSection + biggestLossSection + keyHandsSection + replayerSection + notesSection;
}

// \u2500\u2500\u2500 SELF-CONTAINED REPLAYER HTML \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

function buildReplayerHtml(hands) {
  const handsJson = JSON.stringify(hands.map(h => ({
    id: h.id, stakes: h.stakes, table: h.table, date: h.date,
    hero: h.hero, button: h.button,
    players: h.players,
    streets: h.streets,
    board: h.board,
    pot: h.pot,
    winners: h.winners,
  })));

  return `<iframe
  srcdoc="${encodeReplayerSrcdoc(handsJson)}"
  style="width:100%;height:560px;border:none;display:block;"
  title="Poker Hand Replayer"
></iframe>`;
}

function encodeReplayerSrcdoc(handsJson) {
  // We'll build the full self-contained HTML and base64-encode it for the srcdoc attribute
  const html = buildStandaloneHtml(handsJson);
  // Escape for attribute embedding
  return html
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildStandaloneHtml(handsJson) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Poker Replayer</title>
<style>
*{box-sizing:border-box;margin
