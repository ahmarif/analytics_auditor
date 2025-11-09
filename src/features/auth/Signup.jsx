import { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { register } from "../../services/auth.services";
import logo from '../../assets/Analytics_Audtor_logo.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await register({ email, firstName, lastName, password });
      toast.success(response.data.message || "Registration successful! Please check your email to verify your account.");
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="flex justify-center items-center min-h-screen bg-base-200 px-4 sm:px-6">
  <Toaster position="top-right" />
  <div className="card w-full max-w-md shadow-2xl bg-base-100 rounded-2xl">
    
    {/* Header */}
    <div className="bg-primary-light p-4 sm:p-6 rounded-t-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-xl font-bold text-indigo-600">Free Register</h2>
        <p className="text-xs sm:text-sm text-white">Get your free account now.</p>
      </div>
      <div className="flex justify-center sm:justify-end">
        <img src={logo} alt="Analytics Auditor Logo" className="h-8 w-auto" />
      </div>
    </div>

    {/* Form */}
    <form className="space-y-5 sm:space-y-6 p-6 sm:p-10 relative" onSubmit={handleRegister}>
      
      {/* First Name */}
      <div className="form-control">
        <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
          First Name
        </label>
        <input
          type="text"
          placeholder="Enter First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
          required
        />
      </div>

      {/* Last Name */}
      <div className="form-control">
        <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
          Last Name
        </label>
        <input
          type="text"
          placeholder="Enter Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
          required
        />
      </div>

      {/* Email */}
      <div className="form-control">
        <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
          required
        />
      </div>

      {/* Password */}
      <div className="form-control relative">
        <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-10 sm:top-11 text-gray-500"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {/* Submit Button */}
      <div className="form-control mt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-primary-semi-dark text-white font-bold rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 text-sm sm:text-base"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>

      {/* Login Redirect */}
      <p className="text-center text-xs sm:text-sm mt-6">
        Already have an account?{" "}
        <Link to="/" className="text-indigo-600 font-semibold">
          Login
        </Link>
      </p>
    </form>
  </div>
</div>

  );
};

export default Signup;
