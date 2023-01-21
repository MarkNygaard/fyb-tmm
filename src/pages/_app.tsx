import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      <div key={router.route}>
        <Head>
          <meta
            name='apple-mobile-web-app-status-bar-style'
            content='black-translucent'
          />
          <meta
            name='viewport'
            content='initial-scale=1.0, viewport-fit=cover'
          />
        </Head>
        <Component {...pageProps} />{' '}
      </div>
    </AnimatePresence>
  );
}

export default MyApp;
