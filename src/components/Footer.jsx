
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useFavorites } from '../hooks/useFavorites';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { favorites } = useFavorites();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black to-transparent'
    }`}>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-3 md:py-4">
        {/* Main Navbar */}
        <div className="flex items-center justify-between">
          {/* Left Section - Logo & Navigation */}
          <div className="flex items-center space-x-4 md:space-x-8">
            {/* Logo */}
            <Link to="/" className="text-red-600 font-bold text-xl sm:text-2xl">
              LifeHurtMovieHeal
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4 lg:space-x-6">
              <Link to="/" className={`transition-colors text-sm lg:text-base ${
                location.pathname === '/' ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
              }`}>
                Home
              </Link>
              <Link to="/tv-shows" className={`transition-colors text-sm lg:text-base ${
                location.pathname === '/tv-shows' ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
              }`}>
                TV Shows
              </Link>
              <Link to="/movies" className={`transition-colors text-sm lg:text-base ${
                location.pathname === '/movies' ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
              }`}>
                Movies
              </Link>
              <Link to="/people" className={`transition-colors text-sm lg:text-base ${
                location.pathname === '/people' ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
              }`}>
                People
              </Link>
              <Link to="/favorites" className={`transition-colors text-sm lg:text-base ${
                location.pathname === '/favorites' ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
              }`}>
                Favorites {favorites.length > 0 && `(${favorites.length})`}
              </Link>
            </div>
          </div>

          {/* Right Section - Search & User */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            {/* Search Bar - Hidden on small mobile, shown on medium+ */}
            <div className="hidden sm:block">
              <SearchBar />
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* User Profile - Hidden on small mobile */}
            <div className="hidden sm:flex w-8 h-8 bg-red-600 rounded-lg items-center justify-center cursor-pointer">
              <span className="text-white text-sm font-semibold">U</span>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar - Only shown when menu is open on small screens */}
        {isMobileMenuOpen && (
          <div className="sm:hidden mt-3">
            <SearchBar />
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-3 border-t border-gray-700 pt-3">
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-3 py-2 rounded text-sm transition-colors ${
                  location.pathname === '/' ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                Home
              </Link>
              <Link
                to="/tv-shows"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-3 py-2 rounded text-sm transition-colors ${
                  location.pathname === '/tv-shows' ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                TV Shows
              </Link>
              <Link
                to="/movies"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-3 py-2 rounded text-sm transition-colors ${
                  location.pathname === '/movies' ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                Movies
              </Link>
              <Link
                to="/people"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-3 py-2 rounded text-sm transition-colors ${
                  location.pathname === '/people' ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                People
              </Link>
              <Link
                to="/favorites"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-3 py-2 rounded text-sm transition-colors ${
                  location.pathname === '/favorites' ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                Favorites {favorites.length > 0 && `(${favorites.length})`}
              </Link>
              <div className="sm:hidden flex items-center px-3 py-2">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center cursor-pointer">
                  <span className="text-white text-sm font-semibold">U</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Horizontal Scroll Navigation for Medium Mobile */}
        <div className="md:hidden flex space-x-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
          <Link to="/" className={`whitespace-nowrap px-3 py-1 rounded text-sm transition-colors flex-shrink-0 ${
            location.pathname === '/' ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'
          }`}>
            Home
          </Link>
          <Link to="/tv-shows" className={`whitespace-nowrap px-3 py-1 rounded text-sm transition-colors flex-shrink-0 ${
            location.pathname === '/tv-shows' ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'
          }`}>
            TV Shows
          </Link>
          <Link to="/movies" className={`whitespace-nowrap px-3 py-1 rounded text-sm transition-colors flex-shrink-0 ${
            location.pathname === '/movies' ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'
          }`}>
            Movies
          </Link>
          <Link to="/favorites" className={`whitespace-nowrap px-3 py-1 rounded text-sm transition-colors flex-shrink-0 ${
            location.pathname === '/favorites' ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'
          }`}>
            Favorites {favorites.length > 0 && `(${favorites.length})`}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;