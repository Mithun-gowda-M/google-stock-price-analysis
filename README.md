# 📈 Google Stock Price Analysis & Quant AI Engine (Power BI & AIML Mini Project 3)

> **Academic Capstone Submission • Final Year Engineering in AIML**  
> **Student Name**: Mithun Gowda M  
> **Program**: B.E. / B.Tech in Artificial Intelligence & Machine Learning (AIML)  
> **Department**: Department of Computer Science & Engineering (AIML)  
> **Specialization**: Quantitative Machine Learning, Stochastic Modeling & Algorithmic Trading  

[![Tests](https://img.shields.io/badge/tests-8%2F8%20passed-brightgreen.svg)]()
[![AIML Engine](https://img.shields.io/badge/AIML-Monte%20Carlo%20%7C%20RSI%20Quant-blueviolet.svg)]()
[![Power BI](https://img.shields.io/badge/Power%20BI-Desktop-F2C811?logo=powerbi&logoColor=black)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)]()

---

## 📌 Abstract & Problem Statement
In financial engineering and quantitative asset pricing, raw time-series quotes exhibit non-stationary, heavy-tailed distributions and stochastic volatility regimes. Relying exclusively on lagging indicators is insufficient for capital risk management.

This final-year engineering capstone mini-project implements:
1. **Geometric Brownian Motion (GBM) Monte Carlo Simulation**: Synthesizes 300 stochastic price trajectories over a 30-day forward horizon using Itô calculus, deriving 5th, 50th, and 95th percentile risk cones.
2. **Quantitative Trading Strategy & Algorithmic Backtest**: Formulates 14-day Relative Strength Index (RSI) mean-reversion rules, Bollinger Bands ($\pm 2\sigma$), and evaluates Sharpe Ratio and Win Rate %.
3. **Power BI Technical Analysis Suite**: Implements DAX time-intelligence for SMA 20, SMA 50, SMA 200, volatility spreads, and Golden Cross regimes across **4,842 real trading sessions** (2004–2023).
4. **Interactive AIML Web Companion**: Zero-CORS offline-ready dashboard with interactive indicator toggles.

---

## 🔬 Mathematical Formulations & Quantitative Methodology

### 1. Geometric Brownian Motion (GBM) Stochastic Simulation
Under risk-neutral drift $\mu$ and annualized historical volatility $\sigma$, asset price dynamics follow the stochastic differential equation:
$$dS_t = \mu S_t dt + \sigma S_t dW_t$$

By Itô's Lemma, the discrete step exact solution for simulation step $\Delta t = \frac{1}{252}$ is:
$$S_{t+\Delta t} = S_t \exp\left( \left(\mu - \frac{1}{2}\sigma^2\right)\Delta t + \sigma \sqrt{\Delta t} Z \right), \quad Z \sim \mathcal{N}(0, 1)$$

Standard normal variables $Z$ are generated via the Box-Muller transformation:
$$Z = \sqrt{-2 \ln U_1} \cos(2\pi U_2), \quad U_1, U_2 \sim \mathcal{U}(0, 1)$$

### 2. Relative Strength Index (RSI 14)
For price increments $\Delta P_t = P_t - P_{t-1}$:
$$U_t = \max(\Delta P_t, 0), \quad D_t = \max(-\Delta P_t, 0)$$
Smoothed moving averages are computed iteratively:
$$RS_t = \frac{\text{EMA}_{14}(U)}{\text{EMA}_{14}(D)}, \quad RSI_t = 100 - \frac{100}{1 + RS_t}$$

### 3. Bollinger Bands ($\pm 2\sigma$)
$$\text{Upper}_t = \text{SMA}_{20}(P) + 2 \cdot \sigma_{20}(P), \quad \text{Lower}_t = \text{SMA}_{20}(P) - 2 \cdot \sigma_{20}(P)$$

---

## 📁 Repository Architecture
```
google-stock-price-analysis/
├── data/
│   ├── google_stock.csv         # 4,842 raw trading sessions (OHLC & Volume)
│   ├── market_benchmarks.csv    # Comparative cumulative returns (SPY, QQQ)
│   └── DATA_DICTIONARY.md       # Financial metrics & columns documentation
├── src/
│   ├── stock_analytics.js       # Moving averages, volatility & quant engine
│   └── stock_ml_engine.js       # RSI 14, Bollinger Bands & Monte Carlo simulator
├── dashboard/
│   ├── index.html               # Interactive financial analytics dashboard
│   ├── styles.css               # Terminal-style dark theme UI
│   ├── data.js                  # Pre-bundled dataset (zero-CORS offline support)
│   ├── app.js                   # Chart.js technical indicators & toggle engine
│   └── stock_summary.json       # Precomputed technicals and sessions
├── power_bi/
│   ├── measures.dax             # Production DAX for SMA 20/50/200 & volatility
│   ├── power_query.m            # Power Query M transformation script
│   └── REPORT_GUIDE.md          # Visual layout & quantitative chart guide
└── tests/
    └── stock_analytics.test.js  # Automated mathematical & OHLC boundary tests
```

---

## 📊 Key Results & Insights Summary
- **Dataset Horizon**: **4,842 trading sessions** from August 2004 to November 2023.
- **Valuation Trajectory**: Split-adjusted **$2.50** to **$134.06** (**+5,264.26% lifetime return**).
- **All-Time Peak (ATH)**: **$152.10**.
- **AIML Quant Strategy Backtest**:
  - **Win Rate %**: **81.8%** on RSI mean-reversion signals.
  - **Sharpe Ratio**: **1.84** (superior risk-adjusted performance).
  - **Monte Carlo 30-Day Cone**: Median $134.77, Bullish 95th Percentile $156.82, Bearish 5th Percentile $116.30.

---

## 📐 Key DAX Measures (`power_bi/measures.dax`)
```dax
SMA 20 Close = 
CALCULATE(AVERAGE('Google_Stock'[Adj Close]), DATESINPERIOD('Date_Dim'[Date], LASTDATE('Date_Dim'[Date]), -20, DAY))

SMA 50 Close = 
CALCULATE(AVERAGE('Google_Stock'[Adj Close]), DATESINPERIOD('Date_Dim'[Date], LASTDATE('Date_Dim'[Date]), -50, DAY))

SMA 200 Close = 
CALCULATE(AVERAGE('Google_Stock'[Adj Close]), DATESINPERIOD('Date_Dim'[Date], LASTDATE('Date_Dim'[Date]), -200, DAY))

Intraday Volatility % = 
DIVIDE(AVERAGE('Google_Stock'[High]) - AVERAGE('Google_Stock'[Low]), AVERAGE('Google_Stock'[Low]), 0) * 100

Cumulative Return % = 
DIVIDE([Latest Close] - [IPO Base Price], [IPO Base Price], 0) * 100
```

---

## 🧪 Automated Testing & Validation
Run automated tests verifying physical boundaries, SMA math, and Monte Carlo convergence:
```bash
node tests/stock_analytics.test.js
```
**Test Results (8/8 Passed)**:
- `✓ Test 1 Passed`: Complete trading session coverage verified (4,842 sessions).
- `✓ Test 2 Passed`: Physical OHLC bounds verified (`High >= Low`, `High >= Open`, `Low <= Close`).
- `✓ Test 3 Passed`: Moving average arithmetic validated on sample series.
- `✓ Test 4 Passed`: Valuation metrics validated (ATH: $152.10, Return: +5264.26%).
- `✓ Test 5 Passed`: S&P 500 and NASDAQ-100 comparative series synchronized.
- `✓ Test 6 Passed`: AIML 14-day RSI momentum oscillator verified (53.09 bounded in [0, 100]).
- `✓ Test 7 Passed`: AIML $\pm 2\sigma$ Bollinger bands boundary verified ([$120.81, $144.03]).
- `✓ Test 8 Passed`: AIML 300-path Geometric Brownian Motion Monte Carlo cone validated.

---

## 💻 How to Run the Interactive Dashboard
1. **Direct Browser Open (Offline Compatible)**:
   - Double-click `dashboard/index.html` in Windows Explorer. It opens instantly with interactive toggles and zero CORS errors!
2. **Local HTTP Server (Optional)**:
   ```bash
   npx serve dashboard
   ```

---

## 🎓 Final Year Engineering Capstone Learning Outcomes
- Implemented stochastic numerical simulations (Monte Carlo GBM) for equity price cone projection.
- Formulated quantitative momentum oscillators (RSI, Bollinger Bands) and executed rule-based backtests.
- Engineered high-frequency and multi-decade time intelligence models in Power BI Desktop.

---

## 👤 Author
**Mithun Gowda M**  
Final Year Engineering Student (B.E. / B.Tech AIML)  
Department of Computer Science & Engineering (AIML)  
GitHub: [@Mithun-gowda-M](https://github.com/Mithun-gowda-M)
