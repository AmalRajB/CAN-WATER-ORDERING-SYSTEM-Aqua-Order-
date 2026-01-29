"use client"

import styles from "./MyOrders.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";


const MyOrders: React.FC = () => {

    return (
        <>
            <Navbar />
            <div style={{ minHeight: "90vh", padding: "20px 0" }}>
                <div className={styles.ordersContainer}>
                    {[
                        {
                            id: 1,
                            fullname: "John Doe",
                            deliveryAddress: "123 Main Street",
                            deliveryDate: "2026-02-01",
                            canQuantity: 2,
                            status: "Pending",
                        },
                        {
                            id: 2,
                            fullname: "Jane Smith",
                            deliveryAddress: "456 Park Avenue",
                            deliveryDate: "2026-02-03",
                            canQuantity: 1,
                            status: "Pending",
                        },
                    ].map((order) => (
                        <div key={order.id} className={styles.orderCard}>
                            <div className={styles.orderInfo}>
                                <p><strong>Name:</strong> {order.fullname}</p>
                                <p><strong>Address:</strong> {order.deliveryAddress}</p>
                                <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>
                                <p><strong>Quantity:</strong> {order.canQuantity} cans</p>
                                <p><strong>Status:</strong> {order.status}</p>
                            </div>
                            <div className={styles.orderActions}>
                                <button
                                    className={`${styles.btn} ${styles.btnUpdate}`}
                                    onClick={() => alert(`Update order ${order.id} clicked!`)}
                                >
                                    Update
                                </button>
                                <button
                                    className={`${styles.btn} ${styles.btnCancel}`}
                                    onClick={() => {
                                        if (confirm("Are you sure you want to cancel this order?")) {
                                            alert(`Order ${order.id} canceled!`);
                                        }
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyOrders;
