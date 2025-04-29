import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { usePremium } from '@/hooks/use-premium';
import PremiumDashboard from '@/components/premium/PremiumDashboard';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function PremiumAccessPage() {
  const [, setLocation] = useLocation();
  const { isPremium, hasActiveSubscription, isLoading } = usePremium();
  const { toast } = useToast();

  useEffect(() => {
    // Set page title
    document.title = 'Premium Access - Aurum Affirmations';
    
    // Sprawdź czy użytkownik ma dostęp do treści premium
    if (!isLoading && !isPremium) {
      toast({
        title: "Brak dostępu",
        description: "Nie masz aktywnej subskrypcji. Przejdź do strony Premium, aby wykupić dostęp.",
        variant: "destructive"
      });
      
      setLocation('/premium');
    }
  }, [isPremium, isLoading, setLocation, toast]);
  
  // Pokazuj loader podczas sprawdzania statusu
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-amber-600 mb-4" />
          <p className="text-gray-500">Sprawdzanie statusu subskrypcji...</p>
        </div>
      </div>
    );
  }
  
  // Jeśli nie ma Premium, zwróć pusty element (przekierowanie nastąpi w useEffect)
  if (!isPremium || !hasActiveSubscription) {
    return null;
  }
  
  // Pokaż dashboard premium
  return <PremiumDashboard />;
}