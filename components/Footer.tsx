
import React from 'react';
import { ViewType } from '../App';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const logoImg = "images/logo.png";

  const socialLinks = [
    {
      name: 'Facebook',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      ),
      url: 'https://www.facebook.com/AchourElMustapha/'
    },
    {
      name: 'Instagram',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.01 3.71.054 1.14.044 1.918.27 2.616.55.713.28 1.314.644 1.885 1.215.57.571.94 1.172 1.215 1.885.28.698.506 1.476.55 2.616.044.926.054 1.28.054 3.71s-.01 2.784-.054 3.71c-.044 1.14-.27 1.918-.55 2.616a5.022 5.022 0 01-1.215 1.885c-.571.57-.172.94-1.885 1.215-.698.28-1.476.506-2.616.55-.926.044-1.28.054-3.71.054s-2.784-.01-3.71-.054c-1.14-.044-1.918-.27-2.616-.55a5.022 5.022 0 01-1.885-1.215c-.57-.571-.94-1.172-1.215-1.885-.28-.698-.506-1.476-.55-2.616C2.01 14.784 2 14.43 2 12s.01-2.784.054-3.71c.044-1.14.27-1.918.55-2.616a5.022 5.022 0 011.215-1.885c.571-.57 1.172-.94 1.885-1.215.698-.28 1.476-.506 2.616-.55C9.216 2.01 9.57 2 12 2zm0 2.454c-2.422 0-2.704.01-3.66.054-.886.04-1.365.188-1.685.312-.424.164-.727.36-.104.68-.34.34-.537.643-.7.1065-.124.32-.27.8-.312 1.685-.044.956-.054 1.238-.054 3.66s.01 2.704.054 3.66c.04.886.188 1.365.312 1.685.164.424.36.727.68 1.04.34.34.643.537 1.065.7.32.124.8.27 1.685.312.956.044 1.238.054 3.66.054s2.704-.01 3.66-.054c.886-.04 1.365-.188 1.685-.312.424-.164.727-.36 1.04-.68.34-.34.537-.643.7-1.065.124-.32.27-.8.312-1.685.044-.956.054-1.238.054-3.66s-.01-2.704-.054-3.66c-.04-.886-.188-1.365-.312-1.685-.164-.424-.36-.727-.68-1.04-.34-.34-.643-.537-1.065-.7-.32-.124-.8-.27-1.685-.312-.956-.044-1.238-.054-3.66-.054zM12 6.865A5.135 5.135 0 1012 17.135 5.135 5.135 0 0012 6.865zm0 8.226a3.091 3.091 0 110-6.182 3.091 3.091 0 010 6.182zm6.182-9.522a1.201 1.201 0 11-2.402 0 1.201 1.201 0 012.402 0z" clipRule="evenodd" />
        </svg>
      ),
      url: 'https://www.instagram.com/cabinet_achour_meknes/'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      url: 'https://ma.linkedin.com/in/el-mustapha-achour-9b4b7aa3'
    }
  ];

  return (
    <footer className="bg-[#0f172a] text-white pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
             <button onClick={() => handleNavClick('home')} className="flex items-center gap-3 group text-left">
          <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md border border-slate-100 group-hover:scale-110 transition-transform">
            <img 
              src="images/logo.png" 
              alt="Dr. Achour" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className='text-sm font-arabic font-bold leading-none text-white'>
              الدكتور المصطفى عشور
            </span>
            <span className={'text-lg font-black tracking-tighter leading-tight transition-colors text-white'}>
              DR. EL MUSTAPHA <span className="text-red-700">ACHOUR</span>
            </span>
          </div>
        </button>
            <p className="text-slate-400 leading-relaxed text-base italic">
              "L'excellence médicale au service de votre bien-être quotidien, avec une expertise reconnue à Meknès et à l'international."
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-red-700 transition-all duration-300 text-white hover:scale-110"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8 flex items-center gap-2">
                <span className="w-6 h-1 bg-red-700 rounded-full"></span> 
                Cabinet
            </h4>
            <ul className="space-y-5 text-slate-400">
              <li><button onClick={() => onNavigate('home')} className="hover:text-red-500 transition-colors">Accueil</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-red-500 transition-colors">Nos Services</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-red-500 transition-colors">Parcours Docteur</button></li>
              <li><button onClick={() => onNavigate('blog')} className="hover:text-red-500 transition-colors">Conseils de Santé</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8 flex items-center gap-2">
                <span className="w-6 h-1 bg-red-700 rounded-full"></span> 
                Spécialités
            </h4>
            <ul className="space-y-5 text-slate-400">
              <li className="text-base">Échographie Médicale</li>
              <li className="text-base">Traitement des Douleurs</li>
              <li className="text-base">Épileptologie</li>
              <li className="text-base">Médecine Générale</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8 flex items-center gap-2">
                <span className="w-6 h-1 bg-red-700 rounded-full"></span> 
                Direct
            </h4>
            <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                <p className="text-slate-300 font-bold mb-2">Urgences 24/7:</p>
                <p className="text-red-500 font-black text-xl mb-4">06.49.29.50.99</p>
                <p className="text-slate-300 font-bold mb-2">GSM Cabinet :</p>
                <p className="text-white font-black text-xl">06.41.29.82.35</p>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
          <p>© 2026 Cabinet Dr. El Mustapha Achour. Developed By Mohamed Lakhloufi.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Politique de Santé</a>
            <a href="#" className="hover:text-white transition-colors">Plan du Site</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
