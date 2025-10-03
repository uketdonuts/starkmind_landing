import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface ProjectImage {
  src: string;
  title: string;
  description: string;
}

interface Project {
  id: string;
  name: string;
  description: {
    es: string;
    en: string;
  };
  images: ProjectImage[];
}

const PortfolioSection: React.FC = () => {
  const { currentLang } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const projects: Project[] = [
    {
      id: 'agendify',
      name: 'Agendify',
      description: {
        es: 'Sistema integral de gestión de reservas y citas empresariales que optimiza la administración de múltiples sucursales.',
        en: 'Comprehensive booking and appointment management system that optimizes multi-branch administration.'
      },
      images: [
        {
          src: '/img/Portfolio/agendify/dashboard.PNG',
          title: currentLang === 'es' ? 'Panel de Control' : 'Dashboard',
          description: currentLang === 'es' 
            ? 'Visualización ejecutiva en tiempo real de métricas clave, estadísticas de reservas y análisis de rendimiento de sucursales.'
            : 'Real-time executive view of key metrics, booking statistics, and branch performance analytics.'
        },
        {
          src: '/img/Portfolio/agendify/reservas.PNG',
          title: currentLang === 'es' ? 'Gestión de Reservas' : 'Booking Management',
          description: currentLang === 'es'
            ? 'Interfaz intuitiva para administración centralizada de citas, disponibilidad de recursos y coordinación de horarios.'
            : 'Intuitive interface for centralized appointment administration, resource availability, and schedule coordination.'
        },
        {
          src: '/img/Portfolio/agendify/sucursales.PNG',
          title: currentLang === 'es' ? 'Administración de Sucursales' : 'Branch Administration',
          description: currentLang === 'es'
            ? 'Módulo empresarial para configuración y supervisión de múltiples ubicaciones, personal y servicios.'
            : 'Enterprise module for configuration and supervision of multiple locations, staff, and services.'
        },
        {
          src: '/img/Portfolio/agendify/reportes.PNG',
          title: currentLang === 'es' ? 'Reportes Analíticos' : 'Analytical Reports',
          description: currentLang === 'es'
            ? 'Generación de reportes avanzados con visualizaciones de datos para análisis de tendencias y toma de decisiones estratégicas.'
            : 'Advanced report generation with data visualizations for trend analysis and strategic decision-making.'
        },
        {
          src: '/img/Portfolio/agendify/login.png',
          title: currentLang === 'es' ? 'Acceso Seguro' : 'Secure Access',
          description: currentLang === 'es'
            ? 'Sistema de autenticación empresarial con protocolos de seguridad avanzados y gestión de permisos por roles.'
            : 'Enterprise authentication system with advanced security protocols and role-based permission management.'
        }
      ]
    },
    {
      id: 'asientos-contables',
      name: 'Asientos Contables',
      description: {
        es: 'Plataforma profesional de contabilidad y gestión financiera con arquitectura robusta para cumplimiento normativo.',
        en: 'Professional accounting and financial management platform with robust architecture for regulatory compliance.'
      },
      images: [
        {
          src: '/img/Portfolio/asientos-contables/dashboard.png',
          title: currentLang === 'es' ? 'Panel Financiero' : 'Financial Dashboard',
          description: currentLang === 'es'
            ? 'Centro de comando financiero con visualización de indicadores contables, balances y resúmenes ejecutivos en tiempo real.'
            : 'Financial command center with accounting indicators visualization, balances, and real-time executive summaries.'
        },
        {
          src: '/img/Portfolio/asientos-contables/plan-cuentas.png',
          title: currentLang === 'es' ? 'Plan de Cuentas' : 'Chart of Accounts',
          description: currentLang === 'es'
            ? 'Estructura jerárquica del catálogo de cuentas contables con clasificación detallada y configuración personalizable.'
            : 'Hierarchical structure of accounting chart with detailed classification and customizable configuration.'
        },
        {
          src: '/img/Portfolio/asientos-contables/asientos.png',
          title: currentLang === 'es' ? 'Registro de Asientos' : 'Journal Entries',
          description: currentLang === 'es'
            ? 'Módulo de registro contable con validación automática de partida doble y cumplimiento de normas contables internacionales.'
            : 'Accounting entry module with automatic double-entry validation and international accounting standards compliance.'
        },
        {
          src: '/img/Portfolio/asientos-contables/cuentas.png',
          title: currentLang === 'es' ? 'Gestión de Cuentas' : 'Account Management',
          description: currentLang === 'es'
            ? 'Administración integral de cuentas contables con historial de transacciones y análisis de movimientos detallados.'
            : 'Comprehensive accounting management with transaction history and detailed movement analysis.'
        },
        {
          src: '/img/Portfolio/asientos-contables/2fa.png',
          title: currentLang === 'es' ? 'Autenticación Multifactor' : 'Two-Factor Authentication',
          description: currentLang === 'es'
            ? 'Capa adicional de seguridad empresarial con autenticación de dos factores para protección de datos financieros sensibles.'
            : 'Additional enterprise security layer with two-factor authentication for sensitive financial data protection.'
        },
        {
          src: '/img/Portfolio/asientos-contables/login.png',
          title: currentLang === 'es' ? 'Portal de Acceso' : 'Access Portal',
          description: currentLang === 'es'
            ? 'Sistema de inicio de sesión seguro con encriptación avanzada y auditoría completa de accesos.'
            : 'Secure login system with advanced encryption and comprehensive access auditing.'
        }
      ]
    },
    {
      id: 'dhl',
      name: 'DHL Logistics',
      description: {
        es: 'Solución logística empresarial para cotización y gestión de envíos internacionales con integración a sistemas corporativos.',
        en: 'Enterprise logistics solution for international shipping quotation and management with corporate system integration.'
      },
      images: [
        {
          src: '/img/Portfolio/DHL/cotizar.png',
          title: currentLang === 'es' ? 'Cotizador de Envíos' : 'Shipping Calculator',
          description: currentLang === 'es'
            ? 'Motor de cotización en tiempo real que procesa múltiples variables logísticas para tarifas precisas de envío nacional e internacional.'
            : 'Real-time quotation engine processing multiple logistics variables for accurate domestic and international shipping rates.'
        },
        {
          src: '/img/Portfolio/DHL/cotizar-import.png',
          title: currentLang === 'es' ? 'Importación Masiva' : 'Bulk Import',
          description: currentLang === 'es'
            ? 'Funcionalidad de procesamiento por lotes para cotización simultánea de múltiples envíos con validación de datos automática.'
            : 'Batch processing functionality for simultaneous multi-shipment quotation with automatic data validation.'
        },
        {
          src: '/img/Portfolio/DHL/crear.png',
          title: currentLang === 'es' ? 'Generación de Envíos' : 'Shipment Creation',
          description: currentLang === 'es'
            ? 'Interfaz optimizada para creación de órdenes de envío con autocompletado inteligente y verificación de direcciones.'
            : 'Optimized interface for shipping order creation with intelligent autocomplete and address verification.'
        },
        {
          src: '/img/Portfolio/DHL/mobile-version.PNG',
          title: currentLang === 'es' ? 'Versión Móvil' : 'Mobile Version',
          description: currentLang === 'es'
            ? 'Aplicación responsive optimizada para gestión logística desde dispositivos móviles con funcionalidad completa.'
            : 'Responsive application optimized for logistics management from mobile devices with full functionality.'
        },
        {
          src: '/img/Portfolio/DHL/login.png',
          title: currentLang === 'es' ? 'Acceso Corporativo' : 'Corporate Access',
          description: currentLang === 'es'
            ? 'Portal de autenticación empresarial con Single Sign-On (SSO) e integración con directorio activo corporativo.'
            : 'Enterprise authentication portal with Single Sign-On (SSO) and corporate active directory integration.'
        }
      ]
    }
  ];

  const openProject = (projectId: string) => {
    setSelectedProject(projectId);
    setSelectedImage(0);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setSelectedImage(0);
  };

  const currentProject = projects.find(p => p.id === selectedProject);

  return (
    <section id="portfolio" className="py-24 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {currentLang === 'es' ? 'Portafolio de Proyectos' : 'Project Portfolio'}
          </h2>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            {currentLang === 'es' 
              ? 'Soluciones tecnológicas empresariales diseñadas e implementadas por nuestro equipo especializado'
              : 'Enterprise technology solutions designed and implemented by our specialized team'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-neutral-800/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border border-neutral-700/50 hover:border-purple-500/50"
              onClick={() => openProject(project.id)}
            >
              <div className="relative h-64 overflow-hidden bg-neutral-900 flex items-center justify-center">
                <img
                  src={project.images[0].src}
                  alt={project.name}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-neutral-300 leading-relaxed mb-4">
                  {project.description[currentLang]}
                </p>
                <div className="flex items-center text-purple-400 font-semibold group-hover:text-purple-300 transition-colors">
                  <span>{currentLang === 'es' ? 'Ver proyecto completo' : 'View full project'}</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Proyecto */}
      {selectedProject && currentProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-2 md:p-4 overflow-y-auto">
          <div className="relative w-full max-w-5xl bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-700 my-4 md:my-8 max-h-[95vh] overflow-y-auto">
            {/* Botón de cerrar */}
            <button
              onClick={closeProject}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-neutral-800 hover:bg-red-600 rounded-full transition-colors duration-300 text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header del proyecto */}
            <div className="p-8 border-b border-neutral-700">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {currentProject.name}
              </h3>
              <p className="text-lg text-neutral-300">
                {currentProject.description[currentLang]}
              </p>
            </div>

            {/* Imagen principal */}
            <div className="relative bg-neutral-950 p-8">
              <div className="relative rounded-xl overflow-hidden shadow-2xl max-h-[70vh] flex items-center justify-center bg-neutral-900">
                <img
                  src={currentProject.images[selectedImage].src}
                  alt={currentProject.images[selectedImage].title}
                  className="w-full h-full object-contain max-h-[70vh]"
                />
              </div>
              
              {/* Navegación de imágenes */}
              {currentProject.images.length > 1 && (
                <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage((prev) => (prev > 0 ? prev - 1 : currentProject.images.length - 1));
                    }}
                    className="w-12 h-12 bg-neutral-800/90 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors duration-300 text-white shadow-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage((prev) => (prev < currentProject.images.length - 1 ? prev + 1 : 0));
                    }}
                    className="w-12 h-12 bg-neutral-800/90 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors duration-300 text-white shadow-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Descripción de la imagen */}
            <div className="p-8 border-t border-neutral-700">
              <h4 className="text-xl font-bold text-white mb-2">
                {currentProject.images[selectedImage].title}
              </h4>
              <p className="text-neutral-300 leading-relaxed">
                {currentProject.images[selectedImage].description}
              </p>
            </div>

            {/* Miniaturas */}
            <div className="p-8 pt-0">
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {currentProject.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(index);
                    }}
                    className={`relative rounded-lg overflow-hidden transition-all duration-150 h-20 bg-neutral-900 flex items-center justify-center ${
                      selectedImage === index
                        ? 'ring-4 ring-purple-500 scale-105'
                        : 'ring-2 ring-neutral-700 hover:ring-purple-400 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
