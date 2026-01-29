import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getCookie } from '../utils/csrf';

const ChangePassword = ({ error, success, user }) => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    setCsrfToken(getCookie('csrftoken'));
  }, []);

  return (
    <Layout user={user}>
      <div className="auth-container animate-fade-in" style={{ maxWidth: '450px' }}>
        <h2 className="auth-title">Change Password</h2>
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Secure your account with a new password</p>

        {error && <div className="badge badge-warning" style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}>⚠️ {error}</div>}
        {success && <div className="badge badge-success" style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}>✅ Password changed successfully!</div>}

        <form method="post" action="/change-password/">
          <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />

          <div className="input-group">
            <label className="text-bold" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Old Password</label>
            <input type="password" name="old_password" className="input-field" required />
          </div>

          <div className="input-group">
            <label className="text-bold" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>New Password</label>
            <input type="password" name="new_password" className="input-field" required />
          </div>

          <div className="input-group">
            <label className="text-bold" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Confirm New Password</label>
            <input type="password" name="confirm_password" className="input-field" required />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Update Password
          </button>
        </form>

        <div style={{ marginTop: '1.5rem' }}>
          <a href="/profile/" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
            Cancel & Return to Profile
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default ChangePassword;
