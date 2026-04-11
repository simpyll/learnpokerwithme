---
title: Curriculum
nav_order: 1
---
# 6-Max No-Limit Hold'em Cash Game Curriculum

## Part 1: Epistemology & Quantitative Foundations

### 1.1 The Learning Model
- The Bottom-Up Learning Model: Building from core mechanics to complex trees.
- The Three Aspects of Poker Success: Technical skill, mental game, and bankroll management.

### 1.2 Expected Value (EV) and Decision Theory
- EV: The primary currency of poker decision-making.
- The EV Equation: EV = (Equity × Pot) - ((1 - Equity) × Bet).
- Evaluating multiple lines (EV of Fold vs. Call vs. Raise).

### 1.3 Probability, Equity, and Variance
- The Rule of 2 and 4 (and statistical deviations).
- Converting odds to percentages and required equity.
- Implied Odds vs. Reverse Implied Odds.
- Standard Deviation, Risk of Ruin, and Kelly Criterion applications.
- Realized Equity (EQR): The gap between Raw Equity and EV. Factors that degrade EQR (Position, Playability, Multiway Dynamics, Opponent Aggression).

### 1.4 Pot Odds and Theoretical Defense
- Minimum Defense Frequency (MDF): MDF = Pot / (Pot + Bet).
- Alpha (Break-even Fold Percentage): α = Risk / (Risk + Reward).

### 1.5 Combinatorics and Card Removal
- Calculating hand combinations (Pairs, Suited, Offsuit).
- Using combos preflop (range construction) and postflop (hand reading).
- Blockers: Card removal effects on value betting and bluffing frequencies.
- Unblocking: Ensuring the opponent retains calling range combinations.
- Nut vs. Range Advantage Combinatorics: Calculating how many combos of the nuts a range contains vs. how many airballs.

## Part 2: Preflop Architecture

### 2.1 The 6-Handed Table and Positional Dynamics
- Rating starting hands: Equity distributions and playability metrics.
- The positional gradient: UTG, HJ, CO, BU, SB, and BB responsibilities.
- Rake Structure Impact: Detailed mapping of RFI ranges based on % of pot capped (High Rake 5%+ uncapped vs. Low Rake 3% capped).

### 2.2 Raise First In (RFI) Strategies
- Range construction and precise frequency targets for each seat.
- Rake-adjusted range compression: Tightening RFI and eliminating marginal flats in high-rake micro/low stakes environments.
- The "Micro Stakes" RFI Subset: Identifying hands that are +EV in solver land but -EV in reality due to high rake and poor fold equity.

### 2.3 Isolation (ISO) Raising vs. Limpers
- The ISO Triangle: Position, Fold Equity, and Frequent Strength.
- Sizing isolation raises based on position and limper tendencies.
- The theory of limping behind (over-limping) in passive dynamics.
- Post-Flop Limper Leaks: Targeting the "Fit-or-Fold" limper vs. the "Sticky" limper.

### 2.4 Calling Opens (Cold Calling)
- Mathematical and strategic reasons to call an open.
- Cold calling In Position (IP) vs. Out of Position (OOP).
- Blind vs. Blind calling strategies and equity realization constraints.

### 2.5 3-Betting Dynamics
- Polarized 3-betting (bluffs and premium value) vs. Linear 3-betting (top-down value).
- Squeezing: Exploiting multiple callers with adjusted sizing multipliers.
- 3-Bet sizing algorithms IP vs. OOP.
- The 3-Bet Bluff Checklist: Suited Aces, Suited Broadways, Low Pocket Pairs (Set Mining in 3BP). Fold Equity Calculation vs. Specific VPIP/PFR stats.
- Merged 3-Betting: Specific to SB vs. BU and specific high-stakes dynamics where linear ranges dominate.

### 2.6 Facing 3-Bets
- Flatting 3-bets: Constructing complete defense ranges.
- Preemptive adjustments and 4-betting (value and bluff ratios).
- Facing a squeeze as the original raiser vs. as the caller.
- Facing a 3-bet cold.
- The "4-Bet or Fold" Node: Why calling 3-bets OOP at micros is a massive redline leak and how to construct a rigid 4-bet/fold strategy from UTG/MP.

## Part 3: Postflop Value Betting & Sizing Mechanics

### 3.1 The Theory of the Value Bet
- Introducing the value bet: Extracting maximum EV from inferior ranges.
- Relative Hand Strength: Redefining "the nuts" based on board texture.

### 3.2 Pot Geometry and Execution
- Building the pot: Geometric sizing and Stack-to-Pot Ratio (SPR) manipulation.
- Slowplaying: Trapping thresholds based on board lock-down and opponent aggression.
- Geometric Growth of the Pot (GGOP): Calculating the exact flop/turn bet size required to set up a 100% pot River Jam. Formula: Flop Bet = (Target River Pot - Current Pot) / (Future Multiplier).

### 3.3 Sizing and Range Elasticity
- Thick vs. Thin value betting thresholds.
- Elastic ranges (opponent fold frequency scales with bet size) vs. Inelastic ranges (opponent call frequency is static regardless of size).
- Overbetting (150%+ pot) for maximum polarization.
- Solver-Derived Sizing Schemes: The 33% (Range), 66% (Polar), 125% (Nutted/Bluff) framework. Board Texture Binning: Using "Ace High Dry," "Two Broadways Wet," "Paired Low" as triggers for specific sizes.

## Part 4: Postflop Bluffing & Aggression

### 4.1 Continuation Betting (C-Betting) the Flop
- Light C-Bet Factors: Range advantage, nut advantage, and board texture.
- Sizing the C-Bet: Small sizing (25%-33%) for range bets vs. large sizing (66%-75%) for polarized advantage.

### 4.2 Turn and River Bluffing Mechanics
- Double Barrel Bluffing: Identifying turn cards that improve range equity or fold equity.
- Triple Barrel Bluffing: Executing maximum pressure on blank runouts.
- Delaying the C-Bet: Strengthening the checking range and inducing bluffs.

### 4.3 Out of Flow Aggression
- Probing the Turn: Betting OOP after the IP aggressor checks the flop.
- Bluff Raising the Turn and River: Leveraging blockers to force folds from capped value ranges.
- Dealing with and utilizing Donk Bets OOP.
- The Check-Raise Bluff Node: Deep dive on when to check-raise draws vs. when to call them. Polarized Turn Check-Raises (The "Line of Death" at low stakes).
- The Float Play: Floating OOP vs. Floating IP. The difference between floating with equity and "Stone Cold Floating" (high stakes meta).

## Part 5: Facing Bets & Defense Theory

### 5.1 The Two-Part Thought Process
- End of Action Spots: Closing the action (pure pot odds and MDF calculations).
- Open Action Spots: Calling with players left to act (implied odds and squeeze risks).

### 5.2 Defending the Flop and Turn
- Defending with Made-Hands: Vulnerability, protection, and check-raising.
- Defending with Non-Made-Hands: Drawing to the nuts, floating, and utilizing backdoor equity.
- Turn defense adjustments and assessing multiple barrels.

## Part 6: Multiway Pot Mastery

### 6.1 Equity Realization Collapse
- How raw equity drops exponentially with each additional caller.
- The Rule of Inverse Implied Odds: Why TPTK loses money multiway on wet boards.

### 6.2 Preflop Adjustments (The Gap Concept Revisited)
- Over-calling vs. Squeezing thresholds.
- Why suited connectors go *down* in value multiway at low SPR but *up* in value multiway at high SPR.

### 6.3 Postflop C-Betting Multiway
- The "Check-to-the-Raiser" Dynamic: Why checking range OOP in a 4-way pot is often higher EV than betting.
- Nut Advantage Scanning: Identifying when you have a monopoly on the nuts in a multiway pot.

### 6.4 Postflop Defense Multiway
- The Sandwich Effect: Defending from the middle position. Why MDF applies to the *collective* defense, not the individual. You fold *significantly* more in multiway nodes.

## Part 7: Complex Nodes & 3-Bet Pots

### 7.1 3-Bet Pot Dynamics
- Compressed SPR and its effect on commitment thresholds.
- C-Betting 3-Bet pots: Sizing down due to range density.
- The 1/3 Pot C-Bet Heuristic: Why this is the default size in 3-bet pots and how to defend against it.

### 7.2 Aggressor vs. Defender Strategy
- 3-Bet pots as the Aggressor: Navigating low-equity boards OOP.
- 3-Bet pots as the Defender: Float frequencies and check-raising against linear C-bets.
- Delayed C-Betting in 3BP: The "Check Flop, Bet Small Turn" line with medium-strength made hands.

## Part 8: River Play & The Final Decision Node

### 8.1 River Value Extraction
- Targeting Inelastic Ranges: Overbetting for 2x pot when villain's range is capped at Top Pair.
- Block Betting/Fishing: Using 10-20% pot bets to induce raises from busted draws or get crying calls from bottom pair.
- The "Bet/Fold" River Discipline: Identifying the Stack Depth Threshold where you are pot committed vs. when you can value bet and fold to a raise.

### 8.2 River Bluff Selection
- The Blocker Matrix: Which specific combos are mandatory bluffs?
- Population Read River Folds: Why bluffing missed straight draws on flush runouts is *printing* at 50NL but *lighting money on fire* at 500NL.

### 8.3 River Hero Calling
- The Concept of Minimum Defense Frequency (MDF) in Practice: Calculating the exact MDF requirement of your river range.
- Player Pool Timing Tells: The "Snap Jam" vs. "Time Bank Jam" heuristic.

## Part 9: Stack Depth Variables

### 9.1 Deep Stack Play (150bb - 300bb+)
- Pre-flop adjustments: Expanding implied odds hands (suited connectors, small pairs).
- Post-flop adjustments: Increased required equity for stacking off, managing reverse implied odds, and utilizing overbets.
- Reverse Implied Odds Analysis: Why 98s is great at 200bb, but KJo is a trap.
- The 3-Bet/4-Bet Cold War: Adjusting to opponents who are not folding to 4-bets.

### 9.2 Shallow Stack Play (40bb - 60bb)
- Pre-flop adjustments: Linearizing 3-bet ranges, reducing speculative flats, prioritizing high-card equity.
- Post-flop adjustments: Commitment on the flop, utilizing block bets to dictate showdown prices.
- Stop-and-Go: The Shallow Stacker's secret weapon (Call 3-bet pre, open jam flop).

## Part 10: Opponent Modeling & Database Utilization

### 10.1 HUD Statistics & Threshold Interrogation
- VPIP/PFR matrices and identifying the gap ratio.
- 3-Bet and Fold to 3-Bet frequencies (analyzing elasticity).
- Postflop indicators: Fold to Flop C-Bet, Turn AF/AFq, WTSD (Went to Showdown), W$SD (Won at Showdown).
- The "Fold to Probe Bet" Stat: The most underrated stat for 6max.
- Check-Raise Percentage by Street: Identifying the Nits who only raise the nuts vs. the LAGs who raise draws.

### 10.2 Player Archetypes and Exploitative Play
- Classifying nodes: The Maniac, The Calling Station, The Nit, The TAG/LAG.
- Node Locking: Deviating from GTO baselines to exploit unbalanced frequencies.
- The Reg (Regular): Differentiation between **GTO-Wannabe** (easy to run over on rivers) vs. **Table Captain** (needs immediate table change or 3-bet isolation).
- Population Tendencies by Stake:
  - 2NL-10NL: Under-bluffed rivers, Over-fold to 3-bets, Sticky postflop with Top Pair.
  - 25NL-50NL: Increased turn aggression, awareness of position, but predictable river sizing.
  - 100NL-200NL: Merged 3-betting IP, high frequency probing.
  - 500NL+: Overbetting frequencies normalize, GTO baseline required.

## Part 11: Hand Reading & Range Narrowing Process

### 11.1 The Preflop -> Flop Funnel
- Assigning a baseline opening range (VPIP).
- Removing combos based on Flop Action (Fold/Call/Raise).

### 11.2 The Turn Funnel
- Action-Based Deduction: What does a check-call on a brick turn mean for a capped range?
- Sizing Tells: Differentiating a weak blocker bet from a strong inducement bet based on sizing.

### 11.3 The River Categorization
- Categorizing opponent's remaining combos into: Nuts, Medium Value, Catcher, Air.
- The "Logic Check": Does this player's line make sense?

## Part 12: Mental Game & Professional Systems

### 12.1 Cognitive Optimization
- Cognition 101: System 1 (heuristic) vs. System 2 (analytical) thinking.
- The Tilt Taxonomy: Prevention, identification (the tilt log), and recovery.
- A-Game optimization and emotional numbing (variance detachment).
- Focus Cycling: 45-min deep work sprint -> 15-min database review -> Repeat. Avoiding the 6-hour "auto-pilot" doomscroll.
- Table Selection as a Skill: The Bumhunting Algorithm (How to find 2+ VPIP 40+ players quickly).

### 12.2 Professionalism and Discipline
- Embracing mistakes as data acquisition.
- Session length management and strict stop-loss/stop-win criteria.
- Bankroll Management Staking Plan: Differentiating a Conservative roll (100+ BI for 6max) vs. an Aggressive Shot-Taking roll (50 BI with strict stop-loss).
- The Stop-Loss Framework: "3 Buy-ins Down" vs. "EV Adjusted Down." When to quit based on mental fatigue, not just monetary loss.

## Part 13: Study Mechanics & Software Stack

### 13.1 Database and Hand Study
- Writing and saving hands for rigorous review.
- Utilizing PokerTracker 4 / Hold'em Manager 3 for leak detection (Red Line vs. Blue Line analysis).
- Node Locking in Database Review: How to adjust solver outputs to match the specific pool you are in.
- Redline Leak Detection: Is your non-showdown winnings negative because you c-bet too much or because you fold to probes too often?

### 13.2 Technical Analysis Tools
- Equity calculations: Flopzilla and Equilab.
- Tree building and EV analysis: CardRunners EV.
- Game Theory Optimal solvers: GTO+, PioSolver, and navigating multi-nodal outputs.
- Range Research & GTO Wizard: Understanding aggregate reports and "Simple" vs. "Complex" strategy implementation.
- The Aggregated Frequencies Chart: How to simplify a 5-size solver output into a 2-size human-executable strategy.

## Part 14: Heads-Up Play (HU) & Blind Defense Deep Dive

### 14.1 Blind vs. Blind (BvB) Dynamics
- Why BvB is the highest frequency and highest variance node in 6max.
- SB Limp Strategy: When to use a limping strategy vs. a raise-only strategy.
- BB Defense: Defending 60%+ of hands vs. SB open.

### 14.2 Postflop BvB
- The Overbet Node: Why BB overbets turn *so often* on Q-high or K-high boards.

## Part 15: Transitions & Stakes Migration

### 15.1 Moving from 10NL to 50NL
- Adjusting to Light 3-Betting.
- Recognizing and exploiting Reg-Induced Bet Sizing.

### 15.2 Moving from 100NL to 500NL
- Frequency Merging: Understanding when to use 33% sizing with the nuts to protect a wide range.
- Dealing with GTO Bots/RTA: Identifying suspicious bet timing and sizing patterns.
