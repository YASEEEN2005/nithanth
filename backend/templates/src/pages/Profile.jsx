import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getCookie } from '../utils/csrf';

const Profile = ({ profile, user }) => {
  const [csrfToken, setCsrfToken] = useState('');
  
  // Local state for inputs to allow editing, initialized from props
  const [username, setUsername] = useState(user ? user.username : '');
  const [phone, setPhone] = useState(profile ? profile.phone : '');

  useEffect(() => {
    setCsrfToken(getCookie('csrftoken'));
  }, []);

  return (
    <Layout user={user}>
      <div className="auth-container animate-fade-in" style={{ padding: '2.5rem', marginTop: '2rem' }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 15px' }}>
             {user ? user.username.charAt(0).toUpperCase() : 'U'}
          </div>
          <h2 className="auth-title" style={{ marginBottom: '5px' }}>{user ? user.username : 'My Profile'}</h2>
          <p className="text-muted">Manage your personal details</p>
        </div>

        <form method="post" action="/profile/">
          <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />

          <div className="input-group" style={{ textAlign: 'left' }}>
            <label className="text-bold" style={{ display: 'block', marginBottom: '5px' }}>Username</label>
            <input 
                type="text" 
                name="username" 
                className="input-field"
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                required 
            />
          </div>

          <div className="input-group" style={{ textAlign: 'left' }}>
            <label className="text-bold" style={{ display: 'block', marginBottom: '5px' }}>Phone Number</label>
            <input 
                type="text" 
                name="phone" 
                className="input-field"
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                required 
            />
          </div>
          
          <div style={{ textAlign: 'left', marginBottom: '20px' }}>
             <a href="/change-password/" style={{ color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: 500 }}>
               🔒 Change Password
             </a>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Update Profile</button>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
