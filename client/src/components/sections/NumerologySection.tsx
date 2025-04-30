import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { 
  getDailyNumerology, 
  calculateNameNumerology, 
  calculateLifePathNumerology 
} from '@/lib/api';
import { formatShortDate } from '@/lib/utils/dates';
import PremiumContent from '@/components/PremiumContent';

const NumerologySection = ({ isPremium = false }) => {
  const [dailyNumber, setDailyNumber] = useState<number>(0);
  const [dailyMeaning, setDailyMeaning] = useState<string>('');
  const [nameInput, setNameInput] = useState<string>('');
  const [nameResults, setNameResults] = useState<boolean>(false);
  const [nameNumber, setNameNumber] = useState<number>(0);
  const [nameBasicMeaning, setNameBasicMeaning] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');
  const [lifePathResults, setLifePathResults] = useState<boolean>(false);
  const [lifePathNumber, setLifePathNumber] = useState<number>(0);
  const [lifePathBasicMeaning, setLifePathBasicMeaning] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nameLoading, setNameLoading] = useState<boolean>(false);
  const [lifePathLoading, setLifePathLoading] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchDailyNumerology = async () => {
      try {
        setIsLoading(true);
        const data = await getDailyNumerology();
        setDailyNumber(data.number);
        setDailyMeaning(data.meaning);
      } catch (error) {
        console.error('Failed to fetch daily numerology:', error);
        setDailyNumber(7);
        setDailyMeaning('Dzień sprzyja refleksji i wewnętrznym poszukiwaniom. To dobry czas na medytację i planowanie.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDailyNumerology();
  }, []);
  
  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };
  
  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthdate(e.target.value);
  };
  
  const calculateName = async () => {
    if (!nameInput.trim()) {
      alert('Proszę wpisać imię');
      return;
    }
    
    try {
      setNameLoading(true);
      const data = await calculateNameNumerology(nameInput);
      setNameNumber(data.number);
      setNameBasicMeaning(data.meaning);
      setNameResults(true);
    } catch (error) {
      console.error('Failed to calculate name numerology:', error);
      alert('Wystąpił błąd podczas obliczania. Spróbuj ponownie.');
    } finally {
      setNameLoading(false);
    }
  };
  
  const calculateLifePath = async () => {
    if (!birthdate) {
      alert('Proszę wybrać datę urodzenia');
      return;
    }
    
    try {
      setLifePathLoading(true);
      const data = await calculateLifePathNumerology(birthdate);
      setLifePathNumber(data.number);
      setLifePathBasicMeaning(data.meaning);
      setLifePathResults(true);
    } catch (error) {
      console.error('Failed to calculate life path numerology:', error);
      alert('Wystąpił błąd podczas obliczania. Spróbuj ponownie.');
    } finally {
      setLifePathLoading(false);
    }
  };
  
  return (
    <section id="numerology" className="py-12 px-4 md:px-6 lg:px-8 mermaid-holographic">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-playfair text-4xl font-bold text-center mb-8 text-white drop-shadow-md">Numerologia</h2>
        <div className="text-center mb-10">
          <p className="max-w-2xl mx-auto text-white/90 font-medium">Odkryj znaczenie liczb w swoim życiu i jak wpływają na Twoją codzienność.</p>
        </div>

        <div className="bg-[rgba(6,90,140,0.15)] backdrop-blur-sm rounded-lg shadow-xl overflow-hidden border border-[rgba(6,160,194,0.3)] relative">
          <div className="absolute top-0 left-0 right-0 h-1 luxury-gold-gradient-1"></div>
          <div className="p-6 md:p-8">
            {/* Daily Number */}
            <div className="text-center mb-12 relative z-10">
              <h3 className="font-playfair text-2xl mb-4 text-white gold-highlight">Liczba Dnia</h3>
              
              {isLoading ? (
                <div className="flex justify-center items-center py-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#06a0c2]"></div>
                </div>
              ) : (
                <>
                  <div className="inline-block rounded-full w-20 h-20 flex items-center justify-center mb-5 shadow-lg relative" 
                       style={{
                         background: 'radial-gradient(circle, #06a0c2 0%, #073b5a 100%)',
                         boxShadow: '0 0 25px rgba(6, 160, 194, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.3)',
                         animation: 'pulse 2s infinite alternate'
                       }}>
                    <div className="absolute inset-0 rounded-full holographic-scales"></div>
                    <span className="text-white text-3xl font-bold relative z-10">{dailyNumber}</span>
                  </div>
                  <p className="max-w-md mx-auto text-white/90 leading-relaxed">{dailyMeaning}</p>
                </>
              )}
            </div>
            
            {/* Name Numerology Calculator */}
            <div className="mb-12 rounded-lg shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#064963] to-[#06a0c2] opacity-70"></div>
              <div className="absolute inset-0 holographic-scales"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#06a0c2]/20 to-transparent"></div>
              <div className="p-6 relative z-10">
                <h3 className="font-playfair text-2xl mb-6 text-center text-white gold-highlight">Odkryj Numerologię Swojego Imienia</h3>
                
                <div className="max-w-md mx-auto">
                  <div className="mb-4">
                    <label htmlFor="nameInput" className="block text-sm font-medium text-white mb-2">Wpisz swoje imię:</label>
                    <input 
                      type="text" 
                      id="nameInput" 
                      className="w-full px-4 py-3 border-2 border-[#06a0c2] focus:border-[#06a0c2] focus:ring-[#06a0c2] rounded-md shadow-inner bg-white/10 text-white placeholder-white/50" 
                      placeholder="Np. Anna"
                      value={nameInput}
                      onChange={handleNameInputChange}
                      style={{
                        backdropFilter: 'blur(5px)'
                      }}
                    />
                  </div>
                  
                  <button 
                    className="w-full py-3 px-4 rounded-md font-semibold relative overflow-hidden luxury-button"
                    onClick={calculateName}
                    disabled={nameLoading}
                    style={{
                      background: 'linear-gradient(135deg, #06a0c2 0%, #064963 50%, #06a0c2 100%)',
                      backgroundSize: '200% 100%',
                      color: 'white',
                      boxShadow: '0 0 20px rgba(6, 160, 194, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      animation: 'gold-shimmer 3s ease infinite'
                    }}
                  >
                    {nameLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Obliczanie...
                      </span>
                    ) : (
                      <span className="relative">
                        <span className="relative z-10">Oblicz wartość numerologiczną</span>
                        <span className="absolute inset-0 opacity-40 gold-shine-overlay"></span>
                      </span>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Name Results */}
              {nameResults && (
                <div className="mt-8 rounded-lg shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#06a0c2] to-[#064963] opacity-30"></div>
                  <div className="absolute inset-0 holographic-scales"></div>
                  <div className="absolute inset-0 bg-sparkles"></div>
                  <div className="p-6 relative z-10">
                    <div className="text-center mb-5">
                      <div className="inline-block rounded-full w-16 h-16 flex items-center justify-center mb-3 shadow-lg relative" 
                           style={{
                             background: 'radial-gradient(circle, #06a0c2 0%, #073b5a 100%)',
                             boxShadow: '0 0 25px rgba(6, 160, 194, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.3)'
                           }}>
                        <span className="text-white font-bold text-2xl relative z-10">{nameNumber}</span>
                      </div>
                      <h4 className="font-playfair text-xl mb-1 text-white gold-highlight">Numerologia imienia</h4>
                      <p className="text-sm text-white/70 italic">{nameInput}</p>
                    </div>
                    
                    {/* Free Preview Content */}
                    <div className="mb-6 rounded-lg p-4 shadow-lg relative overflow-hidden" 
                        style={{ background: 'rgba(6, 90, 140, 0.15)', backdropFilter: 'blur(5px)' }}>
                      <div className="absolute inset-0 opacity-10"
                           style={{ 
                             background: 'radial-gradient(circle at center, rgba(6, 160, 194, 0.8) 0%, rgba(6, 90, 140, 0.2) 70%, transparent 100%)',
                             backgroundSize: '20px 20px',
                             animation: 'shimmer 3s linear infinite'
                           }}></div>
                      <h4 className="text-white font-bold mb-2 text-lg relative z-10">Podstawowe znaczenie:</h4>
                      <p className="text-white/90 relative z-10">{nameBasicMeaning}</p>
                    </div>
                    
                    {/* Premium Content */}
                    <PremiumContent 
                      isPremium={isPremium}
                      premiumContent={{
                        sections: [
                          { title: 'Pełna analiza numerologiczna', content: 'Szczegółowa analiza znaczenia Twojej liczby w różnych aspektach życia: osobowość, kariera, związki, finanse, rozwój duchowy.' }
                        ]
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Life Path Calculator */}
            <div className="rounded-lg shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#064963] to-[#06a0c2] opacity-70"></div>
              <div className="absolute inset-0 holographic-scales"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#06a0c2]/20 to-transparent"></div>
              <div className="p-6 relative z-10">
                <h3 className="font-playfair text-2xl mb-6 text-center text-white gold-highlight">Oblicz Swoją Ścieżkę Życia</h3>
                
                <div className="max-w-md mx-auto">
                  <div className="mb-4">
                    <label htmlFor="birthdate" className="block text-sm font-medium text-white mb-2">Data urodzenia:</label>
                    <input 
                      type="date" 
                      id="birthdate" 
                      className="w-full px-4 py-3 border-2 border-[#06a0c2] focus:border-[#06a0c2] focus:ring-[#06a0c2] rounded-md shadow-inner bg-white/10 text-white" 
                      value={birthdate}
                      onChange={handleBirthdateChange}
                      style={{
                        backdropFilter: 'blur(5px)'
                      }}
                    />
                  </div>
                  
                  <button 
                    className="w-full py-3 px-4 rounded-md font-semibold relative overflow-hidden luxury-button"
                    onClick={calculateLifePath}
                    disabled={lifePathLoading}
                    style={{
                      background: 'linear-gradient(135deg, #06a0c2 0%, #064963 50%, #06a0c2 100%)',
                      backgroundSize: '200% 100%',
                      color: 'white',
                      boxShadow: '0 0 20px rgba(6, 160, 194, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      animation: 'gold-shimmer 3s ease infinite'
                    }}
                  >
                    {lifePathLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Obliczanie...
                      </span>
                    ) : (
                      <span className="relative">
                        <span className="relative z-10">Oblicz ścieżkę życia</span>
                        <span className="absolute inset-0 opacity-40 gold-shine-overlay"></span>
                      </span>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Life Path Results */}
              {lifePathResults && (
                <div className="mt-8 rounded-lg shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#06a0c2] to-[#064963] opacity-30"></div>
                  <div className="absolute inset-0 holographic-scales"></div>
                  <div className="absolute inset-0 bg-sparkles"></div>
                  <div className="p-6 relative z-10">
                    <div className="text-center mb-5">
                      <div className="inline-block rounded-full w-16 h-16 flex items-center justify-center mb-3 shadow-lg relative" 
                           style={{
                             background: 'radial-gradient(circle, #06a0c2 0%, #073b5a 100%)',
                             boxShadow: '0 0 25px rgba(6, 160, 194, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.3)'
                           }}>
                        <span className="text-white font-bold text-2xl relative z-10">{lifePathNumber}</span>
                      </div>
                      <h4 className="font-playfair text-xl mb-1 text-white gold-highlight">Twoja ścieżka życia</h4>
                      <p className="text-sm text-white/70 italic">{birthdate && formatShortDate(new Date(birthdate))}</p>
                    </div>
                    
                    {/* Free Preview Content */}
                    <div className="mb-6 rounded-lg p-4 shadow-lg relative overflow-hidden" 
                        style={{ background: 'rgba(6, 90, 140, 0.15)', backdropFilter: 'blur(5px)' }}>
                      <div className="absolute inset-0 opacity-10"
                           style={{ 
                             background: 'radial-gradient(circle at center, rgba(6, 160, 194, 0.8) 0%, rgba(6, 90, 140, 0.2) 70%, transparent 100%)',
                             backgroundSize: '20px 20px',
                             animation: 'shimmer 3s linear infinite'
                           }}></div>
                      <h4 className="text-white font-bold mb-2 text-lg relative z-10">Podstawowe znaczenie:</h4>
                      <p className="text-white/90 relative z-10">{lifePathBasicMeaning}</p>
                    </div>
                    
                    {/* Premium Content */}
                    <PremiumContent 
                      isPremium={isPremium}
                      premiumContent={{
                        sections: [
                          { title: 'Pełna analiza ścieżki życia', content: 'Szczegółowa interpretacja Twojej ścieżki życia, lekcje życiowe, wyzwania, talenty i rekomendacje dotyczące rozwoju osobistego.' }
                        ]
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Dekoracyjne elementy */}
            <div className="absolute bottom-3 right-3 opacity-20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-[#06a0c2]" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                   style={{
                     filter: 'drop-shadow(0 0 8px rgba(6, 160, 194, 0.7))'
                   }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NumerologySection;
