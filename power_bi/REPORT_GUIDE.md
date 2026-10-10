# Google Stock Price Analysis - Power BI Report Guide

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
