import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogingImg from '../assets/Log.png';
import authService from '../services/authService';

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate("/"); // Redirect to dashboard if already authenticated
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const result = await authService.login(formData.username, formData.password);
      
      if (result.success) {
        // Success notification or toast could be added here
        navigate("/"); // Redirect to dashboard
      } else {
        // Display error message from backend
        setError(result.message);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans bg-gradient-to-br from-[#fffaf7] via-[#ffd6b5] to-[#fffaf7] min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="grid md:grid-cols-2 items-center gap-1 max-w-6xl w-full">
        {/* Login Form */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 max-w-md shadow-lg mx-auto">
          <form onSubmit={handleLogin} className="space-y-9">
            <div className="mb-8">
              <h3 className="text-gray-800 text-3xl font-bold">Sign in</h3>
              <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                Sign in to your account and explore a world of possibilities.
                Your journey begins here.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {/* Username Field */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                User name
              </label>
              <div className="relative flex items-center">
                <input
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#ffc3a0]"
                  placeholder="Enter user name"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5z"></path>
                </svg>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#ffc3a0]"
                  placeholder="Enter password"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"></path>
                </svg>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#ffc3a0] focus:ring-[#ffc3a0] border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm text-gray-800"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="text-[#ffc3a0] hover:underline font-semibold"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className={`w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg text-white 
                  ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#ffb190] hover:bg-[#ffc3a0]'} 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc3a0]`}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-sm mt-8 text-center text-gray-500">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-[#ffc3a0] font-semibold hover:underline"
              >
                Register here
              </a>
            </p>
          </form>
        </div>

        {/* Image Section */}
        <div>
          <img
            src={LogingImg}
            className="w-full aspect-[71/50] mx-auto block object-cover rounded-lg "
            alt="Login illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;