/**
 * Pure Canvas & SVG Interactive Chart Engine
 */

class ChartEngine {
  static renderBarChart(canvasId, labels, data, colors = ['#6366f1']) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.parentElement.clientWidth || 400;
    const height = canvas.height = 220;

    ctx.clearRect(0, 0, width, height);
    const maxVal = Math.max(...data, 10);
    const padding = 40;
    const chartW = width - padding * 2;
    const chartH = height - padding * 2;
    const barWidth = chartW / data.length - 16;

    // Draw Grid Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw Bars
    data.forEach((val, i) => {
      const barH = (val / maxVal) * chartH;
      const x = padding + i * (barWidth + 16) + 8;
      const y = height - padding - barH;

      const grad = ctx.createLinearGradient(x, y, x, height - padding);
      grad.addColorStop(0, colors[i % colors.length] || '#6366f1');
      grad.addColorStop(1, 'rgba(99, 102, 241, 0.2)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(x, y, barWidth, barH, [4, 4, 0, 0]) : ctx.rect(x, y, barWidth, barH);
      ctx.fill();

      // Labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(labels[i], x + barWidth / 2, height - padding + 18);
    });
  }

  static renderDonutChart(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
    let cumulative = 0;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('width', '160');
    svg.setAttribute('height', '160');

    data.forEach(item => {
      const pct = (item.value / total);
      const strokeDash = `${pct * 251.2} 251.2`;
      const offset = 251.2 * (1 - cumulative);
      cumulative += pct;

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', '50');
      circle.setAttribute('cy', '50');
      circle.setAttribute('r', '40');
      circle.setAttribute('fill', 'none');
      circle.setAttribute('stroke', item.color);
      circle.setAttribute('stroke-width', '14');
      circle.setAttribute('stroke-dasharray', strokeDash);
      circle.setAttribute('stroke-dashoffset', offset.toString());
      circle.setAttribute('transform', 'rotate(-90 50 50)');
      svg.appendChild(circle);
    });

    container.innerHTML = '';
    container.appendChild(svg);
  }
}

window.ChartEngine = ChartEngine;
