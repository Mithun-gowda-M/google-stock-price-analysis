# 📈 Google Stock Price Analysis (Power BI Mini Project 3)

[![Test Suite](https://img.shields.io/badge/tests-5%2F5%20passed-brightgreen.svg)]()
[![Platform](https://img.shields.io/badge/platform-Power%20BI%20%7C%20Web-blue.svg)]()
[![License](https://img.shields.io/badge/license-MIT-green.svg)]()

Quantitative and visual analytics suite tracking **Alphabet Inc. (NASDAQ: GOOG / GOOGL)** historical equity dynamics across **4,842 trading sessions** from its August 2004 IPO to November 2023.

---

## 🚀 Key Market Insights & Highlights
- **Cumulative Lifetime Gain**: **+5,264.26%** from split-adjusted $2.50 to $134.06.
- **All-Time Peak (ATH)**: **$152.10**.
- **Intraday Volatility Spread**: **2.18% average** daily high-low spread.
- **Average Daily Liquidity**: **119.2M shares** transacted per session.
- **Benchmark Alpha**: Substantially outperformed the S&P 500 and NASDAQ-100 over multi-decade cycles.

---

## 📁 Repository Architecture
```
google-stock-price-analysis/
├── data/
│   ├── google_stock.csv         # 4,842 raw trading sessions (OHLC & Volume)
│   ├── market_benchmarks.csv    # Comparative cumulative returns (SPY, QQQ)
│   └── DATA_DICTIONARY.md       # Financial metrics & columns documentation
├── src/
│   └── stock_analytics.js       # Moving averages, volatility & quant engine
├── dashboard/
│   ├── index.html               # Interactive financial analytics dashboard
│   ├── styles.css               # Terminal-style dark theme UI
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

## 📈 Power BI DAX Measures Reference
Located in [`power_bi/measures.dax`](power_bi/measures.dax):
- `SMA 20 Close`, `SMA 50 Close`, `SMA 200 Close` via `DATESINPERIOD`
- `Intraday Volatility % = DIVIDE([High] - [Low], [Low], 0) * 100`
- `Rolling 30D Price StDev = STDEV.P('Google_Stock'[Adj Close])`
- `Cumulative Return %` and `Golden Cross Signal`

---

## 🧪 Testing & Execution
Run the automated test suite verifying mathematical consistency, moving average arithmetic, and OHLC data integrity:
```bash
node tests/stock_analytics.test.js
```

---

## 💻 Running the Web Companion
Simply open `dashboard/index.html` in any browser or serve locally:
```bash
npx serve dashboard
```

---

## 📄 License
MIT License. Developed for quantitative investment analysis.
