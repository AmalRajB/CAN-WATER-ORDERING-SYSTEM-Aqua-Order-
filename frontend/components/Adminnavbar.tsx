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
        if (id === 'dashboard') router.push('/admin/home');
        if (id === 'adminprofile') router.push('/admin/adminprofile');
        if (id === 'manageuser') router.push('/admin/manageuser');
        if (id === 'pendingorders') router.push('/admin/pendingorders');
        if (id === 'deliverdorders') router.push('/admin/deliverdorders');
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
                    id="adminprofile"
                    label="Admin Profile"
                    icon={Users}
                    isActive={activeNav === "adminprofile"}
                    onClick={handleNavigation}
                    collapsed={sidebarCollapsed}
                />
                <NavLink
                    id="manageuser"
                    label="Manage User"
                    icon={Users}
                    isActive={activeNav === "manageuser"}
                    onClick={handleNavigation}
                    collapsed={sidebarCollapsed}
                />
                <NavLink
                    id="pendingorders"
                    label="Pending Orders"
                    icon={Package}
                    isActive={activeNav === "pendingorders"}
                    onClick={handleNavigation}
                    collapsed={sidebarCollapsed}
                />
                <NavLink
                    id="deliverdorders"
                    label="Delivered Orders"
                    icon={Package}
                    isActive={activeNav === "deliverdorders"}
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
