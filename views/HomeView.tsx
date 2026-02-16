
import React from 'react';
import Hero from '../components/Hero';
import Motivation from '../components/Motivation';
import Gallery from '../components/Gallery';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';
import Blog from '../components/Blog';
import { ViewType } from '../App';

interface HomeViewProps {
  onNavigate: (view: ViewType, id?: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="-mt-20">
      <Hero onNavigate={onNavigate} />
      
      {/* Section Services sur Home */}
      <section className="py-32 bg-[#020617] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(185,28,28,0.05),transparent_65%)]"></div>
        <Services onNavigate={onNavigate} isListView={true} />
        <div className="text-center mt-24 animate-reveal">
          <button onClick={() => onNavigate('services')} className="group relative bg-white text-slate-900 px-20 py-7 rounded-[3rem] font-black text-2xl overflow-hidden transition-all hover:pr-24 hover:shadow-[0_0_50px_rgba(255,255,255,0.15)] active:scale-95">
            <span className="relative z-10">DÉCOUVRIR L'EXPERTISE</span>
            <span className="absolute right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all text-3xl">➔</span>
          </button>
        </div>
      </section>
      
      

      {/* Nouvelle Section: Consultation & Prise en charge Personnalisée */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
          <div className="container mx-auto px-6">
              <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                  <div className="w-full lg:w-1/2 animate-reveal">
                      <div className="relative">
                          <img 
                            src="/images/Consultation.webp" 
                            alt="Consultation personnalisée" 
                            className="rounded-[3rem] shadow-2xl border-8 border-white/10"
                          />
                          <div className="absolute -bottom-8 -right-8 bg-red-700 p-8 rounded-[2rem] shadow-2xl animate-bounce">
                              <span className="text-4xl">👨‍⚕️</span>
                          </div>
                      </div>
                  </div>
                  <div className="w-full lg:w-1/2 space-y-8 animate-reveal delay-2">
                      <span className="text-red-500 font-black tracking-[0.4em] uppercase text-xs">Innovation & Écoute</span>
                      <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter">
                          Consultation & <br /> <span className="text-red-600">Suivi sur Mesure</span>
                      </h2>
                      <p className="text-slate-400 text-xl leading-relaxed">
                          Chaque patient est unique. Nous avons conçu un protocole de prise en charge personnalisée qui allie diagnostic technologique et écoute clinique profonde.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                          <div className="flex gap-4 items-center bg-white/5 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                              <span className="text-3xl">🗓️</span>
                              <div>
                                  <h4 className="font-bold">RDV Prioritaire</h4>
                                  <p className="text-slate-500 text-sm">Gestion fluide de votre temps.</p>
                              </div>
                          </div>
                          <div className="flex gap-4 items-center bg-white/5 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                              <span className="text-3xl">🔬</span>
                              <div>
                                  <h4 className="font-bold">Bilan Global</h4>
                                  <p className="text-slate-500 text-sm">Analyse médicale complète.</p>
                              </div>
                          </div>
                          <div className="flex gap-4 items-center bg-white/5 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                              <span className="text-3xl">📱</span>
                              <div>
                                  <h4 className="font-bold">Télé-Suivi</h4>
                                  <p className="text-slate-500 text-sm">Réponse rapide via WhatsApp.</p>
                              </div>
                          </div>
                          <div className="flex gap-4 items-center bg-white/5 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                              <span className="text-3xl">📜</span>
                              <div>
                                  <h4 className="font-bold">Dossier Digital</h4>
                                  <p className="text-slate-500 text-sm">Historique sécurisé.</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

 {/* Section 2: Motivation, IA & Expertise (Nouvelles sections) */}
      
       
    
      
      {/* Section À Propos sur Home */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <About onNavigate={onNavigate} />
        <div className="text-center mt-12">
            <button 
                onClick={() => onNavigate('about')}
                className="text-slate-900 font-bold border-2 border-slate-900 px-8 py-3 rounded-full hover:bg-slate-900 hover:text-white transition-all text-base"
            >
                En savoir plus sur le parcours du Docteur
            </button>
        </div>
      </section>

      {/* Section Blog sur Home */}
      <section className="py-24 bg-white">
        <Blog onNavigate={onNavigate} isListView={true} />
        <div className="text-center mt-12">
            <button 
                onClick={() => onNavigate('blog')}
                className="text-red-700 font-bold border-2 border-red-700 px-8 py-3 rounded-full hover:bg-red-700 hover:text-white transition-all text-base"
            >
                Voir tous nos articles santé
            </button>
        </div>
      </section>

      {/* Section Motivation sur Home */}
      <section className="py-40 bg-[#020617] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(185,28,28,0.08),transparent_70%)]"></div>
        <div className="container mx-auto px-6 text-center mb-24 relative z-10 animate-reveal">
          <span className="text-red-600 font-black tracking-[0.6em] uppercase text-xs mb-4 block">Vision & Engagement / رؤية والتزام</span>
          <h2 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter">Médecin <span className="text-red-700">Citoyen</span></h2>
          <p className="text-2xl font-arabic font-bold text-slate-400">دور الطبيب العام داخل المنظومة الصحية والالتزام بخدمة المواطن</p>
          <div className="w-40 h-1.5 bg-red-700 mx-auto mt-12 rounded-full shadow-[0_0_30px_rgba(185,28,28,0.8)]"></div>
        </div>
        <Motivation />
      </section>

      {/* Section Galerie sur Home */}
      <section className="py-24 bg-white">
        <Gallery />
      </section>

      {/* Section Contact & Formulaire sur Home */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <Contact />
      </section>
    </div>
  );
};

export default HomeView;
