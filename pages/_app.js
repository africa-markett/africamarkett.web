import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import createEmotionCache from '@/lib/createEmotionCache';
import theme from '@/lib/muiTheme';
import '@/styles/globals.css';
import Layout from '@/components/layout/Layout';
import AdminLayout from '@/components/layout/AdminLayout';

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;
  const router = useRouter();

  // Determine if this is an admin page
  const isAdminPage = router.pathname.startsWith('/admin');

  // Choose the appropriate layout
  const LayoutComponent = isAdminPage ? AdminLayout : Layout;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="theme-color" content={theme.palette.primary.main} />
        <title>Africa Markett</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LayoutComponent> 
          <Component {...pageProps} />
        </LayoutComponent>
      </ThemeProvider>
    </CacheProvider>
  );
}
