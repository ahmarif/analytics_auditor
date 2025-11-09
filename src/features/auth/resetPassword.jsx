import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email not found. Please restart the reset flow.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE}/forget-password/reset`,
        { email, newPassword }
      );
      toast.success(res.data.message || "Password reset successfully");
      localStorage.removeItem("resetEmail");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-ultra-light px-4 sm:px-6">
      <Toaster position="top-right" />
      <div className="card w-full max-w-md shadow-xl bg-neutral-ultra-light rounded-xl">

        <div className="bg-primary-light p-4 sm:p-6 rounded-t-xl">
          <h2 className="text-lg sm:text-xl font-semibold text-primary">
            Reset Password
          </h2>
          <p className="text-xs sm:text-sm text-white">
            Set your new password
          </p>
        </div>

        <form
          className="py-8 sm:py-10 px-5 sm:px-8 space-y-5 sm:space-y-6"
          onSubmit={handleResetPassword}
        >

          <div className="form-control">
            <label className="block text-neutral-dark font-medium mb-1 text-sm sm:text-base">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-3 sm:px-4 py-2 border border-neutral-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-800"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>


          <div className="form-control">
            <label className="block text-neutral-dark font-medium mb-1 text-sm sm:text-base">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 sm:px-4 py-2 border border-neutral-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-800"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>


          <div className="form-control mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-2 px-4 bg-primary-dark text-white font-bold rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 text-sm sm:text-base"
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
              Reset Password
            </button>
          </div>


          <p className="text-center text-xs sm:text-sm mt-6 text-neutral-semi-dark">
            Remembered your password?{" "}
            <Link to="/" className="text-primary font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
