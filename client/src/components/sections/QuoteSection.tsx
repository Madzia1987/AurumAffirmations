import { useState, useEffect } from 'react';
import { getDailyQuote } from '@/lib/api';

const QuoteSection = () => {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setIsLoading(true);
        const data = await getDailyQuote();
        setQuote(data);
      } catch (error) {
        console.error('Failed to fetch daily quote:', error);
        setQuote({
          text: "Bogactwo zaczyna się od bogactwa umysłu. Każda myśl tworzy twoją przyszłą rzeczywistość.",
          author: "Louise Hay"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchQuote();
  }, []);
  
  return (
    <section className="py-12 px-4 bg-champagne">
      <div className="container mx-auto max-w-4xl text-center">
        <i className="fas fa-quote-left text-gold text-4xl mb-4 opacity-50"></i>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold"></div>
          </div>
        ) : (
          <>
            <blockquote className="font-playfair text-xl md:text-2xl italic mb-6">
              "{quote.text}"
            </blockquote>
            <div className="font-lora text-gold text-sm">
              — {quote.author}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default QuoteSection;
