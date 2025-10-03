import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Cloud, Database, Terminal, Cpu, Zap, Code2 } from 'lucide-react';

const techData = (lang: string) => [
  {
    id: 1,
    icon: <Cloud className="w-10 h-10 text-emerald-600" />,  
    title: lang === 'es' ? 'Infraestructura en la Nube' : 'Cloud Infrastructure',
    description: lang === 'es'
      ? 'Implementamos soluciones escalables en AWS, Azure y GCP para soporte global y alta disponibilidad.'
      : 'We deploy scalable solutions on AWS, Azure, and GCP for global support and high availability.',
  },
  {
    id: 2,
    icon: <Database className="w-10 h-10 text-amber-600" />,  
    title: lang === 'es' ? 'Bases de Datos' : 'Databases',
    description: lang === 'es'
      ? 'Diseño y optimización de bases de datos en PostgreSQL, MySQL y MongoDB para un rendimiento óptimo.'
      : 'Design and optimization of PostgreSQL, MySQL, and MongoDB databases for optimal performance.',
  },
  {
    id: 3,
    icon: <Terminal className="w-10 h-10 text-blue-600" />,  
    title: lang === 'es' ? 'Contenedores' : 'Containers',
    description: lang === 'es'
      ? 'Despliegue y orquestación con Docker y Kubernetes para entornos reproducibles y aislados.'
      : 'Deployment and orchestration with Docker and Kubernetes for reproducible, isolated environments.',
  },
  {
    id: 4,
    icon: <Cpu className="w-10 h-10 text-purple-600" />,  
    title: lang === 'es' ? 'Programación en Python' : 'Python Development',
    description: lang === 'es'
      ? 'Desarrollo backend con Flask y FastAPI, creando APIs robustas y escalables.'
      : 'Backend development with Flask and FastAPI, creating robust and scalable APIs.',
  },
  {
    id: 5,
    icon: <Zap className="w-10 h-10 text-yellow-600" />,  
    title: lang === 'es' ? 'TypeScript' : 'TypeScript',
    description: lang === 'es'
      ? 'Aplicaciones frontend con React y TypeScript para interfaces seguras y mantenibles.'
      : 'Frontend applications with React and TypeScript for safe, maintainable interfaces.',
  },
  {
    id: 6,
    icon: <Code2 className="w-10 h-10 text-indigo-600" />,  
    title: lang === 'es' ? 'APIs con Flask' : 'Flask APIs',
    description: lang === 'es'
      ? 'Implementamos rutas RESTful seguras y documentadas con Flask.'
      : 'We implement secure, documented RESTful routes with Flask.',
  }
];

const TechnologySection: React.FC = () => {
  const { currentLang, content } = useLanguage();
  const techs = techData(currentLang);

  return (
    <section id="technology" className="py-32 px-6 relative spatial-bg" aria-labelledby="technology-title">
      {/* Floating particles */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 text-sm font-bold rounded-2xl mb-6 shadow-md">
            {currentLang === 'es' ? '🚀 Nuestro Stack Tecnológico' : '🚀 Our Tech Stack'}
          </div>
          <h2 id="technology-title" className="text-6xl md:text-8xl font-black text-neutral-900 mb-12 tracking-tight animate-fade-in delay-150">
            <span className="text-shimmer">{content[currentLang].navTechnology}</span>
          </h2>
          <p className="text-2xl text-neutral-700 max-w-5xl mx-auto leading-relaxed animate-fade-in delay-200 font-medium">
            {currentLang === 'es'
              ? 'Tecnologías modernas y escalables que impulsan nuestras soluciones empresariales de última generación.'
              : 'Modern and scalable technologies that power our next-generation enterprise solutions.'
            }
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {techs.map((tech, index) => (
            <article
              key={tech.id}
              className={`group glass-card opacity-0 animate-fade-in delay-${300 + index * 150}`}
            >
              <div className="relative z-10">
                <div className="icon-modern mb-8 icon-animate-pulse">
                  {tech.icon}
                </div>
                <h3 className="text-3xl font-bold text-neutral-900 mb-6 animate-slide-up delay-300">
                  {tech.title}
                </h3>
                <p className="text-neutral-600 mb-8 leading-relaxed text-xl animate-slide-up delay-400">
                  {tech.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
