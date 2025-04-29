import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { usePremium } from '@/hooks/use-premium';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CATEGORIES_LIST } from '../data/affirmations';

export default function AffirmationCategoriesPage() {
  const [, setLocation] = useLocation();
  const { isPremium, isLoading } = usePremium();
  const { toast } = useToast();
  
  useEffect(() => {
    // Set page title
    document.title = 'Kategorie Afirmacji - Aurum Affirmations';
    
    // Check localStorage first (for override testing)
    const premiumOverride = localStorage.getItem('premium_override') === 'true';
    
    // Redirect non-premium users
    if (!isLoading && !isPremium && !premiumOverride) {
      toast({
        title: "Brak dostępu do premium",
        description: "Ta strona jest dostępna tylko dla użytkowników premium.",
        variant: "destructive",
      });
      setLocation('/premium');
    }
  }, [isPremium, isLoading, setLocation, toast]);
  
  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-black">
        <div className="animate-spin w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mb-6" style={{filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.5))'}}></div>
        <h2 className="text-2xl font-serif text-gray-200">Ładowanie kategorii afirmacji...</h2>
      </div>
    );
  }
  
  if (!isPremium) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-[80vh] pt-12 pb-20 bg-black">
      <div className="container px-4 mx-auto">
        <div className="mb-8 text-center">
          <Button 
            variant="outline"
            onClick={() => setLocation('/premium-access')}
            className="mb-6 pl-1 border-amber-600 text-amber-400 hover:text-amber-300 hover:bg-gray-900 hover:border-amber-500"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Powrót do Premium
          </Button>
          
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 text-transparent bg-clip-text">
            Ekskluzywne Kategorie Afirmacji
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Wybierz kategorię afirmacji, która najbardziej rezonuje z Twoją duszą. 
            Każda kategoria zawiera starannie dobrane, luksusowe afirmacje oraz elegancki rytuał, 
            który pomoże Ci głębiej zintegrować te transformujące przekonania.
          </p>
        </div>
        
        <Separator className="my-8 bg-gradient-to-r from-gray-800 via-amber-500 to-gray-800" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_LIST.map((category) => (
            <Card 
              key={category.id} 
              className="overflow-hidden border border-gray-800 hover:border-amber-600 hover:shadow-lg transition-all cursor-pointer bg-gray-900"
              onClick={() => setLocation(`/affirmations/${category.id}`)}
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <span className={`text-3xl mr-3 ${category.iconClass} font-serif`} style={{textShadow: '0 0 5px rgba(251, 191, 36, 0.5)'}}>{category.icon}</span>
                  <h2 className="text-xl font-serif font-medium text-white">{category.title}</h2>
                </div>
                <div className="mt-auto pt-4 flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-amber-800 text-amber-400 hover:text-amber-300 hover:bg-gray-800 hover:border-amber-600"
                  >
                    <Star className="h-4 w-4 mr-1 text-amber-500" />
                    <span className="text-xs">Zobacz</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}