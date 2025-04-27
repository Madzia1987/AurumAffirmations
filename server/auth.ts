import { Express } from "express";
import { User } from "@shared/schema";
import { storage } from "./storage";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

// Klucz tajny do JWT
const JWT_SECRET = process.env.JWT_SECRET || "aurum-affirmations-secret-key";
const JWT_EXPIRES_IN = "7d"; // 7 dni ważności tokenu

// Interfejs dla rozszerzenia Express Request
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

// Middleware do weryfikacji tokenu JWT
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Brak tokenu autoryzacyjnego" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    const user = await storage.getUserById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Nieprawidłowy token" });
    }

    // Zapisz użytkownika w obiekcie żądania
    req.user = user;
    next();
  } catch (error) {
    console.error("Błąd weryfikacji tokenu:", error);
    return res.status(401).json({ message: "Nieprawidłowy token" });
  }
};

// Funkcja do hashowania hasła
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Funkcja do porównywania hasła z hashem
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

// Funkcja do generowania tokenu JWT
export const generateToken = (user: User): string => {
  return jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

// Funkcja do konfiguracji endpointów autentykacji
export function setupAuth(app: Express) {
  // Endpoint rejestracji
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ message: "Wszystkie pola są wymagane" });
      }

      // Sprawdź, czy użytkownik już istnieje
      const existingUserByEmail = await storage.getUserByEmail(email);
      if (existingUserByEmail) {
        return res.status(400).json({ message: "Użytkownik z tym adresem email już istnieje" });
      }

      const existingUserByUsername = await storage.getUserByUsername(username);
      if (existingUserByUsername) {
        return res.status(400).json({ message: "Nazwa użytkownika jest już zajęta" });
      }

      // Hashuj hasło
      const hashedPassword = await hashPassword(password);

      // Utwórz nowego użytkownika
      const user = await storage.createUser({
        username,
        email,
        password: hashedPassword,
      });

      // Wygeneruj token JWT
      const token = generateToken(user);

      // Ustaw cookie z tokenem
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dni
      });

      return res.status(200).json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Błąd rejestracji:", error);
      return res.status(500).json({ message: "Błąd serwera" });
    }
  });

  // Endpoint logowania
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Adres email i hasło są wymagane" });
      }

      // Znajdź użytkownika po adresie email
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Nieprawidłowy adres email lub hasło" });
      }

      // Sprawdź hasło
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Nieprawidłowy adres email lub hasło" });
      }

      // Wygeneruj token JWT
      const token = generateToken(user);

      // Ustaw cookie z tokenem
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dni
      });

      return res.status(200).json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Błąd logowania:", error);
      return res.status(500).json({ message: "Błąd serwera" });
    }
  });

  // Endpoint wylogowania
  app.post("/api/auth/logout", (req, res) => {
    try {
      res.clearCookie("token");
      return res.status(200).json({ success: true, message: "Wylogowano pomyślnie" });
    } catch (error) {
      console.error("Błąd wylogowania:", error);
      return res.status(500).json({ message: "Błąd serwera" });
    }
  });

  // Endpoint pobierania danych użytkownika
  app.get("/api/auth/user", verifyToken, (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Nie jesteś zalogowany" });
      }

      return res.status(200).json({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
      });
    } catch (error) {
      console.error("Błąd pobierania danych użytkownika:", error);
      return res.status(500).json({ message: "Błąd serwera" });
    }
  });
}