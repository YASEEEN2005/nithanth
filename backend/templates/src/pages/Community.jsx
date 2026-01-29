import React from 'react';
import Layout from '../components/Layout';

const Community = ({ posts, user }) => {
  return (
    <Layout user={user}>
      <div className="flex justify-between items-center mb-4">
        <h2>Community Help Requests</h2>
      </div>

      {posts && posts.length > 0 ? (
        <div className="grid-3 animate-fade-in">
          {posts.map((post) => (
            <div key={post.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.25rem' }}>{post.title}</h3>
                {post.is_taken ? (
                   <span className="badge badge-success">Taken</span>
                ) : (
                   <span className="badge badge-warning">Open</span>
                )}
              </div>
              
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', minHeight: '60px' }}>
                {post.description}
              </p>

              <div style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                <p style={{ margin: '5px 0' }}>👤 <b>{post.user.username}</b></p>
                <p style={{ margin: '5px 0' }}>📞 {post.phone}</p>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
                <a href={post.location_link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}>
                  📍 Map
                </a>

                {user && user.username === post.user.username ? (
                  /* Owner view */
                  post.is_taken ? (
                    <div className="btn" style={{ flex: 1, background: '#f0fdf4', color: '#166534', cursor: 'default' }}>
                      Accepted by {post.helper.username}
                    </div>
                  ) : (
                    <div className="btn" style={{ flex: 1, background: '#f8fafc', color: '#64748b', cursor: 'default' }}>
                      Your Post
                    </div>
                  )
                ) : (
                  /* Other users view */
                  !post.is_taken ? (
                    <a href={`/accept/${post.id}/`} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}>
                      Accept
                    </a>
                  ) : (
                    <div className="btn" style={{ flex: 1, background: '#fef2f2', color: '#991b1b', cursor: 'not-allowed' }}>
                      Taken
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center" style={{ padding: '3rem', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '1.2rem' }}>No help requests available yet.</p>
          <a href="/post-help/" className="btn btn-primary mt-4">Create First Request</a>
        </div>
      )}
    </Layout>
  );
};

export default Community;
