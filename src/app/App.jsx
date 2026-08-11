import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext.jsx';
import { ErrorBoundary } from './ErrorBoundary.jsx';
import { Header } from '../components/layout/Header/index.js';
import { Hero } from '../components/sections/Hero/index.js';
import { About } from '../components/sections/About/index.js';
import { Skills } from '../components/sections/Skills/index.js';
import { Experience } from '../components/sections/Experience/index.js';
import { Projects } from '../components/sections/Projects/index.js';
import { Contact } from '../components/sections/Contact/index.js';
import { Footer } from '../components/layout/Footer/index.js';
import styles from './App.module.css';

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <div id="main-content" className={styles.appShell}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
