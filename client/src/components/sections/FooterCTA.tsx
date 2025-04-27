import { Link } from 'wouter';

const FooterCTA = () => {
  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 bg-gold text-white">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="font-playfair text-3xl font-bold mb-6">Rozpocznij swoją transformację już dziś</h2>
        <p className="text-lg mb-8 text-cream opacity-90">Dołącz do tysięcy kobiet, które odkryły swoją wewnętrzną moc i przyciągają obfitość każdego dnia.</p>
        
        <Link href="/premium">
          <a className="inline-block bg-white text-gold font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
            Dołącz do Aurum Premium
          </a>
        </Link>
      </div>
    </section>
  );
};

export default FooterCTA;
