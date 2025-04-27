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
          return_url: window.location.origin,
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      <div className="flex justify-end space-x-2 mt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isProcessing}
        >
          Anuluj
        </Button>
        <Button 
          type="submit"
          disabled={!stripe || !elements || isProcessing}
          className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800"
        >
          {isProcessing ? (
            <>
              <span className="mr-2">Przetwarzanie...</span>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            </>
          ) : (
            "Zapłać teraz"
          )}
        </Button>
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center font-serif text-2xl font-bold text-amber-700">
            Wybierz plan premium
          </DialogTitle>
          <DialogDescription className="text-center">
            Odblokuj pełny dostęp do premium treści Aurum Affirmations
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <RadioGroup 
            value={selectedPlan} 
            onValueChange={handlePlanChange}
            className="grid grid-cols-1 gap-4 sm:grid-cols-3"
            disabled={isLoading}
          >
            {Object.entries(PREMIUM_PLANS).map(([id, planDetails]) => (
              <div 
                key={id}
                className={`relative flex flex-col rounded-lg border p-4 shadow-sm transition-all
                  ${selectedPlan === id ? 'border-amber-600 bg-amber-50' : 'border-gray-200'}
                `}
              >
                <RadioGroupItem value={id} id={id} className="sr-only" />
                <Label htmlFor={id} className="cursor-pointer">
                  <div className="font-semibold text-amber-800">{planDetails.name}</div>
                  <div className="mt-1 flex items-baseline">
                    <span className="text-xl font-bold text-gray-900">{planDetails.price} zł</span>
                    <span className="ml-1 text-sm text-gray-500">/{planDetails.period}</span>
                  </div>
                  <ul className="mt-2 text-sm text-gray-700 space-y-1">
                    {planDetails.features.map((feature, i) => (
                      <li key={i}>✓ {feature}</li>
                    ))}
                  </ul>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full" />
          </div>
        ) : renderCheckoutForm()}
      </DialogContent>
    </Dialog>
  );
}

export default CheckoutModal;