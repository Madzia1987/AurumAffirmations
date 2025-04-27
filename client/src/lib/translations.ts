export type LanguageCode = 'pl' | 'en' | 'de' | 'fr' | 'es';

export type TranslationKey = 
  // Navigation
  | 'nav.home'
  | 'nav.horoscope'
  | 'nav.numerology'
  | 'nav.premium'
  | 'nav.login'
  | 'nav.profile'
  | 'nav.logout'
  
  // Home Page
  | 'home.title1'
  | 'home.title2'
  | 'home.subtitle'
  | 'home.cta'
  
  // Auth
  | 'auth.login'
  | 'auth.register'
  | 'auth.username'
  | 'auth.email'
  | 'auth.password'
  | 'auth.loginBtn'
  | 'auth.registerBtn'
  | 'auth.forgotPassword'
  | 'auth.loginSuccess'
  | 'auth.registerSuccess'
  | 'auth.loginError'
  | 'auth.registerError';

type TranslationsType = {
  [key in LanguageCode]: {
    [key in TranslationKey]: string;
  };
};

export const translations: TranslationsType = {
  pl: {
    // Navigation
    'nav.home': 'Strona główna',
    'nav.horoscope': 'Horoskop',
    'nav.numerology': 'Numerologia',
    'nav.premium': 'Premium',
    'nav.login': 'Zaloguj',
    'nav.profile': 'Mój profil',
    'nav.logout': 'Wyloguj się',
    
    // Home Page
    'home.title1': 'Twoja Droga do',
    'home.title2': 'Wewnętrznego Bogactwa',
    'home.subtitle': 'Odkryj ekskluzywne afirmacje, horoskopy i osobiste analizy numerologiczne, które transformują Twoje życie w dzieło sztuki pełne obfitości i doskonałości.',
    'home.cta': 'Odblokuj pełny dostęp premium',
    
    // Auth
    'auth.login': 'Zaloguj się',
    'auth.register': 'Rejestracja',
    'auth.username': 'Imię',
    'auth.email': 'Email',
    'auth.password': 'Hasło',
    'auth.loginBtn': 'Zaloguj się',
    'auth.registerBtn': 'Zarejestruj się',
    'auth.forgotPassword': 'Zapomniałeś hasła?',
    'auth.loginSuccess': 'Zostałeś pomyślnie zalogowany.',
    'auth.registerSuccess': 'Twoje konto zostało pomyślnie utworzone.',
    'auth.loginError': 'Nieprawidłowy email lub hasło. Spróbuj ponownie.',
    'auth.registerError': 'Nie można utworzyć konta. Spróbuj ponownie.',
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.horoscope': 'Horoscope',
    'nav.numerology': 'Numerology',
    'nav.premium': 'Premium',
    'nav.login': 'Log in',
    'nav.profile': 'My profile',
    'nav.logout': 'Log out',
    
    // Home Page
    'home.title1': 'Your Path to',
    'home.title2': 'Inner Wealth',
    'home.subtitle': 'Discover exclusive affirmations, horoscopes and personal numerology analyses that transform your life into a masterpiece of abundance and excellence.',
    'home.cta': 'Unlock full premium access',
    
    // Auth
    'auth.login': 'Log in',
    'auth.register': 'Register',
    'auth.username': 'Name',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.loginBtn': 'Log in',
    'auth.registerBtn': 'Register',
    'auth.forgotPassword': 'Forgot password?',
    'auth.loginSuccess': 'You have been successfully logged in.',
    'auth.registerSuccess': 'Your account has been successfully created.',
    'auth.loginError': 'Invalid email or password. Please try again.',
    'auth.registerError': 'Unable to create account. Please try again.',
  },
  
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.horoscope': 'Horoskop',
    'nav.numerology': 'Numerologie',
    'nav.premium': 'Premium',
    'nav.login': 'Anmelden',
    'nav.profile': 'Mein Profil',
    'nav.logout': 'Abmelden',
    
    // Home Page
    'home.title1': 'Dein Weg zum',
    'home.title2': 'inneren Reichtum',
    'home.subtitle': 'Entdecke exklusive Affirmationen, Horoskope und persönliche numerologische Analysen, die dein Leben in ein Meisterwerk voller Fülle und Exzellenz verwandeln.',
    'home.cta': 'Vollständigen Premium-Zugang freischalten',
    
    // Auth
    'auth.login': 'Anmelden',
    'auth.register': 'Registrieren',
    'auth.username': 'Name',
    'auth.email': 'E-Mail',
    'auth.password': 'Passwort',
    'auth.loginBtn': 'Anmelden',
    'auth.registerBtn': 'Registrieren',
    'auth.forgotPassword': 'Passwort vergessen?',
    'auth.loginSuccess': 'Du wurdest erfolgreich angemeldet.',
    'auth.registerSuccess': 'Dein Konto wurde erfolgreich erstellt.',
    'auth.loginError': 'Ungültige E-Mail oder Passwort. Bitte versuche es erneut.',
    'auth.registerError': 'Konto konnte nicht erstellt werden. Bitte versuche es erneut.',
  },
  
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.horoscope': 'Horoscope',
    'nav.numerology': 'Numérologie',
    'nav.premium': 'Premium',
    'nav.login': 'Connexion',
    'nav.profile': 'Mon profil',
    'nav.logout': 'Déconnexion',
    
    // Home Page
    'home.title1': 'Votre Chemin vers',
    'home.title2': 'la Richesse Intérieure',
    'home.subtitle': 'Découvrez des affirmations exclusives, des horoscopes et des analyses numérologiques personnelles qui transforment votre vie en un chef-d\'œuvre d\'abondance et d\'excellence.',
    'home.cta': 'Débloquer l\'accès premium complet',
    
    // Auth
    'auth.login': 'Connexion',
    'auth.register': 'Inscription',
    'auth.username': 'Nom',
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.loginBtn': 'Se connecter',
    'auth.registerBtn': 'S\'inscrire',
    'auth.forgotPassword': 'Mot de passe oublié?',
    'auth.loginSuccess': 'Vous vous êtes connecté avec succès.',
    'auth.registerSuccess': 'Votre compte a été créé avec succès.',
    'auth.loginError': 'Email ou mot de passe invalide. Veuillez réessayer.',
    'auth.registerError': 'Impossible de créer un compte. Veuillez réessayer.',
  },
  
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.horoscope': 'Horóscopo',
    'nav.numerology': 'Numerología',
    'nav.premium': 'Premium',
    'nav.login': 'Iniciar sesión',
    'nav.profile': 'Mi perfil',
    'nav.logout': 'Cerrar sesión',
    
    // Home Page
    'home.title1': 'Tu Camino hacia',
    'home.title2': 'la Riqueza Interior',
    'home.subtitle': 'Descubre afirmaciones exclusivas, horóscopos y análisis numerológicos personales que transforman tu vida en una obra maestra de abundancia y excelencia.',
    'home.cta': 'Desbloquear acceso premium completo',
    
    // Auth
    'auth.login': 'Iniciar sesión',
    'auth.register': 'Registro',
    'auth.username': 'Nombre',
    'auth.email': 'Email',
    'auth.password': 'Contraseña',
    'auth.loginBtn': 'Iniciar sesión',
    'auth.registerBtn': 'Registrarse',
    'auth.forgotPassword': '¿Olvidaste tu contraseña?',
    'auth.loginSuccess': 'Has iniciado sesión correctamente.',
    'auth.registerSuccess': 'Tu cuenta ha sido creada correctamente.',
    'auth.loginError': 'Email o contraseña inválidos. Por favor, inténtalo de nuevo.',
    'auth.registerError': 'No se puede crear la cuenta. Por favor, inténtalo de nuevo.',
  }
};