import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Sparkles } from 'lucide-react';
import CheckoutModal from './CheckoutModal';
import { usePremium } from '@/hooks/use-premium';

interface PremiumContentSection {
  title: string;
  content: string;
}

interface PremiumContentProps {
  isPremium?: boolean;
  premiumContent: {
    title?: string;
    sections?: PremiumContentSection[];
    bulletPoints?: string[];
  };
  teaser?: string;
  imageUrl?: string;
  category?: string;
}

export default function PremiumContent({
  premiumContent,
  teaser = "Ta treść jest dostępna tylko dla użytkowników premium.",
  imageUrl,
  category
}: PremiumContentProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const { isPremium, refetchPremiumStatus } = usePremium();

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSuccess = () => {
    refetchPremiumStatus();
  };

  if (isPremium) {
    return (
      <div className="space-y-6 animate-in fade-in-50 duration-300">
        {premiumContent.title && (
          <h2 className="text-2xl font-serif font-bold text-amber-800">{premiumContent.title}</h2>
        )}
        
        {premiumContent.sections && premiumContent.sections.map((section, index) => (
          <div key={index} className="space-y-2">
            <h3 className="text-xl font-semibold text-amber-700">{section.title}</h3>
            <p className="text-gray-700 leading-relaxed">{section.content}</p>
          </div>
        ))}
        
        {premiumContent.bulletPoints && (
          <ul className="space-y-2 list-disc list-inside text-gray-700">
            {premiumContent.bulletPoints.map((point, index) => (
              <li key={index} className="leading-relaxed">{point}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <Card className="border border-amber-200 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 p-6">
          <div className="text-center space-y-4 max-w-md">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-amber-800">Treść Premium</h3>
            <p className="text-gray-600">{teaser}</p>
            
            <div className="pt-4 grid gap-3">
              <Button 
                onClick={() => handlePlanSelect('monthly')}
                className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Odblokuj Premium
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handlePlanSelect('trial')}
                className="border-amber-300 text-amber-800 hover:bg-amber-50"
              >
                Wypróbuj przez 7 dni
              </Button>
            </div>
          </div>
        </div>
        
        <CardHeader className="opacity-20">
          {premiumContent.title && (
            <CardTitle className="text-xl font-serif">{premiumContent.title}</CardTitle>
          )}
          {imageUrl && (
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-amber-100">
              <img src={imageUrl} alt={premiumContent.title || "Premium content"} className="w-full h-full object-cover" />
            </div>
          )}
        </CardHeader>
        
        <CardContent className="opacity-20">
          <div className="blur-sm">
            {premiumContent.sections && premiumContent.sections.slice(0, 1).map((section, index) => (
              <div key={index} className="space-y-2">
                <p className="text-gray-700 leading-relaxed">{section.content.substring(0, 120)}...</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        plan={selectedPlan}
        onSuccess={handleCheckoutSuccess}
      />
    </div>
  );
}