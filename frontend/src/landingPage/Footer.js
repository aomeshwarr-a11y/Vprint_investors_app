import React from "react";
import { Link } from "react-router-dom";
import { BsTwitter, BsLinkedin, BsGlobe } from "react-icons/bs";

function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row gy-5">
          <div className="col-12 col-md-6 col-lg-3">
            <h2 className="footer-logo">VPrint</h2>
            <p className="footer-text">
              Revolutionizing campus services through smart kiosk
              technology and empowered franchise owners.
            </p>
          </div>

          <div className="col-6 col-md-3 col-lg-3">
            <h6 className="footer-heading">PLATFORM</h6>
            <ul className="footer-links">
              <li><Link to="/locations">Find Locations</Link></li>
              <li><Link to="#how-it-works">How It Works</Link></li>
              <li><Link to="/">Partner Benefits</Link></li>
              <li><Link to="#faq">Franchise FAQ</Link></li>
            </ul>
          </div>

          <div className="col-6 col-md-3 col-lg-3">
            <h6 className="footer-heading">LEGAL</h6>
            <ul className="footer-links">
              <li><Link to="/">Terms of Service</Link></li>
              <li><Link to="/">Privacy Policy</Link></li>
              <li><Link to="/">Contact Support</Link></li>
            </ul>
          </div>

          <div className="col-12 col-lg-3">
            <h6 className="footer-heading">CONNECT</h6>
            <div className="d-flex gap-3 mt-3">
              <a href="https://twitter.com" className="social-icon" target="_blank" rel="noopener noreferrer">
                <BsTwitter />
              </a>
              <a href="https://linkedin.com" className="social-icon" target="_blank" rel="noopener noreferrer">
                <BsLinkedin />
              </a>
              <a href="/" className="social-icon">
                <BsGlobe />
              </a>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="row align-items-center">
          <div className="col-12 col-md-6 text-center text-md-start">
            <p className="copyright-text">
              © {new Date().getFullYear()} VPrint Franchise Systems. All rights reserved.
            </p>
          </div>
          <div className="col-12 col-md-6 text-center text-md-end">
            <p className="copyright-text">
              Empowering Campus Innovation
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;