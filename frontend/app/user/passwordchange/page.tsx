"use client"

import React from 'react'
import { myAppHook } from "@/context/AppProvider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";


type LaravelValidationErrors = {
    [key: string]: string[];
};


interface passwordType {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;

}


const passwordchange = () => {

    const { authToken } = myAppHook();
    const router = useRouter();
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`
    const [password, setpassword] = useState<passwordType>({

        current_password: "",
        new_password: "",
        new_password_confirmation: ""


    })

    useEffect(() => {
        if (!authToken) {
            router.replace("/auth")
        }
    }, [authToken, router])


    const handlesubmition = async (e: React.SyntheticEvent) => {

        e.preventDefault();

        try {
            await axios.post(`${API_URL}/changepassword`,
                password,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    }
                }

            )
            toast.success("password updated successfully")
            router.push("/user/userprofile")

        } catch (error: any) {

            if (error.response?.status === 422 && error.response?.data?.message) {
                toast.error(error.response.data.message);
                return;
            }

            if (error.response?.data?.errors) {
                const errors = error.response.data.errors as LaravelValidationErrors;
                const firstError = Object.values(errors)[0][0];
                toast.error(firstError);
            } else {
                toast.error("Something went wrong");
            }
        }
    }














    return (
        <>

            <h1>password change</h1>

            <form onSubmit={handlesubmition}>

                <div >
                    <label>current password</label>
                    <input
                        type="password"
                        value={password.current_password}
                        onChange={(e) => setpassword({ ...password, current_password: e.target.value })}
                        placeholder="Enter old password"
                        required
                    />
                </div>
                <div >
                    <label>new password</label>
                    <input
                        type="password"
                        value={password.new_password}
                        onChange={(e) => setpassword({ ...password, new_password: e.target.value })}
                        placeholder="Enter new password"
                        required
                    />
                </div>
                <div >
                    <label>confirm new password</label>
                    <input
                        type="password"
                        value={password.new_password_confirmation}
                        onChange={(e) => setpassword({ ...password, new_password_confirmation: e.target.value })}
                        placeholder="confirm new password"
                        required
                    />
                </div>

                <button className="btn btn-primary w-100">update</button>
            </form>
            <span>back to profile</span>





        </>
    )
}

export default passwordchange