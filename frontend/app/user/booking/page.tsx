"use client";

import styles from "./WaterBookingForm.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { myAppHook } from "@/context/AppProvider";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toast } from "react-hot-toast"

type LaravelValidationErrors = {
  [key: string]: string[];
};


interface BookingType {
    fullname: string;
    mob_number: string;
    address: string;
    delivery_date: string;
    quantity: number;
    file: File | null;
    address_proff: string;
}

const Booking: React.FC = () => {
    const { authToken } = myAppHook();
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`
    const router = useRouter();
    const fileRef = useRef<HTMLInputElement>(null);

    const [formdata, setFormdata] = useState<BookingType>({
        fullname: "",
        mob_number: "",
        address: "",
        delivery_date: "",
        quantity: 1,
        file: null,
        address_proff: "",
    });

    useEffect(() => {
        if (!authToken) {
            router.replace("/auth");
        }
    }, [authToken, router]);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files, type } = event.target;

        if (files && files.length > 0) {
            setFormdata((prev) => ({
                ...prev,
                file: files[0],
                address_proff: URL.createObjectURL(files[0]),
            }));
        } else {
            setFormdata((prev) => ({
                ...prev,
                [name]: type === "number" ? Number(value) : value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formPayload = new FormData();
        formPayload.append("fullname", formdata.fullname);
        formPayload.append("mob_number", formdata.mob_number);
        formPayload.append("address", formdata.address);
        formPayload.append("delivery_date", formdata.delivery_date);
        formPayload.append("quantity", String(formdata.quantity));

        if (formdata.file) {
            formPayload.append("address_proff", formdata.file);
        }

        console.log("Form Submitted:", Object.fromEntries(formPayload.entries()));

        try {
            const response = await axios.post(
                `${API_URL}/bookings`,
                formPayload,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            console.log(response.data);
            router.push("/user/userhome")
            toast.success("booking is success..")


        } catch (error: any) {
            if (error.response?.data?.errors) {
                const errors = error.response.data.errors as LaravelValidationErrors;
                const firstError = Object.values(errors)[0][0];
                toast.error(firstError);
            } else {
                toast.error("Something went wrong");
            }

        }
    };

    return (
        <>
            <Navbar />

            <div className={styles.formContainer}>
                <h3 className={styles.formTitle}>Water Can Booking</h3>

                <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className={styles.formGroup}>
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullname"
                            value={formdata.fullname}
                            onChange={handleOnChange}
                            placeholder="Enter full name"
                            required
                        />
                    </div>

                    {/* Mobile */}
                    <div className={styles.formGroup}>
                        <label>Mobile Number</label>
                        <input
                            type="tel"
                            name="mob_number"
                            value={formdata.mob_number}
                            onChange={handleOnChange}
                            placeholder="Enter mobile number"
                            required
                        />
                    </div>

                    {/* Address */}
                    <div className={styles.formGroup}>
                        <label>Delivery Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formdata.address}
                            onChange={handleOnChange}
                            placeholder="Enter delivery address"
                            required
                        />
                    </div>

                    {/* Address Proof Preview */}
                    {formdata.address_proff && (
                        <div className={styles.formGroup}>
                            <Image
                                src={formdata.address_proff}
                                alt="Address Proof Preview"
                                width={120}
                                height={120}
                            />
                        </div>
                    )}

                    {/* Address Proof Upload */}
                    <div className={styles.formGroup}>
                        <label>Upload Address Proof</label>
                        <input
                            type="file"
                            ref={fileRef}
                            onChange={handleOnChange}
                            accept=".pdf,.jpg,.jpeg,.png"
                        />
                    </div>

                    {/* Delivery Date */}
                    <div className={styles.formGroup}>
                        <label>Delivery Date</label>
                        <input
                            type="date"
                            name="delivery_date"
                            value={formdata.delivery_date}
                            onChange={handleOnChange}
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
                            value={formdata.quantity}
                            onChange={handleOnChange}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Book Now
                    </button>
                </form>
            </div>

            <Footer />
        </>
    );
};

export default Booking;
