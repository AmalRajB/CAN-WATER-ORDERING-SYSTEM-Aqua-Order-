"use client";

import React from "react";
import {
    Home,
    BarChart3,
    Users,
    Settings,
    FileText,
    ChevronRight,
    Package,
    CreditCard,
} from "lucide-react";
import { myAppHook } from "@/context/AppProvider";

import styles from './style/AdminSidebar.module.css';

interface SidebarProps {
    activeNav: string;
    setActiveNav: (id: string) => void;
    sidebarCollapsed: boolean;
    setSidebarCollapsed: (val: boolean) => void;
}

const AdminSidebar: React.FC<SidebarProps> = ({
    activeNav,
    setActiveNav,
    sidebarCollapsed,
    setSidebarCollapsed,
}) => {
    const { logout } = myAppHook();

    const navItems = [
        { id: "dashboard", icon: Home, label: "Dashboard" },
        { id: "analytics", icon: BarChart3, label: "Analytics" },
        { id: "users", icon: Users, label: "Users" },
        { id: "products", icon: Package, label: "Products" },
        { id: "transactions", icon: CreditCard, label: "Transactions" },
        { id: "reports", icon: FileText, label: "Reports" },
        { id: "settings", icon: Settings, label: "Settings" },
    ];

    return (
        <aside className={`${styles.sidebar} ${sidebarCollapsed ? styles.sidebarCollapsed : ""}`}>
            <div className={styles.logo}>
                <div className={styles.logoIcon}>A</div>
                {!sidebarCollapsed && (
                    <div>
                        <h1>Admin</h1>
                        <span onClick={logout} style={{ cursor: "pointer", color: "red" }}>
                            Logout
                        </span>
                        <p>Dashboard</p>
                    </div>
                )}
            </div>

            <nav className={styles.nav}>
                {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeNav === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveNav(item.id)}
                            className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <Icon />
                            {!sidebarCollapsed && <span>{item.label}</span>}
                            {isActive && !sidebarCollapsed && <ChevronRight />}
                        </button>
                    );
                })}
            </nav>

            <button className={styles.collapseBtn} onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
                <ChevronRight className={sidebarCollapsed ? "" : styles.rotate} />
            </button>
        </aside>
    );
};

export default AdminSidebar;
