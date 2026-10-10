/* ====================================================================
   ACADEMIC CAPSTONE SUBMISSION • FINAL YEAR ENGINEERING IN AIML
   Project: Google Stock Price Analysis & Quant AI Engine
   Author: Mithun Gowda M (Final Year B.E. / B.Tech AIML)
   Department: Department of Computer Science & Engineering (AIML)
   File: Power Query M ETL Script Suite
   Repository: https://github.com/Mithun-gowda-M/google-stock-price-analysis
   ==================================================================== */

// ====================================================================
// POWER QUERY (M) - GOOGLE STOCK PRICE ETL
// ====================================================================

let
    Source = Csv.Document(File.Contents("data/google_stock.csv"), [Delimiter=",", Columns=7, Encoding=65001, QuoteStyle=QuoteStyle.Csv]),
    Promoted = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    Typed = Table.TransformColumnTypes(Promoted, {
        {"Date", type date},
        {"Open", type number},
        {"High", type number},
        {"Low", type number},
        {"Close", type number},
        {"Adj Close", type number},
        {"Volume", Int64.Type}
    }),
    AddedSpread = Table.AddColumn(Typed, "IntradaySpread", each [High] - [Low], type number),
    AddedSpreadPct = Table.AddColumn(AddedSpread, "IntradaySpreadPct", each if [Low] > 0 then (([High] - [Low]) / [Low]) * 100 else 0, type number)
in
    AddedSpreadPct
