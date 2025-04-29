import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { usePremium } from '@/hooks/use-premium';
import PremiumDashboard from '@/components/premium/PremiumDashboard';
import { Sparkles, Crown, BookOpen, Star, Calendar, Hourglass, ArrowRight, Moon, Gem, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';

export default function PremiumAccessPage() {
  const [, setLocation] = useLocation();
  const { isPremium, subscription, isLoading } = usePremium();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  useEffect(() => {
    // Set page title
    document.title = 'Premium Access - Aurum Affirmations';
    
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
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-white">
        <div className="animate-spin w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mb-6" style={{filter: 'drop-shadow(0 0 3px rgba(251, 191, 36, 0.3))'}}></div>
        <h2 className="text-2xl font-serif text-gray-700">Sprawdzanie uprawnień...</h2>
      </div>
    );
  }
  
  if (!isPremium) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-white to-amber-50/50">
      {/* Header with welcome message */}
      <div className="bg-gradient-to-b from-amber-50 to-transparent">
        <div className="container mx-auto py-20 px-4 text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <Crown className="h-7 w-7 text-amber-600 mr-3" />
            <span className="text-lg text-amber-800 font-medium">Premium Member</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tight">
            Witaj w Ekskluzywnym <span className="gold-text-gradient">Świecie Premium</span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Gratulacje! Masz teraz dostęp do wszystkich premium funkcji i treści. 
            Odkryj swoje złote afirmacje, horoskopy i analizy numerologiczne.
          </p>
          
          {subscription && (
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-sm text-gray-700">
              <div className="flex items-center py-2 px-4 bg-amber-50 border border-amber-200 rounded-full">
                <span className="mr-2">Plan:</span>
                <span className="font-semibold text-amber-800">{subscription.plan}</span>
              </div>
              
              <div className="flex items-center py-2 px-4 bg-amber-50 border border-amber-200 rounded-full">
                <span className="mr-2">Status:</span>
                <span className="font-semibold text-green-600">Aktywny</span>
              </div>
              
              {subscription.endDate && (
                <div className="flex items-center py-2 px-4 bg-amber-50 border border-amber-200 rounded-full">
                  <Calendar className="h-4 w-4 mr-2 text-amber-600" />
                  <span className="mr-2">Wygasa:</span>
                  <span className="font-semibold">
                    {new Date(subscription.endDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Premium features grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-0.5 w-8 bg-amber-400"></div>
            <Sparkles className="mx-4 h-5 w-5 text-amber-500" />
            <div className="h-0.5 w-8 bg-amber-400"></div>
          </div>
          <h2 className="text-3xl font-serif font-bold mb-3">Twoje Skarby Premium</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Skorzystaj z pełni możliwości Aurum Affirmations i odmień swoje życie dzięki ekskluzywnym treściom.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Afirmacje Złotej Duszy Card */}
          <Card className="bg-white border border-amber-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-amber-600" />
              </div>
              <CardTitle className="font-serif text-2xl">Afirmacje Złotej Duszy</CardTitle>
              <CardDescription>Ekskluzywna kolekcja porannych i wieczornych afirmacji</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 pb-6">
              <p className="text-gray-600">
                Odkryj tę wyjątkową kolekcję afirmacji, która pomoże Ci przejść transformację wewnętrzną.
                Z każdym oddechem przyjmuj złote światło obfitości, które naturalnie płynie w Tobie.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                onClick={() => setLocation('/golden-soul-affirmations')} 
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              >
                <span>Odkryj afirmacje złotej duszy</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          {/* Rytuały i Medytacje Card */}
          <Card className="bg-white border border-amber-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                <Moon className="h-6 w-6 text-amber-600" />
              </div>
              <CardTitle className="font-serif text-2xl">Rytuały i Medytacje</CardTitle>
              <CardDescription>Transformujące praktyki dla codziennego życia</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 pb-6">
              <p className="text-gray-600">
                Odkryj potężne rytuały poranne i wieczorne oraz głębokie medytacje, które pomogą
                Ci wejść na wyższy poziom świadomości i połączyć się z Twoją złotą energią.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                onClick={() => setLocation('/rituals')} 
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              >
                <span>Poznaj rytuały i medytacje</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          {/* Premium Affirmations Card */}
          <Card className="bg-white border border-amber-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-amber-600" />
              </div>
              <CardTitle className="font-serif text-2xl">Premium Afirmacje</CardTitle>
              <CardDescription>Ekskluzywne afirmacje dla przyciągania bogactwa</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 pb-6">
              <p className="text-gray-600">
                Codzienne afirmacje o zwiększonej mocy, specjalnie opracowane, aby przyciągać obfitość, 
                miłość i sukces. Każda afirmacja jest wzmocniona złotą energią.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                onClick={() => setLocation('/affirmation-categories')} 
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              >
                <span>Zobacz kategorie afirmacji</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          {/* Premium Horoscope Card */}
          <Card className="bg-white border border-amber-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-amber-600" />
              </div>
              <CardTitle className="font-serif text-2xl">Ekskluzywne Horoskopy</CardTitle>
              <CardDescription>Szczegółowe analizy astrologiczne</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 pb-6">
              <p className="text-gray-600">
                Pełne dzienne horoskopy ze szczegółowymi przewidywaniami dotyczącymi miłości, 
                kariery i zdrowia. Poznaj swoje szczęśliwe liczby i wydarzenia.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                onClick={() => setLocation('/horoscope')} 
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              >
                <span>Sprawdź swój horoskop</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          {/* Premium Numerology Card */}
          <Card className="bg-white border border-amber-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                <Hourglass className="h-6 w-6 text-amber-600" />
              </div>
              <CardTitle className="font-serif text-2xl">Zaawansowana Numerologia</CardTitle>
              <CardDescription>Głęboka analiza numerologiczna</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 pb-6">
              <p className="text-gray-600">
                Odkryj ukryte wzorce w swoim życiu z zaawansowaną analizą numerologiczną.
                Interpretacje liczb osobistych, życiowych i liczb imienia.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                onClick={() => setLocation('/numerology')} 
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              >
                <span>Odkryj swoją numerologię</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          {/* Premium Articles Card */}
          <Card className="bg-white border border-amber-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-amber-600" />
              </div>
              <CardTitle className="font-serif text-2xl">Ekskluzywne Artykuły</CardTitle>
              <CardDescription>Pogłębiona wiedza i praktyczne porady</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 pb-6">
              <p className="text-gray-600">
                Dostęp do biblioteki ekskluzywnych artykułów napisanych przez ekspertów.
                Porady dotyczące rozwoju osobistego, manifestacji i duchowości.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                onClick={() => setLocation('/articles')} 
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              >
                <span>Przeglądaj artykuły</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          {/* Profile Card */}
          <Card className="bg-white border border-amber-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                <Crown className="h-6 w-6 text-amber-600" />
              </div>
              <CardTitle className="font-serif text-2xl">Twój Profil Premium</CardTitle>
              <CardDescription>Zarządzaj swoją subskrypcją</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 pb-6">
              <p className="text-gray-600">
                Zarządzaj swoim kontem premium, sprawdź status subskrypcji i dostosuj 
                ustawienia swojego profilu. Personalizuj doświadczenie z aplikacją.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                onClick={() => setLocation('/profile')} 
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              >
                <span>Przejdź do profilu</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}