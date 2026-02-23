import Hero from '../sections/Hero';

import About from '../sections/About';
import Services from '../sections/Services';
import ProductsCarousel from '../sections/ProductsCarousel';
import Projects from '../sections/Projects';
import Testimonials from '../sections/Testimonials';
import CTASection from '../sections/CTASection';

const Home = () => {
  return (
    <>
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
