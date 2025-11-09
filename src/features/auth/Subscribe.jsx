import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/Analytics_Audtor_logo.png";

const Subscribe = () => {
  const [status, setStatus] = useState("Subscribing...");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const email = new URLSearchParams(window.location.search).get("email");
    if (!email) {
      setStatus("Invalid or missing email address.");
      return;
    }

    const subscribeUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE}/subscribe`, {
          params: { email },
        });
        setStatus(res.data || "You are now subscribed! Thank you!");
        setIsSuccess(true);
      } catch (err) {
        console.error(err);
        setStatus("Something went wrong. Please try again later.");
      }
    };

    subscribeUser();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen px-4 sm:px-6">
      <div className="card w-full max-w-md shadow-2xl bg-white p-5 sm:p-8 text-center rounded-2xl">
        <div className="flex flex-col items-center mb-4 sm:mb-6">
          <img
            src={logo}
            alt="Analytics Auditor Logo"
            className="h-10 sm:h-12 mb-3"
          />
        </div>

        <p className="mb-5 sm:mb-8 text-sm sm:text-lg text-gray-700 leading-relaxed">
          {status}
        </p>

        {isSuccess && (
          <Link
            to="/"
            className="inline-block w-full sm:w-auto py-2 px-4 sm:px-6 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary-dark transition-colors text-sm sm:text-base"
          >
            Go to Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Subscribe;
