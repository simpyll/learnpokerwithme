---
title: 1.2.2 The Expected Value (EV) Equation
parent: Curriculum
nav_order: 4
---
## The Expected Value (EV) Equation

### I. Mathematical Formulation
The formula below calculates the expected value of a calling action at a terminal game tree node where fold equity equals zero. The calculation for this binary outcome is expressed as:
$$EV = (E \times P) - ((1 - E) \times B)$$

### II. Component Variables
The variables within the equation isolate the discrete mathematical parameters of a static risk-reward decision within a 6-Max No Limit Hold'em framework.
* **$E$ (Equity):** The exact statistical probability of achieving the winning hand combination at the showdown node, expressed as a coefficient between $0.0$ and $1.0$.
* **$P$ (Reward/Pot):** The total aggregate chip value currently in the pot prior to the operator's call, inclusive of all previous street action and the opponent's pending wager.
* **$(1 - E)$:** The inverse probability coefficient, representing the statistical frequency of an opponent holding superior equity at the showdown node.
* **$B$ (Risk/Bet):** The precise capital outlay required by the operator to match the opponent's wager and actualize the showdown.

### III. Strategic Application and Break-Even Derivation
The primary utility of this binary equation is the algorithmic isolation of the break-even threshold against an opponent's betting range. By establishing the $EV$ value at zero, the formula can be algebraically restructured to derive the minimum equity required ($E_{req}$) to execute a mathematically neutral or profitable calling action. The formula is restructured as:
$$E_{req} = \frac{B}{P + B}$$
When the operator's calculated actual equity ($E$) exceeds the required equity ($E_{req}$), the calling action generates a positive expected value (+EV). When $E$ is strictly less than $E_{req}$, the calling action yields a negative expected value (-EV), mathematically mandating a localized folding frequency of 100% under equilibrium conditions.
