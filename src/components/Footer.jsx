
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faFilm, 
  faTv, 
  faStar,
  faUserGroup,
  faCircleQuestion,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { 
  faTwitter,
  faFacebook,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-1">
            <Link to="/" className="text-red-600 font-bold text-2xl mb-4 block flex items-center">
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              LifeHurtMovieHeal
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Your sanctuary for cinematic healing. When life gets tough, movies heal the soul.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <FontAwesomeIcon icon={faTwitter} className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <FontAwesomeIcon icon={faFacebook} className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <FontAwesomeIcon icon={faInstagram} className="text-xl" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-lg flex items-center">
              <FontAwesomeIcon icon={faFilm} className="mr-2 text-red-600" />
              Navigation
            </h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-red-600 transition-colors text-sm flex items-center"><FontAwesomeIcon icon={faHeart} className="mr-2 w-4" />Home</Link></li>
              <li><Link to="/movies" className="text-gray-400 hover:text-red-600 transition-colors text-sm flex items-center"><FontAwesomeIcon icon={faFilm} className="mr-2 w-4" />Movies</Link></li>
              <li><Link to="/tv-shows" className="text-gray-400 hover:text-red-600 transition-colors text-sm flex items-center"><FontAwesomeIcon icon={faTv} className="mr-2 w-4" />TV Shows</Link></li>
              <li><Link to="/favorites" className="text-gray-400 hover:text-red-600 transition-colors text-sm flex items-center"><FontAwesomeIcon icon={faStar} className="mr-2 w-4" />Favorites</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-lg flex items-center">
              <FontAwesomeIcon icon={faUserGroup} className="mr-2 text-red-600" />
              Support
            </h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-red-600 transition-colors text-sm flex items-center"><FontAwesomeIcon icon={faInfoCircle} className="mr-2 w-4" />About</Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-red-600 transition-colors text-sm flex items-center"><FontAwesomeIcon icon={faCircleQuestion} className="mr-2 w-4" />Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Healing Categories</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>Comfort Films</li>
              <li>Inspiring Stories</li>
              <li>Heartwarming Content</li>
              <li>Therapeutic Series</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 LifeHurtMovieHeal. Healing through cinema.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">Terms</a>
            <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;