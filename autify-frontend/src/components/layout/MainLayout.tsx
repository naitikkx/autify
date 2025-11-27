import React from 'react';
import { Sidebar } from './Sidebar';
import { ChatPanel } from './ChatPanel';
import { ContentPanel } from './ContentPanel';
import styles from './MainLayout.module.css';
import type { UserProfile, Playlist } from '../../api/spotify';

interface MainLayoutProps {
    user: UserProfile | null;
    playlists: Playlist[];
    selectedPlaylistId: string | null;
    onSelectPlaylist: (id: string) => void;
    onLogout: () => void;
    token: string | null;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
    user,
    playlists,
    selectedPlaylistId,
    onSelectPlaylist,
    onLogout,
    token
}) => {
    return (
        <div className={styles.container}>
            <Sidebar
                user={user}
                playlists={playlists}
                selectedPlaylistId={selectedPlaylistId}
                onSelectPlaylist={onSelectPlaylist}
                onLogout={onLogout}
            />
            <ContentPanel
                selectedPlaylistId={selectedPlaylistId}
                token={token}
            />
            <ChatPanel />
        </div>
    );
};
