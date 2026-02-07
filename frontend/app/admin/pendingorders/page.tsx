"use client";

import React from "react";
import styles from "./PendingOrders.module.css";
import AdminSidebar from "@/components/Adminnavbar";
import Loader from "@/components/loader"
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
  alert_sent: boolean;

}


const PendingOrders: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const { authToken } = myAppHook();
  const router = useRouter();
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`
  const [orders, setorders] = useState<OrderType[]>([])
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!authToken) {
      router.replace("/auth")
    }
  }, [authToken, router])

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${API_URL}/bookings?status=pending`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            }
          })
        setorders(response.data)
      } catch (error) {
        toast.error("data fetching failed try again...")

      } finally {
        setLoading(false)
      }
    }
    if (authToken) {
      fetchdata();
    }
  }, [authToken, API_URL])


  const sendAlertMessage = async (bookingId: number) => {
    try {
      await axios.post(`${API_URL}/admin/bookings/alert`,
        { 'booking_id': bookingId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          }
        }

      )
      toast.success("alert message sented..")

      setorders(prev =>
        prev.map(order =>
          order.id === bookingId
            ? { ...order, alert_sent: true }
            : order
        )
      )

    } catch (error: any) {
      console.log(error)
      toast.error("already message sented...")

    }
  }




  return (
    <div className={styles.wrapper}>
      <AdminSidebar
        activeNav="pendingorders"
        setActiveNav={() => { }}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <main className={styles.main}>
        {loading ? (
          <div className={styles.loaderWrapper}>
            <Loader />
          </div>
        ) : (
          <div className={styles.container}>
            <h2 className={styles.title}>Pending Orders</h2>

            <div className={styles.card}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Delivery address</th>
                    <th>Delivery Date</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Action</th>

                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.fullname}</td>
                      <td>{order.address}</td>
                      <td>{order.delivery_date}</td>
                      <td>{order.quantity}</td>
                      <td>
                        <span className={styles.pending}>{order.status}</span>
                      </td>
                      <td>
                        <button
                          className={`${styles.viewBtn} ${order.alert_sent ? styles.ongoingBtn : ""}`}
                          disabled={order.alert_sent}
                          onClick={() => sendAlertMessage(order.id)}
                        >
                          {order.alert_sent ? "Ongoing" : "Alert"}
                        </button>
                        <button className={styles.singlebtn} onClick={() => router.push(`/admin/singleorder/${order.id}`)} >view</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PendingOrders;
