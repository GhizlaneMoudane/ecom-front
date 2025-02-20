import axios from 'axios';

// Base URL for API
const API_URL = "/api";
const API_KEY = "hello123@"; // This should be stored in environment variables

// Login/Authenticate user
export const login = async (email, password) => {
  try {
    // Send GET request for authentication (as expected by backend)
    const response = await axios.get(API_URL, {
      params: {
        subject: "User",
        email: email,
        password: password // Include password directly
      }
    });
    
    // Backend returns an object with { message, has_authenticated }
    if (response.data.has_authenticated) {
      // Store more comprehensive session information
      localStorage.setItem("userEmail", email);
      localStorage.setItem("isAuthenticated", "true");
      
      return { 
        success: true, 
        message: response.data.message,
        email: email
      };
    }
    
    return { 
      success: false, 
      message: response.data.message || "Login failed."
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Login failed. Please try again.",
    };
  }
};

// Register new user
export const register = async (userData) => {
  try {
    // Create user
    const createUserResponse = await axios.post(API_URL, {
      subject: "User",
      object: {
        email: userData.email,
        password: userData.password
      },
      api_key: API_KEY
    });
    
    if (createUserResponse.data) {
      // Create basic user information
      const createUserInfoResponse = await axios.post(API_URL, {
        subject: "UserInfo",
        object: {
          email: userData.email,
          kyc_status: "init",
          // Add other initial user info fields as needed
          firstName: userData.firstName,
          lastName: userData.lastName,
          mobile: userData.mobile
        },
        api_key: API_KEY
      });
      
      return { success: true, data: createUserInfoResponse.data };
    }
    
    return { success: false, message: 'Registration failed' };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Registration failed. Please try again.'
    };
  }
};

// Update user profile/information
export const updateUserProfile = async (userData) => {
  try {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      return { success: false, message: 'User not authenticated' };
    }
    
    const response = await axios.put(API_URL, {
      subject: "UserInfo",
      object: {
        email: email,
        ...userData
      },
      api_key: API_KEY
    });
    
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update profile'
    };
  }
};

// Get user profile/information
export const getUserProfile = async () => {
  try {
    const email = localStorage.getItem('userEmail');
    const response = await axios.get(API_URL, {
      params: {
        subject: "UserInfo",
        email: email
      }
    });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch user information'
    };
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('userEmail');
  localStorage.removeItem('isAuthenticated');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === "true";
};

export default {
  login,
  register,
  logout,
  updateUserProfile,
  getUserProfile,
  isAuthenticated
};