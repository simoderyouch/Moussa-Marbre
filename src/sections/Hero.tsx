import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t, i18n } = useTranslation();

  const slides = [
    {
      image: './service-4.jpg',
      tagline: t('hero.slide1.tagline'),
      title: t('hero.slide1.title'),
      description: t('hero.slide1.description')
    },
    {
      image: './service-5.jpg',
      tagline: t('hero.slide2.tagline'),
      title: t('hero.slide2.title'),
      description: t('hero.slide2.description')
    },
    {
      image: './service-8.jpg',
      tagline: t('hero.slide3.tagline'),
      title: t('hero.slide3.title'),
      description: t('hero.slide3.description')
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-foreground" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slides[currentSlide].image}
            alt="Luxury marble presentation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/80" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full mt-10">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div className={`flex items-center gap-3 mb-6 ${i18n.language === 'ar' ? 'flex-row-reverse justify-end' : ''}`}>
                <div className="w-12 h-px bg-background/50" />
                <span className="text-xs font-medium text-background/80 uppercase tracking-widest">
                  {slides[currentSlide].tagline}
                </span>
              </div>

              <h1 className="font-sans text-5xl sm:text-6xl lg:text-7xl text-background leading-[1.1] tracking-tight mb-8">
                {slides[currentSlide].title.split(' ').map((word, i, arr) => {
                  if (i === arr.length - 1) {
                    return <span key={i} className="italic font-serif text-background/70 tracking-normal">{word}</span>;
                  }
                  return word + ' ';
                })}
              </h1>

              <p className="text-background/80 text-lg leading-relaxed mb-10 max-w-xl">
                {slides[currentSlide].description}
              </p>

              <div className="flex flex-wrap gap-4 mb-16">
                <Link to="/projets">
                  <Button className="bg-background hover:bg-background/90 text-foreground rounded-none px-8 py-6 text-xs uppercase tracking-widest transition-all">
                    {t('hero.btnProjects')}
                    <ArrowRight className={`w-5 h-5 ${i18n.language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    variant="outline"
                    className="border-white text-background bg-transparent hover:bg-background/10 hover:border-background rounded-none px-8 py-6 text-xs uppercase tracking-widest transition-all"
                  >
                    {t('hero.btnContact')}
                    <ArrowRight className={`w-5 h-5 ${i18n.language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-12 left-0 right-0 z-20">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-6 justify-between items-center sm:items-end ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
          {/* Slide Indicators */}
          <div className={`flex gap-3 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1 transition-all duration-300 ${currentSlide === idx ? 'w-12 bg-background' : 'w-4 bg-background/30 hover:bg-background/50'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 flex items-center justify-center border border-background/30 text-background hover:bg-background/10 transition-colors"
            >
              <ChevronLeft className={`w-5 h-5 ${i18n.language === 'ar' ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 flex items-center justify-center border border-background/30 text-background hover:bg-background/10 transition-colors"
            >
              <ChevronRight className={`w-5 h-5 ${i18n.language === 'ar' ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
