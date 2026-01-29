import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

const Home = ({ user }) => {
  // Image Links (Unsplash)
  const images = [
    'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // Auto-rotate images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <Layout user={user}>
      {/* Hero Section */}
      <div 
        className="animate-fade-in" 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          gap: '4rem', 
          padding: '4rem 1rem', 
          minHeight: '500px'
        }}
      >
        {/* Left: Text Content */}
        <div style={{ flex: 1, maxWidth: '600px' }}>
          <h1 style={{ 
            fontSize: '3.8rem', 
            fontWeight: 800, 
            lineHeight: 1.1, 
            marginBottom: '1.5rem',
          }}>
            <span style={{ color: 'var(--brand-primary)' }}>Help your neighbours.</span><br />
            Get help when you need it.
          </h1>

          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            NeighbourAid connects people nearby for quick help – plumbing, electrical work, driving, emergencies, and more. 
            Building a stronger community, one request at a time.
          </p>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="/post-help/" className="btn btn-primary" style={{ padding: '0.9rem 2.2rem', fontSize: '1.1rem' }}>
              Ask for Help
            </a>
            <a href="/community/" className="btn btn-secondary" style={{ padding: '0.9rem 2.2rem', fontSize: '1.1rem' }}>
              Browse Requests
            </a>
          </div>
        </div>

        <div style={{ flex: 1, position: 'relative', height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           {/* Decorative background circle (Solid color instead of gradient) */}
           <div style={{ 
              position: 'absolute', 
              top: '50%', left: '50%', 
              transform: 'translate(-50%, -50%)', 
              width: '80%', height: '80%', 
              background: 'var(--accent-soft)',
              borderRadius: '50%',
              zIndex: 0 
           }} />

           {images.map((img, index) => (
             <img 
                key={index}
                src={img} 
                alt="Community" 
                style={{ 
                  position: 'absolute',
                  width: '100%', 
                  height: 'auto',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  borderRadius: '20px',
                  boxShadow: 'var(--shadow-xl)',
                  opacity: currentImage === index ? 1 : 0,
                  transform: currentImage === index ? 'scale(1)' : 'scale(0.95)',
                  transition: 'opacity 0.8s ease, transform 0.8s ease',
                  zIndex: 1
                }} 
             />
           ))}
        </div>
      </div>

      {/* Features Section */}
      <div style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <h2 className="text-center" style={{ marginBottom: '3rem', fontSize: '2.5rem', fontWeight: 700 }}>How it Works</h2>
        
        <div className="grid-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="card text-center" style={{ padding: '2.5rem' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>📢</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Post a Request</h3>
            <p className="text-muted">Describe what you need help with. It takes less than a minute and is completely free.</p>
          </div>

          <div className="card text-center" style={{ padding: '2.5rem' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>📍</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Connect Nearby</h3>
            <p className="text-muted">Your request becomes visible to neighbours in your area who are ready to help.</p>
          </div>

          <div className="card text-center" style={{ padding: '2.5rem' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>🤝</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Get Help</h3>
            <p className="text-muted">A neighbour accepts your job and you get the help you need efficiently.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
