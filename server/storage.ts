import { 
  users, type User, type InsertUser,
  subscriptions, type Subscription, type InsertSubscription,
  plans, type Plan
} from "@shared/schema";
import fs from 'fs/promises';
import path from 'path';

// Define data types for content
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
  lucky?: {
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

export interface IStorage {
  // User operations
  getUserById(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Subscription operations
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  getSubscriptionByUserId(userId: number): Promise<Subscription | undefined>;
  checkPremiumStatus(userId: number): Promise<boolean>;
  
  // Plan operations
  getPlanById(id: string): Promise<Plan | undefined>;
  
  // Content operations
  getDailyAffirmation(date: string): Promise<Affirmation>;
  getDailyQuote(date: string): Promise<Quote>;
  getArticles(category?: string): Promise<Article[]>;
  getArticleById(id: number): Promise<Article | undefined>;
  getHoroscopeBySign(sign: string): Promise<HoroscopeResponse | undefined>;
  getDailyNumerology(date: string): Promise<NumerologyResponse>;
  calculateNameNumerology(name: string): Promise<NumerologyResponse>;
  calculateLifePathNumerology(birthdate: string): Promise<NumerologyResponse>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private subscriptions: Map<number, Subscription>;
  private plans: Map<string, Plan>;
  private affirmations: Affirmation[] = [];
  private quotes: Quote[] = [];
  private articles: Article[] = [];
  private horoscopes: HoroscopeResponse[] = [];
  private numerology: NumerologyResponse[] = [];
  
  private currentUserId: number = 1;
  private currentSubscriptionId: number = 1;
  
  constructor() {
    this.users = new Map();
    this.subscriptions = new Map();
    this.plans = new Map();
    
    // Initialize with default plans
    this.initializePlans();
    
    // Load content data
    this.loadData();
  }
  
  private async loadData() {
    try {
      // Load affirmations
      const affirmationsPath = path.join(process.cwd(), 'public', 'data', 'affirmations.json');
      const affirmationsData = await fs.readFile(affirmationsPath, 'utf-8');
      this.affirmations = JSON.parse(affirmationsData);
      
      // Load quotes
      const quotesPath = path.join(process.cwd(), 'public', 'data', 'quotes.json');
      const quotesData = await fs.readFile(quotesPath, 'utf-8');
      this.quotes = JSON.parse(quotesData);
      
      // Load articles
      const articlesPath = path.join(process.cwd(), 'public', 'data', 'articles.json');
      const articlesData = await fs.readFile(articlesPath, 'utf-8');
      this.articles = JSON.parse(articlesData);
      
      // Load horoscopes
      const horoscopesPath = path.join(process.cwd(), 'public', 'data', 'horoscope.json');
      const horoscopesData = await fs.readFile(horoscopesPath, 'utf-8');
      this.horoscopes = JSON.parse(horoscopesData);
      
      // Load numerology
      const numerologyPath = path.join(process.cwd(), 'public', 'data', 'numerology.json');
      const numerologyData = await fs.readFile(numerologyPath, 'utf-8');
      this.numerology = JSON.parse(numerologyData);
    } catch (error) {
      console.error('Error loading data:', error);
      // Initialize with empty arrays if files can't be loaded
      this.affirmations = [];
      this.quotes = [];
      this.articles = [];
      this.horoscopes = [];
      this.numerology = [];
    }
  }
  
  private initializePlans() {
    // Add default plans
    this.plans.set('trial', {
      id: 'trial',
      name: 'Mini Dostęp',
      description: 'Idealne na początek',
      price: 28,
      duration: 7,
      durationUnit: 'day'
    });
    
    this.plans.set('monthly', {
      id: 'monthly',
      name: 'Miesięczny',
      description: 'Elastyczność i wygoda',
      price: 68,
      duration: 1,
      durationUnit: 'month'
    });
    
    this.plans.set('annual', {
      id: 'annual',
      name: 'Roczny',
      description: 'Najlepsza wartość',
      price: 280,
      duration: 1,
      durationUnit: 'year'
    });
    
    this.plans.set('package', {
      id: 'package',
      name: 'Pojedynczy pakiet',
      description: 'Wybierz jedną kategorię',
      price: 48,
      duration: null,
      durationUnit: null
    });
  }
  
  // User operations
  async getUserById(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Subscription operations
  async createSubscription(insertSubscription: InsertSubscription): Promise<Subscription> {
    const id = this.currentSubscriptionId++;
    
    // Calculate expiration date if applicable
    let expiresAt: Date | null = null;
    const plan = await this.getPlanById(insertSubscription.planId);
    
    if (plan && plan.duration && plan.durationUnit) {
      expiresAt = new Date();
      
      if (plan.durationUnit === 'day') {
        expiresAt.setDate(expiresAt.getDate() + plan.duration);
      } else if (plan.durationUnit === 'month') {
        expiresAt.setMonth(expiresAt.getMonth() + plan.duration);
      } else if (plan.durationUnit === 'year') {
        expiresAt.setFullYear(expiresAt.getFullYear() + plan.duration);
      }
    }
    
    const subscription: Subscription = {
      ...insertSubscription,
      id,
      createdAt: new Date(),
      expiresAt,
      stripeCustomerId: insertSubscription.stripeCustomerId || null,
      stripeSubscriptionId: insertSubscription.stripeSubscriptionId || null
    };
    
    this.subscriptions.set(id, subscription);
    return subscription;
  }
  
  async getSubscriptionByUserId(userId: number): Promise<Subscription | undefined> {
    return Array.from(this.subscriptions.values()).find(
      (subscription) => subscription.userId === userId,
    );
  }
  
  async checkPremiumStatus(userId: number): Promise<boolean> {
    const subscription = await this.getSubscriptionByUserId(userId);
    
    if (!subscription) {
      return false;
    }
    
    // Check if it's a package (no expiration)
    if (!subscription.expiresAt) {
      return true;
    }
    
    // Check if subscription is still valid
    return new Date() < subscription.expiresAt;
  }
  
  // Plan operations
  async getPlanById(id: string): Promise<Plan | undefined> {
    return this.plans.get(id);
  }
  
  // Content operations
  async getDailyAffirmation(date: string): Promise<Affirmation> {
    // Use date string to deterministically select an affirmation
    const dateNum = new Date(date).getDate();
    const index = dateNum % this.affirmations.length;
    
    if (this.affirmations.length === 0) {
      return {
        id: 0,
        text: "Jestem magnesem na bogactwo i obfitość. Przyciągam do siebie wszystko, czego potrzebuję i pragnę.",
        category: "wealth",
        isPremium: false
      };
    }
    
    return this.affirmations[index];
  }
  
  async getDailyQuote(date: string): Promise<Quote> {
    // Use date string to deterministically select a quote
    const dateNum = new Date(date).getDate();
    const index = dateNum % this.quotes.length;
    
    if (this.quotes.length === 0) {
      return {
        id: 0,
        text: "Bogactwo zaczyna się od bogactwa umysłu. Każda myśl tworzy twoją przyszłą rzeczywistość.",
        author: "Louise Hay"
      };
    }
    
    return this.quotes[index];
  }
  
  async getArticles(category?: string): Promise<Article[]> {
    if (category) {
      return this.articles.filter(article => article.category === category);
    }
    
    return this.articles;
  }
  
  async getArticleById(id: number): Promise<Article | undefined> {
    return this.articles.find(article => article.id === id);
  }
  
  async getHoroscopeBySign(sign: string): Promise<HoroscopeResponse | undefined> {
    return this.horoscopes.find(horoscope => horoscope.sign.toLowerCase() === sign.toLowerCase());
  }
  
  async getDailyNumerology(date: string): Promise<NumerologyResponse> {
    // Calculate day number (1-9)
    const day = new Date(date).getDate();
    let dayNumber = day;
    
    // Reduce to a single digit
    while (dayNumber > 9) {
      dayNumber = String(dayNumber).split('').reduce(
        (sum, digit) => sum + parseInt(digit, 10), 0
      );
    }
    
    const numerologyResponse = this.numerology.find(num => num.number === dayNumber);
    
    if (numerologyResponse) {
      return numerologyResponse;
    }
    
    // Fallback
    return {
      number: dayNumber,
      meaning: `Dzień pod wpływem liczby ${dayNumber} sprzyja refleksji i rozwojowi osobistemu.`
    };
  }
  
  async calculateNameNumerology(name: string): Promise<NumerologyResponse> {
    const normalizedName = name.toLowerCase().trim();
    let sum = 0;
    
    for (let i = 0; i < normalizedName.length; i++) {
      const char = normalizedName.charAt(i);
      const charCode = char.charCodeAt(0) - 96; // 'a' is 97 in ASCII
      
      if (charCode > 0 && charCode < 27) {
        sum += charCode;
      }
    }
    
    // Reduce to a single digit, unless it's a master number
    let nameNumber = sum;
    while (nameNumber > 9 && nameNumber !== 11 && nameNumber !== 22 && nameNumber !== 33) {
      nameNumber = String(nameNumber).split('').reduce(
        (sum, digit) => sum + parseInt(digit, 10), 0
      );
    }
    
    const numerologyResponse = this.numerology.find(num => num.number === nameNumber);
    
    if (numerologyResponse) {
      return numerologyResponse;
    }
    
    // Fallback
    return {
      number: nameNumber,
      meaning: `Liczba ${nameNumber} symbolizuje twoją esencję i główne cechy twojego charakteru.`
    };
  }
  
  async calculateLifePathNumerology(birthdate: string): Promise<NumerologyResponse> {
    const parts = birthdate.split('-');
    if (parts.length !== 3) {
      throw new Error('Invalid date format. Use YYYY-MM-DD');
    }
    
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    
    // Calculate day, month, and year numbers
    const dayNum = this.reduceSingleDigit(parseInt(day, 10));
    const monthNum = this.reduceSingleDigit(parseInt(month, 10));
    const yearNum = this.reduceSingleDigit(parseInt(year, 10));
    
    // Calculate life path number
    let lifePathNumber = this.reduceSingleDigit(dayNum + monthNum + yearNum);
    
    const numerologyResponse = this.numerology.find(num => num.number === lifePathNumber);
    
    if (numerologyResponse) {
      return numerologyResponse;
    }
    
    // Fallback
    return {
      number: lifePathNumber,
      meaning: `Twoja ścieżka życia to ${lifePathNumber}, co wskazuje na główne zadania i cele w twoim życiu.`
    };
  }
  
  private reduceSingleDigit(num: number): number {
    // Keep master numbers
    if (num === 11 || num === 22 || num === 33) {
      return num;
    }
    
    while (num > 9) {
      num = String(num).split('').reduce(
        (sum, digit) => sum + parseInt(digit, 10), 0
      );
    }
    
    return num;
  }
}

export const storage = new MemStorage();
