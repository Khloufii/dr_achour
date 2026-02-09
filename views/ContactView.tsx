
import React from 'react';
import Contact from '../components/Contact';

const ContactView: React.FC = () => {
  return (
    <div className="py-12 animate-fade-in">
       <div className="container mx-auto px-6 mb-16">
        <div className="relative h-[300px] rounded-[3rem] overflow-hidden mb-12 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1586773860418-d3b9a8ec81a2?auto=format&fit=crop&q=80&w=2000" 
              className="absolute inset-0 w-full h-full object-cover" 
              alt="Localisation"
            />
            <div className="absolute inset-0 bg-slate-800/60 backdrop-blur-[2px]"></div>
            <div className="relative z-10 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Nous Trouver à Meknès</h1>
                <p className="text-slate-200 text-lg max-w-2xl mx-auto">
                    Prenez rendez-vous facilement via notre formulaire ou WhatsApp.
                </p>
            </div>
        </div>
      </div>
      <Contact />
      <div className="h-20"></div>
    </div>
  );
};

export default ContactView;
