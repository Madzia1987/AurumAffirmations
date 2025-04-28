import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { usePremium } from "@/hooks/use-premium";
import { useApi } from "@/hooks/use-api";
import { Affirmation, Article, HoroscopeResponse, NumerologyResponse } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, StarIcon, CrownIcon, LogOutIcon, UserIcon, SettingsIcon } from "lucide-react";
import PremiumContent from "@/components/PremiumContent";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { user, logoutMutation } = useAuth();
  const [, navigate] = useLocation();
  const { isPremium } = usePremium();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Przekierowanie użytkownika zostanie obsłużone przez komponent ProtectedRoute
  // Nie używamy wczesnego return, aby zapobiec błędowi "Rendered fewer hooks than expected"

  // Fetch user's data
  const { data: dailyAffirmation } = useApi<Affirmation>({
    url: "/api/daily-affirmation",
  });

  const { data: horoscope } = useApi<HoroscopeResponse>({
    url: "/api/horoscope/aries",
  });

  const { data: numerology } = useApi<NumerologyResponse>({
    url: "/api/numerology/daily",
  });

  const { data: articles } = useApi<Article[]>({
    url: "/api/articles",
  });

  // Handle logout
  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      toast({
        title: "Wylogowano",
        description: "Zostałeś pomyślnie wylogowany.",
      });
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Błąd wylogowania",
        description: "Wystąpił problem podczas wylogowywania.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-gray-900/50 p-6 rounded-xl shadow-lg border border-amber-800/30">
          <div className="flex items-center mb-4 md:mb-0">
            <Avatar className="h-16 w-16 border-2 border-amber-500">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-br from-amber-400 to-amber-700 text-white text-xl">
                {user.username?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-white">
                Witaj, <span className="text-amber-400">{user.username || "Użytkowniku"}</span>!
              </h1>
              <p className="text-gray-400">
                {isPremium ? (
                  <Badge className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800">
                    Status Premium
                  </Badge>
                ) : (
                  "Użytkownik podstawowy"
                )}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-amber-500 text-amber-500 hover:bg-amber-500/10"
            onClick={handleLogout}
          >
            <LogOutIcon className="h-4 w-4 mr-2" />
            Wyloguj się
          </Button>
        </div>

        {/* Main Content */}
        <div className="w-full">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="flex flex-col lg:flex-row gap-6"
          >
            {/* Sidebar */}
            <div className="w-full lg:w-64 shrink-0">
              <TabsList className="flex flex-col h-auto bg-gray-900/50 rounded-xl p-2 space-y-2 w-full">
                <TabsTrigger
                  value="dashboard"
                  className="flex items-center justify-start text-base py-3 px-4 w-full"
                >
                  <UserIcon className="h-5 w-5 mr-3" />
                  Mój Profil
                </TabsTrigger>
                <TabsTrigger
                  value="affirmations"
                  className="flex items-center justify-start text-base py-3 px-4 w-full"
                >
                  <StarIcon className="h-5 w-5 mr-3" />
                  Moje Afirmacje
                </TabsTrigger>
                <TabsTrigger
                  value="horoscope"
                  className="flex items-center justify-start text-base py-3 px-4 w-full"
                >
                  <CalendarIcon className="h-5 w-5 mr-3" />
                  Mój Horoskop
                </TabsTrigger>
                <TabsTrigger
                  value="numerology"
                  className="flex items-center justify-start text-base py-3 px-4 w-full"
                >
                  <SettingsIcon className="h-5 w-5 mr-3" />
                  Moja Numerologia
                </TabsTrigger>
                <TabsTrigger
                  value="subscriptions"
                  className="flex items-center justify-start text-base py-3 px-4 w-full"
                >
                  <CrownIcon className="h-5 w-5 mr-3" />
                  Moje Subskrypcje
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Content */}
            <div className="flex-1 bg-gray-900/50 rounded-xl p-6 border border-amber-800/30 shadow-xl">
              <TabsContent value="dashboard" className="mt-0 space-y-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600 mb-6">
                Mój Profil
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-gray-800/50 border-amber-800/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-amber-400 text-lg">
                      Dzisiejsza Afirmacja
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {dailyAffirmation ? (
                      <p className="text-white text-lg italic">"{dailyAffirmation.text}"</p>
                    ) : (
                      <p className="text-gray-400">Ładowanie afirmacji...</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-amber-800/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-amber-400 text-lg">
                      Liczba numerologiczna dnia
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {numerology ? (
                      <div>
                        <div className="text-4xl font-bold text-center text-amber-500 mb-2">
                          {numerology.number}
                        </div>
                        <p className="text-white">{numerology.meaning}</p>
                      </div>
                    ) : (
                      <p className="text-gray-400">Ładowanie numerologii...</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-amber-800/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-amber-400 text-lg">
                      Horoskop dzienny
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {horoscope ? (
                      <div>
                        <p className="text-white mb-2">{horoscope.general}</p>
                        <div className="text-amber-400 font-medium mt-2">
                          <span className="block text-sm">Znak: {horoscope.sign}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-400">Ładowanie horoskopu...</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-semibold text-amber-400 mt-8 mb-4">
                Najnowsze Artykuły
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {articles && articles.length > 0 ? (
                  articles.slice(0, 2).map((article) => (
                    <Card key={article.id} className="bg-gray-800/50 border-amber-800/30">
                      <CardHeader>
                        <CardTitle className="text-white">{article.title}</CardTitle>
                        <CardDescription className="text-gray-400">
                          {article.category} • {article.readTime} min czytania
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300">{article.excerpt}</p>
                        <Button
                          variant="link"
                          className="text-amber-400 hover:text-amber-300 p-0 mt-2"
                        >
                          Czytaj więcej
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-gray-400 col-span-2">Ładowanie artykułów...</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="affirmations" className="mt-0 space-y-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600 mb-6">
                Moje Afirmacje
              </h2>
              <PremiumContent
                isPremium={isPremium}
                premiumContent={{
                  title: "Spersonalizowane Afirmacje",
                  sections: [
                    {
                      title: "Afirmacje na Bogactwo",
                      content:
                        "Jestem magnesem na pieniądze i obfitość. Bogactwo płynie do mnie swobodnym i stałym strumieniem. Zasługuję na dobrodziejstwa i bogactwo o jakich marzę."
                    },
                    {
                      title: "Afirmacje na Pewność Siebie",
                      content:
                        "Jestem pewny siebie i potężny. Mam odwagę podążać za swoimi marzeniami. Wierzę w siebie i swoje możliwości. Każdego dnia staję się coraz silniejszy i bardziej pewny siebie."
                    },
                    {
                      title: "Afirmacje na Miłość",
                      content:
                        "Jestem godny miłości i szacunku. Przyciągam do swojego życia harmonijne i kochające relacje. Moje serce jest otwarte na dającą i otrzymującą miłość."
                    }
                  ]
                }}
                teaser="Odkryj spersonalizowane afirmacje dopasowane do Twoich potrzeb i celów. Uzyskaj dostęp do pełnej biblioteki afirmacji na różne obszary życia."
                category="afirmacje"
              />
            </TabsContent>

            <TabsContent value="horoscope" className="mt-0 space-y-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600 mb-6">
                Mój Horoskop
              </h2>
              <PremiumContent
                isPremium={isPremium}
                premiumContent={{
                  title: "Szczegółowy Horoskop",
                  sections: horoscope
                    ? [
                        {
                          title: "Ogólne",
                          content: horoscope.general
                        },
                        {
                          title: "Miłość",
                          content: horoscope.love
                        },
                        {
                          title: "Kariera",
                          content: horoscope.career
                        },
                        {
                          title: "Zdrowie",
                          content: horoscope.health
                        }
                      ]
                    : []
                }}
                teaser="Uzyskaj dostęp do szczegółowego horoskopu, który obejmuje wszystkie aspekty Twojego życia: miłość, karierę, zdrowie i finanse."
                category="horoskop"
              />
            </TabsContent>

            <TabsContent value="numerology" className="mt-0 space-y-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600 mb-6">
                Moja Numerologia
              </h2>
              <PremiumContent
                isPremium={isPremium}
                premiumContent={{
                  title: "Pełna Analiza Numerologiczna",
                  sections: numerology
                    ? [
                        {
                          title: `Twoja liczba: ${numerology.number}`,
                          content: numerology.meaning
                        },
                        {
                          title: "Osobowość",
                          content: numerology.details?.personality || "Szczegółowa analiza Twojej osobowości na podstawie numerologii."
                        },
                        {
                          title: "Kariera",
                          content: numerology.details?.career || "Jakie ścieżki kariery są dla Ciebie najlepsze według numerologii."
                        },
                        {
                          title: "Miłość",
                          content: numerology.details?.love || "Jak numerologia wpływa na Twoje relacje i miłość."
                        }
                      ]
                    : []
                }}
                teaser="Odkryj, co Twoja liczba życia mówi o Tobie. Kompleksowa analiza numerologiczna Twojej osobowości, kariery i relacji."
                category="numerologia"
              />
            </TabsContent>

            <TabsContent value="subscriptions" className="mt-0 space-y-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600 mb-6">
                Moje Subskrypcje
              </h2>
              
              {isPremium ? (
                <div className="space-y-6">
                  <Card className="bg-gradient-to-r from-amber-900/40 to-amber-700/20 border-amber-500/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-amber-400">Aktywna Subskrypcja Premium</CardTitle>
                        <Badge className="bg-gradient-to-r from-amber-500 to-amber-700">
                          Aktywna
                        </Badge>
                      </div>
                      <CardDescription className="text-amber-100/80">
                        Pełny dostęp do wszystkich treści premium
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between border-b border-amber-700/30 pb-2">
                        <span className="text-gray-300">Data rozpoczęcia</span>
                        <span className="text-white">1 kwietnia 2025</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-amber-700/30 pb-2">
                        <span className="text-gray-300">Data odnowienia</span>
                        <span className="text-white">1 maja 2025</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Plan</span>
                        <span className="text-white">Miesięczny Premium</span>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="mt-6">
                    <h3 className="text-xl font-semibold text-amber-400 mb-4">
                      Korzyści Twojego Planu
                    </h3>
                    <ul className="space-y-3 text-gray-200">
                      <li className="flex items-start">
                        <svg
                          className="h-5 w-5 text-amber-500 mr-2 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Nieograniczony dostęp do spersonalizowanych afirmacji
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="h-5 w-5 text-amber-500 mr-2 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Szczegółowe dzienne i tygodniowe horoskopy
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="h-5 w-5 text-amber-500 mr-2 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Pełne raporty numerologiczne
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="h-5 w-5 text-amber-500 mr-2 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Ekskluzywne artykuły i treści edukacyjne
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="h-5 w-5 text-amber-500 mr-2 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Wsparcie priorytetowe
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <Card className="bg-gray-800/50 border-amber-800/30">
                    <CardHeader>
                      <CardTitle className="text-white">Brak aktywnej subskrypcji</CardTitle>
                      <CardDescription className="text-gray-400">
                        Aktualnie korzystasz z darmowego planu
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-6">
                        Odblokuj pełnię możliwości dzięki subskrypcji Premium. Zyskaj dostęp do
                        ekskluzywnych treści, szczegółowych analiz i spersonalizowanych rekomendacji.
                      </p>
                      <Button className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white">
                        Odkryj plany Premium
                      </Button>
                    </CardContent>
                  </Card>

                  <div className="mt-6">
                    <h3 className="text-xl font-semibold text-amber-400 mb-4">
                      Dlaczego warto wybrać Premium?
                    </h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <svg
                          className="h-5 w-5 text-amber-500 mr-2 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Nieograniczony dostęp do spersonalizowanych afirmacji
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="h-5 w-5 text-amber-500 mr-2 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Szczegółowe dzienne i tygodniowe horoskopy
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="h-5 w-5 text-amber-500 mr-2 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Pełne raporty numerologiczne
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="h-5 w-5 text-amber-500 mr-2 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Ekskluzywne artykuły i treści edukacyjne
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}