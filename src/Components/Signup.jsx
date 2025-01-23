import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AuthBg from "./AuthBg";
import { LuUserRound } from "react-icons/lu";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://email-backend-be9m.onrender.com/api/v1/users/signup",
        formData,
        { withCredentials: true }
      );
      // if (response.status === 200) {
      setMessage(response.data.message);
      setError("");
      setTimeout(() => {
        navigate("/verify-otp");
      }, 2000);
      // } else {
      //   setMessage('Signup failed: ' + response.data.message);
      // }
    } catch (err) {
      setError(err.response.data.message) || "Registration faild";
      setMessage("");
    }
  };

  return (
    <AuthBg>
      <div className="align-center bg-[#EED] lg:h-[700px] h-[650px] align-content-center lg:w-[400px] w-[95%] lg:rounded-[3px] justify-items-center pt-[2em] justify-self-center">
        <div className="bg-[#FFFFFF] w-[50px] h-[50px] justify-items-center rounded-full pt-[1em] mb-[3em]">
          <LuUserRound/>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Username"
              className={
                error
                  ? "border border-red-500 rounded-[2px] w-[300px] h-[40px] pl-[1em]"
                  : "border outline-none rounded-[5px] pl-[1em] bg-[#FFFFFF] w-[300px] h-[40px] "
              }
            />
          </div>
          <div className="pt-[2em] pb-[2em] flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className={
                error
                  ? "border border-red-500 rounded-[2px] w-[300px] h-[40px] pl-[1em]"
                  : "border outline-none pl-[1em] rounded-[5px] bg-[#FFFFFF] w-[300px] h-[40px]"
              }
            />
          </div>
          <div className="pb-[2em] flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="password"
              className={
                error
                  ? "border border-red-500 rounded-[2px] w-[300px] h-[40px] pl-[1em]"
                  : "border pl-[1em] outline-none rounded-[5px] bg-[#FFFFFF] w-[300px] h-[40px]"
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="confirmPassword"
              className={
                error
                  ? "border border-red-500 rounded-[2px] w-[300px] h-[40px] pl-[1em]"
                  : "border pl-[1em] outline-none rounded-[5px] bg-[#FFFFFF] w-[300px] h-[40px]"
              }
            />
          </div>
          <button
            type="submit"
            className="bg-[#000] w-[200px] h-[50px] text-[#FFFFFF]
              text-[20px] capitalize rounded-[5px] mt-[2em]"
          >
            signup
          </button>
        </form>

        <div className="flex gap-[3em] mt-[2em]">
          <p>Already have an account!</p>
          <Link
            className="capitalize text-blue-500 cursor-pointer"
            to="/login"
          >
            login
          </Link>
        </div>
        {message && <p className="lg:text-[#EED] text-[#020202] pt-[2em] lg:text-[20px] text-[15px]">{message}</p>}
        {error && <p className="text-[20px] text-red-500 pt-[1.5em]">{error}</p>}
      </div>
    </AuthBg>
  );
};

export default Signup;
