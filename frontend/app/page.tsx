"use client"
import { myAppHook } from "@/context/AppProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Home() {

  const { authToken, role } = myAppHook();
  const router = useRouter();

  useEffect(() => {
    if (authToken && role) {
      if (role === 'admin') {
        router.replace("/admin/home")
      } else {
        router.replace("/user/userhome")
      }
    }
  }, [authToken, role, router])

  if (authToken) {
    return null;
  }







  return <>
    <h1>hii this is demo  page </h1>


  </>
}
