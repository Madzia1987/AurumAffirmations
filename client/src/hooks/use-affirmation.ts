import { useState, useEffect } from 'react';
import { getDailyAffirmation, getDailyQuote } from '@/lib/api';
import { formatDate } from '@/lib/utils/dates';

export const useAffirmation = () => {
  const [affirmation, setAffirmation] = useState('');
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentDate] = useState(formatDate(new Date()));
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch daily affirmation
        const affirmationData = await getDailyAffirmation();
        setAffirmation(affirmationData.text);
        
        // Fetch daily quote
        const quoteData = await getDailyQuote();
        setQuote(quoteData);
        
      } catch (err) {
        console.error('Error fetching affirmation or quote:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
        
        // Set fallback values
        setAffirmation('Jestem magnesem na bogactwo i obfitość. Przyciągam do siebie wszystko, czego potrzebuję i pragnę.');
        setQuote({
          text: 'Bogactwo zaczyna się od bogactwa umysłu. Każda myśl tworzy twoją przyszłą rzeczywistość.',
          author: 'Louise Hay'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return { affirmation, quote, currentDate, isLoading, error };
};
