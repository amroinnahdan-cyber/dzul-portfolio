import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Marquee from '../components/Marquee.jsx';
import Manifesto from '../components/Manifesto.jsx';
import Threads from '../components/Threads.jsx';
import Projects from '../components/Projects.jsx';
import About from '../components/About.jsx';
import Motto from '../components/Motto.jsx';
import ContactSection from '../components/ContactSection.jsx';
import Footer from '../components/Footer.jsx';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Threads />
        <Projects />
        <About />
        <Motto />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
