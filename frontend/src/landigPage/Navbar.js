import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";


function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null);
 

 useEffect(() => {
  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
  setUser(user);

  const name =
    user.user_metadata?.full_name ||
    user.email ||
    "User";

      setIsLoggedIn(true);
      setUserName(name);

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", name);
    } else {
      setIsLoggedIn(false);
      setUserName("");

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userName");
    }
 };

  getUser();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(
    async (event, session) => {
     if (session?.user) {
  setUser(session.user);

  const name =
    session.user.user_metadata?.full_name ||
    session.user.email;

        setIsLoggedIn(true);
        setUserName(name);
      } else {
        setIsLoggedIn(false);
setUserName("");
setUser(null);
      }
    }
  );

  return () => subscription.unsubscribe();
}, []);

// Close dropdown when clicking outside
useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setShowDropdown(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);
  
const handleLogout = async () => {
  try {
    await supabase.auth.signOut();

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");

    navigate("/");
  } catch (error) {
    console.error(error);
  }
};
      

  return (
    <nav className="navbar bg-white border-bottom shadow-sm py-3 fixed-top">
      <div className="container">

        <a className="navbar-brand" href="/">
          VPrint
        </a>

        <div className="navbar-content">

          <ul className="navbar-nav nav-menu">
            <li><Link className="nav-link" to="/">Home</Link></li>
            <li><Link className="nav-link" to="/locations">Find Locations</Link></li>
            <li><Link className="nav-link" to="#how-it-works" onClick={(e) => {
    e.preventDefault();

    document
      .getElementById("how-it-works")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }}>How it Works</Link></li>
            <li><Link className="nav-link" to="#faq" onClick={(e) => {
    e.preventDefault();

    document
      .getElementById("faq")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }}>FAQ</Link></li>
            <li><Link className="nav-link" to="#priority-wait-list"
            onClick={(e) => {
    e.preventDefault();

    document
      .getElementById("priority-wait-list")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }}
            >Priority Wait List</Link></li>
          </ul>

          {!isLoggedIn ? (
            <div className="auth-buttons">
              <button className="btn btn-link"><Link to="/login">Login</Link> </button>
              <button className="btn signup-btn text-muted"><Link to="/signup">Sign Up</Link></button>
            </div>
          ) : (
            <div className="profile-menu" ref={dropdownRef}>
  <button
    className="profile-btn"
    onClick={() => setShowDropdown(!showDropdown)}
  >
    <img
      src={
        
        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
      }
      alt="Profile"
      className="profile-avatar"
    />
  </button>

  {showDropdown && (
    <div className="profile-dropdown">
      <div className="dropdown-header">
        <img
          src={
            
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="Profile"
          className="dropdown-avatar"
        />

        <h6>{user?.user_metadata?.full_name}</h6>
      </div>

      <Link
  to="/profile"
  className="dropdown-item"
  onClick={() => setShowDropdown(false)}
>
        Profile Details
      </Link>

      <Link
  to="/payments"
  className="dropdown-item"
  onClick={() => setShowDropdown(false)}
>
        My Payments
      </Link>

      <Link
  to="/reservation"
  className="dropdown-item"
  onClick={() => setShowDropdown(false)}
>
        My Reservations
      </Link>

      <button
        className="dropdown-item logout-item"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  )}
</div>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;