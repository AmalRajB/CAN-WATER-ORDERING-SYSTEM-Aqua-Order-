"use client"

import React from "react";
import styles from "./adminprofile.module.css";
import Image from "next/image";
import Link from "next/link";
import AdminSidebar from "@/components/Adminnavbar";
import { myAppHook } from "@/context/AppProvider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";

interface UserType {
    email: string;
}

const AdminProfile: React.FC = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

    const { authToken, logout } = myAppHook();
    const router = useRouter();
    const [userEmail, setuserEmail] = useState<string>("");
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`


    useEffect(() => {
        if (!authToken) {
            router.replace("/auth")
        }
    }, [authToken, router])

    useEffect(() => {
        const fetchemail = async () => {
            try {
                const response = await axios.get(`${API_URL}/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        }
                    }
                )
                setuserEmail(response.data.email)
            } catch (error) {
                console.log(error)
            }

        }

        if(authToken){
            fetchemail();
        }
    },[authToken, API_URL])






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

                    <div className={styles.username}>{userEmail}</div>

                    <div className={styles.buttonGroup}>
                        <Link className={`${styles.btn} ${styles.btnChange}`} href={"/admin/adminpasschange"} >change password</Link>
                        <button onClick={logout} className={`${styles.btn} ${styles.btnLogout}`}>
                            Logout
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );

};

export default AdminProfile;
