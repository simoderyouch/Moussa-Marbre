import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <section className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative rounded-none overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80"
                alt="Marble stone craftsmanship"
                className="w-full h-[600px] object-cover"
              />
            </div>
            {/* Floating Stats Card */}
            <div className="absolute -bottom-8 -right-8 bg-foreground text-background p-12 rounded-none">
              <div className="font-serif text-6xl text-background">30+</div>
              <div className="text-xs uppercase tracking-widest text-background/70 mt-4">Types de Pierres</div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-border" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                Qui Sommes-Nous
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-[1.1] tracking-tight mb-8">
              L'art de la pierre au service de vos{' '}
              <span className="italic text-muted-foreground">ambitions</span>
            </h2>

            {/* Description */}
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg pb-4">
              <p>
                <span className="font-semibold text-foreground">Moussa Marbre</span> s'est rapidement imposé comme une référence
                dans la transformation du marbre, du granit et de la pierre naturelle au Maroc.
                Notre savoir-faire artisanal, combiné à des techniques de pointe, nous permet
                de réaliser des projets d'exception.
              </p>
              <p>
                De la conception à l'installation, chaque détail est pensé pour sublimer vos
                espaces et créer des environnements uniques, à la hauteur de vos exigences.
              </p>
            </div>

            {/* CTA */}
            <Link
              to="/a-propos"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground mt-8 transition-colors"
            >
              Découvrir Notre Histoire
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
