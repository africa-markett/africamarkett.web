import createCache from '@emotion/cache';

/**
 * Create a client-side Emotion cache.
 * prepend: true moves MUI styles to the top for correct precedence with Tailwind.
 */
export default function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}
