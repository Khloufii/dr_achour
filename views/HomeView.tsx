
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
      <section className="py-24 bg-white">
        <Services onNavigate={onNavigate} isListView={true} />
        <div className="text-center mt-12">
            <button 
                onClick={() => onNavigate('services')}
                className="text-red-700 font-bold border-2 border-red-700 px-8 py-3 rounded-full hover:bg-red-700 hover:text-white transition-all text-base"
            >
                Explorer tous les services
            </button>
        </div>
      </section>

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
      <section className="py-24 bg-medical-gradient text-white">
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
