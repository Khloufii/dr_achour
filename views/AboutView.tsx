
import React from 'react';
import About from '../components/About';
import { ViewType } from '../App';
interface AboutViewProps {
  onNavigate: (view: ViewType) => void;
}

const AboutView: React.FC = ({ onNavigate }) => {
  return (
    <div className="py-12 animate-fade-in">
       <div className="container mx-auto px-6 mb-16">
        <div className="relative h-[300px] rounded-[3rem] overflow-hidden mb-12 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1504813184591-01592f25972f?auto=format&fit=crop&q=80&w=2000" 
              className="absolute inset-0 w-full h-full object-cover" 
              alt="Cabinet"
            />
            <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-[2px]"></div>
            <div className="relative z-10 text-center">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Parcours du Docteur Achour</h1>
                <p className="text-slate-200 text-base max-w-2xl mx-auto">
                    Une expertise forgée par des années d'études et de pratique entre le Maroc et la France.
                </p>
            </div>
        </div>
      </div>
      <About onNavigate={onNavigate}/>
      <div className="container mx-auto px-6 mt-20 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Engagement & Éthique Médicale</h3>
                  <p className="text-slate-600 text-base leading-relaxed mb-6">
                      Pour le Dr. Achour, soigner est un engagement quotidien qui allie rigueur scientifique et bienveillance humaine. 
                      Chaque consultation est une opportunité d'améliorer la santé de ses patients à travers une écoute active et des conseils personnalisés.
                  </p>
                  <p className="text-slate-600 text-base leading-relaxed">
                      Le cabinet de Meknès est conçu pour offrir un environnement serein, où la technologie d'échographie moderne complète l'examen clinique traditionnel pour un suivi de santé optimal.
                  </p>
              </div>
              <div className="rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white">
                  <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1000" alt="Consultation Professionnelle" />
              </div>
          </div>
      </div>
    </div>
  );
};

export default AboutView;
