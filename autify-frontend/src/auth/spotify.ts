// Spotify Auth Configuration
// Note: In a real app, these should be in environment variables
const CLIENT_ID = '111584c3d9574599bfefa747b25d317c'; // Provided by user
const REDIRECT_URI = 'http://localhost:5173/';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPES = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'playlist-modify-public',
    'playlist-modify-private'
];

export const getLoginUrl = () => {
    return `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPES.join(' '))}&show_dialog=true`;
};

export const getTokenFromUrl = (): string | null => {
    const hash = window.location.hash;
    if (!hash) return null;

    const params = new URLSearchParams(hash.substring(1)); // Remove the #
    const token = params.get('access_token');

    // Clear the hash to clean up the URL
    if (token) {
        window.location.hash = '';
    }

    return token;
};
