import { API_KEYS } from './constants';

export interface Affirmation {
  id: number;
  text: string;
  category: string;
  isPremium: boolean;
}

export interface Quote {
  id: number;
  text: string;
  author: string;
}

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: number;
  isPremium: boolean;
}

export interface HoroscopeResponse {
  sign: string;
  date: string;
  general: string;
  love: string;
  career: string;
  health: string;
  lucky: {
    numbers: string[];
    colors: string[];
    times: string[];
  };
}

export interface NumerologyResponse {
  number: number;
  meaning: string;
  details?: {
    personality: string;
    health: string;
    career: string;
    love: string;
  };
}

// Fetch daily affirmation
export const getDailyAffirmation = async (): Promise<Affirmation> => {
  const response = await fetch('/api/daily-affirmation');
  
  if (!response.ok) {
    throw new Error('Failed to fetch daily affirmation');
  }
  
  return response.json();
};

// Fetch daily quote
export const getDailyQuote = async (): Promise<Quote> => {
  const response = await fetch('/api/daily-quote');
  
  if (!response.ok) {
    throw new Error('Failed to fetch daily quote');
  }
  
  return response.json();
};

// Fetch articles
export const getArticles = async (category?: string): Promise<Article[]> => {
  const url = category ? `/api/articles?category=${category}` : '/api/articles';
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }
  
  return response.json();
};

// Fetch article by ID
export const getArticleById = async (id: number): Promise<Article> => {
  const response = await fetch(`/api/articles/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch article');
  }
  
  return response.json();
};

// Fetch horoscope by sign
export const getHoroscopeBySign = async (sign: string): Promise<HoroscopeResponse> => {
  const response = await fetch(`/api/horoscope/${sign}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch horoscope');
  }
  
  return response.json();
};

// Calculate numerology by name
export const calculateNameNumerology = async (name: string): Promise<NumerologyResponse> => {
  const response = await fetch(`/api/numerology/name?value=${encodeURIComponent(name)}`);
  
  if (!response.ok) {
    throw new Error('Failed to calculate name numerology');
  }
  
  return response.json();
};

// Calculate life path numerology by birth date
export const calculateLifePathNumerology = async (birthdate: string): Promise<NumerologyResponse> => {
  const response = await fetch(`/api/numerology/lifepath?birthdate=${encodeURIComponent(birthdate)}`);
  
  if (!response.ok) {
    throw new Error('Failed to calculate life path numerology');
  }
  
  return response.json();
};

// Get daily numerology
export const getDailyNumerology = async (): Promise<NumerologyResponse> => {
  const response = await fetch('/api/numerology/daily');
  
  if (!response.ok) {
    throw new Error('Failed to fetch daily numerology');
  }
  
  return response.json();
};

// Premium access API endpoints
export interface PaymentPlanResponse {
  clientSecret: string;
}

export const createPaymentIntent = async (planId: string): Promise<PaymentPlanResponse> => {
  const response = await fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ planId }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create payment intent');
  }
  
  return response.json();
};

export const checkPremiumStatus = async (): Promise<{isPremium: boolean}> => {
  const response = await fetch('/api/check-premium', {
    credentials: 'include'
  });
  
  if (!response.ok) {
    throw new Error('Failed to check premium status');
  }
  
  return response.json();
};
