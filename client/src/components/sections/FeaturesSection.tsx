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
              <div className="h-full w-full bg-emerald-800 bg-opacity-40 flex items-center justify-center">
                <svg className="w-10 h-10 text-amber-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77" fill="url(#paint0_linear)" />
                  <defs>
                    <linearGradient id="paint0_linear" x1="12" y1="2" x2="18" y2="18" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F9E789" />
                      <stop offset="1" stopColor="#D7B740" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-playfair text-xl font-semibold mb-3">Horoskop Dnia</h3>
              <p className="text-gray-600 mb-4">Poznaj codzienne przewidywania astralne dla swojego znaku zodiaku.</p>
              <Link href="/horoscope" className="inline-block text-gold hover:text-burgundy font-semibold transition-colors">
                Sprawdź teraz <i className="fas fa-long-arrow-alt-right ml-1"></i>
              </Link>
            </div>
          </div>
          
          {/* Feature Card: Numerology */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1">
            <div 
              className="h-48 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1531051580877-6c2e343de05c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')" }}
            >
              <div className="h-full w-full bg-navy bg-opacity-40 flex items-center justify-center">
                <svg className="w-10 h-10 text-amber-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.178 8C19.909 8 21.41 6.664 21.41 4.97C21.41 3.276 19.909 2 18.178 2C16.446 2 15 3.276 15 4.97C15 6.664 16.446 8 18.178 8Z" fill="currentColor" />
                  <path d="M5.822 22C7.554 22 9 20.724 9 19.03C9 17.336 7.554 16 5.822 16C4.091 16 2.59 17.336 2.59 19.03C2.59 20.724 4.091 22 5.822 22Z" fill="currentColor" />
                  <path d="M18.178 8C19.909 8 21.41 6.664 21.41 4.97C21.41 3.276 19.909 2 18.178 2C16.446 2 15 3.276 15 4.97C15 6.664 16.446 8 18.178 8Z" stroke="currentColor" strokeWidth="0.5" strokeMiterlimit="10" />
                  <path d="M5.822 22C7.554 22 9 20.724 9 19.03C9 17.336 7.554 16 5.822 16C4.091 16 2.59 17.336 2.59 19.03C2.59 20.724 4.091 22 5.822 22Z" stroke="currentColor" strokeWidth="0.5" strokeMiterlimit="10" />
                  <path d="M15.536 5.82799C14.172 7.16699 12.402 7.99999 10.472 7.99999C8.542 7.99999 6.772 7.16699 5.408 5.82799L19.464 19.584C18.1 20.923 16.33 21.756 14.4 21.756C12.47 21.756 10.7 20.923 9.336 19.584" stroke="url(#infinity_paint)" strokeWidth="1.5" strokeMiterlimit="10" />
                  <defs>
                    <linearGradient id="infinity_paint" x1="5.408" y1="13.792" x2="19.464" y2="13.792" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F9E789" />
                      <stop offset="1" stopColor="#D7B740" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-playfair text-xl font-semibold mb-3">Numerologia</h3>
              <p className="text-gray-600 mb-4">Odkryj znaczenie liczb w swoim życiu i ich wpływ na twoją drogę.</p>
              <Link href="/numerology" className="inline-block text-gold hover:text-burgundy font-semibold transition-colors">
                Poznaj swoją liczbę <i className="fas fa-long-arrow-alt-right ml-1"></i>
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
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L8 6L4 2L2 8L12 22L22 8L20 2L16 6L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 2L8 6L4 2L2 8L12 22" fill="url(#crown_paint)" />
                  <path d="M16.2361 15H7.76389" stroke="white" strokeWidth="0.75" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="crown_paint" x1="2" y1="12" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-playfair text-xl font-semibold mb-3">Treści Premium</h3>
              <p className="text-gray-600 mb-4">Pełne pakiety afirmacji, rytuały i zaawansowane analizy numerologiczne.</p>
              <Link href="/premium" className="inline-block text-gold hover:text-burgundy font-semibold transition-colors">
                Kup dostęp <i className="fas fa-long-arrow-alt-right ml-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
