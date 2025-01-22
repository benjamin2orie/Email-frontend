import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Signup from "./Components/Signup";
import OtpEmailVerificationCode from "./Components/OtpEmailVerificationCode";
import ResendOtp from "./Components/ResendOtp";
import Login from "./Components/Login";
import ForgetPassword from "./Components/ForgetPassword";
import ResetPassword from "./Components/ResetPassword";
// import './App.css'

function App() {
  // const [users, setUsers] = useState([]);
  // const [ loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() =>{
  //   const  fetchUsers = async() =>{
  //     try{
  //       const response = await axios.get('http://localhost:9030/api/v1/users/getAllUsers');
  //       console.log(response.data.data);
  //       setUsers(response.data.data.users);
  //       setLoading(false);
  //     }catch(error){
  //       setError(error.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  // if(loading) return <p>Loading...</p>;
  // if(error) return <p>Error: {error}</p>;

  // <h1 className='uppercase text-[30px] text-[#000] text-center'>Happy sunday</h1>
  // <p className='text-center capitalize text-[20px] text-[#DDD]'>{users.username}</p>
  // <p className='text-center text-[#DDD] text-[20px]'>{ users.email}</p>
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/verify-otp" element={<OtpEmailVerificationCode />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/resend-otp" element={<ResendOtp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path = "/reset-password" element ={<ResetPassword/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
