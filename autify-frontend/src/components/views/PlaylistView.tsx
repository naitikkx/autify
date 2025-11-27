import React, { useEffect, useState } from 'react';
import { Clock, Music, Calendar } from 'lucide-react';
import styles from './PlaylistView.module.css';
import { fetchPlaylistTracks } from '../../api/spotify';
import type { Track } from '../../api/spotify';

interface PlaylistViewProps {
    playlistId: string | null;
    token: string | null;
}

export const PlaylistView: React.FC<PlaylistViewProps> = ({ playlistId, token }) => {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (playlistId && token) {
            const loadTracks = async () => {
                setLoading(true);
                try {
                    const data = await fetchPlaylistTracks(token, playlistId);
                    setTracks(data);
                } catch (error) {
                    console.error("Failed to fetch tracks", error);
                } finally {
                    setLoading(false);
                }
            };
            loadTracks();
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
        return <div className={styles.loadingState}>Loading tracks...</div>;
    }

    return (
        <div className={styles.container}>
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
