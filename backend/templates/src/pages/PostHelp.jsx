import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getCookie } from '../utils/csrf';

const PostHelp = ({ success, help, user }) => {
  const [csrfToken, setCsrfToken] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    setCsrfToken(getCookie('csrftoken'));
  }, []);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    setStatus("Locating...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        setStatus("Location captured ✔");
      },
      () => {
        alert("Please allow location access");
        setStatus("Location denied ❌");
      }
    );
  };

  return (
    <Layout user={user}>
      <div className="auth-container animate-fade-in" style={{ maxWidth: '600px', textAlign: 'left' }}>
        <h2 className="auth-title" style={{ textAlign: 'center' }}>Post Help Request</h2>

        <form method="post" action="/post-help/">
          <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />

          <div className="input-group">
            <label className="text-bold" style={{ display: 'block', marginBottom: '5px' }}>Title</label>
            <input type="text" name="title" className="input-field" placeholder="e.g. Need help carrying groceries" required />
          </div>

          <div className="input-group">
            <label className="text-bold" style={{ display: 'block', marginBottom: '5px' }}>Description</label>
            <textarea name="description" className="input-field" rows="4" placeholder="Describe what you need help with..." required></textarea>
          </div>

          <div className="input-group">
            <label className="text-bold" style={{ display: 'block', marginBottom: '5px' }}>Phone Contact</label>
            <input type="text" name="phone" className="input-field" placeholder="Your phone number" required />
          </div>

          {/* hidden location */}
          <input type="hidden" name="latitude" id="lat" value={lat} />
          <input type="hidden" name="longitude" id="lng" value={lng} />

          <div className="input-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.9rem', color: status.includes('✔') ? 'green' : 'var(--text-muted)' }}>
                  {status || "Location required"}
              </span>
              <button type="button" onClick={getLocation} className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
                📍 Get Location
              </button>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Post Request
          </button>
        </form>

        {success && (
          <div className="card mt-4" style={{ background: '#ecfdf5', borderColor: '#6ee7b7' }}>
             <h3 style={{ color: '#065f46', marginTop: 0 }}>✅ Posted Successfully!</h3>
             <a href={help.location_link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
               View Location on Map
             </a>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PostHelp;
