import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Check login status on component mount and when location changes
  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loginStatus === 'true');
  }, [location]);

  return (
    <header className="bg-white shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/logo/barangay-599-logo.png" 
              alt="Barangay 599 Logo" 
              className="h-10 w-10 mr-3"
            />
            <span className="text-xl font-semibold text-gray-900">BARANGAY 599</span>
          </div>
          
          {/* Navigation */}
          <nav className="flex space-x-8">
            <Link 
              to="/" 
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-barangay-blue-600 font-semibold' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/announcements" 
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/announcements') 
                  ? 'text-barangay-blue-600 font-semibold' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Announcement
            </Link>
            <Link 
              to="/events" 
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/events') 
                  ? 'text-barangay-blue-600 font-semibold' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Events
            </Link>
            <Link 
              to="/about" 
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/about') 
                  ? 'text-barangay-blue-600 font-semibold' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/contact') 
                  ? 'text-barangay-blue-600 font-semibold' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Contact Us
            </Link>
            <Link 
              to="/register" 
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/register') 
                  ? 'text-barangay-blue-600 font-semibold' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Register as a Resident
            </Link>
          </nav>
          
          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="text-white px-4 py-2 rounded-md text-sm font-medium bg-green-600 hover:bg-green-700 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-white px-4 py-2 rounded-md text-sm font-medium bg-green-600 hover:bg-green-700 transition-colors"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;