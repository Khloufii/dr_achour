
import React from 'react';
import Services from '../components/Services';
import { ViewType } from '../App';

// Added onNavigate prop to resolve missing property errors in both App.tsx and when calling Services
interface ServicesViewProps {
  onNavigate: (view: ViewType, id?: string) => void;
}

const ServicesView: React.FC<ServicesViewProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 animate-fade-in">
      <div className="container mx-auto px-6 mb-16">
        <div className="relative h-[300px] rounded-[3rem] overflow-hidden mb-12 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000" 
              className="absolute inset-0 w-full h-full object-cover" 
              alt="Services"
            />
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
            <div className="relative z-10 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Nos Services Médicaux</h1>
                <p className="text-slate-200 text-lg max-w-2xl mx-auto">
                    Une expertise complète pour toute la famille, du nourrisson au senior.
                </p>
            </div>
        </div>
      </div>
      {/* Pass onNavigate to the child Services component which requires it */}
      <Services onNavigate={onNavigate} />
      <div className="container mx-auto px-6 mt-20 pb-20">
          <div className="bg-red-50 p-10 rounded-[3rem] border border-red-100">
              <h2 className="text-2xl font-bold text-red-900 mb-6 text-center">Prise en Charge Spécifique</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                      <h3 className="font-bold text-lg text-slate-800">Neurologie & Épilepsie</h3>
                      <p className="text-slate-600 text-base leading-relaxed">
                          Le Dr. Achour possède une expertise particulière dans le diagnostic et le suivi des syndromes épileptiques. 
                          Nous assurons une éducation thérapeutique pour les patients et leurs familles, afin de mieux vivre 
                          avec cette pathologie au quotidien. Un suivi médicamenteux rigoureux est mis en place pour stabiliser 
                          les crises et améliorer la qualité de vie.
                      </p>
                  </div>
                  <div className="space-y-4">
                      <h3 className="font-bold text-lg text-slate-800">Gestion de la Douleur</h3>
                      <p className="text-slate-600 text-base leading-relaxed">
                          La douleur ne doit pas être une fatalité. Diplômé dans le traitement des douleurs, le Dr. Achour 
                          propose des protocoles personnalisés pour les douleurs chroniques, articulaires ou neuropathiques. 
                          Nous utilisons une approche multimodale combinant traitements classiques et conseils ergonomiques.
                      </p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ServicesView;
