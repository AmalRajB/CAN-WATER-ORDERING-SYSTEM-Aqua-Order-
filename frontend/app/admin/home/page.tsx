"use client";

import React from "react";
import AdminSidebar from "../../../components/Adminnavbar"
import { TrendingUp, Users, Activity, Package } from "lucide-react";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {
    const [activeNav, setActiveNav] = React.useState("dashboard");
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

    const statsCards = [
        { title: "Total Revenue", value: "$54,239", change: "+12.5%", trend: "up", icon: TrendingUp },
        { title: "Active Users", value: "8,492", change: "+8.2%", trend: "up", icon: Users },
        { title: "Transactions", value: "1,234", change: "-3.1%", trend: "down", icon: Activity },
        { title: "Products", value: "892", change: "+5.7%", trend: "up", icon: Package },
    ];

    return (
        <div className={styles.wrapper}>
            {/* Sidebar */}
            <AdminSidebar
                activeNav={activeNav}
                setActiveNav={setActiveNav}
                sidebarCollapsed={sidebarCollapsed}
                setSidebarCollapsed={setSidebarCollapsed}
            />

            {/* Main */}
            <main className={`${styles.main} ${sidebarCollapsed ? styles.mainCollapsed : ""}`}>
                <div className={styles.content}>
                    <div className={styles.statsGrid}>
                        {statsCards.map((stat, i) => {
                            const Icon = stat.icon;
                            return (
                                <div key={stat.title} className={styles.statCard} style={{ animationDelay: `${i * 0.1}s` }}>
                                    <div className={styles.statHeader}>
                                        <div className={styles.statIcon}>
                                            <Icon />
                                        </div>
                                        <span className={stat.trend === "up" ? styles.up : styles.down}>{stat.change}</span>
                                    </div>
                                    <h4>{stat.title}</h4>
                                    <p>{stat.value}</p>
                                </div>
                            );
                        })}
                    </div>


                </div>
            </main>
        </div>
    );
}
