export const API_KEYS = {
  horoscope: "0da58ce5bdmsh0998ff758b71b1ep164a5bjsna9a4ca3fd638",
  numerology: "0da58ce5bdmsh0998ff758b71b1ep164a5bjsna9a4ca3fd638",
  stripe: import.meta.env.VITE_STRIPE_PUBLIC_KEY || ""
};

export const ZODIAC_SIGNS = [
  { id: "aries", name: "Baran", dateRange: "21.03-19.04" },
  { id: "taurus", name: "Byk", dateRange: "20.04-20.05" },
  { id: "gemini", name: "Bliźnięta", dateRange: "21.05-20.06" },
  { id: "cancer", name: "Rak", dateRange: "21.06-22.07" },
  { id: "leo", name: "Lew", dateRange: "23.07-22.08" },
  { id: "virgo", name: "Panna", dateRange: "23.08-22.09" },
  { id: "libra", name: "Waga", dateRange: "23.09-22.10" },
  { id: "scorpio", name: "Skorpion", dateRange: "23.10-21.11" },
  { id: "sagittarius", name: "Strzelec", dateRange: "22.11-21.12" },
  { id: "capricorn", name: "Koziorożec", dateRange: "22.12-19.01" },
  { id: "aquarius", name: "Wodnik", dateRange: "20.01-18.02" },
  { id: "pisces", name: "Ryby", dateRange: "19.02-20.03" }
];

export const PREMIUM_PLANS = {
  trial: {
    id: "trial",
    name: "Mini Dostęp",
    description: "Idealne na początek",
    price: 28,
    period: "7 dni",
    billingPeriod: "tydzień",
    duration: {
      value: 7,
      unit: "day"
    },
    features: [
      "Pełny dostęp premium przez 7 dni",
      "Wszystkie kategorie afirmacji",
      "Dostęp do medytacji i rytuałów",
      "Pełne analizy numerologiczne"
    ]
  },
  monthly: {
    id: "monthly",
    name: "Miesięczny",
    description: "Elastyczność i wygoda",
    price: 68,
    period: "miesiąc",
    billingPeriod: "miesiąc",
    duration: {
      value: 1,
      unit: "month"
    },
    features: [
      "Pełny miesięczny dostęp premium",
      "Wszystkie kategorie afirmacji",
      "Dostęp do medytacji i rytuałów",
      "Pełne analizy numerologiczne",
      "Nowe treści co tydzień"
    ],
    featured: true
  },
  annual: {
    id: "annual",
    name: "Roczny",
    description: "Najlepsza wartość",
    price: 280,
    period: "rok",
    billingPeriod: "rok",
    duration: {
      value: 1,
      unit: "year"
    },
    features: [
      "Pełny roczny dostęp premium",
      "Wszystkie kategorie afirmacji",
      "Dostęp do medytacji i rytuałów",
      "Pełne analizy numerologiczne",
      "Nowe treści co tydzień",
      "Oszczędzasz 536 zł rocznie!"
    ]
  },
  package: {
    id: "package",
    name: "Pojedynczy pakiet",
    description: "Wybierz jedną kategorię",
    price: 48,
    period: "jednorazowo",
    billingPeriod: "jednorazowo",
    duration: {
      value: 99999, // Effectively forever
      unit: "day"
    },
    features: [
      "Dostęp do wybranej kategorii",
      "Afirmacje w wybranej kategorii",
      "Rytuały w wybranej kategorii",
      "Dożywotni dostęp do zakupionego pakietu"
    ]
  }
};

export const PREMIUM_CATEGORIES = [
  {
    id: "self-love",
    name: "Miłość Własna",
    description: "Afirmacje i rytuały wzmacniające miłość do siebie i poczucie własnej wartości.",
    icon: "heart",
    image: "https://images.unsplash.com/photo-1484627147104-f5197bcd6651?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "confidence",
    name: "Pewność Siebie",
    description: "Techniki budowania prawdziwej, głębokiej pewności siebie i odwagi.",
    icon: "crown",
    image: "https://images.unsplash.com/photo-1525721653822-f9975a57cd4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "wealth",
    name: "Bogactwo i Obfitość",
    description: "Afirmacje i rytuały przyciągające dobrobyt, pieniądze i obfitość.",
    icon: "coins",
    image: "https://images.unsplash.com/photo-1565514020179-026b92b4c4b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "business",
    name: "Sukces w Biznesie",
    description: "Specjalne afirmacje dla kobiet przedsiębiorczych i liderek biznesu.",
    icon: "briefcase",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "mindset",
    name: "Mentalność Bilionerki",
    description: "Afirmacje i techniki rozwoju mentalności obfitości i duchowego bogactwa.",
    icon: "brain",
    image: "https://images.unsplash.com/photo-1589561253898-768105ca91a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  }
];
