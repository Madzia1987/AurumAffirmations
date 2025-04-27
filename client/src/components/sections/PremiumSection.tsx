import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PREMIUM_PLANS, PREMIUM_CATEGORIES } from '@/lib/constants';
import { CheckCircle, Sparkles } from 'lucide-react';
import { usePremium } from '@/hooks/use-premium';
import CheckoutModal from '@/components/CheckoutModal';

export default function PremiumSection() {
  const [, setLocation] = useLocation();
  const { isPremium, refetchPremiumStatus } = usePremium();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSuccess = () => {
    refetchPremiumStatus();
  };

  if (isPremium) {
    return (
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-amber-800 mb-4">Twoja Strefa Premium</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dziękujemy za bycie częścią ekskluzywnej społeczności Aurum Affirmations. Masz dostęp do wszystkich premium treści.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {PREMIUM_CATEGORIES.map(category => (
              <Card key={category.id} className="border border-amber-200 bg-white hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-amber-800">{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-md overflow-hidden bg-amber-100 mb-4">
                    {category.image && (
                      <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => setLocation(`/premium/${category.id}`)}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800"
                  >
                    Przeglądaj treści
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-amber-100 rounded-full p-3 mb-4">
            <Sparkles className="h-6 w-6 text-amber-600" />
          </div>
          <h2 className="text-4xl font-serif font-bold text-amber-800 mb-4">
            Odblokuj Pełnię Mocy Aurum Affirmations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dołącz do ekskluzywnej społeczności i zyskaj dostęp do premium afirmacji, rytuałów i medytacji, które pomogą Ci przyciągnąć obfitość, miłość i sukces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(PREMIUM_PLANS).map(([id, plan]) => (
            <Card 
              key={id} 
              className={`border ${plan.featured ? 'border-amber-400 ring-2 ring-amber-300' : 'border-amber-200'} bg-white relative overflow-hidden`}
            >
              {plan.featured && (
                <div className="absolute top-0 right-0 bg-amber-500 text-white py-1 px-3 text-xs font-semibold transform translate-x-[30%] translate-y-[30%] rotate-45">
                  Najpopularniejszy
                </div>
              )}
              <CardHeader className={`${plan.featured ? 'bg-gradient-to-r from-amber-50 to-amber-100' : ''}`}>
                <CardTitle className="font-serif text-xl font-bold text-amber-800">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-gray-900">{plan.price} zł</span>
                  <span className="text-gray-500">/{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handlePlanSelect(id)}
                  className={`w-full ${
                    plan.featured 
                      ? 'bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800' 
                      : 'bg-white text-amber-700 border border-amber-300 hover:bg-amber-50'
                  }`}
                  variant={plan.featured ? 'default' : 'outline'}
                >
                  Wybierz Plan
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        plan={selectedPlan}
        onSuccess={handleCheckoutSuccess}
      />
    </section>
  );
}