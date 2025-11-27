import React from 'react';
import { Sidebar } from './Sidebar';
import { ChatPanel } from './ChatPanel';
import { ContentPanel } from './ContentPanel';
import styles from './MainLayout.module.css';
import type { UserProfile, Playlist } from '../../api/spotify';

interface MainLayoutProps {
    user: UserProfile | null;
    playlists: Playlist[];
    onLogout: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ user, playlists, onLogout }) => {
    return (
        <div className={styles.container}>
            <Sidebar user={user} playlists={playlists} onLogout={onLogout} />
            <ContentPanel />
            <ChatPanel />
        </div>
    );
};
