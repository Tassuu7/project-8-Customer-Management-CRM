import os

def append_code(content):
    with open("src/frontend/public/js/app.js", "a", encoding="utf-8") as f:
        f.write(content)

with open("src/frontend/public/js/app.js", "w", encoding="utf-8") as f:
    f.write("""/**
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
""")

print("build_clean_app.py part 1 ready")
