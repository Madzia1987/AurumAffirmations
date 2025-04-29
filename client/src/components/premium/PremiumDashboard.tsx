import { Sparkles, Heart, MoonStar, Compass, FileText, ImageIcon } from 'lucide-react';
import { Link } from 'wouter';

export default function PremiumDashboard() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-amber-900/30 rounded-full p-3 mb-4">
            <Sparkles className="h-6 w-6 text-amber-400" />
          </div>
          
          <h2 className="text-4xl font-serif font-bold mb-6 tracking-tight">
            <span className="text-amber-50">✨ Gratulacje! Masz aktywny dostęp do</span>
            <span className="gold-text-gradient block mt-2">Aurum Affirmation Premium</span>
          </h2>
          
          <p className="text-lg text-amber-100/80 max-w-2xl mx-auto">
            Twoje ekskluzywne treści czekają na Ciebie. Ciesz się pełnym dostępem do wszystkich premium materiałów.
          </p>
        </div>
        
        <div className="premium-dashboard max-w-4xl mx-auto">
          <h3 className="section-title text-2xl font-serif text-center mb-10 text-amber-300">
            🌟 Twoje Skarby Premium
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <PremiumLink 
              href="/affirmations"
              icon={<Heart className="h-6 w-6 text-amber-300" />}
              title="Afirmacje Złotej Duszy"
              description="Odkryj codzienne afirmacje, które przyciągną obfitość, miłość i sukces."
            />
            
            <PremiumLink 
              href="/rituals"
              icon={<MoonStar className="h-6 w-6 text-amber-300" />}
              title="Rytuały i Medytacje"
              description="Ekskluzywne rytuały transformujące energię i medytacje tworzące obfitość."
            />
            
            <PremiumLink 
              href="/numerology"
              icon={<Compass className="h-6 w-6 text-amber-300" />}
              title="Numerologia Duszy"
              description="Poznaj swoją numerologiczną ścieżkę życia i odkryj swoje ukryte talenty."
            />
            
            <PremiumLink 
              href="/horoscope"
              icon={<Sparkles className="h-6 w-6 text-amber-300" />}
              title="Horoskop Intuicyjny"
              description="Codzienne przewidywania i wskazówki dla Twojego znaku zodiaku."
            />
            
            <PremiumLink 
              href="/journal"
              icon={<FileText className="h-6 w-6 text-amber-300" />}
              title="Złoty Dziennik"
              description="Ekskluzywne szablony do dziennika obfitości i wdzięczności."
            />
            
            <PremiumLink 
              href="/downloads"
              icon={<ImageIcon className="h-6 w-6 text-amber-300" />}
              title="Tapety i Dzienniki"
              description="Pobierz luksusowe tapety i materiały do wydruku."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

interface PremiumLinkProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function PremiumLink({ href, icon, title, description }: PremiumLinkProps) {
  return (
    <Link href={href}>
      <div className="premium-link bg-gray-800/50 border border-amber-700/30 rounded-xl p-6 hover:bg-gray-700/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(217,119,6,0.15)] group cursor-pointer">
        <div className="flex items-start">
          <div className="rounded-full bg-amber-900/20 p-3 mr-4">
            {icon}
          </div>
          
          <div className="flex-1">
            <h4 className="text-xl font-serif font-semibold text-amber-200 group-hover:text-amber-300 transition-colors">
              {title}
            </h4>
            <p className="text-amber-100/70 text-sm mt-2 group-hover:text-amber-100/90 transition-colors">
              {description}
            </p>
          </div>
          
          <div className="ml-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-300">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}