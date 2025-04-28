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
import CheckoutPage from "@/pages/CheckoutPage";
import AuthPage from "@/pages/auth-page";
import ProfilePage from "@/pages/profile-page";
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
              <main className="flex-grow pt-24">
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
