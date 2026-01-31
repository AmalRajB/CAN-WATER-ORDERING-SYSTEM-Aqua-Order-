"use client";

import styles from "./OrderHistory.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer"

const OrderHistory = () => {
    const deliveredOrders = [
        {
            id: 101,
            address: "123 Main Street, Chennai",
            quantity: 2,
            deliveryDate: "2026-01-10",
            deliveredOn: "2026-01-10",
        },
        {
            id: 102,
            address: "45 Park Avenue, Bangalore",
            quantity: 1,
            deliveryDate: "2026-01-15",
            deliveredOn: "2026-01-15",
        },
    ];

    return (
        <>
            <Navbar />
            <div className={styles.historyContainer}>
                <h2 className={styles.pageTitle}>Order History</h2>

                {deliveredOrders.length === 0 ? (
                    <div className={styles.emptyState}>
                        No delivered orders yet.
                    </div>
                ) : (
                    deliveredOrders.map((order) => (
                        <div key={order.id} className={styles.historyItem}>
                            <div className={styles.statusColumn}>
                                <div className={styles.statusBadge}>Delivered</div>
                                <div className={styles.date}>{order.deliveredOn}</div>
                            </div>

                            <div className={styles.detailsColumn}>
                                <div className={styles.detailsRow}>
                                    <span className={styles.label}>Order ID</span>
                                    <span className={styles.value}>#{order.id}</span>
                                </div>

                                <div className={styles.detailsRow}>
                                    <span className={styles.label}>Delivery Address</span>
                                    <span className={styles.value}>{order.address}</span>
                                </div>

                                <div className={styles.detailsRow}>
                                    <span className={styles.label}>Can Quantity</span>
                                    <span className={styles.value}>{order.quantity}</span>
                                </div>

                                <div className={styles.detailsRow}>
                                    <span className={styles.label}>Delivery Date</span>
                                    <span className={styles.value}>{order.deliveryDate}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Footer />
        </>
    );
};

export default OrderHistory;
