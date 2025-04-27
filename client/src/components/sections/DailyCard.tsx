import { useState, useEffect } from 'react';
import { formatDate } from '@/lib/utils/dates';
import { getDailyAffirmation } from '@/lib/api';
import { Quote, Sparkle } from 'lucide-react';

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
    <div className="max-w-xl mx-auto relative fade-in z-10 shine">
      {/* Card */}
      <div className="bg-gradient-to-b from-gray-900/90 to-gray-900/95 backdrop-blur-md rounded-2xl 
        overflow-hidden shadow-[0_10px_50px_-12px_rgba(212,175,55,0.3)] border border-amber-900/30">
        
        {/* Card Header */}
        <div className="pt-8 pb-6 px-8 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700"></div>
          
          <div className="flex items-center justify-center mb-2">
            <Sparkle className="text-amber-400 h-5 w-5 mr-2" />
            <h3 className="font-serif gold-text-gradient text-2xl font-semibold text-center tracking-wide">
              Afirmacja Dnia
            </h3>
            <Sparkle className="text-amber-400 h-5 w-5 ml-2" />
          </div>
          
          <div className="text-center text-amber-200/80 text-sm font-medium mb-3">
            {currentDate}
          </div>
        </div>
        
        {/* Card Content */}
        <div className="px-10 pb-8 pt-2 bg-gradient-to-b from-transparent to-gray-900/70">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin h-10 w-10 border-3 border-amber-500 border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="relative">
              <Quote className="absolute -top-5 -left-6 text-amber-700/40 h-8 w-8 transform rotate-180" />
              <p className="text-center text-xl font-serif text-amber-50 leading-relaxed italic">
                "{affirmation}"
              </p>
              <Quote className="absolute -bottom-5 -right-6 text-amber-700/40 h-8 w-8" />
            </div>
          )}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-amber-500/20 blur-sm"></div>
      <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-amber-500/20 blur-sm"></div>
    </div>
  );
};

export default DailyCard;
