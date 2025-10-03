import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
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
import './App.css';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="App bg-gradient-to-br from-neutral-50 via-white to-neutral-100 text-neutral-800 font-normal antialiased">
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
      </div>
    </LanguageProvider>
  );
};

export default App;
