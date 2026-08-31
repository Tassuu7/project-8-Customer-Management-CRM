/**
 * Enterprise Frontend API Client
 */

class ApiClient {
  constructor() {
    this.baseUrl = '/api/v1';
    this.token = localStorage.getItem('apex_crm_token') || '';
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('apex_crm_token', token);
    } else {
      localStorage.removeItem('apex_crm_token');
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token ? { 'Authorization': `Bearer ${this.token}` } : {}),
      ...(options.headers || {})
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401 && !endpoint.includes('/auth/login')) {
          localStorage.removeItem('apex_crm_token');
          window.location.hash = '#login';
        }
        throw new Error(data.error?.message || data.message || 'Request failed');
      }

      return data;
    } catch (err) {
      console.error(`[API Error] ${endpoint}:`, err);
      throw err;
    }
  }

  get(endpoint) { return this.request(endpoint, { method: 'GET' }); }
  post(endpoint, body) { return this.request(endpoint, { method: 'POST', body: JSON.stringify(body) }); }
  put(endpoint, body) { return this.request(endpoint, { method: 'PUT', body: JSON.stringify(body) }); }
  patch(endpoint, body) { return this.request(endpoint, { method: 'PATCH', body: JSON.stringify(body) }); }
  delete(endpoint) { return this.request(endpoint, { method: 'DELETE' }); }
}

window.api = new ApiClient();
