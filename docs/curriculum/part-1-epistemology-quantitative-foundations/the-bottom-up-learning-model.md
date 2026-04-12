---
title: 1.1.1 Pokers Bottom-Up Learning Model
parent: Part 1 - Epistemology & Quantitative Foundations
nav_order: 1
---

## The Bottom-Up Learning Model
### I. Theoretical Framework
The Bottom-Up Learning Model is a structured pedagogical heuristic applied to poker theory. The paradigm dictates the sequential mastery of fixed, high-frequency variables at the root nodes of the game tree prior to the synthesis of exponentially branching permutations inherent in multi-street post-flop scenarios.
### II. Core Mechanics (Root Node Optimization)
The foundational tier isolates static, mathematically derived parameters necessary for executing early-stage actions.
 * **Preflop Range Construction:** Implementation of static positional ranges across the Lowjack, Hijack, Cutoff, Button, Small Blind, and Big Blind, establishing specific Raise First In (RFI), 3-bet, 4-bet, and defensive calling distributions.
 * **Combinatorics:** Calculation of hand combinations, evaluating the restrictive effect of blockers and the permissive effect of unblockers on opponent ranges.
 * **Pot Mathematics:** Execution of discrete formulas for Expected Value (EV), pot odds, implied odds, and break-even equity.
### III. Intermediate Synthesis (Primary Branching)
The secondary tier integrates dynamic variables to construct single-street heuristics and structural baselines.
 * **Flop Texture Categorization:** Algorithmic classification of board states (e.g., static, dynamic, paired, monotone) to dictate Continuation Bet (C-bet) frequencies and sizing schema.
 * **Range and Nut Advantages:** Comparative analysis of positional range morphologies to calculate the statistical ownership and asymmetry of equity on specific board textures.
 * **Minimum Defense Frequency (MDF):** Calculation of mathematically unexploitable calling and raising thresholds to defend against polarized betting actions based on the ratio of the initial pot size to the aggregate size of the pot and the facing bet.
### IV. Complex Game Trees (Terminal Node Navigation)
The terminal tier necessitates the synthesis of core and intermediate mechanics to navigate solver-mapped, multi-street decision algorithms.
 * **Geometric Bet Sizing:** Structuring multi-street bet sizes to achieve maximum value extraction or bluff efficiency by targeting specific stack-to-pot ratios (SPR) by the final betting street.
 * **Equilibrium Implementation:** Execution of Game Theory Optimal (GTO) strategies, necessitating the utilization of mixed strategy frequencies for node-indifferent hand classes.
 * **Node Locking:** Systematic deviation from the theoretical baseline. The operator inputs altered parameters regarding an opponent's localized decision threshold (e.g., an over-folding frequency at a specific turn node) to generate an exploitative counter-strategy that extracts maximal utility beyond equilibrium boundaries.
