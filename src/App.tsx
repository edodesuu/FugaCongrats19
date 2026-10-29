import { useCallback, useEffect, useState } from 'react';
import { Layout } from './components/Layout/Layout';
import { Hero } from './components/Hero/Hero';
import { Gallery } from './components/Gallery/Gallery';
import { Greetings } from './components/Greetings/Greetings';
import { MusicPlayer } from './components/MusicPlayer/MusicPlayer';

const SECTIONS = ['home', 'gallery', 'greetings', 'music'];

function App() {
  const [currentSection, setCurrentSection] = useState('home');

  const handleNavigate = useCallback((section: string) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Track which section is in view (for header highlight)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Layout currentSection={currentSection} onNavigate={handleNavigate}>
      <Hero />
      <Gallery />
      <Greetings />
      <MusicPlayer />
    </Layout>
  );
}

export default App;
