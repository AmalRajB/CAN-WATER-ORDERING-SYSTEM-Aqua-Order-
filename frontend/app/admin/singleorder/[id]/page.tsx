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
    const [previewImage, setPreviewImage] = useState<string | null>(null);
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
                console.log(bookingData.address_proff)


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
                    {bookingData.address_proff ? (
                        <img
                            src={
                                bookingData.address_proff.startsWith('http')
                                    ? bookingData.address_proff
                                    : `http://127.0.0.1:8000/storage/${bookingData.address_proff}`
                            }
                            onClick={() =>
                                setPreviewImage(bookingData.address_proff.startsWith("http")
                                    ? bookingData.address_proff
                                    : `http://127.0.0.1:8000/storage/${bookingData.address_proff}`)
                            }
                        />
                    ) : (
                        <p> No address proof uploaded </p>


                    )}
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

            {previewImage && (
                <div
                    onClick={() => setPreviewImage(null)}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.8)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999,
                        cursor: "zoom-out",
                    }}
                >
                    <img
                        src={previewImage}
                        alt="Full Address Proof"
                        style={{
                            maxWidth: "95%",
                            maxHeight: "95%",
                            objectFit: "contain",
                            background: "#fff",
                            borderRadius: "8px",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}





        </>
    );
}
