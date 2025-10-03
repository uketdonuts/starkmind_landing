import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface NavSection {
  id: string;
  label: { es: string; en: string };
}

const VerticalNav: React.FC = () => {
  const { currentLang } = useLanguage();
  const [activeSection, setActiveSection] = useState('');
  const [isDarkBg, setIsDarkBg] = useState(false);

  const sections: NavSection[] = [
    { id: 'hero', label: { es: 'Inicio', en: 'Home' } },
    { id: 'servicios', label: { es: 'Servicios', en: 'Services' } },
    { id: 'development', label: { es: 'Desarrollo', en: 'Development' } },
    { id: 'portfolio', label: { es: 'Portafolio', en: 'Portfolio' } },
    { id: 'demos', label: { es: 'Demos', en: 'Demos' } },
    { id: 'technology', label: { es: 'Tecnología', en: 'Technology' } },
    { id: 'empresa', label: { es: 'Empresa', en: 'Company' } },
    { id: 'contacto', label: { es: 'Contacto', en: 'Contact' } }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Detectar sección activa
      const sections = document.querySelectorAll('section[id]');
      let currentSection = '';
      
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;
        
        if (sectionTop <= window.innerHeight / 2 && sectionTop + sectionHeight > window.innerHeight / 2) {
          currentSection = section.getAttribute('id') || '';
        }
      });

      // Si estamos en el hero section
      if (window.scrollY < 100) {
        currentSection = 'hero';
      }

      setActiveSection(currentSection);

      // Detectar si el fondo es oscuro (basado en la sección activa)
      const darkSections = ['hero', 'portfolio'];
      setIsDarkBg(darkSections.includes(currentSection));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Ejecutar al montar

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
      aria-label="Navegación vertical"
    >
      <div className="flex flex-col space-y-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative flex items-center"
            aria-label={section.label[currentLang]}
          >
            {/* Dot indicator */}
            <div 
              className={`w-3 h-3 rounded-full transition-all duration-150 ${
                activeSection === section.id
                  ? isDarkBg 
                    ? 'bg-white scale-125' 
                    : 'bg-slate-900 scale-125'
                  : isDarkBg
                    ? 'bg-white/40 hover:bg-white/70'
                    : 'bg-slate-900/40 hover:bg-slate-900/70'
              }`}
            />
            
            {/* Label tooltip */}
            <span 
              className={`absolute right-full mr-4 px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none ${
                isDarkBg
                  ? 'bg-white text-slate-900'
                  : 'bg-slate-900 text-white'
              }`}
            >
              {section.label[currentLang]}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default VerticalNav;
