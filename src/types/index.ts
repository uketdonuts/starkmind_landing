export interface Content {
  title: string;
  description: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  ctaPrimary: string;
  ctaSecondary: string;
  navServices: string;
  navDemos: string;
  navTechnology: string;
  navCompany: string;
  navContact: string;
}

export interface LanguageContent {
  es: Content;
  en: Content;
}

export type Language = 'es' | 'en';

export interface Technology {
  id: number;
  title: string;
  description: string;
  icon: string;
  category: string;
  color: string;
  colorLight: string;
  textColor: string;
}

export interface MarketData {
  empresa: string;
  precio: number;
  cambio: number;
  tendencia: 'up' | 'down' | 'neutral';
}

export interface KPIData {
  revenue: number;
  growth: number;
  customers: number;
  efficiency: number;
}

export interface ContactFormData {
  nombre: string;
  email: string;
  empresa: string;
  celular: string;
  mensaje: string;
}
