import React from 'react';
import Layout from '../components/Layout';

const MyRequests = ({ posts, user }) => {
  return (
    <Layout user={user}>
      <h2 style={{ marginBottom: '1.5rem' }}>My Help Requests</h2>

      {posts && posts.length > 0 ? (
        <div className="grid-3 animate-fade-in">
          {posts.map((post, index) => (
            <div key={index} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                 <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{post.title}</h3>
                 {post.is_taken ? (
                    <span className="badge badge-success">Accepted</span>
                 ) : (
                    <span className="badge badge-warning">Open</span>
                 )}
              </div>
              
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', minHeight: '60px' }}>
                {post.description}
              </p>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '15px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                 {post.is_taken ? (
                   <p style={{ margin: 0, color: '#059669' }}>
                     🛠 Accepted by <b>{post.helper ? post.helper.username : 'Someone'}</b>
                     {post.helper && post.helper.phone && (
                        <span style={{ display: 'block', marginTop: '5px', fontSize: '0.9rem', color: '#047857' }}>
                           📞 {post.helper.phone}
                        </span>
                     )}
                   </p>
                 ) : (
                   <p style={{ margin: 0 }}>Waiting for a neighbour...</p>
                 )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center" style={{ padding: '3rem', color: 'var(--text-muted)' }}>
           <p style={{ fontSize: '1.2rem' }}>You haven’t posted any help requests yet.</p>
           <a href="/post-help/" className="btn btn-primary mt-4">Create Request</a>
        </div>
      )}
    </Layout>
  );
};

export default MyRequests;
