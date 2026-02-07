"use client"

import { createContext, useContext, useEffect, useState } from "react"
import Loader from "@/components/loader"
import axios from "axios"
import toast, { Toast } from "react-hot-toast"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

interface AppProviderType {
    isloading: boolean,
    setisloading: (value: boolean) => void,
    authToken: string | null,
    role: "admin" | "user" | null
    login: (email: string, password: string) => Promise<void>,
    register: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>
    logout: () => void

}

const AppContext = createContext<AppProviderType | undefined>(undefined)

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`

export const AppProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const [isloading, setisloading] = useState<boolean>(true)
    const [authToken, setAuthToken] = useState<string | null>(null)
    const [role, setRole] = useState<"admin" | "user" | null>(null)

    const router = useRouter()

    useEffect(() => {
        const token = Cookies.get("authToken")
        const savedRole = Cookies.get("role")

        if (token && (savedRole === "admin" || savedRole === "user")) {
            setAuthToken(token)
            setRole(savedRole)
        } else {
            router.replace("/auth")
        }
        setisloading(false)
    }, [router])


    const login = async (email: string, password: string) => {

        setisloading(true)

        try {

            const response = await axios.post(`${API_URL}/login`, {
                email,
                password
            });
            if (response.data.status) {
                const userRole = response.data.user.role
                Cookies.set("authToken", response.data.token, {
                    expires: 7,
                    path: "/",
                    sameSite: "lax"
                })
                Cookies.set("role", userRole, { expires: 7 })
                setAuthToken(response.data.token)
                setRole(userRole)
                toast.success("login success..")

                if (userRole === "admin") {
                    router.push("/admin/home")
                } else {
                    router.push("/user/userhome")
                }

            } else {
                toast.error("invalid login details..")
            }

        } catch (error) {
            console.log(error)
            toast.error("Login failed")

        } finally {
            setisloading(false)
        }



    }

    const register = async (name: string, email: string, password: string, password_confirmation: string) => {

        setisloading(true)

        try {

            const response = await axios.post(`${API_URL}/register`, {
                name,
                email,
                password,
                password_confirmation
            });
            router.replace("/auth")
            toast.success("registration success...")

        } catch (error) {
            console.log(error)

        } finally {
            setisloading(false)

        }

    }
    const logout = () => {
        setAuthToken(null)
        Cookies.remove("authToken")
        Cookies.remove("role")
        setisloading(false)
        toast.success("user logout successfully")
        router.replace("/auth")

    }

    return (
        <AppContext.Provider value={{ login, register, isloading, authToken, logout, role, setisloading }}>
            {isloading ? <Loader /> : children}
        </AppContext.Provider>
    )

}

export const myAppHook = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("context will be wrapped inside AppProvider")

    }
    return context;
}

