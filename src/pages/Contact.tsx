import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const contactInfo = [
  {
    icon: Phone,
    label: 'Téléphone',
    value: '+212 661-829455',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@moussamarbre.ma',
    secondary: 'devis@moussamarbre.ma',
  },
  {
    icon: MapPin,
    label: 'Adresse',
    value: 'Ouled Slama',
    secondary: 'Temara 12000, Maroc',
  },
  {
    icon: Clock,
    label: 'Horaires',
    value: 'Lun - Ven : 8h - 18h',
    secondary: 'Sam : 8h - 13h',
  },
];

const services = [
  'Marbre',
  'Granit',
  'Pierre de Taza',
  'Habillage Mural',
  'Vasques sur Mesure',
  'Cheminées',
  'Façades',
  'Autre',
];

const whyChooseUs = [
  'Devis gratuit sous 24h',
  '30+ types de pierres naturelles',
  'Livraison partout au Maroc',
  'Garantie sur tous nos travaux',
];

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    service: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        service: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <>
      {/* Header Section */}
      <section className="pt-32 pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-border" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              Contact
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl text-foreground leading-[1.1] tracking-tight mb-8">
            Parlons de votre <span className="italic text-muted-foreground">projet</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Que vous ayez une idée précise ou que vous cherchiez des conseils, notre équipe
            est à votre écoute. Remplissez le formulaire ou contactez-nous directement.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <div key={index} className="bg-secondary p-8 rounded-none border border-border/50">
                <div className="w-12 h-12 bg-background rounded-none flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-foreground" />
                </div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
                  {item.label}
                </div>
                <div className="text-foreground font-medium mb-1">{item.value}</div>
                {item.secondary && (
                  <div className="text-muted-foreground text-sm">{item.secondary}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-3xl text-foreground mb-4">
                Demander un Devis Gratuit
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-10">
                Remplissez le formulaire ci-dessous et nous vous répondrons dans les 24 heures.
              </p>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className=" text-xl text-green-800 mb-2">
                    Message envoyé avec succès!
                  </h3>
                  <p className="text-green-600">
                    Nous vous contacterons dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700 uppercase">
                        Nom Complet
                      </Label>
                      <Input
                        id="name"
                        placeholder="Votre nom"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-background rounded-none border-border/50 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700 uppercase">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-background rounded-none border-border/50 focus-visible:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700 uppercase">
                        Téléphone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+212 6 00 00 00 00"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-background rounded-none border-border/50 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium text-gray-700 uppercase">
                        Ville
                      </Label>
                      <Input
                        id="city"
                        placeholder="Votre ville"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="bg-background rounded-none border-border/50 focus-visible:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-sm font-medium text-gray-700 uppercase">
                      Service Souhaité
                    </Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => setFormData({ ...formData, service: value })}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Sélectionnez un service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700 uppercase">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Décrivez votre projet, les matériaux souhaités, les dimensions approximatives..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="bg-white resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none px-8 py-6 text-xs uppercase tracking-widest w-full sm:w-auto"
                  >
                    Envoyer le Message
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-background border border-border/50 rounded-none h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                  <p className="text-foreground font-medium">Ouled Slama, Temara 12000</p>
                  <p className="text-muted-foreground text-sm mt-1">Maroc</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm hover:underline mt-4 inline-block font-medium"
                  >
                    Voir sur Google Maps
                  </a>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-background p-8 rounded-none border border-border/50">
                <h3 className="font-serif text-2xl text-foreground mb-6">
                  Pourquoi Nous Choisir ?
                </h3>
                <ul className="space-y-4">
                  {whyChooseUs.map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
