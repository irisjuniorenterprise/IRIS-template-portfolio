# Portfolio Pro — React

Portfolio professionnel construit avec **React 19 + Vite**, un design system entièrement piloté par variables CSS, des animations au scroll, et une architecture respectant les principes **SOLID** et plusieurs **design patterns** (Strategy, Observer, Compound Component, Dependency Inversion).

## ✨ Fonctionnalités

- 🎨 Design system centralisé (`src/styles/tokens.css`) — couleurs, typo, spacing, elevation, motion
- 🌗 Dark mode persistant (pattern Observer via `ThemeContext`)
- 🧩 Bibliothèque UI réutilisable : `Button`, `Card`, `Badge`, `Input`, `Tooltip`, `Modal`, `Reveal`
- 🎬 Animations au scroll (`useScrollReveal` via `IntersectionObserver`)
- 📱 Responsive complet (mobile-first), menu mobile overlay
- ♿ Accessibilité : navigation clavier, focus trap, `prefers-reduced-motion`, ARIA
- 🗂️ Section Projets filtrable avec modal de détail
- ✉️ Formulaire de contact validé (pattern Strategy pour les règles de validation)
- ✅ 17 tests unitaires (Vitest + Testing Library)
- 🔧 CI GitHub Actions (lint + test + build automatiques)

## 🏗️ Architecture

```
src/
├── app/                  # Shell applicatif (App, ErrorBoundary)
├── components/
│   ├── ui/                # Bibliothèque UI générique et réutilisable
│   ├── layout/             # Header, Footer
│   └── sections/           # Hero, About, Skills, Projects, Experience, Contact
├── context/               # ThemeContext (pattern Observer)
├── hooks/                 # useTheme, useScrollReveal, useContactForm
├── data/                  # Contenu du site (profile.js) — séparé de l'UI
├── utils/                 # Fonctions pures (validation.js)
├── styles/                # tokens.css (design system), global.css (reset)
└── test/                  # Setup des tests
```

### Principes appliqués

| Principe / Pattern | Où | Pourquoi |
|---|---|---|
| **SRP** (Single Responsibility) | `ErrorBoundary`, `useContactForm`, `ThemeProvider` | Chaque module a une seule raison de changer |
| **OCP** (Open/Closed) | `Button.strategies.js`, `utils/validation.js` | Ajouter une variante/règle sans modifier le composant existant |
| **DIP** (Dependency Inversion) | `Input`, `Modal`, `Button` | Ne dépendent que d'abstractions (`onClick`, `onChange`, `error`) |
| **Strategy** | Variantes de `Button`, règles de `validation.js` | Comportement interchangeable sans `if/else` en cascade |
| **Observer** | `ThemeContext` | Les composants consommateurs réagissent aux changements de thème |
| **Compound Component** | `Card.Media / Body / Footer` | Composition libre, comme les éléments HTML natifs |

## 🚀 Démarrage

```bash
npm install
npm run dev       # serveur de dev (http://localhost:5173)
npm run build     # build de production dans dist/
npm run preview   # prévisualiser le build
npm run lint      # oxlint
npm run test      # suite de tests Vitest
npm run test:watch
```

## 🎨 Personnalisation

- **Contenu** (nom, compétences, projets, expériences) : `src/data/profile.js`
- **Couleurs / typographie / espacements** : `src/styles/tokens.css`
- **Ajouter une variante de bouton** : `src/components/ui/Button/Button.strategies.js` + une classe dans `Button.module.css`
- **Ajouter une règle de validation** : `src/utils/validation.js`

## 📦 Déploiement

Le projet inclut une configuration prête à l'emploi pour :
- **Netlify** — `netlify.toml`
- **Vercel** — `vercel.json`
- **GitHub Pages** — build `dist/` à pousser sur une branche `gh-pages`

```bash
npm run build
# Netlify : glisser-déposer dist/ sur app.netlify.com, ou connecter le repo
# Vercel  : importer le repo sur vercel.com (détection automatique de vite.config.js)
```

## 🌳 Historique des branches

| Branche | Contenu |
|---|---|
| `feature/setup` | Scaffolding, design tokens, système de thème |
| `feature/ui-kit` | Bibliothèque de composants UI |
| `feature/animations` | `useScrollReveal`, composant `Reveal` |
| `feature/header-hero` | Header sticky, Hero animé |
| `feature/sections-core` | About, Skills, Experience |
| `feature/projects-showcase` | Grille de projets filtrable + modal |
| `feature/contact-footer` | Formulaire de contact, Footer |
| `feature/a11y-responsive` | Accessibilité, `prefers-reduced-motion`, responsive |
| `feature/tests-ci` | Tests unitaires, pipeline CI |
| `feature/deploy` | README, config de déploiement |

Chaque branche a été fusionnée dans `master` via une Pull Request suivant le gabarit `.github/PULL_REQUEST_TEMPLATE.md`, avec lint + tests + build vérifiés à 0 erreur avant chaque merge.
