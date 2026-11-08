import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Languages from '@/components/Languages';
import Education from '@/components/Education';
import Footer from '@/components/Footer';
import TactileScrollbar from '@/components/TactileScrollbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <TactileScrollbar />
      <main id="main-content" className="w-full max-w-5xl mx-auto px-5 sm:px-8 flex-1">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Languages />
        <Education />
      </main>
      <Footer />
    </>
  );
}
