import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LanguageContent } from '../types';

interface LanguageContextType {
  currentLang: Language;
  content: LanguageContent;
  toggleLanguage: () => void;
}

const contentData: LanguageContent = {
  es: {
    title: 'StarkMind - Automatización Inteligente y Análisis de Datos para Empresas Modernas',
    description: 'Firma tecnológica especializada en automatización inteligente, scraping web de alto rendimiento y extracción de datos impulsada por IA. Reducimos costos operativos y convertimos datos en decisiones estratégicas.',
    tagline: 'Firma Tecnológica Especializada',
    heroTitle: 'Automatización Inteligente',
    heroSubtitle: 'y Análisis de Datos',
    heroDescription: 'Firma tecnológica con sede en <strong>Panamá</strong>, especializada en <strong>automatización inteligente</strong>, <strong>scraping web de alto rendimiento</strong> y <strong>extracción de datos impulsada por IA</strong>. Ayudamos a empresas a reducir costos operativos y convertir datos crudos en decisiones estratégicas.',
    ctaPrimary: 'Consultoría Gratuita',
    ctaSecondary: 'Ver Soluciones',
    navServices: 'Servicios',
    navDemos: 'Demos',
    navTechnology: 'Tecnología',
    navCompany: 'Empresa',
    navContact: 'Consultoría',
    navPortfolio: 'Portafolio',
    navDevelopment: 'Desarrollo'
  },
  en: {
    title: 'StarkMind - Smart Automation & Data Intelligence for the Modern Business',
    description: 'Boutique technology firm specialized in intelligent automation, high-performance web scraping, and AI-driven data extraction. We help businesses reduce operational costs and transform raw data into strategic insights.',
    tagline: 'Specialized Technology Firm',
    heroTitle: 'Smart Automation',
    heroSubtitle: '& Data Intelligence',
    heroDescription: 'Boutique technology firm based in <strong>Panama</strong>, specialized in <strong>intelligent automation</strong>, <strong>high-performance web scraping</strong>, and <strong>AI-driven data extraction</strong>. We help businesses reduce operational costs and transform raw data into strategic insights.',
    ctaPrimary: 'Free Consultation',
    ctaSecondary: 'View Solutions',
    navServices: 'Services',
    navDemos: 'Demos',
    navTechnology: 'Technology',
    navCompany: 'Company',
    navContact: 'Consultation',
    navPortfolio: 'Portfolio',
    navDevelopment: 'Development'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLang, setCurrentLang] = useState<Language>('es');

  const toggleLanguage = () => {
    const newLang = currentLang === 'es' ? 'en' : 'es';
    setCurrentLang(newLang);
    document.documentElement.lang = newLang;
    document.title = contentData[newLang].title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', contentData[newLang].description);
    }
  };

  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.title = contentData[currentLang].title;
  }, [currentLang]);

  const value = {
    currentLang,
    content: contentData,
    toggleLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
