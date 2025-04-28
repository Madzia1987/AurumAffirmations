import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PREMIUM_PLANS } from '@/lib/constants';
import { apiRequest } from '@/lib/queryClient';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CheckoutFormProps {
  clientSecret: string;
  plan: string;
  onSuccess: () => void;
  onCancel: () => void;
}

function CheckoutForm({ clientSecret, plan, onSuccess, onCancel }: CheckoutFormProps) {
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
          planId: plan,
          startDate: new Date().toISOString(),
          endDate: calculateEndDate(plan).toISOString(),
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
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
        <PaymentElement />
      </div>
      
      <div className="flex justify-end space-x-4 mt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isProcessing}
          className="px-6 py-5 border-gray-300 hover:bg-gray-50 text-gray-700"
        >
          Anuluj
        </Button>
        <Button 
          type="submit"
          disabled={!stripe || !elements || isProcessing}
          className={`px-10 py-5 rounded-xl transition-all duration-300 ${
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

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan?: string;
  onSuccess: () => void;
}

function CheckoutModal({ isOpen, onClose, plan = 'monthly', onSuccess }: CheckoutModalProps) {
  const [selectedPlan, setSelectedPlan] = useState(plan);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setSelectedPlan(plan);
      createPaymentIntent(plan);
    }
  }, [isOpen, plan]);

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
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlanChange = async (value: string) => {
    setSelectedPlan(value);
    await createPaymentIntent(value);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleSuccess = () => {
    onSuccess();
    onClose();
  };

  // Only render content when we have the clientSecret
  const renderCheckoutForm = () => {
    if (!clientSecret) return null;

    const options = {
      clientSecret,
      appearance: {
        theme: 'stripe' as const,
        variables: {
          colorPrimary: '#b7791f',
          colorBackground: '#ffffff',
          colorText: '#1a1a1a',
          colorDanger: '#df1b41',
          fontFamily: 'Playfair Display, system-ui, sans-serif',
          borderRadius: '4px'
        }
      }
    };

    return (
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm 
          clientSecret={clientSecret} 
          plan={selectedPlan} 
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </Elements>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden bg-gradient-to-b from-gray-50 to-white border-none shadow-2xl">
        {/* Top Decorative Border */}
        <div className="h-1 w-full bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700"></div>
        
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-center font-serif text-3xl font-bold mb-2">
            <span className="gold-text-gradient">Premium</span> Członkostwo
          </DialogTitle>
          <DialogDescription className="text-center text-gray-700 max-w-md mx-auto">
            Odblokuj pełny dostęp do premium treści i dołącz do ekskluzywnej społeczności Aurum Affirmations
          </DialogDescription>
        </DialogHeader>
        
        <div className="px-6 py-4">
          <RadioGroup 
            value={selectedPlan} 
            onValueChange={handlePlanChange}
            className="grid grid-cols-1 gap-4 md:grid-cols-4"
            disabled={isLoading}
          >
            {Object.entries(PREMIUM_PLANS).map(([id, planDetails]) => {
              const isSelected = selectedPlan === id;
              return (
                <div 
                  key={id}
                  className={`relative flex flex-col rounded-xl border p-4 transition-all duration-300
                    ${isSelected 
                      ? 'border-amber-500 bg-gradient-to-b from-amber-50/80 to-white shadow-md ring-1 ring-amber-300/50' 
                      : 'border-gray-200 hover:border-amber-200 hover:shadow-sm'
                    }
                  `}
                >
                  <RadioGroupItem value={id} id={id} className="sr-only" />
                  
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 h-6 w-6 bg-amber-500 rounded-full flex items-center justify-center shadow-sm">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.5 6L5 7.5L8.5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                  
                  <Label htmlFor={id} className="cursor-pointer flex flex-col h-full">
                    <div className="font-semibold text-lg text-gray-900">{planDetails.name}</div>
                    <div className="text-sm text-gray-500">{planDetails.description}</div>
                    
                    <div className="mt-4 mb-3 flex items-baseline">
                      <span className={`text-2xl font-bold ${isSelected ? 'text-amber-800' : 'text-gray-900'}`}>
                        {planDetails.price} zł
                      </span>
                      <span className="ml-1 text-sm text-gray-500">/{planDetails.period}</span>
                    </div>
                    
                    <div className="mt-auto">
                      <div className={`h-0.5 w-full ${isSelected ? 'bg-amber-200' : 'bg-gray-100'} mb-3`}></div>
                      <ul className="text-sm text-gray-600 space-y-2">
                        {planDetails.features.slice(0, 2).map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <svg className={`h-4 w-4 mr-2 mt-0.5 ${isSelected ? 'text-amber-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="flex flex-col items-center">
              <div className="animate-spin w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full mb-4" />
              <span className="text-sm text-gray-500">Inicjowanie płatności...</span>
            </div>
          </div>
        ) : (
          <div className="px-6 pb-6">
            {renderCheckoutForm()}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CheckoutModal;