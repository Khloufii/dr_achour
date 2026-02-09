
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeView from './views/HomeView';
import ServicesView from './views/ServicesView';
import AboutView from './views/AboutView';
import BlogView from './views/BlogView';
import ContactView from './views/ContactView';
import ServiceDetailView from './views/ServiceDetailView';
import BlogDetailView from './views/BlogDetailView';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import SEO from './components/SEO';

export type ViewType = 'home' | 'services' | 'about' | 'blog' | 'contact' | 'service-detail' | 'blog-detail';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Scroll to top when changing views
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, selectedId]);

  const handleNavigate = (view: ViewType, id?: string) => {
    if (id) setSelectedId(id);
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesView onNavigate={handleNavigate} />;
      case 'about':
        return <AboutView onNavigate={handleNavigate} />;
      case 'blog':
        return <BlogView onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactView />;
      case 'service-detail':
        return <ServiceDetailView serviceId={selectedId} onNavigate={handleNavigate} />;
      case 'blog-detail':
        return <BlogDetailView postId={selectedId} onNavigate={handleNavigate} />;
      default:
        return <HomeView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-slate-50">
      <SEO />
      <Navbar currentView={currentView} onNavigate={handleNavigate} />
      
      <main className="flex-grow pt-20">
        {renderView()}
      </main>

      <Footer onNavigate={handleNavigate} />
      <WhatsAppButton />
    </div>
  );
};

export default App;
