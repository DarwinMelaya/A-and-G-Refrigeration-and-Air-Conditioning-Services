import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiHome, FiGrid, FiLogOut, FiMenu, FiX, FiBox } from "react-icons/fi";
import axios from "axios";

const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: <FiGrid /> },
  { to: "/inventory", label: "Inventory", icon: <FiBox /> },
  // Add more links as needed
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUsername = async () => {
      const userStr = localStorage.getItem("user");
      if (!userStr || userStr === "undefined") return;
      const user = JSON.parse(userStr);
      if (user?.email) {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/user/profile?email=${encodeURIComponent(
              user.email
            )}`
          );
          if (res.data && res.data.name) {
            setUsername(res.data.name);
          }
        } catch (err) {
          // Optionally handle error
        }
      }
    };
    fetchUsername();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Sidebar content as a component for reuse
  const SidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo/Brand */}
      <div className="flex items-center gap-3 justify-center h-20 border-b border-green-100/40">
        <div className="bg-white rounded-xl p-2 shadow-sm">
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#3B82F6" />
            <path
              d="M10 18l6-6 6 6"
              stroke="#22c55e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow">
          A&G Services
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-green-100/80 pl-2">
          Main
        </div>
        {navLinks.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`group flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition relative
                ${
                  isActive
                    ? "bg-white/10 text-white font-semibold"
                    : "hover:bg-white/5 text-green-50"
                }`}
              tabIndex={0}
            >
              {/* Active bar */}
              <span
                className={`absolute left-0 top-2 bottom-2 w-1 rounded bg-green-400 transition-all ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                }`}
              />
              <span className="text-lg">{link.icon}</span>
              <span className="ml-1">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User/Logout Section */}
      <div className="p-4 border-t border-green-100/40 flex flex-col items-center">
        <div className="mb-2 flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center text-blue-700 font-bold text-lg shadow">
            {username ? username.charAt(0).toUpperCase() : "U"}
          </div>
          <span className="text-sm font-semibold text-white truncate max-w-[100px]">
            {username || "Username"}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-white/90 text-blue-700 font-semibold py-2 rounded-md hover:bg-green-100 transition text-sm shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <FiLogOut className="text-lg" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Burger icon for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white/90 rounded-full p-2 shadow-lg border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <FiMenu className="text-2xl text-blue-700" />
      </button>

      {/* Sidebar for desktop */}
      <aside className="hidden md:flex h-screen w-64 bg-gradient-to-b from-blue-700 to-green-500 text-white flex-col shadow-xl border-r border-green-200">
        {SidebarContent}
      </aside>

      {/* Sidebar drawer for mobile */}
      {open && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay with blur */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
            onClick={() => setOpen(false)}
          />
          {/* Drawer */}
          <aside className="relative w-64 h-full bg-gradient-to-b from-blue-700 to-green-500 text-white flex flex-col shadow-2xl border-r border-green-200 animate-slide-in-left">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-50 bg-white/90 rounded-full p-2 shadow border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => setOpen(false)}
              aria-label="Close sidebar"
            >
              <FiX className="text-2xl text-blue-700" />
            </button>
            {SidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
