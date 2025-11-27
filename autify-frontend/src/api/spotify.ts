const BASE_URL = 'https://api.spotify.com/v1';

export interface UserProfile {
    id: string;
    display_name: string;
    email: string;
    images: { url: string; height: number; width: number }[];
}

export interface Playlist {
    id: string;
    name: string;
    images: { url: string }[];
    owner: { display_name: string };
    description?: string;
    tracks?: { total: number };
}

export interface PlaylistDetails extends Playlist {
    followers: { total: number };
}

export interface Track {
    id: string;
    name: string;
    artists: { name: string }[];
    album: { name: string; images: { url: string }[] };
    duration_ms: number;
    added_at: string; // From playlist track object
}

export const fetchUserProfile = async (token: string): Promise<UserProfile> => {
    const response = await fetch(`${BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
};

export const fetchUserPlaylists = async (token: string): Promise<Playlist[]> => {
    let allPlaylists: Playlist[] = [];
    let nextUrl: string | null = `${BASE_URL}/me/playlists?limit=50`;

    while (nextUrl) {
        const response = await fetch(nextUrl, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch playlists');
        const data = await response.json();
        allPlaylists = [...allPlaylists, ...data.items];
        nextUrl = data.next;
    }

    return allPlaylists;
};

export const fetchPlaylistDetails = async (token: string, playlistId: string): Promise<PlaylistDetails> => {
    const response = await fetch(`${BASE_URL}/playlists/${playlistId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch playlist details');
    return response.json();
};

export const fetchPlaylistTracks = async (token: string, playlistId: string): Promise<Track[]> => {
    const response = await fetch(`${BASE_URL}/playlists/${playlistId}/tracks`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch tracks');
    const data = await response.json();
    return data.items.map((item: any) => ({
        ...item.track,
        added_at: item.added_at,
    }));
};
