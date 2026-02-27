import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Heart, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import SEO from '../components/SEO';

// --- DATA ---
const values = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'Chaque pièce qui sort de notre atelier répond aux standards les plus exigeants de qualité et de finition.',
  },
  {
    icon: Users,
    title: 'Ecoute Client',
    description: 'Nous travaillons main dans la main avec nos clients pour comprendre et concrétiser leur vision.',
  },
  {
    icon: Target,
    title: 'Précision',
    description: "La découpe, le façonnage et l'installation sont exécutés avec une précision millimétrique.",
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Notre amour pour la pierre naturelle est le moteur de notre créativité et de notre engagement.',
  },
];



// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

// --- SUB-COMPONENTS ---

/**
 * ParallaxImage: Modulates image y-axis slightly based on scroll depth for a premium "heavy" feel.
 */
const ParallaxImage = ({ src, alt, className = "" }: { src: string; alt: string; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-muted ${className}`}>
      <motion.img
        style={{ y, scale: 1.16 }}
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <section className="pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-10 gap-16 items-center">
          <motion.article
            variants={staggerContainer} initial="hidden" animate="visible"
            className="lg:col-span-5"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-black/60" aria-hidden="true" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                {t('aboutPage.heroTag')}
              </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-serif text-5xl sm:text-6xl text-foreground leading-[1.1] tracking-tight mb-8">
              {t('aboutPage.heroTitle1')}<span className="italic text-muted-foreground">{t('aboutPage.heroTitle2')}</span>
            </motion.h1>
            <motion.div variants={fadeInUp} className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                <Trans i18nKey="aboutPage.heroP1" components={[<strong className="font-semibold text-foreground font-sans" key="0" />]} />
              </p>
              <p>
                {t('aboutPage.heroP2')}
              </p>
            </motion.div>
          </motion.article>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <ParallaxImage
              src="./about-hero-section.jpeg"
              alt="Meticulously crafted marble interior textures"
              className="aspect-[1/1] sm:aspect-[16/10] lg:aspect-[1/1] w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FounderSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 sm:py-32 bg-foreground/4 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          {/* Image side */}
          <div className="w-full lg:w-5/12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="/founder.jpeg"
                alt="M. Moussa, Fondateur"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>

          {/* Text side */}
          <div className="w-full lg:w-7/12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-slate-800" aria-hidden="true" />
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{t('aboutPage.founderTag')}</span>
              </div>

              <h2 className="font-sans text-4xl sm:text-5xl text-slate-800 font-medium mb-8">
                {t('aboutPage.founderTitle')}
              </h2>

              <blockquote className="border-l-[3px] border-slate-800/20 pl-6 text-slate-600 italic font-sans leading-relaxed text-lg sm:text-xl mb-8">
                {t('aboutPage.founderQuote')}
              </blockquote>

              <div className="mb-12">
                <div className="font-sans font-semibold text-slate-800 text-base">{t('aboutPage.founderName')}</div>
                <div className="text-sm text-slate-500 mt-1 font-sans">
                  <Trans i18nKey="aboutPage.founderRole" components={[<strong className="font-semibold text-slate-800" key="0" />]} />
                </div>
              </div>

              <div className="w-full h-px bg-slate-200 mb-12" />

              <div className="grid grid-cols-3 gap-4 sm:gap-8">
                <div>
                  <div className="font-sans text-3xl sm:text-4xl font-semibold text-slate-800 mb-2">{t('aboutPage.stats.1.val')}</div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-widest">{t('aboutPage.stats.1.label')}</div>
                </div>
                <div>
                  <div className="font-sans text-3xl sm:text-4xl font-semibold text-slate-800 mb-2">{t('aboutPage.stats.2.val')}</div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-widest">{t('aboutPage.stats.2.label')}</div>
                </div>
                <div>
                  <div className="font-sans text-3xl sm:text-4xl font-semibold text-slate-800 mb-2">{t('aboutPage.stats.3.val')}</div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-widest">{t('aboutPage.stats.3.label')}</div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

const BeliefsSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-2 gap-8">
          <motion.article variants={fadeInUp} className="bg-secondary p-12 lg:p-16 border border-border/50 transition-colors hover:border-border">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-black/60" aria-hidden="true" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{t('aboutPage.missionTag')}</span>
            </div>
            <h3 className="font-serif text-3xl text-foreground mb-6">{t('aboutPage.missionTitle')}</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {t('aboutPage.missionDesc')}
            </p>
          </motion.article>

          <motion.article variants={fadeInUp} className="bg-secondary p-12 lg:p-16 border border-border/50 transition-colors hover:border-border">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-black/60" aria-hidden="true" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{t('aboutPage.visionTag')}</span>
            </div>
            <h3 className="font-serif text-3xl text-foreground mb-6">{t('aboutPage.visionTitle')}</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {t('aboutPage.visionDesc')}
            </p>
          </motion.article>
        </motion.div>

        {/* Values Grid */}
        <div className="mt-32">
          <div className="text-center flex flex-col items-center mb-16">
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-black/60" aria-hidden="true" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                {t('aboutPage.valuesTag')}
              </span>
              <div className="w-8 h-px bg-black/60" aria-hidden="true" />
            </motion.div>
            <h2 className="font-serif text-4xl text-foreground">{t('aboutPage.valuesTitle')}</h2>
          </div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div variants={fadeInUp} key={index} className="p-8 text-center group cursor-default">
                <div className="w-16 h-16 bg-secondary flex items-center justify-center mx-auto mb-6 border border-border/50 transition-transform duration-500 group-hover:scale-110 group-hover:bg-foreground group-hover:text-background">
                  <value.icon className="w-6 h-6 transition-colors duration-500" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-3">{t(`aboutPage.valuesItems.${index + 1}.title`)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t(`aboutPage.valuesItems.${index + 1}.desc`)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};



const servicesData = [
  {
    number: "01",
    title: "Revêtement Mural Et De Sol",
    description: "Réalisation de revêtements muraux, de sols et habillage de façades en marbre et pierre naturelle pour des espaces élégants et durables.",
    type: "text",
    image: null,
  },
  {
    type: "image",
    image: "/service-2.jpg",
  },
  {
    number: "02",
    title: "Plans De Travail De Cuisine",
    description: "Conception et équipement de plans de travail avec des matériaux spéciaux et haut de gamme adaptés à vos besoins.",
    type: "text",
    image: null,
  },
  {
    number: "03",
    title: "Habillage Escaliers Et Terrasses",
    description: "Habillage des escaliers et terrasses pour ajouter une touche naturelle et raffinée à vos espaces.",
    type: "text",
    image: null,
  },
  {
    number: "04",
    title: "Aménagement Des Espaces Extérieurs",
    description: "Mise en valeur de vos espaces de vie extérieurs grâce à notre collection de pierres naturelles, créant un environnement chaleureux et confortable.",
    type: "text",
    image: null,
  },
  {
    type: "image",
    image: "/service-5.jpg", // Using one of the available public images as a placeholder for the quarry shot
  }
];

const ServicesGridSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div variants={fadeInUp} className="flex  items-center gap-3 mb-6">
          <div className="w-8 h-px bg-black/60" aria-hidden="true" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            {t('aboutPage.servicesTag')}
          </span>

        </motion.div>
        <motion.h1 variants={fadeInUp} className="font-serif max-w-2xl text-5xl sm:text-6xl text-foreground leading-[1.1] tracking-tight mb-8">
          {t('aboutPage.servicesTitle')}
        </motion.h1>
        <div className="pt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((item, index) => {
            if (item.type === "image") {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative aspect-square overflow-hidden bg-muted"
                >
                  <img
                    src={item.image!}
                    alt={`Service image ${index}`}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </motion.div>
              );
            }

            const serviceNum = item.number ? parseInt(item.number, 10).toString() : "1";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card p-10 flex flex-col justify-center aspect-square shadow-sm border border-border/40 hover:border-border transition-colors"
              >
                <div className="font-serif text-5xl text-muted-foreground/80 mb-8 font-light">
                  {item.number}
                </div>
                <h3 className="font-sans text-2xl text-foreground font-bold leading-tight mb-4 pr-4">
                  {t(`services.items.${serviceNum}.title`)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(`services.items.${serviceNum}.desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section >
  );
};

// --- MAIN PAGE ---
const AboutPage = () => {
  const { t, i18n } = useTranslation();

  return (
    <main className="overflow-hidden bg-background" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <SEO
        title={`${t('aboutPage.heroTitle1')} ${t('aboutPage.heroTitle2')} | Moussa Marbre`}
        description="Découvrez l'histoire de Moussa Marbre, fondé en 1989. Spécialiste de la Pierre de Taza, du marbre et du granit avec plus de 80 projets majeurs au Maroc."
        keywords="histoire moussa marbre, usine pierre taza, carrière marbre maroc, entreprise marbre taza"
        url="https://moussamarbre.com/a-propos"
      />
      <HeroSection />
      <FounderSection />
      <BeliefsSection />
      <ServicesGridSection />


      <section className="py-32 bg-foreground text-background">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-8">{t('aboutPage.ctaTitle')}</h2>
          <p className="text-background/70 text-lg leading-relaxed mb-12">{t('aboutPage.ctaDesc')}</p>
          <Link to="/contact">
            <Button className="bg-background hover:bg-background/90 text-foreground rounded-none px-8 py-6 text-xs uppercase tracking-widest">
              {t('aboutPage.ctaBtn')} <ArrowRight className={`w-4 h-4 ${i18n.language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
            </Button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
};

export default AboutPage;
