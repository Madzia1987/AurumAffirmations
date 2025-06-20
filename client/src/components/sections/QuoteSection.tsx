import { useState, useEffect } from 'react';
import { getDailyQuote } from '@/lib/api';

const QuoteSection = () => {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setIsLoading(true);
        const data = await getDailyQuote();
        setQuote(data);
      } catch (error) {
        console.error('Failed to fetch daily quote:', error);
        setQuote({
          text: "Bogactwo zaczyna się od bogactwa umysłu. Każda myśl tworzy twoją przyszłą rzeczywistość.",
          author: "Louise Hay"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchQuote();
  }, []);
  
  return (
    <section className="py-12 px-4 relative overflow-hidden mermaid-holographic">
      <div className="absolute inset-0 holographic-scales"></div>
      <div className="absolute inset-0 bg-sparkles"></div>
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <div className="relative">
          <svg className="w-12 h-12 mx-auto mb-6 text-[#d4af37] opacity-70" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144-.357.097-.861.228-1.402.43-.54.2-1.208.485-1.833.88-.609.398-1.274.882-1.729 1.533-.445.648-.78 1.418-.997 2.219-.205.821-.341 1.67-.232 2.527.109.815.326 1.63.705 2.32.372.708.957 1.269 1.578 1.717.624.445 1.279.79 1.916 1.028.652.23 1.28.36 1.788.429.521.062.926.096 1.2.96.268 0 .414-.021.414-.021v-1.142c0 0-.133.01-.322 0-.176-.011-.416-.028-.707-.082-.58-.105-1.323-.32-2.012-.711-.696-.385-1.35-1.042-1.653-1.918-.311-.84-.43-1.784-.317-2.682.101-.899.415-1.731.794-2.446.381-.698.834-1.287 1.262-1.729.436-.433.856-.705 1.201-.867.346-.179.595-.248.595-.248L7.974 6.57c0 0-.193.067-.484.175-.285.13-.636.265-1.031.539-.39.281-.813.673-1.199 1.19-.394.495-.779 1.142-1.032 1.897-.249.76-.397 1.595-.377 2.457.015.861.155 1.754.519 2.527.354.787.881 1.447 1.481 1.951.586.514 1.224.919 1.848 1.217.622.297 1.229.492 1.733.604.516.106.925.165 1.201.175.272.007.412.002.412.002v-1.467c0 0-.204.01-.515-.027-.306-.037-.738-.113-1.18-.281-.453-.158-.907-.406-1.287-.761-.381-.357-.688-.798-.865-1.309-.183-.494-.224-1.074-.173-1.623.054-.532.198-1.048.382-1.504.187-.436.395-.793.592-1.06.204-.249.374-.408.51-.509.14-.087.202-.121.202-.121s-.126.04-.332.089c-.209.053-.486.193-.77.306-.297.148-.62.262-.948.495-.33.215-.654.512-.911.87-.264.35-.454.764-.581 1.177-.126.422-.218.834-.233 1.257zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.357.097-.861.228-1.402.43-.54.2-1.208.485-1.833.88-.609.398-1.274.882-1.729 1.533-.445.648-.78 1.418-.997 2.219-.205.821-.341 1.67-.232 2.527.109.815.326 1.63.705 2.32.372.708.957 1.269 1.578 1.717.624.445 1.279.79 1.916 1.028.652.23 1.28.36 1.788.429.521.062.926.096 1.2.96.268 0 .414-.021.414-.021v-1.142c0 0-.133.01-.322 0-.176-.011-.416-.028-.707-.082-.58-.105-1.323-.32-2.012-.711-.696-.385-1.35-1.042-1.653-1.918-.311-.84-.43-1.784-.317-2.682.101-.899.415-1.731.794-2.446.381-.698.834-1.287 1.262-1.729.436-.433.856-.705 1.201-.867.346-.179.595-.248.595-.248L18.974 6.57c0 0-.193.067-.484.175-.285.13-.636.265-1.031.539-.39.281-.813.673-1.199 1.19-.394.495-.779 1.142-1.032 1.897-.249.76-.397 1.595-.377 2.457.015.861.155 1.754.519 2.527.354.787.881 1.447 1.481 1.951.586.514 1.224.919 1.848 1.217.622.297 1.229.492 1.733.604.516.106.925.165 1.201.175.272.007.412.002.412.002v-1.467c0 0-.204.01-.515-.027-.306-.037-.738-.113-1.18-.281-.453-.158-.907-.406-1.287-.761-.381-.357-.688-.798-.865-1.309-.183-.494-.224-1.074-.173-1.623.054-.532.198-1.048.382-1.504.187-.436.395-.793.592-1.06.204-.249.374-.408.51-.509.14-.087.202-.121.202-.121s-.126.04-.332.089c-.209.053-.486.193-.77.306-.297.148-.62.262-.948.495-.33.215-.654.512-.911.87-.264.35-.454.764-.581 1.177-.126.422-.218.834-.233 1.257z" />
          </svg>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#d4af37]"></div>
          </div>
        ) : (
          <div className="rounded-lg p-8 shadow-lg relative overflow-hidden"> 
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10 backdrop-blur-sm"></div>
            <div className="absolute inset-0 opacity-10"
                 style={{ 
                   background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.8) 0%, rgba(212, 175, 55, 0.2) 70%, transparent 100%)',
                   backgroundSize: '20px 20px',
                   animation: 'shimmer 3s linear infinite'
                 }}></div>
            <div className="relative z-10">
              <blockquote className="font-playfair text-xl md:text-2xl italic mb-6 text-white gold-highlight">
                "{quote.text}"
              </blockquote>
              <div className="font-lora text-[#d4af37] text-sm">
                — {quote.author}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuoteSection;
