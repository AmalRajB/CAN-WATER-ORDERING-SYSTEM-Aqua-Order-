"use client"
import { useEffect, useState } from "react";
import styles from "./UserProfile.module.css";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Loader from "@/components/loader"
import Footer from "@/components/footer"
import Link from "next/link";
import { myAppHook } from "@/context/AppProvider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

interface UserType {
    email: string;
}


const UserProfile: React.FC = () => {

    const { logout, authToken } = myAppHook();
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!authToken) {
            router.replace("/auth")
        }
    }, [authToken, router])


    useEffect(() => {
        const fetchdata = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${API_URL}/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        }
                    }
                )
                setEmail(response.data.email)
            } catch (error) {
                toast.error('user data fetching failed try again')


            } finally {
                setLoading(false)
            }
        }

        if (authToken) {
            fetchdata();
        }
    }, [authToken, API_URL])


    return (
        <>
            <Navbar />

            {loading ? (
                <div className={styles.loaderWrapper}>
                    <Loader />
                </div>
            ) : (

                <div className={styles.profileContainer}>
                    <Image
                        src="/images/userprofile.avif"
                        alt="Profile Image"
                        width={120}
                        height={120}
                        className={styles.profileImage}
                    />

                    <div className={styles.username}>{email}</div>

                    <div className={styles.buttonGroup}>
                        <Link className={`${styles.btn} ${styles.btnChange}`} href={"/user/passwordchange"} >change password</Link>
                        <button onClick={logout} className={`${styles.btn} ${styles.btnLogout}`}>
                            Logout
                        </button>
                    </div>
                </div>
            )}
            <Footer />

        </>
    );

};

export default UserProfile;
