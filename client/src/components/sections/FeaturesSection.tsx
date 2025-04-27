import { Link } from 'wouter';

const FeaturesSection = () => {
  return (
    <section className="py-12 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-playfair text-3xl font-bold text-center mb-12">Odkryj Swoją Drogę</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Card: Horoscope */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1">
            <div 
              className="h-48 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515942661900-94b3d1972591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')" }}
            >
              <div className="h-full w-full bg-burgundy bg-opacity-40 flex items-center justify-center">
                <i className="fas fa-star text-gold text-4xl"></i>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-playfair text-xl font-semibold mb-3">Horoskop Dnia</h3>
              <p className="text-gray-600 mb-4">Poznaj codzienne przewidywania astralne dla swojego znaku zodiaku.</p>
              <Link href="/horoscope">
                <a className="inline-block text-gold hover:text-burgundy font-semibold transition-colors">
                  Sprawdź teraz <i className="fas fa-long-arrow-alt-right ml-1"></i>
                </a>
              </Link>
            </div>
          </div>
          
          {/* Feature Card: Numerology */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1">
            <div 
              className="h-48 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1531051580877-6c2e343de05c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')" }}
            >
              <div className="h-full w-full bg-burgundy bg-opacity-40 flex items-center justify-center">
                <i className="fas fa-infinity text-gold text-4xl"></i>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-playfair text-xl font-semibold mb-3">Numerologia</h3>
              <p className="text-gray-600 mb-4">Odkryj znaczenie liczb w swoim życiu i ich wpływ na twoją drogę.</p>
              <Link href="/numerology">
                <a className="inline-block text-gold hover:text-burgundy font-semibold transition-colors">
                  Poznaj swoją liczbę <i className="fas fa-long-arrow-alt-right ml-1"></i>
                </a>
              </Link>
            </div>
          </div>
          
          {/* Feature Card: Premium */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1">
            <div 
              className="h-48 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589758438368-0ad531db3366?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')" }}
            >
              <div className="h-full w-full bg-gold bg-opacity-40 flex items-center justify-center">
                <i className="fas fa-crown text-white text-4xl"></i>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-playfair text-xl font-semibold mb-3">Treści Premium</h3>
              <p className="text-gray-600 mb-4">Pełne pakiety afirmacji, rytuały i zaawansowane analizy numerologiczne.</p>
              <Link href="/premium">
                <a className="inline-block text-gold hover:text-burgundy font-semibold transition-colors">
                  Kup dostęp <i className="fas fa-long-arrow-alt-right ml-1"></i>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
