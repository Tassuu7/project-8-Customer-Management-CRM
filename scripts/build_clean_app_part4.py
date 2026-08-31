def get_part4():
    return """
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
                      <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 6px;">${l.firstName} ${l.lastName} &bull; ${l.email || ''}</div>
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
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
    container.innerHTML = '<div class="glass-panel" style="padding: 40px; text-align: center;">Loading Opportunity Pipeline...</div>';
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
            <p style="color: var(--text-secondary);">Weighted Pipeline: <strong style="color: var(--accent-success);">$${metrics.weightedPipelineValue.toLocaleString()}</strong> &bull; Win Rate: <strong>${metrics.winRatePercentage}%</strong></p>
          </div>
          <button class="btn btn-primary" onclick="window.app.openCreateDealModal()">+ New Deal</button>
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
                      ${d.stage !== 'Won' ? `
                        <div style="margin-top: 8px; text-align: right;">
                          <button class="btn btn-secondary btn-sm" onclick="window.app.advanceDealStage('${d.id}')">Advance Stage &rarr;</button>
                        </div>
                      ` : '<div style="font-size: 0.78rem; color: var(--accent-success); font-weight: 700; margin-top: 6px;">&#10003; Closed Won</div>'}
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
                  <div style="font-size: 0.8rem; color: var(--text-muted);">Due: ${task.dueDate} &bull; <span class="badge badge-${task.priority.toLowerCase()}">${task.priority}</span> &bull; <span class="badge badge-${task.status === 'Completed' ? 'low' : 'growth'}">${task.status}</span></div>
                </div>
                ${task.status !== 'Completed' ? `
                  <button class="btn btn-secondary btn-sm" onclick="window.app.completeTask('${task.id}')">&#10003; Done</button>
                ` : '<span style="color: #10b981; font-weight: 700; font-size: 0.85rem;">&#10003; Completed</span>'}
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
                      ${inv.status !== 'Paid' ? `<button class="btn btn-primary btn-sm" onclick="window.app.payInvoice('${inv.id}')">Mark Paid</button>` : '<span style="color: #10b981; font-weight: 700;">&#10003; Cleared</span>'}
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
      await window.api.post(`/leads/${leadId}/convert`, { createDeal: true, dealAmount: 85000 });
      this.showToast('Lead successfully converted into Account, Contact & Opportunity Deal!', 'success');
      this.handleRoute();
    } catch (err) {
      this.showToast(err.message, 'error');
    }
  }

  async advanceDealStage(dealId) {
    try {
      const stages = ['Discovery', 'Demo', 'Proposal', 'Negotiation', 'Won'];
      const res = await window.api.get('/deals');
      const deal = (res.data || []).find(d => d.id === dealId);
      if (deal) {
        const curIdx = stages.indexOf(deal.stage);
        const nextStage = curIdx < stages.length - 1 ? stages[curIdx + 1] : 'Won';
        await window.api.patch(`/deals/${dealId}/stage`, { stage: nextStage });
        this.showToast(`Deal advanced to ${nextStage}!`, 'success');
        this.handleRoute();
      }
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

  // Interactive Modal System
  openModal(title, bodyHtml, onSave) {
    this.closeModal();
    const modalBackdrop = document.createElement('div');
    modalBackdrop.id = 'active-modal-backdrop';
    modalBackdrop.className = 'modal-backdrop active';
    modalBackdrop.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title">${title}</div>
          <button class="modal-close" onclick="window.app.closeModal()">&times;</button>
        </div>
        <div class="modal-body">
          ${bodyHtml}
        </div>
      </div>
    `;
    document.body.appendChild(modalBackdrop);
  }

  closeModal() {
    const existing = document.getElementById('active-modal-backdrop');
    if (existing) existing.remove();
  }

  openCreateCustomerModal() {
    const formHtml = `
      <form onsubmit="event.preventDefault(); window.app.submitCreateCustomer();">
        <div class="form-group">
          <label class="form-label">Account / Company Name *</label>
          <input type="text" id="modal-cust-name" required placeholder="e.g. Apex Global Solutions" class="form-input">
        </div>
        <div class="form-group">
          <label class="form-label">Website Domain *</label>
          <input type="text" id="modal-cust-domain" required placeholder="e.g. apexsolutions.io" class="form-input">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
          <div class="form-group">
            <label class="form-label">Industry Vertical</label>
            <select id="modal-cust-industry" class="form-select">
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Financial Services">Financial Services</option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="Cybersecurity">Cybersecurity</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Account Tier</label>
            <select id="modal-cust-tier" class="form-select">
              <option value="Enterprise">Enterprise</option>
              <option value="Growth">Growth</option>
              <option value="Standard">Standard</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Annual Contract Revenue ($)</label>
          <input type="number" id="modal-cust-rev" required value="250000" class="form-input">
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
          <button type="button" class="btn btn-secondary" onclick="window.app.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Customer Account</button>
        </div>
      </form>
    `;
    this.openModal('Add New Customer Account', formHtml);
  }

  async submitCreateCustomer() {
    const name = document.getElementById('modal-cust-name').value;
    const domain = document.getElementById('modal-cust-domain').value;
    const industry = document.getElementById('modal-cust-industry').value;
    const tier = document.getElementById('modal-cust-tier').value;
    const annualRevenue = Number(document.getElementById('modal-cust-rev').value);

    try {
      await window.api.post('/customers', { name, domain, industry, tier, annualRevenue });
      this.showToast(`Customer account "${name}" created successfully!`, 'success');
      this.closeModal();
      this.handleRoute();
    } catch (err) {
      this.showToast(err.message, 'error');
    }
  }

  openCreateLeadModal() {
    const formHtml = `
      <form onsubmit="event.preventDefault(); window.app.submitCreateLead();">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
          <div class="form-group">
            <label class="form-label">First Name *</label>
            <input type="text" id="modal-lead-fn" required placeholder="John" class="form-input">
          </div>
          <div class="form-group">
            <label class="form-label">Last Name *</label>
            <input type="text" id="modal-lead-ln" required placeholder="Doe" class="form-input">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Company Name *</label>
          <input type="text" id="modal-lead-company" required placeholder="e.g. CyberSecurity Systems" class="form-input">
        </div>
        <div class="form-group">
          <label class="form-label">Work Email *</label>
          <input type="email" id="modal-lead-email" required placeholder="john@cybersecurity.io" class="form-input">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
          <div class="form-group">
            <label class="form-label">Source Channel</label>
            <select id="modal-lead-source" class="form-select">
              <option value="Website">Website</option>
              <option value="Inbound">Inbound Demo</option>
              <option value="Referral">Executive Referral</option>
              <option value="LinkedIn">LinkedIn Outreach</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Estimated Budget ($)</label>
            <input type="number" id="modal-lead-budget" required value="75000" class="form-input">
          </div>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
          <button type="button" class="btn btn-secondary" onclick="window.app.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Create Inbound Lead</button>
        </div>
      </form>
    `;
    this.openModal('Add Inbound Lead Opportunity', formHtml);
  }

  async submitCreateLead() {
    const firstName = document.getElementById('modal-lead-fn').value;
    const lastName = document.getElementById('modal-lead-ln').value;
    const company = document.getElementById('modal-lead-company').value;
    const email = document.getElementById('modal-lead-email').value;
    const source = document.getElementById('modal-lead-source').value;
    const estimatedBudget = Number(document.getElementById('modal-lead-budget').value);

    try {
      await window.api.post('/leads', { firstName, lastName, company, email, source, estimatedBudget });
      this.showToast(`Inbound lead for ${company} recorded!`, 'success');
      this.closeModal();
      this.handleRoute();
    } catch (err) {
      this.showToast(err.message, 'error');
    }
  }

  async openCreateDealModal() {
    let accounts = [];
    try {
      const res = await window.api.get('/customers');
      accounts = res.data || [];
    } catch (e) {}

    const formHtml = `
      <form onsubmit="event.preventDefault(); window.app.submitCreateDeal();">
        <div class="form-group">
          <label class="form-label">Opportunity Deal Title *</label>
          <input type="text" id="modal-deal-title" required placeholder="e.g. Enterprise Cloud License Phase 1" class="form-input">
        </div>
        <div class="form-group">
          <label class="form-label">Customer Account *</label>
          <select id="modal-deal-account" class="form-select">
            ${accounts.map(a => `<option value="${a.id}">${a.name}</option>`).join('')}
          </select>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
          <div class="form-group">
            <label class="form-label">Deal Amount ($) *</label>
            <input type="number" id="modal-deal-amount" required value="150000" class="form-input">
          </div>
          <div class="form-group">
            <label class="form-label">Initial Stage</label>
            <select id="modal-deal-stage" class="form-select">
              <option value="Discovery">Discovery</option>
              <option value="Demo">Demo</option>
              <option value="Proposal">Proposal</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Won">Won</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Target Close Date</label>
          <input type="date" id="modal-deal-date" required value="2026-10-31" class="form-input">
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
          <button type="button" class="btn btn-secondary" onclick="window.app.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Create Opportunity Deal</button>
        </div>
      </form>
    `;
    this.openModal('Create Opportunity Deal', formHtml);
  }

  async submitCreateDeal() {
    const title = document.getElementById('modal-deal-title').value;
    const accountId = document.getElementById('modal-deal-account').value;
    const amount = Number(document.getElementById('modal-deal-amount').value);
    const stage = document.getElementById('modal-deal-stage').value;
    const expectedCloseDate = document.getElementById('modal-deal-date').value;

    try {
      await window.api.post('/deals', { title, accountId, amount, stage, expectedCloseDate });
      this.showToast(`Opportunity "${title}" created!`, 'success');
      this.closeModal();
      this.handleRoute();
    } catch (err) {
      this.showToast(err.message, 'error');
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
"""
