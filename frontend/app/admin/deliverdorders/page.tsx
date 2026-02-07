"use client";

import React from "react";
import styles from "./DeliveredOrders.module.css";
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
  mob_number: string;
  address: string;
  quantity: number;
  updated_at: string;
  status: string;

}




const DeliveredOrders: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const { authToken } = myAppHook();
  const router = useRouter();
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`
  const [DeliverdData, setDeliverdData] = useState<OrderType[]>([])
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
        const response = await axios.get(`${API_URL}/bookings?status=delivered`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            }
          }
        )
        setDeliverdData(response.data)

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




  return (
    <div className={styles.wrapper}>
      <AdminSidebar
        activeNav="deliverdorders"
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
            <h2 className={styles.title}>Delivered Orders</h2>

            <div className={styles.card}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Mobile</th>
                    <th>Address</th>
                    <th>Quantity</th>
                    <th>Delivered Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {DeliverdData.map((data) => (
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>{data.fullname}</td>
                      <td>{data.mob_number}</td>
                      <td>{data.address}</td>
                      <td>{data.quantity}</td>
                      <td>{new Date(data.updated_at).toLocaleString()}</td>
                      <td>
                        <span className={styles.delivered}>Delivered</span>
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

export default DeliveredOrders;
