import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import NavItem from './NavItem';

const Header: React.FC = () => {
  const { currentLang, content, toggleLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-slate-900/95 backdrop-blur-sm text-white sticky top-0 z-50 border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-150 group" aria-label="Ir al inicio">
          <div className="relative">
            <img src="/img/logo.svg" alt="StarkMind Logo" className="w-10 h-10" />
          </div>
          <div className="text-xl font-semibold tracking-tight text-slate-100">
            StarkMind
          </div>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {/* Navigation */}
          <nav aria-label="Navegación principal" className="flex items-center space-x-6">
            <NavItem sectionId="servicios">{content[currentLang].navServices}</NavItem>
            <NavItem sectionId="development">{content[currentLang].navDevelopment}</NavItem>
            <NavItem sectionId="portfolio">{content[currentLang].navPortfolio}</NavItem>
            <NavItem sectionId="demos">{content[currentLang].navDemos}</NavItem>
            <NavItem sectionId="technology">{content[currentLang].navTechnology}</NavItem>
            <NavItem sectionId="empresa">{content[currentLang].navCompany}</NavItem>
            <NavItem sectionId="contacto" variant="cta">{content[currentLang].navContact}</NavItem>
          </nav>
          
          {/* Language Toggle */}
          <div className="flex items-center space-x-3 ml-6 border-l border-slate-700 pl-6">
            <span className={`text-xs font-medium transition-colors duration-150 ${currentLang === 'es' ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-300'}`}>ES</span>
            <button 
              onClick={toggleLanguage}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                currentLang === 'en' ? 'bg-slate-600' : 'bg-slate-700'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-150 ${
                currentLang === 'en' ? 'translate-x-6' : 'translate-x-1'
              }`}></span>
            </button>
            <span className={`text-xs font-medium transition-colors duration-150 ${currentLang === 'en' ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-300'}`}>EN</span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center space-x-4">
          {/* Mobile Language Toggle */}
          <div className="flex items-center space-x-2">
            <span className={`text-xs font-medium transition-colors duration-150 ${currentLang === 'es' ? 'text-white font-semibold' : 'text-slate-400'}`}>ES</span>
            <button 
              onClick={toggleLanguage}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                currentLang === 'en' ? 'bg-slate-600' : 'bg-slate-700'
              }`}
            >
              <span className={`inline-block h-3 w-3 transform rounded-full bg-white shadow-sm transition-transform duration-150 ${
                currentLang === 'en' ? 'translate-x-5' : 'translate-x-1'
              }`}></span>
            </button>
            <span className={`text-xs font-medium transition-colors duration-150 ${currentLang === 'en' ? 'text-white font-semibold' : 'text-slate-400'}`}>EN</span>
          </div>

          {/* Hamburger Button */}
          <button
            onClick={toggleMobileMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-expanded="false"
            aria-label="Abrir menú principal"
          >
            <span className="sr-only">Abrir menú principal</span>
            {!isMobileMenuOpen ? (
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            ) : (
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-200 ease-in-out ${
        isMobileMenuOpen 
          ? 'max-h-screen opacity-100 visible' 
          : 'max-h-0 opacity-0 invisible'
      } overflow-hidden`}>
        <div className="px-6 py-4 space-y-1 bg-slate-900/98 backdrop-blur-md border-t border-slate-700/50">
          <nav className="flex flex-col space-y-2" aria-label="Navegación móvil">
            <NavItem sectionId="servicios" onClose={closeMobileMenu}>
              <span className="block w-full text-left">{content[currentLang].navServices}</span>
            </NavItem>
            <NavItem sectionId="development" onClose={closeMobileMenu}>
              <span className="block w-full text-left">{content[currentLang].navDevelopment}</span>
            </NavItem>
            <NavItem sectionId="portfolio" onClose={closeMobileMenu}>
              <span className="block w-full text-left">{content[currentLang].navPortfolio}</span>
            </NavItem>
            <NavItem sectionId="demos" onClose={closeMobileMenu}>
              <span className="block w-full text-left">{content[currentLang].navDemos}</span>
            </NavItem>
            <NavItem sectionId="technology" onClose={closeMobileMenu}>
              <span className="block w-full text-left">{content[currentLang].navTechnology}</span>
            </NavItem>
            <NavItem sectionId="empresa" onClose={closeMobileMenu}>
              <span className="block w-full text-left">{content[currentLang].navCompany}</span>
            </NavItem>
            <div className="pt-4">
              <NavItem sectionId="contacto" variant="cta" onClose={closeMobileMenu}>
                <span className="block w-full text-center">{content[currentLang].navContact}</span>
              </NavItem>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
