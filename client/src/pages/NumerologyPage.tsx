import { useEffect } from 'react';
import NumerologySection from '@/components/sections/NumerologySection';
import FooterCTA from '@/components/sections/FooterCTA';
import { usePremium } from '@/hooks/use-premium';

const NumerologyPage = () => {
  const { isPremium, isLoading } = usePremium();
  
  useEffect(() => {
    // Set page title
    document.title = 'Numerologia - Aurum Affirmations';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <NumerologySection isPremium={isPremium} />
      <FooterCTA />
    </>
  );
};

export default NumerologyPage;
