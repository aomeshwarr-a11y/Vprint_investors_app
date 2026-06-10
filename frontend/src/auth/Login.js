import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HiMail, HiLockClosed, HiArrowRight } from "react-icons/hi";
import { supabase } from "../supabase";

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!loginData.email || !loginData.password) {
    setError("Please fill in all fields.");
    return;
  }

  setLoading(true);

  try {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

    if (error) throw error;

    const user = data.user;

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem(
      "userName",
      user.user_metadata?.full_name ||
        user.email ||
        "User"
    );

    navigate("/");
  } catch (err) {
    console.error(err);

    if (
      err.message.includes("Invalid login credentials")
    ) {
      setError("Invalid email or password");
    } else {
      setError(err.message);
    }

    setLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        u => u.email === loginData.email && u.password === loginData.password
      );

      if (!user) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userEmail", user.email);

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  };
  const handleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  // Get role from profiles table
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (profile.role === "premium") {
    navigate("/dashboard");
  } else {
    navigate("/");
  }
};

  return (
    <div className="auth-page">
      <div className="auth-card border-0">
        <div className="text-center mb-5">
          <div className="bg-primary bg-opacity-10 text-primary d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style={{ width: '64px', height: '64px' }}>
            <HiLockClosed size={32} />
          </div>
          <h2 className="fw-bold h1">Welcome Back</h2>
          <p className="text-muted">Sign in to manage your kiosk reservations.</p>
        </div>

        {error && <div className="auth-error rounded-3 border-0 shadow-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
          <div className="position-relative">
            <HiMail className="position-absolute top-50 translate-middle-y ms-3 text-muted" size={20} />
            <input
              type="email"
              name="email"
              className="w-100 ps-5"
              placeholder="Email Address"
              onChange={handleChange}
              required
            />
          </div>

          <div className="position-relative">
            <HiLockClosed className="position-absolute top-50 translate-middle-y ms-3 text-muted" size={20} />
            <input
              type="password"
              name="password"
              className="w-100 ps-5"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn py-3 d-flex align-items-center justify-content-center gap-2 border-0 shadow-lg" disabled={loading}>
            {loading ? "Signing in..." : <>Sign In <HiArrowRight /></>}
          </button>
        </form>

        <div className="text-center mt-5">
          <p className="text-muted small">
            Don't have an account? <Link to="/signup" className="text-primary fw-bold text-decoration-none">Create one here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
