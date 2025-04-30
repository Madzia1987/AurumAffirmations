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
    <section className="py-16 mermaid-holographic relative overflow-hidden">
      <div className="absolute inset-0 holographic-scales"></div>
      <div className="absolute inset-0 bg-sparkles"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-white gold-highlight mb-4">Co Mówią Nasze Użytkowniczki</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Dołącz do tysięcy kobiet, które już zmieniły swoje życie dzięki Aurum Affirmations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1 relative">
              <div className="absolute inset-0 holographic-scales opacity-30 premium-gold"></div>
              <div className="absolute inset-0 bg-black/70"></div>
              <div className="p-6 relative z-10">
                <div className="mb-4 text-[#d4af37]">
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8.688C3 7.96 3.033 7.136 3.768 6.944C9.95 5.027 10.896 11.042 10.896 11.042V13.5C10.896 14.328 10.823 15 10 15H5.5C4.678 15 4 14.328 4 13.5V9.459H3V8.688Z" fill="currentColor"/>
                    <path d="M14 8.688C14 7.96 14.033 7.136 14.768 6.944C20.95 5.027 21.896 11.042 21.896 11.042V13.5C21.896 14.328 21.823 15 21 15H16.5C15.678 15 15 14.328 15 13.5V9.459H14V8.688Z" fill="currentColor"/>
                  </svg>
                </div>
                <blockquote className="text-white/90 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4 bg-[#d4af37]/20 border border-[#d4af37]/30">
                    {testimonial.image && (
                      <img src={testimonial.image} alt={testimonial.author} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-[#d4af37] gold-highlight">{testimonial.author}</div>
                    <div className="text-sm text-white/70">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}