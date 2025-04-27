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
    <section id="horoscope" className="py-12 px-4 md:px-6 lg:px-8 bg-champagne">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-playfair text-3xl font-bold text-center mb-8">Horoskop Dnia</h2>
        <div className="text-center mb-10">
          <p className="max-w-2xl mx-auto">Odkryj, co gwiazdy przygotowały dla Ciebie dzisiaj.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {/* Zodiac Sign Selector */}
          <div className="mb-8">
            <label htmlFor="zodiacSign" className="block text-sm font-medium text-gray-700 mb-2">Wybierz swój znak zodiaku:</label>
            <div className="relative">
              <select 
                id="zodiacSign" 
                className="block w-full pl-3 pr-10 py-3 text-base border-gold border-2 rounded-md focus:outline-none focus:ring-gold focus:border-gold"
                value={selectedSign}
                onChange={handleSignChange}
              >
                {ZODIAC_SIGNS.map(sign => (
                  <option key={sign.id} value={sign.id}>
                    {sign.name} ({sign.dateRange})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gold">
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
          </div>
          
          {/* Horoscope Results */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
            </div>
          ) : (
            <div id="horoscopeResult" className="p-6 border-t border-gray-200">
              <div className="flex items-center mb-4">
                <div className="mr-4 text-gold text-4xl">
                  <i className="fas fa-sun"></i>
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-semibold">{horoscope.sign}</h3>
                  <p className="text-sm text-gray-500">{horoscope.date}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-gold mb-2">Ogólna charakterystyka dnia:</h4>
                <p className="mb-4">{horoscope.general}</p>
                
                {/* Free Preview Content */}
                <div className="mb-6">
                  <h4 className="font-medium text-gold mb-2">Miłość:</h4>
                  <p>{horoscope.love}</p>
                </div>
                
                {/* Premium Content */}
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
          )}
        </div>
      </div>
    </section>
  );
};

export default HoroscopeSection;
