import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FiMenu, FiBell, FiSearch } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileDropdown from './ProfileDropdown';

const AdminNavbar = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [kpis, setKpis] = useState(null);
  const navigate = useNavigate();


  const token = localStorage.getItem('token') || localStorage.getItem('adminToken');

  
  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: token ? { Authorization: `Bearer ${token} `} : {},
  });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        
        const prof = await api.get('/admin/profile');
        setAdminData(prof.data);

        
        const noti = await api.get('/admin/notifications');
        setNotifications(Array.isArray(noti.data) ? noti.data : []);

        
        try {
          const ov = await api.get('/admin/overview');
          setKpis(ov.data?.kpis || null);
        } catch {
          
        }
      } catch (error) {
        console.error('Admin navbar fetch error:', error?.response?.data || error.message);
      }
    };
    fetchAll();
    
  }, [token]);

  const handleLogout = async () => {
    try {
      
      try { await api.post('/admin/logout'); } catch {}
      localStorage.removeItem('adminToken');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get(`/admin/products/search?query=${encodeURIComponent(searchQuery)}`);
      navigate('/admin/products', { state: { searchResults: res.data } });
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <header className={`sticky top-0 z-40 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <div className="px-3 sm:px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
        
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={toggleSidebar}
              className={`p-2 rounded-md focus:outline-none focus:ring ${theme === 'dark'
                  ? 'text-white hover:bg-gray-700 focus:ring-gray-600'
                  : 'text-gray-700 hover:bg-gray-100 focus:ring-gray-300'}`}
              aria-label="Toggle sidebar"
            >
              <FiMenu size={22} />
            </button>

            
            <form onSubmit={handleSearch} className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products, orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-56 lg:w-72 py-2 px-4 pl-10 rounded-full border ${theme === 'dark'
                      ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400'
                      : 'bg-gray-100 text-gray-800 border-gray-300 placeholder-gray-500'} 
                    focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                <button type="submit" className="absolute left-3 top-2.5" aria-label="Search">
                  <FiSearch className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>
              </div>
            </form>
          </div>

        
          <div className="flex items-center gap-2 sm:gap-3">
            {kpis && (
              <div className="hidden lg:flex items-center gap-2 text-xs">
                <span className={`px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>
                  Today: {kpis.ordersToday ?? 0}
                </span>
                <span className={`px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>
                  Pending: {kpis.pendingOrders ?? 0}
                </span>
                <span className={`px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>
                  Low stock: {kpis.lowStock ?? 0}
                </span>
                <span className={`px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>
                  ₹{Number(kpis.revenueToday || 0).toLocaleString()}
                </span>
              </div>
            )}

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === 'dark' ? (
                <span className="text-yellow-300" aria-hidden>☀</span>
              ) : (
                <span className="text-gray-700" aria-hidden>🌙</span>
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowNotifications((s) => !s)}
                className={`p-2 rounded-full relative transition ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                aria-label="Open notifications"
              >
                <FiBell size={18} />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div
                  className={`absolute right-0 mt-2 w-72 rounded-md shadow-lg border z-50 ${
                    theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className={`px-4 py-2 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                    <h3 className="font-medium">Notifications ({notifications.length})</h3>
                  </div>
                  <div className="py-1 max-h-80 overflow-auto">
                    {notifications.length > 0 ? (
                      notifications.map((n) => (
                        <Link
                          key={n._id || n.id}
                          to={n.link || '#'}
                          className={`block px-4 py-3 text-sm ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                          onClick={() => setShowNotifications(false)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`flex-shrink-0 h-9 w-9 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
                              {n.type === 'order' ? '🛒' : '📦'}
                            </div>
                            <div>
                              <p className="font-medium">{n.title || 'Notification'}</p>
                              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                {n.message || '—'}
                              </p>
                              {n.createdAt && (
                                <p className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} text-xs mt-1`}>
                                  {new Date(n.createdAt).toLocaleString()}
                                </p>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-center text-sm">No new notifications</div>
                    )}
                  </div>
                </div>
              )}
            </div>

        
            {adminData && (
              <ProfileDropdown
                adminData={adminData}
                theme={theme}
                handleLogout={handleLogout}
              />
            )}
          </div>
        </div>

      
        <form onSubmit={handleSearch} className="mt-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products, orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full py-2 px-4 pl-10 rounded-full border ${theme === 'dark'
                  ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400'
                  : 'bg-gray-100 text-gray-800 border-gray-300 placeholder-gray-500'} 
                focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            <button type="submit" className="absolute left-3 top-2.5" aria-label="Search">
              <FiSearch className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
            </button>
          </div>
        </form>
      </div>
    </header>
  );
};

export default AdminNavbar;