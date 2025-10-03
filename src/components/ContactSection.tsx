import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Send, CheckCircle, AlertCircle, User, Mail, Building, Phone, MessageSquare, Calendar, Clock, Shield, Zap } from 'lucide-react';

type FormState = 'idle' | 'submitting' | 'submitted' | 'error';

interface FormErrors {
  nombre?: string;
  email?: string;
  mensaje?: string;
}

const ContactSection: React.FC = () => {
  const { currentLang, content } = useLanguage();
  const [formState, setFormState] = useState<FormState>('idle');
  const [formData, setFormData] = useState({ nombre: '', email: '', empresa: '', celular: '', mensaje: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'nombre':
        if (!value.trim()) return currentLang === 'es' ? 'El nombre es obligatorio' : 'Name is required';
        if (value.trim().length < 2) return currentLang === 'es' ? 'El nombre debe tener al menos 2 caracteres' : 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value.trim()) return currentLang === 'es' ? 'El email es obligatorio' : 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return currentLang === 'es' ? 'Formato de email inválido' : 'Invalid email format';
        break;
      case 'mensaje':
        if (!value.trim()) return currentLang === 'es' ? 'El mensaje es obligatorio' : 'Message is required';
        if (value.trim().length < 10) return currentLang === 'es' ? 'El mensaje debe tener al menos 10 caracteres' : 'Message must be at least 10 characters';
        break;
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Real-time validation
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    const fieldsToValidate = ['nombre', 'email', 'mensaje'];
    
    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) newErrors[field as keyof FormErrors] = error;
    });
    
    setErrors(newErrors);
    setTouched({ nombre: true, email: true, mensaje: true });
    
    if (Object.keys(newErrors).length > 0) {
      setFormState('error');
      return;
    }
    
    setFormState('submitting');
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setFormState('submitted');
        setFormData({ nombre: '', email: '', empresa: '', celular: '', mensaje: '' });
        setErrors({});
        setTouched({});
        
        // Auto-hide success message after 15 seconds
        setTimeout(() => {
          setFormState('idle');
        }, 15000);
      } else {
        console.error('Error del servidor:', result.message);
        setFormState('error');
        
        // Auto-hide error message after 8 seconds
        setTimeout(() => {
          setFormState('idle');
        }, 8000);
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setFormState('error');
      
      // Auto-hide error message after 8 seconds
      setTimeout(() => {
        setFormState('idle');
      }, 8000);
    }
  };

  return (
    <section id="contacto" className="py-32 px-6 relative spatial-bg" aria-labelledby="contacto-title">
      {/* Floating particles */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 text-sm font-bold rounded-2xl mb-6 shadow-md">
            {currentLang === 'es' ? '💬 Hablemos de tu Proyecto' : '💬 Let\'s Talk About Your Project'}
          </div>
          <h2 id="contacto-title" className="text-6xl md:text-8xl font-black text-neutral-900 mb-12 tracking-tight animate-fade-in delay-150">
            <span className="text-shimmer">{content[currentLang].navContact}</span>
          </h2>
          <p className="text-2xl text-neutral-700 max-w-5xl mx-auto leading-relaxed animate-fade-in delay-200 font-medium">
            {currentLang === 'es'
              ? 'Agenda una consultoría gratuita y descubre cómo podemos transformar tu negocio con IA y automatización.'
              : 'Schedule a free consultation and discover how we can transform your business with AI and automation.'
            }
          </p>
        </div>
        
        <div className="grid md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-5 animate-fade-in delay-300">
            <div className="glass-card">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl animate-glow mb-6">
                  <span className="text-white font-bold text-2xl">★</span>
                </div>
                <h3 className="text-3xl font-bold text-neutral-900 mb-8">
                  {currentLang === 'es' ? '¿Por qué elegirnos?' : 'Why choose us?'}
                </h3>
              </div>
              
              <div className="space-y-6">
                <div className="group">
                  <div className="flex items-start space-x-4 p-4 rounded-2xl transition-all duration-150 hover:bg-white/10">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-150">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 mb-2 text-lg">
                        {currentLang === 'es' ? 'Consultoría Gratuita' : 'Free Consultation'}
                      </h4>
                      <p className="text-neutral-600">
                        {currentLang === 'es' ? 'Análisis inicial sin costo ni compromiso' : 'Initial analysis at no cost or commitment'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="group">
                  <div className="flex items-start space-x-4 p-4 rounded-2xl transition-all duration-150 hover:bg-white/10">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-150">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 mb-2 text-lg">
                        {currentLang === 'es' ? 'Soluciones Personalizadas' : 'Custom Solutions'}
                      </h4>
                      <p className="text-neutral-600">
                        {currentLang === 'es' ? 'Desarrollo a medida para tu industria' : 'Tailored development for your industry'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="group">
                  <div className="flex items-start space-x-4 p-4 rounded-2xl transition-all duration-150 hover:bg-white/10">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-150">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 mb-2 text-lg">
                        {currentLang === 'es' ? 'Soporte 24/7' : '24/7 Support'}
                      </h4>
                      <p className="text-neutral-600">
                        {currentLang === 'es' ? 'Acompañamiento completo post-implementación' : 'Complete post-implementation support'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="group">
                  <div className="flex items-start space-x-4 p-4 rounded-2xl transition-all duration-150 hover:bg-white/10">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-150">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 mb-2 text-lg">
                        {currentLang === 'es' ? 'Respuesta en 24h' : '24h Response'}
                      </h4>
                      <p className="text-neutral-600">
                        {currentLang === 'es' ? 'Te contactamos en menos de 24 horas' : 'We contact you in less than 24 hours'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-7 animate-fade-in delay-400">
            <form onSubmit={handleSubmit} className="glass-card space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="relative">
                  <input
                    type="text"
                    name="nombre"
                    placeholder={currentLang === 'es' ? 'Nombre completo' : 'Full name'}
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-5 glass-morphism border border-white/30 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-150 placeholder-neutral-500 text-lg font-medium"
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder={currentLang === 'es' ? 'Email corporativo' : 'Corporate email'}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-5 glass-morphism border border-white/30 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-150 placeholder-neutral-500 text-lg font-medium"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="empresa"
                    placeholder={currentLang === 'es' ? 'Empresa / Organización' : 'Company / Organization'}
                    value={formData.empresa}
                    onChange={handleChange}
                    className="w-full px-6 py-5 glass-morphism border border-white/30 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-150 placeholder-neutral-500 text-lg font-medium"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="celular"
                    placeholder={currentLang === 'es' ? 'Teléfono / WhatsApp' : 'Phone / WhatsApp'}
                    value={formData.celular}
                    onChange={handleChange}
                    className="w-full px-6 py-5 glass-morphism border border-white/30 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-150 placeholder-neutral-500 text-lg font-medium"
                  />
                </div>
              </div>
              
              <div className="relative">
                <textarea
                  name="mensaje"
                  placeholder={currentLang === 'es' ? 'Cuéntanos sobre tu proyecto y objetivos...' : 'Tell us about your project and goals...'}
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-6 py-5 glass-morphism border border-white/30 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-150 placeholder-neutral-500 text-lg font-medium resize-none"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={formState === 'submitting'}
                className="btn-primary w-full py-6 text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <span className="flex items-center justify-center space-x-4">
                  {formState === 'submitting' ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{currentLang === 'es' ? 'Enviando mensaje...' : 'Sending message...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                      <span>{currentLang === 'es' ? 'Enviar Mensaje' : 'Send Message'}</span>
                    </>
                  )}
                </span>
              </button>
              
              {formState === 'submitted' && (
                <div className="glass-morphism border border-emerald-300/50 rounded-2xl p-6 flex items-center space-x-4 animate-fade-in">
                  <CheckCircle className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                  <div>
                    <p className="text-emerald-800 font-semibold text-lg mb-1">
                      {currentLang === 'es'
                        ? '¡Mensaje enviado exitosamente! 🚀'
                        : 'Message sent successfully! 🚀'}
                    </p>
                    <p className="text-emerald-700 text-base">
                      {currentLang === 'es'
                        ? 'Revisa tu email para la confirmación. Te contactaremos en las próximas 24 horas.'
                        : 'Check your email for confirmation. We will contact you within the next 24 hours.'}
                    </p>
                  </div>
                </div>
              )}
              
              {formState === 'error' && (
                <div className="glass-morphism border border-red-300/50 rounded-2xl p-6 flex items-center space-x-4 animate-fade-in">
                  <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="text-red-800 font-semibold text-lg mb-1">
                      {currentLang === 'es'
                        ? 'Error al enviar el mensaje'
                        : 'Error sending message'}
                    </p>
                    <p className="text-red-700 text-base">
                      {currentLang === 'es'
                        ? 'Verifica que todos los campos obligatorios estén completos y que el email sea válido.'
                        : 'Please verify that all required fields are complete and the email is valid.'}
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
