# Portfolio Pro

> Portfolio professionnel React 19 + Vite, avec design system piloté par variables CSS, animations au scroll et architecture SOLID.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![License: MIT](https://img.shields.io/badge/Licence-MIT-yellow.svg?style=for-the-badge)

---

## 📋 Table des Matières

- [À Propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Technologies Utilisées](#-technologies-utilisées)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Personnalisation](#-personnalisation)
- [Déploiement](#-déploiement)
- [Historique des branches](#-historique-des-branches)
- [Contribution](#-contribution)
- [Licence](#-licence)
- [Contact](#-contact)

---

## 🚀 À Propos

Ce portfolio a pour but de présenter un profil professionnel (compétences, projets, expériences) avec une base de code soignée : design system centralisé, composants réutilisables, accessibilité complète et architecture respectant les principes **SOLID** ainsi que plusieurs **design patterns** (Strategy, Observer, Compound Component, Dependency Inversion).

L'objectif n'est pas seulement de produire une vitrine visuelle, mais aussi de démontrer une approche d'ingénierie frontend rigoureuse : composants testés, CI automatisée, et code découplé du contenu.

---

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

---

## 🏗 Architecture

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

---

## 🛠 Technologies Utilisées

- [React 19](https://reactjs.org/) — Frontend
- [Vite](https://vitejs.dev/) — Build tool & serveur de dev
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) — Tests unitaires
- [GitHub Actions](https://github.com/features/actions) — Intégration continue
- [Git/GitHub](https://github.com/) — Versioning & Collaboration

---

## ⚙️ Installation

Instructions étape par étape pour configurer l'environnement de développement local.

```bash
# Cloner le dépôt
git clone https://github.com/votre-pseudo/portfolio-pro.git

# Accéder au dossier
cd portfolio-pro

# Installer les dépendances
npm install
```

---

## 🖥 Utilisation

```bash
npm run dev       # serveur de dev (http://localhost:5173)
npm run build     # build de production dans dist/
npm run preview   # prévisualiser le build
npm run lint      # oxlint
npm run test      # suite de tests Vitest
npm run test:watch
```

---

## 🎨 Personnalisation

- **Contenu** (nom, compétences, projets, expériences) : `src/data/profile.js`
- **Couleurs / typographie / espacements** : `src/styles/tokens.css`
- **Ajouter une variante de bouton** : `src/components/ui/Button/Button.strategies.js` + une classe dans `Button.module.css`
- **Ajouter une règle de validation** : `src/utils/validation.js`

---

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

---

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

---

## 🤝 Contribution

Ce projet suit le **GitHub Flow** :

1. Forkez le projet.
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`).
3. Committez vos modifications (`git commit -m 'Add some AmazingFeature'`).
4. Pushez sur la branche (`git push origin feature/AmazingFeature`).
5. Ouvrez une **Pull Request**.

---

## 📄 Licence

Distribué sous la licence **MIT**. Voir `LICENSE` pour plus d'informations.

---

## ✉️ Contact

Nom de l'auteur — [@votre_twitter](https://twitter.com/votre_twitter) — email@exemple.com

Lien du projet : [https://github.com/votre-pseudo/portfolio-pro](https://github.com/votre-pseudo/portfolio-pro)