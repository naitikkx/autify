import React, { useState } from 'react';
import { PlaylistView } from '../views/PlaylistView';
import { HistoryView } from '../views/HistoryView';
import { GrowthView } from '../views/GrowthView';
import styles from './ContentPanel.module.css';

type Tab = 'playlist' | 'history' | 'growth';

interface ContentPanelProps {
    selectedPlaylistId: string | null;
    token: string | null;
}

export const ContentPanel: React.FC<ContentPanelProps> = ({ selectedPlaylistId, token }) => {
    const [activeTab, setActiveTab] = useState<Tab>('playlist');

    return (
        <main className={styles.contentPanel}>
            <div className={styles.tabsContainer}>
                <button
                    className={`${styles.tab} ${activeTab === 'playlist' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('playlist')}
                >
                    Playlist
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'history' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('history')}
                >
                    History
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'growth' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('growth')}
                >
                    Growth
                </button>
            </div>

            <div className={styles.viewContainer}>
                {activeTab === 'playlist' && (
                    <PlaylistView
                        playlistId={selectedPlaylistId}
                        token={token}
                    />
                )}
                {activeTab === 'history' && <HistoryView />}
                {activeTab === 'growth' && <GrowthView />}
            </div>
        </main>
    );
};
