import React from 'react';

const Layout = ({ children, user }) => {
  const path = window.location.pathname;

  const isActive = (url) => path === url ? 'active' : '';

  return (
    <div>
      {/* Navbar with Glassmorphism */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="nav-logo">
            Neighbour<span style={{ color: 'var(--brand-secondary)' }}>Aid</span>
          </a>

          <div className="nav-links">
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <a href="/" className={`nav-link ${isActive('/')}`}>Home</a>
                <a href="/community/" className={`nav-link ${isActive('/community/')}`}>Community</a>
                
                <a href="/post-help/" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', borderRadius: '30px' }}>
                 + Post Help
                </a>

                {/* Notifications Link */}
                <a href="/notifications/" className={`nav-link ${isActive('/notifications/')}`} title="Notifications">
                  Notifications
                </a>

                <a href="/my-requests/" className={`nav-link ${isActive('/my-requests/')}`}>
                  My Requests
                </a>
                
                {/* Profile Section */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '15px', borderLeft: '1px solid var(--border-color)' }}>
                  <a href="/profile/" className={`nav-link ${isActive('/profile/')}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                    <div style={{ 
                      width: '38px', 
                      height: '38px', 
                      borderRadius: '10px', 
                      background: 'var(--brand-primary)', 
                      color: 'white', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontSize: '1.1rem',
                      fontWeight: '800',
                      border: '2px solid white',
                      boxShadow: '0 2px 6px rgba(47, 128, 237, 0.25)' 
                    }}>
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{user.username}</span>
                  </a>
                  
                  {/* Interesting Logout Button */}
                  <a href="/logout/" style={{ 
                      background: 'white', 
                      color: 'var(--danger)',
                      border: '1px solid var(--border)', 
                      width: '35px', 
                      height: '35px', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '1rem',
                      transition: 'all 0.2s',
                      textDecoration: 'none'
                    }} 
                    title="Logout"
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--danger)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--danger)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--danger)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                  >
                    ⏻
                  </a>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <a href="/login/" className="nav-link">Login</a>
                <a href="/register/" className="btn btn-primary">Get Started</a>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content with Fade In */}
      <main className="container animate-fade-in">
        {children}
      </main>
    </div>
  );
};

export default Layout;
