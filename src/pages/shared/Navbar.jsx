import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Heart, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, signOutUser, loading } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = () => {
    signOutUser()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => console.error("Logout error:", error));
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  useEffect(() => {
    const theme = isDarkTheme ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDarkTheme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkTheme(savedTheme === "dark");
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  // Show loading spinner if loading
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`navbar bg-base-100 shadow-lg px-4 lg:px-8 ${
        isMenuOpen ? "mb-56" : ""
      }`}
    >
      {/* Website Name */}
      <div className="flex-1 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-primary flex items-center"
        >
          <Heart className="h-8 w-8 text-rose-500" />
          <span className="ml-2 text-xl font-bold text-gray-800">
            Volunteer Network
          </span>
        </Link>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 lg:ml-14 transition-colors"
        >
          {isDarkTheme ? "🌙 Dark Mode" : "🌞 Light Mode"}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/all-volunteer">All Volunteer</Link>
          </li>
          {/* Conditional Login/Logout Button */}
          {user ? (
            <>
              {/* User Profile with Tooltip */}
              <div className="dropdown dropdown-end relative z-50">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="User Avatar" />
                    ) : (
                      <div className="bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold">
                          {user.displayName ? user.displayName[0] : "N/A"}
                        </span>
                      </div>
                    )}
                  </div>
                </label>
                {/* Tooltip for Display Name */}
                <ReactTooltip id="user-tooltip" place="bottom" effect="solid">
                  {user.displayName}
                </ReactTooltip>
                {/* Dropdown Menu */}
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 relative z-50"
                >
                  <li>
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>
                      <span>{user.displayName}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/volunteer-needs"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Add Volunteer
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/manage-posts"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Manage My Posts
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Logout Button */}
              <li>
                <button onClick={handleLogout} className="btn btn-outline">
                  <LogOut className="h-5 w-5" />
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="lg:hidden">
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-base-100 shadow-md lg:hidden z-50">
          <ul className="menu menu-vertical px-4">
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/all-volunteer" onClick={() => setIsMenuOpen(false)}>
                All Volunteer
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    to="/volunteer-needs"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Add Volunteer
                  </Link>
                </li>
                <li>
                  <Link to="/manage-posts" onClick={() => setIsMenuOpen(false)}>
                    Manage My Posts
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn btn-outline">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;