import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ZODIAC_SIGNS } from '@/lib/constants';
import { getHoroscopeBySign } from '@/lib/api';
import { formatDate } from '@/lib/utils/dates';
import PremiumContent from '@/components/PremiumContent';

const HoroscopeSection = ({ isPremium = false }) => {
  const [selectedSign, setSelectedSign] = useState('aries');
  const [horoscope, setHoroscope] = useState({
    sign: 'Baran',
    date: formatDate(new Date()),
    general: '',
    love: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchHoroscope = async () => {
      try {
        setIsLoading(true);
        const data = await getHoroscopeBySign(selectedSign);
        setHoroscope(data);
      } catch (error) {
        console.error('Failed to fetch horoscope:', error);
        setHoroscope({
          sign: findSignName(selectedSign),
          date: formatDate(new Date()),
          general: 'Dzień pełen energii i optymizmu. Gwiazdy sprzyjają odważnym decyzjom i nowym przedsięwzięciom.',
          love: 'W relacjach miłosnych czeka Cię dzisiaj niespodzianka. Otwórz się na nowe możliwości.'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHoroscope();
  }, [selectedSign]);
  
  const findSignName = (signId: string): string => {
    const sign = ZODIAC_SIGNS.find(sign => sign.id === signId);
    return sign ? sign.name : 'Baran';
  };
  
  const handleSignChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSign(event.target.value);
  };
  
  return (
    <section id="horoscope" className="py-12 px-4 md:px-6 lg:px-8 luxury-gold-gradient-vertical">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-playfair text-4xl font-bold text-center mb-8 text-[#3a2f0b] drop-shadow-sm">Horoskop Dnia</h2>
        <div className="text-center mb-10">
          <p className="max-w-2xl mx-auto text-[#3a2f0b] font-medium">Odkryj, co gwiazdy przygotowały dla Ciebie dzisiaj.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 border border-[#d4af37]/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 luxury-gold-gradient-2"></div>
          
          {/* Zodiac Sign Selector */}
          <div className="mb-8 relative z-10">
            <label htmlFor="zodiacSign" className="block text-sm font-medium text-gray-700 mb-2">Wybierz swój znak zodiaku:</label>
            <div className="relative">
              <select 
                id="zodiacSign" 
                className="block w-full pl-4 pr-10 py-3 text-base border-[#d4af37] border-2 rounded-md focus:outline-none focus:ring-[#d4af37] focus:border-[#d4af37] bg-white/90 shadow-inner"
                value={selectedSign}
                onChange={handleSignChange}
              >
                {ZODIAC_SIGNS.map(sign => (
                  <option key={sign.id} value={sign.id}>
                    {sign.name} ({sign.dateRange})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#d4af37]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Horoscope Results */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37]"></div>
            </div>
          ) : (
            <div id="horoscopeResult" className="p-6 border border-[#d4af37]/20 rounded-lg luxury-gold-shine">
              <div className="flex items-center mb-6">
                <div className="mr-4 premium-gold-banner rounded-full p-3 text-white shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-playfair text-2xl font-semibold text-[#3a2f0b]">{horoscope.sign}</h3>
                  <p className="text-sm text-gray-600">{horoscope.date}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="rounded-lg p-4 bg-gradient-to-r from-[#f7f2e2] to-[#f9f6eb] border border-[#d4af37]/10 shadow-sm">
                  <h4 className="font-medium text-[#bb9a30] mb-2 text-lg">Ogólna charakterystyka dnia:</h4>
                  <p className="mb-4 text-gray-800">{horoscope.general}</p>
                </div>
                
                {/* Free Preview Content */}
                <div className="rounded-lg p-4 bg-gradient-to-r from-[#f7f2e2] to-[#f9f6eb] border border-[#d4af37]/10 shadow-sm">
                  <h4 className="font-medium text-[#bb9a30] mb-2 text-lg">Miłość:</h4>
                  <p className="text-gray-800">{horoscope.love}</p>
                </div>
                
                {/* Premium Content */}
                <div className="mt-8">
                  <PremiumContent 
                    isPremium={isPremium}
                    premiumContent={{
                      sections: [
                        { title: 'Kariera i Finanse', content: horoscope.career || 'Szczegółowa analiza kariery i finansów na dziś.' },
                        { title: 'Zdrowie i Energia', content: horoscope.health || 'Porady dotyczące zdrowia i energii na dzisiejszy dzień.' },
                        { title: 'Szczęśliwe aspekty dnia', content: 'Szczęśliwe liczby, kolory i godziny na dzisiaj.' }
                      ]
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Dekoracyjne elementy */}
          <div className="absolute bottom-2 right-2 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HoroscopeSection;
