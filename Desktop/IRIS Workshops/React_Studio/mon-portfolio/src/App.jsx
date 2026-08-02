import { useState } from 'react';
import Header from './components/sections/Header';
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
      <main>...</main>
    </div>
  );
}
export default App;
