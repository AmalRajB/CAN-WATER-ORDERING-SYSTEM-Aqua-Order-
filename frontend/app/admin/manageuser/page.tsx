"use client";

import React from "react";
import styles from "./ManageUsers.module.css";
import AdminSidebar from "@/components/Adminnavbar";
import { myAppHook } from "@/context/AppProvider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";



interface Datatype {
  id: number;
  name: string,
  email: string;
  is_active: boolean;
}


const ManageUsers: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const { authToken } = myAppHook();
  const router = useRouter();
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`
  const [data, setdata] = useState<Datatype[]>([])
  const [currentpage, setcurrentpage] = useState(1);
  const [lastpage, setlastpage] = useState(1);
  const [search, setsearch] = useState("");




  useEffect(() => {
    if (!authToken) {
      router.replace("/auth")
    }
  }, [authToken, router])



  useEffect(() => {
    const delay = setTimeout(() => {
      if (authToken) {
        fetchdata();
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [search])


  useEffect(()=>{
    if(authToken){
      fetchdata();
    }
  },[authToken, currentpage])



  const fetchdata = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/users`, {
        params: {
          page: currentpage,
          search: search || undefined,
        },


        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setdata(response.data.data.data)
      setcurrentpage(response.data.data.current_page)
      setlastpage(response.data.data.last_page)
    } catch (error) {
      toast.error("user data fetching failed try again...")
    }
  }


  const performAction = async (id: number) => {
    try {
      await axios.patch(`${API_URL}/admin/users/${id}/toggle-status`, {}, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });

      // Update local state to reflect change immediately
      setdata(prevData => prevData.map(user =>
        user.id === id ? { ...user, is_active: !user.is_active } : user
      ));

      toast.success("User status updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user status");
    }
  }




  return (
    <>
      <div className={styles.wrapper}>
        <AdminSidebar
          activeNav="manageuser"
          setActiveNav={() => { }}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
        <main className={styles.main}>
          <div className={styles.container}>
            {/* search start */}
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="Search user by email..."
                value={search}
                onChange={(e) => {
                  setsearch(e.target.value);
                  setcurrentpage(1);
                }}
              />
            </div>


            <h2 className={styles.title}>Manage Users</h2>

            <div className={styles.card}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {data.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ textAlign: "center" }}>
                        No users found
                      </td>
                    </tr>
                  )}


                  {Array.isArray(data) && data.map((value) => (
                    <tr key={value.id}>
                      <td>{value.id}</td>
                      <td>{value.name}</td>
                      <td>{value.email}</td>
                      <td>
                        <span className={value.is_active ? styles.active : styles.blocked}>
                          {value.is_active ? "Active" : "Blocked"}
                        </span>
                      </td>
                      <td>
                        <button
                          className={value.is_active ? styles.blockBtn : styles.unblockBtn}
                          onClick={() => performAction(value.id)}
                        >
                          {value.is_active ? "Block" : "Unblock"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>


              <div className={styles.pagination}>
                <button
                  disabled={currentpage === 1}
                  onClick={() => setcurrentpage(prev => prev - 1)}
                >
                  Previous
                </button>

                <span>
                  Page {currentpage} of {lastpage}
                </span>

                <button
                  disabled={currentpage === lastpage}
                  onClick={() => setcurrentpage(prev => prev + 1)}
                >
                  Next
                </button>
              </div>



            </div>
          </div>
        </main>
      </div>


    </>

  );
};

export default ManageUsers;
