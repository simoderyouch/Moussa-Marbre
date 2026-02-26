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
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

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

const ContactPage = () => {
  const { t, i18n } = useTranslation();

  const contactInfo = [
    {
      icon: Phone,
      label: t('contactPage.infoText.phone'),
      value: '+212 661-829455',
    },
    {
      icon: Mail,
      label: t('contactPage.infoText.email'),
      value: 'contact@moussamarbre.ma',
      secondary: 'devis@moussamarbre.ma',
    },
    {
      icon: MapPin,
      label: t('contactPage.infoText.address'),
      value: t('contactPage.loc1'),
      secondary: t('contactPage.loc2'),
    },
    {
      icon: Clock,
      label: t('contactPage.infoText.hours'),
      value: t('contactPage.hours1'),
      secondary: t('contactPage.hours2'),
    },
  ];

  const whyChooseUs = t('contactPage.whyItems', { returnObjects: true }) as string[];

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
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <SEO
        title={`${t('contactPage.title1')} ${t('contactPage.title2')} | Moussa Marbre`}
        description="Contactez Moussa Marbre au +212 661-829455 ou visitez notre showroom à Taza. Devis gratuit sous 24h pour vos projets de marbre et pierre naturelle au Maroc."
        keywords="contact moussa marbre, numero marbre taza, adresse usine marbre, devis marbre maroc"
        url="https://moussamarbre.com/#/contact"
      />
      {/* Header Section */}
      <section className="pt-[12rem]  pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-black" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              {t('contactPage.tag')}
            </span>
          </div>
          <h1 className="font-sans text-5xl sm:text-6xl text-foreground leading-[1.1] tracking-tight mb-8">
            {t('contactPage.title1')}<span className="italic font-serif text-muted-foreground">{t('contactPage.title2')}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            {t('contactPage.desc')}
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
                {t('contactPage.formTitle')}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-10">
                {t('contactPage.formDesc')}
              </p>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className=" text-xl text-green-800 mb-2">
                    {t('contactPage.successTitle')}
                  </h3>
                  <p className="text-green-600">
                    {t('contactPage.successDesc')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700 uppercase">
                        {t('contactPage.labels.name')}
                      </Label>
                      <Input
                        id="name"
                        placeholder={t('contactPage.labels.namePlaceholder')}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-background rounded-none border-border/50 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700 uppercase">
                        {t('contactPage.labels.email')}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t('contactPage.labels.emailPlaceholder')}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-background rounded-none border-border/50 focus-visible:ring-primary"
                        dir="ltr"
                        style={i18n.language === 'ar' ? { textAlign: 'right' } : {}}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700 uppercase">
                        {t('contactPage.labels.phone')}
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder={t('contactPage.labels.phonePlaceholder')}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-background rounded-none border-border/50 focus-visible:ring-primary"
                        dir="ltr"
                        style={i18n.language === 'ar' ? { textAlign: 'right' } : {}}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium text-gray-700 uppercase">
                        {t('contactPage.labels.city')}
                      </Label>
                      <Input
                        id="city"
                        placeholder={t('contactPage.labels.cityPlaceholder')}
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="bg-background rounded-none border-border/50 focus-visible:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-sm font-medium text-gray-700 uppercase">
                      {t('contactPage.labels.service')}
                    </Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => setFormData({ ...formData, service: value })}
                      dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder={t('contactPage.labels.servicePlaceholder')} />
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
                      {t('contactPage.labels.message')}
                    </Label>
                    <Textarea
                      id="message"
                      placeholder={t('contactPage.labels.messagePlaceholder')}
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
                    {t('contactPage.btn')}
                    <Send className={`w-4 h-4 ${i18n.language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
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
                  <p className="text-foreground font-medium">{t('contactPage.loc1')}, {t('contactPage.loc2')}</p>
                  <a
                    href="https://maps.app.goo.gl/cA7HBzvCjftm6rq68"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm hover:underline mt-4 inline-block font-medium"
                  >
                    {t('contactPage.mapText')}
                  </a>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-background p-8 rounded-none border border-border/50">
                <h3 className="font-serif text-2xl text-foreground mb-6">
                  {t('contactPage.sidebarTitle')}
                </h3>
                <ul className="space-y-4">
                  {whyChooseUs.map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className={`w-1 h-1 bg-primary rounded-full mt-2.5 flex-shrink-0 ${i18n.language === 'ar' ? 'ml-0 mr-1' : ''}`} />
                      <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
