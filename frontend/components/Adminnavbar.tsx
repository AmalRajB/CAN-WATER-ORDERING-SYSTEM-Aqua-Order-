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
    LogOut,
    type LucideIcon
} from "lucide-react";
import { myAppHook } from "@/context/AppProvider";
import { useRouter } from "next/navigation";
import styles from './style/AdminSidebar.module.css';

interface SidebarProps {
    activeNav: string;
    setActiveNav: (id: string) => void;
    sidebarCollapsed: boolean;
    setSidebarCollapsed: (val: boolean) => void;
}

interface NavLinkProps {
    id: string;
    label: string;
    icon: LucideIcon;
    isActive: boolean;
    onClick: (id: string) => void;
    collapsed: boolean;
}

// Internal NavLink component to satisfy the "component" requirement 
// while keeping everything in one file.
const NavLink: React.FC<NavLinkProps> = ({ id, label, icon: Icon, isActive, onClick, collapsed }) => {
    return (
        <button
            onClick={() => onClick(id)}
            className={`${styles.navItem} ${isActive ? styles.active : ""}`}
            title={collapsed ? label : undefined}
        >
            <Icon size={20} className={styles.itemIcon} />
            {!collapsed && <span className={styles.itemLabel}>{label}</span>}
            {isActive && !collapsed && <ChevronRight size={16} />}
        </button>
    );
};



const AdminSidebar: React.FC<SidebarProps> = ({
    activeNav,
    setActiveNav,
    sidebarCollapsed,
    setSidebarCollapsed,
}) => {
    const { logout } = myAppHook();
    const router = useRouter();

    const handleNavigation = (id: string) => {
        setActiveNav(id);
        if (id === 'dashboard') {
            router.push('/admin/home');
        }
    };

    return (
        <aside className={`${styles.sidebar} ${sidebarCollapsed ? styles.sidebarCollapsed : ""}`}>
            <div className={styles.logo}>
                <div className={styles.logoIcon}>A</div>
                {!sidebarCollapsed && (
                    <div className={styles.logoText}>
                        <h1>Admin</h1>
                        <p>Dashboard</p>
                    </div>
                )}
            </div>

            <nav className={styles.nav}>
                <NavLink
                    id="dashboard"
                    label="Dashboard"
                    icon={Home}
                    isActive={activeNav === "dashboard"}
                    onClick={handleNavigation}
                    collapsed={sidebarCollapsed}
                />
                <NavLink
                    id="analytics"
                    label="Analytics"
                    icon={BarChart3}
                    isActive={activeNav === "analytics"}
                    onClick={handleNavigation}
                    collapsed={sidebarCollapsed}
                />
                <NavLink
                    id="users"
                    label="Users"
                    icon={Users}
                    isActive={activeNav === "users"}
                    onClick={handleNavigation}
                    collapsed={sidebarCollapsed}
                />
                <NavLink
                    id="products"
                    label="Products"
                    icon={Package}
                    isActive={activeNav === "products"}
                    onClick={handleNavigation}
                    collapsed={sidebarCollapsed}
                />
                <NavLink
                    id="transactions"
                    label="Transactions"
                    icon={CreditCard}
                    isActive={activeNav === "transactions"}
                    onClick={handleNavigation}
                    collapsed={sidebarCollapsed}
                />
                <NavLink
                    id="reports"
                    label="Reports"
                    icon={FileText}
                    isActive={activeNav === "reports"}
                    onClick={handleNavigation}
                    collapsed={sidebarCollapsed}
                />
                <NavLink
                    id="settings"
                    label="Settings"
                    icon={Settings}
                    isActive={activeNav === "settings"}
                    onClick={handleNavigation}
                    collapsed={sidebarCollapsed}
                />

                {/* Logout Button as a Nav Item equivalent */}
                <button
                    onClick={logout}
                    className={styles.navItem}
                    style={{ marginTop: 'auto', color: '#ef4444' }}
                    title={sidebarCollapsed ? "Logout" : undefined}
                >
                    <LogOut size={20} className={styles.itemIcon} />
                    {!sidebarCollapsed && <span className={styles.itemLabel}>Logout</span>}
                </button>
            </nav>

            <button
                className={styles.collapseBtn}
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
                <ChevronRight
                    size={20}
                    className={sidebarCollapsed ? "" : styles.rotate}
                />
            </button>
        </aside>
    );
};

export default AdminSidebar;
