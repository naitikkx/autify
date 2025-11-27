import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './GrowthView.module.css';

const data = [
    { name: 'Mon', followers: 4000 },
    { name: 'Tue', followers: 4500 },
    { name: 'Wed', followers: 4800 },
    { name: 'Thu', followers: 5100 },
    { name: 'Fri', followers: 5900 },
    { name: 'Sat', followers: 6500 },
    { name: 'Sun', followers: 7200 },
];

export const GrowthView: React.FC = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Follower Growth - Summer Vibes '25</h2>
            <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FF4081" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#FF4081" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2C" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="#B3B3B3"
                            tick={{ fill: '#B3B3B3', fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#B3B3B3"
                            tick={{ fill: '#B3B3B3', fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #2C2C2C', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="followers"
                            stroke="#FF4081"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorFollowers)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
