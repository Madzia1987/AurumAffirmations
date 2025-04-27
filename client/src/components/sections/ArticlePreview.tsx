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
    <section className="py-12 px-4 md:px-6 lg:px-8 bg-champagne">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-playfair text-3xl font-bold text-center mb-8">Inspirujący Artykuł</h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div 
              className="h-64 bg-cover bg-center" 
              style={{ backgroundImage: `url('${article.image}')` }}
            >
              <div className="h-full w-full bg-burgundy bg-opacity-30 flex items-center justify-center">
                <h3 className="font-playfair text-white text-2xl md:text-3xl text-center px-4">{article.title}</h3>
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="mr-4"><i className="far fa-calendar-alt mr-1"></i> {article.date}</span>
                <span><i className="far fa-clock mr-1"></i> {article.readTime} min czytania</span>
              </div>
              
              <div className="prose max-w-none">
                <p className="mb-4">{article.excerpt}</p>
                
                <p className="mb-4">{article.content}</p>
                
                <div className="my-6 bg-champagne p-4 border-l-4 border-gold italic">
                  "Kochaj siebie wystarczająco mocno, aby stworzyć życie, które naprawdę kochasz."
                </div>
              </div>
              
              {/* Premium Content */}
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
        )}
      </div>
    </section>
  );
};

export default ArticlePreview;
