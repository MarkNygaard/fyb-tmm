import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='da' className='scroll-pt-20 scroll-smooth xl:scroll-pt-16'>
      <Head />
      <body className='pb-safe-bottom'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
