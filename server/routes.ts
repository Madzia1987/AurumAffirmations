import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import axios from "axios";
import { storage } from "./storage";
import { insertUserSchema, insertSubscriptionSchema } from "@shared/schema";
import { z } from "zod";

const API_KEYS = {
  horoscope: process.env.API_KEY_HOROSCOPE || "0da58ce5bdmsh0998ff758b71b1ep164a5bjsna9a4ca3fd638",
  numerology: process.env.API_KEY_NUMEROLOGY || "0da58ce5bdmsh0998ff758b71b1ep164a5bjsna9a4ca3fd638"
};

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('Missing Stripe secret key. Payment functionality will be limited.');
}

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

// Horoscope API configuration
const horoscopeOptions = {
  method: 'GET',
  url: 'https://horoscope-api.p.rapidapi.com/horoscope',
  headers: {
    'X-RapidAPI-Key': API_KEYS.horoscope,
    'X-RapidAPI-Host': 'horoscope-api.p.rapidapi.com'
  }
};

// Numerology API configuration
const numerologyOptions = {
  method: 'GET',
  url: 'https://numerologyapi.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': API_KEYS.numerology,
    'X-RapidAPI-Host': 'numerologyapi.p.rapidapi.com'
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Daily affirmations
  app.get("/api/daily-affirmation", async (req, res) => {
    try {
      const todayDate = new Date().toISOString().split('T')[0];
      const affirmation = await storage.getDailyAffirmation(todayDate);
      res.json(affirmation);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching daily affirmation: " + error.message });
    }
  });

  // Daily quotes
  app.get("/api/daily-quote", async (req, res) => {
    try {
      const todayDate = new Date().toISOString().split('T')[0];
      const quote = await storage.getDailyQuote(todayDate);
      res.json(quote);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching daily quote: " + error.message });
    }
  });

  // Fetch all articles or filter by category
  app.get("/api/articles", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const articles = await storage.getArticles(category);
      res.json(articles);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching articles: " + error.message });
    }
  });

  // Fetch article by ID
  app.get("/api/articles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const article = await storage.getArticleById(id);
      
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      res.json(article);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching article: " + error.message });
    }
  });

  // Horoscope by sign
  app.get("/api/horoscope/:sign", async (req, res) => {
    try {
      const sign = req.params.sign;
      const validSigns = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"];
      
      if (!validSigns.includes(sign)) {
        return res.status(400).json({ message: "Invalid zodiac sign" });
      }
      
      const options = {
        ...horoscopeOptions,
        url: `${horoscopeOptions.url}/${sign}/today`
      };

      try {
        // Try getting from API
        const response = await axios.request(options);
        return res.json(response.data);
      } catch (apiError) {
        // Fallback to local data if API fails
        const horoscope = await storage.getHoroscopeBySign(sign);
        if (horoscope) {
          return res.json(horoscope);
        }
        throw apiError;
      }
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching horoscope: " + error.message });
    }
  });

  // Daily numerology
  app.get("/api/numerology/daily", async (req, res) => {
    try {
      const todayDate = new Date().toISOString().split('T')[0];
      const numerology = await storage.getDailyNumerology(todayDate);
      res.json(numerology);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching daily numerology: " + error.message });
    }
  });

  // Name numerology
  app.get("/api/numerology/name", async (req, res) => {
    try {
      const name = req.query.value as string;
      
      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }
      
      const options = {
        ...numerologyOptions,
        url: `${numerologyOptions.url}/name`,
        params: { name }
      };

      try {
        // Try getting from API
        const response = await axios.request(options);
        return res.json(response.data);
      } catch (apiError) {
        // Fallback to local calculation
        const result = await storage.calculateNameNumerology(name);
        return res.json(result);
      }
    } catch (error: any) {
      res.status(500).json({ message: "Error calculating name numerology: " + error.message });
    }
  });

  // Life path numerology
  app.get("/api/numerology/lifepath", async (req, res) => {
    try {
      const birthdate = req.query.birthdate as string;
      
      if (!birthdate) {
        return res.status(400).json({ message: "Birthdate is required" });
      }
      
      const options = {
        ...numerologyOptions,
        url: `${numerologyOptions.url}/lifepath`,
        params: { birthdate }
      };

      try {
        // Try getting from API
        const response = await axios.request(options);
        return res.json(response.data);
      } catch (apiError) {
        // Fallback to local calculation
        const result = await storage.calculateLifePathNumerology(birthdate);
        return res.json(result);
      }
    } catch (error: any) {
      res.status(500).json({ message: "Error calculating life path numerology: " + error.message });
    }
  });

  // Check premium status
  app.get("/api/check-premium", async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      // For demo, we'll use a dummy user if not provided
      const isPremium = await storage.checkPremiumStatus(userId || 1);
      res.json({ isPremium });
    } catch (error: any) {
      res.status(500).json({ message: "Error checking premium status: " + error.message });
    }
  });

  // Create a subscription or one-time payment
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { planId, userId = 1 } = req.body;
      
      if (!planId) {
        return res.status(400).json({ message: "Plan ID is required" });
      }
      
      const plan = await storage.getPlanById(planId);
      
      if (!plan) {
        return res.status(404).json({ message: "Plan not found" });
      }
      
      // For one-time purchases
      const paymentIntent = await stripe.paymentIntents.create({
        amount: plan.price * 100, // Convert to cents
        currency: "pln",
        metadata: {
          userId: userId.toString(),
          planId
        }
      });
      
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Register subscription success
  app.post("/api/register-subscription", async (req, res) => {
    try {
      const validatedData = insertSubscriptionSchema.parse(req.body);
      
      const user = await storage.getUserById(validatedData.userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const subscription = await storage.createSubscription(validatedData);
      
      res.json({ success: true, subscription });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      
      res.status(500).json({ message: "Error registering subscription: " + error.message });
    }
  });

  // Mock signup for demonstration
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByEmail(validatedData.email);
      
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }
      
      // In a real app, you would hash the password
      const user = await storage.createUser(validatedData);
      
      res.json({ success: true, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      
      res.status(500).json({ message: "Error creating user: " + error.message });
    }
  });

  // Mock login for demonstration
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
      
      const user = await storage.getUserByEmail(email);
      
      if (!user || user.password !== password) { // In a real app, you would compare hashed passwords
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      res.json({ 
        success: true,
        user: { id: user.id, username: user.username, email: user.email }
      });
    } catch (error: any) {
      res.status(500).json({ message: "Error logging in: " + error.message });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
