---
parent: Part 1 - Epistemology & Quantitative Foundations
title: 1.3.4 Standard Deviation Risk of Ruin & Kelly Criterion
nav_order: 8
---

# Standard Deviation, Risk of Ruin, and Kelly Criterion Applications

## I. Standard Deviation ($$\sigma$$) and Variance Modeling
Variance defines the localized dispersion of short-term financial outcomes from the established mathematical Expected Value. Standard deviation ($$\sigma$$) serves as the primary quantitative metric for evaluating this variance, typically expressed in big blinds per 100 hands (bb/100). In 6-Max No Limit Hold'em, the structural standard deviation generally oscillates between 80 bb/100 and 120 bb/100, dictated by the operator's specific sub-strategic parameters (e.g., aggression frequencies, 3-bet volumes, and standard geometric sizings).



The Standard Error ($$SE$$) over a given sample size ($$N$$, calculated in blocks of 100 hands) is formulated as:
$$SE=\frac{\sigma}{\sqrt{N}}$$

**Example:**
An operator possesses a theoretical win rate ($$W$$) of 5 bb/100 and a standard deviation ($$\sigma$$) of 100 bb/100. Over a sample of 10,000 hands ($$N=100$$blocks), the Standard Error is$$\frac{100}{\sqrt{100}}=10$$ bb/100. Applying a 95% confidence interval ($$\approx2\sigma$$), the operator's actual realized win rate will statistically fall between -15 bb/100 and +25 bb/100. This mathematical proof demonstrates that a statistically winning operator will routinely experience negative capital generation over 10,000-hand intervals.

## II. Risk of Ruin (RoR) Probability Models
Risk of Ruin denotes the mathematical probability of an operator depleting their entire capital reserve before reaching either an infinite sample size or a predefined financial objective. The baseline RoR calculation requires the synthesis of the operator's win rate ($$W$$), standard deviation ($$\sigma$$), and total bankroll size ($$B$$, expressed in big blinds).
$$RoR=e^{\frac{-2\cdot{W}\cdot{B}}{\sigma^2}}$$

**Example:**
An operator allocates a bankroll ($$B$$) of 2,000 big blinds (20 standard 100bb buy-ins) to a specific stake level. The operator maintains a win rate ($$W$$) of 5 bb/100 with a standard deviation ($$\sigma$$) of 100 bb/100.
$$RoR=e^{\frac{-2\cdot5\cdot2000}{100^2}}$$
$$RoR=e^{-2}\approx0.1353$$
The mathematical Risk of Ruin is 13.53%. To achieve an RoR of $$<1\%$$, the operator must structurally increase the $$B$$variable to mathematically absorb the localized variance defined by the$$\sigma^2$$ coefficient.

## III. The Kelly Criterion and Fractional Allocation
The Kelly Criterion is an algorithmic formula utilized to determine the mathematically optimal capital allocation to maximize the logarithmic growth rate of a bankroll while eliminating absolute Risk of Ruin. 

Because No Limit Hold'em does not feature binary win/loss outcomes with static probabilities, a continuous approximation is applied, establishing the optimal fraction of the bankroll ($$f$$) to risk on a single event:
$$f=\frac{W}{\sigma^2}$$

**Example:**
Utilizing the standard operator parameters ($$W=5$$, $$\sigma=100$$):
$$f=\frac{5}{10000}=0.0005$$
Full Kelly dictates risking exactly 0.5% of the total bankroll at any given moment. A standard 100bb buy-in under this strict mathematical model requires a bankroll of 20,000 big blinds (200 buy-ins). Because the strict Kelly formulation generates extreme absolute variance in localized capital, poker strategy utilizes Fractional Kelly multipliers (e.g., Half-Kelly or Quarter-Kelly) to further suppress the volatility curve and mitigate psychological degradation.

## IV. Capital Allocation Matrix (Variance and Bankroll Parameters)
The following matrix calculates the required capital reserves (expressed in standard 100bb buy-ins) necessary to limit the absolute Risk of Ruin to less than 1.0%, given specific win rate and standard deviation profiles.

| Win Rate ($$W$$) | Standard Deviation ($$\sigma$$) | Required Bankroll for $$<1\%$$ RoR | Bankroll in 100bb Buy-ins | Fractional Kelly Equivalent |
| :--- | :--- | :--- | :--- | :--- |
| 2.5 bb/100 | 80 bb/100 (Low Variance) | $$\approx 5,894$$bb |$$\approx 59$$ Buy-ins | Quarter-Kelly |
| 2.5 bb/100 | 120 bb/100 (High Variance) | $$\approx 13,261$$bb |$$\approx 133$$ Buy-ins | Eighth-Kelly |
| 5.0 bb/100 | 80 bb/100 (Low Variance) | $$\approx 2,947$$bb |$$\approx 30$$ Buy-ins | Half-Kelly |
| 5.0 bb/100 | 120 bb/100 (High Variance) | $$\approx 6,631$$bb |$$\approx 67$$ Buy-ins | Quarter-Kelly |
| 10.0 bb/100 | 80 bb/100 (Low Variance) | $$\approx 1,473$$bb |$$\approx 15$$ Buy-ins | Full Kelly |
| 10.0 bb/100 | 120 bb/100 (High Variance) | $$\approx 3,315$$bb |$$\approx 34$$ Buy-ins | Half-Kelly |
