import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { LockIcon, SparklesIcon } from "lucide-react";

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
  isPremium = false,
  premiumContent,
  teaser,
  imageUrl,
  category = "treść",
}: PremiumContentProps) {
  const [, navigate] = useLocation();

  if (isPremium) {
    return (
      <div className="space-y-6">
        {premiumContent.title && (
          <h2 className="text-2xl font-bold gold-text-gradient">
            {premiumContent.title}
          </h2>
        )}

        {premiumContent.sections && premiumContent.sections.length > 0 && (
          <div className="space-y-6">
            {premiumContent.sections.map((section, index) => (
              <Card key={index} className="overflow-hidden relative shadow-xl border-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#073b5a] to-[#06a0c2] opacity-70"></div>
                <div className="absolute inset-0 holographic-scales"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/20 to-transparent"></div>
                <CardHeader className="pb-2 relative z-10">
                  <CardTitle className="text-xl text-white drop-shadow-sm gold-highlight font-bold">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 relative z-10">
                  <p className="text-white/90 leading-relaxed whitespace-pre-line">{section.content}</p>
                </CardContent>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37] via-[#f9d774] to-[#d4af37]"></div>
                <div className="absolute inset-0 bg-sparkles"></div>
              </Card>
            ))}
          </div>
        )}

        {premiumContent.bulletPoints && premiumContent.bulletPoints.length > 0 && (
          <div className="rounded-lg p-6 relative z-10 shadow-lg" 
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #f9d774 50%, #d4af37 100%)',
                border: '1px solid rgba(255, 215, 0, 0.5)',
                boxShadow: '0 0 15px rgba(255, 215, 0, 0.5)'
              }}>
            <ul className="space-y-2">
              {premiumContent.bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-gray-900 font-bold mr-2">✦</span>
                  <span className="text-gray-900 font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <Card className="overflow-hidden luxury-gold-shine border border-[#d4af37]/30 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3a2f0b] to-[#1a140a] opacity-95"></div>
        <div className="p-6 md:p-8 text-center relative z-10">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #d4af37 0%, #f9d774 50%, #d4af37 100%)',
              boxShadow: '0 0 15px rgba(255, 215, 0, 0.5)'
            }}>
            <LockIcon className="h-8 w-8 text-gray-900" />
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold gold-text-gradient mb-4">
            Treść Premium
          </h3>
          
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            {teaser || `Odblokuj dostęp do ekskluzywnej ${category} premium oraz wielu innych treści dzięki subskrypcji Aurum Affirmations.`}
          </p>
          
          <div className="space-y-3 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center">
            <Button
              onClick={() => navigate("/premium")}
              className="flex items-center justify-center font-bold py-3 px-7 rounded-full relative overflow-hidden luxury-button"
              style={{
                background: 'linear-gradient(135deg, #073b5a 0%, #06a0c2 50%, #073b5a 100%)',
                backgroundSize: '200% 100%',
                color: 'white',
                boxShadow: '0 0 20px rgba(6, 160, 194, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                animation: 'gold-shimmer 3s ease infinite'
              }}
            >
              <SparklesIcon className="h-5 w-5 mr-2 animate-pulse" />
              <span className="relative">
                <span className="relative z-10">Dołącz do Aurum Premium</span>
                <span className="absolute inset-0 opacity-40 gold-shine-overlay"></span>
              </span>
            </Button>
            
            <Button
              onClick={() => navigate("/auth")}
              variant="outline"
              className="bg-transparent border-2 font-medium rounded-full"
              style={{
                borderColor: '#d4af37',
                color: '#d4af37',
                boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)',
                textShadow: '0 0 5px rgba(255, 215, 0, 0.3)'
              }}
            >
              Zaloguj się
            </Button>
          </div>
        </div>
        
        {/* Dekoracyjne elementy */}
        <div className="absolute top-0 left-0 right-0 h-1 luxury-gold-gradient-1"></div>
        <div className="absolute bottom-0 right-0 pointer-events-none opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-[#d4af37]" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
          </svg>
        </div>
      </Card>
    </div>
  );
}