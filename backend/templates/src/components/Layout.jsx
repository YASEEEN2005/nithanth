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
            Neighbour<span style={{ color: 'var(--text-main)' }}>Aid</span>
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
                    <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                  </a>
                  
                  {/* Interesting Logout Button */}
                  <a href="/logout/" style={{ 
                      background: '#fee2e2', 
                      color: '#ef4444', 
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
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = 'white'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.color = '#ef4444'; }}
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
