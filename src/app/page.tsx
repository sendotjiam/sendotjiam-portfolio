import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full max-w-5xl mx-auto px-margin-mobile md:px-margin flex-1">
        <Hero />
        <div className="w-full border-t border-slate-100 dark:border-slate-800/80 my-2"></div>
        <Experience />
        <Projects />
        <Skills />
        <Education />
      </main>
      <Footer />
    </>
  );
}
