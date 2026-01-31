"use client"

import { myAppHook } from "@/context/AppProvider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminGuard({
    children,
}: {
    children: React.ReactNode
}) {
    const { role, authToken, isloading } = myAppHook()
    const router = useRouter()

    useEffect(() => {
        if (isloading) return

        if (!authToken) {
            router.replace("/auth")
            return
        }

        if (role === "user") {
            router.replace("/user/userhome")
        }
    }, [role, authToken, isloading, router])

    if (isloading) return null
    if (!authToken || role !== "admin") return null

    return <>{children}</>
}
