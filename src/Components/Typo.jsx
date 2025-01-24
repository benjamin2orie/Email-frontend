
// src/Otp.js
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AuthBg from "./AuthBg";

const OtpEmailVerificationCode = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (value.match(/^[0-9]{0,1}$/)) {
      // Only allow single digits
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move focus to the next input field if a digit is entered
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const otpCode = otp.join("");
      const response = await axios.post(
        "https://email-backend-be9m.onrender.com/api/v1/users/verify",
        { otp: otpCode },
        {withCredentials: true}
      );
      setMessage(response.data.message);
      setError("");
      setTimeout(() =>{
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(
        err.response.data.message || "An error occurred. Please try again."
      );
      setMessage("");
    }
  };

  return (
    <AuthBg>
    <div className="justify-items-center lg:mt-[10em] mt-[7em]">
      <h1 className="lg:pb-[2em] pb-[4em] lg:text-[30px] text-[15px] lg:text-[#EED] text-[#020202]">
        Enter the OTP code send to your email
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex lg:gap-[4em] gap-[2em]">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={value}
              onChange={(e) => handleChange(e, index)}
              className={
                error
                  ? "border border-red-500 w-[50px] h-[40px] text-center"
                  : "border w-[50px] h-[40px] border-[#020202] text-center"
              }
              maxLength="1"
              required
            />
          ))}
        </div>
        <div className="flex gap-[3em] mt-[3em]">
          <button
            type="submit"
            className="lg:bg-blue-500 bg-[#020202] text-[#FFFFFF] lg:w-[200px] w-[100px] h-[40px] rounded ml-[3em]"
          >
            Verify OTP
          </button>

          <div className=" border lg:border-blue-500 border-[#020202] lg:text-[#FFFFFF] text-[#020202] lg:w-[200px] pt-[0.5em] rounded w-[100px] text-[15px] capitalize text-center h-[40px]">
            <Link to="/resend-otp">resend otp</Link>
          </div>
        </div>
      </form>
      {message && <p className="lg:text-[#EED] text-[#020202] pt-[2em]">{message}</p>}
      {error && <p className="text-red-500 lg:text-[20px] text-[12px] pl-[1em] pr-[1em] pt-[3em]">{error}</p>}
    </div>
    </AuthBg>
  );
};

export default OtpEmailVerificationCode;
