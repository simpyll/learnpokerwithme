---
parent: Part 2 - Preflop Architecture
title: 2.2.2 Rake-Adjusted Range Compression
nav_order: 6
---

# Rake-Adjusted Range Compression: Tightening RFI and Eliminating Marginal Flats

## I. The Mathematical Friction of High Rake Environments
In micro and low-stakes environments, the structural rake exacts a disproportionate mathematical penalty on aggregate win rates. Because the cap (maximum rake taken) is frequently positioned at a high multiple of the big blind (e.g., 5% capped at 30bb-40bb), the vast majority of standard pots are fully raked. This structural friction forces a severe downward shift in the Expected Value ($$EV$$) of all matrices, requiring a fundamental deviation from zero-rake or low-rake Game Theory Optimal (GTO) baselines to prevent systematic capital degradation.

## II. Raise First In (RFI) Constriction Parameters
GTO RFI frequencies are calculated assuming the operator captures 100% of the aggregate pot when successfully realizing equity. Rake friction mathematically reduces the terminal reward ($$P$$), structurally altering the break-even threshold for preflop execution.
* **The Marginal Value Cliff:** Matrices that yield a marginally positive expectation in a frictionless environment (e.g., $$EV \approx +0.05bb$$) are instantly relegated to negative expectation ($$-EV$$) when subjected to a 5% tax on terminal nodes.
* **Algorithmic Truncation:** To offset rake friction, the operator must mathematically execute Range Compression. This requires excising the bottom 10% to 15% of a standardized zero-rake RFI matrix across all positions. Speculative topologies heavily reliant on post-flop realization (e.g., bottom-tier suited connectors, weak offsuit broadways, and low pocket pairs from early positions) must be converted to mandatory folds.



## III. The Eradication of Marginal Flat Calling
The implementation of the standard "no flop, no drop" parameter strictly governs the optimal defense against initial aggression.
* **The Penalty of Passive Defense:** Executing a flat call preflop guarantees the distribution of community cards, which mathematically guarantees the extraction of rake from the aggregate pot. Consequently, the raw equity required to justify a flat call must be algorithmically increased to compensate for the anticipated capital tax.
* **The "3-Bet or Fold" Equilibrium:** To circumvent rake extraction, the optimal strategy necessitates an extreme polarization of defensive actions. By converting marginal flat calls into aggressive 3-bets, the operator maximizes fold equity preflop. If the initial raiser folds, the operator secures the dead money ($$P$$) with zero structural rake applied. Flat calling is strictly reserved for a hyper-constricted matrix of premium holdings (e.g., trap lines with $$AA$$, $$KK$$) or specific positional dynamics (e.g., defending the Big Blind where sunk cost alters the pot odds).

## IV. Rake-Adjusted execution Matrix
The following matrix delineates the required structural deviations for RFI and flat calling parameters when transitioning from a frictionless solver baseline to a high-rake micro-stakes environment.

| Nodal Decision | Frictionless Baseline Execution | High-Rake Environmental Adjustment | Mathematical Rationale |
| :--- | :--- | :--- | :--- |
| UTG RFI | Open $22+$, $A2s+$, $ATo+$, $54s+$ | Constrict to $77+$, $ATs+$, $AQo+$; fold all suited connectors. | Marginal $EQR$ matrices cannot overcome both positional disadvantage and structural rake. |
| BU vs. CO Open | Mixed strategy: 3-bet premium/bluffs, flat call medium suited connectors/broadways. | Convert to strict 3-Bet or Fold. Eliminate flat calling entirely. | Flatting guarantees a raked pot; 3-betting maximizes unraked preflop terminal nodes. |
| SB vs. BU Open | Flat call high-equity broadways, 3-bet polarized matrix. | 100% 3-Bet or Fold parameter. | OOP disadvantage combined with guaranteed rake renders SB flatting structurally inviable. |
| BB Defense | Wide defense utilizing strict MDF principles; frequent calls with $QTo$, $K9o$, $74s$. | Constrict MDF parameters by 10-15%; fold marginal offsuit high cards and junk suited connectors. | Sunk cost ($1.0bb$) justifies defense, but required $EQR$ must be elevated to offset the post-flop tax. |
