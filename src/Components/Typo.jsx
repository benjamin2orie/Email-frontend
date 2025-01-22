
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AuthBg from "./AuthBg";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: " ",
    email: " ",
    password: " ",
    confirmPassword: " ",
  });
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPasswprd] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState(" ");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:9030/api/v1/users/signup",
        formData,
        {withCredentials: true}
      );
      setMessage(response.data.message);
      setError(" ");

      setTimeout(() => {
        navigate("/verify-otp");
      }, 2000);
    } catch (error) {
      setError(
        error.response.data.message ||
          "An error occured. Please try again later"
      );
      setMessage(" ");
    }
  };
  return (
    <AuthBg>
      <div>
        <div
          className="align-center bg-[#EED] lg:h-[600px] h-[600px] align-content-center lg:w-[400px] w-[95%] lg:rounded-[3px] justify-items-center
      pt-[2em] justify-self-center"
        >
          <h1 className="lg:text-[30px] text-[15px] capitalize">signup</h1>
          <form onSubmit={handleSubmit}>
            <div className="pb-[2em] flex flex-col">
              <label className="capitalize" htmlFor="username">
                username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Username"
                className={
                  error
                    ? "border border-red-500 rounded-[2px]"
                    : "border border-[#020202] outline-none rounded-[5px] bg-[#FFFFFF] w-[300px] h-[40px]"
                }
              />
            </div>

            <div className="pb-[2em] flex flex-col">
              <label className="capitalize" htmlFor="email">
                email
              </label>
              <input
                type="email"
                name="email"
                // value={formData.email}
                onChange={handleChange}
                required
                placeholder="email"
                className={
                  error
                    ? "border border-red-500 rounded-[2px]"
                    : "border border-[#020202] outline-none rounded-[5px] bg-[#FFFFFF] w-[300px] h-[40px]"
                }
              />
            </div>

            <div className="pb-[2em] flex flex-col">
              <label className="capitalize" htmlFor="password">
                password
              </label>
              <input
                type="password"
                name="password"
                // value={formData.password}
                onChange={handleChange}
                required
                placeholder="password"
                className={
                  error
                    ? "border border-red-500 rounded-[2px]"
                    : "border border-[#020202] outline-none rounded-[5px] bg-[#FFFFFF] w-[300px] h-[40px]"
                }
              />
            </div>

            <div className="pb-[2em] flex flex-col">
              <label className="capitalize" htmlFor="confirmPassword">
                confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                // value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="confirmPassword"
                className={
                  error
                    ? "border border-red-500 rounded-[2px]"
                    : "border border-[#020202] outline-none rounded-[5px] bg-[#FFFFFF] w-[300px] h-[40px]"
                }
              />
            </div>

            <button
              type="submit"
              className="bg-[#000] w-[200px] h-[50px] text-[#FFFFFF]
              text-[20px] capitalize rounded-[5px]"
            >
              signup
            </button>
          </form>

          <div className="flex gap-[3em] mt-[2em]">
            <p>Already have an account!</p>
            <Link
              className="capitalize text-green-500 cursor-pointer"
              to="/login"
            >
              login
            </Link>
          </div>

          {message && <p className="text-[#020202] p-[2em]">{message}</p>}
          {error && <p className="text-red-500 p-[2em]">{error}</p>}
        </div>
      </div>
    </AuthBg>
  );
};

export default Signup;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [formDate, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData({
//       ...formDate,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventdefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:9030/api/v1/users/signup",
//         formDate
//       );
//       setMessage(response.data.message);

//       setTimeout(() => {
//         navigate("/verify-otp");
//       }, 20000);

//       setError("");
//     } catch (err) {
//       setError(err.response.data.message) || " Registration faild";
//       setMessage("");
//     }
//   };

//   return (
//     <AuthBg>
//       <h2 className="text-red-500">signup</h2>

//       <form onSubmit={handleSubmit}>
//         <div className="pb-[2em]">
//           <label htmlFor="username">username</label>
//           <input
//             type="text"
//             name="username"
//             value={formDate.username}
//             onChange={handleChange}
//             required
//             placeholder="Username"
//           />
//         </div>

//          <div className="pb-[2em]">
//            <label htmlFor="email">email</label>
//             <input
//             type="email"
//             name="email"
//             value={formDate.email}
//             onChange={handleChange}
//             required
//             placeholder="Email"
//           />
//         </div>

//           <div className="pb-[2em]">
//             <label htmlFor="password">password</label>
//             <input
//             type="password"
//             name="password"
//             value={formDate.password}
//             onChange={handleChange}
//             required
//             placeholder="password"
//           />
//         </div>

//           <div>
//             <label htmlFor="confirmPassword">confirm password</label>
//             <input
//             type="password"
//             name="confirmPassword"
//             value={formDate.confirmPassword}
//             onChange={handleChange}
//             required
//             placeholder="confirmPassword"
//           />
//         </div>8i

//         <button type="submit">submit</button>
//       </form>

//       <div>
//         {message && <p>{message}</p>}
//         {error && <p>{error}</p>}
//       </div>
//     </AuthBg>
//   );
// };

// export default Signup;
