import React from 'react';
import './Footer.scss'

const Footer: React.FC = () => {
    return (
        <footer className="footer text-white text-center py-3">
            <div className="footer-container">
                <p className="copyright">&copy; 2024 Webshop. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;