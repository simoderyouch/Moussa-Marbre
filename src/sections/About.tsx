import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';

const About = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-24 lg:py-32 bg-background overflow-hidden relative" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">

          {/* Content Side (Left on Desktop: 5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`lg:col-span-5 relative z-10 ${i18n.language === 'ar' ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}
          >
            {/* Section Tag */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[1px] bg-foreground/60" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                {t('about.tag')}
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-sans text-4xl sm:text-5xl lg:text-5xl text-foreground leading-[1.1] tracking-tight mb-8">
              {t('about.title1')}{' '}
              <span className="italic font-serif text-muted-foreground block mt-2">{t('about.title2')}</span>
            </h2>

            {/* Description Paragraphs */}
            <div className="space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg mb-10">
              <p>
                <Trans i18nKey="about.p1" components={[<span className="font-semibold text-foreground" key="0" />]} />
              </p>
              <p>
                {t('about.p2')}
              </p>
            </div>

            {/* CTA Button */}
            <Link
              to="/a-propos"
              className="inline-flex items-center bg-foreground text-background gap-3 px-8 py-5 text-xs font-medium uppercase tracking-widest hover:bg-foreground/90 transition-colors group"
            >
              {t('about.btn')}
              <motion.div
                whileHover={{ x: i18n.language === 'ar' ? -5 : 5 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className={`w-4 h-4 ${i18n.language === 'ar' ? 'rotate-180' : ''}`} />
              </motion.div>
            </Link>
          </motion.div>

          {/* Image Side (Right on Desktop: 7 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`lg:col-span-7 relative h-full min-h-[500px] lg:min-h-[700px] ${i18n.language === 'ar' ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}
          >
            {/* Main Editorial Image */}
            <div className={`relative rounded-none overflow-hidden h-full w-full lg:w-[90%] shadow-2xl bg-muted z-0 ${i18n.language === 'ar' ? 'mr-auto' : 'ml-auto'}`}>
              <img
                src="./about-hero-section.jpeg"
                alt="Maître artisan travaillant le marbre brut"
                className="w-full h-full object-cover transition-transform duration-1000 "
                loading="lazy"
              />
            </div>

            {/* Floating Overlapping Stats Block */}
            <motion.div
              initial={{ opacity: 0, y: 40, x: i18n.language === 'ar' ? 20 : -20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className={`absolute -bottom-6 sm:bottom-12 bg-foreground p-4 sm:p-9 shadow-xl z-10 max-w-[280px] ${i18n.language === 'ar' ? '-right-4 sm:-right-12' : '-left-4 sm:-left-12'}`}
            >
              <div className="flex items-center gap-4 mb-2">
                <div className={`text-6xl sm:text-7xl font-sans font-bold text-white leading-none tracking-tighter ${i18n.language === 'ar' ? 'flex-row-reverse flex' : ''}`}>
                  {i18n.language === 'ar' ? '+' : ''}30{i18n.language !== 'ar' ? <span className="text-primary">+</span> : ''}
                </div>
              </div>
              <div className="w-12 h-[1px] bg-white/20 my-4" />
              <div className="text-xs font-medium uppercase tracking-widest text-white leading-relaxed">
                {t('about.statLabel')}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
