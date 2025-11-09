import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { login } from "../../services/auth.services";
import logo from '../../assets/Analytics_Audtor_logo.png'
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const app2Url = import.meta.env.VITE_APP2_URL;

useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loggedOut = params.get("loggedOut");

    if (loggedOut) {
      localStorage.removeItem("token");
      window.history.replaceState({}, document.title, "/");
      return;
    }
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = `${app2Url}?token=${token}`;
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login({ email: username, password });
      if (res.data?.statusCode === "success") {
        toast.success(res?.data?.message);
        localStorage.setItem("token", res.data?.data?.token);
        window.location.href = `${app2Url}?token=${res.data?.data?.token}`;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-ultra-light px-4 sm:px-6">
      <div className="card w-full max-w-md shadow-xl bg-neutral-ultra-light rounded-xl">

        <div className="bg-primary-light p-4 sm:p-6 rounded-t-xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div className="text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-semibold text-primary">Welcome!</h2>
            <p className="text-xs sm:text-sm text-white">Sign in to continue</p>
          </div>
          <div className="flex justify-center sm:justify-end">
            <img src={logo} alt="Analytics Auditor Logo" className="h-8 w-auto" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="py-8 px-4 sm:px-8 space-y-4">

          <div className="form-control">
            <label className="block text-neutral-dark font-medium mb-1 text-sm sm:text-base">
              Email
            </label>
            <input
              type="email"
              value={username}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
              className="w-full px-3 sm:px-4 py-2 border border-neutral-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
            />
          </div>

          <div className="form-control">
            <label className="block text-neutral-dark font-medium mb-1 text-sm sm:text-base">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full px-3 sm:px-4 py-2 border border-neutral-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-800"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between my-4 gap-2">
            <label className="flex items-center cursor-pointer text-neutral-dark text-sm">
              <input type="checkbox" className="checkbox checkbox-sm mr-2" />
              <span>Remember me</span>
            </label>
            <Link
              to="/forgotpassword"
              className="text-sm text-primary hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="form-control mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-primary-dark text-white font-bold rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 text-sm sm:text-base"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </div>

          <p className="text-center text-xs sm:text-sm mt-6 text-neutral-semi-dark">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-primary font-semibold">
              Signup now
            </Link>
          </p>
        </form>
      </div>
    </div>

  );
};

export default Login;
