"use client";

import React from "react";
import styles from "./DeliveredOrders.module.css";

import AdminSidebar from "@/components/Adminnavbar";

const DeliveredOrders: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  return (
    <div className={styles.wrapper}>
      <AdminSidebar
        activeNav="deliverdorders"
        setActiveNav={() => { }}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <main className={styles.main}>
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
                {[1, 2, 3].map((_, index) => (
                  <tr key={index}>
                    <td>#DEL-20{index}</td>
                    <td>Ravi Kumar</td>
                    <td>+91 98765 43210</td>
                    <td>Anna Nagar, Chennai</td>
                    <td>5 Cans</td>
                    <td>2026-02-05</td>
                    <td>
                      <span className={styles.delivered}>Delivered</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeliveredOrders;
