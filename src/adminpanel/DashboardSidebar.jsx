"use client";

import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { 
  LogOut, 
  User2Icon,
} from "lucide-react";
import { useDispatch } from 'react-redux';
import { logout } from '../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';

// Dummy navigation data
const adminNavigation = [
  { to: "/admin/dashboard", label: "Dashboard", icon: <div>📊</div> },
  { to: "/admin/add-subtitle-video", label: "Add Subtitle Video", icon: <div>💬</div> },
  // { to: "/admin/add-dubbing-video", label: "Add Dubbing Video", icon: <div>🎤</div> },
  { to: "/admin/users", label: "List Users", icon: <div>👥</div> },
  // { to: "/admin/delete-user", label: "Delete User", icon: <div>❌</div> },
  { to: "/admin/update-profile", label: "Settings", icon: <div>⚙️</div> },
  // { to: "/update-profile", label: "Update Profile", icon: <div>📝</div> },
  { to: "/admin/productable", label: "Product", icon: <User2Icon size={18} /> },
];


function DashboardSidebar({ onClose }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const LogoutHandle = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="w-64 bg-[#0D1425] h-full flex flex-col relative">
      {/* Logo */}
      <Link to="/admin/dashboard">
        <div className="p-2 flex items-center justify-center mt-2 cursor-pointer">
          {/* <div className="text-white text-2xl font-bold">logo</div> */}
          <img src="/image/logo.png" alt="logo"  className="w-16 h-16 mr-1 rounded"/>
        </div>
      </Link>

      {/* Navigation Menu */}
      <nav className="flex-1 pt-2 pb-5 px-4 overflow-y-auto">
        <div className="space-y-1">
          {adminNavigation.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-gradient-to-r from-[#5271FF] to-[#AF52DE] text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`
              }
              onClick={isMobile ? onClose : undefined}
            >
              <div className="flex-shrink-0">
                {icon}
              </div>
              <span className="text-sm truncate">
                {label}
              </span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User2Icon className="text-gray-400"/>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium truncate max-w-[120px]">
                Admin User
              </h4>
              <span className="text-xs text-gray-400">
                Administrator
              </span>
            </div>
          </div>
          <LogOut 
            onClick={LogoutHandle}
            size={20}
            className="text-gray-400 cursor-pointer hover:text-white" 
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;