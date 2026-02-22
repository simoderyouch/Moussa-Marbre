import { Gem, Mountain, Building2, Droplets, Wallpaper, Ruler } from 'lucide-react';

const services = [
  {
    icon: Gem,
    title: 'Marbre',
    description:
      'Sélection et transformation de marbres d\'exception pour des intérieurs raffinés et des finitions impeccables.',
  },
  {
    icon: Mountain,
    title: 'Granit',
    description:
      'Granit de haute qualité pour des surfaces durables, résistantes et d\'une élégance naturelle.',
  },
  {
    icon: Building2,
    title: 'Pierre de Taza',
    description:
      'Pierre naturelle locale, authentique et unique, pour des créations qui allient tradition et modernité.',
  },
  {
    icon: Droplets,
    title: 'Vasques & Lavabos',
    description:
      'Vasques sculptées à la main dans la pierre naturelle, chaque pièce est une oeuvre unique.',
  },
  {
    icon: Wallpaper,
    title: 'Habillage Mural',
    description:
      'Façades et murs intérieurs en pierre naturelle pour des espaces au caractère affirmé.',
  },
  {
    icon: Ruler,
    title: 'Sur Mesure',
    description:
      'Projets personnalisés : cheminées, escaliers, plans de travail, piscines et bien plus encore.',
  },
];

const Services = () => {
  return (
    <section className="py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-border" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              Nos Services
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-[1.1] tracking-tight max-w-2xl mb-12">
            Un savoir-faire complet au service de la{' '}
            <span className="italic text-muted-foreground">pierre</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-background p-10 rounded-none border border-border/50 hover:border-border transition-colors group"
            >
              <div className="w-14 h-14 bg-secondary rounded-none flex items-center justify-center mb-8 group-hover:bg-muted transition-colors">
                <service.icon className="w-6 h-6 text-foreground group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
