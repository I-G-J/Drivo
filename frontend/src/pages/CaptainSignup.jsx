
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/drivo-page-logo.png";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";


const CaptainSignup = () => {

  const Navigate=useNavigate();
  // Personal Information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Vehicle Information
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("car");
  const [vehicleLat, setVehicleLat] = useState("");
  const [vehicleLng, setVehicleLng] = useState("");

  // UI State
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCaptain, setIsLoading, setError: setContextError } =
    useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setIsLoading(true);

    try {
      const captainData = {
        fullname: {
          firstname: firstName,
          lastname: lastName,
        },
        email: email,
        password: password,
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: parseInt(vehicleCapacity),
          vehicleType: vehicleType,
          
        },
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      );

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Signup failed. Please try again.";
      setError(errorMessage);
      setContextError(errorMessage);
      console.error("Signup failed:", err);
    } finally {
      setLoading(false);
      setIsLoading(false);
      // Clear form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setVehicleColor("");
      setVehiclePlate("");
      setVehicleCapacity("");
      setVehicleType("car");
      
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between overflow-y-auto">
      <div>
        <img
          className="mb-10 w-16 object-contain"
          src={logo}
          alt="Drivo Logo"
        />

        <form onSubmit={submitHandler}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Personal Information */}
          <h3 className="text-base mb-2 font-semibold">Captain's Name</h3>
          <div className="flex gap-4 mb-6">
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm"
              type="text"
              required
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm"
              type="text"
              required
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <h3 className="text-base mb-2 font-semibold">Email ID</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="youremail@email.com"
          />

          <h3 className="text-base mb-2 font-semibold">Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            required
            placeholder="Your password"
          />

          {/* Vehicle Information */}
          <h3 className="text-base mb-4 font-semibold border-t pt-4">Vehicle Information</h3>

          <h3 className="text-base mb-2 font-semibold">Vehicle Type</h3>
          <select
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
          >
            <option value="car">Car</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="auto">Auto</option>
          </select>

          <h3 className="text-base mb-2 font-semibold">Vehicle Color</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="text"
            required
            placeholder="e.g., Red, Blue, White"
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
          />

          <h3 className="text-base mb-2 font-semibold">Vehicle Plate</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="text"
            required
            placeholder="License plate number"
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
          />

          <h3 className="text-base mb-2 font-semibold">Capacity</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="number"
            required
            placeholder="Number of passengers"
            value={vehicleCapacity}
            onChange={(e) => setVehicleCapacity(e.target.value)}
          />

          

          <button
            disabled={loading}
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-base placeholder:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>

      <div>
        <p className="text-[10px] mt-6 leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
}

export default CaptainSignup