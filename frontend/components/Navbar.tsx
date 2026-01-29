"use client"


import Link from "next/link";
import { myAppHook } from "@/context/AppProvider";

const Navbar = () => {

  const {logout} = myAppHook()





  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        {/* Brand */}
        <a className="navbar-brand fw-bold" href="/">
          AquaOrder
        </a>

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
              <a className="nav-link" href="/">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/dashboard">
                booking
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/auth">
                myorder
              </a>
            </li>

            <li className="nav-item ms-lg-3">
              <button className="btn btn-outline-light btn-sm" onClick={logout}>
                logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
