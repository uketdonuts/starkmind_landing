import React from 'react';
import { Code2, Cpu, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ServicesSection: React.FC = () => {
  const { currentLang } = useLanguage();

  const services = [
    {
      icon: <Code2 className="w-8 h-8 text-primary-600" />, 
      iconBg: 'from-primary-100 to-primary-200',
      animationClass: 'icon-animate-pulse',
      title: currentLang === 'es' ? 'APIs de Alto Rendimiento' : 'High-Performance APIs',
      description: currentLang === 'es' 
        ? 'APIs robustas y escalables con Django y FastAPI. Nuestros sistemas manejan millones de solicitudes y se integran perfectamente a tu arquitectura actual. Incluye documentación técnica completa y optimización para alta concurrencia.'
        : 'Robust and scalable APIs with Django and FastAPI. Our systems handle millions of requests and integrate seamlessly into your existing architecture. Includes complete technical documentation and high concurrency optimization.',
      tags: ['Python', 'Django', 'FastAPI', currentLang === 'es' ? 'Escalabilidad' : 'Scalability'],
      hoverColor: 'hover:border-primary-300',
      gradientColor: 'from-primary-50/50',
      accentColor: 'primary'
    },
    {
      icon: <Cpu className="w-8 h-8 text-emerald-600" />, 
      iconBg: 'from-emerald-100 to-emerald-200',
      animationClass: 'icon-animate-rotate',
      title: currentLang === 'es' ? 'Inteligencia Artificial Aplicada' : 'Applied Artificial Intelligence',
      description: currentLang === 'es'
        ? 'Modelos de Machine Learning diseñados para operaciones empresariales. Nos especializamos en procesamiento de lenguaje natural en español, extracción de entidades y automatización de decisiones para optimizar tu negocio.'
        : 'Machine Learning models designed for business operations. We specialize in Spanish natural language processing, entity extraction and decision automation to optimize your business.',
      tags: ['Machine Learning', currentLang === 'es' ? 'NLP Español' : 'Spanish NLP', currentLang === 'es' ? 'Extracción' : 'Extraction'],
      hoverColor: 'hover:border-emerald-300',
      gradientColor: 'from-emerald-50/50',
      accentColor: 'emerald'
    },
    {
      icon: <Search className="w-8 h-8 text-amber-600" />, 
      iconBg: 'from-amber-100 to-amber-200',
      animationClass: 'icon-animate-bounce',
      title: currentLang === 'es' ? 'Scraping Avanzado de Datos' : 'Advanced Web Scraping',
      description: currentLang === 'es'
        ? 'Scrapers resistentes con tecnologías anti-bloqueo, proxies y orquestación con Airflow. Recogemos, limpiamos y normalizamos datos desde cualquier fuente para análisis estratégico y toma de decisiones.'
        : 'Resilient scrapers with anti-blocking technologies, proxies and orchestration with Airflow. We collect, clean and normalize data from any source for strategic analysis and decision making.',
      tags: ['Web Scraping', 'Airflow', 'Anti-blocking'],
      hoverColor: 'hover:border-amber-300',
      gradientColor: 'from-amber-50/50',
      accentColor: 'amber'
    }
  ];

  return (
    <section id="servicios" className="py-32 px-6 bg-gradient-to-b from-primary-50/50 to-neutral-100" aria-labelledby="servicios-title">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 text-sm font-bold rounded-2xl mb-6 shadow-md animate-bounce-subtle">
            {currentLang === 'es' ? 'Nuestras Soluciones' : 'Our Solutions'}
          </div>
          <h2 id="servicios-title" className="text-5xl md:text-7xl font-black text-neutral-900 mb-8 tracking-tight animate-fade-in delay-150">
            <span>{currentLang === 'es' ? 'Tecnología de' : 'Cutting-Edge'}</span>{' '}
            <span className="gradient-text">{currentLang === 'es' ? 'Vanguardia' : 'Technology'}</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed animate-fade-in delay-200">
            {currentLang === 'es'
              ? 'Descubre cómo automatizamos negocios como el tuyo con soluciones especializadas en Python, Django y FastAPI.'
              : 'Discover how we automate businesses like yours with specialized solutions in Python, Django and FastAPI.'
            }
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <article
              key={index}
              className={`group card-modern ${service.hoverColor} relative overflow-hidden opacity-0 animate-fade-in ${index === 0 ? 'delay-200' : index === 1 ? 'delay-300' : 'delay-500'}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradientColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
              <div className="relative z-10">
                <div className={`icon-modern bg-gradient-to-br ${service.iconBg} group-hover:scale-105 transition-all duration-300 mb-8 ${service.animationClass}`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-6 animate-slide-up delay-300 group-hover:text-neutral-800 transition-colors">
                  {service.title}
                </h3>
                <p className="text-neutral-600 mb-8 leading-relaxed text-lg animate-slide-up delay-400 group-hover:text-neutral-700 transition-colors">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {service.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className={`px-4 py-2 bg-neutral-100 text-neutral-700 text-sm font-medium rounded-xl hover:bg-${service.accentColor}-50 hover:text-${service.accentColor}-700 transition-all duration-300 transform hover:scale-105`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
