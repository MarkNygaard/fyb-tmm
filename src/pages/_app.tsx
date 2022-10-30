import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      <div key={router.route}>
        <Component {...pageProps} />{' '}
      </div>
    </AnimatePresence>
  );
}

export default MyApp;
