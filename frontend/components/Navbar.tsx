"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { myAppHook } from "@/context/AppProvider";
import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`
  const { authToken } = myAppHook();
  const router = useRouter();


  useEffect(() => {
    if (!authToken) {
      router.replace('/auth')
    }
    const fetchmessageCount = async () => {
      try {
        const response = await axios.get(`${API_URL}/notifications/unreaded`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            }
          }
        )
        setUnreadCount(response.data.unread_count)
      } catch (error) {
        console.log(error)
      }

    };
    if (authToken) {
      fetchmessageCount();
    }
  }, [authToken])


  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        {/* Brand */}
        <Link href="/user/userhome" className="navbar-brand fw-bold">
          AquaOrder
        </Link>

        {/* Toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav items */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link href="/user/userhome" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/user/booking" className="nav-link">
                Booking
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/user/myorder" className="nav-link">
                My Order
              </Link>
            </li>


            <li className="nav-item">
              <Link href="/user/userorderhistory" className="nav-link">
                History
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/user/notification" className="nav-link">
                <div className="notificationIcon">
                  <Bell size={22} />

                  {unreadCount > 0 && (
                    <span className="badge">
                      {unreadCount}
                    </span>
                  )}
                </div>
              </Link>
            </li>



            <li className="nav-item">
              <Link className="btn btn-outline-light btn-sm" href="/user/userprofile" >
                Profile
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
