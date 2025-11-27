import React, { useEffect, useState } from 'react';
import { Clock, Music, Calendar, User } from 'lucide-react';
import styles from './PlaylistView.module.css';
import { fetchPlaylistTracks, fetchPlaylistDetails } from '../../api/spotify';
import type { Track, PlaylistDetails } from '../../api/spotify';

interface PlaylistViewProps {
    playlistId: string | null;
    token: string | null;
}

export const PlaylistView: React.FC<PlaylistViewProps> = ({ playlistId, token }) => {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [playlist, setPlaylist] = useState<PlaylistDetails | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (playlistId && token) {
            const loadData = async () => {
                setLoading(true);
                try {
                    const [tracksData, playlistData] = await Promise.all([
                        fetchPlaylistTracks(token, playlistId),
                        fetchPlaylistDetails(token, playlistId)
                    ]);
                    setTracks(tracksData);
                    setPlaylist(playlistData);
                } catch (error) {
                    console.error("Failed to fetch playlist data", error);
                } finally {
                    setLoading(false);
                }
            };
            loadData();
        }
    }, [playlistId, token]);

    const formatDuration = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    if (!playlistId) {
        return <div className={styles.emptyState}>Select a playlist to view tracks</div>;
    }

    if (loading) {
        return <div className={styles.loadingState}>Loading playlist...</div>;
    }

    return (
        <div className={styles.container}>
            {playlist && (
                <div className={styles.header}>
                    <div className={styles.headerImageContainer}>
                        {playlist.images?.[0]?.url ? (
                            <img src={playlist.images[0].url} alt={playlist.name} className={styles.headerImage} />
                        ) : (
                            <div className={styles.headerImagePlaceholder}>
                                <Music size={64} />
                            </div>
                        )}
                    </div>
                    <div className={styles.headerInfo}>
                        <span className={styles.headerLabel}>Playlist</span>
                        <h1 className={styles.headerTitle}>{playlist.name}</h1>
                        <p className={styles.headerDescription}>{playlist.description}</p>
                        <div className={styles.headerMeta}>
                            <div className={styles.ownerInfo}>
                                <User size={16} />
                                <span className={styles.ownerName}>{playlist.owner.display_name}</span>
                            </div>
                            <span className={styles.metaSeparator}>•</span>
                            <span>{playlist.followers.total.toLocaleString()} likes</span>
                            <span className={styles.metaSeparator}>•</span>
                            <span>{playlist.tracks?.total} songs</span>
                        </div>
                    </div>
                </div>
            )}

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th}>#</th>
                        <th className={styles.th}>Title</th>
                        <th className={styles.th}>Album</th>
                        <th className={styles.th}><Calendar size={16} /></th>
                        <th className={styles.th}><Clock size={16} /></th>
                    </tr>
                </thead>
                <tbody>
                    {tracks.map((track, index) => (
                        <tr key={`${track.id}-${index}`} className={styles.row}>
                            <td className={styles.tdIndex}>{index + 1}</td>
                            <td className={styles.tdTitle}>
                                <div className={styles.songInfo}>
                                    {track.album.images[0] ? (
                                        <img src={track.album.images[0].url} alt={track.album.name} className={styles.albumArt} />
                                    ) : (
                                        <div className={styles.albumPlaceholder}><Music size={16} /></div>
                                    )}
                                    <div className={styles.textInfo}>
                                        <span className={styles.songName}>{track.name}</span>
                                        <span className={styles.artistName}>{track.artists.map(a => a.name).join(', ')}</span>
                                    </div>
                                </div>
                            </td>
                            <td className={styles.tdAlbum}>{track.album.name}</td>
                            <td className={styles.tdDate}>{formatDate(track.added_at)}</td>
                            <td className={styles.tdDuration}>{formatDuration(track.duration_ms)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
