
import React, { useState, useEffect } from 'react';
import { ViewType } from '../App';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; view: ViewType }[] = [
    { name: 'Accueil', view: 'home' },
    { name: 'Services', view: 'services' },
    { name: 'À Propos', view: 'about' },
    { name: 'Blog', view: 'blog' },
    { name: 'Contact', view: 'contact' },
  ];

  const handleNavClick = (view: ViewType) => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  const handleEmergencyCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = "tel:0649295099";
  };

  const logoImg = "images/logo.png";

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || currentView !== 'home' ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <button onClick={() => handleNavClick('home')} className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-700 shadow-lg group-hover:scale-110 transition-transform">
            <img src={logoImg} alt="Dr. Achour" className="w-full h-full object-cover" />
          </div>
          <span className={`text-xl font-bold tracking-tight transition-colors ${(isScrolled || currentView !== 'home') ? 'text-slate-900' : 'text-white'}`}>
            DR. <span className="text-red-700">ACHOUR</span>
          </span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-6 mr-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.view)}
                className={`text-sm font-semibold transition-all hover:text-red-700 relative pb-1 ${
                  currentView === link.view ? 'text-red-700 border-b-2 border-red-700' : 
                  (isScrolled || currentView !== 'home' ? 'text-slate-600' : 'text-white/90')
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleEmergencyCall}
              className="bg-red-600 animate-emergency text-white px-5 py-2.5 rounded-full text-xs font-black transition-all flex items-center gap-2 border-2 border-white/20 shadow-lg hover:bg-red-700 uppercase"
            >
              <span className="text-sm">🆘</span> URGENCE
            </button>
            
            <button
              onClick={() => handleNavClick('contact')}
              className="bg-slate-900 hover:bg-red-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg"
            >
              Prendre RDV
            </button>
          </div>
        </div>

        {/* Mobile Buttons */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={handleEmergencyCall}
            className="bg-red-600 animate-emergency text-white px-3 py-2 rounded-xl text-[10px] font-black flex items-center gap-1.5 shadow-lg border border-white/10"
          >
            🆘 URGENT
          </button>
          
          <button 
            className="p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${isScrolled || currentView !== 'home' ? 'bg-slate-900' : 'bg-white'}`}></div>
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${isScrolled || currentView !== 'home' ? 'bg-slate-900' : 'bg-white'}`}></div>
            <div className={`w-6 h-0.5 transition-all ${isScrolled || currentView !== 'home' ? 'bg-slate-900' : 'bg-white'}`}></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white fixed inset-x-0 top-[60px] shadow-2xl animate-fade-in-down border-t border-slate-100 h-screen">
          <div className="flex flex-col p-8 gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.view)}
                className={`text-2xl font-bold text-left py-2 border-b border-slate-50 ${currentView === link.view ? 'text-red-700' : 'text-slate-800'}`}
              >
                {link.name}
              </button>
            ))}
            
            <div className="flex flex-col gap-4 mt-6">
              <button
                onClick={handleEmergencyCall}
                className="bg-red-600 text-white py-4 rounded-2xl font-black text-xl flex items-center justify-center gap-3 animate-emergency"
              >
                🆘 APPEL URGENCE 24/7
              </button>
              
              <button
                onClick={() => handleNavClick('contact')}
                className="bg-slate-900 text-white py-4 rounded-2xl font-bold text-xl"
              >
                Prendre Rendez-vous
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
