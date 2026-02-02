"use client"

import React from "react";
import styles from "./adminprofile.module.css";
import Image from "next/image";

import AdminSidebar from "@/components/Adminnavbar";

const AdminProfile: React.FC = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

    return (
        <div className={styles.wrapper}>
            <AdminSidebar
                activeNav="adminprofile"
                setActiveNav={() => { }} // No-op since we define activeNav statically per page
                sidebarCollapsed={sidebarCollapsed}
                setSidebarCollapsed={setSidebarCollapsed}
            />
            <main className={styles.main}>
                <div className={styles.profileContainer}>
                    <Image
                        src="/images/userprofile.avif"
                        alt="Profile Image"
                        width={120}
                        height={120}
                        className={styles.profileImage}
                    />

                    <div className={styles.username}>John Doe</div>

                    <div className={styles.buttonGroup}>
                        <button className={`${styles.btn} ${styles.btnChange}`}>
                            Change Password
                        </button>
                        <button className={`${styles.btn} ${styles.btnLogout}`}>
                            Logout
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );

};

export default AdminProfile;
