import { useState, useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { LoginView } from './components/views/LoginView';
import { redirectToAuthCodeFlow, getAccessToken } from './auth/spotify';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Check for code in URL (PKCE flow)
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (code) {
        // Exchange code for token
        const token = await getAccessToken(code);
        if (token) {
          setIsAuthenticated(true);
          // Clean URL
          window.history.replaceState({}, document.title, "/");
        }
      } else {
        // Here you might check for a stored token in localStorage if you implemented persistence
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = async () => {
    await redirectToAuthCodeFlow();
  };

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#121212', color: 'white' }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <MainLayout />
  );
}

export default App;
