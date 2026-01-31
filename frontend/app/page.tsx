"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { myAppHook } from "@/context/AppProvider";

export default function Home() {

  const { logout } = myAppHook()


  return <>
  <h1>hii this is demo  page </h1>
  <button  onClick={logout} >logout</button>
  
  
  </>
}
