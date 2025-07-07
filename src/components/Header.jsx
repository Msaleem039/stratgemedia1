import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import { LogOut } from "lucide-react";

const routes = [
  { id: 1, to: "/", label: "Home" },
  { id: 2, to: "/subtitle", label: "Subtitle" },
  { id: 3, to: "/dubbing", label: "Dubbing" },
  { id: 4, to: "/ai-archiving", label: "AI Archiving" },
  { id: 5, to: "/Transcription", label: "Transcription" },
  { id: 6, to: "/contact", label: "Contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, token } = useSelector((state) => state.auth);

  const isAuthenticated = !!token;
  const isAdmin = auth?.role === "admin";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => setScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav
      className={`bg-[#1E4068] shadow-md w-full z-50 transition-all duration-300 ${
        scrolled ? "fixed top-0" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Only visible on lg screens and up */}
          <NavLink 
            to="/" 
            className="text-2xl font-bold text-white hidden lg:block"
          >
            StrategemMedia
          </NavLink>

          {/* Centered Tabs - Visible on sm and md screens */}
          <div className="flex-1 flex justify-center md:hidden">
            <div className="flex items-center space-x-4 overflow-x-auto">
              {routes.slice(0, 3).map((item) => (
                <NavLink
                  key={item.id}
                  to={item.to}
                  className={({ isActive }) =>
                    `text-sm font-medium px-2 py-1 whitespace-nowrap ${
                      isActive
                        ? "text-white underline underline-offset-4"
                        : "text-white hover:text-blue-200"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Desktop Menu - Visible on md screens and up */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-6">
            {routes.map((item) => (
              <NavLink
                key={item.id}
                to={item.to}
                className={({ isActive }) =>
                  `text-[1.1rem] font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-white underline underline-offset-4"
                      : "text-white hover:text-blue-200"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Auth Section - Right aligned */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 text-red-300 hover:text-red-200 font-semibold"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden lg:inline">Logout</span>
              </button>
            )}
            
            {/* Mobile Menu Button - Visible on sm screens */}
            <button 
              onClick={toggleMenu} 
              className="md:hidden text-lg font-medium text-white px-2"
            >
              More
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-2/5 z-40 bg-[#1E4068] shadow-lg transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <span className="text-xl font-bold text-white">Menu</span>
          <button onClick={toggleMenu} className="text-2xl text-white">
            ✕
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-4">
          {/* Show all routes in mobile menu */}
          {routes.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              onClick={toggleMenu}
              className={({ isActive }) =>
                `text-[1rem] font-medium ${
                  isActive ? "text-white underline" : "text-white hover:text-blue-200"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="flex items-center gap-2 mt-4 text-red-300 hover:text-red-200 px-4 py-2 text-left"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              onClick={toggleMenu}
              className="mt-4 text-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
            >
              👤 Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;