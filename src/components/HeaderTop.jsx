import React, { useContext, useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, Menu, User, LogOut, Settings, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CartContext from "../Context/CartContext";
import authService from '../services/authService';

const HeaderTop = () => {
  const { count } = useContext(CartContext);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Check authentication status on component mount and when it changes
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = authService.isAuthenticated();
      setIsAuthenticated(authStatus);
      if (authStatus) {
        setUserEmail(localStorage.getItem('userEmail') || '');
      }
    };
    
    // Handle clicks outside the dropdown to close it
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    
    checkAuth();
    // Listen for storage events (for when user logs in/out in another tab)
    window.addEventListener('storage', checkAuth);
    // Add event listener for clicks outside dropdown
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCartNavigation = () => {
    navigate('/cart');
  };
  
  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUserEmail('');
    setDropdownOpen(false);
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo Section */}
          <div className="flex items-center">
            <a 
              href="/" 
              className="flex items-center space-x-2 transition-transform hover:scale-105"
            >
              <img
                src="../src/assets/Logo.png"
                alt="A-Market Logo"
                className="h-9 w-auto rounded-md"
              />
              <span className="hidden md:inline-block font-semibold text-gray-800">A-Market</span>
            </a>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-xl mx-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Mobile menu icon */}
          <button className="md:hidden p-2 rounded-full hover:bg-gray-100">
            <Menu className="h-5 w-5 text-gray-700" />
          </button>

          {/* Cart and User Section */}
          <div className="flex items-center space-x-4">
            {/* Wishlist Button - shown only when authenticated */}
            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => navigate('/wishlist')}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  aria-label="Wishlist"
                >
                  <Heart className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            )}
            
            {/* Cart Button */}
            <div className="relative">
              <button
                onClick={handleCartNavigation}
                className="p-2.5 hover:bg-gray-100 rounded-full transition-colors duration-200 flex items-center justify-center relative"
                aria-label={`Shopping cart with ${count} items`}
              >
                <ShoppingCart className="h-5 w-5 text-gray-700" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-sm">
                    {count > 99 ? '99+' : count}
                  </span>
                )}
              </button>
            </div>

            {/* User Menu - changes based on authentication status */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200 ${
                  isAuthenticated 
                    ? 'bg-gradient-to-r from-[#ffa07a] to-[#ff7f50] text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
                aria-label="Account menu"
                aria-expanded={dropdownOpen}
              >
                {isAuthenticated ? (
                  <span className="text-sm font-medium">
                    {userEmail.substring(0, 1).toUpperCase()}
                  </span>
                ) : (
                  <User className="w-5 h-5" />
                )}
              </button>
              
              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-gray-100 animate-in fade-in slide-in-from-top-5 duration-200">
                  {isAuthenticated ? (
                    <div>
                      <div className="bg-gradient-to-r from-[#ffe8d6] to-[#ffd6c0] px-4 py-3">
                        <p className="text-sm font-medium text-gray-800">{userEmail}</p>
                        <p className="text-xs text-gray-600 mt-1">Premium Member</p>
                      </div>
                      <div className="py-1">
                        <a 
                          href="/profile" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <User className="w-4 h-4 mr-3 text-gray-500" />
                          My Profile
                        </a>
                        <a 
                          href="/orders" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <svg 
                            className="w-4 h-4 mr-3 text-gray-500" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                            />
                          </svg>
                          My Orders
                        </a>
                        <a 
                          href="/settings" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Settings className="w-4 h-4 mr-3 text-gray-500" />
                          Settings
                        </a>
                        <div className="border-t border-gray-100"></div>
                        <button 
                          onClick={handleLogout}
                          className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-1">
                      <a 
                        href="/login" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      >
                        Sign in
                      </a>
                      <a 
                        href="/Signup" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      >
                        Sign up
                      </a>
                      <div className="border-t border-gray-100"></div>
                      <a 
                        href="/help" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      >
                        Help & Support
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile search - shown below header on mobile */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>
      </div>
    </header>
  );
};

export default HeaderTop;