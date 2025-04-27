import { Card, CardContent } from '@/components/ui/card';
import { QuoteIcon } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "Afirmacje z Aurum zmieniły moje podejście do pieniędzy i manifestowania obfitości. Po dwóch miesiącach regularnej praktyki przyciągnęłam klientów o wartości ponad 20 000 zł do mojego biznesu!",
    author: "Joanna K.",
    role: "Przedsiębiorczyni",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80"
  },
  {
    id: 2,
    quote: "Odkąd zaczęłam korzystać z rytuałów miłości własnej od Aurum, moja pewność siebie wzrosła niesamowicie. Czuję się piękna i wartościowa każdego dnia.",
    author: "Marta W.",
    role: "Trenerka personalna",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80"
  },
  {
    id: 3,
    quote: "Subskrypcja premium to najlepsza inwestycja, jaką zrobiłam w tym roku! Medytacje obfitości pomogły mi zmienić mój mindset i w końcu podnieść ceny w moim biznesie bez poczucia winy.",
    author: "Agnieszka T.",
    role: "Właścicielka butiku online",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80"
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-amber-800 mb-4">Co Mówią Nasze Użytkowniczki</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dołącz do tysięcy kobiet, które już zmieniły swoje życie dzięki Aurum Affirmations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border border-amber-100 shadow-sm hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="mb-4 text-amber-500">
                  <QuoteIcon className="h-8 w-8" />
                </div>
                <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4 bg-amber-100">
                    {testimonial.image && (
                      <img src={testimonial.image} alt={testimonial.author} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-amber-800">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}