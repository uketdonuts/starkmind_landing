import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import VerticalNav from './components/VerticalNav';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import DevelopmentServicesSection from './components/DevelopmentServicesSection';
import PortfolioSection from './components/PortfolioSection';
import DemoSection from './components/DemoSection';
import TechnologySection from './components/TechnologySection';
import CompanySection from './components/CompanySection';
import ContactSection from './components/ContactSection';
import WhatsAppButton from './components/WhatsAppButton';
import DemoLogin from './components/DemoLogin';
import DemoVideos from './components/DemoVideos';
import './App.css';

const AppContent: React.FC = () => {
  const { currentView, isAuthenticated } = useAuth();

  const renderMainSite = () => (
    <>
      <Header />
      <VerticalNav />
      <main>
        <HeroSection />
        <ServicesSection />
        <DevelopmentServicesSection />
        <PortfolioSection />
        <DemoSection />
        <TechnologySection />
        <CompanySection />
        <ContactSection />
      </main>
      <WhatsAppButton />
    </>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'login':
        return <DemoLogin />;
      case 'videos':
        return isAuthenticated ? <DemoVideos /> : <DemoLogin />;
      case 'home':
      default:
        return renderMainSite();
    }
  };

  return (
    <div className="App bg-gradient-to-br from-neutral-50 via-white to-neutral-100 text-neutral-800 font-normal antialiased">
      {renderContent()}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
