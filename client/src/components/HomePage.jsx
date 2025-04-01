// Order of components in the home page:
// Nav
// Hero
// Highlights
// Testimonials
// About
// Footer
import Nav from './Nav';
import Hero from './Hero';
import Highlights from './Highlights';
import Testimonials from './Testimonials';
import About from './About';
import Footer from './Footer';

export default function HomePage() {
    return (
      <>

        <div className="grid-item-hero">
            <Hero />
        </div>
        <div className="grid-item-highlights">
            <Highlights />
        </div>
        <div className="grid-item-testimonials">
            <Testimonials />
        </div>
        <div className="grid-item-about">
            <About />
        </div>

      </>
    );
  }

