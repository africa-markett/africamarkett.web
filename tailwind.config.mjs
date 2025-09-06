/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#004C3F',
          greenLight: '#004C3F',
          greenDark: '#004C3F',
          gold: '#FEAC00',
          goldLight: '#F0C35B',
          goldDark: '#A87C2A',
          cream: '#FFE6B3',
          paper: '#FFE6B3',
          footer: '#004C3F',
          ink: '#0C1B17',
        },
      },
      fontFamily: {
        sans: ['Gotham', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      // media quries
      screens: {
        mobile: { max: '640px' },
        // => @media (max-width: 640px) { ... }
        tablet: { min: '641px', max: '1023px' },
        // => @media (min-width: 641px and max-width: 1023px)
        laptop: { min: '1024px' },
        Xlaptop: { min: '1440px' },
        // => @media (min-width: 768px) { ... }
      },
      boxShadow: {
        // Subtle, earthy shadows tuned for warm neutrals
        sm: '0 1px 2px rgba(17, 24, 39, 0.06)',
        DEFAULT: '0 1px 3px rgba(17, 24, 39, 0.1), 0 1px 2px rgba(17, 24, 39, 0.06)',
        md: '0 4px 6px rgba(17, 24, 39, 0.1), 0 2px 4px rgba(17, 24, 39, 0.06)',
        lg: '0 10px 15px rgba(17, 24, 39, 0.1), 0 4px 6px rgba(17, 24, 39, 0.05)',
        xl: '0 20px 25px rgba(17, 24, 39, 0.1), 0 10px 10px rgba(17, 24, 39, 0.04)',
        soft: '0 8px 24px rgba(36, 33, 30, 0.12)',
        ring: '0 0 0 3px rgba(245, 165, 36, 0.35)', // brand focus ring
      },
      ringColor: {
        DEFAULT: 'rgba(245, 165, 36, 0.5)',
      },
    },
  },
  daisyui: {
    styled: true,
    themes: ['light'],
    base: false,
    utils: true,
    logs: true,
  },
  plugins: [require('daisyui')],
};
