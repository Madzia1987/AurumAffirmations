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
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600">
            {premiumContent.title}
          </h2>
        )}

        {premiumContent.sections && premiumContent.sections.length > 0 && (
          <div className="space-y-6">
            {premiumContent.sections.map((section, index) => (
              <Card key={index} className="bg-gray-800/50 border-amber-800/30 overflow-hidden">
                <CardHeader className="pb-2 bg-gradient-to-r from-amber-900/40 to-amber-700/20">
                  <CardTitle className="text-xl text-amber-400">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-gray-300 leading-relaxed">{section.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {premiumContent.bulletPoints && premiumContent.bulletPoints.length > 0 && (
          <div className="bg-gray-800/50 border border-amber-800/30 rounded-lg p-6">
            <ul className="space-y-2">
              {premiumContent.bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span className="text-gray-300">{point}</span>
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
      <Card className="bg-gray-800/50 border-amber-800/30 overflow-hidden">
        <div className="p-6 md:p-8 text-center">
          <div className="w-16 h-16 bg-amber-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <LockIcon className="h-8 w-8 text-amber-400" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
            Treść Premium
          </h3>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            {teaser || `Odblokuj dostęp do ekskluzywnej ${category} premium oraz wielu innych treści dzięki subskrypcji Aurum Affirmations.`}
          </p>
          <div className="space-y-3 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center">
            <Button
              onClick={() => navigate("/premium")}
              className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white flex items-center justify-center"
            >
              <SparklesIcon className="h-4 w-4 mr-2" />
              <span>Wybierz Plan Premium</span>
            </Button>
            <Button
              onClick={() => navigate("/auth")}
              variant="outline"
              className="border-amber-500 text-amber-500 hover:bg-amber-900/20"
            >
              Zaloguj się
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}