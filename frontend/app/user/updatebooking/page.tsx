"use client"
import styles from "./WaterBookingupdateForm.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
const Booking: React.FC = () => {


    return (
        <>
            <Navbar />
            <div className={styles.formContainer}>
                <h3 className={styles.formTitle}>Update Booking</h3>
                <form >
                    <div className={styles.formGroup}>
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullname"
                            // value={formData.fullname}
                            // onChange={handleChange}
                            placeholder="Enter full name"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Mobile Number</label>
                        <input
                            type="tel"
                            name="mobile"
                            // value={formData.mobile}
                            // onChange={handleChange}
                            placeholder="Enter mobile number"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Delivery Address</label>
                        <textarea
                            name="deliveryAddress"
                            // value={formData.deliveryAddress}
                            // onChange={handleChange}
                            placeholder="Enter delivery address"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Address Proof</label>
                        <input
                            type="file"
                            name="addressProof"
                            accept=".pdf,.jpg,.jpeg,.png"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Delivery Date</label>
                        <input
                            type="date"
                            name="deliveryDate"
                            // value={formData.deliveryDate}
                            // onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Can Quantity</label>
                        <input
                            type="number"
                            name="canQuantity"
                            min={1}
                            // value={formData.canQuantity}
                            // onChange={handleChange}
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



}
export default Booking