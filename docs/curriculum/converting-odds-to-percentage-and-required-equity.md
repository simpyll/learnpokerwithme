---
parent: Curriculum
title: 1.3.2 Converting Odds to Percent & Required Equity
nav_order: 6
---
# Converting Odds to Percentages and Required Equity

## I. Mathematical Framework of Odds and Probabilities
Within the localized game tree, quantitative risk assessment requires translating ratio-based odds into absolute probability percentages.
* **Odds Expression:** Ratios denoting the relationship between unfavorable outcomes and favorable outcomes, typically expressed as Reward:Risk.
* **Percentage Conversion:** The mathematical translation of this ratio into a required frequency. The foundational conversion formula is:
  $$E=\frac{X}{X+Y}$$
  where $$E$$represents the percentage,$$X$$is the risk component, and$$Y$$ is the reward component.

## II. Pot Odds and Required Equity
Pot odds define the specific financial ratio presented by an opponent's wager relative to the existing dead money. Required equity ($$E_{req}$$) is the minimum statistical probability of winning at showdown necessary to neutralize the expected value of a calling action, establishing the break-even threshold.
$$E_{req}=\frac{B}{P+B}$$
Where $$B$$is the absolute value of the capital required to call, and$$P$$ is the aggregate pot size prior to the call (inclusive of all previous street action and the opponent's current wager).

## III. Implied Odds and Equity Discounting
When subsequent betting streets remain active, the static required equity calculation must be adjusted for implied odds, which represent the projected future capital extracted when a drawing hand achieves its terminal condition.
$$E_{implied}=\frac{B}{P+B+F}$$
Where $$F$$ represents the estimated future capital contributed by the opponent on later streets. This variable inversely scales the required equity, mathematically permitting a profitable calling action with raw equity that falls below the static break-even threshold.



## IV. Standardized Conversion Matrix
The following matrix quantifies the relationship between standard bet sizings, the generated pot odds, and the exact required equity thresholds for the defending operator.

| Opponent Bet Size | Ratio of Pot | Pot Odds (Reward:Risk) | Required Equity |
| :--- | :--- | :--- | :--- |
| 25% Pot | 1/4 | 5:1 | 16.67% |
| 33% Pot | 1/3 | 4:1 | 20.00% |
| 50% Pot | 1/2 | 3:1 | 25.00% |
| 66% Pot | 2/3 | 2.5:1 | 28.57% |
| 75% Pot | 3/4 | 2.33:1 | 30.00% |
| 100% Pot | 1/1 | 2:1 | 33.33% |
| 150% Pot (Overbet) | 1.5/1 | 1.67:1 | 37.50% |
| 200% Pot (Overbet) | 2/1 | 1.5:1 | 40.00% |
