/**
 * Google Stock Analytics Interactive Controller
 */

let stockData = null;
let charts = {};

async function init() {
  try {
    const res = await fetch('stock_summary.json');
    stockData = await res.json();
    renderKPIs(stockData.kpis);
    renderPriceChart(stockData.timeseriesSample);
    renderBenchmarkChart(stockData.benchmarksSample);
    renderVolumeChart(stockData.timeseriesSample);
    renderVolatilityChart(stockData.timeseriesSample);
    renderRecentSessions(stockData.recentSessions);
    setupToggles();
  } catch (err) {
    console.error('Failed to load stock data:', err);
  }
}

function renderKPIs(kpis) {
  document.getElementById('hdrClose').textContent = `$${kpis.latestPrice.toFixed(2)}`;
  document.getElementById('hdrReturn').textContent = `+${kpis.totalReturnPct.toLocaleString()}% All-Time`;
  document.getElementById('kpiInitial').textContent = `$${kpis.initialPrice.toFixed(2)}`;
  document.getElementById('kpiAth').textContent = `$${kpis.allTimeHigh.toFixed(2)}`;
  document.getElementById('kpiVol').textContent = `${kpis.avgDailySpreadPct}%`;
  document.getElementById('kpiVolQty').textContent = `${(kpis.avgDailyVolume / 1e6).toFixed(1)}M`;
  document.getElementById('kpiSessions').textContent = kpis.totalTradingSessions.toLocaleString();
}

function renderPriceChart(data) {
  const dates = data.map(d => d.date);
  const closes = data.map(d => d.adjClose);
  const sma20 = data.map(d => d.sma20);
  const sma50 = data.map(d => d.sma50);
  const sma200 = data.map(d => d.sma200);

  const ctx = document.getElementById('priceChart').getContext('2d');
  charts.price = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'GOOG Close ($)',
          data: closes,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.08)',
          fill: true,
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.1
        },
        {
          label: 'SMA 20',
          data: sma20,
          borderColor: '#10b981',
          borderWidth: 1.5,
          pointRadius: 0,
          tension: 0.1
        },
        {
          label: 'SMA 50',
          data: sma50,
          borderColor: '#f59e0b',
          borderWidth: 1.5,
          pointRadius: 0,
          tension: 0.1
        },
        {
          label: 'SMA 200',
          data: sma200,
          borderColor: '#8b5cf6',
          borderWidth: 1.5,
          pointRadius: 0,
          tension: 0.1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { labels: { color: '#94a3b8' } }
      },
      scales: {
        x: { grid: { color: 'rgba(255, 255, 255, 0.04)' }, ticks: { color: '#64748b', maxTicksLimit: 12 } },
        y: { grid: { color: 'rgba(255, 255, 255, 0.04)' }, ticks: { color: '#94a3b8', callback: v => `$${v}` } }
      }
    }
  });
}

function renderBenchmarkChart(benchmarks) {
  const dates = benchmarks.map(b => b.date);
  const goog = benchmarks.map(b => b.googCumulative);
  const ndx = benchmarks.map(b => b.nasdaqCumulative);
  const spy = benchmarks.map(b => b.sp500Cumulative);

  const ctx = document.getElementById('benchmarkChart').getContext('2d');
  charts.benchmark = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'GOOG Return (%)',
          data: goog,
          borderColor: '#3b82f6',
          borderWidth: 2,
          pointRadius: 0
        },
        {
          label: 'NASDAQ-100 (%)',
          data: ndx,
          borderColor: '#10b981',
          borderWidth: 1.5,
          pointRadius: 0
        },
        {
          label: 'S&P 500 (%)',
          data: spy,
          borderColor: '#f59e0b',
          borderWidth: 1.5,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', boxWidth: 12 } } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#64748b', maxTicksLimit: 6 } },
        y: { grid: { color: 'rgba(255, 255, 255, 0.04)' }, ticks: { color: '#94a3b8', callback: v => `${v}%` } }
      }
    }
  });
}

function renderVolumeChart(data) {
  const dates = data.map(d => d.date);
  const volumes = data.map(d => d.volume / 1e6);
  const volSma = data.map(d => d.volSma30 ? d.volSma30 / 1e6 : null);

  const ctx = document.getElementById('volumeChart').getContext('2d');
  charts.volume = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [
        {
          type: 'line',
          label: '30D Volume MA (M)',
          data: volSma,
          borderColor: '#06b6d4',
          borderWidth: 1.5,
          pointRadius: 0
        },
        {
          label: 'Volume (M)',
          data: volumes,
          backgroundColor: 'rgba(59, 130, 246, 0.45)',
          borderRadius: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', boxWidth: 12 } } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#64748b', maxTicksLimit: 8 } },
        y: { grid: { color: 'rgba(255, 255, 255, 0.04)' }, ticks: { color: '#94a3b8', callback: v => `${v}M` } }
      }
    }
  });
}

function renderVolatilityChart(data) {
  const dates = data.map(d => d.date);
  const spreads = data.map(d => d.dailySpreadPct);

  const ctx = document.getElementById('volatilityChart').getContext('2d');
  charts.volatility = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Intraday Spread % (High - Low)',
        data: spreads,
        borderColor: '#f43f5e',
        backgroundColor: 'rgba(244, 63, 94, 0.08)',
        fill: true,
        borderWidth: 1.5,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: 'rgba(255, 255, 255, 0.04)' }, ticks: { color: '#64748b', maxTicksLimit: 12 } },
        y: { grid: { color: 'rgba(255, 255, 255, 0.04)' }, ticks: { color: '#94a3b8', callback: v => `${v}%` } }
      }
    }
  });
}

function renderRecentSessions(sessions) {
  const tbody = document.querySelector('#sessionsTable tbody');
  tbody.innerHTML = '';
  sessions.slice(0, 15).forEach(s => {
    const tr = document.createElement('tr');
    const changeClass = s.dailyReturnPct >= 0 ? 'positive' : 'negative';
    tr.innerHTML = `
      <td><strong>${s.date}</strong></td>
      <td>$${s.open.toFixed(2)}</td>
      <td>$${s.high.toFixed(2)}</td>
      <td>$${s.low.toFixed(2)}</td>
      <td><strong>$${s.close.toFixed(2)}</strong></td>
      <td>${(s.volume / 1e6).toFixed(1)}M</td>
      <td>${s.dailySpreadPct}%</td>
      <td class="${changeClass}"><strong>${s.dailyReturnPct >= 0 ? '+' : ''}${s.dailyReturnPct}%</strong></td>
    `;
    tbody.appendChild(tr);
  });
}

function setupToggles() {
  document.getElementById('toggleSma20').addEventListener('change', (e) => {
    charts.price.data.datasets[1].hidden = !e.target.checked;
    charts.price.update();
  });
  document.getElementById('toggleSma50').addEventListener('change', (e) => {
    charts.price.data.datasets[2].hidden = !e.target.checked;
    charts.price.update();
  });
  document.getElementById('toggleSma200').addEventListener('change', (e) => {
    charts.price.data.datasets[3].hidden = !e.target.checked;
    charts.price.update();
  });
}

document.addEventListener('DOMContentLoaded', init);
