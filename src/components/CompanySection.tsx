import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const CompanySection: React.FC = () => {
  const { currentLang } = useLanguage();

  return (
    <section id="empresa" className="py-32 px-6 relative spatial-bg" aria-labelledby="empresa-title">
      {/* Floating particles */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-8 py-4 dynamic-island text-white text-sm font-bold mb-8 animate-bounce-subtle">
            {currentLang === 'es' ? '🏢 Quiénes Somos' : '🏢 About Us'}
          </div>
          <h2 id="empresa-title" className="text-6xl md:text-8xl font-black text-neutral-900 mb-12 tracking-tight animate-fade-in delay-150">
            <span className="text-shimmer">{currentLang === 'es' ? 'Empresa' : 'Company'}</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-7 space-y-10 animate-fade-in delay-200">
            <div className="glass-card">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center animate-glow">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-neutral-900 mb-4">
                    {currentLang === 'es' ? 'Nuestra Misión' : 'Our Mission'}
                  </h3>
                  <p className="text-xl text-neutral-600 leading-relaxed">
                    {currentLang === 'es'
                      ? 'StarkMind es una firma boutique tecnológica con sede en Panamá, especializada en soluciones de automatización inteligente y extracción de datos con IA de vanguardia.'
                      : 'StarkMind is a boutique technology firm based in Panama, specializing in cutting-edge intelligent automation solutions and AI-driven data extraction.'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-card">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center animate-glow">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-neutral-900 mb-4">
                    {currentLang === 'es' ? 'Nuestro Equipo' : 'Our Team'}
                  </h3>
                  <p className="text-xl text-neutral-600 leading-relaxed">
                    {currentLang === 'es'
                      ? 'Nuestro equipo combina experiencia en ingeniería de software, ciencia de datos y operaciones empresariales para optimizar procesos y potenciar la toma de decisiones estratégicas.'
                      : 'Our team combines expertise in software engineering, data science, and business operations to optimize processes and empower strategic decision-making.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-5 animate-fade-in delay-400">
            <div className="glass-card relative overflow-hidden">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl mb-8 shadow-xl animate-glow">
                  <span className="text-3xl font-bold text-white">S</span>
                </div>
                <h3 className="text-4xl font-bold text-neutral-900 mb-8">
                  {currentLang === 'es' ? 'Valores Fundamentales' : 'Core Values'}
                </h3>
                <p className="text-xl text-neutral-600 leading-relaxed mb-10">
                  {currentLang === 'es'
                    ? 'Con un enfoque riguroso en la calidad, seguridad y escalabilidad, transformamos datos crudos en valor estratégico tangible.'
                    : 'With a rigorous focus on quality, security, and scalability, we transform raw data into tangible strategic value.'}
                </p>
                
                {/* Value indicators with liquid design */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg">
                      <span className="text-white font-bold text-lg">Q</span>
                    </div>
                    <span className="text-lg font-semibold text-neutral-700">
                      {currentLang === 'es' ? 'Calidad' : 'Quality'}
                    </span>
                  </div>
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg">
                      <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <span className="text-lg font-semibold text-neutral-700">
                      {currentLang === 'es' ? 'Seguridad' : 'Security'}
                    </span>
                  </div>
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-500 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg">
                      <span className="text-white font-bold text-lg">E</span>
                    </div>
                    <span className="text-lg font-semibold text-neutral-700">
                      {currentLang === 'es' ? 'Escalabilidad' : 'Scale'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanySection;
