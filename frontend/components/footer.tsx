import React from 'react';
import './style/footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section company-info">
                    <h2 className="footer-logo">AquaOrder</h2>
                    <p className="footer-description">
                        Premium can water delivery service. Fresh, clean, and delivered right to your doorstep.
                        Experience the hydration difference today.
                    </p>
                </div>

                <div className="footer-section quick-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/order">Order Water</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>

                <div className="footer-section contact-info">
                    <h3>Contact Us</h3>
                    <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                    <p><strong>Email:</strong> support@aquaorder.com</p>
                    <p><strong>Address:</strong> 123 Water Works Lane, Hydration City, HC 54321</p>
                </div>

                <div className="footer-section social-links">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="#" className="social-icon">Facebook</a>
                        <a href="#" className="social-icon">Instagram</a>
                        <a href="#" className="social-icon">Twitter</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Can Water Ordering System. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
