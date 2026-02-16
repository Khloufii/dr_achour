
import React, { useState, useEffect } from 'react';
import { ViewType } from '../App';

interface AboutProps {
  onNavigate: (view: ViewType) => void;
}
const doctorImages = [
  'images/profil1.jpg',
  'images/profil2.jpeg'
];

const About: React.FC = ({ onNavigate }) => {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % doctorImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row items-center gap-20">
        {/* Image Part */}
        <div className="w-full lg:w-5/12 relative">
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl aspect-[3/4] border-8 border-white">
            {doctorImages.map((img, idx) => (
              <img 
                key={img}
                src={img}
                alt="Dr. El Mustapha Achour"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1500 ${idx === imgIndex ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-110 rotate-3'}`}
              />
            ))}
          </div>
          <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-red-700 rounded-[3rem] -z-10 translate-x-4 translate-y-4"></div>
          
          <div className="absolute top-10 -left-10 bg-white p-2 rounded-3xl shadow-2xl z-20 hidden md:block border-l-8 border-red-700">
            <p className="text-red-700 font-bold text-1xl mb-1 italic">Meknès</p>
            <p className="text-slate-500 font-medium">Cabinet d'Excellence</p>
          </div>
        </div>

        {/* Text Part */}
        <div className="w-full lg:w-18/12">
         <span className="text-red-700 font-black tracking-[0.5em] uppercase text-xs block">Le Médecin Citoyen / الطبيب المواطن</span>
          <span className="text-red-700 font-bold tracking-[0.3em] uppercase text-sm block mb-4">Parcours Académique</span>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-[1.1]">
            Un Expert Diplômé de <span className="text-red-700">Rabat et de France</span>
          </h2>
           <p className="text-2xl font-arabic font-bold text-slate-500 mt-6 leading-relaxed">
              Rôle central au sein du système de santé marocain : Efficacité et engagement.
            </p>
           
          <div className="space-y-8">
             <div className="bg-slate-50 p-5 rounded-[2rem] border-l-[12px] border-red-700 shadow-inner italic">
            <p className="text-slate-800 text-xl md:text-1xl font-medium leading-relaxed">
              "L'accent est mis sur mon rôle central de médecin généraliste au sein du système de santé. Mon objectif est d'exercer avec efficacité au service des citoyens au sein d'une structure nationale et citoyenne."
            </p>
          </div>
            <div className="flex gap-6 items-start p-6 bg-white rounded-3xl border-l-4 border-red-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl text-red-700">🎓</div>
                <div>
                    <h4 className="font-bold text-xl text-slate-900 mb-1">Lauréat de la Faculté de Médecine de Rabat</h4>
                    <p className="text-slate-600">Diplômé de la Faculté de Médecine, de Pharmacie et du C.H.U. Ibn Sina.</p>
                </div>
            </div>

            <div className="flex gap-6 items-start p-6 bg-white rounded-3xl border-l-4 border-red-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl text-red-700">🇫🇷</div>
                <div>
                    <h4 className="font-bold text-xl text-slate-900 mb-1">Diplômé de la Faculté de Montreuil, France</h4>
                    <p className="text-slate-600">Maître de Stage Universitaire de Médecine Générale.</p>
                </div>
            </div>

            <div className="flex gap-6 items-start p-6 bg-white rounded-3xl border-l-4 border-red-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl text-red-700">⚕️</div>
                <div>
                    <h4 className="font-bold text-xl text-slate-900 mb-1">Certificats de Spécialisation</h4>
                    <ul className="text-slate-600 mt-2 space-y-1 list-disc list-inside">
                        <li>Formation spécialisée sur l'Épilepsie</li>
                        <li>Traitement avancé des Douleurs</li>
                        <li>Expertise en Échographie Médicale</li>
                    </ul>
                </div>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-8">
 <button 
                onClick={() => onNavigate('contact')} 
                className="bg-slate-900 text-white px-10 py-5 rounded-full font-bold transition-all hover:bg-red-700 transform hover:-translate-y-1 shadow-lg"
              >                Consulter le Docteur
               </button>
              <div className="flex -space-x-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-slate-200">
                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Patient" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-red-700 flex items-center justify-center text-white text-xs font-bold">
                    +1k
                  </div>
              </div>
          </div>
          
        </div>
      </div>
       <div className="container mx-auto px-6 mt-24 mb-20">
          <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">Nos Axes de Pratique</h2>
              <div className="w-16 h-1 bg-red-700 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                  { title: "Psychologie & Soutien", desc: "Prise en charge globale physique et mentale, adaptée au profil psychosocial de chaque citoyen." },
                  { title: "Décisions Éclairées", desc: "Transparence totale sur les stratégies thérapeutiques en accord avec le contexte socio-économique." },
                  { title: "Suivi Documenté", desc: "Assurance d'un suivi médical hiérarchisé, rationnel et communicatif avec le patient et ses aidants." },
                  { title: "Éducation Sanitaire", desc: "Promotion d'une éducation participative basée sur les programmes de santé nationaux." },
                  { title: "Médecin Citoyen", desc: "Engagement actif dans les programmes de santé publique et fidélisation basée sur la confiance." },
                  { title: "Collaboration Ouverte", desc: "Implication de tous les acteurs de soins dans les décisions importantes concernant le patient." }
              ].map((item, idx) => (
                  <div key={idx} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                      <h4 className="font-black text-red-700 text-xl mb-4 uppercase tracking-tighter">{item.title}</h4>
                      <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};

export default About;
