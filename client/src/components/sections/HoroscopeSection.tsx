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
    love: '',
    career: '',
    health: ''
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
          love: 'W relacjach miłosnych czeka Cię dzisiaj niespodzianka. Otwórz się na nowe możliwości.',
          career: 'Twoja kariera nabiera tempa. Możliwe nowe propozycje lub awans.',
          health: 'Zadbaj o odpoczynek i zrównoważoną dietę. Energia gwiazd wspiera Twoje zdrowie.'
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
    <section id="horoscope" className="py-12 px-4 md:px-6 lg:px-8 mermaid-holographic">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-playfair text-4xl font-bold text-center mb-8 text-white drop-shadow-md gold-highlight">
          Horoskop Dnia
        </h2>
        <div className="text-center mb-10">
          <p className="max-w-2xl mx-auto text-white/90 font-medium">Odkryj, co gwiazdy przygotowały dla Ciebie dzisiaj.</p>
        </div>
        
        <div className="rounded-lg shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#06a0c2] to-[#064963] opacity-30"></div>
          <div className="absolute inset-0 holographic-scales"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-[#06a0c2]/20 to-transparent"></div>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#06a0c2] via-white to-[#06a0c2]"></div>
          <div className="p-6 md:p-8 relative z-10">
          
            {/* Zodiac Sign Selector */}
            <div className="mb-8 relative z-10">
              <label htmlFor="zodiacSign" className="block text-sm font-medium text-white mb-2">Wybierz swój znak zodiaku:</label>
              <div className="relative">
                <select 
                  id="zodiacSign" 
                  className="block w-full pl-4 pr-10 py-3 text-base rounded-md focus:outline-none focus:ring-[#06a0c2] focus:border-[#06a0c2] shadow-inner bg-[rgba(6,73,99,0.8)] text-white border-2 border-[#06a0c2]/50"
                  value={selectedSign}
                  onChange={handleSignChange}
                  style={{
                    backdropFilter: 'blur(5px)',
                    boxShadow: "0 0 10px rgba(6, 160, 194, 0.3), inset 0 0 5px rgba(255, 255, 255, 0.1)",
                    color: "white"
                  }}
                >
                  {ZODIAC_SIGNS.map(sign => (
                    <option key={sign.id} value={sign.id} style={{
                      backgroundColor: "#064963",
                      color: "white"
                    }}>
                      {sign.name} ({sign.dateRange})
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Horoscope Results */}
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#06a0c2]"></div>
              </div>
            ) : (
              <div id="horoscopeResult" className="rounded-lg shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#06a0c2] to-[#064963] opacity-30"></div>
                <div className="absolute inset-0 holographic-scales"></div>
                <div className="absolute inset-0 bg-sparkles"></div>
                <div className="p-6 relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="mr-4 rounded-full p-3 shadow-lg relative" 
                        style={{
                          background: 'radial-gradient(circle, #06a0c2 0%, #073b5a 100%)',
                          boxShadow: '0 0 25px rgba(6, 160, 194, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.3)',
                          animation: 'pulse 2s infinite alternate'
                        }}>
                      <div className="absolute inset-0 rounded-full" 
                           style={{
                             background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 60%)',
                             mixBlendMode: 'overlay'
                           }} />
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                           style={{
                             filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.7))'
                           }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-playfair text-2xl font-semibold text-white gold-highlight">{horoscope.sign}</h3>
                      <p className="text-sm text-white/80">{horoscope.date}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="rounded-lg p-4 shadow-lg relative overflow-hidden" 
                         style={{ background: 'rgba(6, 90, 140, 0.15)', backdropFilter: 'blur(5px)' }}>
                      <div className="absolute inset-0 opacity-10"
                           style={{ 
                             background: 'radial-gradient(circle at center, rgba(6, 160, 194, 0.8) 0%, rgba(6, 90, 140, 0.2) 70%, transparent 100%)',
                             backgroundSize: '20px 20px',
                             animation: 'shimmer 3s linear infinite'
                           }}></div>
                      <h4 className="font-medium mb-2 text-lg pb-2 relative inline-flex items-center z-10">
                        <span className="text-white font-bold">Ogólna charakterystyka dnia:</span>
                      </h4>
                      <p className="mb-4 text-white/90 relative z-10">{horoscope.general}</p>
                    </div>
                    
                    {/* Free Preview Content */}
                    <div className="rounded-lg p-4 shadow-lg relative overflow-hidden" 
                         style={{ background: 'rgba(6, 90, 140, 0.15)', backdropFilter: 'blur(5px)' }}>
                      <div className="absolute inset-0 opacity-10"
                           style={{ 
                             background: 'radial-gradient(circle at center, rgba(6, 160, 194, 0.8) 0%, rgba(6, 90, 140, 0.2) 70%, transparent 100%)',
                             backgroundSize: '20px 20px',
                             animation: 'shimmer 3s linear infinite'
                           }}></div>
                      <h4 className="font-medium mb-2 text-lg pb-2 relative inline-flex items-center z-10">
                        <span className="text-white font-bold">Miłość:</span>
                      </h4>
                      <p className="text-white/90 relative z-10">{horoscope.love}</p>
                    </div>
                    
                    {/* Premium Content */}
                    <div className="mt-8">
                      <PremiumContent 
                        isPremium={isPremium}
                        premiumContent={{
                          sections: [
                            { 
                              title: 'Kariera i Finanse', 
                              content: horoscope.career || 'Dziś możesz spodziewać się pozytywnych zmian w finansach. Bądź otwarty na nowe możliwości zarobkowe i nie bój się podejmować odważnych decyzji w karierze.' 
                            },
                            { 
                              title: 'Zdrowie i Energia', 
                              content: horoscope.health || 'Twoja energia jest dziś na wysokim poziomie. Wykorzystaj ją na aktywność fizyczną i regenerację umysłu. Zadbaj o odpowiednią ilość snu i nawodnienie.' 
                            },
                            { 
                              title: 'Szczęśliwe aspekty dnia', 
                              content: 'Twoje szczęśliwe liczby: 3, 7, 21\nKolory przynoszące powodzenie: złoty, niebieski\nNajlepsze godziny: 10:00, 15:30, 20:00' 
                            }
                          ]
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Dekoracyjne elementy */}
            <div className="absolute bottom-2 right-2 opacity-20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-[#06a0c2]" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                   style={{
                     filter: 'drop-shadow(0 0 8px rgba(6, 160, 194, 0.7))'
                   }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HoroscopeSection;