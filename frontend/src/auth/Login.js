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
    console.log("Auth User ID:", user.id);

  const { data: profile, error: profileError } = await supabase
  .from("profiles")
  .select("*")
  .eq("id", user.id)
  .maybeSingle();

if (profileError) {
  throw profileError;
}

if (!profile) {
  setError("User profile not found. Contact admin.");
  return;
}

    if (profile.role === "premium") {
  window.location.href = "http://localhost:5173";
} else {
  navigate("/");
}
  } catch (err) {
  console.error(err);

  if (err.message.includes("Invalid login credentials")) {
    setError("Invalid email or password");
  } else {
    setError(err.message);
  }
} finally {
  setLoading(false);
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
