import React from 'react';
import { Sparkles, Send } from 'lucide-react';
import styles from './ChatPanel.module.css';

export const ChatPanel: React.FC = () => {
    return (
        <aside className={styles.chatPanel}>
            <div className={styles.header}>
                <Sparkles size={16} className={styles.headerIcon} />
                <h2 className={styles.title}>GEMINI CHAT ASSISTANT</h2>
            </div>

            <div className={styles.chatLog}>
                {/* System Message */}
                <div className={styles.systemMessage}>
                    <div className={styles.avatar}>
                        <Sparkles size={16} />
                    </div>
                    <div className={styles.messageContent}>
                        <p>Hello! I'm your music assistant. How can I help you manage your playlists today?</p>
                    </div>
                </div>

                {/* User Message */}
                <div className={styles.userMessage}>
                    <div className={styles.messageContent}>
                        <p>Add "Blinding Lights" to my Summer playlist.</p>
                    </div>
                    <div className={styles.avatar}>U</div>
                </div>

                {/* System Message with Confirmation Card */}
                <div className={styles.systemMessage}>
                    <div className={styles.avatar}>
                        <Sparkles size={16} />
                    </div>
                    <div className={styles.messageContent}>
                        <p>I found "Blinding Lights" by The Weeknd. Should I add it to "Summer Vibes '25"?</p>

                        <div className={styles.confirmationCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.albumArt} />
                                <div className={styles.songDetails}>
                                    <span className={styles.songTitle}>Blinding Lights</span>
                                    <span className={styles.songArtist}>The Weeknd</span>
                                </div>
                            </div>
                            <div className={styles.cardActions}>
                                <button className={styles.confirmBtn}>Confirm</button>
                                <button className={styles.cancelBtn}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.inputFooter}>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="Ask Gemini to manage your music..."
                        className={styles.input}
                    />
                    <Send size={16} className={styles.sendIcon} />
                </div>
            </div>
        </aside>
    );
};
