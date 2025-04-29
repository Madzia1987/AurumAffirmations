import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { usePremium } from '@/hooks/use-premium';
import { useApi } from '@/hooks/use-api';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, Star, Crown, Heart, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { CATEGORIES_LIST } from '../data/affirmations';

interface Affirmation {
  id: number;
  text: string;
  category: string;
  isPremium: boolean;
}

export default function GoldenSoulPage() {
  const [, setLocation] = useLocation();
  const { isPremium, isLoading } = usePremium();
  const { toast } = useToast();
  
  // Fetch affirmations from the API with golden-soul category
  const { data: affirmations, isLoading: isLoadingAffirmations } = useApi<Affirmation[]>({
    url: '/api/affirmations?category=golden-soul&force_premium=true',
    initialData: [],
  });
  
  useEffect(() => {
    // Set page title
    document.title = 'Afirmacje Złotej Duszy - Aurum Affirmations';
    
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
  
  if (isLoading || isLoadingAffirmations) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
        <div className="animate-spin w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mb-6"></div>
        <h2 className="text-2xl font-serif">Ładowanie afirmacji złotej duszy...</h2>
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
          
          <div className="flex items-center mb-3">
            <Crown className="text-amber-500 w-6 h-6 mr-2" />
            <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
              Afirmacje Złotej Duszy
            </h1>
          </div>
          <p className="text-gray-600 max-w-3xl">
            Poniższe afirmacje zostały stworzone by pomóc Ci połączyć się z Twoją wewnętrzną złotą 
            energią i przywołać do Twojego życia dostatek, obfitość i spełnienie. 
            Czytaj je codziennie rano i wieczorem, pozwalając by ich energia przepłynęła przez Twoje myśli i serce.
          </p>
        </div>
        
        <Separator className="my-8 bg-amber-200" />
        
        {/* Polecane Kategorie Afirmacji */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif font-bold mb-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 text-transparent bg-clip-text">Polecane Kategorie Afirmacji</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Odkryj nasze specjalne kolekcje afirmacji dostosowane do różnych obszarów Twojego życia. 
              Każda kategoria zawiera starannie dobrane afirmacje oraz praktyczny rytuał transformacyjny.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CATEGORIES_LIST.slice(0, 3).map((category) => (
              <Card 
                key={category.id}
                className="overflow-hidden border-gray-800 hover:border-amber-600 hover:shadow-lg transition-all cursor-pointer bg-gray-900"
                onClick={() => setLocation(`/affirmations/${category.id}`)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <span 
                      className={`text-3xl mr-3 ${category.iconClass} font-serif`} 
                      style={{textShadow: '0 0 8px rgba(251, 191, 36, 0.7)'}}
                    >
                      {category.icon}
                    </span>
                    <CardTitle className="font-serif text-white">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardFooter className="pt-0">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-amber-800 text-amber-400 hover:text-amber-300 hover:bg-gray-800 hover:border-amber-600 pl-1"
                  >
                    <span>Zobacz afirmacje</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            <Button 
              variant="outline"
              className="border-amber-600 text-amber-400 hover:text-amber-300 hover:bg-gray-900 hover:border-amber-500"
              onClick={() => setLocation('/affirmation-categories')}
            >
              Zobacz wszystkie kategorie
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Afirmacje z API */}
        <div className="mb-10">
          <h2 className="text-2xl font-serif font-bold mb-6 text-center bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 text-transparent bg-clip-text">Dzisiejsze Afirmacje Złotej Duszy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {affirmations && affirmations.length > 0 ? affirmations.map((affirmation: Affirmation) => (
              <Card key={affirmation.id} className="overflow-hidden border-gray-800 hover:border-amber-600 transition-colors bg-gray-900">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start mb-4">
                    <Star className="text-amber-500 w-5 h-5 mt-1 mr-2 flex-shrink-0" style={{filter: 'drop-shadow(0 0 3px rgba(251, 191, 36, 0.5))'}} />
                    <p className="text-lg text-gray-100 leading-relaxed font-medium">{affirmation.text}</p>
                  </div>
                  <div className="mt-auto pt-4 flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-amber-800 text-amber-400 hover:text-amber-300 hover:bg-gray-800 hover:border-amber-600"
                    >
                      <Heart className="h-4 w-4 mr-1 text-amber-500" />
                      <span className="text-xs">Zapisz</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-400">Trwa ładowanie afirmacji Złotej Duszy...</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 italic mb-6">
            "Z każdym oddechem, przyjmuję złote światło mojej duszy. Oczywiście, że wszystko już jest dobrze."
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="outline" 
              className="border-amber-200 text-amber-700 hover:border-amber-300 hover:bg-amber-50"
              onClick={() => setLocation('/rituals')}
            >
              Zobacz również Rytuały i Medytacje
            </Button>
            <Button 
              variant="default" 
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              onClick={() => setLocation('/affirmation-categories')}
            >
              Odkryj Kategorie Afirmacji Premium
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}