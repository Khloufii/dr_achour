
import React from 'react';
import { ViewType } from '../App';

export const blogPosts = [
  {
    id: '1',
    title: 'Comment renforcer son système immunitaire en hiver ?',
    excerpt: 'Découvrez nos conseils pratiques pour traverser la saison froide en pleine forme et éviter les virus.',
    date: '12 Jan 2026',
    imageUrl: 'images/immunitaire en hiver.webp'
  },
  {
    id: '2',
    title: 'L\'importance du bilan de santé annuel',
    excerpt: 'Pourquoi ne pas attendre d\'être malade pour consulter son médecin généraliste et faire un check-up.',
    date: '05 Jan 2026',
    imageUrl: 'images/bilant.webp'
  },
  {
    id: '3',
    title: 'Nutrition : Les mythes et réalités du sucre',
    excerpt: 'Tout comprendre sur l\'impact du sucre sur votre santé au quotidien et comment réduire sa consommation.',
    date: '28 Dec 2026',
    imageUrl: 'images/sucr.webp'
  }
];

interface BlogProps {
  onNavigate: (view: ViewType, id?: string) => void;
  isListView?: boolean;
}

const Blog: React.FC<BlogProps> = ({ onNavigate, isListView }) => {
  const displayPosts = isListView ? blogPosts.slice(0, 3) : blogPosts;

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-red-700 font-bold tracking-widest uppercase text-sm">Conseils Santé</span>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2">Le Blog de la Santé</h2>
        <div className="w-20 h-1.5 bg-red-700 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all border border-slate-100 flex flex-col">
            <div className="h-56 relative overflow-hidden">
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              <div className="absolute top-4 left-4 bg-red-700 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Médecine
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <span className="text-slate-400 text-sm font-medium mb-2">{post.date}</span>
              <h3 className="text-xl font-bold text-slate-900 mb-4 leading-snug">{post.title}</h3>
              <p className="text-slate-600 mb-8 line-clamp-3 text-base">
                {post.excerpt}
              </p>
              <button 
                onClick={() => onNavigate('blog-detail', post.id)}
                className="mt-auto text-red-700 font-bold border-b-2 border-red-700 w-fit hover:text-red-900 hover:border-red-900 transition-colors text-base"
              >
                Lire l'article complet
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
