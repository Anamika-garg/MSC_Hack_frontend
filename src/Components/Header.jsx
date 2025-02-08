import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../Context/AuthContext";


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth(); // Get auth status and user data from context

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md fixed w-full z-10 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-purple-600">
            <Link to="/">AI Career</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/jobs" className="text-gray-700 hover:text-purple-600 transition">
             Find Jobs
            </Link>
            <Link to="/scholarships" className="text-gray-700 hover:text-purple-600 transition">
              Scholarships
            </Link>
            <Link to="/resume-review" className="text-gray-700 hover:text-purple-600 transition">
              Resume Review
            </Link>

            {/* Conditional Rendering */}
            {!isAuthenticated ? (
              <Link
                to="/signup"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Sign Up
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/journal"
                  className="text-gray-700 hover:text-purple-600 transition"
                >
                  Journal
                </Link>
                <div className="relative group">
                  <img
                    src={user?.profileURL || "https://via.placeholder.com/40"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-purple-600 cursor-pointer"
                  />
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out z-20">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          
          <Link to="/jobs" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
           Find Jobs
          </Link>
          <Link to="/scholarships" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            Scholarships
          </Link>
          <Link to="/resume-review" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            Resume Review
          </Link>

          {/* Conditional Rendering for Mobile */}
          {!isAuthenticated ? (
            <Link
              to="/signup"
              className="block px-4 py-2 text-white bg-purple-600 hover:bg-purple-700 transition"
            >
              Sign Up
            </Link>
          ) : (
            <>
              <Link
                to="/journal"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Journal
              </Link>
              <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100">
                <img
                  src={user?.profileImage || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full mr-2 border-2 border-purple-600"
                />
                <span className="text-gray-700">{user?.name || "Profile"}</span>
              </Link>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
