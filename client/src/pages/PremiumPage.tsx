import { useEffect } from 'react';
import PremiumSection from '@/components/sections/PremiumSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

const PremiumPage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Premium - Aurum Affirmations';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <PremiumSection />
      <TestimonialsSection />
    </>
  );
};

export default PremiumPage;
