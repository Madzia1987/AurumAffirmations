import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { usePremium } from '@/hooks/use-premium';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CATEGORIES_LIST } from '../../public/data/affirmations';

export default function AffirmationCategoriesPage() {
  const [, setLocation] = useLocation();
  const { isPremium, isLoading } = usePremium();
  const { toast } = useToast();
  
  useEffect(() => {
    // Set page title
    document.title = 'Kategorie Afirmacji - Aurum Affirmations';
    
    // Redirect non-premium users
    if (!isLoading && !isPremium) {
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
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
        <div className="animate-spin w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mb-6"></div>
        <h2 className="text-2xl font-serif">Ładowanie kategorii afirmacji...</h2>
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
            onClick={() => setLocation('/premium-access')}
            className="mb-6 pl-1 text-amber-700 hover:text-amber-900 hover:bg-amber-50"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Powrót do Premium
          </Button>
          
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-3">
            Kategorie Afirmacji
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Wybierz kategorię afirmacji, która najbardziej odpowiada Twoim potrzebom. 
            Każda kategoria zawiera starannie dobrane afirmacje oraz praktyczny rytuał, 
            który pomoże Ci głębiej zintegrować te pozytywne przekonania.
          </p>
        </div>
        
        <Separator className="my-8 bg-amber-200" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_LIST.map((category) => (
            <Card 
              key={category.id} 
              className="overflow-hidden border-amber-100 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer"
              onClick={() => setLocation(`/affirmations/${category.id}`)}
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{category.icon}</span>
                  <h2 className="text-xl font-serif font-medium">{category.title}</h2>
                </div>
                <div className="mt-auto pt-4 flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                  >
                    <Star className="h-4 w-4 mr-1" />
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