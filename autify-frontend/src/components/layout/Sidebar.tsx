import React from 'react';
import { Music, Disc, ListMusic } from 'lucide-react';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = () => {
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
                <div className={styles.item}>
                    <ListMusic size={18} />
                    <span>Chill Lo-Fi</span>
                </div>
                <div className={styles.item}>
                    <ListMusic size={18} />
                    <span>Top Hits 2024</span>
                </div>
                <div className={styles.item}>
                    <ListMusic size={18} />
                    <span>Coding Focus</span>
                </div>
            </div>
        </aside>
    );
};
