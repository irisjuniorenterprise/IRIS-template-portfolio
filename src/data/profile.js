/**
 * Toutes les données affichées dans le portfolio vivent ici.
 * Les composants de section ne font QUE consommer ce module —
 * aucun texte "en dur" dans le JSX (séparation données/présentation).
 * Pour personnaliser le portfolio, il suffit d'éditer ce fichier.
 */
export const profile = {
  name: 'Consultant X',
  role: 'Consultant Junior à IRIS Junior Création',
  tagline: 'Je conçois des sites web',
  location: 'Sfax, Tunisie',
  email: 'contact@gmail.com',
  social: [
    { label: 'GitHub', href: 'https://github.com/', icon: 'github' },
    { label: 'LinkedIn', href: 'https://linkedin.com/', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:contact@gmail.com', icon: 'mail' },
  ],
};

export const skills = [
  { name: 'HTML', level: 95, category: 'Frontend' },
  { name: 'CSS', level: 90, category: 'Frontend' },
  { name: 'JavaScript', level: 85, category: 'Frontend' },
  { name: 'React', level: 0, category: 'Frontend' },
  { name: 'FastAPI', level: 0, category: 'Backend' },
  { name: 'Flutter', level: 0, category: 'Mobile' },
  { name: 'Firebase', level: 0, category: 'Backend' },
  { name: 'Python', level: 0, category: 'Chatbot' },
];

export const experiences = [
  {
    id: 'exp-1',
    period: '2025 — Présent',
    title: 'Développeur Junior',
    org: 'IRIS — Junior Création',
    description:
      "Conception de sites web",
  },
];
 
export const projects = [
  {
    id: 'prj-1',
    title: 'X',
    category: 'Web',
    tags: ['', '', ''],
    summary: '',
    description:
      "",
    image: null,
    links: { demo: null, source: null },
  },
];

export const projectCategories = ['Tous', ...new Set(projects.map((p) => p.category))];
