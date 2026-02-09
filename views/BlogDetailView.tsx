
import React from 'react';
import { blogPosts } from '../components/Blog';
import { ViewType } from '../App';

interface BlogDetailViewProps {
  postId: string | null;
  onNavigate: (view: ViewType) => void;
}

const BlogDetailView: React.FC<BlogDetailViewProps> = ({ postId, onNavigate }) => {
  const post = blogPosts.find(p => p.id === postId) || blogPosts[0];
  const logoImg = "images/profil1.jpg";

  const getFullArticle = (id: string) => {
    switch (id) {
      case '1':
        return `
          L'hiver apporte son lot de défis pour notre organisme. Entre la baisse des températures et la circulation accrue des virus, notre système immunitaire est sollicité en permanence. Heureusement, plusieurs piliers naturels permettent de le soutenir.

          Premièrement, l'alimentation joue un rôle prépondérant. Privilégiez les aliments riches en Vitamine C comme les agrumes, les poivrons ou le persil. N'oubliez pas la Vitamine D, souvent en carence durant l'hiver dû au manque de soleil ; elle est essentielle pour activer les lymphocytes T. Les aliments fermentés (yaourts, choucroute) soutiennent votre microbiote intestinal, où réside 70% de votre immunité.

          Deuxièmement, ne négligez pas votre sommeil. Un corps reposé produit plus d'anticorps. Visez 7 à 9 heures de sommeil de qualité. Enfin, gardez une activité physique régulière, même modérée comme la marche rapide, pour stimuler la circulation lymphatique et réduire le stress, l'un des plus grands ennemis du système immunitaire.
        `;
      case '2':
        return `
          Consulter son médecin uniquement quand on a mal est une erreur fréquente. Le bilan de santé annuel est l'outil le plus puissant de la médecine préventive. Il permet de "photographier" votre état de santé à un instant T et de détecter des signes avant-coureurs de maladies graves.

          Lors de ce bilan, le Dr. Achour effectue une batterie d'examens : contrôle de la tension artérielle (prévention des AVC), auscultation cardiaque et pulmonaire, et souvent une analyse biologique complète. Pour les hommes et femmes après 40 ans, c'est aussi le moment d'aborder les dépistages spécifiques.

          Ces visites permettent souvent de diagnostiquer un diabète débutant ou une hypercholestérolémie avant qu'ils ne causent des dommages irréversibles. C'est également un moment d'échange privilégié pour poser vos questions sur votre bien-être général, votre nutrition ou votre santé mentale. Investir une heure de votre temps chaque année peut vous faire gagner des années de vie en bonne santé.
        `;
      case '3':
        return `
          Le sucre est souvent pointé du doigt comme l'ennemi numéro un de la santé moderne. Mais qu'en est-il réellement ? Il est important de distinguer les sucres naturellement présents dans les fruits et les féculents des sucres ajoutés par l'industrie agroalimentaire.

          Le principal danger réside dans le "sucre caché". On le retrouve dans les sauces, les plats préparés et même le pain de mie. Ces sucres provoquent des pics d'insuline rapides, suivis d'une chute brutale (hypoglycémie réactionnelle) qui engendre fatigue et fringales. À long terme, cette surconsommation est le facteur principal du diabète de type 2 et des maladies cardiovasculaires.

          Pour réduire votre consommation, ne cherchez pas à supprimer tout le sucre du jour au lendemain. Commencez par remplacer les boissons sucrées par de l'eau infusée aux fruits. Apprenez à lire les étiquettes : si le sucre apparaît dans les trois premiers ingrédients, reposez le produit. Privilégiez les aliments à index glycémique bas comme les céréales complètes et les légumineuses. Votre corps vous remerciera par une énergie plus stable et une meilleure clarté mentale.
        `;
      default:
        return "Article complet en cours de mise en page. Revenez bientôt pour plus de conseils santé du Dr. Achour.";
    }
  };

  return (
    <div className="py-12 animate-fade-in bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <button 
          onClick={() => onNavigate('blog')}
          className="flex items-center gap-2 text-slate-500 hover:text-red-700 transition-colors mb-8 font-semibold"
        >
          ← Retour au blog
        </button>

        <img src={post.imageUrl} className="w-full h-[400px] object-cover rounded-[3rem] shadow-2xl mb-12" alt={post.title} />

        <div className="max-w-3xl mx-auto">
          <span className="text-red-700 font-bold uppercase tracking-widest text-sm">{post.date}</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-10 leading-tight">
            {post.title}
          </h1>

          <div className="prose prose-slate prose-lg max-w-none text-slate-700 text-base leading-relaxed space-y-8">
            {getFullArticle(post.id).split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-20 pt-10 border-t border-slate-100 flex items-center gap-6 bg-slate-50 p-8 rounded-3xl">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img src={logoImg} alt="Dr. Achour" className="w-full h-full object-cover" />
              </div>
              <div>
                  <p className="text-slate-900 font-bold text-xl">Rédigé par le Dr. Achour</p>
                  <p className="text-slate-500 text-base">Médecin Généraliste - Spécialiste en Échographie & Neurologie</p>
              </div>
          </div>

          <div className="mt-12 text-center">
              <p className="text-slate-400 text-sm mb-6">Partagez cet article pour aider vos proches</p>
              <div className="flex justify-center gap-4">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-sm">Facebook</button>
                  <button className="bg-sky-400 text-white px-6 py-2 rounded-full font-bold text-sm">WhatsApp</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailView;
