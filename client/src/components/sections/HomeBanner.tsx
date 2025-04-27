import { Link } from 'wouter';
import DailyCard from './DailyCard';

const HomeBanner = () => {
  return (
    <section 
      className="relative py-12 px-4 md:px-6 lg:px-8 bg-no-repeat bg-cover bg-center" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-white mb-4 fade-in">Twoja Droga do Wewnętrznego Bogactwa</h2>
          <p className="text-cream text-lg md:text-xl max-w-2xl mx-auto fade-in">Odkryj codzienne afirmacje, horoskopy i osobiste analizy numerologiczne.</p>
        </div>
        
        <DailyCard />
        
        <div className="text-center">
          <Link href="/premium">
            <a className="inline-block bg-premium-gradient text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 shine">
              Odblokuj pełny dostęp premium
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
