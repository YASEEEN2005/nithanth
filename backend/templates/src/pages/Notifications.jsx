import React from 'react';
import Layout from '../components/Layout';

const Notifications = ({ notes, user }) => {
  return (
    <Layout user={user}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Notifications</h2>

        {notes && notes.length > 0 ? (
          <div className="animate-fade-in">
            {notes.map((n, index) => {
              // Extract username (first word) for avatar
              const senderName = n.message.split(' ')[0];
              
              // Highlight phone number
              const parts = n.message.split(/(Phone: \d+)/);
              
              return (
                <div key={index} className="card" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '15px', padding: '1rem 1.5rem' }}>
                  {/* Small Profile Icon */}
                  <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      background: '#e0e7ff', 
                      color: '#4f46e5',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      flexShrink: 0
                  }}>
                    {senderName.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p style={{ margin: 0, fontSize: '1rem', color: 'var(--text-main)' }}>
                      {parts.map((part, i) => 
                        part.startsWith('Phone:') ? (
                          <span key={i} style={{ fontWeight: 700, color: 'var(--primary-color)', background: '#f5f3ff', padding: '2px 6px', borderRadius: '4px' }}>
                            {part}
                          </span>
                        ) : (
                          <span key={i}>{part}</span>
                        )
                      )}
                    </p>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Just now</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card text-center" style={{ padding: '3rem', color: 'var(--text-muted)' }}>
             <div style={{ fontSize: '2.5rem', marginBottom: '1rem', opacity: 0.5 }}>🔕</div>
             <p style={{ fontSize: '1.2rem' }}>No new notifications</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Notifications;
