import { useState, useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { LoginView } from './components/views/LoginView';
import { redirectToAuthCodeFlow, getAccessToken } from './auth/spotify';
import { fetchUserProfile, fetchUserPlaylists } from './api/spotify';
import type { UserProfile, Playlist } from './api/spotify';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (code) {
        const accessToken = await getAccessToken(code);
        if (accessToken) {
          setToken(accessToken);
          setIsAuthenticated(true);
          window.history.replaceState({}, document.title, "/");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (token) {
      const loadData = async () => {
        try {
          const profile = await fetchUserProfile(token);
          const userPlaylists = await fetchUserPlaylists(token);
          setUser(profile);
          setPlaylists(userPlaylists);
        } catch (error) {
          console.error("Failed to load user data", error);
        }
      };
      loadData();
    }
  }, [token]);

  const handleLogin = async () => {
    await redirectToAuthCodeFlow();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setUser(null);
    localStorage.removeItem("verifier");
  };

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#121212', color: 'white' }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <MainLayout
      user={user}
      playlists={playlists}
      onLogout={handleLogout}
    />
  );
}

export default App;
