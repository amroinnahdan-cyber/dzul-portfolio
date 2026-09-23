import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Marquee from '../components/Marquee.jsx';
import Manifesto from '../components/Manifesto.jsx';
import Threads from '../components/Threads.jsx';
import Projects from '../components/Projects.jsx';
import Journey from '../components/Journey.jsx';
import About from '../components/About.jsx';
import Notes from '../components/Notes.jsx';
import Motto from '../components/Motto.jsx';
import ContactSection from '../components/ContactSection.jsx';
import Faq from '../components/Faq.jsx';
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
        <Journey />
        <About />
        <Notes />
        <Motto />
        <ContactSection />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
