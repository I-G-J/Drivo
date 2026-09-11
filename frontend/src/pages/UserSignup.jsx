import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/drivo-page-logo.png";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLasttName] = useState('');


  const submitHandler =(e)=>{
    e.preventDefault()
    const newUserData = {
      fullName:{
        firstName:firstName,
        lastName:lastName
      },
      email:email,
      password:password
    }
    setUserData(newUserData)

    
    setEmail('')
    setFirstName('')
    setLasttName('')
    setPassword('')
  }

  return (
    <div className="p-7  h-screen flex flex-col justify-between">
      <div>
        <img
          className="mb-10 w-16 object-contain"
          src={logo}
          alt="Drivo Logo"
        />

        <form onSubmit={(e)=>{
        submitHandler(e)
      }}>
          <h3 className="text-base mb-2 font-semibold">Your Name</h3>
          <div className="flex gap-4 mb-6">
            <input
              className="bg-[#eeeeee]  rounded px-4 py-2 border w-full text-base placeholder:text-sm w-1/2 "
              type="text"
              required
              placeholder="First name"
              value={firstName}
              onChange={(e)=>{
                setFirstName(e.target.value)
              }}
            />
            <input
              className="bg-[#eeeeee] w-1/2  rounded px-4 py-2 border w-full text-base placeholder:text-sm "
              type="text"
              required
              value={lastName}
              onChange={(e)=>{
                setLasttName(e.target.value)
              }}
              placeholder="Last name"
            />
          </div>

          <h3 className="text-base mb-2 font-semibold">What's your email ID</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm "
            type="email"
            value={email}
            onChange={(e)=>{
                setEmail(e.target.value)
              }}
            required
            placeholder="youremail@email.com"
          />

          <h3 className="text-base mb-2 font-semibold">Enter Your Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e)=>{
                setPassword(e.target.value)
              }}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm "
            required
            placeholder="Your password"
          />

          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-base placeholder:text-sm ">
            Login
          </button>
        </form>
        <p className="text-center">
          {" "}
          Already have a account?{" "}
          <Link to="/login" className="text-blue-600">
            login here
          </Link>
        </p>
      </div>
      <div>
        <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
          Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  );
};

export default UserSignup;
