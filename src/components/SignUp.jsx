import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignUpImg from "../assets/Log.png";
import authService from '../services/authService';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already authenticated
  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate("/"); // Redirect to home if already logged in
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Password validation - at least 8 characters
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return false;
    }

    // Mobile validation - simple check for now
    if (formData.mobile.length < 10) {
      setError("Please enter a valid mobile number");
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Prepare data object that matches backend expectations
      const userData = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobile: formData.mobile
      };
      
      const result = await authService.register(userData);
      
      if (result.success) {
        // Show success message and redirect
        navigate("/login", { 
          state: { 
            message: "Registration successful! Please sign in with your new account." 
          }
        });
      } else {
        setError(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans bg-gradient-to-br from-[#fffaf7] via-[#ffd6b5] to-[#fffaf7] min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="grid md:grid-cols-2 items-center gap-8 max-w-6xl w-full">
        {/* Image Section */}
        <div className="hidden md:block">
          <img
            src={SignUpImg}
            className="w-full aspect-[71/50] mx-auto block object-cover rounded-lg"
            alt="Signup illustration"
          />
        </div>
        
        {/* Signup Form */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 sm:p-8 max-w-md shadow-lg mx-auto w-full">
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="mb-6">
              <h3 className="text-gray-800 text-3xl font-bold">Sign up</h3>
              <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                Create your free account to get started!
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

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
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-2.5 rounded border focus:border-[#ffc3a0] outline-none transition-all"
                  placeholder="Enter email"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-4 top-1/2 transform -translate-y-1/2"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z" />
                </svg>
              </div>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Mobile Number</label>
              <div className="relative">
                <input
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-2.5 rounded border focus:border-[#ffc3a0] outline-none transition-all"
                  placeholder="Enter mobile number"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-4 top-1/2 transform -translate-y-1/2"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 2H7c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM7 16.999V5h10l.001 11.999H7z" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-2.5 rounded border focus:border-[#ffc3a0] outline-none transition-all"
                    placeholder="Enter password"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm4 10.723V20h-2v-2.277a1.993 1.993 0 0 1 .567-3.677A2.001 2.001 0 0 1 14 16a1.99 1.99 0 0 1-1 1.723z"/>
                  </svg>
                </div>
                <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters</p>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-2.5 rounded border focus:border-[#ffc3a0] outline-none transition-all"
                    placeholder="Confirm password"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm4 10.723V20h-2v-2.277a1.993 1.993 0 0 1 .567-3.677A2.001 2.001 0 0 1 14 16a1.99 1.99 0 0 1-1 1.723z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Terms and conditions */}
            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-[#ffc3a0] focus:ring-[#ffc3a0] border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-500">
                I agree to the{" "}
                <a href="/terms" className="text-[#ffc3a0] hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-[#ffc3a0] hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className={`w-full shadow-xl py-3 px-4 text-sm font-medium tracking-wide rounded-lg text-white transition-all duration-200
                  ${loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#ffb190] hover:bg-[#ffc3a0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc3a0]'
                  }`}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>

            {/* Sign In Link */}
            <p className="text-sm mt-6 text-center text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="text-[#ffc3a0] font-semibold hover:underline">
                Log in here
              </a>
            </p>
          </form>
        </div>

        {/* Mobile image - only shown on mobile */}
        <div className="block md:hidden mt-6">
          <img
            src={SignUpImg}
            className="w-full max-w-xs mx-auto rounded-lg"
            alt="Signup illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;