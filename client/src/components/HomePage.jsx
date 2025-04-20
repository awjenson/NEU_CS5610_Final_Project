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
      <main className="home-page">

        <section className="grid-item-hero">
            <Hero />
        </section>

        <section className="grid-item-highlights">
            <Highlights />
        </section>

        <section className="grid-item-testimonials">
            <Testimonials />
        </section>

        <section className="grid-item-about">
            <About />
        </section>

      </main>
    );
  }

