"use client"

import React, { useEffect, useState } from "react"
import { myAppHook } from "@/context/AppProvider"
import { useRouter } from "next/navigation"

interface FormData {
    name?: string
    email: string
    password: string
    password_confirmation?: string
}

const Auth: React.FC = () => {
    const [islogin, setislogin] = useState(true)
    const [formdata, setformdata] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    })

    const router = useRouter()
    const { login, register, authToken, role, isloading } = myAppHook()

    useEffect(() => {
        if (isloading) return

        if (authToken && role === "admin") {
            router.replace("/admin/home")
        }

        if (authToken && role === "user") {
            router.replace("/user/userhome")
        }
    }, [authToken, role, isloading, router])

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        if (islogin) {
            await login(formdata.email, formdata.password)
        } else {
            await register(
                formdata.name!,
                formdata.email,
                formdata.password,
                formdata.password_confirmation!
            )
        }
    }

    if (isloading) return null

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: "400px" }}>
                <h3 className="text-center">{islogin ? "Login" : "Register"}</h3>

                <form onSubmit={handleSubmit}>
                    {!islogin && (
                        <input
                            className="form-control mb-2"
                            placeholder="Name"
                            value={formdata.name}
                            onChange={(e) =>
                                setformdata({ ...formdata, name: e.target.value })
                            }
                            required
                        />
                    )}

                    <input
                        className="form-control mb-2"
                        type="email"
                        placeholder="Email"
                        value={formdata.email}
                        onChange={(e) =>
                            setformdata({ ...formdata, email: e.target.value })
                        }
                        required
                    />

                    <input
                        className="form-control mb-2"
                        type="password"
                        placeholder="Password"
                        value={formdata.password}
                        onChange={(e) =>
                            setformdata({ ...formdata, password: e.target.value })
                        }
                        required
                    />

                    {!islogin && (
                        <input
                            className="form-control mb-2"
                            type="password"
                            placeholder="Confirm Password"
                            value={formdata.password_confirmation}
                            onChange={(e) =>
                                setformdata({
                                    ...formdata,
                                    password_confirmation: e.target.value
                                })
                            }
                            required
                        />
                    )}

                    <button className="btn btn-primary w-100">
                        {islogin ? "Login" : "Register"}
                    </button>
                </form>

                <p className="mt-3 text-center">
                    {islogin ? "Don't have an account? " : "Already have an account? "}
                    <span
                        onClick={() => setislogin(!islogin)}
                        style={{ cursor: "pointer", color: "blue" }}
                    >
                        {islogin ? "Register" : "Login"}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Auth
