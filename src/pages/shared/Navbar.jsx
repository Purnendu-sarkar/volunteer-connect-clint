import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full ${
        isDarkTheme ? "bg-gray-800 text-white" : "bg-white text-black"
      } border-b border-gray-300 dark:border-gray-700 z-50 py-3 px-4 lg:px-8 flex items-center justify-between`}
    >
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center font-bold text-2xl hover:scale-105 transition-transform duration-300"
      >
        <Heart className="h-8 w-8 text-rose-500" />
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
      <div className="hidden lg:flex gap-6 items-center">
        <Link
          to="/"
          className="flex items-center gap-2 hover:text-rose-500 transition-all duration-300"
        >
          <Home className="h-5 w-5" /> Home
        </Link>
        <Link
          to="/all-volunteer"
          className="flex items-center gap-2 hover:text-rose-500 transition-all duration-300"
        >
          <Users className="h-5 w-5" /> All Volunteer
        </Link>
        <Link
          to="/all-events"
          className="flex items-center gap-2 hover:text-rose-500 transition-all duration-300"
        >
          <CalendarDays className="h-5 w-5" /> All Events
        </Link>

        {user ? (
          <>
            <Link
              to="/volunteer-needs"
              className="flex items-center gap-2 hover:text-rose-500 transition-all duration-300"
            >
              <PlusCircle className="h-5 w-5" /> Add Volunteer
            </Link>
            <Link
              to="/manage-posts"
              className="flex items-center gap-2 hover:text-rose-500 transition-all duration-300"
            >
              <Settings className="h-5 w-5" /> Manage Posts
            </Link>

            {/* Profile Dropdown */}
            <div className="relative profile-menu">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center"
              >
                <img
                  src={user.photoURL || "default-avatar.png"}
                  alt="User"
                  className="w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-rose-500 transition duration-300"
                />
              </button>
              {isProfileMenuOpen && (
                <ul
                  className={`absolute right-0 mt-2 w-48 ${
                    isDarkTheme
                      ? "bg-gray-800 text-white"
                      : "bg-white text-black"
                  } shadow-md p-2 rounded-md`}
                >
                  <li className="px-4 py-2">{user.displayName || "No Name"}</li>
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
          <Link
            to="/login"
            className="flex items-center gap-2 hover:text-rose-500 transition-all duration-300"
          >
            <LogOut className="h-5 w-5" /> Login
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`fixed inset-0 ${
            isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-200 text-black"
          } flex flex-col items-center justify-center`}
        >
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <X className="h-8 w-8" />
          </button>
          <ul className="space-y-4 text-center">
            <li>
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-2xl"
              >
                <Home className="h-6 w-6" /> Home
              </Link>
            </li>
            <li>
              <Link
                to="/all-volunteer"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-2xl"
              >
                <Users className="h-6 w-6" /> All Volunteer
              </Link>
            </li>
            <li>
              <Link
                to="/all-events"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-2xl"
              >
                <CalendarDays className="h-6 w-6" /> All Events
              </Link>
            </li>

            {user ? (
              <>
                <li>
                  <Link
                    to="/volunteer-needs"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 text-2xl"
                  >
                    <PlusCircle className="h-6 w-6" /> Add Volunteer
                  </Link>
                </li>
                <li>
                  <Link
                    to="/manage-posts"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 text-2xl"
                  >
                    <Settings className="h-6 w-6" /> Manage Posts
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-2xl text-red-600"
                  >
                    <LogOut className="h-6 w-6" /> Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 text-2xl"
                >
                  <LogOut className="h-6 w-6" /> Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
