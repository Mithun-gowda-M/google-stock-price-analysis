# Google Stock Price Analysis & Quant AI Engine - Power BI Implementation Guide

> **Academic Capstone Submission • Final Year Engineering in AIML**  
> **Student Name**: Mithun Gowda M  
> **Program**: B.E. / B.Tech in Artificial Intelligence & Machine Learning (AIML)  
> **Department**: Department of Computer Science & Engineering (AIML)  
> **Repository**: [https://github.com/Mithun-gowda-M/google-stock-price-analysis](https://github.com/Mithun-gowda-M/google-stock-price-analysis)  

---
## 1. Overview
This project visualizes Alphabet Inc.'s historical price dynamics across 4,842 trading sessions from 2004 to 2023, analyzing volatility, trading volume surges, moving averages, and index benchmark alignment.

## 2. Visual Architecture
1. **Header & KPI Strip**:
   - Card 1: `Latest Close` & `Cumulative Return %`
   - Card 2: `All Time High (ATH)` & `All Time Low (ATL)`
   - Card 3: `Intraday Volatility %`
   - Card 4: `Average Trading Volume`
   - Card 5: `Golden Cross Signal` (Bullish / Bearish status)

2. **Price Action & Moving Averages (Main Visual)**:
   - Visual: Line Chart / Candlestick Custom Visual
   - X-Axis: `Date_Dim[Date]`
   - Lines: `[Latest Close]`, `[SMA 20 Close]`, `[SMA 50 Close]`, `[SMA 200 Close]`

3. **Comparative Return vs Benchmarks (Right Top)**:
   - Visual: Line Chart
   - X-Axis: `Date`
   - Series: Google Cumulative Return %, NASDAQ-100 Return %, S&P 500 Return %

4. **Trading Volume & 30D Moving Average (Bottom Left)**:
   - Visual: Line and Clustered Column Chart
   - Column: `Volume`
   - Line: `[Volume 30D Moving Average]`

5. **Daily Volatility Spread Timeline (Bottom Right)**:
   - Visual: Area Chart
   - Values: `[Intraday Volatility %]`


### 5. AIML Integration in Power BI
- **Monte Carlo 30-Day Cone**: Ingest the 5th, 50th, and 95th percentile projection curves as forecast reference lines in Power BI price charts.
- **Algorithmic Trading Signals**: Overlay 14-day RSI oversold (<30) / overbought (>70) signal flags onto daily OHLC candlestick visuals.
- **Python Visual in Power BI Desktop**: Plot the 300 simulated Brownian paths with Matplotlib directly on the Power BI report canvas.
