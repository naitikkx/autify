import React from 'react';
import { Music, Disc, ListMusic, LogOut, Pin } from 'lucide-react';
import styles from './Sidebar.module.css';
import type { UserProfile, Playlist } from '../../api/spotify';

interface SidebarProps {
    user: UserProfile | null;
    playlists: Playlist[];
    selectedPlaylistId: string | null;
    onSelectPlaylist: (id: string) => void;
    onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    user,
    playlists,
    selectedPlaylistId,
    onSelectPlaylist,
    onLogout
}) => {
    const [pinnedPlaylistIds, setPinnedPlaylistIds] = React.useState<string[]>([]);

    const togglePin = (e: React.MouseEvent, playlistId: string) => {
        e.stopPropagation();
        setPinnedPlaylistIds(prev =>
            prev.includes(playlistId)
                ? prev.filter(id => id !== playlistId)
                : [...prev, playlistId]
        );
    };

    const pinnedPlaylists = playlists.filter(p => pinnedPlaylistIds.includes(p.id));

    return (
        <aside className={styles.sidebar}>
            <div className={styles.header}>
                <Music className={styles.logoIcon} size={24} />
                <h1 className={styles.title}>Autify</h1>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionHeader}>PINNED</h3>
                {pinnedPlaylists.length === 0 && (
                    <div className={styles.emptyPinned}>
                        <span>Pin your favorite playlists</span>
                    </div>
                )}
                {pinnedPlaylists.map(playlist => (
                    <div
                        key={`pinned-${playlist.id}`}
                        className={`${styles.item} ${selectedPlaylistId === playlist.id ? styles.active : ''}`}
                        onClick={() => onSelectPlaylist(playlist.id)}
                    >
                        <Disc size={18} />
                        <span className={styles.playlistName}>{playlist.name}</span>
                        <button
                            className={styles.pinBtn}
                            onClick={(e) => togglePin(e, playlist.id)}
                        >
                            <Pin size={14} fill="currentColor" />
                        </button>
                    </div>
                ))}
            </div>

            <div className={`${styles.section} ${styles.allPlaylistsSection}`}>
                <h3 className={styles.sectionHeader}>ALL PLAYLISTS</h3>
                <div className={styles.scrollableList}>
                    {playlists.map((playlist) => (
                        <div
                            key={playlist.id}
                            className={`${styles.item} ${selectedPlaylistId === playlist.id ? styles.active : ''}`}
                            onClick={() => onSelectPlaylist(playlist.id)}
                        >
                            <ListMusic size={18} />
                            <span className={styles.playlistName}>{playlist.name}</span>
                            <button
                                className={`${styles.pinBtn} ${pinnedPlaylistIds.includes(playlist.id) ? styles.pinned : ''}`}
                                onClick={(e) => togglePin(e, playlist.id)}
                            >
                                <Pin size={14} fill={pinnedPlaylistIds.includes(playlist.id) ? "currentColor" : "none"} />
                            </button>
                        </div>
                    ))}
                    {playlists.length === 0 && (
                        <div className={styles.item}>
                            <span>No playlists found</span>
                        </div>
                    )}
                </div>
            </div>

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
