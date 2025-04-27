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
    <header className="bg-gold shadow-md z-10 relative">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <a className="text-cream font-playfair font-bold text-xl md:text-2xl">
              Aurum <span className="font-light italic">Affirmations</span>
            </a>
          </Link>
        </div>
        <nav>
          <button 
            id="menuToggle" 
            className="text-cream focus:outline-none md:hidden"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
          
          <ul 
            className={`${isMenuOpen ? 'block' : 'hidden'} absolute top-full left-0 right-0 bg-gold shadow-lg md:shadow-none md:static md:flex md:bg-transparent md:flex-row z-50`}
          >
            <li className="border-b border-gold-dark md:border-none md:mr-4">
              <Link href="/">
                <a 
                  className={`block py-3 px-4 text-cream hover:bg-gold-dark md:hover:bg-transparent md:hover:text-white transition-colors duration-200 ${location === '/' ? 'font-bold' : ''}`}
                  onClick={closeMenu}
                >
                  Home
                </a>
              </Link>
            </li>
            <li className="border-b border-gold-dark md:border-none md:mr-4">
              <Link href="/horoscope">
                <a 
                  className={`block py-3 px-4 text-cream hover:bg-gold-dark md:hover:bg-transparent md:hover:text-white transition-colors duration-200 ${location === '/horoscope' ? 'font-bold' : ''}`}
                  onClick={closeMenu}
                >
                  Horoskop
                </a>
              </Link>
            </li>
            <li className="border-b border-gold-dark md:border-none md:mr-4">
              <Link href="/numerology">
                <a 
                  className={`block py-3 px-4 text-cream hover:bg-gold-dark md:hover:bg-transparent md:hover:text-white transition-colors duration-200 ${location === '/numerology' ? 'font-bold' : ''}`}
                  onClick={closeMenu}
                >
                  Numerologia
                </a>
              </Link>
            </li>
            <li>
              <Link href="/premium">
                <a 
                  className={`block py-3 px-4 text-cream hover:bg-burgundy md:hover:bg-transparent md:hover:text-white transition-colors duration-200 ${location === '/premium' ? 'font-bold' : ''}`}
                  onClick={closeMenu}
                >
                  Premium
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
