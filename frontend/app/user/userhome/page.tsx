"use client"

import { useEffect } from 'react'
import { myAppHook } from "@/context/AppProvider";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer"
import Image from "next/image";
import styles from "./userhome.module.css";
import Link from "next/link";



const userhome: React.FC = () => {

    const { isloading, authToken } = myAppHook()
    const router = useRouter();

    useEffect(() => {
        if (!isloading && !authToken) {
            router.push("/auth")
        }

    }, [authToken, isloading, router]);

    if (isloading) return null;


    return <>
        <Navbar />

        <div className={styles.bannerContainer}>
            <Image
                src="/images/banner.png"
                alt="Banner"
                fill
                priority
                className={styles.bannerImage}
            />

            <div className={styles.bannerContent}>
                <Link href={"/user/booking"}
                    className={styles.bookNowBtn}
                >
                    Book Now
                </Link>
            </div>
        </div>

        <div className={styles.servicesSection}>
            <h2 className={styles.sectionTitle}>Our Services</h2>
            <div className={styles.cardsContainer}>
                <div className={styles.card}>
                    <h3>Fast Delivery</h3>
                    <p>We ensure your water cans are delivered to your doorstep within 2 hours of ordering. Speed and reliability are our top priorities.</p>
                </div>
                <div className={styles.card}>
                    <h3>Premium Quality</h3>
                    <p>Our water goes through a vigorous 7-step purification process to ensure you get the safest, cleanest, and best-tasting water.</p>
                </div>
                <div className={styles.card}>
                    <h3>Bulk Orders</h3>
                    <p>Hosting an event or need water for your office? We offer special rates and seamless delivery for all bulk water can orders.</p>
                </div>
            </div>
        </div>

        <Footer />
    </>
}
export default userhome