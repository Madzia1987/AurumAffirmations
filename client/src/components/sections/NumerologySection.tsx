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
    <section id="numerology" className="py-12 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-playfair text-3xl font-bold text-center mb-8">Numerologia</h2>
        <div className="text-center mb-10">
          <p className="max-w-2xl mx-auto">Odkryj znaczenie liczb w swoim życiu i jak wpływają na Twoją codzienność.</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            {/* Daily Number */}
            <div className="text-center mb-10">
              <h3 className="font-playfair text-xl mb-3">Liczba Dnia</h3>
              
              {isLoading ? (
                <div className="flex justify-center items-center py-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold"></div>
                </div>
              ) : (
                <>
                  <div className="inline-block rounded-full bg-gold w-16 h-16 flex items-center justify-center mb-4">
                    <span className="text-white text-2xl font-bold">{dailyNumber}</span>
                  </div>
                  <p className="max-w-md mx-auto">{dailyMeaning}</p>
                </>
              )}
            </div>
            
            {/* Name Numerology Calculator */}
            <div className="mb-10">
              <h3 className="font-playfair text-xl mb-4 text-center">Odkryj Numerologię Swojego Imienia</h3>
              
              <div className="max-w-md mx-auto">
                <div className="mb-4">
                  <label htmlFor="nameInput" className="block text-sm font-medium text-gray-700 mb-2">Wpisz swoje imię:</label>
                  <input 
                    type="text" 
                    id="nameInput" 
                    className="w-full px-4 py-3 border-2 border-gold-light focus:border-gold focus:ring-0 rounded-md" 
                    placeholder="Np. Anna"
                    value={nameInput}
                    onChange={handleNameInputChange}
                  />
                </div>
                
                <button 
                  className="w-full bg-gold hover:bg-gold-dark text-white font-semibold py-3 px-4 rounded-md transition duration-300"
                  onClick={calculateName}
                  disabled={nameLoading}
                >
                  {nameLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Obliczanie...
                    </span>
                  ) : "Oblicz wartość numerologiczną"}
                </button>
              </div>
              
              {/* Name Results */}
              {nameResults && (
                <div className="mt-6 p-5 border border-gold-light rounded-lg">
                  <div className="text-center mb-4">
                    <h4 className="font-playfair text-lg mb-2">Numerologia imienia: <span className="font-bold">{nameNumber}</span></h4>
                    <p className="text-sm text-gray-500">{nameInput}</p>
                  </div>
                  
                  {/* Free Preview Content */}
                  <div className="mb-6">
                    <h4 className="text-gold font-medium mb-2">Podstawowe znaczenie:</h4>
                    <p>{nameBasicMeaning}</p>
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
              )}
            </div>
            
            {/* Life Path Calculator */}
            <div>
              <h3 className="font-playfair text-xl mb-4 text-center">Oblicz Swoją Ścieżkę Życia</h3>
              
              <div className="max-w-md mx-auto">
                <div className="mb-4">
                  <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-2">Data urodzenia:</label>
                  <input 
                    type="date" 
                    id="birthdate" 
                    className="w-full px-4 py-3 border-2 border-gold-light focus:border-gold focus:ring-0 rounded-md"
                    value={birthdate}
                    onChange={handleBirthdateChange}
                  />
                </div>
                
                <button 
                  className="w-full bg-gold hover:bg-gold-dark text-white font-semibold py-3 px-4 rounded-md transition duration-300"
                  onClick={calculateLifePath}
                  disabled={lifePathLoading}
                >
                  {lifePathLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Obliczanie...
                    </span>
                  ) : "Oblicz ścieżkę życia"}
                </button>
              </div>
              
              {/* Life Path Results */}
              {lifePathResults && (
                <div className="mt-6 p-5 border border-gold-light rounded-lg">
                  <div className="text-center mb-4">
                    <h4 className="font-playfair text-lg mb-2">Twoja ścieżka życia: <span className="font-bold">{lifePathNumber}</span></h4>
                    <p className="text-sm text-gray-500">{birthdate && formatShortDate(new Date(birthdate))}</p>
                  </div>
                  
                  {/* Free Preview Content */}
                  <div className="mb-6">
                    <h4 className="text-gold font-medium mb-2">Podstawowe znaczenie:</h4>
                    <p>{lifePathBasicMeaning}</p>
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
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NumerologySection;
