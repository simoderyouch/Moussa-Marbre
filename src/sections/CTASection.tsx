import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation, Trans } from 'react-i18next';

const CTASection = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="relative py-32 overflow-hidden" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
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
        <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl text-background leading-[1.1] tracking-tight mb-8">
          {t('cta.title')}
        </h2>
        <p className="text-background/70 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
          <Trans i18nKey="cta.p" components={[<span className="font-semibold text-background" key="0" />]} />
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contact">
            <Button className="bg-background hover:bg-background/90 text-foreground rounded-none px-8 py-6 text-xs uppercase tracking-widest">
              {t('cta.btn1')}
              <ArrowRight className={`w-5 h-5 ${i18n.language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
            </Button>
          </Link>
          <Link to="/projets">
            <Button
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-background/10 rounded-none px-8 py-6 text-xs uppercase tracking-widest"
            >
              {t('cta.btn2')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
