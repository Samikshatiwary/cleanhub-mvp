import React from 'react';
import { FiMenu, FiBell } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const UserNavbar = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <header className={`sticky top-0 z-30 ${theme === 'dark' ? 'bg-blue-800' : 'bg-blue-600'} text-white`}>
      <div className="px-3 sm:px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring focus:ring-white/30"
              aria-label="Toggle sidebar"
            >
              <FiMenu size={22} />
            </button>
            <span className="hidden md:block font-semibold">CleanHub</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === 'dark' ? <span className="text-yellow-300"></span> : <span></span>}
            </button>

            <button
              className="relative p-2 rounded-full hover:bg-white/10"
              aria-label="Notifications"
              title="Notifications"
            >
              <FiBell size={18} />
            </button>

            
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-md bg-white text-blue-700 text-sm hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserNavbar;