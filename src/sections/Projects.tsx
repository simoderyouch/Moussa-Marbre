import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    category: 'CHEMINEES',
    title: 'Cheminée en Travertin',
    description:
      'Habillage cheminée en travertin avec soubassement en marbre poli, pour une villa contemporaine.',
  },
  {
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
    category: 'SALLES DE BAIN',
    title: 'Salle de Bain Luxe',
    description:
      'Salle de bain entièrement rénovée en pierre naturelle avec vasque sculptée et miroir rétroéclairé.',
  },
  {
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
    category: 'FACADES',
    title: 'Façade en Ardoise Naturelle',
    description:
      "Habillage extérieur en ardoise naturelle multicolore pour une façade au caractère unique et intemporel.",
  },
];

const Projects = () => {
  return (
    <section className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-border" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                Projets en Vedette
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-[1.1] tracking-tight">
              Des réalisations qui{' '}
              <span className="italic text-muted-foreground">inspirent</span>
            </h2>
          </div>
          <Link
            to="/projets"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground mt-6 sm:mt-0 transition-colors"
          >
            Voir Tous les Projets
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
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
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
                {project.category}
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-3 group-hover:text-muted-foreground transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
