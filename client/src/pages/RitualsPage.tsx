import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { usePremium } from '@/hooks/use-premium';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, Sunrise, Sunset, Sparkles } from 'lucide-react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApi } from '@/hooks/use-api';

interface Ritual {
  id: number;
  title: string;
  content: string;
  category: string;
  type: string;
  isPremium: boolean;
}

export default function RitualsPage() {
  const [, setLocation] = useLocation();
  const { isPremium, isLoading } = usePremium();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('ritual');
  
  // Fetch rituals from the API
  const { data: rituals, isLoading: isLoadingRituals } = useApi<Ritual[]>({
    url: '/api/rituals',
    initialData: [],
  });
  
  // Filter rituals by type
  const morningRituals = rituals?.filter((r: Ritual) => r.category === 'morning' && r.type === 'ritual') || [];
  const eveningRituals = rituals?.filter((r: Ritual) => r.category === 'evening' && r.type === 'ritual') || [];
  const meditations = rituals?.filter((r: Ritual) => r.type === 'meditation') || [];
  
  useEffect(() => {
    // Set page title
    document.title = 'Rytuały i Medytacje - Aurum Affirmations';
    
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
        <h2 className="text-2xl font-serif">Ładowanie rytuałów i medytacji...</h2>
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
            Rytuały i Medytacje
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Te wyjątkowe praktyki pomogą Ci głębiej połączyć się ze swoją wewnętrzną mądrością i wprowadzić
            więcej spokoju, harmonii i złotej energii do Twojego codziennego życia.
          </p>
        </div>
        
        <Separator className="my-8 bg-amber-200" />
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="ritual" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 w-full max-w-md">
                <TabsTrigger value="ritual" className="flex items-center">
                  <Sunrise className="w-4 h-4 mr-2" />
                  <span>Rytuały</span>
                </TabsTrigger>
                <TabsTrigger value="meditation" className="flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  <span>Medytacje</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="ritual" className="space-y-10">
              <div>
                <h2 className="text-2xl font-serif font-medium mb-6 flex items-center">
                  <Sunrise className="text-amber-600 w-5 h-5 mr-2" />
                  Poranne Rytuały
                </h2>
                
                <div className="space-y-6">
                  {morningRituals.map((ritual: Ritual) => (
                    <Card key={ritual.id} className="overflow-hidden">
                      <CardContent className="p-6">
                        <CardTitle className="text-xl font-serif mb-2">{ritual.title}</CardTitle>
                        <CardDescription className="mb-4">Rytuał poranny</CardDescription>
                        <div className="prose max-w-none">
                          {ritual.content.split('\n\n').map((paragraph: string, i: number) => (
                            <p key={i} className="mb-4 text-gray-700 leading-relaxed">{paragraph}</p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-serif font-medium mb-6 flex items-center">
                  <Sunset className="text-indigo-600 w-5 h-5 mr-2" />
                  Wieczorne Rytuały
                </h2>
                
                <div className="space-y-6">
                  {eveningRituals.map((ritual: Ritual) => (
                    <Card key={ritual.id} className="overflow-hidden">
                      <CardContent className="p-6">
                        <CardTitle className="text-xl font-serif mb-2">{ritual.title}</CardTitle>
                        <CardDescription className="mb-4">Rytuał wieczorny</CardDescription>
                        <div className="prose max-w-none">
                          {ritual.content.split('\n\n').map((paragraph: string, i: number) => (
                            <p key={i} className="mb-4 text-gray-700 leading-relaxed">{paragraph}</p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="meditation" className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif font-medium mb-6 flex items-center">
                  <Sparkles className="text-amber-600 w-5 h-5 mr-2" />
                  Medytacje Transformacyjne
                </h2>
                
                <div className="space-y-6">
                  {meditations.map((meditation: Ritual) => (
                    <Card key={meditation.id} className="overflow-hidden">
                      <CardContent className="p-6">
                        <CardTitle className="text-xl font-serif mb-2">{meditation.title}</CardTitle>
                        <CardDescription className="mb-4">Medytacja</CardDescription>
                        <div className="prose max-w-none">
                          {meditation.content.split('\n\n').map((paragraph: string, i: number) => (
                            <p key={i} className="mb-4 text-gray-700 leading-relaxed">{paragraph}</p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}