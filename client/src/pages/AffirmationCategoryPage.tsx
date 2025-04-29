import { useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { usePremium } from '@/hooks/use-premium';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AFFIRMATION_CATEGORIES, CATEGORIES_LIST } from '../data/affirmations';

export default function AffirmationCategoryPage() {
  const [, setLocation] = useLocation();
  const { isPremium, isLoading } = usePremium();
  const { toast } = useToast();
  const [match, params] = useRoute<{ categoryId: string }>('/affirmations/:categoryId');
  
  const categoryId = params?.categoryId || '';
  const category = categoryId ? AFFIRMATION_CATEGORIES[categoryId] : null;
  const categoryInfo = CATEGORIES_LIST.find(c => c.id === categoryId);
  
  useEffect(() => {
    // Redirect if category not found
    if (!isLoading && categoryId && !category) {
      toast({
        title: "Kategoria nie znaleziona",
        description: "Wybrana kategoria afirmacji nie istnieje.",
        variant: "destructive",
      });
      setLocation('/affirmation-categories');
      return;
    }
    
    // Set page title
    if (category) {
      document.title = `${category.title} - Aurum Affirmations`;
    }
    
    // Redirect non-premium users
    if (!isLoading && !isPremium) {
      toast({
        title: "Brak dostępu do premium",
        description: "Ta strona jest dostępna tylko dla użytkowników premium.",
        variant: "destructive",
      });
      setLocation('/premium');
    }
  }, [isPremium, isLoading, setLocation, toast, category, categoryId]);
  
  if (isLoading || !category) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
        <div className="animate-spin w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mb-6"></div>
        <h2 className="text-2xl font-serif">Ładowanie afirmacji...</h2>
      </div>
    );
  }
  
  if (!isPremium) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-[80vh] pt-12 pb-20 bg-white">
      <div className="container px-4 mx-auto">
        <div className="mb-8">
          <Button 
            variant="ghost"
            onClick={() => setLocation('/affirmation-categories')}
            className="mb-6 pl-1 text-amber-700 hover:text-amber-900 hover:bg-amber-50"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Powrót do kategorii
          </Button>
          
          <div className="flex items-center mb-3">
            {categoryInfo && <span className="text-4xl mr-3">{categoryInfo.icon}</span>}
            <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
              {category.title}
            </h1>
          </div>
          <p className="text-gray-600 max-w-3xl">
            {category.introduction}
          </p>
        </div>
        
        <Separator className="my-8 bg-amber-200" />
        
        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
          {category.affirmations.map((affirmation, index) => (
            <Card key={index} className="overflow-hidden border-amber-100 hover:border-amber-200 transition-colors">
              <CardContent className="p-6 flex items-start">
                <Star className="text-amber-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                <p className="text-lg text-gray-800 leading-relaxed font-medium">{affirmation}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto bg-amber-50 rounded-lg p-6 border border-amber-100">
          <h2 className="text-2xl font-serif font-medium mb-4 text-amber-800">Rytuał</h2>
          <div className="prose max-w-none text-gray-700">
            {category.ritual.split('.').map((sentence, index) => (
              sentence.trim() ? (
                <p key={index} className="mb-2">{sentence.trim() + '.'}</p>
              ) : null
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}