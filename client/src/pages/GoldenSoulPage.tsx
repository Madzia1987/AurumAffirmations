import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { usePremium } from '@/hooks/use-premium';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, Book, Sun, Moon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApi } from '@/hooks/use-api';

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
  const [activeTab, setActiveTab] = useState('morning');
  
  // Fetch all affirmations
  const { data: affirmations, isLoading: isLoadingAffirmations } = useApi<Affirmation[]>({
    url: '/api/affirmations',
    initialData: [],
  });
  
  // Filter affirmations by category
  const morningAffirmations = affirmations?.filter(a => a.category === 'morning') || [];
  const eveningAffirmations = affirmations?.filter(a => a.category === 'evening') || [];
  
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
          
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-3">
            Afirmacje Złotej Duszy
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Ta specjalna kolekcja afirmacji została stworzona, aby pomóc Ci połączyć się ze swoją 
            wewnętrzną mądrością i mocą. Afirmacje są podzielone na poranne i wieczorne, aby 
            wspierać Cię przez cały dzień.
          </p>
        </div>
        
        <Separator className="my-8 bg-amber-200" />
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="morning" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 w-full max-w-md">
                <TabsTrigger value="morning" className="flex items-center">
                  <Sun className="w-4 h-4 mr-2" />
                  <span>Poranne</span>
                </TabsTrigger>
                <TabsTrigger value="evening" className="flex items-center">
                  <Moon className="w-4 h-4 mr-2" />
                  <span>Wieczorne</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="morning" className="space-y-6">
              <div className="bg-gradient-to-r from-amber-50 to-white p-6 rounded-lg shadow-sm border border-amber-100 mb-8">
                <h2 className="text-xl font-serif font-bold mb-4 flex items-center">
                  <Book className="text-amber-600 w-5 h-5 mr-2" />
                  Poranna Kolekcja Afirmacji
                </h2>
                <p className="text-gray-600 italic mb-3">
                  Zacznij swój dzień od tych afirmacji, aby napełnić się pozytywną energią i mocą.
                </p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                {morningAffirmations.map((affirmation) => (
                  <Card key={affirmation.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-6 bg-gradient-to-br from-amber-50/50 to-white">
                      <p className="text-lg leading-relaxed text-gray-800 italic">
                        "{affirmation.text}"
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="evening" className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-50 to-white p-6 rounded-lg shadow-sm border border-indigo-100 mb-8">
                <h2 className="text-xl font-serif font-bold mb-4 flex items-center">
                  <Book className="text-indigo-600 w-5 h-5 mr-2" />
                  Wieczorna Kolekcja Afirmacji
                </h2>
                <p className="text-gray-600 italic mb-3">
                  Zakończ swój dzień tymi afirmacjami, aby zrelaksować umysł i przygotować się na spokojny sen.
                </p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                {eveningAffirmations.map((affirmation) => (
                  <Card key={affirmation.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-6 bg-gradient-to-br from-indigo-50/50 to-white">
                      <p className="text-lg leading-relaxed text-gray-800 italic">
                        "{affirmation.text}"
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}