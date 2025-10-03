import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface Service {
  id: string;
  icon: string;
  title: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  features: {
    es: string[];
    en: string[];
  };
}

const DevelopmentServicesSection: React.FC = () => {
  const { currentLang } = useLanguage();

  const services: Service[] = [
    {
      id: 'web-apps',
      icon: '🌐',
      title: {
        es: 'Aplicaciones Web',
        en: 'Web Applications'
      },
      description: {
        es: 'Aplicaciones web escalables con arquitecturas modernas.',
        en: 'Scalable web applications with modern architectures.'
      },
      features: {
        es: [
          'Single Page Applications',
          'Progressive Web Apps',
          'Paneles de administración'
        ],
        en: [
          'Single Page Applications',
          'Progressive Web Apps',
          'Administration panels'
        ]
      }
    },
    {
      id: 'custom-software',
      icon: '⚙️',
      title: {
        es: 'Software a Medida',
        en: 'Custom Software'
      },
      description: {
        es: 'Soluciones personalizadas para necesidades específicas de negocio.',
        en: 'Custom solutions for specific business needs.'
      },
      features: {
        es: [
          'Sistemas internos empresariales',
          'Integración con sistemas existentes',
          'Soporte continuo'
        ],
        en: [
          'Internal business systems',
          'Existing systems integration',
          'Ongoing support'
        ]
      }
    },
    {
      id: 'ecommerce',
      icon: '🛒',
      title: {
        es: 'Comercio Electrónico',
        en: 'E-Commerce'
      },
      description: {
        es: 'Tiendas online completas con pasarelas de pago y gestión integral.',
        en: 'Complete online stores with payment gateways and full management.'
      },
      features: {
        es: [
          'Tiendas online personalizadas',
          'Pasarelas de pago',
          'Gestión de inventario'
        ],
        en: [
          'Custom online stores',
          'Payment gateways',
          'Inventory management'
        ]
      }
    },
    {
      id: 'mobile-apps',
      icon: '📱',
      title: {
        es: 'Aplicaciones Móviles',
        en: 'Mobile Applications'
      },
      description: {
        es: 'Apps nativas y multiplataforma para iOS y Android.',
        en: 'Native and cross-platform apps for iOS and Android.'
      },
      features: {
        es: [
          'Apps iOS y Android',
          'Desarrollo multiplataforma',
          'Diseño UX/UI móvil'
        ],
        en: [
          'iOS and Android apps',
          'Cross-platform development',
          'Mobile UX/UI design'
        ]
      }
    },
    {
      id: 'api-integration',
      icon: '🔗',
      title: {
        es: 'APIs e Integraciones',
        en: 'APIs & Integrations'
      },
      description: {
        es: 'APIs RESTful, GraphQL y conexión entre sistemas.',
        en: 'RESTful, GraphQL APIs and system connections.'
      },
      features: {
        es: [
          'Desarrollo de APIs',
          'Microservicios',
          'Integraciones terceros'
        ],
        en: [
          'API development',
          'Microservices',
          'Third-party integrations'
        ]
      }
    },
    {
      id: 'cloud-deployment',
      icon: '☁️',
      title: {
        es: 'Despliegue Cloud',
        en: 'Cloud Deployment'
      },
      description: {
        es: 'Infraestructura cloud con DevOps y alta disponibilidad.',
        en: 'Cloud infrastructure with DevOps and high availability.'
      },
      features: {
        es: [
          'Servidores cloud (AWS, Azure, GCP)',
          'CI/CD y contenedores',
          'Monitoreo y backups'
        ],
        en: [
          'Cloud servers (AWS, Azure, GCP)',
          'CI/CD and containers',
          'Monitoring and backups'
        ]
      }
    }
  ];

  return (
    <section id="development" className="py-24 bg-gradient-to-br from-white via-purple-50 to-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold tracking-wide uppercase">
              {currentLang === 'es' ? 'Soluciones Completas' : 'Complete Solutions'}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {currentLang === 'es' ? 'Desarrollo de Software' : 'Software Development'}
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            {currentLang === 'es' 
              ? 'Más allá de la automatización, creamos soluciones tecnológicas integrales adaptadas a las necesidades específicas de su negocio'
              : 'Beyond automation, we create comprehensive technology solutions tailored to your business\'s specific needs'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-neutral-200 hover:border-purple-300"
            >
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-purple-600 transition-colors">
                {service.title[currentLang]}
              </h3>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                {service.description[currentLang]}
              </p>
              <ul className="space-y-3">
                {service.features[currentLang].map((feature, index) => (
                  <li key={index} className="flex items-start text-neutral-700">
                    <svg className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            {currentLang === 'es' ? '¿Tiene un proyecto en mente?' : 'Have a project in mind?'}
          </h3>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            {currentLang === 'es'
              ? 'Trabajemos juntos para transformar su visión en una solución tecnológica de clase mundial'
              : 'Let\'s work together to transform your vision into a world-class technology solution'}
          </p>
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.getElementById('contacto');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="inline-block px-8 py-4 bg-white text-purple-600 font-bold rounded-full hover:bg-purple-50 transition-all duration-200 shadow-lg cursor-pointer"
          >
            {currentLang === 'es' ? 'Iniciar Conversación' : 'Start Conversation'}
          </a>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentServicesSection;
