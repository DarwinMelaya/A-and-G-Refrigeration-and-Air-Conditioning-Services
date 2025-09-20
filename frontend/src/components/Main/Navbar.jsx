import { useState } from "react";
import logo from "/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    "Home",
    "About Us",
    "Our Vision and Mission",
    "Services",
    "Products",
    "Brand Partners",
    "Contact Us",
  ];

  return (
    <nav className="bg-gradient-to-r from-cyan-600/95 via-blue-600/90 to-emerald-600/95 backdrop-blur-sm shadow-xl border-b border-cyan-500/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Company Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={logo}
                  alt="A&G Refrigeration Logo"
                  className="h-10 w-10 object-contain"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-white/30 to-white/20 rounded-full opacity-40 blur-sm"></div>
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-white leading-tight drop-shadow-lg">
                  A&G REFRIGERATION
                </div>
                <div className="text-xs text-white/80 leading-tight drop-shadow-md">
                  AIR CONDITIONING SERVICES
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Navigation Menu */}
          <div className="flex items-center space-x-1">
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
              >
                <svg
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
                      isMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="relative px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-all duration-200 rounded-lg hover:bg-white/20 group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-white to-white/70 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-4 pt-2 pb-4 space-y-1 bg-gradient-to-r from-cyan-600/95 via-blue-600/90 to-emerald-600/95 backdrop-blur-sm border-t border-white/20 shadow-lg">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="block px-4 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
