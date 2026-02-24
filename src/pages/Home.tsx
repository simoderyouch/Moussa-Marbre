import Hero from '../sections/Hero';
import SEO from '../components/SEO';

import About from '../sections/About';
import Services from '../sections/Services';
import ProductsCarousel from '../sections/ProductsCarousel';
import Projects from '../sections/Projects';
import CTASection from '../sections/CTASection';

const Home = () => {
  return (
    <>
      <SEO
        title="Moussa Marbre | Marbre, Granit & Pierre Naturelle au Maroc"
        description="Spécialiste du marbre, granit et pierre naturelle à Taza et partout au Maroc. Transformation, découpe et installation haut de gamme. Devis gratuit."
        keywords="marbre, granit, pierre naturelle, Moussa Marbre, Taza, Maroc, aménagement, décoration"
      />
      <Hero />

      <About />
      <Services />
      <ProductsCarousel />
      <Projects />

      <CTASection />
    </>
  );
};

export default Home;
