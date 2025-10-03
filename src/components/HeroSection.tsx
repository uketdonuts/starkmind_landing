import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { scrollToSection } from '../utils/scroll';

const HeroSection: React.FC = () => {
  const { currentLang, content } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center px-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
        
        {/* Minimal geometric accents */}
        <div className="absolute top-20 right-20 w-px h-32 bg-gradient-to-b from-transparent via-slate-600/30 to-transparent"></div>
        <div className="absolute bottom-20 left-20 w-32 h-px bg-gradient-to-r from-transparent via-slate-600/30 to-transparent"></div>
        
        {/* Subtle depth layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-transparent to-slate-800/20"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto text-center px-4 sm:px-6">
        {/* Professional Badge */}
        <div className="mt-16 sm:mt-12 mb-12 inline-flex items-center px-3 sm:px-6 md:px-8 py-3 sm:py-4 bg-slate-800/40 backdrop-blur-sm rounded-lg border border-slate-700/50 group hover:border-slate-600/50 transition-all duration-300">
          <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 sm:mr-4 animate-pulse"></div>
          <span className="text-xs sm:text-sm font-medium text-slate-300 tracking-wide uppercase">
            {content[currentLang].tagline}
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
          <span className="block text-white font-light">{content[currentLang].heroTitle}</span>
          <span className="block bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent font-semibold">
            {content[currentLang].heroSubtitle}
          </span>
        </h1>
        
        <p 
          className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed font-normal"
          dangerouslySetInnerHTML={{ __html: content[currentLang].heroDescription }}
        />
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24">
          <button 
            onClick={() => scrollToSection('contacto')}
            className="bg-white text-slate-900 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-slate-100 transition-all duration-200 shadow-lg hover:shadow-xl border border-slate-200"
          >
            {content[currentLang].ctaPrimary}
          </button>
          <button 
            onClick={() => scrollToSection('servicios')}
            className="bg-transparent border-2 border-slate-600 text-slate-300 px-10 py-4 rounded-lg font-semibold text-lg hover:border-slate-500 hover:text-slate-200 transition-all duration-200"
          >
            {content[currentLang].ctaSecondary}
          </button>
        </div>
        
        {/* Professional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 max-w-4xl mx-auto pb-12 md:pb-0">
          <div className="text-center group">
            <div className="text-4xl font-bold text-slate-200 mb-2 group-hover:text-white transition-colors duration-300">
              8+
            </div>
            <div className="text-slate-500 font-medium text-sm uppercase tracking-wider">
              {currentLang === 'es' ? 'Años de Experiencia' : 'Years of Experience'}
            </div>
          </div>
          <div className="text-center group">
            <div className="text-4xl font-bold text-slate-200 mb-2 group-hover:text-white transition-colors duration-300">
              20+
            </div>
            <div className="text-slate-500 font-medium text-sm uppercase tracking-wider">
              {currentLang === 'es' ? 'Proyectos Completados' : 'Projects Completed'}
            </div>
          </div>
          <div className="text-center group">
            <div className="text-4xl font-bold text-slate-200 mb-2 group-hover:text-white transition-colors duration-300">
              LATAM
            </div>
            <div className="text-slate-500 font-medium text-sm uppercase tracking-wider">
              {currentLang === 'es' ? 'Alcance Regional' : 'Regional Reach'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
