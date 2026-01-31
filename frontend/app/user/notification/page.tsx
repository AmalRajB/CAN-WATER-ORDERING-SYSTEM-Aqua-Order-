"use client";

import styles from "./NotificationPage.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer"

const NotificationPage = () => {
    const notifications = [
        {
            orderId: 201,
            userMessage: "I have placed an order for 2 water cans.",
            adminReply:
                "Your order is in process. Delivery can be expected within 24 hours.",
            time: "10 mins ago",
        },
        {
            orderId: 202,
            userMessage: "Order placed for 1 water can.",
            adminReply:
                "Your order is in process. Delivery can be expected within 24 hours.",
            time: "1 hour ago",
        },
    ];

    return (
        <>
        <Navbar />
            <div className={styles.notificationContainer}>
                <h2 className={styles.pageTitle}>Notifications</h2>

                {notifications.length === 0 ? (
                    <div className={styles.emptyState}>
                        No notifications available.
                    </div>
                ) : (
                    notifications.map((item, index) => (
                        <div key={index} className={styles.notificationItem}>
                            <div className={styles.orderHeader}>
                                Order ID: #{item.orderId}
                            </div>

                            {/* User Message */}
                            <div className={`${styles.messageBubble} ${styles.userMessage}`}>
                                <div className={styles.sender}>You</div>
                                {item.userMessage}
                                <div className={styles.time}>{item.time}</div>
                            </div>

                            {/* Admin Reply */}
                            <div
                                className={`${styles.messageBubble} ${styles.adminMessage}`}
                                style={{ marginTop: "10px" }}
                            >
                                <div className={styles.sender}>Admin</div>
                                {item.adminReply}
                                <div className={styles.time}>{item.time}</div>
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
