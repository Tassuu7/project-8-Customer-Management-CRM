def get_part2():
    return """
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
"""
