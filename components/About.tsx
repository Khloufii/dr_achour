
import React, { useState, useEffect } from 'react';
import { ViewType } from '../App';

interface AboutProps {
  onNavigate: (view: ViewType) => void;
}

const doctorImages = [
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=1000', // Professional doctor photo
  'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1000' // Diagnostic setting
];

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % doctorImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row items-center gap-24">
        {/* Cinematic Image Layering */}
        <div className="w-full lg:w-1/2 relative animate-reveal">
          <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] aspect-[4/5] border-[12px] border-white bg-slate-200">
            {doctorImages.map((img, idx) => (
              <img 
                key={img}
                src={img}
                alt="Dr. El Mustapha Achour"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ease-out ${idx === imgIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-125'}`}
              />
            ))}
          </div>
          
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-700/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-700/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="absolute -bottom-12 -right-12 bg-slate-900 p-10 rounded-[3rem] shadow-2xl z-20 border border-white/10 hidden md:block">
            <div className="text-center">
              <p className="text-red-500 font-black text-5xl mb-1">20+</p>
              <p className="text-white/60 font-bold uppercase tracking-widest text-[10px]">Années d'Expérience</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 space-y-10 animate-reveal delay-2">
          <div>
            <span className="text-red-700 font-black tracking-[0.5em] uppercase text-xs block mb-6">Expertise Internationale</span>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.95] tracking-tighter">
              Une Vie au Service de la <span className="text-red-700">Santé</span>
            </h2>
          </div>
          
          <p className="text-slate-500 text-xl leading-relaxed font-medium italic">
            "Ma philosophie repose sur une alliance entre la rigueur de la médecine moderne et une écoute humaine de proximité à Meknès."
          </p>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex gap-8 items-start group p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="w-16 h-16 shrink-0 bg-red-50 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-red-700 group-hover:text-white transition-all">🎓</div>
                <div>
                    <h4 className="font-black text-xl text-slate-900 mb-2">Diplômé de Rabat & Montreuil</h4>
                    <p className="text-slate-500 leading-relaxed font-medium">Lauréat du C.H.U. Ibn Sina et Maître de Stage Universitaire en France.</p>
                </div>
            </div>

            <div className="flex gap-8 items-start group p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="w-16 h-16 shrink-0 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-blue-800 group-hover:text-white transition-all">🔬</div>
                <div>
                    <h4 className="font-black text-xl text-slate-900 mb-2">Spécialisations Avancées</h4>
                    <p className="text-slate-500 leading-relaxed font-medium">Expertise certifiée en Épileptologie, Douleur et Échographie Médicale.</p>
                </div>
            </div>
          </div>

          <div className="pt-8 flex flex-wrap items-center gap-10">
              <button 
                onClick={() => onNavigate('contact')} 
                className="bg-slate-900 text-white px-12 py-6 rounded-[2rem] font-black text-lg transition-all hover:bg-red-700 transform hover:scale-105 active:scale-95 shadow-[0_20px_40px_-10px_rgba(15,23,42,0.3)]"
              >
                Prendre rendez-vous
              </button>
              
              <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-slate-200">
                          <img src={`https://i.pravatar.cc/150?u=doc${i}`} alt="Patient" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-slate-900 font-black leading-none">1,500+</p>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Patients Suivis</p>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
