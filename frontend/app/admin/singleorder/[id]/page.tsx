"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { myAppHook } from "@/context/AppProvider";
import axios from "axios";
import toast from "react-hot-toast";

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


    const changeStatus = async () =>{
        const setstatus = 'delivered'
        try{
            await axios.put(`${API_URL}/bookings/${id}`,
                {'status':setstatus},
                {
                    headers:{
                        Authorization:`Bearer ${authToken}`,
                    }
                }
            )
            toast.success("status updated CAN delivered..")
            router.push('/admin/home')

        }catch(error){
            toast.error("status updation failed try again...")

        }
    }







    return (
        <>
            <p>{bookingData.fullname}</p>
            <p>{bookingData.mob_number}</p>
            <p>{bookingData.address}</p>
            <p>{bookingData.delivery_date}</p>
            <p>{bookingData.quantity}</p>
            <img src={bookingData.address_proff}
                alt="Address Proof"
                width={120}
                height={120}
                style={{ objectFit: "cover" }}/>
                <br />

                <button onClick={() => changeStatus()}  className="btn btn-md btn-success">deliverd.</button>
      
      


        </>
    );
}
