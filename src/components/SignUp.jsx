import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpImg from "../assets/Log.png";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("https://your-backend-endpoint/signup", formData);

      if (response.data.success) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        setError(response.data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="font-sans bg-gradient-to-br from-[#fffaf7] via-[#ffd6b5] to-[#fffaf7] min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="grid md:grid-cols-2 items-center gap-1 max-w-6xl w-full">
      <div>
          <img
            src={SignUpImg}
            className="w-full aspect-[71/50] mx-auto block object-cover rounded-lg"
            alt="Signup illustration"
          />
        </div>
        {/* Signup Form */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 max-w-md shadow-lg mx-auto">
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="mb-6">
              <h3 className="text-gray-800 text-3xl font-bold">Sign up</h3>
              <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                Create your free account to get started!
              </p>
            </div>

            {/* Form Fields */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">First Name</label>
                <input
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-2.5 rounded border focus:border-[#ffc3a0] outline-none transition-all"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-2.5 rounded border focus:border-[#ffc3a0] outline-none transition-all"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-2.5 rounded border focus:border-[#ffc3a0] outline-none transition-all"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Mobile Number</label>
              <input
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleInputChange}
                required
                className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-2.5 rounded border focus:border-[#ffc3a0] outline-none transition-all"
                placeholder="Enter mobile number"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-2.5 rounded border focus:border-[#ffc3a0] outline-none transition-all"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-2.5 rounded border focus:border-[#ffc3a0] outline-none transition-all"
                  placeholder="Confirm password"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg text-white bg-[#ffb190] hover:bg-[#ffc3a0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc3a0]"
              >
                Sign up
              </button>
            </div>

            {/* Sign In Link */}
            <p className="text-sm mt-8 text-center text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="text-[#ffc3a0] font-semibold hover:underline">
                Log in here
              </a>
            </p>
          </form>
        </div>

        {/* Image Section */}
        
      </div>
    </div>
  );
};

export default Signup;
