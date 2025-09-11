import { createTheme } from '@mui/material/styles';

/**
 * Africa Markett brand palette (from your PDF mock):
 * - Primary (deep green CTA):       main #1F6F54, light #2FA37A, dark #0F4A3A
 * - Secondary (warm gold/amber):    main #D9A441, light #F0C35B, dark #A87C2A
 * - Backgrounds (cream/light tan):  default #F3E6CC, paper #FFF9F0
 * - Footer/nav deep green:          #0B3A2E (exposed via theme.custom)
 * - Body text:                      primary #0C1B17, secondary #4B5563
 */
const brand = {
  greenLight: '#004C3F',
  green: '#004C3F',
  greenDark: '#004C3F',
  goldLight: '#F0C35B',
  gold: '#FEAC00',
  goldDark: '#A87C2A',
  cream: '#FFE6B3',
  paper: '#FFE6B3',
  footerDeep: '#004C3F',
  ink: '#0C1B17',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: brand.greenLight,
      main: brand.green,
      dark: brand.greenDark,
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: brand.cream,
      main: brand.gold,
      dark: brand.goldDark,
      contrastText: '#111827',
    },
    background: {
      default: brand.cream,
      paper: brand.paper,
    },
    text: {
      primary: brand.ink,
      secondary: '#4B5563',
    },
    grey: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: [
      'Gotham',
      'Inter',
      'system-ui',
      '-apple-system',
      'Segoe UI',
      'Roboto',
      'Helvetica',
      'Arial',
      'Apple Color Emoji',
      'Segoe UI Emoji',
    ].join(','),
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: brand.footerDeep, // deep green header like footer/nav
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
  },
  custom: {
    footerDeep: brand.footerDeep,
  },
});

export default theme;
