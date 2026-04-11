---
parent: Curriculum
title: 1.2.3 Evaluating EV for Multiple Lines - Fold Call & Raise
nav_order: 5
---

# Evaluating Multiple Lines: EV of Fold vs. Call vs. Raise

## I. The Mathematical Baseline: EV of Folding ($EV_{fold}$)
Within decision theory applied to No Limit Hold'em, the action of folding constitutes a terminal node that mathematically yields an Expected Value of exactly zero. 
$$EV_{fold} = 0$$
This valuation is absolute because all capital previously committed to the pot by the operator is classified as a sunk cost. The $EV_{fold}$ serves as the quantitative baseline against which the expected value of all subsequent aggressive or passive actions must be measured. Any line producing an $EV < 0$ mathematically dictates a 100% folding frequency under Game Theory Optimal (GTO) equilibrium.

## II. The Passive Line: EV of Calling ($EV_{call}$)
The evaluation of a calling action requires calculating the mathematical yield of a localized, binary terminal node assuming no further betting streets exist. The expected value of a call relies entirely on showdown equity and pot odds.
$$EV_{call} = (E \cdot P) - ((1 - E) \cdot B)$$
Where $E$ represents the operator's statistical equity against the opponent's distribution, $P$ is the aggregate pot size prior to the call, and $B$ is the capital required to execute the call. The passive line is statistically viable strictly when $EV_{call} > EV_{fold}$. 

## III. The Aggressive Line: EV of Raising ($EV_{raise}$)
The calculation for raising introduces a structural bifurcation of the game tree, necessitating the synthesis of both Pot Equity ($E$) and Fold Equity ($FE$). The formula must account for the probability that the aggressive action terminates the hand immediately versus the probability that the opponent continues.



The foundational calculation for an aggressive action is expressed as:
$$EV_{raise} = (FE \cdot P_{current}) + (1 - FE) \cdot EV_{showdown}$$
Where $FE$ is the statistical frequency at which the opponent folds, $P_{current}$ is the immediate dead money in the pot, and $EV_{showdown}$ is the mathematical expectation when the opponent calls the raise. The $EV_{showdown}$ variable itself expands into:
$$EV_{showdown} = (E_{raise} \cdot P_{final}) - ((1 - E_{raise}) \cdot B_{total})$$
The aggressive line inherently carries a higher variance profile and requires a higher capital risk ($B_{total}$) but is mathematically optimal when the generated Fold Equity sufficiently offsets a deficit in raw Pot Equity.

## IV. Comparative Line Selection and Maximum Utility
The central theorem of poker decision theory dictates that the operator must systematically evaluate all available nodes and execute the action that yields the highest absolute mathematical expectation. 
$$\max(EV_{fold}, EV_{call}, EV_{raise})$$
In scenarios where the game tree presents multiple +EV options (e.g., $EV_{call} = +2.5$ bb and $EV_{raise} = +4.1$ bb), the operator must execute the maximum utility line ($EV_{raise}$) despite the calling line also generating a positive theoretical yield. Under strict solver equilibrium, when two divergent lines generate an identical expected value ($EV_{call} = EV_{raise}$), the node is classified as indifferent, requiring the execution of a mixed strategy utilizing randomized frequencies to remain unexploitable.
