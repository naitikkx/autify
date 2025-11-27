import React from 'react';
import { Clock, User } from 'lucide-react';
import styles from './PlaylistView.module.css';

interface Song {
    id: string;
    title: string;
    artist: string;
    dateAdded: string;
    addedBy: string;
    duration: string;
    coverUrl?: string;
}

const MOCK_DATA: Song[] = [
    { id: '1', title: 'Blinding Lights', artist: 'The Weeknd', dateAdded: '2 days ago', addedBy: 'You', duration: '3:20' },
    { id: '2', title: 'As It Was', artist: 'Harry Styles', dateAdded: '3 days ago', addedBy: 'Gemini', duration: '2:47' },
    { id: '3', title: 'Levitating', artist: 'Dua Lipa', dateAdded: '1 week ago', addedBy: 'You', duration: '3:23' },
    { id: '4', title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', dateAdded: '1 week ago', addedBy: 'Gemini', duration: '2:21' },
    { id: '5', title: 'Heat Waves', artist: 'Glass Animals', dateAdded: '2 weeks ago', addedBy: 'You', duration: '3:58' },
];

export const PlaylistView: React.FC = () => {
    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th}>#</th>
                        <th className={styles.th}>Title</th>
                        <th className={styles.th}>Artist</th>
                        <th className={styles.th}>Date Added</th>
                        <th className={styles.th}>Added By</th>
                        <th className={styles.th}><Clock size={16} /></th>
                    </tr>
                </thead>
                <tbody>
                    {MOCK_DATA.map((song, index) => (
                        <tr key={song.id} className={styles.tr}>
                            <td className={styles.tdIndex}>{index + 1}</td>
                            <td className={styles.tdTitle}>
                                <div className={styles.titleContent}>
                                    <div className={styles.coverPlaceholder} />
                                    <span>{song.title}</span>
                                </div>
                            </td>
                            <td className={styles.td}>{song.artist}</td>
                            <td className={styles.td}>{song.dateAdded}</td>
                            <td className={styles.td}>
                                <div className={styles.addedBy}>
                                    <User size={14} />
                                    {song.addedBy}
                                </div>
                            </td>
                            <td className={styles.td}>{song.duration}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
