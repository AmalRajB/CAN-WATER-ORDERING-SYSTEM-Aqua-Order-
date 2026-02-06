"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import styles from "./style/DashboardStatusChart.module.css";

interface Props {
    delivered: number;
    pending: number;
    sold: number;
}

export default function DashboardStatusChart({
    delivered,
    pending,
    sold,
}: Props) {

    const data = [
        { name: "Delivered", value: delivered },
        { name: "Pending", value: pending },
        { name: "Sold", value: sold },
    ];

    return (
        <div className={styles.chartCard}>
            <h3 className={styles.title}>Overall Booking Analysis</h3>

            <div className={styles.chartWrapper}>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
