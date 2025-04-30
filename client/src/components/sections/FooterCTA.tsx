import { Link } from 'wouter';

const FooterCTA = () => {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 relative overflow-hidden mermaid-holographic">
      <div className="absolute inset-0 holographic-scales premium-gold"></div>
      <div className="absolute inset-0 bg-sparkles"></div>
      
      <div className="container mx-auto max-w-3xl text-center relative z-10">
        <h2 className="font-playfair text-4xl font-bold mb-6 text-white gold-highlight">Rozpocznij swoją transformację już dziś</h2>
        <p className="text-lg mb-10 text-white/80 max-w-2xl mx-auto font-medium">
          Dołącz do tysięcy kobiet, które odkryły swoją wewnętrzną moc i przyciągają obfitość każdego dnia.
        </p>
        
        <Link href="/premium" className="inline-flex items-center gold-btn py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
          <span className="mr-2">Dołącz do Aurum Premium</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        
        <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-6">
          <div className="flex items-center text-[#d4af37]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Dostęp Premium</span>
          </div>
          <div className="flex items-center text-[#d4af37]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Codzienne inspiracje</span>
          </div>
        </div>
      </div>
      
      {/* Ozdobne elementy */}
      <div className="absolute left-4 bottom-4 opacity-30">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-[#d4af37]" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd" />
        </svg>
      </div>
      <div className="absolute right-4 top-4 opacity-30">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-[#d4af37]" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
        </svg>
      </div>
    </section>
  );
};

export default FooterCTA;
