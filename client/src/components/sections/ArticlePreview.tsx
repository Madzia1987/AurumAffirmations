import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { getArticles } from '@/lib/api';
import PremiumContent from '@/components/PremiumContent';

const ArticlePreview = ({ isPremium = false }) => {
  const [article, setArticle] = useState({
    id: 0,
    title: '',
    excerpt: '',
    content: '',
    image: '',
    category: '',
    date: '',
    readTime: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const articles = await getArticles();
        if (articles.length > 0) {
          setArticle(articles[0]);
        }
      } catch (error) {
        console.error('Failed to fetch article:', error);
        setArticle({
          id: 1,
          title: 'Jak rozwijać miłość własną i przyciągać obfitość',
          excerpt: 'Odkryj jak pokochać siebie i otworzyć się na obfitość we wszystkich dziedzinach życia.',
          content: 'Miłość własna to fundament, na którym budujemy wszystkie pozostałe aspekty naszego życia. Kiedy naprawdę kochamy i akceptujemy siebie, otwieramy się na przypływ obfitości i dobrobytu we wszystkich dziedzinach.',
          image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          category: 'self-love',
          date: '28 Października 2023',
          readTime: 5
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticle();
  }, []);
  
  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 relative overflow-hidden mermaid-holographic premium-gold">
      <div className="absolute inset-0 holographic-scales opacity-30"></div>
      <div className="absolute inset-0 bg-sparkles"></div>
      <div className="container mx-auto max-w-4xl relative z-10">
        <h2 className="font-playfair text-3xl font-bold text-center mb-8 text-white gold-highlight">Inspirujący Artykuł</h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37]"></div>
          </div>
        ) : (
          <div className="rounded-lg shadow-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-black/80"></div>
            <div 
              className="h-64 bg-cover bg-center relative z-10" 
              style={{ backgroundImage: `url('${article.image}')` }}
            >
              <div className="h-full w-full bg-black/50 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/10 to-[#d4af37]/5"></div>
                <h3 className="font-playfair text-white text-2xl md:text-3xl text-center px-4 relative z-10 gold-highlight">{article.title}</h3>
              </div>
            </div>
            
            <div className="p-6 md:p-8 relative z-10">
              <div className="flex items-center text-sm text-[#d4af37] mb-4">
                <span className="mr-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {article.date}
                </span>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {article.readTime} min czytania
                </span>
              </div>
              
              <div className="prose max-w-none text-white/90">
                <p className="mb-4">{article.excerpt}</p>
                
                <p className="mb-4">{article.content}</p>
                
                <div className="my-6 relative overflow-hidden rounded-md p-6">
                  <div className="absolute inset-0 holographic-scales opacity-30"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 to-[#d4af37]/5"></div>
                  <div className="relative z-10 border-l-4 border-[#d4af37] pl-4 italic text-[#d4af37] gold-highlight">
                    "Kochaj siebie wystarczająco mocno, aby stworzyć życie, które naprawdę kochasz."
                  </div>
                </div>
              </div>
              
              {/* Premium Content */}
              <div className="mt-8 relative z-10">
                <PremiumContent
                  isPremium={isPremium}
                  premiumContent={{
                    title: 'Pełny artykuł dostępny w wersji premium:',
                    bulletPoints: [
                      '5 potężnych ćwiczeń rozwijających miłość własną',
                      'Medytacja przyciągająca obfitość (audio)',
                      'Rytuał afirmacji bogactwa na każdy dzień',
                      'Analiza blokad podświadomych'
                    ]
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticlePreview;
