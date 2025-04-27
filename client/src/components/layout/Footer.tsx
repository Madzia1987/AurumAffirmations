import { Link } from 'wouter';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-playfair text-xl mb-4">Aurum Affirmations</h3>
            <p className="text-gray-400 text-sm">Ekskluzywna aplikacja afirmacji, horoskopów i numerologii dla kobiet, które pragną transformacji i obfitości.</p>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg mb-4">Nawigacja</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-400 hover:text-gold transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/horoscope">
                  <a className="text-gray-400 hover:text-gold transition-colors">Horoskop</a>
                </Link>
              </li>
              <li>
                <Link href="/numerology">
                  <a className="text-gray-400 hover:text-gold transition-colors">Numerologia</a>
                </Link>
              </li>
              <li>
                <Link href="/premium">
                  <a className="text-gray-400 hover:text-gold transition-colors">Premium</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg mb-4">Kategorie Premium</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-gold transition-colors">Miłość Własna</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold transition-colors">Pewność Siebie</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold transition-colors">Bogactwo i Obfitość</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold transition-colors">Sukces w Biznesie</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg mb-4">Kontakt</h4>
            <ul className="space-y-2">
              <li className="text-gray-400"><i className="far fa-envelope mr-2 text-gold"></i> kontakt@aurumaffirmations.pl</li>
              <li className="text-gray-400"><i className="fab fa-instagram mr-2 text-gold"></i> @aurumaffirmations</li>
              <li className="text-gray-400"><i className="fab fa-facebook mr-2 text-gold"></i> Aurum Affirmations</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Aurum Affirmations. Wszelkie prawa zastrzeżone.</p>
          <div className="mt-2">
            <a href="#" className="text-gray-400 hover:text-gold transition-colors mr-4">Polityka prywatności</a>
            <a href="#" className="text-gray-400 hover:text-gold transition-colors mr-4">Warunki korzystania</a>
            <a href="#" className="text-gray-400 hover:text-gold transition-colors">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
