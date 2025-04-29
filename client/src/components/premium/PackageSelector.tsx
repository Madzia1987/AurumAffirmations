import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PREMIUM_PLANS } from '@/lib/constants';
import { CheckCircle, Sparkles } from 'lucide-react';

// Define the plan type to help with TypeScript
type PlanType = {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  billingPeriod: string;
  duration: {
    value: number;
    unit: string;
  };
  features: string[];
  featured?: boolean;
};

interface PackageSelectorProps {
  onCheckoutSuccess: () => void;
}

export default function PackageSelector({ onCheckoutSuccess }: PackageSelectorProps) {
  const [, setLocation] = useLocation();

  const handlePlanSelect = (plan: string) => {
    setLocation(`/checkout/${plan}`);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="h-0.5 w-12 bg-amber-500"></div>
            <Sparkles className="mx-4 h-6 w-6 text-amber-500" />
            <div className="h-0.5 w-12 bg-amber-500"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 tracking-tight">
            Odblokuj Pełnię Mocy <span className="gold-text-gradient">Aurum Affirmations</span>
          </h2>
          
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Dołącz do ekskluzywnej społeczności i zyskaj dostęp do premium afirmacji, rytuałów i medytacji, 
            które pomogą Ci przyciągnąć obfitość, miłość i sukces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-16">
          {Object.entries(PREMIUM_PLANS).map(([id, planData]) => {
            // Cast plan to the PlanType to fix TypeScript issues
            const plan = planData as PlanType;
            const isFeatured = !!plan.featured;
            
            return (
              <Card 
                key={id} 
                className={`bg-white relative overflow-hidden rounded-xl transition-all duration-500 
                  ${isFeatured 
                    ? 'border border-amber-400 shadow-[0_8px_40px_-12px_rgba(212,175,55,0.3)] hover:shadow-[0_20px_50px_-12px_rgba(212,175,55,0.4)] transform hover:-translate-y-2' 
                    : 'border border-gray-200 shadow-lg hover:shadow-xl hover:-translate-y-1'}`}
              >
                {isFeatured && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-600 to-amber-500 text-white py-1 px-3 text-xs font-semibold transform translate-x-[30%] translate-y-[30%] rotate-45 shadow-md z-10">
                    Najpopularniejszy
                  </div>
                )}
                
                {/* Decorative top border */}
                <div className={`absolute top-0 left-0 right-0 h-1 
                  ${isFeatured 
                    ? 'bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700' 
                    : 'bg-gradient-to-r from-gray-300 via-amber-300 to-gray-300'}`}
                ></div>
                
                <CardHeader className={`pt-8 pb-4 ${isFeatured ? 'bg-gradient-to-b from-amber-50 to-transparent' : ''}`}>
                  <CardTitle className="font-serif text-2xl font-bold text-gray-900">
                    {isFeatured ? (
                      <span className="relative inline-block">
                        {plan.name}
                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-400"></span>
                      </span>
                    ) : plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-1">{plan.description}</CardDescription>
                  <div className="mt-6 flex items-baseline">
                    <span className={`text-4xl font-bold ${isFeatured ? 'text-amber-800' : 'text-gray-900'}`}>
                      {plan.price} zł
                    </span>
                    <span className="text-gray-500 ml-2">/{plan.period}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-2">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className={`h-5 w-5 mr-3 flex-shrink-0 mt-0.5 ${isFeatured ? 'text-amber-600' : 'text-amber-500'}`} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="pt-6 pb-8">
                  <button 
                    onClick={() => handlePlanSelect(id)}
                    className={`w-full py-6 rounded-xl group transition-all duration-300 ${
                      isFeatured 
                        ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40' 
                        : 'bg-white text-amber-800 border border-amber-200 hover:border-amber-400 hover:bg-amber-50'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <span>Wybierz Plan</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                        className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </div>
                  </button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}