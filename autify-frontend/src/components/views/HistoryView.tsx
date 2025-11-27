import React from 'react';
import { Plus, Minus } from 'lucide-react';
import styles from './HistoryView.module.css';

interface Log {
    id: string;
    type: 'added' | 'removed';
    song: string;
    artist: string;
    timestamp: string;
}

const MOCK_LOGS: Log[] = [
    { id: '1', type: 'added', song: 'Blinding Lights', artist: 'The Weeknd', timestamp: '2 mins ago' },
    { id: '2', type: 'removed', song: 'Bad Habits', artist: 'Ed Sheeran', timestamp: '1 hour ago' },
    { id: '3', type: 'added', song: 'As It Was', artist: 'Harry Styles', timestamp: '3 hours ago' },
    { id: '4', type: 'added', song: 'Stay', artist: 'The Kid LAROI', timestamp: '1 day ago' },
    { id: '5', type: 'removed', song: 'Peaches', artist: 'Justin Bieber', timestamp: '2 days ago' },
];

export const HistoryView: React.FC = () => {
    return (
        <div className={styles.container}>
            {MOCK_LOGS.map((log) => (
                <div key={log.id} className={`${styles.card} ${log.type === 'added' ? styles.added : styles.removed}`}>
                    <div className={styles.iconWrapper}>
                        {log.type === 'added' ? <Plus size={16} /> : <Minus size={16} />}
                    </div>
                    <div className={styles.content}>
                        <span className={styles.actionText}>
                            {log.type === 'added' ? 'Added' : 'Removed'} <strong>'{log.song}'</strong> by <strong>{log.artist}</strong>
                        </span>
                        <span className={styles.timestamp}>{log.timestamp}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};
