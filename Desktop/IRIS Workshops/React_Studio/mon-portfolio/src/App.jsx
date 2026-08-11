import { useState } from 'react';
import Header from './components/sections/Header';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Hero from './components/sections/Hero.jsx';

function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('dark');
  };

  return (
    <div>
      <Header onToggleTheme={toggleTheme} isDark={isDark} />
      <Hero />
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        <section id="about" style={{ padding: '40px 0' }}>
          <h2>À propos</h2>
          <p>Je suis développeur passionné par les technologies web.</p>
        </section>
        
        <Skills />
        <Projects />
        
        <section id="contact" style={{ padding: '40px 0' }}>
          <h2>Contact</h2>
          <p>Email : mon.email@exemple.com</p>
        </section>
      </main>
      
      <footer style={{ textAlign: 'center', padding: '20px' }}>
        <p>© 2026 - Mon Portfolio</p>
      </footer>
    </div>
  );
}

export default App;
