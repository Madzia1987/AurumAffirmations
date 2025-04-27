import { useState } from 'react';
import { Link, useLocation } from 'wouter';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-amber-700 to-amber-800 shadow-md z-10 relative">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <div className="text-white font-serif font-bold text-xl md:text-2xl cursor-pointer">
              Aurum <span className="font-light italic">Affirmations</span>
            </div>
          </Link>
        </div>
        <nav>
          <button 
            id="menuToggle" 
            className="text-white focus:outline-none md:hidden"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          <ul 
            className={`${isMenuOpen ? 'block' : 'hidden'} absolute top-full left-0 right-0 bg-amber-700 shadow-lg md:shadow-none md:static md:flex md:bg-transparent md:flex-row z-50`}
          >
            <li className="border-b border-amber-600 md:border-none md:mr-4">
              <Link href="/">
                <div 
                  className={`block py-3 px-4 text-white hover:bg-amber-600 md:hover:bg-transparent md:hover:text-amber-200 transition-colors duration-200 ${location === '/' ? 'font-bold' : ''} cursor-pointer`}
                  onClick={closeMenu}
                >
                  Home
                </div>
              </Link>
            </li>
            <li className="border-b border-amber-600 md:border-none md:mr-4">
              <Link href="/horoscope">
                <div 
                  className={`block py-3 px-4 text-white hover:bg-amber-600 md:hover:bg-transparent md:hover:text-amber-200 transition-colors duration-200 ${location === '/horoscope' ? 'font-bold' : ''} cursor-pointer`}
                  onClick={closeMenu}
                >
                  Horoskop
                </div>
              </Link>
            </li>
            <li className="border-b border-amber-600 md:border-none md:mr-4">
              <Link href="/numerology">
                <div 
                  className={`block py-3 px-4 text-white hover:bg-amber-600 md:hover:bg-transparent md:hover:text-amber-200 transition-colors duration-200 ${location === '/numerology' ? 'font-bold' : ''} cursor-pointer`}
                  onClick={closeMenu}
                >
                  Numerologia
                </div>
              </Link>
            </li>
            <li>
              <Link href="/premium">
                <div 
                  className={`block py-3 px-4 text-white bg-amber-600 rounded md:bg-amber-600 hover:bg-amber-500 transition-colors duration-200 ${location === '/premium' ? 'font-bold' : ''} cursor-pointer`}
                  onClick={closeMenu}
                >
                  Premium
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
