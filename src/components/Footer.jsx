import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-icon">📷</span>
            <span className="logo-text">PhotoVault</span>
          </div>
          <div className="footer-text">
            <p>Secure photo storage made simple. Built with ❤️ and Firebase.</p>
            <p>&copy; 2024 PhotoVault. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
