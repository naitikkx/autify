import { useState, useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { LoginView } from './components/views/LoginView';
import { getTokenFromUrl, getLoginUrl } from './auth/spotify';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getTokenFromUrl();
    if (token) {
      setIsAuthenticated(true);
      // Ideally store token in context or local storage
      console.log('Logged in with token:', token);
    }
  }, []);

  const handleLogin = () => {
    // Check if we have a real client ID or if we should mock
    // For now, we'll just redirect to the real URL which might fail if ID is invalid
    // But we can also provide a "Mock Login" fallback if the user hasn't provided an ID yet.

    // For this demo, let's just simulate a login if the user clicks the button
    // UNLESS they want to test the real flow.
    // Let's try to use the real flow, but catch errors? No, browser redirect.

    // Let's redirect to Spotify
    window.location.href = getLoginUrl();
  };

  if (!isAuthenticated) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <MainLayout />
  );
}

export default App;
