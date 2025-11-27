import React from 'react';
import { Sidebar } from './Sidebar';
import { ChatPanel } from './ChatPanel';
import { ContentPanel } from './ContentPanel';
import styles from './MainLayout.module.css';

export const MainLayout: React.FC = () => {
    return (
        <div className={styles.container}>
            <Sidebar />
            <ContentPanel />
            <ChatPanel />
        </div>
    );
};
