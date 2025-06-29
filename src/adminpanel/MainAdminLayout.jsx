import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";

const MainAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Detect screen size and set initial state
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // Close sidebar by default on mobile
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    alert("Logged out!");
  };

  return (
    <div className="flex h-screen bg-[#0F1729] text-white overflow-hidden">
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={toggleSidebar}
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#131B31] hover:bg-[#1E2747] transition-all ${
          sidebarOpen ? 'left-64' : 'left-4'
        }`}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-40 h-full transition-all duration-300 ${
          sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 lg:w-64'
        }`}
      >
        <DashboardSidebar onClose={() => setSidebarOpen(false)} />
      </div>
      
      {/* Overlay for mobile */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#19233A] shadow-md border-b border-[#232946]">
          <div className="text-2xl font-bold tracking-wide text-white">Stratgemedia</div>
          <div className="flex items-center gap-6">
            <button className="relative focus:outline-none" onClick={() => setDropdownOpen((v) => !v)}>
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-[#41D1FF] shadow-md cursor-pointer"
              />
            </button>
            {/* Dropdown */}
            {dropdownOpen && (
              <div ref={dropdownRef} className="absolute right-6 top-16 bg-white text-[#232946] rounded-lg shadow-lg w-48 z-50">
                <div className="px-4 py-3 border-b border-gray-200 font-semibold">John Doe</div>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => alert('Profile clicked!')}>Profile</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
        {/* Main Content Area */}
        <main className="flex-1 p-4 overflow-y-auto md:p-6 bg-[#0F1729]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainAdminLayout;