import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  'TOUS',
  'CHEMINEES',
  'SALLES DE BAIN',
  'FACADES',
  'PISCINES',
  'ALLEES',
  'VASQUES',
];

const projects = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    category: 'FACADES',
    subtitle: 'Siège Social, Casablanca',
    title: 'Projet SGT M',
    description:
      "Fourniture et pose de marbre et granit pour la Société Générale des Travaux du Maroc. Un projet d'envergure alliant robustesse et prestige.",
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
    category: 'VASQUES',
    subtitle: 'Restaurant L\'Assiette, Rabat',
    title: 'Restaurant L\'Assiette',
    description:
      'Aménagement complet en pierre naturelle : comptoirs, plans de travail et vasques sur mesure pour un espace gastronomique d\'exception.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
    category: 'FACADES',
    subtitle: 'Hôtel The Ranch, Taza',
    title: 'Hôtel The Ranch',
    description:
      "Habillage complet en marbre et pierre naturelle pour l'Hôtel The Ranch. Façades, halls et espaces communs sublimés par un travail artisanal d'excellence.",
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    category: 'CHEMINEES',
    subtitle: 'Villa Privée, Casablanca',
    title: 'Cheminée en Travertin Strie',
    description:
      'Habillage cheminée en travertin strié avec soubassement en marbre poli gris. Un équilibre parfait entre modernité et élégance naturelle.',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
    category: 'SALLES DE BAIN',
    subtitle: 'Hôtel The Ranch, Taza',
    title: 'Salle de Bain Pierre Naturelle',
    description:
      'Aménagement complet en pierre naturelle : murs, sol, vasque sculptée et douche à l\'italienne. Un écrin de luxe minéral.',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80',
    category: 'FACADES',
    subtitle: 'Résidence Haut Standing, Rabat',
    title: 'Façade en Ardoise Multicolore',
    description:
      "Habillage extérieur en ardoise naturelle multicolore, alliant nuances de gris, ocre et rouille pour un caractère unique.",
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?w=600&q=80',
    category: 'PISCINES',
    subtitle: 'Villa Contemporaine, Marrakech',
    title: 'Margelle Piscine en Pierre Grise',
    description:
      'Margelle de piscine en pierre naturelle grise, finition antidérapante. Intégration parfaite avec l\'aménagement paysager.',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80',
    category: 'ALLEES',
    subtitle: 'Jardin Privé, Fès',
    title: 'Allée en Opus Incertum',
    description:
      'Allée de jardin en opus incertum, mélange de pierres naturelles aux teintes chaudes et froides, éclairée pour un effet spectaculaire.',
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=600&q=80',
    category: 'VASQUES',
    subtitle: 'Suite Présidentielle, Tanger',
    title: 'Vasque Sculptée en Marbre Gris',
    description:
      'Vasque sculptée à la main dans un marbre gris aux veines subtiles. Design contemporain aux lignas épurées.',
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=80',
    category: 'FACADES',
    subtitle: 'Showroom, Taza',
    title: 'Mur en Pierre de Taza',
    description:
      "Habillage mural intérieur en pierre de Taza, texture brute et authentique pour un espace d'exposition unique.",
  },
  {
    id: 11,
    image: 'https://images.unsplash.com/photo-1620626012053-1f9a3069e07b?w=600&q=80',
    category: 'VASQUES',
    subtitle: 'Villa de Luxe, Irène',
    title: 'Vasque Ronde en Marbre',
    description:
      'Vasque ronde en marbre gris poli, forme organique et finition impeccable. Un objet d\'art fonctionnel.',
  },
];

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState('TOUS');

  const filteredProjects =
    activeCategory === 'TOUS'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <>
      {/* Header Section */}
      <section className="pt-32 pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-border" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              Portfolio
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl text-foreground leading-[1.1] tracking-tight mb-8">
            Nos <span className="italic text-muted-foreground">Réalisations</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Découvrez une sélection de nos projets les plus remarquables. Chaque réalisation
            témoigne de notre engagement envers l'excellence et la qualité artisanale.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 bg-background border-b border-border sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`pb-2 text-xs uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${activeCategory === category
                    ? 'border-primary text-foreground font-semibold'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-none aspect-[4/5] mb-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest mb-3">
                  <span className="font-medium text-foreground">{project.category}</span>
                  <span>—</span>
                  <span>{project.subtitle}</span>
                </div>
                <h3 className="font-serif text-3xl text-foreground mb-4 group-hover:text-muted-foreground transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-[1.1] tracking-tight mb-8">
            Vous avez un projet en tête ?
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-12">
            Contactez-nous pour discuter de votre vision. Nous serons ravis de vous accompagner
            à chaque étape.
          </p>
          <Link to="/contact">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none px-8 py-6 text-xs uppercase tracking-widest">
              Parlons de Votre Projet
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default ProjectsPage;
