
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import HomeView from './views/HomeView';
import ServicesView from './views/ServicesView';
import AboutView from './views/AboutView';
import BlogView from './views/BlogView';
import ContactView from './views/ContactView';
import ServiceDetailView from './views/ServiceDetailView';
import BlogDetailView from './views/BlogDetailView';
import LoginView from './views/LoginView';
import AdminDashboardView from './views/AdminDashboardView';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import SEO from './components/SEO';
import { auth } from './firebase';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

export type ViewType = 'home' | 'services' | 'about' | 'blog' | 'contact' | 'service-detail' | 'blog-detail' | 'login' | 'admin';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  // Parse hash to set state (Solves the "Not Found" on refresh issue)
  const parseLocation = useCallback(() => {
    const hash = window.location.hash || '#/';
    
    if (hash === '#/' || hash === '') setCurrentView('home');
    else if (hash === '#/services') setCurrentView('services');
    else if (hash === '#/a-propos') setCurrentView('about');
    else if (hash === '#/blog') setCurrentView('blog');
    else if (hash === '#/contact') setCurrentView('contact');
    else if (hash === '#/login') setCurrentView('login');
    else if (hash === '#/dashboard') setCurrentView('admin');
    else if (hash.startsWith('#/service/')) {
      const id = hash.split('/')[2];
      setSelectedId(id);
      setCurrentView('service-detail');
    }
    else if (hash.startsWith('#/article/')) {
      const id = hash.split('/')[2];
      setSelectedId(id);
      setCurrentView('blog-detail');
    }
    else setCurrentView('home');
  }, []);

  useEffect(() => {
    parseLocation();
    window.addEventListener('hashchange', parseLocation);
    return () => window.removeEventListener('hashchange', parseLocation);
  }, [parseLocation]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // Auto-redirect to dashboard if logged in and trying to access login
      if (currentUser && window.location.hash === '#/login') {
        handleNavigate('admin');
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, selectedId]);

  const handleNavigate = (view: ViewType, id?: string) => {
    let hash = '#/';
    switch (view) {
      case 'home': hash = '#/'; break;
      case 'services': hash = '#/services'; break;
      case 'about': hash = '#/a-propos'; break;
      case 'blog': hash = '#/blog'; break;
      case 'contact': hash = '#/contact'; break;
      case 'login': hash = '#/login'; break;
      case 'admin': hash = '#/dashboard'; break;
      case 'service-detail': hash = `#/service/${id}`; break;
      case 'blog-detail': hash = `#/article/${id}`; break;
    }
    
    if (id) setSelectedId(id);
    window.location.hash = hash;
  };

  const renderView = () => {
    switch (currentView) {
      case 'home': return <HomeView onNavigate={handleNavigate} />;
      case 'services': return <ServicesView onNavigate={handleNavigate} />;
      case 'about': return <AboutView onNavigate={handleNavigate} />;
      case 'blog': return <BlogView onNavigate={handleNavigate} />;
      case 'contact': return <ContactView />;
      case 'service-detail': return <ServiceDetailView serviceId={selectedId} onNavigate={handleNavigate} />;
      case 'blog-detail': return <BlogDetailView postId={selectedId} onNavigate={handleNavigate} />;
      case 'login': return <LoginView onNavigate={handleNavigate} />;
      case 'admin': return user ? <AdminDashboardView /> : <LoginView onNavigate={handleNavigate} />;
      default: return <HomeView onNavigate={handleNavigate} />;
    }
  };

  const isFullPage = currentView === 'admin' || currentView === 'login';

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-slate-50 font-sans">
      <SEO currentView={currentView} />
      {!isFullPage && <Navbar currentView={currentView} onNavigate={handleNavigate} user={user} />}
      
      <main className={`flex-grow ${!isFullPage ? 'pt-20' : ''}`}>
        {renderView()}
      </main>

      {!isFullPage && <Footer onNavigate={handleNavigate} />}
      {!isFullPage && <WhatsAppButton />}
    </div>
  );
};

export default App;
