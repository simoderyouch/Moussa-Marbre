import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80"
          alt="Marble background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-background leading-[1.1] tracking-tight mb-8">
          Prêt à transformer votre espace ?
        </h2>
        <p className="text-background/70 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
          Parlez-nous de votre projet et découvrez comment{' '}
          <span className="font-semibold text-background">Moussa Marbre</span> peut donner
          vie à vos ambitions les plus audacieuses.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contact">
            <Button className="bg-background hover:bg-background/90 text-foreground rounded-none px-8 py-6 text-xs uppercase tracking-widest">
              Demander un Devis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link to="/projets">
            <Button
              variant="outline"
              className="border-background/30 text-background hover:bg-background/10 rounded-none px-8 py-6 text-xs uppercase tracking-widest"
            >
              Voir nos Réalisations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
