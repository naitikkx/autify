// Spotify Auth Configuration
const CLIENT_ID = '111584c3d9574599bfefa747b25d317c';
const REDIRECT_URI = window.location.origin + '/'; // Must match exactly in Dashboard
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

const SCOPES = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'playlist-modify-public',
    'playlist-modify-private'
];

// PKCE Helper Functions
const generateRandomString = (length: number) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
};

const base64encode = (input: ArrayBuffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
};

export const redirectToAuthCodeFlow = async () => {
    const verifier = generateRandomString(128);
    const challenge = base64encode(await sha256(verifier));

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", CLIENT_ID);
    params.append("response_type", "code");
    params.append("redirect_uri", REDIRECT_URI);
    params.append("scope", SCOPES.join(" "));
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `${AUTH_ENDPOINT}?${params.toString()}`;
};

export const getAccessToken = async (code: string): Promise<string | null> => {
    const verifier = localStorage.getItem("verifier");

    if (!verifier) {
        console.error("No verifier found in local storage");
        return null;
    }

    const params = new URLSearchParams();
    params.append("client_id", CLIENT_ID);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", REDIRECT_URI);
    params.append("code_verifier", verifier);

    try {
        const result = await fetch(TOKEN_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });

        if (!result.ok) {
            const errorText = await result.text();
            console.error("Token exchange failed:", errorText);
            return null;
        }

        const { access_token } = await result.json();
        return access_token;
    } catch (error) {
        console.error("Error fetching access token:", error);
        return null;
    }
};
