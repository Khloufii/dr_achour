
import React from 'react';

const galleryImages = [
  { url: 'images/img6.jpeg', title: 'Salle d\'attente' },
  { url: 'images/profil2.jpeg', title: 'Bureau de Consultation' },
  { url: 'images/img3.jpeg', title: 'Équipement Moderne' },
  { url: 'images/img4.jpeg', title: 'Espace Accueil' },
  { url: 'images/img7.jpeg', title: 'Hygiène & Sécurité' },
  { url: 'images/img8.jpeg', title: 'Exterieur' }
];

const Gallery: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-teal-600 font-bold tracking-widest uppercase text-sm">Immersion</span>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2">Notre Cabinet en Images</h2>
        <div className="w-20 h-1.5 bg-teal-500 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((item, idx) => (
          <div key={idx} className="group relative overflow-hidden rounded-3xl aspect-video bg-slate-100 shadow-lg">
            <img 
              src={item.url} 
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
              <p className="text-white font-bold text-xl">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
