import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Community from './pages/Community';
import PostHelp from './pages/PostHelp';
import Notifications from './pages/Notifications';
import MyRequests from './pages/MyRequests';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';

// Helper to normalize path by removing trailing slash for comparison
// but we must be careful as Django uses trailing slashes.
const getPath = () => window.location.pathname;

function App() {
  const path = getPath();
  
  // Expecting backend to inject data into window.djangoContext
  const context = window.djangoContext || {};
  const user = context.user || (context.request && context.request.user) || null;

  let Component = null;
  let props = { user, ...context };

  // Simple Router based on Django URLs
  if (path === '/' || path === '') {
    Component = Home;
  } else if (path.startsWith('/login')) {
    Component = Login;
  } else if (path.startsWith('/register')) {
    Component = Register;
  } else if (path.startsWith('/community')) {
    Component = Community;
  } else if (path.startsWith('/post-help')) {
    Component = PostHelp;
  } else if (path.startsWith('/notifications')) {
    Component = Notifications;
  } else if (path.startsWith('/my-requests')) {
    Component = MyRequests;
  } else if (path.startsWith('/profile')) {
    Component = Profile;
  } else if (path.startsWith('/change-password')) {
    Component = ChangePassword;
  } else {
    // 404 Fallback or Default to Home? 
    // Given we replaced all templates, if a URL doesn't match, we might show 404.
    // However, if the backend renders a template we deleted, it crashes. 
    // If we are here, React is running.
    Component = () => (
      <div style={{ padding: 20 }}>
        <h2>404 - Page Not Found</h2>
        <a href="/">Go Home</a>
      </div>
    );
  }

  return <Component {...props} />;
}

export default App;
