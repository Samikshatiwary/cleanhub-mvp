import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const PublicNavbar = () => {
  const { theme, toggleTheme } = useTheme();
  const nav = useNavigate();

  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); }
    catch { return null; }
  })();

  const gotoDashboard = () => {
    if (storedUser?.role === 'admin') nav('/admin/dashboard');
    else nav('/user');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    gotoDashboard(); 
    nav('/', { replace: true });
  };

  return (
    <header className={`w-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold text-blue-600">CleanHub</Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <span className="text-yellow-300">☀</span> : <span className="text-gray-700">🌙</span>}
          </button>

          {!storedUser ? (
            <>
              <Link
                to="/login"
                className={`px-3 py-1.5 rounded-md border text-sm ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'}`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={gotoDashboard}
                className={`px-3 py-1.5 rounded-md border text-sm ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'}`}
              >
                Go to Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-md bg-red-500 text-white text-sm hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;