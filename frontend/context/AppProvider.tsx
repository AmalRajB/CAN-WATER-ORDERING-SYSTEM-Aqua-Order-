"use client"

import { createContext, useContext, useEffect, useState } from "react"
import Loader from "@/components/loader"
import axios from "axios"
import toast, { Toast } from "react-hot-toast"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
interface AppProviderType {
    isloading: boolean,
    authToken: string | null,
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
    const router = useRouter()

    useEffect(() => {
        const token = Cookies.get("authToken");
        if (token) {
            setAuthToken(token)
        } else {
            router.replace("/auth")
        }
        setisloading(false)
    },[])

    const login = async (email: string, password: string) => {

        setisloading(true)

        try {

            const response = await axios.post(`${API_URL}/login`, {
                email,
                password
            });
            if (response.data.status) {
                Cookies.set("authToken", response.data.token, {
                    expires: 7,
                    path: "/",      
                    sameSite: "lax"
                })
                toast.success("login success..")
                setAuthToken(response.data.token)
                router.push("/userhome")
            } else {
                toast.error("invalid login details..")
            }

        } catch (error) {
            console.log(error)

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

        } catch (error) {
            console.log(error)

        } finally {
            setisloading(false)

        }

    }
    const logout = () => {
        setAuthToken(null)
        Cookies.remove("authToken")
        setisloading(false)
        toast.success("user logout successfully")
        router.replace("/auth")

    }

    return (
        <AppContext.Provider value={{ login, register, isloading, authToken, logout }}>
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

