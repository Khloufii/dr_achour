
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

  // Parse current URL to set state
  const parseLocation = useCallback(() => {
    const path = window.location.pathname;
    if (path === '/') setCurrentView('home');
    else if (path === '/services') setCurrentView('services');
    else if (path === '/a-propos') setCurrentView('about');
    else if (path === '/blog') setCurrentView('blog');
    else if (path === '/contact') setCurrentView('contact');
    else if (path === '/login') setCurrentView('login');
    else if (path === '/dashboard') setCurrentView('admin');
    else if (path.startsWith('/service/')) {
      const id = path.split('/')[2];
      setSelectedId(id);
      setCurrentView('service-detail');
    }
    else if (path.startsWith('/article/')) {
      const id = path.split('/')[2];
      setSelectedId(id);
      setCurrentView('blog-detail');
    }
    else setCurrentView('home');
  }, []);

  useEffect(() => {
    parseLocation();
    window.addEventListener('popstate', parseLocation);
    return () => window.removeEventListener('popstate', parseLocation);
  }, [parseLocation]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // Auto-redirect if logged in and on login page
      if (currentUser && window.location.pathname === '/login') {
        handleNavigate('admin');
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, selectedId]);

  const handleNavigate = (view: ViewType, id?: string) => {
    let path = '/';
    switch (view) {
      case 'home': path = '/'; break;
      case 'services': path = '/services'; break;
      case 'about': path = '/a-propos'; break;
      case 'blog': path = '/blog'; break;
      case 'contact': path = '/contact'; break;
      case 'login': path = '/login'; break;
      case 'admin': path = '/dashboard'; break;
      case 'service-detail': path = `/service/${id}`; break;
      case 'blog-detail': path = `/article/${id}`; break;
    }
    
    if (id) setSelectedId(id);
    window.history.pushState({}, '', path);
    setCurrentView(view);
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
