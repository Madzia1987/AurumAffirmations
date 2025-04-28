import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { PREMIUM_PLANS } from '@/lib/constants';
import { usePremium } from '@/hooks/use-premium';
import { useToast } from '@/hooks/use-toast';
import CheckoutModal from '@/components/CheckoutModal';
import { apiRequest } from '@/lib/queryClient';

const CheckoutPage = () => {
  const { plan } = useParams();
  const [, setLocation] = useLocation();
  const { isPremium, refetchPremiumStatus } = usePremium();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [selectedPlan, setSelectedPlan] = useState<string>('monthly');
  
  useEffect(() => {
    // Set page title
    document.title = 'Checkout - Aurum Affirmations';
    
    // Get plan from URL parameters
    const params = new URLSearchParams(window.location.search);
    const planFromUrl = params.get('plan');
    
    if (planFromUrl && PREMIUM_PLANS[planFromUrl as keyof typeof PREMIUM_PLANS]) {
      setSelectedPlan(planFromUrl);
    } else if (plan && PREMIUM_PLANS[plan as keyof typeof PREMIUM_PLANS]) {
      setSelectedPlan(plan);
    } else if (!plan && !planFromUrl) {
      // Set default plan if none provided
      setSelectedPlan('monthly');
    } else {
      // Invalid plan
      toast({
        title: "Nieprawidłowy plan",
        description: "Wybrany plan nie istnieje.",
        variant: "destructive",
      });
      setLocation('/premium');
      return;
    }
    
    // Check if user already has premium
    if (isPremium) {
      toast({
        title: "Już masz dostęp premium!",
        description: "Możesz korzystać ze wszystkich premium treści.",
      });
      setLocation('/');
    }
  }, [plan, setLocation, isPremium, toast]);
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setLocation('/premium');
  };
  
  const handlePaymentSuccess = () => {
    refetchPremiumStatus();
    setIsModalOpen(false);
    // Redirect to success page or home
    setLocation('/');
    
    // Success toast is handled by the refetchPremiumStatus function
  };
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        plan={selectedPlan}
        onSuccess={handlePaymentSuccess}
      />
      
      {/* Fallback content if modal closed */}
      <div className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-3xl font-serif font-bold mb-4 text-amber-800">Wybierz Plan Premium</h2>
        <p className="mb-8 text-gray-600">Wybierz subskrypcję, która najlepiej odpowiada Twoim potrzebom</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Pokaż dostępne plany
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
