"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { myAppHook } from "@/context/AppProvider";
import axios from "axios";
import toast from "react-hot-toast";
import styles from "./ViewsingleOrder.module.css";
import Link from "next/link";



type LaravelValidationErrors = {
    [key: string]: string[];
};

interface BookingType {
    fullname: string;
    mob_number: string;
    address: string;
    delivery_date: string;
    quantity: number;
    address_proff: string;
}

export default function ViewsingleOreder() {
    const { id } = useParams();
    const router = useRouter();
    const { authToken } = myAppHook();
    const API_URL = process.env.NEXT_PUBLIC_API_URL!;

    const [bookingData, setBookingData] = useState<BookingType>({
        fullname: "",
        mob_number: "",
        address: "",
        delivery_date: "",
        quantity: 1,
        address_proff: "",
    });

    useEffect(() => {
        if (!authToken) {
            router.replace("/auth");
        }
    }, [authToken, router]);


    useEffect(() => {

        const viewdetails = async () => {
            try {
                const response = await axios.get(`${API_URL}/bookings/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        }
                    })
                setBookingData(response.data)


            } catch (error) {
                toast.error("somthing went wrong..")

            }
        }
        if (authToken) {
            viewdetails();
        }
    }, [authToken, id])


    const changeStatus = async () => {
        const setstatus = 'delivered'
        try {
            await axios.put(`${API_URL}/bookings/${id}`,
                { 'status': setstatus },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    }
                }
            )
            toast.success("status updated CAN delivered..")
            router.push('/admin/home')

        } catch (error) {
            toast.error("status updation failed try again...")

        }
    }


    return (
        <>
            <div className={styles.container}>
                <div className={styles.row}>
                    <span className={styles.label}>Full Name</span>
                    <span className={styles.value}>{bookingData.fullname}</span>
                </div>

                <div className={styles.row}>
                    <span className={styles.label}>Mobile Number</span>
                    <span className={styles.value}>{bookingData.mob_number}</span>
                </div>

                <div className={styles.row}>
                    <span className={styles.label}>Address</span>
                    <span className={styles.value}>{bookingData.address}</span>
                </div>

                <div className={styles.row}>
                    <span className={styles.label}>Delivery Date</span>
                    <span className={styles.value}>{bookingData.delivery_date}</span>
                </div>

                <div className={styles.row}>
                    <span className={styles.label}>Quantity</span>
                    <span className={styles.value}>{bookingData.quantity}</span>
                </div>

                <div className={styles.imageWrapper}>
                    <img
                        src={bookingData.address_proff}
                        alt="Address Proof"
                        width={120}
                        height={120}
                        style={{ objectFit: "cover" }}
                    />
                </div>

                <div className={styles.action}>
                    <button
                        onClick={changeStatus}
                        className={styles.deliverBtn}
                    >
                        Delivered
                    </button>
                    <Link className={styles.backbtn} href={"/admin/pendingorders"}>back</Link>


                </div>
            </div>
         



        </>
    );
}
