import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getCookie } from '../utils/csrf';

const Register = ({ error, user }) => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    setCsrfToken(getCookie('csrftoken'));
  }, []);

  return (
    <Layout user={user}>
      <div className="auth-container animate-fade-in">
        <h2 className="auth-title">Create Account</h2>

        {error && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px', borderRadius: '8px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form method="post" action="/register/">
          <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
          
          <div className="input-group">
            <input type="text" name="username" className="input-field" placeholder="Username" required />
          </div>
          
          <div className="input-group">
            <input type="text" name="phone" className="input-field" placeholder="Phone Number" required />
          </div>

          <div className="input-group">
            <input type="password" name="password" className="input-field" placeholder="Password" required />
          </div>

          <div className="input-group">
            <input type="password" name="confirm" className="input-field" placeholder="Confirm Password" required />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Register
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)' }}>
          Already have an account? <a href="/login/" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Login here</a>
        </p>
      </div>
    </Layout>
  );
};

export default Register;
