"use client"

import React from "react";
import styles from "./UserProfile.module.css";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer"

const UserProfile: React.FC = () => {
    return (
        <>
            <Navbar />
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
            <Footer />
        </>
    );

};

export default UserProfile;
