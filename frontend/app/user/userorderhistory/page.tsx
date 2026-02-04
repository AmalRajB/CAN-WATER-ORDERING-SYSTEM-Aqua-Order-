"use client";

import styles from "./OrderHistory.module.css";
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
    mob_number: string;
    address: string;
    quantity: number;
    updated_at: string;
    status: string;

}

const OrderHistory = () => {

    const { authToken } = myAppHook();
    const router = useRouter();
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`
    const [DeliverdData, setDeliverdData] = useState<OrderType[]>([])

    useEffect(()=>{
        if(!authToken){
            router.replace("/auth")
        }
    },[authToken, router])

    useEffect(()=>{

        const fetchdata = async () =>{
            try{
                const response = await axios.get(`${API_URL}/bookings?status=delivered`,
                    {
                        headers:{
                            Authorization:`Bearer ${authToken}`,
                        }
                    })
                    setDeliverdData(response.data)

            }catch(error){
                toast.error("data fetching failed try again...")

            }}
            if(authToken){
                fetchdata();
            }

    },[authToken, API_URL])



    return (
        <>
            <Navbar />
            <div className={styles.historyContainer}>
                <h2 className={styles.pageTitle}>Order History</h2>

                {DeliverdData.length === 0 ? (
                    <div className={styles.emptyState}>
                        No delivered orders yet.
                    </div>
                ) : (
                    DeliverdData.map((data) => (
                        <div key={data.id} className={styles.historyItem}>
                            <div className={styles.statusColumn}>
                                <div className={styles.statusBadge}>Delivered</div>
                                <div className={styles.date}>{new Date(data.updated_at).toLocaleString()}</div>
                            </div>

                            <div className={styles.detailsColumn}>
                                <div className={styles.detailsRow}>
                                    <span className={styles.label}>Order ID</span>
                                    <span className={styles.value}>#{data.id}</span>
                                </div>

                                <div className={styles.detailsRow}>
                                    <span className={styles.label}>Delivery Address</span>
                                    <span className={styles.value}>{data.address}</span>
                                </div>

                                <div className={styles.detailsRow}>
                                    <span className={styles.label}>Can Quantity</span>
                                    <span className={styles.value}>{data.quantity}</span>
                                </div>

                                {/* <div className={styles.detailsRow}>
                                    <span className={styles.label}>Delivery Date</span>
                                    <span className={styles.value}>{order.deliveryDate}</span>
                                </div> */}
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
