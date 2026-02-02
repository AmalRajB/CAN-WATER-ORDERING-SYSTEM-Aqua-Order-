"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { myAppHook } from "@/context/AppProvider";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import styles from "../WaterBookingupdateForm.module.css";

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

export default function UpdateBookingPage() {
    const { id } = useParams();
    const router = useRouter();
    const { authToken } = myAppHook();
    const API_URL = process.env.NEXT_PUBLIC_API_URL!;
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);


    const [booking, setBooking] = useState<BookingType>({
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
        if (!id || !authToken) return;

        const fetchBooking = async () => {
            try {
                const response = await axios.get(`${API_URL}/bookings/${id}`, {
                    headers: { Authorization: `Bearer ${authToken}` },
                });

                const data = response.data;
                setBooking({
                    fullname: data.fullname || "",
                    mob_number: data.mob_number || "",
                    address: data.address || "",
                    delivery_date: data.delivery_date || "",
                    quantity: data.quantity || 1,
                    address_proff: data.address_proff || "",
                });
            } catch (err: any) {
                toast.error("Failed to load booking data");
            }
        };

        fetchBooking();
    }, [id, authToken, API_URL]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('_method', 'PUT'); 
            formData.append("delivery_date", booking.delivery_date);
            formData.append("quantity", booking.quantity.toString());
            formData.append("mob_number", booking.mob_number);
            formData.append("address", booking.address);

            if (file) {
                formData.append("address_proff", file);
            }

            await axios.post(`${API_URL}/bookings/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                   
                },
            });

            toast.success("Booking details updated");
            router.push("/user/userhome");

        } catch (error: any) {
            const errors = error.response?.data?.errors as LaravelValidationErrors | undefined;
            if (errors) {
                toast.error(Object.values(errors)[0][0]);
            } else {
                toast.error("Update failed");
            }
        }
    };
    return (
        <>
            <Navbar />
            <div className={styles.formContainer}>
                <h3 className={styles.formTitle}>Update Water Booking</h3>

                <form onSubmit={handleSubmit}>
                    {/* Full Name (read-only) */}
                    <div className={styles.formGroup}>
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullname"
                            value={booking.fullname}
                            readOnly
                            disabled
                        />
                    </div>

                    {/* Mobile Number */}
                    <div className={styles.formGroup}>
                        <label>Mobile Number</label>
                        <input
                            type="tel"
                            name="mob_number"
                            value={booking.mob_number}
                            onChange={(e) => setBooking({ ...booking, mob_number: e.target.value })}
                            required
                        />
                    </div>

                    {/* Address */}
                    <div className={styles.formGroup}>
                        <label>Delivery Address</label>
                        <input
                            type="text"
                            name="address"
                            value={booking.address}
                            onChange={(e) => setBooking({ ...booking, address: e.target.value })}
                            required
                        />
                    </div>

                    {/* Address Proof Preview */}
                    {booking.address_proff && (
                        <div className={styles.formGroup}>
                            <img
                                src={booking.address_proff}
                                alt="Address Proof"
                                width={120}
                                height={120}
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    )}
                    {/* Upload Address Proof */}
                    <div className={styles.formGroup}>
                        <label>Upload Address Proof</label>
                        <input
                            type="file"
                            ref={fileRef}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                if (e.target.files && e.target.files[0]) {
                                    setFile(e.target.files[0]);
                                }
                            }}
                            accept=".pdf,.jpg,.jpeg,.png"
                            name="file"
                        />
                    </div>

                    {/* Delivery Date */}
                    <div className={styles.formGroup}>
                        <label>Delivery Date</label>
                        <input
                            type="date"
                            name="delivery_date"
                            value={booking.delivery_date}
                            onChange={(e) => setBooking({ ...booking, delivery_date: e.target.value })}
                            required
                        />
                    </div>

                    {/* Quantity */}
                    <div className={styles.formGroup}>
                        <label>Can Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            min={1}
                            value={booking.quantity}
                            onChange={(e) => setBooking({ ...booking, quantity: Number(e.target.value) })}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Update Booking
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}
