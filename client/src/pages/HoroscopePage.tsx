import { useEffect } from 'react';
import HoroscopeSection from '@/components/sections/HoroscopeSection';
import FooterCTA from '@/components/sections/FooterCTA';
import { usePremium } from '@/hooks/use-premium';

const HoroscopePage = () => {
  const { isPremium, isLoading } = usePremium();
  
  useEffect(() => {
    // Set page title
    document.title = 'Horoskop Dzienny - Aurum Affirmations';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <HoroscopeSection isPremium={isPremium} />
      <FooterCTA />
    </>
  );
};

export default HoroscopePage;
