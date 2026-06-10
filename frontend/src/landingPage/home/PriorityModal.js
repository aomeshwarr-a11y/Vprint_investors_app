import React, { useState } from "react";
import { FaCheck, FaBolt, FaTimes, FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function PriorityModal({ onClose }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePriorityAccess = async () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      localStorage.setItem("redirectAfterLogin", "priority-access");
      alert("Please login to get Priority Access.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      // Load Razorpay script
      const res = await loadRazorpayScript();

      if (!res) {
        alert("Failed to load Razorpay. Please check your internet connection.");
        setLoading(false);
        return;
      }

      // Get user details
      const userName = localStorage.getItem("userName");
      const userEmail = localStorage.getItem("userEmail");

      // Razorpay options
      const options = {
        key: "rzp_test_Szc21ohivp5xw0", // Replace with your Razorpay Key ID
        amount: 49900, // Amount in paise (₹499 = 49900 paise)
        currency: "INR",
        name: "VPrint - Priority Access",
        description: "Priority Waitlist Membership - ₹499",
        prefill: {
          name: userName || "User",
          email: userEmail || "",
        },
        handler: function (response) {
          // Payment successful
          localStorage.setItem("priorityMember", "true");
          localStorage.setItem("paymentId", response.razorpay_payment_id);
          localStorage.setItem("paymentDate", new Date().toISOString());

          alert("Priority Membership Activated! Payment ID: " + response.razorpay_payment_id);
          onClose();
          setLoading(false);
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing your payment. Please try again.");
      setLoading(false);
    }
  };

  const handleFreeWaitlist = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      localStorage.setItem("redirectAfterLogin", "free-waitlist");
      alert("Please login to join the waitlist.");
      navigate("/login");
      return;
    }

    // Save free waitlist status
    localStorage.setItem("freeWaitlistMember", "true");
    localStorage.setItem("waitlistDate", new Date().toISOString());

    alert("Successfully joined the Free Waitlist!");
    onClose();
  };

  return (
    <div className="priority-modal-overlay">

      <div className="priority-modal shadow-2xl border-0 overflow-hidden">

        <button
          className="close-btn position-absolute top-0 end-0 m-4 shadow-sm"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <div className="text-center mb-5 mt-3">
          <p className="modal-label text-primary fw-bold tracking-wider">
            INVESTOR WAITLIST
          </p>
          <h2 className="display-6 fw-bold mb-3">
            Choose Your Access Level
          </h2>
          <p className="modal-description max-w-lg mx-auto text-muted">
            Both options are free to join. Priority gives you
            guaranteed first access to premium VPrint campus
            locations before public release.
          </p>
        </div>

        <div className="table-responsive">
          <table className="comparison-table table table-hover align-middle">
            <thead className="bg-light">
              <tr>
                <th className="py-4 px-4 text-muted small fw-bold">FEATURE</th>
                <th className="py-4 px-4 text-center text-muted small fw-bold">FREE</th>
                <th className="py-4 px-4 text-center priority-column">
                  <span className="d-flex align-items-center justify-content-center gap-2">
                    <FaBolt /> PRIORITY
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="py-3 px-4 fw-medium">Join investor queue</td>
                <td className="text-center text-success"><FaCheck /></td>
                <td className="text-center text-success"><FaCheck /></td>
              </tr>
              <tr>
                <td className="py-3 px-4 fw-medium">Slot confirmed on availability</td>
                <td className="text-center text-success"><FaCheck /></td>
                <td className="text-center text-success"><FaCheck /></td>
              </tr>
              <tr>
                <td className="py-3 px-4 fw-medium">Guaranteed slot before launch</td>
                <td className="text-center text-muted">—</td>
                <td className="text-center text-success"><FaCheck /></td>
              </tr>
              <tr>
                <td className="py-3 px-4 fw-medium">First pick of locations</td>
                <td className="text-center text-muted">—</td>
                <td className="text-center text-success"><FaCheck /></td>
              </tr>
              <tr>
                <td className="py-3 px-4 fw-medium">Dedicated onboarding support</td>
                <td className="text-center text-muted">—</td>
                <td className="text-center text-success"><FaCheck /></td>
              </tr>
              <tr>
                <td className="py-3 px-4 fw-medium">Queue Position</td>
                <td className="text-center text-muted">Standard</td>
                <td className="text-center priority-text fw-bold">Front Of Queue</td>
              </tr>
              <tr className="bg-light-subtle">
                <td className="py-4 px-4 fw-bold">Cost To Join</td>
                <td className="text-center fw-bold text-muted">Free</td>
                <td className="text-center priority-text fw-bold h4 mb-0">₹499</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="modal-buttons mt-5">
          <button 
            className="free-btn btn btn-outline-secondary py-3 fw-bold rounded-4 border-2"
            onClick={handleFreeWaitlist}
          >
            Join Free Waitlist
          </button>

          <button
            className="priority-pay-btn py-3 fw-bold rounded-4 border-0 shadow-lg"
            onClick={handlePriorityAccess}
            disabled={loading}
          >
            <FaBolt className="me-2" />
            {loading ? "Processing..." : "Get Priority Access Now"}
          </button>
        </div>

        <div className="d-flex align-items-center justify-content-center gap-2 mt-4 text-muted small opacity-75 italic">
          <FaShieldAlt />
          <span>₹499 will be adjusted against your final franchise setup fee.</span>
        </div>

      </div>

    </div>
  );
}

export default PriorityModal;