import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import NotFound from "@/pages/not-found";
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HomePage from "@/pages/HomePage";
import HoroscopePage from "@/pages/HoroscopePage";
import NumerologyPage from "@/pages/NumerologyPage";
import PremiumPage from "@/pages/PremiumPage";
import PremiumAccessPage from "@/pages/PremiumAccessPage";
import CheckoutPage from "@/pages/CheckoutPage";
import GoldenSoulPage from "@/pages/GoldenSoulPage";
import RitualsPage from "@/pages/RitualsPage";
import AuthPage from "@/pages/auth-page";
import ProfilePage from "@/pages/profile-page";
import AffirmationCategoriesPage from "@/pages/AffirmationCategoriesPage";
import AffirmationCategoryPage from "@/pages/AffirmationCategoryPage";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "./hooks/use-auth";
import { LanguageProvider } from "./hooks/use-language";
import { queryClient } from "./lib/queryClient";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/horoscope" component={HoroscopePage} />
      <Route path="/numerology" component={NumerologyPage} />
      <Route path="/premium" component={PremiumPage} />
      <Route path="/premium-access" component={PremiumAccessPage} />
      <Route path="/golden-soul" component={GoldenSoulPage} />
      <Route path="/golden-soul-affirmations" component={GoldenSoulPage} />
      <Route path="/rituals" component={RitualsPage} />
      <Route path="/affirmation-categories" component={AffirmationCategoriesPage} />
      <Route path="/affirmations/:categoryId" component={AffirmationCategoryPage} />
      <Route path="/premium/checkout" component={CheckoutPage} />
      <Route path="/checkout/:plan" component={CheckoutPage} />
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/profile" component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isPremium, setIsPremium] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if user has premium access from localStorage or API
    const checkPremiumStatus = async () => {
      try {
        const response = await fetch('/api/check-premium', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          setIsPremium(data.isPremium);
        }
      } catch (error) {
        console.error('Error checking premium status:', error);
      }
    };
    
    checkPremiumStatus();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <div className="flex flex-col min-h-screen bg-white">
              <Header />
              <main className="flex-grow">
                <Router />
              </main>
              <Footer />
              <Toaster />
            </div>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
