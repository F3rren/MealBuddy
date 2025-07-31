import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link 
                to="/" 
                onClick={closeMobileMenu}
                className="text-white no-underline decoration-none flex items-center gap-2 hover:opacity-90 transition-opacity duration-200"
              >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">🍴</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold uppercase tracking-wide">
                  MealBuddy
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link 
                  to="/recipes" 
                  className="text-white no-underline decoration-none px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wide transition-all duration-200 hover:bg-white/20 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Ricette
                </Link>
                <Link 
                  to="/meal-plan" 
                  className="text-white no-underline decoration-none px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wide transition-all duration-200 hover:bg-white/20 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Pianificazione
                </Link>
                <Link 
                  to="/shopping-list" 
                  className="text-white no-underline decoration-none px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wide transition-all duration-200 hover:bg-white/20 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Lista Spesa
                </Link>
                {isAuthenticated ? (
                  <div className="flex items-center space-x-3">
                    
                    <button
                      onClick={logout}
                      className="bg-red-500 text-white no-underline decoration-none px-4 py-2 rounded-md text-sm font-medium uppercase tracking-wide transition-all duration-200 hover:bg-red-600 hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link 
                    to="/login" 
                    className="bg-blue-500 text-white no-underline decoration-none px-4 py-2 rounded-md text-sm font-medium uppercase tracking-wide transition-all duration-200 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-200"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle menu"
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger icon */}
                <div className="w-6 h-6 relative">
                  <span
                    className={`absolute block h-0.5 w-full bg-white transform transition-transform duration-300 ${
                      isMobileMenuOpen ? 'rotate-45 top-2.5' : 'top-1'
                    }`}
                  />
                  <span
                    className={`absolute block h-0.5 w-full bg-white transform transition-opacity duration-300 top-2.5 ${
                      isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`absolute block h-0.5 w-full bg-white transform transition-transform duration-300 ${
                      isMobileMenuOpen ? '-rotate-45 top-2.5' : 'top-4'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen 
              ? 'max-h-screen opacity-100 pb-4' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/10 rounded-lg mt-2 backdrop-blur-sm">
              <Link
                to="/recipes"
                onClick={closeMobileMenu}
                className="text-white no-underline decoration-none block px-3 py-2 rounded-md text-base font-medium uppercase tracking-wide transition-all duration-200 hover:bg-white/20 active:bg-white/30"
              >
                🍲 Ricette
              </Link>
              <Link
                to="/meal-plan"
                onClick={closeMobileMenu}
                className="text-white no-underline decoration-none block px-3 py-2 rounded-md text-base font-medium uppercase tracking-wide transition-all duration-200 hover:bg-white/20 active:bg-white/30"
              >
                📅 Pianificazione
              </Link>
              <Link
                to="/shopping-list"
                onClick={closeMobileMenu}
                className="text-white no-underline decoration-none block px-3 py-2 rounded-md text-base font-medium uppercase tracking-wide transition-all duration-200 hover:bg-white/20 active:bg-white/30"
              >
                🛒 Lista Spesa
              </Link>
              {isAuthenticated ? (
                <div className="pt-2 border-t border-white/20">
                  <div className="text-white/80 px-3 py-1 text-sm">
                    Ciao, {user?.username}
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      closeMobileMenu();
                    }}
                    className="bg-red-500 text-white no-underline decoration-none block w-full text-left px-3 py-2 rounded-md text-base font-medium uppercase tracking-wide transition-all duration-200 hover:bg-red-600 active:bg-red-700 mt-2"
                  >
                    🔓 Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="bg-blue-500 text-white no-underline decoration-none block px-3 py-2 rounded-md text-base font-medium uppercase tracking-wide transition-all duration-200 hover:bg-blue-600 active:bg-blue-700 mt-2"
                >
                  🔐 Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </div>
  );
};

export default Layout;
