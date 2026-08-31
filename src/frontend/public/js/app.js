/**
 * OmniCustomer 360 - Frontend Single Page Application Engine
 * Comprehensive Authentication (Login, Sign-Up, Logout) & Customer 360 Management
 */

class App {
  constructor() {
    this.currentUser = null;
    this.currentRoute = 'dashboard';
    this.init();
  }

  async init() {
    this.bindEvents();
    await this.checkAuth();
    this.handleRoute();
  }

  bindEvents() {
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('global-search');
        if (searchInput) searchInput.focus();
      }
    });
  }

  async checkAuth() {
    const token = localStorage.getItem('apex_crm_token');
    if (!token) {
      this.currentUser = null;
      this.updateUserUI();
      return;
    }

    try {
      const res = await window.api.get('/auth/me');
      this.currentUser = res.data;
      this.updateUserUI();
    } catch (err) {
      window.api.setToken('');
      this.currentUser = null;
      this.updateUserUI();
    }
  }

  updateUserUI() {
    const nameEl = document.getElementById('header-user-name');
    const roleEl = document.getElementById('header-user-role');
    const authActionsEl = document.getElementById('sidebar-auth-actions');

    if (this.currentUser) {
      if (nameEl) nameEl.textContent = this.currentUser.fullName || this.currentUser.firstName || 'Sarah Connor';
      if (roleEl) roleEl.textContent = this.currentUser.roleName || 'Super Administrator';
      if (authActionsEl) {
        authActionsEl.innerHTML = `
          <button class="btn btn-secondary btn-sm" onclick="window.app.logout()" style="width: 100%; margin-top: 10px; display: flex; align-items: center; justify-content: center; gap: 6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            <span>Log Out</span>
          </button>
        `;
      }
    } else {
      if (nameEl) nameEl.textContent = 'Not Logged In';
      if (roleEl) roleEl.textContent = 'Guest';
      if (authActionsEl) {
        authActionsEl.innerHTML = `
          <button class="btn btn-primary btn-sm" onclick="window.location.hash='#login'" style="width: 100%; margin-top: 10px;">
            <span>Sign In &rarr;</span>
          </button>
        `;
      }
    }
  }

  async logout() {
    try {
      await window.api.post('/auth/logout', {});
    } catch (e) {}
    window.api.setToken('');
    this.currentUser = null;
    this.updateUserUI();
    this.showToast('You have been logged out successfully.', 'info');
    window.location.hash = '#login';
  }

  async loginWithCredentials(email, password) {
    try {
      const res = await window.api.post('/auth/login', { email, password });
      window.api.setToken(res.data.accessToken);
      this.currentUser = res.data.user;
      this.updateUserUI();
      this.showToast(`Welcome back, ${this.currentUser.fullName}!`, 'success');
      window.location.hash = '#dashboard';
    } catch (err) {
      this.showToast(err.message || 'Invalid email or password', 'error');
    }
  }

  async signupWithCredentials(payload) {
    try {
      const res = await window.api.post('/auth/signup', payload);
      window.api.setToken(res.data.accessToken);
      this.currentUser = res.data.user;
      this.updateUserUI();
      this.showToast(`Account created! Welcome, ${this.currentUser.fullName}!`, 'success');
      window.location.hash = '#dashboard';
    } catch (err) {
      this.showToast(err.message || 'Registration failed', 'error');
    }
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || 'dashboard';
    const [route, param] = hash.split('/');
    this.currentRoute = route;

    if (!this.currentUser && route !== 'login' && route !== 'signup') {
      const token = localStorage.getItem('apex_crm_token');
      if (!token) {
        window.location.hash = '#login';
        return;
      }
    }

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${route}`) {
        link.classList.add('active');
      }
    });

    const viewContainer = document.getElementById('view-container');
    if (!viewContainer) return;

    switch (route) {
      case 'login': this.renderLogin(viewContainer); break;
      case 'signup': this.renderSignup(viewContainer); break;
      case 'dashboard': this.renderDashboard(viewContainer); break;
      case 'customers': this.renderCustomers(viewContainer); break;
      case 'customer-360': this.renderCustomer360(viewContainer, param); break;
      case 'leads': this.renderLeads(viewContainer); break;
      case 'deals': this.renderDeals(viewContainer); break;
      case 'tickets': this.renderTickets(viewContainer); break;
      case 'activities': this.renderActivities(viewContainer); break;
      case 'billing': this.renderBilling(viewContainer); break;
      case 'workflows': this.renderWorkflows(viewContainer); break;
      case 'audits': this.renderAudits(viewContainer); break;
      default: this.renderDashboard(viewContainer); break;
    }
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 4000);
  }

  renderLogin(container) {
    container.innerHTML = `
      <div style="max-width: 480px; margin: 30px auto; padding: 36px; background: rgba(15, 23, 42, 0.9); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; background: linear-gradient(135deg, #6366f1, #06b6d4); border-radius: 14px; margin-bottom: 14px;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
          </div>
          <h2 style="font-size: 1.6rem; font-weight: 800; color: #fff;">Sign In to OmniCustomer 360</h2>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 4px;">Enterprise Customer Management & CRM</p>
        </div>

        <form id="login-form" onsubmit="event.preventDefault(); window.app.handleLoginForm();">
          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 6px;">Work Email</label>
            <input type="email" id="login-email" required value="admin@apex-crm.enterprise" style="width: 100%; padding: 12px; background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem;">
          </div>
          <div style="margin-bottom: 20px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 6px;">Password</label>
            <input type="password" id="login-password" required value="Admin@123456" style="width: 100%; padding: 12px; background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-size: 0.95rem;">
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px; font-size: 1rem; font-weight: 700; border-radius: 8px; margin-bottom: 16px;">
            Sign In &rarr;
          </button>
        </form>

        <div style="text-align: center; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.1); margin-bottom: 18px;">
          <span style="color: var(--text-muted); font-size: 0.88rem;">Need an account?</span>
          <a href="#signup" style="color: var(--accent-primary); font-weight: 700; margin-left: 6px; text-decoration: none;">Create Account</a>
        </div>

        <div style="background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.25); border-radius: 10px; padding: 14px;">
          <div style="font-size: 0.78rem; font-weight: 700; color: var(--accent-secondary); margin-bottom: 8px; text-transform: uppercase;">1-Click Demo Login Roles:</div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <button class="btn btn-secondary btn-sm" onclick="window.app.quickLogin('admin@apex-crm.enterprise', 'Admin@123456')" style="justify-content: flex-start;">
              ?? <strong>Super Admin</strong> (admin@apex-crm.enterprise)
            </button>
            <button class="btn btn-secondary btn-sm" onclick="window.app.quickLogin('sales.vp@apex-crm.enterprise', 'Sales@123456')" style="justify-content: flex-start;">
              ?? <strong>VP Sales</strong> (sales.vp@apex-crm.enterprise)
            </button>
            <button class="btn btn-secondary btn-sm" onclick="window.app.quickLogin('support.lead@apex-crm.enterprise', 'Support@123456')" style="justify-content: flex-start;">
              ?? <strong>Support Lead</strong> (support.lead@apex-crm.enterprise)
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderSignup(container) {
    container.innerHTML = `
      <div style="max-width: 480px; margin: 30px auto; padding: 36px; background: rgba(15, 23, 42, 0.9); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="font-size: 1.6rem; font-weight: 800; color: #fff;">Create Your Account</h2>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 4px;">Join OmniCustomer 360 CRM Platform</p>
        </div>

        <form id="signup-form" onsubmit="event.preventDefault(); window.app.handleSignupForm();">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 6px;">First Name</label>
              <input type="text" id="signup-firstname" required placeholder="Jane" style="width: 100%; padding: 10px; background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
            </div>
            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 6px;">Last Name</label>
              <input type="text" id="signup-lastname" required placeholder="Doe" style="width: 100%; padding: 10px; background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
            </div>
          </div>
          <div style="margin-bottom: 14px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 6px;">Company</label>
            <input type="text" id="signup-company" required placeholder="Acme Global Solutions" style="width: 100%; padding: 10px; background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
          </div>
          <div style="margin-bottom: 14px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 6px;">Work Email</label>
            <input type="email" id="signup-email" required placeholder="jane@company.io" style="width: 100%; padding: 10px; background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
          </div>
          <div style="margin-bottom: 20px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 6px;">Password</label>
            <input type="password" id="signup-password" required minlength="8" placeholder="At least 8 characters" style="width: 100%; padding: 10px; background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px; font-size: 1rem; font-weight: 700; border-radius: 8px; margin-bottom: 16px;">
            Complete Registration &rarr;
          </button>
        </form>

        <div style="text-align: center; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.1);">
          <span style="color: var(--text-muted); font-size: 0.88rem;">Already registered?</span>
          <a href="#login" style="color: var(--accent-primary); font-weight: 700; margin-left: 6px; text-decoration: none;">Sign In</a>
        </div>
      </div>
    `;
  }

  handleLoginForm() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    this.loginWithCredentials(email, password);
  }

  handleSignupForm() {
    const firstName = document.getElementById('signup-firstname').value;
    const lastName = document.getElementById('signup-lastname').value;
    const company = document.getElementById('signup-company').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    this.signupWithCredentials({ firstName, lastName, company, email, password, role: 'Super Administrator' });
  }

  quickLogin(email, password) {
    this.loginWithCredentials(email, password);
  }

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

  async renderLeads(container) {
    container.innerHTML = '<div class="glass-panel" style="padding: 40px; text-align: center;">Loading Lead Kanban Pipeline...</div>';
    try {
      const res = await window.api.get('/leads');
      const leads = res.data;
      const stages = ['New', 'Contacted', 'Qualified'];

      container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 1.8rem; font-weight: 800;">Leads Kanban Pipeline</h1>
            <p style="color: var(--text-secondary);">Drag & drop qualification, AI lead scoring & 1-click conversion</p>
          </div>
          <button class="btn btn-primary" onclick="window.app.openCreateLeadModal()">+ Add Inbound Lead</button>
        </div>

        <div class="kanban-board">
          ${stages.map(st => {
            const stageLeads = leads.filter(l => l.status === st);
            return `
              <div class="kanban-column">
                <div class="kanban-column-header">
                  <div class="column-title">${st} <span class="column-count">${stageLeads.length}</span></div>
                </div>
                <div class="kanban-cards-container">
                  ${stageLeads.map(l => `
                    <div class="kanban-card">
                      <div class="card-company">${l.company}</div>
                      <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 6px;">${l.firstName} ${l.lastName}</div>
                      <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span class="badge badge-growth">Score: ${l.score}/100</span>
                        <button class="btn btn-primary btn-sm" onclick="window.app.convertLeadQuick('${l.id}')">Convert &rarr;</button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } catch (err) {
      container.innerHTML = `<div class="glass-panel" style="padding: 30px; color: var(--accent-danger);">Error loading leads: ${err.message}</div>`;
    }
  }

  async renderDeals(container) {
    container.innerHTML = '<div class="glass-panel" style="padding: 40px; text-align: center;">Loading Deal Pipeline...</div>';
    try {
      const [dealsRes, metricsRes] = await Promise.all([
        window.api.get('/deals'),
        window.api.get('/deals/metrics')
      ]);

      const deals = dealsRes.data;
      const metrics = metricsRes.data;
      const stages = ['Discovery', 'Demo', 'Proposal', 'Negotiation', 'Won'];

      container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 1.8rem; font-weight: 800;">Opportunity Pipeline</h1>
            <p style="color: var(--text-secondary);">Weighted Forecasting: <span style="color: var(--accent-success); font-weight: 700;">$${metrics.weightedPipelineValue.toLocaleString()}</span> &bull; Win Rate: ${metrics.winRatePercentage}%</p>
          </div>
        </div>

        <div class="kanban-board">
          ${stages.map(st => {
            const stageDeals = deals.filter(d => d.stage === st);
            const totalStageVal = stageDeals.reduce((sum, d) => sum + d.amount, 0);
            return `
              <div class="kanban-column">
                <div class="kanban-column-header">
                  <div class="column-title">${st} <span class="column-count">${stageDeals.length}</span></div>
                  <div class="column-value">$${(totalStageVal / 1000).toFixed(0)}k</div>
                </div>
                <div class="kanban-cards-container">
                  ${stageDeals.map(d => `
                    <div class="kanban-card">
                      <div class="card-company">${d.title}</div>
                      <div class="card-amount">$${d.amount.toLocaleString()}</div>
                      <div class="card-meta">
                        <span>Prob: ${d.probability}%</span>
                        <span>Close: ${d.expectedCloseDate}</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } catch (err) {
      container.innerHTML = `<div class="glass-panel" style="padding: 30px; color: var(--accent-danger);">Error loading deals: ${err.message}</div>`;
    }
  }

  async renderTickets(container) {
    container.innerHTML = '<div class="glass-panel" style="padding: 40px; text-align: center;">Loading Service Desk...</div>';
    try {
      const res = await window.api.get('/tickets');
      const tickets = res.data;

      container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 1.8rem; font-weight: 800;">Customer Service Desk</h1>
            <p style="color: var(--text-secondary);">SLA timers, priority routing, and customer ticket threads</p>
          </div>
        </div>

        <div class="glass-panel">
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Ticket #</th>
                  <th>Subject</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>SLA Resolution Deadline</th>
                </tr>
              </thead>
              <tbody>
                ${tickets.map(t => `
                  <tr>
                    <td style="font-weight: 700; color: var(--accent-secondary);">${t.ticketNumber}</td>
                    <td style="font-weight: 600; color: #fff;">${t.subject}</td>
                    <td><span class="badge badge-${t.priority.toLowerCase()}">${t.priority}</span></td>
                    <td><span class="badge badge-${t.status === 'Resolved' ? 'low' : 'growth'}">${t.status}</span></td>
                    <td style="font-size: 0.85rem; color: var(--text-muted);">${new Date(t.resolutionDueAt).toLocaleString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } catch (err) {
      container.innerHTML = `<div class="glass-panel" style="padding: 30px; color: var(--accent-danger);">Error loading tickets: ${err.message}</div>`;
    }
  }

  async renderActivities(container) {
    container.innerHTML = '<div class="glass-panel" style="padding: 40px; text-align: center;">Loading Activities & Tasks...</div>';
    try {
      const [actRes, taskRes] = await Promise.all([
        window.api.get('/activities/timeline'),
        window.api.get('/tasks')
      ]);

      container.innerHTML = `
        <div style="margin-bottom: 24px;">
          <h1 style="font-size: 1.8rem; font-weight: 800;">Activities & Action Items</h1>
          <p style="color: var(--text-secondary);">Omnichannel communications log and task reminders</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
          <div class="glass-panel" style="padding: 24px;">
            <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 16px;">Pending Tasks</h3>
            ${taskRes.data.map(task => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                <div>
                  <div style="font-weight: 600; color: #fff;">${task.title}</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted);">Due: ${task.dueDate} &bull; <span class="badge badge-${task.priority.toLowerCase()}">${task.priority}</span></div>
                </div>
                <button class="btn btn-secondary btn-sm" onclick="window.app.completeTask('${task.id}')">&#10003; Done</button>
              </div>
            `).join('')}
          </div>

          <div class="glass-panel" style="padding: 24px;">
            <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 16px;">Recent Omnichannel Logs</h3>
            ${actRes.data.slice(0, 8).map(act => `
              <div style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                <div style="font-weight: 600; color: #fff;">${act.title}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${new Date(act.performedAt).toLocaleString()}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } catch (err) {
      container.innerHTML = `<div class="glass-panel" style="padding: 30px; color: var(--accent-danger);">Error loading activities: ${err.message}</div>`;
    }
  }

  async renderBilling(container) {
    container.innerHTML = '<div class="glass-panel" style="padding: 40px; text-align: center;">Loading Invoices & Billing...</div>';
    try {
      const res = await window.api.get('/billing/invoices');
      const invoices = res.data;

      container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 1.8rem; font-weight: 800;">Invoices & Billing</h1>
            <p style="color: var(--text-secondary);">Customer invoices, tax breakdowns, and payment collections</p>
          </div>
        </div>

        <div class="glass-panel">
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Amount</th>
                  <th>Tax</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${invoices.map(inv => `
                  <tr>
                    <td style="font-weight: 700; color: #fff;">${inv.invoiceNumber}</td>
                    <td>$${inv.subtotal.toLocaleString()}</td>
                    <td>$${inv.taxAmount.toLocaleString()}</td>
                    <td style="font-weight: 800; color: var(--accent-success);">$${inv.total.toLocaleString()}</td>
                    <td><span class="badge badge-${inv.status === 'Paid' ? 'low' : 'growth'}">${inv.status}</span></td>
                    <td>${inv.dueDate}</td>
                    <td>
                      ${inv.status !== 'Paid' ? `<button class="btn btn-primary btn-sm" onclick="window.app.payInvoice('${inv.id}')">Mark Paid</button>` : '<span style="color: #10b981;">&#10003; Cleared</span>'}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } catch (err) {
      container.innerHTML = `<div class="glass-panel" style="padding: 30px; color: var(--accent-danger);">Error loading billing: ${err.message}</div>`;
    }
  }

  async renderWorkflows(container) {
    container.innerHTML = '<div class="glass-panel" style="padding: 40px; text-align: center;">Loading Automation Workflows...</div>';
    try {
      const res = await window.api.get('/workflows');
      const workflows = res.data;

      container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 1.8rem; font-weight: 800;">Automation Workflows</h1>
            <p style="color: var(--text-secondary);">Event triggers, qualification logic, and automated action rules</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 20px;">
          ${workflows.map(wf => `
            <div class="glass-panel" style="padding: 22px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                <div style="font-size: 1.1rem; font-weight: 700; color: #fff;">${wf.name}</div>
                <span class="badge badge-${wf.isActive ? 'low' : 'standard'}">${wf.isActive ? 'Active' : 'Paused'}</span>
              </div>
              <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 14px;">${wf.description || ''}</p>
              <div style="background: rgba(0,0,0,0.25); padding: 10px 14px; border-radius: var(--radius-md); font-size: 0.82rem;">
                <div><strong>Trigger:</strong> <code>${wf.triggerEvent}</code></div>
                <div><strong>Executions:</strong> ${wf.executionCount} runs</div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } catch (err) {
      container.innerHTML = `<div class="glass-panel" style="padding: 30px; color: var(--accent-danger);">Error loading workflows: ${err.message}</div>`;
    }
  }

  async renderAudits(container) {
    container.innerHTML = '<div class="glass-panel" style="padding: 40px; text-align: center;">Loading CDC Audit Trail...</div>';
    try {
      const res = await window.api.get('/audits?limit=50');
      const logs = res.data;

      container.innerHTML = `
        <div style="margin-bottom: 24px;">
          <h1 style="font-size: 1.8rem; font-weight: 800;">Change-Data-Capture (CDC) Audit Trail</h1>
          <p style="color: var(--text-secondary);">Immutable compliance and security activity log</p>
        </div>

        <div class="glass-panel">
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Action</th>
                  <th>Entity Type</th>
                  <th>Actor Email</th>
                  <th>IP Address</th>
                </tr>
              </thead>
              <tbody>
                ${logs.map(l => `
                  <tr>
                    <td style="font-size: 0.82rem; color: var(--text-muted);">${new Date(l.timestamp).toLocaleString()}</td>
                    <td><span class="badge badge-${l.action === 'CREATE' ? 'low' : (l.action === 'DELETE' ? 'high' : 'growth')}">${l.action}</span></td>
                    <td style="font-weight: 600; color: #fff;">${l.entityType}</td>
                    <td>${l.actorEmail || 'System'}</td>
                    <td style="font-family: monospace; color: var(--text-muted);">${l.ipAddress || 'Internal'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } catch (err) {
      container.innerHTML = `<div class="glass-panel" style="padding: 30px; color: var(--accent-danger);">Error loading audit logs: ${err.message}</div>`;
    }
  }

  async convertLeadQuick(leadId) {
    try {
      await window.api.post(`/leads/${leadId}/convert`, {
        createDeal: true,
        dealAmount: 85000
      });
      this.showToast('Lead successfully converted into Account, Contact, and Opportunity Deal!', 'success');
      this.handleRoute();
    } catch (err) {
      this.showToast(err.message, 'error');
    }
  }

  async completeTask(taskId) {
    try {
      await window.api.patch(`/tasks/${taskId}/status`, { status: 'Completed' });
      this.showToast('Task marked as completed', 'success');
      this.handleRoute();
    } catch (err) {
      this.showToast(err.message, 'error');
    }
  }

  async payInvoice(invoiceId) {
    try {
      await window.api.patch(`/billing/invoices/${invoiceId}/pay`, {});
      this.showToast('Invoice marked as Paid', 'success');
      this.handleRoute();
    } catch (err) {
      this.showToast(err.message, 'error');
    }
  }

  openCreateCustomerModal() {
    const name = prompt('Enter Customer Account Name:');
    if (!name) return;
    const domain = prompt('Enter Website Domain (e.g. company.com):') || `${name.toLowerCase().replace(/\s+/g, '')}.com`;
    const tier = prompt('Enter Tier (Enterprise, Growth, Standard):') || 'Growth';

    window.api.post('/customers', {
      name,
      domain,
      tier,
      annualRevenue: 500000,
      industry: 'Technology'
    }).then(() => {
      this.showToast('Customer created successfully', 'success');
      this.handleRoute();
    }).catch(err => this.showToast(err.message, 'error'));
  }

  openCreateLeadModal() {
    const comp = prompt('Enter Company Name:');
    if (!comp) return;
    const fn = prompt('Lead First Name:') || 'John';
    const ln = prompt('Lead Last Name:') || 'Doe';
    const em = prompt('Lead Email:') || `john@${comp.toLowerCase().replace(/\s+/g, '')}.com`;

    window.api.post('/leads', {
      company: comp,
      firstName: fn,
      lastName: ln,
      email: em,
      source: 'Website',
      estimatedBudget: 75000
    }).then(() => {
      this.showToast('Inbound lead recorded', 'success');
      this.handleRoute();
    }).catch(err => this.showToast(err.message, 'error'));
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
