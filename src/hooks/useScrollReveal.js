import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal
 * ------------------------------------------------------------------
 * Encapsule IntersectionObserver derrière une API déclarative.
 * Responsabilité unique : dire "cet élément est-il visible ?".
 * Aucune connaissance du style appliqué (Reveal.jsx s'en charge) —
 * séparation logique/présentation.
 */
export function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -80px 0px', once = true } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isVisible];
}
