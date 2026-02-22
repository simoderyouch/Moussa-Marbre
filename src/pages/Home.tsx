import Hero from '../sections/Hero';
import CategoryBar from '../sections/CategoryBar';
import About from '../sections/About';
import Services from '../sections/Services';
import Projects from '../sections/Projects';
import Testimonials from '../sections/Testimonials';
import CTASection from '../sections/CTASection';

const Home = () => {
  return (
    <>
      <Hero />
      <CategoryBar />
      <About />
      <Services />
      <Projects />
      <Testimonials />
      <CTASection />
    </>
  );
};

export default Home;
