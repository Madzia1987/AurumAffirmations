import { Link } from 'wouter';
import DailyCard from './DailyCard';
import { Sparkles } from 'lucide-react';
import diamondBgImage from '@assets/file_00000000a1d86243a19cc31ead66b830.png';
import { useLanguage } from '@/hooks/use-language';

const HomeBanner = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative py-20 px-4 md:px-6 lg:px-8 min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gray-900/50 z-10"></div>
      <img 
        src={diamondBgImage} 
        alt="Diamond background" 
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900/90 z-20"></div>
      
      <div className="relative container mx-auto max-w-5xl z-30">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="h-0.5 w-12 bg-amber-500"></div>
            <Sparkles className="mx-4 h-6 w-6 text-amber-400" />
            <div className="h-0.5 w-12 bg-amber-500"></div>
          </div>
          
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 fade-in">
            <span className="block text-white">{t('home.title1')}</span>
            <span className="gold-text-gradient">{t('home.title2')}</span>
          </h1>
          
          <p className="text-amber-50/90 text-lg md:text-xl max-w-2xl mx-auto fade-in leading-relaxed">
            {t('home.subtitle')}
          </p>
        </div>
        
        <DailyCard />
        
        <div className="text-center mt-14">
          <Link href="/premium">
            <div className="inline-block bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 
              text-white font-semibold py-4 px-10 rounded-full shadow-lg shadow-amber-900/30 hover:shadow-amber-900/50 
              transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>{t('home.cta')}</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent"></div>
    </section>
  );
};

export default HomeBanner;
