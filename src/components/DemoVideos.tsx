import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const DemoVideos: React.FC = () => {
  const { logout, setCurrentView } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string>('');

  const videos = [
    {
      id: 2,
      title: "DHL - Sistema de Cotizaciones",
      description: "Sistema de cotización automática para servicios de envío internacional. Plataforma completa para gestión de envíos con cotización en tiempo real, seguimiento de paquetes y administración de servicios.",
      videoSrc: "/img/Portfolio/agendify/example.mp4",
      thumbnail: "/img/Portfolio/DHL/cotizar.png"
    }
    // Temporalmente ocultos:
    // Agendify - Sistema de Reservas
    // Sistema Contable
  ];

  const handleLogout = () => {
    logout();
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  const openModal = (videoSrc: string) => {
    setCurrentVideo(videoSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideo('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-neutral-800">
              Demos de Productos
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToHome}
                className="text-neutral-600 hover:text-neutral-800 transition-colors"
              >
                Inicio
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">
            Demostraciones de Nuestros Productos
          </h2>
          <p className="text-lg text-neutral-600">
            Explora las funcionalidades principales de nuestras soluciones profesionales
          </p>
        </div>

        <div className="flex justify-center">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-200" style={{ maxWidth: '450px' }}>
              <div 
                className="bg-neutral-100 relative cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openModal(video.videoSrc)}
              >
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full"
                  style={{ display: 'block' }}
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black bg-opacity-60 rounded-full p-6 hover:bg-opacity-80 transition-all">
                    <svg 
                      className="w-16 h-16 text-white" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-800 mb-2">
                  {video.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para video */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* Botón cerrar */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Video en modal */}
            <div className="bg-black rounded-lg overflow-hidden">
              <video
                controls
                autoPlay
                className="w-full"
                controlsList="nodownload"
                style={{ outline: 'none', display: 'block', maxHeight: '80vh' }}
              >
                <source src={currentVideo} type="video/mp4" />
                Tu navegador no soporta la reproducción de videos.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoVideos;