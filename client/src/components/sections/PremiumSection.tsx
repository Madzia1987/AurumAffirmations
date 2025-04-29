import { usePremium } from '@/hooks/use-premium';
import PackageSelector from '@/components/premium/PackageSelector';
import PremiumDashboard from '@/components/premium/PremiumDashboard';

export default function PremiumSection() {
  const { hasActiveSubscription, refetchPremiumStatus } = usePremium();

  // If user has active subscription, show Premium Dashboard
  if (hasActiveSubscription) {
    return <PremiumDashboard />;
  }

  // Otherwise show Package Selector
  return (
    <PackageSelector 
      onCheckoutSuccess={refetchPremiumStatus} 
    />
  );
}