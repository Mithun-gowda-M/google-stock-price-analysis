# Google Stock Price Data Dictionary

### Stock Historical Data (`google_stock.csv`)
| Column Name | Data Type | Description |
| :--- | :--- | :--- |
| `Date` | Date | Calendar trading session date (`YYYY-MM-DD`) |
| `Open` | Decimal | Initial recorded trading price at market open |
| `High` | Decimal | Highest traded price reached during the session |
| `Low` | Decimal | Lowest traded price reached during the session |
| `Close` | Decimal | Final executed price at market closing bell |
| `Adj Close`| Decimal | Split and dividend-adjusted closing price |
| `Volume` | Integer | Total number of shares transacted in session |

### Market Benchmarks (`market_benchmarks.csv`)
| Column Name | Data Type | Description |
| :--- | :--- | :--- |
| `Date` | Date | Trading session date |
| `GOOG_Cumulative_Return` | Decimal | Alphabet cumulative percentage gain since IPO (%) |
| `SP500_Cumulative_Return`| Decimal | Standard & Poor's 500 index cumulative percentage return (%) |
| `NASDAQ_Cumulative_Return`| Decimal | NASDAQ-100 tech benchmark cumulative percentage return (%) |
