import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigation = [
    { name: 'Accueil', path: '/' },
    { name: 'Projets', path: '/projets' },
    { name: 'Produits', path: '/produits' },
    { name: 'A Propos', path: '/a-propos' },
    { name: 'Contact', path: '/contact' },
  ];

  const services = [
    { name: 'Marbre', path: '/produits' },
    { name: 'Granit', path: '/produits' },
    { name: 'Pierre de Taza', path: '/produits' },
    { name: 'Habillage Mural', path: '/produits' },
    { name: 'Vasques sur Mesure', path: '/produits' },
    { name: 'Carrelage', path: '/produits' },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center bg-white rounded-none p-1">
                <img src="/logo.png" alt="Moussa Marbre Logo" className="h-10 w-auto" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-serif leading-tight text-white">
                  Moussa
                </span>
                <span className="text-xs uppercase tracking-widest text-background/50">
                  marbre
                </span>
              </div>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              Transformer vos espaces en oeuvres d'art intemporelles. Spécialiste du marbre,
              granit et pierre naturelle au Maroc.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-background/50 mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-background/70 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-background/50 mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-background/70 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-background/50 mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-background/50" />
                <span className="text-background/70 text-sm">+212 661-829455</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-background/50" />
                <span className="text-background/70 text-sm">contact@moussamarbre.ma</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-background/50 mt-0.5" />
                <span className="text-background/70 text-sm">
                  Ouled Slama, Temara 12000, Maroc
                </span>
              </li>
            </ul>
            <div className="mt-6">
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="border-background/30 text-background hover:bg-background hover:text-foreground rounded-none text-xs uppercase tracking-widest px-8 py-6"
                >
                  NOUS CONTACTER
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            © {currentYear} Moussa Marbre. Tous droits réservés.
          </p>
          <p className="text-background/50 text-sm">
            Marbre · Granit · Pierre Naturelle
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
