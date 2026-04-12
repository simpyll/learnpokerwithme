---
parent: Curriculum
title: 1.4.1 Minimum Defense Frequency (MDF)
nav_order: 11
---

# Minimum Defense Frequency (MDF)

## I. Theoretical Definition
Minimum Defense Frequency (MDF) designates the precise mathematical threshold at which a defending operator must continue in a hand (via calling or raising) to prevent an aggressive opponent from generating a positive Expected Value (+EV) by bluffing with a 100% frequency. Adhering to MDF establishes an unexploitable baseline, mathematically neutralizing the profitability of an opponent's zero-equity bluffs.

## II. Mathematical Formulation
The baseline MDF calculation requires the synthesis of the aggregate pot size prior to the wager and the absolute value of the opponent's wager. The foundational equation is expressed as:
$$MDF = \frac{P}{P + B}$$
Where $$P$$represents the total aggregate chip value in the pot prior to the bet, and$$B$$ represents the absolute value of the capital wagered by the opponent. The resulting decimal is multiplied by 100 to yield the minimum required continuation percentage.

## III. The Alpha ($$\alpha$$) Relationship
MDF is fundamentally linked to the aggressive operator's risk-to-reward ratio, commonly denoted as Alpha ($$\alpha$$). Alpha represents the required fold equity (break-even bluffing success rate) for the aggressor's wager to yield a neutral expected value ($$EV = 0$$).
$$\alpha = \frac{B}{P + B}$$
Consequently, the minimum defense frequency is the strict inverse of Alpha:
$$MDF = 1 - \alpha$$



## IV. Operational Example
An aggressive operator wagers a half-pot sizing. The aggregate pot ($$P$$) is 10 big blinds, and the wager ($$B$$) is 5 big blinds.
$$MDF = \frac{10}{10 + 5}$$
$$MDF = \frac{10}{15} \approx 0.6667$$
To remain mathematically unexploitable against this specific geometric sizing, the defending operator must continue with at least 66.67% of their defined range at that specific game tree node.

## V. Standardized MDF Matrix
The following matrix quantifies the exact Alpha ($$\alpha$$) and Minimum Defense Frequency (MDF) thresholds corresponding to standard geometric bet sizings utilized in 6-Max No Limit Hold'em.

| Opponent Bet Size | Ratio of Pot | Aggressor Risk:Reward | Alpha ($$\alpha$$) (Break-Even Bluff %) | MDF (Required Defense %) |
| :--- | :--- | :--- | :--- | :--- |
| 25% Pot | 1/4 | 1:4 | 20.00% | 80.00% |
| 33% Pot | 1/3 | 1:3 | 25.00% | 75.00% |
| 50% Pot | 1/2 | 1:2 | 33.33% | 66.67% |
| 66% Pot | 2/3 | 2:3 | 40.00% | 60.00% |
| 75% Pot | 3/4 | 3:4 | 42.85% | 57.15% |
| 100% Pot | 1/1 | 1:1 | 50.00% | 50.00% |
| 150% Pot | 1.5/1 | 1.5:1 | 60.00% | 40.00% |
| 200% Pot | 2/1 | 2:1 | 66.67% | 33.33% |
