import { Component } from 'react';

/**
 * ErrorBoundary
 * ------------------------------------------------------------------
 * Seule façon d'intercepter les erreurs de rendu React : un composant
 * classe. Responsabilité unique : afficher un fallback propre plutôt
 * qu'un écran blanc. N'importe quelle sous-arborescence peut être
 * enveloppée indépendamment (composition > héritage).
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Point d'extension : brancher un service de monitoring (Sentry, etc.)
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div role="alert" style={{ padding: '2rem', textAlign: 'center' }}>
            <p>Une erreur est survenue. Merci de recharger la page.</p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
