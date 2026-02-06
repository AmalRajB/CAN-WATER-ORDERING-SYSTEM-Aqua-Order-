"use client";

import styles from "./NotificationPage.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { myAppHook } from "@/context/AppProvider";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

interface MessageType {
    id: number;
    booking_id: number;
    message: string;
    created_at: string;
    // isloading: boolean;
}

const NotificationPage = () => {


    const { authToken, setisloading } = myAppHook();
    const router = useRouter();
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`
    const [message, setmessage] = useState<MessageType[]>([])

    useEffect(() => {
        if (!authToken) {
            router.replace("/auth")
        }
    }, [authToken, router])

    useEffect(() => {
        if (!authToken) return;

        const fetchNotification = async () => {
            // setisloading(true);
            try {
                const response = await axios.get(
                    `${API_URL}/notifications`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                setmessage(response.data.data);
            } catch (error) {
                console.log(error);
            } 
        };

        fetchNotification();
    }, [authToken]);



    const formatNotificationTime = (dateString: string) => {
        const createdDate = new Date(dateString);
        const today = new Date();

        const isToday =
            createdDate.getDate() === today.getDate() &&
            createdDate.getMonth() === today.getMonth() &&
            createdDate.getFullYear() === today.getFullYear();

        if (isToday) {
            return createdDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });
        }
        return createdDate.toLocaleDateString();

    };




    return (
        <>
            <Navbar />
            <div className={styles.notificationContainer}>
                <h2 className={styles.pageTitle}>Notifications</h2>

                {message.length === 0 ? (
                    <div className={styles.emptyState}>
                        No notifications available.
                    </div>
                ) : (
                    message.map((item) => (
                        <div key={item.id} className={styles.notificationItem}>
                            <div className={styles.orderHeader}>
                                Order ID: #{item.booking_id}
                            </div>

                            <div
                                className={`${styles.messageBubble} ${styles.adminMessage}`}
                                style={{ marginTop: "10px" }}
                            >
                                <div className={styles.sender}>Admin</div>
                                {item.message}
                                <div className={styles.time}> {formatNotificationTime(item.created_at)}</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Footer />
        </>


    );
};

export default NotificationPage;
