---
parent: Part 2 - Preflop Architecture
title: 2.2.1 Range Construction and Precise Frequency Targets
nav_order: 5
---

# Range Construction and Precise Frequency Targets for Each Seat

## I. Theoretical Basis of RFI Construction
The Raise First In (RFI) node represents the initial active divergence in the preflop game tree. Constructing an unexploitable RFI strategy requires calculating the precise equilibrium between capital risk, fold equity, and positional disadvantage. A mathematically sound RFI matrix guarantees that the aggregate expected value of the opening action strictly exceeds the expected value of folding ($EV_{RFI} > 0$). Range construction utilizes a top-down combinatoric assembly, establishing the absolute nuts (AA, KK) as the baseline and expanding downward until the marginal profitability threshold ($EV \approx 0$) is intersected for a specific positional alignment.

## II. Positional Combinatoric Distribution
The expansion of an RFI range is strictly governed by the volume of unseen actors remaining in the decision matrix. 

* **Early Position (Linear Construction):** UTG and HJ ranges demand linear topology. Due to the high probability of encountering premium holdings among the remaining actors, early position matrices prioritize raw showdown equity and structural robustness. The inclusion of high-card value (e.g., AKo, AQo, KQs) is mandatory, while speculative matrices (e.g., low suited connectors, uncoordinated broadways) are algorithmically excluded due to severe Realized Equity ($EQR$) deficits out of position.
* **Late Position (Elastic Construction):** CO and BU ranges introduce elasticity. As the threat of unseen premium holdings diminishes, the RFI matrix expands to incorporate high-playability topologies and blocker-reliant bluffs (e.g., A2s-A5s, suited connectors, offsuit broadways). The structural objective shifts from pure value extraction to the aggressive accumulation of dead money (the blinds) via maximized fold equity.



## III. The Expected Value of Opening
The mathematical viability of a specific starting hand at the RFI node is evaluated by its aggregate expectation against the collective responses of all remaining operators.
$$EV_{RFI} = (F_{freq} \cdot P) + (C_{freq} \cdot EV_{post}) + (R_{freq} \cdot EV_{def})$$
Where $F_{freq}$ is the cumulative probability all remaining players fold, $P$ is the dead money in the pot, $C_{freq}$ is the probability of being called, $EV_{post}$ is the projected post-flop equity realization, $R_{freq}$ is the probability of facing a 3-bet, and $EV_{def}$ is the expected value of the operator's defense against that 3-bet. Matrices are added to the RFI range strictly until the result of this calculation reaches zero.

## IV. Standardized RFI Frequency Matrix
The following matrix quantifies the mathematically derived combinatoric frequencies and topological requirements for unexploitable RFI execution across all 6-Max seats in a standardized, low-rake equilibrium.

| Positional Designation | Precise Frequency Target | Total Combinations | Core Matrix Composition | Structural Threshold (Bottom Tier) |
| :--- | :--- | :--- | :--- | :--- |
| UTG (Under-The-Gun) | 16.5% | $\approx 218$ | $77+$, $ATs+$, $KTs+$, $QTs+$, $JTs$, $AQo+$ | $55-66$, $A4s-A5s$, $87s$, $AJo$ |
| HJ (Hijack) | 21.0% | $\approx 278$ | $55+$, $A2s+$, $K9s+$, $Q9s+$, $J9s+$, $AJo+$ | $44$, $A8o-ATo$, $KJo$, $76s$ |
| CO (Cutoff) | 29.5% | $\approx 391$ | $22+$, $A2s+$, $K5s+$, $Q8s+$, $J8s+$, $ATo+$, $KTo+$ | $KTo$, $QTo$, $JTo$, $54s$, $A5o$ |
| BU (Button) | 43.0% | $\approx 570$ | $22+$, $A2s+$, $K2s+$, $Q2s+$, $J5s+$, $A2o+$, $K8o+$ | $K2o-K7o$, $Q8o$, $J8o$, $T7s$, $43s$ |
| SB (Small Blind) | 46.5% | $\approx 616$ | $22+$, $A2s+$, $K2s+$, $Q2s+$, $J4s+$, $A2o+$, $K8o+$ | Mixed strategies utilizing limps for bottom 15% of range. |
