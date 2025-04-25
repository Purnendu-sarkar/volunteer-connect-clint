import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import {
  X,
  Heart,
  LogOut,
  Menu,
  Home,
  Users,
  PlusCircle,
  Settings,
  Sun,
  Moon,
  CalendarDays,
} from "lucide-react";

const Navbar = () => {
  const { user, signOutUser, loading } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const theme = isDarkTheme ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDarkTheme]);

  const handleLogout = () => {
    signOutUser()
      .then(() => navigate("/login"))
      .catch((error) => console.error("Logout error:", error));
  };

  const closeDropdown = (event) => {
    if (!event.target.closest(".profile-menu")) {
      setIsProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-rose-500"></div>
      </div>
    );
  }

  return (
    <nav className="fixed top-0 left-0 w-full border-b  z-50 py-3 px-4 lg:px-8 flex items-center justify-between">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center font-bold text-2xl text-primary hover:scale-105 transition-transform duration-300"
      >
        <Heart className="h-8 w-8" />
        <span className="ml-2">Volunteer Network</span>
      </Link>

      {/* Dark/Light Mode Toggle */}
      <button
        onClick={() => setIsDarkTheme(!isDarkTheme)}
        className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-300"
      >
        {isDarkTheme ? (
          <Sun className="h-6 w-6 text-yellow-400" />
        ) : (
          <Moon className="h-6 w-6 text-gray-700" />
        )}
      </button>

      {/* Desktop Menu */}
      <div className="hidden lg:flex gap-8 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 hover:text-rose-500 transition-all duration-300 ${
              isActive ? "text-rose-500" : ""
            }`
          }
        >
          <Home className="h-5 w-5" /> Home
        </NavLink>
        <NavLink
          to="/all-volunteer"
          className={({ isActive }) =>
            `flex items-center gap-2 hover:text-rose-500 transition-all duration-300 ${
              isActive ? "text-rose-500" : ""
            }`
          }
        >
          <Users className="h-5 w-5" /> All Volunteer
        </NavLink>
        <NavLink
          to="/all-events"
          className={({ isActive }) =>
            `flex items-center gap-2 hover:text-rose-500 transition-all duration-300 ${
              isActive ? "text-rose-500" : ""
            }`
          }
        >
          <CalendarDays className="h-5 w-5" /> All Events
        </NavLink>

        {user ? (
          <>
            <NavLink
              to="/volunteer-needs"
              className={({ isActive }) =>
                `flex items-center gap-2 hover:text-rose-500 transition-all duration-300 ${
                  isActive ? "text-rose-500" : ""
                }`
              }
            >
              <PlusCircle className="h-5 w-5" /> Add Volunteer
            </NavLink>
            <NavLink
              to="/manage-posts"
              className={({ isActive }) =>
                `flex items-center gap-2 hover:text-rose-500 transition-all duration-300 ${
                  isActive ? "text-rose-500" : ""
                }`
              }
            >
              <Settings className="h-5 w-5" /> Manage Posts
            </NavLink>

            {/* Profile Dropdown */}
            <div className="relative profile-menu">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center"
              >
                <img
                  src={user.photoURL || "default-avatar.png"}
                  alt={user.displayName || "User"}
                  className="w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-rose-500 transition duration-300"
                />
              </button>
              {isProfileMenuOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white shadow-md p-2 rounded-md">
                  <li className="px-4 py-2">{user.displayName || "No Name"}</li>
                  <li className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300">
                    <Link to="/profile" className="flex items-center gap-2">
                      <Settings className="h-5 w-5" /> Profile
                    </Link>
                  </li>
                  <li
                    className="px-4 py-2 text-red-600 cursor-pointer flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5" /> Logout
                  </li>
                </ul>
              )}
            </div>
          </>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `flex items-center gap-2 hover:text-rose-500 transition-all duration-300 ${
                isActive ? "text-rose-500" : ""
              }`
            }
          >
            <LogOut className="h-5 w-5" /> Login
          </NavLink>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-200 dark:bg-gray-900 text-black dark:text-white flex flex-col items-center justify-center">
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <X className="h-8 w-8" />
          </button>
          <ul className="space-y-6 text-center">
            <li>
              <NavLink
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 text-2xl hover:text-rose-500 transition-all duration-300 ${
                    isActive ? "text-rose-500" : ""
                  }`
                }
              >
                <Home className="h-8 w-8" /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-volunteer"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 text-2xl hover:text-rose-500 transition-all duration-300 ${
                    isActive ? "text-rose-500" : ""
                  }`
                }
              >
                <Users className="h-8 w-8" /> All Volunteer
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-events"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 text-2xl hover:text-rose-500 transition-all duration-300 ${
                    isActive ? "text-rose-500" : ""
                  }`
                }
              >
                <CalendarDays className="h-8 w-8" /> All Events
              </NavLink>
            </li>

            {user ? (
              <>
                <li>
                  <NavLink
                    to="/volunteer-needs"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2 text-2xl hover:text-rose-500 transition-all duration-300 ${
                        isActive ? "text-rose-500" : ""
                      }`
                    }
                  >
                    <PlusCircle className="h-8 w-8" /> Add Volunteer
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/manage-posts"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2 text-2xl hover:text-rose-500 transition-all duration-300 ${
                        isActive ? "text-rose-500" : ""
                      }`
                    }
                  >
                    <Settings className="h-8 w-8" /> Manage Posts
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-2xl text-red-600"
                  >
                    <LogOut className="h-8 w-8" /> Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 text-2xl hover:text-rose-500 transition-all duration-300 ${
                      isActive ? "text-rose-500" : ""
                    }`
                  }
                >
                  <LogOut className="h-8 w-8" /> Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
