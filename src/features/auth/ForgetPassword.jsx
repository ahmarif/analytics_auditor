import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/forget-password/send-otp`, { email });
      toast.success(res?.message || "OTP sent successfully");

      localStorage.setItem("resetEmail", email);

      setShowOtp(true);
    } catch (err) {
      toast.error(err.response?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/forget-password/verify-otp`, { email, otp });
      toast.success(res?.message || "OTP verified successfully");
      navigate("/resetpassword", { state: { email } });
    } catch (err) {
      toast.error(err.response?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  const getButtonText = () => {
    if (loading) return showOtp ? "Verifying…" : "Sending…";
    return showOtp ? "Verify OTP" : "Send OTP";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-ultra-light px-4 sm:px-6">
      <Toaster position="top-right" />
      <div className="card w-full max-w-md shadow-xl bg-neutral-ultra-light p-6 sm:p-8 rounded-2xl">

        <button
          type="button"
          onClick={() => {
            if (showOtp) {
              setShowOtp(false);
              setOtp("");
            } else {
              navigate("/");
            }
          }}
          className="flex items-center gap-2 text-white font-semibold rounded-full bg-primary px-5 sm:px-6 py-2 mb-5 sm:mb-6 hover:bg-primary-dark text-sm sm:text-base"
        >
          <FaArrowLeft /> Back
        </button>

        <h2 className="text-lg sm:text-xl font-semibold text-primary mt-6 sm:mt-8 mb-2">
          {showOtp ? "Verify OTP" : "Forgot Password"}
        </h2>
        <p className="text-xs sm:text-sm mb-6 sm:mb-8 text-neutral-dark">
          {showOtp ? "Enter the OTP sent to your email" : "Enter your email to receive OTP"}
        </p>
        <form
          onSubmit={showOtp ? handleVerifyOtp : handleSendOtp}
          className="space-y-4"
        >
          {!showOtp && (
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 sm:px-4 py-2 border border-neutral-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
            />
          )}

          {showOtp && (
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-3 sm:px-4 py-2 border border-neutral-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-2 px-4 bg-primary text-white font-bold rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 text-sm sm:text-base"
          >
            {loading && (
              <svg
                className="animate-spin mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            )}
            {getButtonText()}
          </button>
        </form>
      </div>
    </div>

  );
};

export default ForgetPassword;
