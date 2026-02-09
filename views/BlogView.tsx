
import React from 'react';
import Blog from '../components/Blog';
import { ViewType } from '../App';

// Added onNavigate prop to resolve missing property errors in both App.tsx and when calling Blog
interface BlogViewProps {
  onNavigate: (view: ViewType, id?: string) => void;
}

const BlogView: React.FC<BlogViewProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 animate-fade-in">
       <div className="container mx-auto px-6 mb-16">
        <div className="relative h-[300px] rounded-[3rem] overflow-hidden mb-12 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2000" 
              className="absolute inset-0 w-full h-full object-cover" 
              alt="Blog"
            />
            <div className="absolute inset-0 bg-red-900/60 backdrop-blur-[2px]"></div>
            <div className="relative z-10 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Conseils Santé & Bien-être</h1>
                <p className="text-slate-200 text-lg max-w-2xl mx-auto">
                    Articles et actualités médicales rédigés par votre médecin pour vous informer.
                </p>
            </div>
        </div>
      </div>
      {/* Pass onNavigate to the child Blog component which requires it */}
      <Blog onNavigate={onNavigate} />
      <div className="h-20"></div>
    </div>
  );
};

export default BlogView;
