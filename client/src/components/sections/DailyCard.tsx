import { useState, useEffect } from 'react';
import { formatDate } from '@/lib/utils/dates';
import { getDailyAffirmation } from '@/lib/api';

const DailyCard = () => {
  const [affirmation, setAffirmation] = useState("");
  const [currentDate, setCurrentDate] = useState(formatDate(new Date()));
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchAffirmation = async () => {
      try {
        setIsLoading(true);
        const data = await getDailyAffirmation();
        setAffirmation(data.text);
      } catch (error) {
        console.error('Failed to fetch daily affirmation:', error);
        setAffirmation("Twoja droga do bogactwa zaczyna się dziś, od twoich myśli i przekonań o pieniądzach.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAffirmation();
  }, []);
  
  return (
    <div className="max-w-md mx-auto bg-white bg-opacity-90 rounded-lg shadow-xl p-6 mb-8 fade-in">
      <h3 className="font-playfair text-gold text-2xl font-semibold mb-3 text-center">Afirmacja Dnia</h3>
      <div className="flex justify-center mb-4">
        <div className="w-24 h-0.5 bg-gold"></div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold"></div>
        </div>
      ) : (
        <p className="text-center text-lg italic mb-6">
          "{affirmation}"
        </p>
      )}
      
      <div className="text-center text-gold-dark text-sm">
        <span>{currentDate}</span>
      </div>
    </div>
  );
};

export default DailyCard;
