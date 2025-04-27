import { useState, useEffect } from 'react';
import HomeBanner from '@/components/sections/HomeBanner';
import QuoteSection from '@/components/sections/QuoteSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ArticlePreview from '@/components/sections/ArticlePreview';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FooterCTA from '@/components/sections/FooterCTA';
import { usePremium } from '@/hooks/use-premium';

const HomePage = () => {
  const { isPremium, isLoading } = usePremium();
  
  useEffect(() => {
    // Set page title
    document.title = 'Aurum Affirmations - Luksusowe Afirmacje';
  }, []);
  
  return (
    <>
      <HomeBanner />
      <QuoteSection />
      <FeaturesSection />
      <ArticlePreview isPremium={isPremium} />
      <TestimonialsSection />
      <FooterCTA />
    </>
  );
};

export default HomePage;
