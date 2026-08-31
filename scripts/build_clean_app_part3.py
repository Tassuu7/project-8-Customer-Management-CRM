def get_part3():
    return """
  async renderDashboard(container) {
    container.innerHTML = '<div class="glass-panel" style="padding: 40px; text-align: center;">Loading Executive Dashboard...</div>';
    try {
      const res = await window.api.get('/analytics/dashboard');
      const data = res.data;

      container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px;">
          <div>
            <h1 style="font-size: 1.8rem; font-weight: 800; letter-spacing: -0.5px;">Executive Dashboard</h1>
            <p style="color: var(--text-secondary);">Real-time Customer 360, ARR & Sales Velocity Metrics</p>
          </div>
          <button class="btn btn-primary" onclick="window.location.hash='#customers'">
            <span>+ View Customers</span>
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 28px;">
          <div class="glass-panel" style="padding: 22px;">
            <div style="color: var(--text-muted); font-size: 0.85rem; font-weight: 600;">ANNUAL RUN RATE (ARR)</div>
            <div style="font-size: 1.9rem; font-weight: 800; color: #fff; margin: 8px 0;">$${(data.financials.arr / 1000).toFixed(0)}k</div>
            <div style="color: var(--accent-success); font-size: 0.85rem; font-weight: 600;">&uarr; +${data.financials.growthPercentage}% YoY Growth</div>
          </div>
          <div class="glass-panel" style="padding: 22px;">
            <div style="color: var(--text-muted); font-size: 0.85rem; font-weight: 600;">ACTIVE ACCOUNTS</div>
            <div style="font-size: 1.9rem; font-weight: 800; color: #fff; margin: 8px 0;">${data.customers.totalAccounts}</div>
            <div style="color: var(--accent-secondary); font-size: 0.85rem;">${data.customers.enterpriseCount} Enterprise Tier</div>
          </div>
          <div class="glass-panel" style="padding: 22px;">
            <div style="color: var(--text-muted); font-size: 0.85rem; font-weight: 600;">AVG HEALTH SCORE</div>
            <div style="font-size: 1.9rem; font-weight: 800; color: var(--accent-success); margin: 8px 0;">${data.customers.averageHealthScore}%</div>
            <div style="color: var(--text-muted); font-size: 0.85rem;">${data.customers.atRiskCount} Accounts At Risk</div>
          </div>
          <div class="glass-panel" style="padding: 22px;">
            <div style="color: var(--text-muted); font-size: 0.85rem; font-weight: 600;">SLA COMPLIANCE</div>
            <div style="font-size: 1.9rem; font-weight: 800; color: var(--accent-purple); margin: 8px 0;">${data.support.slaComplianceRate}%</div>
            <div style="color: var(--accent-success); font-size: 0.85rem;">CSAT: ${data.support.averageCsatScore}/5.0</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
          <div class="glass-panel" style="padding: 24px;">
            <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 16px;">Pipeline Revenue by Deal Stage</h3>
            <canvas id="chart-pipeline" style="width: 100%; height: 220px;"></canvas>
          </div>
          <div class="glass-panel" style="padding: 24px; text-align: center;">
            <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 16px;">Customer Health Distribution</h3>
            <div id="chart-health-donut" style="display: flex; justify-content: center; margin: 16px 0;"></div>
            <div style="display: flex; justify-content: space-around; font-size: 0.85rem; color: var(--text-secondary);">
              <div><span style="color: #10b981;">&bull;</span> Healthy (85%)</div>
              <div><span style="color: #f59e0b;">&bull;</span> Neutral (10%)</div>
              <div><span style="color: #ef4444;">&bull;</span> At-Risk (5%)</div>
            </div>
          </div>
        </div>
      `;

      setTimeout(() => {
        window.ChartEngine.renderBarChart(
          'chart-pipeline',
          ['Discovery', 'Demo', 'Proposal', 'Negotiation', 'Won'],
          [340, 190, 620, 505, 1380],
          ['#6366f1', '#06b6d4', '#8b5cf6', '#f59e0b', '#10b981']
        );

        window.ChartEngine.renderDonutChart('chart-health-donut', [
          { value: 85, color: '#10b981' },
          { value: 10, color: '#f59e0b' },
          { value: 5, color: '#ef4444' }
        ]);
      }, 50);

    } catch (err) {
      container.innerHTML = `<div class="glass-panel" style="padding: 30px; color: var(--accent-danger);">Error loading dashboard: ${err.message}</div>`;
    }
  }

  async renderCustomers(container) {
    container.innerHTML = '<div class="glass-panel" style="padding: 40px; text-align: center;">Loading Customers...</div>';
    try {
      const res = await window.api.get('/customers?limit=50');
      const accounts = res.data;

      container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 1.8rem; font-weight: 800;">Customer Accounts</h1>
            <p style="color: var(--text-secondary);">Customer 360 profiles, health scores, and enterprise tiers</p>
          </div>
          <div style="display: flex; gap: 12px;">
            <a href="/api/v1/export/customers/csv" class="btn btn-secondary">Export CSV</a>
            <button class="btn btn-primary" onclick="window.app.openCreateCustomerModal()">+ New Customer</button>
          </div>
        </div>

        <div class="glass-panel">
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Account Name</th>
                  <th>Industry</th>
                  <th>Tier</th>
                  <th>Health Score</th>
                  <th>Churn Risk</th>
                  <th>Annual Revenue</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${accounts.map(a => `
                  <tr>
                    <td>
                      <div style="font-weight: 700; color: #fff;">${a.name}</div>
                      <div style="font-size: 0.78rem; color: var(--text-muted);">${a.domain || ''}</div>
                    </td>
                    <td>${a.industry}</td>
                    <td><span class="badge badge-${a.tier.toLowerCase()}">${a.tier}</span></td>
                    <td>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="flex: 1; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; width: 60px;">
                          <div style="height: 100%; width: ${a.healthScore}%; background: ${a.healthScore > 80 ? '#10b981' : (a.healthScore > 60 ? '#f59e0b' : '#ef4444')}; border-radius: 3px;"></div>
                        </div>
                        <span style="font-weight: 700; font-size: 0.85rem;">${a.healthScore}%</span>
                      </div>
                    </td>
                    <td><span class="badge badge-${a.churnRisk}">${a.churnRisk.toUpperCase()}</span></td>
                    <td style="font-weight: 600;">$${(a.annualRevenue).toLocaleString()}</td>
                    <td>
                      <button class="btn btn-secondary btn-sm" onclick="window.location.hash='#customer-360/${a.id}'">360 View</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } catch (err) {
      container.innerHTML = `<div class="glass-panel" style="padding: 30px; color: var(--accent-danger);">Error loading customers: ${err.message}</div>`;
    }
  }

  async renderCustomer360(container, accountId) {
    if (!accountId) {
      this.renderCustomers(container);
      return;
    }

    container.innerHTML = '<div class="glass-panel" style="padding: 40px; text-align: center;">Loading Customer 360 Profile...</div>';
    try {
      const res = await window.api.get(`/customers/${accountId}/360`);
      const { account, contacts, deals, openTickets, recentActivities, healthScoreBreakdown } = res.data;

      container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <button class="btn btn-secondary btn-sm" onclick="window.location.hash='#customers'">&larr; Back</button>
            <div>
              <h1 style="font-size: 1.8rem; font-weight: 800;">${account.name}</h1>
              <div style="display: flex; gap: 8px; margin-top: 4px;">
                <span class="badge badge-${account.tier.toLowerCase()}">${account.tier} Tier</span>
                <span class="badge badge-${account.churnRisk}">${account.churnRisk.toUpperCase()} CHURN RISK</span>
                <span style="color: var(--text-muted); font-size: 0.85rem;">${account.industry} &bull; ${account.domain}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="glass-panel" style="padding: 24px; margin-bottom: 24px; background: linear-gradient(90deg, rgba(99,102,241,0.15), rgba(6,182,212,0.1));">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 0.85rem; font-weight: 700; color: var(--accent-secondary);">AI HEALTH SCORE & CHURN PREDICTION</div>
              <div style="font-size: 2.2rem; font-weight: 800; color: #fff;">${healthScoreBreakdown.score} / 100</div>
              <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 4px;">${healthScoreBreakdown.recommendation}</p>
            </div>
            <div style="display: flex; gap: 24px; text-align: center;">
              <div><div style="font-weight: 700; color: #fff;">${healthScoreBreakdown.activityRecencyScore}%</div><div style="font-size: 0.75rem; color: var(--text-muted);">Activity</div></div>
              <div><div style="font-weight: 700; color: #fff;">${healthScoreBreakdown.supportTicketScore}%</div><div style="font-size: 0.75rem; color: var(--text-muted);">SLA Health</div></div>
              <div><div style="font-weight: 700; color: #fff;">${healthScoreBreakdown.dealProgressionScore}%</div><div style="font-size: 0.75rem; color: var(--text-muted);">Expansion</div></div>
            </div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
          <div>
            <div class="glass-panel" style="padding: 20px; margin-bottom: 24px;">
              <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 14px;">Executive Contacts</h3>
              ${contacts.map(c => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                  <div>
                    <div style="font-weight: 600; color: #fff;">${c.firstName} ${c.lastName} ${c.isPrimary ? '<span class="badge badge-growth">Primary</span>' : ''}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">${c.title || ''} &bull; ${c.email}</div>
                  </div>
                  <div style="font-size: 0.85rem; color: var(--text-secondary);">${c.phone || ''}</div>
                </div>
              `).join('')}
            </div>

            <div class="glass-panel" style="padding: 20px;">
              <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 14px;">Pipeline Opportunities</h3>
              ${deals.map(d => `
                <div style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                  <div style="display: flex; justify-content: space-between;">
                    <div style="font-weight: 600; color: #fff;">${d.title}</div>
                    <div style="font-weight: 700; color: var(--accent-success);">$${d.amount.toLocaleString()}</div>
                  </div>
                  <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <span class="badge badge-enterprise">${d.stage}</span>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">Close: ${d.expectedCloseDate}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="glass-panel" style="padding: 24px;">
            <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 20px;">360-Degree Interaction Timeline</h3>
            <div class="timeline-feed">
              ${recentActivities.map(act => `
                <div class="timeline-item">
                  <div class="timeline-icon-badge badge-${act.type.toLowerCase()}">&bull;</div>
                  <div class="timeline-card">
                    <div class="timeline-header">
                      <div class="timeline-title">${act.title}</div>
                      <div class="timeline-date">${new Date(act.performedAt).toLocaleDateString()}</div>
                    </div>
                    <div style="font-size: 0.88rem; color: var(--text-secondary);">${act.description || ''}</div>
                    ${act.outcome ? `<div style="font-size: 0.8rem; color: var(--accent-success); margin-top: 6px;">Outcome: ${act.outcome}</div>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    } catch (err) {
      container.innerHTML = `<div class="glass-panel" style="padding: 30px; color: var(--accent-danger);">Error loading 360 view: ${err.message}</div>`;
    }
  }
"""
