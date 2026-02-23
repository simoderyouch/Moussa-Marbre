import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const fadeInUp: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Floating image parallax effect
  const yFloating = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Construct services data from translation keys
  const servicesData = [
    { title: t('services.items.1.title'), description: t('services.items.1.desc') },
    { title: t('services.items.2.title'), description: t('services.items.2.desc') },
    { title: t('services.items.3.title'), description: t('services.items.3.desc') },
    { title: t('services.items.4.title'), description: t('services.items.4.desc') }
  ];

  return (
    <section className="py-20 bg-background overflow-hidden" ref={containerRef} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-[1px] bg-black/60" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            {t('services.tag')}
          </span>
        </div>
        <h2 className="font-sans text-4xl sm:text-5xl text-foreground leading-[1.1] tracking-tight max-w-2xl mb-12">
          {t('services.title1')}{' '}
          <span className="italic font-serif  text-muted-foreground">{t('services.title2')}</span>
        </h2>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-16 lg:gap-24 items-start pb-24">

        {/* Right Column: Imagery */}
        <div className={`lg:col-span-6  relative lg:mt-[80px] ${i18n.language === 'ar' ? 'order-1 lg:order-2' : ''}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`relative rounded-none overflow-hidden aspect-[4/3] bg-muted ${i18n.language === 'ar' ? 'mr-auto' : ''}`}
          >
            <img
              src="./h4-our.jpg"
              alt="Factory processing massive marble blocks"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </motion.div>

          {/* Floating Cutout / Stone Slab Parallax */}
          <motion.div
            style={{ y: yFloating }}
            initial={{ opacity: 0, x: i18n.language === 'ar' ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`absolute  -bottom-[36%]  md:-bottom-[20%] lg:-bottom-[39%] ${i18n.language === 'ar' ? '-left-4 sm:-left-12' : '-right-4 sm:-right-12'} p-2`}
          >
            <div className="">
              <img
                src="./h1-wedo03.png"
                alt="Detailed marble texture close-up"
                className={`w-full h-full object-cover ${i18n.language === 'ar' ? '-scale-x-100' : ''}`}
              />
            </div>
          </motion.div>
        </div>
        {/* Left Column: Numbered Services List */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className={`lg:col-span-6 mt-[80px] lg:mt-0 flex flex-col ${i18n.language === 'ar' ? 'order-2 lg:order-1' : ''}`}
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className={`flex gap-6 sm:gap-8 py-8 ${index !== servicesData.length - 1 ? 'border-b border-border/50' : ''} group cursor-default`}
            >
              {/* Number Box */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-foreground flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:bg-primary shadow-lg">
                <span className="text-background font-sans font-bold text-xl sm:text-2xl">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-sans font-bold text-xl sm:text-2xl text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  );
};

export default Services;
