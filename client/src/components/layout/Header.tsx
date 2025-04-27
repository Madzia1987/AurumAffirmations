import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Sparkles, User, LogIn, Globe } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState('pl'); // domyślny język: polski
  const { user, logoutMutation } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Funkcja obsługująca zmianę języka
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    // Tutaj możemy dodać logikę zmiany języka w całej aplikacji
    closeMenu();
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg backdrop-blur-md bg-opacity-90' 
          : 'bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <div className="gold-text-gradient font-serif font-bold text-2xl md:text-3xl cursor-pointer flex items-center">
              <span className="mr-1">Aurum</span> 
              <span className="font-light italic">Affirmations</span>
              <Sparkles className="h-5 w-5 ml-1 text-amber-400" />
            </div>
          </Link>
        </div>
        <nav className="relative flex items-center">
          <button 
            id="menuToggle" 
            className="text-amber-400 focus:outline-none md:hidden"
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
            className={`${isMenuOpen ? 'block' : 'hidden'} absolute top-full mt-3 right-0 bg-gray-900 border border-amber-900/50 shadow-lg md:shadow-none rounded-lg overflow-hidden
            md:flex md:static md:bg-transparent md:border-none md:flex-row md:mt-0 z-50`}
          >
            <li className="md:mx-2">
              <Link href="/">
                <div 
                  className={`block py-3 px-5 text-amber-50 hover:bg-gray-800 md:hover:bg-transparent md:hover:text-amber-400
                  transition-colors duration-200 ${location === '/' ? 'font-bold text-amber-400' : ''} cursor-pointer relative group`}
                  onClick={closeMenu}
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                </div>
              </Link>
            </li>
            <li className="md:mx-2">
              <Link href="/horoscope">
                <div 
                  className={`block py-3 px-5 text-amber-50 hover:bg-gray-800 md:hover:bg-transparent md:hover:text-amber-400
                  transition-colors duration-200 ${location === '/horoscope' ? 'font-bold text-amber-400' : ''} cursor-pointer relative group`}
                  onClick={closeMenu}
                >
                  Horoskop
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                </div>
              </Link>
            </li>
            <li className="md:mx-2">
              <Link href="/numerology">
                <div 
                  className={`block py-3 px-5 text-amber-50 hover:bg-gray-800 md:hover:bg-transparent md:hover:text-amber-400
                  transition-colors duration-200 ${location === '/numerology' ? 'font-bold text-amber-400' : ''} cursor-pointer relative group`}
                  onClick={closeMenu}
                >
                  Numerologia
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                </div>
              </Link>
            </li>
            <li className="md:ml-2">
              <Link href="/premium">
                <div 
                  className={`block py-3 px-5 text-white 
                  md:bg-gradient-to-r md:from-amber-600 md:to-amber-700 md:hover:from-amber-700 md:hover:to-amber-800
                  md:rounded-full md:border md:border-amber-500/30 md:shadow-lg md:shadow-amber-900/20
                  transition-all duration-300 hover:shadow-amber-600/30 
                  ${location === '/premium' ? 'bg-gradient-to-r from-amber-700 to-amber-800 md:from-amber-600 md:to-amber-700' : 'bg-gray-800 hover:bg-gray-700'} 
                  cursor-pointer flex items-center space-x-1`}
                  onClick={closeMenu}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Premium</span>
                </div>
              </Link>
            </li>
            
            {user ? (
              <li className="md:ml-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div 
                      className="flex items-center py-3 px-5 md:px-2 cursor-pointer text-amber-50 hover:text-amber-400 transition-colors duration-200"
                      onClick={closeMenu}
                    >
                      <Avatar className="h-8 w-8 border border-amber-500/50">
                        <AvatarFallback className="bg-gradient-to-br from-amber-400 to-amber-700 text-white text-sm">
                          {user.username?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-900 border border-amber-800/30">
                    <div className="px-3 py-2 text-sm text-amber-400 font-medium">
                      {user.username || "Użytkownik"}
                    </div>
                    <DropdownMenuSeparator className="bg-amber-800/30" />
                    <Link href="/profile">
                      <DropdownMenuItem className="text-amber-50 hover:text-amber-400 cursor-pointer focus:bg-gray-800 focus:text-amber-400">
                        <User className="mr-2 h-4 w-4" />
                        <span>Mój profil</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator className="bg-amber-800/30" />
                    <DropdownMenuItem 
                      onClick={() => logoutMutation.mutate()}
                      className="text-amber-50 hover:text-amber-400 cursor-pointer focus:bg-gray-800 focus:text-amber-400"
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Wyloguj się</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ) : (
              <li className="md:ml-4">
                <Link href="/auth">
                  <div
                    className="block py-3 px-5 text-amber-50 hover:bg-gray-800 md:hover:bg-transparent md:hover:text-amber-400
                    transition-colors duration-200 cursor-pointer flex items-center"
                    onClick={closeMenu}
                  >
                    <LogIn className="h-4 w-4 mr-1" />
                    <span>Zaloguj</span>
                  </div>
                </Link>
              </li>
            )}
            
            {/* Przełącznik języka */}
            <li className="md:ml-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center py-3 px-5 md:px-2 cursor-pointer text-amber-50 hover:text-amber-400 transition-colors duration-200">
                    <Globe className="h-5 w-5 mr-1" />
                    <span className="uppercase">{language}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-900 border border-amber-800/30">
                  <DropdownMenuItem 
                    onClick={() => changeLanguage('pl')}
                    className={`text-amber-50 cursor-pointer focus:bg-gray-800 ${language === 'pl' ? 'text-amber-400 font-medium' : 'hover:text-amber-400'}`}
                  >
                    Polski
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => changeLanguage('en')}
                    className={`text-amber-50 cursor-pointer focus:bg-gray-800 ${language === 'en' ? 'text-amber-400 font-medium' : 'hover:text-amber-400'}`}
                  >
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => changeLanguage('de')}
                    className={`text-amber-50 cursor-pointer focus:bg-gray-800 ${language === 'de' ? 'text-amber-400 font-medium' : 'hover:text-amber-400'}`}
                  >
                    Deutsch
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => changeLanguage('fr')}
                    className={`text-amber-50 cursor-pointer focus:bg-gray-800 ${language === 'fr' ? 'text-amber-400 font-medium' : 'hover:text-amber-400'}`}
                  >
                    Français
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => changeLanguage('es')}
                    className={`text-amber-50 cursor-pointer focus:bg-gray-800 ${language === 'es' ? 'text-amber-400 font-medium' : 'hover:text-amber-400'}`}
                  >
                    Español
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
