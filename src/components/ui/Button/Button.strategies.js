/**
 * Pattern Strategy : chaque "variant" et chaque "size" est une classe
 * CSS Module isolée. Le composant Button ne fait qu'assembler les
 * bonnes stratégies — il n'a aucune connaissance de leur contenu
 * (Open/Closed Principle : ajouter une variante = ajouter une entrée
 * ici, sans toucher à Button.jsx).
 */
export const BUTTON_VARIANTS = ['primary', 'secondary', 'outline', 'ghost', 'danger'];
export const BUTTON_SIZES = ['sm', 'md', 'lg'];
