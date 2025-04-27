import { pgTable, text, serial, integer, boolean, timestamp, pgEnum, date, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
});

// Plan duration enum
export const durationUnitEnum = pgEnum('duration_unit', ['day', 'month', 'year']);

// Subscription plans
export const plans = pgTable("plans", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: integer("price").notNull(),
  duration: integer("duration"),
  durationUnit: durationUnitEnum("duration_unit"),
  featured: boolean("featured").default(false),
});

export const insertPlanSchema = createInsertSchema(plans);

// Subscriptions
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  planId: text("plan_id").notNull().references(() => plans.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  isActive: boolean("is_active").default(true).notNull(),
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).pick({
  userId: true,
  planId: true,
  stripeCustomerId: true,
  stripeSubscriptionId: true,
});

// Affirmation categories enum
export const affirmationCategoryEnum = pgEnum('affirmation_category', [
  'wealth', 'health', 'love', 'success', 'career', 'motivation', 'confidence', 'gratitude', 'general'
]);

// Affirmations table
export const affirmations = pgTable("affirmations", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  category: affirmationCategoryEnum("category").notNull(),
  isPremium: boolean("is_premium").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAffirmationSchema = createInsertSchema(affirmations).pick({
  text: true,
  category: true,
  isPremium: true,
});

// Quotes table
export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  author: text("author").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertQuoteSchema = createInsertSchema(quotes).pick({
  text: true,
  author: true,
});

// Articles table
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  date: date("date").notNull(),
  readTime: integer("read_time").notNull(),
  isPremium: boolean("is_premium").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertArticleSchema = createInsertSchema(articles).pick({
  title: true,
  excerpt: true,
  content: true,
  image: true,
  category: true,
  date: true,
  readTime: true,
  isPremium: true,
});

// Horoscope table
export const horoscopes = pgTable("horoscopes", {
  id: serial("id").primaryKey(),
  sign: text("sign").notNull(),
  date: date("date").notNull(),
  general: text("general").notNull(),
  love: text("love").notNull(),
  career: text("career").notNull(),
  health: text("health").notNull(),
  lucky: jsonb("lucky").notNull(), // { numbers: string[], colors: string[], times: string[] }
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertHoroscopeSchema = createInsertSchema(horoscopes).pick({
  sign: true,
  date: true,
  general: true,
  love: true,
  career: true,
  health: true,
  lucky: true,
});

// Numerology table
export const numerologyReadings = pgTable("numerology_readings", {
  id: serial("id").primaryKey(),
  number: integer("number").notNull(),
  meaning: text("meaning").notNull(),
  details: jsonb("details"), // { personality: string, health: string, career: string, love: string }
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertNumerologySchema = createInsertSchema(numerologyReadings).pick({
  number: true,
  meaning: true,
  details: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Plan = typeof plans.$inferSelect;
export type InsertPlan = z.infer<typeof insertPlanSchema>;

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;

export type Affirmation = typeof affirmations.$inferSelect;
export type InsertAffirmation = z.infer<typeof insertAffirmationSchema>;

export type Quote = typeof quotes.$inferSelect;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;

export type Article = typeof articles.$inferSelect;
export type InsertArticle = z.infer<typeof insertArticleSchema>;

export type Horoscope = typeof horoscopes.$inferSelect;
export type InsertHoroscope = z.infer<typeof insertHoroscopeSchema>;

export type NumerologyReading = typeof numerologyReadings.$inferSelect;
export type InsertNumerologyReading = z.infer<typeof insertNumerologySchema>;
