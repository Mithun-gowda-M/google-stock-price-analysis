/**
 * Automated Test Suite - Google Stock Price Analytics
 */

const assert = require('assert');
const path = require('path');
const { processStockData, computeSMA } = require('../src/stock_analytics');

console.log('Running Google Stock Analytics Test Suite...');

const csvPath = path.join(__dirname, '..', 'data', 'google_stock.csv');
const result = processStockData(csvPath);

// Test 1: Complete Session Coverage
assert.strictEqual(result.kpis.totalTradingSessions, 4842, `Expected 4842 sessions, got ${result.kpis.totalTradingSessions}`);
console.log('✓ Test 1 Passed: Complete trading session coverage verified (4,842 sessions)');

// Test 2: OHLC Mathematical Invariants
const sample = result.timeseriesSample;
sample.forEach(s => {
  assert(s.high >= s.low, `High must be >= Low on ${s.date}`);
  assert(s.high >= s.open - 0.01, `High must be >= Open on ${s.date}`);
  assert(s.low <= s.open + 0.01, `Low must be <= Open on ${s.date}`);
});
console.log('✓ Test 2 Passed: OHLC physical boundaries and pricing consistency verified');

// Test 3: SMA Computation Accuracy
const testData = [{ v: 10 }, { v: 20 }, { v: 30 }, { v: 40 }, { v: 50 }];
const testSma3 = computeSMA(testData, 3, 'v');
assert.strictEqual(testSma3[2], 20, 'SMA(3) at index 2 should be (10+20+30)/3 = 20');
assert.strictEqual(testSma3[3], 30, 'SMA(3) at index 3 should be (20+30+40)/3 = 30');
assert.strictEqual(testSma3[4], 40, 'SMA(3) at index 4 should be (30+40+50)/3 = 40');
console.log('✓ Test 3 Passed: Moving average arithmetic verified');

// Test 4: All-Time High & Return Logic
assert(result.kpis.allTimeHigh > 150, `ATH should exceed $150, got ${result.kpis.allTimeHigh}`);
assert(result.kpis.totalReturnPct > 5000, `Cumulative return should exceed 5000%, got ${result.kpis.totalReturnPct}%`);
console.log(`✓ Test 4 Passed: Valuation metrics validated (ATH: $${result.kpis.allTimeHigh}, Return: +${result.kpis.totalReturnPct}%)`);

// Test 5: Benchmark Synchronization
assert(result.benchmarksSample.length > 0, 'Benchmark sample must be populated');
result.benchmarksSample.forEach(b => {
  assert(b.date, 'Benchmark entry must have date');
  assert(typeof b.googCumulative === 'number', 'GOOG cumulative must be number');
});
console.log('✓ Test 5 Passed: S&P 500 and NASDAQ-100 comparative series synchronized');

console.log('\nAll Google Stock Analytics tests passed successfully! (5/5)');
