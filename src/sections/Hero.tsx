import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
          alt="Luxury marble interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-2xl">
          {/* Tagline */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-muted" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              Marbre · Granit · Pierre Naturelle
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[1.1] tracking-tight mb-8">
            Transformer vos espaces en oeuvres d'art{' '}
            <span className="italic text-muted-foreground">intemporelles</span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl">
            Spécialiste du marbre, granit et pierre naturelle,{' '}
            <span className="font-semibold text-foreground">Moussa Marbre</span> allie
            savoir-faire artisanal et précision pour sublimer chaque projet architectural.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-16">
            <Link to="/projets">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none px-8 py-6 text-xs uppercase tracking-widest">
                Voir nos Projets
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                className="border-border text-foreground hover:bg-muted rounded-none px-8 py-6 text-xs uppercase tracking-widest"
              >
                Nous Contacter
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-12">
            <div>
              <div className="font-serif text-5xl text-foreground">30+</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">Types de Pierres</div>
            </div>
            <div>
              <div className="font-serif text-5xl text-foreground">80+</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">Projets Réalisés</div>
            </div>
            <div>
              <div className="font-serif text-5xl text-foreground">100%</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">Sur Mesure</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
