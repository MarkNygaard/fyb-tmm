import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AnimatePresence exitBeforeEnter>
      {/* initial={false} */}
      <div key={router.route}>
        <Component {...pageProps} />{' '}
      </div>
    </AnimatePresence>
  );
}

export default MyApp;
