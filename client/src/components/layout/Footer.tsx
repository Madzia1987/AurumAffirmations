import { Link } from 'wouter';
import { Mail, Instagram, Facebook, ChevronRight } from 'lucide-react';

const Footer = ({ className = "" }) => {
  return (
    <footer className={`bg-white text-gray-800 border-t border-gray-200 py-12 px-4 ${className}`}>
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-center mb-8">
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <h3 className="gold-text-gradient font-serif text-2xl mb-5">Aurum Affirmations</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Ekskluzywna aplikacja afirmacji, horoskopów i numerologii dla kobiet, które pragną transformacji i obfitości w każdej sferze życia.
            </p>
            <div className="mt-6 flex space-x-4">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center hover:bg-amber-200 transition-all duration-300 cursor-pointer">
                <Instagram size={16} className="text-amber-700" />
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center hover:bg-amber-200 transition-all duration-300 cursor-pointer">
                <Facebook size={16} className="text-amber-700" />
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center hover:bg-amber-200 transition-all duration-300 cursor-pointer">
                <Mail size={16} className="text-amber-700" />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif text-lg text-amber-600 mb-4">Nawigacja</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <div className="text-gray-600 hover:text-amber-700 transition-colors flex items-center cursor-pointer group">
                    <ChevronRight size={14} className="mr-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                    <span>Home</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/horoscope">
                  <div className="text-gray-600 hover:text-amber-700 transition-colors flex items-center cursor-pointer group">
                    <ChevronRight size={14} className="mr-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                    <span>Horoskop</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/numerology">
                  <div className="text-gray-600 hover:text-amber-700 transition-colors flex items-center cursor-pointer group">
                    <ChevronRight size={14} className="mr-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                    <span>Numerologia</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/premium">
                  <div className="text-gray-600 hover:text-amber-700 transition-colors flex items-center cursor-pointer group">
                    <ChevronRight size={14} className="mr-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                    <span>Premium</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg text-amber-600 mb-4">Kategorie Premium</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/affirmations/self-love">
                  <div className="text-gray-600 hover:text-amber-700 transition-colors flex items-center cursor-pointer group">
                    <ChevronRight size={14} className="mr-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                    <span>Miłość Własna</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/affirmations/self-confidence">
                  <div className="text-gray-600 hover:text-amber-700 transition-colors flex items-center cursor-pointer group">
                    <ChevronRight size={14} className="mr-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                    <span>Pewność Siebie</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/affirmations/abundance">
                  <div className="text-gray-600 hover:text-amber-700 transition-colors flex items-center cursor-pointer group">
                    <ChevronRight size={14} className="mr-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                    <span>Bogactwo i Obfitość</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/affirmations/business-success">
                  <div className="text-gray-600 hover:text-amber-700 transition-colors flex items-center cursor-pointer group">
                    <ChevronRight size={14} className="mr-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                    <span>Sukces w Biznesie</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg text-amber-600 mb-4">Kontakt</h4>
            <ul className="space-y-3">
              <li className="text-gray-600 flex items-center">
                <Mail size={16} className="mr-3 text-amber-600" />
                <span>kontakt@aurumaffirmations.pl</span>
              </li>
              <li className="text-gray-600 flex items-center">
                <Instagram size={16} className="mr-3 text-amber-600" />
                <span>@aurumaffirmations</span>
              </li>
              <li className="text-gray-600 flex items-center">
                <Facebook size={16} className="mr-3 text-amber-600" />
                <span>Aurum Affirmations</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 mt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Aurum Affirmations. Wszelkie prawa zastrzeżone.</p>
          <div className="mt-4 flex justify-center space-x-8">
            <div className="text-gray-500 hover:text-amber-600 transition-colors cursor-pointer">Polityka prywatności</div>
            <div className="text-gray-500 hover:text-amber-600 transition-colors cursor-pointer">Warunki korzystania</div>
            <div className="text-gray-500 hover:text-amber-600 transition-colors cursor-pointer">FAQ</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
