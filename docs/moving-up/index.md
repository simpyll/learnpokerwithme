---
title: Moving Up
nav_order: 1
---

**Stake Progression Protocol in 6-Max No-Limit Hold'em: 2NL Baseline to Advanced Limits**

**1. Bankroll Management and Risk of Ruin**
Ascension through No-Limit Hold'em (NLHE) cash game stakes requires a mathematically sound bankroll management (BRM) protocol to mitigate the risk of ruin associated with standard deviation in win rates. 
* **Ascension Threshold:** Advancement to the next limit requires a minimum of 30 to 40 buy-ins (BI) for the target stake.
* **Descension (Stop-Loss) Threshold:** A mandatory drop to the previous limit is executed if the bankroll falls below 20 BI of the current stake.
* **Shot-Taking Protocol:** Aggressive progression models allow allocating 2 to 3 BI of the target stake when the primary bankroll reaches 25 BI of the target limit, strictly reverting to the baseline stake if the allocated shot-taking BI are lost.

**2. Statistical Verification of Win Rate**
Validation of skill advantage over the player pool requires a statistically significant hand sample to isolate expected value (EV) from variance.
* **Sample Size Requirements:** A minimum of 50,000 hands is required to establish a preliminary win rate, expressed in big blinds per 100 hands (bb/100). True win rate convergence necessitates ≥100,000 hands.
* **Progression Metric:** A sustained, positive expected value (EV bb/100) of ≥5 bb/100 over 50,000 hands at the current limit indicates sufficient edge to initiate stake ascension.

**3. 2NL ($0.01/$0.02) Strategic Baseline**
The 2NL limit serves as the foundational testing environment. Game theory optimal (GTO) frequencies are secondary to maximal exploitative deviations (MED) at this limit due to the highly unbalanced tendencies of the player pool.
* **Preflop Strategy:** Implementation of strict, unexploitable opening ranges. Emphasis is placed on linear 3-betting and a low frequency of light 3-bets or 4-bets.
* **Postflop Exploitation:** The primary node of expected value generation relies on over-folding to aggression, exploiting the under-bluffing frequencies prevalent in the micro-stakes population, and over-betting value hands against inelastic calling ranges.

**4. Limit Ascension Dynamics and Theoretical Adaptation**
Progression from 2NL through subsequent limits (5NL, 10NL, 25NL, 50NL, 100NL) requires sequential integration of balanced theoretical constructs.
* **Micro to Low Stakes (2NL to 25NL):** Transition from pure exploitative play to fundamental GTO awareness. Focus parameters shift to defending wider ranges from the big blind against steals and implementing balanced continuation betting (c-bet) frequencies across various board textures.
* **Low to Mid Stakes (50NL to 200NL):** Player pools exhibit increased aggression factors and elevated 3-bet/4-bet frequencies. Sustained win rates depend on constructing robust defending ranges, understanding mixed-frequency nodes, and executing advanced postflop heuristics, such as check-raising with polarized ranges.
* **Variance Amplification:** As the absolute win rate (bb/100) decreases at higher stakes due to reduced skill disparities, standard deviation increases relative to the win rate. This mathematical reality necessitates larger bankroll requirements (50-100 BI) at advanced limits to maintain an acceptable risk of ruin.
