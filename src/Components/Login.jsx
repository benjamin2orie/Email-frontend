import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AuthBg from "./AuthBg";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://email-backend-be9m.onrender.com/api/v1/users/login",
        { email, password },
        { withCredentials: true }
      );
      setMessage(response.data.message);
      setError("");

      setTimeout(() => {
        navigate("/homepage");
      }, 2000);
    } catch (err) {
      setError(err.response.data.message) ||
        "Please no user with such email or password found!";
      setMessage("");
    }
  };

  return (
    <AuthBg>
      <div className="bg-[#EEd] lg:w-[500px] w-[90%] lg:h-[600px] h-[500px] justify-items-center justify-self-center rounded mt-[3em] pt-[5em]">
        <h1 className="text-[20px] text-[#020202] pb-[1em] capitalize">
          login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="pb-[2em]">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={
                error
                  ? "border border-red-500 rounded lg:w-[300px] w-[280px] lg:h-[50px] h-[40px] pl-[1em] outline-none"
                  : "border lg:w-[300px] lg:h-[50px] h-[40px] w-[280px] rounded pl-[1em] text-[20px] outline-none"
              }
              placeholder="Enter your email address"
            />
          </div>

          <div className="pb-[2em]">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={
                error
                  ? "border border-red-500 rounded lg:w-[300px] w-[280px] lg:h-[50px] h-[40px] pl-[1em] outline-none"
                  : "border lg:w-[300px] w-[280px] lg:h-[50px] h-[40px] outline-none text-[20px] rounded pl-[1em]"
              }
              placeholder="Enter your password here"
            />
          </div>

          <button
            type="submit"
            className="lg:w-[300px] w-[280px] lg:h-[50px] h-[40px] rounded-[5px] bg-[#020202] text-[#FFFFFF] capitalize text-[20px]"
          >
            login
          </button>
        </form>

        <div className="pt-[1em] capitalize text-blue-500">
          <Link to="/forgot-password">forgot password</Link>
        </div>

        <div className="flex mt-[1.5em] gap-[3em]">
          <p className="text-[18px] text-[#020202]">Don't have an accout!</p>
          <Link to="/" className="text-[18px] capitalize text-blue-500">
            signup
          </Link>
        </div>

        {message && (
          <p className="text-[20px] text-[#020202] pt-[1em]">{message}</p>
        )}
        {error && <p className="text-red-500 text-[15px] pt-[1em]">{error}</p>}
      </div>
    </AuthBg>
  );
};

export default Login;
