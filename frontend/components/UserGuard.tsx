"use client"

import { myAppHook } from "@/context/AppProvider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function UserGuard({
    children,
}: {
    children: React.ReactNode
}) {
    const { role, authToken, isloading } = myAppHook()
    const router = useRouter()

    useEffect(() => {
        if (isloading) return

        // ❌ Not logged in
        if (!authToken) {
            router.replace("/auth")
            return
        }

        // 🔁 Logged in but wrong role
        if (role === "admin") {
            router.replace("/admin/home")
        }
    }, [role, authToken, isloading, router])

    if (isloading) return null
    if (!authToken || role !== "user") return null

    return <>{children}</>
}
