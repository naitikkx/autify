import React from 'react';
import { Music, Disc, ListMusic, LogOut } from 'lucide-react';
import styles from './Sidebar.module.css';
import type { UserProfile, Playlist } from '../../api/spotify';

interface SidebarProps {
    user: UserProfile | null;
    playlists: Playlist[];
    onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ user, playlists, onLogout }) => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.header}>
                <Music className={styles.logoIcon} size={24} />
                <h1 className={styles.title}>Autify</h1>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionHeader}>PINNED</h3>
                <div className={`${styles.item} ${styles.active}`}>
                    <Disc size={18} />
                    <span>Summer Vibes '25</span>
                </div>
                <div className={styles.item}>
                    <ListMusic size={18} />
                    <span>Gym Motivation</span>
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionHeader}>ALL PLAYLISTS</h3>
                <div className={styles.scrollableList}>
                    {playlists.map((playlist) => (
                        <div key={playlist.id} className={styles.item}>
                            <ListMusic size={18} />
                            <span className={styles.playlistName}>{playlist.name}</span>
                        </div>
                    ))}
                    {playlists.length === 0 && (
                        <div className={styles.item}>
                            <span>No playlists found</span>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.spacer} />

            {user && (
                <div className={styles.profileFooter}>
                    <div className={styles.profileInfo}>
                        {user.images?.[0]?.url ? (
                            <img src={user.images[0].url} alt={user.display_name} className={styles.avatar} />
                        ) : (
                            <div className={styles.avatarPlaceholder}>{user.display_name?.[0] || 'U'}</div>
                        )}
                        <div className={styles.userDetails}>
                            <span className={styles.userName}>{user.display_name}</span>
                            <span className={styles.userStatus}>Spotify Connected</span>
                        </div>
                    </div>
                    <button className={styles.logoutBtn} onClick={onLogout} title="Logout">
                        <LogOut size={18} />
                    </button>
                </div>
            )}
        </aside>
    );
};
