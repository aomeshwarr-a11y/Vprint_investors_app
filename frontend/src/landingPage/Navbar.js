import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX, HiUserCircle, HiLogout, HiCreditCard, HiCollection } from "react-icons/hi";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Check login state from localStorage
  useEffect(() => {
    const isLoggedInValue = localStorage.getItem("isLoggedIn") === "true";
    const userNameValue = localStorage.getItem("userName");

    if (isLoggedInValue && userNameValue) {
      setIsLoggedIn(true);
      setUserName(userNameValue);
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMobileMenu = () => setShowMobileMenu(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/");
    closeMobileMenu();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <div className="bg-primary rounded-3 p-1 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
              <span className="text-white fw-black" style={{ fontSize: '18px' }}>V</span>
            </div>
            <span>VPrint</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle d-lg-none"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle menu"
          >
            {showMobileMenu ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>

          {/* Desktop Navigation */}
          <ul className={`nav-menu ${showMobileMenu ? 'mobile-active' : ''}`}>
            <li><NavLink className={({ isActive }) => isActive ? "nav-link active-nav" : "nav-link"} to="/" onClick={closeMobileMenu} end>Home</NavLink></li>
            <li><NavLink className={({ isActive }) => isActive ? "nav-link active-nav" : "nav-link"} to="/locations" onClick={closeMobileMenu}>Locations</NavLink></li>
            <li><Link className="nav-link" to="/" onClick={(e) => {
              e.preventDefault();
              closeMobileMenu();
              if (window.location.pathname === '/') {
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
              } else {
                navigate('/');
                setTimeout(() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" }), 100);
              }
            }}>Process</Link></li>
            <li><Link className="nav-link" to="/" onClick={(e) => {
              e.preventDefault();
              closeMobileMenu();
              if (window.location.pathname === '/') {
                document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
              } else {
                navigate('/');
                setTimeout(() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" }), 100);
              }
            }}>FAQ</Link></li>
          </ul>

          <div className={`auth-buttons ${showMobileMenu ? 'mobile-active' : ''}`}>
            {!isLoggedIn ? (
              <>
                <Link className="login-btn" to="/login" onClick={closeMobileMenu}>Sign In</Link>
                <Link className="signup-btn shadow-sm" to="/signup" onClick={closeMobileMenu}>Get Started</Link>
              </>
            ) : (
              <div className="profile-menu position-relative" ref={dropdownRef}>
                <button
                  className="btn btn-light d-flex align-items-center gap-2 rounded-pill px-3 py-2 border"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px' }}>
                    <HiUserCircle size={20} />
                  </div>
                  <span className="fw-semibold small d-none d-sm-inline">{userName}</span>
                </button>

                {showDropdown && (
                  <div className="dropdown-menu show position-absolute end-0 mt-2 shadow-lg border-0 rounded-4 p-2" style={{ minWidth: '220px' }}>
                    <div className="px-3 py-3 border-bottom mb-2">
                      <p className="small text-muted mb-0">Signed in as</p>
                      <p className="fw-bold mb-0">{userName}</p>
                    </div>
                    <Link to="/profile" className="dropdown-item d-flex align-items-center gap-3 py-2 rounded-3" onClick={() => setShowDropdown(false)}>
                      <HiUserCircle className="text-muted" size={18} /> Profile
                    </Link>
                    <Link to="/payments" className="dropdown-item d-flex align-items-center gap-3 py-2 rounded-3" onClick={() => setShowDropdown(false)}>
                      <HiCreditCard className="text-muted" size={18} /> Payments
                    </Link>
                    <Link to="/reservation" className="dropdown-item d-flex align-items-center gap-3 py-2 rounded-3" onClick={() => setShowDropdown(false)}>
                      <HiCollection className="text-muted" size={18} /> Reservations
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item d-flex align-items-center gap-3 py-2 rounded-3 text-danger" onClick={handleLogout}>
                      <HiLogout size={18} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;