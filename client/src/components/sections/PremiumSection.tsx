import { usePremium } from '@/hooks/use-premium';
import PackageSelector from '@/components/premium/PackageSelector';
import PremiumDashboard from '@/components/premium/PremiumDashboard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function PremiumSection() {
  const { hasActiveSubscription, refetchPremiumStatus } = usePremium();
  const { toast } = useToast();

  const enableTestPremium = () => {
    localStorage.setItem('premium_override', 'true');
    refetchPremiumStatus();
    toast({
      title: "Tryb premium aktywowany",
      description: "Aktywowano tryb testowy premium. Odśwież stronę, aby zobaczyć zmiany.",
    });
    // Reload the page to ensure all components update
    setTimeout(() => window.location.reload(), 1500);
  };

  // If user has active subscription, show Premium Dashboard
  if (hasActiveSubscription) {
    return <PremiumDashboard />;
  }

  // Otherwise show Package Selector
  return (
    <div>
      <PackageSelector 
        onCheckoutSuccess={refetchPremiumStatus} 
      />
      
      <div className="mt-8 text-center">
        <p className="text-sm mb-2 text-muted-foreground">Tryb developerski</p>
        <Button 
          onClick={enableTestPremium} 
          variant="outline" 
          size="sm"
          className="mx-auto"
        >
          Aktywuj tryb testowy premium
        </Button>
      </div>
    </div>
  );
}