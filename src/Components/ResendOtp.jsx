import React, { useState } from "react";
import axios from "axios";
import AuthBg from "./AuthBg";
import { useNavigate } from "react-router-dom";

const ResendOtp = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleResendOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://email-backend-be9m.onrender.com/api/v1/users/resend-otp",
        {email},
        { withCredentials: true }
      );
      setMessage(response.data.message || "Please verify your account with the new otp code send to your email");
      setTimeout(() =>{
        navigate('/verify-otp')
      }, 2000);
      setError("");
    } catch (err) {
      setError(err.response.data.message) ||
        "Unable to resend the OTP code! Please check your email";
        setTimeout(() =>{
          navigate('/login');
        }, 2000);
      setMessage("");
    }
  };

  return (
    <AuthBg>
      <div className="justify-items-center bg-[#EED] pt-[8em] lg:w-[500px] w-[95%] justify-self-center h-[600px]">
        <form className="flex flex-col gap-[3em]" >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={
              error
                ? "border border-red-500 h-[40px] rounded-[5px] pl-[1em] w-[300px] outline-none"
                : "border border-[#020202] text-[#020202] rounded-[5px] w-[300px] pl-[1em] h-[40px] outline-none"
            }
          />
          <button
            onClick={handleResendOTP}
            className="w-[300px] h-[40px] bg-blue-500 rounded-[5px] text-[#DDD]"
          >
            Resend OTP
          </button>
        </form>
        {message && <p className="pt-[2em] text-[#020202]">{message}</p>}
        {error && <p className="pt-[2em] text-red-500">{error}</p>}
      </div>
    </AuthBg>
  );
};

export default ResendOtp;
