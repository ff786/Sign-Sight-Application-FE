import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const features = [
    { name: 'Audio-Sign Conversion', path: '/convert' },
    { name: 'Sign Learning', path: '/lessons', requiresAuth: true },
    { name: 'Emotions Detection', path: '/emotion_landing' },
    { name: 'Live Sign Detection', path: '/detection' },
  ];

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b-2 border-yellow-200 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0 group">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-white font-bold text-lg">🤟</span>
            </div>
            <span className="hidden sm:inline text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              SignSight
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {features.map((feature) => (
              <Link
                key={feature.path}
                to={feature.path}
                className="px-3 py-2 rounded-lg text-gray-700 hover:bg-yellow-100 hover:text-yellow-800 transition-all duration-200 font-medium text-sm"
              >
                {feature.name}
              </Link>
            ))}
          </div>

          {/* Right Side - Auth Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              // User Profile Menu
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white border-2 border-yellow-300 hover:border-yellow-400 transition-all"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="hidden sm:inline text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                  <ChevronDown size={16} className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-yellow-100 py-2">
                    <div className="px-4 py-2 border-b border-yellow-100">
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                      <p className="text-xs text-yellow-600 font-semibold mt-1 uppercase">{user.role}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 transition"
                    >
                      👤 My Profile
                    </Link>
                    {user.role === 'student' && (
                      <Link
                        to="/student/attempts"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 transition"
                      >
                        📊 My Progress
                      </Link>
                    )}
                    {user.role === 'mentor' && (
                      <Link
                        to="/mentorDash"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 transition"
                      >
                        📈 Dashboard
                      </Link>
                    )}
                    {user.role === 'admin' && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 transition"
                      >
                        ⚙️ Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition border-t border-yellow-100 mt-2"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Auth Buttons
              <div className="hidden sm:flex items-center space-x-2">
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-gray-700 font-medium hover:bg-yellow-100 rounded-lg transition"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition"
                >
                  Register
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-yellow-100 transition"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-yellow-200">
            {features.map((feature) => (
              <Link
                key={feature.path}
                to={feature.path}
                className="block px-4 py-2 text-gray-700 hover:bg-yellow-100 transition"
                onClick={() => setIsOpen(false)}
              >
                {feature.name}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="px-4 py-2 space-y-2 border-t border-yellow-200 mt-2">
                <button
                  onClick={() => {
                    navigate('/login');
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 text-gray-700 font-medium hover:bg-yellow-100 rounded-lg transition"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigate('/signup');
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium rounded-lg transition"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

