import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { usePremium } from '@/hooks/use-premium';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, Sunrise, Sunset, Sparkles } from 'lucide-react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  
  // Mock data until we set up the API endpoint
  const rituals: Ritual[] = [
    {
      id: 1,
      title: "Poranny Rytuał Złotej Kobiecości",
      content: "Budząc się, pozwól sobie na moment ciszy. Poczuj, jak twoje ciało obejmuje ciepło pościeli. Weź trzy głębokie oddechy, wyobrażając sobie, jak z każdym wdechem wlewasz do swojego ciała złote światło miłości i obfitości.\n\nPołóż dłoń na sercu i szepnij do siebie: \"Dzień dobry, ukochana. Dzisiaj celebrujemy nasze wspólne podróżowanie. Oczywiście, że wszystko już jest dobrze.\"\n\nWstając z łóżka, pozwól swoim stopom dotknąć ziemi z wdzięcznością. Każdy krok, który dziś wykonasz, jest krokiem w stronę twojego najwyższego dobra.\n\nPrzed lustrem podaruj sobie szczery uśmiech, spotykając swoją duszę w odbiciu. Jesteś doskonała w swojej niepowtarzalności.",
      category: "morning",
      type: "ritual",
      isPremium: true
    },
    {
      id: 2,
      title: "Wieczorny Rytuał Wdzięczności",
      content: "Wieczorem, kiedy dzień dobiega końca, stwórz dla siebie przestrzeń spokoju. Zapal świecę symbolizującą światło twojej duszy.\n\nZamknij oczy i pozwól sobie przypomnieć trzy momenty z dzisiejszego dnia, za które czujesz wdzięczność. Poczuj, jak każde z tych wspomnień wypełnia cię złotym ciepłem.\n\nSzepnij do siebie: \"Dziękuję ci, dniu, za wszystkie dary. Dziękuję ci, ciało, za noszenie mnie przez te doświadczenia. Oczywiście, że jestem bezpieczna w swoim istnieniu.\"\n\nOtul się miłością jak najdelikatniejszym kocem, wiedząc, że nawet we śnie twoja dusza pracuje na rzecz twojego najwyższego dobra.",
      category: "evening",
      type: "ritual",
      isPremium: true
    },
    {
      id: 3,
      title: "Codzienny Rytuał Złotego Blasku",
      content: "Znajdź pięć minut każdego poranka, by napełnić się swoim własnym światłem. Stań przy oknie, pozwalając promykom słońca (lub nawet pochmurnej poświacie) dotknąć twojej skóry.\n\nRozprzestrzeń ramiona jak skrzydła i wyobraź sobie, że z twojego serca wypływa złota energia, owijając się wokół ciebie jak kokon światła. Oczywiście, że jesteś miłością w swojej najczystszej formie.\n\nPowiedz na głos: \"Jestem otwarta na przyjmowanie wszystkich darów, które dzisiaj do mnie płyną. Jestem gotowa dostrzegać cuda w codzienności.\"",
      category: "morning",
      type: "ritual",
      isPremium: true
    },
    {
      id: 4,
      title: "Rytuał Księżycowej Kąpieli",
      content: "Podczas pełni księżyca (choć każda faza księżyca ma swoją moc), przygotuj sobie kąpiel z solą morską i kilkoma kroplami ulubionego olejku.\n\nWchodząc do wody, wyobraź sobie, że zanurzasz się w srebrnym świetle księżyca, które oczyszcza każdą komórkę twojego ciała z napięć i trosk.\n\nSzepnij do wody: \"Zmywam wszystko, co nie jest miłością. Oczywiście, że wszystko już jest dobrze.\"",
      category: "evening",
      type: "ritual",
      isPremium: true
    },
    {
      id: 5,
      title: "Medytacja Złotego Serca",
      content: "Usiądź wygodnie, z plecami naturalnie wyprostowanymi. Zamknij oczy i skieruj uwagę na swój oddech.\n\nWyobraź sobie, że w centrum twojej klatki piersiowej pulsuje złote światło. Z każdym wdechem staje się ono jaśniejsze, z każdym wydechem rozszerza się, wypełniając całe twoje ciało.\n\nPowtarzaj w myślach: \"Jestem bezpieczna w swoim sercu. Jestem domem dla siebie. Jestem ukochana przez samo życie.\"\n\nPozwól temu złotemu światłu wypełnić każdy zakamarek twojego istnienia, przynosząc ukojenie, pewność i spokój. Oczywiście, że jesteś miłością.",
      category: "meditation",
      type: "meditation",
      isPremium: true
    },
    {
      id: 6,
      title: "Medytacja Wizualizacyjna \"Ogród Duszy\"",
      content: "Zamknij oczy i wyobraź sobie, że stoisz przed bramą do magicznego ogrodu – twojego własnego ogrodu duszy.\n\nOtwórz tę bramę i wejdź do środka. Co widzisz? Jakie kolory, zapachy, dźwięki cię otaczają? Czy są tam kwiaty, drzewa, może strumyk?\n\nZnajdź miejsce, które przyciąga cię najbardziej i usiądź tam. Poczuj, jak ziemia pod tobą wspiera cię i karmi swoją energią. Oczywiście, że jesteś bezpieczna w tym ogrodzie swojej duszy.\n\nW tym miejscu możesz zadać pytanie swojemu wewnętrznemu przewodnikowi. Odpowiedź może przyjść jako słowa, obrazy, uczucia. Zaufaj temu, co otrzymujesz.",
      category: "meditation",
      type: "meditation",
      isPremium: true
    }
  ];
  
  // Filter rituals by type
  const morningRituals = rituals.filter(r => r.category === 'morning' && r.type === 'ritual');
  const eveningRituals = rituals.filter(r => r.category === 'evening' && r.type === 'ritual');
  const meditations = rituals.filter(r => r.type === 'meditation');
  
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
                  {morningRituals.map((ritual) => (
                    <Card key={ritual.id} className="overflow-hidden">
                      <CardContent className="p-6">
                        <CardTitle className="text-xl font-serif mb-2">{ritual.title}</CardTitle>
                        <CardDescription className="mb-4">Rytuał poranny</CardDescription>
                        <div className="prose max-w-none">
                          {ritual.content.split('\n\n').map((paragraph, i) => (
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
                  {eveningRituals.map((ritual) => (
                    <Card key={ritual.id} className="overflow-hidden">
                      <CardContent className="p-6">
                        <CardTitle className="text-xl font-serif mb-2">{ritual.title}</CardTitle>
                        <CardDescription className="mb-4">Rytuał wieczorny</CardDescription>
                        <div className="prose max-w-none">
                          {ritual.content.split('\n\n').map((paragraph, i) => (
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
                  {meditations.map((meditation) => (
                    <Card key={meditation.id} className="overflow-hidden">
                      <CardContent className="p-6">
                        <CardTitle className="text-xl font-serif mb-2">{meditation.title}</CardTitle>
                        <CardDescription className="mb-4">Medytacja</CardDescription>
                        <div className="prose max-w-none">
                          {meditation.content.split('\n\n').map((paragraph, i) => (
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