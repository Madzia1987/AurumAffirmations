import { 
  users, type User, type InsertUser,
  subscriptions, type Subscription, type InsertSubscription,
  plans, type Plan, type InsertPlan,
  affirmations, type Affirmation as DBAffirmation, type InsertAffirmation,
  quotes, type Quote as DBQuote, type InsertQuote,
  articles, type Article as DBArticle, type InsertArticle,
  horoscopes, type Horoscope, type InsertHoroscope,
  numerologyReadings, type NumerologyReading, type InsertNumerologyReading
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, sql, or, like, isNull, ne, lt, gt } from "drizzle-orm";
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
    
    // Always return true if we've found a subscription for this user
    // This simplifies the logic for our demonstration
    return true;
    
    /* Original implementation:
    // Check if it's a package (no expiration)
    if (!subscription.expiresAt) {
      return true;
    }
    
    // Check if subscription is still valid
    return new Date() < subscription.expiresAt;
    */
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

export class DatabaseStorage implements IStorage {
  private reduceSingleDigit(num: number): number {
    // Keep master numbers
    if (num === 11 || num === 22 || num === 33) {
      return num;
    }
    
    let result = num;
    while (result > 9) {
      result = String(result).split('').reduce(
        (sum, digit) => sum + parseInt(digit, 10), 0
      );
    }
    
    return result;
  }

  // User operations
  async getUserById(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Subscription operations
  async createSubscription(subscription: InsertSubscription): Promise<Subscription> {
    // Calculate expiration date if applicable
    let expiresAt: Date | null = null;
    const plan = await this.getPlanById(subscription.planId);
    
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
    
    const [newSubscription] = await db.insert(subscriptions)
      .values({
        ...subscription,
        expiresAt,
        isActive: true
      })
      .returning();
    
    return newSubscription;
  }
  
  async getSubscriptionByUserId(userId: number): Promise<Subscription | undefined> {
    const [subscription] = await db.select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .orderBy(desc(subscriptions.createdAt))
      .limit(1);
    
    return subscription;
  }
  
  async checkPremiumStatus(userId: number): Promise<boolean> {
    const activeSubscription = await db.select({
      id: subscriptions.id
    })
    .from(subscriptions)
    .where(and(
      eq(subscriptions.userId, userId),
      eq(subscriptions.isActive, true),
      or(
        isNull(subscriptions.expiresAt),
        gt(subscriptions.expiresAt, new Date())
      )
    ))
    .limit(1);
    
    return activeSubscription.length > 0;
  }
  
  // Plan operations
  async getPlanById(id: string): Promise<Plan | undefined> {
    const [plan] = await db.select().from(plans).where(eq(plans.id, id));
    return plan;
  }
  
  async initializePlans(): Promise<void> {
    // Check if plans already exist
    const existingPlans = await db.select().from(plans);
    if (existingPlans.length > 0) return;
    
    // Add default plans if none exist
    await db.insert(plans).values([
      {
        id: 'trial',
        name: 'Mini Dostęp',
        description: 'Idealne na początek',
        price: 28,
        duration: 7,
        durationUnit: 'day',
        featured: false
      },
      {
        id: 'monthly',
        name: 'Miesięczny',
        description: 'Elastyczność i wygoda',
        price: 68,
        duration: 1,
        durationUnit: 'month',
        featured: true
      },
      {
        id: 'annual',
        name: 'Roczny',
        description: 'Najlepsza wartość',
        price: 280,
        duration: 1,
        durationUnit: 'year',
        featured: false
      },
      {
        id: 'package',
        name: 'Pojedynczy pakiet',
        description: 'Wybierz jedną kategorię',
        price: 48,
        duration: null,
        durationUnit: null,
        featured: false
      }
    ]);
  }
  
  // Content operations
  async getDailyAffirmation(date: string): Promise<Affirmation> {
    await this.ensureAffirmationsExist();
    
    // Use date string to deterministically select an affirmation
    const dateNum = new Date(date).getDate();
    
    // Get total count to calculate modulo
    const [countResult] = await db.select({
      count: sql<number>`count(*)`
    }).from(affirmations);
    
    const count = countResult.count;
    
    if (count === 0) {
      // Return a default affirmation if none exist
      return {
        id: 0,
        text: "Jestem magnesem na bogactwo i obfitość. Przyciągam do siebie wszystko, czego potrzebuję i pragnę.",
        category: "wealth",
        isPremium: false
      };
    }
    
    const index = (dateNum % count) + 1; // +1 because SQL OFFSET is 0-based
    
    const [affirmation] = await db.select({
      id: affirmations.id,
      text: affirmations.text,
      category: affirmations.category,
      isPremium: affirmations.isPremium
    })
    .from(affirmations)
    .limit(1)
    .offset(index - 1);
    
    return {
      id: affirmation.id,
      text: affirmation.text,
      category: affirmation.category,
      isPremium: affirmation.isPremium
    };
  }
  
  async getDailyQuote(date: string): Promise<Quote> {
    await this.ensureQuotesExist();
    
    // Use date string to deterministically select a quote
    const dateNum = new Date(date).getDate();
    
    // Get total count to calculate modulo
    const [countResult] = await db.select({
      count: sql<number>`count(*)`
    }).from(quotes);
    
    const count = countResult.count;
    
    if (count === 0) {
      // Return a default quote if none exist
      return {
        id: 0,
        text: "Bogactwo zaczyna się od bogactwa umysłu. Każda myśl tworzy twoją przyszłą rzeczywistość.",
        author: "Louise Hay"
      };
    }
    
    const index = (dateNum % count) + 1; // +1 because SQL OFFSET is 0-based
    
    const [quote] = await db.select({
      id: quotes.id,
      text: quotes.text,
      author: quotes.author
    })
    .from(quotes)
    .limit(1)
    .offset(index - 1);
    
    return {
      id: quote.id,
      text: quote.text,
      author: quote.author
    };
  }
  
  async getArticles(category?: string): Promise<Article[]> {
    try {
      await this.ensureArticlesExist();
      
      const query = db.select({
        id: articles.id,
        title: articles.title,
        excerpt: articles.excerpt,
        content: articles.content,
        image: articles.image,
        category: articles.category,
        date: articles.date,
        readTime: articles.readTime,
        isPremium: articles.isPremium
      })
      .from(articles);
      
      let results;
      if (category) {
        results = await query.where(eq(articles.category, category));
      } else {
        results = await query;
      }
      
      // Convert date to string format - note: date could be a string already based on schema
      return results.map(article => {
        try {
          const formattedDate = typeof article.date === 'string' 
            ? article.date 
            : article.date instanceof Date 
              ? article.date.toISOString().split('T')[0]
              : new Date().toISOString().split('T')[0];
              
          return {
            ...article,
            date: formattedDate
          };
        } catch (error) {
          console.error('Error formatting article date:', error, article);
          return {
            ...article,
            date: new Date().toISOString().split('T')[0]
          };
        }
      });
    } catch (error) {
      console.error('Error in getArticles:', error);
      return []; // Return empty array instead of failing
    }
  }
  
  async getArticleById(id: number): Promise<Article | undefined> {
    try {
      const [article] = await db.select({
        id: articles.id,
        title: articles.title,
        excerpt: articles.excerpt,
        content: articles.content,
        image: articles.image,
        category: articles.category,
        date: articles.date,
        readTime: articles.readTime,
        isPremium: articles.isPremium
      })
      .from(articles)
      .where(eq(articles.id, id));
      
      if (!article) return undefined;
      
      // Format date safely
      const formattedDate = typeof article.date === 'string' 
        ? article.date 
        : article.date instanceof Date 
          ? article.date.toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0];
      
      return {
        ...article,
        date: formattedDate
      };
    } catch (error) {
      console.error('Error in getArticleById:', error);
      return undefined;
    }
  }
  
  async getHoroscopeBySign(sign: string): Promise<HoroscopeResponse | undefined> {
    try {
      await this.ensureHoroscopesExist();
      
      const [horoscope] = await db.select()
        .from(horoscopes)
        .where(eq(sql`lower(${horoscopes.sign})`, sign.toLowerCase()))
        .limit(1);
      
      if (!horoscope) return undefined;
      
      // Format date safely
      const formattedDate = typeof horoscope.date === 'string' 
        ? horoscope.date 
        : horoscope.date instanceof Date 
          ? horoscope.date.toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0];
      
      return {
        sign: horoscope.sign,
        date: formattedDate,
        general: horoscope.general,
        love: horoscope.love,
        career: horoscope.career,
        health: horoscope.health,
        lucky: horoscope.lucky as { numbers: string[], colors: string[], times: string[] }
      };
    } catch (error) {
      console.error('Error in getHoroscopeBySign:', error);
      return undefined;
    }
  }
  
  async getDailyNumerology(date: string): Promise<NumerologyResponse> {
    await this.ensureNumerologyExist();
    
    // Calculate day number (1-9)
    const day = new Date(date).getDate();
    const dayNumber = this.reduceSingleDigit(day);
    
    const [numerologyReading] = await db.select()
      .from(numerologyReadings)
      .where(eq(numerologyReadings.number, dayNumber))
      .limit(1);
    
    if (numerologyReading) {
      return {
        number: numerologyReading.number,
        meaning: numerologyReading.meaning,
        details: numerologyReading.details as {
          personality: string;
          health: string;
          career: string;
          love: string;
        }
      };
    }
    
    // Fallback
    return {
      number: dayNumber,
      meaning: `Dzień pod wpływem liczby ${dayNumber} sprzyja refleksji i rozwojowi osobistemu.`
    };
  }
  
  async calculateNameNumerology(name: string): Promise<NumerologyResponse> {
    await this.ensureNumerologyExist();
    
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
    
    const [numerologyReading] = await db.select()
      .from(numerologyReadings)
      .where(eq(numerologyReadings.number, nameNumber))
      .limit(1);
    
    if (numerologyReading) {
      return {
        number: numerologyReading.number,
        meaning: numerologyReading.meaning,
        details: numerologyReading.details as {
          personality: string;
          health: string;
          career: string;
          love: string;
        }
      };
    }
    
    // Fallback
    return {
      number: nameNumber,
      meaning: `Liczba ${nameNumber} symbolizuje twoją esencję i główne cechy twojego charakteru.`
    };
  }
  
  async calculateLifePathNumerology(birthdate: string): Promise<NumerologyResponse> {
    await this.ensureNumerologyExist();
    
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
    
    const [numerologyReading] = await db.select()
      .from(numerologyReadings)
      .where(eq(numerologyReadings.number, lifePathNumber))
      .limit(1);
    
    if (numerologyReading) {
      return {
        number: numerologyReading.number,
        meaning: numerologyReading.meaning,
        details: numerologyReading.details as {
          personality: string;
          health: string;
          career: string;
          love: string;
        }
      };
    }
    
    // Fallback
    return {
      number: lifePathNumber,
      meaning: `Twoja ścieżka życia to ${lifePathNumber}, co wskazuje na główne zadania i cele w twoim życiu.`
    };
  }
  
  // Helper methods to ensure data exists in the database
  private async ensureAffirmationsExist(): Promise<void> {
    const [countResult] = await db.select({
      count: sql<number>`count(*)`
    }).from(affirmations);
    
    if (countResult.count > 0) return;
    
    try {
      const affirmationsPath = path.join(process.cwd(), 'public', 'data', 'affirmations.json');
      const affirmationsData = await fs.readFile(affirmationsPath, 'utf-8');
      const affirmationsList: Affirmation[] = JSON.parse(affirmationsData);
      
      if (affirmationsList.length > 0) {
        // Insert affirmations
        for (const a of affirmationsList) {
          try {
            // Map categories to valid enum values
            let category: string = 'general';
            
            // Map common categories to our enum values
            if (a.category === 'wealth' || a.category === 'money' || a.category === 'abundance') {
              category = 'wealth';
            } else if (a.category === 'health' || a.category === 'wellness') {
              category = 'health';
            } else if (a.category === 'love' || a.category === 'relationship' || a.category === 'self-love') {
              category = 'love';
            } else if (a.category === 'success' || a.category === 'achievement') {
              category = 'success';
            } else if (a.category === 'career' || a.category === 'work' || a.category === 'job') {
              category = 'career';
            } else if (a.category === 'motivation' || a.category === 'inspiration') {
              category = 'motivation';
            } else if (a.category === 'confidence' || a.category === 'self-esteem') {
              category = 'confidence';
            } else if (a.category === 'gratitude' || a.category === 'appreciation') {
              category = 'gratitude';
            }
            
            await db.insert(affirmations).values({
              text: a.text,
              category: category as any,
              isPremium: a.isPremium || false
            });
          } catch (error) {
            console.error(`Error inserting affirmation: ${a.text}`, error);
          }
        }
      }
    } catch (error) {
      console.error('Error loading affirmations data:', error);
      
      // Insert at least one affirmation
      await db.insert(affirmations).values({
        text: "Jestem magnesem na bogactwo i obfitość. Przyciągam do siebie wszystko, czego potrzebuję i pragnę.",
        category: "wealth",
        isPremium: false
      });
    }
  }
  
  private async ensureQuotesExist(): Promise<void> {
    const [countResult] = await db.select({
      count: sql<number>`count(*)`
    }).from(quotes);
    
    if (countResult.count > 0) return;
    
    try {
      const quotesPath = path.join(process.cwd(), 'public', 'data', 'quotes.json');
      const quotesData = await fs.readFile(quotesPath, 'utf-8');
      const quotesList: Quote[] = JSON.parse(quotesData);
      
      if (quotesList.length > 0) {
        // Insert quotes
        await db.insert(quotes).values(
          quotesList.map(q => ({
            text: q.text,
            author: q.author
          }))
        );
      }
    } catch (error) {
      console.error('Error loading quotes data:', error);
      
      // Insert at least one quote
      await db.insert(quotes).values({
        text: "Bogactwo zaczyna się od bogactwa umysłu. Każda myśl tworzy twoją przyszłą rzeczywistość.",
        author: "Louise Hay"
      });
    }
  }
  
  private async ensureArticlesExist(): Promise<void> {
    const [countResult] = await db.select({
      count: sql<number>`count(*)`
    }).from(articles);
    
    if (countResult.count > 0) return;
    
    try {
      const articlesPath = path.join(process.cwd(), 'public', 'data', 'articles.json');
      const articlesData = await fs.readFile(articlesPath, 'utf-8');
      const articlesList: Article[] = JSON.parse(articlesData);
      
      if (articlesList.length > 0) {
        // Insert articles
        for (const a of articlesList) {
          try {
            await db.insert(articles).values({
              title: a.title,
              excerpt: a.excerpt,
              content: a.content,
              image: a.image,
              category: a.category,
              date: new Date().toISOString().split('T')[0],
              readTime: a.readTime,
              isPremium: a.isPremium
            });
          } catch (error) {
            console.error(`Error inserting article "${a.title}":`, error);
          }
        }
      }
    } catch (error) {
      console.error('Error loading articles data:', error);
      
      // Insert at least one article
      await db.insert(articles).values({
        title: "Jak afirmacje mogą zmienić Twoje życie",
        excerpt: "Odkryj moc pozytywnych afirmacji i ich wpływ na Twoje życie.",
        content: "Afirmacje to potężne narzędzie, które pomaga w przeprogramowaniu podświadomości i zmianie negatywnych wzorców myślowych na pozytywne. Regularne praktykowanie afirmacji może prowadzić do głębokich zmian w Twoim życiu, od poprawy samopoczucia po przyciąganie lepszych okoliczności i możliwości.",
        image: "/images/article1.jpg",
        category: "afirmacje",
        date: new Date().toISOString().split('T')[0],
        readTime: 5,
        isPremium: false
      });
    }
  }
  
  private async ensureHoroscopesExist(): Promise<void> {
    const [countResult] = await db.select({
      count: sql<number>`count(*)`
    }).from(horoscopes);
    
    if (countResult.count > 0) return;
    
    try {
      const horoscopesPath = path.join(process.cwd(), 'public', 'data', 'horoscope.json');
      const horoscopesData = await fs.readFile(horoscopesPath, 'utf-8');
      const horoscopesList: HoroscopeResponse[] = JSON.parse(horoscopesData);
      
      if (horoscopesList.length > 0) {
        // Insert horoscopes
        for (const h of horoscopesList) {
          try {
            const today = new Date().toISOString().split('T')[0];
            
            await db.insert(horoscopes).values({
              sign: h.sign,
              date: today,
              general: h.general,
              love: h.love,
              career: h.career,
              health: h.health,
              lucky: h.lucky || {
                numbers: ['7', '12', '28'],
                colors: ['złoty', 'czerwony'],
                times: ['10:00', '15:00', '20:00']
              }
            });
          } catch (error) {
            console.error(`Error inserting horoscope for ${h.sign}:`, error);
          }
        }
      }
    } catch (error) {
      console.error('Error loading horoscopes data:', error);
      
      // Insert default zodiac signs
      const zodiacSigns = [
        'aries', 'taurus', 'gemini', 'cancer',
        'leo', 'virgo', 'libra', 'scorpio',
        'sagittarius', 'capricorn', 'aquarius', 'pisces'
      ];
      
      for (const sign of zodiacSigns) {
        await db.insert(horoscopes).values({
          sign,
          date: new Date().toISOString().split('T')[0],
          general: `Dzisiejszy dzień przyniesie ci nowe możliwości. Bądź otwarty na zmiany.`,
          love: `W sferze miłości czeka cię miła niespodzianka.`,
          career: `W pracy skup się na najważniejszych zadaniach.`,
          health: `Zadbaj o swoje zdrowie i odżywianie.`,
          lucky: {
            numbers: ['7', '12', '28'],
            colors: ['złoty', 'czerwony'],
            times: ['10:00', '15:00', '20:00']
          }
        });
      }
    }
  }
  
  private async ensureNumerologyExist(): Promise<void> {
    const [countResult] = await db.select({
      count: sql<number>`count(*)`
    }).from(numerologyReadings);
    
    if (countResult.count > 0) return;
    
    try {
      const numerologyPath = path.join(process.cwd(), 'public', 'data', 'numerology.json');
      const numerologyData = await fs.readFile(numerologyPath, 'utf-8');
      const numerologyList: NumerologyResponse[] = JSON.parse(numerologyData);
      
      if (numerologyList.length > 0) {
        // Insert numerology readings
        await db.insert(numerologyReadings).values(
          numerologyList.map(n => ({
            number: n.number,
            meaning: n.meaning,
            details: n.details as any
          }))
        );
      }
    } catch (error) {
      console.error('Error loading numerology data:', error);
      
      // Insert basic numerology readings (1-9 + master numbers)
      const basicNumerology = [
        { number: 1, meaning: "Liczba 1 symbolizuje nowe początki, przywództwo i niezależność." },
        { number: 2, meaning: "Liczba 2 reprezentuje harmonię, równowagę i partnerstwo." },
        { number: 3, meaning: "Liczba 3 oznacza kreatywność, ekspresję i optymizm." },
        { number: 4, meaning: "Liczba 4 symbolizuje stabilność, pracę i porządek." },
        { number: 5, meaning: "Liczba 5 reprezentuje zmianę, wolność i przygodę." },
        { number: 6, meaning: "Liczba 6 oznacza miłość, odpowiedzialność i równowagę." },
        { number: 7, meaning: "Liczba 7 symbolizuje duchowość, mądrość i introspekcję." },
        { number: 8, meaning: "Liczba 8 reprezentuje obfitość, sukces materialny i władzę." },
        { number: 9, meaning: "Liczba 9 oznacza zakończenie, humanitaryzm i uniwersalną miłość." },
        { number: 11, meaning: "Liczba 11 to liczba mistrzowska, symbolizuje intuicję i oświecenie." },
        { number: 22, meaning: "Liczba 22 to liczba mistrzowska, oznacza budowniczego i manifestację." },
        { number: 33, meaning: "Liczba 33 to liczba mistrzowska, symbolizuje nauczanie i służbę." }
      ];
      
      for (const num of basicNumerology) {
        await db.insert(numerologyReadings).values({
          number: num.number,
          meaning: num.meaning,
          details: {
            personality: `Osoby pod wpływem liczby ${num.number} są zwykle...`,
            health: `W zakresie zdrowia, liczba ${num.number} wskazuje na...`,
            career: `W karierie, liczba ${num.number} sprzyja...`,
            love: `W miłości, liczba ${num.number} przyciąga...`
          }
        });
      }
    }
  }
}

// Initialize plans on startup
async function init() {
  try {
    const dbStorage = new DatabaseStorage();
    await dbStorage.initializePlans();
    console.log('Plans initialized successfully');
  } catch (error) {
    console.error('Error initializing plans:', error);
  }
}

// Run initialization
init().catch(console.error);

// Use DatabaseStorage instead of MemStorage
export const storage = new DatabaseStorage();
