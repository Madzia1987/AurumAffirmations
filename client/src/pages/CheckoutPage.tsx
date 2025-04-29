import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { PREMIUM_PLANS } from '@/lib/constants';
import { usePremium } from '@/hooks/use-premium';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Załaduj Stripe poza komponentem
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CheckoutFormProps {
  clientSecret: string;
  planId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

function CheckoutForm({ clientSecret, planId, onSuccess, onCancel }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/premium',
        },
        redirect: 'if_required'
      });

      if (error) {
        toast({
          title: "Błąd płatności",
          description: error.message || "Wystąpił problem z płatnością. Spróbuj ponownie.",
          variant: "destructive",
        });
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Register successful subscription
        await apiRequest('POST', '/api/register-subscription', {
          userId: 1, // Use actual user ID in production
          planId,
          startDate: new Date().toISOString(),
          endDate: calculateEndDate(planId).toISOString(),
          status: 'active',
          paymentId: paymentIntent.id
        });

        toast({
          title: "Płatność zatwierdzona",
          description: "Dziękujemy za wykupienie subskrypcji premium!",
        });
        
        onSuccess();
      }
    } catch (err: any) {
      toast({
        title: "Wystąpił błąd",
        description: err.message || "Nie udało się przetworzyć płatności. Spróbuj ponownie.",
        variant: "destructive",
      });
    }

    setIsProcessing(false);
  };

  const calculateEndDate = (planId: string): Date => {
    const plan = PREMIUM_PLANS[planId as keyof typeof PREMIUM_PLANS];
    const endDate = new Date();
    
    if (plan?.duration) {
      if (plan.duration.unit === 'month') {
        endDate.setMonth(endDate.getMonth() + plan.duration.value);
      } else if (plan.duration.unit === 'year') {
        endDate.setFullYear(endDate.getFullYear() + plan.duration.value);
      } else if (plan.duration.unit === 'day') {
        endDate.setDate(endDate.getDate() + plan.duration.value);
      }
    } else {
      // Default to 30 days if no duration specified
      endDate.setDate(endDate.getDate() + 30);
    }
    
    return endDate;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-md">
      <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
        <PaymentElement />
      </div>
      
      <div className="flex justify-between items-center space-x-4 mt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isProcessing}
          className="px-6 py-4 border-gray-300 hover:bg-gray-50 text-gray-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Powrót
        </Button>
        <Button 
          type="submit"
          disabled={!stripe || !elements || isProcessing}
          className={`px-10 py-4 rounded-xl transition-all duration-300 ${
            isProcessing
              ? 'bg-amber-600'
              : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center">
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3" />
              <span>Przetwarzanie płatności...</span>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="mr-2">Zatwierdź płatność</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          )}
        </Button>
      </div>
      
      <div className="flex items-center justify-center text-xs text-gray-500 mt-4 space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <span>Bezpieczna płatność przez Stripe</span>
      </div>
    </form>
  );
}

const CheckoutPage = () => {
  const { plan } = useParams();
  const [, setLocation] = useLocation();
  const { isPremium, refetchPremiumStatus } = usePremium();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string>('monthly');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Set page title
    document.title = 'Finalizacja zakupu - Aurum Affirmations';
    
    // Get plan from URL parameters
    const params = new URLSearchParams(window.location.search);
    const planFromUrl = params.get('plan');
    let planId;
    
    if (planFromUrl && PREMIUM_PLANS[planFromUrl as keyof typeof PREMIUM_PLANS]) {
      planId = planFromUrl;
      setSelectedPlan(planFromUrl);
    } else if (plan && PREMIUM_PLANS[plan as keyof typeof PREMIUM_PLANS]) {
      planId = plan;
      setSelectedPlan(plan);
    } else if (!plan && !planFromUrl) {
      // Set default plan if none provided
      planId = 'monthly';
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
      setLocation('/premium-access');
      return;
    }
    
    // Create payment intent for the selected plan
    createPaymentIntent(planId);
  }, [plan, setLocation, isPremium, toast]);
  
  const createPaymentIntent = async (planId: string) => {
    setIsLoading(true);
    try {
      const response = await apiRequest('POST', '/api/create-payment-intent', {
        planId,
        userId: 1 // Use actual user ID in production
      });
      
      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (error: any) {
      toast({
        title: "Błąd",
        description: "Nie udało się zainicjować płatności. Spróbuj ponownie.",
        variant: "destructive",
      });
      console.error('Payment intent error:', error);
      // Redirect back to premium page on error
      setLocation('/premium');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCancel = () => {
    setLocation('/premium');
  };
  
  const handlePaymentSuccess = () => {
    refetchPremiumStatus();
    // Redirect to premium access page
    setLocation('/premium-access');
  };
  
  const planInfo = PREMIUM_PLANS[selectedPlan as keyof typeof PREMIUM_PLANS];
  
  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-amber-600 mb-4" />
        <p className="text-gray-700">Inicjowanie płatności...</p>
      </div>
    );
  }
  
  if (!clientSecret) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6">
        <div className="mb-6 text-amber-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">Nie udało się zainicjować płatności</h2>
        <p className="text-gray-600 mb-6 max-w-md">Wystąpił problem z przygotowaniem płatności. Spróbuj ponownie lub wybierz inny pakiet.</p>
        <Button onClick={() => setLocation('/premium')} className="bg-gradient-to-r from-amber-600 to-amber-700">
          Powrót do strony premium
        </Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-[80vh] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Finalizacja zakupu
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Wybrany pakiet: <span className="font-medium text-amber-800">{planInfo.name}</span> - {planInfo.price} zł/{planInfo.period}
            </p>
          </div>
          
          {/* Payment form */}
          <div className="bg-gradient-to-b from-amber-50/50 to-white rounded-2xl p-6 md:p-8 shadow-xl border border-amber-100/50">
            <div className="h-1 w-full bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700 rounded-full mb-8"></div>
            
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <div className="flex flex-col items-center">
                <CheckoutForm 
                  clientSecret={clientSecret} 
                  planId={selectedPlan} 
                  onSuccess={handlePaymentSuccess}
                  onCancel={handleCancel}
                />
              </div>
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
