"use client"

import Link from "next/link";
import { myAppHook } from "@/context/AppProvider";

const Navbar = () => {
  const { logout } = myAppHook();

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
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav items */}
        <div className="collapse navbar-collapse" id="navbarNav">
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
              <Link href="/user/notification" className="nav-link">
                Notification
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/user/userorderhistory" className="nav-link">
                History
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/user/userprofile" className="nav-link">
                Profile
              </Link>
            </li>

            <li className="nav-item ms-lg-3">
              <button className="btn btn-outline-light btn-sm" onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
