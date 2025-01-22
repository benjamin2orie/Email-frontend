

import React, { useState } from "react";
import axios from "axios";
import AuthBg from "./AuthBg";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setMessage("");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:9030/api/v1/users/reset-password",
        {
          email,
          otp,
          password,
          confirmPassword,
        }
      );
      setMessage(res.data.message);
      setTimeout(() =>{
        navigate('/login');
      },2000);
      setError("");
    } catch (err) {
      setError(
        err.response.data.message ||
          "Something went wrong. Please try again later."
      );
      setTimeout(() =>{
        navigate('/forgot-password');
      }, 2000);
      setMessage("");
    }
  };

  return (
    <AuthBg>
      <div className="lg:w-[600px] h-[560px] bg-[#EED] justify-items-center justify-self-center rounded pt-[5em] w-[95%]">
        <h2 className="text-blue-500 capitalize pb-[1em]">Reset Password</h2>
        <form onSubmit={handleSubmit} className="flex gap-[2em] flex-col">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your verified email"
              className={
                error
                  ? "border border-red-500"
                  : " w-[300px] h-[40px] rounded outline-none pl-[1em]"
              }
            />
          </div>
          <div>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              placeholder="Enter your new Otp"
              className={
                error
                  ? "border border-red-500"
                  : " w-[300px] h-[40px] rounded outline-none pl-[1em]"
              }
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your new password"
              className={
                error
                  ? "border border-red-500"
                  : " w-[300px] h-[40px] rounded outline-none pl-[1em]"
              }
            />
          </div>
          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Enter your new password"
              className={
                error
                  ? "border border-red-500"
                  : " w-[300px] h-[40px] rounded outline-none pl-[1em]"
              }
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 rounded-[8px] text-[#DDD] text-[20px] capitalize h-[40px] w-[300px]"
          >
            Submit
          </button>
        </form>
        {message && <p className="pt-[2em]">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </AuthBg>
  );
};

export default ResetPassword;
