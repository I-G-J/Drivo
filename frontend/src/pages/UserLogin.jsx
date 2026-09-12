import React, { useState, useContext } from "react";
import logo from "../assets/drivo-page-logo.png";
import { Link, useNavigate } from "react-router-dom";

import UserDataContext from "../context/UserContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const userContextValue = useContext(UserDataContext);
  const [user, setUser] = Array.isArray(userContextValue)
    ? userContextValue
    : [null, () => {}];
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token',data.token)
        navigate("/home");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="p-7  h-screen flex flex-col justify-between">
      <div>
        <img
          className="mb-10 w-16 object-contain"
          src={logo}
          alt="Drivo Logo"
        />

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <h3 className="text-xl mb-2 font-semibold">What's your email ID</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base "
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            placeholder="youremail@email.com"
          />

          <h3 className="text-xl mb-2 font-semibold">Enter Your Password</h3>
          <input
            type="password"
            value={password}
            onChange={(p) => {
              setPassword(p.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base "
            required
            placeholder="Your password"
          />

          <button 
            disabled={loading}
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-center">
            {" "}
            New here?{" "}
            <Link to="/signup" className="text-blue-600">
              Create a new Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base "
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
  // bg-[#F59E0B]
};

export default UserLogin;
