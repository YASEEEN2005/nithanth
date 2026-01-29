import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getCookie } from '../utils/csrf';

const Login = ({ error, user }) => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    setCsrfToken(getCookie('csrftoken'));
  }, []);

  return (
    <Layout user={user}>
      <div className="auth-container animate-fade-in">
        <h2 className="auth-title">Welcome Back</h2>

        {error && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px', borderRadius: '8px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form method="post" action="/login/">
          <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
          
          <div className="input-group">
            <input 
              type="text" 
              name="username" 
              className="input-field"
              placeholder="Username" 
              required 
            />
          </div>

          <div className="input-group">
            <input 
              type="password" 
              name="password" 
              className="input-field"
              placeholder="Password" 
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Login
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)' }}>
          Don't have an account? <a href="/register/" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Register here</a>
        </p>
      </div>
    </Layout>
  );
};

export default Login;
