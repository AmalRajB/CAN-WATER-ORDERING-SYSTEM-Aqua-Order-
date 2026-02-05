"use client"

import styles from "./MyOrders.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { myAppHook } from "@/context/AppProvider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";




interface OrderType {
    id: number;
    fullname: string;
    address: string;
    delivery_date: string;
    quantity: number;
    status: string;
}




const MyOrders: React.FC = () => {


    const { authToken, } = myAppHook()
    const router = useRouter()
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`
    const [order, setorder] = useState<OrderType[]>([]);


    useEffect(() => {
        if (!authToken) {
            router.replace("/auth")
            return
        }
    }, [authToken, router])

    useEffect(() => {

        const fetchorder = async () => {
            try {
                const response = await axios.get(`${API_URL}/bookings?status=pending`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        }
                    }
                )
                setorder(response.data);


            } catch (error) {
                toast.error("can't fetch the order try again..")

            }

        }

        if (authToken) {
            fetchorder()
        }
    }, [authToken, API_URL])


    const deleteOrder = async (id: Number) => {
        try {
            await axios.delete(`${API_URL}/bookings/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    }
                }
            )
            setorder(prev =>
                prev.filter(order => order.id !== id))

            toast.success("order cancel successfully..")

        } catch (error) {
            toast.error("cancelation failed try again")

        }

    }


    return (
        <>
            <Navbar />
            <div style={{ minHeight: "90vh", padding: "20px 0" }}>
                <div className={styles.ordersContainer}>


                    {order?.length === 0 && (
                        <p>No pending orders found.</p>
                    )}

                    {order.map((value) => (
                        <div key={value.id} className={styles.orderCard}>
                            <div className={styles.orderInfo}>
                                <p><strong>OrderID:</strong> {value.id}</p>
                                <p><strong>Name:</strong> {value.fullname}</p>
                                <p><strong>Address:</strong> {value.address}</p>
                                <p><strong>Delivery Date:</strong> {value.delivery_date}</p>
                                <p><strong>Quantity:</strong> {value.quantity} cans</p>
                                <p><strong>Status:</strong> <span className="text-warning"> {value.status}</span></p>
                            </div>
                            <div className={styles.orderActions}>
                                <button
                                    className={`${styles.btn} ${styles.btnUpdate}`}
                                    onClick={() => router.push(`/user/bookingupdate/${value.id}`)}
                                >
                                    Update
                                </button>
                                <button
                                    className={`${styles.btn} ${styles.btnCancel}`}
                                    onClick={() => deleteOrder(value.id)}
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
