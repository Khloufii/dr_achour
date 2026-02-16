
import React, { useState, useEffect } from 'react';
import { ViewType } from '../App';

interface HeroProps {
  onNavigate: (view: ViewType) => void;
}

const images = [
  'images/img6.jpeg',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2000'
];

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      {images.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImage ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
          style={{
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'transform 12s ease-out, opacity 1.5s ease-in-out'
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10 text-center">
       <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="mb-8 animate-reveal">
          <div className="w-16 h-16 mx-auto rounded-[2.5rem] border-4 border-red-600 overflow-hidden shadow-2xl mb-8 bg-white transform hover:rotate-0 transition-transform duration-500">
            <img src="/images/profil1.jpg" alt="Dr. Achour" className="w-full h-full object-cover" />
          </div>
        </div>
        </div>
        
       <div className="space-y-4 mb-10">
                    <span className="bg-red-700 text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.3em]">Médecin Citoyen / طبيب مواطن</span>
            <h2 className="text-3xl md:text-5xl text-white font-arabic font-bold mb-2">
              Cabinet Médical Dr. El Mustapha Achour
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
           
            <p className="text-white/80 text-lg md:text-2xl font-medium max-w-2xl mx-auto italic">
              "Votre santé est notre priorité au cœur de Meknès."
            </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 mb-12">
            <div className="flex flex-col items-center">
                <span className="text-teal-400 font-bold text-2xl uppercase tracking-widest">Médecine Générale</span>
                <span className="text-white/70 font-arabic text-xl">الطب العام</span>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/20"></div>
            <div className="flex flex-col items-center">
                <span className="text-teal-400 font-bold text-2xl uppercase tracking-widest">Échographie Médicale</span>
                <span className="text-white/70 font-arabic text-xl">الفحص بالصدى</span>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button 
            onClick={() => onNavigate('contact')}
            className="bg-red-700 hover:bg-red-800 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-2xl hover:shadow-red-600/40"
          >
            Prendre Rendez-vous
          </button>
          <button 
            onClick={() => onNavigate('services')}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-5 rounded-full font-bold text-lg transition-all"
          >
            Nos Compétences
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-12 h-1 transition-all rounded-full ${index === currentImage ? 'bg-red-600' : 'bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
