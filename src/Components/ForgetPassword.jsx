import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthBg from "./AuthBg";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleFoegetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        " https://email-backend-be9m.onrender.com/api/v1/users/forget-password",
        {email},
        { withCredentials: true }
      );
      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/reset-password");
      }, 2000);

      setError(" ");
    } catch (err) {
      setError(
        err.response.data.message || "This user does not exist! Please signup"
      );
    }
  };
  return (
    <AuthBg>
      <div className="justify-items-center bg-[#EED] lg:w-[600px] w-[95%] h-[400px] lg:h-[400px] pt-[5em] rounded justify-self-center">
        <h2 className="text-blue-500 capitalize pb-[2em]">forgot password</h2>
        <form onSubmit={handleFoegetPassword}>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your verified email here"
              className={
                error
                  ? "border border-red-500 h-[40px] w-[300px] outline-none pl-[1em]"
                  : "border border-blue-500 text-[20px] h-[40px] pl-[1em] rounded outline-none w-[300px]"
              }
            />
          </div>
          <button
            type="submit"
            className="w-[300px] bg-blue-500 mt-[2em] rounded text-[#DDD] capitalize h-[40px]"
          >
            send
          </button>
        </form>
        <div>
          {message && <p>{message}</p>}
          {error && <p className="text-red-500 pt-[2em]">{error}</p>}
        </div>
      </div>
    </AuthBg>
  );
};

export default ForgetPassword;
