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
  { id: 5, to: "/contact", label: "Contact" },
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
      className={`bg-[#0D0F2] shadow-md w-full z-50 border-b transition-all duration-300 ${
        scrolled ? "fixed top-0" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-bold text-blue-700">
            StrategemMedia
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {routes.map((item) => (
              <NavLink
                key={item.id}
                to={item.to}
                className={({ isActive }) =>
                  `text-[1.2rem] font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-blue-600 underline underline-offset-4"
                      : "text-gray-700 hover:text-blue-600"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-500 font-semibold"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-2xl text-blue-700">
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-4/5 z-40 bg-white shadow-lg transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <NavLink to="/" className="text-1xl font-bold text-blue-700" onClick={toggleMenu}>
            StrategemMedia
          </NavLink>
          <button onClick={toggleMenu} className="text-2xl text-blue-700">
            ✕
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-4">
          {routes.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              onClick={toggleMenu}
              className={({ isActive }) =>
                `text-[1rem] font-medium ${
                  isActive ? "text-blue-600 underline" : "text-gray-800 hover:text-blue-600"
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
              className="flex items-center gap-2 mt-4 text-red-600 hover:text-red-500 px-4 py-2 text-left"
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
