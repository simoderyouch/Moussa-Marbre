import { Link } from 'react-router-dom';
import { ArrowRight, Award, Heart, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description:
      'Chaque pièce qui sort de notre atelier répond aux standards les plus exigeants de qualité et de finition.',
  },
  {
    icon: Users,
    title: 'Ecoute Client',
    description:
      'Nous travaillons main dans la main avec nos clients pour comprendre et concrétiser leur vision.',
  },
  {
    icon: Target,
    title: 'Précision',
    description:
      "La découpe, le façonnage et l'installation sont exécutés avec une précision millimétrique.",
  },
  {
    icon: Heart,
    title: 'Passion',
    description:
      'Notre amour pour la pierre naturelle est le moteur de notre créativité et de notre engagement.',
  },
];

const timeline = [
  {
    year: '2023',
    title: 'Fondation',
    description:
      'Création de Moussa Marbre à Taza, avec une passion pour la pierre naturelle et un savoir-faire artisanal.',
  },
  {
    year: '2023',
    title: 'Premier Atelier',
    description:
      'Ouverture de notre atelier de transformation équipé de machines modernes pour un travail de précision.',
  },
  {
    year: '2024',
    title: 'Croissance Rapide',
    description:
      'Plus de 50 projets réalisés en un an, avec des clients à travers tout le Maroc.',
  },
  {
    year: '2025',
    title: 'Expansion',
    description:
      "Élargissement de notre gamme à plus de 30 types de pierres et développement de nos réalisations sur mesure.",
  },
  {
    year: '2026',
    title: 'Rayonnement',
    description:
      "Plus de 80 projets livrés et une réputation d'excellence reconnue par les architectes et designers.",
  },
];

const AboutPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Side */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-border" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                  Notre Histoire
                </span>
              </div>
              <h1 className="font-serif text-5xl sm:text-6xl text-foreground leading-[1.1] tracking-tight mb-8">
                L'art du marbre, une{' '}
                <span className="italic text-muted-foreground">tradition familiale</span>
              </h1>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Fondée à Taza, au cœur du Maroc,{' '}
                  <span className="font-semibold text-foreground">Moussa Marbre</span> est née de la
                  passion d'un homme pour la pierre naturelle et de sa volonté de transformer chaque
                  espace en une oeuvre d'art durable.
                </p>
                <p>
                  Aujourd'hui, l'entreprise est devenue une référence dans la transformation du marbre,
                  du granit et de la pierre naturelle, servant architectes, designers et particuliers
                  à travers tout le royaume.
                </p>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative">
              <div className="rounded-none overflow-hidden aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                  alt="Marble craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="relative order-2 lg:order-1">
              <div className="rounded-none overflow-hidden aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                  alt="M. Moussa - Founder"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content Side */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-border" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                  Le Fondateur
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-[1.1] tracking-tight mb-8">
                Une vision, un <span className="italic text-muted-foreground">héritage</span>
              </h2>
              <blockquote className="border-l-2 border-primary text-muted-foreground italic font-serif leading-relaxed text-2xl mb-12 pl-8">
                "Ma passion pour la pierre naturelle est née dans les carrières de Taza.
                Chaque bloc de marbre raconte une histoire de millions d'années — notre
                rôle est de révéler sa beauté et de lui donner une nouvelle vie dans vos
                espaces."
              </blockquote>
              <div className="mb-12">
                <div className="text-sm font-medium uppercase tracking-widest text-foreground">M. Moussa</div>
                <div className="text-xs text-muted-foreground mt-2">
                  Fondateur & Directeur Général, Moussa Marbre
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-12">
                <div>
                  <div className="font-serif text-4xl text-foreground">30+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mt-2">Types de Pierres</div>
                </div>
                <div>
                  <div className="font-serif text-4xl text-foreground">80+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mt-2">Projets Livrés</div>
                </div>
                <div>
                  <div className="font-serif text-4xl text-foreground">50+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mt-2">Artisans Formés</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-secondary p-12 rounded-none border border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-border" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                  Notre Mission
                </span>
              </div>
              <h3 className="font-serif text-3xl text-foreground mb-6">
                Sublimer chaque espace
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Transformer les espaces de vie en oeuvres d'art intemporelles grâce à un travail
                artisanal d'exception sur le marbre, le granit et la pierre naturelle. Nous nous
                engageons à offrir à chaque client une expérience unique, du conseil personnalisé
                à l'installation parfaite.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-secondary p-12 rounded-none border border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-border" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                  Notre Vision
                </span>
              </div>
              <h3 className="font-serif text-3xl text-foreground mb-6">
                Leader reconnu au Maroc
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Devenir le leader reconnu dans la transformation du marbre et du granit au Maroc
                et à l'international, en alliant innovation technologique, savoir-faire artisanal
                et respect de l'environnement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-secondary border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-border" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                Nos Valeurs
              </span>
              <div className="w-8 h-px bg-border" />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-[1.1] tracking-tight">
              Ce qui nous <span className="italic text-muted-foreground">anime</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-background p-10 rounded-none border border-border/50 text-center">
                <div className="w-16 h-16 bg-secondary rounded-none flex items-center justify-center mx-auto mb-8 border border-border/50">
                  <value.icon className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-4">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-24 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-border" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                Notre Parcours
              </span>
              <div className="w-8 h-px bg-border" />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-[1.1] tracking-tight">
              Les étapes <span className="italic text-muted-foreground">marquantes</span>
            </h2>
          </div>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-8">
                <div className="flex-shrink-0 w-24">
                  <div className="font-serif text-3xl text-foreground">{item.year}</div>
                </div>
                <div className="flex-grow pb-12 border-b border-border/50">
                  <h3 className="font-serif text-2xl text-foreground mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-foreground text-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-background leading-[1.1] tracking-tight mb-8">
            Collaborons ensemble
          </h2>
          <p className="text-background/70 text-lg leading-relaxed mb-12">
            Que vous soyez architecte, designer ou particulier, nous serons ravis de discuter de votre
            prochain projet.
          </p>
          <Link to="/contact">
            <Button className="bg-background hover:bg-background/90 text-foreground rounded-none px-8 py-6 text-xs uppercase tracking-widest">
              Prendre Contact
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
