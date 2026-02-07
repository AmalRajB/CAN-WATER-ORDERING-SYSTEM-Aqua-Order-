"use client";

import React from "react";
import AdminSidebar from "../../../components/Adminnavbar"
import DashboardStatusChart from "@/components/DashboardStatusChart";
import Loader from "@/components/loader"
import { Users, Package, PackageCheck, Clock } from "lucide-react";
import styles from "./AdminDashboard.module.css";
import { myAppHook } from "@/context/AppProvider";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";


interface StatDataType {
    total_active_users: number;
    pending_bookings: number;
    delivered_bookings: number;
    total_water_cans_sold: string
}

export default function AdminDashboard() {
    const [activeNav, setActiveNav] = React.useState("dashboard");
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
    const { authToken } = myAppHook();
    const router = useRouter();
    const [stats, setStats] = useState<StatDataType | null>(null)
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!authToken) {
            router.replace("/auth")
        }
    }, [authToken, router]);


    useEffect(() => {
        const fetchdata = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${API_URL}/admin/dashboard-stats`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        }
                    }
                )
                setStats(response.data)

            } catch (error) {
                console.log(error)

            } finally {
                setLoading(false)
            }

        }
        if (authToken) {
            fetchdata();
        }
    }, [authToken, router, API_URL])


    const statsCards = [
        {
            title: "Delivered Orders",
            value: stats?.delivered_bookings ?? 0,
            trend: "up",
            icon: PackageCheck,
        },
        {
            title: "Active Users",
            value: stats?.total_active_users ?? 0,
            trend: "up",
            icon: Users,
        },
        {
            title: "Pending Orders",
            value: stats?.pending_bookings ?? 0,
            trend: "down",
            icon: Clock,
        },
        {
            title: "Total Water Can Sold",
            value: stats?.total_water_cans_sold ?? 0,
            trend: "up",
            icon: Package,
        },
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
                {loading ? (
                    <div className={styles.loaderWrapper}>
                        <Loader />
                    </div>
                ) : (

                    <div className={styles.content}>
                        {activeNav === 'dashboard' && (
                            <div className={styles.statsGrid}>
                                {statsCards.map((stat, i) => {
                                    const Icon = stat.icon;
                                    return (
                                        <div key={stat.title} className={styles.statCard} style={{ animationDelay: `${i * 0.1}s` }}>
                                            <div className={styles.statHeader}>
                                                <div className={styles.statIcon}>
                                                    <Icon />
                                                </div>
                                            </div>
                                            <h4>{stat.title}</h4>
                                            <p>{stat.value}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        {stats && (
                            <div style={{ marginTop: "2rem" }}>
                                <DashboardStatusChart
                                    delivered={stats.delivered_bookings}
                                    pending={stats.pending_bookings}
                                    sold={Number(stats.total_water_cans_sold)}
                                />
                            </div>
                        )}

                        {activeNav !== 'dashboard' && (
                            <div style={{ padding: '2rem', textAlign: 'center', color: '#80746b' }}>
                                <h2>{activeNav.charAt(0).toUpperCase() + activeNav.slice(1)} Component</h2>
                                <p>This component is not yet implemented.</p>
                            </div>
                        )}
                    </div>
                )}


            </main>


        </div>

    );
}
