import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Activity, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="wf-gradient sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-white rounded-full p-1">
              <Activity className="h-6 w-6 text-emerald-500" />
            </div>
            <span className="text-white text-xl font-bold">FitMe</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Dashboard
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Profile
            </NavLink>
            <NavLink to="/workout" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Workout
            </NavLink>
            <NavLink to="/progress" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Progress
            </NavLink>
            <NavLink to="/history" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              History
            </NavLink>
            <NavLink to="/community" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Community
            </NavLink>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="text-white hover:text-white/90 transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="bg-white text-emerald-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                    <span className="text-emerald-500 font-medium">{user?.name.charAt(0)}</span>
                  </div>
                  <button 
                    onClick={logout}
                    className="text-white hover:text-white/90 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md ${isActive ? 'bg-emerald-100 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/profile" 
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md ${isActive ? 'bg-emerald-100 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </NavLink>
            <NavLink 
              to="/workout" 
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md ${isActive ? 'bg-emerald-100 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Workout
            </NavLink>
            <NavLink 
              to="/progress" 
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md ${isActive ? 'bg-emerald-100 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Progress
            </NavLink>
            <NavLink 
              to="/history" 
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md ${isActive ? 'bg-emerald-100 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              History
            </NavLink>
            <NavLink 
              to="/community" 
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md ${isActive ? 'bg-emerald-100 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </NavLink>
            
            {!isAuthenticated ? (
              <div className="pt-4 flex flex-col space-y-2">
                <Link 
                  to="/login" 
                  className="wf-button-secondary text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="wf-button-primary text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <button 
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="mt-4 w-full wf-button-secondary"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;