import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      '"Moussa Marbre a transformé notre vision en réalité. La qualité du marbre et la précision de l\'installation ont dépassé toutes nos attentes."',
    author: 'Architecte Youssef B.',
    role: 'Cabinet d\'Architecture, Casablanca',
  },
  {
    quote:
      '"Un savoir-faire exceptionnel et une équipe à l\'écoute. Notre salle de bain en pierre naturelle est devenue la pièce maîtresse de notre maison."',
    author: 'Famille El Amrani',
    role: 'Villa Privée, Rabat',
  },
  {
    quote:
      '"Professionnel, rigoureux et créatif. Moussa Marbre est notre partenaire de confiance pour tous nos projets haut de gamme."',
    author: 'Karim M.',
    role: 'Promoteur Immobilier, Tanger',
  },
];

const Testimonials = () => {
  return (
    <section className="py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-border" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              Témoignages
            </span>
            <div className="w-8 h-px bg-border" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-[1.1] tracking-tight mb-12">
            Ce que disent nos{' '}
            <span className="italic text-muted-foreground">clients</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background p-10 rounded-none border border-border/50"
            >
              <Quote className="w-8 h-8 text-muted-foreground/50 mb-8" />
              <p className="text-muted-foreground leading-relaxed mb-8 text-lg font-serif italic">
                {testimonial.quote}
              </p>
              <div>
                <div className="text-sm font-medium uppercase tracking-widest text-foreground">
                  {testimonial.author}
                </div>
                <div className="text-xs text-muted-foreground mt-2">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
